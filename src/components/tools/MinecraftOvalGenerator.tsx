/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, Download, Copy, Check, Eye, Layers, 
  Settings2, Grid3X3, Maximize2
} from 'lucide-react';

export default function MinecraftOvalGenerator() {
  const [diameterX, setDiameterX] = useState<number>(31);
  const [diameterZ, setDiameterZ] = useState<number>(19);
  const [hollow, setHollow] = useState<boolean>(true);
  const [thickness, setThickness] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; z: number } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate 2D Ellipse Matrix
  const gridData = useMemo(() => {
    const sizeX = diameterX;
    const sizeZ = diameterZ;
    const isEvenX = sizeX % 2 === 0;
    const isEvenZ = sizeZ % 2 === 0;
    const radiusX = sizeX / 2;
    const radiusZ = sizeZ / 2;

    const innerRadiusX = Math.max(0.5, radiusX - thickness);
    const innerRadiusZ = Math.max(0.5, radiusZ - thickness);

    const matrix: boolean[][] = [];
    let totalBlocks = 0;

    for (let z = 0; z < sizeZ; z++) {
      matrix[z] = [];
      for (let x = 0; x < sizeX; x++) {
        const dx = isEvenX ? (x + 0.5 - radiusX) : (x - Math.floor(radiusX));
        const dz = isEvenZ ? (z + 0.5 - radiusZ) : (z - Math.floor(radiusZ));

        // Outer Ellipse check
        const outerVal = (dx * dx) / (radiusX * radiusX) + (dz * dz) / (radiusZ * radiusZ);
        const isInsideOuter = outerVal <= 1.05;

        if (!isInsideOuter) {
          matrix[z][x] = false;
          continue;
        }

        if (!hollow) {
          matrix[z][x] = true;
          totalBlocks++;
          continue;
        }

        // Inner Ellipse check
        const innerVal = (dx * dx) / (innerRadiusX * innerRadiusX) + (dz * dz) / (innerRadiusZ * innerRadiusZ);
        const isInsideInner = innerVal < 1.0;

        const isBorder = isInsideOuter && !isInsideInner;
        matrix[z][x] = isBorder;
        if (isBorder) totalBlocks++;
      }
    }

    return {
      sizeX,
      sizeZ,
      matrix,
      totalBlocks,
      stacks: (totalBlocks / 64).toFixed(1)
    };
  }, [diameterX, diameterZ, hollow, thickness]);

  // Draw on Canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { sizeX, sizeZ, matrix } = gridData;
    const baseW = 540;
    const baseH = 380;
    canvas.width = baseW * window.devicePixelRatio;
    canvas.height = baseH * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, baseW, baseH);

    const maxCells = Math.max(sizeX, sizeZ);
    const cellSize = (Math.min(baseW / sizeX, baseH / sizeZ) * 0.9) * zoom;
    const offsetX = (baseW - sizeX * cellSize) / 2;
    const offsetY = (baseH - sizeZ * cellSize) / 2;

    // Grid lines
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;
    for (let x = 0; x <= sizeX; x++) {
      const px = offsetX + x * cellSize;
      ctx.beginPath();
      ctx.moveTo(px, offsetY);
      ctx.lineTo(px, offsetY + sizeZ * cellSize);
      ctx.stroke();
    }
    for (let z = 0; z <= sizeZ; z++) {
      const py = offsetY + z * cellSize;
      ctx.beginPath();
      ctx.moveTo(offsetX, py);
      ctx.lineTo(offsetX + sizeX * cellSize, py);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 1.5;
    const cx = offsetX + (sizeX / 2) * cellSize;
    const cy = offsetY + (sizeZ / 2) * cellSize;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, baseH);
    ctx.moveTo(0, cy);
    ctx.lineTo(baseW, cy);
    ctx.stroke();

    // Voxel Blocks
    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        if (matrix[z][x]) {
          const px = offsetX + x * cellSize;
          const py = offsetY + z * cellSize;

          ctx.fillStyle = '#10b981'; // emerald-500
          ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);

          ctx.fillStyle = '#34d399'; // emerald-400
          ctx.fillRect(px + 1, py + 1, cellSize - 2, 2);
          ctx.fillRect(px + 1, py + 1, 2, cellSize - 2);
        }
      }
    }

    // Hover Cell
    if (hoveredCell && hoveredCell.x >= 0 && hoveredCell.x < sizeX && hoveredCell.z >= 0 && hoveredCell.z < sizeZ) {
      const hx = offsetX + hoveredCell.x * cellSize;
      const hy = offsetY + hoveredCell.z * cellSize;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(hx + 1, hy + 1, cellSize - 2, cellSize - 2);
    }
  }, [gridData, zoom, hoveredCell]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { sizeX, sizeZ } = gridData;
    const baseW = 540;
    const baseH = 380;
    const cellSize = (Math.min(baseW / sizeX, baseH / sizeZ) * 0.9) * zoom;
    const offsetX = (baseW - sizeX * cellSize) / 2;
    const offsetY = (baseH - sizeZ * cellSize) / 2;

    const gridX = Math.floor((x - offsetX) / cellSize);
    const gridZ = Math.floor((y - offsetY) / cellSize);

    if (gridX >= 0 && gridX < sizeX && gridZ >= 0 && gridZ < sizeZ) {
      setHoveredCell({ x: gridX, z: gridZ });
    } else {
      setHoveredCell(null);
    }
  };

  const handleCopy = () => {
    const { sizeX, sizeZ, matrix } = gridData;
    const coords: string[] = [];
    const centerX = sizeX / 2;
    const centerZ = sizeZ / 2;

    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        if (matrix[z][x]) {
          const rx = Math.round(x - centerX);
          const rz = Math.round(z - centerZ);
          coords.push(`X=${rx}, Z=${rz}`);
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
            <span>Width (X-Axis): <strong className="text-emerald-400 font-mono">{diameterX} blocks</strong></span>
          </div>
          <input
            type="range"
            min="5"
            max="65"
            step="2"
            value={diameterX}
            onChange={(e) => setDiameterX(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-zinc-300">
            <span>Length (Z-Axis): <strong className="text-emerald-400 font-mono">{diameterZ} blocks</strong></span>
          </div>
          <input
            type="range"
            min="5"
            max="65"
            step="2"
            value={diameterZ}
            onChange={(e) => setDiameterZ(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 block">Style Mode</label>
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
              Filled
            </button>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 flex flex-col justify-center text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Total Blocks Required</span>
          <span className="text-base font-mono font-extrabold text-emerald-400">
            {gridData.totalBlocks.toLocaleString()} blocks
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">
            ~{gridData.stacks} stacks (64)
          </span>
        </div>
      </div>

      {/* Canvas Display */}
      <div className="flex flex-col items-center justify-center bg-zinc-950 border border-zinc-800 rounded-2xl p-4 relative min-h-[400px]">
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
          style={{ width: '100%', maxWidth: '540px', height: 'auto', aspectRatio: '540/380' }}
          className="rounded-lg shadow-inner cursor-crosshair"
        />

        {hoveredCell && (
          <div className="absolute bottom-3 left-3 bg-zinc-900/90 border border-zinc-700 rounded-lg px-2.5 py-1 text-[11px] font-mono text-zinc-300 backdrop-blur">
            Relative Coord: X={hoveredCell.x - Math.floor(diameterX / 2)}, Z={hoveredCell.z - Math.floor(diameterZ / 2)}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleCopy}
          className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Coordinates!' : 'Copy Voxel Coordinates'}
        </button>
      </div>
    </div>
  );
}
