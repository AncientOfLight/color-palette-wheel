import { useState } from 'react';
import CategorySidebar from './components/CategorySidebar';
import ColorWheelAdvanced from './components/ColorWheelAdvanced';
import SearchBar from './components/SearchBar';
import PaletteCard from './components/PaletteCard';
import ToastNotification from './components/ToastNotification';
import { getPalettesByFilters } from './utils/paletteSearch';
import { type ColorCategory, PALETTE_CATEGORIES } from './data/palettes';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ColorCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hue, setHue] = useState(0);
  const [brightness, setBrightness] = useState(50);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredPalettes = getPalettesByFilters(searchQuery, selectedCategory);

  const handleColorCopy = () => {
    setToastMessage('Copied to clipboard!');
  };

  const handleColorSelect = (hex: string, selectedHue: number) => {
    setHue(selectedHue);
    setBrightness(50);
  };

  const getSelectedColorHex = () => {
    const l = 50 + (brightness - 50) * 0.5;
    const hslToRgb = (h: number, s: number, lightness: number) => {
      s /= 100;
      lightness /= 100;
      const a = s * Math.min(lightness, 1 - lightness);
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color);
      };
      return [f(0), f(8), f(4)];
    };
    const [r, g, b] = hslToRgb(hue, 100, l);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const getHSVValues = () => {
    const s = 100;
    const v = Math.round((brightness / 100) * 100);
    return { h: Math.round(hue), s, v };
  };

  const hsv = getHSVValues();
  const currentCategoryLabel = selectedCategory
    ? PALETTE_CATEGORIES.find((c) => c.id === selectedCategory)?.label
    : 'All';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950" style={{ backgroundColor: '#0b131f' }}>
      <CategorySidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Color Wheel Section */}
            <div className="lg:col-span-1">
              <div
                className="border border-gray-800 rounded-2xl p-6"
                style={{ backgroundColor: '#121e30' }}
              >
                <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-5">
                  Selector de color
                </h2>
                <ColorWheelAdvanced
                  hue={hue}
                  brightness={brightness}
                  onHueChange={setHue}
                  onBrightnessChange={setBrightness}
                />
              </div>
            </div>

            {/* Info Panels */}
            <div className="lg:col-span-2 space-y-4">
              {/* Código del color */}
              <div
                className="border border-gray-800 rounded-2xl p-6"
                style={{ backgroundColor: '#121e30' }}
              >
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  Código del color
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className="h-24 rounded-xl shadow-lg border-2"
                    style={{
                      backgroundColor: getSelectedColorHex(),
                      borderColor: `${getSelectedColorHex()}40`,
                    }}
                  />
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                        HEX
                      </label>
                      <input
                        type="text"
                        value={getSelectedColorHex()}
                        readOnly
                        className="w-full bg-gray-800 border border-gray-700 text-sky-400 font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500"
                        onClick={(e) => {
                          e.currentTarget.select();
                          navigator.clipboard.writeText(getSelectedColorHex());
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                        RGB
                      </label>
                      <input
                        type="text"
                        value={`rgb(${parseInt(getSelectedColorHex().slice(1, 3), 16)}, ${parseInt(getSelectedColorHex().slice(3, 5), 16)}, ${parseInt(getSelectedColorHex().slice(5, 7), 16)})`}
                        readOnly
                        className="w-full bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500"
                        onClick={(e) => {
                          e.currentTarget.select();
                          navigator.clipboard.writeText(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* HSV Values */}
              <div
                className="border border-gray-800 rounded-2xl p-6"
                style={{ backgroundColor: '#121e30' }}
              >
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  Valores HSV
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                      Matiz (H)
                    </label>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-center">
                      <span className="font-mono text-sm text-sky-400">{hsv.h}°</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                      Saturación (S)
                    </label>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-center">
                      <span className="font-mono text-sm text-sky-400">{hsv.s}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                      Valor (V)
                    </label>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-center">
                      <span className="font-mono text-sm text-sky-400">{hsv.v}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Grid Info */}
          <div className="mb-4">
            <p className="text-sm text-gray-400">
              Showing <span className="font-semibold text-sky-400">{filteredPalettes.length}</span> palette
              {filteredPalettes.length !== 1 ? 's' : ''} ({filteredPalettes.length * 5} colors total) from{' '}
              <span className="font-semibold text-sky-400">{currentCategoryLabel}</span>
            </p>
          </div>

          {/* Palette Grid */}
          {filteredPalettes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
              {filteredPalettes.map((palette) => (
                <PaletteCard
                  key={palette.id}
                  palette={palette}
                  onColorSelect={handleColorSelect}
                  onColorCopy={handleColorCopy}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">No palettes found</h3>
              <p className="text-gray-500 max-w-md">
                Try adjusting your search query or category filter to find the perfect color palette.
              </p>
            </div>
          )}
        </div>
      </main>

      {toastMessage && <ToastNotification message={toastMessage} />}
    </div>
  );
}
