import React, { useState, useMemo } from 'react';
import {
  Bed,
  Flame,
  Clock,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  HelpCircle
} from 'lucide-react';

interface FurnitureItem {
  id: string;
  category: 'bed' | 'seating' | 'table' | 'warmth' | 'rug' | 'lighting' | 'trophy';
  name: string;
  comfortValue: number;
  craftsmanRequired: string;
}

const FURNITURE_ITEMS: FurnitureItem[] = [
  // Beds
  { id: 'straw-bed', category: 'bed', name: 'Straw Bed', comfortValue: 1, craftsmanRequired: 'None (Basic Crafting)' },
  { id: 'wooden-bed', category: 'bed', name: 'Standard Wooden Bed', comfortValue: 2, craftsmanRequired: 'Carpenter' },
  { id: 'palm-bed', category: 'bed', name: 'Palm Wood Bed', comfortValue: 5, craftsmanRequired: 'Carpenter' },
  { id: 'royal-bed', category: 'bed', name: 'Royal Carved Bed', comfortValue: 8, craftsmanRequired: 'Carpenter' },

  // Seating
  { id: 'wooden-chair', category: 'seating', name: 'Simple Wooden Stool', comfortValue: 1, craftsmanRequired: 'Carpenter' },
  { id: 'wooden-bench', category: 'seating', name: 'Wooden Bench', comfortValue: 2, craftsmanRequired: 'Carpenter' },
  { id: 'armchair', category: 'seating', name: 'Comfort Armchair', comfortValue: 3, craftsmanRequired: 'Carpenter' },
  { id: 'cushioned-couch', category: 'seating', name: 'Royal Leather Sofa', comfortValue: 5, craftsmanRequired: 'Carpenter' },

  // Tables
  { id: 'wooden-table', category: 'table', name: 'Small Wooden Table', comfortValue: 1, craftsmanRequired: 'Carpenter' },
  { id: 'carved-table', category: 'table', name: 'Carved Dining Table', comfortValue: 3, craftsmanRequired: 'Carpenter' },
  { id: 'marble-table', category: 'table', name: 'Refined Marble Table', comfortValue: 5, craftsmanRequired: 'Carpenter' },

  // Warmth
  { id: 'campfire', category: 'warmth', name: 'Simple Campfire', comfortValue: 1, craftsmanRequired: 'None' },
  { id: 'clay-fireplace', category: 'warmth', name: 'Clay Stove', comfortValue: 3, craftsmanRequired: 'Farmer' },
  { id: 'stone-fireplace', category: 'warmth', name: 'Stone Fireplace', comfortValue: 5, craftsmanRequired: 'Blacksmith' },
  { id: 'grand-hearth', category: 'warmth', name: 'Grand Royal Hearth', comfortValue: 8, craftsmanRequired: 'Blacksmith' },

  // Rugs
  { id: 'linen-rug', category: 'rug', name: 'Basic Linen Rug', comfortValue: 2, craftsmanRequired: 'Hunter' },
  { id: 'bear-rug', category: 'rug', name: 'Burlap Bear Fur Rug', comfortValue: 4, craftsmanRequired: 'Hunter' },

  // Lighting
  { id: 'candle', category: 'lighting', name: 'Wax Candle', comfortValue: 1, craftsmanRequired: 'Farmer' },
  { id: 'lantern', category: 'lighting', name: 'Hanging Lantern', comfortValue: 2, craftsmanRequired: 'Blacksmith' },
  { id: 'chandelier', category: 'lighting', name: 'Iron Chandelier', comfortValue: 4, craftsmanRequired: 'Blacksmith' },

  // Trophies
  { id: 'scavenger-trophy', category: 'trophy', name: 'Scavenger Matron Trophy', comfortValue: 2, craftsmanRequired: 'Hunter' },
  { id: 'thunderbrute-trophy', category: 'trophy', name: 'Fell Thunderbrute Head Trophy', comfortValue: 4, craftsmanRequired: 'Hunter' },
  { id: 'wyvern-trophy', category: 'trophy', name: 'Fell Wyvern Head Trophy', comfortValue: 6, craftsmanRequired: 'Hunter' }
];

