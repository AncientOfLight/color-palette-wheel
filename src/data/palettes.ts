export type ColorCategory = 'pastel' | 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'brown' | 'pink' | 'grey' | 'purple' | 'white' | 'black' | 'metallic' | 'neon';

export interface Palette {
  id: string;
  name: string;
  colors: string[];
  categories: ColorCategory[];
  tags: string[];
}

export const PALETTE_CATEGORIES: { id: ColorCategory; label: string }[] = [
  { id: 'pastel', label: 'Pastel' },
  { id: 'red', label: 'Red' },
  { id: 'blue', label: 'Blue' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'green', label: 'Green' },
  { id: 'orange', label: 'Orange' },
  { id: 'brown', label: 'Brown' },
  { id: 'pink', label: 'Pink' },
  { id: 'grey', label: 'Grey' },
  { id: 'purple', label: 'Purple' },
  { id: 'white', label: 'White' },
  { id: 'black', label: 'Black' },
  { id: 'metallic', label: 'Metallic' },
  { id: 'neon', label: 'Neon' },
];

// --- Programmatic palette generator for 500 per category ---

function hsvToHex(h: number, s: number, v: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  v = Math.max(0, Math.min(100, v)) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Deterministic pseudo-random from seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Category config: hue range, saturation range, value range, name prefixes
interface CategoryConfig {
  hueRange: [number, number];
  satRange: [number, number];
  valRange: [number, number];
  hueShift: number;
  satShift: number;
  valShift: number;
  namePrefixes: string[];
  nameSuffixes: string[];
  secondaryCategory?: ColorCategory;
}

const CATEGORY_CONFIGS: Record<ColorCategory, CategoryConfig> = {
  pastel: {
    hueRange: [0, 360], satRange: [15, 40], valRange: [85, 98],
    hueShift: 25, satShift: 3, valShift: 2,
    namePrefixes: ['Soft', 'Pale', 'Light', 'Muted', 'Gentle', 'Blush', 'Cloud', 'Whisper', 'Silk', 'Mist'],
    nameSuffixes: ['Bloom', 'Dream', 'Haze', 'Whisper', 'Glow', 'Dawn', 'Sky', 'Petal', 'Breeze', 'Cloud'],
  },
  red: {
    hueRange: [345, 375], satRange: [60, 100], valRange: [40, 95],
    hueShift: 5, satShift: 5, valShift: 8,
    namePrefixes: ['Crimson', 'Scarlet', 'Ruby', 'Cherry', 'Fire', 'Cardinal', 'Vermilion', 'Carmine', 'Garnet', 'Flame'],
    nameSuffixes: ['Blaze', 'Heart', 'Rose', 'Storm', 'Ember', 'Rush', 'Pulse', 'Fury', 'Star', 'Heat'],
  },
  blue: {
    hueRange: [195, 260], satRange: [40, 100], valRange: [30, 95],
    hueShift: 8, satShift: 5, valShift: 8,
    namePrefixes: ['Ocean', 'Sky', 'Royal', 'Navy', 'Cobalt', 'Azure', 'Sapphire', 'Cerulean', 'Indigo', 'Steel'],
    nameSuffixes: ['Depth', 'Wave', 'Dream', 'Horizon', 'Mist', 'Cove', 'Surge', 'Calm', 'Night', 'Tide'],
  },
  yellow: {
    hueRange: [40, 70], satRange: [50, 100], valRange: [50, 98],
    hueShift: 4, satShift: 5, valShift: 7,
    namePrefixes: ['Golden', 'Lemon', 'Sunny', 'Honey', 'Amber', 'Canary', 'Dandelion', 'Topaz', 'Sunflower', 'Maize'],
    nameSuffixes: ['Glow', 'Light', 'Ray', 'Shine', 'Beam', 'Spark', 'Field', 'Dream', 'Warmth', 'Burst'],
  },
  green: {
    hueRange: [85, 165], satRange: [30, 100], valRange: [25, 95],
    hueShift: 10, satShift: 6, valShift: 8,
    namePrefixes: ['Forest', 'Emerald', 'Sage', 'Mint', 'Jade', 'Olive', 'Moss', 'Fern', 'Pine', 'Lime'],
    nameSuffixes: ['Valley', 'Leaf', 'Grove', 'Trail', 'Garden', 'Canopy', 'Glade', 'Meadow', 'Spring', 'Creek'],
  },
  orange: {
    hueRange: [15, 45], satRange: [55, 100], valRange: [45, 95],
    hueShift: 4, satShift: 5, valShift: 7,
    namePrefixes: ['Tangerine', 'Coral', 'Peach', 'Apricot', 'Mango', 'Copper', 'Rust', 'Carrot', 'Nectarine', 'Papaya'],
    nameSuffixes: ['Glow', 'Sunset', 'Flame', 'Warmth', 'Blaze', 'Crisp', 'Harvest', 'Ember', 'Shade', 'Spice'],
  },
  brown: {
    hueRange: [15, 45], satRange: [20, 65], valRange: [15, 60],
    hueShift: 4, satShift: 4, valShift: 6,
    namePrefixes: ['Chocolate', 'Coffee', 'Walnut', 'Cinnamon', 'Cedar', 'Mahogany', 'Chestnut', 'Pecan', 'Hazel', 'Driftwood'],
    nameSuffixes: ['Wood', 'Earth', 'Bark', 'Bean', 'Shell', 'Loaf', 'Oven', 'Harvest', 'Trail', 'Root'],
  },
  pink: {
    hueRange: [320, 350], satRange: [30, 100], valRange: [50, 98],
    hueShift: 4, satShift: 5, valShift: 7,
    namePrefixes: ['Rose', 'Bubblegum', 'Flamingo', 'Sakura', 'Blush', 'Fuchsia', 'Carnation', 'Peony', 'Magenta', 'Coral'],
    nameSuffixes: ['Bloom', 'Petal', 'Kiss', 'Dream', 'Glow', 'Heart', 'Charm', 'Dance', 'Breeze', 'Dew'],
  },
  grey: {
    hueRange: [200, 220], satRange: [0, 12], valRange: [20, 90],
    hueShift: 15, satShift: 1, valShift: 10,
    namePrefixes: ['Silver', 'Slate', 'Pewter', 'Ash', 'Granite', 'Iron', 'Smoke', 'Fog', 'Pebble', 'Graphite'],
    nameSuffixes: ['Stone', 'Mist', 'Shadow', 'Veil', 'Cloud', 'Wall', 'Path', 'Step', 'Line', 'Dust'],
  },
  purple: {
    hueRange: [260, 310], satRange: [25, 100], valRange: [25, 90],
    hueShift: 6, satShift: 7, valShift: 8,
    namePrefixes: ['Violet', 'Lavender', 'Plum', 'Amethyst', 'Orchid', 'Grape', 'Royal', 'Iris', 'Lilac', 'Mauve'],
    nameSuffixes: ['Magic', 'Mist', 'Night', 'Dream', 'Spell', 'Aura', 'Haze', 'Glow', 'Veil', 'Dusk'],
  },
  white: {
    hueRange: [0, 360], satRange: [0, 10], valRange: [90, 100],
    hueShift: 30, satShift: 1, valShift: 1,
    namePrefixes: ['Pearl', 'Ivory', 'Snow', 'Cloud', 'Cotton', 'Crystal', 'Lily', 'Vanilla', 'Cream', 'Moon'],
    nameSuffixes: ['White', 'Light', 'Frost', 'Purity', 'Mist', 'Glow', 'Silk', 'Feather', 'Dew', 'Star'],
  },
  black: {
    hueRange: [0, 360], satRange: [0, 30], valRange: [0, 25],
    hueShift: 20, satShift: 3, valShift: 3,
    namePrefixes: ['Midnight', 'Obsidian', 'Raven', 'Onyx', 'Shadow', 'Void', 'Abyss', 'Carbon', 'Ebony', 'Jet'],
    nameSuffixes: ['Night', 'Dark', 'Deep', 'Soul', 'Core', 'Fall', 'Hole', 'Veil', 'Shade', 'Depth'],
  },
  metallic: {
    hueRange: [30, 55], satRange: [40, 80], valRange: [40, 85],
    hueShift: 3, satShift: 5, valShift: 8,
    namePrefixes: ['Gold', 'Silver', 'Bronze', 'Copper', 'Platinum', 'Chrome', 'Brass', 'Titanium', 'Steel', 'Rose Gold'],
    nameSuffixes: ['Shine', 'Luster', 'Mirror', 'Leaf', 'Forged', 'Polish', 'Plate', 'Gleam', 'Cast', 'Alloy'],
    secondaryCategory: 'orange',
  },
  neon: {
    hueRange: [0, 360], satRange: [90, 100], valRange: [80, 100],
    hueShift: 30, satShift: 2, valShift: 2,
    namePrefixes: ['Electric', 'Cyber', 'Ultraviolet', 'Plasma', 'Laser', 'Quantum', 'Neon', 'Volt', 'Pulse', 'Photon'],
    nameSuffixes: ['Flash', 'Glow', 'Surge', 'Burst', 'Beam', 'Spark', 'Wave', 'Arc', 'Strike', 'Blaze'],
  },
};

function generateCategoryPalettes(category: ColorCategory, count: number): Palette[] {
  const config = CATEGORY_CONFIGS[category];
  const palettes: Palette[] = [];

  for (let i = 0; i < count; i++) {
    const seed = i + 1;
    const r1 = seededRandom(seed * 7 + 1);
    const r2 = seededRandom(seed * 13 + 2);
    const r3 = seededRandom(seed * 17 + 3);
    const r4 = seededRandom(seed * 23 + 4);
    const r5 = seededRandom(seed * 29 + 5);

    // Base hue within category range
    const hueSpan = config.hueRange[1] - config.hueRange[0];
    const baseHue = (config.hueRange[0] + r1 * hueSpan) % 360;

    // Base saturation and value
    const satSpan = config.satRange[1] - config.satRange[0];
    const valSpan = config.valRange[1] - config.valRange[0];
    const baseSat = config.satRange[0] + r2 * satSpan;
    const baseVal = config.valRange[0] + r3 * valSpan;

    // Generate 5 colors with harmonious variation
    const colors: string[] = [];
    for (let j = 0; j < 5; j++) {
      const rJ = seededRandom(seed * 31 + j * 37);
      const rJ2 = seededRandom(seed * 41 + j * 43);
      const rJ3 = seededRandom(seed * 47 + j * 53);

      const hShift = (j - 2) * config.hueShift + (rJ - 0.5) * config.hueShift * 0.5;
      const sShift = (j - 2) * config.satShift + (rJ2 - 0.5) * config.satShift * 0.3;
      const vShift = (j - 2) * config.valShift + (rJ3 - 0.5) * config.valShift * 0.3;

      const h = ((baseHue + hShift) % 360 + 360) % 360;
      const s = Math.max(config.satRange[0], Math.min(config.satRange[1] + 10, baseSat + sShift));
      const v = Math.max(config.valRange[0], Math.min(config.valRange[1] + 5, baseVal + vShift));

      colors.push(hsvToHex(h, s, v));
    }

    // Generate name
    const prefix = config.namePrefixes[Math.floor(r4 * config.namePrefixes.length)];
    const suffix = config.nameSuffixes[Math.floor(r5 * config.nameSuffixes.length)];
    const name = `${prefix} ${suffix}`;

    const categories: ColorCategory[] = [category];
    if (config.secondaryCategory && r1 > 0.5) {
      categories.push(config.secondaryCategory);
    }

    palettes.push({
      id: `${category.slice(0, 3)}${i + 1}`,
      name,
      colors,
      categories,
      tags: [prefix.toLowerCase(), suffix.toLowerCase(), category],
    });
  }

  return palettes;
}

// Generate all palettes lazily - 500 per category
let _allPalettesCache: Palette[] | null = null;

export function getAllPalettes(): Palette[] {
  if (!_allPalettesCache) {
    _allPalettesCache = PALETTE_CATEGORIES.flatMap(cat =>
      generateCategoryPalettes(cat.id, 500)
    );
  }
  return _allPalettesCache;
}

export function getPalettesByCategory(category: ColorCategory): Palette[] {
  return generateCategoryPalettes(category, 500);
}

// Keep backward compatibility - PALETTES still available but lazy
export const PALETTES: Palette[] = []; // Replaced by getAllPalettes()

// Override the search utility to use the generator
export function searchPalettes(query: string, category: ColorCategory | null): Palette[] {
  const source = category ? getPalettesByCategory(category) : getAllPalettes();
  if (!query.trim()) return source;
  const q = query.toLowerCase().trim();
  return source.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.categories.some(c => c.toLowerCase().includes(q)) ||
    p.colors.some(c => c.toLowerCase().includes(q))
  );
}
