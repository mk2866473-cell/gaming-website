/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Ship, FlaskConical, Sparkles, Coins, Check, Share2, 
  Sliders, Award, Shield, Zap, Clock, AlertTriangle, 
  ChevronRight, ArrowRight, Filter, Layers, Target, Info,
  Flame, Crosshair, Compass, Radio, CheckCircle2, RotateCcw
} from 'lucide-react';

export interface ShipModule {
  id: string;
  name: string;
  sectionId: string;
  tier: number;
  commonCost: number;
  rareCost: number;
  superCost: number;
  reqCost: number;
  effect: string;
  priorityCategory: 1 | 2 | 3; // 1 = Cooldown reduction, 2 = +1 charge/ammo, 3 = Damage/Utility
  valueScore: number; // Out of 10
  whyBestOrder: string;
}

export interface ShipSection {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  description: string;
  accentColor: string;
}

export const SHIP_SECTIONS: ShipSection[] = [
  {
    id: 'patriotic-admin',
    name: 'Patriotic Administration Center',
    shortName: 'Patriotic Admin',
    icon: Shield,
    description: 'Upgrades support weapons, resupply drops, and infantry ammo capacity.',
    accentColor: 'text-blue-400'
  },
  {
    id: 'orbital-cannons',
    name: 'Orbital Cannons',
    shortName: 'Orbital Cannons',
    icon: Target,
    description: 'Enhances heavy 380mm/120mm barrages, railcannon strikes, and orbital cooldowns.',
    accentColor: 'text-red-400'
  },
  {
    id: 'hangar',
    name: 'Hangar',
    shortName: 'Hangar',
    icon: Zap,
    description: 'Improves Eagle strike turnaround times, bomb payloads, and extra charges.',
    accentColor: 'text-amber-400'
  },
  {
    id: 'bridge',
    name: 'Bridge',
    shortName: 'Bridge',
    icon: Compass,
    description: 'Expands radar scanning radius, arc lightning chaining, and targeting accuracy.',
    accentColor: 'text-emerald-400'
  },
  {
    id: 'engineering-bay',
    name: 'Engineering Bay',
    shortName: 'Engineering Bay',
    icon: Clock,
    description: 'Optimizes Hellpod maneuvering, sentry defenses, and backpack reload speed.',
    accentColor: 'text-cyan-400'
  },
  {
    id: 'robotics-workshop',
    name: 'Robotics Workshop',
    shortName: 'Robotics Workshop',
    icon: Crosshair,
    description: 'Boosts sentry deploy velocity, fire damage output, and recoil absorption.',
    accentColor: 'text-purple-400'
  }
];

