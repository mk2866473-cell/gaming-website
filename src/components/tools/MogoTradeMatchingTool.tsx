/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Shield, CheckCircle2, AlertTriangle, Sparkles, Lock } from 'lucide-react';

export default function MogoTradeMatchingTool() {
  const [offeredStarRating, setOfferedStarRating] = useState<number>(5);
  const [offeredQuantity, setOfferedQuantity] = useState<number>(1);
  const [isOfferedGold, setIsOfferedGold] = useState<boolean>(false);

  const [requestedStarRating, setRequestedStarRating] = useState<number>(5);
  const [requestedQuantity, setRequestedQuantity] = useState<number>(1);
  const [isRequestedGold, setIsRequestedGold] = useState<boolean>(false);

  const tradeFairness = useMemo(() => {
    const offeredValue = offeredStarRating * offeredQuantity * (isOfferedGold ? 2 : 1);
    const requestedValue = requestedStarRating * requestedQuantity * (isRequestedGold ? 2 : 1);

    const ratio = offeredValue / (requestedValue || 1);

    let fairnessLabel = 'Fair 1:1 Trade';
    let isFair = true;

    if (ratio < 0.8) {
      fairnessLabel = 'Underpaying (Trade may be rejected)';
      isFair = false;
    } else if (ratio > 1.5) {
      fairnessLabel = 'Overpaying (High Star Premium)';
    }

    return {
      offeredValue,
      requestedValue,
      ratio: ratio.toFixed(2),
      fairnessLabel,
      isFair
    };
  }, [offeredStarRating, offeredQuantity, isOfferedGold, requestedStarRating, requestedQuantity, isRequestedGold]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-zinc-900 border border-red-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
              Anti-Scam Safe Exchange Engine
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <ArrowLeftRight className="w-6 h-6 text-red-400" />
              Monopoly GO Safe Exchange Trade Matcher
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Evaluate fair sticker trading ratios (5★ for 5★, 15★ for 5★, Golden Blitz) and follow safe exchange protocols.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Trade Value Ratio</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {tradeFairness.ratio}x
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trade Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offered Stickers */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-400" />
            1. What You Are Offering
          </h3>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Sticker Star Rating:</label>
            <select
              value={offeredStarRating}
              onChange={e => setOfferedStarRating(parseInt(e.target.value))}
              className="w-full bg-zinc-950 text-xs text-amber-300 font-semibold border border-zinc-800 rounded px-2.5 py-2 focus:border-red-500 outline-none"
            >
              {[1, 2, 3, 4, 5].map(s => (
                <option key={s} value={s}>{s}-Star Sticker ({'★'.repeat(s)})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Quantity:</label>
              <input
                type="number"
                min="1"
                max="5"
                value={offeredQuantity}
                onChange={e => setOfferedQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-red-500 outline-none"
              />
            </div>

            <label className="flex items-center justify-between bg-zinc-950/80 p-2.5 rounded border border-zinc-800 cursor-pointer self-end">
              <span className="text-xs text-amber-300 font-bold">Gold Blitz Sticker?</span>
              <input
                type="checkbox"
                checked={isOfferedGold}
                onChange={e => setIsOfferedGold(e.target.checked)}
                className="w-4 h-4 accent-red-500"
              />
            </label>
          </div>
        </div>

        {/* Requested Stickers */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            2. What You Want in Return
          </h3>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Sticker Star Rating:</label>
            <select
              value={requestedStarRating}
              onChange={e => setRequestedStarRating(parseInt(e.target.value))}
              className="w-full bg-zinc-950 text-xs text-amber-300 font-semibold border border-zinc-800 rounded px-2.5 py-2 focus:border-red-500 outline-none"
            >
              {[1, 2, 3, 4, 5].map(s => (
                <option key={s} value={s}>{s}-Star Sticker ({'★'.repeat(s)})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Quantity:</label>
              <input
                type="number"
                min="1"
                max="5"
                value={requestedQuantity}
                onChange={e => setRequestedQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-red-500 outline-none"
              />
            </div>

            <label className="flex items-center justify-between bg-zinc-950/80 p-2.5 rounded border border-zinc-800 cursor-pointer self-end">
              <span className="text-xs text-amber-300 font-bold">Gold Blitz Sticker?</span>
              <input
                type="checkbox"
                checked={isRequestedGold}
                onChange={e => setIsRequestedGold(e.target.checked)}
                className="w-4 h-4 accent-red-500"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Outcome Analysis & Safe Exchange Toggle Advice */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-red-400" />
          Trade Index & Anti-Scam Protocol
        </h3>

        <div className={`p-4 rounded-xl border ${
          tradeFairness.isFair
            ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
            : 'bg-amber-950/20 border-amber-500/40 text-amber-300'
        }`}>
          <div className="font-bold text-sm mb-1">{tradeFairness.fairnessLabel}</div>
          <p className="text-xs text-zinc-300">
            Offered value: {tradeFairness.offeredValue} pts vs Target value: {tradeFairness.requestedValue} pts.
          </p>
        </div>

        <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs text-zinc-300 space-y-1">
          <div className="font-bold text-red-300 uppercase tracking-wider text-[10px]">Always Enable Safe Exchange</div>
          <p>
            When completing sticker trades in Monopoly GO, toggle the <strong>"Make an exchange!"</strong> switch in-game before sending so both players must accept the proposal before stickers leave your inventory.
          </p>
        </div>
      </div>
    </div>
  );
}
