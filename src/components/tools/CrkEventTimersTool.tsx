/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Shield, Bell, Sparkles, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AlarmState {
  staminaCurrent: number;
  staminaMax: number;
  rechargeRateMin: number; // 5 mins per jelly default
}

export default function CrkEventTimersTool() {
  const [staminaState, setStaminaState] = useState<AlarmState>({
    staminaCurrent: 42,
    staminaMax: 180,
    rechargeRateMin: 5
  });

  const [serverRegion, setServerRegion] = useState<string>('Pure Vanilla (UTC+9)');
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate daily reset (00:00 KST / 15:00 UTC)
  const dailyResetFormatted = useMemo(() => {
    const reset = new Date(now);
    reset.setUTCHours(15, 0, 0, 0);
    if (now > reset) {
      reset.setUTCDate(reset.getUTCDate() + 1);
    }
    const diffMs = reset.getTime() - now.getTime();
    const h = Math.floor(diffMs / 3600000);
    const m = Math.floor((diffMs % 3600000) / 60000);
    const s = Math.floor((diffMs % 60000) / 1000);
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  }, [now]);

  // Calculate stamina full time
  const staminaCalculation = useMemo(() => {
    const missingJellies = Math.max(0, staminaState.staminaMax - staminaState.staminaCurrent);
    const totalMinutesToFull = missingJellies * staminaState.rechargeRateMin;

    const fullTimeDate = new Date(now.getTime() + totalMinutesToFull * 60 * 1000);

    const hours = Math.floor(totalMinutesToFull / 60);
    const mins = totalMinutesToFull % 60;

    return {
      missingJellies,
      totalMinutesToFull,
      hours,
      mins,
      fullTimeFormatted: fullTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }, [staminaState, now]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Live Guild & Server Reset Engine
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Clock className="w-6 h-6 text-amber-400" />
              Cookie Run: Kingdom Event & Guild Battle Timers
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Live countdowns for daily quest resets, stamina jelly cap alarms, and Guild Battle boss rotation schedules.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Daily Server Reset In</div>
              <div className="text-xl font-bold text-amber-400 font-mono">{dailyResetFormatted}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Live Timers & Guild Boss Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timer 1: Daily Reset */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Kingdom Reset</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">Daily</span>
            </div>
            <h3 className="text-lg font-bold text-white">Daily Quests & Fountain</h3>
            <p className="text-xs text-zinc-400 mt-1">Resets Daily Bounties, Tree of Wishes Burning Time, and Daily Gifts.</p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800">
            <div className="text-xs text-zinc-500">Countdown</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">{dailyResetFormatted}</div>
          </div>
        </div>

        {/* Timer 2: Guild Battle Rotation */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Guild Battle</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">Active Season</span>
            </div>
            <h3 className="text-lg font-bold text-white">Red Velvet Dragon / Abyss</h3>
            <p className="text-xs text-zinc-400 mt-1">Use 3 daily battle tickets before season tallying starts on Sunday.</p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800">
            <div className="text-xs text-zinc-500">Tickets Refresh In</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{dailyResetFormatted}</div>
          </div>
        </div>

        {/* Timer 3: Kingdom Pass */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Season Pass</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">14 Days Left</span>
            </div>
            <h3 className="text-lg font-bold text-white">Kingdom Pass Rewards</h3>
            <p className="text-xs text-zinc-400 mt-1">Complete Pass missions for exclusive landmark decor & Cutters.</p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800">
            <div className="text-xs text-zinc-500">Season Ending</div>
            <div className="text-2xl font-black text-purple-400 font-mono mt-0.5">14d 08h 12m</div>
          </div>
        </div>
      </div>

      {/* Stamina Overflow Alarm Calculator */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-400" />
          Stamina Jelly Refill & Overflow Alarm Calculator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Current Stamina Jellies:</span>
                <span className="font-mono text-amber-300 font-bold">{staminaState.staminaCurrent}</span>
              </label>
              <input
                type="range"
                min="0"
                max={staminaState.staminaMax}
                value={staminaState.staminaCurrent}
                onChange={e => setStaminaState({ ...staminaState, staminaCurrent: parseInt(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Max Stamina Cap:</span>
                <span className="font-mono text-amber-300 font-bold">{staminaState.staminaMax}</span>
              </label>
              <input
                type="number"
                value={staminaState.staminaMax}
                onChange={e => setStaminaState({ ...staminaState, staminaMax: parseInt(e.target.value) || 1 })}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between">
            <div>
              <div className="text-xs text-zinc-400">Full Cap Timestamp</div>
              <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                {staminaCalculation.fullTimeFormatted}
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Takes <strong className="text-white">{staminaCalculation.hours}h {staminaCalculation.mins}m</strong> to regain remaining {staminaCalculation.missingJellies} Stamina Jellies.
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-xs text-emerald-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Alarm setup recommendation
              </span>
              <span>Rate: 1 Jelly / 5 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
