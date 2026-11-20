'use client';

import { useState, type ReactNode } from 'react';
import { filterLookbook, lookbookDesigns, type LookbookDesign } from '../content/lookbook';
import { servicesByCategory } from '../content/menu';
import { COLOUR_FAMILIES, shadeById, type ColourFamily } from '../content/shades';
import { NailTipSvg } from './art/nail-tip';
import { PageHead } from './page-head';
import { PressOnCard } from './press-on-card';

export interface LookbookExplorerProps {
  title: ReactNode;
  introduction: ReactNode;
  designs?: readonly LookbookDesign[];
}

const chip = (pressed: boolean) =>
  `inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
    pressed ? 'border-ink bg-ink text-bg' : 'border-line-strong text-ink hover:border-ink'
  }`;

/**
 * Interactive Lookbook: colour-family and technique filters (real buttons with aria-pressed) that
 * combine, a live count and an "All designs" reset. Without JavaScript all designs render and the
 * filter bar is hidden.
 */
export function LookbookExplorer({ title, introduction, designs = lookbookDesigns }: LookbookExplorerProps) {
  const [family, setFamily] = useState<ColourFamily | 'all'>('all');
  const [technique, setTechnique] = useState<string | 'all'>('all');

  const nailArtServices = servicesByCategory('nail-art');
  const visible = filterLookbook(designs, { family, technique });
  const isFiltered = family !== 'all' || technique !== 'all';
  const reset = () => {
    setFamily('all');
    setTechnique('all');
  };

  return (
    <>
      <PageHead
        title={title}
        shape="stiletto"
        shades={[shadeById('opal-aura'), shadeById('midnight-plum'), shadeById('silver-mirror')]}
      >
        {introduction}
      </PageHead>

      <noscript>
        <style>{`.lookbook-filters { display: none !important; }`}</style>
      </noscript>

      <section aria-label="Nail-art designs">
        <div className="lookbook-filters z-30 lg:sticky lg:top-[4.25rem] border-b border-line bg-bg/90 backdrop-blur-lg">
          <div className="wrap flex flex-col gap-4 py-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by colour family">
                <span className="mr-2 w-20 font-display italic text-muted">Colour</span>
                <button type="button" aria-pressed={family === 'all'} onClick={() => setFamily('all')} className={chip(family === 'all')}>
                  All
                </button>
                {COLOUR_FAMILIES.map(entry => {
                  const pressed = family === entry.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => setFamily(pressed ? 'all' : entry.id)}
                      className={chip(pressed)}
                    >
                      <NailTipSvg shape="oval" baseHex={entry.swatchHex} className="h-4 w-auto" />
                      <span>{entry.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by technique">
                <span className="mr-2 w-20 font-display italic text-muted">Technique</span>
                <button type="button" aria-pressed={technique === 'all'} onClick={() => setTechnique('all')} className={chip(technique === 'all')}>
                  All
                </button>
                {nailArtServices.map(service => {
                  const pressed = technique === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => setTechnique(pressed ? 'all' : service.id)}
                      className={chip(pressed)}
                    >
                      {service.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4 lg:flex-col lg:items-end">
              <p role="status" aria-live="polite" className="m-0 font-display text-2xl text-ink">
                {visible.length} {visible.length === 1 ? 'design' : 'designs'}
              </p>
              <button
                type="button"
                aria-pressed={!isFiltered}
                onClick={reset}
                className="text-sm text-accent-ink underline underline-offset-4 aria-pressed:text-muted aria-pressed:no-underline"
              >
                All designs
              </button>
            </div>
          </div>
        </div>

        <div className="wrap py-14 sm:py-20">
          {visible.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-3xl text-ink">No sets match both filters yet.</p>
              <p className="mt-3 text-muted">Clear a filter, or describe your own reference picture in an enquiry.</p>
              <button type="button" onClick={reset} className="button mt-8">
                Show all {designs.length} designs
              </button>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map(design => (
                <PressOnCard key={design.id} design={design} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
