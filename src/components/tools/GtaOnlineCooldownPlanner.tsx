/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Clock, Info, CalendarClock } from 'lucide-react';
import {
  COOLDOWN_ACTIVITIES,
  COOLDOWN_STATIC_REFERENCES,
  CooldownActivityId,
  calculateCooldownReadyTime
} from '../../data/gtaOnlineData';

function getCurrentHHMM(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function formatCountdown(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(clamped / 3600);
  const mins = Math.floor((clamped % 3600) / 60);
  const secs = clamped % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function formatDurationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} minutes`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${minutes} minutes (${h}h)` : `${minutes} minutes (${h}h ${m}m)`;
}

export default function GtaOnlineCooldownPlanner() {
  const [activityId, setActivityId] = useState<CooldownActivityId>('cayo-perico-solo');
  const [finishedTime, setFinishedTime] = useState<string>(() => getCurrentHHMM());

  const initialSeconds = useMemo(() => {
    const found = COOLDOWN_ACTIVITIES.find((a) => a.id === activityId) || COOLDOWN_ACTIVITIES[0];
    return found.cooldownMinutes * 60;
  }, [activityId]);

  const [remainingSeconds, setRemainingSeconds] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const readyInfo = useMemo(() => {
    return calculateCooldownReadyTime(activityId, finishedTime);
  }, [activityId, finishedTime]);

  useEffect(() => {
    setIsRunning(false);
    setRemainingSeconds(readyInfo.cooldownMinutes * 60);
  }, [readyInfo.cooldownMinutes, activityId]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isRunning]);

  const handleResetTimer = () => {
    setIsRunning(false);
    setRemainingSeconds(readyInfo.cooldownMinutes * 60);
  };

  const progressPercent =
    readyInfo.cooldownMinutes > 0
      ? Math.max(
          0,
          Math.min(
            100,
            ((readyInfo.cooldownMinutes * 60 - remainingSeconds) /
              (readyInfo.cooldownMinutes * 60)) *
              100
          )
        )
      : 100;

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="text-xs font-mono font-bold text-emerald-400 mb-1.5 flex items-center gap-2">
            <Timer className="w-3.5 h-3.5" />
            <span>GTA Online · Activity Cooldown Utility</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            GTA Online Cooldown Planner
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Check exact cooldown durations, calculate the clock time your activity unlocks again, and run a live countdown timer.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFinishedTime(getCurrentHHMM())}
          className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Set Finish Time to Now</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Activity Picker & Time Input */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <span className="text-xs font-mono font-bold text-slate-300 tracking-wider block">
              1. Pick Activity
            </span>
            <div className="space-y-2">
              {COOLDOWN_ACTIVITIES.map((act) => {
                const isSelected = activityId === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setActivityId(act.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-600/20 border-emerald-400 text-white shadow-md'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold">{act.name}</div>
                      {act.note && (
                        <div className="text-[11px] text-cyan-300 mt-1">{act.note}</div>
                      )}
                    </div>
                    <span className="text-xs font-mono tabular-nums font-bold text-emerald-400 shrink-0">
                      {act.cooldownMinutes} min
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Finished Time Input */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="cooldown-finished-time"
                className="text-xs font-mono font-bold text-slate-300 tracking-wider"
              >
                2. Time Finished (24h Clock)
              </label>
              <button
                type="button"
                onClick={() => setFinishedTime(getCurrentHHMM())}
                className="text-[11px] font-mono text-cyan-300 hover:text-cyan-200 underline cursor-pointer"
              >
                Use current time
              </button>
            </div>
            <input
              id="cooldown-finished-time"
              type="time"
              value={finishedTime}
              onChange={(e) => {
                if (e.target.value) setFinishedTime(e.target.value);
              }}
              className="w-full sm:w-56 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-400">
              Defaults to your local clock time. Edit to plan ahead or check when an earlier completion unlocks.
            </p>
          </div>
        </div>

        {/* Right: Ready Clock, Live Countdown Timer & Static Reference */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 tracking-wider font-bold">
                Ready Again At
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-2.5 tabular-nums font-mono">
                <span>{readyInfo.readyTime24}</span>
                {readyInfo.dayOffset > 0 && (
                  <span className="text-sm font-bold text-amber-300">
                    +{readyInfo.dayOffset}d
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 font-mono">
                {readyInfo.activity.name} · Finished {readyInfo.finishedTime24}
              </p>
            </div>

            {/* Duration & Status */}
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono tabular-nums">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Cooldown Length</span>
                <span className="text-cyan-300 font-bold text-sm">
                  {formatDurationLabel(readyInfo.cooldownMinutes)}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Timer Status</span>
                <span
                  className={`font-bold text-sm ${
                    remainingSeconds === 0
                      ? 'text-emerald-400'
                      : isRunning
                      ? 'text-amber-300'
                      : 'text-slate-200'
                  }`}
                >
                  {remainingSeconds === 0 ? 'Ready Now' : isRunning ? 'Running' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Live Countdown Timer */}
            <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Live Cooldown Timer
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-400">
                  {Math.round(progressPercent)}% elapsed
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-center text-white tracking-wider py-2">
                {formatCountdown(remainingSeconds)}
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[#0c122e] overflow-hidden border border-indigo-950">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (remainingSeconds === 0) {
                      setRemainingSeconds(readyInfo.cooldownMinutes * 60);
                    }
                    setIsRunning(true);
                  }}
                  disabled={isRunning}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-45 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsRunning(false)}
                  disabled={!isRunning}
                  className="py-2 px-3 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 disabled:opacity-45 text-amber-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetTimer}
                  className="py-2 px-3 rounded-xl bg-[#0c122e] hover:bg-indigo-950 border border-indigo-900 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Static Reference Box (No Timers) */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2.5 text-xs">
              <div className="text-[11px] font-mono text-slate-300 font-bold flex items-center gap-1.5">
                <CalendarClock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Static Reset &amp; Cap Reference</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                {COOLDOWN_STATIC_REFERENCES.map((ref) => (
                  <div key={ref.label} className="flex justify-between gap-3 border-b border-indigo-950/60 last:border-0 pb-1 last:pb-0">
                    <span className="text-slate-400">{ref.label}:</span>
                    <span className="text-white font-semibold text-right">{ref.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {readyInfo.activity.note && (
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-[11px] text-cyan-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{readyInfo.activity.note}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
