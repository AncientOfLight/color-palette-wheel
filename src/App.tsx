import { useState } from 'react';
import CategorySidebar from './components/CategorySidebar';
import ColorWheelAdvanced from './components/ColorWheelAdvanced';
import PaletteGrid from './components/PaletteGrid';
import { CATEGORIES, getPalettesByCategory, type PaletteCategory } from './data/palettes';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<PaletteCategory>('pastel');
  const [hue, setHue] = useState(0);
  const [brightness, setBrightness] = useState(50);

  const currentPalettes = getPalettesByCategory(selectedCategory);

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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <CategorySidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Color Wheel Section */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
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

            {/* Right Info Panels */}
            <div className="lg:col-span-2 space-y-4">
              {/* Color Code */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
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
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
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

          {/* Palettes Grid */}
          <div>
            <h2 className="text-lg font-bold text-gray-100 mb-4 uppercase tracking-wider">
              Paletas de {CATEGORIES.find((c) => c.id === selectedCategory)?.label.toLowerCase()}
            </h2>
            <PaletteGrid palettes={currentPalettes} />
          </div>
        </div>
      </main>
    </div>
  );
}
