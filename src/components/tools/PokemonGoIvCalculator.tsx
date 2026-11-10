/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Star, Shield, Zap, Heart, Award, Check, Sparkles, AlertCircle
} from 'lucide-react';

export default function PokemonGoIvCalculator() {
  const [atkIv, setAtkIv] = useState<number>(15);
  const [defIv, setDefIv] = useState<number>(14);
  const [hpIv, setHpIv] = useState<number>(15);

  const stats = useMemo(() => {
    const total = atkIv + defIv + hpIv;
    const percentage = ((total / 45) * 100).toFixed(1);

    let starRating = 0;
    let starLabel = '0 Stars (Under 50%)';
    let starColor = 'text-zinc-500';

    if (total === 45) {
      starRating = 4;
      starLabel = '4 Stars (100% Perfect Hundo 🌟)';
      starColor = 'text-amber-400 font-extrabold';
    } else if (total >= 37) {
      starRating = 3;
      starLabel = '3 Stars (82.2% - 97.8%)';
      starColor = 'text-emerald-400 font-bold';
    } else if (total >= 30) {
      starRating = 2;
      starLabel = '2 Stars (66.7% - 80.0%)';
      starColor = 'text-cyan-400 font-bold';
    } else if (total >= 23) {
      starRating = 1;
      starLabel = '1 Star (51.1% - 64.4%)';
      starColor = 'text-zinc-300';
    }

    return {
      total,
      percentage,
      starRating,
      starLabel,
      starColor,
      isHundo: total === 45,
      isNundo: total === 0
    };
  }, [atkIv, defIv, hpIv]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Quick Appraisal Bar Presets */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <span className="font-semibold text-zinc-400">Quick Presets:</span>
        {[
          { label: '100% Hundo (15/15/15)', a: 15, d: 15, h: 15 },
          { label: '98% Top Tier (15/15/14)', a: 15, d: 15, h: 14 },
          { label: '96% Strong (15/14/14)', a: 15, d: 14, h: 14 },
          { label: 'Raid Floor 67% (10/10/10)', a: 10, d: 10, h: 10 },
          { label: 'Lucky Floor 80% (12/12/12)', a: 12, d: 12, h: 12 },
          { label: 'PvP Rank 1 Great League (0/15/15)', a: 0, d: 15, h: 15 },
          { label: '0% Nundo (0/0/0)', a: 0, d: 0, h: 0 }
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => { setAtkIv(preset.a); setDefIv(preset.d); setHpIv(preset.h); }}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-[11px] transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* 3 Interactive Appraisal Bars (Attack, Defense, HP) */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          In-Game Appraisal Bar Simulator
        </h3>

        {/* Attack */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Attack IV Bar
            </span>
            <span className="font-mono text-white text-sm">{atkIv} / 15 ({((atkIv / 15) * 100).toFixed(0)}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={atkIv}
            onChange={(e) => setAtkIv(parseInt(e.target.value, 10))}
            className="w-full accent-rose-500 h-3 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>0</span>
            <span>5 (1st Bar)</span>
            <span>10 (2nd Bar)</span>
            <span>15 (Max Pink)</span>
          </div>
        </div>

        {/* Defense */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Defense IV Bar
            </span>
            <span className="font-mono text-white text-sm">{defIv} / 15 ({((defIv / 15) * 100).toFixed(0)}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={defIv}
            onChange={(e) => setDefIv(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 h-3 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15 (Max Pink)</span>
          </div>
        </div>

        {/* HP / Stamina */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4" /> HP / Stamina IV Bar
            </span>
            <span className="font-mono text-white text-sm">{hpIv} / 15 ({((hpIv / 15) * 100).toFixed(0)}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={hpIv}
            onChange={(e) => setHpIv(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 h-3 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15 (Max Pink)</span>
          </div>
        </div>
      </div>

      {/* Main IV Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center shadow-lg shadow-amber-950/30">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Total IV Percentage</span>
          <span className="text-4xl font-extrabold font-mono text-amber-400 my-1 block">
            {stats.percentage}%
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            {stats.total} / 45 Total Stat Points
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Appraisal Badge Rating</span>
          <span className={`text-xl font-bold block my-2 ${stats.starColor}`}>
            {stats.starLabel}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Team Leader Appraisal Tier
          </span>
        </div>

        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-purple-300 block">Best Game Use Recommendation</span>
          <span className="text-lg font-bold font-mono text-purple-300 my-1 block">
            {stats.isHundo ? 'Master League & Raids (Max Rank)' : atkIv === 0 && defIv >= 13 ? 'Great/Ultra League PvP (Optimal Stat Product)' : stats.total >= 37 ? 'Gyms & PvE Raids (High Tier)' : 'Trade / Transfer for Candy'}
          </span>
          <span className="text-[11px] text-zinc-400">
            {atkIv === 0 ? 'Low Attack optimizes PvP stat product' : 'High stats maximize total CP cap'}
          </span>
        </div>
      </div>
    </div>
  );
}
