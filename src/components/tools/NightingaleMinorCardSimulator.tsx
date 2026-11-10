import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Zap,
  CloudRain,
  Moon,
  Sun,
  Shield,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Layers,
  HelpCircle,
  RotateCcw,
  Check
} from 'lucide-react';

interface MinorCard {
  id: string;
  name: string;
  category: 'Harvesting' | 'Combat' | 'Mobility' | 'Environment' | 'Crafting';
  description: string;
  buffs: string[];
  debuffs: string[];
  statChanges: {
    harvestYieldPct?: number;
    damageBoostPct?: number;
    damageTakenPct?: number;
    moveSpeedPct?: number;
    carryCapacityKg?: number;
    staminaCostPct?: number;
    craftingSpeedPct?: number;
  };
  weatherEffect: string;
  lightingState: string;
}

const MINOR_CARDS: MinorCard[] = [
  {
    id: 'thistlebloom',
    name: 'Thistlebloom Card',
    category: 'Harvesting',
    description: 'Enhances wild botanicals & crop growth while slightly weakening physical resilience.',
    buffs: ['+50% Flora & Herb Harvesting Yield'],
    debuffs: ['-15% Physical Damage Resistance'],
    statChanges: {
      harvestYieldPct: 50,
      damageTakenPct: 15
    },
    weatherEffect: 'Gentle Breeze',
    lightingState: 'Golden Dawn'
  },
  {
    id: 'blood-moon',
    name: 'Blood Moon Card',
    category: 'Combat',
    description: 'Enrages Bound enemies and wild fauna, boosting essence loot drops and combat danger.',
    buffs: ['+100% Rare Essence Drop Chance', '+25% Critical Hit Damage'],
    debuffs: ['+30% Enemy Damage Dealt', '+40% Enemy Health'],
    statChanges: {
      damageBoostPct: 25,
      damageTakenPct: 30
    },
    weatherEffect: 'Crimson Sky Fog',
    lightingState: 'Blood Red Night'
  },
  {
    id: 'fell-harvest',
    name: 'Fell Harvest Card',
    category: 'Harvesting',
    description: 'Doubles all farm crop and wood yields in exchange for reduced maximum health.',
    buffs: ['+100% Timber & Farm Crop Harvest Yield'],
    debuffs: ['-25% Maximum Health'],
    statChanges: {
      harvestYieldPct: 100,
      damageTakenPct: 25
    },
    weatherEffect: 'Overcast Drizzle',
    lightingState: 'Overcast Dusk'
  },
  {
    id: 'deep-pocket',
    name: 'Deep Pocket Card',
    category: 'Mobility',
    description: 'Increases Realmwalker inventory capacity, but reduces sprint acceleration.',
    buffs: ['+100 kg Carry Weight Limit'],
    debuffs: ['-15% Movement & Sprint Speed'],
    statChanges: {
      carryCapacityKg: 100,
      moveSpeedPct: -15
    },
    weatherEffect: 'Calm Atmosphere',
    lightingState: 'Neutral Day'
  },
  {
    id: 'tempest',
    name: 'Tempest Card',
    category: 'Environment',
    description: 'Summons a raging thunder storm, boosting elemental lightning & water attacks.',
    buffs: ['+45% Lightning & Water Magic Damage'],
    debuffs: ['Constant Rain (Wetness Drain)', 'Low Visibility'],
    statChanges: {
      damageBoostPct: 45,
      staminaCostPct: 10
    },
    weatherEffect: 'Heavy Thunderstorm & Lightning',
    lightingState: 'Dark Storm Night'
  },
  {
    id: 'utter-dark',
    name: 'Utter Dark Card',
    category: 'Environment',
    description: 'Plunges the realm into perpetual pitch darkness, empowering sneak strikes.',
    buffs: ['+50% Stealth Backstab Damage', '+20% Move Speed in Darkness'],
    debuffs: ['Zero Daylight', '+50% Bound Spawn Rate'],
    statChanges: {
      damageBoostPct: 50,
      moveSpeedPct: 20
    },
    weatherEffect: 'Clear Night Sky',
    lightingState: 'Pitch Black Night'
  },
  {
    id: 'trickster',
    name: 'Trickster Card',
    category: 'Mobility',
    description: 'Inverts local gravity vectors, granting high leaps and reduced fall impact.',
    buffs: ['+200% Jump Height', '-80% Fall Damage Taken'],
    debuffs: ['Random Enemy Teleports'],
    statChanges: {
      staminaCostPct: -30,
      moveSpeedPct: 10
    },
    weatherEffect: 'Aurora Borealis Glimmer',
    lightingState: 'Twinkling Twilight'
  },
  {
    id: 'empyrean',
    name: 'Empyrean Card',
    category: 'Environment',
    description: 'Establishes endless bright sunshine, eliminating sprint stamina depletion.',
    buffs: ['0 Stamina Cost while Sprinting', 'Removes Night Monsters'],
    debuffs: ['No Night-Exclusive Spawn Drops'],
    statChanges: {
      staminaCostPct: -100,
      moveSpeedPct: 15
    },
    weatherEffect: 'Clear Blue Sky',
    lightingState: 'Endless Midday Sun'
  },
  {
    id: 'forge-hand',
    name: 'Forge Hand Card',
    category: 'Crafting',
    description: 'Supercharges masonry and furnace refining speeds for rapid ore processing.',
    buffs: ['+100% Smelting & Refining Speed', '+25% Metal Ingot Yield'],
    debuffs: ['+20% Fire & Extreme Heat Damage Taken'],
    statChanges: {
      craftingSpeedPct: 100,
      damageTakenPct: 20
    },
    weatherEffect: 'Heat Haze & Ember Winds',
    lightingState: 'Amber Twilight'
  }
];

