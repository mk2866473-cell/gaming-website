/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Coins, DollarSign, Wallet, Scale, ArrowDownRight, ArrowUpRight
} from 'lucide-react';

export default function WuwaShellCreditOptimizer() {
  const [currentCredits, setCurrentCredits] = useState<number>(850000);
  const [charLevelTarget, setCharLevelTarget] = useState<'70' | '80' | '90'>('90');
  const [weaponLevelTarget, setWeaponLevelTarget] = useState<'70' | '80' | '90'>('90');
  const [forteLevelTarget, setForteLevelTarget] = useState<'6' | '8' | '10'>('10');
  const [echoesToLevel, setEchoesToLevel] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  // Exact credit costs breakdown
  const costs = useMemo(() => {
    // Character level
    const charCost = charLevelTarget === '90' 
      ? 1450000 
      : charLevelTarget === '80' 
      ? 840000 
      : 420000;

    // Weapon level (5-star weapon)
    const weaponCost = weaponLevelTarget === '90' 
      ? 1200000 
      : weaponLevelTarget === '80' 
      ? 710000 
      : 360000;

    // Forte skills (5 skills)
    const forteCost = forteLevelTarget === '10' 
      ? 2000000 
      : forteLevelTarget === '8' 
      ? 950000 
      : 410000;

    // Echo leveling (+0 to +25 and tuning)
    const echoCost = echoesToLevel * 145000;

    const totalCost = charCost + weaponCost + forteCost + echoCost;
    const deficit = Math.max(0, totalCost - currentCredits);

    // Waveplates needed to farm deficit
    // Simulation Challenge grants 80,000 Shell Credits per 40 Waveplates (Phase 7/8)
    const simulationRunsNeeded = Math.ceil(deficit / 80000);
    const waveplatesNeeded = simulationRunsNeeded * 40;
    const daysOfWaveplates = Number((waveplatesNeeded / 240).toFixed(1));

    // Calculate savings of Level 80 + Forte 8 vs Level 90 + Forte 10
    const maxCost = 1450000 + 1200000 + 2000000 + (5 * 145000);
    const potentialSavings = maxCost - totalCost;

    // Bankruptcy Risk Score
    let riskLabel = 'Low Risk';
    let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40';
    if (deficit > 3000000) {
      riskLabel = 'Severe Deficit';
      riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/40';
    } else if (deficit > 1000000) {
      riskLabel = 'Moderate Deficit';
      riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/40';
    } else if (deficit === 0) {
      riskLabel = 'Fully Funded';
      riskColor = 'text-cyan-400 bg-cyan-950/40 border-cyan-500/40';
    }

    return {
      charCost,
      weaponCost,
      forteCost,
      echoCost,
      totalCost,
      deficit,
      simulationRunsNeeded,
      waveplatesNeeded,
      daysOfWaveplates,
      potentialSavings,
      riskLabel,
      riskColor
    };
  }, [currentCredits, charLevelTarget, weaponLevelTarget, forteLevelTarget, echoesToLevel]);

  const handleCopy = () => {
    const text = `Wuthering Waves Shell Credit Spending Plan:
Current Balance: ${currentCredits.toLocaleString()} Credits
Targets: Char Lv${charLevelTarget} | Weapon Lv${weaponLevelTarget} | Forte Lv${forteLevelTarget} | ${echoesToLevel} Echoes
Total Required: ${costs.totalCost.toLocaleString()} Credits
Status: ${costs.deficit > 0 ? `Deficit of ${costs.deficit.toLocaleString()} Credits` : 'Fully Funded!'}
Waveplates to Farm: ${costs.waveplatesNeeded} Waveplates (${costs.simulationRunsNeeded} Runs = ~${costs.daysOfWaveplates} Days)`;
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
              ECONOMY & WAVEPLATE OPTIMIZER
            </span>
            <span className="text-xs text-slate-400">80,000 Credits / 40 Waveplates Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Shell Credit Grid Spend Optimizer
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Plan multi-million Shell Credit sinks across characters, weapons, and forte nodes to prevent resource bankruptcy.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Budget'}
        </button>
      </div>

      {/* Current Balance Input Bar */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-cyan-400" /> Current Shell Credits in Inventory
          </label>
          <p className="text-xs text-slate-400">Check inventory currency balance in-game</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            step={50000}
            value={currentCredits}
            onChange={(e) => setCurrentCredits(Math.max(0, parseInt(e.target.value) || 0))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-base text-cyan-300 font-black focus:outline-none focus:border-cyan-500 w-48 text-right"
          />
          <span className="text-sm font-bold text-slate-400">Credits</span>
        </div>
      </div>

      {/* Target Planning Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Character Level */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 uppercase">Resonator Level</span>
            <span className="font-bold text-cyan-300">{costs.charCost.toLocaleString()} Cr</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['70', '80', '90'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setCharLevelTarget(lvl)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  charLevelTarget === lvl
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Lv {lvl}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">Lv 80➔90 alone costs 610,000 credits!</p>
        </div>

        {/* 5-Star Weapon Level */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 uppercase">Weapon Level</span>
            <span className="font-bold text-cyan-300">{costs.weaponCost.toLocaleString()} Cr</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['70', '80', '90'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setWeaponLevelTarget(lvl)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  weaponLevelTarget === lvl
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Lv {lvl}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">Lv 80➔90 weapon costs 490,000 credits</p>
        </div>

        {/* Forte Skills */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 uppercase">Forte Skills (5)</span>
            <span className="font-bold text-cyan-300">{costs.forteCost.toLocaleString()} Cr</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['6', '8', '10'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setForteLevelTarget(lvl)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  forteLevelTarget === lvl
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Forte {lvl}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">Forte 8➔10 costs 1.05M credits for 5 skills</p>
        </div>

        {/* Echo Set Upgrades */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 uppercase">Echoes to +25</span>
            <span className="font-bold text-cyan-300">{costs.echoCost.toLocaleString()} Cr</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setEchoesToLevel(n)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  echoesToLevel === n
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {n}x
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">145k credits per Echo from +0 to +25</p>
        </div>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Investment</span>
          <div className="text-3xl font-black text-white mt-1">
            {(costs.totalCost / 1000000).toFixed(2)}M
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">{costs.totalCost.toLocaleString()} Credits</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Remaining Deficit</span>
          <div className="text-3xl font-black text-rose-400 mt-1">
            {costs.deficit > 0 ? `${(costs.deficit / 1000000).toFixed(2)}M` : '0 Cr'}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            {costs.deficit > 0 ? `${costs.deficit.toLocaleString()} Cr needed` : 'Covered by inventory'}
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Waveplates to Farm</span>
          <div className="text-3xl font-black text-cyan-300 mt-1">
            {costs.waveplatesNeeded}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            {costs.simulationRunsNeeded} Simulation Runs (~{costs.daysOfWaveplates} Days)
          </span>
        </div>

        <div className={`rounded-xl p-4 text-center border flex flex-col justify-center items-center ${costs.riskColor}`}>
          <span className="text-xs uppercase font-bold tracking-wider">Budget Status</span>
          <span className="text-xl font-black mt-1">{costs.riskLabel}</span>
          <span className="text-[11px] mt-1 font-semibold">
            {costs.potentialSavings > 0 ? `Saves ${(costs.potentialSavings / 1000000).toFixed(2)}M vs Lv90/10` : 'Maximum Build'}
          </span>
        </div>
      </div>

      {/* Stopping Point Strategic Guidance */}
      <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-4 text-xs text-cyan-100 space-y-2">
        <h4 className="font-bold text-cyan-300 flex items-center gap-1.5">
          <Scale className="w-4 h-4 text-cyan-400" /> The Golden "Level 80 / Forte 8" Rule
        </h4>
        <p className="text-slate-300 leading-relaxed">
          Leveling from 80 to 90 and pushing Forte skills from 8 to 10 consumes over <strong>52% of the entire budget</strong> (~2.8M Shell Credits and 1,400 Waveplates), but delivers only an <strong>8% to 11% DPS increase</strong>. Unless you are maxing your singular primary Hypercarry (like Jinhsi or Jiyan), leave sub-DPS and support resonators at Level 80 with Forte Lv8 to build entire second and third teams for Tower of Adversity!
        </p>
      </div>
    </div>
  );
}
