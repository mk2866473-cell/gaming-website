/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Sparkles, Zap, Shield, Flame, CheckCircle2 } from 'lucide-react';

export default function MogoEventTimersTool() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const eventCalculations = useMemo(() => {
    // Simulated active flash events
    return [
      { name: 'High Roller (+500x Roll Multiplier)', type: 'Flash Event', status: 'ACTIVE NOW', durationLeft: '14m 22s', desc: 'Allows rolling up to 500x or 1000x dice multiplier for massive points.' },
      { name: 'Wheel Boost (2x Color Wheel Spins)', type: 'Flash Event', status: 'ACTIVE NOW', durationLeft: '28m 05s', desc: 'Grants double wheel spins whenever you complete a full hotel set.' },
      { name: 'Sticker Boom (+50% Extra Stickers)', type: 'Special Event', status: 'STARTS IN 3h 15m', durationLeft: 'Scheduled', desc: 'All opened sticker packs contain 50% more cards.' },
      { name: 'Golden Blitz (Trade Gold Stickers)', type: 'Special Event', status: 'STARTS TOMORROW', durationLeft: 'Scheduled', desc: 'Trade 2 selected Gold Stickers with friends up to 5 times.' }
    ];
  }, [now]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-zinc-900 border border-red-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
              Live Schedule & Flash Event Clock
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Clock className="w-6 h-6 text-red-400" />
              Monopoly GO Flash Event Timers
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Track active and upcoming flash events (High Roller, Wheel Boost, Sticker Boom, Golden Blitz) to stack dice rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventCalculations.map((ev, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl border flex flex-col justify-between ${
              ev.status === 'ACTIVE NOW'
                ? 'bg-red-950/20 border-red-500/40 shadow-lg shadow-red-950/20'
                : 'bg-zinc-950/60 border-zinc-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400 font-mono">{ev.type}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                    ev.status === 'ACTIVE NOW'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {ev.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{ev.name}</h3>
              <p className="text-xs text-zinc-300 mt-1">{ev.desc}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Remaining / Schedule:</span>
              <span className="text-sm font-bold font-mono text-amber-400">{ev.durationLeft}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
