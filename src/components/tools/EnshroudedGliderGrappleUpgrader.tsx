import React, { useState } from 'react';
import {
  Compass,
  Zap,
  Wind,
  Wrench,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface EquipmentTier {
  id: string;
  name: string;
  type: 'glider' | 'grapple';
  tierLevel: number;
  speedMs: number;
  staminaDrainPerSec: number;
  rangeMeters?: number;
  craftsmanRequired: string;
  materials: Array<{ name: string; count: number; location: string }>;
  description: string;
}

const GLIDERS: EquipmentTier[] = [
  {
    id: 'basic-glider',
    name: 'Basic Glider',
    type: 'glider',
    tierLevel: 1,
    speedMs: 10,
    staminaDrainPerSec: 8,
    craftsmanRequired: 'Workbench (Basic Crafting)',
    materials: [
      { name: 'Shroud Wood', count: 8, location: 'Chop trees in Shroud zones' },
      { name: 'String', count: 8, location: 'Craft from Plant Fiber' },
      { name: 'Shroud Sack', count: 2, location: 'Loot from Shroud Fungal Spores' }
    ],
    description: 'Entry level glider. Provides baseline aerial traversal across Springlands chasms.'
  },
  {
    id: 'advanced-glider',
    name: 'Advanced Glider',
    type: 'glider',
    tierLevel: 2,
    speedMs: 15,
    staminaDrainPerSec: 6,
    craftsmanRequired: 'Carpenter',
    materials: [
      { name: 'Fog Stockings', count: 4, location: 'Loot from Revelwood Shroud enemies' },
      { name: 'Leather', count: 4, location: 'Craft at Hunter Tanning Station' },
      { name: 'Shroud Sack', count: 4, location: 'Loot from Revelwood Shroud roots' }
    ],
    description: 'Medium distance glider. Reduces stamina drain by 25% and boosts velocity to 15 m/s.'
  },
  {
    id: 'extra-velocity-glider',
    name: 'Extra Velocity Glider',
    type: 'glider',
    tierLevel: 3,
    speedMs: 20,
    staminaDrainPerSec: 4,
    craftsmanRequired: 'Carpenter',
    materials: [
      { name: 'Electric Sparks', count: 4, location: 'Loot from Nomad Highlands Spark Shrines' },
      { name: 'Leather', count: 8, location: 'Craft at Hunter Tanning Station' },
      { name: 'Shroud Sack', count: 6, location: 'Loot from Nomad Shroud roots' }
    ],
    description: 'High-speed long-range glider. Allows flying across wide Kindlewastes canyons.'
  },
  {
    id: 'ghost-glider',
    name: 'Ghost Glider',
    type: 'glider',
    tierLevel: 4,
    speedMs: 25,
    staminaDrainPerSec: 2,
    craftsmanRequired: 'Collector (Blackmire Vault)',
    materials: [
      { name: 'Ectoplasm', count: 8, location: 'Process at Collector Ectoplasm Press' },
      { name: 'Ghost Stockings', count: 6, location: 'Loot from Blackmire Shroud ghosts' },
      { name: 'Mint Mushroom', count: 4, location: 'Forage in Blackmire forests' }
    ],
    description: 'Pinnacle endgame glider. Features near-zero stamina drain and maximum 25 m/s speed.'
  }
];

const GRAPPLES: EquipmentTier[] = [
  {
    id: 'basic-grapple',
    name: 'Basic Grappling Hook',
    type: 'grapple',
    tierLevel: 1,
    speedMs: 12,
    staminaDrainPerSec: 10,
    rangeMeters: 15,
    craftsmanRequired: 'Workbench',
    materials: [
      { name: 'Metal Scraps', count: 4, location: 'Loot from Scavenger camps' },
      { name: 'String', count: 7, location: 'Craft from Plant Fiber' },
      { name: 'Shroud Wood', count: 2, location: 'Chop Shroud trees' }
    ],
    description: 'Standard grappling hook for climbing ruined Ancient Spire ledges.'
  },
  {
    id: 'improved-grapple',
    name: 'Improved Grappling Hook',
    type: 'grapple',
    tierLevel: 2,
    speedMs: 18,
    staminaDrainPerSec: 6,
    rangeMeters: 22,
    craftsmanRequired: 'Blacksmith',
    materials: [
      { name: 'Copper Bars', count: 6, location: 'Smelt Copper Ore at Smelter' },
      { name: 'String', count: 10, location: 'Craft from Plant Fiber' },
      { name: 'Leather', count: 4, location: 'Craft at Tanning Station' }
    ],
    description: 'Extended reach 22m grappling hook with 50% faster pull speed.'
  },
  {
    id: 'ghost-grapple',
    name: 'Ghost Grappling Hook',
    type: 'grapple',
    tierLevel: 3,
    speedMs: 25,
    staminaDrainPerSec: 3,
    rangeMeters: 30,
    craftsmanRequired: 'Collector',
    materials: [
      { name: 'Ectoplasm', count: 6, location: 'Process at Ectoplasm Press' },
      { name: 'Iron Bars', count: 4, location: 'Smelt Iron Ore at Forge' },
      { name: 'Leather', count: 6, location: 'Craft at Tanning Station' }
    ],
    description: 'Maximum 30m range grappling hook with instant pull acceleration.'
  }
];

export const EnshroudedGliderGrappleUpgrader: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'glider' | 'grapple'>('glider');
  const [selectedTierId, setSelectedTierId] = useState<string>('ghost-glider');

  const activeItems = activeTab === 'glider' ? GLIDERS : GRAPPLES;
  const currentItem = activeItems.find((i) => i.id === selectedTierId) || activeItems[0];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Title */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Glider & Grappling Hook Tier Upgrader
            </h2>
            <p className="text-xs text-slate-400">
              Compare flight speeds (m/s), stamina drain rates, grappling reach range, and required upgrade materials.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            setActiveTab('glider');
            setSelectedTierId('ghost-glider');
          }}
          className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${
            activeTab === 'glider'
              ? 'bg-amber-500 border-amber-400 text-slate-950 font-extrabold'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Glider Upgrades
        </button>

        <button
          onClick={() => {
            setActiveTab('grapple');
            setSelectedTierId('ghost-grapple');
          }}
          className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${
            activeTab === 'grapple'
              ? 'bg-amber-500 border-amber-400 text-slate-950 font-extrabold'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Grappling Hook Upgrades
        </button>
      </div>

      {/* Tier Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {activeItems.map((item) => {
          const isSelected = item.id === selectedTierId;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedTierId(item.id)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                isSelected
                  ? 'bg-amber-950/80 border-amber-500 text-white shadow-lg shadow-amber-950/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-white mb-1">Tier {item.tierLevel}: {item.name}</div>
              <div className="text-xs font-mono font-bold text-amber-400 mb-2">{item.speedMs} m/s Speed</div>
              <div className="text-[11px] text-slate-400">Drain: {item.staminaDrainPerSec}/s</div>
            </div>
          );
        })}
      </div>

      {/* Selected Item Detail */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {currentItem.name}
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 border border-amber-500/30 px-2 py-0.5 rounded">
                Tier #{currentItem.tierLevel}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">{currentItem.description}</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Required Craftsman</span>
            <p className="text-sm font-bold text-emerald-400">{currentItem.craftsmanRequired}</p>
          </div>
        </div>

        {/* Specs breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Traversal Velocity</span>
            <p className="text-2xl font-mono font-bold text-amber-400">{currentItem.speedMs} m/s</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Stamina Drain</span>
            <p className="text-2xl font-mono font-bold text-cyan-400">{currentItem.staminaDrainPerSec} / sec</p>
          </div>
          {currentItem.rangeMeters && (
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Grapple Range</span>
              <p className="text-2xl font-mono font-bold text-emerald-400">{currentItem.rangeMeters} meters</p>
            </div>
          )}
        </div>

        {/* Required Materials */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Crafting & Upgrade Materials Required:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentItem.materials.map((mat, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-white">{mat.name}</span>
                  <span className="text-amber-400 font-mono">x{mat.count}</span>
                </div>
                <div className="text-[11px] text-slate-400">💡 {mat.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnshroudedGliderGrappleUpgrader;
