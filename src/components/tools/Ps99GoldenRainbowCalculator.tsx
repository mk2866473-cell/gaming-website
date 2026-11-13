/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Layers, Zap, AlertTriangle, Info, Copy, 
  Check, RotateCcw, ShieldCheck, ChevronRight, ArrowRight 
} from 'lucide-react';

type PetsMasteryTier = 0 | 60 | 90 | 99;

export default function Ps99GoldenRainbowCalculator() {
  const [normalPets, setNormalPets] = useState<number>(100);
  const [goldPets, setGoldPets] = useState<number>(0);
  const [masteryLevel, setMasteryLevel] = useState<PetsMasteryTier>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Verified Pet Mastery discount rates:
  // Baseline (None): 10 normal -> 1 gold, 10 gold -> 1 rainbow (100 normal per rainbow)
  // Lv 60: -1 pet for golding (9 normal per gold, 10 gold per rainbow = 90 normal per rainbow)
  // Lv 90: -1 pet for rainbowing (9 normal per gold, 9 gold per rainbow = 81 normal per rainbow)
  // Lv 99: -2 pets for both (8 normal per gold, 8 gold per rainbow = 64 normal per rainbow)
  const normalPerGold = useMemo(() => {
    if (masteryLevel === 99) return 8;
    if (masteryLevel >= 60) return 9;
    return 10;
  }, [masteryLevel]);

  const goldPerRainbow = useMemo(() => {
    if (masteryLevel === 99) return 8;
    if (masteryLevel >= 90) return 9;
    return 10;
  }, [masteryLevel]);

  const normalPerRainbow = normalPerGold * goldPerRainbow;

  const calculations = useMemo(() => {
    const validNormal = Math.max(0, Math.floor(normalPets || 0));
    const validGold = Math.max(0, Math.floor(goldPets || 0));

    // 1. Craft gold from normal
    const goldCraftableFromNormal = Math.floor(validNormal / normalPerGold);
    const leftoverNormal = validNormal % normalPerGold;

    // 2. Total gold available (existing gold + newly craftable gold)
    const totalGoldAvailable = validGold + goldCraftableFromNormal;

    // 3. Craft rainbow from total gold
    const rainbowCraftable = Math.floor(totalGoldAvailable / goldPerRainbow);
    const leftoverGold = totalGoldAvailable % goldPerRainbow;

    // 4. Normal pets still needed for the next rainbow pet
    const goldNeededForNext = goldPerRainbow - leftoverGold;
    const normalNeededForNext = (goldNeededForNext * normalPerGold) - leftoverNormal;

    return {
      validNormal,
      validGold,
      goldCraftableFromNormal,
      leftoverNormal,
      totalGoldAvailable,
      rainbowCraftable,
      leftoverGold,
      normalNeededForNext
    };
  }, [normalPets, goldPets, normalPerGold, goldPerRainbow]);

  const handleCopyManifest = () => {
    const text = [
      `🌟 PS99 GOLDEN & RAINBOW UPGRADE MANIFEST`,
      `• Input: ${calculations.validNormal} Normal Pets, ${calculations.validGold} Gold Pets`,
      `• Pets Mastery Tier: ${masteryLevel === 0 ? 'None (10:1)' : `Level ${masteryLevel} (${normalPerGold}:1 Gold, ${goldPerRainbow}:1 Rainbow)`}`,
      `• Gold Pets Craftable: ${calculations.goldCraftableFromNormal} (${calculations.leftoverNormal} normal left over)`,
      `• Total Gold Available: ${calculations.totalGoldAvailable}`,
      `• Rainbow Pets Craftable: ${calculations.rainbowCraftable} (${calculations.leftoverGold} gold left over)`,
      `• Normal Pets for Next Rainbow: ${calculations.normalNeededForNext} normal pets needed`,
      `• Power Boost: Gold ≈ +13% power | Rainbow ≈ +27% power`
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setNormalPets(100);
    setGoldPets(0);
    setMasteryLevel(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-amber-950/60 via-slate-900 to-sky-950/60 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-amber-500/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-950 border border-amber-500/50 rounded-xl text-amber-400 shadow-lg">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/30">
                PET SIMULATOR 99 CRAFTING
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mt-1">
                Golden & Rainbow Upgrade Calculator
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1 cursor-pointer"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyManifest}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition font-mono flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Summary'}
            </button>
          </div>
        </div>

        {/* Live Output KPI Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-[#090d16] border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Gold Pets Craftable</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {calculations.goldCraftableFromNormal.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                {calculations.leftoverNormal} normal leftover
              </span>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#090d16] border border-sky-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Rainbow Pets Craftable</span>
              <span className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">
                {calculations.rainbowCraftable.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                {calculations.leftoverGold} gold leftover
              </span>
            </div>
            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#090d16] border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">For Next Rainbow Pet</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {calculations.normalNeededForNext.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                normal pets needed
              </span>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
              <Zap className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Critical In-Game Warning Banner */}
      <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs space-y-2 text-amber-200">
        <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wide">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Verified PS99 Machine Mechanics & Tooltip Note</span>
        </div>
        <p className="leading-relaxed text-slate-300">
          <strong className="text-white">Note:</strong> The in-game tooltip saying 10x is <span className="text-amber-300 font-bold">WRONG</span> — actual power boost is <strong className="text-white">≈ +27%</strong> for Rainbow and <strong className="text-white">≈ +13%</strong> for Gold. Both Golden Machine (Area 10, Mine) and Rainbow Machine (Area 31, Desert Pyramids) are 100% free (0 diamonds).
        </p>
        <p className="text-[11px] font-mono text-slate-400 italic">
          Shiny pets need shiny inputs and are not covered by this calculator.
        </p>
      </div>

      {/* Interactive Controls & Output Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white pb-3 border-b border-slate-800 flex items-center justify-between">
            <span>Pet Inventory & Mastery Inputs</span>
            <span className="text-xs font-mono text-indigo-400 font-normal">Free Machines (0 💎)</span>
          </h2>

          {/* Quick Presets */}
          <div>
            <label className="text-[10px] uppercase text-slate-400 font-mono block mb-2">Verified Test Scenarios</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setNormalPets(100); setGoldPets(0); setMasteryLevel(0); }}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition text-center cursor-pointer"
              >
                100 Normal (None)
              </button>
              <button
                type="button"
                onClick={() => { setNormalPets(25); setGoldPets(0); setMasteryLevel(0); }}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition text-center cursor-pointer"
              >
                25 Normal (None)
              </button>
              <button
                type="button"
                onClick={() => { setNormalPets(64); setGoldPets(0); setMasteryLevel(99); }}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition text-center cursor-pointer"
              >
                64 Normal (Lv 99)
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* Normal Pets */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-300">Normal Pets Owned</label>
                <span className="text-xs font-mono text-amber-400">{normalPets.toLocaleString()} pets</span>
              </div>
              <input
                type="number"
                min={0}
                step={1}
                value={normalPets}
                onChange={e => setNormalPets(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-amber-500 focus:outline-none"
                placeholder="e.g. 100"
              />
              <span className="text-[11px] text-slate-500 block mt-1">Identical normal pets to convert at Golden Machine (Area 10)</span>
            </div>

            {/* Gold Pets */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-300">Existing Gold Pets Owned</label>
                <span className="text-xs font-mono text-sky-400">{goldPets.toLocaleString()} pets</span>
              </div>
              <input
                type="number"
                min={0}
                step={1}
                value={goldPets}
                onChange={e => setGoldPets(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-sky-500 focus:outline-none"
                placeholder="e.g. 0"
              />
              <span className="text-[11px] text-slate-500 block mt-1">Already-crafted gold pets in your bag ready for Rainbow conversion</span>
            </div>

            {/* Pets Mastery Level Selector */}
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-2">Pets Mastery Perk Level</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { level: 0, label: 'None', desc: '10:1 gold, 10:1 rb (100 total)' },
                  { level: 60, label: 'Level 60', desc: '9:1 gold, 10:1 rb (90 total)' },
                  { level: 90, label: 'Level 90', desc: '9:1 gold, 9:1 rb (81 total)' },
                  { level: 99, label: 'Level 99', desc: '8:1 gold, 8:1 rb (64 total)' }
                ].map(tier => {
                  const isSelected = masteryLevel === tier.level;
                  return (
                    <button
                      key={tier.level}
                      type="button"
                      onClick={() => setMasteryLevel(tier.level as PetsMasteryTier)}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-500/20 border-amber-500 text-white shadow-md' 
                          : 'bg-[#090d16] border-slate-700/80 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono">{tier.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{tier.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Conversion Breakdown Card */}
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Conversion Ladder</span>
              <span className="text-xs font-mono text-emerald-400">100% Free (0 💎)</span>
            </h3>

            <div className="space-y-3">
              {/* Step 1: Golden Machine */}
              <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Golden Machine (Area 10)
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">{normalPerGold} Normal → 1 Gold</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs text-slate-400">Craftable from Normal:</span>
                  <span className="font-mono text-sm font-bold text-amber-400">+{calculations.goldCraftableFromNormal} Gold</span>
                </div>
                <div className="flex justify-between items-baseline text-[11px] text-slate-500 font-mono">
                  <span>Leftover Normal:</span>
                  <span>{calculations.leftoverNormal} pets</span>
                </div>
              </div>

              {/* Step 2: Rainbow Machine */}
              <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-sky-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Rainbow Machine (Area 31)
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">{goldPerRainbow} Gold → 1 Rainbow</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs text-slate-400">Total Gold Available:</span>
                  <span className="font-mono text-sm text-slate-300">{calculations.totalGoldAvailable} Gold</span>
                </div>
                <div className="flex justify-between items-baseline pt-0.5">
                  <span className="text-xs text-slate-400">Rainbows Craftable:</span>
                  <span className="font-mono text-sm font-bold text-sky-400">+{calculations.rainbowCraftable} Rainbow</span>
                </div>
                <div className="flex justify-between items-baseline text-[11px] text-slate-500 font-mono">
                  <span>Leftover Gold:</span>
                  <span>{calculations.leftoverGold} pets</span>
                </div>
              </div>

              {/* Step 3: Next Milestone */}
              <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs text-indigo-300 font-medium">
                  <span>Targeting Next Rainbow Pet:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    +{calculations.normalNeededForNext} Normal
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Requires {normalPerRainbow} normal pets total from scratch per rainbow pet at this mastery tier.
                </p>
              </div>
            </div>
          </div>

          {/* Power Comparison Card */}
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              Verified Stat Multipliers
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#090d16] border border-slate-800 rounded-lg">
                <span className="text-slate-300">Normal Pet Baseline:</span>
                <span className="font-mono font-bold text-slate-400">100% Power</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#090d16] border border-amber-500/20 rounded-lg">
                <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Gold Pet Variant:
                </span>
                <span className="font-mono font-bold text-amber-400">≈ +13% Power</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#090d16] border border-sky-500/20 rounded-lg">
                <span className="text-sky-300 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Rainbow Pet Variant:
                </span>
                <span className="font-mono font-bold text-sky-400">≈ +27% Power</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400 leading-relaxed">
              <span className="text-slate-300 font-semibold block mb-0.5">Where to find the machines:</span>
              • Golden Machine: Area 10 (Mine)<br/>
              • Rainbow Machine: Area 31 (Desert Pyramids)<br/>
              No diamonds or currency required for either conversion.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
