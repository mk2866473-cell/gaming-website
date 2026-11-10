/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Users, PieChart, ShieldCheck, Plus, Trash2, Check, TrendingUp
} from 'lucide-react';
import { ROBLOX_RATES } from '../../data/robloxData';

interface TeamMember {
  name: string;
  role: string;
  splitPercent: number;
}

export default function RobloxDeveloperEarningsCalculator() {
  const [gamepassNetRobux, setGamepassNetRobux] = useState<number>(250000);
  const [devProductNetRobux, setDevProductNetRobux] = useState<number>(150000);
  const [avatarCommissionsRobux, setAvatarCommissionsRobux] = useState<number>(30000);
  const [premiumPayoutsRobux, setPremiumPayoutsRobux] = useState<number>(70000);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: 'Lead Dev', role: 'Scripter / Systems', splitPercent: 40 },
    { name: 'Lead Builder', role: 'Map & 3D Assets', splitPercent: 30 },
    { name: 'UI & VFX Designer', role: 'Interface & FX', splitPercent: 15 },
    { name: 'Studio Reserve', role: 'Ads & Expansion Fund', splitPercent: 15 }
  ]);

  const earnings = useMemo(() => {
    const totalGroupRobux = gamepassNetRobux + devProductNetRobux + avatarCommissionsRobux + premiumPayoutsRobux;
    const totalGroupUsd = totalGroupRobux * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX;

    const totalSplit = teamMembers.reduce((sum, m) => sum + m.splitPercent, 0);

    const memberBreakdown = teamMembers.map((m) => {
      const shareRobux = Math.floor(totalGroupRobux * (m.splitPercent / 100));
      const shareUsd = (shareRobux * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);
      return {
        ...m,
        shareRobux,
        shareUsd
      };
    });

    return {
      totalGroupRobux,
      totalGroupUsd: totalGroupUsd.toFixed(2),
      totalSplit,
      memberBreakdown
    };
  }, [gamepassNetRobux, devProductNetRobux, avatarCommissionsRobux, premiumPayoutsRobux, teamMembers]);

  const updateSplit = (index: number, newPercent: number) => {
    const updated = [...teamMembers];
    updated[index].splitPercent = newPercent;
    setTeamMembers(updated);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* 4 Income Streams Inputs */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Monthly Studio Revenue Streams (Net Robux)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-[11px] text-zinc-400 block mb-1 font-semibold">Gamepasses (70% Net)</label>
            <input
              type="number"
              min="0"
              value={gamepassNetRobux}
              onChange={(e) => setGamepassNetRobux(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 block mb-1 font-semibold">Dev Products (Currency/Boosts)</label>
            <input
              type="number"
              min="0"
              value={devProductNetRobux}
              onChange={(e) => setDevProductNetRobux(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 block mb-1 font-semibold">Avatar Commissions (40%)</label>
            <input
              type="number"
              min="0"
              value={avatarCommissionsRobux}
              onChange={(e) => setAvatarCommissionsRobux(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 block mb-1 font-semibold">Premium Playtime Payouts</label>
            <input
              type="number"
              min="0"
              value={premiumPayoutsRobux}
              onChange={(e) => setPremiumPayoutsRobux(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Top Aggregated Earnings Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Total Group Monthly Net Robux</span>
          <span className="text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {earnings.totalGroupRobux.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Clean Earned Robux across 4 revenue sources
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">Total DevEx Cashout Value</span>
          <span className="text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            ${earnings.totalGroupUsd} <span className="text-xs font-normal text-zinc-400">USD</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            @ $0.0035 / Robux DevEx rate
          </span>
        </div>
      </div>

      {/* Team Revenue Splits Breakdown Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            Group Team Revenue Splits (Total Split: {earnings.totalSplit}%)
          </h4>
          <span className="text-xs font-mono text-zinc-400">
            Automated Group Recurring Payouts
          </span>
        </div>

        <div className="space-y-2">
          {earnings.memberBreakdown.map((member, idx) => (
            <div key={idx} className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="w-48">
                <span className="text-xs font-bold text-white block">{member.name}</span>
                <span className="text-[11px] text-zinc-400">{member.role}</span>
              </div>

              {/* Percentage Slider */}
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={member.splitPercent}
                  onChange={(e) => updateSplit(idx, parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-emerald-400 w-12 text-right">
                  {member.splitPercent}%
                </span>
              </div>

              {/* Net Payout */}
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-mono font-bold text-white block">
                  {member.shareRobux.toLocaleString()} R$
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  ${member.shareUsd} USD
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
