import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ColorWheel from './components/ColorWheel';
import ColorDetails from './components/ColorDetails';
import HexSearch from './components/HexSearch';
import { COLOR_FAMILIES } from './data/colors';
import { ColorFamily } from './types';

function getHashColor(): string | null {
  const hash = window.location.hash.replace('#', '');
  return hash || null;
}

function setHashColor(id: string) {
  window.history.pushState(null, '', `#${id}`);
}

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const hash = getHashColor();
    const valid = COLOR_FAMILIES.find((c) => c.id === hash);
    return valid ? hash : COLOR_FAMILIES[5].id;
  });

  const selectedFamily: ColorFamily | null =
    COLOR_FAMILIES.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    const onHashChange = () => {
      const id = getHashColor();
      const valid = COLOR_FAMILIES.find((c) => c.id === id);
      if (valid) setSelectedId(id);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setHashColor(id);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Sidebar selectedId={selectedId} onSelect={handleSelect} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500"
                style={{ backgroundColor: selectedFamily?.baseHex ?? '#3b82f6' }}
              >
                <Palette size={16} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Rueda de Colores</h1>
            </div>
            <p className="text-sm text-gray-500 ml-11">Explora paletas, tonos y armonias de color</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5 self-start">
                  Rueda interactiva
                </h2>
                <ColorWheel selectedFamily={selectedFamily} onSelectHue={handleSelect} />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Buscar por HEX o nombre
                </h2>
                <HexSearch onSelect={handleSelect} />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Acceso rapido
                </h2>
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_FAMILIES.map((family) => (
                    <button
                      key={family.id}
                      onClick={() => handleSelect(family.id)}
                      title={family.label}
                      className={`aspect-square rounded-xl transition-all duration-150 shadow-sm hover:scale-110 hover:shadow-md ${
                        selectedId === family.id ? 'ring-2 ring-offset-2 scale-110 shadow-md' : ''
                      }`}
                      style={{
                        backgroundColor: family.baseHex,
                        outlineColor: family.baseHex,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {selectedFamily ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
                    Detalles del color
                  </h2>
                  <ColorDetails family={selectedFamily} />
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <Palette size={40} className="text-gray-200 mb-3" />
                  <p className="text-gray-400 text-sm">Selecciona un color para ver sus detalles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
