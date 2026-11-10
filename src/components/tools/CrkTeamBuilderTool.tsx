/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Users, Shield, Zap, Sparkles, Plus, Trash2, Award, Info, RefreshCw, Layers } from 'lucide-react';

interface CookieData {
  id: string;
  name: string;
  rarity: 'Ancient' | 'Beast' | 'Legendary' | 'Super Epic' | 'Epic';
  position: 'Front' | 'Middle' | 'Rear';
  classType: 'Charge' | 'Defense' | 'Ambush' | 'Magic' | 'Ranged' | 'Bomber' | 'Support' | 'Healing';
  basePower: number;
  baseAtk: number;
  baseHp: number;
  skillName: string;
  skillCdSec: number;
  description: string;
}

const COOKIE_DATABASE: CookieData[] = [
  // Front
  { id: 'hollyberry', name: 'Hollyberry Cookie', rarity: 'Ancient', position: 'Front', classType: 'Defense', basePower: 74200, baseAtk: 12400, baseHp: 185000, skillName: 'Oath on the Shield', skillCdSec: 15, description: 'Absorbs portion of damage taken by allies and stuns enemies.' },
  { id: 'pitaya', name: 'Pitaya Dragon Cookie', rarity: 'Legendary', position: 'Front', classType: 'Charge', basePower: 89500, baseAtk: 24500, baseHp: 162000, skillName: 'Draconic Flame', skillCdSec: 14, description: 'Transforms into dragon form inflicting massive area fire DMG.' },
  { id: 'financier', name: 'Financier Cookie', rarity: 'Epic', position: 'Front', classType: 'Defense', basePower: 68100, baseAtk: 11200, baseHp: 172000, skillName: 'Paladin’s Protection', skillCdSec: 13, description: 'Protects highest ATK cookie with shield, HEAL, and CRIT RES.' },
  { id: 'rebel', name: 'Rebel Cookie', rarity: 'Epic', position: 'Front', classType: 'Ambush', basePower: 82400, baseAtk: 23100, baseHp: 142000, skillName: 'Shadow Clone Decoy', skillCdSec: 12, description: 'Shreds enemy DEF% and spawns clones that draw aggro.' },
  { id: 'elder_fae', name: 'Elder Faerie Cookie', rarity: 'Super Epic', position: 'Front', classType: 'Defense', basePower: 79000, baseAtk: 15100, baseHp: 178000, skillName: 'Guardian Banner', skillCdSec: 14, description: 'Taunts enemies and grants Prism Shield to whole party.' },

  // Middle
  { id: 'frost_queen', name: 'Frost Queen Cookie', rarity: 'Legendary', position: 'Middle', classType: 'Magic', basePower: 92100, baseAtk: 29400, baseHp: 128000, skillName: 'Freezing Wave', skillCdSec: 16, description: 'Freezes target team, pausing skill cooldown timers.' },
  { id: 'creme_brulee', name: 'Crème Brûlée Cookie', rarity: 'Epic', position: 'Middle', classType: 'Ranged', basePower: 94800, baseAtk: 31200, baseHp: 115000, skillName: 'Accelerando Cadenza', skillCdSec: 11, description: 'Stacking ATK speed and piercing beam single-target obliteration.' },
  { id: 'stardust', name: 'Stardust Cookie', rarity: 'Super Epic', position: 'Middle', classType: 'Ambush', basePower: 88700, baseAtk: 27800, baseHp: 131000, skillName: 'Wrath of the Stars', skillCdSec: 13, description: 'Inflicts Sign of the Stars, blocking buffs and dealing sleep DMG.' },
  { id: 'captain_caviar', name: 'Captain Caviar Cookie', rarity: 'Epic', position: 'Middle', classType: 'Bomber', basePower: 86300, baseAtk: 28500, baseHp: 122000, skillName: 'Black Shark Torpedoes', skillCdSec: 13, description: 'Launches torpedoes reducing enemy DEF by up to 40%.' },
  { id: 'golden_cheese', name: 'Golden Cheese Cookie', rarity: 'Ancient', position: 'Middle', classType: 'Ranged', basePower: 96200, baseAtk: 32500, baseHp: 124000, skillName: 'Spear of Radiance', skillCdSec: 14, description: 'Multi-hit spear barrage with invincibility revival passive.' },

  // Rear
  { id: 'pure_vanilla', name: 'Pure Vanilla Cookie', rarity: 'Ancient', position: 'Rear', classType: 'Healing', basePower: 65400, baseAtk: 10800, baseHp: 148000, skillName: 'Love & Peace', skillCdSec: 15, description: 'Massive burst heal + HP shield equal to % of Max HP.' },
  { id: 'snapdragon', name: 'Snapdragon Cookie', rarity: 'Special' as any, position: 'Rear', classType: 'Support', basePower: 69200, baseAtk: 11400, baseHp: 155000, skillName: 'Arcane Blossom', skillCdSec: 12, description: 'Invulnerable support cookie granting ATK, DEF, Stun Res & Shields.' },
  { id: 'parfait', name: 'Parfait Cookie', rarity: 'Epic', position: 'Rear', classType: 'Support', basePower: 64100, baseAtk: 9900, baseHp: 142000, skillName: 'You Can Do It!', skillCdSec: 13, description: 'Heals team, boosts DEF%, and provides Debuff Resistance.' },
  { id: 'mystic_flour', name: 'Mystic Flour Cookie', rarity: 'Beast', position: 'Rear', classType: 'Healing', basePower: 98500, baseAtk: 18400, baseHp: 169000, skillName: 'Realm of Apathy', skillCdSec: 14, description: 'Reduces enemy attack speed & resets ally skill timers.' },
  { id: 'icicle_yeti', name: 'Icicle Yeti Cookie', rarity: 'Special' as any, position: 'Rear', classType: 'Defense', basePower: 71000, baseAtk: 10200, baseHp: 176000, skillName: 'Yeti’s Warm Hug', skillCdSec: 12, description: 'Becomes invulnerable, shields lowest HP ally & boosts Ice DMG.' }
];

