import type { LookbookDesign } from '../content/lookbook';
import { serviceById } from '../content/menu';
import { COLOUR_FAMILIES } from '../content/shades';
import { FiveNailTips } from './art/nail-tip';
import { SiteLink } from './site-link';

const FAMILY_LABELS = Object.fromEntries(COLOUR_FAMILIES.map(f => [f.id, f.label]));

const SHAPE_LABELS: Record<LookbookDesign['shape'], string> = {
  almond: 'Almond',
  coffin: 'Coffin',
  square: 'Square',
  oval: 'Oval',
  stiletto: 'Stiletto',
};

/**
 * One lookbook set: five SVG nails in the design's shape, shown on a soft arch, then the
 * design's name, note, shape, colour family and the technique it's priced under.
 */
export function PressOnCard({
  design,
  showDetails = true,
  className = '',
}: {
  design: LookbookDesign;
  showDetails?: boolean;
  className?: string;
}) {
  const technique = serviceById(design.technique);
  const familyLabel = FAMILY_LABELS[design.family] ?? design.family;

  return (
    <article className={`set-card flex flex-col ${className}`}>
      <div className="relative overflow-hidden rounded-t-[999px] rounded-b-xl bg-raised px-4 pt-12 pb-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/[0.06] to-transparent"
        />
        <FiveNailTips nails={design.nails} shape={design.shape} title={design.title} className="relative" />
      </div>

      <div className="pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl text-ink">{design.title}</h3>
          <p className="m-0 shrink-0 text-xs text-muted">
            {SHAPE_LABELS[design.shape]}, {familyLabel.toLowerCase()}
          </p>
        </div>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{design.note}</p>

        {showDetails && technique ? (
          <p className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <SiteLink href="/menu/#nail-art" className="text-link">
              {technique.name}
            </SiteLink>
            <span className="tabular text-muted">
              {technique.priceFrom ? `from $${technique.priceUsd}` : `$${technique.priceUsd}`}
            </span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
