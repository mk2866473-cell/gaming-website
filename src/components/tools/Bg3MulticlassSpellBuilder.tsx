/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, BookOpen, Wand2, Shield, Plus, Trash2, 
  RotateCcw, Info, CheckCircle2, AlertTriangle, Flame, 
  Zap, Award, ChevronRight, Layers, Scroll
} from 'lucide-react';

interface ClassEntry {
  className: string;
  level: number;
  subclass?: string;
}

interface ClassDef {
  name: string;
  type: 'full' | 'half' | 'third' | 'warlock' | 'none';
  primaryAbility: string;
  hitDie: string;
  subclasses: string[];
}

const BG3_CLASSES: ClassDef[] = [
  { name: 'Wizard', type: 'full', primaryAbility: 'Intelligence', hitDie: 'd6', subclasses: ['Evocation', 'Abjuration', 'Divination', 'Necromancy'] },
  { name: 'Sorcerer', type: 'full', primaryAbility: 'Charisma', hitDie: 'd6', subclasses: ['Draconic Bloodline', 'Wild Magic', 'Storm Sorcery'] },
  { name: 'Cleric', type: 'full', primaryAbility: 'Wisdom', hitDie: 'd8', subclasses: ['Life Domain', 'Light Domain', 'Tempest Domain', 'War Domain', 'Trickery Domain'] },
  { name: 'Druid', type: 'full', primaryAbility: 'Wisdom', hitDie: 'd8', subclasses: ['Circle of the Moon', 'Circle of the Land', 'Circle of Spores'] },
  { name: 'Bard', type: 'full', primaryAbility: 'Charisma', hitDie: 'd8', subclasses: ['College of Lore', 'College of Valour', 'College of Swords'] },
  { name: 'Paladin', type: 'half', primaryAbility: 'Charisma', hitDie: 'd10', subclasses: ['Oath of Devotion', 'Oath of the Ancients', 'Oath of Vengeance', 'Oathbreaker'] },
  { name: 'Ranger', type: 'half', primaryAbility: 'Wisdom', hitDie: 'd10', subclasses: ['Gloom Stalker', 'Hunter', 'Beast Master'] },
  { name: 'Fighter', type: 'third', primaryAbility: 'Strength/Dex', hitDie: 'd10', subclasses: ['Battle Master (None)', 'Champion (None)', 'Eldritch Knight (1/3 Caster)'] },
  { name: 'Rogue', type: 'third', primaryAbility: 'Dexterity', hitDie: 'd8', subclasses: ['Thief (None)', 'Assassin (None)', 'Arcane Trickster (1/3 Caster)'] },
  { name: 'Warlock', type: 'warlock', primaryAbility: 'Charisma', hitDie: 'd8', subclasses: ['The Fiend', 'The Great Old One', 'Archfey'] },
  { name: 'Barbarian', type: 'none', primaryAbility: 'Strength', hitDie: 'd12', subclasses: ['Berserker', 'Wildheart', 'Wild Magic'] },
  { name: 'Monk', type: 'none', primaryAbility: 'Dexterity/Wisdom', hitDie: 'd8', subclasses: ['Way of the Open Hand', 'Way of Shadow', 'Way of the Four Elements'] },
];

// Multiclass Spell Slot Table per Effective Caster Level (1 to 12)
const SPELL_SLOT_TABLE: Record<number, number[]> = {
  0:  [0, 0, 0, 0, 0, 0],
  1:  [2, 0, 0, 0, 0, 0],
  2:  [3, 0, 0, 0, 0, 0],
  3:  [4, 2, 0, 0, 0, 0],
  4:  [4, 3, 0, 0, 0, 0],
  5:  [4, 3, 2, 0, 0, 0],
  6:  [4, 3, 3, 0, 0, 0],
  7:  [4, 3, 3, 1, 0, 0],
  8:  [4, 3, 3, 2, 0, 0],
  9:  [4, 3, 3, 3, 1, 0],
  10: [4, 3, 3, 3, 2, 0],
  11: [4, 3, 3, 3, 2, 1],
  12: [4, 3, 3, 3, 2, 1],
};

