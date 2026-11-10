/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, Download, Copy, Check, Eye, Layers, 
  Settings2, Grid3X3, Maximize2, ChevronLeft, ChevronRight, Box
} from 'lucide-react';

export default function MinecraftSphereGenerator() {
  const [diameter, setDiameter] = useState<number>(21);
  const [hollow, setHollow] = useState<boolean>(true);
  const [currentLayer, setCurrentLayer] = useState<number>(11); // 1-indexed, middle layer
  const [zoom, setZoom] = useState<number>(1);
  const [showCoordinates, setShowCoordinates] = useState<boolean>(true);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; z: number } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [mode3D, setMode3D] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync middle layer when diameter changes
  useEffect(() => {
    setCurrentLayer(Math.ceil(diameter / 2));
  }, [diameter]);

  // Compute full 3D discrete sphere grid: array of 2D grids for each Y level
  const sphere3DData = useMemo(() => {
    const size = diameter;
    const isEven = size % 2 === 0;
    const radius = size / 2;
    const center = radius; // center coordinate in float

    // 3D boolean voxel matrix [y][z][x]
    const solidMatrix: boolean[][][] = [];
    for (let y = 0; y < size; y++) {
      solidMatrix[y] = [];
      for (let z = 0; z < size; z++) {
        solidMatrix[y][z] = [];
        for (let x = 0; x < size; x++) {
          const dx = isEven ? (x + 0.5 - center) : (x - Math.floor(center));
          const dy = isEven ? (y + 0.5 - center) : (y - Math.floor(center));
          const dz = isEven ? (z + 0.5 - center) : (z - Math.floor(center));
          const distSq = dx * dx + dy * dy + dz * dz;
          // Euclidean discrete sphere radius tolerance
          solidMatrix[y][z][x] = distSq <= (radius + 0.05) * (radius + 0.05);
        }
      }
    }

    // Hollow matrix filtering: keep voxels that touch an empty 6-connected neighbor
    const finalMatrix: boolean[][][] = [];
    let totalBlocks = 0;
    const layerCounts: number[] = [];

    for (let y = 0; y < size; y++) {
      finalMatrix[y] = [];
      let layerCount = 0;
      for (let z = 0; z < size; z++) {
        finalMatrix[y][z] = [];
        for (let x = 0; x < size; x++) {
          if (!solidMatrix[y][z][x]) {
            finalMatrix[y][z][x] = false;
            continue;
          }
          if (!hollow) {
            finalMatrix[y][z][x] = true;
            layerCount++;
            continue;
          }

          // Check if any 6-neighbor is false (empty)
          const isBoundary =
            x === 0 || x === size - 1 ||
            y === 0 || y === size - 1 ||
            z === 0 || z === size - 1 ||
            !solidMatrix[y][z][x - 1] || !solidMatrix[y][z][x + 1] ||
            !solidMatrix[y][z - 1][x] || !solidMatrix[y][z + 1][x] ||
            !solidMatrix[y - 1][z][x] || !solidMatrix[y + 1][z][x];

          finalMatrix[y][z][x] = isBoundary;
          if (isBoundary) layerCount++;
        }
      }
      layerCounts.push(layerCount);
      totalBlocks += layerCount;
    }

    return {
      size,
      matrix: finalMatrix,
      layerCounts,
      totalBlocks,
      stacks: (totalBlocks / 64).toFixed(1)
    };
  }, [diameter, hollow]);

  // Render 2D Slice Canvas
  const drawLayer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { size, matrix } = sphere3DData;
    const layerIdx = Math.max(0, Math.min(size - 1, currentLayer - 1));
    const layerGrid = matrix[layerIdx];
    if (!layerGrid) return;

    const baseSize = 480;
    canvas.width = baseSize * window.devicePixelRatio;
    canvas.height = baseSize * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.fillStyle = '#09090b'; // zinc-950
    ctx.fillRect(0, 0, baseSize, baseSize);

    const cellSize = (baseSize / size) * zoom;
    const offsetX = (baseSize - size * cellSize) / 2;
    const offsetY = (baseSize - size * cellSize) / 2;

    // Draw Grid Lines
    ctx.strokeStyle = '#27272a'; // zinc-800
    ctx.lineWidth = 1;
    for (let i = 0; i <= size; i++) {
      const pos = offsetX + i * cellSize;
      if (pos >= 0 && pos <= baseSize) {
        ctx.beginPath();
        ctx.moveTo(pos, Math.max(0, offsetY));
        ctx.lineTo(pos, Math.min(baseSize, offsetY + size * cellSize));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(Math.max(0, offsetX), pos);
        ctx.lineTo(Math.min(baseSize, offsetX + size * cellSize), pos);
        ctx.stroke();
      }
    }

    // Draw Center Axes
    const centerIdx = size / 2;
    ctx.strokeStyle = '#3f3f46'; // zinc-700
    ctx.lineWidth = 1.5;
    const cx = offsetX + centerIdx * cellSize;
    const cy = offsetY + centerIdx * cellSize;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, baseSize);
    ctx.moveTo(0, cy);
    ctx.lineTo(baseSize, cy);
    ctx.stroke();

    // Draw Voxels
    for (let z = 0; z < size; z++) {
      for (let x = 0; x < size; x++) {
        if (layerGrid[z][x]) {
          const px = offsetX + x * cellSize;
          const py = offsetY + z * cellSize;

          // Block Fill
          ctx.fillStyle = '#10b981'; // emerald-500
          ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);

          // Subtle Highlight Top-Left
          ctx.fillStyle = '#34d399'; // emerald-400
          ctx.fillRect(px + 1, py + 1, cellSize - 2, 2);
          ctx.fillRect(px + 1, py + 1, 2, cellSize - 2);
        }
      }
    }

    // Hover Highlight
    if (hoveredCell && hoveredCell.x >= 0 && hoveredCell.x < size && hoveredCell.z >= 0 && hoveredCell.z < size) {
      const hx = offsetX + hoveredCell.x * cellSize;
      const hy = offsetY + hoveredCell.z * cellSize;
      ctx.strokeStyle = '#f59e0b'; // amber-500
      ctx.lineWidth = 2;
      ctx.strokeRect(hx + 1, hy + 1, cellSize - 2, cellSize - 2);
    }
  }, [sphere3DData, currentLayer, zoom, hoveredCell]);

  useEffect(() => {
    drawLayer();
  }, [drawLayer]);

  // Handle Canvas Mouse Move
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const baseSize = 480;
    const { size } = sphere3DData;
    const cellSize = (baseSize / size) * zoom;
    const offsetX = (baseSize - size * cellSize) / 2;
    const offsetY = (baseSize - size * cellSize) / 2;

    const gridX = Math.floor((x - offsetX) / cellSize);
    const gridZ = Math.floor((y - offsetY) / cellSize);

    if (gridX >= 0 && gridX < size && gridZ >= 0 && gridZ < size) {
      setHoveredCell({ x: gridX, z: gridZ });
    } else {
      setHoveredCell(null);
    }
  };

  const handleCopyCoords = () => {
    const { size, matrix } = sphere3DData;
    const layerIdx = currentLayer - 1;
    const coords: string[] = [];
    const center = size / 2;

    for (let z = 0; z < size; z++) {
      for (let x = 0; x < size; x++) {
        if (matrix[layerIdx]?.[z]?.[x]) {
          const rx = Math.round(x - center);
          const rz = Math.round(z - center);
          coords.push(`Layer Y=${currentLayer}: X=${rx}, Z=${rz}`);
        }
      }
    }

    navigator.clipboard.writeText(coords.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Controls Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-zinc-800">
        {/* Diameter Slider */}
        <div className="space-y-1.5 md:col-span-2">
          <div className="flex justify-between text-xs font-semibold text-zinc-300">
            <span>Sphere Diameter: <strong className="text-emerald-400 font-mono">{diameter} blocks</strong></span>
            <span className="text-zinc-500 font-mono">Radius: {(diameter / 2).toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="3"
            max="65"
            step="2" // Default odd diameters for clean centers
            value={diameter}
            onChange={(e) => setDiameter(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>3 (Small)</span>
            <span>21 (Standard)</span>
            <span>41 (Mega)</span>
            <span>65 (Titan)</span>
          </div>
        </div>

        {/* Hollow / Filled Toggle */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 block">Structure Shell</label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
            <button
              onClick={() => setHollow(true)}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                hollow ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Hollow
            </button>
            <button
              onClick={() => setHollow(false)}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !hollow ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Solid
            </button>
          </div>
        </div>

        {/* Quick Stats Box */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 flex flex-col justify-center text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Total Blocks Needed</span>
          <span className="text-base font-mono font-extrabold text-emerald-400">
            {sphere3DData.totalBlocks.toLocaleString()} blocks
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">
            ~{sphere3DData.stacks} stacks (64)
          </span>
        </div>
      </div>

      {/* Layer Stepper Bar */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-zinc-200">
            Vertical Slice: Layer <span className="text-emerald-400 font-mono">{currentLayer}</span> of {diameter}
          </span>
          <span className="text-[11px] font-mono text-zinc-400 ml-2 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            {sphere3DData.layerCounts[currentLayer - 1] || 0} blocks this layer
          </span>
        </div>

        {/* Stepper buttons & slider */}
        <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
          <button
            onClick={() => setCurrentLayer((prev) => Math.max(1, prev - 1))}
            disabled={currentLayer <= 1}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 text-zinc-200 border border-zinc-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <input
            type="range"
            min="1"
            max={diameter}
            value={currentLayer}
            onChange={(e) => setCurrentLayer(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <button
            onClick={() => setCurrentLayer((prev) => Math.min(diameter, prev + 1))}
            disabled={currentLayer >= diameter}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 text-zinc-200 border border-zinc-700"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentLayer(Math.ceil(diameter / 2))}
            className="text-[10px] font-mono font-semibold px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 whitespace-nowrap"
          >
            Equator
          </button>
        </div>
      </div>

      {/* Canvas Area & Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 relative min-h-[440px] overflow-hidden">
          {/* Zoom controls */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 bg-zinc-900/90 border border-zinc-700/80 rounded-xl p-1 backdrop-blur shadow-lg">
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-zinc-300 px-1">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <canvas
            ref={canvasRef}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setHoveredCell(null)}
            style={{ width: '100%', maxWidth: '440px', height: 'auto', aspectRatio: '1/1' }}
            className="rounded-lg shadow-inner cursor-crosshair"
          />

          {hoveredCell && (
            <div className="absolute bottom-3 left-3 bg-zinc-900/90 border border-zinc-700 rounded-lg px-2.5 py-1 text-[11px] font-mono text-zinc-300 backdrop-blur">
              Relative Coord: X={hoveredCell.x - Math.floor(diameter / 2)}, Z={hoveredCell.z - Math.floor(diameter / 2)} | Layer Y={currentLayer}
            </div>
          )}
        </div>

        {/* Layer Breakdown Sidebar */}
        <div className="space-y-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Layer Height Guide
            </h4>
            <div className="max-h-64 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
              {sphere3DData.layerCounts.map((count, idx) => {
                const layerNum = idx + 1;
                const isSelected = layerNum === currentLayer;
                const isEquator = layerNum === Math.ceil(diameter / 2);
                return (
                  <button
                    key={layerNum}
                    onClick={() => setCurrentLayer(layerNum)}
                    className={`w-full text-left px-2.5 py-1 rounded flex justify-between items-center transition-colors ${
                      isSelected
                        ? 'bg-emerald-500 text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    <span>Y={layerNum} {isEquator ? '⭐' : ''}</span>
                    <span>{count} blocks</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleCopyCoords}
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied Layer Coords!' : 'Copy Layer Coordinates'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
