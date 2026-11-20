import { business } from '../content/business';
import { formatHoursRange } from '../lib/hours';
import { SiteLink } from './site-link';

const FOOTER_LINKS = [
  { href: '/menu/', label: 'Menu & prices' },
  { href: '/lookbook/', label: 'Lookbook' },
  { href: '/aftercare/', label: 'Aftercare' },
  { href: '/contact/', label: 'Ask about an appointment' },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-night text-night-ink">
      <div className="wrap grid gap-12 pt-16 pb-10 md:grid-cols-[1.4fr_1fr_0.8fr] md:pt-20">
        <div>
          <SiteLink href="/" className="font-display text-[clamp(2.6rem,6vw,4.5rem)] italic leading-none tracking-[-0.04em] text-night-ink no-underline hover:no-underline">
            {business.wordmark}
          </SiteLink>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-night-muted">{business.introduction}</p>
          <div className="mt-6 space-y-1.5 text-sm">
            <p>
              <a href={`mailto:${business.email}`} className="text-night-ink underline decoration-night-line underline-offset-4 hover:decoration-night-ink">
                {business.email}
              </a>
            </p>
            {business.phone ? (
              <p>
                <a href={`tel:${business.phone.replace(/[^\d+]/g, '')}`} className="tabular text-night-ink underline decoration-night-line underline-offset-4 hover:decoration-night-ink">
                  {business.phone}
                </a>
              </p>
            ) : null}
            <p className="text-night-muted">{business.address.full}</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl italic text-night-ink">Hours</h2>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
            {business.hours.map(entry => (
              <div key={entry.day} className="contents">
                <dt className="text-night-muted">{entry.day}</dt>
                <dd className="tabular m-0 text-night-ink">{formatHoursRange(entry)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-xl italic text-night-ink">Explore</h2>
          <ul className="m-0 mt-4 list-none space-y-2 p-0 text-sm">
            {FOOTER_LINKS.map(link => (
              <li key={link.href}>
                <SiteLink href={link.href} className="text-night-ink no-underline hover:underline">
                  {link.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="wrap flex flex-wrap items-center justify-between gap-4 border-t border-night-line py-6 text-xs text-night-muted">
        <p>{business.name}, South Congress, Austin</p>
        <span title="Made with love by jamstacks.net">
          with <span role="img" aria-label="love">❤️</span>{' '}
          <a className="text-night-ink no-underline hover:underline" href="https://jamstacks.net">
            jamstacks.net
          </a>
        </span>
      </div>
    </footer>
  );
}
