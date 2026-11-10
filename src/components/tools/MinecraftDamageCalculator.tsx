/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Shield, Sword, Zap, Heart, AlertTriangle, Sparkles, Check, Flame, Trophy
} from 'lucide-react';
import { WEAPON_DAMAGE_TABLE } from '../../data/minecraftData';

export default function MinecraftDamageCalculator() {
  const [weaponCategory, setWeaponCategory] = useState<string>('sword');
  const [weaponTier, setWeaponTier] = useState<string>('netherite');
  const [sharpnessLevel, setSharpnessLevel] = useState<number>(5); // 0 to 5
  const [isCritical, setIsCritical] = useState<boolean>(true);
  const [strengthLevel, setStrengthLevel] = useState<number>(0); // 0, 1 (Strength I +3), 2 (Strength II +6)
  
  // Target defense settings
  const [armorPoints, setArmorPoints] = useState<number>(20); // 20 = Full Diamond/Netherite
  const [armorToughness, setArmorToughness] = useState<number>(12); // Netherite = 12 (3/piece)
  const [protectionLevel, setProtectionLevel] = useState<number>(16); // 4 pieces of Prot IV = 16 EPF
  const [resistanceLevel, setResistanceLevel] = useState<number>(0); // 0 to 2 (20% per level)
  const [gameEdition, setGameEdition] = useState<'java' | 'bedrock'>('java');

  const targets = [
    { name: 'Player', hp: 20, maxHp: 20, color: 'text-emerald-400' },
    { name: 'Zombie / Skeleton', hp: 20, maxHp: 20, color: 'text-amber-400' },
    { name: 'Iron Golem', hp: 100, maxHp: 100, color: 'text-zinc-300' },
    { name: 'Wither Boss', hp: 300, maxHp: 300, color: 'text-purple-400' },
    { name: 'Warden', hp: 500, maxHp: 500, color: 'text-cyan-400' }
  ];

  const calculation = useMemo(() => {
    // 1. Base Weapon Damage
    const baseObj = WEAPON_DAMAGE_TABLE[weaponCategory]?.[weaponTier] || { attackDamage: 7, attackSpeed: 1.6 };
    let rawDamage = baseObj.attackDamage;

    // 2. Sharpness Calculation (Java: 0.5 * lvl + 0.5; Bedrock: 1.25 * lvl)
    if (sharpnessLevel > 0) {
      if (gameEdition === 'java') {
        rawDamage += 0.5 * sharpnessLevel + 0.5;
      } else {
        rawDamage += 1.25 * sharpnessLevel;
      }
    }

    // 3. Strength Potion (Java: +3 for I, +6 for II; Bedrock: +130% for I, +260% for II)
    if (strengthLevel === 1) {
      rawDamage += (gameEdition === 'java' ? 3 : rawDamage * 1.3);
    } else if (strengthLevel === 2) {
      rawDamage += (gameEdition === 'java' ? 6 : rawDamage * 2.6);
    }

    // 4. Critical Hit Multiplier (Java: 1.5x)
    if (isCritical) {
      rawDamage = rawDamage * 1.5;
    }

    // 5. Minecraft Armor & Toughness Damage Reduction Formula:
    // Reduction = clamp(Armor - Damage / (2 + Toughness / 4), Armor / 5, 20) / 25
    const defenseFactor = Math.max(armorPoints / 5, armorPoints - rawDamage / (2 + armorToughness / 4));
    const clampedDefense = Math.min(20, Math.max(0, defenseFactor));
    const armorReductionPercent = (clampedDefense / 25) * 100;
    const damageAfterArmor = rawDamage * (1 - clampedDefense / 25);

    // 6. Protection Enchantment (EPF): Each level reduces remaining damage by 4%, max 80% (20 EPF cap)
    const epf = Math.min(20, protectionLevel);
    const protReductionPercent = epf * 4; // up to 80%
    const damageAfterProt = damageAfterArmor * (1 - protReductionPercent / 100);

    // 7. Resistance Potion Effect: 20% reduction per level
    const resistancePercent = Math.min(100, resistanceLevel * 20);
    const finalDamage = Math.max(0, damageAfterProt * (1 - resistancePercent / 100));

    // Total Damage Reduction Percentage
    const totalReductionPercent = rawDamage > 0 ? ((rawDamage - finalDamage) / rawDamage) * 100 : 0;

    return {
      rawDamage: Math.round(rawDamage * 10) / 10,
      armorReductionPercent: Math.round(armorReductionPercent * 10) / 10,
      damageAfterArmor: Math.round(damageAfterArmor * 10) / 10,
      protReductionPercent,
      finalDamage: Math.round(finalDamage * 10) / 10,
      finalHearts: Math.round((finalDamage / 2) * 10) / 10,
      totalReductionPercent: Math.round(totalReductionPercent * 10) / 10
    };
  }, [weaponCategory, weaponTier, sharpnessLevel, isCritical, strengthLevel, armorPoints, armorToughness, protectionLevel, resistanceLevel, gameEdition]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Top Edition & Preset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-semibold">Game Edition:</span>
          <div className="flex bg-zinc-900 rounded-lg p-0.5 border border-zinc-700">
            <button
              onClick={() => setGameEdition('java')}
              className={`px-2.5 py-1 rounded-md font-semibold ${gameEdition === 'java' ? 'bg-emerald-500/20 text-emerald-300' : 'text-zinc-400'}`}
            >
              Java Edition
            </button>
            <button
              onClick={() => setGameEdition('bedrock')}
              className={`px-2.5 py-1 rounded-md font-semibold ${gameEdition === 'bedrock' ? 'bg-emerald-500/20 text-emerald-300' : 'text-zinc-400'}`}
            >
              Bedrock Edition
            </button>
          </div>
        </div>

        {/* Armor Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-zinc-500">Target Preset:</span>
          {[
            { label: 'Unarmored', pts: 0, tgh: 0, prot: 0 },
            { label: 'Full Iron', pts: 15, tgh: 0, prot: 0 },
            { label: 'Full Diamond (Prot IV)', pts: 20, tgh: 8, prot: 16 },
            { label: 'God Netherite (Prot IV)', pts: 20, tgh: 12, prot: 16 }
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setArmorPoints(preset.pts);
                setArmorToughness(preset.tgh);
                setProtectionLevel(preset.prot);
              }}
              className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono text-[11px]"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Attacker & Defender Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attacker Config */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800 text-rose-400">
            <Sword className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Attacker Weapon & Buffs
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Weapon Type</label>
              <select
                value={weaponCategory}
                onChange={(e) => setWeaponCategory(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                <option value="sword">Sword</option>
                <option value="axe">Axe (Shield Breaker)</option>
                <option value="trident">Trident</option>
                <option value="bow">Bow</option>
                <option value="crossbow">Crossbow</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Material Tier</label>
              <select
                value={weaponTier}
                onChange={(e) => setWeaponTier(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                {Object.keys(WEAPON_DAMAGE_TABLE[weaponCategory] || {}).map((tierKey) => (
                  <option key={tierKey} value={tierKey}>
                    {WEAPON_DAMAGE_TABLE[weaponCategory][tierKey].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sharpness & Strength */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">
                Sharpness: <strong className="text-amber-400 font-mono">Level {sharpnessLevel}</strong>
              </label>
              <input
                type="range"
                min="0"
                max="5"
                value={sharpnessLevel}
                onChange={(e) => setSharpnessLevel(parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">
                Strength Potion: <strong className="text-rose-400 font-mono">{strengthLevel === 0 ? 'None' : `Strength ${strengthLevel}`}</strong>
              </label>
              <select
                value={strengthLevel}
                onChange={(e) => setStrengthLevel(parseInt(e.target.value, 10))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-white"
              >
                <option value={0}>No Strength</option>
                <option value={1}>Strength I (+3 Dmg)</option>
                <option value={2}>Strength II (+6 Dmg)</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 pt-2 border-t border-zinc-800 text-xs text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isCritical}
              onChange={(e) => setIsCritical(e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-500 bg-zinc-950 border-zinc-700 cursor-pointer"
            />
            <span>Critical Jump Hit (1.5× Damage Multiplier)</span>
          </label>
        </div>

        {/* Defender Armor Config */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800 text-cyan-400">
            <Shield className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Target Armor & Defense
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-300">
              <span>Armor Defense Points (0–20):</span>
              <strong className="font-mono text-cyan-300">{armorPoints} / 20 ({armorPoints / 2} Chestplates)</strong>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={armorPoints}
              onChange={(e) => setArmorPoints(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-300">
              <span>Armor Toughness (0–12):</span>
              <strong className="font-mono text-purple-300">+{armorToughness} Toughness</strong>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              value={armorToughness}
              onChange={(e) => setArmorToughness(parseInt(e.target.value, 10))}
              className="w-full accent-purple-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-300">
              <span>Protection Enchantment EPF (0–20):</span>
              <strong className="font-mono text-emerald-400">{protectionLevel} EPF (-{protectionLevel * 4}%)</strong>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={protectionLevel}
              onChange={(e) => setProtectionLevel(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Primary Damage Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Raw Damage */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-500 block">Raw Attack Damage</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white my-1 block">
            {calculation.rawDamage} <span className="text-xs font-normal text-zinc-400">HP</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {(calculation.rawDamage / 2).toFixed(1)} Hearts before armor
          </span>
        </div>

        {/* Damage Absorbed */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-500 block">Total Damage Absorbed</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            {calculation.totalReductionPercent}%
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            Armor ({calculation.armorReductionPercent}%) + Prot ({calculation.protReductionPercent}%)
          </span>
        </div>

        {/* Final True Damage */}
        <div className="bg-zinc-950 border border-emerald-500/50 rounded-xl p-4 text-center shadow-lg shadow-emerald-950/40">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Final True Damage Dealt</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {calculation.finalDamage} <span className="text-xs font-normal text-zinc-400">HP</span>
          </span>
          <span className="text-[11px] text-emerald-300 font-mono font-semibold">
            ❤️ {calculation.finalHearts} Hearts per Hit
          </span>
        </div>
      </div>

      {/* Hits to Kill Breakdown against Common Mobs */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Hits to Defeat (At Current Target Defense)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {targets.map((tgt) => {
            const hits = calculation.finalDamage > 0 ? Math.ceil(tgt.hp / calculation.finalDamage) : '∞';
            return (
              <div key={tgt.name} className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center">
                <span className="text-xs font-bold text-zinc-200 block truncate">{tgt.name}</span>
                <span className="text-[10px] text-zinc-500 font-mono block">{tgt.hp} HP</span>
                <span className="text-xl font-extrabold font-mono text-emerald-400 mt-1 block">
                  {hits} {hits === 1 ? 'Hit' : 'Hits'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
