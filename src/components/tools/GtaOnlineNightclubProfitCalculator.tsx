/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Building2, Clock, Check, AlertCircle, DollarSign, Users, RotateCcw } from 'lucide-react';
import {
  NIGHTCLUB_GOODS,
  NIGHTCLUB_MAX_TECHNICIANS,
  NIGHTCLUB_MAX_CRATES_ALL_TYPES,
  NIGHTCLUB_MAX_GROSS_ALL_TYPES,
  NIGHTCLUB_MAX_NET_ALL_TYPES,
  NIGHTCLUB_TOP_5_HOURLY_UPGRADED,
  DEFAULT_NIGHTCLUB_ASSIGNED_IDS,
  NightclubGoodsId,
  calculateNightclubProfit
} from '../../data/gtaOnlineData';

function formatDurationMinutes(totalMinutes: number): string {
  const hrs = Math.floor(totalMinutes / 60);
  const mins = Math.round(totalMinutes % 60);
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
}

export default function GtaOnlineNightclubProfitCalculator() {
  const [floors, setFloors] = useState<number>(5);
  const [equipmentUpgrade, setEquipmentUpgrade] = useState<boolean>(true);
  const [activeHoursInput, setActiveHoursInput] = useState<string>('10');
  const [assignedGoodsIds, setAssignedGoodsIds] = useState<NightclubGoodsId[]>(
    DEFAULT_NIGHTCLUB_ASSIGNED_IDS
  );

  const activeHours = useMemo(() => {
    const parsed = parseFloat(activeHoursInput);
    if (!Number.isFinite(parsed) || parsed < 0) return 0;
    return parsed;
  }, [activeHoursInput]);

  const result = useMemo(() => {
    return calculateNightclubProfit({
      floors,
      equipmentUpgrade,
      activeHours,
      assignedGoodsIds
    });
  }, [floors, equipmentUpgrade, activeHours, assignedGoodsIds]);

  const toggleGoods = (id: NightclubGoodsId) => {
    setAssignedGoodsIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= NIGHTCLUB_MAX_TECHNICIANS) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const resetDefaults = () => {
    setFloors(5);
    setEquipmentUpgrade(true);
    setActiveHoursInput('10');
    setAssignedGoodsIds(DEFAULT_NIGHTCLUB_ASSIGNED_IDS);
  };

  const atTechCap = assignedGoodsIds.length >= NIGHTCLUB_MAX_TECHNICIANS;

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>GTA Online • Title Update 1.73</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Nightclub Warehouse Profit Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate active-session crate accrual, Tony&apos;s capped cut, net payout, and time to fill across 1–5 warehouse floors.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDefaults}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Top-5 (10h)</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Floors & Equipment Upgrade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                1. Warehouse Floors (1–5)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFloors(f)}
                    className={`py-2.5 rounded-xl font-mono text-sm font-bold border transition-all cursor-pointer ${
                      floors === f
                        ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300 shadow-md'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-400 block">
                Storage multiplies each goods type&apos;s floor capacity by {floors}.
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                2. Equipment Upgrade
              </label>
              <button
                type="button"
                onClick={() => setEquipmentUpgrade((prev) => !prev)}
                className={`w-full px-4 py-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  equipmentUpgrade
                    ? 'bg-emerald-600/20 border-emerald-400 text-white'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">
                    {equipmentUpgrade ? 'Equipment Upgrade: ON' : 'Equipment Upgrade: OFF'}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {equipmentUpgrade ? '2× Production Speed' : 'Base Production Speed'}
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
                Equipment Upgrade doubles warehouse technician speed.
              </span>
            </div>
          </div>

          {/* 3. Active Session Time */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="nightclub-active-hours"
                className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>3. Active Session Time (Hours)</span>
              </label>
              <span className="text-[11px] font-mono text-cyan-300">
                {Math.round(result.activeMinutes).toLocaleString()} active min
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="nightclub-active-hours"
                type="number"
                min="0"
                step="any"
                value={activeHoursInput}
                onChange={(e) => setActiveHoursInput(e.target.value)}
                className="flex-1 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
              />
              <div className="flex flex-wrap gap-1.5">
                {[1, 5, 10, 20, 66.6667].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setActiveHoursInput(String(preset))}
                    className="px-2.5 py-2 rounded-xl bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 text-[11px] font-mono text-slate-300 hover:text-white cursor-pointer"
                  >
                    {preset === 66.6667 ? '66.7h (4000m)' : `${preset}h`}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Goods only produce while you are in an active GTA Online session. Decimals (e.g., 1.5 hours) are supported.
            </p>
          </div>

          {/* 4. Technician Assignment (Max 5 of 7) */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-violet-400" />
                <span>4. Assign Technicians (Max {NIGHTCLUB_MAX_TECHNICIANS})</span>
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                  atTechCap
                    ? 'bg-amber-500/15 border-amber-400/40 text-amber-300'
                    : 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
                }`}
              >
                {assignedGoodsIds.length} / {NIGHTCLUB_MAX_TECHNICIANS} Technicians Assigned
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              A type can only be assigned if you own its source business. Once 5 technicians are assigned, uncheck one to reassign.
            </p>

            <div className="space-y-2">
              {NIGHTCLUB_GOODS.map((item) => {
                const isChecked = assignedGoodsIds.includes(item.id);
                const isDisabled = !isChecked && atTechCap;
                const minsPerUnit = equipmentUpgrade ? item.minutesPerUnitUpgraded : item.minutesPerUnitBase;

                return (
                  <label
                    key={item.id}
                    className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-white cursor-pointer'
                        : isDisabled
                        ? 'bg-[#090d1e] border-indigo-950/60 text-slate-500 opacity-60 cursor-not-allowed'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => toggleGoods(item.id)}
                        className="w-4 h-4 rounded accent-emerald-500 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">{item.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">
                          Source: {item.sourceBusiness}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 font-mono">
                      <div className="text-xs font-bold text-emerald-400">
                        ${item.valuePerUnit.toLocaleString()}/unit
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {minsPerUnit}m/unit • Cap {item.capacityPerFloor * floors}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                Estimated Net Payout
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1.5">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 self-center shrink-0" />
                <span>{Math.round(result.netPayout).toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                After Tony&apos;s cut ({result.isTonysCutCapped ? 'Capped at $100,000' : '10% of gross'})
              </p>
            </div>

            {/* Key Summary Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Gross Value</span>
                <span className="text-white font-bold text-sm">
                  ${Math.round(result.grossValue).toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Tony&apos;s Cut</span>
                <span className="text-amber-300 font-bold text-sm">
                  -${Math.round(result.tonysCut).toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Crates Produced</span>
                <span className="text-cyan-300 font-bold text-sm">
                  {result.totalUnits} / {result.totalCapacity}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Net / Active Hour</span>
                <span className="text-emerald-400 font-bold text-sm">
                  ${Math.round(result.netPerHour).toLocaleString()}/hr
                </span>
              </div>
            </div>

            {/* Verified Benchmarks */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Title Update 1.73 Benchmarks</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
                <li>
                  • Top-5 upgraded assignment generates{' '}
                  <span className="text-emerald-300 font-mono font-bold">
                    ${NIGHTCLUB_TOP_5_HOURLY_UPGRADED.toLocaleString()}/hr
                  </span>{' '}
                  gross stock.
                </li>
                <li>
                  • All 7 types full across 5 floors ={' '}
                  <span className="text-white font-mono font-bold">
                    {NIGHTCLUB_MAX_CRATES_ALL_TYPES} crates
                  </span>{' '}
                  (${NIGHTCLUB_MAX_GROSS_ALL_TYPES.toLocaleString()} gross / $
                  {NIGHTCLUB_MAX_NET_ALL_TYPES.toLocaleString()} net).
                </li>
                <li>• Tony&apos;s cut is 10% capped at $100,000 ($1,000,000+ gross hits the cap).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Per-Goods Breakdown Table */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Per-Goods Production &amp; Fill Time Breakdown ({floors} {floors === 1 ? 'Floor' : 'Floors'})
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            {equipmentUpgrade ? 'Equipment Upgrade ON' : 'Base Speed'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-indigo-950 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-2.5 pr-3">Goods Type</th>
                <th className="py-2.5 px-3">Source Business</th>
                <th className="py-2.5 px-3 text-right">Units</th>
                <th className="py-2.5 px-3 text-right">Value</th>
                <th className="py-2.5 pl-3 text-right">Time to Full</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-950/60">
              {result.breakdown.map((row) => (
                <tr
                  key={row.item.id}
                  className={row.assigned ? 'text-slate-100' : 'text-slate-500'}
                >
                  <td className="py-2.5 pr-3 font-semibold">
                    <div className="flex items-center gap-2">
                      <span>{row.item.name}</span>
                      {row.isFull && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          FULL
                        </span>
                      )}
                      {!row.assigned && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          Idle
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-[11px]">{row.item.sourceBusiness}</td>
                  <td className="py-2.5 px-3 text-right font-mono">
                    {row.unitsProduced} / {row.maxCapacity}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">
                    ${row.value.toLocaleString()}
                  </td>
                  <td className="py-2.5 pl-3 text-right font-mono">
                    {formatDurationMinutes(row.minutesToFull)} ({row.minutesToFull.toLocaleString()}m)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
