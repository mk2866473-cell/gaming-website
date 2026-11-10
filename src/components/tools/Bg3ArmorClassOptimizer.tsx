/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Shield, ShieldCheck, Sparkles, Zap, Heart, 
  RotateCcw, Info, Crosshair, Award, CheckCircle2, 
  Layers, Swords, Flame, AlertCircle
} from 'lucide-react';

interface ArmorPreset {
  id: string;
  name: string;
  category: 'unarmored' | 'light' | 'medium' | 'heavy';
  baseAc: number;
  dexRule: 'full' | 'max2' | 'none' | 'barbarian' | 'monk';
  desc: string;
}

const ARMOR_OPTIONS: ArmorPreset[] = [
  { id: 'unarmored_base', name: 'Unarmored (No Armor)', category: 'unarmored', baseAc: 10, dexRule: 'full', desc: '10 + Full DEX Modifier' },
  { id: 'unarmored_mage', name: 'Mage Armor / Draconic Sorcerer', category: 'unarmored', baseAc: 13, dexRule: 'full', desc: '13 + Full DEX Modifier' },
  { id: 'unarmored_monk', name: 'Monk Unarmored Defense', category: 'unarmored', baseAc: 10, dexRule: 'monk', desc: '10 + DEX + WIS Modifiers' },
  { id: 'unarmored_barb', name: 'Barbarian Unarmored Defense', category: 'unarmored', baseAc: 10, dexRule: 'barbarian', desc: '10 + DEX + CON Modifiers' },
  { id: 'light_studded_2', name: 'Studded Leather Armor +2', category: 'light', baseAc: 14, dexRule: 'full', desc: '14 + Full DEX Modifier' },
  { id: 'light_bhaalist', name: 'Bhaalist Armor (Aura of Murder)', category: 'light', baseAc: 14, dexRule: 'full', desc: '14 + Full DEX Modifier' },
  { id: 'medium_half_plate_2', name: 'Half Plate Armour +2', category: 'medium', baseAc: 17, dexRule: 'max2', desc: '17 + DEX (capped at +2)' },
  { id: 'medium_armor_agility', name: 'Armour of Agility (Exotic Medium)', category: 'medium', baseAc: 17, dexRule: 'full', desc: '17 + FULL DEX (No Cap!)' },
  { id: 'medium_yuan_ti', name: 'Yuan-Ti Scale Mail (Exotic Medium)', category: 'medium', baseAc: 15, dexRule: 'full', desc: '15 + FULL DEX (No Cap!)' },
  { id: 'heavy_plate_2', name: 'Plate Armour +2', category: 'heavy', baseAc: 20, dexRule: 'none', desc: '20 Flat AC (Ignores DEX)' },
  { id: 'heavy_helldusk', name: 'Helldusk Armour (Legendary)', category: 'heavy', baseAc: 21, dexRule: 'none', desc: '21 Flat AC (Exotic proficiency)' },
];

