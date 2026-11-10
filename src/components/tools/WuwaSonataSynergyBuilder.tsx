/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Users, Flame, Wind, Sun, Moon, Crosshair, ArrowRight
} from 'lucide-react';

interface CharacterDef {
  id: string;
  name: string;
  element: string;
  role: 'main_dps' | 'sub_dps' | 'support';
  damageType: 'heavy' | 'basic' | 'skill' | 'liberation';
  outroBuff: string;
  outroTarget: 'heavy' | 'basic' | 'skill' | 'liberation' | 'all' | 'electro';
  outroValue: number; // e.g. 38 for 38% deepen
  defaultSonata: string;
}

const CHARACTERS: CharacterDef[] = [
  // Main DPS
  { id: 'jinshi', name: 'Jinhsi', element: 'Spectro', role: 'main_dps', damageType: 'skill', outroBuff: 'Spectro Damage Burst', outroTarget: 'all', outroValue: 0, defaultSonata: 'celestial_light' },
  { id: 'changli', name: 'Changli', element: 'Fusion', role: 'main_dps', damageType: 'skill', outroBuff: 'Fusion +20% & Liberation +25% Deepen', outroTarget: 'liberation', outroValue: 25, defaultSonata: 'molten_rift' },
  { id: 'jiyan', name: 'Jiyan', element: 'Aero', role: 'main_dps', damageType: 'heavy', outroBuff: 'Aero Wind Spear attack', outroTarget: 'all', outroValue: 0, defaultSonata: 'sierra_gale' },
  { id: 'camellya', name: 'Camellya', element: 'Havoc', role: 'main_dps', damageType: 'basic', outroBuff: 'Havoc Crimson Bloom blast', outroTarget: 'all', outroValue: 0, defaultSonata: 'sun_sinking_eclipse' },
  { id: 'xiangli_yao', name: 'Xiangli Yao', element: 'Electro', role: 'main_dps', damageType: 'liberation', outroBuff: 'Electro burst', outroTarget: 'all', outroValue: 0, defaultSonata: 'void_thunder' },
  { id: 'havoc_rover', name: 'Havoc Rover', element: 'Havoc', role: 'main_dps', damageType: 'basic', outroBuff: 'Havoc AoE slash', outroTarget: 'all', outroValue: 0, defaultSonata: 'sun_sinking_eclipse' },

  // Sub DPS
  { id: 'yinlin', name: 'Yinlin', element: 'Electro', role: 'sub_dps', damageType: 'skill', outroBuff: '+20% Electro & +25% Liberation Deepen', outroTarget: 'liberation', outroValue: 25, defaultSonata: 'moonlit_clouds' },
  { id: 'mortefi', name: 'Mortefi', element: 'Fusion', role: 'sub_dps', damageType: 'heavy', outroBuff: '+38% Heavy Attack DMG Deepen for 14s', outroTarget: 'heavy', outroValue: 38, defaultSonata: 'moonlit_clouds' },
  { id: 'sanhua', name: 'Sanhua', element: 'Glacio', role: 'sub_dps', damageType: 'basic', outroBuff: '+38% Basic Attack DMG Deepen for 14s', outroTarget: 'basic', outroValue: 38, defaultSonata: 'moonlit_clouds' },
  { id: 'yuanwu', name: 'Yuanwu', element: 'Electro', role: 'sub_dps', damageType: 'skill', outroBuff: 'Vibration Strength break + Coordinated Lightning', outroTarget: 'all', outroValue: 15, defaultSonata: 'moonlit_clouds' },
  { id: 'danjin', name: 'Danjin', element: 'Havoc', role: 'sub_dps', damageType: 'heavy', outroBuff: '+23% Havoc Damage Deepen for 14s', outroTarget: 'all', outroValue: 23, defaultSonata: 'sun_sinking_eclipse' },

  // Support / Healer
  { id: 'shorekeeper', name: 'Shorekeeper', element: 'Spectro', role: 'support', damageType: 'basic', outroBuff: 'Stellar Realm: +12.5% Crit Rate & +25% Crit DMG', outroTarget: 'all', outroValue: 30, defaultSonata: 'rejuvenating_glow' },
  { id: 'verina', name: 'Verina', element: 'Spectro', role: 'support', damageType: 'basic', outroBuff: '+15% All-Type DMG Deepen for 30s', outroTarget: 'all', outroValue: 15, defaultSonata: 'rejuvenating_glow' },
  { id: 'baizhi', name: 'Baizhi', element: 'Glacio', role: 'support', damageType: 'basic', outroBuff: '+15% All-Type DMG Deepen for 6s', outroTarget: 'all', outroValue: 15, defaultSonata: 'rejuvenating_glow' },
  { id: 'jianxin', name: 'Jianxin', element: 'Aero', role: 'support', damageType: 'liberation', outroBuff: '+38% Resonance Liberation DMG Deepen', outroTarget: 'liberation', outroValue: 38, defaultSonata: 'rejuvenating_glow' },
];

