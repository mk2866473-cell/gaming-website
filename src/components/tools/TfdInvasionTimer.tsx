/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, Shield, Target, AlertTriangle, Sparkles, CheckCircle2, 
  RotateCcw, Play, Pause, Zap, Award, Flame, Eye, Compass
} from 'lucide-react';

interface InvasionDungeon {
  id: string;
  name: string;
  region: string;
  mechanic: 'Drone Symbol Decoder' | 'Arche Laser Plate Defusal' | 'Tumor Biocollector Deposit';
  mechanicGuide: string[];
  goldTargetSeconds: number; // e.g. 240 seconds (4 mins)
  rewardMaterial: string;
}

const INVASION_DUNGEONS: InvasionDungeon[] = [
  {
    id: 'magister-lab',
    name: 'Magister Lab Invasion',
    region: 'Kingston',
    mechanic: 'Drone Symbol Decoder',
    mechanicGuide: [
      'Locate 3 pillar drones in room.',
      'Read top glyph symbol (Circle, Triangle, Cross, Diamond).',
      'Stand in matching drone field to discharge shield disruptor.',
      'Fire heavy weapon at invader shield during 10s vulnerability.'
    ],
    goldTargetSeconds: 210, // 3:30
    rewardMaterial: 'Hailey Enhanced Cells (x12 on Gold)'
  },
  {
    id: 'the-asylum',
    name: 'The Asylum Invasion',
    region: 'Agna Desert',
    mechanic: 'Arche Laser Plate Defusal',
    mechanicGuide: [
      'Match wall color lights (Red, Green, Blue, White).',
      'Step on floor plates in exact wall sequence order.',
      'Defuse bomb node before thermal overload countdown.',
      'Burst boss before second shield barrier deployment.'
    ],
    goldTargetSeconds: 270, // 4:30
    rewardMaterial: 'Hailey Spiral Catalyst (x12 on Gold)'
  },
  {
    id: 'forgotten-basin',
    name: 'Forgotten Basin Invasion',
    region: 'Sterile Land',
    mechanic: 'Tumor Biocollector Deposit',
    mechanicGuide: [
      'Destroy mutating pathogen tumors with firearm fire.',
      'Collect 30 Arche samples from defeated Vulgus drops.',
      'Deposit in analyzer central funnel before timer drains.',
      'Use AOE weapons (Thunder Cage / Greg) for fast bio collection.'
    ],
    goldTargetSeconds: 240, // 4:00
    rewardMaterial: 'Hailey Stabilizer (x12 on Gold)'
  },
  {
    id: 'caligo-ossuary',
    name: 'Caligo Ossuary Invasion',
    region: 'Hagios',
    mechanic: 'Drone Symbol Decoder',
    mechanicGuide: [
      'Inspect outer pedestals for glyph code alignment.',
      'Avoid lightning strikes while inside drone shielding sphere.',
      'Coordinate shield-breaker fire during break phase.',
      'Gold clear awards maximum Inversion Reinforcement XP.'
    ],
    goldTargetSeconds: 250, // 4:10
    rewardMaterial: 'Hailey Data Chip (x12 on Gold)'
  }
];

interface BossMechanic {
  id: string;
  name: string;
  frenzyIntervalSeconds: number;
  grappleStallSeconds: number;
  frenzyMechanic: string;
  proTip: string;
}

const BOSS_MECHANICS: BossMechanic[] = [
  {
    id: 'gluttony',
    name: 'Gluttony (Void Intercept)',
    frenzyIntervalSeconds: 150,
    grappleStallSeconds: 10,
    frenzyMechanic: 'Coolant orbs must be blasted into purple sensors before wipe cascade.',
    proTip: 'Use Valby Clean Water or chill rounds to herd cooled orbs directly into Gluttony to prevent 1-shot team wipe!'
  },
  {
    id: 'molten-fortress',
    name: 'Molten Fortress (Void Intercept)',
    frenzyIntervalSeconds: 120,
    grappleStallSeconds: 9,
    frenzyMechanic: 'Rods emerge around arena. All team members must shoot arrows to turn all arrows pointing right simultaneously.',
    proTip: 'Assign 1 player per 2 pillars. Shoot meteor projectiles before they reset pillar arrow orientations.'
  },
  {
    id: 'death-stalker',
    name: 'Death Stalker (Void Intercept)',
    frenzyIntervalSeconds: 140,
    grappleStallSeconds: 10,
    frenzyMechanic: 'Darkness debuff blinds squad. Collect luminescent essence from floating spheres to restore vision and break shield.',
    proTip: 'Keep bunny or speed descendant rotating orbs to prevent complete darkness blindness.'
  },
  {
    id: 'pyromaniac',
    name: 'Pyromaniac (Void Intercept)',
    frenzyIntervalSeconds: 110,
    grappleStallSeconds: 8,
    frenzyMechanic: 'Chains ring of fire that tracks nearest player; weak spot canister on back opens.',
    proTip: 'Pyromaniac has 90% firearm resistance! Rely 100% on high Chill skill damage (Viessa or Hailey).'
  }
];

