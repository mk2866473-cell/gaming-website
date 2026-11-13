/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Download,
  Grid,
  Package,
  Info,
  Sparkles,
  Crosshair
} from 'lucide-react';

export interface MinecraftMapColor {
  id: string;
  name: string;
  hex: string;
  r: number;
  g: number;
  b: number;
}

export const MINECRAFT_MAP_PALETTE: MinecraftMapColor[] = [
  { id: 'white', name: 'White', hex: '#FFFFFF', r: 255, g: 255, b: 255 },
  { id: 'orange', name: 'Orange', hex: '#D87F33', r: 216, g: 127, b: 51 },
  { id: 'magenta', name: 'Magenta', hex: '#B24CD8', r: 178, g: 76, b: 216 },
  { id: 'light_blue', name: 'Light Blue', hex: '#6699D8', r: 102, g: 153, b: 216 },
  { id: 'yellow', name: 'Yellow', hex: '#E5E533', r: 229, g: 229, b: 51 },
  { id: 'lime', name: 'Lime', hex: '#7FCC19', r: 127, g: 204, b: 25 },
  { id: 'pink', name: 'Pink', hex: '#F27FA5', r: 242, g: 127, b: 165 },
  { id: 'gray', name: 'Gray', hex: '#4C4C4C', r: 76, g: 76, b: 76 },
  { id: 'light_gray', name: 'Light Gray', hex: '#999999', r: 153, g: 153, b: 153 },
  { id: 'cyan', name: 'Cyan', hex: '#4C7F99', r: 76, g: 127, b: 153 },
  { id: 'purple', name: 'Purple', hex: '#7F3FB2', r: 127, g: 63, b: 178 },
  { id: 'blue', name: 'Blue', hex: '#334CB2', r: 51, g: 76, b: 178 },
  { id: 'brown', name: 'Brown', hex: '#664C33', r: 102, g: 76, b: 51 },
  { id: 'green', name: 'Green', hex: '#667F33', r: 102, g: 127, b: 51 },
  { id: 'red', name: 'Red', hex: '#993333', r: 153, g: 51, b: 51 },
  { id: 'black', name: 'Black', hex: '#191919', r: 25, g: 25, b: 25 }
];

/**
 * Finds the nearest colour in the 16-colour Minecraft wool/concrete map palette
 * using squared RGB Euclidean distance.
 */
export function findNearestMapColor(
  r: number,
  g: number,
  b: number
): MinecraftMapColor {
  let best = MINECRAFT_MAP_PALETTE[0];
  let bestDist = Infinity;

  for (const col of MINECRAFT_MAP_PALETTE) {
    const dr = r - col.r;
    const dg = g - col.g;
    const db = b - col.b;
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) {
      bestDist = dist;
      best = col;
    }
  }
  return best;
}

const GRID_WIDTH_OPTIONS = [16, 32, 48, 64] as const;

type BlockTypeLabel = 'Wool' | 'Concrete';

function createBuiltInSampleDataUrl(): string {
  if (typeof document === 'undefined') return '';
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  if (!ctx) return '';

  // Sky gradient + sunset hills sample scene
  const grad = ctx.createLinearGradient(0, 0, 0, 44);
  grad.addColorStop(0, '#334CB2');
  grad.addColorStop(0.65, '#6699D8');
  grad.addColorStop(1, '#F27FA5');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  // Sun
  ctx.fillStyle = '#E5E533';
  ctx.beginPath();
  ctx.arc(48, 16, 7, 0, Math.PI * 2);
  ctx.fill();

  // Clouds
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(8, 10, 14, 5);
  ctx.fillRect(11, 7, 8, 3);
  ctx.fillRect(28, 19, 10, 4);

  // Mountains
  ctx.fillStyle = '#4C4C4C';
  ctx.beginPath();
  ctx.moveTo(0, 44);
  ctx.lineTo(18, 22);
  ctx.lineTo(36, 44);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#999999';
  ctx.beginPath();
  ctx.moveTo(14, 27);
  ctx.lineTo(18, 22);
  ctx.lineTo(22, 27);
  ctx.closePath();
  ctx.fill();

  // Grass terrain
  ctx.fillStyle = '#7FCC19';
  ctx.fillRect(0, 44, 64, 8);
  ctx.fillStyle = '#667F33';
  ctx.fillRect(0, 52, 64, 12);

  // Little flower & tree
  ctx.fillStyle = '#664C33';
  ctx.fillRect(46, 36, 4, 10);
  ctx.fillStyle = '#667F33';
  ctx.fillRect(41, 27, 14, 10);
  ctx.fillStyle = '#993333';
  ctx.fillRect(12, 43, 3, 3);

  return c.toDataURL('image/png');
}

