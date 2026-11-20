import type { Metadata } from 'next';
import { shadeById } from '../../content/shades';
import { ClosingCta } from '../../components/home-sections';
import {
  AftercareBottleLabels,
  DoAndDontSplit,
  First24HoursSection,
  RemovalAdviceBox,
  ReturnTimelineRuler,
} from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Aftercare',
  description:
    'Keep gel, BIAB, classic polish, pedicures and hand-painted nail art glossy for weeks with our first-24-hour checklist and removal guide.',
  alternates: { canonical: absoluteUrl('/aftercare/') },
};

export default function AftercarePage() {
  return (
    <>
      <PageHead
        title="Aftercare"
        shape="oval"
        shades={[shadeById('oat-milk'), shadeById('opal-aura'), shadeById('petal-pink')]}
      >
        <p>
          A few small habits are the difference between a chip on day two and a finish that still
          looks fresh at your next appointment.
        </p>
      </PageHead>

      <First24HoursSection
        title="The first 24 hours"
        intro="Go easy on fresh polish and freshly prepped cuticles for a day so everything sets properly."
      />

      <AftercareBottleLabels title="Care for every finish" />

      <DoAndDontSplit doHeading="Do" dontHeading="Don’t" />

      <ReturnTimelineRuler
        title="When to come back"
        intro="Nails grow quickly. Coming back inside your window keeps the balance right and stops lifting before it starts."
      />

      <RemovalAdviceBox title="Never peel. Come in for a soak-off." linkLabel="See removal prices">
        <p>
          Peeling off gel, BIAB or extensions lifts the top layers of your natural nail and leaves it
          thin for months. A gentle twenty-minute soak-off with warm oil keeps nails strong and ready
          for the next shade.
        </p>
      </RemovalAdviceBox>

      <ClosingCta
        title="Time for a refresh?"
        copy="Tell us what’s on your nails now and when you’d like to come in. We’ll reply to confirm a time."
        actionLabel="Ask about an appointment"
        secondaryHref="/menu/"
        secondaryLabel="Check the menu"
      />
    </>
  );
}
