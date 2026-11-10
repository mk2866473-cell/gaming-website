/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Crosshair, MousePointer, ShieldCheck, Check, Sparkles, TrendingUp, Trophy
} from 'lucide-react';
import { FORTNITE_PRO_SENSITIVITIES, ProPlayerSens } from '../../data/fortniteData';

export default function FortniteEdpiCalculator() {
  const [dpi, setDpi] = useState<number>(800);
  const [sensXPercent, setSensXPercent] = useState<number>(6.5); // 6.5%

  const stats = useMemo(() => {
    // Fortnite eDPI = DPI * (Sensitivity% / 100) * 10
    // e.g. 800 DPI * 6.5% = 52 eDPI
    const edpi = Math.round(dpi * (sensXPercent / 100) * 10 * 10) / 10;

    // 360 turn distance:
    // Yaw = 0.00555555
    const degreesPerCount = (sensXPercent / 100) * 0.00555555 * 10; // adjusted for Fortnite scale
    const cm360 = (360 / (degreesPerCount * dpi)) * 2.54;

    let tier = { name: 'Medium (Pro Meta)', desc: 'Balanced building, piece control & shotgun precision.', color: 'text-emerald-400' };
    if (edpi < 45) {
      tier = { name: 'Low (Arm Aim)', desc: 'Ultra-precise shotgun flicks, requires a large mousepad.', color: 'text-cyan-400' };
    } else if (edpi > 75) {
      tier = { name: 'High (Wrist Aim)', desc: 'Lightning fast edits & 360 resets, higher mechanical difficulty.', color: 'text-rose-400' };
    }

    return {
      edpi,
      cm360: cm360.toFixed(1),
      inches360: (cm360 / 2.54).toFixed(1),
      tier
    };
  }, [dpi, sensXPercent]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mouse DPI */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-amber-400 uppercase tracking-wider">Mouse Hardware DPI</span>
            <span className="font-mono text-white">{dpi} DPI</span>
          </div>
          <div className="flex gap-2">
            {[400, 800, 1200, 1600].map((d) => (
              <button
                key={d}
                onClick={() => setDpi(d)}
                className={`flex-1 py-1.5 rounded-lg border font-mono font-bold text-xs ${
                  dpi === d ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {d} DPI
              </button>
            ))}
          </div>
          <input
            type="range"
            min="200"
            max="3200"
            step="50"
            value={dpi}
            onChange={(e) => setDpi(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* In-Game Sensitivity % */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-cyan-400 uppercase tracking-wider">In-Game X/Y Sensitivity (%)</span>
            <span className="font-mono text-white">{sensXPercent.toFixed(1)}%</span>
          </div>
          <input
            type="number"
            step="0.1"
            min="0.5"
            max="50.0"
            value={sensXPercent}
            onChange={(e) => setSensXPercent(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-white focus:outline-none focus:border-cyan-500"
          />
          <input
            type="range"
            min="1.0"
            max="25.0"
            step="0.1"
            value={sensXPercent}
            onChange={(e) => setSensXPercent(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Main Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center shadow-lg shadow-amber-950/30">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Calculated Fortnite eDPI</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 my-1 block">
            {stats.edpi} <span className="text-xs font-normal text-zinc-400">eDPI</span>
          </span>
          <span className={`text-xs font-bold font-mono ${stats.tier.color}`}>
            {stats.tier.name}
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">360° Turn Distance</span>
          <span className="text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {stats.cm360} <span className="text-xs font-normal text-zinc-400">cm</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {stats.inches360} inches per full 360° rotation
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Aim Style Category</span>
          <span className={`text-lg font-bold block my-1 ${stats.tier.color}`}>
            {stats.tier.name.split(' ')[0]} Sensitivity
          </span>
          <span className="text-[11px] text-zinc-400 leading-tight block">
            {stats.tier.desc}
          </span>
        </div>
      </div>

      {/* Pro Players Comparison Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          Pro Fortnite Players Sensitivity Benchmark
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FORTNITE_PRO_SENSITIVITIES.map((pro) => (
            <button
              key={pro.name}
              onClick={() => { setDpi(pro.dpi); setSensXPercent(pro.sensX); }}
              className="p-3 bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-xl text-left transition-colors flex justify-between items-center"
            >
              <div>
                <span className="text-xs font-bold text-white block">{pro.name}</span>
                <span className="text-[10px] text-zinc-400">{pro.team}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-amber-400 block">
                  {pro.edpi} eDPI
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {pro.sensX}% @ {pro.dpi} DPI
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
