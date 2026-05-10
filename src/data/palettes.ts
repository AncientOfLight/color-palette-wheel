export type PaletteCategory = 'pastel' | 'vintage' | 'retro' | 'neon' | 'gold' | 'light' | 'dark' | 'warm' | 'cold' | 'summer' | 'fall' | 'winter' | 'spring';

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  category: PaletteCategory;
}

export const CATEGORIES: { id: PaletteCategory; label: string }[] = [
  { id: 'pastel', label: 'Pastel' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'retro', label: 'Retro' },
  { id: 'neon', label: 'Neon' },
  { id: 'gold', label: 'Gold' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'warm', label: 'Warm' },
  { id: 'cold', label: 'Cold' },
  { id: 'summer', label: 'Summer' },
  { id: 'fall', label: 'Fall' },
  { id: 'winter', label: 'Winter' },
  { id: 'spring', label: 'Spring' },
];

export const PALETTES: ColorPalette[] = [
  // Pastel
  { id: 'p1', name: 'Soft Cloud', colors: ['#FFE5EC', '#E5F5FF', '#F0E5FF', '#E5FFF5', '#FFF5E5'], category: 'pastel' },
  { id: 'p2', name: 'Candy Dreams', colors: ['#FFB3D9', '#FFADAD', '#FFD4A3', '#FDFFB6', '#B3E5FC'], category: 'pastel' },
  { id: 'p3', name: 'Milky Way', colors: ['#E5D4FF', '#D4E5FF', '#D4FFF5', '#FFE5D4', '#FFF5D4'], category: 'pastel' },
  { id: 'p4', name: 'Cotton Candy', colors: ['#FFB3E6', '#FFD4B3', '#E6F3FF', '#D4FFE6', '#F3E6FF'], category: 'pastel' },
  { id: 'p5', name: 'Soft Bloom', colors: ['#FFC0D9', '#FFD4C0', '#E0D4FF', '#C0E5FF', '#D4FFC0'], category: 'pastel' },

  // Vintage
  { id: 'v1', name: 'Old Gold', colors: ['#8B7355', '#C9A876', '#D4A574', '#A89968', '#6B5344'], category: 'vintage' },
  { id: 'v2', name: 'Sepia Tones', colors: ['#704214', '#966633', '#B8860B', '#CD853F', '#A0826D'], category: 'vintage' },
  { id: 'v3', name: 'Dusty Rose', colors: ['#9B6B6B', '#C99A6E', '#B89968', '#9B7E7E', '#A68A8A'], category: 'vintage' },
  { id: 'v4', name: 'Retro Brown', colors: ['#6B4423', '#8B5A2B', '#A0522D', '#8B6F47', '#704214'], category: 'vintage' },
  { id: 'v5', name: 'Faded Print', colors: ['#8B6F47', '#9B8B6B', '#B8A885', '#A89968', '#7B6B47'], category: 'vintage' },

  // Retro
  { id: 'r1', name: 'Groovy 70s', colors: ['#FF6B35', '#F7931E', '#FDB833', '#004E89', '#F77F00'], category: 'retro' },
  { id: 'r2', name: 'Disco Heat', colors: ['#D32F2F', '#F57C00', '#FBC02D', '#00897B', '#1976D2'], category: 'retro' },
  { id: 'r3', name: 'Mod Squad', colors: ['#FF1744', '#F50057', '#D500F9', '#651FFF', '#00B0FF'], category: 'retro' },
  { id: 'r4', name: 'Space Age', colors: ['#2196F3', '#FF6F00', '#FFD600', '#00C853', '#E91E63'], category: 'retro' },
  { id: 'r5', name: 'Psychedelic', colors: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'], category: 'retro' },

  // Neon
  { id: 'n1', name: 'Electric Vibes', colors: ['#FF006E', '#00F5FF', '#FFBE0B', '#FB5607', '#8338EC'], category: 'neon' },
  { id: 'n2', name: 'Neon City', colors: ['#FF1654', '#0099FF', '#39FF14', '#FF00FF', '#FFFF33'], category: 'neon' },
  { id: 'n3', name: 'Cyber Pulse', colors: ['#00D9FF', '#FF006E', '#00FF9F', '#FF00FF', '#FFFF00'], category: 'neon' },
  { id: 'n4', name: 'Glow Up', colors: ['#FF0080', '#00FFFF', '#39FF14', '#FF00FF', '#00FF00'], category: 'neon' },
  { id: 'n5', name: 'Night Life', colors: ['#0099FF', '#FF0099', '#00FF99', '#FF9900', '#9900FF'], category: 'neon' },

  // Gold
  { id: 'g1', name: 'Golden Hour', colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520', '#B8860B'], category: 'gold' },
  { id: 'g2', name: 'Luxury', colors: ['#FFD700', '#C0C0C0', '#000000', '#FF6B6B', '#4ECDC4'], category: 'gold' },
  { id: 'g3', name: 'Royal Gold', colors: ['#FFD700', '#FFA500', '#8B4513', '#2F4F4F', '#DC143C'], category: 'gold' },
  { id: 'g4', name: 'Amber Glow', colors: ['#FFBF00', '#FF8C00', '#FF6347', '#FFD700', '#FFA500'], category: 'gold' },
  { id: 'g5', name: 'Champagne', colors: ['#F0E68C', '#FFD700', '#DAA520', '#B8860B', '#CD853F'], category: 'gold' },

  // Light
  { id: 'l1', name: 'Bright Morning', colors: ['#FFFFFF', '#E0F7FA', '#F0F4C3', '#F3E5F5', '#FCE4EC'], category: 'light' },
  { id: 'l2', name: 'Airy', colors: ['#F1F8E9', '#E0F2F1', '#F3E5F5', '#FFF3E0', '#E3F2FD'], category: 'light' },
  { id: 'l3', name: 'Pale Sky', colors: ['#E3F2FD', '#F3E5F5', '#FCE4EC', '#F1F8E9', '#E0F7FA'], category: 'light' },
  { id: 'l4', name: 'Soft Touch', colors: ['#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD'], category: 'light' },
  { id: 'l5', name: 'Cloud White', colors: ['#FFFFFF', '#F5F5F5', '#F0F0F0', '#E8E8E8', '#D3D3D3'], category: 'light' },

  // Dark
  { id: 'd1', name: 'Midnight', colors: ['#0A0E27', '#16213E', '#0F3460', '#533483', '#16213E'], category: 'dark' },
  { id: 'd2', name: 'Deep Ocean', colors: ['#001A33', '#003D66', '#005C99', '#0080CC', '#0099FF'], category: 'dark' },
  { id: 'd3', name: 'Noir', colors: ['#1A1A1A', '#2D2D2D', '#404040', '#595959', '#808080'], category: 'dark' },
  { id: 'd4', name: 'Dark Forest', colors: ['#0B3D2C', '#1B5E20', '#2E7D32', '#388E3C', '#43A047'], category: 'dark' },
  { id: 'd5', name: 'Shadow Realm', colors: ['#0D0221', '#3D0C57', '#58106E', '#7B2D85', '#A63696'], category: 'dark' },

  // Warm
  { id: 'w1', name: 'Sunset', colors: ['#FF6B35', '#F7931E', '#FDB833', '#F37335', '#FF4757'], category: 'warm' },
  { id: 'w2', name: 'Autumn Fire', colors: ['#D2691E', '#CD5C5C', '#FF4500', '#FF6347', '#FF7F50'], category: 'warm' },
  { id: 'w3', name: 'Cozy', colors: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#D2B48C'], category: 'warm' },
  { id: 'w4', name: 'Desert Heat', colors: ['#FFB84D', '#FF9500', '#FF8C00', '#FF6B00', '#FF4500'], category: 'warm' },
  { id: 'w5', name: 'Terracotta', colors: ['#E2725B', '#D97D6E', '#E8836D', '#D97E54', '#C86432'], category: 'warm' },

  // Cold
  { id: 'c1', name: 'Icy Blue', colors: ['#00D9FF', '#0099FF', '#0066FF', '#0033FF', '#6633FF'], category: 'cold' },
  { id: 'c2', name: 'Glacier', colors: ['#B0E0E6', '#87CEEB', '#4DA6FF', '#0080FF', '#004D99'], category: 'cold' },
  { id: 'c3', name: 'Arctic', colors: ['#E0F7FF', '#B3E5FF', '#80D8FF', '#40C4FF', '#00B8E6'], category: 'cold' },
  { id: 'c4', name: 'Ocean Deep', colors: ['#00A8E8', '#00C9FF', '#0080FF', '#0066CC', '#001F66'], category: 'cold' },
  { id: 'c5', name: 'Teal Dreams', colors: ['#00897B', '#00A89D', '#009B88', '#00BFA5', '#1DE9B6'], category: 'cold' },

  // Summer
  { id: 's1', name: 'Beach', colors: ['#FFD700', '#FFA500', '#FF6347', '#00CED1', '#87CEEB'], category: 'summer' },
  { id: 's2', name: 'Tropical', colors: ['#FFE5B4', '#FFDAB9', '#FFB347', '#FF69B4', '#00FF7F'], category: 'summer' },
  { id: 's3', name: 'Sunny Days', colors: ['#FFD700', '#FFED4E', '#FFA500', '#FF8C00', '#FF6347'], category: 'summer' },
  { id: 's4', name: 'Poolside', colors: ['#00CED1', '#00BFFF', '#87CEEB', '#FFD700', '#FF69B4'], category: 'summer' },
  { id: 's5', name: 'Lime Fresh', colors: ['#00FF00', '#32CD32', '#00FA9A', '#FFD700', '#FF69B4'], category: 'summer' },

  // Fall
  { id: 'f1', name: 'Autumn Leaves', colors: ['#FF4500', '#FF6347', '#FFD700', '#DC143C', '#8B4513'], category: 'fall' },
  { id: 'f2', name: 'October', colors: ['#CD5C5C', '#DC143C', '#FF7F50', '#FF8C00', '#8B4513'], category: 'fall' },
  { id: 'f3', name: 'Harvest', colors: ['#DAA520', '#FF8C00', '#DC143C', '#8B4513', '#A0522D'], category: 'fall' },
  { id: 'f4', name: 'Rust & Gold', colors: ['#B7410E', '#DC143C', '#FF6347', '#FFD700', '#CD853F'], category: 'fall' },
  { id: 'f5', name: 'Pumpkin Patch', colors: ['#FF8C00', '#FF7F50', '#FF6347', '#DC143C', '#8B4513'], category: 'fall' },

  // Winter
  { id: 'wi1', name: 'Frost', colors: ['#E0F7FA', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6'], category: 'winter' },
  { id: 'wi2', name: 'Snowfall', colors: ['#FFFFFF', '#F0F8FF', '#E0F7FA', '#B0E0E6', '#87CEEB'], category: 'winter' },
  { id: 'wi3', name: 'Icy Night', colors: ['#000080', '#0047AB', '#0080FF', '#00D9FF', '#FFFFFF'], category: 'winter' },
  { id: 'wi4', name: 'Holly & Snow', colors: ['#0B6623', '#FFFFFF', '#DC143C', '#006B3F', '#C0C0C0'], category: 'winter' },
  { id: 'wi5', name: 'Blizzard', colors: ['#E8F4F8', '#D4E8F0', '#B3D9E8', '#87CEEB', '#4DA6FF'], category: 'winter' },

  // Spring
  { id: 'sp1', name: 'Blossom', colors: ['#FFB6D9', '#FF69B4', '#FFB6C1', '#FFC0CB', '#FFE4E1'], category: 'spring' },
  { id: 'sp2', name: 'Fresh Green', colors: ['#90EE90', '#32CD32', '#00FA9A', '#00FF7F', '#3CB371'], category: 'spring' },
  { id: 'sp3', name: 'Garden', colors: ['#FFD700', '#FFB347', '#90EE90', '#87CEEB', '#FFB6D9'], category: 'spring' },
  { id: 'sp4', name: 'April Showers', colors: ['#87CEEB', '#B0E0E6', '#90EE90', '#FFB6D9', '#FFD700'], category: 'spring' },
  { id: 'sp5', name: 'Tulip Fields', colors: ['#FF1493', '#FF69B4', '#FFB6D9', '#32CD32', '#87CEEB'], category: 'spring' },
];

export function getPalettesByCategory(category: PaletteCategory): ColorPalette[] {
  return PALETTES.filter((p) => p.category === category);
}
