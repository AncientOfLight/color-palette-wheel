import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Palette } from '../data/palettes';

interface PaletteCardProps {
  palette: Palette;
  onColorSelect: (hex: string, hue: number) => void;
  onColorCopy: (hex: string) => void;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getHueFromRgb(r: number, g: number, b: number): number {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;

  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return Math.round(h * 360) % 360;
}

export default function PaletteCard({ palette, onColorSelect, onColorCopy }: PaletteCardProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleColorClick = (hex: string) => {
    navigator.clipboard.writeText(hex);
    onColorCopy(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1000);

    const rgb = hexToRgb(hex);
    if (rgb) {
      const hue = getHueFromRgb(rgb.r, rgb.g, rgb.b);
      onColorSelect(hex, hue);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-200 group">
      <div className="flex h-20 overflow-hidden">
        {palette.colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => handleColorClick(color)}
            className="flex-1 transition-all duration-150 hover:flex-[1.1] cursor-pointer relative group/color"
            style={{ backgroundColor: color }}
            title={`Click to copy ${color}`}
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/color:opacity-100 transition-opacity flex items-center justify-center">
              <Copy size={14} className="text-white opacity-80" />
            </div>
          </button>
        ))}
      </div>

      <div className="p-3 bg-gradient-to-b from-gray-900 to-gray-800/50">
        <h3 className="text-xs font-semibold text-gray-100 mb-2 truncate">{palette.name}</h3>

        <div className="grid grid-cols-5 gap-0.5">
          {palette.colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => handleColorClick(color)}
              className={`text-xs font-mono px-1.5 py-0.5 rounded transition-all duration-150 cursor-pointer ${
                copiedColor === color
                  ? 'bg-green-900/40 text-green-300 border border-green-500/50'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200 hover:border-gray-600'
              }`}
              title="Click to copy"
            >
              {color.slice(1).toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
