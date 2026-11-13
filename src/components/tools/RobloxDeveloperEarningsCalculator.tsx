/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Users, Plus, Trash2, ShieldCheck
} from 'lucide-react';
import { ROBLOX_RATES } from '../../data/robloxData';

interface TeamMember {
  name: string;
  role: string;
  splitPercent: number;
}

export default function RobloxDeveloperEarningsCalculator() {
  const [poolMode, setPoolMode] = useState<'streams' | 'direct'>('streams');
  const [directGroupRobux, setDirectGroupRobux] = useState<number>(500000);

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
    const totalGroupRobux =
      poolMode === 'direct'
        ? Math.max(0, directGroupRobux)
        : Math.max(0, gamepassNetRobux) +
          Math.max(0, devProductNetRobux) +
          Math.max(0, avatarCommissionsRobux) +
          Math.max(0, premiumPayoutsRobux);

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

    const allocatedRobux = memberBreakdown.reduce((sum, m) => sum + m.shareRobux, 0);
    const unallocatedRobux = Math.max(0, totalGroupRobux - allocatedRobux);

    return {
      totalGroupRobux,
      totalGroupUsd: totalGroupUsd.toFixed(2),
      totalSplit,
      memberBreakdown,
      unallocatedRobux
    };
  }, [poolMode, directGroupRobux, gamepassNetRobux, devProductNetRobux, avatarCommissionsRobux, premiumPayoutsRobux, teamMembers]);

  const updateSplit = (index: number, newPercent: number) => {
    const clean = Math.max(0, Math.min(100, isNaN(newPercent) ? 0 : newPercent));
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], splitPercent: clean };
    setTeamMembers(updated);
  };

  const updateMemberField = (index: number, field: 'name' | 'role', value: string) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
  };

  const addMember = () => {
    const remaining = Math.max(0, 100 - earnings.totalSplit);
    setTeamMembers([
      ...teamMembers,
      { name: `Team Member ${teamMembers.length + 1}`, role: 'Contributor', splitPercent: remaining }
    ]);
  };

  const removeMember = (index: number) => {
    if (teamMembers.length <= 1) return;
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Mode Switcher: Team Earnings Streams vs Group Funds Balance */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
        <button
          onClick={() => setPoolMode('streams')}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            poolMode === 'streams'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Team Earnings Streams (Multi-Source)
        </button>
        <button
          onClick={() => setPoolMode('direct')}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            poolMode === 'direct'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Group Funds Balance (Direct Split)
        </button>
      </div>

      {/* Revenue / Group Pool Inputs */}
      {poolMode === 'streams' ? (
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
      ) : (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
            Total Group Funds Balance to Distribute (Net Robux)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              value={directGroupRobux}
              onChange={(e) => setDirectGroupRobux(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-2xl font-extrabold font-mono text-white focus:outline-none focus:border-emerald-500 pl-12"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-zinc-500 text-lg">
              R$
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[10000, 50000, 100000, 250000, 500000, 1000000].map((preset) => (
              <button
                key={preset}
                onClick={() => setDirectGroupRobux(preset)}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 cursor-pointer"
              >
                {preset.toLocaleString()} R$
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Top Aggregated Earnings Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">
            {poolMode === 'streams' ? 'Total Group Monthly Net Robux' : 'Total Group Funds Pool'}
          </span>
          <span className="text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {earnings.totalGroupRobux.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            0% additional fee on group payouts (30% tax already deducted)
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

      {/* Group Payout & Team Revenue Splits Breakdown Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-zinc-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            Group & Team Payout Splits
          </h4>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                earnings.totalSplit === 100
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : earnings.totalSplit > 100
                  ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                  : 'bg-amber-950 text-amber-300 border border-amber-500/40'
              }`}
            >
              Total Split: {earnings.totalSplit}%
            </span>
            <button
              onClick={addMember}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {earnings.memberBreakdown.map((member, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <div className="w-full sm:w-48 space-y-1">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMemberField(idx, 'name', e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-white border-b border-transparent focus:border-zinc-700 focus:outline-none"
                />
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => updateMemberField(idx, 'role', e.target.value)}
                  className="w-full bg-transparent text-[11px] text-zinc-400 border-b border-transparent focus:border-zinc-700 focus:outline-none"
                />
              </div>

              {/* Percentage Slider + Numeric Input */}
              <div className="flex items-center gap-2 flex-1 w-full sm:max-w-xs">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={member.splitPercent}
                  onChange={(e) => updateSplit(idx, parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={member.splitPercent}
                  onChange={(e) => updateSplit(idx, parseInt(e.target.value, 10))}
                  className="w-14 bg-zinc-950 border border-zinc-700 rounded px-1.5 py-0.5 text-xs font-mono font-bold text-emerald-400 text-right focus:outline-none"
                />
                <span className="text-xs font-mono text-zinc-400">%</span>
              </div>

              {/* Net Payout + Remove */}
              <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-white block">
                    {member.shareRobux.toLocaleString()} R$
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    ${member.shareUsd} USD
                  </span>
                </div>
                {teamMembers.length > 1 && (
                  <button
                    onClick={() => removeMember(idx)}
                    className="p-1 text-zinc-500 hover:text-rose-400 rounded cursor-pointer"
                    title="Remove team member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Unallocated Remainder & 14-day Group Payout Rule Note */}
        <div className="pt-2 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            New group members must wait 14 days before becoming eligible to receive group payouts.
          </span>
          <span className="font-mono text-zinc-300 shrink-0">
            Unallocated / Rounding Remainder: {earnings.unallocatedRobux.toLocaleString()} R$
          </span>
        </div>
      </div>
    </div>
  );
}