// Warlock Pact Magic slots by Warlock level
function getWarlockSlots(warlockLevel: number): { slots: number; slotLevel: number } {
  if (warlockLevel <= 0) return { slots: 0, slotLevel: 0 };
  if (warlockLevel === 1) return { slots: 1, slotLevel: 1 };
  if (warlockLevel === 2) return { slots: 2, slotLevel: 1 };
  if (warlockLevel <= 4) return { slots: 2, slotLevel: 2 };
  if (warlockLevel <= 6) return { slots: 2, slotLevel: 3 };
  if (warlockLevel <= 8) return { slots: 2, slotLevel: 4 };
  if (warlockLevel <= 10) return { slots: 2, slotLevel: 5 };
  return { slots: 3, slotLevel: 5 }; // Level 11-12
}

const POPULAR_PRESETS: { name: string; desc: string; classes: ClassEntry[] }[] = [
  {
    name: 'Sorcadin (Smite Machine)',
    desc: '2 Paladin for Heavy Armor & Divine Smite + 10 Sorcerer for Lv 5 & Lv 6 spell slots and Metamagic Quicken.',
    classes: [
      { className: 'Paladin', level: 2, subclass: 'Oath of Vengeance' },
      { className: 'Sorcerer', level: 10, subclass: 'Draconic Bloodline' }
    ]
  },
  {
    name: 'Lockadin (3x Extra Attack in Tactician)',
    desc: '7 Paladin (Aura of Hate/Warding) + 5 Warlock (Pact of the Blade Deepened Pact + Short Rest Lv 3 Smites).',
    classes: [
      { className: 'Paladin', level: 7, subclass: 'Oathbreaker' },
      { className: 'Warlock', level: 5, subclass: 'The Fiend' }
    ]
  },
  {
    name: 'Swords Bard / Paladin (Slashing Flourish Smite)',
    desc: '10 Swords Bard (Expertise, Magical Secrets, Full Caster) + 2 Paladin (Smites on Flourishes).',
    classes: [
      { className: 'Bard', level: 10, subclass: 'College of Swords' },
      { className: 'Paladin', level: 2, subclass: 'Oath of Vengeance' }
    ]
  },
  {
    name: 'Gloomstalker Assassin Fighter (Initiative Burst)',
    desc: '5 Gloom Stalker Ranger + 4 Assassin Rogue + 3 Battle Master Fighter. 7 attacks round 1 with auto-crits.',
    classes: [
      { className: 'Ranger', level: 5, subclass: 'Gloom Stalker' },
      { className: 'Rogue', level: 4, subclass: 'Assassin' },
      { className: 'Fighter', level: 3, subclass: 'Battle Master (None)' }
    ]
  },
  {
    name: 'Tempest Cleric / Storm Sorcerer (Max Lightning)',
    desc: '2 Tempest Cleric (Destructive Wrath max damage) + 10 Storm Sorcerer (Chain Lightning & Quickened create water).',
    classes: [
      { className: 'Cleric', level: 2, subclass: 'Tempest Domain' },
      { className: 'Sorcerer', level: 10, subclass: 'Storm Sorcery' }
    ]
  },
  {
    name: 'Open Hand Monk / Thief Rogue (Flurry of Blows)',
    desc: '8 Open Hand Monk (Tavern Brawler + Manifestation) + 4 Thief Rogue (Fast Hands extra bonus action).',
    classes: [
      { className: 'Monk', level: 8, subclass: 'Way of the Open Hand' },
      { className: 'Rogue', level: 4, subclass: 'Thief (None)' }
    ]
  }
];

