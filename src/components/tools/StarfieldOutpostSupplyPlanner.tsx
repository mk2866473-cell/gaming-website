/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  GitMerge, Compass, Zap, Box, AlertTriangle, 
  CheckCircle2, Clock, Sparkles, Database, Layers, 
  ArrowRight, RefreshCw, Award, Plus, Trash2, Fuel
} from 'lucide-react';

export interface SupplyLink {
  id: string;
  sourceName: string;
  sourceSystem: string;
  destName: string;
  destSystem: string;
  resourceName: string;
  resourceType: 'Solid' | 'Liquid' | 'Gas' | 'Manufactured';
  isInterSystem: boolean;
  transferRatePerMin: number; // mass per min
}

const DEFAULT_LINKS: SupplyLink[] = [
  {
    id: 'link-1',
    sourceName: 'Andraphon Mining Post (Narion)',
    sourceSystem: 'Narion',
    destName: 'Bessel III-b Central Hub',
    destSystem: 'Bessel',
    resourceName: 'Helium-3 (He-3 Fuel)',
    resourceType: 'Gas',
    isInterSystem: true,
    transferRatePerMin: 120
  },
  {
    id: 'link-2',
    sourceName: 'Bessel III-b South Outpost',
    sourceSystem: 'Bessel',
    destName: 'Bessel III-b Central Hub',
    destSystem: 'Bessel',
    resourceName: 'Iron (Fe) & Aluminum (Al)',
    resourceType: 'Solid',
    isInterSystem: false,
    transferRatePerMin: 250
  },
  {
    id: 'link-3',
    sourceName: 'Zamka Heavy Extraction (Alpha Centauri)',
    sourceSystem: 'Alpha Centauri',
    destName: 'Jemison Headquarters',
    destSystem: 'Alpha Centauri',
    resourceName: 'Copper (Cu) & Nickel (Ni)',
    resourceType: 'Solid',
    isInterSystem: false,
    transferRatePerMin: 180
  }
];

export const StarfieldOutpostSupplyPlanner: React.FC = () => {
  const [links, setLinks] = useState<SupplyLink[]>(DEFAULT_LINKS);
  const [he3ExtractorRatePerHour, setHe3ExtractorRatePerHour] = useState<number>(180); // He-3 yield from fuel depot
  const [outpostManagementRank, setOutpostManagementRank] = useState<number>(3); // Rank 0 to 4
  const [fabricatorProduct, setFabricatorProduct] = useState<string>('adaptive_frame'); // adaptive_frame, comm_relay, superconductor

  // Add Link
  const handleAddLink = () => {
    const newLink: SupplyLink = {
      id: `link-${Date.now()}`,
      sourceName: 'New Extraction Site',
      sourceSystem: 'Cheyenne',
      destName: 'Primary Manufacturing Base',
      destSystem: 'Alpha Centauri',
      resourceName: 'Titanium (Ti)',
      resourceType: 'Solid',
      isInterSystem: true,
      transferRatePerMin: 100
    };
    setLinks([...links, newLink]);
  };

  const handleRemoveLink = (id: string) => {
    if (links.length <= 1) return;
    setLinks(links.filter(l => l.id !== id));
  };

  const handleToggleInterSystem = (id: string) => {
    setLinks(links.map(l => l.id === id ? { ...l, isInterSystem: !l.isInterSystem } : l));
  };

  // Calculations
  const metrics = useMemo(() => {
    const interSystemCount = links.filter(l => l.isInterSystem).length;
    const standardLinkCount = links.length - interSystemCount;

    // Fuel Consumption: Each Inter-System Cargo Link consumes 5 He-3 per freight flight (~every 3 minutes)
    // 20 flights per hour * 5 He-3 = 100 He-3 per hour per active link
    const he3PerLinkPerHour = 75; // average realistic throughput
    const totalHe3NeededPerHour = interSystemCount * he3PerLinkPerHour;
    const isFuelDeficient = totalHe3NeededPerHour > he3ExtractorRatePerHour;
    const fuelSurplusDeficit = he3ExtractorRatePerHour - totalHe3NeededPerHour;

    // Power Budget
    // Standard Cargo Link = 5W power. Inter-System Cargo Link = 20W power.
    const totalPowerRequired = (standardLinkCount * 5) + (interSystemCount * 20);

    // Max links allowed by Outpost Management perk
    // Base = 3 links per outpost. Rank 1 = 4, Rank 2 = 5, Rank 3 = 6, Rank 4 = 8 links.
    const maxCargoLinksAllowed = outpostManagementRank === 0 ? 3 : outpostManagementRank === 1 ? 4 : outpostManagementRank === 2 ? 5 : outpostManagementRank === 3 ? 6 : 8;
    const isExceedingLinkCap = links.length > maxCargoLinksAllowed;

    // Total Freight Throughput
    const totalMassThroughputPerHour = links.reduce((acc, l) => acc + (l.transferRatePerMin * 60), 0);

    return {
      interSystemCount,
      standardLinkCount,
      totalHe3NeededPerHour,
      isFuelDeficient,
      fuelSurplusDeficit,
      totalPowerRequired,
      maxCargoLinksAllowed,
      isExceedingLinkCap,
      totalMassThroughputPerHour
    };
  }, [links, he3ExtractorRatePerHour, outpostManagementRank]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <GitMerge className="w-3.5 h-3.5" /> Inter-System Logistics
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                Cargo Link Network
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Outpost Resource Supply Line Planner
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Connect intra-system and inter-system Cargo Links. Calculate Helium-3 freight fuel budgets, power consumption, fabricator throughput, and prevent resource flow bottlenecks.
            </p>
          </div>

          {/* He-3 Fuel Status Card */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Helium-3 Fuel Balance</div>
              <div className={`text-2xl sm:text-3xl font-black flex items-baseline gap-1 ${metrics.isFuelDeficient ? 'text-red-400' : 'text-emerald-400'}`}>
                {metrics.fuelSurplusDeficit >= 0 ? `+${metrics.fuelSurplusDeficit}` : metrics.fuelSurplusDeficit} <span className="text-xs font-semibold text-slate-400">He-3 / hr</span>
              </div>
              <div className="text-[11px] text-slate-400">
                {metrics.isFuelDeficient ? 'DEFICIT: Links will halt!' : 'Logistics network fully fueled'}
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${metrics.isFuelDeficient ? 'bg-red-950/60 border-red-500/40 text-red-400' : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'}`}>
              <Fuel className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Supply Route Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" /> Active Cargo Supply Routes ({links.length}/{metrics.maxCargoLinksAllowed})
            </h3>
            <button
              onClick={handleAddLink}
              disabled={metrics.isExceedingLinkCap}
              className="px-3 py-1.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Cargo Link
            </button>
          </div>

          <div className="space-y-3">
            {links.map((link, idx) => (
              <div
                key={link.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      link.isInterSystem 
                        ? 'bg-purple-950 border border-purple-500/40 text-purple-300' 
                        : 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                    }`}>
                      {link.isInterSystem ? 'Inter-System (5 He-3 / Flight)' : 'Standard Intra-System (Free)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleInterSystem(link.id)}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-950 rounded border border-slate-800"
                    >
                      Toggle Type
                    </button>
                    <button
                      onClick={() => handleRemoveLink(link.id)}
                      disabled={links.length <= 1}
                      className="text-slate-500 hover:text-red-400 disabled:opacity-20 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Route Visualizer */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Source Outpost</div>
                    <div className="font-semibold text-white mt-0.5">{link.sourceName}</div>
                    <div className="text-[10px] text-cyan-400">System: {link.sourceSystem}</div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 self-center">
                    <div className="h-0.5 w-12 bg-slate-800" />
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                    <div className="h-0.5 w-12 bg-slate-800" />
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Destination Hub</div>
                    <div className="font-semibold text-white mt-0.5">{link.destName}</div>
                    <div className="text-[10px] text-purple-400">System: {link.destSystem}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="text-slate-300">
                    Cargo: <strong className="text-amber-400">{link.resourceName}</strong> ({link.resourceType})
                  </div>
                  <div className="text-slate-400">
                    Est. Throughput: <strong className="text-cyan-300">{link.transferRatePerMin} Mass/min</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {metrics.isExceedingLinkCap && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>You have exceeded your max allowed Cargo Links ({metrics.maxCargoLinksAllowed}). Increase your Outpost Management skill rank!</span>
            </div>
          )}
        </div>

        {/* Right Column: Fuel & Logistics Analytics */}
        <div className="lg:col-span-5 space-y-4">
          {/* Outpost Management Skill & Extraction Sliders */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Fuel Depot & Outpost Management
            </h3>

            <div>
              <div className="text-xs text-slate-400 mb-1 flex justify-between">
                <span>He-3 Extraction Rate (Total Network Yield)</span>
                <span className="font-bold text-amber-400">{he3ExtractorRatePerHour} He-3/hr</span>
              </div>
              <input
                type="range"
                min="0"
                max="400"
                step="10"
                value={he3ExtractorRatePerHour}
                onChange={(e) => setHe3ExtractorRatePerHour(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-2 rounded cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-300 font-medium">Outpost Management Skill Rank:</span>
                <span className="text-cyan-400 font-bold">Rank {outpostManagementRank}</span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-center">
                {[0, 1, 2, 3, 4].map(rank => (
                  <button
                    key={rank}
                    onClick={() => setOutpostManagementRank(rank)}
                    className={`py-1.5 rounded text-xs font-bold transition-colors ${
                      outpostManagementRank === rank
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    R{rank}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Allows up to {metrics.maxCargoLinksAllowed} active Cargo Links per primary outpost.
              </div>
            </div>
          </div>

          {/* Network Performance Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Total He-3 Demand</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{metrics.totalHe3NeededPerHour}</div>
              <div className="text-[10px] text-slate-500">He-3 consumed / hr</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Cargo Power Grid</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">{metrics.totalPowerRequired}W</div>
              <div className="text-[10px] text-slate-500">Links Power Draw</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center col-span-2">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Network Mass Flow</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{metrics.totalMassThroughputPerHour.toLocaleString()}</div>
              <div className="text-[10px] text-slate-500">Mass transported across all links per hour</div>
            </div>
          </div>

          {/* Recommended Galaxy Outpost Hubs */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs">
            <div className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Best Outpost Locations in Starfield
            </div>

            <div className="space-y-2 text-[11px] text-slate-300">
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
                <strong className="text-cyan-400">Bessel III-b (Bessel System):</strong> The #1 outpost in the galaxy. Land on the biome border between Mountain, Desert, and Hills to extract <strong className="text-white">Iron, Aluminum, Nickel, and Cobalt</strong> from a single outpost! Also features an insane 1:57 local-to-UT hour time dilation ratio.
              </div>

              <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
                <strong className="text-purple-400">Andraphon (Narion System):</strong> Premier starter outpost providing Iron, Aluminum, and Helium-3 to power your initial inter-system shipping routes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StarfieldOutpostSupplyPlanner;
