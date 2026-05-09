export interface ColorShade {
  name: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
}

export interface ColorFamily {
  id: string;
  label: string;
  baseHex: string;
  hue: number;
  shades: ColorShade[];
}
