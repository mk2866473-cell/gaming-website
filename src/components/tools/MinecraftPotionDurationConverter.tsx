/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Clock, FlaskConical, Info, ArrowRight } from 'lucide-react';
import {
  POTION_DURATION_PRESETS,
  PotionVariantKey,
  computePotionDeliveryDurations,
  formatPotionMmSs
} from '../../data/minecraftBatch2Data';

interface QuickTestPreset {
  label: string;
  mode: 'preset' | 'custom';
  presetId?: string;
  variant?: PotionVariantKey;
  customSeconds?: string;
}

const QUICK_TESTS: QuickTestPreset[] = [
  { label: 'Fire Resistance (Extended 480s)', mode: 'preset', presetId: 'fire_resistance', variant: 'extended' },
  { label: 'Regeneration (Base 45s)', mode: 'preset', presetId: 'regeneration', variant: 'base' },
  { label: 'Regeneration II (22s)', mode: 'preset', presetId: 'regeneration', variant: 'level2' },
  { label: 'Poison II (21s)', mode: 'preset', presetId: 'poison', variant: 'level2' },
  { label: 'Slow Falling (Base 90s)', mode: 'preset', presetId: 'slow_falling', variant: 'base' },
  { label: 'Turtle Master (Base 20s)', mode: 'preset', presetId: 'turtle_master', variant: 'base' },
  { label: 'Custom 100s', mode: 'custom', customSeconds: '100' }
];

