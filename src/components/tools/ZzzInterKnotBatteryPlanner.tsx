/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Coffee, Battery, Calendar, Clock, Trophy
} from 'lucide-react';

const LEVEL_EXP_TABLE: Record<number, number> = {
  20: 3800,
  30: 12500,
  40: 36000,
  50: 88000,
  60: 195000,
};

export default function ZzzInterKnotBatteryPlanner() {
  const [currentLevel, setCurrentLevel] = useState<number>(38);
  const [targetLevel, setTargetLevel] = useState<number>(50);
  const [currentBattery, setCurrentBattery] = useState<number>(180);
  const [etherBatteriesHeld, setEtherBatteriesHeld] = useState<number>(8); // 60 charge each
  const [drinkDailyCoffee, setDrinkDailyCoffee] = useState<boolean>(true); // +60 charge/day
  const [targetActivity, setTargetActivity] = useState<'discs' | 'promotion' | 'exp' | 'dennies'>('discs');
  const [copied, setCopied] = useState<boolean>(false);

  // 1 Battery Charge consumed = 1 Inter-Knot EXP earned!
  // Daily Errands give +600 Inter-Knot EXP/day
  // Coffee gives +60 Battery Charge = +60 EXP
  // Natural Battery regen = 240 Charge = +240 EXP
  const calculations = useMemo(() => {
    const startExp = LEVEL_EXP_TABLE[currentLevel] || ((currentLevel / 60) * 195000);
    const endExp = LEVEL_EXP_TABLE[targetLevel] || ((targetLevel / 60) * 195000);
    const expNeeded = Math.max(0, Math.round(endExp - startExp));

    const dailyNaturalBattery = 240;
    const dailyCoffeeBattery = drinkDailyCoffee ? 60 : 0;
    const totalDailyBattery = dailyNaturalBattery + dailyCoffeeBattery;

    // Daily Inter-Knot EXP = 600 (Errands) + Daily Battery (300) = 900 EXP/day
    const dailyTotalExp = 600 + totalDailyBattery;

    const etherBatteryCharge = etherBatteriesHeld * 60;
    const netExpAfterConsumables = Math.max(0, expNeeded - etherBatteryCharge);

    const daysToTarget = Number((netExpAfterConsumables / dailyTotalExp).toFixed(1));
    const totalBatteryRequired = expNeeded;

    // Activity runs possible
    let costPerRun = 60; // Routine Cleanup = 60
    if (targetActivity === 'promotion') costPerRun = 40; // Expert Challenge
    if (targetActivity === 'exp' || targetActivity === 'dennies') costPerRun = 40; // Combat Simulation

    const totalRunsPossible = Math.floor((totalBatteryRequired + etherBatteryCharge) / costPerRun);

    return {
      expNeeded,
      totalDailyBattery,
      dailyTotalExp,
      etherBatteryCharge,
      daysToTarget,
      totalBatteryRequired,
      costPerRun,
      totalRunsPossible
    };
  }, [currentLevel, targetLevel, etherBatteriesHeld, drinkDailyCoffee, targetActivity]);

  const handleCopy = () => {
    const text = `ZZZ Inter-Knot & Battery Plan:
Current Level: ${currentLevel} ➔ Target Level: ${targetLevel}
Inter-Knot EXP Required: ${calculations.expNeeded.toLocaleString()} EXP
Daily Battery Income: ${calculations.totalDailyBattery} Battery Charge (with Coffee: ${drinkDailyCoffee ? 'YES' : 'NO'})
Daily Inter-Knot EXP: ${calculations.dailyTotalExp} EXP/day
Ether Batteries in Bag: ${etherBatteriesHeld} (${calculations.etherBatteryCharge} Charge)
Estimated Time: ~${calculations.daysToTarget} Days (${calculations.totalRunsPossible} ${targetActivity.toUpperCase()} runs)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 shadow-xl text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
              LEVEL 1 TO 60 PROGRESSION
            </span>
            <span className="text-xs text-slate-400">Coff Cafe & Battery Economy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Inter-Knot Level Rewards & Battery Charge Planner
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Plan Inter-Knot rank progression, optimize Coff Cafe daily bonuses, and calculate farming days for promotion milestones.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Timeline'}
        </button>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Level Span */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Inter-Knot Level Span
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Current Level</span>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                {[20, 25, 30, 35, 40, 45, 50, 55].map(l => (
                  <option key={l} value={l}>Lv {l}</option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Target Level</span>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-amber-300 font-bold"
              >
                {[30, 40, 45, 50, 55, 60].map(l => (
                  <option key={l} value={l}>Lv {l} {l === 50 ? '(Endgame)' : l === 60 ? '(Max)' : ''}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-[10px] text-slate-500">Level 50 unlocks maximum Routine Cleanup gold disc drops.</p>
        </div>

        {/* Energy & Consumables */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Battery Inventory
          </label>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Ether Batteries Held</span>
                <span className="font-bold text-cyan-300">{etherBatteriesHeld} (= {etherBatteriesHeld * 60} Charge)</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={etherBatteriesHeld}
                onChange={(e) => setEtherBatteriesHeld(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300 flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-amber-400" /> Coff Cafe (+60 Charge/day)
              </span>
              <input
                type="checkbox"
                checked={drinkDailyCoffee}
                onChange={(e) => setDrinkDailyCoffee(e.target.checked)}
                className="accent-amber-400 rounded w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Target Activity */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Primary Farming Focus
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'discs', label: 'Routine Cleanup (Discs)' },
              { id: 'promotion', label: 'Expert Challenge (Seals)' },
              { id: 'exp', label: 'Combat EXP Simulator' },
              { id: 'dennies', label: 'Dennie Minting' }
            ].map(act => (
              <button
                key={act.id}
                onClick={() => setTargetActivity(act.id as any)}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-all ${
                  targetActivity === act.id
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {act.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">Notorious Hunt (Weekly Boss) grants 3 free runs/week without battery.</p>
        </div>
      </div>

      {/* Output Results */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Inter-Knot EXP</span>
          <div className="text-3xl font-black text-white">
            {calculations.expNeeded.toLocaleString()} <span className="text-xs font-normal text-slate-400">EXP</span>
          </div>
          <p className="text-xs text-slate-400">
            = {calculations.totalBatteryRequired.toLocaleString()} Battery Charge equivalents
          </p>
        </div>

        <div className="space-y-1 text-center md:border-x border-slate-800 px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated Days</span>
          <div className="text-4xl font-black text-amber-300">
            {calculations.daysToTarget} <span className="text-base font-bold text-slate-300">Days</span>
          </div>
          <p className="text-xs text-slate-400">
            Earning {calculations.dailyTotalExp} EXP/day (Dailies + Battery + Coffee)
          </p>
        </div>

        <div className="space-y-1 text-right">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Activity Runs Yield</span>
          <div className="text-3xl font-black text-cyan-300">
            {calculations.totalRunsPossible} <span className="text-xs font-normal text-slate-400">Runs</span>
          </div>
          <p className="text-xs text-slate-400">
            At {calculations.costPerRun} Battery per run in {targetActivity.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
