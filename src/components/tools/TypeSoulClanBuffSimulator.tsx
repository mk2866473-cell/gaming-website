/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Crown, Flame, Heart, Swords
} from 'lucide-react';

interface ClanData {
  name: string;
  rarity: 'Mythical' | 'Legendary' | 'Rare' | 'Common';
  race: string;
  buffs: string;
  hpBonus: number;
  reiatsuBonus: number;
  postureBonus: number;
  specialAbility: string;
  bestBuild: string;
}

const CLANS: ClanData[] = [
  // Mythical (0.5%)
  { name: 'Kurosaki', rarity: 'Mythical', race: 'Soul Reaper', hpBonus: 10, reiatsuBonus: 15, postureBonus: 10, buffs: '+15% Reiatsu, +10% HP, Enhanced Getsuga Tensho', specialAbility: 'Getsuga Tensho Mode: Unleashes black and red energy slashes dealing unguardable posture damage.', bestBuild: 'Kendo / Speed Hybrid' },
  { name: 'Yamamoto', rarity: 'Mythical', race: 'Soul Reaper', hpBonus: 20, reiatsuBonus: 10, postureBonus: 15, buffs: '+20 HP, Fire tick immunity, Bankai duration +20%', specialAbility: 'Flame Emperor: Immune to all Burn and Fire ticks; melee hits inflict continuous incinerating burns.', bestBuild: 'Pure Kendo / Kido' },
  { name: 'Zaraki', rarity: 'Mythical', race: 'Soul Reaper', hpBonus: 15, reiatsuBonus: 0, postureBonus: 25, buffs: '+25% Max Posture, +15% Physical Slash DMG', specialAbility: 'Berserker Poise: Immune to posture break on first heavy hit; damage increases as HP drops below 40%.', bestBuild: 'Pure Kendo / Hakuda' },
  { name: 'Hyosube', rarity: 'Mythical', race: 'Soul Reaper', hpBonus: 10, reiatsuBonus: 20, postureBonus: 10, buffs: '+15% Kido DMG, Ink Blindness passive', specialAbility: 'Black Ink: Shikai and Kido attacks blind opponent screens and silence their weapon abilities for 2s.', bestBuild: 'Pure Kido / Speed' },
  { name: 'Cifer', rarity: 'Mythical', race: 'Arrancar', hpBonus: 10, reiatsuBonus: 15, postureBonus: 10, buffs: '+15% Reiatsu, Green Cero DMG +20%', specialAbility: 'Murcielago Flight: Allows high-speed aerial hovering and supercharges Lanza del Relampago spears.', bestBuild: 'Speed / Kido Hybrid' },
  { name: 'Starrk', rarity: 'Mythical', race: 'Arrancar', hpBonus: 10, reiatsuBonus: 15, postureBonus: 5, buffs: '+15% Speed, Cero Metralleta burst', specialAbility: 'Pack of Wolves: Summons spiritual explosive spirit wolves that pursue locked targets.', bestBuild: 'Pure Speed / Gunner' },
  { name: 'Le Vaar', rarity: 'Mythical', race: 'Quincy', hpBonus: 15, reiatsuBonus: 10, postureBonus: 15, buffs: '+15% Poison RES, Lethal Dose passive', specialAbility: 'The Deathdealing: Reduces damage taken from any attack element previously suffered by 40%.', bestBuild: 'Kendo / Quincy Bow' },

  // Legendary (1.0%)
  { name: 'Kuchiki', rarity: 'Legendary', race: 'Soul Reaper', hpBonus: 5, reiatsuBonus: 10, postureBonus: 5, buffs: '+10% Speed, Senbonzakura flurry', specialAbility: 'Cherry Blossom Shred: Basic attacks summon razor petals dealing bleed damage.', bestBuild: 'Pure Speed' },
  { name: 'Shihoin', rarity: 'Legendary', race: 'Soul Reaper', hpBonus: 5, reiatsuBonus: 10, postureBonus: 10, buffs: '+15% Flash Step distance, Shunko buff', specialAbility: 'Goddess of Flash: Grants a 3rd consecutive flash step and zero sprint stamina drain.', bestBuild: 'Pure Hakuda / Speed' },
  { name: 'Hitsugaya', rarity: 'Legendary', race: 'Soul Reaper', hpBonus: 5, reiatsuBonus: 10, postureBonus: 5, buffs: '+10% Ice DMG, Freeze slow rate +25%', specialAbility: 'Hyorinmaru Frost: Melee hits apply freezing stacks that slow enemy movement by 30%.', bestBuild: 'Kendo / Kido' },
  { name: 'Unohana', rarity: 'Legendary', race: 'Soul Reaper', hpBonus: 15, reiatsuBonus: 5, postureBonus: 5, buffs: '+15 HP, Healing efficiency +30%', specialAbility: 'Minazuki Regeneration: Automatically regenerates 2% HP per second when out of combat for 4s.', bestBuild: 'Medic / Kendo' },
  
  // Rare (10.0%)
  { name: 'Abarai', rarity: 'Rare', race: 'Soul Reaper', hpBonus: 5, reiatsuBonus: 0, postureBonus: 5, buffs: '+5% Heavy Attack DMG', specialAbility: 'Snake Bite: Adds extended reach to broadsword and katana swings.', bestBuild: 'Kendo' },
  { name: 'Kira', rarity: 'Rare', race: 'Soul Reaper', hpBonus: 0, reiatsuBonus: 5, postureBonus: 5, buffs: '+5% Posture DMG on parry', specialAbility: 'Weight of the Blade: Parrying an attack increases target gravity.', bestBuild: 'Speed' },
  { name: 'Common Non-Buff Clan', rarity: 'Common', race: 'Universal', hpBonus: 0, reiatsuBonus: 0, postureBonus: 0, buffs: 'Standard Clan (No passive buffs)', specialAbility: 'None. Recommended to use Clan Rerolls.', bestBuild: 'Any' },
];

