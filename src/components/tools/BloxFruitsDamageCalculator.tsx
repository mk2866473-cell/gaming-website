/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sword, Zap, Shield, Sparkles, Trophy, Flame, ChevronRight, Check, Crosshair
} from 'lucide-react';
import { BLOX_FRUITS_GAME_CONSTANTS } from '../../data/robloxData';

export default function BloxFruitsDamageCalculator() {
  const [attackCategory, setAttackCategory] = useState<'fruit' | 'sword' | 'melee' | 'gun'>('fruit');
  const [baseMoveDamage, setBaseMoveDamage] = useState<number>(3200); // Standard move base damage
  const [statPoints, setStatPoints] = useState<number>(2600);
  const [masteryLevel, setMasteryLevel] = useState<number>(600); // 1 - 600
  const [selectedAccessory, setSelectedAccessory] = useState<string>('pale-scarf');
  const [selectedRace, setSelectedRace] = useState<string>('human');
  const [raceAwakening, setRaceAwakening] = useState<'base' | 'v3' | 'v4'>('v4');
  const [hasFullBodyAura, setHasFullBodyAura] = useState<boolean>(true); // Full Body Armament Haki

  const calculation = useMemo(() => {
    // 1. Stat Scaling: Base formula in Blox Fruits ~ BaseDamage * (1 + StatPoints / 1300)
    const statMultiplier = 1 + (statPoints / 1300);

    // 2. Mastery Scaling: ~0.15% per mastery level (up to +90% at 600 mastery)
    const masteryMultiplier = 1 + (masteryLevel * 0.0015);

    // 3. Accessory Buff
    const accObj = BLOX_FRUITS_GAME_CONSTANTS.ACCESSORIES.find(a => a.id === selectedAccessory) || BLOX_FRUITS_GAME_CONSTANTS.ACCESSORIES[0];
    let accessoryBuff = 0;
    if (attackCategory === 'fruit' && (selectedAccessory === 'pale-scarf' || selectedAccessory === 'dark-coat' || selectedAccessory === 'swan-glasses')) {
      accessoryBuff = accObj.damageBuff;
    } else if (attackCategory === 'sword' && (selectedAccessory === 'valkyrie-helm' || selectedAccessory === 'pale-scarf' || selectedAccessory === 'leviathan-crown' || selectedAccessory === 'swan-glasses' || selectedAccessory === 'hunter-cape')) {
      accessoryBuff = accObj.damageBuff;
    } else if (attackCategory === 'melee' && (selectedAccessory === 'leviathan-crown' || selectedAccessory === 'hunter-cape' || selectedAccessory === 'swan-glasses')) {
      accessoryBuff = accObj.damageBuff;
    } else if (attackCategory === 'gun' && (selectedAccessory === 'leviathan-crown' || selectedAccessory === 'hunter-cape' || selectedAccessory === 'swan-glasses')) {
      accessoryBuff = accObj.damageBuff;
    }

    // 4. Race Buff
    const raceObj = BLOX_FRUITS_GAME_CONSTANTS.RACES.find(r => r.id === selectedRace) || BLOX_FRUITS_GAME_CONSTANTS.RACES[0];
    let raceBuff = 0;
    if (raceAwakening === 'v3') raceBuff = raceObj.v3Buff;
    else if (raceAwakening === 'v4') raceBuff = raceObj.v4Buff;

    // 5. Armament Aura (Haki) Buff (+10% on physical/weapon attacks)
    const auraBuff = hasFullBodyAura ? 0.10 : 0.0;

    // Total Multiplier
    const totalMultiplier = statMultiplier * masteryMultiplier * (1 + accessoryBuff + raceBuff + auraBuff);
    const finalDamage = Math.round(baseMoveDamage * totalMultiplier);

    // Targets
    const playerMaxHp = 13100;
    const hitsToKillPlayer = Math.ceil(playerMaxHp / finalDamage);
    const seaBeastHp = 175000;
    const hitsToKillSeaBeast = Math.ceil(seaBeastHp / finalDamage);

    return {
      finalDamage,
      statMultiplier: statMultiplier.toFixed(2),
      masteryMultiplier: masteryMultiplier.toFixed(2),
      totalMultiplier: totalMultiplier.toFixed(2),
      accessoryBuffPercent: (accessoryBuff * 100).toFixed(0),
      raceBuffPercent: (raceBuff * 100).toFixed(0),
      hitsToKillPlayer,
      hitsToKillSeaBeast
    };
  }, [attackCategory, baseMoveDamage, statPoints, masteryLevel, selectedAccessory, selectedRace, raceAwakening, hasFullBodyAura]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Attack Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
        {[
          { id: 'fruit', name: 'Blox Fruit Move', icon: Sparkles },
          { id: 'sword', name: 'Sword Skill', icon: Sword },
          { id: 'melee', name: 'Melee Style', icon: Zap },
          { id: 'gun', name: 'Gun Blast', icon: Crosshair }
        ].map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setAttackCategory(cat.id as any)}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                attackCategory === cat.id ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Stats Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-purple-400 uppercase tracking-wider">Stat Points (0–2600)</span>
            <span className="font-mono text-white">{statPoints} / 2600</span>
          </div>
          <input
            type="range"
            min="0"
            max="2600"
            value={statPoints}
            onChange={(e) => setStatPoints(parseInt(e.target.value, 10))}
            className="w-full accent-purple-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-amber-400 uppercase tracking-wider">Item Mastery (1–600)</span>
            <span className="font-mono text-white">Mastery {masteryLevel}</span>
          </div>
          <input
            type="range"
            min="1"
            max="600"
            value={masteryLevel}
            onChange={(e) => setMasteryLevel(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Equipment, Race & Aura Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Accessory */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            Equipped Accessory
          </label>
          <select
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
          >
            {BLOX_FRUITS_GAME_CONSTANTS.ACCESSORIES.map((acc) => (
              <option key={acc.id} value={acc.id}>{acc.name} ({acc.notes})</option>
            ))}
          </select>
        </div>

        {/* Race */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            Race & Awakening Tier
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <select
              value={selectedRace}
              onChange={(e) => setSelectedRace(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-white"
            >
              {BLOX_FRUITS_GAME_CONSTANTS.RACES.map((r) => (
                <option key={r.id} value={r.id}>{r.name.split(' ')[0]}</option>
              ))}
            </select>
            <select
              value={raceAwakening}
              onChange={(e) => setRaceAwakening(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-white"
            >
              <option value="base">Base Race</option>
              <option value="v3">Race V3 Skill</option>
              <option value="v4">Race V4 Awakening</option>
            </select>
          </div>
        </div>

        {/* Aura / Haki Toggle */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2 flex flex-col justify-center">
          <label className="flex items-center gap-2 text-xs text-zinc-200 cursor-pointer">
            <input
              type="checkbox"
              checked={hasFullBodyAura}
              onChange={(e) => setHasFullBodyAura(e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-500 bg-zinc-900 border-zinc-700 cursor-pointer"
            />
            <span className="font-semibold">Full Body Armament Aura (Stage 5 Haki)</span>
          </label>
          <span className="text-[10px] text-zinc-500 font-mono">+10% base physical attack damage</span>
        </div>
      </div>

      {/* Main Output Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-purple-500/50 rounded-xl p-4 text-center shadow-lg shadow-purple-950/30">
          <span className="text-[10px] uppercase font-bold text-purple-400 block">Total Final Hit Damage</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-300 my-1 block">
            {calculation.finalDamage.toLocaleString()} <span className="text-xs font-normal text-zinc-400">Dmg</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            {calculation.totalMultiplier}× Compound Multiplier
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Hits to Kill Max Player</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 my-1 block">
            {calculation.hitsToKillPlayer} {calculation.hitsToKillPlayer === 1 ? 'Hit (One-Shot)' : 'Hits'}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Against 13,100 HP Max Player
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Hits to Kill Sea Beast</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400 my-1 block">
            {calculation.hitsToKillSeaBeast} Hits
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Against 175,000 HP Sea Beast
          </span>
        </div>
      </div>
    </div>
  );
}
