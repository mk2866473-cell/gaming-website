/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Boxes, Sparkles, Target, Calculator, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, AlertTriangle, Shield,
  ArrowRight, Award, Zap, Compass, RefreshCw
} from 'lucide-react';

interface AmpPreset {
  id: string;
  name: string;
  targetItem: string;
  baseDropRate: number; // percentage e.g. 6% or 10% or 20%
  stabilizerDropRate: number; // e.g. 10% or 16% or 32%
  source: 'Outpost' | 'Dungeon (Infiltration)';
  openMethod: 'Void Fusion Reactor' | 'Void Intercept (Colossus)';
  shardsRequired: {
    monomer: number;
    polymer: number;
    inorganic: number;
    organic: number;
  };
}

const AMP_PRESETS: AmpPreset[] = [
  {
    id: 'amp-082',
    name: 'Amorphous Material Pattern 082',
    targetItem: 'Ultimate Bunny Code (3% / 6%)',
    baseDropRate: 6,
    stabilizerDropRate: 10,
    source: 'Outpost',
    openMethod: 'Void Fusion Reactor',
    shardsRequired: { monomer: 36, polymer: 9, inorganic: 0, organic: 0 }
  },
  {
    id: 'amp-073',
    name: 'Amorphous Material Pattern 073',
    targetItem: 'Ultimate Lepic Spiral Catalyst (10%)',
    baseDropRate: 10,
    stabilizerDropRate: 16,
    source: 'Outpost',
    openMethod: 'Void Fusion Reactor',
    shardsRequired: { monomer: 0, polymer: 12, inorganic: 34, organic: 0 }
  },
  {
    id: 'amp-099',
    name: 'Amorphous Material Pattern 099',
    targetItem: 'Enduring Legacy Blueprint (10%)',
    baseDropRate: 10,
    stabilizerDropRate: 16,
    source: 'Dungeon (Infiltration)',
    openMethod: 'Void Intercept (Colossus)',
    shardsRequired: { monomer: 0, polymer: 0, inorganic: 0, organic: 0 }
  },
  {
    id: 'amp-059',
    name: 'Amorphous Material Pattern 059',
    targetItem: 'Energy Activator Blueprint (6%)',
    baseDropRate: 6,
    stabilizerDropRate: 10,
    source: 'Dungeon (Infiltration)',
    openMethod: 'Void Intercept (Colossus)',
    shardsRequired: { monomer: 0, polymer: 0, inorganic: 0, organic: 0 }
  },
  {
    id: 'amp-113',
    name: 'Amorphous Material Pattern 113',
    targetItem: 'Ultimate Gley Enhanced Cells (6%)',
    baseDropRate: 6,
    stabilizerDropRate: 10,
    source: 'Outpost',
    openMethod: 'Void Fusion Reactor',
    shardsRequired: { monomer: 14, polymer: 0, inorganic: 0, organic: 37 }
  }
];

