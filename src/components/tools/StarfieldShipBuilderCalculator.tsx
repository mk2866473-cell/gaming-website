/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Rocket, Shield, Zap, Box, Compass, Sparkles, 
  RotateCcw, Info, CheckCircle2, AlertTriangle, 
  Layers, Trophy, Gauge, DollarSign, Award, ChevronRight
} from 'lucide-react';

interface ShipPreset {
  name: string;
  classType: 'A' | 'B' | 'C';
  role: string;
  credits: number;
  cockpit: string;
  reactor: string;
  engineCount: number;
  engineTier: string;
  cargoTons: number;
  shieldedCargoTons: number;
  shieldTier: string;
  gravDriveTier: string;
  weaponPower: number;
  landingGears: number;
  notes: string;
}

const PRESET_SHIPS: ShipPreset[] = [
  {
    name: 'Frontier Mk II (Explorer)',
    classType: 'A',
    role: 'Starter Upgraded Exploration',
    credits: 84000,
    cockpit: 'Viking CP-100',
    reactor: '360T Stellarator (20 Power)',
    engineCount: 2,
    engineTier: 'White Dwarf 3015 (High Speed)',
    cargoTons: 850,
    shieldedCargoTons: 0,
    shieldTier: 'Deflector SG-30 (450 Shield)',
    gravDriveTier: 'Helios 200 (22 LY)',
    weaponPower: 18,
    landingGears: 2,
    notes: 'Fast 150 top speed Class A vessel with balanced exploration range.'
  },
  {
    name: 'Razorleaf (Mantis Bounty Hunter)',
    classType: 'A',
    role: 'Combat Interceptor & Smuggler',
    credits: 145000,
    cockpit: 'Magellan C1X',
    reactor: 'Spheromak DC102 (27 Power)',
    engineCount: 3,
    engineTier: 'White Dwarf 3015 (180 Speed with boost)',
    cargoTons: 720,
    shieldedCargoTons: 160,
    shieldTier: 'Vanguard Bulwark (1010 Shield)',
    gravDriveTier: 'R-4000 Alpha (28 LY)',
    weaponPower: 26,
    landingGears: 3,
    notes: 'Legendary Mantle identity panics Spacers; equipped with shielded cargo for contraband.'
  },
  {
    name: 'Star Eagle (Freestar Ranger Flagship)',
    classType: 'A',
    role: 'Heavy Patrol Fighter',
    credits: 220000,
    cockpit: 'Armstrong 20',
    reactor: '104DS Mag Inertial (29 Power)',
    engineCount: 4,
    engineTier: 'SA-4330 Engines',
    cargoTons: 2500,
    shieldedCargoTons: 0,
    shieldTier: 'Vanguard Bulwark (1010 Shield)',
    gravDriveTier: 'Aurora 13G (30 LY)',
    weaponPower: 30,
    landingGears: 4,
    notes: 'The strongest Class A reward ship in the settled systems with high base cargo.'
  },
  {
    name: 'Kepler R (Class C Leviathan)',
    classType: 'C',
    role: 'Deep Space Battleship & Hauler',
    credits: 460000,
    cockpit: 'Kon-Tiki B-600 Bridge',
    reactor: 'Pinch 8Z (40 Power)',
    engineCount: 4,
    engineTier: 'Supernova 2200 Heavy Thrust',
    cargoTons: 5200,
    shieldedCargoTons: 320,
    shieldTier: 'Assurance SG-1800 (1600 Shield)',
    gravDriveTier: 'J-52 Gamma (30 LY)',
    weaponPower: 36,
    landingGears: 6,
    notes: 'Endgame heavy dreadnought with 40 reactor power and massive 5,000+ cargo hold.'
  }
];

