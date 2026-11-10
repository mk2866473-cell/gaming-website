import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  DollarSign,
  Percent,
  Users,
  ShieldAlert,
  CheckCircle2,
  Package,
  Battery,
  Weight,
  Sparkles,
  Info,
  RefreshCw
} from 'lucide-react';

interface StoreItem {
  id: string;
  name: string;
  category: 'essential' | 'tactical' | 'utility' | 'luxury';
  basePrice: number;
  weight: number; // lbs
  isTwoHanded: boolean;
  batteryLife: string;
  description: string;
  recommendedPerPlayer: boolean;
}

const STORE_ITEMS: StoreItem[] = [
  {
    id: 'walkie-talkie',
    name: 'Walkie-talkie',
    category: 'essential',
    basePrice: 12,
    weight: 0,
    isTwoHanded: false,
    batteryLife: '13m 40s',
    description: 'Crucial for radio communication between ship monitor operator and field scavengers.',
    recommendedPerPlayer: true
  },
  {
    id: 'pro-flashlight',
    name: 'Pro-Flashlight',
    category: 'essential',
    basePrice: 25,
    weight: 5,
    isTwoHanded: false,
    batteryLife: '4m 49s',
    description: 'High intensity beam necessary for deep dark moon facility navigation.',
    recommendedPerPlayer: true
  },
  {
    id: 'flashlight',
    name: 'Standard Flashlight',
    category: 'essential',
    basePrice: 15,
    weight: 0,
    isTwoHanded: false,
    batteryLife: '2m 20s',
    description: 'Budget lighting choice for early quota budget preservation.',
    recommendedPerPlayer: false
  },
  {
    id: 'shovel',
    name: 'Shovel',
    category: 'tactical',
    basePrice: 30,
    weight: 5,
    isTwoHanded: false,
    batteryLife: 'Infinite',
    description: 'Melee weapon capable of eliminating Snare Fleas, Thumpers, and Hoarding Bugs.',
    recommendedPerPlayer: false
  },
  {
    id: 'radar-booster',
    name: 'Radar Booster',
    category: 'utility',
    basePrice: 60,
    weight: 5,
    isTwoHanded: false,
    batteryLife: 'Infinite',
    description: 'Deployable camera ping station; can emit ping sound to decoy Eyeless Dogs.',
    recommendedPerPlayer: false
  },
  {
    id: 'lockpicker',
    name: 'Lockpicker',
    category: 'utility',
    basePrice: 20,
    weight: 16,
    isTwoHanded: false,
    batteryLife: 'Infinite',
    description: 'Automatically unlocks facility security doors in 20 seconds without keys.',
    recommendedPerPlayer: false
  },
  {
    id: 'stun-grenade',
    name: 'Stun Grenade',
    category: 'tactical',
    basePrice: 30,
    weight: 5,
    isTwoHanded: false,
    batteryLife: 'Single Use',
    description: 'Blinds and temporarily incapacitates monsters & Forest Keepers for 5-10s.',
    recommendedPerPlayer: false
  },
  {
    id: 'extension-ladder',
    name: 'Extension Ladder',
    category: 'utility',
    basePrice: 60,
    weight: 8,
    isTwoHanded: false,
    batteryLife: '18s active',
    description: 'Bypasses broken bridges or high fire escapes on Assurance, Rend, and Titan.',
    recommendedPerPlayer: false
  },
  {
    id: 'spray-paint',
    name: 'Spray Paint Can',
    category: 'utility',
    basePrice: 50,
    weight: 5,
    isTwoHanded: false,
    batteryLife: '100 sprays',
    description: 'Marks dead ends and exit routes inside complex generated facility mazes.',
    recommendedPerPlayer: false
  },
  {
    id: 'tzp-inhalant',
    name: 'TZP-Inhalant',
    category: 'utility',
    basePrice: 120,
    weight: 0,
    isTwoHanded: false,
    batteryLife: '50s gas',
    description: 'Increases movement speed and stamina recovery for rapid heavy scrap extraction.',
    recommendedPerPlayer: false
  },
  {
    id: 'zap-gun',
    name: 'Zap Gun',
    category: 'tactical',
    basePrice: 400,
    weight: 4,
    isTwoHanded: false,
    batteryLife: 'Mini-game',
    description: 'Emits an electrical beam pinning dangerous entities (Thumper, Brabble, Jester delay).',
    recommendedPerPlayer: false
  },
  {
    id: 'jetpack',
    name: 'Jetpack',
    category: 'luxury',
    basePrice: 700,
    weight: 52,
    isTwoHanded: false,
    batteryLife: '3m 15s fly time',
    description: 'Allows aerial transport directly from ship to main entrance bypassing outdoor hazards.',
    recommendedPerPlayer: false
  },
  {
    id: 'boombox',
    name: 'Boombox',
    category: 'luxury',
    basePrice: 60,
    weight: 5,
    isTwoHanded: false,
    batteryLife: '5m 41s',
    description: 'Plays music; acts as a noise decoy for Eyeless Dogs and Baboon Hawks.',
    recommendedPerPlayer: false
  }
];

