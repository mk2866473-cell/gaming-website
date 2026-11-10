/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Target, Swords, Gauge, Flame
} from 'lucide-react';

interface StunAgentConfig {
  id: string;
  name: string;
  attribute: string;
  baseImpact: number;
  bonusStunMultiplierPct: number; // e.g. Qingyi +80%, Lycaon +35%
  mechanic: string;
  signatureEngine: string;
}

const STUN_AGENTS: StunAgentConfig[] = [
  {
    id: 'qingyi',
    name: 'Qingyi',
    attribute: 'Electric',
    baseImpact: 123,
    bonusStunMultiplierPct: 80,
    mechanic: 'Subjugation Stacks: Every basic attack charge stacks Subjugation, increasing the enemy\'s Stun DMG Multiplier by up to +80% (total 230%!).',
    signatureEngine: 'Ice-Jade Teapot'
  },
  {
    id: 'lycaon',
    name: 'Von Lycaon',
    attribute: 'Ice',
    baseImpact: 126,
    bonusStunMultiplierPct: 35,
    mechanic: 'Suppression: Charging EX Special and Basic Attacks inflicts 10% more Daze and adds +35% to target\'s Stun DMG Multiplier.',
    signatureEngine: 'The Restrained'
  },
  {
    id: 'koleda',
    name: 'Koleda',
    attribute: 'Fire',
    baseImpact: 122,
    bonusStunMultiplierPct: 0,
    mechanic: 'Explosive Hammer: Coordinated combo with Ben grants massive burst daze and complete invulnerability frames during EX Special.',
    signatureEngine: 'Hellfire Gears'
  },
  {
    id: 'anby',
    name: 'Anby Demara',
    attribute: 'Electric',
    baseImpact: 114,
    bonusStunMultiplierPct: 0,
    mechanic: 'Thunderbolt Slash: 3rd Basic Attack followed by EX Special produces rapid daze buildup on low field time.',
    signatureEngine: 'Demara Battery Mark II'
  }
];

