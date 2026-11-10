/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Users, Shield, Zap, Sparkles, Award, Trash2, Plus, Layers } from 'lucide-react';

interface HeroData {
  id: string;
  name: string;
  faction: 'Lightbearer' | 'Mauler' | 'Wilder' | 'Graveborn' | 'Celestial' | 'Hypogean';
  role: 'Tank' | 'Warrior' | 'Rogue' | 'Mage' | 'Marksman' | 'Support';
  power: number;
  description: string;
}

const HERO_HEROES: HeroData[] = [
  // Graveborn
  { id: 'thoran', name: 'Thoran', faction: 'Graveborn', role: 'Tank', power: 78000, description: 'King of Resurrection. Absorbs massive damage with Soul Retaliation.' },
  { id: 'carolina', name: 'Carolina', faction: 'Graveborn', role: 'Mage', power: 84000, description: 'Frost Mage that freezes enemies pulled by Eironn.' },
  { id: 'cecia', name: 'Cecia', faction: 'Graveborn', role: 'Marksman', power: 82000, description: 'Summons Mr. Carlyle golem to entangle enemy backline.' },
  { id: 'viperian', name: 'Viperian', faction: 'Graveborn', role: 'Mage', power: 79000, description: 'Drains energy and inflicts persistent dark magic ticks.' },

  // Wilder
  { id: 'eironn', name: 'Eironn', faction: 'Wilder', role: 'Rogue', power: 89000, description: 'Meta initiator. Instantly pulls enemy team together at battle start.' },
  { id: 'arden', name: 'Arden', faction: 'Wilder', role: 'Mage', power: 76000, description: 'A-level CC god. Entangles 3 enemies with vines perpetually.' },
  { id: 'hewynn', name: 'Hewynn', faction: 'Wilder', role: 'Support', power: 72000, description: 'Global burst healer with massive damage reduction ultimate.' },
  { id: 'florabelle', name: 'Florabelle', faction: 'Wilder', role: 'Mage', power: 81000, description: 'Summons 3 sprightly forest minions that shield allies.' },

  // Lightbearer
  { id: 'rowan', name: 'Rowan', faction: 'Lightbearer', role: 'Support', power: 74000, description: 'Energy battery. Drops health potions and grants instant ultimate energy.' },
  { id: 'korin', name: 'Korin', faction: 'Lightbearer', role: 'Warrior', power: 80000, description: 'Melee barrier generator and Dream Realm single-target true DPS.' },
  { id: 'lucius', name: 'Lucius', faction: 'Lightbearer', role: 'Tank', power: 75000, description: 'Divine shield generator that protects frontliners.' },

  // Mauler
  { id: 'smokey', name: 'Smokey & Meerky', faction: 'Mauler', role: 'Support', power: 85000, description: 'S-Tier healer & ATK/ATK SPD buffer with infinite aroma aura.' },
  { id: 'koko', name: 'Koko', faction: 'Mauler', role: 'Support', power: 77000, description: 'Reduces team damage taken by 45% and grants massive shields.' },
  { id: 'odie', name: 'Odie', faction: 'Mauler', role: 'Marksman', power: 88000, description: 'Single-target sniper that instantly executes enemies below % HP.' },

  // Celestial / Hypogean
  { id: 'reinier', name: 'Reinier', faction: 'Hypogean', role: 'Support', power: 92000, description: 'Swaps enemy carry to your side and amplifies damage taken by 25%.' },
  { id: 'scarlita', name: 'Scarlita', faction: 'Celestial', role: 'Warrior', power: 94000, description: 'Descends from the sky with invulnerability execute strikes.' }
];

