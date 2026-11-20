'use client';

import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { formatHoursRange, openingStatus, type Day, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Full weekly hours table that always renders statically and highlights today's row in the browser
 * using the studio's America/Chicago time zone (refreshed every minute).
 */
export function WeeklyHoursTable({
  hours = business.hours,
  compact = false,
}: {
  hours?: readonly OpeningHours[];
  compact?: boolean;
}) {
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const zone = site.timeZone || business.timeZone;
    const update = () => setToday(openingStatus(hours, zone).today);
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  return (
    <table className={`w-full border-collapse ${compact ? 'text-sm' : 'text-[0.95rem]'}`}>
      <caption className="sr-only">Weekly studio opening hours</caption>
      <thead>
        <tr className="sr-only">
          <th scope="col">Day</th>
          <th scope="col">Hours</th>
        </tr>
      </thead>
      <tbody>
        {hours.map(entry => {
          const isToday = today === entry.day;
          const closed = !entry.opens || !entry.closes;
          return (
            <tr
              key={entry.day}
              data-today={isToday ? 'true' : undefined}
              className={`border-b border-line last:border-b-0 ${isToday ? 'text-ink' : ''}`}
            >
              <th
                scope="row"
                className={`py-2.5 text-left font-normal ${isToday ? 'font-semibold text-accent-ink' : 'text-ink'}`}
              >
                <span className="inline-flex items-center gap-2">
                  <span>{entry.day}</span>
                  {isToday ? (
                    <span className="font-display text-sm font-normal italic text-muted">today</span>
                  ) : null}
                </span>
              </th>
              <td
                className={`tabular py-2.5 text-right ${
                  isToday ? 'font-semibold text-accent-ink' : closed ? 'text-muted' : 'text-ink'
                }`}
              >
                {formatHoursRange(entry)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
