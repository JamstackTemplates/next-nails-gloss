import { NAIL_SHAPE_PATHS } from './nail-tip';
import { shadeHex } from './color-utils';

const PIVOT = { x: 280, y: 1060 } as const;

/** Index, middle, ring, little finger: fanned from a wrist below the frame. */
const FINGERS = [
  { angle: -12.5, length: 840, width: 92 },
  { angle: -3.8, length: 905, width: 96 },
  { angle: 5, length: 872, width: 90 },
  { angle: 14, length: 760, width: 78 },
] as const;

function fingerPath(width: number, top: number) {
  const tip = width * 0.43;
  const base = width * 0.62;
  const x = PIVOT.x;
  const bottom = PIVOT.y + 40;
  const shoulder = top + tip;
  return [
    `M${x - tip} ${shoulder}`,
    `A${tip} ${tip} 0 0 1 ${x + tip} ${shoulder}`,
    `C${x + tip * 1.08} ${shoulder + width * 1.6} ${x + width * 0.5} ${top + width * 2.4} ${x + width * 0.52} ${top + width * 4.4}`,
    `L${x + base} ${bottom}`,
    `L${x - base} ${bottom}`,
    `L${x - width * 0.52} ${top + width * 4.4}`,
    `C${x - width * 0.5} ${top + width * 2.4} ${x - tip * 1.08} ${shoulder + width * 1.6} ${x - tip} ${shoulder}`,
    'Z',
  ].join(' ');
}

/**
 * Hero artwork: four slender fingers rising into frame, each finished with a long almond nail in
 * the shade of the month. Skin and shadows come from theme tokens; the lacquer comes from data.
 */
export function HeroHand({ hex, className = '' }: { hex: string; className?: string }) {
  const deep = shadeHex(hex, 0.55);
  const mid = shadeHex(hex, 0.82);
  const bright = shadeHex(hex, 1.3);

  return (
    <svg viewBox="0 0 560 700" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hh-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--skin-deep)" />
          <stop offset="18%" stopColor="var(--skin)" />
          <stop offset="46%" stopColor="var(--skin-light)" />
          <stop offset="78%" stopColor="var(--skin)" />
          <stop offset="100%" stopColor="var(--skin-deep)" />
        </linearGradient>
        <linearGradient id="hh-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="hh-lacquer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={mid} />
          <stop offset="34%" stopColor={bright} />
          <stop offset="58%" stopColor={hex} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <linearGradient id="hh-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.28" />
          <stop offset="24%" stopColor="#000" stopOpacity="0" />
          <stop offset="84%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="hh-spec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="16%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hh-sweep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hh-nail">
          <path d={NAIL_SHAPE_PATHS.almond} />
        </clipPath>
        <filter id="hh-shadow" x="-40%" y="-20%" width="180%" height="140%">
          <feDropShadow dx="-6" dy="14" stdDeviation="14" style={{ floodColor: 'var(--art-shadow)' }} />
        </filter>
      </defs>

      {FINGERS.map(({ angle, length, width }, index) => {
        const top = PIVOT.y - length;
                const nailWidth = width * 0.7;
        const scale = nailWidth / 40;
        const cuticleY = top + width * 1.02;
        const nailX = PIVOT.x - 30 * scale;
        const nailY = cuticleY - 99 * scale;
        return (
          <g key={index} transform={`rotate(${angle} ${PIVOT.x} ${PIVOT.y})`} filter="url(#hh-shadow)">
            {/* Finger: rounded tip, widening towards the palm */}
            <path d={fingerPath(width, top)} fill="url(#hh-skin)" />
            <path d={fingerPath(width, top)} fill="url(#hh-fade)" />
            {/* Knuckle creases */}
            <g fill="none" stroke="var(--skin-deep)" strokeLinecap="round" opacity="0.5">
              <path d={`M${PIVOT.x - width * 0.22} ${top + width * 2.25} q${width * 0.22} ${width * 0.06} ${width * 0.44} 0`} strokeWidth="1.6" />
              <path d={`M${PIVOT.x - width * 0.26} ${top + width * 4.4} q${width * 0.26} ${width * 0.08} ${width * 0.52} 0`} strokeWidth="1.8" />
              <path d={`M${PIVOT.x - width * 0.2} ${top + width * 4.55} q${width * 0.2} ${width * 0.06} ${width * 0.4} 0`} strokeWidth="1.2" />
            </g>
            {/* Nail bed shadow */}
            <ellipse cx={PIVOT.x} cy={cuticleY - 6} rx={nailWidth * 0.52} ry={width * 0.2} fill="var(--skin-deep)" opacity="0.45" />
            {/* Lacquered almond nail */}
            <g transform={`translate(${nailX} ${nailY}) scale(${scale})`}>
              <g clipPath="url(#hh-nail)">
                <rect width="60" height="104" fill="url(#hh-lacquer)" />
                <rect width="60" height="104" fill="url(#hh-depth)" />
                <path d="M20.5 14 C16.5 34 16 60 19 86 L23 86 C20.5 60 21 34 24.5 14 Z" fill="url(#hh-spec)" />
                <ellipse cx="37.5" cy="22" rx="2" ry="5.5" fill="#fff" opacity="0.5" transform="rotate(16 37.5 22)" />
                <rect className="hero-sheen" style={{ animationDelay: `${400 + index * 140}ms` }} x="0" y="-10" width="60" height="50" fill="url(#hh-sweep)" />
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
