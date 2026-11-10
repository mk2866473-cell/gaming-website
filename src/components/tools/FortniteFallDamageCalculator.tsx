/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, ShieldCheck, Heart, AlertTriangle, Sparkles, Check, Flame, Layers
} from 'lucide-react';
import { FORTNITE_CONSTANTS } from '../../data/fortniteData';

export default function FortniteFallDamageCalculator() {
  const [fallHeightTiles, setFallHeightTiles] = useState<number>(4);
  const [hasFlowberryBuff, setHasFlowberryBuff] = useState<boolean>(false);
  const [hasNitroEffect, setHasNitroEffect] = useState<boolean>(false);
  const [isWaterLanding, setIsWaterLanding] = useState<boolean>(false);

  const stats = useMemo(() => {
    const tiles = Math.max(0, fallHeightTiles);
    const heightMeters = tiles * FORTNITE_CONSTANTS.TILE_HEIGHT_METERS;

    // Any fall damage negation buff
    const isImmune = hasFlowberryBuff || hasNitroEffect || isWaterLanding;

    let damage = 0;
    // Fortnite fall damage mechanics:
    // Safe up to 3 tiles (approx 15.3m) -> 0 damage
    // 3.5 tiles (approx 18m) -> ~20-30 dmg
    // 4.0 tiles (approx 20.5m) -> ~50-60 dmg
    // 4.5 tiles (approx 23m) -> 100 dmg (Fatal knockout)
    if (!isImmune) {
      if (tiles <= 3.0) {
        damage = 0;
      } else if (tiles <= 4.5) {
        damage = Math.round(((tiles - 3.0) / 1.5) * 100);
      } else {
        damage = Math.round(100 + (tiles - 4.5) * 40); // Overkill
      }
    }

    const isFatal = damage >= 100;
    const remainingHp = Math.max(0, 100 - damage);

    return {
      tiles,
      heightMeters: heightMeters.toFixed(1),
      damage,
      isFatal,
      isImmune,
      remainingHp
    };
  }, [fallHeightTiles, hasFlowberryBuff, hasNitroEffect, isWaterLanding]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Danger Status Banner */}
      {stats.isImmune ? (
        <div className="p-4 bg-emerald-950/50 border border-emerald-500/50 rounded-xl flex items-center justify-between gap-3 text-emerald-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Fall Damage Completely Negated (0 Damage)
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Active low-gravity effect, Nitro buff, or water landing completely eliminates all impact damage regardless of height.
              </p>
            </div>
          </div>
          <span className="text-xl font-mono font-extrabold text-emerald-400">
            0 Dmg
          </span>
        </div>
      ) : stats.isFatal ? (
        <div className="p-4 bg-rose-950/80 border border-rose-500/60 rounded-xl flex items-center justify-between gap-3 text-rose-200">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 animate-pulse" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Fatal Impact! Instant Knockout / Elimination
              </span>
              <p className="text-xs text-rose-300 mt-0.5">
                Falling from {stats.tiles} build tiles ({stats.heightMeters}m) exceeds lethal threshold (&gt;4.5 tiles).
              </p>
            </div>
          </div>
          <span className="text-xl font-mono font-extrabold text-rose-400">
            {stats.damage} Dmg
          </span>
        </div>
      ) : stats.damage > 0 ? (
        <div className="p-4 bg-amber-950/60 border border-amber-500/50 rounded-xl flex items-center justify-between gap-3 text-amber-200">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Surviving Fall With Damage ({stats.damage} HP Lost)
              </span>
              <p className="text-xs text-amber-300 mt-0.5">
                Fall bypasses shields directly and depletes your green HP bar to {stats.remainingHp} HP.
              </p>
            </div>
          </div>
          <span className="text-xl font-mono font-extrabold text-amber-400">
            -{stats.damage} HP
          </span>
        </div>
      ) : (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-3 text-emerald-300">
          <div className="flex items-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Safe Fall Zone (0 Damage)
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Falls of 3 build tiles or lower (under 15.3 meters) deal zero fall damage.
              </p>
            </div>
          </div>
          <span className="text-xl font-mono font-extrabold text-emerald-400">
            0 Dmg
          </span>
        </div>
      )}

      {/* Inputs Slider & Tiles */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            Building Structure Height (Tiles)
          </label>
          <span className="text-xs font-mono text-zinc-300 font-bold">
            {stats.tiles} Tiles ({stats.heightMeters} meters)
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={fallHeightTiles}
          onChange={(e) => setFallHeightTiles(parseFloat(e.target.value))}
          className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
          <span>1 Tile (5.1m - Safe)</span>
          <span>3 Tiles (15.3m - Safe Limit)</span>
          <span>4.5 Tiles (23m - Lethal 100 HP)</span>
          <span>10 Tiles (Mega Fall)</span>
        </div>
      </div>

      {/* Fall Damage Immunity Buffs */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Fall Damage Immunity Buffs Active
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <label className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hasFlowberryBuff}
              onChange={(e) => setHasFlowberryBuff(e.target.checked)}
              className="w-4 h-4 rounded accent-purple-500 bg-zinc-950 border-zinc-700 cursor-pointer"
            />
            <div>
              <span className="font-bold text-purple-300 block">Flowberry / Fizz</span>
              <span className="text-[10px] text-zinc-500">Low gravity shield aura</span>
            </div>
          </label>

          <label className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hasNitroEffect}
              onChange={(e) => setHasNitroEffect(e.target.checked)}
              className="w-4 h-4 rounded accent-amber-500 bg-zinc-950 border-zinc-700 cursor-pointer"
            />
            <div>
              <span className="font-bold text-amber-300 block">Nitro Splash Effect</span>
              <span className="text-[10px] text-zinc-500">Zero fall damage buff</span>
            </div>
          </label>

          <label className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isWaterLanding}
              onChange={(e) => setIsWaterLanding(e.target.checked)}
              className="w-4 h-4 rounded accent-cyan-500 bg-zinc-950 border-zinc-700 cursor-pointer"
            />
            <div>
              <span className="font-bold text-cyan-300 block">Water / Bush Landing</span>
              <span className="text-[10px] text-zinc-500">Impact absorption</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
