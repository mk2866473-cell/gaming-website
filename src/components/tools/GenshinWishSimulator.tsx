/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useTransition } from 'react';
import {
  Dices,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  Compass,
  AlertCircle,
  Table
} from 'lucide-react';
import {
  BANNER_SCOPE_NOTE,
  CAPTURING_RADIANCE_NOTE,
  PRIMOS_PER_WISH,
  runWishSimulation,
  SimulationResult
} from '../../data/genshinWishSimData';

export default function GenshinWishSimulator() {
  const [startingPity, setStartingPity] = useState<number>(0);
  const [guaranteeOn, setGuaranteeOn] = useState<boolean>(false);
  const [budget, setBudget] = useState<number>(90);
  const [numRuns, setNumRuns] = useState<number>(10000);
  const [isPending, startTransition] = useTransition();

  // Initial simulation run
  const [result, setResult] = useState<SimulationResult>(() =>
    runWishSimulation({
      startingPity: 0,
      guaranteeOn: false,
      budget: 90,
      numRuns: 10000
    })
  );

  const handleRunSimulation = () => {
    startTransition(() => {
      const res = runWishSimulation({
        startingPity,
        guaranteeOn,
        budget,
        numRuns
      });
      setResult(res);
    });
  };

  const handleReset = () => {
    setStartingPity(0);
    setGuaranteeOn(false);
    setBudget(90);
    setNumRuns(10000);
    startTransition(() => {
      setResult(
        runWishSimulation({
          startingPity: 0,
          guaranteeOn: false,
          budget: 90,
          numRuns: 10000
        })
      );
    });
  };

  return (
    <div className="space-y-6 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-bold mb-2">
            <Dices className="w-3.5 h-3.5 text-violet-400" />
            <span>Monte Carlo Gacha Simulator • 100% Client-Side</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Genshin Impact Wish Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Simulate thousands of Character Event banner sessions using the verified soft pity curve and 50/50 rules to measure real statistical odds within your pull budget.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-200 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Mandatory Scope & Capturing Radiance Notes */}
      <div className="space-y-2">
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl px-4 py-3 flex items-center gap-2.5 text-xs text-slate-300">
          <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-white">Banner Scope:</strong> {BANNER_SCOPE_NOTE}
          </span>
        </div>
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl px-4 py-3 flex items-center gap-2.5 text-xs text-slate-400">
          <Info className="w-4 h-4 text-violet-400 shrink-0" />
          <span>{CAPTURING_RADIANCE_NOTE}</span>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Starting Pity */}
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-2">
          <label htmlFor="sim-starting-pity" className="text-xs font-medium text-slate-300 flex justify-between">
            <span>Starting Pity</span>
            <span className="text-[11px] font-mono text-violet-300 font-bold">{startingPity} / 89</span>
          </label>
          <input
            id="sim-starting-pity"
            type="number"
            min={0}
            max={89}
            value={startingPity}
            onChange={(e) => setStartingPity(Math.min(89, Math.max(0, parseInt(e.target.value, 10) || 0)))}
            className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-white font-bold focus:outline-none focus:border-violet-500"
          />
          <span className="text-[10px] text-slate-500 block">Pulls made toward next 5★</span>
        </div>

        {/* Pull Budget */}
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-2">
          <label htmlFor="sim-budget" className="text-xs font-medium text-slate-300 flex justify-between">
            <span>Pull Budget</span>
            <span className="text-[11px] font-mono text-cyan-300 font-bold">
              {(budget * PRIMOS_PER_WISH).toLocaleString()} primos
            </span>
          </label>
          <input
            id="sim-budget"
            type="number"
            min={10}
            max={180}
            value={budget}
            onChange={(e) => setBudget(Math.min(180, Math.max(10, parseInt(e.target.value, 10) || 90)))}
            className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
          />
          <div className="flex gap-1 pt-0.5">
            {[45, 90, 140, 180].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                  budget === b
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:text-white'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Runs */}
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-2">
          <label htmlFor="sim-runs" className="text-xs font-medium text-slate-300 block">
            Number of Runs
          </label>
          <select
            id="sim-runs"
            value={numRuns}
            onChange={(e) => setNumRuns(parseInt(e.target.value, 10) || 10000)}
            className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono text-white font-bold focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value={1000}>1,000 runs (Fast)</option>
            <option value={10000}>10,000 runs (Recommended)</option>
            <option value={50000}>50,000 runs (High Precision)</option>
          </select>
          <span className="text-[10px] text-slate-500 block">Higher counts reduce variance</span>
        </div>

        {/* Guarantee Toggle & Run Button */}
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 flex flex-col justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={guaranteeOn}
              onChange={(e) => setGuaranteeOn(e.target.checked)}
              className="w-4 h-4 rounded border-indigo-800 text-violet-600 focus:ring-violet-500 bg-[#0c122e] cursor-pointer"
            />
            <span className="text-xs font-bold text-white leading-tight">
              Next 5★ is guaranteed featured
            </span>
          </label>

          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={isPending}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-xl shadow-lg shadow-violet-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isPending ? 'Simulating...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Results Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Featured Success % */}
        <div className="bg-gradient-to-br from-violet-950/60 via-[#070b19] to-indigo-950/80 border border-violet-500/40 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-violet-300 font-bold block">
            Featured 5★ Success Rate
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-emerald-300 mt-1">
            {result.featuredSuccessPct.toFixed(1)}%
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            in {result.budget} pulls ({result.budgetPrimogems.toLocaleString()} primos)
          </span>
        </div>

        {/* Any 5★ Success % */}
        <div className="bg-[#070b19] border border-cyan-500/40 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Any 5★ Success Rate
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-cyan-300 mt-1">
            {result.any5StarSuccessPct.toFixed(1)}%
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            pulled at least one 5★ within budget
          </span>
        </div>

        {/* Avg Pulls to First 5★ */}
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Avg Pulls to First 5★
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-white mt-1">
            {result.avgPullsToFirst5Star.toFixed(1)}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            across all runs* (≈ {Math.round(result.avgPullsToFirst5Star * PRIMOS_PER_WISH).toLocaleString()} primos)
          </span>
        </div>

        {/* Avg Pulls to Featured */}
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
            Avg Pulls to Featured
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-amber-300 mt-1">
            {result.avgPullsToFeatured !== null ? result.avgPullsToFeatured.toFixed(1) : '—'}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            {result.avgPrimosToFeatured !== null
              ? `≈ ${result.avgPrimosToFeatured.toLocaleString()} primos (successful runs)`
              : 'no successful runs in budget'}
          </span>
        </div>
      </div>

      {result.runsNeverGot5StarCount > 0 && (
        <p className="text-[11px] text-slate-500 font-mono italic">
          *Footnote: In {result.runsNeverGot5StarCount.toLocaleString()} run(s) where no 5★ was obtained within budget, the full budget ({result.budget} pulls) is counted toward the average pulls to first 5★.
        </p>
      )}

      {/* Cumulative Probability Distribution Table */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-950/80 pb-3">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Cumulative Featured 5★ Probability by Pull Milestone
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {result.numRuns.toLocaleString()} Monte Carlo runs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono tabular-nums">
            <thead>
              <tr className="border-b border-indigo-950 text-slate-400">
                <th className="py-2.5 pr-4">Pull Milestone</th>
                <th className="py-2.5 px-4">Primogem Cost</th>
                <th className="py-2.5 px-4 text-cyan-300">Success Rate (% Featured)</th>
                <th className="py-2.5 pl-4">Relative Visual Probability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-950/60">
              {result.milestones.map((m) => (
                <tr key={m.pulls} className="hover:bg-indigo-950/20 transition-colors">
                  <td className="py-3 pr-4 font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-violet-400" />
                    <span>Within {m.pulls} pulls</span>
                    {m.pulls === 74 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-sans">
                        Soft Pity Starts
                      </span>
                    )}
                    {m.pulls === 90 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-sans">
                        First Hard Pity
                      </span>
                    )}
                    {m.pulls === 180 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-sans">
                        Guaranteed Max
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {m.primosEquivalent.toLocaleString()} primos
                  </td>
                  <td className="py-3 px-4 font-black text-emerald-300 text-sm">
                    {m.featuredSuccessPct.toFixed(1)}%
                  </td>
                  <td className="py-3 pl-4">
                    <div className="w-full max-w-xs bg-[#0c122e] h-2.5 rounded-full overflow-hidden border border-indigo-900/50">
                      <div
                        className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, m.featuredSuccessPct))}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mechanics & Variance Guide */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-2 text-xs">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-violet-400" />
          <span>Understanding Monte Carlo Simulation vs Guaranteed Outcomes</span>
        </span>
        <ul className="space-y-1.5 text-slate-300 leading-relaxed">
          <li>
            • <strong className="text-white">Simulated Samples:</strong> Results are generated from random Monte Carlo trials. Smaller batches (1,000 runs) wobble slightly around true values; larger batches (10,000 or 50,000 runs) land closest to mathematical expectancy.
          </li>
          <li>
            • <strong className="text-white">Simulator vs Odds Calculator:</strong> A simulator demonstrates how luck distributes across thousands of players. It does not predict or alter your personal in-game outcome, and past pulls do not affect future rates beyond advancing your pity counter.
          </li>
          <li>
            • <strong className="text-white">Soft Pity Surge:</strong> Starting at pull 74, single-pull probability surges by +6% per pull (6.6% at 74, 12.6% at 75, 42.6% at 80), meaning over 90% of all 5★ drops arrive between pulls 74 and 82.
          </li>
        </ul>
      </div>
    </div>
  );
}
