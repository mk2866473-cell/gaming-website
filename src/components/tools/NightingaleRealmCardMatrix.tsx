import React, { useState, useMemo } from 'react';
import {
  Compass,
  Layers,
  Sparkles,
  TreePine,
  Sun,
  Droplets,
  Scroll,
  ShieldAlert,
  Feather,
  Zap,
  HelpCircle,
  Package,
  Boxes,
  CheckCircle2,
  Info
} from 'lucide-react';

interface BiomeCard {
  id: string;
  name: string;
  description: string;
  weather: string;
  hazards: string[];
  icon: string;
  keyResources: string[];
}

interface MajorCard {
  id: string;
  name: string;
  tier: number;
  minGearScore: number;
  enemyLevel: number;
  realmPower: number;
  bossType: string;
  paperType: string;
  inkType: string;
  essenceTier: string;
  essenceCost: number;
  description: string;
}

const BIOMES: BiomeCard[] = [
  {
    id: 'forest',
    name: 'Forest Biome',
    description: 'Lush temperate woodland filled with ancient timber, fey flora, and freshwater lakes.',
    weather: 'Temperate Rain & Light Fog',
    hazards: ['Wetness Drain', 'Spore Mites'],
    icon: 'TreePine',
    keyResources: ['Hardwood', 'Fey Fiber', 'Freshwater Fish', 'Quartz']
  },
  {
    id: 'swamp',
    name: 'Swamp Biome',
    description: 'Murky wetlands laden with miasma, poisonous flora, and dense subterranean caverns.',
    weather: 'Heavy Miasma & Constant Rain',
    hazards: ['Poison Miasma', 'Sinking Mud', 'Disease'],
    icon: 'Droplets',
    keyResources: ['Toxic Fungi', 'Bog Iron', 'Alchemical Slime', 'Silk Wood']
  },
  {
    id: 'desert',
    name: 'Desert Biome',
    description: 'Sun-drenched arid canyons with scorching day temperatures and frozen nights.',
    weather: 'Extreme Sunstroke & Sandstorms',
    hazards: ['Sunstroke / Heat Exhaustion', 'Freezing Night', 'Dehydration'],
    icon: 'Sun',
    keyResources: ['Sun Gem', 'Sandstone Ingot', 'Cactus Resin', 'Scorpion Carapace']
  }
];

const MAJOR_CARDS: MajorCard[] = [
  {
    id: 'abeyance',
    name: 'Abeyance Card',
    tier: 1,
    minGearScore: 0,
    enemyLevel: 1,
    realmPower: 10,
    bossType: 'Bound Sentinel',
    paperType: 'Wood Pulp Paper',
    inkType: 'Basic Alchemical Ink',
    essenceTier: 'Essence Dust',
    essenceCost: 25,
    description: 'Safe estate realm ideal for home building, crafting base establishment, and peaceful farming.'
  },
  {
    id: 'antiquarian',
    name: 'Antiquarian Card',
    tier: 1,
    minGearScore: 20,
    enemyLevel: 15,
    realmPower: 25,
    bossType: 'Ancient Automaton Knight',
    paperType: 'Refined Plant Paper',
    inkType: 'Beetle Juice Ink',
    essenceTier: 'Tier 1 Essence',
    essenceCost: 50,
    description: 'Ancient forgotten ruins containing basic Essence Traders and initial tier crafting recipes.'
  },
  {
    id: 'astrolabe',
    name: 'Astrolabe Card',
    tier: 2,
    minGearScore: 30,
    enemyLevel: 30,
    realmPower: 40,
    bossType: 'Bound Fiend Swarm',
    paperType: 'Refined Plant Paper',
    inkType: 'Beetle Juice Ink',
    essenceTier: 'Tier 1 Essence',
    essenceCost: 75,
    description: 'Navigational towers and stargazer observatories with elevated Bound presence.'
  },
  {
    id: 'provisioner',
    name: 'Provisioner Card',
    tier: 2,
    minGearScore: 40,
    enemyLevel: 45,
    realmPower: 60,
    bossType: 'Bound Assassin Captain',
    paperType: 'High-Grade Linen Paper',
    inkType: 'Shroom Glow Ink',
    essenceTier: 'Tier 2 Essence',
    essenceCost: 100,
    description: 'Trader outposts offering advanced firearm schematics, refined metals, and leather armor.'
  },
  {
    id: 'herbarium',
    name: 'Herbarium Card',
    tier: 3,
    minGearScore: 60,
    enemyLevel: 60,
    realmPower: 80,
    bossType: 'Elder Harpy Queen',
    paperType: 'High-Grade Linen Paper',
    inkType: 'Shroom Glow Ink',
    essenceTier: 'Tier 2 Essence',
    essenceCost: 150,
    description: 'Botanical paradises with rare magical flora, alchemical ingredients, and flying apex creatures.'
  },
  {
    id: 'gloom',
    name: 'Gloom Card',
    tier: 3,
    minGearScore: 80,
    enemyLevel: 80,
    realmPower: 110,
    bossType: 'Shadow Bound Behemoth',
    paperType: 'Vellum Leather Paper',
    inkType: 'Void Pigment Ink',
    essenceTier: 'Tier 3 Essence',
    essenceCost: 200,
    description: 'Eternal twilight realm with hazardous weather conditions and shadow elite mobs.'
  },
  {
    id: 'hunt',
    name: 'Hunt Card',
    tier: 4,
    minGearScore: 100,
    enemyLevel: 100,
    realmPower: 140,
    bossType: 'Carnute Fey Apex Predator',
    paperType: 'Vellum Leather Paper',
    inkType: 'Void Pigment Ink',
    essenceTier: 'Tier 3 Essence',
    essenceCost: 300,
    description: 'Wild hunting grounds populated by massive Legendary Apex Beasts carrying Tier 4 materials.'
  },
  {
    id: 'vault',
    name: 'Ascended Vault Card',
    tier: 5,
    minGearScore: 160,
    enemyLevel: 160,
    realmPower: 220,
    bossType: 'Sun Giant Colossus / Apex Vault Guardian',
    paperType: 'Enchanted Fey Paper',
    inkType: 'Astral Essence Ink',
    essenceTier: 'Tier 4 Essence',
    essenceCost: 500,
    description: 'Endgame dungeon realm containing multi-stage puzzle chambers, apex bosses, and T4 schematics.'
  }
];