export const ALL_SHIP_MODULES: ShipModule[] = [
  // 1. Patriotic Admin
  {
    id: 'donation-access-license',
    name: 'Donation Access License',
    sectionId: 'patriotic-admin',
    tier: 1,
    commonCost: 60,
    rareCost: 20,
    superCost: 0,
    reqCost: 1500,
    effect: 'Support Weapons drop with maximum ammunition capacity.',
    priorityCategory: 2,
    valueScore: 9.3,
    whyBestOrder: 'Immediate high value: Spawning with full Autocannon, Quasar, or Machine Gun ammo saves early resupply drops.'
  },
  {
    id: 'streamlined-request',
    name: 'Streamlined Request',
    sectionId: 'patriotic-admin',
    tier: 2,
    commonCost: 80,
    rareCost: 30,
    superCost: 0,
    reqCost: 2000,
    effect: 'Reduces Support Weapon cooldowns by 10%.',
    priorityCategory: 1,
    valueScore: 9.5,
    whyBestOrder: 'Top Priority Cooldown: Cuts 48 seconds off Quasar Cannon and Railgun call-in recharges across every mission.'
  },
  {
    id: 'hand-carts',
    name: 'Hand Carts',
    sectionId: 'patriotic-admin',
    tier: 3,
    commonCost: 40,
    rareCost: 10,
    superCost: 0,
    reqCost: 1000,
    effect: 'Reduces cooldown of all Backpack stratagems by 10%.',
    priorityCategory: 1,
    valueScore: 9.0,
    whyBestOrder: 'Ultra-cheap high impact: Shields and Jump Packs ready significantly faster at low sample cost.'
  },
  {
    id: 'superior-packing-methodology',
    name: 'Superior Packing Methodology',
    sectionId: 'patriotic-admin',
    tier: 4,
    commonCost: 150,
    rareCost: 100,
    superCost: 15,
    reqCost: 20000,
    effect: 'Resupply boxes refill Support Weapons to maximum capacity (all mags).',
    priorityCategory: 2,
    valueScore: 9.8,
    whyBestOrder: 'S-Tier Logistics: One resupply brick completely refills Spear, Recoilless, and Autocannon back to 100% ammo.'
  },

  // 2. Orbital Cannons
  {
    id: 'orbital-barrage-spread',
    name: 'Orbital Barrage Spread',
    sectionId: 'orbital-cannons',
    tier: 1,
    commonCost: 80,
    rareCost: 0,
    superCost: 0,
    reqCost: 1500,
    effect: 'Reduces 380mm and 120mm HE Barrage dispersion radius by 15%.',
    priorityCategory: 3,
    valueScore: 8.4,
    whyBestOrder: 'Tightens heavy artillery spread, concentrating devastating shells inside large Automaton fortresses.'
  },
  {
    id: 'more-guns',
    name: 'More Guns',
    sectionId: 'orbital-cannons',
    tier: 2,
    commonCost: 100,
    rareCost: 150,
    superCost: 20,
    reqCost: 25000,
    effect: 'Orbital 380mm and 120mm barrages fire 1 additional salvo of artillery shells.',
    priorityCategory: 3,
    valueScore: 8.9,
    whyBestOrder: 'Extended bombardment duration guarantees total eradication of heavy Automaton Fabricators and Titan nests.'
  },
  {
    id: 'zero-g-breech-loading',
    name: 'Zero-G Breech Loading',
    sectionId: 'orbital-cannons',
    tier: 3,
    commonCost: 0,
    rareCost: 80,
    superCost: 40,
    reqCost: 2500,
    effect: 'Reduces cooldown of all Orbital stratagems by 10%.',
    priorityCategory: 1,
    valueScore: 9.7,
    whyBestOrder: 'Absolute Essential: Drops Orbital Laser from 300s to 270s and Railcannon from 210s to 189s.'
  },
  {
    id: 'atmospheric-monitoring',
    name: 'Atmospheric Monitoring',
    sectionId: 'orbital-cannons',
    tier: 4,
    commonCost: 200,
    rareCost: 150,
    superCost: 20,
    reqCost: 25000,
    effect: 'Reduces orbital HE barrage spread by an additional 15%.',
    priorityCategory: 3,
    valueScore: 8.1,
    whyBestOrder: 'High cost end-game upgrade for dedicated artillery barrage specialists.'
  },

  // 3. Hangar
  {
    id: 'liquid-ventilated-cockpit',
    name: 'Liquid-Ventilated Cockpit',
    sectionId: 'hangar',
    tier: 1,
    commonCost: 100,
    rareCost: 60,
    superCost: 0,
    reqCost: 2000,
    effect: 'Eagle stratagem cooldown between strikes reduced by 50% (down to 7.5s).',
    priorityCategory: 1,
    valueScore: 9.6,
    whyBestOrder: 'Fast Burst: Rapidly drop double 500KG bombs or Airstrikes with almost zero pause between runs.'
  },
  {
    id: 'pit-crew-hazard-pay',
    name: 'Pit Crew Hazard Pay',
    sectionId: 'hangar',
    tier: 2,
    commonCost: 0,
    rareCost: 80,
    superCost: 20,
    reqCost: 3000,
    effect: 'Reduces Eagle Rearm cycle time by 20% (from 2:30 down to 2:00).',
    priorityCategory: 1,
    valueScore: 9.5,
    whyBestOrder: 'Massive Tempo Boost: Cuts 30 seconds off every rearm, keeping Eagle airstrikes constantly available.'
  },
  {
    id: 'expanded-weapons-bay',
    name: 'Expanded Weapons Bay',
    sectionId: 'hangar',
    tier: 3,
    commonCost: 0,
    rareCost: 120,
    superCost: 10,
    reqCost: 15000,
    effect: 'Eagle stratagems gain +1 strike use per rearm (e.g. 500KG gets 2 uses).',
    priorityCategory: 2,
    valueScore: 10.0,
    whyBestOrder: 'THE #1 BEST MODULE IN THE ENTIRE GAME: Grants +100% capacity to Eagle 500KG bombs and +33% to Airstrikes!'
  },
  {
    id: 'xxl-weapons-bay',
    name: 'XXL Weapons Bay',
    sectionId: 'hangar',
    tier: 4,
    commonCost: 150,
    rareCost: 120,
    superCost: 25,
    reqCost: 25000,
    effect: 'Eagle stratagems that drop bombs release 1 additional explosive munition.',
    priorityCategory: 3,
    valueScore: 8.8,
    whyBestOrder: 'Expands carpet bomb cluster radius for wiping massive Automaton heavy factory lines.'
  },

  // 4. Bridge
  {
    id: 'targeting-software-upgrade',
    name: 'Targeting Software Upgrade',
    sectionId: 'bridge',
    tier: 1,
    commonCost: 80,
    rareCost: 40,
    superCost: 0,
    reqCost: 1500,
    effect: 'Reduces call-in deployment time of all Orbital stratagems by 1 second.',
    priorityCategory: 3,
    valueScore: 8.5,
    whyBestOrder: 'Prevents Chargers and Hulks from sprinting out of Orbital Precision Strike impact zones.'
  },
  {
    id: 'nuclear-radar',
    name: 'Nuclear Radar',
    sectionId: 'bridge',
    tier: 2,
    commonCost: 0,
    rareCost: 60,
    superCost: 20,
    reqCost: 10000,
    effect: 'Increases enemy radar detection radius on your minimap by +50 meters.',
    priorityCategory: 3,
    valueScore: 8.7,
    whyBestOrder: 'Critical Stealth & Scouting: Spot Stalker nests and Automaton patrols well before they trigger breaches.'
  },
  {
    id: 'long-range-cannon',
    name: 'Long Range Cannon',
    sectionId: 'bridge',
    tier: 3,
    commonCost: 150,
    rareCost: 0,
    superCost: 0,
    reqCost: 2000,
    effect: 'Improves orbital bombardment angle trajectory and minimizes terrain clipping.',
    priorityCategory: 3,
    valueScore: 7.9,
    whyBestOrder: 'Eliminates mountain occlusions when calling in strikes near canyons and cliffs.'
  },
  {
    id: 'circuit-expansion',
    name: 'Circuit Expansion',
    sectionId: 'bridge',
    tier: 4,
    commonCost: 200,
    rareCost: 150,
    superCost: 20,
    reqCost: 20000,
    effect: 'Lightning arcs from Arc Thrower and Tesla Tower jump to +1 additional target.',
    priorityCategory: 2,
    valueScore: 8.6,
    whyBestOrder: 'Increases Arc Thrower multi-target crowd clearing efficiency by +33% against bug swarms.'
  },

  // 5. Engineering Bay
  {
    id: 'synthetic-supplementation',
    name: 'Synthetic Supplementation',
    sectionId: 'engineering-bay',
    tier: 1,
    commonCost: 60,
    rareCost: 15,
    superCost: 0,
    reqCost: 1500,
    effect: 'Reduces cooldown of Resupply, Support Weapon, and Backpacks by 10%.',
    priorityCategory: 1,
    valueScore: 9.4,
    whyBestOrder: 'Essential early tier: Speeds up squad resupply pods and emergency backpack redeployments.'
  },
  {
    id: 'power-steering',
    name: 'Power Steering',
    sectionId: 'engineering-bay',
    tier: 2,
    commonCost: 80,
    rareCost: 0,
    superCost: 0,
    reqCost: 2000,
    effect: 'Improves Hellpod steering responsiveness, allowing landing on high plateaus.',
    priorityCategory: 3,
    valueScore: 8.2,
    whyBestOrder: 'Provides tactical high-ground respawns and lets you crush Bile Titans with reinforcement pods.'
  },
  {
    id: 'advanced-crew-training',
    name: 'Advanced Crew Training',
    sectionId: 'engineering-bay',
    tier: 3,
    commonCost: 0,
    rareCost: 100,
    superCost: 0,
    reqCost: 15000,
    effect: 'Reduces reload time of Sentry turrets by 10%.',
    priorityCategory: 3,
    valueScore: 7.8,
    whyBestOrder: 'Keeps Autocannon and Mortar sentries firing continuously with fewer barrel heat pauses.'
  },
  {
    id: 'blast-absorption',
    name: 'Blast Absorption',
    sectionId: 'engineering-bay',
    tier: 4,
    commonCost: 150,
    rareCost: 100,
    superCost: 15,
    reqCost: 20000,
    effect: 'Sentries take 50% less damage from explosive blasts and rockets.',
    priorityCategory: 3,
    valueScore: 8.9,
    whyBestOrder: 'Vital for Automaton missions: Prevents Rocket Devastators and Gunships from one-shotting your Sentries.'
  },

  // 6. Robotics Workshop
  {
    id: 'dynamic-tracking',
    name: 'Dynamic Tracking',
    sectionId: 'robotics-workshop',
    tier: 1,
    commonCost: 0,
    rareCost: 80,
    superCost: 10,
    reqCost: 15000,
    effect: 'Significantly reduces Sentry deployment pod delivery time.',
    priorityCategory: 3,
    valueScore: 8.3,
    whyBestOrder: 'Deploys defense turrets on the field 3 seconds faster under intense bug breach pressure.'
  },
  {
    id: 'automated-assembly',
    name: 'Automated Assembly',
    sectionId: 'robotics-workshop',
    tier: 2,
    commonCost: 60,
    rareCost: 0,
    superCost: 0,
    reqCost: 1500,
    effect: 'Reduces Sentry call-in deployment delay to instant zero.',
    priorityCategory: 3,
    valueScore: 8.5,
    whyBestOrder: 'Cheap early pickup that removes pod dispatch animation delay.'
  },
  {
    id: 'enhanced-combustion',
    name: 'Enhanced Combustion',
    sectionId: 'robotics-workshop',
    tier: 3,
    commonCost: 100,
    rareCost: 20,
    superCost: 0,
    reqCost: 10000,
    effect: 'Fire damage from all stratagems (Flamethrower, Incendiary Mines, Napalm) increased by +25%.',
    priorityCategory: 3,
    valueScore: 9.2,
    whyBestOrder: 'Meta Bug Destroyer: Buffs Eagle Napalm and Flamethrower ticks to incinerate Charger swarms.'
  },
  {
    id: 'shock-absorption',
    name: 'Shock Absorption',
    sectionId: 'robotics-workshop',
    tier: 4,
    commonCost: 150,
    rareCost: 100,
    superCost: 20,
    reqCost: 25000,
    effect: 'Reduces recoil on Sentry turrets by 50%, improving sustained tracking.',
    priorityCategory: 3,
    valueScore: 8.0,
    whyBestOrder: 'Improves Gatling and Machine Gun Sentry accuracy at long engagement ranges.'
  }
];