export default function TypeSoulClanBuffSimulator() {
  const [selectedClanName, setSelectedClanName] = useState<string>('Kurosaki');
  const [rerollsUsed, setRerollsUsed] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const clan = useMemo(() => {
    return CLANS.find(c => c.name === selectedClanName) || CLANS[0];
  }, [selectedClanName]);

  const handleRollClan = () => {
    setIsSpinning(true);
    setRerollsUsed(prev => prev + 1);

    setTimeout(() => {
      const roll = Math.random() * 100;
      let rolledClan = CLANS[CLANS.length - 1]; // default common

      if (roll <= 0.5) {
        // Mythical (0.5%)
        const mythicals = CLANS.filter(c => c.rarity === 'Mythical');
        rolledClan = mythicals[Math.floor(Math.random() * mythicals.length)];
      } else if (roll <= 1.5) {
        // Legendary (1.0%)
        const legendaries = CLANS.filter(c => c.rarity === 'Legendary');
        rolledClan = legendaries[Math.floor(Math.random() * legendaries.length)];
      } else if (roll <= 11.5) {
        // Rare (10%)
        const rares = CLANS.filter(c => c.rarity === 'Rare');
        rolledClan = rares[Math.floor(Math.random() * rares.length)];
      }

      setSelectedClanName(rolledClan.name);
      setIsSpinning(false);
    }, 300);
  };

  const handleCopy = () => {
    const text = `Roblox Type Soul Clan Profile:
Clan: ${clan.name} (${clan.rarity} · ${clan.race})
Stats: +${clan.hpBonus} HP | +${clan.reiatsuBonus}% Reiatsu | +${clan.postureBonus}% Posture
Passive: ${clan.buffs}
Special Ability: ${clan.specialAbility}
Recommended Build: ${clan.bestBuild}
Simulated Spins Used: ${rerollsUsed}`;
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950 text-red-300 border border-red-800">
              0.5% MYTHICAL CLAN GACHA
            </span>
            <span className="text-xs text-slate-400">Reroll Simulator & Passive Database</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Clan Rarity & Buff Simulator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Simulate Clan Rerolls, explore Mythical & Legendary passive bonuses, and match clans with optimal stat builds.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Clan Stats'}
        </button>
      </div>

      {/* Reroll Simulator Bar */}
      <div className="bg-slate-950/80 p-5 rounded-2xl border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Clan Reroll Simulator</span>
          <p className="text-xs text-slate-300">
            Rates: Mythical 0.5% · Legendary 1.0% · Rare 10.0% · Common 88.5%
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 text-right hidden sm:block">
            <span>Spins Used: <strong className="text-white">{rerollsUsed}</strong></span>
          </div>
          <button
            onClick={handleRollClan}
            disabled={isSpinning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs shadow-lg shadow-red-600/20 transition-all disabled:opacity-50"
          >
            <RotateCcw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Rerolling...' : 'Spin Clan Reroll'}
          </button>
        </div>
      </div>

      {/* Clan Selector Grid */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Direct Clan Inspector</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {CLANS.map(c => (
            <button
              key={c.name}
              onClick={() => setSelectedClanName(c.name)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedClanName === c.name
                  ? 'bg-red-950/80 border-red-500 shadow ring-1 ring-red-500'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-white truncate">{c.name}</span>
                <span className={`text-[9px] font-black px-1 py-0.2 rounded ${
                  c.rarity === 'Mythical' ? 'bg-red-500/30 text-red-300' :
                  c.rarity === 'Legendary' ? 'bg-amber-500/30 text-amber-300' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {c.rarity[0]}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 truncate">{c.race}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Clan Details Card */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Clan Identity */}
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center flex flex-col justify-center items-center">
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
            clan.rarity === 'Mythical' ? 'bg-red-950 text-red-300 border border-red-800' :
            clan.rarity === 'Legendary' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
            'bg-slate-800 text-slate-300'
          }`}>
            {clan.rarity} Tier (0.5%)
          </span>
          <h3 className="text-3xl font-black text-white my-2">{clan.name}</h3>
          <span className="text-xs text-red-400 font-bold">{clan.race} Clan</span>
        </div>

        {/* Stat Buff Bars */}
        <div className="space-y-2.5 text-xs p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <span className="text-slate-400 font-bold uppercase tracking-wider block">Inherent Stat Bonuses</span>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Bonus HP:</span>
            <span className="font-bold text-emerald-400">+{clan.hpBonus} HP</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Reiatsu Pool:</span>
            <span className="font-bold text-cyan-400">+{clan.reiatsuBonus}% Reiatsu</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Posture Shield:</span>
            <span className="font-bold text-amber-400">+{clan.postureBonus}% Posture</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Synergy Build:</span>
            <span className="font-extrabold text-red-300">{clan.bestBuild}</span>
          </div>
        </div>

        {/* Special Move / Passive */}
        <div className="space-y-2 text-xs p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Signature Ability</span>
            <p className="text-slate-200 leading-relaxed font-medium">
              {clan.specialAbility}
            </p>
          </div>
          <p className="text-[11px] text-amber-300 italic pt-2 border-t border-slate-800">
            Passive: {clan.buffs}
          </p>
        </div>
      </div>
    </div>
  );
}