interface Treasure {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic';
  atkBonus: number; // percentage
  cdBonus: number; // percentage
  desc: string;
}

const TREASURES: Treasure[] = [
  { id: 'watch_common', name: 'Squishy Jelly Watch', rarity: 'Common', atkBonus: 0, cdBonus: 25.4, desc: 'Decreases Cooldown of all Cookies by up to 25.4%.' },
  { id: 'watch_epic', name: 'Sleepy Jelly Watch', rarity: 'Epic', atkBonus: 9, cdBonus: 25.4, desc: 'Decreases Cooldown by 25.4% and increases ATK by 9%.' },
  { id: 'scroll_epic', name: 'Old Pilgrim’s Scroll', rarity: 'Epic', atkBonus: 59.7, cdBonus: 0, desc: 'Increases ATK of all Cookies by up to 59.7%.' },
  { id: 'whistle', name: 'Dreamy Conductor’s Whistle', rarity: 'Epic', atkBonus: 15, cdBonus: 0, desc: 'Increases CRIT % and boosts 2 highest ATK cookies by +20% ATK.' },
  { id: 'feather', name: 'Sugar Swan’s Shining Feather', rarity: 'Epic', atkBonus: 0, cdBonus: 0, desc: 'Revives the first fallen Cookie with 100% HP & reset CD.' },
  { id: 'monocle', name: 'Bookseller’s Monocle', rarity: 'Epic', atkBonus: 0, cdBonus: 0, desc: 'Removes all debuffs and restores 30% HP for whole team.' }
];

const META_PRESETS = [
  {
    name: 'Frost Queen Triple Ice Blitz',
    desc: 'High Arena burst control comp utilizing Frost Queen & Icicle Yeti freeze lock.',
    cookies: ['elder_fae', 'frost_queen', 'stardust', 'icicle_yeti', 'snapdragon'],
    treasures: ['watch_epic', 'scroll_epic', 'whistle']
  },
  {
    name: 'Crème Brûlée Speed Shredder',
    desc: 'Single-target melt composition destroying enemy tanks in 5 seconds.',
    cookies: ['financier', 'rebel', 'creme_brulee', 'snapdragon', 'pure_vanilla'],
    treasures: ['watch_common', 'scroll_epic', 'whistle']
  },
  {
    name: 'Mystic Flour Stall & Reset',
    desc: 'Ultra-defensive Beast tier stall deck with infinite shields and cooldown resets.',
    cookies: ['hollyberry', 'elder_fae', 'golden_cheese', 'mystic_flour', 'snapdragon'],
    treasures: ['watch_epic', 'scroll_epic', 'monocle']
  }
];