export default function NightingaleRealmCardMatrix() {
  const [selectedBiomeId, setSelectedBiomeId] = useState<string>('forest');
  const [selectedMajorId, setSelectedMajorId] = useState<string>('antiquarian');
  const [batchQuantity, setBatchQuantity] = useState<number>(1);

  const selectedBiome = useMemo(
    () => BIOMES.find((b) => b.id === selectedBiomeId) || BIOMES[0],
    [selectedBiomeId]
  );

  const selectedMajor = useMemo(
    () => MAJOR_CARDS.find((m) => m.id === selectedMajorId) || MAJOR_CARDS[0],
    [selectedMajorId]
  );

  // Math totals
  const totalPaperNeeded = batchQuantity;
  const totalInkNeeded = batchQuantity;
  const totalEssenceNeeded = selectedMajor.essenceCost * batchQuantity;

  return (
    <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Realm Card Crafting Matrix & Portal Simulator
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Combine Biome Cards & Major Cards to simulate target Realm Power, Enemy Levels, Boss Spawns, and exact crafting material costs in Nightingale.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step 1: Select Biome Card */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
            <Layers className="w-5 h-5" /> 1. Select Biome Card
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BIOMES.map((b) => {
              const active = b.id === selectedBiomeId;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBiomeId(b.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    active
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm flex items-center justify-between">
                    <span>{b.name.split(' ')[0]}</span>
                    {active && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{b.weather}</p>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Environment Weather:</span>
              <span className="text-emerald-300 font-medium">{selectedBiome.weather}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Environmental Hazards:</span>
              <span className="text-amber-400 font-medium">{selectedBiome.hazards.join(', ')}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Key Realm Resources:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedBiome.keyResources.map((res, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700 text-[11px]"
                  >
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Select Major Card */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
            <Scroll className="w-5 h-5" /> 2. Select Major Realm Card
          </h3>
          <select
            value={selectedMajorId}
            onChange={(e) => setSelectedMajorId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
          >
            {MAJOR_CARDS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} (Tier {m.tier} • Realm Power {m.realmPower} • GS {m.minGearScore}+)
              </option>
            ))}
          </select>

          <p className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            {selectedMajor.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block">Required Min GS:</span>
              <span className="text-emerald-400 font-bold text-sm">GS {selectedMajor.minGearScore}+</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block">Enemy Level:</span>
              <span className="text-rose-400 font-bold text-sm">Lv. {selectedMajor.enemyLevel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Crafting Quantity */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Package className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="font-semibold text-sm text-white block">Batch Portal Crafting Quantity</span>
            <span className="text-xs text-slate-400">Calculate multi-realm portal card crafting materials</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {[1, 3, 5, 10, 20].map((qty) => (
            <button
              key={qty}
              onClick={() => setBatchQuantity(qty)}
              className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all ${
                batchQuantity === qty
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {qty}x
            </button>
          ))}
          <input
            type="number"
            min="1"
            max="99"
            value={batchQuantity}
            onChange={(e) => setBatchQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 bg-slate-900 border border-slate-700 rounded p-1.5 text-center text-xs text-white"
          />
        </div>
      </div>

      {/* Output Matrix Summary */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Target Realm Configuration
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {selectedBiome.name.split(' ')[0]} {selectedMajor.name} Realm
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-full text-xs font-semibold">
              Realm Power: {selectedMajor.realmPower}
            </span>
            <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full text-xs font-semibold">
              Tier {selectedMajor.tier} Card
            </span>
          </div>
        </div>

        {/* Specs 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Target Enemy Level</span>
            <span className="text-xl font-bold text-rose-400">Lv. {selectedMajor.enemyLevel}</span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Min Gear Score</span>
            <span className="text-xl font-bold text-amber-400">GS {selectedMajor.minGearScore}+</span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Apex Boss Creature</span>
            <span className="text-sm font-semibold text-emerald-300 truncate block">
              {selectedMajor.bossType}
            </span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Essence Currency</span>
            <span className="text-sm font-semibold text-cyan-300 truncate block">
              {selectedMajor.essenceTier}
            </span>
          </div>
        </div>

        {/* Crafting Requirements Breakdown */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Boxes className="w-4 h-4 text-emerald-400" /> Required Crafting Materials ({batchQuantity}x Crafting Batch)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Card Paper</span>
                <span className="font-semibold text-slate-200">{selectedMajor.paperType}</span>
              </div>
              <span className="text-lg font-bold text-emerald-400">x{totalPaperNeeded}</span>
            </div>
            <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Card Ink</span>
                <span className="font-semibold text-slate-200">{selectedMajor.inkType}</span>
              </div>
              <span className="text-lg font-bold text-emerald-400">x{totalInkNeeded}</span>
            </div>
            <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">{selectedMajor.essenceTier}</span>
                <span className="font-semibold text-cyan-300">Essence Fee</span>
              </div>
              <span className="text-lg font-bold text-cyan-400">{totalEssenceNeeded.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
