/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Droplet, Flame, AlertTriangle, ShieldCheck, 
  HelpCircle, Sparkles, TrendingUp, RefreshCw, Clock, 
  Coins, Gauge, Layers, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function OnceHumanAcidFarmCalculator() {
  // Pollution zone
  const [pollutionZone, setPollutionZone] = useState<'high' | 'medium' | 'low'>('high');

  // Facilities
  const [pumpCount, setPumpCount] = useState<number>(8); // Water pumps (10W each)
  const [purifierCount, setPurifierCount] = useState<number>(4); // Osmosis / Water Purifiers (10W each)
  const [barrelCount, setBarrelCount] = useState<number>(8); // Brewing Barrels (10W each)

  // Power generators
  const [solarCount, setSolarCount] = useState<number>(6); // 20W each daytime
  const [deviantGenCount, setDeviantGenCount] = useState<number>(2); // 35W each constant
  const [biomassCount, setBiomassCount] = useState<number>(0); // 25W each

  // Memetic Specialization perks
  const [hasSulfurChemist, setHasSulfurChemist] = useState<boolean>(false);
  const [sulfurRunsPerDay, setSulfurRunsPerDay] = useState<number>(500); // 5 Sulfur + 50 EL -> 1 Acid
  const [hasBreweryMaster, setHasBreweryMaster] = useState<boolean>(true); // +30% faster fermentation
  const [hasSolarEfficiency, setHasSolarEfficiency] = useState<boolean>(false); // +10W per solar panel

  // Calculations
  const calculations = useMemo(() => {
    // 1. Power Grid
    const solarWattage = hasSolarEfficiency ? 30 : 20;
    const totalPowerGen = (solarCount * solarWattage) + (deviantGenCount * 35) + (biomassCount * 25);
    const pumpPowerReq = pumpCount * 10;
    const purifierPowerReq = purifierCount * 10;
    const barrelPowerReq = barrelCount * 10;
    const baseLightingReq = 15; // base territory load
    const totalPowerReq = pumpPowerReq + purifierPowerReq + barrelPowerReq + baseLightingReq;
    const powerSurplus = totalPowerGen - totalPowerReq;
    const isBrownout = powerSurplus < 0;

    // 2. Polluted Water Extraction Rate
    // In High Pollution, pumps draw ~75% Polluted Water, 25% Dirty Water
    // Each pump draws 1 unit every 5 minutes -> 12 units/hr
    const extractionRatePerPumpPerHour = 12;
    const totalWaterPerHour = pumpCount * extractionRatePerPumpPerHour;
    const pollutedWaterFraction = pollutionZone === 'high' ? 0.75 : pollutionZone === 'medium' ? 0.50 : 0.25;
    const pollutedWaterPerHour = totalWaterPerHour * pollutedWaterFraction;
    const dirtyWaterPerHour = totalWaterPerHour * (1 - pollutedWaterFraction);

    // 3. Water Purifier / Osmosis Processing
    // Each Purifier processes 1 Polluted Water into 0.5 Impure Acid and 0.5 Purified Water
    // 1 purifier processes 60 units/hr (1 per min)
    const purifierMaxProcessCapacityPerHour = purifierCount * 60;
    const actualPollutedWaterProcessedPerHour = Math.min(pollutedWaterPerHour, purifierMaxProcessCapacityPerHour);
    const impureAcidProducedPerHour = actualPollutedWaterProcessedPerHour * 0.5;
    const purifiedWaterProducedPerHour = actualPollutedWaterProcessedPerHour * 0.5;

    // 4. Brewing Barrel Fermentation
    // Standard recipe: 2 Impure Acid + 1 Purified Water -> 1 Pure Acid in 20 minutes (3 craft/hr per barrel)
    // With Brewery Master perk: +30% speed -> ~3.9 craft/hr per barrel
    const craftPerHourPerBarrel = hasBreweryMaster ? (3 * 1.3) : 3;
    const maxImpureAcidNeededPerBarrelPerHour = craftPerHourPerBarrel * 2;
    const maxBarrelImpureCapacityPerHour = barrelCount * maxImpureAcidNeededPerBarrelPerHour;

    const actualImpureAcidFermentedPerHour = Math.min(impureAcidProducedPerHour, maxBarrelImpureCapacityPerHour);
    const barrelAcidOutputPerHour = actualImpureAcidFermentedPerHour / 2;

    // 5. Sulfur Chemist bonus
    // Sulfur Chemist craft: 5 Sulfur + 50 EL = 1 Acid
    const sulfurAcidPerHour = hasSulfurChemist ? (sulfurRunsPerDay / 24) : 0;

    // 6. Totals
    const totalAcidPerHour = Math.round((barrelAcidOutputPerHour + sulfurAcidPerHour) * 10) / 10;
    const totalAcidPerDay = Math.round(totalAcidPerHour * 24);
    const totalAcidPerWeek = Math.round(totalAcidPerDay * 7);

    // Market value (1 Acid sells for ~90 Energy Links on player vending machines)
    const energyLinksDaily = totalAcidPerDay * 90;

    // Bottlenecks
    const bottlenecks: string[] = [];
    if (isBrownout) {
      bottlenecks.push(`Power deficit: Missing ${Math.abs(powerSurplus)}W! Facilities will shut down.`);
    }
    if (pollutedWaterPerHour > purifierMaxProcessCapacityPerHour) {
      bottlenecks.push(`Purifier bottleneck: Pumps produce ${Math.round(pollutedWaterPerHour)} Polluted Water/hr, but Purifiers can only process ${purifierMaxProcessCapacityPerHour}/hr. Add more Purifiers!`);
    }
    if (impureAcidProducedPerHour > maxBarrelImpureCapacityPerHour) {
      bottlenecks.push(`Brewing bottleneck: Purifiers output ${Math.round(impureAcidProducedPerHour)} Impure Acid/hr, but Barrels can only ferment ${Math.round(maxBarrelImpureCapacityPerHour)}/hr. Add more Brewing Barrels!`);
    }

    return {
      totalPowerGen,
      totalPowerReq,
      powerSurplus,
      isBrownout,
      pollutedWaterPerHour: Math.round(pollutedWaterPerHour),
      impureAcidProducedPerHour: Math.round(impureAcidProducedPerHour),
      barrelAcidOutputPerHour: Math.round(barrelAcidOutputPerHour * 10) / 10,
      sulfurAcidPerHour: Math.round(sulfurAcidPerHour * 10) / 10,
      totalAcidPerHour,
      totalAcidPerDay,
      totalAcidPerWeek,
      energyLinksDaily,
      bottlenecks
    };
  }, [
    pollutionZone, pumpCount, purifierCount, barrelCount,
    solarCount, deviantGenCount, biomassCount,
    hasSulfurChemist, sulfurRunsPerDay, hasBreweryMaster, hasSolarEfficiency
  ]);

  return (
    <div className="space-y-8">
      {/* Overview Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <Droplet className="w-4 h-4 text-emerald-400" />
              <span>Once Human Automation Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Base Power Grid & Acid Farming Calculator
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Model automated passive Acid extraction in polluted zones. Calculate water pumps, reverse osmosis purifiers, fermentation barrels, power wattage balance, and Sulfur Chemist synthesis.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 bg-slate-950/80 border border-emerald-500/40 rounded-xl p-4">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-2xl font-black text-emerald-400">+{calculations.totalAcidPerDay}</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Pure Acid / 24h</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-amber-400">~{calculations.energyLinksDaily.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">EL Market Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottleneck Warning Banner */}
      {calculations.bottlenecks.length > 0 && (
        <div className="bg-rose-950/80 border border-rose-500/50 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Farm Optimization Warnings:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-rose-200">
            {calculations.bottlenecks.map((warn, i) => (
              <li key={i}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Grid: Inputs & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Pollution Zone */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span>1. Territory Location & Pollution Zone</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'high', label: 'High Pollution', desc: '75% Polluted Water (Blackfell Oil / 73 Source)', color: 'border-emerald-500 bg-emerald-950/50 text-emerald-300' },
                { id: 'medium', label: 'Medium Pollution', desc: '50% Polluted Water (Iron River / Greywater)', color: 'border-amber-500 bg-amber-950/50 text-amber-300' },
                { id: 'low', label: 'Low Pollution', desc: '25% Polluted Water (Dayton / Broken Delta)', color: 'border-slate-500 bg-slate-950/50 text-slate-300' }
              ].map(zone => (
                <button
                  key={zone.id}
                  onClick={() => setPollutionZone(zone.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    pollutionZone === zone.id 
                      ? `${zone.color} shadow-lg` 
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{zone.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{zone.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Production Facility Counts */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>2. Water Extraction & Refining Facilities</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Pumps */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Water Pumps</span>
                  <span className="text-cyan-400 font-bold">{pumpCount} units</span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={24}
                  value={pumpCount}
                  onChange={(e) => setPumpCount(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="text-[11px] text-slate-500">10W each • {pumpCount * 10}W total</div>
              </div>

              {/* Purifiers */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Water Purifiers</span>
                  <span className="text-cyan-400 font-bold">{purifierCount} units</span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={16}
                  value={purifierCount}
                  onChange={(e) => setPurifierCount(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="text-[11px] text-slate-500">10W each • {purifierCount * 10}W total</div>
              </div>

              {/* Barrels */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Brewing Barrels</span>
                  <span className="text-emerald-400 font-bold">{barrelCount} units</span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={24}
                  value={barrelCount}
                  onChange={(e) => setBarrelCount(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <div className="text-[11px] text-slate-500">10W each • {barrelCount * 10}W total</div>
              </div>
            </div>
          </div>

          {/* Section 3: Power Grid Generators */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>3. Base Power Generators</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Solar Panels</span>
                  <span className="text-amber-400 font-bold">{solarCount} ({solarCount * (hasSolarEfficiency ? 30 : 20)}W)</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={12}
                  value={solarCount}
                  onChange={(e) => setSolarCount(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <div className="text-[11px] text-slate-500">{hasSolarEfficiency ? '30W (Perk)' : '20W base'} per panel</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Deviant Generators</span>
                  <span className="text-purple-400 font-bold">{deviantGenCount} ({deviantGenCount * 35}W)</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={8}
                  value={deviantGenCount}
                  onChange={(e) => setDeviantGenCount(Number(e.target.value))}
                  className="w-full accent-purple-400"
                />
                <div className="text-[11px] text-slate-500">35W constant power</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Biomass Generators</span>
                  <span className="text-emerald-400 font-bold">{biomassCount} ({biomassCount * 25}W)</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={8}
                  value={biomassCount}
                  onChange={(e) => setBiomassCount(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <div className="text-[11px] text-slate-500">25W requires Biofuel</div>
              </div>
            </div>
          </div>

          {/* Section 4: Memetic Specializations */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>4. Memetic Specialization Perks</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-purple-500/50">
                <input 
                  type="checkbox"
                  checked={hasBreweryMaster}
                  onChange={(e) => setHasBreweryMaster(e.target.checked)}
                  className="rounded text-purple-500 focus:ring-purple-500"
                />
                <div className="text-xs">
                  <div className="font-bold text-white">Acid Brewery Master</div>
                  <div className="text-slate-400">+30% fermentation speed</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-purple-500/50">
                <input 
                  type="checkbox"
                  checked={hasSolarEfficiency}
                  onChange={(e) => setHasSolarEfficiency(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-500"
                />
                <div className="text-xs">
                  <div className="font-bold text-white">Solar Panel Boost</div>
                  <div className="text-slate-400">+10W power per panel</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-purple-500/50">
                <input 
                  type="checkbox"
                  checked={hasSulfurChemist}
                  onChange={(e) => setHasSulfurChemist(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-500"
                />
                <div className="text-xs">
                  <div className="font-bold text-white">Sulfur Chemist</div>
                  <div className="text-slate-400">Craft Acid from Sulfur + EL</div>
                </div>
              </label>
            </div>

            {hasSulfurChemist && (
              <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl space-y-2 mt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-purple-300 font-semibold">Sulfur Chemist Crafts per 24h:</span>
                  <span className="text-amber-400 font-bold">{sulfurRunsPerDay} craft actions</span>
                </div>
                <input 
                  type="range"
                  min={50}
                  max={2000}
                  step={50}
                  value={sulfurRunsPerDay}
                  onChange={(e) => setSulfurRunsPerDay(Number(e.target.value))}
                  className="w-full accent-purple-400"
                />
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Consumes: {sulfurRunsPerDay * 5} Sulfur</span>
                  <span>Cost: {(sulfurRunsPerDay * 50).toLocaleString()} EL</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Output Analytics Card */}
        <div className="space-y-6">
          {/* Power Status */}
          <div className={`p-5 rounded-2xl border shadow-xl ${
            calculations.isBrownout 
              ? 'bg-rose-950/80 border-rose-500/60' 
              : 'bg-slate-900/90 border-emerald-500/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Base Power Grid</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                calculations.isBrownout ? 'bg-rose-600 text-white' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {calculations.isBrownout ? 'OVERLOAD / BROWNOUT' : 'GRID STABLE'}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Power Generated:</span>
                <span className="text-amber-400 font-bold font-mono">{calculations.totalPowerGen}W</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Power Required:</span>
                <span className="text-cyan-400 font-bold font-mono">{calculations.totalPowerReq}W</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
                <span className="text-slate-300">Net Balance:</span>
                <span className={`font-mono ${calculations.powerSurplus >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {calculations.powerSurplus >= 0 ? `+${calculations.powerSurplus}W Surplus` : `${calculations.powerSurplus}W Deficit`}
                </span>
              </div>
            </div>
          </div>

          {/* Production Flow Breakdown */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Production Yield Matrix</h4>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Polluted Water:</span>
                <span className="text-purple-300 font-mono font-semibold">{calculations.pollutedWaterPerHour} / hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Impure Acid:</span>
                <span className="text-amber-300 font-mono font-semibold">{calculations.impureAcidProducedPerHour} / hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Barrel Acid:</span>
                <span className="text-emerald-400 font-mono font-semibold">{calculations.barrelAcidOutputPerHour} / hr</span>
              </div>
              {hasSulfurChemist && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Sulfur Chemist Acid:</span>
                  <span className="text-emerald-300 font-mono font-semibold">+{calculations.sulfurAcidPerHour} / hr</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black text-emerald-400 font-mono">{calculations.totalAcidPerHour}</div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Pure Acid / Hour</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black text-emerald-300 font-mono">{calculations.totalAcidPerWeek.toLocaleString()}</div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Estimated Acid / Week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
