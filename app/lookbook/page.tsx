import type { Metadata } from 'next';
import { ClosingCta } from '../../components/home-sections';
import { LookbookExplorer } from '../../components/lookbook-gallery';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Lookbook',
  description:
    'Browse 14 hand-painted nail-art designs in almond, coffin, square, oval and stiletto shapes, filterable by colour family and technique.',
  alternates: { canonical: absoluteUrl('/lookbook/') },
};

export default function LookbookPage() {
  return (
    <>
      <LookbookExplorer
        title="The lookbook"
        introduction={
          <p>
            Fourteen signature sets painted from our own shade rack. Filter by colour or technique,
            and wear any of them in the nail shape you prefer.
          </p>
        }
      />

      <ClosingCta
        title="Want something like this?"
        copy="Quote the design’s name (like “Petal Party” or “Lilac Aura”) in your enquiry, or describe your own reference picture. We’ll reply to confirm a time."
        actionLabel="Ask about an appointment"
        secondaryHref="/menu/#nail-art"
        secondaryLabel="See nail-art prices"
      />
    </>
  );
}
