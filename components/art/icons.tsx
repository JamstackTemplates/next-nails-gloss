import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 24): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
});

export function ClockIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function MapPinIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function PhoneIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M5.5 4.5h3.2l1.6 4-2 1.5a11.2 11.2 0 0 0 5.7 5.7l1.5-2 4 1.6v3.2a1.8 1.8 0 0 1-1.9 1.8C10.1 20 4 13.9 4 6.4a1.8 1.8 0 0 1 1.5-1.9Z"
      />
    </svg>
  );
}

export function EnvelopeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="m4.5 7.5 7.5 5.3 7.5-5.3" />
    </svg>
  );
}

export function SparkleIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M12 2.5 14.3 9.7 21.5 12l-7.2 2.3L12 21.5l-2.3-7.2L2.5 12l7.2-2.3Z"
      />
    </svg>
  );
}

export function DropletIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M12 3.2C9 7.8 6 11.4 6 14.8a6 6 0 1 0 12 0c0-3.4-3-7-6-11.6Z"
      />
      <path d="M9.5 14.8c0 1.4.8 2.4 2 2.8" strokeOpacity="0.85" />
    </svg>
  );
}

export function LeafIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M19.5 4.5C12 4.5 6 8.5 5.5 16.5c4.5 2 11.5.5 14-12Z"
      />
      <path d="M5.5 19.5c2.2-3 5-5.6 9.5-8.5" />
    </svg>
  );
}

export function HandIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M8.5 12.5V6.5a1.3 1.3 0 0 1 2.6 0v4.8M11.1 10.5V5.2a1.3 1.3 0 0 1 2.6 0v5.5M13.7 10.8V6.4a1.3 1.3 0 0 1 2.6 0v5.3M16.3 11.7V9.2a1.2 1.2 0 0 1 2.4 0v5.3c0 3.7-2.6 6.2-6.2 6.2h-1.2c-2.5 0-4.2-1.4-5.4-3.7l-1.4-2.7a1.3 1.3 0 0 1 2.2-1.4l1.8 1.9"
      />
    </svg>
  );
}

export function FootIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M13 8.5c2.6 0 4.5 2 4.2 5-.3 2.5-1.5 3.6-1.5 5.2 0 1.4-1.2 2.3-2.6 2.3-1.8 0-3-1.2-3-3.2 0-1.9-1.2-3.4-1.2-5.4 0-2.4 1.6-3.9 4.1-3.9Z"
      />
      <circle cx="9.2" cy="5.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="4.4" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14.9" cy="4.9" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="17.2" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BrushIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M18.8 3.8 10.5 12.1l1.4 1.4 8.3-8.3a1 1 0 0 0-1.4-1.4Z" />
      <path
        d="M10.5 12.1c-2 .3-3.4 1.7-3.6 3.7-.1 1-.8 2-2.2 2.5 1.8.8 4.4.8 6-.8 1.2-1.2 1.5-2.6 1.2-4"
      />
    </svg>
  );
}