export default function NightingaleMinorCardSimulator() {
  const [selectedCard1Id, setSelectedCard1Id] = useState<string>('thistlebloom');
  const [selectedCard2Id, setSelectedCard2Id] = useState<string>('none');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const card1 = useMemo(
    () => MINOR_CARDS.find((c) => c.id === selectedCard1Id),
    [selectedCard1Id]
  );

  const card2 = useMemo(
    () => MINOR_CARDS.find((c) => c.id === selectedCard2Id),
    [selectedCard2Id]
  );

  const filteredCards = useMemo(() => {
    if (categoryFilter === 'all') return MINOR_CARDS;
    return MINOR_CARDS.filter((c) => c.category === categoryFilter);
  }, [categoryFilter]);

  // Aggregate stats
  const combinedStats = useMemo(() => {
    let harvest = 0;
    let dmgBoost = 0;
    let dmgTaken = 0;
    let moveSpeed = 0;
    let carryCap = 0;
    let staminaCost = 0;
    let craftSpeed = 0;

    [card1, card2].forEach((c) => {
      if (!c) return;
      if (c.statChanges.harvestYieldPct) harvest += c.statChanges.harvestYieldPct;
      if (c.statChanges.damageBoostPct) dmgBoost += c.statChanges.damageBoostPct;
      if (c.statChanges.damageTakenPct) dmgTaken += c.statChanges.damageTakenPct;
      if (c.statChanges.moveSpeedPct) moveSpeed += c.statChanges.moveSpeedPct;
      if (c.statChanges.carryCapacityKg) carryCap += c.statChanges.carryCapacityKg;
      if (c.statChanges.staminaCostPct) staminaCost += c.statChanges.staminaCostPct;
      if (c.statChanges.craftingSpeedPct) craftSpeed += c.statChanges.craftingSpeedPct;
    });

    return { harvest, dmgBoost, dmgTaken, moveSpeed, carryCap, staminaCost, craftSpeed };
  }, [card1, card2]);

  return (
    <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Minor Card Modifier & Realmic Transmuter Simulator
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Simulate environmental weather shifts, player stat deltas, resource harvest multipliers, and combat trade-offs when playing Minor Realm Cards in Nightingale.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs border-y border-slate-800/50 py-3">
        <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Filter by Category:</span>
        {['all', 'Harvesting', 'Combat', 'Mobility', 'Environment', 'Crafting'].map((cat, idx, arr) => (
          <React.Fragment key={cat}>
            <button
              onClick={() => setCategoryFilter(cat)}
              className={`transition-all hover:text-emerald-400 ${
                categoryFilter === cat
                  ? 'text-emerald-400 font-bold underline underline-offset-4'
                  : 'text-slate-400 font-medium'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
            {idx < arr.length - 1 && <span className="text-slate-800">|</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Slot Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Slot 1 */}
        <div className="bg-slate-950/60 border border-emerald-500/30 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Active Minor Card Slot #1
            </h3>
            <span className="text-xs text-slate-400">Realmic Transmuter Slot A</span>
          </div>

          <select
            value={selectedCard1Id}
            onChange={(e) => setSelectedCard1Id(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            {filteredCards.map((c) => (
              <option key={c.id} value={c.id}>
                [{c.category}] {c.name}
              </option>
            ))}
          </select>

          {card1 && (
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
              <p className="text-slate-300">{card1.description}</p>
              <div>
                <span className="text-emerald-400 font-semibold block mb-1">Active Buffs:</span>
                <ul className="space-y-0.5">
                  {card1.buffs.map((b, i) => (
                    <li key={i} className="text-emerald-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-rose-400 font-semibold block mb-1">Active Debuffs:</span>
                <ul className="space-y-0.5">
                  {card1.debuffs.map((d, i) => (
                    <li key={i} className="text-rose-300 flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Card Slot 2 (Optional Combo) */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Active Minor Card Slot #2 (Combo)
            </h3>
            <span className="text-xs text-slate-400">Optional Overwrite</span>
          </div>

          <select
            value={selectedCard2Id}
            onChange={(e) => setSelectedCard2Id(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="none">-- None (Single Card Active) --</option>
            {MINOR_CARDS.filter((c) => c.id !== selectedCard1Id).map((c) => (
              <option key={c.id} value={c.id}>
                [{c.category}] {c.name}
              </option>
            ))}
          </select>

          {card2 ? (
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
              <p className="text-slate-300">{card2.description}</p>
              <div>
                <span className="text-emerald-400 font-semibold block mb-1">Active Buffs:</span>
                <ul className="space-y-0.5">
                  {card2.buffs.map((b, i) => (
                    <li key={i} className="text-emerald-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-rose-400 font-semibold block mb-1">Active Debuffs:</span>
                <ul className="space-y-0.5">
                  {card2.debuffs.map((d, i) => (
                    <li key={i} className="text-rose-300 flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/40 p-4 rounded-lg border border-dashed border-slate-800 text-xs text-slate-500 text-center py-8">
              Select a 2nd Minor Card to calculate combined environmental stat stacking.
            </div>
          )}
        </div>
      </div>

      {/* Aggregate Net Output Dashboard */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-emerald-500/20 pb-3">
          <Sparkles className="w-5 h-5 text-emerald-400" /> Net Realm Modifiers & Environment State
        </h3>

        {/* Dynamic Multiplier Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Harvest Yield</span>
            <span className={`text-lg font-bold ${combinedStats.harvest > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
              +{combinedStats.harvest}%
            </span>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Damage Output</span>
            <span className={`text-lg font-bold ${combinedStats.dmgBoost > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
              +{combinedStats.dmgBoost}%
            </span>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Dmg Resistance</span>
            <span className={`text-lg font-bold ${combinedStats.dmgTaken > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
              {combinedStats.dmgTaken > 0 ? `-${combinedStats.dmgTaken}%` : '0%'}
            </span>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Movement Speed</span>
            <span className={`text-lg font-bold ${combinedStats.moveSpeed >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {combinedStats.moveSpeed >= 0 ? `+${combinedStats.moveSpeed}%` : `${combinedStats.moveSpeed}%`}
            </span>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Carry Capacity</span>
            <span className={`text-lg font-bold ${combinedStats.carryCap > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
              +{combinedStats.carryCap} kg
            </span>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Stamina Drain</span>
            <span className={`text-lg font-bold ${combinedStats.staminaCost <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {combinedStats.staminaCost}%
            </span>
          </div>
        </div>

        {/* Environmental Lighting & Weather Banner */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <CloudRain className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-400 block">Transmuted Weather Effect:</span>
              <span className="text-white font-semibold">{card1?.weatherEffect || 'Default Realm Weather'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Sun className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 block">Atmospheric Lighting State:</span>
              <span className="text-white font-semibold">{card1?.lightingState || 'Default Daytime'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
