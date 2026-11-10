/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Crosshair, Sparkles, Zap, Shield, Target, Flame, 
  TrendingUp, Award, Layers, Coins, ChevronRight, CheckCircle2,
  AlertCircle, RefreshCw, Radio
} from 'lucide-react';

interface CalibrationWeapon {
  id: string;
  name: string;
  type: string;
  baseAtk: number;
  fireRate: number; // rounds per minute
  magSize: number;
  critRate: number; // base %
  critDmg: number; // base %
  weakspotDmg: number; // base %
  element: string;
}

const WEAPONS: CalibrationWeapon[] = [
  { id: 'socr-outsider', name: 'SOCR - Outsider', type: 'Assault Rifle', baseAtk: 68, fireRate: 600, magSize: 30, critRate: 8, critDmg: 30, weakspotDmg: 50, element: 'Power Surge' },
  { id: 'kam-abyss-glance', name: 'KAM - Abyss Glance', type: 'Assault Rifle', baseAtk: 72, fireRate: 580, magSize: 30, critRate: 10, critDmg: 30, weakspotDmg: 55, element: 'Frost Vortex' },
  { id: 'mg4-predator', name: 'MG4 - Predator', type: 'LMG', baseAtk: 54, fireRate: 750, magSize: 100, critRate: 6, critDmg: 25, weakspotDmg: 40, element: 'Fast Rate' },
  { id: 'kvd-boom-boom', name: 'KVD - Boom! Boom!', type: 'LMG', baseAtk: 58, fireRate: 650, magSize: 85, critRate: 7, critDmg: 28, weakspotDmg: 45, element: 'Burn' },
  { id: 'awm-bingo', name: 'AWM - Bingo / Bullseye', type: 'Sniper Rifle', baseAtk: 380, fireRate: 45, magSize: 5, critRate: 15, critDmg: 50, weakspotDmg: 100, element: 'Shrapnel / Bullseye' },
  { id: 'mp7-outer-space', name: 'MP7 - Outer Space', type: 'SMG', baseAtk: 42, fireRate: 850, magSize: 35, critRate: 12, critDmg: 35, weakspotDmg: 40, element: 'Power Surge' },
  { id: 'dbg-doomsday', name: 'DB-G - Doomsday', type: 'Shotgun', baseAtk: 180, fireRate: 120, magSize: 8, critRate: 10, critDmg: 30, weakspotDmg: 60, element: 'Unstable Bomber' },
  { id: 'jaws-de50', name: 'DE.50 - Jaws', type: 'Pistol', baseAtk: 165, fireRate: 240, magSize: 7, critRate: 12, critDmg: 40, weakspotDmg: 70, element: 'Unstable Bomber' },
];

const CALIBRATION_STYLES = [
  { id: 'rapid', name: 'Rapid Shot', perk: '+10% Fire Rate, +15% Reload Speed', fireRateBonus: 10, atkBonus: 0, weakspotBonus: 0, statusBonus: 0 },
  { id: 'heavy', name: 'Heavy', perk: '+18% Weapon Attack, +15% Recoil', fireRateBonus: 0, atkBonus: 18, weakspotBonus: 0, statusBonus: 0 },
  { id: 'precise', name: 'Precise', perk: '+25% Weakspot DMG, +15% Stability', fireRateBonus: 0, atkBonus: 0, weakspotBonus: 25, statusBonus: 0 },
  { id: 'tactical', name: 'Tactical', perk: '+20% Mag Capacity, +10% Reload Speed', fireRateBonus: 0, atkBonus: 0, weakspotBonus: 0, statusBonus: 0 },
  { id: 'status', name: 'Elemental Infusion', perk: '+22% Status / Elemental DMG', fireRateBonus: 0, atkBonus: 0, weakspotBonus: 0, statusBonus: 22 },
];

