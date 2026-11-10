/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calculator, Coins, Zap, Sparkles, Building, CheckCircle2 } from 'lucide-react';

export default function MogoUpgradeCostPlannerTool() {
  const [boardNumber, setBoardNumber] = useState<number>(120);
  const [hasBuildersBash, setHasBuildersBash] = useState<boolean>(true);
  const [buildersBashDiscount, setBuildersBashDiscount] = useState<number>(30); // 30% or 50%

  const upgradeCalculations = useMemo(() => {
    // Base cash for board 1 ~ $10M
    // Compound rate ~ 1.12 per board
    const baseCostMillion = 10 * Math.pow(1.12, boardNumber / 10);
    const rawTotalBoardCostBillion = (baseCostMillion * 25) / 1000; // 25 house upgrades per board

    const discountFactor = hasBuildersBash ? (1 - buildersBashDiscount / 100) : 1.0;
    const finalBoardCostBillion = rawTotalBoardCostBillion * discountFactor;
    const cashSavingsBillion = rawTotalBoardCostBillion - finalBoardCostBillion;

    return {
      rawTotalBoardCostBillion: rawTotalBoardCostBillion.toFixed(2),
      finalBoardCostBillion: finalBoardCostBillion.toFixed(2),
      cashSavingsBillion: cashSavingsBillion.toFixed(2),
      hotelsSpawned: 5 // 5 landmark hotels trigger Color Wheel
    };
  }, [boardNumber, hasBuildersBash, buildersBashDiscount]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-zinc-900 border border-red-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
              Builder's Bash Discount Engine
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Building className="w-6 h-6 text-red-400" />
              Monopoly GO Board Upgrade & Cost Planner
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Calculate total cash required for 25 landmark upgrades and Builder's Bash flash event discount savings.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Total Board Cash</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                ${upgradeCalculations.finalBoardCostBillion}B Cash
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Board Selection */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-red-400" />
            1. Board Level & Discounts
          </h3>

          <div>
            <label className="text-xs text-zinc-400 flex justify-between mb-1">
              <span>Board Level Number:</span>
              <span className="font-mono text-amber-300 font-bold">Board #{boardNumber}</span>
            </label>
            <input
              type="range"
              min="1"
              max="500"
              value={boardNumber}
              onChange={e => setBoardNumber(parseInt(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>

          <div className="pt-2 border-t border-zinc-800 space-y-3">
            <label className="flex items-center justify-between bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 cursor-pointer">
              <span className="text-xs text-zinc-200">Active Builder's Bash Event?</span>
              <input
                type="checkbox"
                checked={hasBuildersBash}
                onChange={e => setHasBuildersBash(e.target.checked)}
                className="w-4 h-4 accent-red-500"
              />
            </label>

            {hasBuildersBash && (
              <div className="flex items-center justify-between text-xs bg-zinc-950/40 p-2.5 rounded border border-zinc-800">
                <span className="text-zinc-400">Discount Percentage</span>
                <select
                  value={buildersBashDiscount}
                  onChange={e => setBuildersBashDiscount(parseInt(e.target.value))}
                  className="bg-zinc-900 text-amber-300 font-bold border border-zinc-700 rounded px-2 py-1 outline-none"
                >
                  <option value={30}>-30% Discount</option>
                  <option value={50}>-50% Discount</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Right: Calculations */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-400" />
              2. Cash Requirements & Savings
            </h3>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 flex justify-between">
                <span className="text-zinc-400">Standard Board Cost:</span>
                <span className="text-zinc-300">${upgradeCalculations.rawTotalBoardCostBillion}B Cash</span>
              </div>

              {hasBuildersBash && (
                <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Builder's Bash Savings:</span>
                  <span className="text-emerald-400 font-bold">-${upgradeCalculations.cashSavingsBillion}B Cash</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-lg text-xs text-zinc-300 mt-4">
            Pro Tip: Completing all 25 house upgrades on a board places hotels on every tile, triggering Color Wheel spins.
          </div>
        </div>
      </div>
    </div>
  );
}
