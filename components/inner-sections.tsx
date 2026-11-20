import type { ReactNode } from 'react';
import { aftercareGuides, careDonts, careDos, first24HoursChecklist } from '../content/aftercare';
import { business } from '../content/business';
import { formatDuration, formatPrice, servicesByCategory, type ServiceCategory } from '../content/menu';
import { shadeById } from '../content/shades';
import { mapDirectionsUrl } from '../lib/maps';
import { NailTipSvg } from './art/nail-tip';
import { PolishBottleSvg } from './art/polish-bottle';
import { CopyEmail } from './copy-email';
import { WeeklyHoursTable } from './hours-card';
import { JamstacksSupportForm } from './jamstacks-support-form';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

/* ==========================================================================
   MENU
   ========================================================================== */

const JUMPS = [
  { href: '#manicures', label: 'Manicures' },
  { href: '#pedicures', label: 'Pedicures' },
  { href: '#nail-art', label: 'Nail art' },
  { href: '#add-ons', label: 'Add-ons & removals' },
] as const;

export function MenuJumpBar() {
  return (
    <nav aria-label="Menu categories" className="sticky top-[4.25rem] z-30 border-b border-line bg-bg/85 backdrop-blur-lg">
      <ul className="wrap m-0 flex list-none gap-1 overflow-x-auto p-0 py-2">
        {JUMPS.map(jump => (
          <li key={jump.href} className="shrink-0">
            <a
              href={jump.href}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-ink no-underline hover:bg-raised"
            >
              {jump.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const CATEGORY_SHADE: Record<Exclude<ServiceCategory, 'add-ons'>, string> = {
  manicures: 'raspberry-gloss',
  pedicures: 'oat-milk',
  'nail-art': 'midnight-plum',
};

export function MenuPriceBoard({
  id,
  category,
  title,
  intro,
  tinted = false,
}: {
  id: string;
  category: Exclude<ServiceCategory, 'add-ons'>;
  title: ReactNode;
  intro: ReactNode;
  tinted?: boolean;
}) {
  const items = servicesByCategory(category);
  const hex = shadeById(CATEGORY_SHADE[category])?.hex ?? '#8C1230';

  return (
    <section id={id} className={`scroll-mt-32 ${tinted ? 'bg-surface' : ''}`}>
      <div className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <h2 className="display-lg text-ink">{title}</h2>
          <p className="mt-5 max-w-[38ch] leading-relaxed text-muted">{intro}</p>
          <div aria-hidden="true" className="mt-10 hidden h-64 w-40 items-end justify-center rounded-t-full bg-raised pb-3 lg:flex">
            <PolishBottleSvg hex={hex} className="h-auto w-20" />
          </div>
        </div>

        <ul className="m-0 list-none divide-y divide-line border-y border-line p-0">
          {items.map(service => (
            <li key={service.id} className={`py-6 ${!service.available ? 'opacity-60' : ''}`}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-2xl text-ink">{service.name}</h3>
                {service.popular ? <span className="text-sm italic text-accent-ink">Popular</span> : null}
                {!service.available ? <span className="text-sm italic text-muted">Taking a break</span> : null}
                <span aria-hidden="true" className="menu-leader hidden sm:block" />
                <span className="tabular ml-auto font-display text-2xl text-ink sm:ml-0">
                  {formatPrice(service.priceUsd, service.priceFrom)}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className="max-w-[56ch] text-[0.95rem] leading-relaxed text-muted">{service.description}</p>
                <p className="tabular m-0 text-sm text-muted">{formatDuration(service.durationMinutes)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MenuAddOnsStrip({ title, intro }: { title: ReactNode; intro: ReactNode }) {
  const addons = servicesByCategory('add-ons');

  return (
    <section id="add-ons" className="scroll-mt-32 border-t border-line">
      <div className="wrap py-16 sm:py-24">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <h2 className="display-md text-ink">{title}</h2>
          <p className="max-w-[44ch] leading-relaxed text-muted lg:justify-self-end">{intro}</p>
        </div>

        <ul className="m-0 mt-10 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 sm:grid-cols-2 lg:grid-cols-4">
          {addons.map(item => (
            <li key={item.id} className={`flex flex-col bg-bg p-6 ${!item.available ? 'opacity-60' : ''}`}>
              <h3 className="font-display text-xl text-ink">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
              {!item.available ? <p className="mt-2 text-sm italic text-muted">Taking a break</p> : null}
              <p className="mt-5 flex items-baseline justify-between">
                <span className="tabular font-display text-2xl text-ink">{formatPrice(item.priceUsd, item.priceFrom)}</span>
                <span className="tabular text-sm text-muted">{formatDuration(item.durationMinutes)}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MenuPolicySign({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <section className="wrap pb-20 sm:pb-24">
      <div className="grid gap-6 border-t border-line-strong pt-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <h2 className="font-display text-3xl text-ink">{heading}</h2>
        <div className="max-w-[60ch] space-y-4 leading-relaxed text-muted">{children}</div>
      </div>
    </section>
  );
}

/* ==========================================================================
   AFTERCARE
   ========================================================================== */

export function First24HoursSection({ title, intro }: { title: ReactNode; intro: ReactNode }) {
  return (
    <section className="wrap py-16 sm:py-24">
      <div className="grid items-end gap-6 lg:grid-cols-2">
        <h2 className="display-md max-w-[14ch] text-ink">{title}</h2>
        <p className="max-w-[44ch] leading-relaxed text-muted lg:justify-self-end">{intro}</p>
      </div>

      <ol className="m-0 mt-12 grid list-none gap-10 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {first24HoursChecklist.map(item => (
          <li key={item.hourLabel} className="border-t border-line-strong pt-5">
            <p className="tabular m-0 font-display text-lg italic text-accent-ink">{item.hourLabel}</p>
            <h3 className="mt-3 font-display text-2xl text-ink">{item.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AftercareBottleLabels({ title }: { title: ReactNode }) {
  return (
    <section className="border-y border-line bg-surface">
      <div className="wrap py-16 sm:py-24">
        <h2 className="display-md max-w-[16ch] text-ink">{title}</h2>

        <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {aftercareGuides.map(guide => (
            <article key={guide.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line-strong pb-4">
                <div>
                  <h3 className="font-display text-3xl text-ink">{guide.title}</h3>
                  <p className="mt-1 text-sm text-muted">{guide.subtitle}</p>
                </div>
                <p className="tabular m-0 text-sm text-muted">
                  Refresh every {guide.returnAfterWeeks.min}–{guide.returnAfterWeeks.max} weeks
                </p>
              </div>
              <ol className="m-0 mt-5 list-none space-y-3 p-0">
                {guide.steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[1.75rem_1fr] leading-relaxed text-ink">
                    <span className="tabular font-display italic text-accent-ink">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DoAndDontSplit({ doHeading, dontHeading }: { doHeading: ReactNode; dontHeading: ReactNode }) {
  return (
    <section className="wrap py-16 sm:py-24">
      <div className="grid overflow-hidden rounded-3xl md:grid-cols-2">
        <div className="bg-raised p-8 sm:p-12">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">{doHeading}</h2>
          <ul className="m-0 mt-6 list-none space-y-3 p-0 leading-relaxed text-ink">
            {careDos.map(item => (
              <li key={item} className="grid grid-cols-[1.5rem_1fr]">
                <span aria-hidden="true" className="text-accent-ink">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-night p-8 text-night-ink sm:p-12">
          <h2 className="font-display text-3xl text-night-ink sm:text-4xl">{dontHeading}</h2>
          <ul className="m-0 mt-6 list-none space-y-3 p-0 leading-relaxed text-night-ink">
            {careDonts.map(item => (
              <li key={item} className="grid grid-cols-[1.5rem_1fr]">
                <span aria-hidden="true" className="text-night-accent">–</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const RULER_SHADES = ['raspberry-gloss', 'oat-milk', 'midnight-plum', 'petal-pink'] as const;

export function ReturnTimelineRuler({ title, intro }: { title: ReactNode; intro: ReactNode }) {
  const maxWeek = 6;

  return (
    <section className="wrap pb-16 sm:pb-24">
      <div className="grid items-end gap-6 lg:grid-cols-2">
        <h2 className="display-md max-w-[14ch] text-ink">{title}</h2>
        <p className="max-w-[44ch] leading-relaxed text-muted lg:justify-self-end">{intro}</p>
      </div>

      <div className="mt-12">
        <div className="ml-0 grid grid-cols-6 border-b border-line-strong pb-2 text-xs text-muted sm:ml-[12rem]">
          {[1, 2, 3, 4, 5, 6].map(week => (
            <span key={week} className="tabular">
              Week {week}
            </span>
          ))}
        </div>
        <ul className="m-0 mt-4 list-none space-y-4 p-0">
          {aftercareGuides.map((guide, index) => {
            const start = ((guide.returnAfterWeeks.min - 1) / maxWeek) * 100;
            const width = ((guide.returnAfterWeeks.max - guide.returnAfterWeeks.min + 1) / maxWeek) * 100;
            const hex = shadeById(RULER_SHADES[index % RULER_SHADES.length])?.hex ?? '#8C1230';
            return (
              <li key={guide.id} className="grid items-center gap-2 sm:grid-cols-[12rem_1fr]">
                <span className="text-sm text-ink">
                  {guide.title}{' '}
                  <span className="tabular text-muted sm:hidden">
                    ({guide.returnAfterWeeks.min}–{guide.returnAfterWeeks.max} weeks)
                  </span>
                </span>
                <div className="relative h-3 rounded-full bg-raised">
                  <div
                    className="absolute inset-y-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                    style={{ left: `${start}%`, width: `${width}%`, backgroundColor: hex }}
                    title={`${guide.returnAfterWeeks.min}–${guide.returnAfterWeeks.max} weeks`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function RemovalAdviceBox({ title, children, linkLabel }: { title: ReactNode; children: ReactNode; linkLabel: ReactNode }) {
  return (
    <section className="wrap pb-20 sm:pb-24">
      <div className="flex flex-col items-start justify-between gap-8 border-t border-line-strong pt-10 md:flex-row md:items-end">
        <div>
          <h2 className="display-md max-w-[18ch] text-ink">{title}</h2>
          <div className="mt-5 max-w-[56ch] leading-relaxed text-muted">{children}</div>
        </div>
        <SiteLink href="/menu/#add-ons" className="button shrink-0">
          {linkLabel}
        </SiteLink>
      </div>
    </section>
  );
}

/* ==========================================================================
   CONTACT
   ========================================================================== */

export function ContactLayout({
  hosted,
  siteId,
  embedUrl,
  guidanceHeading,
  formHeading,
  fallbackHeading,
  fallbackCopy,
  replyReminder,
}: {
  hosted: boolean;
  siteId: string;
  embedUrl: string;
  guidanceHeading: ReactNode;
  formHeading: ReactNode;
  fallbackHeading: ReactNode;
  fallbackCopy: ReactNode;
  replyReminder: ReactNode;
}) {
  const directionsUrl = mapDirectionsUrl(business.directionsQuery);

  return (
    <div className="wrap grid items-start gap-14 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <aside aria-label="Studio contact details and enquiry guide" className="space-y-12">
        <div>
          <h2 className="font-display text-3xl text-ink">{guidanceHeading}</h2>
          <ul className="m-0 mt-5 list-none space-y-3 p-0 leading-relaxed text-ink">
            {business.enquiries.usefulToInclude.map(tip => (
              <li key={tip} className="grid grid-cols-[1.25rem_1fr]">
                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">{replyReminder}</p>
        </div>

        <div>
          <h2 className="font-display text-3xl text-ink">Reach the studio directly</h2>
          <div className="mt-5 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <a className="text-link wrap-anywhere text-lg" href={`mailto:${business.email}`}>
                {business.email}
              </a>
              <CopyEmail email={business.email} />
            </div>
            {business.phone ? (
              <p>
                <a className="text-link tabular text-lg" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                  {business.phone}
                </a>
              </p>
            ) : null}
            <div className="pt-2 text-muted">
              <p className="text-ink">{business.address.full}</p>
              <p>{business.landmark}</p>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-1 inline-block text-sm">
                Get directions on Google Maps
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-strong pb-3">
            <h2 className="font-display text-3xl text-ink">Studio hours</h2>
            <OpenBadge hours={business.hours} />
          </div>
          <WeeklyHoursTable hours={business.hours} compact />
          <TimeZoneNote />
        </div>
      </aside>

      <section aria-label="Appointment enquiry form" className="rounded-3xl bg-surface p-6 shadow-[0_30px_60px_-40px_var(--art-shadow)] sm:p-10">
        <h2 className="font-display text-4xl text-ink">{formHeading}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{business.enquiries.replyNote}</p>

        <div className="mt-8">
          {hosted ? (
            <JamstacksSupportForm siteId={siteId} embedUrl={embedUrl} email={business.email} />
          ) : (
            <div className="rounded-2xl border border-line p-6">
              <h3 className="font-display text-2xl text-ink">{fallbackHeading}</h3>
              <p className="mt-2 leading-relaxed text-muted">{fallbackCopy}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={`mailto:${business.email}`} className="button">
                  Email {business.email}
                </a>
                {business.phone ? (
                  <a href={`tel:${business.phone.replace(/[^\d+]/g, '')}`} className="button button-quiet tabular">
                    Call {business.phone}
                  </a>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   404
   ========================================================================== */

export function NotFoundScene({ heading, copy }: { heading: ReactNode; copy: ReactNode }) {
  const hex = shadeById('raspberry-gloss')?.hex ?? '#8C1230';
  return (
    <section className="wrap grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_auto]">
      <div>
        <p className="kicker">Error 404</p>
        <h1 className="display-xl mt-3 max-w-[12ch] text-ink">{heading}</h1>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">{copy}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <SiteLink href="/" className="button">
            Back to home
          </SiteLink>
          <SiteLink href="/menu/" className="button button-quiet">
            See the menu
          </SiteLink>
          <SiteLink href="/lookbook/" className="button button-quiet">
            Open the lookbook
          </SiteLink>
        </div>
      </div>

      {/* A nail with its lacquer dragged off the edge */}
      <div aria-hidden="true" className="relative mx-auto h-80 w-64">
        <div className="nail-arch absolute inset-0" />
        <svg viewBox="0 0 200 260" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="smudge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={hex} stopOpacity="0.9" />
              <stop offset="100%" stopColor={hex} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M112 120 C140 150 170 190 196 250 L160 252 C150 210 128 170 100 140 Z" fill="url(#smudge)" />
        </svg>
        <NailTipSvg shape="almond" baseHex={hex} finish="jelly" className="absolute left-1/2 top-1/2 h-auto w-28 -translate-x-1/2 -translate-y-1/2 -rotate-12" />
      </div>
    </section>
  );
}
