/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TrendingUp, Clock, DollarSign, Info, RotateCcw, Calendar } from 'lucide-react';
import {
  BUSINESS_ROI_PRESETS,
  NIGHTCLUB_LOCATIONS,
  BUNKER_LOCATIONS,
  BusinessRoiPresetId,
  calculateBusinessRoi
} from '../../data/gtaOnlineData';

export default function GtaOnlineBusinessRoiCalculator() {
  const [presetId, setPresetId] = useState<BusinessRoiPresetId>('acid-lab-upgraded');
  const [nightclubLocationId, setNightclubLocationId] = useState<string>(NIGHTCLUB_LOCATIONS[0].id);
  const [bunkerLocationId, setBunkerLocationId] = useState<string>(BUNKER_LOCATIONS[0].id);
  const [customSetupCost, setCustomSetupCost] = useState<number>(1000000);
  const [customNetPerHour, setCustomNetPerHour] = useState<number>(50000);
  const [otherCosts, setOtherCosts] = useState<number>(0);
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);

  const result = useMemo(() => {
    return calculateBusinessRoi({
      presetId,
      nightclubLocationId,
      bunkerLocationId,
      customSetupCost,
      customNetPerHour,
      otherCosts,
      hoursPerDay
    });
  }, [
    presetId,
    nightclubLocationId,
    bunkerLocationId,
    customSetupCost,
    customNetPerHour,
    otherCosts,
    hoursPerDay
  ]);

  const resetDefaults = () => {
    setPresetId('acid-lab-upgraded');
    setNightclubLocationId(NIGHTCLUB_LOCATIONS[0].id);
    setBunkerLocationId(BUNKER_LOCATIONS[0].id);
    setCustomSetupCost(1000000);
    setCustomNetPerHour(50000);
    setOtherCosts(0);
    setHoursPerDay(2);
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="text-xs font-mono font-bold text-emerald-400 mb-1.5 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>GTA Online · Business ROI &amp; Payback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Business ROI / Payback Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate total setup cost, active hours until payback, real days to break even, and weekly profit.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDefaults}
          className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Active Session Rule Banner */}
      <div className="p-4 rounded-2xl bg-[#070b19] border border-emerald-500/30 flex items-start gap-3 text-xs text-slate-200">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <span>
          <strong>Active Session Rule:</strong> Production businesses only earn while the player is in an active session. Payback hours measure active in-session play time, and payback days divide those active hours by your daily play pace.
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Business Preset */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <span className="text-xs font-mono font-bold text-slate-300 tracking-wider block">
              1. Select Business Preset
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BUSINESS_ROI_PRESETS.map((preset) => {
                const isSelected = presetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setPresetId(preset.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600/20 border-emerald-400 text-white shadow-md'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold leading-snug">{preset.name}</div>
                    <div className="text-[11px] font-mono tabular-nums text-emerald-400 mt-1">
                      {preset.netPerHour !== null
                        ? `$${preset.netPerHour.toLocaleString()}/active hr`
                        : 'Enter custom setup & rate'}
                    </div>
                  </button>
                );
              })}
            </div>
            {result.preset.note && (
              <p className="text-[11px] text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-3">
                {result.preset.note}
              </p>
            )}
          </div>

          {/* 2. Preset Location or Custom Inputs */}
          {result.preset.locationType === 'nightclub' && (
            <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-2.5">
              <label
                htmlFor="roi-nightclub-location"
                className="text-xs font-mono font-bold text-slate-300 tracking-wider block"
              >
                2. Nightclub Location
              </label>
              <select
                id="roi-nightclub-location"
                value={nightclubLocationId}
                onChange={(e) => setNightclubLocationId(e.target.value)}
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                {NIGHTCLUB_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — ${loc.cost.toLocaleString()}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">
                Includes Equipment Upgrade ($1,425,000) and Extra Technicians ($878,000).
              </p>
            </div>
          )}

          {result.preset.locationType === 'bunker' && (
            <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-2.5">
              <label
                htmlFor="roi-bunker-location"
                className="text-xs font-mono font-bold text-slate-300 tracking-wider block"
              >
                2. Bunker Location
              </label>
              <select
                id="roi-bunker-location"
                value={bunkerLocationId}
                onChange={(e) => setBunkerLocationId(e.target.value)}
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                {BUNKER_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — ${loc.cost.toLocaleString()}
                  </option>
                ))}
              </select>
              {presetId === 'bunker-upgraded' && (
                <p className="text-[11px] text-slate-400">
                  Includes Equipment Upgrade ($1,155,000) and Staff Upgrade ($598,500).
                </p>
              )}
            </div>
          )}

          {presetId === 'custom' && (
            <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="roi-custom-setup"
                  className="text-xs font-mono font-bold text-slate-300 tracking-wider block"
                >
                  Total Setup Cost ($)
                </label>
                <input
                  id="roi-custom-setup"
                  type="number"
                  min={0}
                  step={10000}
                  value={customSetupCost}
                  onChange={(e) =>
                    setCustomSetupCost(Math.max(0, parseInt(e.target.value, 10) || 0))
                  }
                  className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="roi-custom-rate"
                  className="text-xs font-mono font-bold text-slate-300 tracking-wider block"
                >
                  Net Profit / Active Hour ($)
                </label>
                <input
                  id="roi-custom-rate"
                  type="number"
                  min={0}
                  step={1000}
                  value={customNetPerHour}
                  onChange={(e) =>
                    setCustomNetPerHour(Math.max(0, parseInt(e.target.value, 10) || 0))
                  }
                  className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-emerald-300 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* 3. Other Costs & Daily Play Pace */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="roi-other-costs"
                className="text-xs font-mono font-bold text-slate-300 tracking-wider block"
              >
                Other Costs (Optional, $)
              </label>
              <input
                id="roi-other-costs"
                type="number"
                min={0}
                step={5000}
                value={otherCosts}
                onChange={(e) => setOtherCosts(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[11px] text-slate-400 block">
                Added to preset setup cost (e.g. storage, styling, optional upgrades).
              </span>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="roi-hours-per-day"
                className="text-xs font-mono font-bold text-slate-300 tracking-wider block"
              >
                Active Hours Played / Day
              </label>
              <input
                id="roi-hours-per-day"
                type="number"
                min={0.5}
                max={24}
                step={0.5}
                value={hoursPerDay}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setHoursPerDay(Number.isFinite(val) ? Math.min(24, Math.max(0, val)) : 0);
                }}
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-cyan-300 font-bold focus:outline-none focus:border-emerald-500"
              />
              <div className="flex gap-1.5 pt-1">
                {[1, 2, 3, 4].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHoursPerDay(h)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold cursor-pointer ${
                      hoursPerDay === h
                        ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {h}h/day
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 tracking-wider font-bold">
                Active Play Time Until Payback
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-2 tabular-nums">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 self-center shrink-0" />
                <span>{result.paybackHoursFormatted} hours</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {result.preset.name}
              </p>
            </div>

            {/* 4 Key Metrics */}
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono tabular-nums">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Total Setup Cost</span>
                <span className="text-amber-300 font-bold text-sm">
                  ${result.totalSetupCost.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Net / Active Hour</span>
                <span className="text-emerald-400 font-bold text-sm">
                  ${result.netPerHour.toLocaleString()}/hr
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">
                  Real Days ({result.hoursPerDay}h/day)
                </span>
                <span className="text-cyan-300 font-bold text-sm flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{result.paybackDaysFormatted} days</span>
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Weekly Profit</span>
                <span className="text-white font-bold text-sm flex items-center gap-0.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{result.weeklyProfit.toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* Setup Breakdown */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-1.5 text-[11px] font-mono tabular-nums text-slate-300">
              <div className="text-[10px] text-slate-400 font-bold pb-1">
                Setup Cost Breakdown
              </div>
              {result.components.map((comp) => (
                <div key={comp.label} className="flex justify-between gap-2">
                  <span>{comp.label}:</span>
                  <span className="text-white font-bold">${comp.amount.toLocaleString()}</span>
                </div>
              ))}
              {result.otherCosts > 0 && (
                <div className="flex justify-between gap-2 text-amber-300">
                  <span>Other Costs:</span>
                  <span>+${result.otherCosts.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-indigo-950 pt-1.5 mt-1.5 flex justify-between text-emerald-300 font-bold">
                <span>Total Setup Investment:</span>
                <span>${result.totalSetupCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Formulas Summary */}
            <div className="text-[11px] text-slate-400 space-y-1 leading-relaxed font-mono">
              <div>Payback Hours = Total Setup ÷ Net/hr</div>
              <div>Payback Days = Payback Hours ÷ Hours/day</div>
              <div>Weekly Profit = Net/hr × Hours/day × 7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
