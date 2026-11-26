/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Shield, Check, DollarSign, Clock, Truck, Info, RotateCcw } from 'lucide-react';
import {
  BUNKER_CONFIG,
  BunkerSaleDestination,
  calculateBunkerProfit
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

export default function GtaOnlineBunkerProfitCalculator() {
  const [units, setUnits] = useState<number>(BUNKER_CONFIG.capacityUnits);
  const [upgraded, setUpgraded] = useState<boolean>(true);
  const [destination, setDestination] = useState<BunkerSaleDestination>('los-santos');
  const [suppliesBought, setSuppliesBought] = useState<boolean>(true);

  const result = useMemo(
    () =>
      calculateBunkerProfit({
        units,
        upgraded,
        destination,
        suppliesBought
      }),
    [units, upgraded, destination, suppliesBought]
  );

  const resetFullSale = () => {
    setUnits(BUNKER_CONFIG.capacityUnits);
    setUpgraded(true);
    setDestination('los-santos');
    setSuppliesBought(true);
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>GTA Online • Title Update 1.73 Base Values</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Bunker Profit Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate Gunrunning Bunker gross value, supply cost, net profit, production time, hourly rate, and delivery vehicle count.
          </p>
        </div>
        <button
          type="button"
          onClick={resetFullSale}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Full Bunker (100 Units)</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Stock Units */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="bunker-stock-units"
                className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider"
              >
                1. Stock Units (0–{BUNKER_CONFIG.capacityUnits})
              </label>
              <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                {result.units} / {BUNKER_CONFIG.capacityUnits} units
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <input
                id="bunker-stock-units"
                type="number"
                min={0}
                max={BUNKER_CONFIG.capacityUnits}
                step={1}
                value={units}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (Number.isNaN(val)) {
                    setUnits(0);
                  } else {
                    setUnits(Math.min(BUNKER_CONFIG.capacityUnits, Math.max(0, val)));
                  }
                }}
                className="w-full sm:w-32 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
              />
              <input
                type="range"
                min={0}
                max={BUNKER_CONFIG.capacityUnits}
                step={1}
                value={result.units}
                onChange={(e) => setUnits(parseInt(e.target.value, 10))}
                className="flex-1 accent-emerald-500 cursor-pointer"
                aria-label="Bunker stock units slider"
              />
              <div className="flex gap-1.5">
                {[20, 25, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setUnits(preset)}
                    className={`px-2.5 py-2 rounded-xl border text-xs font-mono font-bold tabular-nums cursor-pointer ${
                      result.units === preset
                        ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              A full supply bar costs ${BUNKER_CONFIG.supplyBarCost.toLocaleString()} and makes{' '}
              {BUNKER_CONFIG.unitsPerSupplyBar} units of stock. Selling 25 units or fewer guarantees 1 vehicle.
            </p>
          </div>

          {/* 2. Equipment + Staff Upgrades */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              2. Equipment + Staff Upgrades
            </span>
            <button
              type="button"
              aria-pressed={upgraded}
              onClick={() => setUpgraded((prev) => !prev)}
              className={`w-full px-4 py-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                upgraded
                  ? 'bg-emerald-600/20 border-emerald-400 text-white'
                  : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="text-xs font-bold">
                  {upgraded
                    ? 'Equipment + Staff Upgrades: ON'
                    : 'No Upgrades (Base Rates)'}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5 tabular-nums">
                  {upgraded
                    ? '$7,000/unit local • 7 min per unit'
                    : '$5,000/unit local • 10 min per unit'}
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
            <p className="text-[11px] text-slate-400 tabular-nums">
              Upgrade costs: Equipment ${BUNKER_CONFIG.upgradeCosts.equipment.toLocaleString()} + Staff $
              {BUNKER_CONFIG.upgradeCosts.staff.toLocaleString()}.
            </p>
          </div>

          {/* 3. Sale Destination & 4. Supplies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                3. Sale Destination
              </span>
              <div className="grid grid-cols-2 gap-2.5">
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
                  onClick={() => setDestination('los-santos')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    destination === 'los-santos'
                      ? 'bg-emerald-600/20 border-emerald-400 text-white'
                      : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">Los Santos</div>
                  <div className="text-[11px] font-mono text-emerald-400 mt-0.5">×1.5 payout</div>
                </button>
              </div>
            </div>

            <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                4. Supplies Source
              </span>
              <div className="grid grid-cols-2 gap-2.5">
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
                  <div className="text-[11px] font-mono text-amber-300 mt-0.5">$3,750/unit</div>
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
                  <div className="text-[11px] font-mono text-emerald-400 mt-0.5">$0 supply cost</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                Estimated Net Profit
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1.5 font-mono tabular-nums">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 self-center shrink-0" />
                <span>{result.net.toLocaleString('en-US')}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tabular-nums">
                {result.units} units × {formatUsd(result.unitValue)}/unit ({result.destination === 'los-santos' ? 'Los Santos' : 'Local'})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono tabular-nums">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Gross Sale</span>
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
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Net Per Hour</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {formatUsd(result.netPerHour)}/hr
                </span>
              </div>
            </div>

            {/* Delivery Vehicles */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Delivery Vehicles</span>
                </span>
                <span className="font-mono font-bold text-white text-sm tabular-nums">
                  {result.deliveryVehiclesLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {result.deliveryVehiclesNote}
              </p>
            </div>

            {/* Verified Base Facts */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bunker Base Facts (TU 1.73)</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
                <li>
                  • A full supply bar costs $75,000 and makes 20 units of stock ($3,750/unit).
                </li>
                <li>
                  • Selling 25 units or fewer always uses a single delivery vehicle.
                </li>
                <li>
                  • High Demand and weekly bonuses are not included in these base values.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
