import React, { useState, useMemo } from 'react';
import {
  Coins,
  ShoppingCart,
  CheckSquare,
  Square,
  Search,
  Filter,
  Package,
  Layers,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Zap,
  Hammer
} from 'lucide-react';

interface BlueprintItem {
  id: string;
  name: string;
  realmTrader: 'Abeyance' | 'Antiquarian' | 'Provisioner' | 'Herbarium' | 'Gloom' | 'Hunt' | 'Ascended';
  category: 'Schematic' | 'Building' | 'Card' | 'Augmentation';
  essenceTier: 'Dust' | 'T1' | 'T2' | 'T3' | 'T4';
  cost: number;
  description: string;
}

const BLUEPRINTS: BlueprintItem[] = [
  // Abeyance
  { id: 'b-ab-1', name: 'Simple Crafting Workbench', realmTrader: 'Abeyance', category: 'Building', essenceTier: 'Dust', cost: 55, description: 'Base workbench for early tools and crude armor.' },
  { id: 'b-ab-2', name: 'Estate Roof & Wall Set', realmTrader: 'Abeyance', category: 'Building', essenceTier: 'Dust', cost: 120, description: 'Tudor style wood building set for your main home realm.' },
  { id: 'b-ab-3', name: 'Card Paper Press Recipe', realmTrader: 'Abeyance', category: 'Schematic', essenceTier: 'Dust', cost: 40, description: 'Allows refining raw timber into Realm Card paper.' },

  // Antiquarian
  { id: 'b-ant-1', name: 'Refined Masonry Bench', realmTrader: 'Antiquarian', category: 'Building', essenceTier: 'T1', cost: 150, description: 'Unlocks refined stone blocks and furnace structures.' },
  { id: 'b-ant-2', name: 'Simple Revolver Schematic', realmTrader: 'Antiquarian', category: 'Schematic', essenceTier: 'T1', cost: 250, description: 'Tier 1 firearm for mid-range ranged combat.' },
  { id: 'b-ant-3', name: 'Astrolabe Major Card Schematic', realmTrader: 'Antiquarian', category: 'Card', essenceTier: 'T1', cost: 100, description: 'Crafting recipe to open Astrolabe realm portals.' },

  // Provisioner
  { id: 'b-prov-1', name: 'Lancaster Rifle Blueprint', realmTrader: 'Provisioner', category: 'Schematic', essenceTier: 'T2', cost: 400, description: 'High-damage lever-action rifle for precision hunting.' },
  { id: 'b-prov-2', name: 'Refined Sewing Bench', realmTrader: 'Provisioner', category: 'Building', essenceTier: 'T2', cost: 350, description: 'Unlocks refined leather coats and boots.' },
  { id: 'b-prov-3', name: 'Bellows Augmentation', realmTrader: 'Provisioner', category: 'Augmentation', essenceTier: 'T2', cost: 200, description: 'Increases furnace speed by +50% when placed near smelter.' },

  // Herbarium
  { id: 'b-herb-1', name: 'Mortar & Alchemical Station', realmTrader: 'Herbarium', category: 'Building', essenceTier: 'T2', cost: 450, description: 'Refines magical potions, inks, and potion brews.' },
  { id: 'b-herb-2', name: 'Fey Umbrella Glider Schematic', realmTrader: 'Herbarium', category: 'Schematic', essenceTier: 'T2', cost: 600, description: 'Advanced airborne glider umbrella with fast descent speed.' },

  // Gloom
  { id: 'b-gloom-1', name: 'Advanced Spinning Wheel', realmTrader: 'Gloom', category: 'Building', essenceTier: 'T3', cost: 800, description: 'Weaves high-grade linen and magic silk thread.' },
  { id: 'b-gloom-2', name: 'Shadow Repeater Firearm', realmTrader: 'Gloom', category: 'Schematic', essenceTier: 'T3', cost: 1200, description: 'Rapid-firing automatic hand cannon.' },

  // Hunt
  { id: 'b-hunt-1', name: 'Apex Carnute Rifle', realmTrader: 'Hunt', category: 'Schematic', essenceTier: 'T3', cost: 1800, description: 'Pinnacle sniper rifle dealing massive critical hit damage.' },
  { id: 'b-hunt-2', name: 'Sun Giant Workbench', realmTrader: 'Hunt', category: 'Building', essenceTier: 'T3', cost: 1500, description: 'Unlocks Tier 4 Mystic gear crafting recipes.' },

  // Ascended
  { id: 'b-asc-1', name: 'Ascended Vault Keycard Machine', realmTrader: 'Ascended', category: 'Building', essenceTier: 'T4', cost: 2500, description: 'Crafts access keys for endgame dungeon raids.' },
  { id: 'b-asc-2', name: 'Celestial Ingot Refinery', realmTrader: 'Ascended', category: 'Building', essenceTier: 'T4', cost: 3000, description: 'Smelts celestial apex ores into divine weapons.' }
];

