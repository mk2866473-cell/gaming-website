/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Users, CheckCircle2, XCircle, Heart, Flame
} from 'lucide-react';

interface BangbooDef {
  id: string;
  name: string;
  rank: 'S' | 'A';
  synergyCondition: string;
  requiredFaction?: string;
  requiredAttribute?: string;
  activeSkill: string;
  passiveBonus: string;
  chainAttackDmg: number; // % multiplier
}

interface AgentProfile {
  id: string;
  name: string;
  faction: string;
  attribute: string;
}

const AGENTS: AgentProfile[] = [
  { id: 'ellen', name: 'Ellen Joe', faction: 'Victoria Housekeeping', attribute: 'Ice' },
  { id: 'lycaon', name: 'Von Lycaon', faction: 'Victoria Housekeeping', attribute: 'Ice' },
  { id: 'soukaku', name: 'Soukaku', faction: 'Section 6', attribute: 'Ice' },
  { id: 'zhu_yuan', name: 'Zhu Yuan', faction: 'Criminal Investigation', attribute: 'Ether' },
  { id: 'qingyi', name: 'Qingyi', faction: 'Criminal Investigation', attribute: 'Electric' },
  { id: 'seth', name: 'Seth Lowell', faction: 'Criminal Investigation', attribute: 'Electric' },
  { id: 'jane', name: 'Jane Doe', faction: 'Criminal Investigation', attribute: 'Physical' },
  { id: 'burnice', name: 'Burnice White', faction: 'Sons of Calydon', attribute: 'Fire' },
  { id: 'caesar', name: 'Caesar King', faction: 'Sons of Calydon', attribute: 'Physical' },
  { id: 'piper', name: 'Piper Wheel', faction: 'Sons of Calydon', attribute: 'Physical' },
  { id: 'soldier11', name: 'Soldier 11', faction: 'Obol Squad', attribute: 'Fire' },
  { id: 'koleda', name: 'Koleda Belobog', faction: 'Belobog Heavy Industries', attribute: 'Fire' },
  { id: 'ben', name: 'Ben Bigger', faction: 'Belobog Heavy Industries', attribute: 'Fire' },
  { id: 'grace', name: 'Grace Howard', faction: 'Belobog Heavy Industries', attribute: 'Electric' },
  { id: 'rina', name: 'Alexandrina (Rina)', faction: 'Victoria Housekeeping', attribute: 'Electric' },
  { id: 'anby', name: 'Anby Demara', faction: 'Cunning Hares', attribute: 'Electric' },
  { id: 'billy', name: 'Billy Kid', faction: 'Cunning Hares', attribute: 'Physical' },
  { id: 'nicole', name: 'Nicole Demara', faction: 'Cunning Hares', attribute: 'Ether' },
];

