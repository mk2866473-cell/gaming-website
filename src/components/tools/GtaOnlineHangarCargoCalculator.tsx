/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Plane, DollarSign, Info, RotateCcw, AlertTriangle } from 'lucide-react';
import {
  HANGAR_CONFIG,
  HANGAR_CARGO_TIERS,
  HangarTierId,
  calculateHangarCargoProfit
} from '../../data/gtaOnlineData';

function formatUsd(value: number): string {
  const abs = Math.abs(Math.round(value)).toLocaleString('en-US');
  return value < 0 ? `−$${abs}` : `$${abs}`;
}

export default function GtaOnlineHangarCargoCalculator() {
  const [tier1Crates, setTier1Crates] = useState<number>(50);
  const [tier2Crates, setTier2Crates] = useState<number>(0);
  const [tier3Crates, setTier3Crates] = useState<number>(0);
  const [capWarning, setCapWarning] = useState<string | null>(null);

  const updateTier = (tierId: HangarTierId, rawVal: number) => {
    const clean = Math.max(0, Math.round(Number.isFinite(rawVal) ? rawVal : 0));
    const otherTotal =
      tierId === 'tier1'
        ? tier2Crates + tier3Crates
        : tierId === 'tier2'
        ? tier1Crates + tier3Crates
        : tier1Crates + tier2Crates;
    const maxAllowed = Math.max(0, HANGAR_CONFIG.capacityCrates - otherTotal);

    if (clean > maxAllowed) {
      setCapWarning(
        `Hangar capacity is ${HANGAR_CONFIG.capacityCrates} crates total. Clamped to ${maxAllowed} crate${maxAllowed === 1 ? '' : 's'}.`
      );
    } else {
      setCapWarning(null);
    }

    const clamped = Math.min(maxAllowed, clean);
    if (tierId === 'tier1') setTier1Crates(clamped);
    if (tierId === 'tier2') setTier2Crates(clamped);
    if (tierId === 'tier3') setTier3Crates(clamped);
  };

  const applyPreset = (t1: number, t2: number, t3: number) => {
    setCapWarning(null);
    setTier1Crates(t1);
    setTier2Crates(t2);
    setTier3Crates(t3);
  };

  const result = useMemo(
    () =>
      calculateHangarCargoProfit({
        tier1Crates,
        tier2Crates,
        tier3Crates
      }),
    [tier1Crates, tier2Crates, tier3Crates]
  );

  const stateById: Record<HangarTierId, number> = {
    tier1: tier1Crates,
    tier2: tier2Crates,
    tier3: tier3Crates
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Plane className="w-3.5 h-3.5" />
            <span>GTA Online • Title Update 1.73 Base Values</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Hangar Air Freight Cargo Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate Hangar Air Freight crates across Tier 1, Tier 2, and Tier 3 cargo types up to 50 crates total with stockpile tier bonuses and Ron&apos;s 5% cut.
          </p>
        </div>
        <button
          type="button"
          onClick={() => applyPreset(50, 0, 0)}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Full Tier 1 (50 Crates)</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-1">Presets:</span>
        {[
          { label: '50 Tier 1', t1: 50, t2: 0, t3: 0 },
          { label: '25 Tier 1', t1: 25, t2: 0, t3: 0 },
          { label: '50 Tier 2', t1: 0, t2: 50, t3: 0 },
          { label: '50 Tier 3', t1: 0, t2: 0, t3: 50 },
          { label: '25 Tier 1 + 25 Tier 3', t1: 25, t2: 0, t3: 25 }
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p.t1, p.t2, p.t3)}
            className="px-3 py-1.5 rounded-lg bg-[#070b19] border border-indigo-900/70 hover:border-emerald-500/60 text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between bg-[#070b19] border border-indigo-950 rounded-xl px-4 py-3 text-xs font-mono">
            <span className="text-slate-300">Combined Hangar Stock</span>
            <span
              className={`font-bold tabular-nums ${
                result.totalCrates >= HANGAR_CONFIG.capacityCrates ? 'text-amber-300' : 'text-emerald-400'
              }`}
            >
              {result.totalCrates} / {HANGAR_CONFIG.capacityCrates} crates
            </span>
          </div>

          {capWarning && (
            <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{capWarning}</span>
            </div>
          )}

          {HANGAR_CARGO_TIERS.map((tier) => {
            const count = stateById[tier.id];
            const otherSum = result.totalCrates - count;
            const maxForTier = Math.max(0, HANGAR_CONFIG.capacityCrates - otherSum);
            return (
              <div
                key={tier.id}
                className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <label
                      htmlFor={`hangar-${tier.id}`}
                      className="text-xs font-mono font-bold uppercase text-white tracking-wider block"
                    >
                      {tier.label}
                    </label>
                    <p className="text-xs text-cyan-300 mt-1">
                      Cargo types: {tier.types.join(', ')}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                    {count} crates
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <input
                    id={`hangar-${tier.id}`}
                    type="number"
                    min={0}
                    max={50}
                    step={1}
                    value={count}
                    onChange={(e) => updateTier(tier.id, parseInt(e.target.value, 10))}
                    className="w-full sm:w-28 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="range"
                    min={0}
                    max={maxForTier}
                    step={1}
                    value={count}
                    onChange={(e) => updateTier(tier.id, parseInt(e.target.value, 10))}
                    className="flex-1 accent-emerald-500 cursor-pointer"
                    aria-label={`${tier.label} crates slider`}
                  />
                  <span className="text-[11px] font-mono text-slate-400 tabular-nums whitespace-nowrap">
                    Max left: {maxForTier}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                Estimated Net Payout
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1.5 font-mono tabular-nums">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 self-center shrink-0" />
                <span>{result.net.toLocaleString('en-US')}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tabular-nums">
                {result.totalCrates} crates @ ${HANGAR_CONFIG.baseValuePerCrate.toLocaleString('en-US')} base + tier stockpile bonuses
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono tabular-nums">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Total Gross</span>
                <span className="text-white font-bold text-sm">{formatUsd(result.totalGross)}</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Ron&apos;s Cut (5%)</span>
                <span className="text-amber-300 font-bold text-sm">
                  −${result.ronsCut.toLocaleString('en-US')}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Sourcing Cost</span>
                <span className="text-emerald-400 font-bold text-sm">$0</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Net Payout</span>
                <span className="text-emerald-300 font-bold text-sm">{formatUsd(result.net)}</span>
              </div>
            </div>

            {/* Per-Tier Breakdown Table */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2.5 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                Per-Tier Stockpile Breakdown
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left tabular-nums">
                  <thead>
                    <tr className="border-b border-indigo-950 text-slate-400 font-mono text-[11px]">
                      <th className="py-1.5 pr-2">Tier</th>
                      <th className="py-1.5 px-2">Crates</th>
                      <th className="py-1.5 px-2">Bonus</th>
                      <th className="py-1.5 pl-2">Tier Gross</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-950/60 font-mono text-[11px]">
                    {result.tiers.map((row) => (
                      <tr key={row.tier.id}>
                        <td className="py-2 pr-2 font-semibold text-white">
                          {row.tier.id.toUpperCase()}
                        </td>
                        <td className="py-2 px-2 text-slate-200">{row.crates}</td>
                        <td className="py-2 px-2 text-cyan-300">+{row.bonusPct}%</td>
                        <td className="py-2 pl-2 font-bold text-emerald-300">
                          {formatUsd(row.tierGross)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verified Base Facts */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hangar Base Facts (TU 1.73)</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
                <li>
                  • The stockpile bonus only counts crates of the SAME type, so one full type pays far more than a mixed hangar.
                </li>
                <li>
                  • The $30,000 base already includes Rockstar&apos;s permanent tripling of Air Freight payouts (older $10,000-per-crate tables are obsolete).
                </li>
                <li>• Sourcing cost is $0 because Hangar cargo is stolen in source missions.</li>
                <li>• High Demand, GTA+ and weekly bonuses are not included.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