export default function CrkTeamBuilderTool() {
  const [selectedCookies, setSelectedCookies] = useState<(CookieData | null)[]>([
    COOKIE_DATABASE[0], // Hollyberry
    COOKIE_DATABASE[5], // Frost Queen
    COOKIE_DATABASE[6], // Creme Brulee
    COOKIE_DATABASE[10], // Pure Vanilla
    COOKIE_DATABASE[11]  // Snapdragon
  ]);

  const [selectedTreasures, setSelectedTreasures] = useState<(Treasure | null)[]>([
    TREASURES[1], // Epic Watch
    TREASURES[2], // Scroll
    TREASURES[3]  // Whistle
  ]);

  const [filterRarity, setFilterRarity] = useState<string>('All');
  const [filterPos, setFilterPos] = useState<string>('All');

  const filteredCookies = useMemo(() => {
    return COOKIE_DATABASE.filter(c => {
      if (filterRarity !== 'All' && c.rarity !== filterRarity) return false;
      if (filterPos !== 'All' && c.position !== filterPos) return false;
      return true;
    });
  }, [filterRarity, filterPos]);

  // Calculations
  const stats = useMemo(() => {
    let totalBasePower = 0;
    let totalBaseAtk = 0;
    let totalBaseHp = 0;
    let activeCookiesCount = 0;

    selectedCookies.forEach(c => {
      if (c) {
        totalBasePower += c.basePower;
        totalBaseAtk += c.baseAtk;
        totalBaseHp += c.baseHp;
        activeCookiesCount++;
      }
    });

    let totalTreasureAtkBonus = 0;
    let totalTreasureCdBonus = 0;

    selectedTreasures.forEach(t => {
      if (t) {
        totalTreasureAtkBonus += t.atkBonus;
        totalTreasureCdBonus += t.cdBonus;
      }
    });

    const finalAtk = Math.round(totalBaseAtk * (1 + totalTreasureAtkBonus / 100));
    const finalPower = Math.round(totalBasePower * (1 + totalTreasureAtkBonus / 120));

    return {
      activeCookiesCount,
      totalBasePower,
      finalPower,
      totalBaseAtk,
      finalAtk,
      totalBaseHp,
      treasureAtk: totalTreasureAtkBonus,
      treasureCd: totalTreasureCdBonus
    };
  }, [selectedCookies, selectedTreasures]);

  const handleSelectCookieSlot = (index: number, cookie: CookieData | null) => {
    const updated = [...selectedCookies];
    updated[index] = cookie;
    setSelectedCookies(updated);
  };

  const handleSelectTreasureSlot = (index: number, treasure: Treasure | null) => {
    const updated = [...selectedTreasures];
    updated[index] = treasure;
    setSelectedTreasures(updated);
  };

  const loadPreset = (preset: typeof META_PRESETS[0]) => {
    const newCookies = preset.cookies.map(id => COOKIE_DATABASE.find(c => c.id === id) || null);
    const newTreasures = preset.treasures.map(id => TREASURES.find(t => t.id === id) || null);
    setSelectedCookies(newCookies);
    setSelectedTreasures(newTreasures);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/80">
                CRK ARENA & PVE ENGINE
              </span>
            </div>
              <span className="text-xs text-amber-200/70">Patch v5.2 Ready</span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-amber-400" />
              Cookie Run: Kingdom Team Builder
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Select 5 Cookies & 3 Treasures to calculate team synergy, total combat power, and skill cooldown timing.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Total Combat Power</div>
              <div className="text-2xl font-black text-amber-400">
                {stats.finalPower.toLocaleString()}
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">Team ATK / CD Buff</div>
              <div className="text-sm font-bold text-emerald-400">
                +{stats.treasureAtk}% ATK / +{stats.treasureCd}% CD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Meta Teams */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          Load Meta Compositions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {META_PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => loadPreset(p)}
              className="text-left bg-zinc-950/60 hover:bg-amber-950/30 border border-zinc-800 hover:border-amber-500/40 p-3 rounded-lg transition-all"
            >
              <div className="text-sm font-bold text-white flex items-center justify-between">
                <span>{p.name}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 5 Cookie Team Roster */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            Active Cookie Roster (5 Slots)
          </span>
          <span className="text-xs font-normal text-zinc-400">
            {stats.activeCookiesCount} / 5 Cookies Deployed
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[0, 1, 2, 3, 4].map(slotIdx => {
            const cookie = selectedCookies[slotIdx];
            const positionLabel = slotIdx === 0 || slotIdx === 1 ? 'Front' : slotIdx === 2 || slotIdx === 3 ? 'Middle' : 'Rear';

            return (
              <div
                key={slotIdx}
                className={`relative bg-zinc-950/80 border rounded-xl p-3.5 transition-all flex flex-col justify-between min-h-[220px] ${
                  cookie ? 'border-amber-500/40 shadow-lg shadow-amber-950/20' : 'border-dashed border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-zinc-500 font-mono">Slot {slotIdx + 1}</span>
                  <span className="text-amber-400 font-bold uppercase tracking-tight text-[10px] border border-amber-500/20 px-1.5 py-0.5">
                    {cookie ? cookie.position : positionLabel}
                  </span>
                </div>

                {cookie ? (
                  <div className="space-y-2 my-auto text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-amber-500/30 to-amber-900/40 border border-amber-400/50 flex items-center justify-center font-bold text-amber-200 text-lg shadow-md">
                      {cookie.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white line-clamp-1">{cookie.name}</div>
                      <div className="text-[11px] text-amber-400/80 font-medium">
                        {cookie.rarity} • {cookie.classType}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-zinc-300 bg-zinc-900/80 py-1 rounded border border-zinc-800">
                      ⚡ {cookie.basePower.toLocaleString()} PWR
                    </div>
                  </div>
                ) : (
                  <div className="my-auto text-center py-6">
                    <div className="w-12 h-12 mx-auto rounded-full border border-dashed border-zinc-700 flex items-center justify-center text-zinc-600 mb-2">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div className="text-xs text-zinc-500">Empty Slot</div>
                  </div>
                )}

                <div className="mt-2 pt-2 border-t border-zinc-900 flex items-center gap-1">
                  <select
                    value={cookie?.id || ''}
                    onChange={e => {
                      const found = COOKIE_DATABASE.find(c => c.id === e.target.value) || null;
                      handleSelectCookieSlot(slotIdx, found);
                    }}
                    className="w-full bg-zinc-900 text-xs text-zinc-200 border border-zinc-800 rounded px-2 py-1 focus:border-amber-500 outline-none"
                  >
                    <option value="">-- Choose Cookie --</option>
                    {COOKIE_DATABASE.map(c => (
                      <option key={c.id} value={c.id}>
                        [{c.position}] {c.name} ({c.rarity})
                      </option>
                    ))}
                  </select>
                  {cookie && (
                    <button
                      onClick={() => handleSelectCookieSlot(slotIdx, null)}
                      className="p-1 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded"
                      title="Clear slot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Treasures Section */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Equipped Treasures (3 Slots)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map(tSlot => {
            const treasure = selectedTreasures[tSlot];

            return (
              <div key={tSlot} className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-500 font-mono">Treasure #{tSlot + 1}</span>
                    {treasure && (
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-tight">
                        {treasure.rarity}
                      </span>
                    )}
                  </div>
                  {treasure ? (
                    <div>
                      <div className="text-sm font-bold text-white">{treasure.name}</div>
                      <p className="text-xs text-zinc-400 mt-1">{treasure.desc}</p>
                    </div>
                  ) : (
                    <div className="text-xs text-zinc-500 py-3">No Treasure Equipped</div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900">
                  <select
                    value={treasure?.id || ''}
                    onChange={e => {
                      const found = TREASURES.find(t => t.id === e.target.value) || null;
                      handleSelectTreasureSlot(tSlot, found);
                    }}
                    className="w-full bg-zinc-900 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
                  >
                    <option value="">-- Select Treasure --</option>
                    {TREASURES.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.rarity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filterable Cookie Explorer Database */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Available Cookies Library ({filteredCookies.length})
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={filterRarity}
              onChange={e => setFilterRarity(e.target.value)}
              className="bg-zinc-950 text-xs text-zinc-300 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
            >
              <option value="All">All Rarities</option>
              <option value="Beast">Beast</option>
              <option value="Ancient">Ancient</option>
              <option value="Legendary">Legendary</option>
              <option value="Super Epic">Super Epic</option>
              <option value="Epic">Epic</option>
            </select>

            <select
              value={filterPos}
              onChange={e => setFilterPos(e.target.value)}
              className="bg-zinc-950 text-xs text-zinc-300 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
            >
              <option value="All">All Positions</option>
              <option value="Front">Front</option>
              <option value="Middle">Middle</option>
              <option value="Rear">Rear</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCookies.map(c => {
            const isDeployed = selectedCookies.some(sc => sc?.id === c.id);

            return (
              <div
                key={c.id}
                className={`bg-zinc-950/80 border p-3.5 rounded-lg flex flex-col justify-between ${
                  isDeployed ? 'border-amber-500/50 bg-amber-950/10' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-300">{c.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 border border-zinc-800 text-zinc-400 uppercase tracking-tighter">
                      {c.position} • {c.classType}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono mb-2">
                    Base PWR: {c.basePower.toLocaleString()} | Base CD: {c.skillCdSec}s
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    <strong className="text-amber-400/90">{c.skillName}:</strong> {c.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-900 flex justify-end">
                  {isDeployed ? (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> Deployed in Team
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        const emptyIdx = selectedCookies.findIndex(sc => sc === null);
                        const targetIdx = emptyIdx !== -1 ? emptyIdx : 0;
                        handleSelectCookieSlot(targetIdx, c);
                      }}
                      className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded transition-colors"
                    >
                      + Add to Team
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
