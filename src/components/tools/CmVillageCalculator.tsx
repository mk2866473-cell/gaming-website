/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Zap, TrendingUp, Info } from 'lucide-react';

export default function CmVillageCalculator() {
  const [level, setLevel] = useState<number>(1);

  // Realistic Coin Master village cost milestones (ballpark estimates based on game data)
  const getEstimatedCost = (lvl: number) => {
    if (lvl <= 1) return 4000000;
    if (lvl <= 10) return 4000000 * Math.pow(1.2, lvl - 1);
    if (lvl <= 50) return 20000000 * Math.pow(1.1, lvl - 10);
    if (lvl <= 100) return 500000000 * Math.pow(1.05, lvl - 50);
    if (lvl <= 200) return 25000000000 * Math.pow(1.03, lvl - 100);
    return 500000000000 * Math.pow(1.02, lvl - 200);
  };

  const costData = useMemo(() => {
    const estimatedCost = getEstimatedCost(level);
    
    return {
      total: estimatedCost,
      perItem: Math.floor(estimatedCost / 25),
      nextVillage: getEstimatedCost(level + 1),
      withDiscount: Math.floor(estimatedCost * 0.8) // 20% discount common event
    };
  }, [level]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Village Cost Calculator</h2>
            <p className="text-xs text-zinc-400">Plan your coin savings for village upgrades and discount events.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#090d16] border border-zinc-800 rounded-xl p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-bold text-zinc-300">Target Village Level:</label>
                <span className="text-xs font-bold text-amber-400 border border-amber-500/20 px-2.5 py-1">
                  LEVEL {level}
                </span>
            </div>
            <input 
              type="range" 
              min="1"
              max="500"
              step="1"
              value={level} 
              onChange={e => setLevel(Number(e.target.value))} 
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500 mb-2" 
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>LVL 1</span>
              <span>LVL 250</span>
              <span>LVL 500</span>
            </div>
            <div className="mt-4">
              <input 
                type="number"
                min="1"
                max="1000"
                value={level}
                onChange={e => setLevel(Math.max(1, Math.min(1000, Number(e.target.value))))}
                className="w-full bg-zinc-950 p-2.5 rounded border border-zinc-800 text-white text-center font-mono focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="p-5 bg-zinc-950 rounded-xl border border-amber-500/20 space-y-1">
            <div className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
              Estimated Total Construction Cost
            </div>
            <div className="text-3xl font-black text-white break-all">
              {costData.total.toLocaleString()} <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Coins</span>
            </div>
          </div>
        </div>

        <div className="bg-[#090d16] border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">Cost per Upgrade (1/25):</span>
              <span className="text-white font-mono font-bold">{costData.perItem.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">Next Village (Lvl {level + 1}):</span>
              <span className="text-white font-mono font-bold">{costData.nextVillage.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm py-2">
              <span className="text-emerald-400 font-semibold italic">Village Mania (-20%):</span>
              <span className="text-emerald-400 font-mono font-bold">{costData.withDiscount.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3.5 p-4 border border-blue-500/20">
            <div className="w-8 h-8 bg-blue-500/10 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-[11px] text-blue-200/80 leading-relaxed">
              <strong className="text-blue-300 block mb-0.5">Strategy Tip:</strong> 
              Save your coins and only build during <strong>Village Mania</strong> or <strong>Village Master</strong> events to maximize rewards and minimize spending by up to 65%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

