/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Crown, Search, Filter, Shield, 
  Swords, Flame, Skull, Zap, CheckCircle2, 
  Award, Heart, AlertTriangle, ChevronRight, Users
} from 'lucide-react';

export interface OriginPassive {
  id: string;
  character: string;
  name: string;
  category: 'damage' | 'defense' | 'utility' | 'transformation';
  act: 1 | 2 | 3 | 'All';
  description: string;
  howToUnlock: string;
  metaRating: 'S-Tier' | 'A-Tier' | 'B-Tier';
  buildSynergy: string;
}

const ORIGIN_PASSIVES: OriginPassive[] = [
  // The Dark Urge
  {
    id: 'durge-deathstalker',
    character: 'The Dark Urge',
    name: 'Deathstalker Mantle',
    category: 'utility',
    act: 1,
    description: 'Equipped Cloak: Once per turn, when killing an enemy, you automatically turn Invisible for 2 turns (no Concentration required).',
    howToUnlock: 'Rewarded by butler Sceleritas Fel at camp after the unavoidable Act 1 Alfira (or Quil) incident.',
    metaRating: 'S-Tier',
    buildSynergy: 'Highest tier solo Honour Mode item. Allows Rogues, Gloomstalkers, and Monks to reset combat and repeatedly assassinate targets.'
  },
  {
    id: 'durge-slayer',
    character: 'The Dark Urge',
    name: 'The Slayer Form',
    category: 'transformation',
    act: 2,
    description: 'Transform into a 100+ HP monstrous Bhaalspawn predator with multiattack, Pounce (prone AOE), and Slay execution.',
    howToUnlock: 'Kill Isobel at Last Light Inn OR kill your romantic companion in Act 2 when commanded by your Butler.',
    metaRating: 'A-Tier',
    buildSynergy: 'Provides a free massive extra HP sponge bar in long boss fights, similar to Druid Wild Shape.'
  },
  {
    id: 'durge-bhaal-assassin',
    character: 'The Dark Urge',
    name: 'Aura of Murder (Unholy Assassin)',
    category: 'damage',
    act: 3,
    description: 'All enemies within 2m become Vulnerable to Piercing damage (take double damage from rapiers, daggers, bows, and spears!).',
    howToUnlock: 'Accept Bhaal\'s blessing from Tribunal Sarevok and defeat Orin the Red in 1v1 duel.',
    metaRating: 'S-Tier',
    buildSynergy: 'Pair with Bhaalist Armor and dual hand crossbows or Nyrulna trident for 300+ DPR piercing bursts.'
  },

  // Astarion
  {
    id: 'astarion-vampire-bite',
    character: 'Astarion',
    name: 'Vampire Bite & "Happy" Buff',
    category: 'utility',
    act: 1,
    description: 'Bite an enemy (or willing ally) as a Bonus Action to gain "Happy": +1 to all Attack Rolls, Saving Throws, and Ability Checks until Long Rest.',
    howToUnlock: 'Available innately to Astarion from Act 1 onwards.',
    metaRating: 'S-Tier',
    buildSynergy: 'A free permanent +1 on literally every combat and dialogue check in the game. Stacks with Bless and Guidance.'
  },
  {
    id: 'astarion-ascended',
    character: 'Astarion',
    name: 'Vampire Ascendant',
    category: 'damage',
    act: 3,
    description: 'Gain +1d10 Necrotic damage on ALL melee, ranged, and unarmed attacks! Bite deals 6d6 necrotic and heals 6d6 HP. Misty Escape gaseous form.',
    howToUnlock: 'Complete the Black Mass Ritual by defeating Cazador and sacrificing the 7,000 vampire spawn.',
    metaRating: 'S-Tier',
    buildSynergy: 'Hands down the single highest flat damage passive in the entire game for Open Hand Monk (applies +1d10 to every punch!).'
  },

  // Karlach
  {
    id: 'karlach-soul-coins',
    character: 'Karlach',
    name: 'Infernal Engine (Soul Coin Infusion)',
    category: 'damage',
    act: 1,
    description: 'Consume a Soul Coin to empower her heart: Melee and unarmed weapon attacks deal an additional +2d4 Fire damage when Raging or below 25% HP.',
    howToUnlock: 'Feed Soul Coins found throughout Acts 1–3 to Karlach directly from her inventory.',
    metaRating: 'A-Tier',
    buildSynergy: 'Pairs exceptionally well with Berserker Frenzy Throw or Great Weapon Master for extra elemental burst.'
  },
  {
    id: 'karlach-hellfire-res',
    character: 'Karlach',
    name: 'Tiefling Hellfire Resistance',
    category: 'defense',
    act: 'All',
    description: 'Innate 50% damage reduction against all Fire damage and resistance to burning terrain.',
    howToUnlock: 'Innate Zariel Tiefling racial feature.',
    metaRating: 'A-Tier',
    buildSynergy: 'Immunity to early game fire traps, lava in Grymforge, and Raphael\'s Hellfire bursts in the House of Hope.'
  },

  // Gale
  {
    id: 'gale-necrotic-aura',
    character: 'Gale',
    name: 'Netherese Necrotic Aura',
    category: 'damage',
    act: 1,
    description: 'Upon entering the Downed or Dead state, Gale radiates a lethal necrotic aura dealing 1d4 necrotic damage every turn to all surrounding creatures.',
    howToUnlock: 'Innate condition from the Netherese Destruction Orb lodged in his chest.',
    metaRating: 'B-Tier',
    buildSynergy: 'Can be used cheese-style by placing Gale\'s corpse near tough neutral enemies before initiating combat.'
  },
  {
    id: 'gale-karsus-orb',
    character: 'Gale',
    name: 'Netherese Orb Blast',
    category: 'transformation',
    act: 2,
    description: 'Detonate the Netherese Orb to instantly annihilate all enemies in a 100m radius (results in campaign ending).',
    howToUnlock: 'Given by Elminster on behalf of Mystra in the Mountain Pass / Shadow-Cursed Lands.',
    metaRating: 'A-Tier',
    buildSynergy: 'Can be used at the Act 2 Moonrise Elder Brain Colony to achieve a legitimate early Honour Mode victory credits roll!'
  },

  // Shadowheart
  {
    id: 'shadowheart-shar-spear',
    character: 'Shadowheart',
    name: 'Shar\'s Spear of Evening',
    category: 'defense',
    act: 2,
    description: 'Grants Blindness Immunity, +1 AC, Advantage on Saving Throws when lightly or heavily obscured, and Shar\'s Darkness cast at will.',
    howToUnlock: 'Kill the Nightsong (Dame Aylin) in the Shadowfell as commanded by Lady Shar.',
    metaRating: 'S-Tier',
    buildSynergy: 'Unlocks complete "Darkness Meta": standing inside Darkness blind-immune grants permanent Advantage to hit and enemies cannot target you with ranged attacks!'
  },
  {
    id: 'shadowheart-selune-spear',
    character: 'Shadowheart',
    name: 'Selûne\'s Spear of Night',
    category: 'utility',
    act: 2,
    description: 'Grants +3 to Wisdom Saving Throws, Advantage on Perception checks, Moonbeam spell, and Darkvision up to 24m.',
    howToUnlock: 'Spare the Nightsong in the Shadowfell and talk to Dame Aylin at camp.',
    metaRating: 'A-Tier',
    buildSynergy: 'Tremendous defensive tool for Clerics and Druids against mind-flayer mental domination spells in Act 3.'
  },

  // Lae'zel
  {
    id: 'laezel-astral-knowledge',
    character: 'Lae\'zel',
    name: 'Astral Knowledge',
    category: 'utility',
    act: 'All',
    description: 'Channel ancestral Githyanki memory to gain Proficiency in ALL 5 skills of any chosen ability score (Strength, Dex, Int, Wis, or Cha) until Long Rest!',
    howToUnlock: 'Innate Githyanki racial action.',
    metaRating: 'S-Tier',
    buildSynergy: 'Choose Wisdom or Charisma to make Lae\'zel pass almost every dialogue, perception, or survival check in the game without taking rogue levels.'
  },
  {
    id: 'laezel-silver-sword',
    character: 'Lae\'zel',
    name: 'Silver Sword of the Astral Plane Resonance',
    category: 'damage',
    act: 1,
    description: 'When wielded by Githyanki, grants +1d6 Psychic damage, Advantage on INT, WIS, and CHA saves, and absolute immunity to being Charmed or Stunned!',
    howToUnlock: 'Acquired in Act 3 from Voss in Sharess\' Caress (or disarmed from Voss in Act 1 Mountain Pass with Command Drop).',
    metaRating: 'S-Tier',
    buildSynergy: 'The premier greatsword in BG3. Completely shuts down Mind Flayer Mind Blast stuns and dominated statuses.'
  },

  // Universal Permanent Missable Buffs
  {
    id: 'universal-ethel-hair',
    character: 'Campaign Buffs',
    name: 'Auntie Ethel\'s Hair',
    category: 'utility',
    act: 1,
    description: 'Permanently increases any chosen Ability Score (STR, DEX, CON, INT, WIS, CHA) by +1.',
    howToUnlock: 'Reduce Auntie Ethel to below 20% HP in the Teatime Teahouse lair and accept her surrender bargain.',
    metaRating: 'S-Tier',
    buildSynergy: 'Allows starting with 17 in primary stat, using Ethel\'s hair to reach 18, and hitting 20 with only 1 Feat (ASI).'
  },
  {
    id: 'universal-awakened',
    character: 'Campaign Buffs',
    name: 'Awakened (Zaith\'isk Evolution)',
    category: 'utility',
    act: 1,
    description: 'Allows casting ALL Illithid Powers (Black Hole, Mind Sanctuary, Cull the Weak, Psionic Overload) as a BONUS ACTION instead of an Action!',
    howToUnlock: 'Pass 3 consecutive high-DC checks inside the Zaith\'isk chair at Crèche Y\'llek infirmary.',
    metaRating: 'S-Tier',
    buildSynergy: 'Arguably the most powerful combat buff in the entire game. Cast Black Hole as a bonus action to group 10 enemies, then Fireball them in the same turn.'
  },
  {
    id: 'universal-mirror-loss',
    character: 'Campaign Buffs',
    name: 'Mirror of Loss (+2 Stat)',
    category: 'utility',
    act: 3,
    description: 'Permanently grants +2 to ANY ability score (can push stats past the standard 20 cap up to 24!).',
    howToUnlock: 'Pass the DC 25 Religion check at the Mirror of Loss in the House of Grief, sacrificing a memory.',
    metaRating: 'S-Tier',
    buildSynergy: 'Allows hitting 24 Charisma (+7 modifier) on Sorcerers, Paladins, or Warlocks.'
  },
  {
    id: 'universal-booooal',
    character: 'Campaign Buffs',
    name: 'BOOOAL\'s Blessing',
    category: 'damage',
    act: 1,
    description: 'Grants Advantage on all Attack Rolls against bleeding targets.',
    howToUnlock: 'Sacrifice a companion (like a hireling or unneeded companion) to the Kuo-Toa fish cult in the Festering Cove (Underdark).',
    metaRating: 'A-Tier',
    buildSynergy: 'Pair with Tiger\'s Bloodlust Wildheart Barbarian, which inflicts Bleeding on 3 targets every attack.'
  }
];