export default function HelldiversShipModuleCalculator() {
  // State: Set of Owned Module IDs
  const [ownedModuleIds, setOwnedModuleIds] = useState<Set<string>>(() => {
    return new Set(['donation-access-license', 'liquid-ventilated-cockpit', 'streamlined-request']);
  });

  const [activeSectionId, setActiveSectionId] = useState<string>('hangar');
  const [filterType, setFilterType] = useState<'all' | 'super' | 'unowned'>('all');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Toggle Owned
  const toggleOwned = (moduleId: string) => {
    setOwnedModuleIds(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  // Quick Preset Actions
  const applyPreset = (type: 'cadet' | 'meta' | 'max') => {
    if (type === 'cadet') {
      setOwnedModuleIds(new Set());
    } else if (type === 'meta') {
      // Essential Priority Modules
      setOwnedModuleIds(new Set([
        'donation-access-license',
        'streamlined-request',
        'hand-carts',
        'liquid-ventilated-cockpit',
        'pit-crew-hazard-pay',
        'expanded-weapons-bay',
        'zero-g-breech-loading',
        'synthetic-supplementation',
        'superior-packing-methodology'
      ]));
    } else if (type === 'max') {
      setOwnedModuleIds(new Set(ALL_SHIP_MODULES.map(m => m.id)));
    }
  };

  // Totals Spent & Remaining
  const totals = useMemo(() => {
    let spentCommon = 0;
    let spentRare = 0;
    let spentSuper = 0;
    let spentReq = 0;

    let neededCommon = 0;
    let neededRare = 0;
    let neededSuper = 0;
    let neededReq = 0;

    ALL_SHIP_MODULES.forEach(module => {
      if (ownedModuleIds.has(module.id)) {
        spentCommon += module.commonCost;
        spentRare += module.rareCost;
        spentSuper += module.superCost;
        spentReq += module.reqCost;
      } else {
        neededCommon += module.commonCost;
        neededRare += module.rareCost;
        neededSuper += module.superCost;
        neededReq += module.reqCost;
      }
    });

    const totalModules = ALL_SHIP_MODULES.length; // 24
    const ownedCount = ownedModuleIds.size;
    const progressPercent = Math.round((ownedCount / totalModules) * 100);

    return {
      spentCommon,
      spentRare,
      spentSuper,
      spentReq,
      neededCommon,
      neededRare,
      neededSuper,
      neededReq,
      totalModules,
      ownedCount,
      progressPercent
    };
  }, [ownedModuleIds]);

  // Filtered Modules for Selected Section
  const sectionModules = useMemo(() => {
    let list = ALL_SHIP_MODULES.filter(m => m.sectionId === activeSectionId);
    if (filterType === 'super') {
      list = list.filter(m => m.superCost > 0);
    } else if (filterType === 'unowned') {
      list = list.filter(m => !ownedModuleIds.has(m.id));
    }
    return list;
  }, [activeSectionId, filterType, ownedModuleIds]);

  // Recommended "Best Order to Buy" List (Unowned modules sorted by Priority Category then ValueScore)
  const recommendedPath = useMemo(() => {
    const unowned = ALL_SHIP_MODULES.filter(m => !ownedModuleIds.has(m.id));
    
    // Sort: Priority 1 first, then Priority 2, then Priority 3; inside each sort by valueScore desc
    unowned.sort((a, b) => {
      if (a.priorityCategory !== b.priorityCategory) {
        return a.priorityCategory - b.priorityCategory;
      }
      return b.valueScore - a.valueScore;
    });

    return unowned.slice(0, 5);
  }, [ownedModuleIds]);

  // Best Next Single Module
  const nextBestModule = recommendedPath[0] || null;

  // Share Configuration
  const handleShare = () => {
    const ownedList = Array.from(ownedModuleIds).join(',');
    const shareText = `HELLDIVERS 2 SUPER DESTROYER UPGRADE STATUS\n` +
      `Modules Owned: ${totals.ownedCount}/${totals.totalModules} (${totals.progressPercent}% Fleet Maxed)\n` +
      `Remaining Costs: ${totals.neededCommon} Common | ${totals.neededRare} Rare | ${totals.neededSuper} Super | ${totals.neededReq} Requisition\n` +
      `Recommended Next Purchase: ${nextBestModule ? nextBestModule.name : 'All Modules Maxed!'}\n` +
      `Optimize your upgrade path: https://gamingtoolshub.com/tools/helldivers-2-ship-module-calculator?owned=${encodeURIComponent(ownedList)}`;

    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Top Banner & Overall Ship Progress Bar */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/10 border border-[#FFE900]/40 flex items-center justify-center text-[#FFE900]">
              <Ship className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Naval Engineering
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Ship Module Upgrade Path Calculator (2026)
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => applyPreset('cadet')}
              className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-zinc-500 cursor-pointer font-mono"
            >
              Reset (0)
            </button>
            <button
              onClick={() => applyPreset('meta')}
              className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-[#FFE900] hover:border-[#FFE900] cursor-pointer font-mono font-bold"
            >
              Meta Priority (9)
            </button>
            <button
              onClick={() => applyPreset('max')}
              className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-emerald-400 hover:border-emerald-500 cursor-pointer font-mono"
            >
              Max All (24)
            </button>
            <button
              onClick={handleShare}
              className="text-xs px-3 py-1 rounded-lg bg-[#FFE900] text-black font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#fff033] shadow cursor-pointer ml-1"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Copied!' : 'Share Ship'}
            </button>
          </div>
        </div>

        {/* Big Fleet Progress Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Main Progress % */}
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase font-mono">
              Fleet Upgrade Progress
            </span>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                {totals.ownedCount}
              </span>
              <span className="text-sm font-mono text-zinc-400">
                / {totals.totalModules} Modules ({totals.progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FFE900] transition-all duration-300 rounded-full"
                style={{ width: `${totals.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Common Samples Remaining */}
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-emerald-500/30 flex flex-col justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono flex items-center gap-1">
              <FlaskConical className="w-3.5 h-3.5" />
              Common Samples
            </span>
            <div className="my-2">
              <span className="text-2xl font-black font-mono text-emerald-400">
                {totals.neededCommon}
              </span>
              <span className="text-xs text-zinc-400 font-mono ml-1.5">Needed</span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">
              Spent so far: {totals.spentCommon}
            </span>
          </div>

          {/* Rare Samples Remaining */}
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-amber-500/30 flex flex-col justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase font-mono flex items-center gap-1">
              <FlaskConical className="w-3.5 h-3.5" />
              Rare Samples (Bottleneck)
            </span>
            <div className="my-2">
              <span className="text-2xl font-black font-mono text-amber-400">
                {totals.neededRare}
              </span>
              <span className="text-xs text-zinc-400 font-mono ml-1.5">Needed</span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">
              Spent so far: {totals.spentRare}
            </span>
          </div>

          {/* Super Uranium & Requisition */}
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-fuchsia-500/30 flex flex-col justify-between">
            <span className="text-xs font-bold text-fuchsia-400 uppercase font-mono flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Super Uranium & Req
            </span>
            <div className="my-2 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black font-mono text-fuchsia-400">
                  {totals.neededSuper}
                </span>
                <span className="text-xs text-zinc-400 font-mono ml-1">Super</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold font-mono text-[#FFE900]">
                  {(totals.neededReq / 1000).toFixed(0)}k
                </span>
                <span className="text-xs text-zinc-400 font-mono ml-1">Req</span>
              </div>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">
              Spent Super: {totals.spentSuper}
            </span>
          </div>
        </div>

        {/* Dynamic Highlight: Next Best Purchase Callout */}
        {nextBestModule && (
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-[#FFE900]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFE900]/15 text-[#FFE900] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase font-bold text-[#FFE900]">
                  Highest Value In-Game Upgrade:
                </span>
                <div className="text-base font-black text-white">
                  Unlock Next: <span className="text-[#FFE900]">{nextBestModule.name}</span> (Value Score: {nextBestModule.valueScore}/10)
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {nextBestModule.whyBestOrder}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleOwned(nextBestModule.id)}
              className="px-4 py-2 rounded-lg bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider shrink-0 hover:bg-[#fff033] cursor-pointer shadow"
            >
              Mark as Unlocked
            </button>
          </div>
        )}
      </div>

      {/* Main 2-Column Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 6 Ship Sections Vertical Tabs (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Ship Sections (6 Total)
            </span>
          </div>

          <div className="space-y-2">
            {SHIP_SECTIONS.map(section => {
              const IconComp = section.icon;
              const isSelected = section.id === activeSectionId;
              const sectionModulesAll = ALL_SHIP_MODULES.filter(m => m.sectionId === section.id);
              const sectionOwnedCount = sectionModulesAll.filter(m => ownedModuleIds.has(m.id)).length;
              const sectionTotal = sectionModulesAll.length;
              const isFullyMaxed = sectionOwnedCount === sectionTotal;

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-zinc-900 border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.15)] ring-1 ring-[#FFE900]'
                      : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#FFE900]/15 text-[#FFE900]' : 'bg-zinc-900 text-zinc-400 group-hover:text-zinc-200'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-black ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                        {section.name}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5 mt-0.5">
                        <span>{sectionOwnedCount}/{sectionTotal} Owned</span>
                        {isFullyMaxed && (
                          <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Maxed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition ${isSelected ? 'text-[#FFE900] translate-x-1' : 'text-zinc-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Module List for Selected Section (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header & Filter Controls */}
          <div className="bg-[#090a0f] border border-zinc-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black uppercase text-white flex items-center gap-2">
                {SHIP_SECTIONS.find(s => s.id === activeSectionId)?.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {SHIP_SECTIONS.find(s => s.id === activeSectionId)?.description}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  filterType === 'all' ? 'bg-[#FFE900] text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('super')}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1 ${
                  filterType === 'super' ? 'bg-fuchsia-500 text-white' : 'text-zinc-400 hover:text-fuchsia-400'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Super Only
              </button>
              <button
                onClick={() => setFilterType('unowned')}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  filterType === 'unowned' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Unowned
              </button>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="space-y-3">
            {sectionModules.map(module => {
              const isOwned = ownedModuleIds.has(module.id);

              return (
                <div
                  key={module.id}
                  onClick={() => toggleOwned(module.id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer select-none relative overflow-hidden ${
                    isOwned
                      ? 'bg-zinc-950/40 border-zinc-800/60 opacity-60'
                      : 'bg-[#090b14] border-zinc-800 hover:border-[#FFE900]/50 hover:bg-[#0c0f1c] shadow-lg'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Left: Checkbox + Name + Effect */}
                    <div className="flex items-start gap-3.5">
                      {/* Checkbox */}
                      <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition ${
                        isOwned 
                          ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                          : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                      }`}>
                        {isOwned && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
                            Tier {module.tier}
                          </span>
                          <h4 className={`text-base font-black ${isOwned ? 'line-through text-zinc-400' : 'text-white'}`}>
                            {module.name}
                          </h4>
                          {isOwned && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold">
                              OWNED
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {module.effect}
                        </p>

                        <div className="pt-1 text-[11px] text-zinc-500 font-mono">
                          Strategic Value: <span className="text-zinc-400">{module.whyBestOrder}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Value Score & Cost Chips */}
                    <div className="flex flex-col sm:items-end justify-between shrink-0 gap-2">
                      {/* Value Score Pill */}
                      <div className="flex items-center gap-1.5 self-start sm:self-end">
                        <span className="text-[10px] font-mono uppercase text-zinc-500">Value Score:</span>
                        <span className={`text-xs font-black font-mono px-2 py-0.5 rounded border ${
                          module.valueScore >= 9.5
                            ? 'bg-[#FFE900]/15 text-[#FFE900] border-[#FFE900]/40'
                            : module.valueScore >= 9.0
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                        }`}>
                          {module.valueScore} / 10
                        </span>
                      </div>

                      {/* Cost Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-end">
                        {module.commonCost > 0 && (
                          <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 flex items-center gap-1 font-bold">
                            <FlaskConical className="w-3 h-3" />
                            {module.commonCost}
                          </span>
                        )}
                        {module.rareCost > 0 && (
                          <span className="text-xs font-mono px-2 py-1 rounded bg-amber-950/50 border border-amber-500/30 text-amber-400 flex items-center gap-1 font-bold">
                            <FlaskConical className="w-3 h-3" />
                            {module.rareCost}
                          </span>
                        )}
                        {module.superCost > 0 && (
                          <span className="text-xs font-mono px-2 py-1 rounded bg-fuchsia-950/50 border border-fuchsia-500/40 text-fuchsia-400 flex items-center gap-1 font-bold">
                            <Sparkles className="w-3 h-3" />
                            {module.superCost}
                          </span>
                        )}
                        {module.reqCost > 0 && (
                          <span className="text-xs font-mono px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-[#FFE900] flex items-center gap-1 font-bold">
                            <Coins className="w-3 h-3" />
                            {module.reqCost}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recommended Upgrade Path (Top 5 Ranked Order) */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="pb-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FFE900]" />
              Official Meta Recommended Unlock Order (Top 5 Next)
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Ranked dynamically by Cooldown Reduction (Priority 1) &gt; Extra Stratagem Capacity (Priority 2) &gt; Damage/Radius (Priority 3).
            </p>
          </div>
        </div>

        {recommendedPath.length === 0 ? (
          <div className="py-8 text-center text-zinc-400 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">All Ship Modules Successfully Unlocked!</h4>
            <p className="text-xs">Your Super Destroyer is at 100% maximum combat capability.</p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {recommendedPath.map((rec, index) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start md:items-center gap-3.5">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE900]/15 text-[#FFE900] font-black font-mono flex items-center justify-center shrink-0 border border-[#FFE900]/30 text-sm">
                    #{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white">{rec.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
                        {SHIP_SECTIONS.find(s => s.id === rec.sectionId)?.shortName}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {rec.whyBestOrder}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    {rec.commonCost > 0 && <span className="text-emerald-400 font-bold">{rec.commonCost} C</span>}
                    {rec.rareCost > 0 && <span className="text-amber-400 font-bold">{rec.rareCost} R</span>}
                    {rec.superCost > 0 && <span className="text-fuchsia-400 font-bold">{rec.superCost} S</span>}
                  </div>
                  <button
                    onClick={() => toggleOwned(rec.id)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-white border border-zinc-700 cursor-pointer"
                  >
                    Mark Owned
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEO Footer & Value Formula Documentation */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 text-zinc-300 text-xs leading-relaxed">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FFE900]" />
          Ship Module Value Optimization Logic (2026 Guide)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FFE900]" />
              Priority 1: Cooldown Reductions
            </h5>
            <p className="text-zinc-400">
              Cooldown reduction modules (Zero-G Breech Loading, Streamlined Request, Liquid-Ventilated Cockpit) allow you to call in 20% to 50% more stratagems per mission, providing the highest combat tempo.
            </p>
          </div>

          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Priority 2: Extra Stratagem Charges
            </h5>
            <p className="text-zinc-400">
              Modules like Expanded Weapons Bay give +1 extra Eagle 500KG bomb and +1 Airstrike per rearm cycle, literally doubling your burst explosive ordnance without spending additional samples.
            </p>
          </div>

          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-400" />
              Priority 3: Area Spread & Utility
            </h5>
            <p className="text-zinc-400">
              Damage buffs (Enhanced Combustion +25%) and barrage spread reductions concentrate fire against heavy targets. Leave luxury modules for when your core cooldown and ammo tree is completed.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Ship Module Calculator - Best Upgrade Order 2026 • Verified Super Earth Naval Hub
        </div>
      </div>
    </div>
  );
}
