import { SERVICE_CATEGORIES, type ServiceCategory } from './menu.ts';

export interface AftercareGuide {
  /** Stable, URL-safe unique guide ID. */
  id: string;
  /** Guide title printed on the vertical bottle-label card. */
  title: string;
  /** Short subtitle printed under the guide title. */
  subtitle: string;
  /** Menu categories this care guide covers. */
  appliesTo: ServiceCategory[];
  /** Ordered care steps. */
  steps: string[];
  /** Recommended return window in weeks (whole numbers, min <= max). */
  returnAfterWeeks: {
    min: number;
    max: number;
  };
}

export interface First24HourItem {
  hourLabel: string;
  title: string;
  detail: string;
}

export const first24HoursChecklist: First24HourItem[] = [
  {
    hourLabel: '0–2 hrs',
    title: 'Hands off hot water',
    detail: 'Skip steamy showers, hot tubs and dishwater while fresh lacquer and cuticles finish settling.',
  },
  {
    hourLabel: '2–6 hrs',
    title: 'Skip heavy oils on classic polish',
    detail: 'Let classic enamel cure rock-hard before reaching for rich balms; gel and BIAB are ready for oil right away.',
  },
  {
    hourLabel: '6–12 hrs',
    title: 'Treat tips gently',
    detail: 'Use the pads of your fingers — not fresh tips — to pop soda tabs, peel stickers or unzip bags.',
  },
  {
    hourLabel: '12–24 hrs',
    title: 'Start daily cuticle oil',
    detail: 'One drop of jojoba or sweet almond oil massaged around each nail keeps gel flexible and prevents lifting.',
  },
];

export const aftercareGuides: AftercareGuide[] = [
  {
    id: 'gel-biab',
    title: 'Gel & BIAB',
    subtitle: 'Mirror shine for two to four weeks',
    appliesTo: ['manicures'],
    steps: [
      'Massage a drop of cuticle oil into every nail morning and night to keep natural nails hydrated underneath the gel.',
      'Slip on lined gloves for dishes, gardening and household sprays so harsh detergents do not dull the top coat.',
      'Never file down the free edge of gel extensions yourself — breaking the sealed edge invites water and lifting.',
      'If a corner ever snags, send us an enquiry for a Single Nail Repair rather than gluing it down at home.',
    ],
    returnAfterWeeks: { min: 3, max: 4 },
  },
  {
    id: 'classic-polish',
    title: 'Classic Polish',
    subtitle: 'Glossy lacquer you can refresh often',
    appliesTo: ['manicures'],
    steps: [
      'Give enamel two full hours to harden through all layers before rummaging in bags or tying shoelaces.',
      'Swipe a thin layer of clear top coat across the nail and free edge on day three to bring back wet-look gloss.',
      'Keep hands moisturised after washing so dry nail plates do not flex and cause tiny hairline chips.',
      'When you are ready for a fresh shade, remove with acetone-free remover and follow with cuticle oil.',
    ],
    returnAfterWeeks: { min: 1, max: 2 },
  },
  {
    id: 'pedicures',
    title: 'Pedicures',
    subtitle: 'Soft heels and glossy toes',
    appliesTo: ['pedicures'],
    steps: [
      'Wear open-toe sandals home after a classic pedicure — closed trainers can smudge enamel for up to four hours.',
      'Apply a rich foot balm before bed twice a week to keep heels smooth between spa visits.',
      'Dry thoroughly between toes after baths or swims so gel stays crisp and skin stays happy.',
      'Keep toenails trimmed straight across at the studio so edges never press into tight shoes.',
    ],
    returnAfterWeeks: { min: 4, max: 6 },
  },
  {
    id: 'nail-art',
    title: 'Nail Art, Chrome & 3D',
    subtitle: 'Keep hand-painted details and charms spotless',
    appliesTo: ['nail-art'],
    steps: [
      'Chrome powders and mirror glazes love gentle soaps; avoid gritty scrubs and alcohol-heavy sanitisers over the tips.',
      'Watch out for knitwear, hair brushes and pockets around raised 3D gel shapes and pearls.',
      'Wipe sunscreen, self-tanner and hair dye off pale or opal art right away to prevent staining.',
      'Bring your set back before extreme grow-out shifts the apex and puts extra leverage on charms.',
    ],
    returnAfterWeeks: { min: 3, max: 4 },
  },
];

export const careDos: string[] = [
  'Oil cuticles daily — flexible nails hold gel and BIAB far longer.',
  'Wear kitchen gloves for washing up, scrubbing and gardening.',
  'Use the pads of your fingers for cans, clasps and keyboards.',
  'Come in for a gentle soak-off when you are ready for a bare break.',
  'Ask for a quick patch test if you have ever reacted to gel products.',
];

export const careDonts: string[] = [
  'Never peel, bite or pick off gel, BIAB or extensions — it pulls away layers of natural nail.',
  'Do not soak hands in scalding water right after an appointment.',
  'Avoid using nails as tools to pry lids, scrape labels or open parcels.',
  'Skip acetone-heavy cleaning sprays without gloves — they cloud mirror top coats.',
  'Do not glue a lifted extension back down at home; trapped moisture can cause greenies.',
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateAftercare(guides: readonly AftercareGuide[]): void {
  const seen = new Set<string>();
  for (const guide of guides) {
    const label = guide.id || '(missing id)';
    if (!guide.id || !ID_PATTERN.test(guide.id)) {
      throw new Error(`aftercare guide "${label}": id must be lowercase letters, digits and hyphens`);
    }
    if (seen.has(guide.id)) {
      throw new Error(`aftercare guide "${guide.id}": duplicate id`);
    }
    seen.add(guide.id);
    if (!guide.title.trim()) {
      throw new Error(`aftercare guide "${guide.id}": title is required`);
    }
    if (!guide.appliesTo.length) {
      throw new Error(`aftercare guide "${guide.id}": appliesTo must include at least one category`);
    }
    for (const cat of guide.appliesTo) {
      if (!SERVICE_CATEGORIES.includes(cat)) {
        throw new Error(`aftercare guide "${guide.id}": invalid category "${cat}"`);
      }
    }
    if (!guide.steps.length || guide.steps.some(step => !step.trim())) {
      throw new Error(`aftercare guide "${guide.id}": steps must be non-empty strings`);
    }
    const { min, max } = guide.returnAfterWeeks;
    if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || min > max) {
      throw new Error(
        `aftercare guide "${guide.id}": returnAfterWeeks must have positive integers with min <= max`,
      );
    }
  }
}
