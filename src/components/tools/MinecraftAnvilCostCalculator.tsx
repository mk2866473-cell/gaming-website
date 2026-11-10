/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Wrench, AlertTriangle, Check, RefreshCw, Shield, Sword, 
  BookOpen, Sparkles, ArrowRight, HelpCircle
} from 'lucide-react';

export default function MinecraftAnvilCostCalculator() {
  const [leftPWPCount, setLeftPWPCount] = useState<number>(0);
  const [rightPWPCount, setRightPWPCount] = useState<number>(0);
  const [repairUnits, setRepairUnits] = useState<number>(0); // 0-4 diamonds/iron (each repairs 25%)
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [enchantmentTransferCost, setEnchantmentTransferCost] = useState<number>(4);
  const [gameEdition, setGameEdition] = useState<'java' | 'bedrock'>('java');

  const pwpValues = [0, 1, 3, 7, 15, 31, 63, 127];

  const calculation = useMemo(() => {
    const leftPWP = pwpValues[Math.min(leftPWPCount, pwpValues.length - 1)];
    const rightPWP = pwpValues[Math.min(rightPWPCount, pwpValues.length - 1)];

    const renameCost = isRenaming ? 1 : 0;
    const rawRepairCost = repairUnits; // 1 level per 25% durability unit

    const totalLevelCost = leftPWP + rightPWP + rawRepairCost + enchantmentTransferCost + renameCost;
    const isTooExpensive = totalLevelCost >= 40;

    // Next PWP uses for resulting item
    const resultingUses = Math.max(leftPWPCount, rightPWPCount) + 1;
    const resultingPWP = pwpValues[Math.min(resultingUses, pwpValues.length - 1)];

    return {
      leftPWP,
      rightPWP,
      rawRepairCost,
      renameCost,
      totalLevelCost,
      isTooExpensive,
      resultingUses,
      resultingPWP
    };
  }, [leftPWPCount, rightPWPCount, repairUnits, isRenaming, enchantmentTransferCost]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Top Banner Warning or Status */}
      {calculation.isTooExpensive ? (
        <div className="p-4 bg-rose-950/80 border border-rose-500/60 rounded-xl flex items-center gap-3 text-rose-200">
          <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0 animate-pulse" />
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wide">
              "Too Expensive!" – Blocked in Survival Mode (Cost: {calculation.totalLevelCost} Levels ≥ 40)
            </h4>
            <p className="text-xs text-rose-300 mt-0.5">
              In survival Minecraft, any anvil action that costs 40 or more levels of experience cannot be performed. Reduce prior work penalties or combine books in balanced pairs.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-3 text-emerald-300">
          <div className="flex items-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Valid Survival Anvil Operation
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Total anvil requirement is within the 39-level survival threshold.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-zinc-400">Total Anvil Cost:</span>
            <span className="text-2xl font-extrabold font-mono text-emerald-400 block">
              {calculation.totalLevelCost} Levels
            </span>
          </div>
        </div>
      )}

      {/* Anvil Interactive Interface Mockup */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap justify-between items-center pb-3 border-b border-zinc-800 gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-emerald-400" />
            Anvil Slot Inputs & Penalties
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Edition:</span>
            <div className="flex bg-zinc-900 rounded-lg p-0.5 border border-zinc-700 text-xs">
              <button
                onClick={() => setGameEdition('java')}
                className={`px-2.5 py-1 rounded-md font-semibold ${gameEdition === 'java' ? 'bg-emerald-500/20 text-emerald-300' : 'text-zinc-400'}`}
              >
                Java
              </button>
              <button
                onClick={() => setGameEdition('bedrock')}
                className={`px-2.5 py-1 rounded-md font-semibold ${gameEdition === 'bedrock' ? 'bg-emerald-500/20 text-emerald-300' : 'text-zinc-400'}`}
              >
                Bedrock
              </button>
            </div>
          </div>
        </div>

        {/* 2 Anvil Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Item (Left Slot) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                Slot 1: Target Item (Left)
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">
                PWP: {calculation.leftPWP} lvl
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 block">
                Previous Anvil Uses (Target Item): <strong className="text-white font-mono">{leftPWPCount}</strong>
              </label>
              <input
                type="range"
                min="0"
                max="6"
                value={leftPWPCount}
                onChange={(e) => setLeftPWPCount(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>0 uses (0 lvl)</span>
                <span>1 (1 lvl)</span>
                <span>2 (3 lvl)</span>
                <span>3 (7 lvl)</span>
                <span>4 (15 lvl)</span>
                <span>5 (31 lvl)</span>
                <span>6 (63 lvl)</span>
              </div>
            </div>

            {/* Renaming Checkbox */}
            <label className="flex items-center gap-2 pt-2 border-t border-zinc-800 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isRenaming}
                onChange={(e) => setIsRenaming(e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-500 bg-zinc-950 border-zinc-700 cursor-pointer"
              />
              <span>Rename Item (+1 Level surcharge)</span>
            </label>
          </div>

          {/* Secondary Sacrifice (Right Slot) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
                Slot 2: Sacrifice Material / Book (Right)
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">
                PWP: {calculation.rightPWP} lvl
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 block">
                Previous Uses on Sacrificed Item/Book: <strong className="text-white font-mono">{rightPWPCount}</strong>
              </label>
              <input
                type="range"
                min="0"
                max="6"
                value={rightPWPCount}
                onChange={(e) => setRightPWPCount(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>0 uses</span>
                <span>1 (1 lvl)</span>
                <span>2 (3 lvl)</span>
                <span>3 (7 lvl)</span>
                <span>4 (15 lvl)</span>
                <span>5 (31 lvl)</span>
                <span>6 (63 lvl)</span>
              </div>
            </div>

            {/* Repair with Raw Material */}
            <div className="pt-2 border-t border-zinc-800 space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-300">
                <span>Repair with Raw Diamonds/Ingots:</span>
                <strong className="font-mono text-cyan-300">{repairUnits} units (+{repairUnits * 25}%)</strong>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={repairUnits}
                onChange={(e) => setRepairUnits(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Enchantment Transfer Cost Slider */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-xs text-zinc-300">
            <span>Base Enchantment Transfer Weight: <strong className="text-amber-400 font-mono">+{enchantmentTransferCost} Levels</strong></span>
            <span className="text-zinc-500 text-[11px]">(Calculated from tier of incoming enchantments)</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={enchantmentTransferCost}
            onChange={(e) => setEnchantmentTransferCost(parseInt(e.target.value, 10))}
            className="w-full accent-amber-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Cost Breakdown Math Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Formula Cost Breakdown
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Left Item Penalty</span>
            <span className="text-base font-bold font-mono text-emerald-400">{calculation.leftPWP} Levels</span>
          </div>
          <div className="bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Right Item Penalty</span>
            <span className="text-base font-bold font-mono text-cyan-400">{calculation.rightPWP} Levels</span>
          </div>
          <div className="bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Repair & Rename</span>
            <span className="text-base font-bold font-mono text-amber-400">{calculation.rawRepairCost + calculation.renameCost} Levels</span>
          </div>
          <div className="bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Resulting New Penalty</span>
            <span className="text-base font-bold font-mono text-purple-300">{calculation.resultingPWP} Levels ({calculation.resultingUses} uses)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