export const Bg3ArmorClassOptimizer: React.FC = () => {
  // Attributes
  const [dexterity, setDexterity] = useState<number>(16);
  const [constitution, setConstitution] = useState<number>(14);
  const [wisdom, setWisdom] = useState<number>(14);
  const [charisma, setCharisma] = useState<number>(16);

  // Selected Armor
  const [selectedArmorId, setSelectedArmorId] = useState<string>('medium_armor_agility');

  // Shield
  const [shieldType, setShieldType] = useState<number>(2); // 0 = None, 2 = Standard (+2), 3 = Fortress (+3)

  // Equipment & Item Passives
  const [hasRingOfProtection, setHasRingOfProtection] = useState<boolean>(true);
  const [hasCloakOfProtection, setHasCloakOfProtection] = useState<boolean>(true);
  const [hasEvasiveShoes, setHasEvasiveShoes] = useState<boolean>(true);
  const [hasWondrousGloves, setHasWondrousGloves] = useState<boolean>(false);
  const [hasDefenderFlail, setHasDefenderFlail] = useState<boolean>(false);

  // Spells & Stances
  const [fightingStyleDefense, setFightingStyleDefense] = useState<boolean>(true);
  const [shieldOfFaith, setShieldOfFaith] = useState<boolean>(false);
  const [hasteBuff, setHasteBuff] = useState<boolean>(false);
  const [wardingBond, setWardingBond] = useState<boolean>(false);
  const [shieldReactionActive, setShieldReactionActive] = useState<boolean>(false);
  const [mirrorImageStacks, setMirrorImageStacks] = useState<number>(0); // 0, 1, 2, 3 (+3 per stack)

  // Paladin Aura
  const [paladinAuraActive, setPaladinAuraActive] = useState<boolean>(false);

  // Modifiers helper
  const getMod = (score: number) => Math.floor((score - 10) / 2);
  const dexMod = getMod(dexterity);
  const conMod = getMod(constitution);
  const wisMod = getMod(wisdom);
  const chaMod = getMod(charisma);

  const selectedArmor = useMemo(() => {
    return ARMOR_OPTIONS.find(a => a.id === selectedArmorId) || ARMOR_OPTIONS[0];
  }, [selectedArmorId]);

  // Calculations
  const calculations = useMemo(() => {
    let effectiveDex = 0;
    if (selectedArmor.dexRule === 'full') {
      effectiveDex = dexMod;
    } else if (selectedArmor.dexRule === 'max2') {
      effectiveDex = Math.min(2, Math.max(0, dexMod));
    } else if (selectedArmor.dexRule === 'none') {
      effectiveDex = 0;
    } else if (selectedArmor.dexRule === 'barbarian') {
      effectiveDex = dexMod + conMod;
    } else if (selectedArmor.dexRule === 'monk') {
      effectiveDex = dexMod + wisMod;
    }

    // Base + Armor + Dex
    const baseArmorAc = selectedArmor.baseAc + effectiveDex;

    // Shield
    const shieldBonus = shieldType;

    // Item bonuses
    let itemAc = 0;
    let itemSaves = 0;
    if (hasRingOfProtection) { itemAc += 1; itemSaves += 1; }
    if (hasCloakOfProtection) { itemAc += 1; itemSaves += 1; }
    if (hasEvasiveShoes) { itemAc += 1; }
    if (hasWondrousGloves) { itemAc += 1; }
    if (hasDefenderFlail) { itemAc += 1; }

    // Passives & Spells
    let passiveSpellAc = 0;
    const isWearingArmor = selectedArmor.category !== 'unarmored';
    if (fightingStyleDefense && isWearingArmor) {
      passiveSpellAc += 1;
    }
    if (shieldOfFaith) passiveSpellAc += 2;
    if (hasteBuff) passiveSpellAc += 2;
    if (wardingBond) { passiveSpellAc += 1; itemSaves += 1; }
    if (mirrorImageStacks > 0) passiveSpellAc += (mirrorImageStacks * 3);

    const passiveTotalAc = baseArmorAc + shieldBonus + itemAc + passiveSpellAc;
    const reactionAc = passiveTotalAc + (shieldReactionActive ? 5 : 0);

    const auraBonus = paladinAuraActive ? Math.max(0, chaMod) : 0;
    const totalUniversalSaveBonus = itemSaves + (hasteBuff ? 0 : 0) + auraBonus;

    return {
      baseArmorAc,
      shieldBonus,
      itemAc,
      passiveSpellAc,
      passiveTotalAc,
      reactionAc,
      auraBonus,
      totalUniversalSaveBonus
    };
  }, [
    selectedArmor, dexMod, conMod, wisMod, chaMod,
    shieldType, hasRingOfProtection, hasCloakOfProtection,
    hasEvasiveShoes, hasWondrousGloves, hasDefenderFlail,
    fightingStyleDefense, shieldOfFaith, hasteBuff, wardingBond,
    shieldReactionActive, mirrorImageStacks, paladinAuraActive
  ]);

  // Enemy hit test against passiveTotalAc
  const enemyBenchmarks = [
    { name: 'Goblin Scout (Act 1)', attackBonus: 4 },
    { name: 'Githyanki Raider (Act 1)', attackBonus: 6 },
    { name: 'Shadow-Cursed Warrior (Act 2)', attackBonus: 8 },
    { name: 'Ketheric Thorm (Act 2 Boss)', attackBonus: 10 },
    { name: 'Steel Watcher (Act 3)', attackBonus: 12 },
    { name: 'Raphael (Act 3 Boss)', attackBonus: 14 }
  ];

  const calculateHitChance = (atkBonus: number, targetAc: number) => {
    // d20 roll: target needs (targetAc - atkBonus)
    // Nat 1 always misses (5%), Nat 20 always hits (5%)
    const needed = targetAc - atkBonus;
    if (needed <= 1) return 95; // Only nat 1 misses
    if (needed >= 20) return 5;  // Only nat 20 hits
    const successfulFaces = 21 - needed;
    return Math.round((successfulFaces / 20) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> D&D 5e Defensive Engine
              </span>
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full">
                Tactician & Honour Tested
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Armor Class (AC) & Saving Throw Optimizer
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Stack Light, Medium, and Heavy armor bonuses, magic items (+1 Cloak, Ring of Protection), Paladin Aura of Protection, and reactive Shield spells to reach 26+ untouchable AC.
            </p>
          </div>

          {/* Big AC Score Badge */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Active Armor Class</div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 flex items-baseline gap-1.5">
                {calculations.passiveTotalAc} <span className="text-sm font-semibold text-slate-400">AC</span>
              </div>
              <div className="text-[11px] text-cyan-400 font-medium">
                {calculations.reactionAc > calculations.passiveTotalAc ? `+5 Shield Reaction = ${calculations.reactionAc} AC` : 'Max Passive AC'}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Attributes & Armor Selection */}
        <div className="lg:col-span-6 space-y-4">
          {/* Attributes */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Defensive Ability Scores
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>DEX</span>
                  <span className="font-bold text-amber-400">{dexterity} ({dexMod >= 0 ? `+${dexMod}` : dexMod})</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="22"
                  value={dexterity}
                  onChange={(e) => setDexterity(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>CON</span>
                  <span className="font-bold text-emerald-400">{constitution} ({conMod >= 0 ? `+${conMod}` : conMod})</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="22"
                  value={constitution}
                  onChange={(e) => setConstitution(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>WIS</span>
                  <span className="font-bold text-cyan-400">{wisdom} ({wisMod >= 0 ? `+${wisMod}` : wisMod})</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="22"
                  value={wisdom}
                  onChange={(e) => setWisdom(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>CHA</span>
                  <span className="font-bold text-purple-400">{charisma} ({chaMod >= 0 ? `+${chaMod}` : chaMod})</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="22"
                  value={charisma}
                  onChange={(e) => setCharisma(parseInt(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Armor Choice */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" /> Body Armor Type
            </h3>

            <div className="space-y-2">
              <select
                value={selectedArmorId}
                onChange={(e) => setSelectedArmorId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
              >
                {ARMOR_OPTIONS.map(armor => (
                  <option key={armor.id} value={armor.id}>
                    {armor.name} ({armor.category.toUpperCase()} - {armor.desc})
                  </option>
                ))}
              </select>
              <div className="text-xs text-slate-400 pl-1">
                Selected: <span className="text-amber-300 font-medium">{selectedArmor.name}</span> — Base: {selectedArmor.baseAc} AC. Formula: {selectedArmor.desc}.
              </div>
            </div>

            {/* Shield Selector */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300 mb-2">Off-hand Shield:</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 0, label: 'No Shield (Two-Handed / Dual)', bonus: '+0 AC' },
                  { value: 2, label: 'Standard Shield', bonus: '+2 AC' },
                  { value: 3, label: 'Viconia\'s Fortress / Shield +2', bonus: '+3 AC' },
                ].map(s => (
                  <button
                    key={s.value}
                    onClick={() => setShieldType(s.value)}
                    className={`p-2 rounded-lg text-left border transition-all text-xs ${
                      shieldType === s.value
                        ? 'bg-amber-950/40 border-amber-500/60 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>{s.label}</div>
                    <div className="text-amber-400 font-bold mt-0.5">{s.bonus}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Magic Item Equipment Toggles */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Magic Items & Accessories Stacking
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={hasRingOfProtection}
                  onChange={(e) => setHasRingOfProtection(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Ring of Protection <strong className="text-amber-400">(+1 AC, +1 Saves)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={hasCloakOfProtection}
                  onChange={(e) => setHasCloakOfProtection(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Cloak of Protection <strong className="text-amber-400">(+1 AC, +1 Saves)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={hasEvasiveShoes}
                  onChange={(e) => setHasEvasiveShoes(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Evasive Shoes <strong className="text-amber-400">(+1 AC)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={hasWondrousGloves}
                  onChange={(e) => setHasWondrousGloves(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Wondrous Gloves <strong className="text-amber-400">(+1 AC)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={hasDefenderFlail}
                  onChange={(e) => setHasDefenderFlail(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Defender Flail / Dagger <strong className="text-amber-400">(+1 AC)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={fightingStyleDefense}
                  onChange={(e) => setFightingStyleDefense(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Defense Fighting Style <strong className="text-amber-400">(+1 AC with armor)</strong></span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Spells, Auras, Hit Simulation */}
        <div className="lg:col-span-6 space-y-4">
          {/* Spells & Reactions */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" /> Buff Spells & Reactions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={shieldReactionActive}
                  onChange={(e) => setShieldReactionActive(e.target.checked)}
                  className="rounded text-purple-500 focus:ring-0"
                />
                <span className="text-slate-300">Shield Spell Reaction <strong className="text-purple-400">(+5 AC on hit)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={shieldOfFaith}
                  onChange={(e) => setShieldOfFaith(e.target.checked)}
                  className="rounded text-purple-500 focus:ring-0"
                />
                <span className="text-slate-300">Shield of Faith <strong className="text-purple-400">(+2 AC conc.)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={hasteBuff}
                  onChange={(e) => setHasteBuff(e.target.checked)}
                  className="rounded text-purple-500 focus:ring-0"
                />
                <span className="text-slate-300">Haste Spell <strong className="text-purple-400">(+2 AC, Speed)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={wardingBond}
                  onChange={(e) => setWardingBond(e.target.checked)}
                  className="rounded text-purple-500 focus:ring-0"
                />
                <span className="text-slate-300">Warding Bond <strong className="text-purple-400">(+1 AC, +1 Saves)</strong></span>
              </label>
            </div>

            {/* Paladin Aura */}
            <div className="pt-2 border-t border-slate-800">
              <label className="flex items-center justify-between p-2.5 bg-purple-950/20 border border-purple-500/30 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={paladinAuraActive}
                    onChange={(e) => setPaladinAuraActive(e.target.checked)}
                    className="rounded text-purple-500 focus:ring-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-purple-300">Paladin Aura of Protection (Level 6+)</div>
                    <div className="text-[10px] text-slate-400">Adds full Charisma modifier (+{Math.max(0, chaMod)}) to ALL 6 saving throws!</div>
                  </div>
                </div>
                <span className="text-sm font-black text-purple-400">+{Math.max(0, chaMod)} Saves</span>
              </label>
            </div>
          </div>

          {/* Enemy Hit Chance Benchmark Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-emerald-400" /> Enemy Hit Chance vs Your AC ({calculations.passiveTotalAc})
              </h3>
              <span className="text-[10px] text-slate-400">Nat 20 always crits (5%)</span>
            </div>

            <div className="space-y-2">
              {enemyBenchmarks.map((enemy, idx) => {
                const passiveHit = calculateHitChance(enemy.attackBonus, calculations.passiveTotalAc);
                const reactionHit = calculateHitChance(enemy.attackBonus, calculations.reactionAc);

                return (
                  <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-lg p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-medium text-slate-200">{enemy.name}</div>
                      <div className="text-[10px] text-slate-500">Attack Bonus: +{enemy.attackBonus} to hit</div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <div className="text-[10px] text-slate-400">Normal Hit %</div>
                        <div className={`font-bold ${passiveHit <= 20 ? 'text-emerald-400' : passiveHit <= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                          {passiveHit}%
                        </div>
                      </div>

                      {calculations.reactionAc > calculations.passiveTotalAc && (
                        <div>
                          <div className="text-[10px] text-cyan-400">With Shield</div>
                          <div className="font-black text-cyan-300">{reactionHit}%</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saving Throws Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Total Universal Saving Throw Modifier: +{calculations.totalUniversalSaveBonus}
            </div>
            <p className="text-slate-400 text-[11px]">
              Item & Aura bonuses stack on top of standard attribute modifiers (STR {getMod(10)}, DEX {dexMod}, CON {conMod}, INT {getMod(10)}, WIS {wisMod}, CHA {chaMod}). High saving throws ensure enemies cannot banish, stun, or crowd-control your tank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bg3ArmorClassOptimizer;
