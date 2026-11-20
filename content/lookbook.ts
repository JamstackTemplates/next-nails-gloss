import { menuServices, type ServiceItem } from './menu.ts';
import { COLOUR_FAMILIES, shades, type ColourFamily, type Shade } from './shades.ts';

export type NailShape = 'almond' | 'coffin' | 'square' | 'oval' | 'stiletto';

export const NAIL_SHAPES: readonly NailShape[] = [
  'almond',
  'coffin',
  'square',
  'oval',
  'stiletto',
] as const;

export type NailPattern =
  | 'solid'
  | 'french'
  | 'dots'
  | 'flower'
  | 'heart'
  | 'swirl'
  | 'chrome'
  | 'aura'
  | 'checker'
  | 'pearl';

export const NAIL_PATTERNS: readonly NailPattern[] = [
  'solid',
  'french',
  'dots',
  'flower',
  'heart',
  'swirl',
  'chrome',
  'aura',
  'checker',
  'pearl',
] as const;

export interface NailSpec {
  /** Base shade ID from content/shades.ts. */
  base: string;
  /** Hand-painted or chrome pattern rendered inside the SVG nail tip. */
  pattern: NailPattern;
  /** Optional accent shade ID from content/shades.ts used for tips, swirls, florals or dots. */
  accent?: string;
}

export interface LookbookDesign {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Design name visitors can quote in their enquiry. */
  title: string;
  /** Colour family for lookbook filtering. */
  family: ColourFamily;
  /** References a `nail-art` service ID in content/menu.ts. */
  technique: string;
  /** Nail tip silhouette drawn for all five nails in the set. */
  shape: NailShape;
  /** Exactly five nail specifications drawn left to right on a press-on card. */
  nails: [NailSpec, NailSpec, NailSpec, NailSpec, NailSpec];
  /** Exactly six designs are featured in "Fresh from the table" on Home. */
  featured?: boolean;
  /** One-line note describing the vibe or finish. */
  note: string;
}

