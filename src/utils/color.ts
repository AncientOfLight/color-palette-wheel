export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`;
}

export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;

  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360) % 360, s: Math.round(s), v: Math.round(v) };
}

export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));
  const sN = s / 100;
  const vN = v / 100;
  const c = vN * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vN - c;
  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

export function hexToHsv(hex: string): { h: number; s: number; v: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsv(rgb.r, rgb.g, rgb.b);
}

export function formatColorInfo(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  return `${hex.toUpperCase()} | RGB(${rgb.r},${rgb.g},${rgb.b}) | HSV(${hsv.h},${hsv.s},${hsv.v})`;
}

export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255 > 0.5;
}

export function getColorName(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'Unknown';
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const h = hsv.h, s = hsv.s, v = hsv.v;

  // Very dark
  if (v < 10) return 'Black';
  // Very light
  if (v > 95 && s < 10) return 'White';
  // Grays
  if (s < 8) {
    if (v < 20) return 'Black';
    if (v < 40) return 'Charcoal';
    if (v < 55) return 'Dark Gray';
    if (v < 70) return 'Gray';
    if (v < 85) return 'Silver';
    return 'Light Gray';
  }

  // Pastels (low saturation, high value)
  if (s < 30 && v > 70) {
    if (h < 15 || h >= 345) return 'Blush';
    if (h < 45) return 'Peach';
    if (h < 70) return 'Cream';
    if (h < 150) return 'Mint';
    if (h < 210) return 'Powder Blue';
    if (h < 270) return 'Lavender';
    if (h < 315) return 'Orchid';
    return 'Rose';
  }

  // Browns (medium-low value, orange-ish hue, moderate saturation)
  if (v < 55 && s > 15 && s < 70 && h >= 10 && h < 50) {
    if (v < 25) return 'Dark Brown';
    if (v < 35) return 'Brown';
    return 'Tan';
  }

  // Saturated colors
  const hueNames: [number, number, string][] = [
    [0, 15, 'Red'], [15, 45, 'Orange'], [45, 70, 'Amber'],
    [70, 85, 'Yellow'], [85, 150, 'Green'], [150, 185, 'Teal'],
    [185, 210, 'Cyan'], [210, 260, 'Blue'], [260, 290, 'Indigo'],
    [290, 330, 'Purple'], [330, 345, 'Magenta'], [345, 360, 'Red'],
  ];

  let hueName = 'Red';
  for (const [lo, hi, name] of hueNames) {
    if (h >= lo && h < hi) { hueName = name; break; }
  }

  // Modifiers
  if (v < 30) return `Dark ${hueName}`;
  if (v < 50) return `Deep ${hueName}`;
  if (s < 40) return `Muted ${hueName}`;
  if (s > 85 && v > 80) return `Vivid ${hueName}`;
  return hueName;
}

export function getTriadicColors(hue: number): number[] {
  return [(hue + 120) % 360, (hue + 240) % 360];
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