export default function AfkjTeamBuilderTool() {
  const [selectedTeam, setSelectedTeam] = useState<(HeroData | null)[]>([
    HERO_HEROES[4], // Eironn
    HERO_HEROES[1], // Carolina
    HERO_HEROES[5], // Arden
    HERO_HEROES[0], // Thoran
    HERO_HEROES[11] // Smokey
  ]);

  const [selectedArtifact, setSelectedArtifact] = useState<string>('Starshard Spell');

  // Calculations
  const teamAnalysis = useMemo(() => {
    let totalPower = 0;
    const factionCountMap: Record<string, number> = {};

    selectedTeam.forEach(h => {
      if (h) {
        totalPower += h.power;
        factionCountMap[h.faction] = (factionCountMap[h.faction] || 0) + 1;
      }
    });

    // Determine Faction Synergy Buff
    // 3 Same = +10% | 3+2 = +15% | 4 Same = +18% | 5 Same = +22%
    let synergyBuffPercent = 0;
    const counts = Object.values(factionCountMap).sort((a, b) => b - a);

    if (counts[0] >= 5) synergyBuffPercent = 22;
    else if (counts[0] >= 4) synergyBuffPercent = 18;
    else if (counts[0] >= 3 && counts[1] >= 2) synergyBuffPercent = 15;
    else if (counts[0] >= 3) synergyBuffPercent = 10;

    const boostedPower = Math.round(totalPower * (1 + synergyBuffPercent / 100));

    return {
      totalPower,
      boostedPower,
      synergyBuffPercent,
      factionCountMap
    };
  }, [selectedTeam]);

  const handleSelectSlot = (slotIdx: number, hero: HeroData | null) => {
    const updated = [...selectedTeam];
    updated[slotIdx] = hero;
    setSelectedTeam(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-zinc-900 border border-purple-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500/80">
                5V5 BATTLE GRID SIMULATOR
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Users className="w-6 h-6 text-purple-400" />
              AFK Journey 5v5 Tactical Grid Team Builder
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Build tactical 5v5 team lineups, test faction synergy buffs (+10% to +22% HP/ATK), and pair Artifact Spells.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Total Combat Power</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {teamAnalysis.boostedPower.toLocaleString()}
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">Faction Synergy</div>
              <div className="text-sm font-bold text-emerald-400">
                +{teamAnalysis.synergyBuffPercent}% HP & ATK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Hero Active Grid */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            Deployed 5-Hero Lineup
          </span>
          <select
            value={selectedArtifact}
            onChange={e => setSelectedArtifact(e.target.value)}
            className="bg-zinc-950 text-xs text-amber-300 font-semibold border border-zinc-800 rounded px-2.5 py-1 focus:border-purple-500 outline-none"
          >
            <option value="Starshard Spell">Starshard Spell (Burst DMG)</option>
            <option value="Evocation Spell">Evocation Spell (Energy Speed)</option>
            <option value="Crescent Spell">Crescent Spell (Magic Def Shred)</option>
            <option value="Ironwall Spell">Ironwall Spell (Shield Bulk)</option>
          </select>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[0, 1, 2, 3, 4].map(slotIdx => {
            const hero = selectedTeam[slotIdx];

            return (
              <div
                key={slotIdx}
                className={`bg-zinc-950/80 border p-3.5 rounded-xl flex flex-col justify-between min-h-[190px] ${
                  hero ? 'border-purple-500/40 shadow-md shadow-purple-950/20' : 'border-dashed border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-zinc-500 font-mono">Tile #{slotIdx + 1}</span>
                  {hero && (
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-tight border border-purple-500/20 px-1.5 py-0.5">
                      {hero.faction}
                    </span>
                  )}
                </div>

                {hero ? (
                  <div className="my-auto space-y-1 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-purple-950/50 border border-purple-400/50 flex items-center justify-center font-bold text-purple-200 text-base shadow-sm">
                      {hero.name.charAt(0)}
                    </div>
                    <div className="text-sm font-bold text-white line-clamp-1">{hero.name}</div>
                    <div className="text-[11px] text-amber-400 font-medium">{hero.role}</div>
                  </div>
                ) : (
                  <div className="my-auto text-center py-4 text-xs text-zinc-500">Empty Tile</div>
                )}

                <div className="mt-2 pt-2 border-t border-zinc-900">
                  <select
                    value={hero?.id || ''}
                    onChange={e => {
                      const found = HERO_HEROES.find(h => h.id === e.target.value) || null;
                      handleSelectSlot(slotIdx, found);
                    }}
                    className="w-full bg-zinc-900 text-xs text-zinc-200 border border-zinc-800 rounded px-2 py-1 focus:border-purple-500 outline-none"
                  >
                    <option value="">-- Choose Hero --</option>
                    {HERO_HEROES.map(h => (
                      <option key={h.id} value={h.id}>
                        [{h.faction}] {h.name} ({h.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
