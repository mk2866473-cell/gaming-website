/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Timer, Play, CheckCircle2, RotateCcw, MapPin, Sparkles, Info } from 'lucide-react';

export const SPAWN_INTERVAL_WEEKDAY_SEC = 60 * 60;
export const SPAWN_INTERVAL_WEEKEND_SEC = 45 * 60;
export const DESPAWN_DURATION_SEC = 20 * 60;
export const FRUIT_NOTIFIER_ROBUX = 2700;

export const SEA_SPAWN_POINTS = [
  { id: 'first', name: 'First Sea', spawnPoints: 25 },
  { id: 'second', name: 'Second Sea', spawnPoints: 28 },
  { id: 'third', name: 'Third Sea', spawnPoints: 34 }
] as const;

function formatClock(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function BloxFruitsFruitSpawnTimer() {
  const [isWeekend, setIsWeekend] = useState<boolean>(() => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  });
  const [selectedSea, setSelectedSea] = useState<'first' | 'second' | 'third'>('third');
  const [spawnStartedAt, setSpawnStartedAt] = useState<number | null>(null);
  const [fruitActive, setFruitActive] = useState<boolean>(false);
  const [pickedUpAt, setPickedUpAt] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  const spawnIntervalSec = isWeekend
    ? SPAWN_INTERVAL_WEEKEND_SEC
    : SPAWN_INTERVAL_WEEKDAY_SEC;

  useEffect(() => {
    if (spawnStartedAt === null && !fruitActive) return;
    const id = window.setInterval(() => {
      setNowMs(Date.now());
    }, 250);
    return () => window.clearInterval(id);
  }, [spawnStartedAt, fruitActive]);

  const { nextSpawnSeconds, despawnSeconds, isDespawned } = useMemo(() => {
    if (spawnStartedAt === null) {
      return {
        nextSpawnSeconds: spawnIntervalSec,
        despawnSeconds: DESPAWN_DURATION_SEC,
        isDespawned: false
      };
    }

    const elapsedSec = Math.max(0, (nowMs - spawnStartedAt) / 1000);
    const remainingSpawn = Math.max(0, spawnIntervalSec - elapsedSec);
    const remainingDespawn = Math.max(0, DESPAWN_DURATION_SEC - elapsedSec);

    return {
      nextSpawnSeconds: remainingSpawn,
      despawnSeconds: fruitActive ? remainingDespawn : 0,
      isDespawned: fruitActive && remainingDespawn <= 0
    };
  }, [spawnStartedAt, nowMs, spawnIntervalSec, fruitActive]);

  const handleFruitSpawned = () => {
    const now = Date.now();
    setNowMs(now);
    setSpawnStartedAt(now);
    setFruitActive(true);
    setPickedUpAt(null);
  };

  const handlePickedUp = () => {
    const now = Date.now();
    setNowMs(now);
    if (spawnStartedAt === null) {
      setSpawnStartedAt(now);
    }
    setFruitActive(false);
    setPickedUpAt(now);
  };

  const handleReset = () => {
    setSpawnStartedAt(null);
    setFruitActive(false);
    setPickedUpAt(null);
  };

  const currentSeaInfo =
    SEA_SPAWN_POINTS.find((s) => s.id === selectedSea) || SEA_SPAWN_POINTS[2];

  const spawnProgressPct =
    spawnStartedAt === null
      ? 0
      : Math.min(100, Math.max(0, ((spawnIntervalSec - nextSpawnSeconds) / spawnIntervalSec) * 100));

  const despawnProgressPct =
    spawnStartedAt === null || !fruitActive
      ? 0
      : Math.min(100, Math.max(0, (despawnSeconds / DESPAWN_DURATION_SEC) * 100));

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Schedule & Sea Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Spawn Interval Schedule
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsWeekend(false)}
                className={`px-3 py-2 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                  !isWeekend
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Weekday (60 min)
              </button>
              <button
                type="button"
                onClick={() => setIsWeekend(true)}
                className={`px-3 py-2 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                  isWeekend
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Weekend (45 min)
              </button>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              Current Sea (Spawn Locations)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {SEA_SPAWN_POINTS.map((sea) => (
                <button
                  key={sea.id}
                  type="button"
                  onClick={() => setSelectedSea(sea.id)}
                  className={`px-2.5 py-2 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                    selectedSea === sea.id
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {sea.name} ({sea.spawnPoints})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleFruitSpawned}
            className="flex-1 min-w-[200px] px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-emerald-950/50"
          >
            <Play className="w-4 h-4" />
            A Fruit Just Spawned
          </button>

          <button
            type="button"
            onClick={handlePickedUp}
            className="flex-1 min-w-[200px] px-5 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-cyan-950/50"
          >
            <CheckCircle2 className="w-4 h-4" />
            I Picked One Up
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Dual Live Countdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Next Spawn Countdown */}
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Timer className="w-4 h-4" />
                Next Fruit Spawn Countdown
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {isWeekend ? '45m Weekend Cycle' : '60m Weekday Cycle'}
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-white tracking-tight">
              {spawnStartedAt === null
                ? formatClock(spawnIntervalSec)
                : nextSpawnSeconds <= 0
                ? '00:00'
                : formatClock(nextSpawnSeconds)}
            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${spawnProgressPct}%` }}
              />
            </div>

            <p className="text-[11px] text-zinc-400 font-mono">
              {spawnStartedAt === null
                ? 'Press "A Fruit Just Spawned" or "I Picked One Up" to start tracking.'
                : nextSpawnSeconds <= 0
                ? 'Spawn window reached! Press "A Fruit Just Spawned" when it appears.'
                : `Started ${pickedUpAt && !fruitActive ? '(fruit collected)' : '(spawn tracked)'}`}
            </p>
          </div>

          {/* Current Fruit Despawn Countdown */}
          <div
            className={`bg-zinc-950 border rounded-xl p-5 space-y-3 ${
              fruitActive && !isDespawned
                ? 'border-amber-500/50'
                : 'border-zinc-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Timer className="w-4 h-4" />
                Current Fruit Despawn Countdown
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                20m Uncollected Limit
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-amber-300 tracking-tight">
              {spawnStartedAt === null
                ? '20:00'
                : !fruitActive
                ? 'Picked Up'
                : isDespawned
                ? '00:00'
                : formatClock(despawnSeconds)}
            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${despawnProgressPct}%` }}
              />
            </div>

            <p className="text-[11px] text-zinc-400 font-mono">
              {spawnStartedAt === null
                ? 'Uncollected fruits vanish 20 minutes after spawning.'
                : !fruitActive
                ? 'Current fruit marked as collected — waiting for next spawn.'
                : isDespawned
                ? '20-minute despawn timer elapsed — uncollected fruit has despawned.'
                : 'Collect the active fruit before the 20-minute timer reaches 00:00.'}
            </p>
          </div>
        </div>

        {/* Sea Spawn Points & Fruit Notifier Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">
                {currentSeaInfo.name}: {currentSeaInfo.spawnPoints} Spawn Points
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Verified fruit spawn points per sea: <strong>25</strong> in First Sea, <strong>28</strong> in Second Sea, and <strong>34</strong> in Third Sea.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">
                Fruit Notifier Gamepass ({FRUIT_NOTIFIER_ROBUX.toLocaleString()} Robux)
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                The Fruit Notifier gamepass costs <strong>2,700 Robux</strong> and displays distance &amp; direction whenever a natural fruit spawns in your server.
              </p>
            </div>
          </div>
        </div>

        {/* Single Dealer Stock Info Line */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-zinc-400 shrink-0" />
          <span>
            The Fruit Dealer&apos;s stock rotates every 4 hours (00/04/08/12/16/20 UTC) on all servers.
          </span>
        </div>
      </div>
    </div>
  );
}
