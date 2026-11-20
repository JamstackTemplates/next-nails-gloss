import { useId } from 'react';
import { shadeHex } from './color-utils';

/**
 * A tall, square-shouldered glass bottle with a long lacquered cap: the studio's polish,
 * photographed rather than doodled. Fill colour comes from a shade's hex.
 */
export function PolishBottleSvg({ hex, className = 'h-auto w-24' }: { hex: string; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const deep = shadeHex(hex, 0.5);
  const bright = shadeHex(hex, 1.25);

  return (
    <svg viewBox="0 0 120 300" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#120407" />
          <stop offset="28%" stopColor="#3a1520" />
          <stop offset="40%" stopColor="#5a2a36" />
          <stop offset="56%" stopColor="#1c070c" />
          <stop offset="100%" stopColor="#0a0204" />
        </linearGradient>
        <linearGradient id={`polish-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={deep} />
          <stop offset="22%" stopColor={hex} />
          <stop offset="44%" stopColor={bright} />
          <stop offset="62%" stopColor={hex} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id={`floor-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="60" cy="292" rx="52" ry="7" fill={`url(#floor-${uid})`} />

      {/* Long cap */}
      <rect x="44" y="4" width="32" height="132" rx="3" fill={`url(#cap-${uid})`} />
      <rect x="54" y="10" width="3" height="120" rx="1.5" fill="#ffffff" opacity="0.28" />
      {/* Collar */}
      <rect x="40" y="134" width="40" height="10" rx="2" fill="#1a060b" />

      {/* Thick glass body with the lacquer inside */}
      <rect x="14" y="144" width="92" height="146" rx="10" fill={`url(#glass-${uid})`} stroke="#ffffff" strokeOpacity="0.4" />
      <rect x="20" y="150" width="80" height="128" rx="6" fill={`url(#polish-${uid})`} />
      {/* Heavy glass base */}
      <rect x="20" y="270" width="80" height="12" rx="3" fill="#ffffff" opacity="0.22" />
      {/* Reflections */}
      <rect x="27" y="156" width="5" height="108" rx="2.5" fill="#ffffff" opacity="0.55" />
      <rect x="88" y="160" width="2.5" height="96" rx="1.25" fill="#ffffff" opacity="0.22" />
    </svg>
  );
}
