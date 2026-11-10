/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Wrench, Sparkles, ShieldCheck, AlertTriangle, CheckCircle2, 
  RotateCcw, Copy, Check, Flame, Info, Layers 
} from 'lucide-react';

interface EnchantSlot {
  id: string;
  enchantId: string;
  level: number;
}

const PS99_ENCHANTS_DB = [
  { id: 'super_magnet', name: 'Super Magnet', maxTier: 1, baseMultiplier: 1.0, isStackable: false, desc: 'Pulls distant loot and diamonds across the entire zone.' },
  { id: 'chest_mimic', name: 'Chest Mimic', maxTier: 1, baseMultiplier: 2.2, isStackable: false, desc: 'Spawns giant diamond chests in active farming areas.' },
  { id: 'diamond_viii', name: 'Diamond VIII', maxTier: 8, baseMultiplier: 2.5, isStackable: true, desc: 'Massively increases raw diamond drops from breaking items.' },
  { id: 'critical_viii', name: 'Critical VIII', maxTier: 8, baseMultiplier: 2.0, isStackable: true, desc: 'Increases critical hit chance and critical damage.' },
  { id: 'treasure_hunter_viii', name: 'Treasure Hunter VIII', maxTier: 8, baseMultiplier: 2.1, isStackable: true, desc: 'Boosts drop rate of rare items and exclusive keys.' },
  { id: 'speed_v', name: 'Speed V', maxTier: 5, baseMultiplier: 1.5, isStackable: true, desc: 'Increases player and pet movement and breaking speed.' },
  { id: 'fortune_iv', name: 'Fortune IV', maxTier: 4, baseMultiplier: 1.8, isStackable: true, desc: 'Increases raw diamond earnings.' },
  { id: 'boss_lucky_block', name: 'Boss Lucky Block', maxTier: 1, baseMultiplier: 2.0, isStackable: false, desc: 'Spawns Lucky Blocks during boss fights.' },
  { id: 'TAP_TEAM', name: 'Tap Team', maxTier: 1, baseMultiplier: 1.6, isStackable: false, desc: 'Auto-taps breakables with your pets.' }
];

