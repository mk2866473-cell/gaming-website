/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Egg, Award, Flame, CheckCircle2, RotateCcw, 
  Copy, Check, ShieldCheck, Info, Calculator 
} from 'lucide-react';
import { formatGems } from '../../data/ps99Data';

export default function Ps99EggHatchingCalculator() {
  const [eggsOpenedPerHour, setEggsOpenedPerHour] = useState<number>(3600);
  const [hoursHatching, setHoursHatching] = useState<number>(10);
  const [hasHugeHunter, setHasHugeHunter] = useState<boolean>(true);
  const [hasLuckyBargain, setHasLuckyBargain] = useState<boolean>(true);
  const [hasShinyHunter, setHasShinyHunter] = useState<boolean>(false);
  const [activePotionTier, setActivePotionTier] = useState<number>(8); // V to VIII
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const totalEggs = eggsOpenedPerHour * hoursHatching;
    
    // Base Huge pet drop rate ~ 1 in 5,000,000 without boosts
    // With Huge Hunter enchant and max gamepasses/potions, odds improve up to ~1 in 250,000
    let baseHugeOdds = 5000000;
    if (hasHugeHunter) baseHugeOdds /= 15;
    if (activePotionTier >= 8) baseHugeOdds /= (activePotionTier * 0.4);
    if (hasLuckyBargain) baseHugeOdds /= 1.5;

    const hugeProbabilityPct = (1 / baseHugeOdds) * 100;
    const expectedHugeCount = totalEggs / baseHugeOdds;

    // Shiny probability ~ 1 in 2,000 base, improved with Shiny Hunter
    let baseShinyOdds = 2000;
    if (hasShinyHunter) baseShinyOdds = 400;

    const expectedShinyCount = totalEggs / baseShinyOdds;

    return {
      totalEggs,
      hugeOddsLabel: `1 in ${Math.round(baseHugeOdds).toLocaleString()}`,
      hugeProbabilityPct: Math.max(0.0001, Math.round(hugeProbabilityPct * 10000) / 10000),
      expectedHugeCount: Math.round(expectedHugeCount * 100) / 100,
      shinyOddsLabel: `1 in ${baseShinyOdds.toLocaleString()}`,
      expectedShinyCount: Math.round(expectedShinyCount * 10) / 10
    };
  }, [eggsOpenedPerHour, hoursHatching, hasHugeHunter, hasLuckyBargain, hasShinyHunter, activePotionTier]);

  const handleCopy = () => {
    const text = [
      `🥚 PS99 EGG HATCHING PROBABILITY MANIFEST`,
      `• Total Eggs Hatched: ${results.totalEggs.toLocaleString()}`,
      `• Huge Pet Odds: ${results.hugeOddsLabel} (${results.hugeProbabilityPct}%)`,
      `• Expected Huges: ~${results.expectedHugeCount}`,
      `• Expected Shiny Pets: ~${results.expectedShinyCount}`
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Header Card */}
      <div className="relative bg-gradient-to-r from-amber-950 via-slate-900 to-sky-950 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-amber-500/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-950 border border-amber-500/50 rounded-xl text-amber-400 shadow-lg">
              <Egg className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/30">
                PET SIMULATOR 99 CALCULATOR
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
                Egg Hatching Odds & Shiny Probability Calculator
              </h1>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition font-mono flex items-center gap-1.5 shadow-lg shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Manifest Copied!' : 'Copy Hatching Manifest'}
          </button>
        </div>

        {/* Live Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-[#090d16] border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Effective Huge Odds</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                {results.hugeOddsLabel}
              </span>
            </div>
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>

          <div className="bg-[#090d16] border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Expected Huges</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                ~{results.expectedHugeCount} Pets
              </span>
            </div>
            <Award className="w-6 h-6 text-emerald-400" />
          </div>

          <div className="bg-[#090d16] border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Expected Shinies</span>
              <span className="text-xl sm:text-2xl font-black text-sky-400 font-mono">
                ~{results.expectedShinyCount} Pets
              </span>
            </div>
            <Egg className="w-6 h-6 text-sky-400" />
          </div>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white pb-3 border-b border-slate-800">Hatching Rate & Boosts</h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 block font-medium mb-1">
                Eggs Opened Per Hour: <span className="text-amber-400 font-bold font-mono">{eggsOpenedPerHour.toLocaleString()}</span>
              </label>
              <input
                type="number"
                step={100}
                min={100}
                max={10000}
                value={eggsOpenedPerHour}
                onChange={e => setEggsOpenedPerHour(parseInt(e.target.value) || 1000)}
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block font-medium mb-1">
                Hatching Duration: <span className="text-amber-400 font-bold font-mono">{hoursHatching} Hours</span>
              </label>
              <input
                type="range"
                min={1}
                max={168}
                value={hoursHatching}
                onChange={e => setHoursHatching(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1 Hour</span>
                <span>24 Hours</span>
                <span>168 Hours (1 Week)</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs uppercase text-slate-400 font-mono block">Active Gamepasses & Enchants</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-3 bg-[#090d16] border border-slate-800 rounded-xl text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasHugeHunter}
                    onChange={e => setHasHugeHunter(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-500 w-4 h-4"
                  />
                  <span>Huge Hunter Gamepass / Enchant</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 bg-[#090d16] border border-slate-800 rounded-xl text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasShinyHunter}
                    onChange={e => setHasShinyHunter(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-500 w-4 h-4"
                  />
                  <span>Shiny Hunter Enchant</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 bg-[#090d16] border border-slate-800 rounded-xl text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasLuckyBargain}
                    onChange={e => setHasLuckyBargain(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-500 w-4 h-4"
                  />
                  <span>Lucky Bargain Boost</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Analysis (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              Probability Breakdown
            </h3>

            <div className="bg-[#090d16] border border-slate-800 rounded-xl p-4 space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Total Eggs Hatched:</span>
                <span className="font-mono font-bold text-white">{results.totalEggs.toLocaleString()} Eggs</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Huge Drop Chance:</span>
                <span className="font-mono font-bold text-amber-400">{results.hugeOddsLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Success Probability (%):</span>
                <span className="font-mono font-bold text-emerald-400">{results.hugeProbabilityPct}%</span>
              </div>
            </div>

            <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 space-y-2 text-xs text-amber-200">
              <div className="font-bold flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400" /> RNG & Probability Notice
              </div>
              <p className="leading-relaxed text-slate-300 text-[11px]">
                Hatching odds in Pet Simulator 99 are calculated independently per egg. Even with a 1 in 300,000 drop rate, RNG dictates that some players will hatch multiple Huges early while others may go over expected thresholds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
