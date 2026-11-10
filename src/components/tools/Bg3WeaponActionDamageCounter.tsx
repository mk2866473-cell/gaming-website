/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Swords, Zap, Flame, ShieldAlert, Sparkles, 
  RotateCcw, Info, Crosshair, Award, CheckCircle2, 
  Layers, Trophy, AlertTriangle
} from 'lucide-react';

interface WeaponPreset {
  id: string;
  name: string;
  diceCount: number;
  dieFace: number; // e.g. 6 for 2d6
  damageType: string;
  enchantment: number;
  bonusNotes: string;
  isTwoHanded?: boolean;
  isRanged?: boolean;
  isUnarmed?: boolean;
}

const WEAPONS: WeaponPreset[] = [
  { id: 'balduran_giantslayer', name: 'Balduran\'s Giantslayer (Greatsword +3)', diceCount: 2, dieFace: 6, damageType: 'Slashing', enchantment: 3, bonusNotes: 'Doubles Strength modifier on damage!', isTwoHanded: true },
  { id: 'silver_sword', name: 'Silver Sword of the Astral Plane (Greatsword +3)', diceCount: 2, dieFace: 6, damageType: 'Slashing', enchantment: 3, bonusNotes: '+1d6 Psychic damage when wielded by Githyanki', isTwoHanded: true },
  { id: 'standard_greatsword', name: 'Greatsword +2', diceCount: 2, dieFace: 6, damageType: 'Slashing', enchantment: 2, bonusNotes: 'Standard 2d6 martial weapon', isTwoHanded: true },
  { id: 'nyrulna', name: 'Nyrulna Legendary Trident (+3)', diceCount: 1, dieFace: 8, damageType: 'Piercing', enchantment: 3, bonusNotes: '+1d6 Thunder damage; 3d4 AOE explosion on throw' },
  { id: 'gontr_mael', name: 'Gontr Mael (Legendary Longbow +3)', diceCount: 1, dieFace: 8, damageType: 'Piercing', enchantment: 3, bonusNotes: 'Celestial Haste & Guiding Bolt on hit', isRanged: true },
  { id: 'dual_hand_crossbow', name: 'Hand Crossbow +2 (Dual Wield)', diceCount: 1, dieFace: 6, damageType: 'Piercing', enchantment: 2, bonusNotes: 'Fires from Bonus Action with full DEX mod', isRanged: true },
  { id: 'monk_unarmed', name: 'Open Hand Monk (Unarmed Strike)', diceCount: 1, dieFace: 8, damageType: 'Bludgeoning', enchantment: 0, bonusNotes: '1d8 base + Manifestation 1d4 + WIS + Tavern Brawler', isUnarmed: true },
  { id: 'bloodthirst', name: 'Bloodthirst (Legendary Dagger +2)', diceCount: 1, dieFace: 4, damageType: 'Piercing', enchantment: 2, bonusNotes: 'Inflicts Piercing Vulnerability (Doubles all piercing damage!)' }
];

