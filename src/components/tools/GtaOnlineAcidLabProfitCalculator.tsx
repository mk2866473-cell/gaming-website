/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { FlaskConical, Clock, Check, DollarSign, Info, RotateCcw } from 'lucide-react';
import {
  ACID_LAB_MAX_CAPACITY,
  ACID_LAB_MIN_UNITS,
  ACID_LAB_INSTALLATION_COST,
  ACID_LAB_EQUIPMENT_UPGRADE_COST,
  ACID_LAB_UPGRADE_FOOLIGAN_JOBS_REQUIRED,
  ACID_LAB_SUPPLY_COST_PER_UNIT,
  ACID_LAB_DAILY_BOOST_MAX_UNITS,
  calculateAcidLabProfit
} from '../../data/gtaOnlineData';

function formatMinutes(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs}h (${minutes} min)`;
  return `${hrs}h ${mins}m (${minutes} min)`;
}

export default function GtaOnlineAcidLabProfitCalculator() {
  const [equipmentUpgrade, setEquipmentUpgrade] = useState<boolean>(true);
  const [productNamed, setProductNamed] = useState<boolean>(true);
  const [unitsToProduce, setUnitsToProduce] = useState<number>(ACID_LAB_MAX_CAPACITY);
  const [suppliesBought, setSuppliesBought] = useState<boolean>(true);

  const result = useMemo(() => {
    return calculateAcidLabProfit({
      equipmentUpgrade,
      productNamed,
      unitsToProduce,
      suppliesBought
    });
  }, [equipmentUpgrade, productNamed, unitsToProduce, suppliesBought]);

  const resetDefaults = () => {
    setEquipmentUpgrade(true);
    setProductNamed(true);
    setUnitsToProduce(ACID_LAB_MAX_CAPACITY);
    setSuppliesBought(true);
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>GTA Online • Title Update 1.73</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Acid Lab Profit Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate Acid Lab revenue, supply costs, production minutes, net profit, and net profit per hour up to 160 units.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDefaults}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Full Batch (160 Units)</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Upgrade & Product Naming */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                1. Equipment Upgrade
              </span>
              <button
                type="button"
                onClick={() => setEquipmentUpgrade((prev) => !prev)}
                className={`w-full px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  equipmentUpgrade
                    ? 'bg-emerald-600/20 border-emerald-400 text-white'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">
                    {equipmentUpgrade ? 'Equipment Upgrade: ON' : 'Standard Lab (OFF)'}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {equipmentUpgrade
                      ? '90s/unit • 1 supply/unit'
                      : '135s/unit • 2 supplies/unit'}
                  </div>
                </div>
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    equipmentUpgrade
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'bg-[#070b19] border-indigo-900 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </span>
              </button>
              <span className="text-[11px] text-slate-400 block">
                ${ACID_LAB_EQUIPMENT_UPGRADE_COST.toLocaleString()} upgrade (unlocked after {ACID_LAB_UPGRADE_FOOLIGAN_JOBS_REQUIRED} Fooligan Jobs).
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                2. Product Named (+5%)
              </span>
              <button
                type="button"
                onClick={() => setProductNamed((prev) => !prev)}
                className={`w-full px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  productNamed
                    ? 'bg-emerald-600/20 border-emerald-400 text-white'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">
                    {productNamed ? 'Product Named: ON (+5%)' : 'Unnamed Product (OFF)'}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    ${result.valuePerUnit.toLocaleString()}/unit
                  </div>
                </div>
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    productNamed
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'bg-[#070b19] border-indigo-900 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </span>
              </button>
              <span className="text-[11px] text-slate-400 block">
                Standard: $1,485 → $1,559 • Upgraded: $2,095 → $2,199.
              </span>
            </div>
          </div>

          {/* 3. Units to Produce */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="acid-lab-units"
                className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider"
              >
                3. Units to Produce ({ACID_LAB_MIN_UNITS}–{ACID_LAB_MAX_CAPACITY})
              </label>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {result.units} / {ACID_LAB_MAX_CAPACITY} units
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <input
                id="acid-lab-units"
                type="number"
                min={ACID_LAB_MIN_UNITS}
                max={ACID_LAB_MAX_CAPACITY}
                step={1}
                value={unitsToProduce}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (Number.isNaN(val)) {
                    setUnitsToProduce(ACID_LAB_MIN_UNITS);
                  } else {
                    setUnitsToProduce(Math.min(ACID_LAB_MAX_CAPACITY, Math.max(ACID_LAB_MIN_UNITS, val)));
                  }
                }}
                className="w-full sm:w-36 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
              />
              <input
                type="range"
                min={ACID_LAB_MIN_UNITS}
                max={ACID_LAB_MAX_CAPACITY}
                step={1}
                value={result.units}
                onChange={(e) => setUnitsToProduce(parseInt(e.target.value, 10))}
                className="flex-1 accent-emerald-500 cursor-pointer"
                aria-label="Units to produce slider"
              />
              <div className="flex gap-1.5">
                {[40, 80, 160].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setUnitsToProduce(preset)}
                    className={`px-2.5 py-2 rounded-xl border text-xs font-mono font-bold cursor-pointer ${
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
              Acid Lab capacity is {ACID_LAB_MAX_CAPACITY} units. Production only ticks while online.
            </p>
          </div>

          {/* 4. Supplies Source */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              4. Supply Source
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSuppliesBought(true)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  suppliesBought
                    ? 'bg-emerald-600/20 border-emerald-400 text-white shadow-md'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Bought Supplies</div>
                <div className="text-[11px] font-mono text-amber-300 mt-0.5">
                  ${ACID_LAB_SUPPLY_COST_PER_UNIT}/supply unit
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSuppliesBought(false)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  !suppliesBought
                    ? 'bg-emerald-600/20 border-emerald-400 text-white shadow-md'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Stolen Supplies</div>
                <div className="text-[11px] font-mono text-emerald-400 mt-0.5">$0 supply cost</div>
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                Estimated Net Profit
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1.5">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 self-center shrink-0" />
                <span>{result.netProfit.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {result.units} units @ ${result.valuePerUnit.toLocaleString()}/unit
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Gross Revenue</span>
                <span className="text-white font-bold text-sm">
                  ${result.revenue.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Supply Cost</span>
                <span className="text-amber-300 font-bold text-sm">
                  -${result.supplyCost.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Production Time</span>
                <span className="text-cyan-300 font-bold text-sm">
                  {formatMinutes(result.productionMinutes)}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Net Profit / Hour</span>
                <span className="text-emerald-400 font-bold text-sm">
                  ${Math.round(result.netProfitPerHour).toLocaleString()}/hr
                </span>
              </div>
            </div>

            {/* Formula Breakdown */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Batch Breakdown</span>
              </span>
              <div className="space-y-1.5 text-slate-300 font-mono text-[11px] leading-relaxed">
                <div>
                  • Supply Units Needed:{' '}
                  <span className="text-white font-bold">
                    {result.supplyUnitsNeeded} ({result.supplyUnitsPerProduct} per Acid unit)
                  </span>
                </div>
                <div>
                  • Production Speed:{' '}
                  <span className="text-cyan-300 font-bold">{result.secondsPerUnit}s per unit</span>
                </div>
                <div>
                  • Total Production:{' '}
                  <span className="text-white font-bold">{result.productionMinutes} minutes</span>
                </div>
              </div>
            </div>

            {/* Acid Lab Verified Notes */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>Acid Lab Mechanics (TU 1.73)</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
                <li>
                  • Lab installation: ${ACID_LAB_INSTALLATION_COST.toLocaleString()} after free First Dose missions.
                </li>
                <li>
                  • Equipment Upgrade: ${ACID_LAB_EQUIPMENT_UPGRADE_COST.toLocaleString()} (unlocks after{' '}
                  {ACID_LAB_UPGRADE_FOOLIGAN_JOBS_REQUIRED} Fooligan Jobs).
                </li>
                <li>
                  • Daily production boost at the chemical table halves production time until{' '}
                  {ACID_LAB_DAILY_BOOST_MAX_UNITS} units are made.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