const BANGBOOS: BangbooDef[] = [
  {
    id: 'resonaboo',
    name: 'Resonaboo',
    rank: 'S',
    synergyCondition: 'Requires at least 2 Ether Agents in squad',
    requiredAttribute: 'Ether',
    activeSkill: 'Tosses a gravitational singularity device that gathers enemies and deals sustained Ether DMG.',
    passiveBonus: 'When squad has 2+ Ether Agents: Mini Black Hole duration +30% and Ether Anomaly buildup +100%.',
    chainAttackDmg: 820
  },
  {
    id: 'sharkboo',
    name: 'Sharkboo',
    rank: 'S',
    synergyCondition: 'Requires at least 2 Ice Agents or 2 Victoria Housekeeping Agents',
    requiredAttribute: 'Ice',
    requiredFaction: 'Victoria Housekeeping',
    activeSkill: 'Summons a mechanical shark that swims through the ground and bites enemies, dealing massive Ice DMG.',
    passiveBonus: 'When condition met: Shark trap damage +45% and inflicts +100% Ice Anomaly Buildup.',
    chainAttackDmg: 860
  },
  {
    id: 'rocketboo',
    name: 'Rocketboo',
    rank: 'S',
    synergyCondition: 'Requires at least 2 Fire Agents or 2 Belobog Heavy Industries Agents',
    requiredAttribute: 'Fire',
    requiredFaction: 'Belobog Heavy Industries',
    activeSkill: 'Mounts a shoulder cannon and fires a barrage of homing rockets dealing continuous Fire DMG.',
    passiveBonus: 'When condition met: Rocket cluster count +50% and Burn buildup speed +100%.',
    chainAttackDmg: 830
  },
  {
    id: 'plugboo',
    name: 'Plugboo',
    rank: 'S',
    synergyCondition: 'Requires at least 2 Electric Agents or 2 Victoria Housekeeping Agents',
    requiredAttribute: 'Electric',
    requiredFaction: 'Victoria Housekeeping',
    activeSkill: 'Charges forward with high-voltage prongs, dealing multi-hit Electric DMG.',
    passiveBonus: 'When condition met: Shock anomaly buildup rate increased by 100%.',
    chainAttackDmg: 810
  },
  {
    id: 'officer_cui',
    name: 'Officer Cui',
    rank: 'S',
    synergyCondition: 'Requires at least 2 Criminal Investigation (N.E.P.S.) Agents',
    requiredFaction: 'Criminal Investigation',
    activeSkill: 'Deploys a bulletproof riot barricade and fires rapid-fire suppressive ammunition.',
    passiveBonus: 'When condition met: Active skill damage +60% and Daze buildup +40%.',
    chainAttackDmg: 840
  },
  {
    id: 'red_moccus',
    name: 'Red Moccus',
    rank: 'S',
    synergyCondition: 'Requires at least 2 Sons of Calydon Agents',
    requiredFaction: 'Sons of Calydon',
    activeSkill: 'Revvs up a turbocharged custom chopper and rams into the enemy line dealing Physical AoE DMG.',
    passiveBonus: 'When condition met: Ramming strike deals +50% Physical DMG and triggers bonus Daze.',
    chainAttackDmg: 850
  },
  {
    id: 'amillion',
    name: 'Amillion',
    rank: 'S',
    synergyCondition: 'Requires at least 2 Cunning Hares Agents',
    requiredFaction: 'Cunning Hares',
    activeSkill: 'Draws a micro-machine gun and sprays high-caliber rounds across a cone area.',
    passiveBonus: 'When condition met: Machine gun bullet count doubled and final burst damage +70%.',
    chainAttackDmg: 800
  },
  {
    id: 'butler',
    name: 'Butler',
    rank: 'A',
    synergyCondition: 'Requires at least 2 Victoria Housekeeping Agents',
    requiredFaction: 'Victoria Housekeeping',
    activeSkill: 'Bakes royal afternoon tea pancakes that restore 18 Energy to the on-field Agent.',
    passiveBonus: 'When condition met: Energy restoration increased to 24 Energy and cooldown reduced by 5s.',
    chainAttackDmg: 480
  },
  {
    id: 'avocaboo',
    name: 'Avocaboo',
    rank: 'A',
    synergyCondition: 'Requires at least 2 Support Agents in squad',
    activeSkill: 'Shoots fresh avocado healing smoothies that restore 12% HP to active squad member.',
    passiveBonus: 'When condition met: Healing effectiveness +30% and grants a small DEF shield.',
    chainAttackDmg: 450
  }
];