export const Bg3WeaponActionDamageCounter: React.FC = () => {
  // Weapon choice
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('balduran_giantslayer');

  // Stats
  const [strScore, setStrScore] = useState<number>(20); // up to 27 with Cloud Giant
  const [dexScore, setDexScore] = useState<number>(14);
  const [wisScore, setWisScore] = useState<number>(16); // for monk manifestation

  // Feats & Combat Toggles
  const [useGreatWeaponMaster, setUseGreatWeaponMaster] = useState<boolean>(true); // -5 Atk, +10 Dmg
  const [useSharpshooter, setUseSharpshooter] = useState<boolean>(false); // -5 Atk, +10 Dmg
  const [useTavernBrawler, setUseTavernBrawler] = useState<boolean>(false); // Adds STR mod again

  // Class & Attack Action Economy
  const [fighterLevel11ExtraAttack, setFighterLevel11ExtraAttack] = useState<boolean>(false); // 3 attacks per action
  const [hasExtraAttack, setHasExtraAttack] = useState<boolean>(true); // 2 attacks per action
  const [actionSurge, setActionSurge] = useState<boolean>(true); // doubles main action
  const [hasteActive, setHasteActive] = useState<boolean>(true); // +1 action
  const [isHonourMode, setIsHonourMode] = useState<boolean>(false); // Haste gives 1 attack in honour, full set in tactician
  const [bonusActionAttacks, setBonusActionAttacks] = useState<number>(1); // e.g. GWM proc, Flurry of Blows (counts as 2), or offhand

  // Additional Damage Riders (Per Hit)
  const [smiteTier, setSmiteTier] = useState<number>(0); // 0 = none, 1 = 2d8, 2 = 3d8, 3 = 4d8, 4 = 5d8
  const [huntersMark, setHuntersMark] = useState<boolean>(false); // +1d6
  const [causticBand, setCausticBand] = useState<boolean>(true); // +2 flat acid
  const [callousGlowRing, setCallousGlowRing] = useState<boolean>(true); // +2 flat radiant
  const [hellduskGloves, setHellduskGloves] = useState<boolean>(false); // +1d6 fire
  const [strangeConduitRing, setStrangeConduitRing] = useState<boolean>(false); // +1d4 psychic

  // Target Simulation
  const [targetAc, setTargetAc] = useState<number>(18);
  const [rollAdvantage, setRollAdvantage] = useState<'normal' | 'advantage' | 'disadvantage'>('advantage');
  const [isVulnerable, setIsVulnerable] = useState<boolean>(false); // 2x total damage (e.g. wet or piercing vulnerability)

  const strMod = Math.floor((strScore - 10) / 2);
  const dexMod = Math.floor((dexScore - 10) / 2);
  const wisMod = Math.floor((wisScore - 10) / 2);

  const weapon = useMemo(() => {
    return WEAPONS.find(w => w.id === selectedWeaponId) || WEAPONS[0];
  }, [selectedWeaponId]);

  // Calculations
  const stats = useMemo(() => {
    // Determine Primary Mod
    const primaryMod = weapon.isRanged ? dexMod : strMod;

    // Attack Roll Bonus Calculation
    const profBonus = 4; // endgame prof
    let attackBonus = profBonus + primaryMod + weapon.enchantment;

    if (weapon.isTwoHanded && useGreatWeaponMaster) {
      attackBonus -= 5;
    } else if (weapon.isRanged && useSharpshooter) {
      attackBonus -= 5;
    }

    if (useTavernBrawler && (weapon.isUnarmed || weapon.id === 'nyrulna')) {
      attackBonus += strMod; // Tavern Brawler adds STR mod to attack roll again!
    }

    // Per-Hit Damage Breakdown
    let flatDamage = primaryMod + weapon.enchantment;

    // Giantslayer doubles STR
    if (weapon.id === 'balduran_giantslayer') {
      flatDamage += strMod;
    }

    // Feat Flat Damage
    if (weapon.isTwoHanded && useGreatWeaponMaster) {
      flatDamage += 10;
    } else if (weapon.isRanged && useSharpshooter) {
      flatDamage += 10;
    }

    // Tavern Brawler adds STR to damage again
    if (useTavernBrawler && (weapon.isUnarmed || weapon.id === 'nyrulna')) {
      flatDamage += strMod;
    }

    // Flat Rings
    if (causticBand) flatDamage += 2;
    if (callousGlowRing) flatDamage += 2;

    // Dice pools for average & min/max
    let totalDiceAverage = 0;
    let minDice = 0;
    let maxDice = 0;

    // Base weapon dice
    minDice += weapon.diceCount;
    maxDice += weapon.diceCount * weapon.dieFace;
    totalDiceAverage += weapon.diceCount * ((weapon.dieFace + 1) / 2);

    // Silver Sword psychic (1d6)
    if (weapon.id === 'silver_sword') {
      minDice += 1;
      maxDice += 6;
      totalDiceAverage += 3.5;
    }

    // Monk Manifestation (1d4 + WIS)
    if (weapon.isUnarmed) {
      minDice += 1;
      maxDice += 4;
      totalDiceAverage += 2.5;
      flatDamage += wisMod;
    }

    // Smite Dice
    if (smiteTier > 0) {
      const smiteDiceCount = smiteTier + 1; // Lv 1 is 2d8, Lv 4 is 5d8
      minDice += smiteDiceCount;
      maxDice += smiteDiceCount * 8;
      totalDiceAverage += smiteDiceCount * 4.5;
    }

    // Riders
    if (huntersMark) {
      minDice += 1; maxDice += 6; totalDiceAverage += 3.5;
    }
    if (hellduskGloves) {
      minDice += 1; maxDice += 6; totalDiceAverage += 3.5;
    }
    if (strangeConduitRing) {
      minDice += 1; maxDice += 4; totalDiceAverage += 2.5;
    }

    const singleHitMin = (minDice + flatDamage) * (isVulnerable ? 2 : 1);
    const singleHitMax = (maxDice + flatDamage) * (isVulnerable ? 2 : 1);
    const singleHitAvg = (totalDiceAverage + flatDamage) * (isVulnerable ? 2 : 1);
    const singleHitCritAvg = ((totalDiceAverage * 2) + flatDamage) * (isVulnerable ? 2 : 1);

    // Number of Attacks Calculation
    // Base action attacks:
    let attacksPerMainAction = 1;
    if (fighterLevel11ExtraAttack) attacksPerMainAction = 3;
    else if (hasExtraAttack) attacksPerMainAction = 2;

    let totalMainActions = 1;
    if (actionSurge) totalMainActions += 1;

    // Haste actions:
    let hasteAttacks = 0;
    if (hasteActive) {
      if (isHonourMode) {
        hasteAttacks = 1; // In Honour Mode, Haste grants strictly 1 attack
      } else {
        hasteAttacks = attacksPerMainAction; // In Tactician/Normal, Haste grants full extra action!
      }
    }

    const totalActionAttacks = (totalMainActions * attacksPerMainAction) + hasteAttacks;
    const totalTurnAttacks = totalActionAttacks + bonusActionAttacks;

    // Probability of Hit vs targetAc
    const rawTarget = targetAc - attackBonus;
    const needed = Math.max(2, Math.min(20, rawTarget));
    const pSingleFace = (21 - needed) / 20;

    let hitProb = pSingleFace;
    let critProb = 0.05; // Nat 20

    if (rollAdvantage === 'advantage') {
      hitProb = 1 - Math.pow(1 - pSingleFace, 2);
      critProb = 1 - Math.pow(0.95, 2); // ~9.75%
    } else if (rollAdvantage === 'disadvantage') {
      hitProb = Math.pow(pSingleFace, 2);
      critProb = Math.pow(0.05, 2); // 0.25%
    }

    // Expected DPR (Damage Per Round)
    // DPR = TotalAttacks * [ (HitProb - CritProb) * singleHitAvg + CritProb * singleHitCritAvg ]
    const normalHitProb = Math.max(0, hitProb - critProb);
    const expectedPerAttack = (normalHitProb * singleHitAvg) + (critProb * singleHitCritAvg);
    const totalDpr = Math.round(expectedPerAttack * totalTurnAttacks);
    const maxBurst = Math.round(singleHitMax * totalTurnAttacks);

    return {
      attackBonus,
      singleHitMin: Math.max(1, Math.round(singleHitMin)),
      singleHitMax: Math.round(singleHitMax),
      singleHitAvg: Math.round(singleHitAvg),
      singleHitCritAvg: Math.round(singleHitCritAvg),
      totalTurnAttacks,
      hitChancePercent: Math.round(hitProb * 100),
      critChancePercent: (critProb * 100).toFixed(1),
      totalDpr,
      maxBurst
    };
  }, [
    weapon, strMod, dexMod, wisMod, useGreatWeaponMaster, useSharpshooter,
    useTavernBrawler, smiteTier, huntersMark, causticBand, callousGlowRing,
    hellduskGloves, strangeConduitRing, targetAc, rollAdvantage, isVulnerable,
    fighterLevel11ExtraAttack, hasExtraAttack, actionSurge, hasteActive,
    isHonourMode, bonusActionAttacks
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" /> D&D 5e Damage Calculator
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                Tactician vs Honour Mode Haste
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Weapon Action & Extra Attack Damage Counter
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Calculate single-hit damage, Great Weapon Master/Sharpshooter -5 penalty accuracy, Extra Attack & Action Surge turn burst, Tavern Brawler scaling, and true expected DPR against boss armor classes.
            </p>
          </div>

          {/* Big DPR Badge */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Expected Turn DPR</div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 flex items-baseline gap-1.5">
                {stats.totalDpr} <span className="text-sm font-semibold text-slate-400">DMG</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                Max Burst: {stats.maxBurst} across {stats.totalTurnAttacks} attacks
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Weapon & Feats Setup */}
        <div className="lg:col-span-6 space-y-4">
          {/* Weapon Preset Select */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" /> Weapon Selection
            </h3>

            <select
              value={selectedWeaponId}
              onChange={(e) => setSelectedWeaponId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            >
              {WEAPONS.map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.diceCount}d{w.dieFace} + {w.enchantment} {w.damageType})
                </option>
              ))}
            </select>
            <div className="text-xs text-slate-400 pl-1">
              {weapon.bonusNotes}
            </div>

            {/* Ability Scores Sliders */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800">
              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>STR</span>
                  <span className="font-bold text-amber-400">{strScore} (+{strMod})</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="27"
                  value={strScore}
                  onChange={(e) => setStrScore(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>DEX</span>
                  <span className="font-bold text-cyan-400">{dexScore} (+{dexMod})</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="22"
                  value={dexScore}
                  onChange={(e) => setDexScore(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>WIS (Monk)</span>
                  <span className="font-bold text-emerald-400">{wisScore} (+{wisMod})</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="22"
                  value={wisScore}
                  onChange={(e) => setWisScore(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Feats & Tavern Brawler Toggles */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" /> Power Feats & Tavern Brawler
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={useGreatWeaponMaster}
                  onChange={(e) => setUseGreatWeaponMaster(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Great Weapon Master <strong className="text-amber-400">(-5 Atk, +10 Dmg)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={useSharpshooter}
                  onChange={(e) => setUseSharpshooter(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Sharpshooter <strong className="text-amber-400">(-5 Atk, +10 Dmg)</strong></span>
              </label>

              <label className="flex items-center gap-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={useTavernBrawler}
                  onChange={(e) => setUseTavernBrawler(e.target.checked)}
                  className="rounded text-purple-500 focus:ring-0"
                />
                <span className="text-slate-300">Tavern Brawler <strong className="text-purple-400">(Adds +{strMod} STR again to Atk & Dmg on Unarmed/Throw!)</strong></span>
              </label>
            </div>
          </div>

          {/* Action Economy & Extra Attack Stacking */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Action Surge & Attack Multipliers
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasExtraAttack}
                  onChange={(e) => setHasExtraAttack(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Extra Attack (Lv 5)</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={fighterLevel11ExtraAttack}
                  onChange={(e) => setFighterLevel11ExtraAttack(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Fighter Lv 11 (3 Attacks)</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={actionSurge}
                  onChange={(e) => setActionSurge(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Action Surge (2x Action)</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasteActive}
                  onChange={(e) => setHasteActive(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Haste / Potion of Speed</span>
              </label>
            </div>

            {/* Honour Mode Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-300">Honour Mode Rule Tuning</span>
                <div className="text-[10px] text-slate-500">In Honour Mode, Haste grants strictly +1 single attack.</div>
              </div>
              <button
                onClick={() => setIsHonourMode(!isHonourMode)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                  isHonourMode 
                    ? 'bg-red-950 border-red-500/50 text-red-300' 
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {isHonourMode ? 'Honour Mode (1 Haste Atk)' : 'Tactician / Normal'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Smite, Target Simulator, & Burst Output */}
        <div className="lg:col-span-6 space-y-4">
          {/* Target AC & Advantage Setup */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-emerald-400" /> Target Armor Class & Roll State
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Enemy Armor Class</span>
                  <span className="font-bold text-amber-400">{targetAc} AC</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="26"
                  value={targetAc}
                  onChange={(e) => setTargetAc(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1">Roll Mode</div>
                <div className="grid grid-cols-3 gap-1">
                  {(['normal', 'advantage', 'disadvantage'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setRollAdvantage(mode)}
                      className={`py-1 rounded text-xs capitalize font-medium transition-colors ${
                        rollAdvantage === mode
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVulnerable}
                  onChange={(e) => setIsVulnerable(e.target.checked)}
                  className="rounded text-red-500 focus:ring-0"
                />
                <span className="text-red-400 font-semibold">Target Vulnerable (2× Damage - Wet / Bloodthirst Aura)</span>
              </label>

              <div className="text-right">
                <span className="text-slate-400 text-[11px]">Hit Chance: </span>
                <span className="text-emerald-400 font-bold">{stats.hitChancePercent}%</span>
              </div>
            </div>
          </div>

          {/* Damage Output Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Single Hit Avg</div>
              <div className="text-xl font-black text-amber-400 mt-1">{stats.singleHitAvg}</div>
              <div className="text-[10px] text-slate-500">Range: {stats.singleHitMin}–{stats.singleHitMax}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Crit Hit Avg</div>
              <div className="text-xl font-black text-red-400 mt-1">{stats.singleHitCritAvg}</div>
              <div className="text-[10px] text-slate-500">{stats.critChancePercent}% Crit Rate</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Attacks / Turn</div>
              <div className="text-xl font-black text-cyan-400 mt-1">{stats.totalTurnAttacks}×</div>
              <div className="text-[10px] text-slate-500">Action + Haste</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Attack Roll</div>
              <div className="text-xl font-black text-emerald-400 mt-1">+{stats.attackBonus}</div>
              <div className="text-[10px] text-slate-500">To Hit</div>
            </div>
          </div>

          {/* Smites & Equipment Riders Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
            <div className="text-xs font-semibold text-white flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> Paladin Divine Smite Rider:</span>
              <span className="text-amber-400 font-bold">{smiteTier === 0 ? 'No Smite' : `Level ${smiteTier} (${smiteTier + 1}d8 Radiant)`}</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {[0, 1, 2, 3, 4].map(tier => (
                <button
                  key={tier}
                  onClick={() => setSmiteTier(tier)}
                  className={`py-1.5 rounded text-xs font-semibold transition-colors ${
                    smiteTier === tier
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tier === 0 ? 'Off' : `Lv ${tier}`}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <label className="flex items-center gap-2 p-1.5 bg-slate-950 rounded border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={causticBand}
                  onChange={(e) => setCausticBand(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Caustic Band (+2 Acid)</span>
              </label>

              <label className="flex items-center gap-2 p-1.5 bg-slate-950 rounded border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={callousGlowRing}
                  onChange={(e) => setCallousGlowRing(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Callous Glow (+2 Radiant)</span>
              </label>

              <label className="flex items-center gap-2 p-1.5 bg-slate-950 rounded border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={huntersMark}
                  onChange={(e) => setHuntersMark(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Hunter's Mark (+1d6)</span>
              </label>

              <label className="flex items-center gap-2 p-1.5 bg-slate-950 rounded border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hellduskGloves}
                  onChange={(e) => setHellduskGloves(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300">Helldusk Gloves (+1d6 Fire)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bg3WeaponActionDamageCounter;
