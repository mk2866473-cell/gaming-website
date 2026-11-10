/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, ArrowRightLeft, ShieldAlert, Check, Plus, Trash2, Trophy, Flame, AlertTriangle
} from 'lucide-react';
import { BLOX_FRUITS_LIST, BloxFruitItem } from '../../data/robloxData';

export default function BloxFruitsCalculator() {
  const [yourOffer, setYourOffer] = useState<string[]>(['dough', 'buddha']);
  const [theirOffer, setTheirOffer] = useState<string[]>(['t-rex']);

  // Add Fruit to Side
  const addFruit = (side: 'you' | 'them', fruitId: string) => {
    if (side === 'you') {
      if (yourOffer.length < 4) setYourOffer([...yourOffer, fruitId]);
    } else {
      if (theirOffer.length < 4) setTheirOffer([...theirOffer, fruitId]);
    }
  };

  const removeFruit = (side: 'you' | 'them', index: number) => {
    if (side === 'you') {
      setYourOffer(yourOffer.filter((_, i) => i !== index));
    } else {
      setTheirOffer(theirOffer.filter((_, i) => i !== index));
    }
  };

  // Calculations
  const tradeStats = useMemo(() => {
    const yourFruits = yourOffer.map(id => BLOX_FRUITS_LIST.find(f => f.id === id)!).filter(Boolean);
    const theirFruits = theirOffer.map(id => BLOX_FRUITS_LIST.find(f => f.id === id)!).filter(Boolean);

    const yourTotalTradingVal = yourFruits.reduce((sum, f) => sum + f.tradingValue, 0);
    const theirTotalTradingVal = theirFruits.reduce((sum, f) => sum + f.tradingValue, 0);

    const yourTotalBeli = yourFruits.reduce((sum, f) => sum + f.beliPrice, 0);
    const theirTotalBeli = theirFruits.reduce((sum, f) => sum + f.beliPrice, 0);

    // In-game 40% Beli Trade Rule: Difference cannot exceed 40% of the higher Beli sum
    const maxBeli = Math.max(yourTotalBeli, theirTotalBeli);
    const minBeli = Math.min(yourTotalBeli, theirTotalBeli);
    const beliDiffPercent = maxBeli > 0 ? ((maxBeli - minBeli) / maxBeli) * 100 : 0;
    const isBeliTradeValid = beliDiffPercent <= 40 || maxBeli === 0;

    // Trading Value Win / Loss calculation
    const valDiff = theirTotalTradingVal - yourTotalTradingVal;
    let verdict: { title: string; color: string; desc: string } = {
      title: 'Fair Trade',
      color: 'text-cyan-400',
      desc: 'Both sides are balanced in community trading market value.'
    };

    if (valDiff > 10000000) {
      verdict = { title: 'Massive Win (W)', color: 'text-emerald-400', desc: 'You are gaining significantly more trading value!' };
    } else if (valDiff > 2000000) {
      verdict = { title: 'Small Win (W)', color: 'text-emerald-300', desc: 'Good favorable trade in your direction.' };
    } else if (valDiff < -10000000) {
      verdict = { title: 'Massive Loss (L)', color: 'text-rose-400', desc: 'You are heavily overpaying in trading market value.' };
    } else if (valDiff < -2000000) {
      verdict = { title: 'Small Loss (L)', color: 'text-rose-300', desc: 'You are giving slightly more value than you receive.' };
    }

    return {
      yourFruits,
      theirFruits,
      yourTotalTradingVal,
      theirTotalTradingVal,
      yourTotalBeli,
      theirTotalBeli,
      isBeliTradeValid,
      beliDiffPercent: beliDiffPercent.toFixed(1),
      valDiff,
      verdict
    };
  }, [yourOffer, theirOffer]);

  const formatMillions = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
    return num.toLocaleString();
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Top Verdict Banner */}
      <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center text-white">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">
              Trade Fairness Assessment
            </span>
            <h3 className={`text-xl font-extrabold ${tradeStats.verdict.color}`}>
              {tradeStats.verdict.title}
            </h3>
            <p className="text-xs text-zinc-400">{tradeStats.verdict.desc}</p>
          </div>
        </div>

        {/* 40% In-Game Trade Rule Indicator */}
        <div className="text-right">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border inline-flex items-center gap-1.5 ${
            tradeStats.isBeliTradeValid
              ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950 border-rose-500/40 text-rose-300'
          }`}>
            {tradeStats.isBeliTradeValid ? <Check className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            40% In-Game Beli Rule: {tradeStats.isBeliTradeValid ? 'Passed' : 'Beli Difference Too High'} ({tradeStats.beliDiffPercent}%)
          </span>
        </div>
      </div>

      {/* Two Sides Trading Table (You Give vs You Receive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Offer Side */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Your Offer (Max 4 Fruits)
            </span>
            <span className="text-xs font-mono font-bold text-white">
              Val: {formatMillions(tradeStats.yourTotalTradingVal)}
            </span>
          </div>

          {/* Slots */}
          <div className="grid grid-cols-2 gap-2 min-h-[120px]">
            {tradeStats.yourFruits.map((fruit, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className={`text-xs font-bold block ${fruit.iconColor}`}>{fruit.name}</span>
                  <span className="text-[10px] text-zinc-400 font-mono block">Val: {formatMillions(fruit.tradingValue)}</span>
                </div>
                <button
                  onClick={() => removeFruit('you', idx)}
                  className="p-1 text-zinc-500 hover:text-rose-400 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {tradeStats.yourFruits.length < 4 && (
              <div className="border border-dashed border-zinc-800 rounded-xl flex items-center justify-center p-3 text-xs text-zinc-500">
                + Add Fruit Below
              </div>
            )}
          </div>
        </div>

        {/* Their Offer Side */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Their Offer (Max 4 Fruits)
            </span>
            <span className="text-xs font-mono font-bold text-white">
              Val: {formatMillions(tradeStats.theirTotalTradingVal)}
            </span>
          </div>

          {/* Slots */}
          <div className="grid grid-cols-2 gap-2 min-h-[120px]">
            {tradeStats.theirFruits.map((fruit, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className={`text-xs font-bold block ${fruit.iconColor}`}>{fruit.name}</span>
                  <span className="text-[10px] text-zinc-400 font-mono block">Val: {formatMillions(fruit.tradingValue)}</span>
                </div>
                <button
                  onClick={() => removeFruit('them', idx)}
                  className="p-1 text-zinc-500 hover:text-rose-400 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {tradeStats.theirFruits.length < 4 && (
              <div className="border border-dashed border-zinc-800 rounded-xl flex items-center justify-center p-3 text-xs text-zinc-500">
                + Add Fruit Below
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fruit Selection Picker */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Add Physical Fruit to Trade
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 max-h-48 overflow-y-auto pr-1">
          {BLOX_FRUITS_LIST.map((fruit) => (
            <div
              key={fruit.id}
              className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col justify-between text-xs hover:border-zinc-700"
            >
              <div>
                <span className={`font-bold block truncate ${fruit.iconColor}`}>{fruit.name}</span>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  Val: {formatMillions(fruit.tradingValue)}
                </span>
              </div>
              <div className="flex gap-1 mt-2 pt-1 border-t border-zinc-800 text-[10px]">
                <button
                  onClick={() => addFruit('you', fruit.id)}
                  disabled={yourOffer.length >= 4}
                  className="flex-1 py-1 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-900 disabled:opacity-30 font-semibold"
                >
                  + You
                </button>
                <button
                  onClick={() => addFruit('them', fruit.id)}
                  disabled={theirOffer.length >= 4}
                  className="flex-1 py-1 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900 disabled:opacity-30 font-semibold"
                >
                  + Them
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
