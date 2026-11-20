import type { OpeningHours } from '../lib/hours.ts';

export interface BusinessAddress {
  /** Street line, e.g. "1406 South Congress Avenue". */
  street: string;
  /** City name. */
  city: string;
  /** Two-letter state or region code. */
  region: string;
  /** Postal/ZIP code. */
  postalCode: string;
  /** Two-letter ISO country code. */
  country: string;
  /** Single-line formatted address displayed on the site. */
  full: string;
}

export interface Business {
  /** Public studio name; also update site.config.json's name when renaming. */
  name: string;
  /** Compact wordmark shown in the header. */
  wordmark: string;
  /** Short headline for the home page and social card. */
  tagline: string;
  /** Plain-text summary used as fallback metadata and schema description. */
  introduction: string;
  /** Public email address, always visible alongside or instead of the hosted form. */
  email: string;
  /** Public studio telephone number; blank hides phone links. */
  phone: string;
  /** Studio street address and structured postal fields for schema.org. */
  address: BusinessAddress;
  /** Plain-English landmark note shown beside the address. */
  landmark: string;
  /** Search/destination query passed to Google Maps direction links. */
  directionsQuery: string;
  /** Seven weekly opening-hours entries (Monday through Sunday, no overnight spans). */
  hours: OpeningHours[];
  /** IANA time zone for opening hours; keep in sync with site.config.json `timeZone`. */
  timeZone: string;
  /** Currency symbol & schema.org priceRange indicator. */
  priceRange: string;
  /** Contact page guidance; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Intro copy framing requests as enquiries, never confirmed bookings. */
    introduction: string;
    /** Short notice explaining how appointments are arranged by reply. */
    replyNote: string;
    /** Suggestions for what visitors should write in their message (not form inputs). */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Glossy Petal Nail Studio',
  wordmark: 'Glossy Petal',
  tagline: 'Ten tiny canvases. Endless colour.',
  introduction:
    'Gel, BIAB and classic manicures, pampering pedicures and hand-painted nail art on South Congress. Bring a picture, or let us pick the shade.',
  email: 'hello@glossypetal.example',
  phone: '(512) 555-0148',
  address: {
    street: '1406 South Congress Avenue',
    city: 'Austin',
    region: 'TX',
    postalCode: '78704',
    country: 'US',
    full: '1406 South Congress Avenue, Austin, TX 78704',
  },
  landmark: 'A short stroll south of the Congress Avenue Bridge.',
  directionsQuery: '1406 South Congress Avenue, Austin, TX 78704',
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '10:00', closes: '19:00' },
    { day: 'Wednesday', opens: '10:00', closes: '19:00' },
    { day: 'Thursday', opens: '10:00', closes: '20:00' },
    { day: 'Friday', opens: '10:00', closes: '19:00' },
    { day: 'Saturday', opens: '09:00', closes: '17:00' },
    { day: 'Sunday', opens: '11:00', closes: '16:00' },
  ],
  timeZone: 'America/Chicago',
  priceRange: '$$',
  enquiries: {
    title: 'Ask about an appointment',
    introduction:
      'Send an enquiry for a solo set, a regular fill, a bridal party or a birthday group. We’ll reply to confirm a time.',
    replyNote:
      'Sending a message is an enquiry — times and quotes are arranged only when we reply by email.',
    usefulToInclude: [
      'The services you would like (for example “Gel Manicure + Accent Art”)',
      'Two or three preferred days and times',
      'Your preferred nail length and shape (almond, coffin, square, oval or stiletto)',
      'Any lookbook design name, or a description of your reference picture',
      'Whether you need a gel, BIAB or extension soak-off first',
      'Any allergies, sensitivities or a request for a gel patch test',
    ],
  },
};
