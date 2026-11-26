/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Package, Truck, DollarSign, Info, RotateCcw, BarChart3 } from 'lucide-react';
import {
  SPECIAL_CARGO_WAREHOUSE_CAPACITIES,
  SPECIAL_CARGO_SOURCE_MISSION_COSTS,
  SpecialCargoWarehouseSize,
  SpecialCargoSourcingMethod,
  calculateSpecialCargoProfit
} from '../../data/gtaOnlineData';

function formatUsd(value: number): string {
  const abs = Math.abs(Math.round(value)).toLocaleString('en-US');
  return value < 0 ? `−$${abs}` : `$${abs}`;
}

export default function GtaOnlineSpecialCargoCrateValueCalculator() {
  const [warehouseSize, setWarehouseSize] = useState<SpecialCargoWarehouseSize>('large');
  const [crates, setCrates] = useState<number>(111);
  const [sourcingMethod, setSourcingMethod] = useState<SpecialCargoSourcingMethod>(3);

  const maxCapacity = SPECIAL_CARGO_WAREHOUSE_CAPACITIES[warehouseSize];

  const handleWarehouseChange = (size: SpecialCargoWarehouseSize) => {
    setWarehouseSize(size);
    setCrates(SPECIAL_CARGO_WAREHOUSE_CAPACITIES[size]);
  };

  const result = useMemo(
    () =>
      calculateSpecialCargoProfit({
        warehouseSize,
        crates,
        sourcingMethod
      }),
    [warehouseSize, crates, sourcingMethod]
  );

  const comparison = useMemo(
    () =>
      (['small', 'medium', 'large'] as SpecialCargoWarehouseSize[]).map((size) => ({
        size,
        label:
          size === 'small'
            ? 'Small (16 Crates)'
            : size === 'medium'
            ? 'Medium (42 Crates)'
            : 'Large (111 Crates)',
        ...calculateSpecialCargoProfit({
          warehouseSize: size,
          crates: SPECIAL_CARGO_WAREHOUSE_CAPACITIES[size],
          sourcingMethod
        })
      })),
    [sourcingMethod]
  );

  const resetFullLarge = () => {
    setWarehouseSize('large');
    setCrates(111);
    setSourcingMethod(3);
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Package className="w-3.5 h-3.5" />
            <span>GTA Online • Title Update 1.73 Base Values</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Special Cargo Crate Value Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate CEO Special Cargo per-crate sale value, gross revenue, sourcing cost, net profit, and land delivery trucks across Small, Medium, and Large warehouses.
          </p>
        </div>
        <button
          type="button"
          onClick={resetFullLarge}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Full Large (111 Crates)</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Warehouse Size */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              1. Warehouse Size
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {([
                { id: 'small', name: 'Small', cap: 16 },
                { id: 'medium', name: 'Medium', cap: 42 },
                { id: 'large', name: 'Large', cap: 111 }
              ] as const).map((w) => {
                const active = warehouseSize === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleWarehouseChange(w.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-emerald-600/20 border-emerald-400 text-white'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{w.name}</div>
                    <div className="text-[11px] font-mono text-slate-400 tabular-nums mt-0.5">
                      {w.cap} crates max
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Crates to Sell */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="special-cargo-crates"
                className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider"
              >
                2. Crates to Sell (1–{maxCapacity})
              </label>
              <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                {result.crates} / {maxCapacity} crates
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <input
                id="special-cargo-crates"
                type="number"
                min={1}
                max={maxCapacity}
                step={1}
                value={crates}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (Number.isNaN(val)) {
                    setCrates(1);
                  } else {
                    setCrates(Math.min(maxCapacity, Math.max(1, val)));
                  }
                }}
                className="w-full sm:w-32 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
              />
              <input
                type="range"
                min={1}
                max={maxCapacity}
                step={1}
                value={result.crates}
                onChange={(e) => setCrates(parseInt(e.target.value, 10))}
                className="flex-1 accent-emerald-500 cursor-pointer"
                aria-label="Special cargo crates slider"
              />
              <div className="flex gap-1.5">
                {[1, 9, maxCapacity].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCrates(preset)}
                    className={`px-2.5 py-2 rounded-xl border text-xs font-mono font-bold tabular-nums cursor-pointer ${
                      result.crates === preset
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
              Land sale trucks: 1 truck for 1–9 crates, 2 trucks for 10–29 crates, 3 trucks for 30+ crates.
            </p>
          </div>

          {/* 3. Sourcing Method */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              3. Sourcing Method
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {([1, 2, 3] as SpecialCargoSourcingMethod[]).map((m) => {
                const active = sourcingMethod === m;
                const cost = SPECIAL_CARGO_SOURCE_MISSION_COSTS[m];
                return (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSourcingMethod(m)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-emerald-600/20 border-emerald-400 text-white'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{m}-Crate Missions</div>
                    <div className="text-[11px] font-mono text-amber-300 tabular-nums mt-0.5">
                      ${cost.toLocaleString('en-US')}/mission
                    </div>
                  </button>
                );
              })}
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
                {result.crates} crates × {formatUsd(result.perCrateValue)}/crate ({result.sourcingMethod}-crate sourcing)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono tabular-nums">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Per-Crate Value</span>
                <span className="text-cyan-300 font-bold text-sm">{formatUsd(result.perCrateValue)}</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Gross Sale</span>
                <span className="text-white font-bold text-sm">{formatUsd(result.gross)}</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Sourcing Cost</span>
                <span className="text-amber-300 font-bold text-sm">
                  −${result.sourcingCost.toLocaleString('en-US')}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase flex items-center gap-1">
                  <Truck className="w-3 h-3 text-cyan-400" />
                  <span>Delivery Trucks</span>
                </span>
                <span className="text-emerald-400 font-bold text-sm">
                  {result.deliveryTrucks} {result.deliveryTrucks === 1 ? 'truck' : 'trucks'} (land)
                </span>
              </div>
            </div>

            {/* Verified Base Facts */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>Special Cargo Base Facts (TU 1.73)</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
                <li>
                  • Per-crate value rises with the size of a single sale—a full Large warehouse (111 crates) pays $20,000 per crate while a single crate pays $10,000.
                </li>
                <li>• Rare special items are not included.</li>
                <li>• High Demand and weekly bonuses are not included.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Full Warehouse Comparison Table */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Full-Warehouse Comparison ({sourcingMethod}-Crate Sourcing)</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs tabular-nums">
            <thead>
              <tr className="border-b border-indigo-950 text-slate-400 font-mono">
                <th className="py-2.5 pr-3">Warehouse</th>
                <th className="py-2.5 px-3">Per Crate</th>
                <th className="py-2.5 px-3">Gross</th>
                <th className="py-2.5 px-3">Sourcing Cost</th>
                <th className="py-2.5 px-3">Net Profit</th>
                <th className="py-2.5 pl-3">Trucks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-950/70">
              {comparison.map((row) => {
                const active = row.size === warehouseSize;
                return (
                  <tr
                    key={row.size}
                    onClick={() => handleWarehouseChange(row.size)}
                    className={`cursor-pointer transition-colors ${
                      active ? 'bg-emerald-500/10 text-white' : 'text-slate-300 hover:bg-[#0c122e]'
                    }`}
                  >
                    <td className="py-2.5 pr-3 font-semibold">{row.label}</td>
                    <td className="py-2.5 px-3 font-mono text-cyan-300">{formatUsd(row.perCrateValue)}</td>
                    <td className="py-2.5 px-3 font-mono">{formatUsd(row.gross)}</td>
                    <td className="py-2.5 px-3 font-mono text-amber-300">
                      −${row.sourcingCost.toLocaleString('en-US')}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-300">
                      {formatUsd(row.net)}
                    </td>
                    <td className="py-2.5 pl-3 font-mono">{row.deliveryTrucks}</td>
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
