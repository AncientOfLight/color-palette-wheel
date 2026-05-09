import { useState } from 'react';
import { Search, X, AlertCircle } from 'lucide-react';
import { findColorByHex, findColorsByName } from '../data/colors';
import { isLightColor } from '../utils/color';
import { ColorFamily } from '../types';

interface HexSearchProps {
  onSelect: (id: string) => void;
}

interface SearchResult {
  family: ColorFamily;
  shade: { name: string; hex: string; rgb: { r: number; g: number; b: number } };
}

export default function HexSearch({ onSelect }: HexSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearched(true);

    const q = query.trim();
    if (q.startsWith('#') || /^[0-9a-fA-F]{3,6}$/.test(q)) {
      const hex = q.startsWith('#') ? q : `#${q}`;
      const result = findColorByHex(hex);
      setResults(result ? [result] : []);
    } else {
      setResults(findColorsByName(q));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar hex (#ff0000) o nombre..."
            className="w-full pl-8 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white placeholder-gray-400"
          />
          {query && (
            <button onClick={handleClear} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Buscar
        </button>
      </div>

      {searched && results.length === 0 && (
        <div className="mt-3 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
          <AlertCircle size={14} />
          <span>No se encontraron resultados para <strong>{query}</strong></span>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-3 space-y-2">
          {results.map(({ family, shade }) => (
            <button
              key={`${family.id}-${shade.name}`}
              onClick={() => { onSelect(family.id); handleClear(); }}
              className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-sky-300 hover:shadow-sm transition-all text-left"
            >
              <div
                className="w-10 h-10 rounded-lg shrink-0 shadow-sm"
                style={{ backgroundColor: shade.hex }}
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {family.label} <span className="text-gray-400 font-normal">{shade.name}</span>
                </p>
                <p className="text-xs font-mono text-gray-500">{shade.hex}</p>
              </div>
              <div className="ml-auto">
                <span
                  className="text-xs font-medium px-2 py-1 rounded-md"
                  style={{
                    backgroundColor: shade.hex,
                    color: isLightColor(shade.hex) ? '#1f2937' : '#f9fafb',
                  }}
                >
                  Ver
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
