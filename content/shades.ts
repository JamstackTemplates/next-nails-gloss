export type ColourFamily = 'pinks' | 'brights' | 'nudes' | 'pastels' | 'darks' | 'chrome';

export const COLOUR_FAMILIES: readonly { id: ColourFamily; label: string; swatchHex: string }[] = [
  { id: 'pinks', label: 'Pinks', swatchHex: '#C2185B' },
  { id: 'brights', label: 'Brights', swatchHex: '#FF7043' },
  { id: 'nudes', label: 'Nudes', swatchHex: '#E8D2C0' },
  { id: 'pastels', label: 'Pastels', swatchHex: '#3CC9A6' },
  { id: 'darks', label: 'Darks', swatchHex: '#3B0F3F' },
  { id: 'chrome', label: 'Chrome', swatchHex: '#C9CED6' },
] as const;

export type PolishFinish = 'cream' | 'jelly' | 'shimmer' | 'chrome';

export const POLISH_FINISHES: readonly PolishFinish[] = [
  'cream',
  'jelly',
  'shimmer',
  'chrome',
] as const;

export interface Shade {
  /** Stable, URL-safe unique shade ID (referenced by lookbook nail specs). */
  id: string;
  /** Display name shown in the shade rack and Shade of the Month band. */
  name: string;
  /** Exact #RRGGBB hex colour used to paint SVG nail tips and bottles. */
  hex: string;
  /** Colour family shared with the lookbook filter. */
  family: ColourFamily;
  /** Surface finish: cream, jelly, shimmer or chrome. */
  finish: PolishFinish;
  /** Exactly one shade must be true; shown as Shade of the Month on Home. */
  featured?: boolean;
  /** One-line story required for the featured shade. */
  story?: string;
}

export const shades: Shade[] = [
  {
    id: 'petal-pink',
    name: 'Petal Pink',
    hex: '#F48FB1',
    family: 'pinks',
    finish: 'cream',
  },
  {
    id: 'raspberry-gloss',
    name: 'Raspberry Gloss',
    hex: '#C2185B',
    family: 'pinks',
    finish: 'jelly',
    featured: true,
    story: 'Our signature: a juicy raspberry jelly that looks wet for weeks.',
  },
  {
    id: 'cherry-soda',
    name: 'Cherry Soda',
    hex: '#D32F2F',
    family: 'brights',
    finish: 'cream',
  },
  {
    id: 'tangerine-pop',
    name: 'Tangerine Pop',
    hex: '#FF7043',
    family: 'brights',
    finish: 'cream',
  },
  {
    id: 'butter-cup',
    name: 'Buttercup',
    hex: '#FFD45C',
    family: 'pastels',
    finish: 'cream',
  },
  {
    id: 'mint-fizz',
    name: 'Mint Fizz',
    hex: '#3CC9A6',
    family: 'pastels',
    finish: 'cream',
    story: 'Crisp spearmint cream that feels like iced agua fresca on South Congress.',
  },
  {
    id: 'lilac-haze',
    name: 'Lilac Haze',
    hex: '#B59CFF',
    family: 'pastels',
    finish: 'shimmer',
  },
  {
    id: 'blueberry-jam',
    name: 'Blueberry Jam',
    hex: '#3949AB',
    family: 'brights',
    finish: 'jelly',
  },
  {
    id: 'oat-milk',
    name: 'Oat Milk',
    hex: '#E8D2C0',
    family: 'nudes',
    finish: 'cream',
  },
  {
    id: 'midnight-plum',
    name: 'Midnight Plum',
    hex: '#3B0F3F',
    family: 'darks',
    finish: 'cream',
  },
  {
    id: 'silver-mirror',
    name: 'Silver Mirror',
    hex: '#C9CED6',
    family: 'chrome',
    finish: 'chrome',
  },
  {
    id: 'opal-aura',
    name: 'Opal Aura',
    hex: '#F6E7FF',
    family: 'chrome',
    finish: 'shimmer',
  },
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const FAMILY_SET = new Set<string>(COLOUR_FAMILIES.map(f => f.id));

export function shadeById(id: string, list: readonly Shade[] = shades): Shade | undefined {
  return list.find(shade => shade.id === id);
}

/**
 * Hero photography: light and dark photos of a hand wearing one shade from the rack.
 * Home shows them only while that shade is featured; any other Shade of the Month falls back
 * to the drawn hand, which is painted from data. Re-shoot the photos and update `shadeId`
 * (and the files in public/) to feature photography for a different shade.
 */
export const heroPhoto = {
  shadeId: 'raspberry-gloss',
  light: '/hero-light.webp',
  dark: '/hero-dark.webp',
  width: 1200,
  height: 1500,
  alt: 'A hand raised against a soft backdrop, long almond nails in glossy Raspberry Gloss',
} as const;

/** The hero photo to show for the featured shade, or null when only the drawn hand matches. */
export function heroPhotoFor(shade: Shade): typeof heroPhoto | null {
  return shade.id === heroPhoto.shadeId ? heroPhoto : null;
}

export function featuredShade(list: readonly Shade[] = shades): Shade {
  const found = list.find(shade => shade.featured);
  if (!found) throw new Error('shades: no featured shade configured');
  return found;
}

export function validateShades(list: readonly Shade[]): void {
  const seen = new Set<string>();
  const featured: Shade[] = [];
  for (const shade of list) {
    const label = shade.id || '(missing id)';
    if (!shade.id || !ID_PATTERN.test(shade.id)) {
      throw new Error(`shade "${label}": id must be lowercase letters, digits and hyphens`);
    }
    if (seen.has(shade.id)) {
      throw new Error(`shade "${shade.id}": duplicate id`);
    }
    seen.add(shade.id);
    if (!shade.name.trim()) {
      throw new Error(`shade "${shade.id}": name is required`);
    }
    if (!HEX_PATTERN.test(shade.hex)) {
      throw new Error(`shade "${shade.id}": hex "${shade.hex}" must match #RRGGBB`);
    }
    if (!FAMILY_SET.has(shade.family)) {
      throw new Error(`shade "${shade.id}": invalid family "${shade.family}"`);
    }
    if (!POLISH_FINISHES.includes(shade.finish)) {
      throw new Error(`shade "${shade.id}": invalid finish "${shade.finish}"`);
    }
    if (shade.featured) {
      featured.push(shade);
      if (!shade.story || !shade.story.trim()) {
        throw new Error(`shade "${shade.id}": featured shade must include a story`);
      }
    }
  }
  if (featured.length !== 1) {
    throw new Error(
      `shades: expected exactly one featured shade, found ${featured.length}${
        featured.length ? ` (${featured.map(s => s.id).join(', ')})` : ''
      }`,
    );
  }
}