export default function NightingaleEssenceTraderPlanner() {
  const [selectedTrader, setSelectedTrader] = useState<string>('all');
  const [targetIds, setTargetIds] = useState<string[]>([
    'b-ab-1',
    'b-ant-2',
    'b-prov-1'
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Salvage Calculator State
  const [salvageGoal, setSalvageGoal] = useState<number>(1000);

  const toggleTarget = (id: string) => {
    setTargetIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredBlueprints = useMemo(() => {
    return BLUEPRINTS.filter((bp) => {
      const matchesTrader = selectedTrader === 'all' || bp.realmTrader === selectedTrader;
      const matchesSearch =
        bp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bp.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTrader && matchesSearch;
    });
  }, [selectedTrader, searchQuery]);

  // Totals per Essence currency tier
  const essenceTotals = useMemo(() => {
    let dust = 0;
    let t1 = 0;
    let t2 = 0;
    let t3 = 0;
    let t4 = 0;

    BLUEPRINTS.filter((bp) => targetIds.includes(bp.id)).forEach((bp) => {
      if (bp.essenceTier === 'Dust') dust += bp.cost;
      if (bp.essenceTier === 'T1') t1 += bp.cost;
      if (bp.essenceTier === 'T2') t2 += bp.cost;
      if (bp.essenceTier === 'T3') t3 += bp.cost;
      if (bp.essenceTier === 'T4') t4 += bp.cost;
    });

    return { dust, t1, t2, t3, t4 };
  }, [targetIds]);

  // Extraction Math
  const timberNeeded = Math.ceil(salvageGoal / 5);
  const oreNeeded = Math.ceil(salvageGoal / 10);
  const fiberNeeded = Math.ceil(salvageGoal / 3);

  return (
    <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Coins className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Essence Trader Inventory & Currency Planner
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Track Realm Essence Trader schematic blueprints across all 7 Realm Tiers, budget Essence Dust to T4 Essence, and calculate resource extraction goals.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Left Trader Catalog / Right Currency Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schematic Checklist */}
        <div className="lg:col-span-2 bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Essence Trader Schematic Catalog
            </h3>
            <div className="relative w-full sm:w-48">
              <input
                type="text"
                placeholder="Search blueprints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs border-y border-slate-800/50 py-3">
            <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Filter by Trader:</span>
            {['all', 'Abeyance', 'Antiquarian', 'Provisioner', 'Herbarium', 'Gloom', 'Hunt', 'Ascended'].map((t, idx, arr) => (
              <React.Fragment key={t}>
                <button
                  onClick={() => setSelectedTrader(t)}
                  className={`transition-all hover:text-emerald-400 ${
                    selectedTrader === t
                      ? 'text-emerald-400 font-bold underline underline-offset-4'
                      : 'text-slate-400 font-medium'
                  }`}
                >
                  {t === 'all' ? 'All' : t}
                </button>
                {idx < arr.length - 1 && <span className="text-slate-800">|</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Schematic List */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {filteredBlueprints.map((bp) => {
              const isTargeted = targetIds.includes(bp.id);
              return (
                <div
                  key={bp.id}
                  onClick={() => toggleTarget(bp.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isTargeted
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button className="text-emerald-400 shrink-0">
                      {isTargeted ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <div>
                      <span className="font-semibold block">{bp.name}</span>
                      <span className="text-[11px] text-slate-400">{bp.realmTrader} Trader • {bp.description}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-emerald-400">{bp.cost}</span>
                    <span className="text-[10px] text-cyan-300 block font-medium uppercase tracking-tight">{bp.essenceTier} ESSENCE</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Target Essence Shopping Budget */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-6">
          <div className="border-b border-emerald-500/20 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-400" /> Target Essence Shopping Budget
            </h3>
            <span className="text-xs text-slate-400">Total cost for {targetIds.length} targeted schematics</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Essence Dust:</span>
              <span className="text-base font-bold text-emerald-400">{essenceTotals.dust.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Tier 1 Essence (T1):</span>
              <span className="text-base font-bold text-emerald-300">{essenceTotals.t1.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Tier 2 Essence (T2):</span>
              <span className="text-base font-bold text-cyan-300">{essenceTotals.t2.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Tier 3 Essence (T3):</span>
              <span className="text-base font-bold text-indigo-300">{essenceTotals.t3.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Tier 4 Essence (T4 Apex):</span>
              <span className="text-base font-bold text-amber-400">{essenceTotals.t4.toLocaleString()}</span>
            </div>
          </div>

          {/* Salvage Extraction Estimator */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Resource Salvage & Dust Extraction
            </h4>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 block">Target Essence Dust to Extract:</label>
              <input
                type="number"
                min="50"
                step="50"
                value={salvageGoal}
                onChange={(e) => setSalvageGoal(Math.max(10, parseInt(e.target.value) || 10))}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
              />
            </div>
            <div className="text-[11px] space-y-1 text-slate-300 pt-1 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Wood Logs needed (5 dust/log):</span>
                <span className="font-bold text-emerald-400">{timberNeeded} logs</span>
              </div>
              <div className="flex justify-between">
                <span>Raw Ore needed (10 dust/ore):</span>
                <span className="font-bold text-emerald-400">{oreNeeded} ores</span>
              </div>
              <div className="flex justify-between">
                <span>Plant Fiber needed (3 dust/fiber):</span>
                <span className="font-bold text-emerald-400">{fiberNeeded} fiber</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
