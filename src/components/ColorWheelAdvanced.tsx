import { useEffect, useRef, useState } from 'react';

interface ColorWheelAdvancedProps {
  hue: number;
  brightness: number;
  onHueChange: (hue: number) => void;
  onBrightnessChange: (brightness: number) => void;
}

export default function ColorWheelAdvanced({
  hue,
  brightness,
  onHueChange,
  onBrightnessChange,
}: ColorWheelAdvancedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const size = 280;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 8;

    ctx.clearRect(0, 0, size, size);

    // Draw conical gradient color wheel
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const pixelIndex = i / 4;
      const y = Math.floor(pixelIndex / size);
      const x = pixelIndex % size;

      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;

        // Calculate saturation based on distance
        const sat = Math.min((dist / radius) * 100, 100);

        // Convert HSL to RGB
        const hslToRgb = (h: number, s: number, l: number) => {
          s /= 100;
          l /= 100;
          const a = s * Math.min(l, 1 - l);
          const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color);
          };
          return [f(0), f(8), f(4)];
        };

        const [r, g, b] = hslToRgb(angle, sat, 50);
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = 255;
      } else {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Draw circle border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw selection pointer (ring)
    const angle = (hue / 360) * Math.PI * 2 - Math.PI / 2;
    const pointerRadius = (radius * (brightness / 100)) * 0.8 + radius * 0.1;
    const px = centerX + Math.cos(angle) * pointerRadius;
    const py = centerY + Math.sin(angle) * pointerRadius;

    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [hue, brightness]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    onHueChange(Math.round(angle) % 360);
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBrightnessChange(parseInt(e.target.value));
  };

  const getSelectedColor = () => {
    const hslToRgb = (h: number, s: number, l: number) => {
      s /= 100;
      l /= 100;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color);
      };
      return `rgb(${f(0)}, ${f(8)}, ${f(4)})`;
    };
    return hslToRgb(hue, 100, 50 + (brightness - 50) * 0.5);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          onClick={handleCanvasClick}
          className="cursor-crosshair rounded-full drop-shadow-lg"
          style={{ width: size, height: size }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">BRILLO</label>
          <span className="text-xs font-mono text-sky-400">{brightness}%</span>
        </div>
        <div
          ref={sliderRef}
          className="relative h-6 rounded-full overflow-hidden shadow-lg border border-gray-600"
          style={{
            background: `linear-gradient(to right, #000000, ${getSelectedColor()})`,
          }}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={handleBrightnessChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            style={{ WebkitAppearance: 'none' }}
          />
          <div
            className="absolute top-0 h-full w-1 bg-white rounded-sm shadow-lg pointer-events-none"
            style={{
              left: `calc(${brightness}% - 2px)`,
              boxShadow: '0 0 8px rgba(255,255,255,0.6)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
