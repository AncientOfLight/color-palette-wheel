import { getAllPalettes, getPalettesByCategory, type Palette, type ColorCategory } from '../data/palettes';

export function getPalettesByFilters(search: string, category: ColorCategory | null): Palette[] {
  const source = category ? getPalettesByCategory(category) : getAllPalettes();

  if (!search.trim()) return source;

  const q = search.toLowerCase().trim();
  return source.filter((palette) => {
    if (palette.name.toLowerCase().includes(q)) return true;
    if (palette.tags.some((tag) => tag.toLowerCase().includes(q))) return true;
    if (palette.categories.some((cat) => cat.toLowerCase().includes(q))) return true;
    if (palette.colors.some((color) => color.toLowerCase().includes(q))) return true;
    return false;
  });
}

export function searchPalettes(query: string): Palette[] {
  return getPalettesByFilters(query, null);
}

export function filterByCategory(category: ColorCategory | null): Palette[] {
  return getPalettesByFilters('', category);
}
