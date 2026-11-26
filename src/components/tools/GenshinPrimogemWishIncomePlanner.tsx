/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Sparkles, Calendar, ShieldAlert, CheckCircle2, AlertTriangle, RotateCcw, Info, Coins, Compass } from 'lucide-react';
import {
  COMMISSIONS_PER_DAY,
  WELKIN_PER_DAY,
  calculateGenshinIncomePlan,
  GenshinIncomePlannerInput
} from '../../data/genshinIncomeData';

export default function GenshinPrimogemWishIncomePlanner() {
  const [currentPrimogems, setCurrentPrimogems] = useState<number>(0);
  const [currentFates, setCurrentFates] = useState<number>(0);
  const [days, setDays] = useState<number>(42);
  const [currentPity, setCurrentPity] = useState<number>(0);
  const [guaranteeOn, setGuaranteeOn] = useState<boolean>(false);
  const [commissionsOn, setCommissionsOn] = useState<boolean>(true);
  const [welkinOn, setWelkinOn] = useState<boolean>(false);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [extraFates, setExtraFates] = useState<number>(0);

  const handleReset = () => {
    setCurrentPrimogems(0);
    setCurrentFates(0);
    setDays(42);
    setCurrentPity(0);
    setGuaranteeOn(false);
    setCommissionsOn(true);
    setWelkinOn(false);
    setOtherIncome(0);
    setExtraFates(0);
  };

  const planInput: GenshinIncomePlannerInput = useMemo(
    () => ({
      currentPrimogems,
      currentFates,
      days,
      currentPity,
      guaranteeOn,
      commissionsOn,
      welkinOn,
      otherIncome,
      extraFates
    }),
    [
      currentPrimogems,
      currentFates,
      days,
      currentPity,
      guaranteeOn,
      commissionsOn,
      welkinOn,
      otherIncome,
      extraFates
    ]
  );

  const result = useMemo(() => calculateGenshinIncomePlan(planInput), [planInput]);

  return (
    <div className="space-y-6 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Character Event Banner Savings Planner • 100% Client-Side</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Genshin Impact Primogem &amp; Wish Income Planner
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Project total Primogems and Intertwined Fates by your target date from Daily Commissions and Welkin Moon, then evaluate guaranteed worst-case and expected average costs for your next featured 5★.
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

      {/* Scope Disclaimer Notice */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl px-4 py-3 flex items-center gap-2.5 text-xs text-slate-300">
        <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong className="text-white">Scope Note:</strong> Character Event banner only — the weapon banner&apos;s Epitomized Path is not modelled.
        </span>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Current Inventory & Time Window */}
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-indigo-900/40">
            <Coins className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Current Inventory &amp; Horizon
            </h3>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gi-curr-primos" className="text-xs font-medium text-slate-300 flex justify-between">
              <span>Current Primogems</span>
              <span className="text-[11px] font-mono text-slate-500">≥ 0</span>
            </label>
            <input
              id="gi-curr-primos"
              type="number"
              min={0}
              step={10}
              value={currentPrimogems === 0 ? '' : currentPrimogems}
              placeholder="0"
              onChange={(e) => setCurrentPrimogems(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gi-curr-fates" className="text-xs font-medium text-slate-300 flex justify-between">
              <span>Current Intertwined Fates</span>
              <span className="text-[11px] font-mono text-slate-500">≥ 0</span>
            </label>
            <input
              id="gi-curr-fates"
              type="number"
              min={0}
              step={1}
              value={currentFates === 0 ? '' : currentFates}
              placeholder="0"
              onChange={(e) => setCurrentFates(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-pink-300 font-bold focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gi-days" className="text-xs font-medium text-slate-300 flex justify-between">
              <span>Days Until Target</span>
              <span className="text-[11px] font-mono text-slate-400 font-bold">{days} days</span>
            </label>
            <input
              id="gi-days"
              type="number"
              min={0}
              max={365}
              value={days}
              onChange={(e) => setDays(Math.min(365, Math.max(0, parseInt(e.target.value, 10) || 0)))}
              className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
            />
            {/* Quick Presets */}
            <div className="flex gap-1.5 pt-1">
              {[
                { label: '21d (1 Phase)', value: 21 },
                { label: '42d (1 Patch)', value: 42 },
                { label: '84d (2 Patches)', value: 84 }
              ].map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setDays(preset.value)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono font-semibold border transition-all cursor-pointer ${
                    days === preset.value
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:text-white hover:border-indigo-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Banner Pity & Guarantee Status */}
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-indigo-900/40">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Banner Pity &amp; Guarantee
            </h3>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gi-current-pity" className="text-xs font-medium text-slate-300 flex justify-between">
              <span>Current Pity Count</span>
              <span className="text-[11px] font-mono text-violet-300 font-bold">{currentPity} / 89</span>
            </label>
            <input
              id="gi-current-pity"
              type="number"
              min={0}
              max={89}
              step={1}
              value={currentPity}
              onChange={(e) => setCurrentPity(Math.min(89, Math.max(0, parseInt(e.target.value, 10) || 0)))}
              className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-violet-200 font-bold focus:outline-none focus:border-cyan-400"
            />
            <p className="text-[11px] text-slate-500">
              Pulls made since your last 5★ character (soft pity begins at pull 74).
            </p>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-[#0c122e] border border-indigo-900/70 hover:border-violet-500/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={guaranteeOn}
                onChange={(e) => setGuaranteeOn(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-indigo-800 text-violet-600 focus:ring-violet-500 focus:ring-offset-0 bg-[#070b19] cursor-pointer"
              />
              <div className="text-xs">
                <span className="font-bold text-white block">
                  My next 5★ is guaranteed featured
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {guaranteeOn
                    ? 'Active: Need at most (90 − pity) pulls.'
                    : 'Off (50/50): Need at most (90 − pity) + 90 pulls if 50/50 is lost.'}
                </span>
              </div>
            </label>
          </div>

          <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-800/30 text-[11px] text-slate-300">
            <span className="font-semibold text-violet-300 block mb-0.5">Pity Carry-Over:</span>
            Pity count and 50/50 guarantee carry over between Character Event banners of the same type.
          </div>
        </div>

        {/* Card 3: Daily Income Sources & Extra Estimates */}
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 pb-2 border-b border-indigo-900/40">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Daily &amp; Extra Income
            </h3>
          </div>

          {/* Daily Commissions Toggle */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#0c122e] border border-indigo-900/70 hover:border-cyan-500/40 cursor-pointer transition-colors">
            <div className="text-xs">
              <span className="font-bold text-white block">Daily Commissions</span>
              <span className="text-[11px] font-mono text-cyan-300">
                +60 Primogems / day ({COMMISSIONS_PER_DAY * days} total)
              </span>
            </div>
            <input
              type="checkbox"
              checked={commissionsOn}
              onChange={(e) => setCommissionsOn(e.target.checked)}
              className="w-4 h-4 rounded border-indigo-800 text-cyan-600 focus:ring-cyan-500 bg-[#070b19] cursor-pointer"
            />
          </label>

          {/* Welkin Moon Toggle */}
          <div className="space-y-1">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#0c122e] border border-indigo-900/70 hover:border-cyan-500/40 cursor-pointer transition-colors">
              <div className="text-xs">
                <span className="font-bold text-white block">Blessing of the Welkin Moon</span>
                <span className="text-[11px] font-mono text-amber-300">
                  +90 Primogems / day ({WELKIN_PER_DAY * days} total)
                </span>
              </div>
              <input
                type="checkbox"
                checked={welkinOn}
                onChange={(e) => setWelkinOn(e.target.checked)}
                className="w-4 h-4 rounded border-indigo-800 text-amber-600 focus:ring-amber-500 bg-[#070b19] cursor-pointer"
              />
            </label>
            <p className="text-[10px] text-slate-400 leading-tight px-1">
              *Daily drip only (90/day). The one-time 300 Genesis Crystals on purchase are NOT counted. Assumes Welkin is active for every day in the window.
            </p>
          </div>

          {/* Other Income Estimate */}
          <div className="space-y-1.5 pt-1">
            <label htmlFor="gi-other-income" className="text-xs font-medium text-slate-300 block">
              Your estimate: Spiral Abyss, events &amp; other income (Primogems)
            </label>
            <input
              id="gi-other-income"
              type="number"
              min={0}
              step={60}
              value={otherIncome === 0 ? '' : otherIncome}
              placeholder="0 (enter your personal estimate)"
              onChange={(e) => setOtherIncome(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono tabular-nums text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Extra Fates Estimate */}
          <div className="space-y-1.5">
            <label htmlFor="gi-extra-fates" className="text-xs font-medium text-slate-300 block">
              Extra Intertwined Fates you expect (shop, Battle Pass, etc.)
            </label>
            <input
              id="gi-extra-fates"
              type="number"
              min={0}
              step={1}
              value={extraFates === 0 ? '' : extraFates}
              placeholder="0 (shop monthly reset, BP, etc.)"
              onChange={(e) => setExtraFates(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono tabular-nums text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Projection Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-cyan-950/60 via-[#070b19] to-indigo-950/80 border border-cyan-500/40 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Projected Primogems
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-white mt-1">
            {result.projectedPrimogems.toLocaleString('en-US')}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            in {days} days • {result.fatesFromPrimos} pulls from primos
          </span>
        </div>

        <div className="bg-[#070b19] border border-pink-500/40 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-pink-400 font-bold block">
            Total Pulls Affordable
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-pink-300 mt-1">
            {result.totalPulls} pulls
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            {result.totalFatesDirect} direct Fates + {result.fatesFromPrimos} from Primos
          </span>
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
            Leftover Primogems
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-amber-300 mt-1">
            {result.leftoverPrimogems} primos
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            remaining after pull conversion (mod 160)
          </span>
        </div>
      </div>

      {/* Worst Case vs Average Case Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Worst Case Block */}
        <div
          className={`rounded-2xl p-6 border transition-all ${
            result.isGuaranteedCovered
              ? 'bg-gradient-to-br from-emerald-950/50 via-[#070b19] to-indigo-950/60 border-emerald-500/50'
              : 'bg-gradient-to-br from-amber-950/40 via-[#070b19] to-rose-950/40 border-amber-500/40'
          }`}
        >
          <div className="flex items-start justify-between gap-3 border-b border-indigo-950/80 pb-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert
                  className={`w-4 h-4 ${
                    result.isGuaranteedCovered ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Worst-Case Guarantee Analysis
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pulls needed to 100% guarantee the featured 5★ character (hitting 90 hard pity on every 5★).
              </p>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0 ${
                result.isGuaranteedCovered
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {result.isGuaranteedCovered ? 'COVERED (YES)' : 'SHORTFALL (NO)'}
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-indigo-950/60">
              <span className="text-slate-400">Pulls Needed to Guarantee:</span>
              <span className="font-mono font-bold text-white text-sm">
                {result.worstCasePullsNeeded} pulls ({result.worstCasePrimogemsNeeded.toLocaleString('en-US')} primos)
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-indigo-950/60">
              <span className="text-slate-400">Affordable by Target Date:</span>
              <span className="font-mono font-bold text-pink-300 text-sm">
                {result.totalPulls} pulls
              </span>
            </div>

            {result.shortfallPulls > 0 ? (
              <>
                <div className="flex justify-between items-center py-1.5 border-b border-indigo-950/60 text-rose-300 font-bold">
                  <span>Shortfall to 100% Guarantee:</span>
                  <span className="font-mono text-sm">
                    {result.shortfallPulls} pulls ({result.shortfallPrimogems.toLocaleString('en-US')} primos)
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">Extra Days Needed at Daily Rate:</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">
                    {result.extraDaysNeeded !== null ? `${result.extraDaysNeeded} days` : '—'}
                  </span>
                </div>

                {result.dailyRate === 0 && (
                  <p className="text-[11px] text-amber-300/90 font-mono mt-1">
                    *Turn on Commissions or Welkin to project a date
                  </p>
                )}
              </>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 flex items-center gap-2.5 mt-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Your projected savings cover the absolute 100% worst-case hard pity guarantee with{' '}
                  <strong className="text-white font-mono">
                    {result.totalPulls - result.worstCasePullsNeeded} extra pull(s)
                  </strong>{' '}
                  to spare!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Average Case Block */}
        <div className="bg-gradient-to-br from-violet-950/40 via-[#070b19] to-cyan-950/40 border border-violet-500/40 rounded-2xl p-6">
          <div className="border-b border-indigo-950/80 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Average Case (Statistical Expectation)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Calculated via the published soft pity rate curve (0.6% base, +6% per pull on pulls 74–89, hard pity 90).
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0c122e] border border-indigo-900/70 rounded-xl p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-bold block">
                Expected Pulls to Featured 5★
              </span>
              <div className="text-3xl font-black font-mono tabular-nums text-white mt-1">
                {result.expectedPullsToFeatured.toFixed(1)} pulls
              </div>
              <span className="text-xs text-slate-400 font-mono mt-1 block">
                ≈ {result.expectedPrimogemsToFeatured.toLocaleString('en-US')} Primogems equivalent
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2 bg-[#070b19] border border-indigo-950 p-3 rounded-xl">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white">Note on Averages:</strong> The average case (≈93.5 pulls from zero pity with no guarantee) represents what typically happens across thousands of players. It is{' '}
                  <strong className="text-amber-300">an average, not a guarantee</strong>. If the character is a must-have, always budget against the worst case.
                </p>
              </div>

              <div className="flex justify-between items-center px-1 text-[11px] text-slate-400 font-mono">
                <span>Expected pulls per 5★: 62.3 pulls</span>
                <span>Featured multiplier: {guaranteeOn ? '1.0× (Guaranteed)' : '1.5× (50/50)'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Days to Guarantee Reference Table */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-3 text-xs">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Days-to-Guarantee Reference (From 0 Pity, No Guarantee, 28,800 Primogems)</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
          <div className="bg-[#0c122e] border border-indigo-900/60 rounded-xl p-3">
            <span className="text-[11px] font-bold text-white block">Commissions Alone (60/day)</span>
            <span className="text-base font-black font-mono text-cyan-300 mt-1 block">480 days</span>
            <span className="text-[10px] text-slate-400 font-mono block">28,800 ÷ 60 = 480 days</span>
          </div>
          <div className="bg-[#0c122e] border border-indigo-900/60 rounded-xl p-3">
            <span className="text-[11px] font-bold text-white block">Commissions + Welkin Moon (150/day)</span>
            <span className="text-base font-black font-mono text-emerald-300 mt-1 block">192 days</span>
            <span className="text-[10px] text-slate-400 font-mono block">28,800 ÷ 150 = 192 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