export const Bg3OriginPassiveGuide: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Party Synergy Builder
  const [partyMembers, setPartyMembers] = useState<string[]>([
    'The Dark Urge', 'Astarion', 'Karlach', 'Shadowheart'
  ]);

  const characters = ['All', 'The Dark Urge', 'Astarion', 'Karlach', 'Gale', 'Shadowheart', 'Lae\'zel', 'Campaign Buffs'];

  const filteredPassives = useMemo(() => {
    return ORIGIN_PASSIVES.filter(p => {
      const matchChar = selectedCharacter === 'All' || p.character === selectedCharacter;
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchQuery = 
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.buildSynergy.toLowerCase().includes(searchQuery.toLowerCase());

      return matchChar && matchCat && matchQuery;
    });
  }, [selectedCharacter, selectedCategory, searchQuery]);

  // Toggle member in party
  const togglePartyMember = (name: string) => {
    if (partyMembers.includes(name)) {
      if (partyMembers.length <= 1) return;
      setPartyMembers(partyMembers.filter(m => m !== name));
    } else {
      if (partyMembers.length >= 4) return;
      setPartyMembers([...partyMembers, name]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" /> Origin Story Matrix
              </span>
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold rounded-full">
                Permanent Quest Buffs
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Origin Character Passive Modifier Guide
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Explore exclusive origin innate passives (Astarion's Happy & Ascendant buff, Dark Urge Deathstalker Mantle, Karlach Soul Coins) and missable campaign-wide permanent buffs (Awakened Illithid Bonus Action, Mirror of Loss +2).
            </p>
          </div>
        </div>

        {/* 4-Person Party Team Synergizer */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" /> 4-Member Party Passive Synergy Preview
            </span>
            <span className="text-[11px] text-slate-500">Pick up to 4 companions</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['The Dark Urge', 'Astarion', 'Karlach', 'Shadowheart', 'Lae\'zel', 'Gale'].map(name => {
              const isActive = partyMembers.includes(name);
              return (
                <button
                  key={name}
                  onClick={() => togglePartyMember(name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
                  {name}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-900 text-xs text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Active Party Synergies: <strong className="text-slate-200">{partyMembers.join(' + ')}</strong> combine for unmatched stealth resets, fire bursts, and high-DC mental protection.</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search passives, buffs (Deathstalker, Ascended, Awakened, Soul Coin)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Character Pills */}
        <div className="flex flex-wrap gap-1.5">
          {characters.map(char => (
            <button
              key={char}
              onClick={() => setSelectedCharacter(char)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedCharacter === char
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* Passives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPassives.map((passive) => (
          <div
            key={passive.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-all shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 uppercase tracking-wider">
                    {passive.character}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                    passive.metaRating === 'S-Tier' ? 'bg-amber-950 border border-amber-500/40 text-amber-300' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {passive.metaRating}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Act {passive.act}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-serif">{passive.name}</h3>
              </div>

              <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                {passive.category === 'damage' ? <Flame className="w-5 h-5 text-red-400" /> :
                 passive.category === 'defense' ? <Shield className="w-5 h-5 text-cyan-400" /> :
                 passive.category === 'transformation' ? <Crown className="w-5 h-5 text-purple-400" /> :
                 <Sparkles className="w-5 h-5 text-amber-400" />}
              </div>
            </div>

            {/* Description */}
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 rounded-lg p-3 border border-slate-800/80">
              {passive.description}
            </div>

            {/* Unlock requirement */}
            <div className="space-y-2 text-xs">
              <div className="text-slate-400">
                <strong className="text-amber-400">How to Obtain: </strong>
                {passive.howToUnlock}
              </div>

              <div className="text-slate-300 bg-amber-950/20 border border-amber-500/20 rounded p-2.5">
                <strong className="text-amber-300">Build Synergy & Meta: </strong>
                {passive.buildSynergy}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPassives.length === 0 && (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
          <Crown className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="font-medium">No passive modifiers found matching your query.</p>
        </div>
      )}
    </div>
  );
};
export default Bg3OriginPassiveGuide;
