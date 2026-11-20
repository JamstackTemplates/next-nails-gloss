export type ServiceCategory = 'manicures' | 'pedicures' | 'nail-art' | 'add-ons';

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  'manicures',
  'pedicures',
  'nail-art',
  'add-ons',
] as const;

export interface ServiceItem {
  /** Stable, URL-safe unique identifier (referenced by lookbook designs for nail-art items). */
  id: string;
  /** Menu section this service belongs to. */
  category: ServiceCategory;
  /** Public service name displayed on the menu. */
  name: string;
  /** Short one-sentence description of what is included. */
  description: string;
  /** Typical chair time in minutes (integer between 10 and 150). */
  durationMinutes: number;
  /** Whole-dollar USD price (number > 0 and <= 200). */
  priceUsd: number;
  /** When true, displayed as "from $X" because length or detail varies. */
  priceFrom?: boolean;
  /** Set to false to show "Taking a break" and exclude from home "from" price calculations. */
  available: boolean;
  /** Optional "Popular" ribbon on the menu board. */
  popular?: boolean;
}

export const menuServices: ServiceItem[] = [
  {
    id: 'classic-manicure',
    category: 'manicures',
    name: 'Classic Manicure',
    description: 'Shape, cuticle care, hand massage and a classic polish in any shade on the rack.',
    durationMinutes: 40,
    priceUsd: 35,
    available: true,
  },
  {
    id: 'gel-manicure',
    category: 'manicures',
    name: 'Gel Manicure',
    description: 'Long-wear gel colour with a mirror top coat; lasts two to three weeks.',
    durationMinutes: 60,
    priceUsd: 50,
    available: true,
  },
  {
    id: 'biab-overlay',
    category: 'manicures',
    name: 'BIAB Strengthening Overlay',
    description: 'Builder gel over natural nails for strength while they grow.',
    durationMinutes: 75,
    priceUsd: 65,
    available: true,
    popular: true,
  },
  {
    id: 'gel-extensions',
    category: 'manicures',
    name: 'Gel Extensions',
    description: 'Soft-gel tips shaped to almond, coffin, square, oval or stiletto.',
    durationMinutes: 105,
    priceUsd: 85,
    priceFrom: true,
    available: true,
  },
  {
    id: 'mini-manicure',
    category: 'manicures',
    name: 'Polish Change',
    description: 'File and repaint in classic polish, no cuticle work.',
    durationMinutes: 20,
    priceUsd: 18,
    available: true,
  },
  {
    id: 'classic-pedicure',
    category: 'pedicures',
    name: 'Classic Pedicure',
    description: 'Soak, shape, cuticle care, buff and classic polish.',
    durationMinutes: 50,
    priceUsd: 45,
    available: true,
  },
  {
    id: 'gel-pedicure',
    category: 'pedicures',
    name: 'Gel Pedicure',
    description: 'Our classic pedicure finished in chip-resistant gel.',
    durationMinutes: 60,
    priceUsd: 58,
    available: true,
  },
  {
    id: 'petal-spa-pedicure',
    category: 'pedicures',
    name: 'Petal Spa Pedicure',
    description: 'Sugar scrub, mask, hot towels and a long massage, finished in gel.',
    durationMinutes: 80,
    priceUsd: 75,
    available: true,
    popular: true,
  },
  {
    id: 'art-accent-two',
    category: 'nail-art',
    name: 'Accent Art (2 nails)',
    description: 'Hand-painted detail on two nails: florals, hearts, smiley faces.',
    durationMinutes: 15,
    priceUsd: 12,
    available: true,
  },
  {
    id: 'art-french-twist',
    category: 'nail-art',
    name: 'French Twist',
    description: 'Coloured, double-line or micro French tips on all ten.',
    durationMinutes: 20,
    priceUsd: 20,
    available: true,
  },
  {
    id: 'art-chrome',
    category: 'nail-art',
    name: 'Chrome and Aura',
    description: 'Chrome powder or airbrushed aura glow over gel.',
    durationMinutes: 20,
    priceUsd: 18,
    available: true,
  },
  {
    id: 'art-full-set',
    category: 'nail-art',
    name: 'Full Hand-painted Set',
    description: 'A different design on every nail; bring a reference picture.',
    durationMinutes: 45,
    priceUsd: 40,
    priceFrom: true,
    available: true,
  },
  {
    id: 'art-3d-charms',
    category: 'nail-art',
    name: '3D Gel and Charms',
    description: 'Raised gel shapes, pearls and charms.',
    durationMinutes: 30,
    priceUsd: 25,
    priceFrom: true,
    available: true,
  },
  {
    id: 'gel-removal',
    category: 'add-ons',
    name: 'Gel or BIAB Soak-off',
    description: 'Gentle removal with oil treatment.',
    durationMinutes: 20,
    priceUsd: 15,
    available: true,
  },
  {
    id: 'extension-removal',
    category: 'add-ons',
    name: 'Extension Removal',
    description: 'Safe removal of gel extensions.',
    durationMinutes: 30,
    priceUsd: 22,
    available: true,
  },
  {
    id: 'nail-repair',
    category: 'add-ons',
    name: 'Single Nail Repair',
    description: 'Fix one broken or lifted nail.',
    durationMinutes: 10,
    priceUsd: 8,
    available: true,
  },
  {
    id: 'paraffin-dip',
    category: 'add-ons',
    name: 'Paraffin Hand Dip',
    description: 'Warm paraffin wrap for dry hands.',
    durationMinutes: 15,
    priceUsd: 15,
    available: true,
  },
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function servicesByCategory(
  category: ServiceCategory,
  items: readonly ServiceItem[] = menuServices,
): ServiceItem[] {
  return items.filter(item => item.category === category);
}

/** Lowest price among currently available services in a category, or null if none are available. */
export function categoryFromPrice(
  category: ServiceCategory,
  items: readonly ServiceItem[] = menuServices,
): number | null {
  const available = items.filter(item => item.category === category && item.available);
  if (available.length === 0) return null;
  return Math.min(...available.map(item => item.priceUsd));
}

export function serviceById(
  id: string,
  items: readonly ServiceItem[] = menuServices,
): ServiceItem | undefined {
  return items.find(item => item.id === id);
}

export function formatPrice(priceUsd: number, priceFrom?: boolean): string {
  return priceFrom ? `from $${priceUsd}` : `$${priceUsd}`;
}

export function formatDuration(durationMinutes: number): string {
  return `${durationMinutes} min`;
}

export function validateMenu(items: readonly ServiceItem[]): void {
  const seen = new Set<string>();
  for (const item of items) {
    const label = item.id || '(missing id)';
    if (!item.id || !ID_PATTERN.test(item.id)) {
      throw new Error(`menu item "${label}": id must be lowercase letters, digits and hyphens`);
    }
    if (seen.has(item.id)) {
      throw new Error(`menu item "${item.id}": duplicate id`);
    }
    seen.add(item.id);
    if (!SERVICE_CATEGORIES.includes(item.category)) {
      throw new Error(`menu item "${item.id}": invalid category "${item.category}"`);
    }
    if (!item.name.trim()) {
      throw new Error(`menu item "${item.id}": name is required`);
    }
    if (!item.description.trim()) {
      throw new Error(`menu item "${item.id}": description is required`);
    }
    if (!Number.isInteger(item.durationMinutes) || item.durationMinutes < 10 || item.durationMinutes > 150) {
      throw new Error(`menu item "${item.id}": durationMinutes must be an integer between 10 and 150`);
    }
    if (!Number.isInteger(item.priceUsd) || item.priceUsd <= 0 || item.priceUsd > 200) {
      throw new Error(`menu item "${item.id}": priceUsd must be a whole dollar > 0 and <= 200`);
    }
    if (typeof item.available !== 'boolean') {
      throw new Error(`menu item "${item.id}": available must be a boolean`);
    }
  }
}