export default function MinecraftPotionDurationConverter() {
  const [inputMode, setInputMode] = useState<'preset' | 'custom'>('preset');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('fire_resistance');
  const [selectedVariant, setSelectedVariant] = useState<PotionVariantKey>('extended');
  const [customSecondsInput, setCustomSecondsInput] = useState<string>('100');

  const selectedPreset =
    POTION_DURATION_PRESETS.find((p) => p.id === selectedPresetId) ?? POTION_DURATION_PRESETS[0];

  const availableVariants = useMemo(() => {
    const list: { key: PotionVariantKey; label: string; seconds: number }[] = [];
    if (selectedPreset.baseSeconds !== null) {
      list.push({ key: 'base', label: `Base (${formatPotionMmSs(selectedPreset.baseSeconds)})`, seconds: selectedPreset.baseSeconds });
    }
    if (selectedPreset.extendedSeconds !== null) {
      list.push({ key: 'extended', label: `Redstone Extended (${formatPotionMmSs(selectedPreset.extendedSeconds)})`, seconds: selectedPreset.extendedSeconds });
    }
    if (selectedPreset.level2Seconds !== null) {
      list.push({ key: 'level2', label: `Glowstone Level II (${formatPotionMmSs(selectedPreset.level2Seconds)})`, seconds: selectedPreset.level2Seconds });
    }
    return list;
  }, [selectedPreset]);

  const activeVariantKey: PotionVariantKey = useMemo(() => {
    if (availableVariants.some((v) => v.key === selectedVariant)) {
      return selectedVariant;
    }
    return availableVariants[0]?.key ?? 'base';
  }, [availableVariants, selectedVariant]);

  const activeDurationSeconds = useMemo(() => {
    if (inputMode === 'custom') {
      const parsed = parseFloat(customSecondsInput);
      return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    }
    if (selectedPreset.isInstant) return 0;
    const match = availableVariants.find((v) => v.key === activeVariantKey);
    return match ? match.seconds : 0;
  }, [inputMode, customSecondsInput, selectedPreset, availableVariants, activeVariantKey]);

  const deliveryResults = useMemo(
    () => computePotionDeliveryDurations(activeDurationSeconds),
    [activeDurationSeconds]
  );

  const isInstantPreset = inputMode === 'preset' && Boolean(selectedPreset.isInstant);

  const handleSelectPreset = (id: string) => {
    setInputMode('preset');
    setSelectedPresetId(id);
    const nextPreset = POTION_DURATION_PRESETS.find((p) => p.id === id);
    if (nextPreset) {
      if (selectedVariant === 'extended' && nextPreset.extendedSeconds === null) {
        setSelectedVariant('base');
      } else if (selectedVariant === 'level2' && nextPreset.level2Seconds === null) {
        setSelectedVariant('base');
      }
    }
  };

  const applyQuickTest = (qt: QuickTestPreset) => {
    setInputMode(qt.mode);
    if (qt.mode === 'preset' && qt.presetId) {
      setSelectedPresetId(qt.presetId);
      if (qt.variant) setSelectedVariant(qt.variant);
    } else if (qt.mode === 'custom' && qt.customSeconds) {
      setCustomSecondsInput(qt.customSeconds);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Top Metadata + Quick Examples */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span>Java Edition · 20 ticks = 1 second · Redstone and Glowstone are mutually exclusive</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TESTS.map((qt) => (
              <button
                key={qt.label}
                type="button"
                onClick={() => applyQuickTest(qt)}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 text-xs text-zinc-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                {qt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Switch + Input Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Controls */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
              <button
                type="button"
                onClick={() => setInputMode('preset')}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  inputMode === 'preset'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Potion Preset
              </button>
              <button
                type="button"
                onClick={() => setInputMode('custom')}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  inputMode === 'custom'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Custom Seconds
              </button>
            </div>

            {inputMode === 'preset' ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="potion-preset-select" className="block text-xs font-semibold text-zinc-300">
                    Java Edition Potion Preset (19)
                  </label>
                  <select
                    id="potion-preset-select"
                    value={selectedPresetId}
                    onChange={(e) => handleSelectPreset(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 focus:border-emerald-500 rounded-lg text-sm text-white focus:outline-none"
                  >
                    {POTION_DURATION_PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.name}{preset.isInstant ? ' (Instant)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {!selectedPreset.isInstant ? (
                  <div className="space-y-2">
                    <span className="block text-xs font-semibold text-zinc-300">
                      Available Variants (Redstone &amp; Glowstone are mutually exclusive)
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {availableVariants.map((variant) => {
                        const active = variant.key === activeVariantKey;
                        return (
                          <button
                            key={variant.key}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setSelectedVariant(variant.key)}
                            className={`px-3 py-2.5 rounded-lg border text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                              active
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                            }`}
                          >
                            <span>{variant.label}</span>
                            <span className="font-mono tabular-nums text-zinc-400">
                              {variant.seconds} s
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                    <strong className="block text-amber-100 mb-1">Instant — no duration</strong>
                    Instant effects apply at 1/2 potency in a lingering cloud; tipped arrows of Healing/Harming apply at full strength.
                  </div>
                )}

                {selectedPreset.note && !selectedPreset.isInstant && (
                  <p className="text-xs text-cyan-300 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    Note: {selectedPreset.note}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="custom-potion-seconds" className="block text-xs font-semibold text-zinc-300">
                  Base Drinkable Duration (Seconds)
                </label>
                <input
                  id="custom-potion-seconds"
                  type="number"
                  min={0}
                  step="0.05"
                  value={customSecondsInput}
                  onChange={(e) => setCustomSecondsInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 focus:border-emerald-500 rounded-lg text-white font-mono tabular-nums text-sm focus:outline-none"
                />
                <p className="text-xs text-zinc-400 tabular-nums">
                  Formatted input: {formatPotionMmSs(activeDurationSeconds)} ({activeDurationSeconds} s)
                </p>
              </div>
            )}
          </div>

          {/* Right Delivery Form Output Table */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                {inputMode === 'preset' ? `${selectedPreset.name} Delivery Durations` : 'Custom Delivery Durations'}
              </h3>
              <span className="text-xs font-mono tabular-nums text-zinc-400">
                {isInstantPreset ? 'Instant — no duration' : `Base = ${activeDurationSeconds} s`}
              </span>
            </div>

            {isInstantPreset ? (
              <div className="py-8 text-center space-y-2 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4">
                <div className="text-xl font-bold text-white">Instant — no duration</div>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  {selectedPreset.name} triggers immediately instead of applying a timed status bar. Instant effects apply at 1/2 potency in a lingering cloud; tipped arrows of Healing/Harming apply at full strength.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deliveryResults.map((row) => (
                  <div
                    key={row.id}
                    className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-zinc-200">{row.name}</span>
                      <span className="text-[11px] font-mono text-emerald-400">{row.multiplierLabel}</span>
                    </div>
                    <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                      {row.seconds} s
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-mono tabular-nums pt-1 border-t border-zinc-800/80">
                      <span>mm:ss {row.mmss}</span>
                      <span className="text-cyan-300 font-semibold">
                        {row.ticks.toLocaleString('en-US')} ticks
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 flex items-start gap-2 text-xs text-zinc-300">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Formula: resultTicks = floor(durationSeconds × 20 × multiplier), minimum 1 tick for tipped arrows; displayed seconds = resultTicks ÷ 20.
              </span>
            </div>
          </div>
        </div>

        {/* Full Reference Table of Java Edition Timed & Instant Potions */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white">Java Edition Potion Duration Reference</h3>
            <a
              href="/tools/minecraft-brewing-calculator"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Open Minecraft Brewing Calculator
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tabular-nums">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-2 pr-3 font-semibold">Potion</th>
                  <th className="py-2 px-3 font-semibold">Base</th>
                  <th className="py-2 px-3 font-semibold">Extended (Redstone)</th>
                  <th className="py-2 pl-3 font-semibold">Level II (Glowstone)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70">
                {POTION_DURATION_PRESETS.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => handleSelectPreset(p.id)}
                    className={`cursor-pointer transition-colors ${
                      inputMode === 'preset' && selectedPresetId === p.id
                        ? 'bg-emerald-500/10 text-white'
                        : 'text-zinc-300 hover:bg-zinc-900/70'
                    }`}
                  >
                    <td className="py-2 pr-3 font-semibold">
                      {p.name}
                      {p.id === 'slowness' && (
                        <span className="ml-1.5 text-[11px] text-zinc-400">(Level II = Slowness IV)</span>
                      )}
                    </td>
                    {p.isInstant ? (
                      <td colSpan={3} className="py-2 px-3 text-amber-300 font-medium">
                        Instant — no duration (1/2 potency lingering; full strength arrow)
                      </td>
                    ) : (
                      <>
                        <td className="py-2 px-3 font-mono">
                          {p.baseSeconds !== null ? `${p.baseSeconds} s (${formatPotionMmSs(p.baseSeconds)})` : '—'}
                        </td>
                        <td className="py-2 px-3 font-mono">
                          {p.extendedSeconds !== null ? `${p.extendedSeconds} s (${formatPotionMmSs(p.extendedSeconds)})` : '—'}
                        </td>
                        <td className="py-2 pl-3 font-mono">
                          {p.level2Seconds !== null ? `${p.level2Seconds} s (${formatPotionMmSs(p.level2Seconds)})` : '—'}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
