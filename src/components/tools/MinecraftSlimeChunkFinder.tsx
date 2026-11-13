/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Grid,
  MapPin,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Info,
  Compass,
  Crosshair,
  AlertTriangle,
  Sparkles,
  Layers
} from 'lucide-react';

/**
 * Parses a Minecraft Java Edition seed string into a 64-bit signed BigInt.
 * Numeric inputs are parsed as 64-bit signed longs (BigInt.asIntN(64, ...)).
 * Non-numeric text seeds are hashed using Java's String.hashCode().
 */
export function parseMinecraftJavaSeed(rawSeed: string): {
  seed: bigint;
  isStringHash: boolean;
  displayNumericSeed: string;
} {
  const trimmed = rawSeed.trim();
  if (trimmed === '' || trimmed === '-') {
    return { seed: 0n, isStringHash: false, displayNumericSeed: '0' };
  }
  if (/^-?\d+$/.test(trimmed)) {
    const parsed = BigInt.asIntN(64, BigInt(trimmed));
    return {
      seed: parsed,
      isStringHash: false,
      displayNumericSeed: parsed.toString()
    };
  }
  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (Math.imul(31, hash) + trimmed.charCodeAt(i)) | 0;
  }
  const bigHash = BigInt(hash);
  return {
    seed: bigHash,
    isStringHash: true,
    displayNumericSeed: bigHash.toString()
  };
}

/**
 * Converts a block coordinate to its chunk coordinate using floor division.
 */
export function blockToChunk(blockCoord: number): number {
  return Math.floor(blockCoord / 16);
}

/**
 * Returns the inclusive X and Z block coordinate range for a chunk.
 */
export function getChunkBlockRange(chunkX: number, chunkZ: number) {
  const minX = chunkX * 16;
  const maxX = minX + 15;
  const minZ = chunkZ * 16;
  const maxZ = minZ + 15;
  return { minX, maxX, minZ, maxZ };
}

/**
 * Exact Java Edition slime chunk check matching Minecraft's Random seeding and java.util.Random.nextInt(10).
 *
 * Java source:
 * Random rnd = new Random(
 *   worldSeed
 *   + (int)(chunkX * chunkX * 0x4c1906)
 *   + (int)(chunkX * 0x5ac0db)
 *   + (int)(chunkZ * chunkZ) * 0x4307a7L
 *   + (int)(chunkZ * 0x5f24f)
 * ) ^ 0x3ad8025fL;
 * return rnd.nextInt(10) == 0;
 */
export function isMinecraftJavaSlimeChunk(
  worldSeed: bigint,
  chunkX: number,
  chunkZ: number
): boolean {
  const cx = chunkX | 0;
  const cz = chunkZ | 0;

  const term1 = BigInt(Math.imul(Math.imul(cx, cx), 0x4c1906));
  const term2 = BigInt(Math.imul(cx, 0x5ac0db));
  const term3 = BigInt(Math.imul(cz, cz)) * 0x4307a7n;
  const term4 = BigInt(Math.imul(cz, 0x5f24f));

  const combinedSeed = (worldSeed + term1 + term2 + term3 + term4) ^ 0x3ad8025fn;

  const MASK = (1n << 48n) - 1n;
  const MULT = 0x5deece66dn;
  const ADD = 0xbn;

  let state = (combinedSeed ^ MULT) & MASK;

  const next = (bits: number): number => {
    state = (state * MULT + ADD) & MASK;
    return Number(state >> BigInt(48 - bits));
  };

  const bound = 10;
  let bits: number;
  let val: number;
  do {
    bits = next(31);
    val = bits % bound;
  } while (((bits - val + (bound - 1)) | 0) < 0);

  return val === 0;
}

type InputMode = 'chunk' | 'block';

