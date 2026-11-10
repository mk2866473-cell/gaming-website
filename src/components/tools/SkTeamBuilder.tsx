/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Users, Plus, X } from 'lucide-react';

export default function SkTeamBuilder() {
  const [team, setTeam] = useState<(string | null)[]>(Array(5).fill(null));
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const heroPool = [
    { name: 'Rudy', type: 'Defense', element: 'Light' },
    { name: 'Eileene', type: 'Universal', element: 'Fire' },
    { name: 'Rachel', type: 'Offense', element: 'Fire' },
    { name: 'Dellons', type: 'Offense', element: 'Dark' },
    { name: 'Jave', type: 'Universal', element: 'Fire' },
    { name: 'Spike', type: 'Universal', element: 'Ice' },
    { name: 'Kris', type: 'Offense', element: 'Dark' },
    { name: 'Karin', type: 'Support', element: 'Light' },
    { name: 'Evan', type: 'Defense', element: 'Light' },
    { name: 'Lene', type: 'Offense', element: 'Water' },
  ];

  const handleSetHero = (heroName: string) => {
    if (editingIndex === null) return;
    const newTeam = [...team];
    newTeam[editingIndex] = heroName;
    setTeam(newTeam);
    setEditingIndex(null);
  };

  const clearSlot = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTeam = [...team];
    newTeam[index] = null;
    setTeam(newTeam);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-zinc-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
            <Users className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">5v5 Tactical Team Builder</h2>
            <p className="text-xs text-zinc-400">Design and optimize your squad for Arena and Raid content.</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {team.map((hero, i) => (
            <div 
              key={i} 
              onClick={() => setEditingIndex(i)} 
              className={`relative aspect-square rounded-2xl border-2 transition-all cursor-pointer group flex flex-col items-center justify-center ${
                editingIndex === i 
                  ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                  : hero 
                    ? 'bg-zinc-900 border-zinc-700 hover:border-blue-500/50' 
                    : 'bg-[#090d16] border-dashed border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {hero ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-2 shadow-inner">
                    <span className="text-lg font-black text-white">{hero[0]}</span>
                  </div>
                  <div className="text-[10px] font-black text-white uppercase tracking-tighter text-center px-2 truncate w-full">{hero}</div>
                  <button 
                    onClick={(e) => clearSlot(i, e)} 
                    className="absolute -top-2 -right-2 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-rose-900 rounded-full p-1.5 transition-colors shadow-lg"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-8 h-8 text-zinc-600 group-hover:text-blue-500" />
                  <span className="text-[10px] font-bold text-zinc-500 group-hover:text-blue-400">SELECT HERO</span>
                </div>
              )}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[8px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                POS {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingIndex !== null && (
        <div className="bg-[#090d16] border border-blue-500/30 p-6 rounded-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-500 rounded-full" />
              Choose Hero for Position {editingIndex + 1}
            </h3>
            <button onClick={() => setEditingIndex(null)} className="text-zinc-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {heroPool.map(hero => (
              <button 
                key={hero.name} 
                onClick={() => handleSetHero(hero.name)}
                className="flex flex-col items-center gap-2 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl hover:bg-blue-600 hover:border-blue-500 group transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-blue-700">
                  <span className="font-black">{hero.name[0]}</span>
                </div>
                <div className="text-[10px] font-bold text-zinc-300 group-hover:text-white">{hero.name}</div>
                <div className="text-[8px] text-zinc-500 group-hover:text-blue-100 uppercase tracking-tighter">{hero.type}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
        <p className="text-[10px] text-blue-200/60 leading-relaxed text-center">
          <strong>Tip:</strong> Balance your team with at least one <strong>Defense</strong> and one <strong>Support</strong> hero for high-level Raids.
        </p>
      </div>
    </div>
  );
}