export default function ZzzDazeStunCalculator() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('qingyi');
  const [hasDisc6Impact, setHasDisc6Impact] = useState<boolean>(true); // +18%
  const [hasShockstar2Pc, setHasShockstar2Pc] = useState<boolean>(true); // +6%
  const [hasShockstar4Pc, setHasShockstar4Pc] = useState<boolean>(true); // +20% Daze on basics/dash
  const [wengineImpactBonus, setWengineImpactBonus] = useState<number>(16); // e.g. 16% from engine
  const [qingyiSubjugationStacks, setQingyiSubjugationStacks] = useState<number>(20); // 0-20 stacks (each gives 4% stun multi)
  const [enemyType, setEnemyType] = useState<'boss' | 'elite' | 'normal'>('boss');
  const [copied, setCopied] = useState<boolean>(false);

  const agent = useMemo(() => {
    return STUN_AGENTS.find(a => a.id === selectedAgentId) || STUN_AGENTS[0];
  }, [selectedAgentId]);

  const stunMetrics = useMemo(() => {
    // Total Impact Calculation
    let totalImpactBonusPct = 0;
    if (hasDisc6Impact) totalImpactBonusPct += 18;
    if (hasShockstar2Pc) totalImpactBonusPct += 6;
    totalImpactBonusPct += wengineImpactBonus;

    const finalImpact = Math.round(agent.baseImpact * (1 + totalImpactBonusPct / 100));

    // Stun Damage Multiplier
    // Base Stun Multiplier in ZZZ is 150% (1.5x damage taken during stun)
    const baseStunMultiplier = 150;
    let agentBonusMulti = 0;

    if (agent.id === 'qingyi') {
      agentBonusMulti = Math.min(80, qingyiSubjugationStacks * 4); // max 80%
    } else if (agent.id === 'lycaon') {
      agentBonusMulti = 35; // +35% from core passive
    }

    const finalStunMultiplier = baseStunMultiplier + agentBonusMulti;

    // Daze Buildup per second / rotation
    // Shockstar 4-piece adds +20% Daze to Basic/Dash/Counter
    const dazeEffModifier = 1 + (hasShockstar4Pc ? 0.20 : 0);
    const dazePerSpecial = Math.round(finalImpact * 2.4 * dazeEffModifier);
    const dazePerBasicString = Math.round(finalImpact * 1.8 * dazeEffModifier);

    // Enemy Daze Gauge
    const enemyDazeThreshold = enemyType === 'boss' ? 2400 : enemyType === 'elite' ? 1400 : 600;
    const chainAttackCount = enemyType === 'boss' ? 3 : enemyType === 'elite' ? 2 : 1;

    const specialsToStun = Math.ceil(enemyDazeThreshold / Math.max(1, dazePerSpecial));
    const secondsToStun = Number(((specialsToStun * 3.5)).toFixed(1)); // approximate combat seconds

    const netDamageGainDuringStun = finalStunMultiplier - 100; // e.g. 230% - 100% = +130% extra damage

    return {
      finalImpact,
      totalImpactBonusPct,
      finalStunMultiplier,
      agentBonusMulti,
      dazePerSpecial,
      dazePerBasicString,
      enemyDazeThreshold,
      chainAttackCount,
      specialsToStun,
      secondsToStun,
      netDamageGainDuringStun
    };
  }, [agent, hasDisc6Impact, hasShockstar2Pc, hasShockstar4Pc, wengineImpactBonus, qingyiSubjugationStacks, enemyType]);

  const handleCopy = () => {
    const text = `ZZZ Daze & Stun Analysis:
Agent: ${agent.name} (${agent.attribute}) | Final Impact: ${stunMetrics.finalImpact} (+${stunMetrics.totalImpactBonusPct}%)
Stun Multiplier: ${stunMetrics.finalStunMultiplier}% (+${stunMetrics.agentBonusMulti}% agent bonus)
Target: ${enemyType.toUpperCase()} (${stunMetrics.enemyDazeThreshold} Daze Gauge)
Chain Attacks Triggered: ${stunMetrics.chainAttackCount} Chain Attacks
Estimated Time to Stun: ~${stunMetrics.secondsToStun}s (${stunMetrics.specialsToStun} EX Specials)
Burst Amplification: Enemies take +${stunMetrics.netDamageGainDuringStun}% damage while stunned!`;
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
              STUN MULTIPLIER ENGINE
            </span>
            <span className="text-xs text-slate-400">Impact & Chain Attack Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Daze & Stun Multiplier Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Calculate Daze accumulation speed, optimize Stun Agent Impact%, and maximize Stun Vulnerability Multipliers up to 230%.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Stun Stats'}
        </button>
      </div>

      {/* Stun Agent Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Stun Agent</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STUN_AGENTS.map(a => (
            <button
              key={a.id}
              onClick={() => setSelectedAgentId(a.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedAgentId === a.id
                  ? 'bg-amber-950/80 border-amber-500 shadow-md ring-1 ring-amber-500'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-extrabold text-sm text-white">{a.name}</div>
              <div className="text-[11px] text-amber-300">{a.attribute} Stun · Base {a.baseImpact} Impact</div>
            </button>
          ))}
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gear Impact Configuration */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Impact Gear & Discs
          </span>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
            <span className="text-xs text-slate-300">Partition 6 Main Stat: Impact (+18%)</span>
            <input
              type="checkbox"
              checked={hasDisc6Impact}
              onChange={(e) => setHasDisc6Impact(e.target.checked)}
              className="accent-amber-400 rounded w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
            <span className="text-xs text-slate-300">2-Pc Shockstar Disco (+6% Impact)</span>
            <input
              type="checkbox"
              checked={hasShockstar2Pc}
              onChange={(e) => setHasShockstar2Pc(e.target.checked)}
              className="accent-amber-400 rounded w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
            <span className="text-xs text-slate-300">4-Pc Shockstar (+20% Daze on Attacks)</span>
            <input
              type="checkbox"
              checked={hasShockstar4Pc}
              onChange={(e) => setHasShockstar4Pc(e.target.checked)}
              className="accent-amber-400 rounded w-4 h-4 cursor-pointer"
            />
          </label>

          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">W-Engine Impact Bonus %</span>
              <span className="font-bold text-amber-300">+{wengineImpactBonus}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={wengineImpactBonus}
              onChange={(e) => setWengineImpactBonus(parseInt(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>

        {/* Agent Special Mechanics */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            {agent.name} Passive Tuning
          </span>

          {agent.id === 'qingyi' && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Subjugation Stacks (0-20)</span>
                <span className="font-bold text-amber-400">{qingyiSubjugationStacks} Stacks (+{qingyiSubjugationStacks * 4}%)</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={qingyiSubjugationStacks}
                onChange={(e) => setQingyiSubjugationStacks(parseInt(e.target.value))}
                className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">
                At 20 stacks, Qingyi boosts the enemy's Stun Multiplier from 150% to an incredible 230%!
              </p>
            </div>
          )}

          {agent.id === 'lycaon' && (
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-cyan-300">Lycaon Core Passive: +35% Stun Multiplier</div>
              <p className="text-[11px] text-slate-400">
                Charged attacks automatically push the base 150% Stun Multiplier to 185% on all stunned targets!
              </p>
            </div>
          )}

          <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <span className="font-bold text-amber-300 block mb-1">Agent Signature Mechanic:</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">{agent.mechanic}</p>
          </div>
        </div>

        {/* Enemy Stun Profile */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Enemy Stun Profile
          </span>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'boss', label: 'Boss Encounter', daze: '2,400' },
              { id: 'elite', label: 'Elite Mob', daze: '1,400' },
              { id: 'normal', label: 'Common Mob', daze: '600' }
            ].map(e => (
              <button
                key={e.id}
                onClick={() => setEnemyType(e.id as any)}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-all ${
                  enemyType === e.id
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Daze Threshold:</span>
              <span className="font-bold text-white">{stunMetrics.enemyDazeThreshold} Daze</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Chain Attacks:</span>
              <span className="font-bold text-cyan-300">{stunMetrics.chainAttackCount} Chain Reactions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Final Impact */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Effective Impact</span>
          <div className="text-3xl font-black text-amber-300 mt-1">
            {stunMetrics.finalImpact}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            +{stunMetrics.totalImpactBonusPct}% Gear & Engine Amp
          </span>
        </div>

        {/* Stun Multiplier */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Stun DMG Multiplier</span>
          <div className="text-3xl font-black text-cyan-300 mt-1">
            {stunMetrics.finalStunMultiplier}%
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            150% Base + {stunMetrics.agentBonusMulti}% Agent Bonus
          </span>
        </div>

        {/* Time to Stun */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Time to Stun</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            ~{stunMetrics.secondsToStun}s
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            ~{stunMetrics.specialsToStun} EX Special attack strings
          </span>
        </div>

        {/* Burst Damage Boost */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center flex flex-col justify-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Stun Damage Vulnerability</span>
          <div className="text-2xl font-black text-white mt-1">
            +{stunMetrics.netDamageGainDuringStun}% DMG
          </div>
          <span className="text-[11px] text-amber-300 block mt-1 font-semibold">
            All squad attacks deal {stunMetrics.finalStunMultiplier / 100}x damage!
          </span>
        </div>
      </div>
    </div>
  );
}
