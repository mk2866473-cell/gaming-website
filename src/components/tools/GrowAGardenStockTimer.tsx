/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, Sprout, Shield, Egg, Bell, BellOff } from 'lucide-react';

export interface ShopTimerState {
  name: string;
  intervalMinutes: number;
  icon: React.ReactNode;
  remainingSeconds: number;
  progressPercent: number;
  nextRestockTimeStr: string;
}

export default function GrowAGardenStockTimer() {
  const [now, setNow] = useState<Date>(new Date());
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimerDetails = (intervalMinutes: number): { remainingSeconds: number; progressPercent: number; nextRestockTimeStr: string } => {
    const currentSeconds = now.getSeconds();
    const currentMinutes = now.getMinutes();

    // Seconds into the current hour
    const secondsInHour = currentMinutes * 60 + currentSeconds;
    const intervalSeconds = intervalMinutes * 60;

    // Seconds elapsed in current cycle
    const elapsedInCycle = secondsInHour % intervalSeconds;
    const remainingSeconds = intervalSeconds - elapsedInCycle;

    // Progress percentage
    const progressPercent = Math.min(100, Math.max(0, (elapsedInCycle / intervalSeconds) * 100));

    // Next restock Date object
    const nextRestockDate = new Date(now.getTime() + remainingSeconds * 1000);
    const nextRestockTimeStr = nextRestockDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return {
      remainingSeconds,
      progressPercent,
      nextRestockTimeStr
    };
  };

  const seedDetails = getTimerDetails(5);
  const gearDetails = getTimerDetails(5);
  const petEggDetails = getTimerDetails(30);

  const formatCountdown = (totalSecs: number): string => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const shops = [
    {
      id: 'seed-shop',
      name: 'Seed Shop',
      tagline: 'Refreshes every 5 minutes',
      intervalMinutes: 5,
      icon: <Sprout className="w-6 h-6 text-emerald-400" />,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      details: seedDetails
    },
    {
      id: 'gear-shop',
      name: 'Gear & Tools Shop',
      tagline: 'Refreshes every 5 minutes',
      intervalMinutes: 5,
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      details: gearDetails
    },
    {
      id: 'pet-egg-shop',
      name: 'Pet Egg Shop',
      tagline: 'Refreshes every 30 minutes',
      intervalMinutes: 30,
      icon: <Egg className="w-6 h-6 text-amber-400" />,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      details: petEggDetails
    }
  ];

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Roblox Grow a Garden Restock Timers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Live Stock & Restock Timers
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time live countdowns synced to the clock for Seed Shop (5m), Gear Shop (5m), and Pet Egg Shop (30m).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#070b19] border border-indigo-950 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Clock: {now.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Shop Timer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shops.map(shop => {
          const isRestockingSoon = shop.details.remainingSeconds <= 30;
          return (
            <div
              key={shop.id}
              className={`p-6 rounded-3xl border transition-all space-y-5 relative overflow-hidden bg-[#070b19] ${
                isRestockingSoon
                  ? 'border-emerald-400/80 shadow-lg shadow-emerald-950/50'
                  : 'border-indigo-900/60'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-[#0c122e] border border-indigo-900/60">
                  {shop.icon}
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${shop.badgeColor}`}>
                  Every {shop.intervalMinutes}m
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg font-bold text-white">{shop.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{shop.tagline}</p>
              </div>

              {/* Countdown Display */}
              <div className="space-y-2 pt-2 border-t border-indigo-950">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Next Restock In
                </span>
                <div className={`text-3xl font-black font-mono tracking-tight ${
                  isRestockingSoon ? 'text-emerald-400 animate-pulse' : 'text-amber-300'
                }`}>
                  {formatCountdown(shop.details.remainingSeconds)}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Target clock time: <span className="text-white font-bold">{shop.details.nextRestockTimeStr}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-[#0c122e] h-2 rounded-full overflow-hidden border border-indigo-950">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-emerald-400 h-full transition-all duration-1000"
                    style={{ width: `${shop.details.progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Cycle start</span>
                  <span>{Math.round(shop.details.progressPercent)}% elapsed</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
