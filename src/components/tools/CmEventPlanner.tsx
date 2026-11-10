/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Clock, Zap, Target, Trophy, Gift, PawPrint } from 'lucide-react';

export default function CmEventPlanner() {
  const [activeEvents, setActiveEvents] = useState([
    { id: 1, name: 'Village Mania', type: 'Discount', endsIn: 9900, boost: '-20% Build Cost', color: 'text-emerald-400', theme: 'from-emerald-950/20 to-emerald-900/10' },
    { id: 2, name: 'Raid Master', type: 'Points', endsIn: 51600, boost: '+50% Raid Points', color: 'text-amber-400', theme: 'from-amber-950/20 to-amber-900/10' },
    { id: 3, name: 'Attack Master', type: 'Points', endsIn: 93600, boost: '+100% Attack Points', color: 'text-rose-400', theme: 'from-rose-950/20 to-rose-900/10' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvents(prev => prev.map(ev => ({
        ...ev,
        endsIn: Math.max(0, ev.endsIn - 1)
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Event Timer & Strategy Planner</h2>
            <p className="text-xs text-zinc-400">Synchronize your spins with active events to maximize returns.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {activeEvents.map((event) => (
          <div key={event.id} className={`bg-gradient-to-br ${event.theme} border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl`}>
            <div className="space-y-1 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{event.type}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <h3 className="text-lg font-black text-white">{event.name}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 shadow-inner">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className={`w-3.5 h-3.5 ${event.color}`} />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Active Boost</span>
                </div>
                <div className={`text-sm font-black ${event.color}`}>{event.boost}</div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Ends in</span>
                <span className="text-amber-500 font-mono font-black text-xs">{formatTime(event.endsIn)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#090d16] border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Optimal Spinning Strategy</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Betting Strategy', desc: 'Wait for Raid Master to use high multipliers (Betting x10+) for maximum point ROI.', icon: Target },
            { title: 'Coin Management', desc: 'Save your millions. Only construct buildings during Village Mania to save up to 65%.', icon: Zap },
            { title: 'Pet Synergy', desc: 'Activate Foxy during "Big Raids" and Tiger during "Attack Madness" events.', icon: PawPrint },
            { title: 'Gold Cards', desc: 'Do not trade rare gold duplicates until a specific Gold Trade event is active.', icon: Gift },
          ].map((tip, i) => (
            <div key={i} className="flex gap-4 p-4 bg-zinc-900/40 border border-zinc-800/60 rounded-xl hover:bg-zinc-900/60 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0">
                <tip.icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">{tip.title}</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

