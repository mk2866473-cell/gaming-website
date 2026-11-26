/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Briefcase, Check, DollarSign, Info, RotateCcw, BarChart3 } from 'lucide-react';
import {
  MC_BUSINESSES,
  MC_SUPPLY_BAR_COST,
  McBusinessId,
  McSaleDestination,
  calculateMcBusinessProfit
} from '../../data/gtaOnlineData';

function formatHoursMinutes(totalMinutes: number): string {
  const hrs = Math.floor(totalMinutes / 60);
  const mins = Math.round(totalMinutes % 60);
  if (totalMinutes === 0) return '0 min';
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs} hr (${totalMinutes.toLocaleString()} min)`;
  return `${hrs} hr ${mins} min (${totalMinutes.toLocaleString()} min)`;
}

function formatUsd(value: number): string {
  const abs = Math.abs(Math.round(value)).toLocaleString('en-US');
  return value < 0 ? `−$${abs}` : `$${abs}`;
}

export default function GtaOnlineMcBusinessProfitCalculator() {
  const [businessId, setBusinessId] = useState<McBusinessId>('cocaine');
  const [stockPercent, setStockPercent] = useState<number>(100);
  const [upgraded, setUpgraded] = useState<boolean>(true);
  const [destination, setDestination] = useState<McSaleDestination>('far');
  const [suppliesBought, setSuppliesBought] = useState<boolean>(true);

  const result = useMemo(
    () =>
      calculateMcBusinessProfit({
        businessId,
        stockPercent,
        upgraded,
        destination,
        suppliesBought
      }),
    [businessId, stockPercent, upgraded, destination, suppliesBought]
  );

  const allComparison = useMemo(
    () =>
      MC_BUSINESSES.map((biz) =>
        calculateMcBusinessProfit({
          businessId: biz.id,
          stockPercent,
          upgraded,
          destination,
          suppliesBought
        })
      ),
    [stockPercent, upgraded, destination, suppliesBought]
  );

  const resetDefaults = () => {
    setBusinessId('cocaine');
    setStockPercent(100);
    setUpgraded(true);
    setDestination('far');
    setSuppliesBought(true);
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>GTA Online • Title Update 1.73 Base Values</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            MC Businesses Profit Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Compare Cocaine, Meth, Counterfeit Cash, Weed, and Document Forgery gross payouts, supply costs, net profit, and hourly earnings.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDefaults}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Full Stock (100%)</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. MC Business Preset */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              1. MC Business Preset (5)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MC_BUSINESSES.map((biz) => {
                const active = biz.id === businessId;
                return (
                  <button
                    key={biz.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setBusinessId(biz.id)}
                    className={`px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-emerald-600/20 border-emerald-400 text-white'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{biz.name}</div>
                    <div className="text-[11px] font-mono text-slate-400 tabular-nums">
                      Cap: {biz.capacityUnits} units
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Stock Percent */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="mc-stock-percent"
                className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider"
              >
                2. Stock Percentage (0–100%)
              </label>
              <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                {result.stockPercent}% → {result.units} / {result.business.capacityUnits} units
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <input
                id="mc-stock-percent"
                type="number"
                min={0}
                max={100}
                step={1}
                value={stockPercent}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (Number.isNaN(val)) {
                    setStockPercent(0);
                  } else {
                    setStockPercent(Math.min(100, Math.max(0, val)));
                  }
                }}
                className="w-full sm:w-32 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
              />
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={result.stockPercent}
                onChange={(e) => setStockPercent(parseInt(e.target.value, 10))}
                className="flex-1 accent-emerald-500 cursor-pointer"
                aria-label="MC business stock percentage slider"
              />
              <div className="flex gap-1.5">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setStockPercent(pct)}
                    className={`px-2.5 py-2 rounded-xl border text-xs font-mono font-bold tabular-nums cursor-pointer ${
                      result.stockPercent === pct
                        ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Selling at about a quarter of capacity (25%) or less keeps the sale to a single delivery vehicle.
            </p>
          </div>

          {/* 3. Upgrades, 4. Destination, 5. Supplies */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block mb-2">
                3. Equipment + Staff Upgrades
              </span>
              <button
                type="button"
                aria-pressed={upgraded}
                onClick={() => setUpgraded((prev) => !prev)}
                className={`w-full px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  upgraded
                    ? 'bg-emerald-600/20 border-emerald-400 text-white'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">
                    {upgraded ? 'Equipment + Staff Upgrades: ON' : 'No Upgrades (Base Rates)'}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5 tabular-nums">
                    Full stock supplies:{' '}
                    {formatUsd(
                      upgraded
                        ? result.business.fullStockSupplyCostUpgraded
                        : result.business.fullStockSupplyCostBase
                    )}
                  </div>
                </div>
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    upgraded
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'bg-[#070b19] border-indigo-900 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                  4. Sale Destination
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDestination('local')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      destination === 'local'
                        ? 'bg-emerald-600/20 border-emerald-400 text-white'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">Local</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">×1.0 base</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDestination('far')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      destination === 'far'
                        ? 'bg-emerald-600/20 border-emerald-400 text-white'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">Far Buyer</div>
                    <div className="text-[11px] font-mono text-emerald-400 mt-0.5">+50% (×1.5)</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                  5. Supplies Source
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSuppliesBought(true)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      suppliesBought
                        ? 'bg-emerald-600/20 border-emerald-400 text-white'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">Bought</div>
                    <div className="text-[11px] font-mono text-amber-300 mt-0.5">
                      ${(MC_SUPPLY_BAR_COST / 1000).toFixed(0)}k/bar
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSuppliesBought(false)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      !suppliesBought
                        ? 'bg-emerald-600/20 border-emerald-400 text-white'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">Stolen</div>
                    <div className="text-[11px] font-mono text-emerald-400 mt-0.5">$0 cost</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                {result.business.name} Net Profit
              </span>
              <div
                className={`text-3xl sm:text-5xl font-black tracking-tight font-mono tabular-nums ${
                  result.net < 0 ? 'text-rose-400' : 'text-white'
                }`}
              >
                {formatUsd(result.net)}
              </div>
              <p className="text-[11px] text-slate-400 font-mono tabular-nums">
                {result.units} of {result.business.capacityUnits} units × {formatUsd(result.unitValue)}/unit ({destination === 'far' ? 'Far' : 'Local'})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono tabular-nums">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Units of Stock</span>
                <span className="text-white font-bold text-sm">{result.units} units</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Gross Payout</span>
                <span className="text-white font-bold text-sm">{formatUsd(result.gross)}</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Supply Cost</span>
                <span className="text-amber-300 font-bold text-sm">
                  {result.supplyCost > 0 ? `−$${result.supplyCost.toLocaleString('en-US')}` : '$0'}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Production Time</span>
                <span className="text-cyan-300 font-bold text-sm">
                  {formatHoursMinutes(result.productionMinutes)}
                </span>
              </div>
            </div>

            <div className="bg-[#070b19]/80 border border-emerald-950 p-3.5 rounded-xl flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="text-slate-400 uppercase text-[10px] flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Net Per Hour</span>
              </span>
              <span className={`font-bold text-base ${result.netPerHour < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {formatUsd(result.netPerHour)}/hr
              </span>
            </div>

            {/* Verified Notes */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>MC Business Rules (TU 1.73)</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
                <li>• Supplies are bought in bars of $75,000 for every business.</li>
                <li>• Far buyers pay 50% more than local buyers (×1.5).</li>
                <li>• Selling at about a quarter of capacity or less keeps the sale to a single delivery vehicle.</li>
                <li>• Money Fronts boosts, High Demand and weekly bonuses are not included.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* All 5 MC Businesses Comparison Table */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>
              All 5 MC Businesses Comparison ({stockPercent}% Stock · {upgraded ? 'Upgraded' : 'No Upgrades'} ·{' '}
              {destination === 'far' ? 'Far' : 'Local'} · {suppliesBought ? 'Bought' : 'Stolen'})
            </span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs tabular-nums">
            <thead>
              <tr className="border-b border-indigo-950 text-slate-400 font-mono">
                <th className="py-2.5 pr-3">Business</th>
                <th className="py-2.5 px-3">Units</th>
                <th className="py-2.5 px-3">Gross</th>
                <th className="py-2.5 px-3">Supply Cost</th>
                <th className="py-2.5 px-3">Net Profit</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 pl-3">Net / Hr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-950/70">
              {allComparison.map((row) => {
                const isSelected = row.business.id === businessId;
                return (
                  <tr
                    key={row.business.id}
                    onClick={() => setBusinessId(row.business.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-500/10 text-white' : 'text-slate-300 hover:bg-[#0c122e]'
                    }`}
                  >
                    <td className="py-2.5 pr-3 font-semibold">{row.business.name}</td>
                    <td className="py-2.5 px-3 font-mono">{row.units} / {row.business.capacityUnits}</td>
                    <td className="py-2.5 px-3 font-mono">{formatUsd(row.gross)}</td>
                    <td className="py-2.5 px-3 font-mono text-amber-300">
                      {row.supplyCost > 0 ? `−$${row.supplyCost.toLocaleString('en-US')}` : '$0'}
                    </td>
                    <td className={`py-2.5 px-3 font-mono font-bold ${row.net < 0 ? 'text-rose-400' : 'text-emerald-300'}`}>
                      {formatUsd(row.net)}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-cyan-300">{row.productionMinutes} min</td>
                    <td className={`py-2.5 pl-3 font-mono font-bold ${row.netPerHour < 0 ? 'text-rose-400' : 'text-white'}`}>
                      {formatUsd(row.netPerHour)}/hr
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
