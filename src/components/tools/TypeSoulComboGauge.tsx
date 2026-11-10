/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Swords, ShieldAlert, Crosshair, ArrowRight
} from 'lucide-react';

interface MoveDef {
  id: string;
  name: string;
  tree: 'Kendo' | 'Hakuda' | 'Speed' | 'Kido' | 'Shikai';
  damage: number;
  postureDamage: number;
  reiatsuCost: number;
  isTrueStun: boolean; // if true, enemy cannot roll/dodge out
}

const MOVES_DATABASE: MoveDef[] = [
  // Kendo
  { id: 'mortal_slash', name: 'Mortal Slash', tree: 'Kendo', damage: 45, postureDamage: 30, reiatsuCost: 15, isTrueStun: true },
  { id: 'flowing_water', name: 'Flowing Water', tree: 'Kendo', damage: 60, postureDamage: 35, reiatsuCost: 20, isTrueStun: true },
  { id: 'vertical_down', name: 'Vertical Down', tree: 'Kendo', damage: 55, postureDamage: 40, reiatsuCost: 15, isTrueStun: false },
  { id: 'split_gate', name: 'Split Gate', tree: 'Kendo', damage: 75, postureDamage: 50, reiatsuCost: 25, isTrueStun: true },

  // Hakuda
  { id: 'brutal_stomp', name: 'Brutal Stomp', tree: 'Hakuda', damage: 40, postureDamage: 35, reiatsuCost: 10, isTrueStun: true },
  { id: 'triple_kick', name: 'Triple Kick', tree: 'Hakuda', damage: 55, postureDamage: 30, reiatsuCost: 15, isTrueStun: true },
  { id: 'gavel_strike', name: 'Gavel Strike', tree: 'Hakuda', damage: 65, postureDamage: 45, reiatsuCost: 20, isTrueStun: false },
  { id: 'earth_splitter', name: 'Earth Splitter', tree: 'Hakuda', damage: 80, postureDamage: 55, reiatsuCost: 30, isTrueStun: true },

  // Speed
  { id: 'fast_fang', name: 'Fast Fang', tree: 'Speed', damage: 35, postureDamage: 20, reiatsuCost: 10, isTrueStun: true },
  { id: 'ghost_step_strike', name: 'Ghost Step Strike', tree: 'Speed', damage: 50, postureDamage: 25, reiatsuCost: 20, isTrueStun: true },
  { id: 'curved_blade', name: 'Curved Blade', tree: 'Speed', damage: 65, postureDamage: 30, reiatsuCost: 20, isTrueStun: true },

  // Kido
  { id: 'hado_4', name: 'Hado 4: Byakurai', tree: 'Kido', damage: 40, postureDamage: 15, reiatsuCost: 15, isTrueStun: false },
  { id: 'hado_33', name: 'Hado 33: Sokatsui', tree: 'Kido', damage: 70, postureDamage: 35, reiatsuCost: 25, isTrueStun: false },
  { id: 'fire_dragon', name: 'Fire Dragon Roar', tree: 'Kido', damage: 85, postureDamage: 40, reiatsuCost: 35, isTrueStun: false },

  // Shikai
  { id: 'getsuga', name: 'Getsuga Slash', tree: 'Shikai', damage: 90, postureDamage: 45, reiatsuCost: 30, isTrueStun: true },
  { id: 'ice_dragon', name: 'Hyorinmaru Frost Surge', tree: 'Shikai', damage: 80, postureDamage: 40, reiatsuCost: 25, isTrueStun: true },
];