const SONATA_SETS: Record<string, { name: string; twoPiece: string; fivePiece: string; teamAtkBuff: number }> = {
  'rejuvenating_glow': { name: 'Rejuvenating Glow', twoPiece: '+10% Healing Bonus', fivePiece: 'Healing increases all party members ATK by 15% for 30s', teamAtkBuff: 15 },
  'moonlit_clouds': { name: 'Moonlit Clouds', twoPiece: '+10% Energy Regen', fivePiece: 'Upon casting Outro Skill, next Resonator gains +22.5% ATK for 15s', teamAtkBuff: 22.5 },
  'celestial_light': { name: 'Celestial Light', twoPiece: '+10% Spectro DMG', fivePiece: 'Intro Skill grants +30% Spectro DMG for 15s', teamAtkBuff: 0 },
  'molten_rift': { name: 'Molten Rift', twoPiece: '+10% Fusion DMG', fivePiece: 'Resonance Skill grants +30% Fusion DMG for 15s', teamAtkBuff: 0 },
  'void_thunder': { name: 'Void Thunder', twoPiece: '+10% Electro DMG', fivePiece: 'Heavy Attack & Skill grant +30% Electro DMG for 15s', teamAtkBuff: 0 },
  'sierra_gale': { name: 'Sierra Gale', twoPiece: '+10% Aero DMG', fivePiece: 'Intro Skill grants +30% Aero DMG for 15s', teamAtkBuff: 0 },
  'sun_sinking_eclipse': { name: 'Sun-sinking Eclipse', twoPiece: '+10% Havoc DMG', fivePiece: 'Basic & Heavy Attacks grant +30% Havoc DMG for 15s', teamAtkBuff: 0 },
  'lingering_tunes': { name: 'Lingering Tunes', twoPiece: '+10% ATK', fivePiece: 'Consecutive attacks increase ATK by up to 20%, Outro grants 60% burst', teamAtkBuff: 0 },
};