export default function TfdAmorphousTracker() {
  const [selectedAmpId, setSelectedAmpId] = useState<string>('amp-082');
  const [customDropRate, setCustomDropRate] = useState<number>(6);
  const [useShapeStabilizer, setUseShapeStabilizer] = useState<boolean>(false);
  const [useSharenInfiltration, setUseSharenInfiltration] = useState<boolean>(true); // Outpost bonus AMP
  const [patternsFarmed, setPatternsFarmed] = useState<number>(10);

  const activeAmp = useMemo(() => {
    return AMP_PRESETS.find(a => a.id === selectedAmpId) || AMP_PRESETS[0];
  }, [selectedAmpId]);

  // Calculations
  const stats = useMemo(() => {
    const singleOpenProbability = (useShapeStabilizer ? activeAmp.stabilizerDropRate : activeAmp.baseDropRate) / 100;
    
    // Binomial Probability of getting at least 1 success in N opens:
    // P = 1 - (1 - p)^N
    const successProbability = (1 - Math.pow(1 - singleOpenProbability, patternsFarmed)) * 100;

    // Runs needed for 50%, 90%, 99% confidence
    const runsFor50 = Math.ceil(Math.log(1 - 0.50) / Math.log(1 - singleOpenProbability));
    const runsFor90 = Math.ceil(Math.log(1 - 0.90) / Math.log(1 - singleOpenProbability));
    const runsFor99 = Math.ceil(Math.log(1 - 0.99) / Math.log(1 - singleOpenProbability));

    // Total Void Shards needed
    const totalMonomer = activeAmp.shardsRequired.monomer * patternsFarmed;
    const totalPolymer = activeAmp.shardsRequired.polymer * patternsFarmed;
    const totalInorganic = activeAmp.shardsRequired.inorganic * patternsFarmed;
    const totalOrganic = activeAmp.shardsRequired.organic * patternsFarmed;

    // Void Fragment mission runs (each gives ~15-20 primary shards)
    const avgShardPerRun = 18;
    const maxShardNeeded = Math.max(totalMonomer, totalPolymer, totalInorganic, totalOrganic);
    const fragmentRunsNeeded = Math.ceil(maxShardNeeded / avgShardPerRun);

    return {
      effectiveDropRate: (singleOpenProbability * 100).toFixed(1),
      successProbability: successProbability.toFixed(1),
      runsFor50,
      runsFor90,
      runsFor99,
      totalMonomer,
      totalPolymer,
      totalInorganic,
      totalOrganic,
      fragmentRunsNeeded
    };
  }, [activeAmp, useShapeStabilizer, patternsFarmed]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/70 p-5 sm:p-6 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <Boxes className="w-4 h-4 text-indigo-300" />
              <span>THE FIRST DESCENDANT</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-mono">AMORPHOUS & VOID SHARD CALCULATOR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Amorphous Material Drop & Void Shard Tracker
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Calculate exact binomial drop probabilities for Ultimate Descendant parts, Shape Stabilizer rate boosts, and Monomer/Polymer Void Shard farming requirements.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 px-4 py-3 rounded-xl shadow-inner shrink-0">
            <Target className="w-6 h-6 text-indigo-400" />
            <div>
              <span className="text-[11px] text-slate-400 block">Chance with {patternsFarmed} Patterns</span>
              <span className="text-2xl font-black text-indigo-300 font-mono">{stats.successProbability}%</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Single Opening Rate</span>
            <span className="text-lg font-bold font-mono text-cyan-400">{stats.effectiveDropRate}%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">50% Coin-Flip Target</span>
            <span className="text-lg font-bold font-mono text-amber-400">{stats.runsFor50} Patterns</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">90% Confidence Target</span>
            <span className="text-lg font-bold font-mono text-purple-400">{stats.runsFor90} Patterns</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">99% Near-Guaranteed</span>
            <span className="text-lg font-bold font-mono text-emerald-400">{stats.runsFor99} Patterns</span>
          </div>
        </div>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Boxes className="w-5 h-5 text-indigo-400" />
              <span>Amorphous Pattern & Target Selection</span>
            </h2>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Select Amorphous Pattern Preset</label>
              <select
                value={selectedAmpId}
                onChange={(e) => setSelectedAmpId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-indigo-500"
              >
                {AMP_PRESETS.map(a => (
                  <option key={a.id} value={a.id}>{a.name} → {a.targetItem}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Patterns Opened / Farmed: {patternsFarmed}</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={patternsFarmed}
                  onChange={(e) => setPatternsFarmed(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Open Location</label>
                <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium truncate">
                  {activeAmp.openMethod}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-sm font-bold text-white">Use Shape Stabilizer</span>
                  <span className="text-xs text-slate-400 block">Boosts rare drop rate from {activeAmp.baseDropRate}% to {activeAmp.stabilizerDropRate}%</span>
                </div>
                <input
                  type="checkbox"
                  checked={useShapeStabilizer}
                  onChange={(e) => setUseShapeStabilizer(e.target.checked)}
                  className="w-5 h-5 accent-indigo-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-sm font-bold text-white">Sharen Infiltration Bonus</span>
                  <span className="text-xs text-slate-400 block">Disables outpost terminals stealthily for 5% to 25% extra bonus pattern drop</span>
                </div>
                <input
                  type="checkbox"
                  checked={useSharenInfiltration}
                  onChange={(e) => setUseSharenInfiltration(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Shard Requirements Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-slate-900 to-indigo-950/40 shadow-xl space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>Void Shard Farming Requirements ({patternsFarmed} Opens)</span>
            </h2>

            {activeAmp.openMethod === 'Void Fusion Reactor' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Monomer Shards</span>
                    <span className="text-base font-bold text-cyan-400">{stats.totalMonomer.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Polymer Shards</span>
                    <span className="text-base font-bold text-purple-400">{stats.totalPolymer.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Inorganic Shards</span>
                    <span className="text-base font-bold text-amber-400">{stats.totalInorganic.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Organic Shards</span>
                    <span className="text-base font-bold text-emerald-400">{stats.totalOrganic.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/90 border border-indigo-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Estimated Void Fragment Missions</span>
                    <span className="text-xl font-bold font-mono text-white">~{stats.fragmentRunsNeeded} Fragment Runs</span>
                  </div>
                  <span className="text-xs text-indigo-400 font-mono bg-indigo-950/80 px-2 py-1 rounded border border-indigo-700/50">
                    ~18 Shards / Run
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No Void Shards Required!</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  This Amorphous Material is opened directly by defeating its corresponding Void Intercept Colossus boss. Queue for the intercept battle and activate the Reconstructed Device upon boss defeat.
                </p>
              </div>
            )}

            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300 font-bold">Pity Protection Rule: </strong>
              The First Descendant has no bad-luck pity counter on Amorphous Materials. At a 6% drop rate, there is still a ~10% chance you won't pull the item in 38 runs. Use Shape Stabilizers whenever available!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
