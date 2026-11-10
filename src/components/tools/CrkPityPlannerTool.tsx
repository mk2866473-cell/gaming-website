/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, Coins, Gift, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';

interface BannerType {
  id: string;
  name: string;
  hardPityPulls: number;
  featuredRate: number; // percentage, e.g. 1.44%
  crystalsPerPull: number;
}

const BANNERS: BannerType[] = [
  { id: 'featured_epic', name: 'Featured Epic / Super Epic Banner', hardPityPulls: 250, featuredRate: 1.44, crystalsPerPull: 300 },
  { id: 'nether_gacha', name: 'Beast / Nether Gacha (Ancient/Beast)', hardPityPulls: 250, featuredRate: 0.3, crystalsPerPull: 300 },
  { id: 'standard', name: 'Standard Cookie Gacha', hardPityPulls: 250, featuredRate: 0.08, crystalsPerPull: 300 }
];

export default function CrkPityPlannerTool() {
  const [selectedBannerId, setSelectedBannerId] = useState<string>('featured_epic');
  const [currentCrystals, setCurrentCrystals] = useState<number>(45000);
  const [specialCutters, setSpecialCutters] = useState<number>(15);
  const [standardCutters, setStandardCutters] = useState<number>(10);
  const [currentPityCount, setCurrentPityCount] = useState<number>(110); // current pulls on banner

  // Income sources per week
  const [arenaTierReward, setArenaTierReward] = useState<number>(12000); // Master I weekly crystals
  const [dailyQuestsPerDay, setDailyQuestsPerDay] = useState<number>(300);

  const activeBanner = useMemo(() => {
    return BANNERS.find(b => b.id === selectedBannerId) || BANNERS[0];
  }, [selectedBannerId]);

  const pityCalculations = useMemo(() => {
    const pullsFromCrystals = Math.floor(currentCrystals / activeBanner.crystalsPerPull);
    const totalCutters = selectedBannerId === 'featured_epic' ? specialCutters : standardCutters;
    const totalPullsAvailable = pullsFromCrystals + totalCutters;

    const remainingToPity = Math.max(0, activeBanner.hardPityPulls - currentPityCount);
    const netDeficitPulls = Math.max(0, remainingToPity - totalPullsAvailable);
    const netDeficitCrystals = netDeficitPulls * activeBanner.crystalsPerPull;

    // Cumulative probability of getting at least 1 copy without hitting hard pity
    const singlePullRateDecimal = activeBanner.featuredRate / 100;
    const probabilityAtLeastOne = 1 - Math.pow(1 - singlePullRateDecimal, totalPullsAvailable);

    // Weekly Crystal Income
    const weeklyCrystalIncome = arenaTierReward + (dailyQuestsPerDay * 7) + 2000; // + fountain & guild
    const daysToReachPity = netDeficitCrystals > 0 ? Math.ceil((netDeficitCrystals / weeklyCrystalIncome) * 7) : 0;

    // Projected Mileage Points (20 mileage points per pull)
    const projectedMileage = totalPullsAvailable * 20;

    return {
      pullsFromCrystals,
      totalPullsAvailable,
      remainingToPity,
      isGuaranteed: totalPullsAvailable >= remainingToPity,
      netDeficitPulls,
      netDeficitCrystals,
      probabilityPercent: (probabilityAtLeastOne * 100).toFixed(1),
      weeklyCrystalIncome,
      daysToReachPity,
      projectedMileage
    };
  }, [activeBanner, currentCrystals, specialCutters, standardCutters, currentPityCount, selectedBannerId, arenaTierReward, dailyQuestsPerDay]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Gacha Probability & Pity Calculator
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Calculator className="w-6 h-6 text-amber-400" />
              Cookie Run: Kingdom Gacha Pity Planner
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Calculate total available pulls, hard pity guarantee status (250 pulls), drop odds, and days needed to save Crystals.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Total Pulls Ready</div>
              <div className="text-2xl font-black text-amber-400">
                {pityCalculations.totalPullsAvailable} Pulls
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">Featured Drop Odds</div>
              <div className="text-2xl font-black text-emerald-400">
                {pityCalculations.probabilityPercent}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Current Currency Inputs */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            1. Current Gacha Reserves
          </h3>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Active Gacha Banner:</label>
            <select
              value={selectedBannerId}
              onChange={e => setSelectedBannerId(e.target.value)}
              className="w-full bg-zinc-950 text-xs text-amber-300 font-semibold border border-zinc-800 rounded px-2.5 py-2 focus:border-amber-500 outline-none"
            >
              {BANNERS.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.hardPityPulls} Pity • {b.featuredRate}% Rate)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Stored Crystals:</span>
                <span className="font-mono text-amber-400 font-bold">{currentCrystals.toLocaleString()}</span>
              </label>
              <input
                type="number"
                step="300"
                value={currentCrystals}
                onChange={e => setCurrentCrystals(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Special Cutters:</label>
                <input
                  type="number"
                  value={specialCutters}
                  onChange={e => setSpecialCutters(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Standard Cutters:</label>
                <input
                  type="number"
                  value={standardCutters}
                  onChange={e => setStandardCutters(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Current Pity Gauge Progress:</span>
                <span className="font-mono text-amber-300 font-bold">{currentPityCount} / {activeBanner.hardPityPulls}</span>
              </label>
              <input
                type="range"
                min="0"
                max={activeBanner.hardPityPulls}
                value={currentPityCount}
                onChange={e => setCurrentPityCount(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Pity Outcome & Savings Timeline */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              2. Pity Milestone Outcome
            </h3>

            <div className={`p-4 rounded-xl border mb-4 ${
              pityCalculations.isGuaranteed
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/20 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center gap-2 font-bold text-base mb-1">
                <CheckCircle2 className="w-5 h-5" />
                {pityCalculations.isGuaranteed
                  ? 'Guaranteed Hard Pity Secured!'
                  : `Needs ${pityCalculations.netDeficitPulls} More Pulls for Pity`}
              </div>
              <p className="text-xs text-zinc-300">
                {pityCalculations.isGuaranteed
                  ? `Your ${pityCalculations.totalPullsAvailable} ready pulls will easily cover the remaining ${pityCalculations.remainingToPity} pulls required for guaranteed copy.`
                  : `You are missing ${pityCalculations.netDeficitCrystals.toLocaleString()} Crystals to guarantee hard pity.`}
              </p>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 flex justify-between">
                <span className="text-zinc-400">Pull Probability (Any Featured Copy):</span>
                <span className="text-amber-400 font-bold">{pityCalculations.probabilityPercent}%</span>
              </div>

              <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 flex justify-between">
                <span className="text-zinc-400">Projected Mileage Points Earned:</span>
                <span className="text-emerald-400 font-bold">+{pityCalculations.projectedMileage} PTS</span>
              </div>

              {!pityCalculations.isGuaranteed && (
                <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Days to Save Deficit Crystals:</span>
                  <span className="text-rose-400 font-bold">~{pityCalculations.daysToReachPity} Days</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-zinc-950/60 border border-zinc-800 rounded-lg text-xs text-zinc-400 flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Mileage Points can be exchanged in shop for 20 Soulstones of select Epic cookies.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
