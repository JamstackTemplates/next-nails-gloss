import type { ReactNode } from 'react';
import type { NailShape } from '../content/lookbook';
import type { Shade } from '../content/shades';
import { NailTipSvg } from './art/nail-tip';

/**
 * Inner page head: a large Didone title on the left and, on the right, three oversized lacquered
 * nails in the page's shades, set inside the nail-arch frame and cropped by the page edge.
 */
export function PageHead({
  title,
  children,
  id,
  shades = [],
  shape = 'almond',
  aside,
}: {
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Up to three shades painted on the head's nails, left to right. */
  shades?: readonly (Shade | undefined)[];
  shape?: NailShape;
  /** Replaces the nail art with custom content (e.g. lookbook filters). */
  aside?: ReactNode;
}) {
  const painted = shades.filter((s): s is Shade => Boolean(s)).slice(0, 3);

  return (
    <div className="overflow-x-clip border-b border-line">
      <header className="wrap grid items-end gap-10 pt-14 sm:pt-20 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="pb-12 sm:pb-16">
          <h1 id={id} className="display-lg max-w-[14ch] text-ink">
            {title}
          </h1>
          {children ? (
            <div className="mt-6 max-w-[48ch] text-[1.075rem] leading-relaxed text-muted sm:text-lg">{children}</div>
          ) : null}
        </div>

        {aside ? (
          <div className="pb-12 sm:pb-16">{aside}</div>
        ) : painted.length ? (
          <div aria-hidden="true" className="relative mx-auto hidden h-[22rem] w-full max-w-[22rem] self-end sm:block">
            <div className="nail-arch absolute inset-x-6 bottom-0 top-0" />
            <div className="absolute inset-0 flex items-end justify-center gap-3 overflow-hidden">
              {painted.map((shade, index) => (
                <NailTipSvg
                  key={shade.id}
                  shape={shape}
                  baseHex={shade.hex}
                  finish={shade.finish}
                  pattern={shade.finish === 'chrome' ? 'chrome' : 'solid'}
                  className={`h-auto drop-shadow-[0_18px_22px_rgba(40,8,18,0.25)] ${
                    index === 1 ? 'mb-[-1.5rem] w-28' : 'mb-[-4rem] w-24'
                  } ${index === 0 ? '-rotate-[10deg]' : index === 2 ? 'rotate-[10deg]' : ''}`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
