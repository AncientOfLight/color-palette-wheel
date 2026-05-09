import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ColorFamily, ColorShade } from '../types';
import { isLightColor, rgbToHsl, getComplementaryColors, getAnalogousColors, getTriadicColors, hslToHex } from '../utils/color';
import { COLOR_FAMILIES } from '../data/colors';

interface ColorDetailsProps {
  family: ColorFamily;
}

export default function ColorDetails({ family }: ColorDetailsProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedHex(text);
      setTimeout(() => setCopiedHex(null), 1500);
    });
  };

  const baseShade = family.shades[5];
  const hsl = rgbToHsl(baseShade.rgb.r, baseShade.rgb.g, baseShade.rgb.b);

  const complementaryHues = getComplementaryColors(family.hue);
  const analogousHues = getAnalogousColors(family.hue);
  const triadicHues = getTriadicColors(family.hue);

  const hueToFamily = (hue: number) => {
    let closest: ColorFamily | null = null;
    let minDiff = Infinity;
    COLOR_FAMILIES.forEach((f) => {
      const diff = Math.abs(f.hue - hue);
      const wrappedDiff = Math.min(diff, 360 - diff);
      if (wrappedDiff < minDiff) { minDiff = wrappedDiff; closest = f; }
    });
    return closest;
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div
        className="rounded-2xl p-6 shadow-lg relative overflow-hidden transition-all duration-500"
        style={{ backgroundColor: baseShade.hex }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${family.shades[3].hex}, transparent 60%),
                         radial-gradient(circle at 20% 80%, ${family.shades[8].hex}, transparent 60%)`,
          }}
        />
        <div className="relative z-10">
          <h2
            className="text-3xl font-bold"
            style={{ color: isLightColor(baseShade.hex) ? '#1f2937' : '#f9fafb' }}
          >
            {family.label}
          </h2>
          <p
            className="text-sm font-mono mt-1 opacity-80"
            style={{ color: isLightColor(baseShade.hex) ? '#374151' : '#e5e7eb' }}
          >
            HSL: {hsl.h}° {hsl.s}% {hsl.l}%
          </p>
          <div className="flex gap-3 mt-4">
            <InfoBadge label="HEX" value={baseShade.hex} light={isLightColor(baseShade.hex)} />
            <InfoBadge label="RGB" value={`${baseShade.rgb.r}, ${baseShade.rgb.g}, ${baseShade.rgb.b}`} light={isLightColor(baseShade.hex)} />
          </div>
        </div>
      </div>

      {/* Shades Grid */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Tonalidades</h3>
        <div className="space-y-1.5">
          {family.shades.map((shade) => (
            <ShadeRow key={shade.name} shade={shade} familyLabel={family.label} onCopy={copyToClipboard} copied={copiedHex === shade.hex} />
          ))}
        </div>
      </div>

      {/* Horizontal strip */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Gradiente</h3>
        <div className="flex rounded-xl overflow-hidden h-12 shadow-sm">
          {family.shades.map((shade) => (
            <button
              key={shade.name}
              onClick={() => copyToClipboard(shade.hex)}
              title={shade.hex}
              className="flex-1 transition-transform hover:scale-y-110 origin-center"
              style={{ backgroundColor: shade.hex }}
            />
          ))}
        </div>
      </div>

      {/* Color harmonies */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Armonías de color</h3>
        <div className="grid grid-cols-1 gap-3">
          <HarmonyRow label="Complementario" hues={complementaryHues} hueToFamily={hueToFamily} />
          <HarmonyRow label="Análogos" hues={analogousHues} hueToFamily={hueToFamily} />
          <HarmonyRow label="Triádico" hues={triadicHues} hueToFamily={hueToFamily} />
        </div>
      </div>
    </div>
  );
}

function InfoBadge({ label, value, light }: { label: string; value: string; light: boolean }) {
  return (
    <div
      className="rounded-lg px-3 py-1.5 text-xs font-mono"
      style={{
        backgroundColor: light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)',
        color: light ? '#1f2937' : '#f9fafb',
      }}
    >
      <span className="font-semibold mr-1">{label}</span>{value}
    </div>
  );
}

function ShadeRow({ shade, familyLabel, onCopy, copied }: { shade: ColorShade; familyLabel: string; onCopy: (hex: string) => void; copied: boolean }) {
  const hsl = rgbToHsl(shade.rgb.r, shade.rgb.g, shade.rgb.b);

  return (
    <div className="flex items-center gap-3 group">
      <div
        className="w-10 h-10 rounded-lg shrink-0 shadow-sm transition-transform group-hover:scale-105"
        style={{ backgroundColor: shade.hex }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{familyLabel} {shade.name}</span>
        </div>
        <div className="flex gap-3 text-xs text-gray-400 font-mono mt-0.5">
          <span>{shade.hex}</span>
          <span>rgb({shade.rgb.r},{shade.rgb.g},{shade.rgb.b})</span>
          <span>hsl({hsl.h},{hsl.s}%,{hsl.l}%)</span>
        </div>
      </div>
      <button
        onClick={() => onCopy(shade.hex)}
        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100"
        title="Copiar HEX"
      >
        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function HarmonyRow({ label, hues, hueToFamily }: { label: string; hues: number[]; hueToFamily: (h: number) => ColorFamily | null }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
      <span className="text-xs font-medium text-gray-500 w-24 shrink-0">{label}</span>
      <div className="flex gap-2">
        {hues.map((hue) => {
          const family = hueToFamily(hue);
          const hex = family ? family.baseHex : hslToHex(hue, 75, 55);
          return (
            <div key={hue} className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg shadow-sm" style={{ backgroundColor: hex }} />
              {family && <span className="text-xs text-gray-500">{family.label}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
