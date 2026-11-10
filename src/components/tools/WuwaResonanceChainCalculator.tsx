/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Coins, CheckCircle2
} from 'lucide-react';

interface SequenceNode {
  node: number;
  name: string;
  effect: string;
  stepMultiplierPct: number; // incremental DPS increase over prior node
  cumulativePct: number;     // cumulative DPS relative to S0 (100%)
  valueTier: 'Recommended F2P Stop' | 'QoL / Comfort' | 'Moderate DPS' | 'Whale Power Spike';
}

interface ResonatorConfig {
  id: string;
  name: string;
  element: string;
  weapon: string;
  role: string;
  recommendedStop: string;
  nodes: SequenceNode[];
}

const RESONATORS: ResonatorConfig[] = [
  {
    id: 'jinshi',
    name: 'Jinhsi',
    element: 'Spectro',
    weapon: 'Broadblade',
    role: 'Main DPS (Incandescence Hypercarry)',
    recommendedStop: 'S1 or S2 (S1 for +20% damage, S2 for instant 50 stacks out-of-combat)',
    nodes: [
      { node: 1, name: 'S1: Abyssal Surge', effect: 'Incarnation Basic Attack or Skill grants 1 stack of Herald of Jinshi, boosting next Skill damage by 20% (up to 4 stacks = 80%).', stepMultiplierPct: 22, cumulativePct: 122, valueTier: 'Recommended F2P Stop' },
      { node: 2, name: 'S2: Chrono Shift', effect: 'When out of combat for 4s, instantly gains 50 Incandescence stacks. Massive quality of life for open-world and Tower resets.', stepMultiplierPct: 14, cumulativePct: 139, valueTier: 'QoL / Comfort' },
      { node: 3, name: 'S3: Celestial Radiance', effect: 'Casting Intro Skill increases ATK by 25% for 12s.', stepMultiplierPct: 12, cumulativePct: 156, valueTier: 'Moderate DPS' },
      { node: 4, name: 'S4: Beneficent Benevolence', effect: 'Casting Resonance Liberation increases entire team Spectro and All-Attribute DMG by 20% for 20s.', stepMultiplierPct: 10, cumulativePct: 172, valueTier: 'Moderate DPS' },
      { node: 5, name: 'S5: Frostflame Convergence', effect: 'Resonance Liberation multiplier increased by 120%.', stepMultiplierPct: 18, cumulativePct: 203, valueTier: 'Whale Power Spike' },
      { node: 6, name: 'S6: Sovereign of Time', effect: 'Illuminous Epiphany damage multiplier increased by 45%, and Incandescence consumption scaling increased by 71%.', stepMultiplierPct: 35, cumulativePct: 274, valueTier: 'Whale Power Spike' },
    ]
  },
  {
    id: 'changli',
    name: 'Changli',
    element: 'Fusion',
    weapon: 'Sword',
    role: 'Main / Quickswap Burst DPS',
    recommendedStop: 'S2 (Grants massive +25% Crit Rate buff on Enflamement)',
    nodes: [
      { node: 1, name: 'S1: Hidden Thoughts', effect: 'Resonance Skill and Heavy Attack grant uninterrupted stance and boost DMG by 10%.', stepMultiplierPct: 11, cumulativePct: 111, valueTier: 'Moderate DPS' },
      { node: 2, name: 'S2: Purging Flame', effect: 'Acquiring Enflamement increases Crit Rate by 25% for 8s. Huge artifact stat budget relief!', stepMultiplierPct: 24, cumulativePct: 138, valueTier: 'Recommended F2P Stop' },
      { node: 3, name: 'S3: Ashen Crown', effect: 'Resonance Liberation DMG increased by 80%.', stepMultiplierPct: 15, cumulativePct: 159, valueTier: 'Moderate DPS' },
      { node: 4, name: 'S4: Polished Stratagem', effect: 'Intro Skill increases all team members ATK by 20% for 30s.', stepMultiplierPct: 8, cumulativePct: 172, valueTier: 'Moderate DPS' },
      { node: 5, name: 'S5: Flaming Plumage', effect: 'Heavy Attack: Flaming Sacrifice DMG multiplier increased by 50%, ignores interruptions.', stepMultiplierPct: 16, cumulativePct: 200, valueTier: 'Whale Power Spike' },
      { node: 6, name: 'S6: True Form Emergence', effect: 'Resonance Skill, Heavy Attack, and Liberation IGNORE 40% of target DEF.', stepMultiplierPct: 38, cumulativePct: 276, valueTier: 'Whale Power Spike' },
    ]
  },
  {
    id: 'jiyan',
    name: 'Jiyan',
    element: 'Aero',
    weapon: 'Broadblade',
    role: 'Main DPS (Qingloong Lance Hypercarry)',
    recommendedStop: 'S1 (Gives second charge of Windqueller skill + energy)',
    nodes: [
      { node: 1, name: 'S1: Roaring Dragon', effect: 'Windqueller skill can be cast 1 extra time (2 charges total) and reduces cooldown by 1s.', stepMultiplierPct: 19, cumulativePct: 119, valueTier: 'Recommended F2P Stop' },
      { node: 2, name: 'S2: Iron Will', effect: 'Entering battle or casting Intro Skill grants 30 Morale points instantly.', stepMultiplierPct: 12, cumulativePct: 133, valueTier: 'QoL / Comfort' },
      { node: 3, name: 'S3: Splendorous Aegis', effect: 'Casting Skill or Liberation increases Crit Rate by 16% and Crit DMG by 32% for 16s.', stepMultiplierPct: 22, cumulativePct: 162, valueTier: 'Whale Power Spike' },
      { node: 4, name: 'S4: Heavenly Spear', effect: 'Casting Outro Skill increases incoming Resonator Heavy Attack DMG by 25% for 30s.', stepMultiplierPct: 6, cumulativePct: 172, valueTier: 'Moderate DPS' },
      { node: 5, name: 'S5: Endless Horizon', effect: 'Resonance Liberation damage multiplier increased by 120%.', stepMultiplierPct: 15, cumulativePct: 198, valueTier: 'Whale Power Spike' },
      { node: 6, name: 'S6: Tempest Overlord', effect: 'Every Heavy Attack hit stacks Morale; Liberation final slash damage multiplier increased by up to 120%.', stepMultiplierPct: 32, cumulativePct: 261, valueTier: 'Whale Power Spike' },
    ]
  },
  {
    id: 'camellya',
    name: 'Camellya',
    element: 'Havoc',
    weapon: 'Sword',
    role: 'Main DPS (Crimson Bloom Stance)',
    recommendedStop: 'S2 (Blossom Explosion multiplier + Havoc shred)',
    nodes: [
      { node: 1, name: 'S1: Entangled Bloom', effect: 'Ephemeral mode movement speed +20% and Basic Attack string DMG increased by 18%.', stepMultiplierPct: 18, cumulativePct: 118, valueTier: 'Moderate DPS' },
      { node: 2, name: 'S2: Seed of Ruin', effect: 'Detonating Blossom seeds deals 40% increased Havoc damage and generates additional Concerto Energy.', stepMultiplierPct: 23, cumulativePct: 145, valueTier: 'Recommended F2P Stop' },
      { node: 3, name: 'S3: Crimson Petals', effect: 'Resonance Liberation multiplier increased by 75% and inflicts Havoc Deepen.', stepMultiplierPct: 14, cumulativePct: 165, valueTier: 'Moderate DPS' },
      { node: 4, name: 'S4: Sweet Scent', effect: 'Casting Intro increases entire team Havoc DMG by 25% for 20s.', stepMultiplierPct: 9, cumulativePct: 180, valueTier: 'Moderate DPS' },
      { node: 5, name: 'S5: Withered Garden', effect: 'Ephemeral attack chains gain +40% Crit DMG.', stepMultiplierPct: 16, cumulativePct: 209, valueTier: 'Whale Power Spike' },
      { node: 6, name: 'S6: Eternal Flowerbed', effect: 'All Havoc attacks ignore 35% of enemy DEF and Blossom seeds pulse repeatedly.', stepMultiplierPct: 36, cumulativePct: 284, valueTier: 'Whale Power Spike' },
    ]
  },
  {
    id: 'shorekeeper',
    name: 'Shorekeeper',
    element: 'Spectro',
    weapon: 'Rectifier',
    role: 'Universal Buffer / Sustainer',
    recommendedStop: 'S0 or S1 (Incredible at S0; S1 extends Stellar Realm duration by 10s)',
    nodes: [
      { node: 1, name: 'S1: Astral Flow', effect: 'Stellar Realm duration increased by 10s and area radius expanded by 50%.', stepMultiplierPct: 15, cumulativePct: 115, valueTier: 'Recommended F2P Stop' },
      { node: 2, name: 'S2: Binary Echo', effect: 'Outer Ring of Stellar Realm grants active Resonators +40% ATK for 20s.', stepMultiplierPct: 22, cumulativePct: 140, valueTier: 'Whale Power Spike' },
      { node: 3, name: 'S3: Origin Pulse', effect: 'Resonance Liberation energy refund increased by 20 and healing frequency doubled.', stepMultiplierPct: 8, cumulativePct: 151, valueTier: 'QoL / Comfort' },
      { node: 4, name: 'S4: Beacon Wave', effect: 'Provides a second chance revival for fallen team members with 100% HP every 10 minutes.', stepMultiplierPct: 5, cumulativePct: 159, valueTier: 'QoL / Comfort' },
      { node: 5, name: 'S5: Cosmic Bloom', effect: 'Resonance Skill grants team members +15% Spectro Deepen and damage immunity for 3s.', stepMultiplierPct: 12, cumulativePct: 178, valueTier: 'Moderate DPS' },
      { node: 6, name: 'S6: Singularity Cradle', effect: 'Stellar Realm grants active Resonator guaranteed +100% Crit Rate on Intro Skill and +50% Crit DMG.', stepMultiplierPct: 28, cumulativePct: 228, valueTier: 'Whale Power Spike' },
    ]
  },
  {
    id: 'yinlin',
    name: 'Yinlin',
    element: 'Electro',
    weapon: 'Rectifier',
    role: 'Sub-DPS / Electro Buffer',
    recommendedStop: 'S1 or S2 (S1 adds +70% Skill multiplier)',
    nodes: [
      { node: 1, name: 'S1: Morbid Eye', effect: 'Resonance Skill Magnetic Roar and Lightning Execution DMG increased by 70%.', stepMultiplierPct: 21, cumulativePct: 121, valueTier: 'Recommended F2P Stop' },
      { node: 2, name: 'S2: Ensnared Heart', effect: 'Electromagnetic Blast restores 5 Judgement Points and 5 Resonance Energy upon hit.', stepMultiplierPct: 12, cumulativePct: 136, valueTier: 'QoL / Comfort' },
      { node: 3, name: 'S3: Rhythmic Pulse', effect: 'Forte Circuit Judgment Strike DMG multiplier increased by 55%.', stepMultiplierPct: 16, cumulativePct: 158, valueTier: 'Moderate DPS' },
      { node: 4, name: 'S4: Polarity Shift', effect: 'When Judgement Strike hits, increases all team members ATK by 20% for 12s.', stepMultiplierPct: 11, cumulativePct: 175, valueTier: 'Moderate DPS' },
      { node: 5, name: 'S5: Resonant Strings', effect: 'Resonance Liberation deals 100% additional damage to targets marked with Sinner\'s Mark.', stepMultiplierPct: 17, cumulativePct: 205, valueTier: 'Whale Power Spike' },
      { node: 6, name: 'S6: Web of Puppets', effect: 'Casting Liberation triggers furious puppet strikes on basic attacks, dealing 419% Electro DMG 4 times.', stepMultiplierPct: 34, cumulativePct: 275, valueTier: 'Whale Power Spike' },
    ]
  }
];