const SUBSTAT_OPTIONS = [
  { id: 'crit_rate', name: 'Crit Rate', values: { rare: 4.5, epic: 6.5, legendary: 8.5 }, unit: '%' },
  { id: 'crit_dmg', name: 'Crit Damage', values: { rare: 10.0, epic: 16.0, legendary: 22.0 }, unit: '%' },
  { id: 'weakspot_dmg', name: 'Weakspot Damage', values: { rare: 10.0, epic: 15.0, legendary: 20.0 }, unit: '%' },
  { id: 'weapon_atk', name: 'Weapon Attack', values: { rare: 5.0, epic: 8.0, legendary: 11.0 }, unit: '%' },
  { id: 'status_dmg', name: 'Status / Elemental DMG', values: { rare: 8.0, epic: 12.0, legendary: 16.0 }, unit: '%' },
  { id: 'mag_size', name: 'Magazine Capacity', values: { rare: 8.0, epic: 12.0, legendary: 18.0 }, unit: '%' },
];

export default function OnceHumanWeaponCalibrationTool() {
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('socr-outsider');
  const [calibrationLevel, setCalibrationLevel] = useState<number>(10); // 0 to 10
  const [selectedStyleId, setSelectedStyleId] = useState<string>('rapid');
  const [blueprintRarity, setBlueprintRarity] = useState<'rare' | 'epic' | 'legendary'>('legendary');
  const [substat1Id, setSubstat1Id] = useState<string>('crit_rate');
  const [substat2Id, setSubstat2Id] = useState<string>('crit_dmg');

  const selectedWeapon = useMemo(() => {
    return WEAPONS.find(w => w.id === selectedWeaponId) || WEAPONS[0];
  }, [selectedWeaponId]);

  const selectedStyle = useMemo(() => {
    return CALIBRATION_STYLES.find(s => s.id === selectedStyleId) || CALIBRATION_STYLES[0];
  }, [selectedStyleId]);

  const substat1 = useMemo(() => {
    const s = SUBSTAT_OPTIONS.find(o => o.id === substat1Id) || SUBSTAT_OPTIONS[0];
    return { ...s, roll: s.values[blueprintRarity] };
  }, [substat1Id, blueprintRarity]);

  const substat2 = useMemo(() => {
    const s = SUBSTAT_OPTIONS.find(o => o.id === substat2Id) || SUBSTAT_OPTIONS[1];
    return { ...s, roll: s.values[blueprintRarity] };
  }, [substat2Id, blueprintRarity]);

  // Calculations
  const calculatedStats = useMemo(() => {
    // Calibration level gives +5% weapon attack per level (e.g. +10 is +50% weapon attack)
    const levelAtkBonusPercent = calibrationLevel * 5;
    
    // Style bonus
    const styleAtkBonusPercent = selectedStyle.atkBonus;
    
    // Substat bonuses
    let extraAtkPercent = 0;
    let extraCritRate = 0;
    let extraCritDmg = 0;
    let extraWeakspotDmg = 0;
    let extraStatusDmg = 0;
    let extraMagPercent = 0;

    const applySubstat = (s: typeof substat1) => {
      if (s.id === 'weapon_atk') extraAtkPercent += s.roll;
      if (s.id === 'crit_rate') extraCritRate += s.roll;
      if (s.id === 'crit_dmg') extraCritDmg += s.roll;
      if (s.id === 'weakspot_dmg') extraWeakspotDmg += s.roll;
      if (s.id === 'status_dmg') extraStatusDmg += s.roll;
      if (s.id === 'mag_size') extraMagPercent += s.roll;
    };

    applySubstat(substat1);
    if (blueprintRarity !== 'rare') {
      applySubstat(substat2);
    }

    const totalAtkPercent = levelAtkBonusPercent + styleAtkBonusPercent + extraAtkPercent;
    const finalAtk = Math.round(selectedWeapon.baseAtk * (1 + totalAtkPercent / 100));

    const finalFireRate = Math.round(selectedWeapon.fireRate * (1 + selectedStyle.fireRateBonus / 100));
    const finalMagSize = Math.round(selectedWeapon.magSize * (1 + (extraMagPercent + (selectedStyle.id === 'tactical' ? 20 : 0)) / 100));

    const finalCritRate = Math.min(100, Math.round((selectedWeapon.critRate + extraCritRate) * 10) / 10);
    const finalCritDmg = Math.round((selectedWeapon.critDmg + extraCritDmg) * 10) / 10;
    const finalWeakspotDmg = Math.round((selectedWeapon.weakspotDmg + extraWeakspotDmg + selectedStyle.weakspotBonus) * 10) / 10;
    const finalStatusDmg = Math.round((extraStatusDmg + selectedStyle.statusBonus) * 10) / 10;

    // DPS Estimation:
    // Raw DPS = FinalATK * (FireRate / 60)
    const rawRps = finalFireRate / 60;
    const critMultiplier = 1 + (finalCritRate / 100) * (finalCritDmg / 100);
    const effectiveDps = Math.round(finalAtk * rawRps * critMultiplier);
    const weakspotDps = Math.round(finalAtk * rawRps * (1 + finalWeakspotDmg / 100) * critMultiplier);

    // Upgrade Materials from 0 to current level
    // Each level requires Tungsten Ingots, Stardust Source, Electronic Parts, Energy Links
    const tungstenIngots = calibrationLevel * 8;
    const stardustSource = calibrationLevel * 25;
    const electronicParts = calibrationLevel * 12;
    const adhesives = calibrationLevel * 10;
    const energyLinks = calibrationLevel * 3500;

    // Roll God Score (0 to 100%)
    let godScore = 70;
    if (blueprintRarity === 'legendary') godScore += 15;
    if (substat1Id === 'crit_rate' || substat1Id === 'crit_dmg' || substat1Id === 'weakspot_dmg') godScore += 7;
    if (substat2Id === 'crit_rate' || substat2Id === 'crit_dmg' || substat2Id === 'status_dmg') godScore += 8;

    return {
      finalAtk,
      totalAtkPercent,
      finalFireRate,
      finalMagSize,
      finalCritRate,
      finalCritDmg,
      finalWeakspotDmg,
      finalStatusDmg,
      effectiveDps,
      weakspotDps,
      godScore: Math.min(100, godScore),
      materials: {
        tungstenIngots,
        stardustSource,
        electronicParts,
        adhesives,
        energyLinks
      }
    };
  }, [selectedWeapon, calibrationLevel, selectedStyle, blueprintRarity, substat1, substat2]);

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider">
              <Crosshair className="w-4 h-4 text-purple-400" />
              <span>Weapon Tuning & Stat Optimizer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Once Human Weapon Calibration & Blueprint Tool
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Calculate +1 to +10 weapon calibration scaling, Rapid/Heavy/Precise blueprint styles, substat roll combinations, true DPS, and Stardust Source upgrade costs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 bg-slate-950/80 border border-purple-500/40 rounded-xl p-4">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-2xl font-black text-amber-400">+{calculatedStats.totalAtkPercent}%</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Total ATK Bonus</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-purple-400">{calculatedStats.godScore}%</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Roll God Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Setup */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weapon Selection */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>1. Choose Tier V Weapon Archetype</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {WEAPONS.map(weapon => (
                <button
                  key={weapon.id}
                  onClick={() => setSelectedWeaponId(weapon.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedWeaponId === weapon.id
                      ? 'border-purple-500 bg-purple-950/60 text-white shadow-lg shadow-purple-950/50'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs truncate">{weapon.name}</div>
                  <div className="text-[10px] text-purple-400 mt-1">{weapon.type}</div>
                  <div className="text-[10px] text-amber-400">{weapon.element}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Calibration Level & Blueprint Style */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>2. Calibration Level & Blueprint Style</span>
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">Calibration Level:</span>
                <span className="text-amber-400 font-black font-mono text-base">+{calibrationLevel}</span>
              </div>
              <input 
                type="range"
                min={0}
                max={10}
                value={calibrationLevel}
                onChange={(e) => setCalibrationLevel(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>+0 (Stock)</span>
                <span>+5 (+25% ATK)</span>
                <span>+10 Max (+50% ATK)</span>
              </div>
            </div>

            {/* Styles */}
            <div className="space-y-2 pt-2">
              <span className="text-xs text-slate-400 font-semibold">Calibration Style:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CALIBRATION_STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyleId(style.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedStyleId === style.id
                        ? 'border-amber-500 bg-amber-950/50 text-amber-300 shadow-md'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs">{style.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{style.perk}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Substats */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>3. Substat Rolls & Quality</span>
              </h3>

              <div className="flex gap-1.5">
                {(['rare', 'epic', 'legendary'] as const).map(rarity => (
                  <button
                    key={rarity}
                    onClick={() => setBlueprintRarity(rarity)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                      blueprintRarity === rarity
                        ? rarity === 'legendary' ? 'bg-amber-500 text-slate-950' : rarity === 'epic' ? 'bg-purple-600 text-white' : 'bg-cyan-600 text-white'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {rarity}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-semibold">Substat Roll 1:</label>
                <select
                  value={substat1Id}
                  onChange={(e) => setSubstat1Id(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                >
                  {SUBSTAT_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name} (+{opt.values[blueprintRarity]}{opt.unit})
                    </option>
                  ))}
                </select>
              </div>

              {blueprintRarity !== 'rare' && (
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold">Substat Roll 2:</label>
                  <select
                    value={substat2Id}
                    onChange={(e) => setSubstat2Id(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                  >
                    {SUBSTAT_OPTIONS.map(opt => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name} (+{opt.values[blueprintRarity]}{opt.unit})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Final Weapon Performance */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              {selectedWeapon.name} (+{calibrationLevel}) Stats
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Weapon Attack:</span>
                <span className="text-amber-400 font-bold font-mono text-base">{calculatedStats.finalAtk}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Fire Rate (RPM):</span>
                <span className="text-white font-mono">{calculatedStats.finalFireRate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Magazine Size:</span>
                <span className="text-white font-mono">{calculatedStats.finalMagSize} rounds</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Crit Rate / Crit DMG:</span>
                <span className="text-cyan-300 font-mono font-semibold">{calculatedStats.finalCritRate}% / +{calculatedStats.finalCritDmg}%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Weakspot DMG:</span>
                <span className="text-emerald-400 font-mono font-semibold">+{calculatedStats.finalWeakspotDmg}%</span>
              </div>
              {calculatedStats.finalStatusDmg > 0 && (
                <div className="flex justify-between items-center py-1 border-b border-slate-800">
                  <span className="text-slate-400">Status DMG Bonus:</span>
                  <span className="text-purple-400 font-mono font-semibold">+{calculatedStats.finalStatusDmg}%</span>
                </div>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Estimated True Sustained DPS:</div>
                <div className="text-2xl font-black text-amber-400 font-mono">{calculatedStats.effectiveDps.toLocaleString()}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Weakspot Precision DPS:</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">{calculatedStats.weakspotDps.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Upgrade Material Cost */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Upgrade Cost (0 to +{calibrationLevel})
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Stardust Source:</span>
                <span className="text-purple-400 font-mono font-bold">{calculatedStats.materials.stardustSource}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tungsten Ingots:</span>
                <span className="text-amber-400 font-mono font-bold">{calculatedStats.materials.tungstenIngots}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Electronic Parts:</span>
                <span className="text-cyan-400 font-mono font-bold">{calculatedStats.materials.electronicParts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Adhesives:</span>
                <span className="text-slate-300 font-mono font-bold">{calculatedStats.materials.adhesives}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 font-bold">
                <span className="text-slate-400">Energy Links:</span>
                <span className="text-emerald-400 font-mono">{calculatedStats.materials.energyLinks.toLocaleString()} EL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