export const LethalCompanyStoreBudgetPlanner: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(4);
  const [credits, setCredits] = useState<number>(350);
  const [globalDiscountPercent, setGlobalDiscountPercent] = useState<number>(0);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({
    'pro-flashlight': 2,
    'walkie-talkie': 2,
    'shovel': 1,
    'radar-booster': 1
  });
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const updateQuantity = (id: string, delta: number) => {
    setItemQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const applyPreset = (presetName: 'starter' | 'midgame' | 'hightier') => {
    if (presetName === 'starter') {
      setItemQuantities({
        'walkie-talkie': teamSize,
        'flashlight': 2,
        'shovel': 1
      });
    } else if (presetName === 'midgame') {
      setItemQuantities({
        'pro-flashlight': teamSize,
        'walkie-talkie': teamSize,
        'shovel': 2,
        'radar-booster': 1,
        'lockpicker': 1
      });
    } else if (presetName === 'hightier') {
      setItemQuantities({
        'pro-flashlight': teamSize,
        'walkie-talkie': teamSize,
        'zap-gun': 1,
        'stun-grenade': 2,
        'extension-ladder': 1,
        'tzp-inhalant': 1
      });
    }
  };

  const calculateItemPrice = (basePrice: number) => {
    if (globalDiscountPercent <= 0) return basePrice;
    return Math.floor(basePrice * (1 - globalDiscountPercent / 100));
  };

  const shoppingSummary = useMemo(() => {
    let totalCost = 0;
    let totalItemCount = 0;
    let totalWeight = 0;
    let hasLighting = false;
    let hasComms = false;
    let hasDefense = false;

    STORE_ITEMS.forEach((item) => {
      const qty = itemQuantities[item.id] || 0;
      if (qty > 0) {
        const itemPrice = calculateItemPrice(item.basePrice);
        totalCost += itemPrice * qty;
        totalItemCount += qty;
        totalWeight += item.weight * qty;

        if (item.id.includes('flashlight')) hasLighting = true;
        if (item.id === 'walkie-talkie') hasComms = true;
        if (item.id === 'shovel' || item.id === 'zap-gun' || item.id === 'stun-grenade') hasDefense = true;
      }
    });

    const remainingCredits = credits - totalCost;
    const isOverBudget = remainingCredits < 0;

    return {
      totalCost,
      totalItemCount,
      totalWeight,
      remainingCredits,
      isOverBudget,
      hasLighting,
      hasComms,
      hasDefense
    };
  }, [itemQuantities, globalDiscountPercent, credits]);

  const filteredItems = useMemo(() => {
    if (filterCategory === 'all') return STORE_ITEMS;
    return STORE_ITEMS.filter((item) => item.category === filterCategory);
  }, [filterCategory]);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header / Intro */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Store Item Discount & Budget Planner</h2>
            <p className="text-xs text-slate-400">
              Optimize terminal store purchases, account for random sales discounts, and balance crew equipment weight.
            </p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-cyan-400" />
            Crew Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setTeamSize(num)}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  teamSize === num
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:border-slate-600'
                }`}
              >
                {num} {num === 1 ? 'Solo' : 'Scavs'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Available Credits
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-mono">$</span>
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full pl-7 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
              placeholder="350"
            />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-amber-400" />
            Store Sale Discount
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="70"
              step="5"
              value={globalDiscountPercent}
              onChange={(e) => setGlobalDiscountPercent(parseInt(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <span className="text-sm font-bold font-mono text-amber-400 w-12 text-right">
              {globalDiscountPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Loadout Presets */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/40 p-3 border border-slate-800/80 rounded-xl">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Loadout Presets:
        </span>
        <button
          onClick={() => applyPreset('starter')}
          className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
        >
          Day 1 Starter
        </button>
        <button
          onClick={() => applyPreset('midgame')}
          className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
        >
          Quota 2 Standard
        </button>
        <button
          onClick={() => applyPreset('hightier')}
          className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
        >
          Titan / Tier 3 Raid
        </button>
        <button
          onClick={() => setItemQuantities({})}
          className="px-3 py-1.5 text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg transition ml-auto flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Clear Cart
        </button>
      </div>

      {/* Cart Summary Banner */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          shoppingSummary.isOverBudget
            ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Cart Cost</span>
            <p className="text-xl font-mono font-bold text-white">${shoppingSummary.totalCost}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Remaining Cash</span>
            <p
              className={`text-xl font-mono font-bold ${
                shoppingSummary.isOverBudget ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              ${shoppingSummary.remainingCredits}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Items</span>
            <p className="text-xl font-mono font-bold text-white">{shoppingSummary.totalItemCount} items</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Added Drop Weight</span>
            <p className="text-xl font-mono font-bold text-amber-300">{shoppingSummary.totalWeight} lbs</p>
          </div>
        </div>

        {/* Tactical Checks */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-4 justify-center text-xs">
          <span className={`flex items-center gap-1 ${shoppingSummary.hasLighting ? 'text-emerald-400' : 'text-slate-500'}`}>
            {shoppingSummary.hasLighting ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
            Lighting Included
          </span>
          <span className={`flex items-center gap-1 ${shoppingSummary.hasComms ? 'text-emerald-400' : 'text-slate-500'}`}>
            {shoppingSummary.hasComms ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
            Walkie Comms
          </span>
          <span className={`flex items-center gap-1 ${shoppingSummary.hasDefense ? 'text-emerald-400' : 'text-slate-500'}`}>
            {shoppingSummary.hasDefense ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
            Self-Defense Tool
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All Store Items' },
          { id: 'essential', label: 'Essentials' },
          { id: 'tactical', label: 'Tactical / Weapons' },
          { id: 'utility', label: 'Utility' },
          { id: 'luxury', label: 'High Cost / Luxury' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
              filterCategory === cat.id
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const discountedPrice = calculateItemPrice(item.basePrice);
          const hasDiscount = discountedPrice < item.basePrice;
          const currentQty = itemQuantities[item.id] || 0;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                currentQty > 0
                  ? 'bg-slate-900 border-amber-500/50 shadow-lg shadow-amber-950/20'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                    {item.name}
                    {item.recommendedPerPlayer && (
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                        Per Crew
                      </span>
                    )}
                  </h3>
                  <span className="text-[11px] text-slate-400 capitalize">{item.category}</span>
                </div>

                <div className="text-right font-mono">
                  <div className="flex items-center gap-1.5">
                    {hasDiscount && (
                      <span className="line-through text-xs text-slate-500">${item.basePrice}</span>
                    )}
                    <span className="text-base font-bold text-emerald-400">${discountedPrice}</span>
                  </div>
                  {hasDiscount && (
                    <span className="text-[10px] text-amber-400 font-semibold">{globalDiscountPercent}% OFF</span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-3 line-clamp-2 leading-relaxed">{item.description}</p>

              {/* Specs badges */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-4 bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
                <span className="flex items-center gap-1">
                  <Weight className="w-3 h-3 text-slate-400" />
                  {item.weight} lbs
                </span>
                <span className="flex items-center gap-1">
                  <Battery className="w-3 h-3 text-amber-400" />
                  {item.batteryLife}
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-xs text-slate-400 font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={currentQty <= 0}
                    className="w-7 h-7 flex items-center justify-center bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-md text-white font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-mono font-bold text-amber-300 text-sm">
                    {currentQty}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-md text-white font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LethalCompanyStoreBudgetPlanner;
