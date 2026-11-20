import type { ReactNode } from 'react';
import { business } from '../content/business';
import { featuredDesigns } from '../content/lookbook';
import { categoryFromPrice, type ServiceCategory } from '../content/menu';
import { featuredShade, heroPhotoFor, shadeById, shades } from '../content/shades';
import { asset } from '../lib/paths';
import { mapDirectionsUrl } from '../lib/maps';
import { HeroHand } from './art/hero-hand';
import { NailTipSvg } from './art/nail-tip';
import { PolishBottleSvg } from './art/polish-bottle';
import { WeeklyHoursTable } from './hours-card';
import { OpenBadge } from './open-badge';
import { PressOnCard } from './press-on-card';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type ChildrenProps = { children: ReactNode };

/* --------------------------------------------------------------------------
   1. HomeHero — headline left; a hand rises into the nail arch on the right,
      lacquered in the shade of the month.
   -------------------------------------------------------------------------- */
function HomeHeroRoot({ children }: ChildrenProps) {
  const star = featuredShade();
  const photo = heroPhotoFor(star);
  return (
    <section className="relative overflow-x-clip">
      <div className="wrap grid items-end gap-8 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:pt-16">
        <div className="relative z-10 flex flex-col items-start pb-4 lg:pb-24">{children}</div>

        <figure className="relative m-0 mx-auto w-full max-w-[36rem] self-end">
          {photo ? (
            <div className="hero-rise relative mx-[3%] aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[1.25rem] bg-raised shadow-[0_40px_80px_-50px_var(--art-shadow)]">
              {/* One photo per theme; CSS shows the one matching the active light/dark mode */}
              <img
                src={asset(photo.light)}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                fetchPriority="high"
                decoding="async"
                className="hero-photo-light absolute inset-0 h-full w-full object-cover"
              />
              <img
                src={asset(photo.dark)}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="hero-photo-dark absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : (
            <>
              <div className="nail-arch absolute inset-x-[8%] bottom-0 top-[4%]" aria-hidden="true" />
              <HeroHand hex={star.hex} className="hero-rise relative block h-auto w-full" />
            </>
          )}
          <figcaption className="absolute bottom-5 right-0 rounded-full bg-surface/90 px-4 py-2 text-xs text-muted shadow-[0_10px_30px_-16px_var(--art-shadow)] backdrop-blur sm:right-4">
            Wearing <span className="font-semibold text-ink">{star.name}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function HeroHeading({ children }: ChildrenProps) {
  return <h1 className="display-xl max-w-[11ch] text-ink">{children}</h1>;
}

function HeroSubcopy({ children }: ChildrenProps) {
  return <p className="mt-7 max-w-[40ch] text-[1.075rem] leading-relaxed text-muted sm:text-lg">{children}</p>;
}

function HeroActions({ primary, secondary }: { primary: ReactNode; secondary: ReactNode }) {
  return (
    <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
      <SiteLink href="/contact/" className="button min-h-13 w-full px-8 sm:w-auto">
        {primary}
      </SiteLink>
      <SiteLink href="/menu/" className="button button-quiet min-h-13 w-full sm:w-auto">
        {secondary}
      </SiteLink>
    </div>
  );
}

function HeroStatus() {
  return (
    <div className="mt-6">
      <OpenBadge hours={business.hours} />
    </div>
  );
}

export const HomeHero = Object.assign(HomeHeroRoot, {
  Heading: HeroHeading,
  Subcopy: HeroSubcopy,
  Actions: HeroActions,
  Status: HeroStatus,
});

/* --------------------------------------------------------------------------
   2. PolishRack — three tall bottles, one per menu category, with "from"
      prices derived from available services.
   -------------------------------------------------------------------------- */
const RACK: readonly {
  category: Exclude<ServiceCategory, 'add-ons'>;
  href: string;
  shadeId: string;
  label: string;
}[] = [
  { category: 'manicures', href: '/menu/#manicures', shadeId: 'raspberry-gloss', label: 'Manicures' },
  { category: 'pedicures', href: '/menu/#pedicures', shadeId: 'oat-milk', label: 'Pedicures' },
  { category: 'nail-art', href: '/menu/#nail-art', shadeId: 'midnight-plum', label: 'Nail art' },
];

function PolishRackRoot({ children }: ChildrenProps) {
  return (
    <section className="border-t border-line bg-surface">
      <div className="wrap py-20 sm:py-28">{children}</div>
    </section>
  );
}

function PolishRackHeader({ title, copy }: { title: ReactNode; copy: ReactNode }) {
  return (
    <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
      <h2 className="display-lg max-w-[12ch] text-ink">{title}</h2>
      <p className="max-w-[42ch] text-lg leading-relaxed text-muted lg:justify-self-end">{copy}</p>
    </div>
  );
}

function PolishRackShelf({ descriptions }: { descriptions: Record<'manicures' | 'pedicures' | 'nail-art', string> }) {
  return (
    <ul className="m-0 mt-14 grid list-none gap-12 p-0 sm:mt-20 md:grid-cols-3 md:gap-8">
      {RACK.map(item => {
        const minPrice = categoryFromPrice(item.category);
        const hex = shadeById(item.shadeId)?.hex ?? '#8C1230';
        return (
          <li key={item.category}>
            <SiteLink href={item.href} className="group grid grid-cols-[5.5rem_1fr] items-end gap-6 text-ink no-underline hover:no-underline md:grid-cols-1">
              <div className="flex h-56 items-end justify-center rounded-t-full bg-bg pb-3 md:h-80">
                <PolishBottleSvg
                  hex={hex}
                  className="h-auto w-16 transition-transform duration-500 ease-out group-hover:-translate-y-2 md:w-24"
                />
              </div>
              <div className="border-t border-line-strong pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl text-ink">{item.label}</h3>
                  <p className="tabular m-0 whitespace-nowrap text-sm text-muted">
                    {minPrice !== null ? (
                      <>
                        from <span className="font-display text-2xl text-ink">${minPrice}</span>
                      </>
                    ) : (
                      'See menu'
                    )}
                  </p>
                </div>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{descriptions[item.category]}</p>
                <span className="mt-3 inline-block text-sm font-medium text-accent-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
                  See {item.label.toLowerCase()} prices
                </span>
              </div>
            </SiteLink>
          </li>
        );
      })}
    </ul>
  );
}

export const PolishRack = Object.assign(PolishRackRoot, {
  Header: PolishRackHeader,
  Shelf: PolishRackShelf,
});

/* --------------------------------------------------------------------------
   3. ShadeOfTheMonth — the night band. One giant nail in the featured shade
      and the full rack of twelve below, the featured tip raised.
   -------------------------------------------------------------------------- */
const FINISH_LABELS = { cream: 'Cream finish', jelly: 'Jelly finish', shimmer: 'Shimmer finish', chrome: 'Chrome finish' } as const;

export function ShadeOfTheMonth({ label, ctaLabel }: { label: ReactNode; ctaLabel: ReactNode }) {
  const star = featuredShade(shades);

  return (
    <section aria-labelledby="shade-of-the-month-heading" className="overflow-x-clip bg-night text-night-ink">
      <div className="wrap grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative flex justify-center">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px]"
            style={{ backgroundColor: star.hex }}
          />
          <NailTipSvg
            shape="almond"
            baseHex={star.hex}
            finish={star.finish}
            pattern={star.finish === 'chrome' ? 'chrome' : 'solid'}
            className="relative h-auto w-44 -rotate-6 drop-shadow-[0_40px_40px_rgba(0,0,0,0.55)] sm:w-56"
          />
        </div>

        <div>
          <p className="kicker !text-night-muted">{label}</p>
          <h2 id="shade-of-the-month-heading" className="display-xl mt-3 italic text-night-ink">
            {star.name}
          </h2>
          <p className="mt-6 max-w-[36ch] text-xl leading-relaxed text-night-muted">{star.story}</p>
          <p className="tabular mt-4 text-sm text-night-muted">
            {FINISH_LABELS[star.finish]}, {star.hex.toUpperCase()}
          </p>
          <div className="mt-8">
            <SiteLink href="/contact/" className="button">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>

      <div className="border-t border-night-line">
        <div className="wrap py-10">
          <h3 className="sr-only">The full polish rack</h3>
          <ul className="m-0 flex list-none items-end justify-between gap-1 overflow-x-auto p-0 pb-2 sm:gap-3">
            {shades.map(shade => {
              const isStar = shade.id === star.id;
              return (
                <li key={shade.id} className="flex shrink-0 flex-col items-center gap-2">
                  <NailTipSvg
                    shape="almond"
                    baseHex={shade.hex}
                    finish={shade.finish}
                    pattern={shade.finish === 'chrome' ? 'chrome' : 'solid'}
                    className={`h-auto transition-transform ${isStar ? 'w-9 -translate-y-2 sm:w-11' : 'w-6 sm:w-8'}`}
                  />
                  <span className={`whitespace-nowrap text-[0.68rem] ${isStar ? 'text-night-ink' : 'text-night-muted'} hidden md:block`}>
                    {shade.name}
                  </span>
                  <span className="sr-only md:hidden">{shade.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   4. FreshFromTheTable — six featured sets
   -------------------------------------------------------------------------- */
function FreshFromTheTableRoot({ children }: ChildrenProps) {
  return (
    <section>
      <div className="wrap py-20 sm:py-28">{children}</div>
    </section>
  );
}

function FreshHeader({ title, copy }: { title: ReactNode; copy: ReactNode }) {
  return (
    <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
      <h2 className="display-lg max-w-[12ch] text-ink">{title}</h2>
      <p className="max-w-[42ch] text-lg leading-relaxed text-muted lg:justify-self-end">{copy}</p>
    </div>
  );
}

function FreshStrip() {
  const picks = featuredDesigns();
  return (
    <div
      tabIndex={0}
      aria-label="Featured nail-art sets. Scroll sideways on narrow screens."
      className="set-strip mt-12 focus-visible:rounded-2xl sm:mt-16"
    >
      {picks.map(design => (
        <PressOnCard key={design.id} design={design} />
      ))}
    </div>
  );
}

function FreshAction({ children }: ChildrenProps) {
  return (
    <div className="mt-12 flex justify-center">
      <SiteLink href="/lookbook/" className="button button-quiet px-8">
        {children}
      </SiteLink>
    </div>
  );
}

export const FreshFromTheTable = Object.assign(FreshFromTheTableRoot, {
  Header: FreshHeader,
  Strip: FreshStrip,
  Action: FreshAction,
});

/* --------------------------------------------------------------------------
   5. HowAVisitGoes — a real sequence, so numbered
   -------------------------------------------------------------------------- */
function HowAVisitGoesRoot({ children }: ChildrenProps) {
  return (
    <section className="border-y border-line bg-surface">
      <div className="wrap py-20 sm:py-28">{children}</div>
    </section>
  );
}

function VisitHeader({ title }: { title: ReactNode }) {
  return <h2 className="display-lg max-w-[14ch] text-ink">{title}</h2>;
}

function VisitSteps({ steps }: { steps: readonly { title: string; detail: string }[] }) {
  return (
    <ol className="m-0 mt-14 grid list-none gap-10 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {steps.map((step, index) => (
        <li key={step.title} className="border-t border-line-strong pt-6">
          <span aria-hidden="true" className="font-display text-6xl italic leading-none text-accent-ink">
            {index + 1}
          </span>
          <h3 className="mt-5 font-display text-2xl text-ink">{step.title}</h3>
          <p className="mt-2 max-w-[32ch] leading-relaxed text-muted">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export const HowAVisitGoes = Object.assign(HowAVisitGoesRoot, {
  Header: VisitHeader,
  Steps: VisitSteps,
});

/* --------------------------------------------------------------------------
   6. FindTheStudio — address set large; hours alongside
   -------------------------------------------------------------------------- */
export function FindTheStudio({ title, directionsLabel }: { title: ReactNode; directionsLabel: ReactNode }) {
  const directionsUrl = mapDirectionsUrl(business.directionsQuery);

  return (
    <section>
      <div className="wrap grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <h2 className="display-lg max-w-[12ch] text-ink">{title}</h2>
          <address className="mt-10 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] not-italic leading-snug text-ink">
            {business.address.street}
            <br />
            {business.address.city}, {business.address.region} {business.address.postalCode}
          </address>
          <p className="mt-3 text-muted">{business.landmark}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="button">
              {directionsLabel}
            </a>
            <a href={`tel:${business.phone.replace(/[^\d+]/g, '')}`} className="button button-quiet tabular">
              {business.phone}
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            Or write to{' '}
            <a href={`mailto:${business.email}`} className="text-link">
              {business.email}
            </a>
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-strong pb-4">
            <h3 className="font-display text-3xl text-ink">Opening hours</h3>
            <OpenBadge hours={business.hours} />
          </div>
          <div className="mt-2">
            <WeeklyHoursTable hours={business.hours} />
          </div>
          <TimeZoneNote />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   7. ClosingCta — a full-bleed pour of wet lacquer, shared by every page.
   -------------------------------------------------------------------------- */
export function ClosingCta({
  title,
  copy,
  actionLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: ReactNode;
  copy?: ReactNode;
  actionLabel: ReactNode;
  secondaryHref?: string;
  secondaryLabel?: ReactNode;
}) {
  return (
    <section className="lacquer-band">
      <div className="wrap flex flex-col items-start py-20 sm:py-28 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <h2 className="display-lg max-w-[16ch] text-white">{title}</h2>
          {copy ? <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-white/80">{copy}</p> : null}
        </div>
        <div className="mt-10 flex shrink-0 flex-wrap gap-3 lg:mt-0">
          <SiteLink href="/contact/" className="button button-light px-8">
            {actionLabel}
          </SiteLink>
          {secondaryHref && secondaryLabel ? (
            <SiteLink href={secondaryHref} className="button button-ghost-light">
              {secondaryLabel}
            </SiteLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
