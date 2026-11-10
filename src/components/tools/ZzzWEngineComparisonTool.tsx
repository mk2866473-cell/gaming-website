/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Scale, ArrowRight, Swords
} from 'lucide-react';

interface WEngineData {
  id: string;
  name: string;
  rank: 'S' | 'A';
  specialty: 'Attack' | 'Stun' | 'Anomaly' | 'Support' | 'Defense';
  baseAtk60: number;
  substatType: string;
  substatVal60: string;
  r1Passive: string;
  r5Passive: string;
  passiveDmgMultiplierR1: number; // % damage contribution
  passiveDmgMultiplierR5: number;
}

const W_ENGINES: WEngineData[] = [
  {
    id: 'deep_sea_visitor',
    name: 'Deep Sea Visitor',
    rank: 'S',
    specialty: 'Attack',
    baseAtk60: 713,
    substatType: 'CRIT Rate',
    substatVal60: '24.0%',
    r1Passive: 'Increases Ice DMG by 25%. Basic Attack deals +10% CRIT Rate, Dash Attack deals +10% CRIT Rate for 8s.',
    r5Passive: 'Increases Ice DMG by 40%. Basic Attack deals +16% CRIT Rate, Dash Attack deals +16% CRIT Rate for 8s.',
    passiveDmgMultiplierR1: 35,
    passiveDmgMultiplierR5: 56
  },
  {
    id: 'the_brimstone',
    name: 'The Brimstone',
    rank: 'S',
    specialty: 'Attack',
    baseAtk60: 684,
    substatType: 'ATK %',
    substatVal60: '30.0%',
    r1Passive: 'Hitting an enemy with Basic Attack, Dash Attack, or Dodge Counter increases ATK by 3.5% for 8s, stacking up to 8 times (+28% ATK).',
    r5Passive: 'Increases ATK by 5.6% per stack up to 8 times (+44.8% ATK).',
    passiveDmgMultiplierR1: 28,
    passiveDmgMultiplierR5: 45
  },
  {
    id: 'starlight_engine',
    name: 'Starlight Engine (F2P Craftable)',
    rank: 'A',
    specialty: 'Attack',
    baseAtk60: 594,
    substatType: 'ATK %',
    substatVal60: '25.0%',
    r1Passive: 'Launching a Dodge Counter or Quick Assist increases the equipper\'s ATK by 12% for 12s.',
    r5Passive: 'Launching a Dodge Counter or Quick Assist increases the equipper\'s ATK by 19.2% for 12s.',
    passiveDmgMultiplierR1: 12,
    passiveDmgMultiplierR5: 19.2
  },
  {
    id: 'sharpened_stinger',
    name: 'Sharpened Stinger',
    rank: 'S',
    specialty: 'Anomaly',
    baseAtk60: 713,
    substatType: 'Anomaly Proficiency',
    substatVal60: '90 AP',
    r1Passive: 'Physical DMG +20%. Triggering Assault or EX Special grants Predatory stacks, increasing Anomaly Buildup by 35%.',
    r5Passive: 'Physical DMG +32%. Predatory stacks increase Anomaly Buildup by 56%.',
    passiveDmgMultiplierR1: 32,
    passiveDmgMultiplierR5: 52
  },
  {
    id: 'electro_lip_gloss',
    name: 'Electro-Lip Gloss (Battle Pass)',
    rank: 'A',
    specialty: 'Anomaly',
    baseAtk60: 594,
    substatType: 'Anomaly Proficiency',
    substatVal60: '75 AP',
    r1Passive: 'When an enemy is inflicted with an Attribute Anomaly, increases equipper ATK by 10% and additional DMG to target by 15%.',
    r5Passive: 'Increases equipper ATK by 16% and additional DMG by 24%.',
    passiveDmgMultiplierR1: 22,
    passiveDmgMultiplierR5: 35
  },
  {
    id: 'weeping_gemini',
    name: 'Weeping Gemini (F2P Craftable)',
    rank: 'A',
    specialty: 'Anomaly',
    baseAtk60: 594,
    substatType: 'ATK %',
    substatVal60: '25.0%',
    r1Passive: 'When any squad member inflicts an Anomaly, equipper gains 30 Anomaly Proficiency for 30s, stacking up to 4 times (120 AP).',
    r5Passive: 'Gains 48 Anomaly Proficiency per stack up to 4 times (192 AP).',
    passiveDmgMultiplierR1: 24,
    passiveDmgMultiplierR5: 38
  },
  {
    id: 'the_restrained',
    name: 'The Restrained',
    rank: 'S',
    specialty: 'Stun',
    baseAtk60: 684,
    substatType: 'Impact %',
    substatVal60: '18.0%',
    r1Passive: 'When hitting an enemy with Basic Attacks, increases Daze dealt by 6% for 8s, stacking up to 5 times (+30% Daze).',
    r5Passive: 'Increases Daze dealt by 9.6% per stack up to 5 times (+48% Daze).',
    passiveDmgMultiplierR1: 30,
    passiveDmgMultiplierR5: 48
  },
  {
    id: 'demara_battery',
    name: 'Demara Battery Mark II',
    rank: 'A',
    specialty: 'Stun',
    baseAtk60: 594,
    substatType: 'Impact %',
    substatVal60: '15.0%',
    r1Passive: 'Increases Electric DMG by 15%. Launching a Dodge Counter or Assist Attack increases Energy Regen by 18% for 8s.',
    r5Passive: 'Increases Electric DMG by 24% and Energy Regen by 28.8% for 8s.',
    passiveDmgMultiplierR1: 15,
    passiveDmgMultiplierR5: 24
  }
];

