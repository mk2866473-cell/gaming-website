/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Palette, Search, Copy, Check, Sparkles } from 'lucide-react';
import { ROBLOX_BRICK_COLORS, BrickColorEntry, findNearestBrickColor } from '../../data/robloxBrickColors';

function parseHexToRgb(hexInput: string): { r: number; g: number; b: number } | null {
  const clean = hexInput.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  }
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16)
    };
  }
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function RobloxBrickColorPicker() {
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<BrickColorEntry>(ROBLOX_BRICK_COLORS[0]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Nearest-color converter state
  const [inputHex, setInputHex] = useState<string>('#FF00BF');
  const [inputR, setInputR] = useState<number>(255);
  const [inputG, setInputG] = useState<number>(0);
  const [inputB, setInputB] = useState<number>(191);

  const filteredColors = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ROBLOX_BRICK_COLORS;
    return ROBLOX_BRICK_COLORS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        String(c.code).includes(q) ||
        c.hex.toLowerCase().includes(q) ||
        c.rgb.includes(q)
    );
  }, [search]);

  const nearestResult = useMemo(
    () => findNearestBrickColor(inputR, inputG, inputB),
    [inputR, inputG, inputB]
  );

  const handleCopy = (label: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(label);
    window.setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleHexChange = (val: string) => {
    setInputHex(val);
    const parsed = parseHexToRgb(val);
    if (parsed) {
      setInputR(parsed.r);
      setInputG(parsed.g);
      setInputB(parsed.b);
    }
  };

  const handleRgbChannel = (channel: 'r' | 'g' | 'b', raw: string) => {
    const clamped = Math.max(0, Math.min(255, parseInt(raw, 10) || 0));
    const nextR = channel === 'r' ? clamped : inputR;
    const nextG = channel === 'g' ? clamped : inputG;
    const nextB = channel === 'b' ? clamped : inputB;
    setInputR(nextR);
    setInputG(nextG);
    setInputB(nextB);
    setInputHex(rgbToHex(nextR, nextG, nextB));
  };

  const inputSwatchHex = rgbToHex(inputR, inputG, inputB);

  return (
    <div className="space-y-6">
      {/* Part B: Nearest BrickColor RGB/Hex Converter */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            RGB / Hex to Nearest Official BrickColor Converter
          </span>
          <span className="text-xs font-mono text-zinc-400">
            Euclidean RGB distance across {ROBLOX_BRICK_COLORS.length} official BrickColors
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Colour Input Controls */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="color"
                aria-label="Pick target color"
                value={inputSwatchHex}
                onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
                className="w-12 h-11 rounded-lg bg-zinc-900 border border-zinc-700 cursor-pointer shrink-0"
              />
              <div className="flex-1 space-y-1">
                <label htmlFor="bc-hex-input" className="text-[11px] font-bold uppercase text-zinc-400 block">
                  Hex Color
                </label>
                <input
                  id="bc-hex-input"
                  type="text"
                  value={inputHex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#FF00BF"
                  className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {([
                { ch: 'r', label: 'R (0–255)', val: inputR },
                { ch: 'g', label: 'G (0–255)', val: inputG },
                { ch: 'b', label: 'B (0–255)', val: inputB }
              ] as const).map((item) => (
                <div key={item.ch} className="space-y-1">
                  <label htmlFor={`bc-${item.ch}`} className="text-[10px] font-bold uppercase text-zinc-400 block">
                    {item.label}
                  </label>
                  <input
                    id={`bc-${item.ch}`}
                    type="number"
                    min={0}
                    max={255}
                    value={item.val}
                    onChange={(e) => handleRgbChannel(item.ch, e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl border border-white/15 shrink-0"
                  style={{ backgroundColor: inputSwatchHex }}
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Your Input Color
                  </span>
                  <span className="text-sm font-bold text-white font-mono block truncate">
                    {inputSwatchHex}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    RGB({inputR}, {inputG}, {inputB})
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                Color distance Δ = {nearestResult.distance.toFixed(2)}
              </span>
            </div>

            <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl border border-white/15 shrink-0"
                  style={{ backgroundColor: nearestResult.match.hex }}
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Nearest BrickColor
                  </span>
                  <span className="text-sm font-bold text-white block truncate">
                    {nearestResult.match.name}
                  </span>
                  <span className="text-xs font-mono text-zinc-300">
                    Code {nearestResult.match.code} · {nearestResult.match.hex} · RGB({nearestResult.match.rgb})
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopy('nearest-name', nearestResult.match.name)}
                  className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-[11px] font-mono text-zinc-200 hover:text-white cursor-pointer flex items-center gap-1"
                >
                  {copiedKey === 'nearest-name' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Name
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy('nearest-code', String(nearestResult.match.code))}
                  className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-[11px] font-mono text-zinc-200 hover:text-white cursor-pointer flex items-center gap-1"
                >
                  {copiedKey === 'nearest-code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Code
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy('nearest-lua', `BrickColor.new("${nearestResult.match.name}")`)}
                  className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-[11px] font-mono text-zinc-200 hover:text-white cursor-pointer flex items-center gap-1"
                >
                  {copiedKey === 'nearest-lua' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Luau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part A: Searchable 208 Official BrickColors Grid */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Palette className="w-4 h-4" />
            Official Roblox BrickColor Palette ({filteredColors.length} / {ROBLOX_BRICK_COLORS.length} Shown)
          </span>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, code, hex, or RGB..."
              className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Selected Color Inspector */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-xl border border-white/15 shrink-0"
              style={{ backgroundColor: selected.hex }}
            />
            <div>
              <span className="text-sm font-extrabold text-white block">
                {selected.name} <span className="font-mono text-zinc-400 font-normal">#{selected.code}</span>
              </span>
              <span className="text-xs font-mono text-zinc-300">
                RGB({selected.rgb}) · {selected.hex}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'sel-all', label: 'Copy Name / Code / RGB', val: `${selected.name} | ${selected.code} | ${selected.rgb} | ${selected.hex}` },
              { id: 'sel-name', label: 'Copy Name', val: selected.name },
              { id: 'sel-code', label: `Copy Code (${selected.code})`, val: String(selected.code) },
              { id: 'sel-rgb', label: `Copy RGB`, val: selected.rgb }
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => handleCopy(btn.id, btn.val)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 hover:border-cyan-500/60 hover:text-white cursor-pointer flex items-center gap-1.5"
              >
                {copiedKey === btn.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === btn.id ? 'Copied!' : btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* 208 BrickColor Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[540px] overflow-y-auto pr-1">
          {filteredColors.map((bc) => {
            const isSelected = bc.code === selected.code && bc.name === selected.name;
            const copyKey = `grid-${bc.code}-${bc.name}`;
            const isCopied = copiedKey === copyKey;
            return (
              <button
                key={`${bc.code}-${bc.name}`}
                type="button"
                onClick={() => {
                  setSelected(bc);
                  handleCopy(copyKey, `${bc.name} (${bc.code}) RGB(${bc.rgb})`);
                }}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-zinc-900 border-cyan-500'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                <div
                  className="w-full h-9 rounded-lg border border-black/30"
                  style={{ backgroundColor: bc.hex }}
                />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-white block truncate">
                    {isCopied ? 'Copied!' : bc.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 block truncate">
                    {bc.code} · {bc.hex}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 block truncate">
                    {bc.rgb}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
