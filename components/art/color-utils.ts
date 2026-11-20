/** Adjust a #RRGGBB hex brightness by factor (< 1 darkens, > 1 lightens) for flat-art shading. */
export function shadeHex(hex: string, factor: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const adjust = (channel: number) => {
    const next = factor < 1 ? Math.round(channel * factor) : Math.round(channel + (255 - channel) * (factor - 1));
    return Math.max(0, Math.min(255, next)).toString(16).padStart(2, '0');
  };
  return `#${adjust(r)}${adjust(g)}${adjust(b)}`;
}

/** Return dark aubergine or crisp white depending on hex luminance for legible labels on swatches. */
export function inkOnHex(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return '#2A1030';
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.56 ? '#2A1030' : '#FFFFFF';
}
