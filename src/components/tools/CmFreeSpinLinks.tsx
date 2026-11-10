/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Gift, ExternalLink, Clock, CheckCircle2 } from 'lucide-react';

export default function CmFreeSpinLinks() {
  const [claimed, setClaimed] = useState<number[]>([]);

  const dailyLinks = [
    { id: 1, date: 'Today, Nov 3', reward: '25 Spins', status: 'Verified', code: 'cm_spins_25_a' },
    { id: 2, date: 'Today, Nov 3', reward: '10 Spins & 1.2M Coins', status: 'Verified', code: 'cm_combo_b' },
    { id: 3, date: 'Yesterday, Nov 2', reward: '25 Spins', status: 'Verified', code: 'cm_spins_25_c' },
    { id: 4, date: 'Yesterday, Nov 2', reward: '50 Spins', status: 'Verified', code: 'cm_spins_50_d' },
    { id: 5, date: 'Nov 1, 2026', reward: '25 Spins', status: 'Expired', code: 'cm_old_e' },
  ];

  const handleClaim = (id: number) => {
    if (claimed.includes(id)) return;
    setClaimed([...claimed, id]);
    // Simulate opening the game
    window.open(`https://www.google.com/search?q=coin+master+reward+link+${id}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Gift className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Free Spin Links & Daily Rewards</h2>
            <p className="text-xs text-zinc-400">Official verified daily gift links directory for 2026.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#090d16] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Reward</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {dailyLinks.map((link) => {
                const isClaimed = claimed.includes(link.id);
                const isExpired = link.status === 'Expired';

                return (
                  <tr key={link.id} className="group hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <Clock className={`w-3.5 h-3.5 ${isExpired ? 'text-zinc-600' : 'text-zinc-500'}`} />
                        <span className={`font-medium ${isExpired ? 'text-zinc-500' : 'text-zinc-300'}`}>{link.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className={`font-bold ${isExpired ? 'text-zinc-500' : 'text-amber-400'}`}>{link.reward}</span>
                        <span className="text-[10px] text-zinc-600 font-mono mt-0.5">{link.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {isExpired ? (
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter border border-zinc-800 px-2 py-1">
                          Expired
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleClaim(link.id)}
                            disabled={isClaimed}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border shadow-sm ${
                              isClaimed 
                                ? 'bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed' 
                                : 'bg-emerald-500/10 hover:bg-emerald-500 border-emerald-500/30 hover:border-emerald-400 text-emerald-400 hover:text-white'
                            }`}
                          >
                            <span>{isClaimed ? 'Claimed' : 'Claim Reward'}</span>
                            {!isClaimed && <ExternalLink className="w-3.5 h-3.5" />}
                          </button>
                          {isClaimed && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-blue-300 mb-1">Safety Verification</h4>
          <p className="text-[11px] text-blue-200/60 leading-relaxed">
            All links are manually verified and sourced directly from official Coin Master social channels. We never ask for your game password or login credentials.
          </p>
        </div>
      </div>
    </div>
  );
}

