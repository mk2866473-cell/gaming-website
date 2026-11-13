/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield, Zap, Sword, Crosshair, Sparkles, RefreshCw, Heart, Battery, Layers
} from 'lucide-react';
import { BLOX_FRUITS_GAME_CONSTANTS } from '../../data/robloxData';

export default function BloxFruitsStatCalculator() {
  const [playerLevel, setPlayerLevel] = useState<number>(2600);

  // 5 Stats
  const [melee, setMelee] = useState<number>(2600);
  const [defense, setDefense] = useState<number>(2600);
  const [sword, setSword] = useState<number>(0);
  const [gun, setGun] = useState<number>(0);
  const [bloxFruit, setBloxFruit] = useState<number>(2600);

  const totalAllowedPoints = playerLevel * BLOX_FRUITS_GAME_CONSTANTS.STAT_POINTS_PER_LEVEL;
  const currentUsedPoints = melee + defense + sword + gun + bloxFruit;
  const remainingPoints = totalAllowedPoints - currentUsedPoints;

  // Presets
  const applyPreset = (preset: 'fruit-main' | 'sword-main' | 'gun-main' | 'hybrid' | 'reset') => {
    const maxStat = Math.min(playerLevel, BLOX_FRUITS_GAME_CONSTANTS.MAX_STAT_PER_ATTRIBUTE);
    if (preset === 'fruit-main') {
      setMelee(maxStat);
      setDefense(maxStat);
      setBloxFruit(maxStat);
      setSword(0);
      setGun(0);
    } else if (preset === 'sword-main') {
      setMelee(maxStat);
      setDefense(maxStat);
      setSword(maxStat);
      setBloxFruit(0);
      setGun(0);
    } else if (preset === 'gun-main') {
      setMelee(maxStat);
      setDefense(maxStat);
      setGun(maxStat);
      setSword(0);
      setBloxFruit(0);
    } else if (preset === 'hybrid') {
      const split = Math.min(BLOX_FRUITS_GAME_CONSTANTS.MAX_STAT_PER_ATTRIBUTE, Math.floor(totalAllowedPoints / 5));
      setMelee(split);
      setDefense(split);
      setSword(split);
      setGun(split);
      setBloxFruit(split);
    } else {
      setMelee(0);
      setDefense(0);
      setSword(0);
      setGun(0);
      setBloxFruit(0);
    }
  };

  const hpPool = BLOX_FRUITS_GAME_CONSTANTS.BASE_HP + defense * BLOX_FRUITS_GAME_CONSTANTS.HP_PER_DEFENSE_POINT;
  const energyPool = BLOX_FRUITS_GAME_CONSTANTS.BASE_ENERGY + melee * BLOX_FRUITS_GAME_CONSTANTS.ENERGY_PER_MELEE_POINT;

  return (
    <div className="space-y-6">
      {/* Main Stat Allocator & Build Calculator */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Top Presets Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
          <span className="text-zinc-400 font-semibold">Build Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => applyPreset('fruit-main')}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-purple-300 border border-purple-500/40 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fruit Main</span>
            </button>
            <button
              onClick={() => applyPreset('sword-main')}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-500/40 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Sword className="w-3.5 h-3.5" />
              <span>Sword Main</span>
            </button>
            <button
              onClick={() => applyPreset('gun-main')}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Gun Main</span>
            </button>
            <button
              onClick={() => applyPreset('hybrid')}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Hybrid Split</span>
            </button>
            <button
              onClick={() => applyPreset('reset')}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        </div>

        {/* Level Slider & Total Pool Banner */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <label className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">
              Player Level: <span className="font-mono text-white text-base">{playerLevel}</span> / {BLOX_FRUITS_GAME_CONSTANTS.MAX_LEVEL}
              <span className="text-zinc-400 font-mono text-[11px] ml-2">
                ({totalAllowedPoints.toLocaleString()} Total Points)
              </span>
            </label>
            <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
              remainingPoints === 0
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : remainingPoints < 0
                ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
            }`}>
              {remainingPoints >= 0 ? `${remainingPoints.toLocaleString()} Points Unassigned` : `${Math.abs(remainingPoints).toLocaleString()} Points Over Limit`}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max={BLOX_FRUITS_GAME_CONSTANTS.MAX_LEVEL}
            value={playerLevel}
            onChange={(e) => setPlayerLevel(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* 5 Stat Point Distribution Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Melee */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Melee (Energy & Fighting Styles)
              </span>
              <span className="font-mono font-bold text-white">{melee} / 2600</span>
            </div>
            <input
              type="range"
              min="0"
              max="2600"
              value={melee}
              onChange={(e) => setMelee(parseInt(e.target.value, 10))}
              className="w-full accent-rose-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Defense */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Defense (Total HP Health Pool)
              </span>
              <span className="font-mono font-bold text-white">{defense} / 2600</span>
            </div>
            <input
              type="range"
              min="0"
              max="2600"
              value={defense}
              onChange={(e) => setDefense(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Sword */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sword className="w-4 h-4" /> Sword Damage
              </span>
              <span className="font-mono font-bold text-white">{sword} / 2600</span>
            </div>
            <input
              type="range"
              min="0"
              max="2600"
              value={sword}
              onChange={(e) => setSword(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Gun */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Crosshair className="w-4 h-4" /> Gun Damage
              </span>
              <span className="font-mono font-bold text-white">{gun} / 2600</span>
            </div>
            <input
              type="range"
              min="0"
              max="2600"
              value={gun}
              onChange={(e) => setGun(parseInt(e.target.value, 10))}
              className="w-full accent-amber-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Blox Fruit */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2 md:col-span-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Blox Fruit Attack Power
              </span>
              <span className="font-mono font-bold text-white">{bloxFruit} / 2600</span>
            </div>
            <input
              type="range"
              min="0"
              max="2600"
              value={bloxFruit}
              onChange={(e) => setBloxFruit(parseInt(e.target.value, 10))}
              className="w-full accent-purple-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* HP & Energy Pool Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5" /> Total Health Pool (HP)
            </span>
            <span className="text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
              {hpPool.toLocaleString()} <span className="text-xs font-normal text-zinc-400">HP</span>
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              100 Base + {defense} Defense × 5
            </span>
          </div>

          <div className="bg-zinc-950 border border-rose-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center justify-center gap-1">
              <Battery className="w-3.5 h-3.5" /> Total Energy Stamina Pool
            </span>
            <span className="text-3xl font-extrabold font-mono text-rose-400 my-1 block">
              {energyPool.toLocaleString()} <span className="text-xs font-normal text-zinc-400">Energy</span>
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              100 Base + {melee} Melee × 5
            </span>
          </div>
        </div>
      </div>

      {/* Stat Reset Cost & Refund Reference Section */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
              Stat Reset Planner Reference
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Blox Fruits Stat Reset Costs & NPC Locations
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Re-allocate all {totalAllowedPoints.toLocaleString()} points
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-zinc-950 border border-purple-500/30 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
              Plokster NPC (In-Game Currency)
            </span>
            <span className="text-xl font-extrabold font-mono text-white block">
              2,500 Fragments
            </span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Speak to Plokster in the Cafe (Second Sea) or Floating Turtle (Third Sea) for a full stat refund.
            </p>
          </div>

          <div className="bg-zinc-950 border border-emerald-500/30 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Shop Purchase (Any Sea)
            </span>
            <span className="text-xl font-extrabold font-mono text-white block">
              75 Robux
            </span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Buy a Stat Refund directly from the in-game Robux Shop when you do not have 2,500 Fragments.
            </p>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/30 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
              Free Stat Reset Codes
            </span>
            <span className="text-xl font-extrabold font-mono text-white block">
              0 Cost
            </span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Redeem official developer stat refund codes in the settings/gift menu to refund all points for free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
