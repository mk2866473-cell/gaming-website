/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Coins, Sparkles, Zap, TrendingUp, Layers, CheckCircle2, 
  RotateCcw, Shield, Clock, Flame, ChevronDown, Check, Info, Award
} from 'lucide-react';

interface ModuleRarityCost {
  name: string;
  color: string;
  baseKuiper: number;
  baseGold: number;
}

const MODULE_TIERS: Record<string, ModuleRarityCost> = {
  standard: { name: 'Normal (Blue)', color: 'text-sky-400', baseKuiper: 104000, baseGold: 1040000 },
  rare: { name: 'Rare (Purple)', color: 'text-purple-400', baseKuiper: 208000, baseGold: 2080000 },
  ultimate: { name: 'Ultimate (Gold)', color: 'text-amber-400', baseKuiper: 312000, baseGold: 3120000 },
  transcendent: { name: 'Transcendent (Red)', color: 'text-rose-400', baseKuiper: 522000, baseGold: 5220000 },
};

interface FarmSpot {
  name: string;
  location: string;
  kuiperPerHour: number;
  goldPerHour: number;
  xpPerHour: number;
  difficulty: string;
}

const FARM_SPOTS: FarmSpot[] = [
  {
    name: 'Block Kuiper Mining (Special Op)',
    location: 'Sterile Land - Rockfall',
    kuiperPerHour: 280000,
    goldPerHour: 2400000,
    xpPerHour: 650000,
    difficulty: 'Easy / Matchmade'
  },
  {
    name: 'Echo Swamp - Abandoned Refinery',
    location: 'Echo Swamp - Derelict Covert',
    kuiperPerHour: 420000,
    goldPerHour: 3800000,
    xpPerHour: 820000,
    difficulty: 'Fast Bunny Loop'
  },
  {
    name: 'Fortress - Defense Line Outpost',
    location: 'Fortress - Fallen Ark',
    kuiperPerHour: 360000,
    goldPerHour: 3200000,
    xpPerHour: 740000,
    difficulty: 'High Kuiper Drop Rate'
  },
  {
    name: 'Hard Infiltration 250% Score',
    location: 'Magister Lab / The Asylum',
    kuiperPerHour: 220000,
    goldPerHour: 2900000,
    xpPerHour: 510000,
    difficulty: 'Endgame Amorphous Farm'
  }
];