export const lookbookDesigns: LookbookDesign[] = [
  {
    id: 'petal-party',
    title: 'Petal Party',
    family: 'pinks',
    technique: 'art-accent-two',
    shape: 'almond',
    featured: true,
    note: 'Creamy Petal Pink with hand-painted raspberry blossoms on two accent nails.',
    nails: [
      { base: 'petal-pink', pattern: 'solid' },
      { base: 'petal-pink', pattern: 'flower', accent: 'raspberry-gloss' },
      { base: 'raspberry-gloss', pattern: 'solid' },
      { base: 'petal-pink', pattern: 'flower', accent: 'butter-cup' },
      { base: 'petal-pink', pattern: 'solid' },
    ],
  },
  {
    id: 'raspberry-ripple',
    title: 'Raspberry Ripple',
    family: 'pinks',
    technique: 'art-full-set',
    shape: 'coffin',
    featured: true,
    note: 'Juicy raspberry jelly ribbons swirled over soft pink and milky opal.',
    nails: [
      { base: 'raspberry-gloss', pattern: 'swirl', accent: 'petal-pink' },
      { base: 'opal-aura', pattern: 'swirl', accent: 'raspberry-gloss' },
      { base: 'petal-pink', pattern: 'french', accent: 'raspberry-gloss' },
      { base: 'raspberry-gloss', pattern: 'dots', accent: 'opal-aura' },
      { base: 'opal-aura', pattern: 'swirl', accent: 'raspberry-gloss' },
    ],
  },
  {
    id: 'citrus-swirl',
    title: 'Citrus Swirl',
    family: 'brights',
    technique: 'art-full-set',
    shape: 'square',
    featured: true,
    note: 'Tangerine Pop and Buttercup waves with juicy cherry dots.',
    nails: [
      { base: 'tangerine-pop', pattern: 'swirl', accent: 'butter-cup' },
      { base: 'butter-cup', pattern: 'swirl', accent: 'tangerine-pop' },
      { base: 'tangerine-pop', pattern: 'dots', accent: 'cherry-soda' },
      { base: 'butter-cup', pattern: 'french', accent: 'tangerine-pop' },
      { base: 'cherry-soda', pattern: 'swirl', accent: 'butter-cup' },
    ],
  },
  {
    id: 'mint-micro-french',
    title: 'Mint Micro French',
    family: 'pastels',
    technique: 'art-french-twist',
    shape: 'almond',
    featured: true,
    note: 'Crisp Mint Fizz hairline tips over milky Oat Milk on sculpted almonds.',
    nails: [
      { base: 'oat-milk', pattern: 'french', accent: 'mint-fizz' },
      { base: 'oat-milk', pattern: 'french', accent: 'mint-fizz' },
      { base: 'oat-milk', pattern: 'french', accent: 'mint-fizz' },
      { base: 'oat-milk', pattern: 'french', accent: 'mint-fizz' },
      { base: 'oat-milk', pattern: 'french', accent: 'mint-fizz' },
    ],
  },
  {
    id: 'lilac-aura',
    title: 'Lilac Aura',
    family: 'pastels',
    technique: 'art-chrome',
    shape: 'oval',
    featured: true,
    note: 'Airbrushed Lilac Haze glow blushing out from an Opal Aura centre.',
    nails: [
      { base: 'opal-aura', pattern: 'aura', accent: 'lilac-haze' },
      { base: 'opal-aura', pattern: 'aura', accent: 'lilac-haze' },
      { base: 'lilac-haze', pattern: 'aura', accent: 'petal-pink' },
      { base: 'opal-aura', pattern: 'aura', accent: 'lilac-haze' },
      { base: 'opal-aura', pattern: 'aura', accent: 'lilac-haze' },
    ],
  },
  {
    id: 'midnight-pearls',
    title: 'Midnight Pearls',
    family: 'darks',
    technique: 'art-3d-charms',
    shape: 'stiletto',
    featured: true,
    note: 'Deep Midnight Plum lacquer dotted with raised opal pearls and silver chrome.',
    nails: [
      { base: 'midnight-plum', pattern: 'pearl', accent: 'opal-aura' },
      { base: 'midnight-plum', pattern: 'solid' },
      { base: 'midnight-plum', pattern: 'pearl', accent: 'silver-mirror' },
      { base: 'midnight-plum', pattern: 'pearl', accent: 'opal-aura' },
      { base: 'midnight-plum', pattern: 'solid' },
    ],
  },
  {
    id: 'oat-milk-hearts',
    title: 'Oat Milk Hearts',
    family: 'nudes',
    technique: 'art-accent-two',
    shape: 'oval',
    note: 'Warm neutral Oat Milk with tiny hand-painted cherry hearts on two nails.',
    nails: [
      { base: 'oat-milk', pattern: 'solid' },
      { base: 'oat-milk', pattern: 'heart', accent: 'cherry-soda' },
      { base: 'oat-milk', pattern: 'solid' },
      { base: 'oat-milk', pattern: 'heart', accent: 'raspberry-gloss' },
      { base: 'oat-milk', pattern: 'solid' },
    ],
  },
  {
    id: 'glazed-donut',
    title: 'Glazed Donut',
    family: 'nudes',
    technique: 'art-chrome',
    shape: 'almond',
    note: 'Sheer Opal Aura glazed with mirror-pearl chrome over Oat Milk.',
    nails: [
      { base: 'oat-milk', pattern: 'chrome', accent: 'opal-aura' },
      { base: 'oat-milk', pattern: 'chrome', accent: 'opal-aura' },
      { base: 'oat-milk', pattern: 'chrome', accent: 'opal-aura' },
      { base: 'oat-milk', pattern: 'chrome', accent: 'opal-aura' },
      { base: 'oat-milk', pattern: 'chrome', accent: 'opal-aura' },
    ],
  },
  {
    id: 'cherry-checker',
    title: 'Cherry Checkerboard',
    family: 'brights',
    technique: 'art-full-set',
    shape: 'square',
    note: 'Glossy Cherry Soda checks paired with Petal Pink solids and tiny hearts.',
    nails: [
      { base: 'cherry-soda', pattern: 'checker', accent: 'opal-aura' },
      { base: 'petal-pink', pattern: 'heart', accent: 'cherry-soda' },
      { base: 'cherry-soda', pattern: 'checker', accent: 'petal-pink' },
      { base: 'cherry-soda', pattern: 'solid' },
      { base: 'petal-pink', pattern: 'checker', accent: 'cherry-soda' },
    ],
  },
  {
    id: 'blueberry-double-french',
    title: 'Blueberry Double French',
    family: 'brights',
    technique: 'art-french-twist',
    shape: 'coffin',
    note: 'Blueberry Jam jelly tips layered over crisp Lilac Haze and Oat Milk.',
    nails: [
      { base: 'oat-milk', pattern: 'french', accent: 'blueberry-jam' },
      { base: 'opal-aura', pattern: 'french', accent: 'blueberry-jam' },
      { base: 'oat-milk', pattern: 'french', accent: 'lilac-haze' },
      { base: 'opal-aura', pattern: 'french', accent: 'blueberry-jam' },
      { base: 'oat-milk', pattern: 'french', accent: 'blueberry-jam' },
    ],
  },
  {
    id: 'silver-mirror-tips',
    title: 'Silver Mirror Tips',
    family: 'chrome',
    technique: 'art-chrome',
    shape: 'stiletto',
    note: 'Liquid Silver Mirror chrome melted onto sleek stiletto tips.',
    nails: [
      { base: 'silver-mirror', pattern: 'chrome', accent: 'opal-aura' },
      { base: 'opal-aura', pattern: 'french', accent: 'silver-mirror' },
      { base: 'silver-mirror', pattern: 'chrome', accent: 'lilac-haze' },
      { base: 'opal-aura', pattern: 'french', accent: 'silver-mirror' },
      { base: 'silver-mirror', pattern: 'chrome', accent: 'opal-aura' },
    ],
  },
  {
    id: 'buttercup-daisies',
    title: 'Buttercup Daisies',
    family: 'pastels',
    technique: 'art-full-set',
    shape: 'square',
    note: 'Sunny Buttercup petals and mint polkadots on retro short squares.',
    nails: [
      { base: 'butter-cup', pattern: 'flower', accent: 'opal-aura' },
      { base: 'mint-fizz', pattern: 'dots', accent: 'butter-cup' },
      { base: 'opal-aura', pattern: 'flower', accent: 'butter-cup' },
      { base: 'butter-cup', pattern: 'dots', accent: 'tangerine-pop' },
      { base: 'mint-fizz', pattern: 'flower', accent: 'butter-cup' },
    ],
  },
  {
    id: 'plum-swirl',
    title: 'Plum Swirl',
    family: 'darks',
    technique: 'art-full-set',
    shape: 'almond',
    note: 'Velvety Midnight Plum ribboned with Lilac Haze and Raspberry Gloss.',
    nails: [
      { base: 'midnight-plum', pattern: 'swirl', accent: 'lilac-haze' },
      { base: 'midnight-plum', pattern: 'aura', accent: 'raspberry-gloss' },
      { base: 'lilac-haze', pattern: 'swirl', accent: 'midnight-plum' },
      { base: 'midnight-plum', pattern: 'swirl', accent: 'raspberry-gloss' },
      { base: 'midnight-plum', pattern: 'dots', accent: 'lilac-haze' },
    ],
  },
  {
    id: 'opal-pearl-set',
    title: 'Opal Pearl Set',
    family: 'chrome',
    technique: 'art-3d-charms',
    shape: 'oval',
    note: 'Shimmering Opal Aura glazed in chrome with clustered 3D pearls.',
    nails: [
      { base: 'opal-aura', pattern: 'chrome', accent: 'silver-mirror' },
      { base: 'opal-aura', pattern: 'pearl', accent: 'silver-mirror' },
      { base: 'opal-aura', pattern: 'pearl', accent: 'lilac-haze' },
      { base: 'opal-aura', pattern: 'chrome', accent: 'petal-pink' },
      { base: 'opal-aura', pattern: 'pearl', accent: 'silver-mirror' },
    ],
  },
];

