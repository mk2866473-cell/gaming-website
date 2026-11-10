/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Compass, Timer, Wind, ShieldCheck, Check, AlertTriangle, ArrowRight, Zap
} from 'lucide-react';
import { FORTNITE_TRAVEL_SPEEDS } from '../../data/fortniteData';

export default function FortniteDistanceCalculator() {
  const [distanceMeters, setDistanceMeters] = useState<number>(850);
  const [stormSpeedMetersPerSec, setStormSpeedMetersPerSec] = useState<number>(6.5); // Standard storm closing speed

  const formatSeconds = (sec: number) => {
    if (sec < 60) return `${sec.toFixed(1)}s`;
    const mins = Math.floor(sec / 60);
    const rem = Math.round(sec % 60);
    return `${mins}m ${rem}s`;
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Quick Map Presets */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <span className="font-semibold text-zinc-400">Map Rotation Distances:</span>
        {[
          { label: 'Short Rotation (250m)', dist: 250 },
          { label: 'POI to POI (750m)', dist: 750 },
          { label: 'Cross-Zone Rotation (1,200m)', dist: 1200 },
          { label: 'Full Island Diagonal (2,500m)', dist: 2500 }
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => setDistanceMeters(preset.dist)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
              distanceMeters === preset.dist
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input Slider */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Travel Rotation Distance (Meters)
          </label>
          <span className="text-base font-bold font-mono text-white">
            {distanceMeters.toLocaleString()} Meters (~{(distanceMeters / 5.12).toFixed(0)} Build Tiles)
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="3000"
          step="50"
          value={distanceMeters}
          onChange={(e) => setDistanceMeters(parseInt(e.target.value, 10))}
          className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Travel Modes Breakdown Cards Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
          <Timer className="w-4 h-4 text-amber-400" />
          Rotation Travel Times Across {FORTNITE_TRAVEL_SPEEDS.length} Movement Modes
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FORTNITE_TRAVEL_SPEEDS.map((mode) => {
            const timeSec = distanceMeters / mode.speedMetersPerSec;
            const canOutrunStorm = mode.speedMetersPerSec > stormSpeedMetersPerSec;

            return (
              <div
                key={mode.id}
                className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white">{mode.name}</span>
                    <span className="text-[10px] font-mono text-zinc-400">{mode.speedMetersPerSec} m/s</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mb-2 leading-tight">
                    {mode.notes}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    ⏱️ {formatSeconds(timeSec)}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    canOutrunStorm ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                  }`}>
                    {canOutrunStorm ? 'Outruns Storm' : 'Slower than Storm'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