export const Bg3MulticlassSpellBuilder: React.FC = () => {
  const [classList, setClassList] = useState<ClassEntry[]>([
    { className: 'Paladin', level: 2, subclass: 'Oath of Vengeance' },
    { className: 'Sorcerer', level: 10, subclass: 'Draconic Bloodline' }
  ]);

  const totalLevel = useMemo(() => {
    return classList.reduce((acc, c) => acc + c.level, 0);
  }, [classList]);

  // Add class
  const handleAddClass = () => {
    if (classList.length >= 4) return;
    if (totalLevel >= 12) return;
    const available = BG3_CLASSES.find(c => !classList.some(cl => cl.className === c.name));
    if (!available) return;
    const remaining = Math.max(1, 12 - totalLevel);
    setClassList([...classList, { className: available.name, level: Math.min(1, remaining), subclass: available.subclasses[0] }]);
  };

  const handleRemoveClass = (index: number) => {
    if (classList.length <= 1) return;
    setClassList(classList.filter((_, i) => i !== index));
  };

  const handleUpdateLevel = (index: number, newLevel: number) => {
    const cur = classList[index].level;
    const diff = newLevel - cur;
    if (totalLevel + diff > 12) {
      newLevel = 12 - (totalLevel - cur);
    }
    newLevel = Math.max(1, Math.min(12, newLevel));
    const next = [...classList];
    next[index] = { ...next[index], level: newLevel };
    setClassList(next);
  };

  const handleUpdateClass = (index: number, newClassName: string) => {
    const def = BG3_CLASSES.find(c => c.name === newClassName);
    const next = [...classList];
    next[index] = {
      className: newClassName,
      level: next[index].level,
      subclass: def?.subclasses[0]
    };
    setClassList(next);
  };

  const handleUpdateSubclass = (index: number, newSubclass: string) => {
    const next = [...classList];
    next[index] = { ...next[index], subclass: newSubclass };
    setClassList(next);
  };

  const handleApplyPreset = (preset: typeof POPULAR_PRESETS[0]) => {
    setClassList(preset.classes);
  };

  // Compute Multiclass Calculations
  const calculations = useMemo(() => {
    let effectiveCasterLevel = 0;
    let warlockLevel = 0;
    let totalFeats = 0;
    let hasExtraAttack = false;

    classList.forEach(entry => {
      const def = BG3_CLASSES.find(c => c.name === entry.className);
      if (!def) return;

      // Effective Caster Level
      if (def.type === 'full') {
        effectiveCasterLevel += entry.level;
      } else if (def.type === 'half') {
        // Paladin & Ranger: Floor(Level / 2). If single-class level 1 gives 0, but in multiclass it floors
        effectiveCasterLevel += Math.floor(entry.level / 2);
      } else if (def.type === 'third') {
        // Eldritch Knight or Arcane Trickster
        const isCasterSubclass = entry.subclass?.includes('1/3 Caster');
        if (isCasterSubclass) {
          effectiveCasterLevel += Math.floor(entry.level / 3);
        }
      } else if (def.type === 'warlock') {
        warlockLevel += entry.level;
      }

      // Feats Calculation in D&D 5e / BG3:
      // Standard classes get feats at class level 4, 8, 12
      // Fighter gets bonus feat at level 6
      // Rogue gets bonus feat at level 10
      let classFeats = 0;
      if (entry.level >= 4) classFeats++;
      if (entry.className === 'Fighter' && entry.level >= 6) classFeats++;
      if (entry.level >= 8) classFeats++;
      if (entry.className === 'Rogue' && entry.level >= 10) classFeats++;
      if (entry.level >= 12) classFeats++;
      totalFeats += classFeats;

      // Extra Attack check:
      // Fighter (5, 11), Barbarian (5), Paladin (5), Ranger (5), Monk (5), Swords Bard (6), Valour Bard (6), Warlock Pact of Blade (5)
      if (['Fighter', 'Barbarian', 'Paladin', 'Ranger', 'Monk'].includes(entry.className) && entry.level >= 5) {
        hasExtraAttack = true;
      }
      if (entry.className === 'Bard' && entry.level >= 6 && (entry.subclass?.includes('Swords') || entry.subclass?.includes('Valour'))) {
        hasExtraAttack = true;
      }
      if (entry.className === 'Warlock' && entry.level >= 5) {
        hasExtraAttack = true;
      }
    });

    const clampedEcl = Math.min(12, effectiveCasterLevel);
    const standardSlots = SPELL_SLOT_TABLE[clampedEcl] || [0, 0, 0, 0, 0, 0];
    const warlockSlots = getWarlockSlots(warlockLevel);

    // Scroll & Item DC casting attribute in BG3:
    // BG3 uses the spellcasting ability of the LAST class added for scrolls & item DC!
    const lastClass = classList[classList.length - 1];
    const lastClassDef = BG3_CLASSES.find(c => c.name === lastClass?.className);

    return {
      effectiveCasterLevel: clampedEcl,
      standardSlots,
      warlockSlots,
      totalFeats,
      hasExtraAttack,
      lastClass: lastClass?.className || 'None',
      scrollCastingAbility: lastClassDef?.primaryAbility || 'Charisma'
    };
  }, [classList]);

  return (
    <div className="space-y-6">
      {/* Tool Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5" /> D&D 5e Engine
              </span>
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold rounded-full">
                Level 12 Cap (BG3)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Multiclass Skill & Spell Slot Builder
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Assemble any multiclass combination in Baldur's Gate 3. Computes exact Effective Caster Level (ECL), standard Lv 1–6 spell slots, separate Warlock Pact Magic slots, Feat availability, and scroll DC priority.
            </p>
          </div>

          {/* Character Level Pill */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Character Level</div>
              <div className="text-3xl font-black text-amber-400 flex items-baseline gap-1">
                {totalLevel} <span className="text-slate-500 text-lg font-normal">/ 12</span>
              </div>
            </div>
            <div className={`w-3 h-12 rounded-full ${totalLevel === 12 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="pt-2 border-t border-slate-800">
          <div className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Meta Build Presets:
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700/60 transition-colors"
                title={p.desc}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Class Selection Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" /> Class Progression Split
            </h3>
            <button
              onClick={handleAddClass}
              disabled={classList.length >= 4 || totalLevel >= 12}
              className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Class
            </button>
          </div>

          <div className="space-y-3">
            {classList.map((entry, idx) => {
              const def = BG3_CLASSES.find(c => c.name === entry.className);
              return (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 relative">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 text-xs font-bold flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <select
                        value={entry.className}
                        onChange={(e) => handleUpdateClass(idx, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-white font-medium rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500"
                      >
                        {BG3_CLASSES.map(cls => (
                          <option key={cls.name} value={cls.name}>{cls.name} ({cls.hitDie}, {cls.type === 'full' ? 'Full Caster' : cls.type === 'half' ? 'Half Caster' : cls.type === 'third' ? '1/3 Caster' : cls.type === 'warlock' ? 'Pact Magic' : 'Martial'})</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemoveClass(idx)}
                        disabled={classList.length <= 1}
                        className="text-slate-500 hover:text-red-400 disabled:opacity-20 p-1"
                        title="Remove class"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Level Slider & Subclass selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Class Level</span>
                        <span className="font-bold text-amber-400">{entry.level}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={entry.level}
                        onChange={(e) => handleUpdateLevel(idx, parseInt(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="text-xs text-slate-400 mb-1">Subclass</div>
                      <select
                        value={entry.subclass || def?.subclasses[0]}
                        onChange={(e) => handleUpdateSubclass(idx, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
                      >
                        {def?.subclasses.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Key Ability: <span className="text-slate-300 font-medium">{def?.primaryAbility}</span></span>
                    <span>Caster Weight: <span className="text-amber-400 font-semibold">{def?.type === 'full' ? '1.0x (Full)' : def?.type === 'half' ? '0.5x (Half)' : def?.type === 'third' ? '0.33x' : def?.type === 'warlock' ? 'Pact Magic' : '0x'}</span></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Level Warning if under 12 */}
          {totalLevel < 12 && (
            <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>You have {12 - totalLevel} unallocated levels remaining. Increase class levels to reach the BG3 level 12 max.</span>
            </div>
          )}
          {totalLevel === 12 && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Max Level 12 reached! Valid BG3 endgame build.</span>
            </div>
          )}
        </div>

        {/* Results & Spell Slot Matrix Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Effective Caster Lv</div>
              <div className="text-2xl font-black text-amber-400 mt-0.5">{calculations.effectiveCasterLevel}</div>
              <div className="text-[10px] text-slate-500">Spell Slot Tier</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Feats</div>
              <div className="text-2xl font-black text-cyan-400 mt-0.5">{calculations.totalFeats}</div>
              <div className="text-[10px] text-slate-500">Lv 4 / 8 / 12 splits</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Extra Attack</div>
              <div className={`text-xl font-black mt-1 ${calculations.hasExtraAttack ? 'text-emerald-400' : 'text-slate-500'}`}>
                {calculations.hasExtraAttack ? 'ACTIVE' : 'NO'}
              </div>
              <div className="text-[10px] text-slate-500">2 attacks / action</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Item & Scroll DC</div>
              <div className="text-sm font-bold text-purple-400 mt-1 truncate">{calculations.scrollCastingAbility}</div>
              <div className="text-[10px] text-slate-500">Last Class Added</div>
            </div>
          </div>

          {/* Spell Slot Breakdown Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-400" /> Standard Spell Slots (Long Rest)
              </h3>
              <span className="text-xs text-slate-400">ECL: {calculations.effectiveCasterLevel}</span>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map(slotLv => {
                const count = calculations.standardSlots[slotLv - 1];
                return (
                  <div
                    key={slotLv}
                    className={`rounded-xl p-3 text-center border ${
                      count > 0 
                        ? 'bg-amber-950/20 border-amber-500/40 text-amber-300' 
                        : 'bg-slate-950/50 border-slate-800 text-slate-600'
                    }`}
                  >
                    <div className="text-[11px] font-semibold text-slate-400">Lv {slotLv}</div>
                    <div className="text-2xl font-black my-1">{count}</div>
                    <div className="text-[10px] text-slate-500">Slots</div>
                  </div>
                );
              })}
            </div>

            {/* Warlock Pact Slots (if applicable) */}
            {calculations.warlockSlots.slots > 0 ? (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-purple-300">Warlock Pact Magic Slots</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-purple-300 font-medium">
                    Refreshes on Short Rest
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-purple-950/20 border border-purple-500/30 rounded-xl p-3">
                  <div className="text-3xl font-black text-purple-400">
                    {calculations.warlockSlots.slots}×
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-purple-300">Level {calculations.warlockSlots.slotLevel}</span> Pact Slots. In BG3, these can be consumed interchangeably for standard spells or Divine Smites!
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-500 flex items-center gap-2">
                <Info className="w-3.5 h-3.5" /> No Warlock levels allocated. Add Warlock to unlock Short Rest Pact Magic slots.
              </div>
            )}
          </div>

          {/* BG3 Mechanics Explanations */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2.5">
            <div className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Crucial Larian Studios Multiclass Rules
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <strong className="text-slate-200">Scroll & Item DC:</strong> In BG3, the spell save DC for scrolls and item-granted spells is determined by the spellcasting ability of the <strong className="text-amber-300">last NEW class added</strong> to your character. Leveling order matters!
              </li>
              <li>
                <strong className="text-slate-200">Wizard 1-Level Dip:</strong> Scribing scrolls requires Wizard levels in BG3, but you can scribe spells of ANY slot level you possess via multiclassing! A 11 Sorcerer / 1 Wizard can scribe and cast Level 6 Globe of Invulnerability using INT.
              </li>
              <li>
                <strong className="text-slate-200">Paladin Divine Smite:</strong> Divine Smite can consume Warlock Pact slots or regular full-caster slots up to Level 5 (5d8 radiant damage).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bg3MulticlassSpellBuilder;
