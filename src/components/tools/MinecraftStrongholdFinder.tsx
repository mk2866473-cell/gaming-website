/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Crosshair,
  AlertTriangle,
  Copy,
  Check,
  Info,
  Sparkles,
  Navigation,
  MapPin
} from 'lucide-react';

export interface TriangulationInput {
  x1: number;
  z1: number;
  yaw1: number;
  x2: number;
  z2: number;
  yaw2: number;
}

export interface TriangulationResult {
  status: 'ok' | 'parallel';
  errorMessage?: string;
  x?: number;
  z?: number;
  roundedX?: number;
  roundedZ?: number;
  chunkX?: number;
  chunkZ?: number;
  netherX?: number;
  netherZ?: number;
  distanceFromThrow1?: number;
  distanceFromThrow2?: number;
  distanceFromSpawn?: number;
  inFirstRing?: boolean;
  t1?: number;
  t2?: number;
  angleBetweenDeg?: number;
  behindWarning?: boolean;
  dx1: number;
  dz1: number;
  dx2: number;
  dz2: number;
}

/**
 * Triangulates the intersection of two Eye of Ender rays in Minecraft Java Edition.
 * Minecraft yaw convention: yaw = 0 faces south (+Z), yaw = -90 faces east (+X).
 * Direction vector: dx = -sin(yawRad), dz = cos(yawRad).
 */
export function triangulateStronghold(input: TriangulationInput): TriangulationResult {
  const rad1 = (input.yaw1 * Math.PI) / 180;
  const rad2 = (input.yaw2 * Math.PI) / 180;

  const dx1 = -Math.sin(rad1);
  const dz1 = Math.cos(rad1);
  const dx2 = -Math.sin(rad2);
  const dz2 = Math.cos(rad2);

  // 2D determinant: dx1*(-dz2) - dz1*(-dx2) = dz1*dx2 - dx1*dz2
  const denom = dz1 * dx2 - dx1 * dz2;
  const crossMag = Math.min(1, Math.abs(denom));
  const angleBetweenDeg = (Math.asin(crossMag) * 180) / Math.PI;

  // Nearly parallel rays (< ~2.86 degrees separation)
  if (Math.abs(denom) < 0.05) {
    return {
      status: 'parallel',
      errorMessage: 'throws are too close in angle — throw again from farther away',
      angleBetweenDeg,
      dx1,
      dz1,
      dx2,
      dz2
    };
  }

  const rx = input.x2 - input.x1;
  const rz = input.z2 - input.z1;

  const t1 = (rz * dx2 - rx * dz2) / denom;
  const t2 = (dx1 * rz - dz1 * rx) / denom;

  const x = input.x1 + t1 * dx1;
  const z = input.z1 + t1 * dz1;
  const roundedX = Math.round(x);
  const roundedZ = Math.round(z);

  const distanceFromThrow1 = Math.hypot(x - input.x1, z - input.z1);
  const distanceFromThrow2 = Math.hypot(x - input.x2, z - input.z2);
  const distanceFromSpawn = Math.hypot(x, z);

  return {
    status: 'ok',
    x,
    z,
    roundedX,
    roundedZ,
    chunkX: Math.floor(roundedX / 16),
    chunkZ: Math.floor(roundedZ / 16),
    netherX: Math.round(roundedX / 8),
    netherZ: Math.round(roundedZ / 8),
    distanceFromThrow1,
    distanceFromThrow2,
    distanceFromSpawn,
    inFirstRing: distanceFromSpawn >= 1280 && distanceFromSpawn <= 2816,
    t1,
    t2,
    angleBetweenDeg,
    behindWarning: t1 < 0 || t2 < 0,
    dx1,
    dz1,
    dx2,
    dz2
  };
}