export default function ZzzBangbooSynergySelector() {
  const [slot1Agent, setSlot1Agent] = useState<string>('ellen');
  const [slot2Agent, setSlot2Agent] = useState<string>('lycaon');
  const [slot3Agent, setSlot3Agent] = useState<string>('soukaku');
  const [selectedBangbooId, setSelectedBangbooId] = useState<string>('sharkboo');
  const [copied, setCopied] = useState<boolean>(false);

  const squad = useMemo(() => {
    return [
      AGENTS.find(a => a.id === slot1Agent)!,
      AGENTS.find(a => a.id === slot2Agent)!,
      AGENTS.find(a => a.id === slot3Agent)!
    ];
  }, [slot1Agent, slot2Agent, slot3Agent]);

  const bangboo = useMemo(() => {
    return BANGBOOS.find(b => b.id === selectedBangbooId) || BANGBOOS[0];
  }, [selectedBangbooId]);

  // Check synergy status
  const synergyCheck = useMemo(() => {
    // Count factions and attributes
    const factionCounts: Record<string, number> = {};
    const attributeCounts: Record<string, number> = {};

    squad.forEach(agent => {
      factionCounts[agent.faction] = (factionCounts[agent.faction] || 0) + 1;
      attributeCounts[agent.attribute] = (attributeCounts[agent.attribute] || 0) + 1;
    });

    let isSynergyActive = false;

    if (bangboo.requiredFaction && factionCounts[bangboo.requiredFaction] >= 2) {
      isSynergyActive = true;
    }
    if (bangboo.requiredAttribute && attributeCounts[bangboo.requiredAttribute] >= 2) {
      isSynergyActive = true;
    }

    const synergyScore = isSynergyActive ? 100 : 35;

    return {
      isSynergyActive,
      synergyScore,
      factionCounts,
      attributeCounts
    };
  }, [squad, bangboo]);

  const handleCopy = () => {
    const text = `ZZZ Bangboo Synergy Build:
Squad: ${squad.map(a => `${a.name} (${a.faction} · ${a.attribute})`).join(' + ')}
Selected Bangboo: ${bangboo.name} (${bangboo.rank}-Rank)
Synergy Status: ${synergyCheck.isSynergyActive ? 'ACTIVE (100% Synergy)' : 'INACTIVE (Condition Missing)'}
Passive Effect: ${bangboo.passiveBonus}
Active Skill: ${bangboo.activeSkill}`;
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
              BANGBOO COMPATIBILITY ENGINE
            </span>
            <span className="text-xs text-slate-400">100% Free Boopon Gacha Support</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Bangboo Synergy Selector
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Verify squad faction & attribute requirements to activate game-changing Bangboo passive skills and chain attacks.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Squad Synergy'}
        </button>
      </div>

      {/* 3 Squad Agent Selectors */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">3-Member Squad Lineup</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Agent 1 (Lead)', val: slot1Agent, set: setSlot1Agent },
            { label: 'Agent 2 (Sub)', val: slot2Agent, set: setSlot2Agent },
            { label: 'Agent 3 (Support)', val: slot3Agent, set: setSlot3Agent }
          ].map((slot, idx) => (
            <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400">{slot.label}</span>
              <select
                value={slot.val}
                onChange={(e) => slot.set(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-bold"
              >
                {AGENTS.map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.faction} · {a.attribute})</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Bangboo Picker Cards */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Bangboo</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BANGBOOS.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBangbooId(b.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedBangbooId === b.id
                  ? 'bg-amber-950/80 border-amber-500 shadow-md ring-1 ring-amber-500'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-white truncate">{b.name}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  b.rank === 'S' ? 'bg-amber-500/20 text-amber-300' : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {b.rank}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate">{b.synergyCondition}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Synergy Result Card */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Status Badge */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Passive Status</span>
          <div className="my-2 flex items-center gap-2">
            {synergyCheck.isSynergyActive ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-400" />
            )}
            <span className={`text-2xl font-black ${
              synergyCheck.isSynergyActive ? 'text-emerald-300' : 'text-rose-300'
            }`}>
              {synergyCheck.isSynergyActive ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>
          <span className="text-xs text-slate-300 font-bold">{synergyCheck.synergyScore}% Synergy Score</span>
        </div>

        {/* Skill Details */}
        <div className="space-y-2 md:col-span-2 text-xs">
          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <span className="font-bold text-amber-300 block mb-1">Requirement:</span>
            <p className="text-slate-300">{bangboo.synergyCondition}</p>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <span className="font-bold text-cyan-300 block mb-1">Passive Skill Enhancement:</span>
            <p className={`leading-relaxed ${synergyCheck.isSynergyActive ? 'text-emerald-300' : 'text-slate-500 line-through'}`}>
              {bangboo.passiveBonus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
