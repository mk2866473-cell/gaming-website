/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Trophy, Dice5, Package, Gift
} from 'lucide-react';

interface RaidDrop {
  name: string;
  rarity: 'Mythical' | 'Legendary' | 'Rare' | 'Uncommon';
  baseRatePct: number;
  description: string;
}

const RAID_ITEMS: RaidDrop[] = [
  { name: 'True Hogyoku', rarity: 'Mythical', baseRatePct: 0.1, description: 'Transcends races to True Vasto Lorde or True Bankai. Most coveted drop in Type Soul.' },
  { name: 'Skill Box', rarity: 'Mythical', baseRatePct: 0.1, description: 'Unlocks exclusive non-tree secret moves like Ghost Step or Unsheathe.' },
  { name: 'Formless Manual', rarity: 'Mythical', baseRatePct: 0.2, description: 'Grants Formless combat style for martial master builds.' },
  { name: 'Horizon Essence', rarity: 'Mythical', baseRatePct: 0.05, description: 'Required for mythical weapon infusions and cosmetic aura.' },
  { name: 'Hogyoku Fragment', rarity: 'Legendary', baseRatePct: 0.5, description: 'Standard progression catalyst for Vizard and Arrancar forms.' },
  { name: 'Cybernetic Box', rarity: 'Legendary', baseRatePct: 1.0, description: 'Quincy cybernetic augmentations and prosthesis abilities.' },
  { name: 'Powered Shard', rarity: 'Rare', baseRatePct: 15.0, description: 'Used to reroll weapon stats and reroll shikai elements.' },
  { name: 'Red / Blue Elixir', rarity: 'Uncommon', baseRatePct: 35.0, description: 'Stat reset and skill tree refund potions.' },
];

export default function TypeSoulRaidDropChecker() {
  const [selectedRaid, setSelectedRaid] = useState<'kt' | 'ss' | 'hm' | 'clan_war'>('kt');
  const [chestsOpened, setChestsOpened] = useState<number>(25);
  const [simResults, setSimResults] = useState<{ item: string; count: number }[] | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const calculations = useMemo(() => {
    // Binomial probability: P(at least 1) = 1 - (1 - p)^n
    const dropOdds = RAID_ITEMS.map(item => {
      const p = item.baseRatePct / 100;
      const probAtLeastOne = Number(((1 - Math.pow(1 - p, chestsOpened)) * 100).toFixed(2));
      const expectedRunsFor50 = Math.round(Math.log(0.5) / Math.log(1 - p));

      return {
        ...item,
        probAtLeastOne,
        expectedRunsFor50
      };
    });

    return dropOdds;
  }, [chestsOpened]);

  const handleSimulateRolls = () => {
    const counts: Record<string, number> = {};
    RAID_ITEMS.forEach(i => { counts[i.name] = 0; });

    for (let c = 0; c < chestsOpened; c++) {
      RAID_ITEMS.forEach(item => {
        const roll = Math.random() * 100;
        if (roll <= item.baseRatePct) {
          counts[item.name] = (counts[item.name] || 0) + 1;
        }
      });
    }

    setSimResults(Object.entries(counts).map(([item, count]) => ({ item, count })));
  };

  const handleCopy = () => {
    const text = `Roblox Type Soul Raid Loot Odds:
Raid: ${selectedRaid.toUpperCase()} | Chests Opened: ${chestsOpened}
Expected Drop Probabilities:
${calculations.map(c => `• ${c.name} (${c.baseRatePct}%): ${c.probAtLeastOne}% chance in ${chestsOpened} chests (50% expected at ${c.expectedRunsFor50} runs)`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 shadow-xl text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950 text-red-300 border border-red-800">
              0.1% TRUE HOGYOKU DROP ENGINE
            </span>
            <span className="text-xs text-slate-400">Binomial Raid Reward Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Raid Reward & Item Drop Rate Checker
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Calculate exact odds of receiving True Hogyoku, Skill Boxes, and Formless Manuals across Karakura Town and Faction Raids.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Loot Probabilities'}
        </button>
      </div>

      {/* Raid Selector & Chest Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Raid Activity
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'kt', label: 'Karakura Town Raid' },
              { id: 'ss', label: 'Soul Society Raid' },
              { id: 'hm', label: 'Hueco Mundo Raid' },
              { id: 'clan_war', label: 'Clan Wars (Double Loot)' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRaid(r.id as any)}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-all ${
                  selectedRaid === r.id
                    ? 'bg-red-600 text-white font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Raid Chests Budget</span>
            <span className="font-black text-amber-400">{chestsOpened} Chests</span>
          </div>
          <input
            type="range"
            min={1}
            max={200}
            value={chestsOpened}
            onChange={(e) => setChestsOpened(parseInt(e.target.value))}
            className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between items-center pt-1">
            <button
              onClick={handleSimulateRolls}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors"
            >
              <Dice5 className="w-3.5 h-3.5" /> Simulate Opening {chestsOpened} Chests
            </button>
            <span className="text-[10px] text-slate-500">Uses true RNG</span>
          </div>
        </div>
      </div>

      {/* Simulation Result Overlay if rolled */}
      {simResults && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-amber-300">RNG Simulation Results ({chestsOpened} Chests Opened):</span>
            <button onClick={() => setSimResults(null)} className="text-slate-400 hover:text-white">✕ Clear</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {simResults.map((r, i) => (
              <div key={i} className={`p-2 rounded border ${r.count > 0 ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                {r.item}: {r.count}x
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drops Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" /> Raid Chest Drop Table & Odds
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {calculations.map(item => (
            <div key={item.name} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                    item.rarity === 'Mythical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                    item.rarity === 'Legendary' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {item.rarity}
                  </span>
                  <span className="font-extrabold text-sm text-white">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-400">{item.baseRatePct}% Drop Rate</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">{item.description}</p>

              <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400">Chance in {chestsOpened} Chests:</span>
                <span className={`font-black ${item.probAtLeastOne >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {item.probAtLeastOne}% Probability
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
