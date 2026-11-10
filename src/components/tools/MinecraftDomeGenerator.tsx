/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, Download, Copy, Check, Eye, Layers, 
  Settings2, ChevronLeft, ChevronRight, Compass, Shield
} from 'lucide-react';

export default function MinecraftDomeGenerator() {
  const [baseDiameter, setBaseDiameter] = useState<number>(25);
  const [domeHeight, setDomeHeight] = useState<number>(13); // Default hemisphere: ceil(25/2)
  const [hollow, setHollow] = useState<boolean>(true);
  const [currentLayer, setCurrentLayer] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; z: number } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto adjust height when diameter changes if kept in sync
  const handleDiameterChange = (newDiam: number) => {
    setBaseDiameter(newDiam);
    setDomeHeight(Math.ceil(newDiam / 2));
    setCurrentLayer(1);
  };

  // Generate 3D Semi-Ellipsoid Dome Voxel Matrix
  const dome3DData = useMemo(() => {
    const size = baseDiameter;
    const isEven = size % 2 === 0;
    const radiusX = size / 2;
    const radiusZ = size / 2;
    const H = domeHeight;

    // Solid matrix for Y = 0 to H - 1
    const solidMatrix: boolean[][][] = [];
    for (let y = 0; y < H; y++) {
      solidMatrix[y] = [];
      const ny = (y + 0.5) / H; // normalized height [0, 1]
      const horizontalFactor = Math.sqrt(Math.max(0, 1 - ny * ny));
      const currentRadiusX = radiusX * horizontalFactor;
      const currentRadiusZ = radiusZ * horizontalFactor;

      for (let z = 0; z < size; z++) {
        solidMatrix[y][z] = [];
        for (let x = 0; x < size; x++) {
          const dx = isEven ? (x + 0.5 - radiusX) : (x - Math.floor(radiusX));
          const dz = isEven ? (z + 0.5 - radiusZ) : (z - Math.floor(radiusZ));
          const distSq = (dx * dx) / (currentRadiusX * currentRadiusX || 1) + (dz * dz) / (currentRadiusZ * currentRadiusZ || 1);
          solidMatrix[y][z][x] = distSq <= 1.05;
        }
      }
    }

    // Filter for hollow shell
    const finalMatrix: boolean[][][] = [];
    let totalBlocks = 0;
    const layerCounts: number[] = [];

    for (let y = 0; y < H; y++) {
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

          // Boundary check
          const isBoundary =
            x === 0 || x === size - 1 ||
            z === 0 || z === size - 1 ||
            y === H - 1 ||
            !solidMatrix[y][z][x - 1] || !solidMatrix[y][z][x + 1] ||
            !solidMatrix[y][z - 1][x] || !solidMatrix[y][z + 1][x] ||
            (y < H - 1 && !solidMatrix[y + 1][z][x]);

          finalMatrix[y][z][x] = isBoundary;
          if (isBoundary) layerCount++;
        }
      }
      layerCounts.push(layerCount);
      totalBlocks += layerCount;
    }

    return {
      size,
      height: H,
      matrix: finalMatrix,
      layerCounts,
      totalBlocks,
      stacks: (totalBlocks / 64).toFixed(1)
    };
  }, [baseDiameter, domeHeight, hollow]);

  // Draw 2D canvas slice
  const drawLayer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { size, height, matrix } = dome3DData;
    const layerIdx = Math.max(0, Math.min(height - 1, currentLayer - 1));
    const layerGrid = matrix[layerIdx];
    if (!layerGrid) return;

    const baseSize = 480;
    canvas.width = baseSize * window.devicePixelRatio;
    canvas.height = baseSize * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, baseSize, baseSize);

    const cellSize = (baseSize / size) * zoom;
    const offsetX = (baseSize - size * cellSize) / 2;
    const offsetY = (baseSize - size * cellSize) / 2;

    // Grid lines
    ctx.strokeStyle = '#27272a';
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

    // Axes
    const centerIdx = size / 2;
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(offsetX + centerIdx * cellSize, 0);
    ctx.lineTo(offsetX + centerIdx * cellSize, baseSize);
    ctx.moveTo(0, offsetY + centerIdx * cellSize);
    ctx.lineTo(baseSize, offsetY + centerIdx * cellSize);
    ctx.stroke();

    // Voxels
    for (let z = 0; z < size; z++) {
      for (let x = 0; x < size; x++) {
        if (layerGrid[z][x]) {
          const px = offsetX + x * cellSize;
          const py = offsetY + z * cellSize;

          // Glass blue-cyan voxel fill
          ctx.fillStyle = '#06b6d4'; // cyan-500
          ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);

          ctx.fillStyle = '#67e8f9'; // cyan-300 highlight
          ctx.fillRect(px + 1, py + 1, cellSize - 2, 2);
          ctx.fillRect(px + 1, py + 1, 2, cellSize - 2);
        }
      }
    }

    // Hover
    if (hoveredCell && hoveredCell.x >= 0 && hoveredCell.x < size && hoveredCell.z >= 0 && hoveredCell.z < size) {
      const hx = offsetX + hoveredCell.x * cellSize;
      const hy = offsetY + hoveredCell.z * cellSize;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(hx + 1, hy + 1, cellSize - 2, cellSize - 2);
    }
  }, [dome3DData, currentLayer, zoom, hoveredCell]);

  useEffect(() => {
    drawLayer();
  }, [drawLayer]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const baseSize = 480;
    const { size } = dome3DData;
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

  const handleCopy = () => {
    const { size, matrix } = dome3DData;
    const layerIdx = currentLayer - 1;
    const coords: string[] = [];
    const center = size / 2;

    for (let z = 0; z < size; z++) {
      for (let x = 0; x < size; x++) {
        if (matrix[layerIdx]?.[z]?.[x]) {
          const rx = Math.round(x - center);
          const rz = Math.round(z - center);
          coords.push(`Dome Layer Y=${currentLayer}: X=${rx}, Z=${rz}`);
        }
      }
    }

    navigator.clipboard.writeText(coords.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Parameters Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-zinc-800">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-zinc-300">
            <span>Base Diameter: <strong className="text-cyan-400 font-mono">{baseDiameter}</strong></span>
          </div>
          <input
            type="range"
            min="5"
            max="65"
            step="2"
            value={baseDiameter}
            onChange={(e) => handleDiameterChange(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-zinc-300">
            <span>Dome Height: <strong className="text-cyan-400 font-mono">{domeHeight} layers</strong></span>
          </div>
          <input
            type="range"
            min="3"
            max={Math.ceil(baseDiameter)}
            value={domeHeight}
            onChange={(e) => setDomeHeight(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 block">Structure Type</label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
            <button
              onClick={() => setHollow(true)}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                hollow ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Hollow Glass
            </button>
            <button
              onClick={() => setHollow(false)}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !hollow ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Solid Core
            </button>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 flex flex-col justify-center text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Total Dome Blocks</span>
          <span className="text-base font-mono font-extrabold text-cyan-400">
            {dome3DData.totalBlocks.toLocaleString()} blocks
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">
            ~{dome3DData.stacks} stacks (64)
          </span>
        </div>
      </div>

      {/* Layer Stepper */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-zinc-200">
            Layer Y=<span className="text-cyan-400 font-mono">{currentLayer}</span> of {domeHeight} ({currentLayer === 1 ? 'Ground Foundation' : currentLayer === domeHeight ? 'Zenith Apex' : 'Wall Section'})
          </span>
          <span className="text-[11px] font-mono text-zinc-400 ml-2 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            {dome3DData.layerCounts[currentLayer - 1] || 0} blocks
          </span>
        </div>

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
            max={domeHeight}
            value={currentLayer}
            onChange={(e) => setCurrentLayer(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <button
            onClick={() => setCurrentLayer((prev) => Math.min(domeHeight, prev + 1))}
            disabled={currentLayer >= domeHeight}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 text-zinc-200 border border-zinc-700"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas and Layer List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 flex flex-col items-center justify-center bg-zinc-950 border border-zinc-800 rounded-2xl p-4 relative min-h-[440px]">
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 bg-zinc-900/90 border border-zinc-700 rounded-xl p-1 backdrop-blur shadow-lg">
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-zinc-300 px-1">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
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
              Relative: X={hoveredCell.x - Math.floor(baseDiameter / 2)}, Z={hoveredCell.z - Math.floor(baseDiameter / 2)} | Y={currentLayer}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Layer Height Guide
            </h4>
            <div className="max-h-64 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
              {dome3DData.layerCounts.map((count, idx) => {
                const layerNum = idx + 1;
                const isSelected = layerNum === currentLayer;
                return (
                  <button
                    key={layerNum}
                    onClick={() => setCurrentLayer(layerNum)}
                    className={`w-full text-left px-2.5 py-1 rounded flex justify-between items-center transition-colors ${
                      isSelected
                        ? 'bg-cyan-500 text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    <span>Layer Y={layerNum}</span>
                    <span>{count} blocks</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Layer Coords!' : 'Copy Layer Coordinates'}
          </button>
        </div>
      </div>
    </div>
  );
}