export default function MinecraftSlimeChunkFinder() {
  const [seedInput, setSeedInput] = useState<string>('0');
  const [inputMode, setInputMode] = useState<InputMode>('chunk');

  // Primary coordinate inputs
  const [chunkXInput, setChunkXInput] = useState<string>('-8');
  const [chunkZInput, setChunkZInput] = useState<string>('0');
  const [blockXInput, setBlockXInput] = useState<string>('-128');
  const [blockZInput, setBlockZInput] = useState<string>('0');

  // Grid radius: 8 => 17x17 chunks, 10 => 21x21 chunks (always >= 16x16)
  const [gridRadius, setGridRadius] = useState<8 | 10>(8);

  // Currently clicked/inspected chunk in the grid
  const [clickedChunk, setClickedChunk] = useState<{ cx: number; cz: number } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parsedSeed = useMemo(() => parseMinecraftJavaSeed(seedInput), [seedInput]);

  // Resolve active center chunk coordinates
  const centerChunk = useMemo(() => {
    if (inputMode === 'chunk') {
      const cx = parseInt(chunkXInput, 10);
      const cz = parseInt(chunkZInput, 10);
      return {
        cx: Number.isFinite(cx) ? cx : 0,
        cz: Number.isFinite(cz) ? cz : 0
      };
    } else {
      const bx = parseInt(blockXInput, 10);
      const bz = parseInt(blockZInput, 10);
      return {
        cx: blockToChunk(Number.isFinite(bx) ? bx : 0),
        cz: blockToChunk(Number.isFinite(bz) ? bz : 0)
      };
    }
  }, [inputMode, chunkXInput, chunkZInput, blockXInput, blockZInput]);

  const centerBlockRange = useMemo(
    () => getChunkBlockRange(centerChunk.cx, centerChunk.cz),
    [centerChunk.cx, centerChunk.cz]
  );

  const centerIsSlime = useMemo(
    () => isMinecraftJavaSlimeChunk(parsedSeed.seed, centerChunk.cx, centerChunk.cz),
    [parsedSeed.seed, centerChunk.cx, centerChunk.cz]
  );

  // Build grid centered on centerChunk (17x17 for radius=8, 21x21 for radius=10)
  const gridData = useMemo(() => {
    const size = gridRadius * 2 + 1;
    const rows: {
      cz: number;
      cells: {
        cx: number;
        cz: number;
        isSlime: boolean;
        isCenter: boolean;
      }[];
    }[] = [];
    let slimeCount = 0;

    for (let dz = -gridRadius; dz <= gridRadius; dz++) {
      const cz = centerChunk.cz + dz;
      const cells = [];
      for (let dx = -gridRadius; dx <= gridRadius; dx++) {
        const cx = centerChunk.cx + dx;
        const isSlime = isMinecraftJavaSlimeChunk(parsedSeed.seed, cx, cz);
        if (isSlime) slimeCount++;
        cells.push({
          cx,
          cz,
          isSlime,
          isCenter: dx === 0 && dz === 0
        });
      }
      rows.push({ cz, cells });
    }

    return {
      size,
      totalChunks: size * size,
      slimeCount,
      rows
    };
  }, [parsedSeed.seed, centerChunk.cx, centerChunk.cz, gridRadius]);

  // Inspected chunk defaults to centerChunk if none clicked yet or user re-centers
  const inspectedChunk = useMemo(() => {
    const target = clickedChunk ?? centerChunk;
    const isSlime = isMinecraftJavaSlimeChunk(parsedSeed.seed, target.cx, target.cz);
    const range = getChunkBlockRange(target.cx, target.cz);
    return {
      cx: target.cx,
      cz: target.cz,
      isSlime,
      range,
      centerBlockX: range.minX + 8,
      centerBlockZ: range.minZ + 8
    };
  }, [clickedChunk, centerChunk, parsedSeed.seed]);

  const handleModeSwitch = (mode: InputMode) => {
    if (mode === inputMode) return;
    if (mode === 'block') {
      const r = getChunkBlockRange(centerChunk.cx, centerChunk.cz);
      setBlockXInput(String(r.minX));
      setBlockZInput(String(r.minZ));
    } else {
      setChunkXInput(String(centerChunk.cx));
      setChunkZInput(String(centerChunk.cz));
    }
    setInputMode(mode);
  };

  const applyPreset = (seed: string, cx: number, cz: number) => {
    setSeedInput(seed);
    setInputMode('chunk');
    setChunkXInput(String(cx));
    setChunkZInput(String(cz));
    setBlockXInput(String(cx * 16));
    setBlockZInput(String(cz * 16));
    setClickedChunk(null);
  };

  const handleCenterOnInspected = () => {
    if (!clickedChunk) return;
    setChunkXInput(String(clickedChunk.cx));
    setChunkZInput(String(clickedChunk.cz));
    setBlockXInput(String(clickedChunk.cx * 16));
    setBlockZInput(String(clickedChunk.cz * 16));
    setClickedChunk(null);
  };

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Java Edition Notice Banner */}
      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed">
          <span className="font-bold text-emerald-300">Minecraft Java Edition Only:</span>{' '}
          Java Edition slime chunks are calculated directly from your world seed using{' '}
          <code className="font-mono text-emerald-200 bg-emerald-950/80 px-1.5 py-0.5 rounded">
            java.util.Random
          </code>
          .{' '}
          <span className="text-zinc-400">
            (Bedrock Edition slime chunks do not depend on the seed and occur in the exact same chunks in every world.)
          </span>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2 bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Quick Examples:
        </span>
        {[
          { label: 'Seed 0 • Chunk (-8, 0)', seed: '0', cx: -8, cz: 0 },
          { label: 'Seed 42 • Chunk (0, 6)', seed: '42', cx: 0, cz: 6 },
          { label: 'Seed 12345 • Chunk (100, 200)', seed: '12345', cx: 100, cz: 200 },
          { label: 'Seed 0 • Spawn (0, 0)', seed: '0', cx: 0, cz: 0 }
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => applyPreset(preset.seed, preset.cx, preset.cz)}
            className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:text-emerald-300 text-zinc-300 font-mono transition-colors cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Main Input Controls */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          {/* World Seed Input */}
          <div className="md:col-span-5">
            <label
              htmlFor="slime-world-seed"
              className="text-xs font-semibold text-zinc-300 block mb-1.5"
            >
              World Seed (Java Edition)
            </label>
            <input
              id="slime-world-seed"
              type="text"
              value={seedInput}
              onChange={(e) => {
                setSeedInput(e.target.value);
                setClickedChunk(null);
              }}
              placeholder="e.g. 0, 42, 12345, or -987654321"
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg text-sm font-mono text-white placeholder-zinc-500 focus:outline-none"
            />
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span>
                {parsedSeed.isStringHash
                  ? `Text hash → ${parsedSeed.displayNumericSeed}`
                  : `64-bit Seed: ${parsedSeed.displayNumericSeed}`}
              </span>
            </div>
          </div>

          {/* Coordinate Mode Toggle + X / Z Inputs */}
          <div className="md:col-span-7 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-zinc-300">
                Center Coordinates
              </span>
              <div className="inline-flex rounded-lg bg-zinc-950 border border-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => handleModeSwitch('chunk')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    inputMode === 'chunk'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Chunk Coords
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSwitch('block')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    inputMode === 'block'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Block Coords (X, Z)
                </button>
              </div>
            </div>

            {inputMode === 'chunk' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="slime-chunk-x"
                    className="text-[11px] font-mono text-zinc-400 block mb-1"
                  >
                    Chunk X
                  </label>
                  <input
                    id="slime-chunk-x"
                    type="number"
                    step="1"
                    value={chunkXInput}
                    onChange={(e) => {
                      setChunkXInput(e.target.value);
                      setClickedChunk(null);
                    }}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg text-sm font-mono text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="slime-chunk-z"
                    className="text-[11px] font-mono text-zinc-400 block mb-1"
                  >
                    Chunk Z
                  </label>
                  <input
                    id="slime-chunk-z"
                    type="number"
                    step="1"
                    value={chunkZInput}
                    onChange={(e) => {
                      setChunkZInput(e.target.value);
                      setClickedChunk(null);
                    }}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg text-sm font-mono text-white focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="slime-block-x"
                    className="text-[11px] font-mono text-zinc-400 block mb-1"
                  >
                    Block X (→ Chunk {centerChunk.cx})
                  </label>
                  <input
                    id="slime-block-x"
                    type="number"
                    step="1"
                    value={blockXInput}
                    onChange={(e) => {
                      setBlockXInput(e.target.value);
                      setClickedChunk(null);
                    }}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg text-sm font-mono text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="slime-block-z"
                    className="text-[11px] font-mono text-zinc-400 block mb-1"
                  >
                    Block Z (→ Chunk {centerChunk.cz})
                  </label>
                  <input
                    id="slime-block-z"
                    type="number"
                    step="1"
                    value={blockZInput}
                    onChange={(e) => {
                      setBlockZInput(e.target.value);
                      setClickedChunk(null);
                    }}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg text-sm font-mono text-white focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Primary Result Card for Entered Chunk */}
      <div
        className={`rounded-xl border p-5 sm:p-6 shadow-xl transition-colors ${
          centerIsSlime
            ? 'bg-emerald-950/35 border-emerald-500/60'
            : 'bg-zinc-900 border-zinc-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {centerIsSlime ? (
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6 text-zinc-400" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Chunk ({centerChunk.cx}, {centerChunk.cz}) is{' '}
                  {centerIsSlime ? (
                    <span className="text-emerald-400">a SLIME CHUNK!</span>
                  ) : (
                    <span className="text-zinc-400">NOT a Slime Chunk</span>
                  )}
                </h3>
                {centerIsSlime && (
                  <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Spawns Below Y=40
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-zinc-300 mt-1">
                Block Range: X {centerBlockRange.minX} to {centerBlockRange.maxX} • Z{' '}
                {centerBlockRange.minZ} to {centerBlockRange.maxZ}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                handleCopy(
                  `Chunk (${centerChunk.cx}, ${centerChunk.cz}) | X: ${centerBlockRange.minX}..${centerBlockRange.maxX}, Z: ${centerBlockRange.minZ}..${centerBlockRange.maxZ} | ${
                    centerIsSlime ? 'Slime Chunk' : 'Not Slime Chunk'
                  }`,
                  'center'
                )
              }
              className="px-3 py-1.5 rounded-lg bg-zinc-950/90 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-200 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'center' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span>{copiedKey === 'center' ? 'Copied!' : 'Copy Details'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Chunk Map Grid + Clicked Chunk Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Grid */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                {gridData.size}×{gridData.size} Chunk Map Centered on ({centerChunk.cx}, {centerChunk.cz})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                {gridData.slimeCount} / {gridData.totalChunks} Slime Chunks (
                {((gridData.slimeCount / gridData.totalChunks) * 100).toFixed(1)}%)
              </span>
              <div className="inline-flex rounded-lg bg-zinc-950 border border-zinc-800 p-0.5 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setGridRadius(8)}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    gridRadius === 8
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  17×17
                </button>
                <button
                  type="button"
                  onClick={() => setGridRadius(10)}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    gridRadius === 10
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  21×21
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chunk Grid */}
          <div className="overflow-x-auto pb-1">
            <div className="min-w-[440px]">
              {/* Top X-axis labels */}
              <div className="flex items-center mb-1 pl-10">
                <div
                  className="grid flex-1 gap-0.5 text-[9px] font-mono text-zinc-500 text-center"
                  style={{ gridTemplateColumns: `repeat(${gridData.size}, minmax(0, 1fr))` }}
                >
                  {gridData.rows[0].cells.map((cell) => {
                    const showLabel =
                      cell.cx === centerChunk.cx ||
                      cell.cx === centerChunk.cx - gridRadius ||
                      cell.cx === centerChunk.cx + gridRadius ||
                      Math.abs(cell.cx - centerChunk.cx) % 4 === 0;
                    return (
                      <div key={cell.cx} className="truncate">
                        {showLabel ? cell.cx : ''}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-0.5">
                {gridData.rows.map((row) => {
                  const showZLabel =
                    row.cz === centerChunk.cz ||
                    row.cz === centerChunk.cz - gridRadius ||
                    row.cz === centerChunk.cz + gridRadius ||
                    Math.abs(row.cz - centerChunk.cz) % 4 === 0;
                  return (
                    <div key={row.cz} className="flex items-center gap-1.5">
                      <div className="w-8 text-right text-[9px] font-mono text-zinc-500 flex-shrink-0 pr-1">
                        {showZLabel ? row.cz : ''}
                      </div>
                      <div
                        className="grid flex-1 gap-0.5"
                        style={{
                          gridTemplateColumns: `repeat(${gridData.size}, minmax(0, 1fr))`
                        }}
                      >
                        {row.cells.map((cell) => {
                          const isSelected =
                            inspectedChunk.cx === cell.cx && inspectedChunk.cz === cell.cz;
                          const range = getChunkBlockRange(cell.cx, cell.cz);
                          return (
                            <button
                              key={`${cell.cx},${cell.cz}`}
                              type="button"
                              onClick={() => setClickedChunk({ cx: cell.cx, cz: cell.cz })}
                              title={`Chunk (${cell.cx}, ${cell.cz}) | X: ${range.minX}..${range.maxX}, Z: ${range.minZ}..${range.maxZ} | ${
                                cell.isSlime ? 'SLIME CHUNK' : 'Not Slime'
                              }`}
                              className={`aspect-square w-full rounded-[3px] border transition-all relative cursor-pointer ${
                                cell.isSlime
                                  ? 'bg-emerald-500/85 hover:bg-emerald-400 border-emerald-400/70'
                                  : 'bg-zinc-950/90 hover:bg-zinc-800 border-zinc-800/80'
                              } ${
                                isSelected
                                  ? 'ring-2 ring-cyan-300 ring-offset-1 ring-offset-zinc-900 z-10'
                                  : ''
                              }`}
                            >
                              {cell.isCenter && (
                                <span
                                  className={`absolute inset-1 rounded-full border-2 ${
                                    cell.isSlime
                                      ? 'border-white bg-amber-400/90'
                                      : 'border-amber-400 bg-amber-400/30'
                                  }`}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grid Legend */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500/85 border border-emerald-400 inline-block" />
              <span>Slime Chunk (~1 in 10)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-zinc-950 border border-zinc-800 inline-block" />
              <span>Normal Chunk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-zinc-900 border border-zinc-700 inline-flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </span>
              <span>Entered Center Chunk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-zinc-900 ring-2 ring-cyan-300 inline-block" />
              <span>Clicked / Inspected Chunk</span>
            </div>
          </div>
        </div>

        {/* Right: Clicked Chunk Details & Spawn Reference */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-cyan-400" />
                Inspected Chunk Details
              </h3>
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                  inspectedChunk.isSlime
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {inspectedChunk.isSlime ? 'SLIME CHUNK' : 'NO SLIMES'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex items-center justify-between">
                <span className="text-zinc-400">Chunk Coords</span>
                <span className="font-mono font-bold text-white">
                  ({inspectedChunk.cx}, {inspectedChunk.cz})
                </span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 space-y-1.5">
                <span className="text-zinc-400 block">Block Coordinate Range</span>
                <div className="font-mono text-cyan-300 font-semibold flex justify-between">
                  <span>X Range:</span>
                  <span>
                    {inspectedChunk.range.minX} to {inspectedChunk.range.maxX}
                  </span>
                </div>
                <div className="font-mono text-cyan-300 font-semibold flex justify-between">
                  <span>Z Range:</span>
                  <span>
                    {inspectedChunk.range.minZ} to {inspectedChunk.range.maxZ}
                  </span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex items-center justify-between">
                <span className="text-zinc-400">Chunk Center Block</span>
                <span className="font-mono text-zinc-200">
                  X {inspectedChunk.centerBlockX}, Z {inspectedChunk.centerBlockZ}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              {clickedChunk &&
                (clickedChunk.cx !== centerChunk.cx ||
                  clickedChunk.cz !== centerChunk.cz) && (
                  <button
                    type="button"
                    onClick={handleCenterOnInspected}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Center Grid on ({inspectedChunk.cx}, {inspectedChunk.cz})
                  </button>
                )}
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    `Chunk (${inspectedChunk.cx}, ${inspectedChunk.cz}) | X: ${inspectedChunk.range.minX}..${inspectedChunk.range.maxX}, Z: ${inspectedChunk.range.minZ}..${inspectedChunk.range.maxZ}`,
                    'inspected'
                  )
                }
                className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey === 'inspected' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                )}
                <span>
                  {copiedKey === 'inspected' ? 'Copied Block Range!' : 'Copy Block Range'}
                </span>
              </button>
            </div>
          </div>

          {/* Verified Spawn Mechanics Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Slime Spawning Rules (Verified)
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Slime Chunks:</strong> About 1 in 10 chunks is a slime chunk. Slimes spawn below <strong>Y=40</strong> at any light level.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Swamp &amp; Mangrove Swamp:</strong> Slimes spawn at <strong>Y=51–69</strong> with light level <strong>7 or lower</strong>, most often on a full moon and never on a new moon.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Bedrock Edition:</strong> Bedrock slime chunks do not depend on the world seed (same chunks in every world).
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
