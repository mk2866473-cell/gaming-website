/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Diamond, Calculator, Zap, Sparkles, TrendingUp, Clock, 
  ShieldCheck, CheckCircle2, ArrowRight, DollarSign, Flame, Coins
} from 'lucide-react';
import { formatGems } from '../../data/ps99Data';

export default function Ps99DiamondGrindOptimizer() {
  // Farming setup state
  const [activeZoneTier, setActiveZoneTier] = useState<number>(224); // Last zone
  const [hasChestMimic, setHasChestMimic] = useState<boolean>(true);
  const [hasSuperMagnet, setHasSuperMagnet] = useState<boolean>(true);
  const [hasDiamondGiftHunter, setHasDiamondGiftHunter] = useState<boolean>(true);
  const [activeFlag, setActiveFlag] = useState<'fortune' | 'diamonds' | 'none'>('fortune');
  const [activePotionsTier, setActivePotionsTier] = useState<number>(8); // Tier 8 Diamond Potion
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [hugePetCount, setHugePetCount] = useState<number>(15);

  // Calculations
  const grindStats = useMemo(() => {
    // Base gems per hour from last zone
    let baseGemsPerHour = 1200000; // 1.2M gems/hr base in final zone
    
    // Scale with huge pets
    baseGemsPerHour += hugePetCount * 150000;

    // Enchants multipliers
    let multiplier = 1.0;
    if (hasChestMimic) multiplier += 0.85;
    if (hasSuperMagnet) multiplier += 0.20;
    if (hasDiamondGiftHunter) multiplier += 0.60;

    // Flag multipliers
    if (activeFlag === 'fortune') multiplier += 1.0;
    else if (activeFlag === 'diamonds') multiplier += 2.5;

    // Potion multiplier
    multiplier += activePotionsTier * 0.15;

    const totalGemsPerHour = Math.round(baseGemsPerHour * multiplier);
    const dailyGems = totalGemsPerHour * hoursPerDay;
    const weeklyGems = dailyGems * 7;

    return {
      totalGemsPerHour,
      dailyGems,
      weeklyGems
    };
  }, [activeZoneTier, hasChestMimic, hasSuperMagnet, hasDiamondGiftHunter, activeFlag, activePotionsTier, hoursPerDay, hugePetCount]);

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/70 p-5 sm:p-6 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Diamond className="w-4 h-4 text-cyan-300" />
              <span>PS99 GEM GRIND OPTIMIZER</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-mono">PASSIVE FARM CALCULATOR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Diamond / Gem Grind & Farming Optimizer
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Maximize your active and AFK diamond generation per hour. Configure your enchants, active flags, huge pet team, and diamond potions for peak gem yield.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-700/80 px-4 py-3 rounded-xl shadow-inner">
            <Coins className="w-6 h-6 text-cyan-400" />
            <div>
              <span className="text-[11px] text-slate-400 block">Estimated Rate</span>
              <span className="text-lg font-black text-cyan-300 font-mono">{formatGems(grindStats.totalGemsPerHour)} / hr</span>
            </div>
          </div>
        </div>

        {/* Quick Projections Grid */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Hourly Gem Yield</span>
            <span className="text-xl font-black font-mono text-cyan-300">{formatGems(grindStats.totalGemsPerHour)}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Daily Yield ({hoursPerDay}h AFK)</span>
            <span className="text-xl font-black font-mono text-emerald-400">{formatGems(grindStats.dailyGems)}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Weekly Projected Income</span>
            <span className="text-xl font-black font-mono text-amber-400">{formatGems(grindStats.weeklyGems)}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <span>Loadout & Enchants Setup</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Equipped Huge Pets</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hugePetCount}
                  onChange={(e) => setHugePetCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Daily Grind Hours: {hoursPerDay}h</label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer mt-2"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs text-slate-300 font-semibold block">Active Meta Enchants</label>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-sm font-bold text-white">Chest Mimic / Boss Chest Mimic</span>
                  <span className="text-xs text-slate-400 block">Spawns high-reward diamond chests</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasChestMimic}
                  onChange={(e) => setHasChestMimic(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-sm font-bold text-white">Super Magnet</span>
                  <span className="text-xs text-slate-400 block">Pulls all diamonds across the entire zone</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasSuperMagnet}
                  onChange={(e) => setHasSuperMagnet(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-sm font-bold text-white">Diamond Gift Hunter</span>
                  <span className="text-xs text-slate-400 block">Drops valuable diamond gift bags</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasDiamondGiftHunter}
                  onChange={(e) => setHasDiamondGiftHunter(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output & Boosts Config */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>Flags & Potions Boosts</span>
            </h2>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Active Ground Flag</label>
              <select
                value={activeFlag}
                onChange={(e) => setActiveFlag(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-cyan-500"
              >
                <option value="diamonds">Diamonds Flag (+250% Diamonds)</option>
                <option value="fortune">Fortune Flag (+100% Diamonds & Drops)</option>
                <option value="none">No Flag Active</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Diamond Potion Tier (Tier 1 to 10)</label>
              <select
                value={activePotionsTier}
                onChange={(e) => setActivePotionsTier(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-cyan-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(t => (
                  <option key={t} value={t}>Tier {t} Diamond Potion (+{t * 15}% Yield)</option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-start gap-3 mt-4">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-200/90 leading-relaxed">
                <strong className="font-bold text-cyan-300">Max Efficiency Combo: </strong>
                Combining Chest Mimic + Super Magnet + Diamond Gift Hunter with an active Diamonds Flag yields over <strong className="text-white">50M+ Gems</strong> per 8-hour AFK session!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