export const EnshroudedComfortBuffTimer: React.FC = () => {
  const [selectedFurnitureIds, setSelectedFurnitureIds] = useState<string[]>([
    'palm-bed',
    'armchair',
    'carved-table',
    'stone-fireplace',
    'bear-rug',
    'lantern',
    'thunderbrute-trophy'
  ]);
  const [hasShelter, setHasShelter] = useState<boolean>(true);
  const [hasWarmth, setHasWarmth] = useState<boolean>(true);

  const toggleFurniture = (id: string) => {
    setSelectedFurnitureIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const comfortCalculation = useMemo(() => {
    // Note: In Enshrouded, only the single highest comfort value item per furniture category counts!
    const categories: Array<'bed' | 'seating' | 'table' | 'warmth' | 'rug' | 'lighting' | 'trophy'> = [
      'bed',
      'seating',
      'table',
      'warmth',
      'rug',
      'lighting',
      'trophy'
    ];

    let totalComfort = 0;
    const activeCategoryHighs: Record<string, { name: string; score: number }> = {};

    categories.forEach((cat) => {
      const selectedInCat = FURNITURE_ITEMS.filter(
        (item) => item.category === cat && selectedFurnitureIds.includes(item.id)
      );

      if (selectedInCat.length > 0) {
        // Pick the highest comfort item in this category
        const highest = selectedInCat.reduce((max, current) =>
          current.comfortValue > max.comfortValue ? current : max
        );
        totalComfort += highest.comfortValue;
        activeCategoryHighs[cat] = { name: highest.name, score: highest.comfortValue };
      }
    });

    // Base Rested Duration = 5 minutes if sheltered
    const baseDurationMinutes = hasShelter ? 5 : 0;
    const totalRestedMinutes = baseDurationMinutes + totalComfort;

    // Bonus Rested Stats scaling
    const staminaRegenBonusPct = Math.min(50, Math.round(totalComfort * 1.2));
    const healthRegenBonus = (totalComfort * 0.15).toFixed(1);

    return {
      totalComfort,
      totalRestedMinutes,
      activeCategoryHighs,
      staminaRegenBonusPct,
      healthRegenBonus
    };
  }, [selectedFurnitureIds, hasShelter]);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Title */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Comfort Level & Rested Buff Timer Calculator
            </h2>
            <p className="text-xs text-slate-400">
              Calculate total base Comfort score, highest furniture tier bonuses, and total Rested Buff duration (5m base + 1m per Comfort).
            </p>
          </div>
        </div>
      </div>

      {/* Shelter & Warmth Environment Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label
          className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${
            hasShelter ? 'bg-amber-950/40 border-amber-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          <div>
            <div className="text-xs font-bold">Roof & Wall Shelter Status</div>
            <div className="text-[11px] text-slate-400">Enclosed home roof adds baseline +5m Rested Timer</div>
          </div>
          <input
            type="checkbox"
            checked={hasShelter}
            onChange={(e) => setHasShelter(e.target.checked)}
            className="accent-amber-500 w-5 h-5 rounded"
          />
        </label>

        <label
          className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${
            hasWarmth ? 'bg-amber-950/40 border-amber-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          <div>
            <div className="text-xs font-bold">Fireplace Warmth Status</div>
            <div className="text-[11px] text-slate-400">Active fire or hearth provides Rested activation</div>
          </div>
          <input
            type="checkbox"
            checked={hasWarmth}
            onChange={(e) => setHasWarmth(e.target.checked)}
            className="accent-amber-500 w-5 h-5 rounded"
          />
        </label>
      </div>

      {/* Comfort & Timer Summary Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border-2 border-amber-500/40 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Comfort Score</span>
            <p className="text-3xl font-mono font-bold text-amber-400">{comfortCalculation.totalComfort}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rested Buff Duration</span>
            <p className="text-3xl font-mono font-bold text-emerald-400">{comfortCalculation.totalRestedMinutes} Mins</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Stamina Regen Boost</span>
            <p className="text-3xl font-mono font-bold text-cyan-400">+{comfortCalculation.staminaRegenBonusPct}%</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Health Regen Boost</span>
            <p className="text-3xl font-mono font-bold text-purple-400">+{comfortCalculation.healthRegenBonus}/s</p>
          </div>
        </div>
      </div>

      {/* Furniture Selection Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Select Placed House Furniture (Only Highest Per Category Counts)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {FURNITURE_ITEMS.map((item) => {
            const isSelected = selectedFurnitureIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleFurniture(item.id)}
                className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/80 shadow-md'
                    : 'bg-slate-900/50 border-slate-800/80 opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    {item.name}
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Built by: {item.craftsmanRequired}</div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-amber-400">+{item.comfortValue} Comfort</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnshroudedComfortBuffTimer;
