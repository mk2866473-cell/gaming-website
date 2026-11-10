/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Users, Shield, Sparkles, Plus, Trash2, Award, Flame, Zap, Droplet, Box, Hammer
} from 'lucide-react';
import { PALWORLD_PALS, PalInfo } from '../../data/palworldData';

export default function PalworldBaseTeamCalculator() {
  const [baseCapacity, setBaseCapacity] = useState<number>(15); // Base Level 15 = 15 Pals, Level 20 = 20 Pals
  const [selectedPalIds, setSelectedPalIds] = useState<string[]>([
    'anubis', 'anubis', 'anubis',
    'jormuntide', 'jormuntide',
    'jormuntide-ignis', 'jormuntide-ignis',
    'lyleen', 'lyleen',
    'astegon', 'astegon', 'astegon',
    'grizzbolt',
    'frostallion',
    'helzephyr'
  ]);

  const teamPals = useMemo(() => {
    return selectedPalIds.map((id, index) => {
      const pal = PALWORLD_PALS.find(p => p.id === id) || PALWORLD_PALS[0];
      return { ...pal, uniqueKey: `${id}-${index}` };
    });
  }, [selectedPalIds]);

  // Aggregate suitability coverage
  const suitabilitiesTotal = useMemo(() => {
    const totals: Record<string, { maxLevel: number; workerCount: number }> = {
      mining: { maxLevel: 0, workerCount: 0 },
      handiwork: { maxLevel: 0, workerCount: 0 },
      kindling: { maxLevel: 0, workerCount: 0 },
      watering: { maxLevel: 0, workerCount: 0 },
      planting: { maxLevel: 0, workerCount: 0 },
      electricity: { maxLevel: 0, workerCount: 0 },
      transporting: { maxLevel: 0, workerCount: 0 },
      cooling: { maxLevel: 0, workerCount: 0 },
      lumbering: { maxLevel: 0, workerCount: 0 },
      medicine: { maxLevel: 0, workerCount: 0 }
    };

    teamPals.forEach(p => {
      Object.entries(p.suitabilities).forEach(([key, lvl]) => {
        if (totals[key] && lvl) {
          totals[key].workerCount++;
          if (lvl > totals[key].maxLevel) {
            totals[key].maxLevel = lvl;
          }
        }
      });
    });

    return totals;
  }, [teamPals]);

  const addPalToTeam = (id: string) => {
    if (selectedPalIds.length < baseCapacity) {
      setSelectedPalIds([...selectedPalIds, id]);
    }
  };

  const removePalFromTeam = (index: number) => {
    setSelectedPalIds(selectedPalIds.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-zinc-900 to-indigo-950/40 border border-blue-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400 mb-2">
              <Users className="w-3.5 h-3.5" />
              Base Automation & Production Roster
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Base Team & Worker Suitability Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Optimize your 15 to 20 Pal base roster to ensure max-tier coverage across Mining Lv.4, Handiwork Lv.4, Kindling Lv.4, and Watering Lv.4.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Current Team & Add Pals */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Base Working Roster ({selectedPalIds.length} / {baseCapacity} Assigned)
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Base Level Limit:</span>
                {[15, 20].map(cap => (
                  <button
                    key={cap}
                    onClick={() => setBaseCapacity(cap)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      baseCapacity === cap ? 'bg-blue-600 text-white' : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    {cap} Pals
                  </button>
                ))}
              </div>
            </div>

            {/* Team Pal Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
              {teamPals.map((pal, idx) => (
                <div key={pal.uniqueKey} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{pal.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      {Object.entries(pal.suitabilities).map(([k, v]) => `${k.slice(0, 3)} ${v}`).join(' • ')}
                    </div>
                  </div>
                  <button
                    onClick={() => removePalFromTeam(idx)}
                    className="p-1 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Add Top Base Pals */}
            <div className="pt-3 border-t border-zinc-800 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Quick Add S-Tier Base Workers:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'anubis', name: '+ Anubis (Handiwork 4 / Mine 3)' },
                  { id: 'jormuntide', name: '+ Jormuntide (Watering 4)' },
                  { id: 'jormuntide-ignis', name: '+ Jormuntide Ignis (Kindling 4)' },
                  { id: 'astegon', name: '+ Astegon (Mining 4)' },
                  { id: 'lyleen', name: '+ Lyleen (Planting 4 / Hand 3)' },
                  { id: 'grizzbolt', name: '+ Grizzbolt (Electricity 3)' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => addPalToTeam(p.id)}
                    disabled={selectedPalIds.length >= baseCapacity}
                    className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-blue-500 text-xs text-zinc-300 disabled:opacity-40 transition-colors"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Suitability Coverage Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Base Skill Coverage Matrix
            </h3>

            {/* Suitability Badges */}
            <div className="space-y-2.5">
              {Object.entries(suitabilitiesTotal).map(([skill, data]) => (
                <div key={skill} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                  <div className="capitalize font-semibold text-zinc-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {skill}
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-zinc-500">{data.workerCount} Pals</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      data.maxLevel >= 4 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      data.maxLevel >= 3 ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      data.maxLevel >= 1 ? 'bg-amber-500/20 text-amber-300' :
                      'bg-rose-500/20 text-rose-300'
                    }`}>
                      {data.maxLevel > 0 ? `Max Lv. ${data.maxLevel}` : 'Missing (Lv 0)'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs text-zinc-300">
              <span className="font-bold text-blue-400">Base Tip:</span> Jormuntide Ignis provides Kindling 4, speeding up cake baking and metal smelting by over 800% compared to Kindling 2 pals.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
