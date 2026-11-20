'use client';

import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { openingStatus, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-computed open-now chip using the studio's IANA time zone (America/Chicago),
 * refreshed every minute. Renders neutral "See our hours" without JavaScript.
 */
export function OpenBadge({
  hours = business.hours,
  className = '',
}: {
  hours?: readonly OpeningHours[];
  className?: string;
}) {
  const [status, setStatus] = useState<{ open: boolean; label: string; hydrated: boolean }>({
    open: false,
    label: 'See our hours',
    hydrated: false,
  });

  useEffect(() => {
    const zone = site.timeZone || business.timeZone;
    const update = () => {
      const next = openingStatus(hours, zone);
      setStatus({ open: next.open, label: next.label, hydrated: true });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-ink ${className}`}
    >
      <span aria-hidden="true" className="relative inline-flex h-2 w-2">
        <span
          className={`relative inline-block h-2 w-2 rounded-full ${
            !status.hydrated ? 'bg-line-strong' : status.open ? 'bg-accent' : 'bg-muted'
          }`}
        />
      </span>
      <span>{status.label}</span>
    </span>
  );
}
