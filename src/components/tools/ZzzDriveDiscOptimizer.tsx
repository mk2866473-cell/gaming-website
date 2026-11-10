/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Flame, Target, Cpu, Activity
} from 'lucide-react';

interface DiscSlot {
  slot: number;
  mainStat: string;
  substats: { name: string; rolls: number }[];
}

const DISC_SETS: Record<string, { name: string; twoPiece: string; fourPiece: string; type: 'crit' | 'anomaly' | 'support' | 'stun' }> = {
  'chaos_jazz': { name: 'Chaos Jazz', twoPiece: '+30 Anomaly Proficiency', fourPiece: '+15% Fire/Electric DMG. While off-field, EX Special and Assist DMG +20%.', type: 'anomaly' },
  'freedom_blues': { name: 'Freedom Blues', twoPiece: '+30 Anomaly Proficiency', fourPiece: 'When EX Special hits an enemy, reduces target Anomaly Buildup RES by 20% for 5s.', type: 'anomaly' },
  'fanged_metal': { name: 'Fanged Metal', twoPiece: '+10% Physical DMG', fourPiece: 'When any squad member inflicts Assault, equipping agent deals +35% DMG for 12s.', type: 'anomaly' },
  'polar_metal': { name: 'Polar Metal', twoPiece: '+10% Ice DMG', fourPiece: 'Basic & Dash Attack DMG +20%. Inflicting Freeze/Shatter grants additional +20% DMG for 12s.', type: 'crit' },
  'thunder_metal': { name: 'Thunder Metal', twoPiece: '+10% Electric DMG', fourPiece: 'As long as an enemy is in Shock state, equipping agent gains +28% ATK.', type: 'crit' },
  'inferno_metal': { name: 'Inferno Metal', twoPiece: '+10% Fire DMG', fourPiece: 'Upon hitting an enemy in Burn state, CRIT Rate +28% for 8s.', type: 'crit' },
  'woodpecker_electro': { name: 'Woodpecker Electro', twoPiece: '+8% CRIT Rate', fourPiece: 'CRIT hits with Basic, Dodge Counter, or EX Special grant stacking +9% ATK (up to +27%).', type: 'crit' },
  'puffer_electro': { name: 'Puffer Electro', twoPiece: '+8% PEN Ratio', fourPiece: 'Ultimate DMG +20%. Launching Ultimate increases ATK by 15% for 12s.', type: 'crit' },
  'shockstar_disco': { name: 'Shockstar Disco', twoPiece: '+6% Impact', fourPiece: 'Basic Attacks, Dash Attacks, and Dodge Counters deal +20% Daze.', type: 'stun' },
  'swing_jazz': { name: 'Swing Jazz', twoPiece: '+20% Energy Regen', fourPiece: 'Launching Chain Attack or Ultimate increases entire squad DMG by 15% for 12s.', type: 'support' },
  'hormone_punk': { name: 'Hormone Punk', twoPiece: '+10% ATK', fourPiece: 'Upon entering combat or switching in, ATK +25% for 10s (20s cooldown).', type: 'crit' },
};

