import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Sparkles,
  Zap,
  Shield,
  Crosshair,
  Feather,
  Flame,
  Award,
  Layers,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface MaterialOption {
  id: string;
  name: string;
  tier: number;
  stats: {
    physicalDmgPct?: number;
    rangedDmgPct?: number;
    magicPowerPct?: number;
    critRatePct?: number;
    critDmgPct?: number;
    healthBonus?: number;
    staminaRegenPct?: number;
    moveSpeedPct?: number;
    durabilityPct?: number;
    fireResistPct?: number;
    poisonResistPct?: number;
  };
  specialTrait: string;
}

const INGOTS: MaterialOption[] = [
  { id: 'tin', name: 'Tin / Copper Ingot', tier: 1, stats: {}, specialTrait: 'Standard Base Metal' },
  { id: 'sun-giant', name: 'Sun Giant Ingot', tier: 4, stats: { critDmgPct: 25, fireResistPct: 20, physicalDmgPct: 15 }, specialTrait: '+25% Crit Dmg, Fire Resistance' },
  { id: 'titan', name: 'Titan Ingot', tier: 4, stats: { physicalDmgPct: 35, durabilityPct: 50, healthBonus: 40 }, specialTrait: '+35% Physical Damage, Heavy Durability' },
  { id: 'aureus', name: 'Aureus Gold Ingot', tier: 3, stats: { magicPowerPct: 30, healthBonus: 30, critRatePct: 10 }, specialTrait: '+30% Magic Power & Enchantments' },
  { id: 'automaton', name: 'Automaton Brass Ingot', tier: 3, stats: { durabilityPct: 100, physicalDmgPct: 20 }, specialTrait: '+100% Durability & Blocking' }
];

const WOODS: MaterialOption[] = [
  { id: 'timber', name: 'Standard Softwood Timber', tier: 1, stats: {}, specialTrait: 'Standard Base Wood' },
  { id: 'heartwood', name: 'Heartwood Lumber', tier: 3, stats: { rangedDmgPct: 25, magicPowerPct: 20 }, specialTrait: '+25% Ranged Weapon Damage' },
  { id: 'gilded-wood', name: 'Gilded Fey Wood', tier: 4, stats: { magicPowerPct: 35, durabilityPct: 25 }, specialTrait: '+35% Magic Spell Power' },
  { id: 'swamp-cedar', name: 'Swamp Cedar', tier: 2, stats: { poisonResistPct: 30, staminaRegenPct: 15 }, specialTrait: '+30% Poison Miasma Resistance' }
];

const LEATHERS: MaterialOption[] = [
  { id: 'basic-hide', name: 'Basic Animal Hide', tier: 1, stats: {}, specialTrait: 'Standard Base Leather' },
  { id: 'premo-leather', name: 'Premo Refined Leather', tier: 3, stats: { staminaRegenPct: 20, moveSpeedPct: 12 }, specialTrait: '+20% Stamina Regeneration' },
  { id: 'harpy-leather', name: 'Harpy Feathered Leather', tier: 4, stats: { critRatePct: 15, moveSpeedPct: 18 }, specialTrait: '+15% Crit Rate & Sprint Speed' },
  { id: 'carnute-hide', name: 'Carnute Apex Hide', tier: 4, stats: { healthBonus: 60, physicalDmgPct: 15 }, specialTrait: '+60 Max Health, Physical Resilience' }
];

const BONES: MaterialOption[] = [
  { id: 'basic-bone', name: 'Basic Creature Bone', tier: 1, stats: {}, specialTrait: 'Standard Base Bone' },
  { id: 'titans-bone', name: 'Titan’s Bone', tier: 4, stats: { healthBonus: 50, physicalDmgPct: 30 }, specialTrait: '+50 Max Health, Heavy Strike Power' },
  { id: 'fey-bone', name: 'Elder Fey Bone', tier: 3, stats: { magicPowerPct: 25, critDmgPct: 20 }, specialTrait: '+25% Magic Power, +20% Crit Dmg' }
];

