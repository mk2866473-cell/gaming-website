import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Zap,
  Award,
  Layers,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Hammer
} from 'lucide-react';

interface GearSlotConfig {
  id: string;
  name: string;
  tier: 'simple' | 'refined' | 'advanced' | 'mystic';
  upgradeLevel: number; // 0, 1, 2, 3
  infusionsCount: number; // 0, 1, 2, 3
}

const BASE_TIER_GS: Record<string, number> = {
  simple: 20,
  refined: 60,
  advanced: 110,
  mystic: 180
};

const INITIAL_SLOTS: GearSlotConfig[] = [
  { id: 'head', name: 'Headgear (Hat/Helmet)', tier: 'refined', upgradeLevel: 1, infusionsCount: 1 },
  { id: 'top', name: 'Chest Coat / Armor', tier: 'refined', upgradeLevel: 1, infusionsCount: 1 },
  { id: 'bottom', name: 'Trousers / Leggings', tier: 'refined', upgradeLevel: 0, infusionsCount: 1 },
  { id: 'gloves', name: 'Gloves / Bracers', tier: 'simple', upgradeLevel: 2, infusionsCount: 0 },
  { id: 'boots', name: 'Boots / Footwear', tier: 'refined', upgradeLevel: 0, infusionsCount: 1 },
  { id: 'cape', name: 'Back Cape / Cloak', tier: 'simple', upgradeLevel: 1, infusionsCount: 0 },
  { id: 'weapon', name: 'Mainhand Weapon (Axe/Pick/Gun)', tier: 'refined', upgradeLevel: 2, infusionsCount: 2 },
  { id: 'offhand', name: 'Offhand (Umbrella/Lantern)', tier: 'simple', upgradeLevel: 1, infusionsCount: 0 },
  { id: 'trinket', name: 'Trinket / Realm Charm', tier: 'simple', upgradeLevel: 0, infusionsCount: 0 }
];

const REALM_GATES = [
  { name: 'Abeyance Estate Realm', minGS: 10, power: 10 },
  { name: 'Antiquarian Realm', minGS: 25, power: 25 },
  { name: 'Astrolabe Realm', minGS: 40, power: 40 },
  { name: 'Provisioner Realm', minGS: 60, power: 60 },
  { name: 'Herbarium Realm', minGS: 80, power: 80 },
  { name: 'Gloom Realm', minGS: 110, power: 110 },
  { name: 'Hunt Realm', minGS: 140, power: 140 },
  { name: 'Ascended Vaults & Apex', minGS: 180, power: 220 }
];

export default function NightingaleGearScoreCalculator() {
  const [slots, setSlots] = useState<GearSlotConfig[]>(INITIAL_SLOTS);

  const calculateSlotGS = (slot: GearSlotConfig) => {
    const base = BASE_TIER_GS[slot.tier] || 20;
    const upgradeBonus = slot.upgradeLevel * 15;
    const infusionBonus = slot.infusionsCount * 10;
    return base + upgradeBonus + infusionBonus;
  };

  const totalGearScore = useMemo(() => {
    const sum = slots.reduce((acc, slot) => acc + calculateSlotGS(slot), 0);
    return Math.round(sum / slots.length);
  }, [slots]);

  const updateSlot = (id: string, field: keyof GearSlotConfig, val: any) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const setAllTiers = (tier: 'simple' | 'refined' | 'advanced' | 'mystic') => {
    setSlots((prev) => prev.map((s) => ({ ...s, tier })));
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Gear Score Tier & Infusion Leveling Calculator
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Calculate exact overall Gear Score across 9 equipment slots, bench upgrade tiers, and infusion applications in Nightingale.
            </p>
          </div>
        </div>
      </div>

      {/* Top Controls & Preset Tiers */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-300">Quick Gear Presets:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAllTiers('simple')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-xs font-medium"
          >
            All Simple (Tier 1)
          </button>
          <button
            onClick={() => setAllTiers('refined')}
            className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded text-xs font-medium"
          >
            All Refined (Tier 2)
          </button>
          <button
            onClick={() => setAllTiers('advanced')}
            className="px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 rounded text-xs font-medium"
          >
            All Advanced (Tier 3)
          </button>
          <button
            onClick={() => setAllTiers('mystic')}
            className="px-3 py-1.5 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 rounded text-xs font-medium"
          >
            All Mystic / Ascended (Tier 4)
          </button>
        </div>
      </div>

      {/* Equipment Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => {
          const slotGS = calculateSlotGS(slot);
          return (
            <div
              key={slot.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-semibold text-xs text-white truncate">{slot.name}</span>
                <span className="text-sm font-bold text-emerald-400 border border-emerald-500/20 px-2 py-0.5">
                  GS {slotGS}
                </span>
              </div>

              {/* Tier Select */}
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 block">Equipment Quality Tier:</label>
                <select
                  value={slot.tier}
                  onChange={(e) => updateSlot(slot.id, 'tier', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                >
                  <option value="simple">Simple / Common (Base GS 20)</option>
                  <option value="refined">Refined / Uncommon (Base GS 60)</option>
                  <option value="advanced">Advanced / Rare (Base GS 110)</option>
                  <option value="mystic">Mystic / Ascended (Base GS 180)</option>
                </select>
              </div>

              {/* Bench Upgrade Level */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Workbench Upgrade Level:</span>
                  <span className="text-emerald-300 font-semibold">+{slot.upgradeLevel * 15} GS</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[0, 1, 2, 3].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => updateSlot(slot.id, 'upgradeLevel', lvl)}
                      className={`py-1 text-[11px] rounded border transition-all ${
                        slot.upgradeLevel === lvl
                          ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      +{lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Infusions Count */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Applied Infusion Slots:</span>
                  <span className="text-cyan-300 font-semibold">+{slot.infusionsCount * 10} GS</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[0, 1, 2, 3].map((inf) => (
                    <button
                      key={inf}
                      onClick={() => updateSlot(slot.id, 'infusionsCount', inf)}
                      className={`py-1 text-[11px] rounded border transition-all ${
                        slot.infusionsCount === inf
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {inf} Slot{inf !== 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Dashboard & Realm Access Matrix */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/80">
                REALMWALKER ASSESSMENT
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">Calculated Average Gear Score</h3>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-4xl font-extrabold text-emerald-400 drop-shadow-md">
              GS {totalGearScore}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">Average across 9 equipped slots</span>
          </div>
        </div>

        {/* Realm Access Matrix */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> Accessible Realm Portals & Difficulty Gating
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {REALM_GATES.map((gate, i) => {
              const unlocked = totalGearScore >= gate.minGS;
              return (
                <div
                  key={i}
                  className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                    unlocked
                      ? 'bg-slate-900/90 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                  }`}
                >
                  <div>
                    <span className="font-semibold block">{gate.name}</span>
                    <span className="text-[11px] text-slate-400">Min GS {gate.minGS}</span>
                  </div>
                  {unlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500/60 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
