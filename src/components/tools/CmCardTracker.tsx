/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Check, Filter } from 'lucide-react';

export default function CmCardTracker() {
  const [search, setSearch] = useState('');
  const [ownedCards, setOwnedCards] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('cm-owned-cards');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('cm-owned-cards', JSON.stringify(ownedCards));
  }, [ownedCards]);

  const cardSets = [
    { name: 'Statues', cards: ['Zeus', 'Hera', 'Poseidon', 'Athena', 'Ares', 'Apollo', 'Artemis', 'Hades', 'Hermes'], reward: '250 Spins' },
    { name: 'Beasts', cards: ['Lion', 'Tiger', 'Bear', 'Wolf', 'Eagle', 'Shark', 'Snake', 'Monkey', 'Panda'], reward: '400 Spins' },
    { name: 'Items', cards: ['Sword', 'Shield', 'Helmet', 'Boots', 'Ring', 'Cape', 'Map', 'Compass', 'Torch'], reward: '600 Spins' },
    { name: 'Sweets', cards: ['Cake', 'Candy', 'Donut', 'Cookie', 'Pie', 'Ice Cream', 'Honey', 'Jam', 'Muffin'], reward: '800 Spins' },
    { name: 'Space', cards: ['Mars', 'Venus', 'Saturn', 'Jupiter', 'Sun', 'Moon', 'Earth', 'Rocket', 'Alien'], reward: '1,200 Spins' },
  ];

  const toggleCard = (card: string) => {
    setOwnedCards(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  const getProgress = (cards: string[]) => {
    const owned = cards.filter(c => ownedCards[c]).length;
    return Math.floor((owned / cards.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Card Set Tracker</h2>
            <p className="text-xs text-zinc-400">Track your collection progress and missing gold cards.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search sets or card names..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#090d16] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
          />
        </div>
        <button 
          onClick={() => {
            if (confirm('Clear all tracked cards?')) setOwnedCards({});
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-rose-400 hover:border-rose-500/30 transition-all"
        >
          <span>Reset All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardSets.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.cards.some(c => c.toLowerCase().includes(search.toLowerCase()))).map((set) => {
          const progress = getProgress(set.cards);
          return (
            <div key={set.name} className="bg-[#090d16] border border-zinc-800 rounded-xl p-5 space-y-4 hover:border-amber-500/20 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">{set.name} Set</h3>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Reward: <span className="text-amber-500">{set.reward}</span></div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-amber-400 font-mono">{progress}%</div>
                  <div className="w-20 bg-zinc-900 h-1 rounded-full mt-1 overflow-hidden border border-zinc-800">
                    <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {set.cards.map(card => {
                  const isOwned = ownedCards[card];
                  return (
                    <button 
                      key={card} 
                      onClick={() => toggleCard(card)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                        isOwned 
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                      }`}
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                        isOwned ? 'bg-emerald-500 border-emerald-500' : 'bg-zinc-900 border-zinc-700'
                      }`}>
                        {isOwned && <Check className="w-2.5 h-2.5 text-black stroke-[4]" />}
                      </div>
                      <span className="text-[9px] font-bold truncate w-full">{card}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