export default function NightingaleResourceStatsOptimizer() {
  const [gearType, setGearType] = useState<'melee' | 'ranged' | 'armor'>('melee');
  const [selectedIngotId, setSelectedIngotId] = useState<string>('sun-giant');
  const [selectedWoodId, setSelectedWoodId] = useState<string>('heartwood');
  const [selectedLeatherId, setSelectedLeatherId] = useState<string>('harpy-leather');
  const [selectedBoneId, setSelectedBoneId] = useState<string>('titans-bone');

  const selectedIngot = INGOTS.find((i) => i.id === selectedIngotId) || INGOTS[0];
  const selectedWood = WOODS.find((w) => w.id === selectedWoodId) || WOODS[0];
  const selectedLeather = LEATHERS.find((l) => l.id === selectedLeatherId) || LEATHERS[0];
  const selectedBone = BONES.find((b) => b.id === selectedBoneId) || BONES[0];

  // Base item specs depending on gear type
  const baseSpecs = useMemo(() => {
    if (gearType === 'melee') return { phys: 120, ranged: 0, magic: 50, health: 0, dur: 250 };
    if (gearType === 'ranged') return { phys: 40, ranged: 180, magic: 40, health: 0, dur: 200 };
    return { phys: 30, ranged: 0, magic: 60, health: 150, dur: 350 };
  }, [gearType]);

  // Combined stats math
  const combinedStats = useMemo(() => {
    let physPct = 0;
    let rangedPct = 0;
    let magicPct = 0;
    let critRate = 0;
    let critDmg = 0;
    let healthAdd = 0;
    let staminaRegen = 0;
    let moveSpeed = 0;
    let durPct = 0;
    let fireRes = 0;
    let poisonRes = 0;

    [selectedIngot, selectedWood, selectedLeather, selectedBone].forEach((mat) => {
      const s = mat.stats;
      if (s.physicalDmgPct) physPct += s.physicalDmgPct;
      if (s.rangedDmgPct) rangedPct += s.rangedDmgPct;
      if (s.magicPowerPct) magicPct += s.magicPowerPct;
      if (s.critRatePct) critRate += s.critRatePct;
      if (s.critDmgPct) critDmg += s.critDmgPct;
      if (s.healthBonus) healthAdd += s.healthBonus;
      if (s.staminaRegenPct) staminaRegen += s.staminaRegenPct;
      if (s.moveSpeedPct) moveSpeed += s.moveSpeedPct;
      if (s.durabilityPct) durPct += s.durabilityPct;
      if (s.fireResistPct) fireRes += s.fireResistPct;
      if (s.poisonResistPct) poisonRes += s.poisonResistPct;
    });

    const finalPhysDmg = Math.round(baseSpecs.phys * (1 + physPct / 100));
    const finalRangedDmg = Math.round(baseSpecs.ranged * (1 + rangedPct / 100));
    const finalMagicPower = Math.round(baseSpecs.magic * (1 + magicPct / 100));
    const finalHealth = baseSpecs.health + healthAdd;
    const finalDurability = Math.round(baseSpecs.dur * (1 + durPct / 100));

    return {
      physPct,
      rangedPct,
      magicPct,
      critRate,
      critDmg,
      healthAdd,
      staminaRegen,
      moveSpeed,
      durPct,
      fireRes,
      poisonRes,
      finalPhysDmg,
      finalRangedDmg,
      finalMagicPower,
      finalHealth,
      finalDurability
    };
  }, [selectedIngot, selectedWood, selectedLeather, selectedBone, baseSpecs]);

  const applyPreset = (preset: 'crit' | 'tank' | 'magic' | 'speed') => {
    if (preset === 'crit') {
      setSelectedIngotId('sun-giant');
      setSelectedWoodId('heartwood');
      setSelectedLeatherId('harpy-leather');
      setSelectedBoneId('fey-bone');
    } else if (preset === 'tank') {
      setSelectedIngotId('titan');
      setSelectedWoodId('swamp-cedar');
      setSelectedLeatherId('carnute-hide');
      setSelectedBoneId('titans-bone');
    } else if (preset === 'magic') {
      setSelectedIngotId('aureus');
      setSelectedWoodId('gilded-wood');
      setSelectedLeatherId('premo-leather');
      setSelectedBoneId('fey-bone');
    } else if (preset === 'speed') {
      setSelectedIngotId('sun-giant');
      setSelectedWoodId('heartwood');
      setSelectedLeatherId('harpy-leather');
      setSelectedBoneId('fey-bone');
    }
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Boxes className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Resource Inherent Stats & Material Heritage Optimizer
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Calculate how specific Ingot, Wood, Leather, and Bone material selections transfer inherent stats into crafted weapons and armor in Nightingale.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Recommendation Buttons */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-300">Target Material Build Optimization:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset('crit')}
            className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 rounded text-xs font-medium"
          >
            Max Crit Damage Build
          </button>
          <button
            onClick={() => applyPreset('tank')}
            className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded text-xs font-medium"
          >
            Max Tank & Health Build
          </button>
          <button
            onClick={() => applyPreset('magic')}
            className="px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 rounded text-xs font-medium"
          >
            Max Magic Power Build
          </button>
        </div>
      </div>

      {/* Gear Type Selection */}
      <div className="flex justify-center">
        <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-2">
          <button
            onClick={() => setGearType('melee')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              gearType === 'melee'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Melee Weapon Template
          </button>
          <button
            onClick={() => setGearType('ranged')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              gearType === 'ranged'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ranged Firearm Template
          </button>
          <button
            onClick={() => setGearType('armor')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              gearType === 'armor'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Armor Coat Template
          </button>
        </div>
      </div>

      {/* Material Input Selectors (4 Slots) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Slot 1: Ingot */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <label className="text-xs font-semibold text-emerald-400 block">Ingot Metal Slot</label>
          <select
            value={selectedIngotId}
            onChange={(e) => setSelectedIngotId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white"
          >
            {INGOTS.map((i) => (
              <option key={i.id} value={i.id}>
                Tier {i.tier} • {i.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
            {selectedIngot.specialTrait}
          </p>
        </div>

        {/* Slot 2: Wood */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <label className="text-xs font-semibold text-emerald-400 block">Wood / Lumber Slot</label>
          <select
            value={selectedWoodId}
            onChange={(e) => setSelectedWoodId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white"
          >
            {WOODS.map((w) => (
              <option key={w.id} value={w.id}>
                Tier {w.tier} • {w.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
            {selectedWood.specialTrait}
          </p>
        </div>

        {/* Slot 3: Leather */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <label className="text-xs font-semibold text-emerald-400 block">Leather / Cloth Slot</label>
          <select
            value={selectedLeatherId}
            onChange={(e) => setSelectedLeatherId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white"
          >
            {LEATHERS.map((l) => (
              <option key={l.id} value={l.id}>
                Tier {l.tier} • {l.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
            {selectedLeather.specialTrait}
          </p>
        </div>

        {/* Slot 4: Bone */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <label className="text-xs font-semibold text-emerald-400 block">Bone / Gem Component</label>
          <select
            value={selectedBoneId}
            onChange={(e) => setSelectedBoneId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white"
          >
            {BONES.map((b) => (
              <option key={b.id} value={b.id}>
                Tier {b.tier} • {b.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
            {selectedBone.specialTrait}
          </p>
        </div>
      </div>

      {/* Crafted Final Stat Profile Output */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-emerald-500/20 pb-3">
          <Sparkles className="w-5 h-5 text-emerald-400" /> Crafted Item Stat Breakdown & Inherent Traits
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {gearType === 'melee' && (
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Physical Melee Dmg</span>
              <span className="text-lg font-bold text-emerald-400">{combinedStats.finalPhysDmg}</span>
              <span className="text-[11px] text-slate-500 block">+{combinedStats.physPct}% Inherent</span>
            </div>
          )}
          {gearType === 'ranged' && (
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Ranged Firearm Dmg</span>
              <span className="text-lg font-bold text-emerald-400">{combinedStats.finalRangedDmg}</span>
              <span className="text-[11px] text-slate-500 block">+{combinedStats.rangedPct}% Inherent</span>
            </div>
          )}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Magic Power</span>
            <span className="text-lg font-bold text-cyan-400">{combinedStats.finalMagicPower}</span>
            <span className="text-[11px] text-slate-500 block">+{combinedStats.magicPct}% Inherent</span>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Critical Strike Rate</span>
            <span className="text-lg font-bold text-rose-400">+{combinedStats.critRate}%</span>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Critical Damage Multiplier</span>
            <span className="text-lg font-bold text-amber-400">+{combinedStats.critDmg}%</span>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Bonus Max Health</span>
            <span className="text-lg font-bold text-emerald-300">+{combinedStats.healthAdd} HP</span>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Stamina Regeneration</span>
            <span className="text-lg font-bold text-emerald-400">+{combinedStats.staminaRegen}%</span>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Item Durability</span>
            <span className="text-lg font-bold text-slate-200">{combinedStats.finalDurability}</span>
            <span className="text-[11px] text-slate-500 block">+{combinedStats.durPct}% Inherent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