export default function Ps99EnchantBuilder() {
  const [slots, setSlots] = useState<EnchantSlot[]>([
    { id: '1', enchantId: 'super_magnet', level: 1 },
    { id: '2', enchantId: 'chest_mimic', level: 1 },
    { id: '3', enchantId: 'diamond_viii', level: 8 },
    { id: '4', enchantId: 'critical_viii', level: 8 },
    { id: '5', enchantId: 'treasure_hunter_viii', level: 8 }
  ]);
  const [copied, setCopied] = useState(false);

  const addSlot = () => {
    if (slots.length >= 9) return;
    setSlots(prev => [...prev, { id: Date.now().toString(), enchantId: 'speed_v', level: 5 }]);
  };

  const removeSlot = (id: string) => {
    if (slots.length <= 1) return;
    setSlots(prev => prev.filter(s => s.id !== id));
  };

  const updateSlot = (id: string, enchantId: string) => {
    const def = PS99_ENCHANTS_DB.find(e => e.id === enchantId);
    setSlots(prev => prev.map(s => s.id === id ? { ...s, enchantId, level: def?.maxTier || 1 } : s));
  };

  const analysis = useMemo(() => {
    let duplicateWarnings: string[] = [];
    let stackCounts: Record<string, number> = {};
    let totalScore = 0;
    let gemMultiplier = 1.0;
    let itemMultiplier = 1.0;
    let speedMultiplier = 1.0;

    slots.forEach(slot => {
      stackCounts[slot.enchantId] = (stackCounts[slot.enchantId] || 0) + 1;
      const def = PS99_ENCHANTS_DB.find(e => e.id === slot.enchantId);
      if (!def) return;

      if (stackCounts[slot.enchantId] > 1 && !def.isStackable) {
        duplicateWarnings.push(`Warning: "${def.name}" does NOT stack! Multiple copies are wasted.`);
      }

      // Diminishing returns calculation for stacking enchant types
      const stackIndex = stackCounts[slot.enchantId];
      const stackPenalty = stackIndex > 1 ? Math.pow(0.65, stackIndex - 1) : 1.0;
      const effectivePower = def.baseMultiplier * stackPenalty;

      totalScore += effectivePower * 10;

      if (slot.enchantId.includes('diamond') || slot.enchantId.includes('fortune')) {
        gemMultiplier *= (1 + (def.baseMultiplier - 1) * stackPenalty);
      }
      if (slot.enchantId.includes('treasure')) {
        itemMultiplier *= (1 + (def.baseMultiplier - 1) * stackPenalty);
      }
      if (slot.enchantId.includes('speed')) {
        speedMultiplier *= (1 + (def.baseMultiplier - 1) * stackPenalty);
      }
    });

    return {
      duplicateWarnings,
      totalScore: Math.min(100, Math.round(totalScore)),
      gemMultiplier: Math.round(gemMultiplier * 100) / 100,
      itemMultiplier: Math.round(itemMultiplier * 100) / 100,
      speedMultiplier: Math.round(speedMultiplier * 100) / 100
    };
  }, [slots]);

  const handleCopy = () => {
    const text = [
      `🛡️ PS99 ENCHANT LOADOUT MANIFEST`,
      `• Active Slots: ${slots.length}`,
      `• Gem Boost: ${analysis.gemMultiplier}× | Item Boost: ${analysis.itemMultiplier}×`,
      `• Loadout Efficiency Score: ${analysis.totalScore}/100`
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Header Card */}
      <div className="relative bg-gradient-to-r from-purple-950 via-slate-900 to-sky-950 border-2 border-purple-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-purple-500/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-950 border border-purple-500/50 rounded-xl text-purple-400 shadow-lg">
              <Wrench className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-500/30">
                PET SIMULATOR 99 BUILDER
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
                Enchant Builder & Diminishing Returns Tool
              </h1>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 transition font-mono flex items-center gap-1.5 shadow-lg shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Manifest Copied!' : 'Copy Enchant Manifest'}
          </button>
        </div>

        {/* Live Analysis Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-[#090d16] border border-purple-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Loadout Efficiency</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                {analysis.totalScore} / 100 S-Tier
              </span>
            </div>
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>

          <div className="bg-[#090d16] border border-purple-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Diamond Multiplier</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                {analysis.gemMultiplier}× Yield
              </span>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>

          <div className="bg-[#090d16] border border-purple-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Item Drop Multiplier</span>
              <span className="text-xl sm:text-2xl font-black text-sky-400 font-mono">
                {analysis.itemMultiplier}× Yield
              </span>
            </div>
            <Layers className="w-6 h-6 text-sky-400" />
          </div>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Slots List (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Active Enchant Slots ({slots.length}/9)</h2>
              <p className="text-xs text-slate-400">Select active enchants and test for stacking penalties.</p>
            </div>
            <button
              onClick={addSlot}
              disabled={slots.length >= 9}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition"
            >
              + Add Slot
            </button>
          </div>

          <div className="space-y-4">
            {slots.map((slot, index) => {
              const def = PS99_ENCHANTS_DB.find(e => e.id === slot.enchantId);
              return (
                <div key={slot.id} className="bg-[#090d16] border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-400">Slot #{index + 1}</span>
                    <button
                      onClick={() => removeSlot(slot.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 transition"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">Enchant Type</label>
                      <select
                        value={slot.enchantId}
                        onChange={e => updateSlot(slot.id, e.target.value)}
                        className="w-full bg-[#0e1422] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                      >
                        {PS99_ENCHANTS_DB.map(enc => (
                          <option key={enc.id} value={enc.id}>{enc.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">Stacking Rule</label>
                      <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-mono font-bold ${
                        def?.isStackable ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                      }`}>
                        {def?.isStackable ? 'Stackable (Diminishing)' : 'Unique (Non-Stackable)'}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    {def?.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Warnings & Optimization (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              Diminishing Returns & Warnings
            </h3>

            {analysis.duplicateWarnings.length > 0 ? (
              <div className="space-y-2">
                {analysis.duplicateWarnings.map((warn, i) => (
                  <div key={i} className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-300">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{warn}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No stacking conflicts detected! Optimal loadout configuration.</span>
              </div>
            )}

            <div className="bg-[#090d16] border border-slate-800 rounded-xl p-4 space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Effective Gem Boost:</span>
                <span className="font-mono font-bold text-emerald-400">{analysis.gemMultiplier}×</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Effective Item Drops:</span>
                <span className="font-mono font-bold text-sky-400">{analysis.itemMultiplier}×</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Movement & Speed:</span>
                <span className="font-mono font-bold text-amber-400">{analysis.speedMultiplier}×</span>
              </div>
            </div>

            <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-4 space-y-2 text-xs text-purple-200">
              <div className="font-bold flex items-center gap-1.5 text-purple-300">
                <Sparkles className="w-4 h-4 text-amber-400" /> Stacking Rule Notice
              </div>
              <p className="leading-relaxed text-slate-300 text-[11px]">
                Enchants like Super Magnet and Chest Mimic do not stack their primary abilities. Equipping two Chest Mimics will not spawn double chests; instead, use complementary enchants like Diamond VIII and Treasure Hunter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
