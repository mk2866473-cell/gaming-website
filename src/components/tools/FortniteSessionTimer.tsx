/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, Pause, RotateCcw, Timer, AlertTriangle, ShieldCheck, Check, Sparkles
} from 'lucide-react';
import { FORTNITE_STORM_PHASES, StormPhase } from '../../data/fortniteData';

export default function FortniteSessionTimer() {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'match' | 'reboot'>('match');
  const [rebootSeconds, setRebootSeconds] = useState<number>(250); // 250s standard reboot card timer
  const [isRebootRunning, setIsRebootRunning] = useState<boolean>(false);

  // Match Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Reboot Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isRebootRunning && rebootSeconds > 0) {
      interval = setInterval(() => {
        setRebootSeconds((s) => Math.max(0, s - 1));
      }, 1000);
    } else if (rebootSeconds === 0) {
      setIsRebootRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRebootRunning, rebootSeconds]);

  // Calculate current storm phase based on elapsed seconds
  const currentMatchStatus = useMemo(() => {
    let accumulatedTime = 0;
    let currentPhase: StormPhase = FORTNITE_STORM_PHASES[0];
    let isShrinking = false;
    let timeRemainingInState = 0;

    for (const phase of FORTNITE_STORM_PHASES) {
      // 1. Wait duration
      const waitEnd = accumulatedTime + phase.waitDurationSec;
      if (elapsedSeconds < waitEnd) {
        currentPhase = phase;
        isShrinking = false;
        timeRemainingInState = waitEnd - elapsedSeconds;
        break;
      }
      accumulatedTime = waitEnd;

      // 2. Shrink duration
      const shrinkEnd = accumulatedTime + phase.shrinkDurationSec;
      if (elapsedSeconds < shrinkEnd) {
        currentPhase = phase;
        isShrinking = true;
        timeRemainingInState = shrinkEnd - elapsedSeconds;
        break;
      }
      accumulatedTime = shrinkEnd;
    }

    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    const formattedMatchTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    return {
      currentPhase,
      isShrinking,
      timeRemainingInState,
      formattedMatchTime
    };
  }, [elapsedSeconds]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Mode Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
        <button
          onClick={() => setActiveTab('match')}
          className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'match' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Timer className="w-3.5 h-3.5" />
          <span>Live Match & Storm Surge Timer</span>
        </button>
        <button
          onClick={() => setActiveTab('reboot')}
          className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'reboot' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reboot Card Expiration (250s)</span>
        </button>
      </div>

      {activeTab === 'match' ? (
        <div className="space-y-6">
          {/* Main Stopwatch Banner */}
          <div className="bg-zinc-950 border border-amber-500/40 rounded-2xl p-6 text-center space-y-4">
            <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider block">
              Live Battle Royale Match Elapsed Time
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold font-mono text-amber-400">
              {currentMatchStatus.formattedMatchTime}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  isRunning
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause Timer' : 'Start Match Timer'}
              </button>
              <button
                onClick={() => { setIsRunning(false); setElapsedSeconds(0); }}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Current Storm State Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Current Storm Zone</span>
              <span className="text-2xl font-extrabold font-mono text-white my-1 block">
                Phase {currentMatchStatus.currentPhase.phase} / 9
              </span>
              <span className={`text-xs font-bold ${currentMatchStatus.isShrinking ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {currentMatchStatus.isShrinking ? '⚠️ Storm Shrinking' : '⏳ Zone Waiting'}
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Next Phase Transition In</span>
              <span className="text-2xl font-extrabold font-mono text-cyan-400 my-1 block">
                {currentMatchStatus.timeRemainingInState}s
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                {currentMatchStatus.isShrinking ? 'Until next circle revealed' : 'Until zone starts closing'}
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Storm DPS Tick</span>
              <span className="text-2xl font-extrabold font-mono text-rose-400 my-1 block">
                {currentMatchStatus.currentPhase.damagePerSec} HP / sec
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                Direct health depletion
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-950 border border-cyan-500/40 rounded-2xl p-6 text-center space-y-4">
          <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider block">
            Eliminated Teammate Reboot Card Expiration
          </span>
          <div className="text-5xl sm:text-6xl font-extrabold font-mono text-cyan-400">
            {Math.floor(rebootSeconds / 60)}:{(rebootSeconds % 60).toString().padStart(2, '0')}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsRebootRunning(!isRebootRunning)}
              className="px-5 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs flex items-center gap-2 hover:bg-cyan-400"
            >
              {isRebootRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRebootRunning ? 'Pause' : 'Start Reboot Card Timer'}
            </button>
            <button
              onClick={() => { setIsRebootRunning(false); setRebootSeconds(250); }}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset (250s)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
