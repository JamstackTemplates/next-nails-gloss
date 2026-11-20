/** Weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];

export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

/** Format 24-hour HH:MM ("19:00", "09:00") into friendly 12-hour studio copy ("7:00 pm", "9:00 am"). */
export function formatClock12(value: string): string {
  const hour24 = Number(value.slice(0, 2));
  const min = value.slice(3, 5);
  const period = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${min} ${period}`;
}

/** Format one day's interval for the weekly hours table ("10:00 am – 7:00 pm" or "Closed"). */
export function formatHoursRange(entry: OpeningHours): string {
  if (!entry.opens || !entry.closes) return 'Closed';
  return `${formatClock12(entry.opens)} – ${formatClock12(entry.closes)}`;
}

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

export interface OpeningStatus {
  open: boolean;
  label: string;
  today: Day | null;
}

/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingStatus(
  hours: readonly OpeningHours[],
  timeZone: string,
  now = new Date(),
): OpeningStatus {
  const fallback: OpeningStatus = { open: false, label: 'See our hours', today: null };
  if (!timeZone) return fallback;
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return fallback;
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return fallback;
  const todayDay = DAYS[index];
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === todayDay)!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return { open: true, label: `Open now until ${formatClock12(today.closes)}`, today: todayDay };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      return {
        open: false,
        label: `Opens ${offset === 0 ? 'today' : day} at ${formatClock12(entry.opens)}`,
        today: todayDay,
      };
    }
  }
  return { open: false, label: 'See our hours', today: todayDay };
}

/** Convenience string helper matching the starter's API. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  return openingStatus(hours, timeZone, now).label;
}