export default function TypeSoulComboGauge() {
  const [comboChain, setComboChain] = useState<MoveDef[]>([
    MOVES_DATABASE[0], // Mortal Slash
    MOVES_DATABASE[1], // Flowing Water
    MOVES_DATABASE[3], // Split Gate
  ]);
  const [copied, setCopied] = useState<boolean>(false);

  const addMove = (move: MoveDef) => {
    if (comboChain.length >= 6) return;
    setComboChain([...comboChain, move]);
  };

  const removeMove = (index: number) => {
    setComboChain(comboChain.filter((_, i) => i !== index));
  };

  const clearCombo = () => {
    setComboChain([]);
  };

  const metrics = useMemo(() => {
    let totalDmg = 0;
    let totalPosture = 0;
    let totalReiatsu = 0;
    let is100PercentTrue = true;

    comboChain.forEach(move => {
      totalDmg += move.damage;
      totalPosture += move.postureDamage;
      totalReiatsu += move.reiatsuCost;
      if (!move.isTrueStun) is100PercentTrue = false;
    });

    const isGuardBreak = totalPosture >= 100;
    const comboGrade = isGuardBreak && is100PercentTrue ? 'S+ (Guaranteed Guard Break)' :
      isGuardBreak ? 'A (Guard Break with Escape Windows)' :
      is100PercentTrue ? 'A+ (True Hitstun Combo)' : 'B (Rollable String)';

    return {
      totalDmg,
      totalPosture,
      totalReiatsu,
      is100PercentTrue,
      isGuardBreak,
      comboGrade
    };
  }, [comboChain]);

  const handleCopy = () => {
    const text = `Roblox Type Soul Combo Chain:
Sequence: ${comboChain.map((m, i) => `${i+1}. ${m.name} (${m.tree})`).join(' ➔ ')}
Total Damage: ${metrics.totalDmg} HP
Posture Damage: ${metrics.totalPosture}/100 ${metrics.isGuardBreak ? '(GUARD BREAK TRIGGERED!)' : ''}
Reiatsu Cost: ${metrics.totalReiatsu} Reiatsu
Combo Status: ${metrics.is100PercentTrue ? '100% TRUE COMBO' : 'Contains escape roll window'}
Rating: ${metrics.comboGrade}`;
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
              POSTURE & HITSTUN ENGINE
            </span>
            <span className="text-xs text-slate-400">Guard Break & Reiatsu Cost Gauge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Abilities Combo Gauge
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Build 6-move skill chains, calculate 100% True Combo hitstun, and test for guaranteed Guard Breaks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearCombo}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Clear Chain
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? 'Copied' : 'Share Combo'}
          </button>
        </div>
      </div>

      {/* Active Combo Chain Display */}
      <div className="bg-slate-950/80 p-5 rounded-2xl border border-red-500/30 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-red-400 uppercase tracking-wider">
            Active Combo Sequence ({comboChain.length} / 6 Moves)
          </span>
          <span className="text-slate-400">Click a move to remove</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {comboChain.map((move, idx) => (
            <div
              key={idx}
              onClick={() => removeMove(idx)}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500 cursor-pointer transition-all space-y-1 relative group"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-500">#{idx + 1}</span>
                <span className="text-[10px] text-red-400 font-bold">{move.tree}</span>
              </div>
              <div className="font-extrabold text-xs text-white truncate">{move.name}</div>
              <div className="text-[10px] text-slate-400">
                {move.damage} DMG · {move.postureDamage} Posture
              </div>
              <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-400 text-xs">✕</span>
            </div>
          ))}

          {comboChain.length === 0 && (
            <div className="col-span-full py-6 text-center text-xs text-slate-500 italic">
              Combo sequence is empty. Select moves from the movepool below to start building your combo!
            </div>
          )}
        </div>
      </div>

      {/* Output Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Damage */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Damage</span>
          <div className="text-3xl font-black text-white mt-1">
            {metrics.totalDmg} <span className="text-xs font-normal text-slate-400">HP</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Direct health damage</span>
        </div>

        {/* Posture Bar & Guard Break */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Posture Damage</span>
          <div className={`text-3xl font-black mt-1 ${metrics.isGuardBreak ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
            {metrics.totalPosture} / 100
          </div>
          <span className="text-[11px] font-bold block mt-1 text-slate-300">
            {metrics.isGuardBreak ? '💥 GUARD BREAK GUARANTEED!' : 'Remaining enemy posture'}
          </span>
        </div>

        {/* Reiatsu Cost */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Reiatsu Cost</span>
          <div className="text-3xl font-black text-cyan-300 mt-1">
            {metrics.totalReiatsu}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">From spiritual energy pool</span>
        </div>

        {/* Combo Rating */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center flex flex-col justify-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Combo Reliability</span>
          <div className="text-base font-black text-amber-300 mt-1">
            {metrics.comboGrade}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            {metrics.is100PercentTrue ? 'Unescapable True Hitstun' : 'Rollable gap detected'}
          </span>
        </div>
      </div>

      {/* Available Movepool */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Swords className="w-4 h-4 text-red-400" /> Skill Movepool (Click to Add to Chain)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOVES_DATABASE.map(move => (
            <button
              key={move.id}
              onClick={() => addMove(move)}
              disabled={comboChain.length >= 6}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-red-500/50 text-left transition-all space-y-1 disabled:opacity-40 group"
            >
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-xs text-white group-hover:text-red-300 transition-colors">
                  {move.name}
                </span>
                <span className="text-[10px] font-bold text-red-400">{move.tree}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>{move.damage} DMG · {move.postureDamage} Posture</span>
                <span className="text-cyan-300">{move.reiatsuCost} Reiatsu</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
