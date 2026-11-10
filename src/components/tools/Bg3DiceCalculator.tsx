/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Dices, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  Flame, 
  Wand2, 
  Feather, 
  Crown,
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';
import { 
  calculateDiceProbability, 
  BG3_DC_PRESETS, 
  RollMode, 
  DiceCalculationResult 
} from '../../data/bg3Data';

export const Bg3DiceCalculator: React.FC = () => {
  // Inputs
  const [targetDc, setTargetDc] = useState<number>(15);
  const [abilityMod, setAbilityMod] = useState<number>(3);
  const [profBonus, setProfBonus] = useState<number>(2);
  const [extraBonus, setExtraBonus] = useState<number>(0);
  const [rollMode, setRollMode] = useState<RollMode>('normal');
  const [guidance, setGuidance] = useState<boolean>(false);
  const [bardicDie, setBardicDie] = useState<number>(0); // 0, 4, 6, 8, 10

  // Interactive Live Dice Simulator State
  const [isRolling, setIsRolling] = useState(false);
  const [simulatedRoll, setSimulatedRoll] = useState<{
    die1: number;
    die2?: number;
    die3?: number;
    bonus: number;
    total: number;
    isSuccess: boolean;
    isCritSuccess: boolean;
    isCritFail: boolean;
  } | null>(null);

  const totalModifier = abilityMod + profBonus + extraBonus;
  const result: DiceCalculationResult = calculateDiceProbability(
    targetDc,
    totalModifier,
    rollMode,
    guidance,
    bardicDie
  );

  // Preset DC handler
  const applyPreset = (dc: number) => {
    setTargetDc(dc);
  };

  // Simulate Live Dice Roll
  const rollDiceNow = () => {
    setIsRolling(true);
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 20) + 1;
      const d2 = Math.floor(Math.random() * 20) + 1;
      const d3 = Math.floor(Math.random() * 20) + 1;

      let chosenD20 = d1;
      if (rollMode === 'advantage') chosenD20 = Math.max(d1, d2);
      if (rollMode === 'disadvantage') chosenD20 = Math.min(d1, d2);
      if (rollMode === 'elven_accuracy') chosenD20 = Math.max(d1, d2, d3);

      let rolledBonus = 0;
      if (guidance) rolledBonus += Math.floor(Math.random() * 4) + 1;
      if (bardicDie > 0) rolledBonus += Math.floor(Math.random() * bardicDie) + 1;

      const grandTotal = chosenD20 + totalModifier + rolledBonus;
      const isCritSuccess = chosenD20 === 20;
      const isCritFail = chosenD20 === 1;
      const isSuccess = isCritSuccess || (!isCritFail && grandTotal >= targetDc);

      setSimulatedRoll({
        die1: d1,
        die2: rollMode === 'advantage' || rollMode === 'disadvantage' || rollMode === 'elven_accuracy' ? d2 : undefined,
        die3: rollMode === 'elven_accuracy' ? d3 : undefined,
        bonus: rolledBonus,
        total: grandTotal,
        isSuccess,
        isCritSuccess,
        isCritFail,
      });
      setIsRolling(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-serif text-amber-950">
      {/* Medieval Fantasy Parchment Card Header */}
      <div className="relative bg-[#f7f1e3] border-4 border-[#8c6d3f] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Decorative Gold Filigree Corner Ornaments */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-600 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-600 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-600 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-600 rounded-br-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2 border-[#d4b886]/60 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-900 text-amber-200 rounded-xl shadow-md border border-amber-600">
                <Dices className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-sans uppercase font-bold tracking-widest text-amber-800 border border-amber-400 px-2.5 py-0.5">
                  Baldur's Gate 3 & D&D 5e Rules
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-amber-950 mt-1 font-serif">
                  Dice Roll Advantage & Disadvantage Calculator
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/80 max-w-2xl font-sans leading-relaxed">
              Calculate exact mathematical success probability (%) for d20 skill checks, attack rolls, and saving throws with Advantage, Disadvantage, and bonus dice.
            </p>
          </div>

          <button
            onClick={rollDiceNow}
            disabled={isRolling}
            className="px-6 py-3 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-amber-100 font-bold font-sans rounded-xl border-2 border-amber-500 shadow-xl hover:from-amber-700 hover:to-amber-800 transition active:scale-95 flex items-center gap-2.5 shrink-0"
          >
            <Dices className={`w-5 h-5 text-amber-300 ${isRolling ? 'animate-spin' : ''}`} />
            <span>{isRolling ? 'Rolling Dice...' : 'Simulate Roll Live'}</span>
          </button>
        </div>

        {/* Dynamic Big Success Percentage Display Banner */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Success Odds Display */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#eadbc8] to-[#dfceb6] border-2 border-[#b89765] rounded-xl p-6 shadow-inner flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans uppercase tracking-widest font-bold text-amber-900">
                Success Chance Percentage
              </span>
              <span className="text-xs font-sans px-2.5 py-1 border border-amber-900 text-amber-900 font-bold uppercase tracking-tight">
                Mode: {rollMode.replace('_', ' ')}
              </span>
            </div>

            <div className="my-4 flex items-baseline gap-3">
              <span className={`text-5xl sm:text-7xl font-black tracking-tight font-serif ${
                result.finalSuccessPercentage >= 75
                  ? 'text-emerald-800'
                  : result.finalSuccessPercentage >= 45
                  ? 'text-amber-900'
                  : 'text-red-900'
              }`}>
                {result.finalSuccessPercentage}%
              </span>
              <span className="text-xs font-sans text-amber-800 font-semibold">
                (Exact Math Probability)
              </span>
            </div>

            {/* Visual Probability Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-[#c9b28f] h-4 rounded-full overflow-hidden border border-[#9b7e55] p-0.5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    result.finalSuccessPercentage >= 75
                      ? 'bg-gradient-to-r from-emerald-700 to-teal-500'
                      : result.finalSuccessPercentage >= 45
                      ? 'bg-gradient-to-r from-amber-700 to-yellow-500'
                      : 'bg-gradient-to-r from-red-800 to-rose-600'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, result.finalSuccessPercentage))}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-sans font-bold text-amber-900">
                <span>0% (Impossible)</span>
                <span>Target DC {targetDc} vs Total Mod +{totalModifier}</span>
                <span>100% (Guaranteed)</span>
              </div>
            </div>
          </div>

          {/* Quick Stat Highlights */}
          <div className="bg-gradient-to-br from-[#eadbc8] to-[#dfceb6] border-2 border-[#b89765] rounded-xl p-5 shadow-inner space-y-3 font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#c9b28f]">
              <span className="text-amber-900 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Crit Success (Nat 20):
              </span>
              <span className="font-mono font-bold text-emerald-800 text-sm">{result.critSuccessPercentage}%</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-[#c9b28f]">
              <span className="text-amber-900 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-red-700" /> Crit Fail (Nat 1):
              </span>
              <span className="font-mono font-bold text-red-800 text-sm">{result.critFailurePercentage}%</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-[#c9b28f]">
              <span className="text-amber-900 font-semibold">Min d20 Face Needed:</span>
              <span className="font-mono font-bold text-amber-950 text-sm">{result.neededD20}+</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-amber-900 font-semibold">Expected Total Average:</span>
              <span className="font-mono font-bold text-amber-950 text-sm">{result.averageTotalRoll}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Live Roll Modal / Alert (If user clicked simulate roll) */}
      {simulatedRoll && (
        <div className={`p-5 rounded-xl border-2 font-sans text-sm shadow-xl transition-all ${
          simulatedRoll.isSuccess 
            ? 'bg-emerald-950 text-emerald-100 border-emerald-500' 
            : 'bg-red-950 text-red-100 border-red-500'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
              {simulatedRoll.isCritSuccess ? (
                <span className="px-2 py-0.5 border-2 border-yellow-500 text-yellow-600 font-extrabold animate-bounce">
                  CRITICAL SUCCESS! (Nat 20)
                </span>
              ) : simulatedRoll.isCritFail ? (
                <span className="px-2 py-0.5 border-2 border-red-600 text-red-600 font-extrabold">
                  CRITICAL FAILURE! (Nat 1)
                </span>
              ) : simulatedRoll.isSuccess ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> SUCCESSFUL CHECK!
                </span>
              ) : (
                <span className="text-red-400 flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> CHECK FAILED!
                </span>
              )}
            </div>
            <button
              onClick={() => setSimulatedRoll(null)}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              Dismiss
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
            <span>Dice Rolled:</span>
            <span className="px-2 py-1 bg-black/40 rounded border border-white/20 text-yellow-300 font-bold">
              d20 #1: [{simulatedRoll.die1}]
            </span>
            {simulatedRoll.die2 !== undefined && (
              <span className="px-2 py-1 bg-black/40 rounded border border-white/20 text-yellow-300 font-bold">
                d20 #2: [{simulatedRoll.die2}]
              </span>
            )}
            {simulatedRoll.die3 !== undefined && (
              <span className="px-2 py-1 bg-black/40 rounded border border-white/20 text-yellow-300 font-bold">
                d20 #3: [{simulatedRoll.die3}]
              </span>
            )}
            <span>+ Mod (+{totalModifier})</span>
            {simulatedRoll.bonus > 0 && <span>+ Bonus (+{simulatedRoll.bonus})</span>}
            <span className="font-black text-sm text-white">
              = Total: {simulatedRoll.total} vs DC {targetDc}
            </span>
          </div>
        </div>
      )}

      {/* Main Interactive Controls Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Input Form */}
        <div className="lg:col-span-2 bg-[#f7f1e3] border-3 border-[#8c6d3f] rounded-2xl p-6 shadow-xl space-y-6">
          {/* DC Presets */}
          <div>
            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-amber-900 mb-2.5">
              Quick Select Target Difficulty Class (DC):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-sans">
              {BG3_DC_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.dc)}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold transition text-left flex flex-col ${
                    targetDc === preset.dc
                      ? 'bg-amber-900 text-amber-100 border-amber-600 shadow-md ring-2 ring-amber-500/30'
                      : 'bg-[#eadbc8]/80 text-amber-950 border-[#c9b28f] hover:bg-[#dfceb6]'
                  }`}
                >
                  <span className="font-bold">{preset.name}</span>
                  <span className="text-[10px] opacity-80">DC {preset.dc} – {preset.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Numeric Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1.5">
                Target Difficulty Class (DC):
              </label>
              <input
                type="number"
                min={1}
                max={99}
                value={targetDc}
                onChange={e => setTargetDc(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#b89765] bg-[#fffdfa] font-mono text-base font-bold text-amber-950 focus:outline-none focus:border-amber-700 shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1.5">
                Ability Stat Modifier (STR/DEX/CHA/etc.):
              </label>
              <input
                type="number"
                min={-5}
                max={15}
                value={abilityMod}
                onChange={e => setAbilityMod(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#b89765] bg-[#fffdfa] font-mono text-base font-bold text-amber-950 focus:outline-none focus:border-amber-700 shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1.5">
                Proficiency Bonus (+2 to +6):
              </label>
              <input
                type="number"
                min={0}
                max={10}
                value={profBonus}
                onChange={e => setProfBonus(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#b89765] bg-[#fffdfa] font-mono text-base font-bold text-amber-950 focus:outline-none focus:border-amber-700 shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1.5">
                Gear / Expertise / Flat Bonuses:
              </label>
              <input
                type="number"
                min={-5}
                max={20}
                value={extraBonus}
                onChange={e => setExtraBonus(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#b89765] bg-[#fffdfa] font-mono text-base font-bold text-amber-950 focus:outline-none focus:border-amber-700 shadow-inner"
              />
            </div>
          </div>

          {/* Roll Mode Selectors (Checkboxes / Radio Style) */}
          <div className="font-sans pt-3 border-t border-[#d4b886]">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-2.5">
              Select Roll Advantage Mode:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setRollMode('normal')}
                className={`p-3.5 rounded-xl border-2 text-xs font-bold transition flex items-center justify-between ${
                  rollMode === 'normal'
                    ? 'bg-amber-900 text-amber-100 border-amber-600 shadow-md'
                    : 'bg-[#eadbc8]/80 text-amber-950 border-[#c9b28f] hover:bg-[#dfceb6]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Dices className="w-4 h-4 text-amber-400" />
                  <span>Normal Roll (1d20)</span>
                </div>
                <span className="text-[10px] opacity-80">Standard 5e</span>
              </button>

              <button
                onClick={() => setRollMode('advantage')}
                className={`p-3.5 rounded-xl border-2 text-xs font-bold transition flex items-center justify-between ${
                  rollMode === 'advantage'
                    ? 'bg-emerald-900 text-emerald-100 border-emerald-500 shadow-md'
                    : 'bg-[#eadbc8]/80 text-amber-950 border-[#c9b28f] hover:bg-[#dfceb6]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Advantage (2d20 Take High)</span>
                </div>
                <span className="text-[10px] opacity-80">+Odds</span>
              </button>

              <button
                onClick={() => setRollMode('disadvantage')}
                className={`p-3.5 rounded-xl border-2 text-xs font-bold transition flex items-center justify-between ${
                  rollMode === 'disadvantage'
                    ? 'bg-red-950 text-red-100 border-red-600 shadow-md'
                    : 'bg-[#eadbc8]/80 text-amber-950 border-[#c9b28f] hover:bg-[#dfceb6]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Disadvantage (2d20 Take Low)</span>
                </div>
                <span className="text-[10px] opacity-80">-Odds</span>
              </button>

              <button
                onClick={() => setRollMode('elven_accuracy')}
                className={`p-3.5 rounded-xl border-2 text-xs font-bold transition flex items-center justify-between ${
                  rollMode === 'elven_accuracy'
                    ? 'bg-purple-950 text-purple-100 border-purple-500 shadow-md'
                    : 'bg-[#eadbc8]/80 text-amber-950 border-[#c9b28f] hover:bg-[#dfceb6]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-purple-300" />
                  <span>Elven Accuracy (3d20 High)</span>
                </div>
                <span className="text-[10px] opacity-80">Super Adv</span>
              </button>
            </div>
          </div>

          {/* Spell Buff Toggles (Guidance & Bardic Inspiration) */}
          <div className="font-sans pt-3 border-t border-[#d4b886] space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
              Optional BG3 Spell & Class Buff Dice:
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer bg-[#eadbc8] border border-[#c9b28f] px-4 py-2.5 rounded-xl text-xs font-bold text-amber-950 hover:bg-[#dfceb6] transition">
                <input
                  type="checkbox"
                  checked={guidance}
                  onChange={e => setGuidance(e.target.checked)}
                  className="w-4 h-4 accent-amber-800 rounded cursor-pointer"
                />
                <Wand2 className="w-4 h-4 text-amber-700" />
                <span>Guidance (+1d4 to Check)</span>
              </label>

              <div className="flex items-center gap-2 bg-[#eadbc8] border border-[#c9b28f] px-4 py-2 rounded-xl text-xs font-bold text-amber-950">
                <Feather className="w-4 h-4 text-purple-700" />
                <span>Bardic Inspiration:</span>
                <select
                  value={bardicDie}
                  onChange={e => setBardicDie(parseInt(e.target.value) || 0)}
                  className="bg-[#fffdfa] border border-[#b89765] rounded px-2 py-1 font-mono font-bold text-amber-950"
                >
                  <option value={0}>None</option>
                  <option value={4}>+1d4 (Level 1)</option>
                  <option value={6}>+1d6 (Level 3)</option>
                  <option value={8}>+1d8 (Level 5)</option>
                  <option value={10}>+1d10 (Level 10)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: d20 Outcomes Matrix */}
        <div className="bg-[#f7f1e3] border-3 border-[#8c6d3f] rounded-2xl p-6 shadow-xl space-y-4 font-sans">
          <div className="flex items-center justify-between border-b border-[#d4b886] pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Dices className="w-4 h-4 text-amber-700" /> d20 Face Breakdown Matrix
            </h3>
            <span className="text-[11px] text-amber-800">Mod +{totalModifier}</span>
          </div>

          <p className="text-xs text-amber-900/80 leading-relaxed">
            Every face value (1 to 20) on a 20-sided die and its total calculated result against DC {targetDc}:
          </p>

          <div className="grid grid-cols-2 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
            {Array.from({ length: 20 }, (_, i) => i + 1).map(die => {
              const total = die + totalModifier;
              const isCrit20 = die === 20;
              const isCrit1 = die === 1;
              const isSuccess = isCrit20 || (!isCrit1 && total >= targetDc);

              return (
                <div
                  key={die}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center justify-between font-mono ${
                    isCrit20
                      ? 'bg-amber-900 text-amber-200 border-amber-600 font-bold'
                      : isCrit1
                      ? 'bg-red-950 text-red-200 border-red-700'
                      : isSuccess
                      ? 'bg-emerald-950/20 text-emerald-900 border-emerald-500/40 font-semibold'
                      : 'bg-slate-900/10 text-slate-700 border-slate-300'
                  }`}
                >
                  <span className="font-bold">d20 [{die}]</span>
                  <span>
                    {isCrit20 ? (
                      <span className="text-amber-400 font-sans font-bold">CRIT</span>
                    ) : isCrit1 ? (
                      <span className="text-red-400 font-sans font-bold">FAIL</span>
                    ) : (
                      `=${total}`
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#d4b886] text-[11px] text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Green faces indicate successful rolls ≥ DC {targetDc}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>Nat 20 always succeeds; Nat 1 always fails in BG3.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