export function featuredDesigns(list: readonly LookbookDesign[] = lookbookDesigns): LookbookDesign[] {
  return list.filter(design => design.featured);
}

export function filterLookbook(
  list: readonly LookbookDesign[],
  filters: { family?: ColourFamily | 'all'; technique?: string | 'all' },
): LookbookDesign[] {
  const family = filters.family && filters.family !== 'all' ? filters.family : null;
  const technique = filters.technique && filters.technique !== 'all' ? filters.technique : null;
  return list.filter(design => {
    if (family && design.family !== family) return false;
    if (technique && design.technique !== technique) return false;
    return true;
  });
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FAMILY_SET = new Set<string>(COLOUR_FAMILIES.map(f => f.id));

export function validateLookbook(
  designs: readonly LookbookDesign[],
  shadeList: readonly Shade[] = shades,
  serviceList: readonly ServiceItem[] = menuServices,
): void {
  const shadeIds = new Set(shadeList.map(s => s.id));
  const nailArtIds = new Set(serviceList.filter(s => s.category === 'nail-art').map(s => s.id));
  const seen = new Set<string>();
  let featuredCount = 0;

  for (const design of designs) {
    const label = design.id || '(missing id)';
    if (!design.id || !ID_PATTERN.test(design.id)) {
      throw new Error(`lookbook "${label}": id must be lowercase letters, digits and hyphens`);
    }
    if (seen.has(design.id)) {
      throw new Error(`lookbook "${design.id}": duplicate id`);
    }
    seen.add(design.id);
    if (!design.title.trim()) {
      throw new Error(`lookbook "${design.id}": title is required`);
    }
    if (!design.note.trim()) {
      throw new Error(`lookbook "${design.id}": note is required`);
    }
    if (!FAMILY_SET.has(design.family)) {
      throw new Error(`lookbook "${design.id}": invalid family "${design.family}"`);
    }
    if (!nailArtIds.has(design.technique)) {
      throw new Error(
        `lookbook "${design.id}": technique "${design.technique}" must reference an existing nail-art service`,
      );
    }
    if (!NAIL_SHAPES.includes(design.shape)) {
      throw new Error(`lookbook "${design.id}": invalid shape "${design.shape}"`);
    }
    if (!Array.isArray(design.nails) || design.nails.length !== 5) {
      throw new Error(`lookbook "${design.id}": must define exactly 5 nails`);
    }
    design.nails.forEach((nail, index) => {
      if (!shadeIds.has(nail.base)) {
        throw new Error(
          `lookbook "${design.id}" nail #${index + 1}: base shade "${nail.base}" does not exist`,
        );
      }
      if (!NAIL_PATTERNS.includes(nail.pattern)) {
        throw new Error(
          `lookbook "${design.id}" nail #${index + 1}: invalid pattern "${nail.pattern}"`,
        );
      }
      if (nail.accent !== undefined && !shadeIds.has(nail.accent)) {
        throw new Error(
          `lookbook "${design.id}" nail #${index + 1}: accent shade "${nail.accent}" does not exist`,
        );
      }
    });
    if (design.featured) featuredCount++;
  }

  if (featuredCount !== 6) {
    throw new Error(`lookbook: expected exactly 6 featured designs for Home, found ${featuredCount}`);
  }
}
