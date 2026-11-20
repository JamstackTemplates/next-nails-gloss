import type { CSSProperties } from 'react';
import { useId } from 'react';
import type { NailPattern, NailShape, NailSpec } from '../../content/lookbook';
import { shadeById, type PolishFinish } from '../../content/shades';
import { shadeHex } from './color-utils';

/** SVG path for each nail silhouette in a 60x104 viewBox (free edge at top, cuticle at bottom). */
export const NAIL_SHAPE_PATHS: Record<NailShape, string> = {
  almond:
    'M30 3 C41 6 49 26 50 54 C50.5 82 45 99 30 99 C15 99 9.5 82 10 54 C11 26 19 6 30 3 Z',
  coffin:
    'M21 4 L39 4 L49 52 C50 82 45 99 30 99 C15 99 10 82 11 52 Z',
  square:
    'M13 6 Q30 4 47 6 Q50 7 50 12 L50 58 C50 84 45 99 30 99 C15 99 10 84 10 58 L10 12 Q10 7 13 6 Z',
  oval:
    'M30 5 C44 5 50 22 50 54 C50 84 45 99 30 99 C15 99 10 84 10 54 C10 22 16 5 30 5 Z',
  stiletto:
    'M30 1 C37 14 47 36 49.5 58 C50 84 45 99 30 99 C15 99 10 84 10.5 58 C13 36 23 14 30 1 Z',
};

export interface NailTipProps {
  shape: NailShape;
  baseHex: string;
  accentHex?: string;
  pattern?: NailPattern;
  finish?: PolishFinish;
  className?: string;
  title?: string;
  style?: CSSProperties;
}

/**
 * One lacquered nail: a deep base with soft edge falloff, a fine hand-painted pattern and a long
 * wet specular highlight. No outlines, so it reads as a product shot rather than a sticker.
 */
