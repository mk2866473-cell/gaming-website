/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sparkles, Coins, Gift, CheckCircle2, AlertTriangle, Calculator } from 'lucide-react';

interface BannerOption {
  id: string;
  name: string;
  hardPity: number; // 40 for All-Hero / Rate-Up
  sLevelRate: number; // 2.05%
  diamondsPerPull: number;
}

const AFKJ_BANNERS: BannerOption[] = [
  { id: 'all_hero', name: 'All-Hero Recruitment (Wishlist 40 Pity)', hardPity: 40, sLevelRate: 2.05, diamondsPerPull: 300 },
  { id: 'rate_up', name: 'Rate-Up Banner (New S-Level 40 Pity)', hardPity: 40, sLevelRate: 2.00, diamondsPerPull: 300 },
  { id: 'epic_recruitment', name: 'Epic Recruitment (30 Pity)', hardPity: 30, sLevelRate: 5.20, diamondsPerPull: 400 },
  { id: 'stargaze', name: 'Stargaze Station (Celestials/Hypogeans 40 Pity)', hardPity: 40, sLevelRate: 3.25, diamondsPerPull: 400 }
];

export default function AfkjSummonPlannerTool() {
  const [selectedBannerId, setSelectedBannerId] = useState<string>('all_hero');
  const [diamonds, setDiamonds] = useState<number>(36000);
  const [rateUpLetters, setRateUpLetters] = useState<number>(20);
  const [inviteLetters, setInviteLetters] = useState<number>(30);
  const [epicLetters, setEpicLetters] = useState<number>(10);
  const [currentPityProgress, setCurrentPityProgress] = useState<number>(18);

  const activeBanner = useMemo(() => {
    return AFKJ_BANNERS.find(b => b.id === selectedBannerId) || AFKJ_BANNERS[0];
  }, [selectedBannerId]);

  const calculations = useMemo(() => {
    const pullsFromDiamonds = Math.floor(diamonds / activeBanner.diamondsPerPull);

    let totalLetters = inviteLetters;
    if (selectedBannerId === 'rate_up') totalLetters = rateUpLetters;
    if (selectedBannerId === 'epic_recruitment') totalLetters = epicLetters;

    const totalPulls = pullsFromDiamonds + totalLetters;
    const remainingToPity = Math.max(0, activeBanner.hardPity - currentPityProgress);

    const isGuaranteedPity = totalPulls >= remainingToPity;
    const guaranteedSLevelCopies = Math.floor((totalPulls + currentPityProgress) / activeBanner.hardPity);

    // Probability of getting at least 1 copy before hard pity
    const singlePullDecimal = activeBanner.sLevelRate / 100;
    const probabilityAtLeastOne = 1 - Math.pow(1 - singlePullDecimal, totalPulls);

    return {
      pullsFromDiamonds,
      totalPulls,
      remainingToPity,
      isGuaranteedPity,
      guaranteedSLevelCopies,
      probabilityPercent: (probabilityAtLeastOne * 100).toFixed(1)
    };
  }, [activeBanner, diamonds, rateUpLetters, inviteLetters, epicLetters, currentPityProgress, selectedBannerId]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-zinc-900 border border-purple-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Wishlist & Starlight Gacha Engine
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Sparkles className="w-6 h-6 text-purple-400" />
              AFK Journey Starlight & Wishlist Summon Planner
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Calculate total available summons, 40-pull hard pity guarantees, and Wishlist S-Level drop probabilities.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Total Summons Ready</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {calculations.totalPulls} Summons
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">Guaranteed S-Level Copies</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {calculations.guaranteedSLevelCopies} Copies
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-purple-400" />
            1. Select Banner & Input Reserves
          </h3>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Recruitment Banner:</label>
            <select
              value={selectedBannerId}
              onChange={e => setSelectedBannerId(e.target.value)}
              className="w-full bg-zinc-950 text-xs text-amber-300 font-semibold border border-zinc-800 rounded px-2.5 py-2 focus:border-purple-500 outline-none"
            >
              {AFKJ_BANNERS.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.hardPity} Pity • {b.sLevelRate}%)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Stored Diamonds:</span>
                <span className="font-mono text-amber-300 font-bold">{diamonds.toLocaleString()}</span>
              </label>
              <input
                type="number"
                step="300"
                value={diamonds}
                onChange={e => setDiamonds(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-purple-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Invite Letters:</label>
                <input
                  type="number"
                  value={inviteLetters}
                  onChange={e => setInviteLetters(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Rate-Up Letters:</label>
                <input
                  type="number"
                  value={rateUpLetters}
                  onChange={e => setRateUpLetters(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Current Pity Gauge:</span>
                <span className="font-mono text-amber-300 font-bold">{currentPityProgress} / {activeBanner.hardPity}</span>
              </label>
              <input
                type="range"
                min="0"
                max={activeBanner.hardPity}
                value={currentPityProgress}
                onChange={e => setCurrentPityProgress(parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Outcome Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-400" />
              2. Pity Outcome & Odds Analysis
            </h3>

            <div className={`p-4 rounded-xl border mb-4 ${
              calculations.isGuaranteedPity
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/20 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center gap-2 font-bold text-base mb-1">
                <CheckCircle2 className="w-5 h-5" />
                {calculations.isGuaranteedPity
                  ? 'Guaranteed S-Level Hero Secured!'
                  : `Needs ${calculations.remainingToPity - calculations.totalPulls} More Summons`}
              </div>
              <p className="text-xs text-zinc-300">
                You will receive at least <strong className="text-white">{calculations.guaranteedSLevelCopies} S-Level Hero copy</strong> from your total available summons.
              </p>
            </div>

            <div className="bg-zinc-950/80 p-3.5 rounded-lg border border-zinc-800 text-xs space-y-1 font-mono">
              <div className="text-zinc-400 flex justify-between">
                <span>Cumulative S-Level Drop Odds:</span>
                <span className="text-amber-300 font-bold">{calculations.probabilityPercent}%</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-zinc-400 p-3 bg-purple-950/30 border border-purple-500/30 rounded-lg mt-4">
            Wishlist Tip: Ensure all 5 S-Level slots per faction are filled on your Wishlist to guarantee wishlist drops.
          </div>
        </div>
      </div>
    </div>
  );
}
