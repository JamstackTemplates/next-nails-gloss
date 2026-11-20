import type { Metadata } from 'next';
import {
  ClosingCta,
  FindTheStudio,
  FreshFromTheTable,
  HomeHero,
  HowAVisitGoes,
  PolishRack,
  ShadeOfTheMonth,
} from '../components/home-sections';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <HomeHero>
        <HomeHero.Heading>Ten tiny canvases. Endless colour.</HomeHero.Heading>
        <HomeHero.Subcopy>
          Gel, BIAB and classic manicures, unhurried pedicures and hand-painted nail art on South
          Congress. Bring a picture, or let us choose the shade.
        </HomeHero.Subcopy>
        <HomeHero.Actions primary="Ask about an appointment" secondary="See the menu" />
        <HomeHero.Status />
      </HomeHero>

      <PolishRack>
        <PolishRack.Header
          title="The polish rack"
          copy="Crisp classic polish, long-wear gel with a mirror top coat, or ten nails of hand-painted detail."
        />
        <PolishRack.Shelf
          descriptions={{
            manicures: 'Classic polish, gel, BIAB strengthening overlays and soft-gel extensions.',
            pedicures: 'Warm soaks, sugar scrubs, hot towels and toes that stay glossy for weeks.',
            'nail-art': 'Accent florals, micro French, chrome glazes and 3D charms.',
          }}
        />
      </PolishRack>

      <ShadeOfTheMonth label="Shade of the month" ctaLabel="Ask for this shade" />

      <FreshFromTheTable>
        <FreshFromTheTable.Header
          title="Fresh from the table"
          copy="Every set is painted to order. Quote a set’s name in your enquiry and we’ll paint it in your shape."
        />
        <FreshFromTheTable.Strip />
        <FreshFromTheTable.Action>Open the lookbook</FreshFromTheTable.Action>
      </FreshFromTheTable>

      <HowAVisitGoes>
        <HowAVisitGoes.Header title="How a visit goes" />
        <HowAVisitGoes.Steps
          steps={[
            {
              title: 'Send an enquiry',
              detail: 'Tell us the services, nail shape and days that suit you, plus any lookbook set you love.',
            },
            {
              title: 'We confirm a time by reply',
              detail: 'We check the chair and email you back with an open slot and a guide price.',
            },
            {
              title: 'Pick your shade',
              detail: 'Match your reference picture at the table, or let us choose something you wouldn’t.',
            },
            {
              title: 'Shine for weeks',
              detail: 'Leave with a mirror finish and a few simple habits to keep it that way.',
            },
          ]}
        />
      </HowAVisitGoes>

      <FindTheStudio title="Find the studio" directionsLabel="Get directions" />

      <ClosingCta
        title="Got a picture you love? Send it our way"
        copy="Tell us what you’d like painted, your preferred days and whether you need a soak-off first. We’ll reply to confirm a time."
        actionLabel="Ask about an appointment"
        secondaryHref="/menu/"
        secondaryLabel="Browse the full menu"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
    </>
  );
}