export function NailTipSvg({
  shape,
  baseHex,
  accentHex = '#FFFFFF',
  pattern = 'solid',
  finish = 'cream',
  className = 'h-24 w-14',
  title,
  style,
}: NailTipProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const path = NAIL_SHAPE_PATHS[shape];
  const deep = shadeHex(baseHex, 0.62);
  const mid = shadeHex(baseHex, 0.86);
  const bright = shadeHex(baseHex, 1.22);
  const accentDeep = shadeHex(accentHex, 0.78);
  const isChrome = pattern === 'chrome' || finish === 'chrome';

  return (
    <svg
      viewBox="0 0 60 104"
      className={`nail-swatch overflow-visible ${className}`}
      style={style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <clipPath id={`clip-${uid}`}>
          <path d={path} />
        </clipPath>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={mid} />
          <stop offset="30%" stopColor={finish === 'jelly' ? bright : baseHex} />
          <stop offset="62%" stopColor={baseHex} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`chrome-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bright} />
          <stop offset="28%" stopColor="#FFFFFF" />
          <stop offset="48%" stopColor={accentHex} />
          <stop offset="70%" stopColor={baseHex} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <radialGradient id={`aura-${uid}`} cx="50%" cy="56%" r="46%">
          <stop offset="0%" stopColor={accentHex} stopOpacity="1" />
          <stop offset="55%" stopColor={accentHex} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accentHex} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`depth-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="22%" stopColor="#000000" stopOpacity="0" />
          <stop offset="82%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`spec-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`pearl-${uid}`} cx="35%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor={accentHex} />
          <stop offset="100%" stopColor={accentDeep} />
        </radialGradient>
      </defs>

      <g clipPath={`url(#clip-${uid})`}>
        <rect width="60" height="104" fill={isChrome ? `url(#chrome-${uid})` : `url(#body-${uid})`} />

        {pattern === 'french' ? (
          <path d="M0 0 H60 V24 Q30 36 0 24 Z" fill={accentHex} />
        ) : null}

        {pattern === 'dots' ? (
          <g fill={accentHex}>
            {[
              [24, 22, 2.2], [36, 30, 1.8], [22, 42, 1.6], [38, 50, 2.2],
              [27, 60, 1.6], [35, 72, 1.8], [24, 82, 1.4],
            ].map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
            ))}
          </g>
        ) : null}

        {pattern === 'flower' ? (
          <g transform="translate(31 44)">
            {[0, 72, 144, 216, 288].map(angle => (
              <ellipse key={angle} cx="0" cy="-5.5" rx="2.6" ry="5.2" fill={accentHex} transform={`rotate(${angle})`} />
            ))}
            <circle r="2" fill={accentDeep} />
            <path d="M2 6 C6 18 4 28 -2 38" stroke={accentHex} strokeWidth="0.9" fill="none" opacity="0.8" />
          </g>
        ) : null}

        {pattern === 'heart' ? (
          <path
            transform="translate(30 50) scale(0.62)"
            d="M0 13 C-12 4 -15 -4 -10 -10 C-6 -14 -1 -12 0 -7 C1 -12 6 -14 10 -10 C15 -4 12 4 0 13 Z"
            fill={accentHex}
          />
        ) : null}

        {pattern === 'swirl' ? (
          <g fill="none" strokeLinecap="round" stroke={accentHex}>
            <path d="M4 26 C22 14 34 42 58 26" strokeWidth="3" />
            <path d="M4 56 C24 42 34 74 58 56" strokeWidth="3.6" />
            <path d="M6 84 C24 74 36 94 56 84" strokeWidth="2.4" />
          </g>
        ) : null}

        {pattern === 'aura' ? (
          <ellipse cx="30" cy="56" rx="20" ry="32" fill={`url(#aura-${uid})`} />
        ) : null}

        {pattern === 'checker' ? (
          <g fill={accentHex}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(row =>
              [0, 1, 2, 3, 4].map(col =>
                (row + col) % 2 === 0 ? (
                  <rect key={`${row}-${col}`} x={5 + col * 10} y={2 + row * 12.5} width="10" height="12.5" />
                ) : null,
              ),
            )}
          </g>
        ) : null}

        {pattern === 'pearl' ? (
          <g>
            {[
              [30, 30, 3.6], [24, 42, 2.6], [36, 46, 3], [29, 60, 3.2], [31, 76, 2.4],
            ].map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={`url(#pearl-${uid})`} />
            ))}
          </g>
        ) : null}

        {finish === 'shimmer' ? (
          <g fill="#FFFFFF" opacity="0.7">
            {[
              [18, 30, 0.8], [38, 38, 1], [26, 54, 0.7], [41, 66, 0.8], [20, 76, 0.9], [33, 86, 0.6], [30, 20, 0.7],
            ].map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
            ))}
          </g>
        ) : null}

        {/* Curvature: darker at free edge and cuticle */}
        <rect width="60" height="104" fill={`url(#depth-${uid})`} />

        {/* Long wet specular streak + crisp catch-light */}
        <path d="M20 14 C16 34 15.5 60 18.5 84 L22.5 84 C20 60 20.5 34 24 14 Z" fill={`url(#spec-${uid})`} />
        <ellipse cx="37" cy="20" rx="2.2" ry="5" fill="#FFFFFF" opacity="0.45" transform="rotate(18 37 20)" />
      </g>

      {/* Hairline rim so pale shades still separate from a pale page */}
      <path d={path} fill="none" stroke="#000000" strokeOpacity="0.14" strokeWidth="0.8" />
    </svg>
  );
}

/** Five nails arranged like fingertips: middle finger tallest, pinky lowest. */
export function FiveNailTips({
  nails,
  shape,
  title,
  className = '',
}: {
  nails: readonly [NailSpec, NailSpec, NailSpec, NailSpec, NailSpec];
  shape: NailShape;
  title: string;
  className?: string;
}) {
  const widths = [0.84, 0.95, 1, 0.94, 0.78];
  const lifts = ['18%', '6%', '0%', '5%', '26%'];
  return (
    <div
      className={`set-nails flex items-start justify-center gap-[3%] ${className}`}
      role="img"
      aria-label={`${title}: five ${shape} nails`}
    >
      {nails.map((nail, index) => {
        const baseShade = shadeById(nail.base);
        const accentShade = nail.accent ? shadeById(nail.accent) : undefined;
        return (
          <div
            key={`${index}-${nail.base}-${nail.pattern}`}
            style={{ width: `${18 * widths[index]}%`, '--ty': lifts[index], transform: 'translateY(var(--ty))' } as CSSProperties}
          >
            <NailTipSvg
              shape={shape}
              baseHex={baseShade?.hex ?? '#8C1230'}
              accentHex={accentShade?.hex ?? '#FFFFFF'}
              pattern={nail.pattern}
              finish={baseShade?.finish ?? 'cream'}
              className="h-auto w-full drop-shadow-[0_6px_8px_rgba(40,8,18,0.22)]"
            />
          </div>
        );
      })}
    </div>
  );
}
