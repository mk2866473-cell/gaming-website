/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Shield, AlertTriangle, Coins, CheckCircle2, Zap } from 'lucide-react';

export default function MogoShieldFinderTool() {
  const [currentShields, setCurrentShields] = useState<number>(3);
  const [maxShields, setMaxShields] = useState<number>(5);
  const [unspentCashBillion, setUnspentCashBillion] = useState<number>(12.5); // stored cash in Billions

  const shieldCalculations = useMemo(() => {
    const missingShields = Math.max(0, maxShields - currentShields);

    // Estimated dice rolls to land on shield tiles (approx 1 in 8 tiles)
    const estDiceToRefill = missingShields * 10;

    // Bank Heist Loss exposure
    const largeHeistLoss = unspentCashBillion * 0.20; // ~20% cash loss
    const smallHeistLoss = unspentCashBillion * 0.08;

    return {
      missingShields,
      estDiceToRefill,
      largeHeistLoss: largeHeistLoss.toFixed(2),
      smallHeistLoss: smallHeistLoss.toFixed(2),
      isRiskHigh: unspentCashBillion > 5.0 && currentShields === 0
    };
  }, [currentShields, maxShields, unspentCashBillion]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-zinc-900 border border-red-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
              Landmark Shutdown & Bank Heist Protection
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Shield className="w-6 h-6 text-red-400" />
              Monopoly GO Landmark Shield Defense & Risk Calculator
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Calculate shield refill dice requirements, landmark Shutdown repair economics, and Bank Heist cash loss risk.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Est. Dice to Refill</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                ~{shieldCalculations.estDiceToRefill} Rolls
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Col: Shield Inputs */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            1. Current Shield Status
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Active Shields:</span>
                <span className="font-mono text-amber-300 font-bold">{currentShields} / {maxShields}</span>
              </label>
              <input
                type="range"
                min="0"
                max={maxShields}
                value={currentShields}
                onChange={e => setCurrentShields(parseInt(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Max Shield Capacity:</span>
                <span className="font-mono text-amber-300 font-bold">{maxShields} Shields</span>
              </label>
              <input
                type="number"
                min="3"
                max="5"
                value={maxShields}
                onChange={e => setMaxShields(parseInt(e.target.value) || 3)}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Stored Board Cash ($ Billions):</span>
                <span className="font-mono text-amber-300 font-bold">${unspentCashBillion}B</span>
              </label>
              <input
                type="number"
                step="0.5"
                value={unspentCashBillion}
                onChange={e => setUnspentCashBillion(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-red-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Risk Analysis */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-red-400" />
              2. Bank Heist Loss Exposure
            </h3>

            <div className={`p-4 rounded-xl border mb-3 ${
              shieldCalculations.isRiskHigh
                ? 'bg-amber-950/20 border-amber-500/40 text-amber-300'
                : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
            }`}>
              <div className="font-bold text-sm mb-1">
                {shieldCalculations.isRiskHigh ? 'High Bank Heist Loss Exposure!' : 'Cash Balance Safe'}
              </div>
              <p className="text-xs text-zinc-300">
                A Large Bank Heist could steal up to <strong className="text-white">${shieldCalculations.largeHeistLoss} Billion Cash</strong>.
              </p>
            </div>
          </div>

          <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs text-zinc-400">
            Pro Tip: Roll on 1x multiplier until you land on Shield tiles to refill shields without wasting precious dice.
          </div>
        </div>
      </div>
    </div>
  );
}
