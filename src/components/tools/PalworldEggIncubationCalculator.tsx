/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Egg, RotateCcw, Clock } from 'lucide-react';
import {
  EGG_SIZE_CONFIG,
  EGG_SIZE_ORDER,
  INCUBATION_WORLD_PRESETS,
  EggSize,
  IncubationPresetId,
  calculateEggIncubationTime,
  getEggSizeFromRarity
} from '../../data/palworldData';

const SPEED_QUICK_OPTIONS = [0, 50, 100];

export default function PalworldEggIncubationCalculator() {
  const [eggSize, setEggSize] = useState<EggSize>('huge');
  const [rarityInput, setRarityInput] = useState<string>('8');
  const [presetId, setPresetId] = useState<IncubationPresetId>('normal');
  const [hoursInput, setHoursInput] = useState<string>('1');
  const [speedInput, setSpeedInput] = useState<string>('0');

  const parsedRarity = useMemo(() => {
    const n = Number(rarityInput);
    if (!Number.isFinite(n)) return EGG_SIZE_CONFIG[eggSize].defaultRarity;
    return Math.min(20, Math.max(1, Math.round(n)));
  }, [rarityInput, eggSize]);

  const parsedHours = useMemo(() => {
    if (hoursInput.trim() === '') return 0;
    const n = Number(hoursInput);
    if (!Number.isFinite(n) || n < 0) return 0;
    return n;
  }, [hoursInput]);

  const parsedSpeed = useMemo(() => {
    if (speedInput.trim() === '') return 0;
    const n = Number(speedInput);
    if (!Number.isFinite(n) || n < 0) return 0;
    return n;
  }, [speedInput]);

  const currentResult = useMemo(
    () => calculateEggIncubationTime(eggSize, parsedHours, parsedSpeed),
    [eggSize, parsedHours, parsedSpeed]
  );

  const comparisonRows = useMemo(
    () =>
      EGG_SIZE_ORDER.map(size =>
        calculateEggIncubationTime(size, parsedHours, parsedSpeed)
      ),
    [parsedHours, parsedSpeed]
  );

  const handleSelectSize = (nextSize: EggSize) => {
    setEggSize(nextSize);
    const meta = EGG_SIZE_CONFIG[nextSize];
    if (parsedRarity < meta.rarityMin || parsedRarity > meta.rarityMax) {
      setRarityInput(String(meta.defaultRarity));
    }
  };

  const handleRarityChange = (raw: string) => {
    setRarityInput(raw);
    const n = Number(raw);
    if (Number.isFinite(n) && raw.trim() !== '') {
      const clamped = Math.min(20, Math.max(1, Math.round(n)));
      setEggSize(getEggSizeFromRarity(clamped));
    }
  };

  const handlePresetChange = (nextPresetId: IncubationPresetId) => {
    setPresetId(nextPresetId);
    if (nextPresetId !== 'custom') {
      const preset = INCUBATION_WORLD_PRESETS.find(p => p.id === nextPresetId);
      if (preset) {
        setHoursInput(String(preset.hours));
      }
    }
  };

  const handleCustomHoursChange = (raw: string) => {
    setHoursInput(raw);
    setPresetId('custom');
  };

  const handleReset = () => {
    setEggSize('huge');
    setRarityInput('8');
    setPresetId('normal');
    setHoursInput('1');
    setSpeedInput('0');
  };

  const activeMeta = EGG_SIZE_CONFIG[eggSize];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-400 font-medium">
              <Egg className="w-4 h-4 shrink-0" />
              <span>PalEggDefaultHatchingTime</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">Regular ÷12</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">Large ÷2</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">Huge ÷1</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Palworld Egg Incubation Time Calculator
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Calculate exact hatch times from egg size or Pal rarity (1–20), your world&apos;s incubation hours setting, and incubator temperature speed bonus.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 self-start cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Egg Size & Pal Rarity Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label className="text-sm font-bold text-white">
                  Egg Size
                </label>
                <span className="text-xs text-zinc-400 font-mono tabular-nums">
                  Divisor: ÷{activeMeta.divisor} · Rarity {activeMeta.rarityMin}–{activeMeta.rarityMax}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-zinc-950 border border-zinc-800">
                {EGG_SIZE_ORDER.map(size => {
                  const meta = EGG_SIZE_CONFIG[size];
                  const active = eggSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSelectSize(size)}
                      className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer flex flex-col items-center justify-center ${
                        active
                          ? 'bg-cyan-500 text-black'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      <span>{meta.shortLabel}</span>
                      <span
                        className={`text-[10px] font-mono tabular-nums ${
                          active ? 'text-black/80' : 'text-zinc-500'
                        }`}
                      >
                        ÷{meta.divisor} · R{meta.rarityMin}–{meta.rarityMax}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pal Rarity Input (1-20) synced with Egg Size */}
            <div className="pt-4 border-t border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="pal-rarity-input"
                  className="text-xs font-semibold text-zinc-300"
                >
                  Or Enter Pal Rarity (1–20)
                </label>
                <span className="text-xs text-cyan-400 font-mono tabular-nums">
                  Rarity {parsedRarity} → {activeMeta.label}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="pal-rarity-slider"
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={parsedRarity}
                  onChange={e => handleRarityChange(e.target.value)}
                  aria-label="Pal Rarity slider"
                  className="flex-1 accent-cyan-400 cursor-pointer"
                />
                <input
                  id="pal-rarity-input"
                  type="number"
                  min={1}
                  max={20}
                  step={1}
                  value={rarityInput}
                  onChange={e => handleRarityChange(e.target.value)}
                  className="w-20 min-h-[40px] px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-mono tabular-nums text-white text-center focus:outline-none focus:border-cyan-500"
                />
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Rarity 1–4 = Regular egg (÷12), 5–7 = Large egg (÷2), 8–20 = Huge egg (÷1). Egg element/type (Scorching, Damp, Verdant, Dragon…) does not affect hatch time.
              </p>
            </div>
          </div>

          {/* World Setting & Speed Bonus Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5">
            {/* World Setting Preset Select */}
            <div className="space-y-2">
              <label
                htmlFor="world-setting-preset"
                className="block text-sm font-bold text-white"
              >
                World Setting Preset (PalEggDefaultHatchingTime)
              </label>
              <select
                id="world-setting-preset"
                value={presetId}
                onChange={e => handlePresetChange(e.target.value as IncubationPresetId)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {INCUBATION_WORLD_PRESETS.map(preset => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label} ({preset.hours} h)
                  </option>
                ))}
                <option value="custom">Custom hours ({parsedHours} h)</option>
              </select>
            </div>

            {/* Custom Hours Override */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="custom-hours-input"
                  className="text-xs font-semibold text-zinc-300"
                >
                  Custom Incubation Hours (Overrides Preset)
                </label>
                <span className="text-[11px] text-zinc-400 font-mono tabular-nums">
                  {parsedHours === 0 ? 'Instant hatch' : `${parsedHours} h for Huge egg`}
                </span>
              </div>
              <div className="relative">
                <input
                  id="custom-hours-input"
                  type="number"
                  min={0}
                  step="any"
                  value={hoursInput}
                  onChange={e => handleCustomHoursChange(e.target.value)}
                  placeholder="1"
                  className="w-full min-h-[44px] pl-3.5 pr-16 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-mono tabular-nums text-white focus:outline-none focus:border-cyan-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-500 pointer-events-none">
                  hours
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Enter any value ≥ 0 (decimals allowed). Palworld 1.0 halved new-world defaults to 1 h (Normal) and 2 h (Hard), while older dedicated servers often keep 72 h. Setting 0 hatches instantly.
              </p>
            </div>

            {/* Incubation Speed Bonus (%) */}
            <div className="pt-4 border-t border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="speed-bonus-input"
                  className="text-xs font-semibold text-zinc-300"
                >
                  Incubation Speed Bonus (%)
                </label>
                <div className="flex items-center gap-1.5">
                  {SPEED_QUICK_OPTIONS.map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setSpeedInput(String(pct))}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono tabular-nums border transition-colors cursor-pointer ${
                        parsedSpeed === pct
                          ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      +{pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <input
                  id="speed-bonus-input"
                  type="number"
                  min={0}
                  step="any"
                  value={speedInput}
                  onChange={e => setSpeedInput(e.target.value)}
                  placeholder="0"
                  className="w-full min-h-[44px] pl-3.5 pr-12 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-mono tabular-nums text-white focus:outline-none focus:border-cyan-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-500 pointer-events-none">
                  %
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Keeping the incubator at a comfortable temperature for the egg&apos;s element grants a hatching-speed bonus (at +100%, hatch time halves).
              </p>
            </div>
          </div>
        </div>

        {/* Right: Result Readout & All-Size Comparison */}
        <div className="lg:col-span-6 space-y-6">
          {/* Primary Hatch Time Card */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Estimated Hatch Time ({activeMeta.label})</span>
              </div>

              <div
                data-testid="hatch-time-display"
                className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-cyan-400 tracking-tight"
              >
                {currentResult.formatted.isInstant ? '0s (Instant)' : currentResult.formatted.primary}
              </div>

              {currentResult.formatted.daysText && (
                <div
                  data-testid="hatch-days-display"
                  className="text-base font-bold font-mono tabular-nums text-emerald-400"
                >
                  {currentResult.formatted.daysText}
                </div>
              )}

              <div className="text-xs text-zinc-400 font-mono tabular-nums pt-1">
                {currentResult.roundedSeconds.toLocaleString()} s · Setting {parsedHours} h · Divisor ÷{activeMeta.divisor} · Speed +{parsedSpeed}%
              </div>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400">Exact Seconds</div>
                <div
                  data-testid="hatch-seconds"
                  className="text-2xl font-bold font-mono tabular-nums text-white mt-1"
                >
                  {currentResult.roundedSeconds.toLocaleString()} s
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5 font-mono tabular-nums">
                  {parsedHours} × 3,600 ÷ {activeMeta.divisor} ÷ {(1 + parsedSpeed / 100).toFixed(2)}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400">Speed Multiplier</div>
                <div className="text-2xl font-bold font-mono tabular-nums text-emerald-400 mt-1">
                  {(1 + parsedSpeed / 100).toFixed(2)}×
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  {parsedSpeed === 0 ? 'No temperature bonus' : `Time divided by ${(1 + parsedSpeed / 100).toFixed(2)}`}
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Table for All 3 Egg Sizes */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">
                All Egg Sizes Comparison
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono tabular-nums">
                At {parsedHours} h world setting · +{parsedSpeed}% speed bonus
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono tabular-nums">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-800">
                    <th className="text-left py-2.5 pr-2 font-medium">Egg Size</th>
                    <th className="text-right py-2.5 px-2 font-medium">Rarity</th>
                    <th className="text-right py-2.5 px-2 font-medium">Divisor</th>
                    <th className="text-right py-2.5 px-2 font-medium">Seconds</th>
                    <th className="text-right py-2.5 pl-2 font-medium">Hatch Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70">
                  {comparisonRows.map(row => {
                    const isSelected = row.size === eggSize;
                    return (
                      <tr
                        key={row.size}
                        onClick={() => handleSelectSize(row.size)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/15 text-white'
                            : 'text-zinc-300 hover:bg-zinc-950/60'
                        }`}
                      >
                        <td className="py-3 pr-2 font-sans font-semibold text-white">
                          {row.sizeMeta.shortLabel}
                        </td>
                        <td className="py-3 px-2 text-right text-zinc-400">
                          {row.sizeMeta.rarityMin}–{row.sizeMeta.rarityMax}
                        </td>
                        <td className="py-3 px-2 text-right text-zinc-400">
                          ÷{row.sizeMeta.divisor}
                        </td>
                        <td className="py-3 px-2 text-right">
                          {row.roundedSeconds.toLocaleString()} s
                        </td>
                        <td className="py-3 pl-2 text-right font-bold text-cyan-400">
                          {row.formatted.isInstant ? '0s (Instant)' : row.formatted.primary}
                          {row.formatted.daysText ? ` (${row.formatted.daysText})` : ''}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
