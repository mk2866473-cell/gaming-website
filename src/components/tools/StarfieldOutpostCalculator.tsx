/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Cpu, 
  Clock, 
  Box, 
  Layers, 
  CheckCircle2, 
  RotateCcw, 
  Copy, 
  Sliders, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Zap,
  Info,
  ChevronRight,
  Database
} from 'lucide-react';
import { 
  MANUFACTURED_ITEMS, 
  RAW_ELEMENTS, 
  EXTRACTOR_TIERS, 
  calculateOutpostProduction, 
  RecipeBreakdown 
} from '../../data/starfieldData';

export const StarfieldOutpostCalculator: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<string>('comm_relay');
  const [targetQuantity, setTargetQuantity] = useState<number>(100);
  const [extractorTierId, setExtractorTierId] = useState<string>('standard');
  const [outpostSkillLevel, setOutpostSkillLevel] = useState<number>(0); // 0 to 4 (0%, 20%, 40%, 60%, 80%)
  const [copied, setCopied] = useState(false);

  const perkBonus = outpostSkillLevel * 0.2; // 0% to 80%

  const breakdown: RecipeBreakdown | null = calculateOutpostProduction(
    selectedItemId,
    targetQuantity,
    extractorTierId,
    perkBonus
  );

  const handleCopy = () => {
    if (!breakdown) return;
    const text = [
      `🚀 STARFIELD OUTPOST PRODUCTION MANIFEST`,
      `• Target Item: ${breakdown.targetItem.name} x${breakdown.targetQuantity}`,
      `• Total Mass: ${breakdown.totalMass} Mass | Total Value: ${breakdown.totalValue} Credits`,
      `• Extraction Time Needed: ${breakdown.extractionMinutes} UT Mins (${Math.round(breakdown.extractionMinutes / 60 * 10) / 10} UT Hours)`,
      `• Required Raw Elements:`,
      ...Object.entries(breakdown.rawElementTotals).map(([sym, qty]) => `  - ${RAW_ELEMENTS[sym]?.name || sym} (${sym}): ${qty} units`),
      `• Storage Containers Needed: ${breakdown.containersNeeded} Solid Storage Units`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatHours = (mins: number) => {
    if (mins < 60) return `${mins} UT Mins`;
    const hrs = (mins / 60).toFixed(1);
    return `${hrs} UT Hours (${mins} mins)`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Constellation NASA-Punk Tech Header */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950 border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-cyan-500/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-950 border border-cyan-500/50 rounded-xl text-cyan-400 shadow-lg shadow-cyan-950">
              <Compass className="w-8 h-8 animate-spin-slow" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                STARFIELD CONSTELLATION OUTPOST PROTOCOL
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
                Outpost Resource Production Calculator
              </h1>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition font-mono flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 shrink-0"
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Manifest!' : 'Copy Production Manifest'}
          </button>
        </div>

        {/* Dynamic Summary Cards Banner */}
        {breakdown && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Production</span>
              <span className="text-xl font-black text-white font-mono">{breakdown.targetItem.name}</span>
              <span className="text-xs text-cyan-400 font-bold block">x{breakdown.targetQuantity} Units</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Extraction Time</span>
              <span className="text-xl font-black text-amber-400 font-mono">{formatHours(breakdown.extractionMinutes)}</span>
              <span className="text-xs text-slate-400 block">Based on bottleneck element</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Mass & Value</span>
              <span className="text-xl font-black text-emerald-400 font-mono">{breakdown.totalMass} Mass</span>
              <span className="text-xs text-emerald-300 font-bold block">{breakdown.totalValue.toLocaleString()} Credits</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Storage Containers</span>
              <span className="text-xl font-black text-purple-400 font-mono">{breakdown.containersNeeded} Solid Containers</span>
              <span className="text-xs text-slate-400 block">75 Mass Capacity Each</span>
            </div>
          </div>
        )}
      </div>

      {/* Primary Selection Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Item Selection & Extractor Settings */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          {/* Target Manufactured Item Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Select Manufactured Target Component:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.values(MANUFACTURED_ITEMS).map(item => {
                const isActive = item.id === selectedItemId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-950 border-cyan-500 text-white shadow-md ring-1 ring-cyan-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Cpu className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span className="font-bold text-xs">{item.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 border border-slate-800 text-slate-400 shrink-0 uppercase tracking-tighter">
                      Tier {item.tier}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Quantity & Extractor Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Target Crafting Quantity:
              </label>
              <input
                type="number"
                min={1}
                max={100000}
                value={targetQuantity}
                onChange={e => setTargetQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white font-bold text-base focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Resource Extractor Tier:
              </label>
              <select
                value={extractorTierId}
                onChange={e => setExtractorTierId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
              >
                {EXTRACTOR_TIERS.map(tier => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} ({tier.baseRatePerMin} units/min)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Outpost Management Skill Level */}
          <div className="pt-4 border-t border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Outpost Management Skill Level (+20% Output per Rank):
            </label>
            <div className="grid grid-cols-5 gap-2 font-mono text-xs">
              {[0, 1, 2, 3, 4].map(rank => (
                <button
                  key={rank}
                  onClick={() => setOutpostSkillLevel(rank)}
                  className={`py-2 rounded-lg border text-center transition ${
                    outpostSkillLevel === rank
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Rank {rank} (+{rank * 20}%)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Raw Elements & Component Tree Breakdown */}
        {breakdown && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Raw Elements Required */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-3 border-b border-slate-800 pb-2">
                <Box className="w-4 h-4 text-cyan-400" /> Total Raw Elements Required
              </h3>
              <div className="space-y-2">
                {Object.entries(breakdown.rawElementTotals).map(([sym, qty]) => {
                  const elem = RAW_ELEMENTS[sym];
                  return (
                    <div key={sym} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 font-mono font-bold text-cyan-300 flex items-center justify-center text-xs">
                          {sym}
                        </span>
                        <div>
                          <span className="font-bold text-white block">{elem?.name || sym}</span>
                          <span className="text-[10px] text-slate-400 uppercase">{elem?.type} mineral</span>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-amber-400">{qty} Units</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Intermediate Components Tree */}
            {breakdown.intermediateComponents.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5 mb-3 border-b border-slate-800 pb-2">
                  <Layers className="w-4 h-4 text-purple-400" /> Intermediate Crafting Steps
                </h3>
                <div className="space-y-2">
                  {breakdown.intermediateComponents.map(comp => (
                    <div key={comp.itemId} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                      <span className="font-bold text-slate-200">{comp.name}</span>
                      <span className="font-mono font-bold text-purple-300">x{comp.quantity} Needed</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