export default function TfdGoldKuiperCalculator() {
  // Module Upgrade Planner
  const [selectedRarity, setSelectedRarity] = useState<string>('ultimate');
  const [currentModuleLevel, setCurrentModuleLevel] = useState<number>(0);
  const [targetModuleLevel, setTargetModuleLevel] = useState<number>(10);
  const [moduleCount, setModuleCount] = useState<number>(1);

  // Weapon & Descendant XP / Catalyst Planner
  const [currentWeaponLevel, setCurrentWeaponLevel] = useState<number>(1);
  const [catalystCycles, setCatalystCycles] = useState<number>(8); // 8-10 polarity polarizations
  const [hasXpBooster, setHasXpBooster] = useState<boolean>(true); // 30% XP boost
  const [hasGoldBooster, setHasGoldBooster] = useState<boolean>(true); // 30% Gold boost
  const [hasKuiperBooster, setHasKuiperBooster] = useState<boolean>(false); // 30% Kuiper boost

  // Farming Location
  const [selectedFarmSpotIndex, setSelectedFarmSpotIndex] = useState<number>(1);

  // Calculations
  const calculations = useMemo(() => {
    const tier = MODULE_TIERS[selectedRarity] || MODULE_TIERS.ultimate;
    
    // Weight per level: Level 0->10 progressive cost curve
    // In TFD, levels 7-10 cost over 60% of total kuiper/gold
    const levelWeights = [0, 0.03, 0.05, 0.07, 0.09, 0.11, 0.13, 0.15, 0.17, 0.20]; // cumulative fractions
    
    let currentFraction = 0;
    for (let i = 0; i < currentModuleLevel; i++) currentFraction += levelWeights[i] || 0.1;
    let targetFraction = 0;
    for (let i = 0; i < targetModuleLevel; i++) targetFraction += levelWeights[i] || 0.1;

    const fractionNeeded = Math.max(0, targetFraction - currentFraction);
    const totalKuiperPerMod = Math.round(tier.baseKuiper * fractionNeeded);
    const totalGoldPerMod = Math.round(tier.baseGold * fractionNeeded);

    const totalKuiperRequired = totalKuiperPerMod * moduleCount;
    const totalGoldRequired = totalGoldPerMod * moduleCount;

    // Weapon XP required per 1 to 40 cycle is ~440,000 XP
    const xpPerCycle = 440000;
    const remainingInCurrentCycle = Math.max(0, (40 - currentWeaponLevel) / 40) * xpPerCycle;
    const totalXpRequired = remainingInCurrentCycle + (Math.max(0, catalystCycles - 1) * xpPerCycle);

    // Apply farm spot rates with boosters
    const farm = FARM_SPOTS[selectedFarmSpotIndex] || FARM_SPOTS[0];
    const effectiveKuiperPerHour = farm.kuiperPerHour * (hasKuiperBooster ? 1.3 : 1.0);
    const effectiveGoldPerHour = farm.goldPerHour * (hasGoldBooster ? 1.3 : 1.0);
    const effectiveXpPerHour = farm.xpPerHour * (hasXpBooster ? 1.3 : 1.0);

    const hoursForKuiper = totalKuiperRequired / effectiveKuiperPerHour;
    const hoursForGold = totalGoldRequired / effectiveGoldPerHour;
    const hoursForXp = totalXpRequired / effectiveXpPerHour;

    const limitingBottleneck = Math.max(hoursForKuiper, hoursForGold);

    return {
      tier,
      totalKuiperRequired,
      totalGoldRequired,
      totalXpRequired,
      effectiveKuiperPerHour,
      effectiveGoldPerHour,
      effectiveXpPerHour,
      hoursForKuiper,
      hoursForGold,
      hoursForXp,
      limitingBottleneck
    };
  }, [
    selectedRarity, currentModuleLevel, targetModuleLevel, moduleCount,
    currentWeaponLevel, catalystCycles, hasXpBooster, hasGoldBooster,
    hasKuiperBooster, selectedFarmSpotIndex
  ]);

  const resetDefaults = () => {
    setSelectedRarity('ultimate');
    setCurrentModuleLevel(0);
    setTargetModuleLevel(10);
    setModuleCount(1);
    setCurrentWeaponLevel(1);
    setCatalystCycles(8);
    setHasXpBooster(true);
    setHasGoldBooster(true);
    setHasKuiperBooster(false);
    setSelectedFarmSpotIndex(1);
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <Coins className="w-4 h-4" />
            <span>The First Descendant • Economy Optimizer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Gold, Kuiper & Weapon XP Leveling Calculator
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
            Calculate exact Kuiper Shard and Gold costs for module upgrades (Lv 0 to 10), plus weapon proficiency grinding hours across 8–10 Crystallization Catalyst polarizations.
          </p>
        </div>
        <button
          onClick={resetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/50 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Upgrades Card */}
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-5 space-y-5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <h3>Module Enhancement Planner</h3>
          </div>

          {/* Rarity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Module Rarity & Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(MODULE_TIERS).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setSelectedRarity(key)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all text-center ${
                    selectedRarity === key
                      ? 'bg-zinc-800 border-cyan-500/80 text-white shadow-lg'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className={val.color}>{val.name.split(' ')[0]}</span>
                  <div className="text-[10px] text-zinc-400 font-normal">{val.name.split(' ')[1]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Levels & Module Count */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Current Level
              </label>
              <input
                type="number"
                min="0"
                max={targetModuleLevel}
                value={currentModuleLevel}
                onChange={(e) => setCurrentModuleLevel(Math.max(0, Math.min(targetModuleLevel, parseInt(e.target.value) || 0)))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Target Level (Max 10)
              </label>
              <input
                type="number"
                min={currentModuleLevel}
                max="10"
                value={targetModuleLevel}
                onChange={(e) => setTargetModuleLevel(Math.max(currentModuleLevel, Math.min(10, parseInt(e.target.value) || 10)))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Quantity of Modules
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={moduleCount}
                onChange={(e) => setModuleCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Required Module Resources Preview */}
          <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Kuiper Shards Needed:</span>
              <span className="text-cyan-400 font-bold text-sm">
                {calculations.totalKuiperRequired.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Gold Needed:</span>
              <span className="text-amber-400 font-bold text-sm">
                {calculations.totalGoldRequired.toLocaleString()}
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1 border-t border-zinc-800">
              <span>Gold:Kuiper Ratio</span>
              <span className="text-zinc-300 font-mono">10.0 : 1</span>
            </div>
          </div>
        </div>

        {/* Weapon Catalyst & XP Leveling Card */}
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-5 space-y-5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <h3>Weapon Catalyst & XP Leveling</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Current Weapon Level (1–40)
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={currentWeaponLevel}
                onChange={(e) => setCurrentWeaponLevel(Math.max(1, Math.min(40, parseInt(e.target.value) || 1)))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Catalysts Planned (0–10)
              </label>
              <input
                type="number"
                min="0"
                max="12"
                value={catalystCycles}
                onChange={(e) => setCatalystCycles(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Active Boosters */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Active Store / Event Boosters (+30%)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setHasXpBooster(!hasXpBooster)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors ${
                  hasXpBooster
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>+30% XP</span>
                {hasXpBooster && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setHasGoldBooster(!hasGoldBooster)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors ${
                  hasGoldBooster
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>+30% Gold</span>
                {hasGoldBooster && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setHasKuiperBooster(!hasKuiperBooster)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors ${
                  hasKuiperBooster
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>+30% Kuiper</span>
                {hasKuiperBooster && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Farm Spot Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Selected Grinding Location
            </label>
            <select
              value={selectedFarmSpotIndex}
              onChange={(e) => setSelectedFarmSpotIndex(parseInt(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              {FARM_SPOTS.map((s, idx) => (
                <option key={s.name} value={idx}>
                  {s.name} ({s.location})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary KPI Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-br from-zinc-950 to-cyan-950/30 border border-cyan-500/30 rounded-xl space-y-1">
          <div className="text-zinc-400 text-xs font-medium flex items-center justify-between">
            <span>Kuiper Farm Time</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300">
            {calculations.hoursForKuiper < 1 
              ? `${Math.round(calculations.hoursForKuiper * 60)} mins`
              : `${calculations.hoursForKuiper.toFixed(1)} hrs`}
          </div>
          <p className="text-[11px] text-zinc-400">
            @ {Math.round(calculations.effectiveKuiperPerHour).toLocaleString()} Kuiper/hr
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-zinc-950 to-amber-950/30 border border-amber-500/30 rounded-xl space-y-1">
          <div className="text-zinc-400 text-xs font-medium flex items-center justify-between">
            <span>Gold Farm Time</span>
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300">
            {calculations.hoursForGold < 1 
              ? `${Math.round(calculations.hoursForGold * 60)} mins`
              : `${calculations.hoursForGold.toFixed(1)} hrs`}
          </div>
          <p className="text-[11px] text-zinc-400">
            @ {Math.round(calculations.effectiveGoldPerHour).toLocaleString()} Gold/hr
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-zinc-950 to-purple-950/30 border border-purple-500/30 rounded-xl space-y-1">
          <div className="text-zinc-400 text-xs font-medium flex items-center justify-between">
            <span>Weapon XP Time ({catalystCycles} Cats)</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300">
            {calculations.hoursForXp < 1
              ? `${Math.round(calculations.hoursForXp * 60)} mins`
              : `${calculations.hoursForXp.toFixed(1)} hrs`}
          </div>
          <p className="text-[11px] text-zinc-400">
            Total XP: {calculations.totalXpRequired.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-zinc-950 to-rose-950/30 border border-rose-500/30 rounded-xl space-y-1">
          <div className="text-zinc-400 text-xs font-medium flex items-center justify-between">
            <span>Critical Bottleneck</span>
            <Award className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-black text-rose-300 truncate">
            {calculations.hoursForGold > calculations.hoursForKuiper ? 'Gold Shortage' : 'Kuiper Shortage'}
          </div>
          <p className="text-[11px] text-zinc-400">
            Difference: {Math.abs(calculations.hoursForGold - calculations.hoursForKuiper).toFixed(1)} hrs apart
          </p>
        </div>
      </div>

      {/* Hotspots Reference Table */}
      <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Verified Hotspots & Farming Efficiencies
          </h4>
          <span className="text-[11px] text-zinc-400">Updated for 2026 Season</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/40 text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Location</th>
                <th className="py-2.5 px-4 font-semibold text-right">Kuiper / Hour</th>
                <th className="py-2.5 px-4 font-semibold text-right">Gold / Hour</th>
                <th className="py-2.5 px-4 font-semibold text-right">Weapon XP / Hour</th>
                <th className="py-2.5 px-4 font-semibold">Playstyle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {FARM_SPOTS.map((s, idx) => (
                <tr key={s.name} className={idx === selectedFarmSpotIndex ? 'bg-cyan-500/5' : ''}>
                  <td className="py-3 px-4 font-medium text-white">
                    <div>{s.name}</div>
                    <div className="text-[11px] text-zinc-400">{s.location}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-cyan-400">
                    {s.kuiperPerHour.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-amber-400">
                    {s.goldPerHour.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-purple-400">
                    {s.xpPerHour.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                      {s.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