export default function ZzzDriveDiscOptimizer() {
  const [fourPieceSet, setFourPieceSet] = useState<string>('chaos_jazz');
  const [twoPieceSet, setTwoPieceSet] = useState<string>('freedom_blues');
  const [buildFocus, setBuildFocus] = useState<'anomaly' | 'crit'>('anomaly');
  
  // Stats
  const [baseAtk, setBaseAtk] = useState<number>(850);
  const [totalAtkPct, setTotalAtkPct] = useState<number>(65);
  const [critRate, setCritRate] = useState<number>(45);
  const [critDmg, setCritDmg] = useState<number>(110);
  const [anomalyProficiency, setAnomalyProficiency] = useState<number>(340);
  const [anomalyBuildupRate, setAnomalyBuildupRate] = useState<number>(30); // Partition 6
  const [penRatio, setPenRatio] = useState<number>(24);
  const [dmgBonus, setDmgBonus] = useState<number>(45);
  const [copied, setCopied] = useState<boolean>(false);

  // Math evaluation
  const analysis = useMemo(() => {
    const finalAtk = Math.round(baseAtk * (1 + totalAtkPct / 100));

    // CRIT DPS Multiplier
    const effectiveCritRate = Math.min(100, Math.max(5, critRate));
    const critMultiplier = 1 + (effectiveCritRate / 100) * (critDmg / 100);

    // Anomaly Damage Multiplier:
    // In ZZZ, Anomaly damage scales directly with Anomaly Proficiency (1 AP = +1% base anomaly damage bonus)
    // Formula: Base Anomaly Damage * (1 + AP / 100) * (1 + DMG Bonus) * (1 - Enemy DEF factor)
    const anomalyScalingMultiplier = 1 + (anomalyProficiency / 100);
    const estimatedAnomalyTriggerDmg = Math.round(finalAtk * anomalyScalingMultiplier * 2.8 * (1 + dmgBonus / 100));

    // Disorder Damage Calculation:
    // Disorder triggers when a second anomaly is applied over an active one.
    // It detonates remaining DoT ticks + flat Disorder burst bonus (approx 450% AP scaling).
    const estimatedDisorderDmg = Math.round(estimatedAnomalyTriggerDmg * 1.65);

    // Build Efficiency Score (0-100)
    let score = 0;
    if (buildFocus === 'anomaly') {
      // Benchmark: AP >= 380, Atk >= 2200, Buildup Rate >= 30%
      const apScore = Math.min(45, (anomalyProficiency / 400) * 45);
      const atkScore = Math.min(30, (finalAtk / 2400) * 30);
      const buildupScore = Math.min(25, (anomalyBuildupRate / 30) * 25);
      score = Math.round(apScore + atkScore + buildupScore);
    } else {
      // Benchmark: CR >= 70, CD >= 140, Atk >= 2600
      const crScore = Math.min(35, (effectiveCritRate / 75) * 35);
      const cdScore = Math.min(35, (critDmg / 150) * 35);
      const atkScore = Math.min(30, (finalAtk / 2700) * 30);
      score = Math.round(crScore + cdScore + atkScore);
    }

    let grade = 'B';
    let gradeColor = 'text-slate-400 border-slate-700 bg-slate-900/60';
    if (score >= 90) {
      grade = 'SSS';
      gradeColor = 'text-amber-300 border-amber-500/50 bg-amber-950/40 shadow-amber-500/20';
    } else if (score >= 80) {
      grade = 'SS';
      gradeColor = 'text-purple-300 border-purple-500/50 bg-purple-950/40 shadow-purple-500/20';
    } else if (score >= 70) {
      grade = 'S';
      gradeColor = 'text-cyan-300 border-cyan-500/50 bg-cyan-950/40 shadow-cyan-500/20';
    } else if (score >= 55) {
      grade = 'A';
      gradeColor = 'text-emerald-300 border-emerald-500/50 bg-emerald-950/40 shadow-emerald-500/20';
    }

    return {
      finalAtk,
      critMultiplier,
      anomalyScalingMultiplier,
      estimatedAnomalyTriggerDmg,
      estimatedDisorderDmg,
      score,
      grade,
      gradeColor
    };
  }, [baseAtk, totalAtkPct, critRate, critDmg, anomalyProficiency, anomalyBuildupRate, dmgBonus, buildFocus]);

  const handleCopy = () => {
    const text = `ZZZ Drive Disc Build Analysis:
Focus: ${buildFocus.toUpperCase()} | Sets: 4-Pc ${DISC_SETS[fourPieceSet]?.name} + 2-Pc ${DISC_SETS[twoPieceSet]?.name}
Final ATK: ${analysis.finalAtk} | Anomaly Proficiency: ${anomalyProficiency}
Estimated Anomaly Trigger: ~${analysis.estimatedAnomalyTriggerDmg.toLocaleString()} DMG
Estimated Disorder Burst: ~${analysis.estimatedDisorderDmg.toLocaleString()} DMG
CRIT Ratio: ${critRate}% CR / ${critDmg}% CD (x${analysis.critMultiplier.toFixed(2)} Multiplier)
Build Rating: ${analysis.grade} (${analysis.score}/100 Quality Score)`;
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-800">
              ZZZ v1.4+ ENGINE
            </span>
            <span className="text-xs text-slate-400">Drive Disc & Anomaly Formula</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Drive Disc Set & Anomaly Build Optimizer
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Optimize 4-Piece + 2-Piece disc combinations, calculate Anomaly Proficiency scaling, and simulate Disorder burst damage.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Build'}
        </button>
      </div>

      {/* Archetype Toggle */}
      <div className="flex items-center gap-3 bg-slate-950/60 p-2 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setBuildFocus('anomaly')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            buildFocus === 'anomaly'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" /> Anomaly & Disorder Focus (Jane, Burnice, Yanagi)
        </button>
        <button
          onClick={() => setBuildFocus('crit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            buildFocus === 'crit'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Target className="w-4 h-4" /> Direct CRIT / Attack Focus (Ellen, Zhu Yuan, Miyabi)
        </button>
      </div>

      {/* Disc Sets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 4-Piece Set */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-purple-400 block">
            4-Piece Drive Disc Set
          </label>
          <select
            value={fourPieceSet}
            onChange={(e) => setFourPieceSet(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-bold"
          >
            {Object.entries(DISC_SETS).map(([key, val]) => (
              <option key={key} value={key}>{val.name} ({val.twoPiece})</option>
            ))}
          </select>
          <p className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800">
            <strong>4-Pc Bonus:</strong> {DISC_SETS[fourPieceSet]?.fourPiece}
          </p>
        </div>

        {/* 2-Piece Set */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
            2-Piece Drive Disc Set
          </label>
          <select
            value={twoPieceSet}
            onChange={(e) => setTwoPieceSet(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-bold"
          >
            {Object.entries(DISC_SETS).map(([key, val]) => (
              <option key={key} value={key}>{val.name} ({val.twoPiece})</option>
            ))}
          </select>
          <p className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800">
            <strong>2-Pc Bonus:</strong> {DISC_SETS[twoPieceSet]?.twoPiece}
          </p>
        </div>
      </div>

      {/* Stats Configuration Sliders & Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* ATK Stats */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Attack Power</span>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Base ATK (Agent + Engine)</span>
              <span className="font-bold text-white">{baseAtk}</span>
            </div>
            <input
              type="range"
              min={600}
              max={1100}
              value={baseAtk}
              onChange={(e) => setBaseAtk(parseInt(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total ATK % from Discs</span>
              <span className="font-bold text-amber-300">+{totalAtkPct}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={150}
              value={totalAtkPct}
              onChange={(e) => setTotalAtkPct(parseInt(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="pt-1 text-xs flex justify-between border-t border-slate-800">
            <span className="text-slate-400">Calculated Final ATK:</span>
            <span className="font-extrabold text-amber-300">{analysis.finalAtk}</span>
          </div>
        </div>

        {/* Anomaly Stats */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Anomaly Metrics</span>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Anomaly Proficiency (AP)</span>
              <span className="font-bold text-purple-300">{anomalyProficiency} AP</span>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              value={anomalyProficiency}
              onChange={(e) => setAnomalyProficiency(parseInt(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Anomaly Buildup Rate (Part. 6)</span>
              <span className="font-bold text-purple-300">+{anomalyBuildupRate}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              value={anomalyBuildupRate}
              onChange={(e) => setAnomalyBuildupRate(parseInt(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="pt-1 text-xs flex justify-between border-t border-slate-800">
            <span className="text-slate-400">AP Damage Multiplier:</span>
            <span className="font-extrabold text-purple-300">+{((analysis.anomalyScalingMultiplier - 1) * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* CRIT & DMG Bonus */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">CRIT & Element Bonus</span>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">CRIT Rate %</span>
              <span className="font-bold text-cyan-300">{critRate}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              value={critRate}
              onChange={(e) => setCritRate(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">CRIT DMG %</span>
              <span className="font-bold text-cyan-300">{critDmg}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={220}
              value={critDmg}
              onChange={(e) => setCritDmg(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="pt-1 text-xs flex justify-between border-t border-slate-800">
            <span className="text-slate-400">CRIT DPS Expectation:</span>
            <span className="font-extrabold text-cyan-300">{analysis.critMultiplier.toFixed(2)}x</span>
          </div>
        </div>
      </div>

      {/* Performance Output Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Grade */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center flex flex-col justify-center items-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Build Score Grade</span>
          <div className={`text-4xl font-black my-1 px-4 py-1 rounded-xl border ${analysis.gradeColor}`}>
            {analysis.grade}
          </div>
          <span className="text-xs text-slate-300 font-bold">{analysis.score} / 100 Quality</span>
        </div>

        {/* Anomaly Trigger Damage */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-purple-400 font-semibold uppercase">Single Anomaly Trigger</span>
          <div className="text-3xl font-black text-white mt-1">
            ~{analysis.estimatedAnomalyTriggerDmg.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Scales with {anomalyProficiency} AP + {analysis.finalAtk} ATK
          </span>
        </div>

        {/* Disorder Burst Damage */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-amber-400 font-semibold uppercase">Disorder Detonation Burst</span>
          <div className="text-3xl font-black text-amber-300 mt-1">
            ~{analysis.estimatedDisorderDmg.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Secondary anomaly trigger reaction
          </span>
        </div>

        {/* Partition 4/5/6 Recommendation */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between text-xs space-y-1">
          <span className="font-bold text-slate-300 uppercase tracking-wider">Optimal Partitions</span>
          <div className="text-slate-300 space-y-0.5">
            <div>• <strong>Disc 4:</strong> {buildFocus === 'anomaly' ? 'Anomaly Proficiency (+92)' : 'CRIT Rate / DMG'}</div>
            <div>• <strong>Disc 5:</strong> Elemental DMG Bonus (+30%)</div>
            <div>• <strong>Disc 6:</strong> {buildFocus === 'anomaly' ? 'Anomaly Buildup (+30%)' : 'ATK% or Energy'}</div>
          </div>
        </div>
      </div>

      {/* Mechanics Pro Tip */}
      <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-4 text-xs text-purple-200 space-y-1.5">
        <h4 className="font-bold text-purple-300 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-purple-400" /> How Disorder Reaction Works in ZZZ
        </h4>
        <p className="text-slate-300 leading-relaxed">
          When an enemy is already afflicted with an Anomaly (such as Burn or Shock) and you apply a different attribute Anomaly (like Assault or Corruption), the game triggers <strong>Disorder</strong>. Disorder consumes the remaining duration of the initial DoT and converts it into immediate burst damage multiplied by your second agent's Anomaly Proficiency!
        </p>
      </div>
    </div>
  );
}
