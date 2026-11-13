/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Check, Trash2, Trophy, AlertTriangle, Scale, ArrowRightLeft
} from 'lucide-react';
import { BLOX_FRUITS_LIST } from '../../data/robloxData';

export default function BloxFruitsCalculator() {
  const [yourOffer, setYourOffer] = useState<string[]>(['dough', 'buddha']);
  const [theirOffer, setTheirOffer] = useState<string[]>(['t-rex']);

  // 40% Rule Evaluator Mode: synced with trade table above OR custom Beli input check
  const [ruleMode, setRuleMode] = useState<'synced' | 'custom'>('synced');
  const [customYourBeli, setCustomYourBeli] = useState<number>(4000000);
  const [customTheirBeli, setCustomTheirBeli] = useState<number>(2700000);

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

  // Calculations for Trading Value & Synced Beli
  const tradeStats = useMemo(() => {
    const yourFruits = yourOffer.map(id => BLOX_FRUITS_LIST.find(f => f.id === id)!).filter(Boolean);
    const theirFruits = theirOffer.map(id => BLOX_FRUITS_LIST.find(f => f.id === id)!).filter(Boolean);

    const yourTotalTradingVal = yourFruits.reduce((sum, f) => sum + f.tradingValue, 0);
    const theirTotalTradingVal = theirFruits.reduce((sum, f) => sum + f.tradingValue, 0);

    const yourTotalBeli = yourFruits.reduce((sum, f) => sum + f.beliPrice, 0);
    const theirTotalBeli = theirFruits.reduce((sum, f) => sum + f.beliPrice, 0);

    const yourAvgDemand = yourFruits.length > 0
      ? (yourFruits.reduce((sum, f) => sum + f.demand, 0) / yourFruits.length).toFixed(1)
      : '0.0';
    const theirAvgDemand = theirFruits.length > 0
      ? (theirFruits.reduce((sum, f) => sum + f.demand, 0) / theirFruits.length).toFixed(1)
      : '0.0';

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
      yourAvgDemand,
      theirAvgDemand,
      valDiff,
      verdict
    };
  }, [yourOffer, theirOffer]);

  // Separate 40% Beli Rule Evaluator Calculations
  const ruleEvaluation = useMemo(() => {
    const sideA = ruleMode === 'synced' ? tradeStats.yourTotalBeli : Math.max(0, customYourBeli);
    const sideB = ruleMode === 'synced' ? tradeStats.theirTotalBeli : Math.max(0, customTheirBeli);

    const maxBeli = Math.max(sideA, sideB);
    const minBeli = Math.min(sideA, sideB);
    const beliDiffAmount = maxBeli - minBeli;
    const beliDiffPercent = maxBeli > 0 ? (beliDiffAmount / maxBeli) * 100 : 0;
    const isValid = beliDiffPercent <= 40 || maxBeli === 0;

    // To satisfy (max - min) / max <= 0.40 => min >= 0.60 * max
    const minRequiredBeli = Math.ceil(maxBeli * 0.60);
    const beliNeededToPass = Math.max(0, minRequiredBeli - minBeli);
    const lowerSideLabel = sideA < sideB ? 'Your Offer' : sideB < sideA ? 'Their Offer' : 'Balanced';

    return {
      sideA,
      sideB,
      maxBeli,
      minBeli,
      beliDiffAmount,
      beliDiffPercent,
      isValid,
      minRequiredBeli,
      beliNeededToPass,
      lowerSideLabel
    };
  }, [ruleMode, tradeStats.yourTotalBeli, tradeStats.theirTotalBeli, customYourBeli, customTheirBeli]);

  const formatMillions = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2).replace(/\.00$/, '')}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: Fruit Value & Trading Calculator */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
              Section 1 · Market Value & Trade Fairness
            </span>
            <h2 className="text-lg font-extrabold text-white">
              Fruit Value & Trading Calculator
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Net Value Diff: {tradeStats.valDiff >= 0 ? '+' : ''}{formatMillions(tradeStats.valDiff)}
          </span>
        </div>

        {/* Top Verdict Banner */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center text-white shrink-0">
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

          <div className="flex flex-wrap gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">Avg Demand (You)</span>
              <span className="text-emerald-300 font-bold">{tradeStats.yourAvgDemand}/10</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">Avg Demand (Them)</span>
              <span className="text-cyan-300 font-bold">{tradeStats.theirAvgDemand}/10</span>
            </div>
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
              <div className="text-right font-mono">
                <span className="text-xs font-bold text-white block">
                  Val: {formatMillions(tradeStats.yourTotalTradingVal)}
                </span>
                <span className="text-[10px] text-zinc-400">
                  Beli: ${tradeStats.yourTotalBeli.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Slots */}
            <div className="grid grid-cols-2 gap-2 min-h-[120px]">
              {tradeStats.yourFruits.map((fruit, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl flex items-center justify-between">
                  <div className="min-w-0">
                    <span className={`text-xs font-bold block truncate ${fruit.iconColor}`}>{fruit.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono block">
                      Val: {formatMillions(fruit.tradingValue)} · {fruit.demand}/10
                    </span>
                  </div>
                  <button
                    onClick={() => removeFruit('you', idx)}
                    className="p-1 text-zinc-500 hover:text-rose-400 rounded cursor-pointer"
                    title="Remove fruit"
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
              <div className="text-right font-mono">
                <span className="text-xs font-bold text-white block">
                  Val: {formatMillions(tradeStats.theirTotalTradingVal)}
                </span>
                <span className="text-[10px] text-zinc-400">
                  Beli: ${tradeStats.theirTotalBeli.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Slots */}
            <div className="grid grid-cols-2 gap-2 min-h-[120px]">
              {tradeStats.theirFruits.map((fruit, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl flex items-center justify-between">
                  <div className="min-w-0">
                    <span className={`text-xs font-bold block truncate ${fruit.iconColor}`}>{fruit.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono block">
                      Val: {formatMillions(fruit.tradingValue)} · {fruit.demand}/10
                    </span>
                  </div>
                  <button
                    onClick={() => removeFruit('them', idx)}
                    className="p-1 text-zinc-500 hover:text-rose-400 rounded cursor-pointer"
                    title="Remove fruit"
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
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1">
            {BLOX_FRUITS_LIST.map((fruit) => (
              <div
                key={fruit.id}
                className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col justify-between text-xs hover:border-zinc-700"
              >
                <div>
                  <span className={`font-bold block truncate ${fruit.iconColor}`}>{fruit.name}</span>
                  <span className="text-[10px] text-zinc-400 font-mono block">
                    Val: {formatMillions(fruit.tradingValue)}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono block">
                    Beli: {formatMillions(fruit.beliPrice)}
                  </span>
                </div>
                <div className="flex gap-1 mt-2 pt-1.5 border-t border-zinc-800 text-[10px]">
                  <button
                    onClick={() => addFruit('you', fruit.id)}
                    disabled={yourOffer.length >= 4}
                    className="flex-1 py-1 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-900 disabled:opacity-30 font-semibold cursor-pointer"
                  >
                    + You
                  </button>
                  <button
                    onClick={() => addFruit('them', fruit.id)}
                    disabled={theirOffer.length >= 4}
                    className="flex-1 py-1 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900 disabled:opacity-30 font-semibold cursor-pointer"
                  >
                    + Them
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: Dedicated 40% In-Game Beli Rule Evaluator */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                Section 2 · In-Game Trade Table Validation
              </span>
              <h2 className="text-lg font-extrabold text-white">
                40% Beli Rule Evaluator
              </h2>
            </div>
          </div>

          {/* Mode Toggle between Synced Fruits vs Custom Beli */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setRuleMode('synced')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                ruleMode === 'synced'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sync Fruit Offer
            </button>
            <button
              onClick={() => setRuleMode('custom')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                ruleMode === 'custom'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Custom Beli Test
            </button>
          </div>
        </div>

        {/* Custom Beli Inputs if Custom Mode is Selected */}
        {ruleMode === 'custom' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Your Offer Beli Value ($)
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={customYourBeli}
                onChange={(e) => setCustomYourBeli(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-base font-bold font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                Their Offer Beli Value ($)
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={customTheirBeli}
                onChange={(e) => setCustomTheirBeli(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-base font-bold font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        )}

        {/* 40% Rule Status Card */}
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            ruleEvaluation.isValid
              ? 'bg-emerald-950/30 border-emerald-500/40'
              : 'bg-rose-950/30 border-rose-500/40'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                ruleEvaluation.isValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {ruleEvaluation.isValid ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className={`text-sm font-extrabold ${ruleEvaluation.isValid ? 'text-emerald-300' : 'text-rose-300'}`}>
                {ruleEvaluation.isValid
                  ? 'Trade Allowed — Within 40% In-Game Beli Limit'
                  : 'Trade Blocked — "Value Difference Is Too High" (>40%)'}
              </h3>
              <p className="text-xs text-zinc-300 mt-0.5">
                {ruleEvaluation.isValid
                  ? `Beli difference is ${ruleEvaluation.beliDiffPercent.toFixed(1)}% (below the 40.0% in-game trade table ceiling).`
                  : `Add at least ${ruleEvaluation.beliNeededToPass.toLocaleString()} Beli (e.g. Gravity 2.5M or Shadow 2.9M) to ${ruleEvaluation.lowerSideLabel} to reach the 60% minimum threshold.`}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right font-mono shrink-0">
            <span className="text-[10px] uppercase text-zinc-400 block">Current Beli Gap</span>
            <span className={`text-2xl font-extrabold ${ruleEvaluation.isValid ? 'text-emerald-400' : 'text-rose-400'}`}>
              {ruleEvaluation.beliDiffPercent.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Metrics Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">
              Your Side Beli Total
            </span>
            <span className="text-lg font-extrabold font-mono text-emerald-400 mt-1 block">
              ${ruleEvaluation.sideA.toLocaleString()}
            </span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">
              Their Side Beli Total
            </span>
            <span className="text-lg font-extrabold font-mono text-cyan-400 mt-1 block">
              ${ruleEvaluation.sideB.toLocaleString()}
            </span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">
              Min Beli Required (60% of Max)
            </span>
            <span className="text-lg font-extrabold font-mono text-amber-300 mt-1 block">
              ${ruleEvaluation.minRequiredBeli.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
