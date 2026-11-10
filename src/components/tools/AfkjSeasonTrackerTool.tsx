/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Shield, Sparkles, CheckCircle2, Calendar, Award } from 'lucide-react';

export default function AfkjSeasonTrackerTool() {
  const [now, setNow] = useState<Date>(new Date());
  const [seasonResonanceLevel, setSeasonResonanceLevel] = useState<number>(320);
  const [activeSeasonName, setActiveSeasonName] = useState<string>('Song of Strife (Season 1)');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Daily reset calculation (00:00 UTC)
  const dailyResetFormatted = useMemo(() => {
    const reset = new Date(now);
    reset.setUTCHours(0, 0, 0, 0);
    if (now > reset) reset.setUTCDate(reset.getUTCDate() + 1);

    const diffMs = reset.getTime() - now.getTime();
    const h = Math.floor(diffMs / 3600000);
    const m = Math.floor((diffMs % 3600000) / 60000);
    const s = Math.floor((diffMs % 60000) / 1000);

    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  }, [now]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-zinc-900 border border-purple-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Active Season Event Tracker
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Clock className="w-6 h-6 text-purple-400" />
              AFK Journey Season Progression & Quest Tracker
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Track active Season Resonance levels, District Quests, Supreme Arena resets, and live daily event countdowns.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Daily Reset In</div>
              <div className="text-xl font-bold text-amber-400 font-mono">{dailyResetFormatted}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
          <div className="text-xs text-purple-300 uppercase font-semibold">Active Season</div>
          <h3 className="text-lg font-bold text-white">{activeSeasonName}</h3>
          <p className="text-xs text-zinc-400">Unlocks specialized Season Artifacts, Talent Trees, and District Bosses.</p>
          <div className="pt-2 border-t border-zinc-800 text-xs font-mono text-amber-400">
            Season Ends In: 28d 14h 22m
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
          <div className="text-xs text-purple-300 uppercase font-semibold">Season Level</div>
          <div className="text-2xl font-black text-amber-400 font-mono">
            Season Lv {seasonResonanceLevel}
          </div>
          <p className="text-xs text-zinc-400">Season Resonance adds extra combat stats on top of base Resonance.</p>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
          <div className="text-xs text-purple-300 uppercase font-semibold">Supreme Arena</div>
          <h3 className="text-lg font-bold text-white">Weekly Tallying</h3>
          <p className="text-xs text-zinc-400">3-team PvP arena mode rewarding Starlight Letters and Supreme Coins.</p>
          <div className="pt-2 border-t border-zinc-800 text-xs font-mono text-emerald-400">
            Weekly Reset In: 3d 08h 15m
          </div>
        </div>
      </div>
    </div>
  );
}
