/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Car, DollarSign, Info, RotateCcw, AlertTriangle, Layers } from 'lucide-react';
import {
  VEHICLE_CARGO_CONFIG,
  VEHICLE_CARGO_RANGES,
  VEHICLE_CARGO_COLLECTIONS,
  VEHICLE_CARGO_COLLECTION_BONUSES,
  VehicleCargoRangeId,
  VehicleCargoSaleMode,
  VehicleCargoCollectionSize,
  calculateVehicleCargoProfit
} from '../../data/gtaOnlineData';

function formatUsd(value: number): string {
  const abs = Math.abs(Math.round(value)).toLocaleString('en-US');
  return value < 0 ? `−$${abs}` : `$${abs}`;
}

export default function GtaOnlineVehicleCargoCalculator() {
  const [standardCount, setStandardCount] = useState<number>(0);
  const [midCount, setMidCount] = useState<number>(0);
  const [topCount, setTopCount] = useState<number>(1);
  const [saleMode, setSaleMode] = useState<VehicleCargoSaleMode>('specialist');
  const [collectionSize, setCollectionSize] = useState<VehicleCargoCollectionSize>(4);
  const [capWarning, setCapWarning] = useState<string | null>(null);

  const updateRangeCount = (rangeId: VehicleCargoRangeId, rawVal: number) => {
    const clean = Math.max(0, Math.round(Number.isFinite(rawVal) ? rawVal : 0));
    const otherTotal =
      rangeId === 'standard'
        ? midCount + topCount
        : rangeId === 'mid'
        ? standardCount + topCount
        : standardCount + midCount;
    const maxAllowed = Math.max(0, VEHICLE_CARGO_CONFIG.warehouseCapacityCars - otherTotal);

    if (clean > maxAllowed) {
      setCapWarning(
        `Vehicle warehouse capacity is ${VEHICLE_CARGO_CONFIG.warehouseCapacityCars} cars total. Clamped to ${maxAllowed} car${maxAllowed === 1 ? '' : 's'}.`
      );
    } else {
      setCapWarning(null);
    }

    const clamped = Math.min(maxAllowed, clean);
    if (rangeId === 'standard') setStandardCount(clamped);
    if (rangeId === 'mid') setMidCount(clamped);
    if (rangeId === 'top') setTopCount(clamped);
  };

  const applyPreset = (
    std: number,
    mid: number,
    top: number,
    mode: VehicleCargoSaleMode,
    colSize: VehicleCargoCollectionSize = 4
  ) => {
    setCapWarning(null);
    setStandardCount(std);
    setMidCount(mid);
    setTopCount(top);
    setSaleMode(mode);
    setCollectionSize(colSize);
  };

  const result = useMemo(
    () =>
      calculateVehicleCargoProfit({
        standardCount,
        midCount,
        topCount,
        saleMode,
        collectionSize
      }),
    [standardCount, midCount, topCount, saleMode, collectionSize]
  );

  const countById: Record<VehicleCargoRangeId, number> = {
    standard: standardCount,
    mid: midCount,
    top: topCount
  };

  const modeLabels: Record<VehicleCargoSaleMode, string> = {
    private: 'Private Buyer',
    showroom: 'Showroom',
    specialist: 'Specialist Dealer',
    collection: `Collection (${collectionSize}-Car)`
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Car className="w-3.5 h-3.5" />
            <span>GTA Online • Title Update 1.73 Base Values</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Vehicle Cargo (Import/Export) Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate Import/Export payouts across Standard, Mid, and Top Range vehicles for Private, Showroom, Specialist Dealer, or Collection sales.
          </p>
        </div>
        <button
          type="button"
          onClick={() => applyPreset(0, 0, 1, 'specialist')}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset (1 Top Specialist)</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-1">Presets:</span>
        {[
          { label: '1 Top (Specialist)', std: 0, mid: 0, top: 1, mode: 'specialist' as const, col: 4 as const },
          { label: '1 Top (Showroom)', std: 0, mid: 0, top: 1, mode: 'showroom' as const, col: 4 as const },
          { label: '1 Standard (Private)', std: 1, mid: 0, top: 0, mode: 'private' as const, col: 4 as const },
          { label: '2 Top + 1 Mid + 1 Std (Specialist)', std: 1, mid: 1, top: 2, mode: 'specialist' as const, col: 4 as const },
          { label: '4 Top (4-Car Collection)', std: 0, mid: 0, top: 4, mode: 'collection' as const, col: 4 as const }
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p.std, p.mid, p.top, p.mode, p.col)}
            className="px-3 py-1.5 rounded-lg bg-[#070b19] border border-indigo-900/70 hover:border-emerald-500/60 text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Sale Mode Selector */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <label className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider block">
              Sale Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['private', 'showroom', 'specialist', 'collection'] as VehicleCargoSaleMode[]).map((mode) => {
                const active = saleMode === mode;
                const label =
                  mode === 'private'
                    ? 'Private'
                    : mode === 'showroom'
                    ? 'Showroom'
                    : mode === 'specialist'
                    ? 'Specialist Dealer'
                    : 'Collection';
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSaleMode(mode)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-emerald-500/15 border-emerald-500 text-white'
                        : 'bg-[#0c122e] border-indigo-900/70 text-slate-300 hover:border-indigo-700'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {saleMode === 'collection' && (
              <div className="pt-3 border-t border-indigo-950/80 space-y-2">
                <label className="text-[11px] font-mono font-bold uppercase text-cyan-300 tracking-wider block">
                  Collection Size (Bonus Added Once)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([2, 3, 4] as VehicleCargoCollectionSize[]).map((size) => {
                    const active = collectionSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setCollectionSize(size)}
                        className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                          active
                            ? 'bg-cyan-500/15 border-cyan-400 text-white font-bold'
                            : 'bg-[#0c122e] border-indigo-900/70 text-slate-300 hover:border-indigo-700'
                        }`}
                      >
                        {size} Cars (+{formatUsd(VEHICLE_CARGO_COLLECTION_BONUSES[size])})
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Combined Warehouse Counter */}
          <div className="flex items-center justify-between bg-[#070b19] border border-indigo-950 rounded-xl px-4 py-3 text-xs font-mono">
            <span className="text-slate-300">Vehicle Warehouse Stock</span>
            <span
              className={`font-bold tabular-nums ${
                result.totalCars >= VEHICLE_CARGO_CONFIG.warehouseCapacityCars
                  ? 'text-amber-300'
                  : 'text-emerald-400'
              }`}
            >
              {result.totalCars} / {VEHICLE_CARGO_CONFIG.warehouseCapacityCars} cars
            </span>
          </div>

          {capWarning && (
            <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{capWarning}</span>
            </div>
          )}

          {/* Per-Range Car Inputs */}
          {VEHICLE_CARGO_RANGES.map((r) => {
            const count = countById[r.id];
            const otherSum = result.totalCars - count;
            const maxForRange = Math.max(0, VEHICLE_CARGO_CONFIG.warehouseCapacityCars - otherSum);
            return (
              <div
                key={r.id}
                className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <label
                      htmlFor={`vc-${r.id}`}
                      className="text-xs font-mono font-bold uppercase text-white tracking-wider block"
                    >
                      {r.label} Cars
                    </label>
                    <p className="text-xs text-cyan-300 mt-1 font-mono tabular-nums">
                      Private: {formatUsd(r.privateNet)} · Showroom Net: {formatUsd(r.showroomGross - r.showroomModCost)} · Specialist Net: {formatUsd(r.specialistGross - r.specialistModCost)}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                    {count} car{count === 1 ? '' : 's'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <input
                    id={`vc-${r.id}`}
                    type="number"
                    min={0}
                    max={VEHICLE_CARGO_CONFIG.warehouseCapacityCars}
                    step={1}
                    value={count}
                    onChange={(e) => updateRangeCount(r.id, parseInt(e.target.value, 10))}
                    className="w-full sm:w-28 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="range"
                    min={0}
                    max={maxForRange}
                    step={1}
                    value={count}
                    onChange={(e) => updateRangeCount(r.id, parseInt(e.target.value, 10))}
                    className="flex-1 accent-emerald-500 cursor-pointer"
                    aria-label={`${r.label} car count slider`}
                  />
                  <span className="text-[11px] font-mono text-slate-400 tabular-nums whitespace-nowrap">
                    Max left: {maxForRange}
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
                Estimated Total Net ({modeLabels[saleMode]})
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1.5 font-mono tabular-nums">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 self-center shrink-0" />
                <span>{result.totalNet.toLocaleString('en-US')}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tabular-nums">
                {result.totalCars} vehicle{result.totalCars === 1 ? '' : 's'} · Sourcing cost $0 (stolen)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono tabular-nums">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Total Gross</span>
                <span className="text-white font-bold text-sm">{formatUsd(result.totalGross)}</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Modification Costs</span>
                <span className="text-amber-300 font-bold text-sm">
                  {result.totalModCosts > 0 ? `−${formatUsd(result.totalModCosts)}` : '$0'}
                </span>
              </div>
              {saleMode === 'collection' && (
                <div className="col-span-2 bg-cyan-950/30 border border-cyan-500/40 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-cyan-300 text-[11px] uppercase font-bold">
                    Collection Bonus ({collectionSize}-Car Set)
                  </span>
                  <span className="text-cyan-200 font-bold text-sm">
                    +{formatUsd(result.collectionBonus)}
                  </span>
                </div>
              )}
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Sourcing Cost</span>
                <span className="text-emerald-400 font-bold text-sm">$0</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Total Net</span>
                <span className="text-emerald-300 font-bold text-sm">{formatUsd(result.totalNet)}</span>
              </div>
            </div>

            {/* Per-Range Table */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2.5 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                Per-Range Payout Breakdown
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left tabular-nums">
                  <thead>
                    <tr className="border-b border-indigo-950 text-slate-400 font-mono text-[11px]">
                      <th className="py-1.5 pr-2">Range</th>
                      <th className="py-1.5 px-2">Count</th>
                      <th className="py-1.5 px-2">Gross</th>
                      <th className="py-1.5 px-2">Mod Cost</th>
                      <th className="py-1.5 pl-2">Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-950/60 font-mono text-[11px]">
                    {result.ranges.map((row) => (
                      <tr key={row.range.id}>
                        <td className="py-2 pr-2 font-semibold text-white">
                          {row.range.id === 'standard'
                            ? 'Standard'
                            : row.range.id === 'mid'
                            ? 'Mid'
                            : 'Top'}
                        </td>
                        <td className="py-2 px-2 text-slate-200">{row.count}</td>
                        <td className="py-2 px-2 text-slate-200">{formatUsd(row.gross)}</td>
                        <td className="py-2 px-2 text-amber-300">{formatUsd(row.modCost)}</td>
                        <td className="py-2 pl-2 font-bold text-emerald-300">{formatUsd(row.net)}</td>
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
                <span>Vehicle Cargo Base Facts (TU 1.73)</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
                <li>• Vehicle warehouse holds up to 40 cars; sourcing cost is always $0 (cars are stolen).</li>
                <li>• Collections pay Specialist net value with $0 modification costs plus the set bonus.</li>
                <li>• Prices assume cars are delivered undamaged (repair costs are not included).</li>
                <li>• High Demand and weekly bonuses are not included.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* All 10 Collections Table */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-950 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              All 10 Import/Export Vehicle Collections
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            2 Cars: $20,000 · 3 Cars: $35,000 · 4 Cars: $50,000
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {VEHICLE_CARGO_COLLECTIONS.map((col) => (
            <button
              key={col.name}
              type="button"
              onClick={() => {
                setSaleMode('collection');
                setCollectionSize(col.cars);
              }}
              className="text-left bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-cyan-500/60 rounded-xl p-3 transition-all cursor-pointer"
            >
              <div className="text-xs font-bold text-white truncate">{col.name}</div>
              <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center justify-between">
                <span>{col.cars} cars</span>
                <span className="text-emerald-400 font-bold">+{formatUsd(col.bonus)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
