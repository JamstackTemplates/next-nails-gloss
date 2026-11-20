import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { aftercareGuides, validateAftercare } from '../content/aftercare.ts';
import { business } from '../content/business.ts';
import {
  featuredDesigns,
  filterLookbook,
  lookbookDesigns,
  validateLookbook,
} from '../content/lookbook.ts';
import {
  categoryFromPrice,
  menuServices,
  validateMenu,
} from '../content/menu.ts';
import { featuredShade, heroPhoto, heroPhotoFor, shadeById, shades, validateShades } from '../content/shades.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'wordmark', 'tagline', 'introduction', 'email', 'phone', 'landmark', 'timeZone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.address.full.trim(), 'business.address.full: required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('NailSalon structured data derives from content and escapes inline JSON-LD', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'NailSalon');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.priceRange, '$$');
  assert.equal(schema.address.streetAddress, business.address.street);
  assert.equal(schema.openingHoursSpecification.length, 6);

  const dangerous = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(dangerous);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), dangerous);
});

test('menu services pass validation and name offending item IDs on failure', () => {
  assert.doesNotThrow(() => validateMenu(menuServices));
  assert.equal(menuServices.length, 17);

  // Duplicate ID
  assert.throws(
    () => validateMenu([...menuServices, { ...menuServices[0] }]),
    /classic-manicure/,
  );
  // Price out of bounds or non-integer
  assert.throws(
    () => validateMenu(menuServices.map(s => (s.id === 'gel-manicure' ? { ...s, priceUsd: 0 } : s))),
    /gel-manicure/,
  );
  assert.throws(
    () => validateMenu(menuServices.map(s => (s.id === 'gel-manicure' ? { ...s, priceUsd: 205 } : s))),
    /gel-manicure/,
  );
  assert.throws(
    () => validateMenu(menuServices.map(s => (s.id === 'gel-manicure' ? { ...s, priceUsd: 49.5 } : s))),
    /gel-manicure/,
  );
  // Duration out of bounds
  assert.throws(
    () => validateMenu(menuServices.map(s => (s.id === 'biab-overlay' ? { ...s, durationMinutes: 5 } : s))),
    /biab-overlay/,
  );
  assert.throws(
    () => validateMenu(menuServices.map(s => (s.id === 'biab-overlay' ? { ...s, durationMinutes: 160 } : s))),
    /biab-overlay/,
  );
});

test('Home "from" prices derive from available items only', () => {
  assert.equal(categoryFromPrice('manicures', menuServices), 18);
  assert.equal(categoryFromPrice('pedicures', menuServices), 45);
  assert.equal(categoryFromPrice('nail-art', menuServices), 12);

  // Marking gel-extensions unavailable keeps Manicures "from" price at $18
  const withoutExtensions = menuServices.map(s =>
    s.id === 'gel-extensions' ? { ...s, available: false } : s,
  );
  assert.equal(categoryFromPrice('manicures', withoutExtensions), 18);

  // Marking the lowest-priced manicure unavailable raises the derived "from" price to $35
  const withoutPolishChange = menuServices.map(s =>
    s.id === 'mini-manicure' ? { ...s, available: false } : s,
  );
  assert.equal(categoryFromPrice('manicures', withoutPolishChange), 35);
});

test('shades pass validation, enforce exactly one featured shade with a story, and name bad IDs', () => {
  assert.doesNotThrow(() => validateShades(shades));
  const star = featuredShade(shades);
  assert.equal(star.id, 'raspberry-gloss');
  assert.ok(star.story && star.story.trim().length > 0);

  // Invalid hex names the shade
  assert.throws(
    () => validateShades(shades.map(s => (s.id === 'mint-fizz' ? { ...s, hex: '#3CC' } : s))),
    /mint-fizz/,
  );
  // Duplicate ID names the shade
  assert.throws(
    () => validateShades([...shades, { ...shades[0], featured: false }]),
    /petal-pink/,
  );
  // Zero featured shades fails
  assert.throws(
    () => validateShades(shades.map(s => ({ ...s, featured: false }))),
    /exactly one featured shade/,
  );
  // Two featured shades fails and names them
  assert.throws(
    () => validateShades(shades.map(s => (s.id === 'mint-fizz' ? { ...s, featured: true, story: 'Fresh' } : s))),
    /mint-fizz/,
  );
  // Featured shade without a story fails and names the shade
  assert.throws(
    () =>
      validateShades(
        shades.map(s =>
          s.id === 'raspberry-gloss'
            ? { ...s, featured: false }
            : s.id === 'lilac-haze'
              ? { ...s, featured: true, story: '' }
              : s,
        ),
      ),
    /lilac-haze/,
  );
});