export default function WuwaSonataSynergyBuilder() {
  const [slot1Char, setSlot1Char] = useState<string>('jinshi');
  const [slot1Sonata, setSlot1Sonata] = useState<string>('celestial_light');

  const [slot2Char, setSlot2Char] = useState<string>('yuanwu');
  const [slot2Sonata, setSlot2Sonata] = useState<string>('moonlit_clouds');

  const [slot3Char, setSlot3Char] = useState<string>('verina');
  const [slot3Sonata, setSlot3Sonata] = useState<string>('rejuvenating_glow');

  const [bellBorneActive, setBellBorneActive] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const mainDps = useMemo(() => CHARACTERS.find(c => c.id === slot1Char)!, [slot1Char]);
  const subDps = useMemo(() => CHARACTERS.find(c => c.id === slot2Char)!, [slot2Char]);
  const support = useMemo(() => CHARACTERS.find(c => c.id === slot3Char)!, [slot3Char]);

  const teamAnalysis = useMemo(() => {
    let synergyScore = 70;
    let synergyNotes: string[] = [];

    // Check Sub-DPS outro alignment with Main DPS damage type
    if (subDps.outroTarget === mainDps.damageType || subDps.outroTarget === 'all') {
      synergyScore += 20;
      synergyNotes.push(`Perfect Outro Match: ${subDps.name} grants ${subDps.outroBuff} boosting ${mainDps.name}'s primary damage source.`);
    } else if (mainDps.id === 'jinshi' && (subDps.id === 'yuanwu' || subDps.id === 'yinlin')) {
      synergyScore += 20;
      synergyNotes.push(`S-Tier Mechanic Synergy: ${subDps.name}'s rapid coordinated attacks generate 100% instant Incandescence stacks for Jinhsi!`);
    } else {
      synergyScore -= 10;
      synergyNotes.push(`Sub-optimal buff: ${subDps.name} boosts ${subDps.outroTarget} damage, but ${mainDps.name} deals mainly ${mainDps.damageType} damage.`);
    }

    // Check Support Outro
    if (support.outroTarget === 'all') {
      synergyScore += 10;
      synergyNotes.push(`Universal Amplification: ${support.name} amplifies all damage types for the entire rotation.`);
    }

    // Check Sonata Set Buff Stacking
    let totalTeamAtkBuff = 0;
    if (slot2Sonata === 'moonlit_clouds') totalTeamAtkBuff += 22.5;
    if (slot3Sonata === 'rejuvenating_glow') totalTeamAtkBuff += 15.0;

    let totalDeepenMultiplier = subDps.outroValue + support.outroValue;
    if (bellBorneActive) totalDeepenMultiplier += 10; // Bell-Borne Geochelone grants 10% DMG Deepen

    // Rotation Damage Multiplier over baseline
    const rotationDpsMultiplier = Number((1 + (totalTeamAtkBuff * 0.008) + (totalDeepenMultiplier * 0.012)).toFixed(2));
    const netDpsGain = Math.round((rotationDpsMultiplier - 1) * 100);

    synergyScore = Math.min(100, Math.max(30, synergyScore));

    return {
      synergyScore,
      synergyNotes,
      totalTeamAtkBuff,
      totalDeepenMultiplier,
      rotationDpsMultiplier,
      netDpsGain
    };
  }, [mainDps, subDps, support, slot2Sonata, slot3Sonata, bellBorneActive]);

  const handleCopy = () => {
    const text = `Wuthering Waves Team Rotation & Sonata Synergy:
Team: ${mainDps.name} (${SONATA_SETS[slot1Sonata]?.name}) + ${subDps.name} (${SONATA_SETS[slot2Sonata]?.name}) + ${support.name} (${SONATA_SETS[slot3Sonata]?.name})
Synergy Rating: ${teamAnalysis.synergyScore}/100
Rotation Buff Stack: +${teamAnalysis.totalTeamAtkBuff}% ATK | +${teamAnalysis.totalDeepenMultiplier}% DMG Deepen
Calculated Net Burst Gain: +${teamAnalysis.netDpsGain}% DPS
Rotation Sequence:
1. ${support.name}: Resonance Skill & Healing -> Trigger Rejuvenating Glow & Bell-Borne
2. ${subDps.name}: Fill Concerto gauge -> Cast Outro Skill (${subDps.outroBuff}) + Moonlit Clouds
3. ${mainDps.name}: Trigger Intro Skill -> Unleash Resonance Liberation & Skill hypercarry combo!`;
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
              CONCERTO ROTATION ENGINE
            </span>
            <span className="text-xs text-slate-400">Sonata Effect & Outro Deepen Stacking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Team Rotation & Sonata Effect Synergy Builder
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Build optimal 3-Resonator teams, stack Concerto Outro buffs, and calculate total burst rotation DPS gains.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Team Build'}
        </button>
      </div>

      {/* 3-Character Slot Builder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Slot 1: Main DPS */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-cyan-500/30 space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Slot 1: Hypercarry DPS</span>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">Primary Burst</span>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-400">Select Character</label>
            <select
              value={slot1Char}
              onChange={(e) => {
                setSlot1Char(e.target.value);
                const char = CHARACTERS.find(c => c.id === e.target.value);
                if (char) setSlot1Sonata(char.defaultSonata);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-bold"
            >
              {CHARACTERS.filter(c => c.role === 'main_dps').map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.element} · {c.damageType.toUpperCase()} DPS)</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-400">Sonata Effect</label>
            <select
              value={slot1Sonata}
              onChange={(e) => setSlot1Sonata(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-cyan-300"
            >
              {Object.entries(SONATA_SETS).map(([key, val]) => (
                <option key={key} value={key}>{val.name} (5-Pc)</option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            Primary focus: {SONATA_SETS[slot1Sonata]?.fivePiece}
          </p>
        </div>

        {/* Slot 2: Sub DPS */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-blue-500/30 space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Slot 2: Sub-DPS / Coordinated</span>
            <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">Outro Buffer</span>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-400">Select Character</label>
            <select
              value={slot2Char}
              onChange={(e) => {
                setSlot2Char(e.target.value);
                const char = CHARACTERS.find(c => c.id === e.target.value);
                if (char) setSlot2Sonata(char.defaultSonata);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-bold"
            >
              {CHARACTERS.filter(c => c.role === 'sub_dps').map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.element} · {c.outroBuff})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-400">Sonata Effect</label>
            <select
              value={slot2Sonata}
              onChange={(e) => setSlot2Sonata(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-blue-300"
            >
              {Object.entries(SONATA_SETS).map(([key, val]) => (
                <option key={key} value={key}>{val.name} (5-Pc)</option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            Outro Buff: {subDps.outroBuff}
          </p>
        </div>

        {/* Slot 3: Support */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-emerald-500/30 space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Slot 3: Sustainer / Healer</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">Team Deepen</span>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-400">Select Character</label>
            <select
              value={slot3Char}
              onChange={(e) => {
                setSlot3Char(e.target.value);
                const char = CHARACTERS.find(c => c.id === e.target.value);
                if (char) setSlot3Sonata(char.defaultSonata);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-bold"
            >
              {CHARACTERS.filter(c => c.role === 'support').map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.element} · {c.outroBuff})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-400">Sonata Effect</label>
            <select
              value={slot3Sonata}
              onChange={(e) => setSlot3Sonata(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-emerald-300"
            >
              {Object.entries(SONATA_SETS).map(([key, val]) => (
                <option key={key} value={key}>{val.name} (5-Pc)</option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={bellBorneActive}
              onChange={(e) => setBellBorneActive(e.target.checked)}
              className="accent-cyan-400 rounded"
            />
            Bell-Borne Geochelone Echo (+10% Deepen)
          </label>
        </div>
      </div>

      {/* Output Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Synergy Score</span>
          <div className="text-4xl font-black text-white mt-1">
            {teamAnalysis.synergyScore}<span className="text-sm text-slate-400">/100</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                teamAnalysis.synergyScore >= 85 ? 'bg-cyan-400' : teamAnalysis.synergyScore >= 65 ? 'bg-blue-400' : 'bg-amber-400'
              }`}
              style={{ width: `${teamAnalysis.synergyScore}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Stacking ATK%</span>
          <div className="text-3xl font-black text-cyan-300 mt-1">
            +{teamAnalysis.totalTeamAtkBuff}%
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            From Moonlit Clouds + Rejuvenating
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Deepen Amp</span>
          <div className="text-3xl font-black text-amber-300 mt-1">
            +{teamAnalysis.totalDeepenMultiplier}%
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Multiplicative Outro + Bell-Borne
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Net Burst Output</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            +{teamAnalysis.netDpsGain}%
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            {teamAnalysis.rotationDpsMultiplier}x Total Rotation DPS
          </span>
        </div>
      </div>

      {/* Concerto Rotation Step-by-Step Guide */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-cyan-400" /> Optimal Concerto Rotation Sequence
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center text-xs">1</span>
              <span>Opener: {support.name}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cast Resonance Skill and Basic Attacks to fill Concerto. Cast Bell-Borne Echo and swap out to grant <strong>+15% ATK</strong> (Rejuvenating Glow) and <strong>+{support.outroValue}% DMG Deepen</strong>.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
              <span className="w-5 h-5 rounded-full bg-blue-950 border border-blue-600 flex items-center justify-center text-xs">2</span>
              <span>Sub-DPS: {subDps.name}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter via Intro Skill, deploy Resonance Skill / Liberation to fill Concerto to 100%. Cast Heron Echo, then Outro into {mainDps.name} to grant <strong>+22.5% ATK</strong> (Moonlit) and <strong>{subDps.outroBuff}</strong>.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-600 flex items-center justify-center text-xs">3</span>
              <span>Hypercarry: {mainDps.name}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter with Intro Skill receiving all stacked buffs (+{teamAnalysis.totalTeamAtkBuff}% ATK and +{teamAnalysis.totalDeepenMultiplier}% Deepen). Execute maximum burst combo before buffs expire!
            </p>
          </div>
        </div>

        {/* Synergy Feedback */}
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-1.5">
          {teamAnalysis.synergyNotes.map((note, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
