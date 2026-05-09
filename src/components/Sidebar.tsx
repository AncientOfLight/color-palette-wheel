import { useState } from 'react';
import { Search, Palette } from 'lucide-react';
import { COLOR_FAMILIES } from '../data/colors';
import { ColorFamily } from '../types';

interface SidebarProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function Sidebar({ selectedId, onSelect }: SidebarProps) {
  const [query, setQuery] = useState('');

  const filtered = COLOR_FAMILIES.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col h-full shadow-sm">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Palette size={20} className="text-sky-500" />
          <h1 className="text-base font-semibold text-gray-800 tracking-tight">Paleta de Colores</h1>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar color..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition placeholder-gray-400"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {filtered.length === 0 && (
          <p className="text-center text-xs text-gray-400 mt-6">Sin resultados</p>
        )}
        {filtered.map((color) => (
          <ColorItem
            key={color.id}
            color={color}
            isSelected={selectedId === color.id}
            onClick={() => onSelect(color.id)}
          />
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">{COLOR_FAMILIES.length} familias de colores</p>
      </div>
    </aside>
  );
}

function ColorItem({ color, isSelected, onClick }: { color: ColorFamily; isSelected: boolean; onClick: () => void }) {
  const baseShade = color.shades[5];

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group mb-0.5 ${
        isSelected
          ? 'bg-sky-50 border border-sky-200'
          : 'hover:bg-gray-50 border border-transparent'
      }`}
    >
      <div className="flex gap-0.5 shrink-0">
        {color.shades.slice(2, 8).map((shade) => (
          <div
            key={shade.name}
            className="w-3 h-6 rounded-sm first:rounded-l-md last:rounded-r-md transition-transform group-hover:scale-y-110"
            style={{ backgroundColor: shade.hex }}
          />
        ))}
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-medium truncate ${isSelected ? 'text-sky-700' : 'text-gray-700'}`}>
          {color.label}
        </p>
        <p className="text-xs text-gray-400 font-mono">{baseShade.hex}</p>
      </div>
    </button>
  );
}
