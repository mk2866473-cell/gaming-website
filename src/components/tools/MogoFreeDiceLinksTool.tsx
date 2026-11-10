/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Gift, CheckCircle2, ExternalLink, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface DiceLinkItem {
  id: string;
  title: string;
  diceAmount: number;
  bonusPack?: string;
  dateAdded: string;
  isVerified: boolean;
  linkUrl: string;
}

const SAMPLE_DICE_LINKS: DiceLinkItem[] = [
  { id: 'link_1', title: '25 Free Dice Rolls', diceAmount: 25, dateAdded: 'Today (Nov 3)', isVerified: true, linkUrl: 'https://mply.io/dice_reward_25a' },
  { id: 'link_2', title: '30 Free Dice Rolls + Pink Sticker Pack', diceAmount: 30, bonusPack: 'Pink 3-Star Pack', dateAdded: 'Today (Nov 3)', isVerified: true, linkUrl: 'https://mply.io/dice_reward_30b' },
  { id: 'link_3', title: '25 Free Dice Rolls', diceAmount: 25, dateAdded: 'Yesterday (Nov 2)', isVerified: true, linkUrl: 'https://mply.io/dice_reward_25c' },
  { id: 'link_4', title: '25 Free Dice Rolls + Partner Event Tokens', diceAmount: 25, bonusPack: '100 Partner Tokens', dateAdded: 'Yesterday (Nov 2)', isVerified: true, linkUrl: 'https://mply.io/dice_reward_25d' }
];

export default function MogoFreeDiceLinksTool() {
  const [claimedLinkIds, setClaimedLinkIds] = useState<string[]>(['link_3']);

  const toggleClaimed = (id: string) => {
    setClaimedLinkIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalClaimedDice = useMemo(() => {
    return SAMPLE_DICE_LINKS.reduce((acc, l) => {
      return claimedLinkIds.includes(l.id) ? acc + l.diceAmount : acc;
    }, 0);
  }, [claimedLinkIds]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-zinc-900 border border-red-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
              Scopely Official Verified Links
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Gift className="w-6 h-6 text-red-400" />
              Monopoly GO Verified Free Dice Links
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Claim daily active free dice links for Monopoly GO and track claimed links across your accounts.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Dice Claimed Today</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {totalClaimedDice} Dice
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Dice Links List */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Active Verified Free Dice Links ({SAMPLE_DICE_LINKS.length})
        </h3>

        <div className="space-y-3">
          {SAMPLE_DICE_LINKS.map(item => {
            const isClaimed = claimedLinkIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                  isClaimed
                    ? 'bg-zinc-950/40 border-zinc-800/80 opacity-60'
                    : 'bg-zinc-950/80 border-red-500/40 shadow-md shadow-red-950/10'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{item.title}</span>
                    {item.isVerified && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                        VERIFIED
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono">
                    Added: {item.dateAdded} {item.bonusPack ? `• Bonus: ${item.bonusPack}` : ''}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isClaimed}
                      onChange={() => toggleClaimed(item.id)}
                      className="w-4 h-4 accent-red-500"
                    />
                    <span>{isClaimed ? 'Claimed' : 'Mark Claimed'}</span>
                  </label>

                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (!isClaimed) toggleClaimed(item.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                      isClaimed
                        ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        : 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-950/20'
                    }`}
                  >
                    <span>Claim {item.diceAmount} Dice</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