export default function ZzzWEngineComparisonTool() {
  const [engineAId, setEngineAId] = useState<string>('deep_sea_visitor');
  const [engineBId, setEngineBId] = useState<string>('starlight_engine');
  const [rankA, setRankA] = useState<number>(1);
  const [rankB, setRankB] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  const engineA = useMemo(() => W_ENGINES.find(e => e.id === engineAId) || W_ENGINES[0], [engineAId]);
  const engineB = useMemo(() => W_ENGINES.find(e => e.id === engineBId) || W_ENGINES[2], [engineBId]);

  const comparison = useMemo(() => {
    // Effective power index
    const passMultiA = rankA === 5 ? engineA.passiveDmgMultiplierR5 : engineA.passiveDmgMultiplierR1;
    const passMultiB = rankB === 5 ? engineB.passiveDmgMultiplierR5 : engineB.passiveDmgMultiplierR1;

    const powerIndexA = Math.round(engineA.baseAtk60 * (1 + passMultiA / 100));
    const powerIndexB = Math.round(engineB.baseAtk60 * (1 + passMultiB / 100));

    const diffPct = Number((((powerIndexA - powerIndexB) / powerIndexB) * 100).toFixed(1));

    return {
      passMultiA,
      passMultiB,
      powerIndexA,
      powerIndexB,
      diffPct
    };
  }, [engineA, engineB, rankA, rankB]);

  const handleCopy = () => {
    const text = `ZZZ W-Engine Comparison:
Engine A: ${engineA.name} (R${rankA}) - Base ATK: ${engineA.baseAtk60} | Sub: ${engineA.substatVal60} ${engineA.substatType}
Engine B: ${engineB.name} (R${rankB}) - Base ATK: ${engineB.baseAtk60} | Sub: ${engineB.substatVal60} ${engineB.substatType}
Comparison: ${engineA.name} R${rankA} is ${Math.abs(comparison.diffPct)}% ${comparison.diffPct >= 0 ? 'stronger than' : 'weaker than'} ${engineB.name} R${rankB}!`;
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
              W-ENGINE COMBAT MATRIX
            </span>
            <span className="text-xs text-slate-400">Signature vs F2P A-Rank R5 Analysis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            W-Engine Side-by-Side Comparison Tool
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Compare Base ATK, secondary stats, and passive damage multipliers across R1 to R5 modifications.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Comparison'}
        </button>
      </div>

      {/* Side-by-Side Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Engine A */}
        <div className="bg-slate-950/70 p-5 rounded-xl border border-amber-500/40 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Engine A (Primary)</span>
            <div className="flex items-center gap-1">
              {[1, 5].map(r => (
                <button
                  key={r}
                  onClick={() => setRankA(r)}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${
                    rankA === r ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  R{r}
                </button>
              ))}
            </div>
          </div>

          <select
            value={engineAId}
            onChange={(e) => setEngineAId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-bold"
          >
            {W_ENGINES.map(e => (
              <option key={e.id} value={e.id}>[{e.rank}-Rank] {e.name} ({e.specialty})</option>
            ))}
          </select>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Level 60 Base ATK:</span>
              <span className="font-bold text-white">{engineA.baseAtk60}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Secondary Stat:</span>
              <span className="font-bold text-amber-300">{engineA.substatVal60} {engineA.substatType}</span>
            </div>
            <div className="pt-1">
              <span className="text-slate-400 block mb-1">R{rankA} Passive Effect:</span>
              <p className="text-slate-300 bg-slate-900/60 p-2 rounded leading-relaxed">
                {rankA === 5 ? engineA.r5Passive : engineA.r1Passive}
              </p>
            </div>
          </div>
        </div>

        {/* Engine B */}
        <div className="bg-slate-950/70 p-5 rounded-xl border border-cyan-500/40 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Engine B (Competitor)</span>
            <div className="flex items-center gap-1">
              {[1, 5].map(r => (
                <button
                  key={r}
                  onClick={() => setRankB(r)}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${
                    rankB === r ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  R{r}
                </button>
              ))}
            </div>
          </div>

          <select
            value={engineBId}
            onChange={(e) => setEngineBId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-bold"
          >
            {W_ENGINES.map(e => (
              <option key={e.id} value={e.id}>[{e.rank}-Rank] {e.name} ({e.specialty})</option>
            ))}
          </select>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Level 60 Base ATK:</span>
              <span className="font-bold text-white">{engineB.baseAtk60}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Secondary Stat:</span>
              <span className="font-bold text-cyan-300">{engineB.substatVal60} {engineB.substatType}</span>
            </div>
            <div className="pt-1">
              <span className="text-slate-400 block mb-1">R{rankB} Passive Effect:</span>
              <p className="text-slate-300 bg-slate-900/60 p-2 rounded leading-relaxed">
                {rankB === 5 ? engineB.r5Passive : engineB.r1Passive}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Difference Outcome Card */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Effective Combat Damage Difference
        </span>
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl font-black text-white">
            {comparison.diffPct >= 0 ? `+${comparison.diffPct}%` : `${comparison.diffPct}%`}
          </span>
          <span className="text-sm font-bold text-amber-300">
            {comparison.diffPct >= 0 
              ? `${engineA.name} R${rankA} Advantage`
              : `${engineB.name} R${rankB} Advantage`}
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          While S-Rank Signature engines have higher Base ATK (684–713 vs 594), an A-Rank W-Engine at <strong>R5 (Overclock 5)</strong> significantly narrows the performance gap, making craftable weapons like Starlight Engine R5 or Weeping Gemini R5 exceptional F2P choices!
        </p>
      </div>
    </div>
  );
}
