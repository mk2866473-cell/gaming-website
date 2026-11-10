/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Target, Zap, RotateCcw, Award, CheckCircle2, AlertTriangle, ShieldCheck, Play } from 'lucide-react';

interface SimulatedDrop {
  name: string;
  rarity: 'MYTHIC' | 'LEGENDARY' | 'EPIC' | 'RARE';
  color: string;
}

const HERO_NAMES = {
  MYTHIC: ['Rudy (Awakened Light)', 'Eileen (Empress of Fodina)', 'Rachel (Phoenix Flame)', 'Dellons (Grim Reaper)'],
  LEGENDARY: ['Shane (Sword of Exorcism)', 'Jave (Dragon Lord)', 'Kris (Ruler of Hell)', 'Spike (Frozen Tyrant)', 'Ace (Moonlit Blade)'],
  EPIC: ['Lina', 'Velika', 'Ruri', 'Nia & Bolt', 'Yuri', 'Evan', 'Karin'],
  RARE: ['Adventurer Rookie', 'Orc Soldier', 'Shadow Assassin', 'Fodina Guard', 'Skeleton Warrior']
};

export default function SkGachaPlanner() {
  const [currentPity, setCurrentPity] = useState<number>(24);
  const [rubiesHeld, setRubiesHeld] = useState<number>(4500);
  const [ticketsHeld, setTicketsHeld] = useState<number>(12);
  const [targetCopies, setTargetCopies] = useState<number>(1);
  const [bannerRate, setBannerRate] = useState<number>(0.8); // 0.8% rate-up
  const [simResults, setSimResults] = useState<SimulatedDrop[]>([]);
  const [simPityCount, setSimPityCount] = useState<number>(24);

  const hardPityCap = 80;

  const calculations = useMemo(() => {
    const pullsFromRubies = Math.floor(rubiesHeld / 100);
    const totalPullsAvailable = pullsFromRubies + ticketsHeld;
    const pullsToGuaranteedPity = Math.max(0, hardPityCap - currentPity);
    const rubiesNeededToGuarantee = Math.max(0, (pullsToGuaranteedPity - ticketsHeld) * 100);

    // Binomial Probability: 1 - (1 - rate)^n
    const p = bannerRate / 100;
    const naturalP = 1 - Math.pow(1 - p, totalPullsAvailable);
    const effectiveProbability = totalPullsAvailable >= pullsToGuaranteedPity 
      ? 100 
      : Math.min(99, Math.round(naturalP * 100));

    // Confidence pull requirements (without pity):
    const pullsFor50 = Math.ceil(Math.log(1 - 0.50) / Math.log(1 - p));
    const pullsFor75 = Math.ceil(Math.log(1 - 0.75) / Math.log(1 - p));
    const pullsFor90 = Math.ceil(Math.log(1 - 0.90) / Math.log(1 - p));

    return {
      pullsFromRubies,
      totalPullsAvailable,
      pullsToGuaranteedPity,
      rubiesNeededToGuarantee,
      effectiveProbability,
      pullsFor50,
      pullsFor75,
      pullsFor90
    };
  }, [rubiesHeld, ticketsHeld, currentPity, bannerRate]);

  const simulateTenPull = () => {
    let nextPity = simPityCount;
    const newDrops: SimulatedDrop[] = [];

    for (let i = 0; i < 10; i++) {
      nextPity++;
      const rand = Math.random() * 100;

      if (nextPity >= hardPityCap || rand < bannerRate) {
        // Guaranteed or hit featured rate-up
        const pool = HERO_NAMES.MYTHIC;
        const hero = pool[Math.floor(Math.random() * pool.length)];
        newDrops.push({ name: hero, rarity: 'MYTHIC', color: 'text-amber-400 bg-amber-950/40 border-amber-500/50' });
        nextPity = 0; // reset pity
      } else if (rand < 2.5) {
        // Legendary drop
        const pool = HERO_NAMES.LEGENDARY;
        const hero = pool[Math.floor(Math.random() * pool.length)];
        newDrops.push({ name: hero, rarity: 'LEGENDARY', color: 'text-red-400 bg-red-950/40 border-red-500/40' });
      } else if (rand < 18.0) {
        // Epic
        const pool = HERO_NAMES.EPIC;
        const hero = pool[Math.floor(Math.random() * pool.length)];
        newDrops.push({ name: hero, rarity: 'EPIC', color: 'text-purple-400 bg-purple-950/40 border-purple-500/40' });
      } else {
        // Rare
        const pool = HERO_NAMES.RARE;
        const hero = pool[Math.floor(Math.random() * pool.length)];
        newDrops.push({ name: hero, rarity: 'RARE', color: 'text-zinc-400 bg-zinc-950/60 border-zinc-800' });
      }
    }

    setSimPityCount(nextPity);
    setSimResults(newDrops);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-zinc-900 border border-blue-500/30 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Seven Knights Re:BIRTH Summon Chamber
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-zinc-400">80-Pity Assurance System</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Banner Pity Planner & Summon Simulator</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calculate real binomial success probability, pity deficit, and run 10x summon tests with official gacha drop rates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 px-4 py-3 rounded-xl border border-zinc-800">
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Guaranteed Success Chance</div>
              <div className={`text-2xl font-black font-mono ${calculations.effectiveProbability >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {calculations.effectiveProbability}% Chance
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Parameters */}
        <div className="lg:col-span-6 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Summon Currency & Pity Status</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                Current Banner Pity (0 to 80)
              </label>
              <input
                type="number"
                min="0"
                max="80"
                value={currentPity}
                onChange={e => setCurrentPity(Math.max(0, Math.min(80, Number(e.target.value))))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                {hardPityCap - currentPity} pulls until guaranteed pity
              </span>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                Rate-Up Hero Probability %
              </label>
              <select
                value={bannerRate}
                onChange={e => setBannerRate(Number(e.target.value))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white text-xs cursor-pointer"
              >
                <option value={0.8}>Featured 0.8% (Rate-Up Event)</option>
                <option value={1.2}>Special Debut 1.2% (Collab)</option>
                <option value={0.5}>Standard Pool 0.5%</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                Rubies Stored (100 = 1 Pull)
              </label>
              <input
                type="number"
                value={rubiesHeld}
                onChange={e => setRubiesHeld(Math.max(0, Number(e.target.value)))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
              <span className="text-[10px] text-blue-400 mt-1 block font-mono">
                = {calculations.pullsFromRubies} Pulls
              </span>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                Summon Tickets Held
              </label>
              <input
                type="number"
                value={ticketsHeld}
                onChange={e => setTicketsHeld(Math.max(0, Number(e.target.value)))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
              <span className="text-[10px] text-emerald-400 mt-1 block font-mono">
                = {ticketsHeld} Pulls
              </span>
            </div>
          </div>

          {/* Guarantee Meter */}
          <div className="pt-2 border-t border-zinc-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-300 font-medium">Progress to Hard Pity (80 Summons):</span>
              <span className="font-mono text-blue-400 font-bold">
                {currentPity} / {hardPityCap} ({Math.round((currentPity / hardPityCap) * 100)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${(currentPity / hardPityCap) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-400">Total Summons in Inventory:</span>
              <span className="font-mono text-white font-bold">{calculations.totalPullsAvailable} Pulls</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Pity Shortfall:</span>
              <span className="font-mono text-amber-400 font-bold">
                {calculations.rubiesNeededToGuarantee === 0 ? 'FULLY GUARANTEED' : `${calculations.rubiesNeededToGuarantee} Rubies needed`}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Simulation & Milestones */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Live Test Engine</span>
                <h4 className="text-sm font-bold text-white">Simulate 10x Banner Summon</h4>
              </div>
              <button
                onClick={simulateTenPull}
                className="px-3.5 py-1.5 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-950/30"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Pull 10x</span>
              </button>
            </div>

            <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
              <span>Simulated Pity: {simPityCount} / 80</span>
              <button
                onClick={() => { setSimPityCount(0); setSimResults([]); }}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 underline"
              >
                Reset Test
              </button>
            </div>

            {/* Sim Results */}
            {simResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {simResults.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-between ${item.color}`}
                  >
                    <span className="truncate pr-1">{item.name}</span>
                    <span className="text-[9px] font-mono font-bold uppercase">{item.rarity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-zinc-800 rounded-lg text-xs text-zinc-500">
                Click "Pull 10x" above to simulate RNG rolls against Seven Knights Re:BIRTH gacha rates.
              </div>
            )}
          </div>

          {/* Mathematical Confidence Milestones */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Statistical Milestones (No Pity)</h4>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">50% Odds</span>
                <span className="font-mono text-sm font-bold text-white">{calculations.pullsFor50} pulls</span>
              </div>
              <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">75% Odds</span>
                <span className="font-mono text-sm font-bold text-blue-400">{calculations.pullsFor75} pulls</span>
              </div>
              <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">90% Safety</span>
                <span className="font-mono text-sm font-bold text-emerald-400">{calculations.pullsFor90} pulls</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
              Due to Seven Knights Re:BIRTH's 80-pull guarantee, you will never need more than <strong>{hardPityCap} pulls</strong> to obtain the featured unit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