test('lookbook designs pass validation and check references, nail counts and featured count', () => {
  assert.doesNotThrow(() => validateLookbook(lookbookDesigns, shades, menuServices));
  assert.equal(lookbookDesigns.length, 14);
  assert.equal(featuredDesigns(lookbookDesigns).length, 6);

  // Bad technique reference names the design ID
  assert.throws(
    () =>
      validateLookbook(
        lookbookDesigns.map(d => (d.id === 'petal-party' ? { ...d, technique: 'classic-manicure' } : d)),
      ),
    /petal-party/,
  );
  // Bad base shade reference names the design ID
  assert.throws(
    () =>
      validateLookbook(
        lookbookDesigns.map(d =>
          d.id === 'lilac-aura'
            ? { ...d, nails: [{ base: 'missing-shade', pattern: 'solid' }, ...d.nails.slice(1)] as typeof d.nails }
            : d,
        ),
      ),
    /lilac-aura/,
  );
  // Bad accent shade reference names the design ID
  assert.throws(
    () =>
      validateLookbook(
        lookbookDesigns.map(d =>
          d.id === 'citrus-swirl'
            ? { ...d, nails: [{ base: 'butter-cup', pattern: 'dots', accent: 'nope' }, ...d.nails.slice(1)] as typeof d.nails }
            : d,
        ),
      ),
    /citrus-swirl/,
  );
  // Wrong nail count names the design ID
  assert.throws(
    () =>
      validateLookbook(
        lookbookDesigns.map(d =>
          d.id === 'glazed-donut' ? ({ ...d, nails: d.nails.slice(0, 4) } as unknown as typeof d) : d,
        ),
      ),
    /glazed-donut/,
  );
  // Wrong featured count fails
  assert.throws(
    () =>
      validateLookbook(
        lookbookDesigns.map(d => (d.id === 'petal-party' ? { ...d, featured: false } : d)),
      ),
    /6 featured designs/,
  );
});

test('lookbook filters combine colour family and technique accurately and reset cleanly', () => {
  assert.equal(filterLookbook(lookbookDesigns, { family: 'all', technique: 'all' }).length, 14);
  assert.equal(filterLookbook(lookbookDesigns, { family: 'pinks' }).length, 2);
  assert.equal(filterLookbook(lookbookDesigns, { technique: 'art-chrome' }).length, 3);
  const combined = filterLookbook(lookbookDesigns, { family: 'brights', technique: 'art-full-set' });
  assert.deepEqual(
    combined.map(d => d.id),
    ['citrus-swirl', 'cherry-checker'],
  );
  assert.equal(filterLookbook(lookbookDesigns, { family: 'darks', technique: 'art-french-twist' }).length, 0);
});

test('aftercare guides pass validation and name offending guide IDs on failure', () => {
  assert.doesNotThrow(() => validateAftercare(aftercareGuides));
  assert.equal(aftercareGuides.length, 4);
  assert.throws(
    () =>
      validateAftercare(
        aftercareGuides.map(g => (g.id === 'pedicures' ? { ...g, returnAfterWeeks: { min: 6, max: 3 } } : g)),
      ),
    /pedicures/,
  );
});

test('enquiry copy never implies booked/reserved/confirmed appointments while menu notes confirm prices by reply', () => {
  const enquirySources = [
    business.enquiries.title,
    business.enquiries.introduction,
    business.enquiries.replyNote,
    ...business.enquiries.usefulToInclude,
    readFileSync(new URL('../app/contact/page.tsx', import.meta.url), 'utf8'),
    readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8'),
    readFileSync(new URL('../app/lookbook/page.tsx', import.meta.url), 'utf8'),
    readFileSync(new URL('../app/aftercare/page.tsx', import.meta.url), 'utf8'),
  ].join('\n');

  assert.doesNotMatch(
    enquirySources,
    /\b(booked|reserved|confirmed)\b/i,
    'Contact and enquiry copy must not use booked, reserved or confirmed for appointments',
  );

  const menuSource = readFileSync(new URL('../app/menu/page.tsx', import.meta.url), 'utf8');
  assert.match(
    menuSource,
    /confirmed in the reply/i,
    'Menu policy notes must explain that final prices are confirmed in the reply to your enquiry',
  );
});

test('hero photography references a real shade and its files exist', () => {
  assert.ok(shadeById(heroPhoto.shadeId), `heroPhoto.shadeId "${heroPhoto.shadeId}" is not in shades.ts`);
  for (const file of [heroPhoto.light, heroPhoto.dark]) {
    assert.ok(existsSync(new URL(`../public${file}`, import.meta.url)), `missing hero photo public${file}`);
  }
});

test('hero shows the photo only while its shade is featured, otherwise the drawn hand', () => {
  const photoShade = shadeById(heroPhoto.shadeId)!;
  assert.equal(heroPhotoFor(photoShade), heroPhoto);
  const other = shades.find(s => s.id !== heroPhoto.shadeId)!;
  assert.equal(heroPhotoFor(other), null);
});