export default function MinecraftStrongholdFinder() {
  const [x1Input, setX1Input] = useState<string>('0');
  const [z1Input, setZ1Input] = useState<string>('0');
  const [yaw1Input, setYaw1Input] = useState<string>('-53.13');

  const [x2Input, setX2Input] = useState<string>('800');
  const [z2Input, setZ2Input] = useState<string>('0');
  const [yaw2Input, setYaw2Input] = useState<string>('0');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parsedInputs: TriangulationInput = useMemo(() => {
    const num = (v: string) => {
      const n = parseFloat(v);
      return Number.isFinite(n) ? n : 0;
    };
    return {
      x1: num(x1Input),
      z1: num(z1Input),
      yaw1: num(yaw1Input),
      x2: num(x2Input),
      z2: num(z2Input),
      yaw2: num(yaw2Input)
    };
  }, [x1Input, z1Input, yaw1Input, x2Input, z2Input, yaw2Input]);

  const result = useMemo(
    () => triangulateStronghold(parsedInputs),
    [parsedInputs]
  );

  const applyPreset = (
    x1: number,
    z1: number,
    yaw1: number,
    x2: number,
    z2: number,
    yaw2: number
  ) => {
    setX1Input(String(x1));
    setZ1Input(String(z1));
    setYaw1Input(String(yaw1));
    setX2Input(String(x2));
    setZ2Input(String(z2));
    setYaw2Input(String(yaw2));
  };

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // Compute SVG top-down plot coordinates
  const svgPlot = useMemo(() => {
    const pts: { x: number; z: number }[] = [
      { x: parsedInputs.x1, z: parsedInputs.z1 },
      { x: parsedInputs.x2, z: parsedInputs.z2 }
    ];
    if (result.status === 'ok' && result.x !== undefined && result.z !== undefined) {
      pts.push({ x: result.x, z: result.z });
    } else {
      pts.push({
        x: parsedInputs.x1 + result.dx1 * 600,
        z: parsedInputs.z1 + result.dz1 * 600
      });
      pts.push({
        x: parsedInputs.x2 + result.dx2 * 600,
        z: parsedInputs.z2 + result.dz2 * 600
      });
    }

    const xs = pts.map((p) => p.x);
    const zs = pts.map((p) => p.z);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minZ = Math.min(...zs);
    const maxZ = Math.max(...zs);

    const span = Math.max(maxX - minX, maxZ - minZ, 200);
    const pad = span * 0.22;
    const cx = (minX + maxX) / 2;
    const cz = (minZ + maxZ) / 2;
    const half = span / 2 + pad;

    const toSvg = (wx: number, wz: number) => ({
      sx: ((wx - (cx - half)) / (half * 2)) * 300,
      sy: ((wz - (cz - half)) / (half * 2)) * 300
    });

    const p1 = toSvg(parsedInputs.x1, parsedInputs.z1);
    const p2 = toSvg(parsedInputs.x2, parsedInputs.z2);

    const rayLen = half * 2.2;
    const r1End = toSvg(
      parsedInputs.x1 + result.dx1 * rayLen,
      parsedInputs.z1 + result.dz1 * rayLen
    );
    const r2End = toSvg(
      parsedInputs.x2 + result.dx2 * rayLen,
      parsedInputs.z2 + result.dz2 * rayLen
    );

    const hit =
      result.status === 'ok' && result.x !== undefined && result.z !== undefined
        ? toSvg(result.x, result.z)
        : null;

    return { p1, p2, r1End, r2End, hit };
  }, [parsedInputs, result]);

  return (
    <div className="space-y-6">
      {/* F3 Yaw How-To & Notice */}
      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed">
          <span className="font-bold text-emerald-300">How to Measure in Java Edition:</span>{' '}
          Throw an Eye of Ender, place your crosshair directly on the hovering Eye, and press{' '}
          <code className="font-mono text-emerald-200 bg-emerald-950/80 px-1.5 py-0.5 rounded">F3</code>.
          Read your <strong className="text-white">X, Z</strong> block position and the first{' '}
          <strong className="text-white">Facing yaw</strong> angle (e.g. <code className="font-mono">0</code> = South/+Z,{' '}
          <code className="font-mono">-90</code> = East/+X). Move perpendicular 400–800 blocks and throw a second Eye.
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2 bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Examples:
        </span>
        <button
          type="button"
          onClick={() => applyPreset(0, 0, -53.13, 800, 0, 0)}
          className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:text-emerald-300 text-zinc-300 font-mono transition-colors cursor-pointer"
        >
          Self-Test: (0,0) -53.13° &amp; (800,0) 0° → (800, 600)
        </button>
        <button
          type="button"
          onClick={() => applyPreset(0, 0, -135, 1200, 0, 135)}
          className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:text-emerald-300 text-zinc-300 font-mono transition-colors cursor-pointer"
        >
          Wide 90° Throw
        </button>
        <button
          type="button"
          onClick={() => applyPreset(0, 0, -45, 300, -300, -44.5)}
          className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:text-amber-300 text-zinc-300 font-mono transition-colors cursor-pointer"
        >
          Nearly Parallel Test
        </button>
      </div>

      {/* Two Eye of Ender Throw Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Throw 1 */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono flex items-center justify-center">
                1
              </span>
              First Eye of Ender Throw
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">
              Ray: ({result.dx1.toFixed(3)}, {result.dz1.toFixed(3)})
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="stronghold-x1" className="text-[11px] font-mono text-zinc-400 block mb-1">
                Position X1
              </label>
              <input
                id="stronghold-x1"
                type="number"
                step="any"
                value={x1Input}
                onChange={(e) => setX1Input(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg text-sm font-mono text-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="stronghold-z1" className="text-[11px] font-mono text-zinc-400 block mb-1">
                Position Z1
              </label>
              <input
                id="stronghold-z1"
                type="number"
                step="any"
                value={z1Input}
                onChange={(e) => setZ1Input(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg text-sm font-mono text-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="stronghold-yaw1" className="text-[11px] font-mono text-zinc-400 block mb-1">
                F3 Yaw Angle 1 (°)
              </label>
              <input
                id="stronghold-yaw1"
                type="number"
                step="any"
                value={yaw1Input}
                onChange={(e) => setYaw1Input(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg text-sm font-mono text-emerald-300 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Throw 2 */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-mono flex items-center justify-center">
                2
              </span>
              Second Eye of Ender Throw
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">
              Ray: ({result.dx2.toFixed(3)}, {result.dz2.toFixed(3)})
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="stronghold-x2" className="text-[11px] font-mono text-zinc-400 block mb-1">
                Position X2
              </label>
              <input
                id="stronghold-x2"
                type="number"
                step="any"
                value={x2Input}
                onChange={(e) => setX2Input(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-cyan-500 rounded-lg text-sm font-mono text-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="stronghold-z2" className="text-[11px] font-mono text-zinc-400 block mb-1">
                Position Z2
              </label>
              <input
                id="stronghold-z2"
                type="number"
                step="any"
                value={z2Input}
                onChange={(e) => setZ2Input(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-cyan-500 rounded-lg text-sm font-mono text-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="stronghold-yaw2" className="text-[11px] font-mono text-zinc-400 block mb-1">
                F3 Yaw Angle 2 (°)
              </label>
              <input
                id="stronghold-yaw2"
                type="number"
                step="any"
                value={yaw2Input}
                onChange={(e) => setYaw2Input(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-cyan-500 rounded-lg text-sm font-mono text-cyan-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results & Ray Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Estimated Stronghold Output */}
        <div className="lg:col-span-7 space-y-4">
          {result.status === 'parallel' ? (
            <div className="bg-amber-950/35 border border-amber-500/50 rounded-xl p-6 shadow-xl flex items-start gap-4">
              <AlertTriangle className="w-7 h-7 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-extrabold text-amber-300">
                  {result.errorMessage}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Ray angle separation is only{' '}
                  <strong className="font-mono text-white">
                    {result.angleBetweenDeg?.toFixed(2)}°
                  </strong>
                  . Move perpendicular to the Eye&apos;s flight path so your two throws are far apart and cross at a wide angle.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-950/30 border border-emerald-500/50 rounded-xl p-5 sm:p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/40 pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    Estimated Starting Staircase Area
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                    X = {result.roundedX}, Z = {result.roundedZ}
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-1">
                    Exact intersection: ({result.x?.toFixed(2)}, {result.z?.toFixed(2)}) • Chunk ({result.chunkX}, {result.chunkZ})
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `/tp @s ${result.roundedX} ~ ${result.roundedZ}`,
                      'tp'
                    )
                  }
                  className="px-3.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 flex items-center gap-2 self-start cursor-pointer"
                >
                  {copiedKey === 'tp' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                  <span>
                    {copiedKey === 'tp' ? 'Copied /tp!' : `Copy /tp @s ${result.roundedX} ~ ${result.roundedZ}`}
                  </span>
                </button>
              </div>

              {result.behindWarning && (
                <div className="bg-amber-950/40 border border-amber-600/50 rounded-lg p-3 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Note: The mathematical line intersection lies behind at least one throw&apos;s facing direction. Verify your F3 yaw angles point toward where the Eye flew.
                  </span>
                </div>
              )}

              {/* Distance Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-zinc-950/90 border border-zinc-800 rounded-lg p-3">
                  <span className="text-zinc-400 block mb-1">From Throw 1</span>
                  <span className="font-mono font-bold text-emerald-300 text-sm">
                    {Math.round(result.distanceFromThrow1 ?? 0).toLocaleString()} blocks
                  </span>
                </div>
                <div className="bg-zinc-950/90 border border-zinc-800 rounded-lg p-3">
                  <span className="text-zinc-400 block mb-1">From Throw 2</span>
                  <span className="font-mono font-bold text-cyan-300 text-sm">
                    {Math.round(result.distanceFromThrow2 ?? 0).toLocaleString()} blocks
                  </span>
                </div>
                <div className="bg-zinc-950/90 border border-zinc-800 rounded-lg p-3">
                  <span className="text-zinc-400 block mb-1">Nether Travel (8:1)</span>
                  <span className="font-mono font-bold text-purple-300 text-sm">
                    ({result.netherX}, {result.netherZ})
                  </span>
                </div>
                <div className="bg-zinc-950/90 border border-zinc-800 rounded-lg p-3">
                  <span className="text-zinc-400 block mb-1">Crossing Angle</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {result.angleBetweenDeg?.toFixed(1)}°
                  </span>
                </div>
              </div>

              {/* Origin distance / Ring context */}
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Distance from (0, 0):{' '}
                  <strong className="font-mono text-white">
                    {Math.round(result.distanceFromSpawn ?? 0).toLocaleString()} blocks
                  </strong>
                </span>
                {result.inFirstRing && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Inside 1st Ring (1,280–2,816 blocks)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Verified Stronghold Mechanics Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              Verified Java Edition Stronghold Facts
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed list-disc pl-4">
              <li>
                Strongholds generate in rings around world spawn — the first ring contains{' '}
                <strong className="text-white">3 strongholds between 1,280 and 2,816 blocks out</strong>.
              </li>
              <li>
                Java Edition generates <strong className="text-white">128 strongholds in total across 8 rings</strong>.
              </li>
              <li>
                An Eye of Ender flies toward the stronghold&apos;s{' '}
                <strong className="text-white">starting staircase area</strong>, so triangulation locates the staircase area rather than the portal room itself.
              </li>
              <li>
                Triangulation accuracy improves when the{' '}
                <strong className="text-white">two throws are far apart and cross at a wide angle</strong>.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Top-Down Ray Intersection Visualizer */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-emerald-400" />
              Top-Down Triangulation Plot
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">+X East • +Z South</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full max-w-[320px] aspect-square">
              {/* Subtle Grid */}
              <defs>
                <pattern id="stronghold-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#27272a" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="300" height="300" fill="url(#stronghold-grid)" />

              {/* Ray 1 */}
              <line
                x1={svgPlot.p1.sx}
                y1={svgPlot.p1.sy}
                x2={svgPlot.r1End.sx}
                y2={svgPlot.r1End.sy}
                stroke="#34d399"
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              {/* Ray 2 */}
              <line
                x1={svgPlot.p2.sx}
                y1={svgPlot.p2.sy}
                x2={svgPlot.r2End.sx}
                y2={svgPlot.r2End.sy}
                stroke="#22d3ee"
                strokeWidth="2"
                strokeDasharray="5 3"
              />

              {/* Throw 1 Marker */}
              <circle cx={svgPlot.p1.sx} cy={svgPlot.p1.sy} r="5.5" fill="#10b981" stroke="#09090b" strokeWidth="1.5" />
              <text x={svgPlot.p1.sx + 8} y={svgPlot.p1.sy - 6} fill="#6ee7b7" fontSize="10" fontFamily="monospace">
                T1
              </text>

              {/* Throw 2 Marker */}
              <circle cx={svgPlot.p2.sx} cy={svgPlot.p2.sy} r="5.5" fill="#06b6d4" stroke="#09090b" strokeWidth="1.5" />
              <text x={svgPlot.p2.sx + 8} y={svgPlot.p2.sy - 6} fill="#67e8f9" fontSize="10" fontFamily="monospace">
                T2
              </text>

              {/* Stronghold Intersection */}
              {svgPlot.hit && (
                <g>
                  <circle cx={svgPlot.hit.sx} cy={svgPlot.hit.sy} r="9" fill="#fbbf24" fillOpacity="0.25" />
                  <circle cx={svgPlot.hit.sx} cy={svgPlot.hit.sy} r="4.5" fill="#fbbf24" stroke="#09090b" strokeWidth="1.5" />
                  <text x={svgPlot.hit.sx + 9} y={svgPlot.hit.sy + 4} fill="#fde68a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    ({result.roundedX}, {result.roundedZ})
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Throw 1 Ray
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Throw 2 Ray
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Intersection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