export default function WuwaResonanceChainCalculator() {
  const [selectedCharId, setSelectedCharId] = useState<string>('jinshi');
  const [currentSequence, setCurrentSequence] = useState<number>(0);
  const [targetSequence, setTargetSequence] = useState<number>(2);
  const [coralBalance, setCoralBalance] = useState<number>(180);
  const [copied, setCopied] = useState<boolean>(false);

  const character = useMemo(() => {
    return RESONATORS.find(r => r.id === selectedCharId) || RESONATORS[0];
  }, [selectedCharId]);

  // Coral Shop logic: 270 Afterglow Corals per waveband (limit 2 per banner run)
  const CORAL_COST_PER_WAVEBAND = 270;

  const comparison = useMemo(() => {
    const s0Base = 100;
    const currentMulti = currentSequence === 0 
      ? 100 
      : (character.nodes[currentSequence - 1]?.cumulativePct || 100);

    const targetMulti = targetSequence === 0 
      ? 100 
      : (character.nodes[targetSequence - 1]?.cumulativePct || 100);

    const netDamageGainPct = Math.round(((targetMulti / currentMulti) - 1) * 100);
    const wavebandsNeeded = Math.max(0, targetSequence - currentSequence);

    const coralCopiesPossible = Math.min(2, wavebandsNeeded);
    const coralsNeeded = coralCopiesPossible * CORAL_COST_PER_WAVEBAND;
    const coralDeficit = Math.max(0, coralsNeeded - coralBalance);
    const gachaCopiesNeeded = wavebandsNeeded - coralCopiesPossible;

    return {
      currentMulti,
      targetMulti,
      netDamageGainPct,
      wavebandsNeeded,
      coralCopiesPossible,
      coralsNeeded,
      coralDeficit,
      gachaCopiesNeeded
    };
  }, [character, currentSequence, targetSequence, coralBalance]);

  const handleCopy = () => {
    const text = `Wuthering Waves Resonance Chain Analysis:
Character: ${character.name} (${character.element})
Current Node: S${currentSequence} (${comparison.currentMulti}% DPS)
Target Node: S${targetSequence} (${comparison.targetMulti}% DPS)
Net Overall Damage Gain: +${comparison.netDamageGainPct}%
Wavebands Needed: ${comparison.wavebandsNeeded}
Recommended Stop: ${character.recommendedStop}
Coral Shop: ${comparison.coralCopiesPossible} copies via ${comparison.coralsNeeded} Afterglow Corals (${comparison.coralDeficit > 0 ? `Deficit: ${comparison.coralDeficit}` : 'Secured'})`;
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
              S0 TO S6 MULTIPLIER MATRIX
            </span>
            <span className="text-xs text-slate-400">Afterglow Coral Shop Integration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Resonance Chain (Dupe) Damage Multiplier
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Calculate exact percentage DPS scaling for duplicate sequence nodes and evaluate F2P vs Whale stopping points.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Analysis'}
        </button>
      </div>

      {/* Resonator Selector Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Resonator</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {RESONATORS.map(res => (
            <button
              key={res.id}
              onClick={() => {
                setSelectedCharId(res.id);
                setCurrentSequence(0);
                setTargetSequence(2);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedCharId === res.id
                  ? 'bg-cyan-950/80 border-cyan-500 shadow-md ring-1 ring-cyan-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="font-extrabold text-sm text-white">{res.name}</div>
              <div className="text-[11px] text-cyan-300">{res.element} · {res.weapon}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Target Selector & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Node Level Pickers */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Sequence</label>
            <div className="grid grid-cols-7 gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map(s => (
                <button
                  key={s}
                  onClick={() => {
                    setCurrentSequence(s);
                    if (targetSequence < s) setTargetSequence(s);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    currentSequence === s
                      ? 'bg-blue-600 text-white font-black'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  S{s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Sequence</label>
            <div className="grid grid-cols-7 gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map(s => (
                <button
                  key={s}
                  onClick={() => setTargetSequence(Math.max(s, currentSequence))}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    targetSequence === s
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  S{s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-slate-400">Afterglow Corals in Inventory</label>
            <input
              type="number"
              min={0}
              value={coralBalance}
              onChange={(e) => setCoralBalance(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[10px] text-slate-500">270 Corals buys 1 Waveband in shop (max 2/event).</p>
          </div>
        </div>

        {/* DPS Multiplier Result Card */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Calculated Damage Growth</span>
            <div className="text-4xl font-black text-cyan-300 mt-2">
              +{comparison.netDamageGainPct}% <span className="text-xs font-bold text-slate-400">Total DPS</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Scales from S{currentSequence} ({comparison.currentMulti}%) to S{targetSequence} ({comparison.targetMulti}% of S0 baseline).
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Wavebands Needed:</span>
              <span className="font-bold text-white">{comparison.wavebandsNeeded} Duplicates</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Coral Shop Redemptions:</span>
              <span className="font-bold text-amber-300">{comparison.coralCopiesPossible} Wavebands ({comparison.coralsNeeded} Corals)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Gacha Pulls Needed:</span>
              <span className="font-bold text-cyan-300">{comparison.gachaCopiesNeeded} Direct Pulls</span>
            </div>
          </div>
        </div>

        {/* Recommendation Box */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expert Recommendation</span>
            <h4 className="text-sm font-bold text-cyan-200 mt-1">{character.recommendedStop}</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Sequence nodes provide exponential scaling in Wuthering Waves, but characters at S0 already clear Hazard Zone with full 30/30 crests when paired with optimal Echoes.
            </p>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
            <span className="font-bold text-amber-300 block">Coral Shop Pro Tip:</span>
            Save 270 Afterglow Corals from lost 50/50s to guarantee a crucial S1/S2 power spike without spending Astrite!
          </div>
        </div>
      </div>

      {/* Sequence Node List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" /> Sequence Nodes Breakdown (S1 - S6)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {character.nodes.map((node) => {
            const isUnlocked = node.node <= targetSequence;
            return (
              <div 
                key={node.node}
                className={`p-4 rounded-xl border transition-all ${
                  isUnlocked 
                    ? 'bg-slate-950/90 border-cyan-500/40 shadow-sm' 
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      isUnlocked ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {node.node}
                    </span>
                    <span className="text-sm font-bold text-white">{node.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    node.valueTier === 'Recommended F2P Stop' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    node.valueTier === 'Whale Power Spike' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {node.valueTier}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {node.effect}
                </p>

                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">Step Multiplier: <strong className="text-cyan-300">+{node.stepMultiplierPct}%</strong></span>
                  <span className="text-slate-400">Cumulative vs S0: <strong className="text-amber-300">{node.cumulativePct}%</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