export default function MinecraftPixelArtConverter() {
  const [gridWidth, setGridWidth] = useState<(typeof GRID_WIDTH_OPTIONS)[number]>(32);
  const [blockType, setBlockType] = useState<BlockTypeLabel>('Wool');
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageLabel, setImageLabel] = useState<string>('Built-in Landscape Sample');
  const [gridHeight, setGridHeight] = useState<number>(32);
  const [mappedPixels, setMappedPixels] = useState<MinecraftMapColor[]>([]);
  const [hoveredCell, setHoveredCell] = useState<{
    x: number;
    y: number;
    color: MinecraftMapColor;
  } | null>(null);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize built-in sample client-side
  useEffect(() => {
    const sample = createBuiltInSampleDataUrl();
    if (sample) setImageSrc(sample);
  }, []);

  // Process image whenever imageSrc or gridWidth changes
  useEffect(() => {
    if (!imageSrc) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled || img.width === 0 || img.height === 0) return;
      const targetW = gridWidth;
      const targetH = Math.max(1, Math.round((img.height / img.width) * targetW));

      const offscreen = document.createElement('canvas');
      offscreen.width = targetW;
      offscreen.height = targetH;
      const ctx = offscreen.getContext('2d');
      if (!ctx) return;

      // Composite transparent regions onto white so every pixel maps cleanly to 1 of 16 dyes
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);
      ctx.drawImage(img, 0, 0, targetW, targetH);

      const { data } = ctx.getImageData(0, 0, targetW, targetH);
      const result: MinecraftMapColor[] = new Array(targetW * targetH);
      for (let i = 0; i < targetW * targetH; i++) {
        const idx = i * 4;
        result[i] = findNearestMapColor(data[idx], data[idx + 1], data[idx + 2]);
      }

      setGridHeight(targetH);
      setMappedPixels(result);
      setHoveredCell(null);
    };
    img.src = imageSrc;
    return () => {
      cancelled = true;
    };
  }, [imageSrc, gridWidth]);

  // Draw crisp scaled preview grid on canvas
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || mappedPixels.length === 0) return;

    const cellSize = gridWidth <= 16 ? 24 : gridWidth <= 32 ? 14 : gridWidth <= 48 ? 10 : 8;
    const w = gridWidth * cellSize;
    const h = gridHeight * cellSize;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const col = mappedPixels[y * gridWidth + x];
        if (!col) continue;
        ctx.fillStyle = col.hex;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    if (showGridLines) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= gridWidth; x++) {
        const px = x * cellSize + 0.5;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, h);
        ctx.stroke();
      }
      for (let y = 0; y <= gridHeight; y++) {
        const py = y * cellSize + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(w, py);
        ctx.stroke();
      }
    }
  }, [mappedPixels, gridWidth, gridHeight, showGridLines]);

  const materialCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const px of mappedPixels) {
      counts.set(px.id, (counts.get(px.id) || 0) + 1);
    }
    return MINECRAFT_MAP_PALETTE.map((col) => ({
      color: col,
      count: counts.get(col.id) || 0
    }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [mappedPixels]);

  const totalBlocks = gridWidth * gridHeight;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageSrc(reader.result);
        setImageLabel(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = previewCanvasRef.current;
    if (!canvas || mappedPixels.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    const x = Math.min(gridWidth - 1, Math.max(0, Math.floor(relX * gridWidth)));
    const y = Math.min(gridHeight - 1, Math.max(0, Math.floor(relY * gridHeight)));
    const color = mappedPixels[y * gridWidth + x];
    if (color) {
      setHoveredCell({ x, y, color });
    }
  };

  const handleDownloadPng = () => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `minecraft-pixel-art-${gridWidth}x${gridHeight}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Privacy & Map Art Facts Banner */}
      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed">
          <span className="font-bold text-emerald-300">100% Client-Side Conversion:</span>{' '}
          Your images never leave your browser. Pixels map via RGB distance to the 16 Minecraft Wool/Concrete map colours.{' '}
          <span className="text-zinc-400">
            (A full Minecraft map is 128×128 = 16,384 blocks; flat art at one height is the simplest build, and material counts assume 1 block per pixel.)
          </span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Upload Image */}
          <div className="md:col-span-5 space-y-1.5">
            <span className="text-xs font-semibold text-zinc-300 block">
              Upload Image (PNG, JPG, WebP)
            </span>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload image for pixel art conversion"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Choose Image
              </button>
              <button
                type="button"
                onClick={() => {
                  const sample = createBuiltInSampleDataUrl();
                  if (sample) {
                    setImageSrc(sample);
                    setImageLabel('Built-in Landscape Sample');
                  }
                }}
                className="px-3 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Sample
              </button>
            </div>
            <p className="text-[11px] font-mono text-zinc-400 truncate">
              Active: {imageLabel}
            </p>
          </div>

          {/* Grid Width Picker */}
          <div className="md:col-span-4 space-y-1.5">
            <span className="text-xs font-semibold text-zinc-300 block">
              Grid Width (Blocks)
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {GRID_WIDTH_OPTIONS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setGridWidth(w)}
                  className={`py-2 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                    gridWidth === w
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-zinc-950 border-zinc-700 text-zinc-400 hover:text-white'
                  }`}
                >
                  {w}w
                </button>
              ))}
            </div>
            <p className="text-[11px] font-mono text-zinc-400">
              Output size: {gridWidth} × {gridHeight} ({totalBlocks.toLocaleString()} blocks)
            </p>
          </div>

          {/* Block Type & Grid Lines */}
          <div className="md:col-span-3 space-y-1.5">
            <span className="text-xs font-semibold text-zinc-300 block">
              Block &amp; Grid Display
            </span>
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg bg-zinc-950 border border-zinc-800 p-0.5 text-xs">
                {(['Wool', 'Concrete'] as BlockTypeLabel[]).map((bt) => (
                  <button
                    key={bt}
                    type="button"
                    onClick={() => setBlockType(bt)}
                    className={`px-2.5 py-1.5 rounded-md font-medium cursor-pointer ${
                      blockType === bt
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {bt}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowGridLines((v) => !v)}
                className={`px-2.5 py-2 rounded-lg border text-xs font-medium flex items-center gap-1 cursor-pointer ${
                  showGridLines
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-400'
                }`}
                title="Toggle pixel grid lines"
              >
                <Grid className="w-3.5 h-3.5" />
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Grid & Material List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Pixel Art Preview Canvas */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              Pixel-Art Blueprint Preview ({gridWidth}×{gridHeight})
            </h3>
            <button
              type="button"
              onClick={handleDownloadPng}
              className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Download Grid PNG
            </button>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center justify-center overflow-auto">
            <canvas
              ref={previewCanvasRef}
              onMouseMove={handleCanvasHover}
              onMouseLeave={() => setHoveredCell(null)}
              className="max-w-full h-auto rounded border border-zinc-700 cursor-crosshair"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* Hovered Block Readout */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 flex items-center justify-between text-xs">
            {hoveredCell ? (
              <>
                <span className="text-zinc-300 font-mono flex items-center gap-2">
                  <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                  Block ({hoveredCell.x + 1}, {hoveredCell.y + 1})
                </span>
                <span className="flex items-center gap-2 font-semibold text-white">
                  <span
                    className="w-3.5 h-3.5 rounded border border-zinc-600 inline-block"
                    style={{ backgroundColor: hoveredCell.color.hex }}
                  />
                  {hoveredCell.color.name} {blockType}{' '}
                  <span className="text-zinc-500 font-mono">({hoveredCell.color.hex})</span>
                </span>
              </>
            ) : (
              <span className="text-zinc-400">
                Hover over any pixel on the grid to inspect its row, column, and {blockType.toLowerCase()} colour.
              </span>
            )}
          </div>
        </div>

        {/* Material List */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-cyan-400" />
              Material List ({blockType})
            </h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              {totalBlocks.toLocaleString()} blocks
            </span>
          </div>

          <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
            {materialCounts.map(({ color, count }) => {
              const stacks = Math.floor(count / 64);
              const rem = count % 64;
              const pct = ((count / Math.max(1, totalBlocks)) * 100).toFixed(1);
              return (
                <div
                  key={color.id}
                  className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-5 h-5 rounded border border-zinc-600 flex-shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="truncate">
                      <div className="font-semibold text-white truncate">
                        {color.name} {blockType}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {color.hex} • {pct}%
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="font-mono font-bold text-emerald-300">
                      {count.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400">
                      {stacks > 0 ? `${stacks}s + ${rem}` : `${rem} pcs`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-zinc-400 border-t border-zinc-800 pt-3">
            Note: Counts assume 1 block per pixel in a flat single-height build. Full 1:1 map art spans 128×128 (16,384 blocks).
          </p>
        </div>
      </div>
    </div>
  );
}
