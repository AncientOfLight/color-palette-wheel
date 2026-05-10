import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ColorPalette } from '../data/palettes';

interface PaletteGridProps {
  palettes: ColorPalette[];
}

export default function PaletteGrid({ palettes }: PaletteGridProps) {
  const [copiedPalette, setCopiedPalette] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyPaletteToClipboard = (colors: string[]) => {
    const hex = colors.join(', ');
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedPalette(colors.join('-'));
      setTimeout(() => setCopiedPalette(null), 1500);
    });
  };

  if (palettes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500 text-sm">No hay paletas en esta categoría</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {palettes.map((palette) => (
        <PaletteCard
          key={palette.id}
          palette={palette}
          isCopied={copiedPalette === palette.colors.join('-')}
          onCopy={() => copyPaletteToClipboard(palette.colors)}
          copiedColor={copiedColor}
          onColorCopy={(color) => {
            navigator.clipboard.writeText(color);
            setCopiedColor(color);
            setTimeout(() => setCopiedColor(null), 1000);
          }}
        />
      ))}
    </div>
  );
}

function PaletteCard({
  palette,
  isCopied,
  onCopy,
  copiedColor,
  onColorCopy,
}: {
  palette: ColorPalette;
  isCopied: boolean;
  onCopy: () => void;
  copiedColor: string | null;
  onColorCopy: (color: string) => void;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-200 group">
      <div className="flex h-24">
        {palette.colors.map((color, idx) => (
          <div
            key={idx}
            className="flex-1 transition-opacity group-hover:opacity-90"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-100 mb-2 truncate">{palette.name}</h3>
        <div className="flex gap-2 items-center flex-wrap mb-3">
          {palette.colors.map((color, idx) => (
            <span
              key={idx}
              className="text-xs font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-gray-200 transition-colors"
              onClick={() => onColorCopy(color)}
              title={copiedColor === color ? 'Copiado!' : 'Haz clic para copiar'}
            >
              {copiedColor === color ? <Check size={10} className="inline mr-1" /> : null}
              {color}
            </span>
          ))}
        </div>

        <button
          onClick={onCopy}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20 rounded-lg text-xs font-medium transition-all duration-150 group/btn"
        >
          {isCopied ? (
            <>
              <Check size={12} />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copiar paleta</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
