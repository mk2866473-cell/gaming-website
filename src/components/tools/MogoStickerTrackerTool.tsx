/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sparkles, Layers, Check, Plus, Trash2, Shield, Award, Info, Lock } from 'lucide-react';

interface StickerItem {
  id: string;
  name: string;
  setId: number;
  setName: string;
  starRating: number;
  isGold: boolean;
}

const ALBUM_SETS = [
  { id: 1, name: 'First Try', maxCards: 9 },
  { id: 2, name: 'Musical Journey', maxCards: 9 },
  { id: 3, name: 'Boardwalk Fun', maxCards: 9 },
  { id: 4, name: 'Wheel Spin Legends', maxCards: 9 },
  { id: 5, name: 'High Roller Empire', maxCards: 9 }
];

const SAMPLE_STICKERS: StickerItem[] = [
  { id: 's1_1', name: 'Dice Roll', setId: 1, setName: 'First Try', starRating: 1, isGold: false },
  { id: 's1_2', name: 'Thimble', setId: 1, setName: 'First Try', starRating: 1, isGold: false },
  { id: 's1_3', name: 'Community Chest', setId: 1, setName: 'First Try', starRating: 2, isGold: false },
  { id: 's2_1', name: 'Melody Note', setId: 2, setName: 'Musical Journey', starRating: 2, isGold: false },
  { id: 's2_2', name: 'Saxophone', setId: 2, setName: 'Musical Journey', starRating: 3, isGold: false },
  { id: 's2_3', name: 'Golden Violin', setId: 2, setName: 'Musical Journey', starRating: 4, isGold: true },
  { id: 's3_1', name: 'Boardwalk Walk', setId: 3, setName: 'Boardwalk Fun', starRating: 4, isGold: false },
  { id: 's3_2', name: 'Spot Rebel', setId: 3, setName: 'Boardwalk Fun', starRating: 5, isGold: false },
  { id: 's3_3', name: 'Golden Board', setId: 3, setName: 'Boardwalk Fun', starRating: 5, isGold: true }
];

export default function MogoStickerTrackerTool() {
  const [ownedStickers, setOwnedStickers] = useState<Record<string, number>>({
    s1_1: 3, // 1 main + 2 dupes
    s1_2: 1,
    s2_1: 2, // 1 main + 1 dupe
    s3_2: 1
  });

  const [selectedSetFilter, setSelectedSetFilter] = useState<number>(0); // 0 = all sets

  const stats = useMemo(() => {
    let totalCardsOwned = 0;
    let totalDuplicates = 0;
    let totalVaultStars = 0;

    SAMPLE_STICKERS.forEach(s => {
      const count = ownedStickers[s.id] || 0;
      if (count > 0) {
        totalCardsOwned++;
        const dupes = count - 1;
        if (dupes > 0) {
          totalDuplicates += dupes;
          // Gold stickers yield 2x star value
          const starMultiplier = s.isGold ? 2 : 1;
          totalVaultStars += dupes * s.starRating * starMultiplier;
        }
      }
    });

    const totalStickersInAlbum = SAMPLE_STICKERS.length;
    const completionPercent = Math.round((totalCardsOwned / totalStickersInAlbum) * 100);

    return {
      totalCardsOwned,
      totalStickersInAlbum,
      completionPercent,
      totalDuplicates,
      totalVaultStars,
      starsTo800Vault: Math.max(0, 800 - totalVaultStars)
    };
  }, [ownedStickers]);

  const toggleSticker = (id: string, delta: number) => {
    setOwnedStickers(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const filteredStickers = useMemo(() => {
    if (selectedSetFilter === 0) return SAMPLE_STICKERS;
    return SAMPLE_STICKERS.filter(s => s.setId === selectedSetFilter);
  }, [selectedSetFilter]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-zinc-900 border border-red-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400 font-mono">
                MONOPOLY GO ALBUM & VAULT ENGINE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Award className="w-6 h-6 text-red-400" />
              Monopoly GO Sticker & Duplicate Vault Tracker
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Track owned album stickers, duplicate star value for the 800-Star Vault, and flag tradeable cards.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Vault Stars Stored</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {stats.totalVaultStars} / 800 Stars
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">Album Completion</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {stats.completionPercent}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vault Progress Bar */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-zinc-300 font-medium">800-Star Wild Sticker Vault Progress</span>
          <span className="text-amber-400 font-mono font-bold">
            {stats.starsTo800Vault === 0 ? 'READY TO OPEN!' : `${stats.starsTo800Vault} stars needed`}
          </span>
        </div>
        <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
            style={{ width: `${Math.min(100, (stats.totalVaultStars / 800) * 100)}%` }}
          />
        </div>
      </div>

      {/* Sticker Filter Controls */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-red-400" />
          <span>Filter Album Set:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedSetFilter(0)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedSetFilter === 0 ? 'bg-red-500 text-white font-bold' : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
            }`}
          >
            All Sets
          </button>
          {ALBUM_SETS.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSetFilter(s.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSetFilter === s.id ? 'bg-red-500 text-white font-bold' : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
              }`}
            >
              Set {s.id}: {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sticker Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStickers.map(st => {
          const count = ownedStickers[st.id] || 0;
          const isOwned = count > 0;
          const dupes = Math.max(0, count - 1);

          return (
            <div
              key={st.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                isOwned
                  ? 'bg-zinc-950/80 border-red-500/40 shadow-md shadow-red-950/10'
                  : 'bg-zinc-950/40 border-zinc-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-400">Set {st.setId}: {st.setName}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-950/40 border border-amber-500/30 px-1.5 py-0.5 rounded">
                      Tier {st.starRating} ({st.starRating}★)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>{st.name}</span>
                    {st.isGold && (
                      <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-tight">
                        GOLD
                      </span>
                    )}
                  </div>

                  {isOwned && (
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-tight">
                      OWNED ({count}X)
                    </span>
                  )}
                </div>

                {dupes > 0 && (
                  <div className="text-xs text-amber-300 font-mono mt-1">
                    +{dupes} Duplicates ({dupes * st.starRating * (st.isGold ? 2 : 1)} Vault Stars)
                  </div>
                )}
              </div>

              <div className="mt-4 pt-2 border-t border-zinc-900 flex items-center justify-between">
                <button
                  onClick={() => toggleSticker(st.id, -1)}
                  className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center text-sm"
                >
                  -
                </button>
                <span className="text-xs font-mono font-bold text-zinc-300">
                  {count} Copies
                </span>
                <button
                  onClick={() => toggleSticker(st.id, 1)}
                  className="w-8 h-8 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold flex items-center justify-center text-sm"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
