/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Layers, ArrowLeftRight, Copy, Check, Info } from 'lucide-react';
import {
  BLOCK_GRADIENT_PALETTE,
  generateBlockGradient
} from '../../data/minecraftBatch2Data';

export default function MinecraftBlockGradientGenerator() {
  const [startBlockName, setStartBlockName] = useState<string>('White Concrete');
  const [endBlockName, setEndBlockName] = useState<string>('Black Concrete');
  const [steps, setSteps] = useState<number>(5);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const gradientSteps = useMemo(
    () => generateBlockGradient(startBlockName, endBlockName, steps),
    [startBlockName, endBlockName, steps]
  );

  const arrowListText = useMemo(
    () => gradientSteps.map((s) => s.block.name).join(' → '),
    [gradientSteps]
  );

  const detailedListText = useMemo(
    () => gradientSteps.map((s) => `${s.stepNumber}. ${s.block.name} (${s.block.hex})`).join('\n'),
    [gradientSteps]
  );

  const handleSwap = () => {
    setStartBlockName(endBlockName);
    setEndBlockName(startBlockName);
  };

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Top Metadata + Palette Scope Note */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-800 text-xs text-zinc-400">
          <span>
            Palette: 45 common blocks · Colours are average texture colours
          </span>
          <span className="font-mono tabular-nums text-emerald-400 font-semibold">
            {steps} blocks · Unique interior matches
          </span>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4 space-y-1.5">
            <label htmlFor="block-grad-start" className="block text-xs font-semibold text-zinc-300">
              Start Block
            </label>
            <select
              id="block-grad-start"
              value={startBlockName}
              onChange={(e) => setStartBlockName(e.target.value)}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-xl text-sm text-white focus:outline-none"
            >
              {BLOCK_GRADIENT_PALETTE.map((block) => (
                <option key={block.name} value={block.name}>
                  {block.name} ({block.hex})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1 flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap start and end blocks"
              className="w-full md:w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-700 hover:border-emerald-500/60 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label htmlFor="block-grad-end" className="block text-xs font-semibold text-zinc-300">
              End Block
            </label>
            <select
              id="block-grad-end"
              value={endBlockName}
              onChange={(e) => setEndBlockName(e.target.value)}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-xl text-sm text-white focus:outline-none"
            >
              {BLOCK_GRADIENT_PALETTE.map((block) => (
                <option key={block.name} value={block.name}>
                  {block.name} ({block.hex})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="block-grad-steps" className="text-xs font-semibold text-zinc-300">
                Steps (3–20)
              </label>
              <span className="text-xs font-mono tabular-nums font-bold text-emerald-400">
                {steps}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="block-grad-steps"
                type="range"
                min={3}
                max={20}
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="flex-1 accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                aria-label="Number of gradient steps"
                min={3}
                max={20}
                value={steps}
                onChange={(e) => {
                  const val = Math.max(3, Math.min(20, Number(e.target.value) || 3));
                  setSteps(val);
                }}
                className="w-14 px-2 py-1.5 bg-zinc-950 border border-zinc-700 rounded-lg text-xs font-mono tabular-nums text-white text-center focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Swatch Strip */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Block Gradient Swatch Strip ({steps} Steps)
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy('arrow', arrowListText)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-colors ${
                  copiedId === 'arrow'
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-emerald-500/60'
                }`}
              >
                {copiedId === 'arrow' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === 'arrow' ? 'Copied' : 'Copy List'}
              </button>
              <button
                type="button"
                onClick={() => handleCopy('detailed', detailedListText)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-colors ${
                  copiedId === 'detailed'
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-emerald-500/60'
                }`}
              >
                {copiedId === 'detailed' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === 'detailed' ? 'Copied' : 'Copy With Hex'}
              </button>
            </div>
          </div>

          {/* Connected Colour Bar */}
          <div className="grid gap-1 rounded-xl overflow-hidden border border-zinc-800" style={{ gridTemplateColumns: `repeat(${gradientSteps.length}, minmax(0, 1fr))` }}>
            {gradientSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="h-16 sm:h-20"
                style={{ backgroundColor: step.block.hex }}
                title={`${step.stepNumber}. ${step.block.name} (${step.block.hex})`}
              />
            ))}
          </div>

          {/* Swatch Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {gradientSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-2.5 space-y-2"
              >
                <div
                  className="w-full h-10 rounded-lg border border-white/10"
                  style={{ backgroundColor: step.block.hex }}
                />
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono tabular-nums text-zinc-400">
                    Step {step.stepNumber}{step.isEndpoint ? ' · Endpoint' : ''}
                  </div>
                  <div className="text-xs font-bold text-white truncate" title={step.block.name}>
                    {step.block.name}
                  </div>
                  <div className="text-[11px] font-mono tabular-nums text-emerald-300">
                    {step.block.hex}
                  </div>
                  {!step.isEndpoint && (
                    <div className="text-[10px] font-mono tabular-nums text-zinc-500">
                      Target: {step.targetRgb.r},{step.targetRgb.g},{step.targetRgb.b}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Copyable Text List */}
          <pre className="text-xs font-mono text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap select-all">
            {arrowListText}
          </pre>
        </div>

        {/* 45-Block Reference Palette */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white">
              45 Common Blocks Palette (Average Texture Colours)
            </h3>
            <span className="text-xs text-zinc-400">
              Ties pick the earliest block in palette order
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
            {BLOCK_GRADIENT_PALETTE.map((block) => (
              <div
                key={block.name}
                className="flex items-center gap-2 bg-zinc-900/70 border border-zinc-800 rounded-lg px-2.5 py-2"
              >
                <span
                  className="w-4 h-4 rounded-sm border border-white/15 shrink-0"
                  style={{ backgroundColor: block.hex }}
                />
                <div className="min-w-0">
                  <div className="font-semibold text-zinc-200 truncate">{block.name}</div>
                  <div className="text-[11px] font-mono tabular-nums text-zinc-400">{block.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Algorithm & Scope Disclosure */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-start gap-2.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            Uses 45 common blocks with average texture colours. Target RGB at step i is rounded per channel via round(A + (B − A) × i / (steps − 1)), and each interior step picks the closest unused block by Euclidean RGB distance.
          </span>
        </div>
      </div>
    </div>
  );
}