export const StarfieldShipBuilderCalculator: React.FC = () => {
  // Ship Class & Reactor
  const [shipClass, setShipClass] = useState<'A' | 'B' | 'C'>('B');
  const [reactorPower, setReactorPower] = useState<number>(34); // 15 to 40
  const [hasAneutronicFusion, setHasAneutronicFusion] = useState<boolean>(true); // +5 power perk

  // Structural & Hull
  const [habCount, setHabCount] = useState<number>(4);
  const [cockpitCrewCap, setCockpitCrewCap] = useState<number>(4);

  // Engines & Mobility
  const [engineCount, setEngineCount] = useState<number>(3);
  const [engineTier, setEngineTier] = useState<number>(2); // 1 = Standard, 2 = Advanced, 3 = Heavy
  const [pilotSkillRank, setPilotSkillRank] = useState<number>(4); // Rank 1-4

  // Cargo & Contraband
  const [cargoHoldCount, setCargoHoldCount] = useState<number>(3); // base 350-1000 per hold
  const [cargoCapacityPerHold, setCargoCapacityPerHold] = useState<number>(750);
  const [shieldedCargoCount, setShieldedCargoCount] = useState<number>(1);
  const [payloadsPerkRank, setPayloadsPerkRank] = useState<number>(2); // 0%, 10%, 20%, 30%, 50%

  // Shields & Grav Drive
  const [shieldGenTier, setShieldGenTier] = useState<number>(3); // 1: 450, 2: 800, 3: 1100, 4: 1600
  const [gravThrust, setGravThrust] = useState<number>(36); // 15 to 50
  const [landingGears, setLandingGears] = useState<number>(4);

  // Weapons Power Budget (W0, W1, W2)
  const [w0Power, setW0Power] = useState<number>(12);
  const [w1Power, setW1Power] = useState<number>(8);
  const [w2Power, setW2Power] = useState<number>(6);

  // Apply Preset
  const handleApplyPreset = (p: ShipPreset) => {
    setShipClass(p.classType);
    if (p.classType === 'A') {
      setReactorPower(27);
      setCargoCapacityPerHold(400);
      setLandingGears(p.landingGears);
    } else if (p.classType === 'B') {
      setReactorPower(34);
      setCargoCapacityPerHold(700);
      setLandingGears(p.landingGears);
    } else {
      setReactorPower(40);
      setCargoCapacityPerHold(1200);
      setLandingGears(p.landingGears);
    }
    setEngineCount(p.engineCount);
    setShieldedCargoCount(p.shieldedCargoTons > 0 ? 1 : 0);
  };

  // Calculations
  const metrics = useMemo(() => {
    // Total Power
    const aneutronicBonus = hasAneutronicFusion ? 5 : 0;
    const totalPower = reactorPower + aneutronicBonus;
    const allocatedPower = w0Power + w1Power + w2Power + (engineCount * 3) + 6; // +6 for shields

    // Mass Breakdown
    const cockpitMass = 40 + (cockpitCrewCap * 10);
    const habMass = habCount * 45;
    const reactorMass = reactorPower * 3;
    const engineUnitMass = engineTier === 1 ? 65 : engineTier === 2 ? 95 : 135;
    const totalEngineMass = engineCount * engineUnitMass;
    const rawCargoMass = (cargoHoldCount * 120) + (shieldedCargoCount * 140);
    const shieldMass = shieldGenTier * 35;
    const gravDriveMass = gravThrust * 2.2;
    const weaponsMass = (w0Power + w1Power + w2Power) * 4;
    const gearsMass = landingGears * 25;

    const totalMass = Math.round(
      cockpitMass + habMass + reactorMass + totalEngineMass + 
      rawCargoMass + shieldMass + gravDriveMass + weaponsMass + gearsMass
    );

    // Cargo Calculation with Payloads skill
    const payloadMultipliers = [1.0, 1.1, 1.2, 1.3, 1.5];
    const payloadMult = payloadMultipliers[payloadsPerkRank] || 1.0;
    const baseCargoTotal = (cargoHoldCount * cargoCapacityPerHold) + (shieldedCargoCount * 160);
    const effectiveCargo = Math.round(baseCargoTotal * payloadMult);
    const effectiveShieldedCargo = shieldedCargoCount * 160;

    // Mobility Score & Top Speed
    const engineManeuverThrust = engineCount * (engineTier === 1 ? 3800 : engineTier === 2 ? 5200 : 7400);
    const rawMobility = Math.round((engineManeuverThrust * 100) / Math.max(1, totalMass * 1.85));
    const mobilityScore = Math.min(100, Math.max(0, rawMobility));

    const topSpeed = shipClass === 'A' ? 150 : shipClass === 'B' ? 140 : 130;

    // Grav Jump Range (LY)
    const rawJump = (gravThrust * 750) / Math.max(1, totalMass);
    const jumpRangeLY = Math.min(30, Math.max(12, Math.round(rawJump * 10) / 10));

    // Shield Health
    const baseShieldHealth = shieldGenTier === 1 ? 450 : shieldGenTier === 2 ? 800 : shieldGenTier === 3 ? 1150 : 1600;

    // Estimated Credit Cost
    const baseCreditCost = Math.round(
      (reactorPower * 4200) + 
      (totalEngineMass * 380) + 
      (effectiveCargo * 35) + 
      (baseShieldHealth * 45) + 
      (gravThrust * 2200) + 
      (weaponsMass * 1200) + 
      45000
    );

    // Validation checks
    const gearThrustReq = Math.ceil(totalMass / 400);
    const hasGearError = landingGears < gearThrustReq;
    const hasPowerError = allocatedPower > totalPower;
    const pilotSkillReq = shipClass === 'A' ? 1 : shipClass === 'B' ? 3 : 4;
    const hasPilotError = pilotSkillRank < pilotSkillReq;

    return {
      totalPower,
      allocatedPower,
      totalMass,
      effectiveCargo,
      effectiveShieldedCargo,
      mobilityScore,
      topSpeed,
      jumpRangeLY,
      baseShieldHealth,
      baseCreditCost,
      gearThrustReq,
      hasGearError,
      hasPowerError,
      hasPilotError,
      pilotSkillReq
    };
  }, [
    shipClass, reactorPower, hasAneutronicFusion, habCount, cockpitCrewCap,
    engineCount, engineTier, pilotSkillRank, cargoHoldCount, cargoCapacityPerHold,
    shieldedCargoCount, payloadsPerkRank, shieldGenTier, gravThrust, landingGears,
    w0Power, w1Power, w2Power
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" /> Shipbuilder CAD Engine
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                Class {shipClass} Vessel
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Ship Modules Cost & Cargo Weight Calculator
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Design and optimize your starship. Calculate total mass, credits budget, 100-point mobility rating, 30 LY grav jump distance, standard vs shielded cargo holds, and ship check error warnings.
            </p>
          </div>

          {/* Quick Ship Cost Badge */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Estimated Credits</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-baseline gap-1">
                {metrics.baseCreditCost.toLocaleString()} <span className="text-xs font-semibold text-slate-400">CR</span>
              </div>
              <div className="text-[11px] text-cyan-400 font-medium">
                Mass: {metrics.totalMass} Tons • Jump: {metrics.jumpRangeLY} LY
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="pt-2 border-t border-slate-800">
          <div className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Iconic Ship Presets:
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_SHIPS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700/60 transition-colors"
                title={p.notes}
              >
                {p.name} ({p.role})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Shipbuilder Module Configuration */}
        <div className="lg:col-span-6 space-y-4">
          {/* Class & Reactor */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Reactor & Ship Class Tier
              </h3>
              <div className="flex gap-1">
                {(['A', 'B', 'C'] as const).map(cls => (
                  <button
                    key={cls}
                    onClick={() => setShipClass(cls)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      shipClass === cls
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Reactor Base Power</span>
                  <span className="font-bold text-amber-400">{reactorPower} Pwr</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="40"
                  value={reactorPower}
                  onChange={(e) => setReactorPower(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={hasAneutronicFusion}
                    onChange={(e) => setHasAneutronicFusion(e.target.checked)}
                    className="rounded text-cyan-500 focus:ring-0"
                  />
                  <div>
                    <span className="text-slate-300 font-medium">Aneutronic Fusion Perk</span>
                    <div className="text-[10px] text-cyan-400">+5 Free Reactor Power</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Piloting Skill Check */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="text-slate-400">
                Your Piloting Skill Rank: <strong className="text-white">Rank {pilotSkillRank}</strong>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(rank => (
                  <button
                    key={rank}
                    onClick={() => setPilotSkillRank(rank)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      pilotSkillRank === rank ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}
                  >
                    R{rank}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Engines & Landing Gear */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-400" /> Propulsion, Engines & Landing Gear
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Engine Count</span>
                  <span className="font-bold text-emerald-400">{engineCount} Units</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={engineCount}
                  onChange={(e) => setEngineCount(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Landing Gears</span>
                  <span className={`font-bold ${metrics.hasGearError ? 'text-red-400' : 'text-emerald-400'}`}>
                    {landingGears} (Need {metrics.gearThrustReq})
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={landingGears}
                  onChange={(e) => setLandingGears(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <div className="text-xs text-slate-400 mb-1">Engine Thrust Model</div>
                <select
                  value={engineTier}
                  onChange={(e) => setEngineTier(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
                >
                  <option value={1}>Tier 1: High Velocity (Lightweight)</option>
                  <option value={2}>Tier 2: Advanced Maneuver (Standard)</option>
                  <option value={3}>Tier 3: Supernova Heavy Hauler</option>
                </select>
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Grav Drive Thrust</span>
                  <span className="font-bold text-purple-400">{gravThrust} Pwr</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="50"
                  value={gravThrust}
                  onChange={(e) => setGravThrust(parseInt(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Cargo Holds & Smuggling */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Box className="w-4 h-4 text-amber-400" /> Cargo Holds & Payloads Skill
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Cargo Hold Modules</span>
                  <span className="font-bold text-amber-400">{cargoHoldCount} Holds</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={cargoHoldCount}
                  onChange={(e) => setCargoHoldCount(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Shielded Cargo (Contraband)</span>
                  <span className="font-bold text-cyan-400">{shieldedCargoCount * 160} Tons</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={shieldedCargoCount}
                  onChange={(e) => setShieldedCargoCount(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Payloads Skill Perk Rank:</span>
              <div className="flex gap-1">
                {['0%', '+10%', '+20%', '+30%', '+50%'].map((txt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPayloadsPerkRank(idx)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      payloadsPerkRank === idx ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}
                  >
                    {txt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ship Metrics, Validation & Flight Stats */}
        <div className="lg:col-span-6 space-y-4">
          {/* Key Flight Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Mobility Score</div>
              <div className={`text-2xl font-black mt-1 ${metrics.mobilityScore >= 80 ? 'text-emerald-400' : metrics.mobilityScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                {metrics.mobilityScore}
              </div>
              <div className="text-[10px] text-slate-500">Target 80-100</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Top Speed</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">{metrics.topSpeed}</div>
              <div className="text-[10px] text-slate-500">Meters/sec</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Max Grav Jump</div>
              <div className="text-2xl font-black text-purple-400 mt-1">{metrics.jumpRangeLY}</div>
              <div className="text-[10px] text-slate-500">Light Years (LY)</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Cargo</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{metrics.effectiveCargo}</div>
              <div className="text-[10px] text-slate-500">Mass Tons</div>
            </div>
          </div>

          {/* Power Balance Meter */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Reactor Power Utilization</span>
              <span className={`font-black ${metrics.hasPowerError ? 'text-red-400' : 'text-cyan-400'}`}>
                {metrics.allocatedPower} / {metrics.totalPower} Power Pips
              </span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden flex border border-slate-800">
              <div 
                className={`h-full ${metrics.hasPowerError ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-500'}`}
                style={{ width: `${Math.min(100, (metrics.allocatedPower / metrics.totalPower) * 100)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>Weapons: {w0Power + w1Power + w2Power} Pwr</span>
              <span>Engines: {engineCount * 3} Pwr</span>
              <span>Shields: 6 Pwr</span>
            </div>
          </div>

          {/* Ship Validation Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> Shipbuilder Pre-Flight Inspection
            </h3>

            <div className="space-y-1.5 text-xs">
              <div className={`p-2 rounded-lg flex items-center justify-between border ${
                metrics.hasGearError ? 'bg-red-950/40 border-red-500/40 text-red-300' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <span className="flex items-center gap-1.5">
                  {metrics.hasGearError ? <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  Landing Gear Thrust Check:
                </span>
                <span className="font-semibold">
                  {metrics.hasGearError ? `FAIL: Add ${metrics.gearThrustReq - landingGears} more landing gears` : 'PASSED'}
                </span>
              </div>

              <div className={`p-2 rounded-lg flex items-center justify-between border ${
                metrics.hasPilotError ? 'bg-amber-950/40 border-amber-500/40 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <span className="flex items-center gap-1.5">
                  {metrics.hasPilotError ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  Piloting License Check:
                </span>
                <span className="font-semibold">
                  {metrics.hasPilotError ? `Need Piloting Rank ${metrics.pilotSkillReq} for Class ${shipClass}` : 'PILOT CERTIFIED'}
                </span>
              </div>

              <div className={`p-2 rounded-lg flex items-center justify-between border ${
                metrics.effectiveShieldedCargo > 0 ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <span className="flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-cyan-400" /> Contraband Smuggling Capacity:
                </span>
                <span className="font-semibold">
                  {metrics.effectiveShieldedCargo > 0 ? `${metrics.effectiveShieldedCargo} Tons Shielded Hold` : 'No Shielded Holds'}
                </span>
              </div>
            </div>
          </div>

          {/* Builder Pro-Tips */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
            <div className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Starfield Shipbuilder Meta Rules
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
              <li><strong className="text-slate-200">White Dwarf 3015 Engines:</strong> The only engines in the game that offer a base top speed of 180 m/s (compared to standard 150 m/s).</li>
              <li><strong className="text-slate-200">Max Grav Jump:</strong> 30 Light Years is the hard maximum travel distance per jump; any thrust beyond 30 LY is redundant.</li>
              <li><strong className="text-slate-200">Particle Beam Weapons:</strong> Deal equal damage to both Shields and Hull, allowing you to run a single weapon type with 100% efficiency.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StarfieldShipBuilderCalculator;