export default function TfdInvasionTimer() {
  // Tab state
  const [activeTab, setActiveTab] = useState<'invasion' | 'colossus'>('invasion');

  // Daily UTC Reset Timer
  const [timeUntilReset, setTimeUntilReset] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateReset = () => {
      const now = new Date();
      const resetTime = new Date();
      resetTime.setUTCHours(7, 0, 0, 0); // 07:00 UTC daily reset
      if (now.getTime() > resetTime.getTime()) {
        resetTime.setUTCDate(resetTime.getUTCDate() + 1);
      }
      const diff = resetTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeUntilReset({ hours, minutes, seconds });
    };

    updateReset();
    const interval = setInterval(updateReset, 1000);
    return () => clearInterval(interval);
  }, []);

  // Invasion Stopwatch State
  const [selectedDungeonIndex, setSelectedDungeonIndex] = useState<number>(0);
  const [dungeonSeconds, setDungeonSeconds] = useState<number>(0);
  const [isDungeonRunning, setIsDungeonRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDungeonRunning) {
      interval = setInterval(() => {
        setDungeonSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isDungeonRunning]);

  // Colossus Frenzy Timer State
  const [selectedBossIndex, setSelectedBossIndex] = useState<number>(0);
  const [bossCountdown, setBossCountdown] = useState<number>(BOSS_MECHANICS[0].frenzyIntervalSeconds);
  const [isBossRunning, setIsBossRunning] = useState<boolean>(false);
  const [isGrappleStallActive, setIsGrappleStallActive] = useState<boolean>(false);
  const [grappleStallSecondsLeft, setGrappleStallSecondsLeft] = useState<number>(10);

  const activeBoss = BOSS_MECHANICS[selectedBossIndex];

  // Reset Boss Timer on boss change
  const handleSelectBoss = (idx: number) => {
    setSelectedBossIndex(idx);
    setBossCountdown(BOSS_MECHANICS[idx].frenzyIntervalSeconds);
    setIsBossRunning(false);
    setIsGrappleStallActive(false);
    setGrappleStallSecondsLeft(BOSS_MECHANICS[idx].grappleStallSeconds);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBossRunning && bossCountdown > 0 && !isGrappleStallActive) {
      interval = setInterval(() => {
        setBossCountdown(prev => {
          if (prev <= 1) {
            setIsBossRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBossRunning, bossCountdown, isGrappleStallActive]);

  // Grapple Stall countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGrappleStallActive && grappleStallSecondsLeft > 0) {
      interval = setInterval(() => {
        setGrappleStallSecondsLeft(prev => {
          if (prev <= 1) {
            setIsGrappleStallActive(false);
            return activeBoss.grappleStallSeconds;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGrappleStallActive, grappleStallSecondsLeft, activeBoss]);

  const activeDungeon = INVASION_DUNGEONS[selectedDungeonIndex];

  const dungeonClearTier = useMemo(() => {
    if (dungeonSeconds <= activeDungeon.goldTargetSeconds) {
      return { tier: 'GOLD TIER', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/50' };
    } else if (dungeonSeconds <= activeDungeon.goldTargetSeconds + 90) {
      return { tier: 'SILVER TIER', color: 'text-slate-300', bg: 'bg-slate-500/20 border-slate-500/50' };
    }
    return { tier: 'BRONZE TIER', color: 'text-amber-700', bg: 'bg-amber-900/20 border-amber-800/50' };
  }, [dungeonSeconds, activeDungeon]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 shadow-2xl">
      {/* Header with Daily Reset Countdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <Clock className="w-4 h-4" />
            <span>The First Descendant • Mechanics & Timers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Daily Invasion & Void Boss Mechanics Timer
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
            Live interactive stopwatch for Daily Invasion Gold tier thresholds (Hailey parts), glyph defusal guides, and Colossus frenzy/grapple stall countdowns.
          </p>
        </div>

        {/* Global Reset Clock Badge */}
        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-3 sm:text-right shrink-0">
          <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center sm:justify-end gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Daily UTC Reset In
          </div>
          <div className="text-lg font-mono font-black text-white mt-0.5">
            {timeUntilReset.hours.toString().padStart(2, '0')}:
            {timeUntilReset.minutes.toString().padStart(2, '0')}:
            {timeUntilReset.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] text-zinc-400">Resets 07:00 UTC (12:00 AM PDT)</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab('invasion')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'invasion'
              ? 'bg-amber-500/20 border border-amber-500 text-amber-300 shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Award className="w-4 h-4" />
          Daily Invasion Gold Stopwatch
        </button>
        <button
          onClick={() => setActiveTab('colossus')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'colossus'
              ? 'bg-rose-500/20 border border-rose-500 text-rose-300 shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Target className="w-4 h-4" />
          Colossus Frenzy & Grapple Stall Timer
        </button>
      </div>

      {/* TAB 1: DAILY INVASION */}
      {activeTab === 'invasion' && (
        <div className="space-y-6">
          {/* Dungeon Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INVASION_DUNGEONS.map((d, idx) => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDungeonIndex(idx);
                  setDungeonSeconds(0);
                  setIsDungeonRunning(false);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedDungeonIndex === idx
                    ? 'bg-zinc-800 border-amber-500/80 shadow-lg'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="text-xs font-bold text-white truncate">{d.name}</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">{d.region}</div>
                <div className="text-[10px] text-amber-400/90 font-mono mt-1 font-semibold">
                  Gold: &lt; {formatTimer(d.goldTargetSeconds)}
                </div>
              </button>
            ))}
          </div>

          {/* Stopwatch & Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Big Stopwatch Display */}
            <div className="lg:col-span-2 bg-zinc-950/70 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Invasion Dungeon Run Time
              </div>
              <div className="text-6xl sm:text-7xl font-mono font-black text-white tracking-tight">
                {formatTimer(dungeonSeconds)}
              </div>

              {/* Status Tier Badge */}
              <div className={`px-4 py-1.5 rounded-full border text-xs font-black tracking-wider ${dungeonClearTier.bg} ${dungeonClearTier.color}`}>
                CURRENT ESTIMATE: {dungeonClearTier.tier}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsDungeonRunning(!isDungeonRunning)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                    isDungeonRunning
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isDungeonRunning ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause Run
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" /> Start Run
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsDungeonRunning(false);
                    setDungeonSeconds(0);
                  }}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/60 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="text-xs text-zinc-400 flex items-center gap-2 pt-2">
                <span>Gold Target: <strong className="text-amber-400">{formatTimer(activeDungeon.goldTargetSeconds)}</strong></span>
                <span>•</span>
                <span>Reward: <strong className="text-cyan-400">{activeDungeon.rewardMaterial}</strong></span>
              </div>
            </div>

            {/* Mechanics Walkthrough Guide */}
            <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Compass className="w-4 h-4" />
                <h3>Mechanic: {activeDungeon.mechanic}</h3>
              </div>
              <ul className="space-y-2.5">
                {activeDungeon.mechanicGuide.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[11px] text-amber-300 leading-relaxed">
                💡 <strong>Pro Tip:</strong> Completing Invasions on Gold yields maximum Hailey craft research components and 100% Inversion Reinforcement catalyst progress!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COLOSSUS FRENZY & GRAPPLE STALL */}
      {activeTab === 'colossus' && (
        <div className="space-y-6">
          {/* Boss Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BOSS_MECHANICS.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => handleSelectBoss(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedBossIndex === idx
                    ? 'bg-zinc-800 border-rose-500/80 shadow-lg'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="text-xs font-bold text-white truncate">{b.name}</div>
                <div className="text-[10px] text-rose-400 font-mono mt-1 font-semibold">
                  Frenzy: {b.frenzyIntervalSeconds}s
                </div>
              </button>
            ))}
          </div>

          {/* Frenzy Countdown & Grapple Stall Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colossus Frenzy Display */}
            <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 animate-pulse" />
                Colossus Rage / Frenzy Meter Countdown
              </div>
              <div className={`text-6xl sm:text-7xl font-mono font-black tracking-tight ${
                bossCountdown <= 20 ? 'text-rose-500 animate-pulse' : 'text-white'
              }`}>
                {formatTimer(bossCountdown)}
              </div>

              {bossCountdown === 0 && (
                <div className="px-3 py-1 rounded bg-rose-500/20 border border-rose-500 text-rose-300 text-xs font-bold animate-bounce">
                  ⚠️ ENRAGE ACTIVE! Execute wipe bypass mechanics immediately!
                </div>
              )}

              {/* Timer Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBossRunning(!isBossRunning)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                    isBossRunning
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  {isBossRunning ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause Boss Clock
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" /> Start Fight Clock
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsBossRunning(false);
                    setBossCountdown(activeBoss.frenzyIntervalSeconds);
                  }}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
                >
                  Reset Clock
                </button>
              </div>

              {/* Grapple Stall Button */}
              <div className="w-full pt-4 border-t border-zinc-800">
                <div className="text-xs text-zinc-400 mb-2">
                  When boss armor part turns Yellow/Flashing, grapple on and HOLD to stall enrage!
                </div>
                <button
                  onClick={() => {
                    setIsGrappleStallActive(true);
                    setGrappleStallSecondsLeft(activeBoss.grappleStallSeconds);
                  }}
                  disabled={isGrappleStallActive}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isGrappleStallActive
                      ? 'bg-yellow-500 text-zinc-950 font-black animate-pulse'
                      : 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/30'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  {isGrappleStallActive 
                    ? `HOLDING PART: ${grappleStallSecondsLeft}s LEFT (DON'T HIT BREAK!)`
                    : `TRIGGER GRAPPLE STALL (${activeBoss.grappleStallSeconds}s WINDOW)`}
                </button>
              </div>
            </div>

            {/* Boss Specific Mechanics & Pro Tips */}
            <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <h3>{activeBoss.name} Mechanics Guide</h3>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
                <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Frenzy Enrage Sequence:
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {activeBoss.frenzyMechanic}
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl space-y-1">
                <div className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
                  Enrage Prevention Strategy:
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {activeBoss.proTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
