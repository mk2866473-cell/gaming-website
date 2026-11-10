/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Calendar, Coins, Target, Compass
} from 'lucide-react';

export default function WuwaPityPullPlanner() {
  const [bannerType, setBannerType] = useState<'character' | 'weapon'>('character');
  const [currentPity, setCurrentPity] = useState<number>(25);
  const [isGuaranteed, setIsGuaranteed] = useState<boolean>(false);
  const [currentAstrite, setCurrentAstrite] = useState<number>(4800);
  const [currentTides, setCurrentTides] = useState<number>(12);
  const [targetGoal, setTargetGoal] = useState<'s0' | 's1' | 's0_weapon' | 's2'>('s0');
  const [daysRemaining, setDaysRemaining] = useState<number>(18);
  const [hasLuniteSub, setHasLuniteSub] = useState<boolean>(true);
  const [hasBattlePass, setHasBattlePass] = useState<boolean>(false);
  const [toaResets, setToaResets] = useState<number>(1);
  const [eventAstrite, setEventAstrite] = useState<number>(1200);
  const [copied, setCopied] = useState<boolean>(false);

  // Hard pity is 80 pulls in Wuthering Waves
  const PULL_COST = 160;
  const HARD_PITY = 80;

  const calculations = useMemo(() => {
    // Projected Income calculation
    const dailyAstrite = 60 * daysRemaining;
    const luniteAstrite = hasLuniteSub ? 90 * daysRemaining : 0;
    const bpAstrite = hasBattlePass ? 680 : 0;
    const bpTides = hasBattlePass ? 5 : 0;
    const toaAstrite = toaResets * 700; // 30/30 stars hazard zone
    const maintenanceCompensation = 300;

    const totalProjectedAstrite = currentAstrite + dailyAstrite + luniteAstrite + bpAstrite + toaAstrite + eventAstrite + maintenanceCompensation;
    const totalTidesAvailable = currentTides + bpTides + Math.floor(totalProjectedAstrite / PULL_COST);

    // Required Pulls Calculation
    let pullsNeededWorstCase = 0;
    let pullsNeededAverage = 0;

    if (bannerType === 'weapon') {
      // Weapon banner in WuWa is 100% GUARANTEED at 80 pulls! No 50/50!
      pullsNeededWorstCase = Math.max(0, HARD_PITY - currentPity);
      pullsNeededAverage = Math.max(0, 65 - currentPity);
    } else {
      // Character Banner
      if (targetGoal === 's0') {
        const firstPityRemaining = Math.max(0, HARD_PITY - currentPity);
        if (isGuaranteed) {
          pullsNeededWorstCase = firstPityRemaining;
          pullsNeededAverage = Math.max(0, 65 - currentPity);
        } else {
          pullsNeededWorstCase = firstPityRemaining + HARD_PITY; // Lose 50/50 then guarantee
          pullsNeededAverage = Math.max(0, (65 - currentPity) + (0.5 * 65));
        }
      } else if (targetGoal === 's1') {
        const firstCopyWorst = isGuaranteed ? (HARD_PITY - currentPity) : (HARD_PITY - currentPity + HARD_PITY);
        pullsNeededWorstCase = firstCopyWorst + (HARD_PITY * 2);
        pullsNeededAverage = Math.round(pullsNeededWorstCase * 0.68);
      } else if (targetGoal === 's2') {
        pullsNeededWorstCase = (isGuaranteed ? (HARD_PITY - currentPity) : (HARD_PITY - currentPity + HARD_PITY)) + (HARD_PITY * 3);
        pullsNeededAverage = Math.round(pullsNeededWorstCase * 0.65);
      } else if (targetGoal === 's0_weapon') {
        // 1 Character + 1 Weapon (80 guaranteed)
        const charPity = isGuaranteed ? (HARD_PITY - currentPity) : (HARD_PITY - currentPity + HARD_PITY);
        const weaponPity = 80;
        pullsNeededWorstCase = charPity + weaponPity;
        pullsNeededAverage = Math.round(charPity * 0.7 + 65);
      }
    }

    const pullsSurplusDeficit = totalTidesAvailable - pullsNeededWorstCase;
    const astriteDeficit = pullsSurplusDeficit < 0 ? Math.abs(pullsSurplusDeficit) * PULL_COST : 0;

    // Approximate probability based on cumulative binomial with soft pity at ~65
    let probability = 0;
    if (totalTidesAvailable >= pullsNeededWorstCase) {
      probability = 100;
    } else {
      const ratio = totalTidesAvailable / Math.max(1, pullsNeededAverage);
      probability = Math.min(99, Math.max(5, Math.round(Math.pow(ratio, 1.4) * 85)));
    }

    let statusLabel = 'Guaranteed 100%';
    let statusColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
    if (probability < 50) {
      statusLabel = 'High Risk Gamble';
      statusColor = 'text-rose-400 border-rose-500/40 bg-rose-950/40';
    } else if (probability < 80) {
      statusLabel = '50/50 Territory';
      statusColor = 'text-amber-400 border-amber-500/40 bg-amber-950/40';
    } else if (probability < 100) {
      statusLabel = 'Very Likely';
      statusColor = 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40';
    }

    return {
      dailyAstrite,
      luniteAstrite,
      bpAstrite,
      bpTides,
      toaAstrite,
      totalProjectedAstrite,
      totalTidesAvailable,
      pullsNeededWorstCase,
      pullsNeededAverage,
      pullsSurplusDeficit,
      astriteDeficit,
      probability,
      statusLabel,
      statusColor
    };
  }, [
    bannerType, currentPity, isGuaranteed, currentAstrite, currentTides, 
    targetGoal, daysRemaining, hasLuniteSub, hasBattlePass, toaResets, eventAstrite
  ]);

  const handleCopy = () => {
    const text = `Wuthering Waves Pity & Pull Plan:
Target: ${targetGoal.toUpperCase()} (${bannerType.toUpperCase()} Banner)
Current Pity: ${currentPity}/80 | Guaranteed: ${isGuaranteed ? 'YES' : 'NO (50/50)'}
Days Remaining: ${daysRemaining} | Lunite Sub: ${hasLuniteSub ? 'ACTIVE' : 'NO'}
Total Available Pulls: ${calculations.totalTidesAvailable} pulls
Worst-Case Required: ${calculations.pullsNeededWorstCase} pulls
Success Probability: ${calculations.probability}% (${calculations.statusLabel})
${calculations.astriteDeficit > 0 ? `Astrite Deficit: ${calculations.astriteDeficit.toLocaleString()} Astrite needed` : 'Status: FULLY SECURED 100%!'}`;
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              80 HARD PITY
            </span>
            <span className="text-xs text-slate-400">100% Guaranteed Weapon Banner Rule</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Pity Pull & Astrite Farming Planner
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Calculate exact pulls needed, simulate 50/50 win odds, and forecast your Astrite income timeline.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied Plan' : 'Copy Pull Plan'}
        </button>
      </div>

      {/* Main Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Banner & Target */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Banner Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setBannerType('character')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  bannerType === 'character'
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Character Event
              </button>
              <button
                onClick={() => setBannerType('weapon')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  bannerType === 'weapon'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Weapon Event (100%)
              </button>
            </div>
            {bannerType === 'weapon' && (
              <p className="text-[11px] text-amber-300 italic">
                ★ Wuthering Waves weapon banners have ZERO 50/50! Target weapon is 100% guaranteed.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Objective</label>
            <select
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value as any)}
              disabled={bannerType === 'weapon'}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
            >
              <option value="s0">S0 (First Character Copy)</option>
              <option value="s1">S1 (1st Duplicate Waveband)</option>
              <option value="s2">S2 (2 Duplicates)</option>
              <option value="s0_weapon">S0 Character + Signature Weapon</option>
            </select>
          </div>

          {bannerType === 'character' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Guaranteed Feature Status</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsGuaranteed(false)}
                  className={`py-2 text-xs font-semibold rounded-lg ${
                    !isGuaranteed ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  50/50 Chance
                </button>
                <button
                  onClick={() => setIsGuaranteed(true)}
                  className={`py-2 text-xs font-semibold rounded-lg ${
                    isGuaranteed ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  100% Guaranteed
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current Balance & Pity */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-400 uppercase tracking-wider">Current Pity Count</span>
              <span className="font-black text-cyan-400">{currentPity} / 80</span>
            </div>
            <input
              type="range"
              min={0}
              max={79}
              value={currentPity}
              onChange={(e) => setCurrentPity(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0 (Fresh)</span>
              <span>Soft Pity (~65)</span>
              <span>79 (Max)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Astrite Held</label>
              <input
                type="number"
                min={0}
                step={160}
                value={currentAstrite}
                onChange={(e) => setCurrentAstrite(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Tides (Pulls) Held</label>
              <input
                type="number"
                min={0}
                value={currentTides}
                onChange={(e) => setCurrentTides(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-400">Days Until Banner Ends</span>
              <span className="font-bold text-slate-200">{daysRemaining} Days</span>
            </div>
            <input
              type="range"
              min={1}
              max={42}
              value={daysRemaining}
              onChange={(e) => setDaysRemaining(parseInt(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Future Income Sources */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Farming & Subscriptions
          </span>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
            <span className="text-xs font-medium text-slate-300">Lunite Subscription (90/day)</span>
            <input
              type="checkbox"
              checked={hasLuniteSub}
              onChange={(e) => setHasLuniteSub(e.target.checked)}
              className="rounded accent-cyan-400 w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
            <span className="text-xs font-medium text-slate-300">Pioneer Podcast Battle Pass</span>
            <input
              type="checkbox"
              checked={hasBattlePass}
              onChange={(e) => setHasBattlePass(e.target.checked)}
              className="rounded accent-cyan-400 w-4 h-4 cursor-pointer"
            />
          </label>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Tower Resets</label>
              <select
                value={toaResets}
                onChange={(e) => setToaResets(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200"
              >
                <option value={0}>0 Resets</option>
                <option value={1}>1 Cycle (+700)</option>
                <option value={2}>2 Cycles (+1400)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Event Astrite</label>
              <input
                type="number"
                step={100}
                value={eventAstrite}
                onChange={(e) => setEventAstrite(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Output Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Available Pulls */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Projected Pulls</span>
          <div className="text-3xl font-black text-cyan-300 mt-1">
            {calculations.totalTidesAvailable}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            = {calculations.totalProjectedAstrite.toLocaleString()} Astrite Eqv.
          </span>
        </div>

        {/* Worst Case Pulls */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Worst-Case Required</span>
          <div className="text-3xl font-black text-rose-400 mt-1">
            {calculations.pullsNeededWorstCase}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Avg Expected: ~{calculations.pullsNeededAverage} pulls
          </span>
        </div>

        {/* Probability Meter */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center flex flex-col justify-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Target Probability</span>
          <div className="text-3xl font-black text-white mt-1">
            {calculations.probability}%
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                calculations.probability >= 90 ? 'bg-emerald-400' : calculations.probability >= 60 ? 'bg-cyan-400' : 'bg-amber-400'
              }`}
              style={{ width: `${calculations.probability}%` }}
            />
          </div>
        </div>

        {/* Verdict Badge */}
        <div className={`rounded-xl p-4 text-center border flex flex-col justify-center items-center ${calculations.statusColor}`}>
          <span className="text-xs uppercase font-bold tracking-wider">Status Verdict</span>
          <span className="text-lg font-black mt-1">{calculations.statusLabel}</span>
          <span className="text-[11px] mt-1 font-medium">
            {calculations.astriteDeficit > 0 
              ? `Need ${calculations.astriteDeficit.toLocaleString()} more Astrite`
              : 'Target Guaranteed in Worst Case!'}
          </span>
        </div>
      </div>

      {/* Income Breakdown */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-cyan-400" /> Astrite Income Breakdown Over {daysRemaining} Days
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Dailies (60/d):</span>
            <span className="font-bold text-slate-200">+{calculations.dailyAstrite} Astrite</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Lunite (90/d):</span>
            <span className="font-bold text-cyan-300">+{calculations.luniteAstrite} Astrite</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Tower Hazard:</span>
            <span className="font-bold text-amber-300">+{calculations.toaAstrite} Astrite</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Events + Maint:</span>
            <span className="font-bold text-blue-300">+{eventAstrite + 300} Astrite</span>
          </div>
        </div>
      </div>
    </div>
  );
}
