import type { Metadata } from 'next';
import { shadeById } from '../../content/shades';
import { ContactLayout } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead
        title={business.enquiries.title}
        shape="almond"
        shades={[shadeById('midnight-plum'), shadeById('raspberry-gloss'), shadeById('oat-milk')]}
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <ContactLayout
        hosted={hosted}
        siteId={site.jamstacksSite}
        embedUrl={site.jamstacksEmbedUrl}
        guidanceHeading="What to include"
        formHeading="Send an enquiry"
        fallbackHeading="Write to us directly"
        fallbackCopy="The online enquiry form isn’t connected on this copy yet. Email the studio or call during opening hours, and we’ll reply to confirm a time."
        replyReminder="Every message is an enquiry. We’ll reply by email to confirm a time and a guide price."
      />
    </>
  );
}
