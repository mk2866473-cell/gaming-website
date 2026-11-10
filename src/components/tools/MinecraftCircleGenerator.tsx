/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, Download, Copy, Check, Eye, Layers, 
  Settings2, Grid3X3, Maximize2
} from 'lucide-react';

export default function MinecraftCircleGenerator() {
  const [width, setWidth] = useState<number>(21);
  const [height, setHeight] = useState<number>(21);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [fillMode, setFillMode] = useState<'outline' | 'filled'>('outline');
  const [thickness, setThickness] = useState<'thin' | 'thick'>('thin');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showCenterLines, setShowCenterLines] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredBlock, setHoveredBlock] = useState<{ x: number; z: number } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync height with width when locked
  const handleWidthChange = (val: number) => {
    const clamped = Math.max(3, Math.min(128, val || 3));
    setWidth(clamped);
    if (lockAspect) {
      setHeight(clamped);
    }
  };

  const handleHeightChange = (val: number) => {
    const clamped = Math.max(3, Math.min(128, val || 3));
    setHeight(clamped);
    if (lockAspect) {
      setWidth(clamped);
    }
  };

  // Compute 2D grid matrix of blocks (width x height)
  const { grid, blockCount, symmetryPoints } = useMemo(() => {
    const w = width;
    const h = height;
    const matrix: boolean[][] = Array.from({ length: h }, () => Array(w).fill(false));
    let count = 0;

    const rx = (w - 1) / 2;
    const rz = (h - 1) / 2;
    const cx = rx;
    const cz = rz;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        // Normalized ellipse distance
        const dx = (x - cx) / (rx > 0 ? rx : 1);
        const dz = (y - cz) / (rz > 0 ? rz : 1);
        const distSq = dx * dx + dz * dz;

        let isBlock = false;

        if (fillMode === 'filled') {
          isBlock = distSq <= 1.05;
        } else {
          // Outline calculation
          const innerMargin = thickness === 'thick' ? 0.75 : 0.88;
          const outerMargin = 1.06;
          isBlock = distSq <= outerMargin && distSq >= (innerMargin * innerMargin);
        }

        if (isBlock) {
          matrix[y][x] = true;
          count++;
        }
      }
    }

    // Ensure 4 cardinal extremes are marked for clean outlines
    if (fillMode === 'outline') {
      const midX = Math.floor(cx);
      const midZ = Math.floor(cz);
      const ceilX = Math.ceil(cx);
      const ceilZ = Math.ceil(cz);

      [midX, ceilX].forEach(x => {
        if (x >= 0 && x < w) {
          if (!matrix[0][x]) { matrix[0][x] = true; count++; }
          if (!matrix[h - 1][x]) { matrix[h - 1][x] = true; count++; }
        }
      });
      [midZ, ceilZ].forEach(y => {
        if (y >= 0 && y < h) {
          if (!matrix[y][0]) { matrix[y][0] = true; count++; }
          if (!matrix[y][w - 1]) { matrix[y][w - 1] = true; count++; }
        }
      });
    }

    return { grid: matrix, blockCount: count, symmetryPoints: { cx, cz } };
  }, [width, height, fillMode, thickness]);

  // Render on canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = containerRef.current;
    if (!container) return;

    // Handle high-DPI displays
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = Math.max(300, rect.width);
    const displayHeight = Math.min(600, Math.max(360, window.innerHeight * 0.55));

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Background
    ctx.fillStyle = '#09090b'; // zinc-950
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Calculate base cell size to fit canvas nicely
    const baseCellSize = Math.min(
      (displayWidth - 80) / Math.max(width, 1),
      (displayHeight - 80) / Math.max(height, 1)
    );
    const cellSize = Math.max(4, baseCellSize * zoom);

    // Grid center position with pan
    const originX = displayWidth / 2 - (width * cellSize) / 2 + panOffset.x;
    const originY = displayHeight / 2 - (height * cellSize) / 2 + panOffset.y;

    // Draw background grid lines
    if (showGrid && cellSize >= 6) {
      ctx.strokeStyle = '#18181b'; // zinc-900
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x++) {
        const posX = originX + x * cellSize;
        ctx.beginPath();
        ctx.moveTo(posX, originY);
        ctx.lineTo(posX, originY + height * cellSize);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y++) {
        const posY = originY + y * cellSize;
        ctx.beginPath();
        ctx.moveTo(originX, posY);
        ctx.lineTo(originX + width * cellSize, posY);
        ctx.stroke();
      }
    }

    // Draw Minecraft Blocks
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const isBlock = grid[y]?.[x];
        const posX = originX + x * cellSize;
        const posY = originY + y * cellSize;

        if (isBlock) {
          // Block Fill - Emerald / Cyan voxel theme
          const isHovered = hoveredBlock?.x === x && hoveredBlock?.z === y;
          ctx.fillStyle = isHovered ? '#34d399' : '#10b981'; // emerald-400 : emerald-500
          ctx.fillRect(posX + 0.5, posY + 0.5, cellSize - 1, cellSize - 1);

          // Subtle block 3D border bevel
          if (cellSize >= 10) {
            ctx.fillStyle = isHovered ? '#a7f3d0' : '#6ee7b7'; // top-left light
            ctx.fillRect(posX + 0.5, posY + 0.5, cellSize - 1, 2);
            ctx.fillRect(posX + 0.5, posY + 0.5, 2, cellSize - 1);

            ctx.fillStyle = '#047857'; // bottom-right shadow
            ctx.fillRect(posX + 0.5, posY + cellSize - 2.5, cellSize - 1, 2);
            ctx.fillRect(posX + cellSize - 2.5, posY + 0.5, 2, cellSize - 1);
          }
        }
      }
    }

    // Center crosshair lines
    if (showCenterLines) {
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)'; // red center line
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      const midPosX = originX + (width * cellSize) / 2;
      const midPosY = originY + (height * cellSize) / 2;

      ctx.beginPath();
      ctx.moveTo(midPosX, originY - 15);
      ctx.lineTo(midPosX, originY + height * cellSize + 15);
      ctx.moveTo(originX - 15, midPosY);
      ctx.lineTo(originX + width * cellSize + 15, midPosY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Outer bounding box
    ctx.strokeStyle = '#27272a'; // zinc-800
    ctx.lineWidth = 1.5;
    ctx.strokeRect(originX, originY, width * cellSize, height * cellSize);

  }, [width, height, grid, zoom, panOffset, showGrid, showCenterLines, hoveredBlock]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => renderCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderCanvas]);

  // Mouse / Canvas interaction for hover and pan
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const baseCellSize = Math.min(
      (rect.width - 80) / Math.max(width, 1),
      (rect.height - 80) / Math.max(height, 1)
    );
    const cellSize = Math.max(4, baseCellSize * zoom);
    const originX = rect.width / 2 - (width * cellSize) / 2 + panOffset.x;
    const originY = rect.height / 2 - (height * cellSize) / 2 + panOffset.y;

    const gridX = Math.floor((mouseX - originX) / cellSize);
    const gridZ = Math.floor((mouseY - originY) / cellSize);

    if (gridX >= 0 && gridX < width && gridZ >= 0 && gridZ < height) {
      setHoveredBlock({ x: gridX, z: gridZ });
    } else {
      setHoveredBlock(null);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Download canvas image
  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `minecraft-circle-${width}x${height}-${fillMode}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Copy coordinates list
  const handleCopyCoords = () => {
    const coordsList: string[] = [];
    const midX = Math.floor(width / 2);
    const midZ = Math.floor(height / 2);

    for (let z = 0; z < height; z++) {
      for (let x = 0; x < width; x++) {
        if (grid[z][x]) {
          coordsList.push(`X: ${x - midX}, Z: ${z - midZ}`);
        }
      }
    }

    navigator.clipboard.writeText(coordsList.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Grid */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 backdrop-blur">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Width / Diameter */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {lockAspect ? 'Diameter (Blocks)' : 'Width X (Blocks)'}
              </label>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                {width} blocks
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="99"
              step="1"
              value={width}
              onChange={(e) => handleWidthChange(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex gap-1.5 mt-2">
              {[9, 15, 21, 31, 45, 65].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleWidthChange(preset)}
                  className={`text-[11px] px-2 py-0.5 rounded border font-mono transition-colors ${
                    width === preset
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                      : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Height / Ellipse Depth */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Height Z (Blocks)
              </label>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                {height} blocks
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="99"
              step="1"
              disabled={lockAspect}
              value={height}
              onChange={(e) => handleHeightChange(parseInt(e.target.value, 10))}
              className={`w-full accent-cyan-500 h-2 bg-zinc-800 rounded-lg ${
                lockAspect ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            />
            <button
              onClick={() => setLockAspect(!lockAspect)}
              className={`mt-2 text-xs flex items-center justify-center gap-1.5 w-full py-1 rounded border transition-colors ${
                lockAspect
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  : 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              {lockAspect ? 'Lock 1:1 Circle' : 'Unlock Ellipse Mode'}
            </button>
          </div>

          {/* Fill & Thickness Mode */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Render Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFillMode('outline')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                  fillMode === 'outline'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                    : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Outline
              </button>
              <button
                onClick={() => setFillMode('filled')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                  fillMode === 'filled'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                    : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Filled Solid
              </button>
            </div>

            {fillMode === 'outline' && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => setThickness('thin')}
                  className={`py-1 text-[11px] rounded border transition-all ${
                    thickness === 'thin'
                      ? 'bg-zinc-700 border-zinc-500 text-zinc-100 font-medium'
                      : 'bg-zinc-800/40 border-zinc-700/40 text-zinc-500'
                  }`}
                >
                  Thin (1-Block)
                </button>
                <button
                  onClick={() => setThickness('thick')}
                  className={`py-1 text-[11px] rounded border transition-all ${
                    thickness === 'thick'
                      ? 'bg-zinc-700 border-zinc-500 text-zinc-100 font-medium'
                      : 'bg-zinc-800/40 border-zinc-700/40 text-zinc-500'
                  }`}
                >
                  Thick (2-Block)
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics & Total Blocks */}
          <div className="bg-zinc-950/70 border border-zinc-800 rounded-lg p-3 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium block">
                Total Material Needed
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {blockCount.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400">blocks</span>
              </div>
            </div>
            <div className="text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 flex justify-between items-center font-mono">
              <span>Stacks: {Math.floor(blockCount / 64)}s + {blockCount % 64}</span>
              <span className={width % 2 === 1 ? 'text-emerald-400' : 'text-amber-400'}>
                {width % 2 === 1 ? '1x1 Center' : '2x2 Center'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Blueprint Canvas Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Canvas Toolbar Header */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Interactive Blueprint Matrix ({width} × {height})
            </span>
            {hoveredBlock && (
              <span className="hidden sm:inline-block text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Offset: X={hoveredBlock.x - Math.floor(width / 2)}, Z={hoveredBlock.z - Math.floor(height / 2)}
              </span>
            )}
          </div>

          {/* Canvas Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowGrid(!showGrid)}
              title="Toggle Grid"
              className={`p-1.5 rounded text-xs border transition-colors ${
                showGrid
                  ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
              title="Zoom In"
              className="p-1.5 rounded text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
              title="Zoom Out"
              className="p-1.5 rounded text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoom(1);
                setPanOffset({ x: 0, y: 0 });
              }}
              title="Reset View"
              className="p-1.5 rounded text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-zinc-700 mx-1"></div>
            <button
              onClick={handleCopyCoords}
              className="px-2.5 py-1.5 rounded text-xs font-medium bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Coords'}
            </button>
            <button
              onClick={handleDownloadPNG}
              className="px-3 py-1.5 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow"
            >
              <Download className="w-3.5 h-3.5" />
              PNG
            </button>
          </div>
        </div>

        {/* Canvas Body */}
        <div 
          ref={containerRef} 
          className="relative bg-zinc-950 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden min-h-[380px]"
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              setIsDragging(false);
              setHoveredBlock(null);
            }}
            className="block"
          />

          <div className="absolute bottom-3 left-3 pointer-events-none text-[11px] text-zinc-500 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800/80 backdrop-blur">
            Click & drag to pan • Red dashed line marks center
          </div>
        </div>
      </div>
    </div>
  );
}
