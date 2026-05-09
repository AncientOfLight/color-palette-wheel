import { useEffect, useRef } from 'react';
import { ColorFamily } from '../types';
import { COLOR_FAMILIES } from '../data/colors';

interface ColorWheelProps {
  selectedFamily: ColorFamily | null;
  onSelectHue: (id: string) => void;
}

export default function ColorWheel({ selectedFamily, onSelectHue }: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 4;
  const innerR = outerR * 0.55;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    // Draw color wheel segments
    const segments = 360;
    for (let i = 0; i < segments; i++) {
      const startAngle = (i / segments) * Math.PI * 2 - Math.PI / 2;
      const endAngle = ((i + 1) / segments) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, outerR, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = `hsl(${i}, 80%, 55%)`;
      ctx.fill();
    }

    // Cut inner circle (donut)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Draw color family markers
    COLOR_FAMILIES.forEach((family) => {
      const angle = (family.hue / 360) * Math.PI * 2 - Math.PI / 2;
      const markerR = (outerR + innerR) / 2;
      const mx = cx + Math.cos(angle) * markerR;
      const my = cy + Math.sin(angle) * markerR;
      const isSelected = selectedFamily?.id === family.id;
      const r = isSelected ? 11 : 7;

      ctx.beginPath();
      ctx.arc(mx, my, r + 2, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mx, my, r, 0, Math.PI * 2);
      ctx.fillStyle = family.baseHex;
      ctx.fill();

      if (isSelected) {
        ctx.beginPath();
        ctx.arc(mx, my, r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = family.baseHex;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = selectedFamily ? selectedFamily.baseHex : '#f8fafc';
    ctx.fill();

    if (selectedFamily) {
      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }, [selectedFamily, cx, cy, outerR, innerR]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const x = (e.clientX - rect.left) * scaleX - cx;
    const y = (e.clientY - rect.top) * scaleY - cy;
    const dist = Math.sqrt(x * x + y * y);

    if (dist >= innerR && dist <= outerR) {
      let angle = Math.atan2(y, x) + Math.PI / 2;
      if (angle < 0) angle += Math.PI * 2;
      const hue = (angle / (Math.PI * 2)) * 360;

      let closest: ColorFamily | null = null;
      let minDiff = Infinity;
      COLOR_FAMILIES.forEach((f) => {
        const diff = Math.abs(f.hue - hue);
        const wrappedDiff = Math.min(diff, 360 - diff);
        if (wrappedDiff < minDiff) {
          minDiff = wrappedDiff;
          closest = f;
        }
      });
      if (closest) onSelectHue((closest as ColorFamily).id);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          onClick={handleCanvasClick}
          className="cursor-pointer rounded-full drop-shadow-xl transition-transform duration-300 hover:scale-[1.02]"
          style={{ width: size, height: size }}
        />
        {selectedFamily && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: innerR * 2, height: innerR * 2, borderRadius: '50%', overflow: 'hidden' }}
          >
            <div className="text-center px-2" style={{ width: innerR * 2 - 8 }}>
              <p
                className="text-sm font-bold leading-tight truncate"
                style={{ color: selectedFamily.shades[0].hex }}
              >
                {selectedFamily.label}
              </p>
              <p
                className="text-xs font-mono mt-0.5"
                style={{ color: selectedFamily.shades[1].hex }}
              >
                {selectedFamily.baseHex}
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-3">Haz clic en la rueda para seleccionar</p>
    </div>
  );
}
