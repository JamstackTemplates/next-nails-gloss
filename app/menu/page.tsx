import type { Metadata } from 'next';
import { shadeById } from '../../content/shades';
import { ClosingCta } from '../../components/home-sections';
import { MenuAddOnsStrip, MenuJumpBar, MenuPolicySign, MenuPriceBoard } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Menu & Prices',
  description:
    'Manicures, spa pedicures, hand-painted nail art and gentle soak-offs at Glossy Petal Nail Studio on South Congress.',
  alternates: { canonical: absoluteUrl('/menu/') },
};

export default function MenuPage() {
  return (
    <>
      <PageHead
        title="Menu & prices"
        shades={[shadeById('petal-pink'), shadeById('raspberry-gloss'), shadeById('cherry-soda')]}
      >
        <p>
          Every service in whole US dollars, with typical chair times. Pair any manicure or pedicure
          with hand-painted art, chrome or a gentle soak-off.
        </p>
      </PageHead>

      <MenuJumpBar />

      <MenuPriceBoard
        id="manicures"
        category="manicures"
        title="Manicures"
        intro="Careful cuticle prep, precise shaping and a wet-look finish, from classic polish to strengthening BIAB and soft-gel extensions."
      />

      <MenuPriceBoard
        id="pedicures"
        category="pedicures"
        title="Pedicures"
        intro="Warm soaks, an unhurried foot massage and glossy toes that last through Austin sandal season."
        tinted
      />

      <MenuPriceBoard
        id="nail-art"
        category="nail-art"
        title="Nail art"
        intro="Added to any manicure or pedicure. Bring a reference picture or choose a set from the lookbook."
      />

      <MenuAddOnsStrip
        title="Add-ons & removals"
        intro="Safe soak-offs, single-nail repairs and warm paraffin to add to any visit."
      />

      <MenuPolicySign heading="Good to know">
        <p>
          Prices are a guide. The final price depends on nail length, art detail and any removal, and
          is confirmed in the reply to your enquiry before you sit down.
        </p>
        <p>
          Sensitive to gel or builder products? Patch tests are free. Mention any allergies or
          sensitivities in your enquiry so we can plan ahead.
        </p>
      </MenuPolicySign>

      <ClosingCta
        title="Know what you’d like?"
        copy="Send us the services you have in mind and two or three preferred days. We’ll reply to confirm a time."
        actionLabel="Ask about an appointment"
        secondaryHref="/lookbook/"
        secondaryLabel="Browse the lookbook"
      />
    </>
  );
}
