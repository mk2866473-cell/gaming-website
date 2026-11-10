/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Crosshair, Zap, Flame, ShieldAlert, Sparkles, 
  RotateCcw, Info, Award, CheckCircle2, Sliders, 
  Layers, Trophy, AlertTriangle, Eye
} from 'lucide-react';

interface WeaponBase {
  id: string;
  name: string;
  type: 'Rifle' | 'Sniper' | 'Shotgun' | 'Pistol';
  damageType: 'Physical' | 'Energy' | 'Particle' | 'Laser';
  baseDamage: number;
  fireRate: number; // rounds per minute
  magSize: number;
  ammo: string;
}

const WEAPON_BASES: WeaponBase[] = [
  { id: 'hard_target', name: 'Hard Target (.50 Cal Sniper)', type: 'Sniper', damageType: 'Physical', baseDamage: 116, fireRate: 25, magSize: 5, ammo: '.50 Caliber' },
  { id: 'varuun_inflictor', name: 'Va\'ruun Inflictor (Particle Beam Rifle)', type: 'Rifle', damageType: 'Particle', baseDamage: 151, fireRate: 50, magSize: 20, ammo: 'Heavy Particle Fuse' },
  { id: 'beowulf', name: 'Beowulf (7.77mm Precision Rifle)', type: 'Rifle', damageType: 'Physical', baseDamage: 36, fireRate: 90, magSize: 30, ammo: '7.77mm' },
  { id: 'big_bang', name: 'Big Bang (Particle Beam Shotgun)', type: 'Shotgun', damageType: 'Particle', baseDamage: 126, fireRate: 60, magSize: 8, ammo: 'Heavy Particle Fuse' },
  { id: 'magpulse', name: 'Magpulse (25-Beam Magnetic Rifle)', type: 'Rifle', damageType: 'Physical', baseDamage: 88, fireRate: 45, magSize: 25, ammo: '6.5mm MI Array' },
  { id: 'urban_eagle', name: 'Urban Eagle (.43 Ultramag Pistol)', type: 'Pistol', damageType: 'Physical', baseDamage: 43, fireRate: 60, magSize: 7, ammo: '.43 Ultramag' }
];

export const StarfieldWeaponModCalculator: React.FC = () => {
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('varuun_inflictor');
  const [tierMultiplier, setTierMultiplier] = useState<number>(2.2); // Base 1.0, Calibrated 1.3, Refined 1.7, Advanced 2.2, Superior 2.5

  // Weapon Mods
  const [receiverMod, setReceiverMod] = useState<'semi' | 'auto' | 'burst'>('semi');
  const [internalMod, setInternalMod] = useState<'high_powered' | 'hair_trigger' | 'standard'>('high_powered');
  const [barrelMod, setBarrelMod] = useState<'long' | 'standard'>('long');
  const [ammoMod, setAmmoMod] = useState<'armor_piercing' | 'depleted_uranium' | 'standard'>('armor_piercing');
  const [hasSuppressor, setHasSuppressor] = useState<boolean>(true);

  // Player Skills
  const [weaponTypeSkillRank, setWeaponTypeSkillRank] = useState<number>(4); // Rifle/Pistol/Shotgun cert (0% to 30%)
  const [damageTypeSkillRank, setDamageTypeSkillRank] = useState<number>(4); // Ballistics/Particle (0% to 30%)
  const [sneakAttackRank, setSneakAttackRank] = useState<number>(4); // Rank 1: 2.0x, Rank 2: 2.5x, Rank 3: 3.0x, Rank 4: 4.0x
  const [hasConcealmentPerk, setHasConcealmentPerk] = useState<boolean>(true); // up to 4.0x -> 10.0x sneak with sniper
  const [armorPenetrationRank, setArmorPenetrationRank] = useState<number>(3); // 15%, 30%, 50%

  // Target Simulation
  const [targetArmor, setTargetArmor] = useState<number>(150); // Level 50-80 pirate boss armor

  const weapon = useMemo(() => {
    return WEAPON_BASES.find(w => w.id === selectedWeaponId) || WEAPON_BASES[0];
  }, [selectedWeaponId]);

  // Calculations
  const stats = useMemo(() => {
    // Base quality scaling
    let damage = weapon.baseDamage * tierMultiplier;

    // Receiver modifier
    let fireRate = weapon.fireRate;
    if (receiverMod === 'semi') {
      damage *= 1.20; // +20% damage
    } else if (receiverMod === 'auto') {
      damage *= 0.65; // -35% damage per bullet
      fireRate *= 2.8; // almost 3x fire rate
    } else if (receiverMod === 'burst') {
      damage *= 0.90;
      fireRate *= 1.8;
    }

    // Internal mod
    if (internalMod === 'high_powered') {
      damage *= 1.15; // +15% damage
    } else if (internalMod === 'hair_trigger') {
      fireRate *= 1.20; // +20% fire rate
    }

    // Barrel mod
    if (barrelMod === 'long') {
      damage *= 1.10; // +10% damage
    }

    // Skill bonuses (additive percentage)
    const typeBonus = [0, 0.10, 0.20, 0.30, 0.30][weaponTypeSkillRank] || 0;
    const elemBonus = [0, 0.10, 0.20, 0.30, 0.30][damageTypeSkillRank] || 0;
    damage *= (1 + typeBonus + elemBonus);

    // Armor Penetration calculation
    let ignoredArmorPercent = [0, 0.15, 0.30, 0.50][armorPenetrationRank] || 0;
    if (ammoMod === 'armor_piercing') {
      ignoredArmorPercent = Math.min(0.85, ignoredArmorPercent + 0.25);
    }
    const effectiveArmor = targetArmor * (1 - ignoredArmorPercent);
    const armorMitigationMult = 1 - (effectiveArmor / (effectiveArmor + 100)); // Bethesda armor formula

    const singleShotNominal = Math.round(damage);
    const singleShotMitigated = Math.round(damage * armorMitigationMult);

    // Sneak Attack Multiplier
    let sneakMult = [2.0, 2.0, 2.5, 3.0, 4.0][sneakAttackRank] || 2.0;
    if (hasSuppressor && hasConcealmentPerk && weapon.type === 'Sniper') {
      sneakMult = 10.0; // Legendary 10x suppressed sniper shot!
    } else if (hasSuppressor && hasConcealmentPerk) {
      sneakMult = Math.min(8.0, sneakMult * 2.0);
    }

    const sneakAttackDamage = Math.round(singleShotMitigated * sneakMult);
    const critDamage = Math.round(singleShotMitigated * 2.0);

    // DPS calculation
    const shotsPerSec = fireRate / 60;
    const burstDps = Math.round(singleShotMitigated * shotsPerSec);

    return {
      singleShotNominal,
      singleShotMitigated,
      effectiveArmor: Math.round(effectiveArmor),
      armorMitigationPercent: Math.round((1 - armorMitigationMult) * 100),
      sneakMult,
      sneakAttackDamage,
      critDamage,
      burstDps,
      effectiveFireRate: Math.round(fireRate)
    };
  }, [
    weapon, tierMultiplier, receiverMod, internalMod, barrelMod,
    ammoMod, hasSuppressor, weaponTypeSkillRank, damageTypeSkillRank,
    sneakAttackRank, hasConcealmentPerk, armorPenetrationRank, targetArmor
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5" /> Weapon Engineering Bench
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                Advanced Quality Tier
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Weapon Modding Damage Multiplier
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Calculate single-shot alpha damage, Armor-Piercing penetration, High-Powered receivers, and 10× suppressed sneak attack one-shot bursts against heavily armored pirate bosses.
            </p>
          </div>

          {/* Big Sneak Attack Badge */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Sneak One-Shot Burst</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-baseline gap-1">
                {stats.sneakAttackDamage.toLocaleString()} <span className="text-xs font-semibold text-slate-400">DMG</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                {stats.sneakMult}× Multiplier • Normal: {stats.singleShotMitigated} DMG
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
        {/* Left Column: Weapon Selection & Mods */}
        <div className="lg:col-span-6 space-y-4">
          {/* Base Weapon Select */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400" /> Base Weapon & Quality Tier
            </h3>

            <select
              value={selectedWeaponId}
              onChange={(e) => setSelectedWeaponId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
            >
              {WEAPON_BASES.map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.type} - {w.baseDamage} Base {w.damageType})
                </option>
              ))}
            </select>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-400 mb-1.5 flex justify-between">
                <span>Weapon Quality Tier:</span>
                <span className="font-bold text-cyan-400">
                  {tierMultiplier === 1.0 ? 'Standard (1.0x)' : tierMultiplier === 1.3 ? 'Calibrated (1.3x)' : tierMultiplier === 1.7 ? 'Refined (1.7x)' : tierMultiplier === 2.2 ? 'Advanced (2.2x)' : 'Superior (2.5x)'}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {[
                  { mult: 1.0, label: 'Base' },
                  { mult: 1.3, label: 'Calib.' },
                  { mult: 1.7, label: 'Refined' },
                  { mult: 2.2, label: 'Adv.' },
                  { mult: 2.5, label: 'Super.' }
                ].map(t => (
                  <button
                    key={t.mult}
                    onClick={() => setTierMultiplier(t.mult)}
                    className={`py-1.5 rounded text-xs font-semibold transition-all ${
                      tierMultiplier === t.mult ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Workbench Weapon Mods */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" /> Workbench Weapon Attachments
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 mb-1 block">Receiver Mod</span>
                <select
                  value={receiverMod}
                  onChange={(e) => setReceiverMod(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded p-2"
                >
                  <option value="semi">Semi-Automatic (+20% Dmg)</option>
                  <option value="auto">Full-Auto (-35% Dmg, 3x ROF)</option>
                  <option value="burst">Burst Fire (3-Round)</option>
                </select>
              </div>

              <div>
                <span className="text-slate-400 mb-1 block">Internal Mod</span>
                <select
                  value={internalMod}
                  onChange={(e) => setInternalMod(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded p-2"
                >
                  <option value="high_powered">High Powered (+15% Dmg)</option>
                  <option value="hair_trigger">Hair Trigger (+20% ROF)</option>
                  <option value="standard">Standard Internal</option>
                </select>
              </div>

              <div>
                <span className="text-slate-400 mb-1 block">Ammo / Magazine Mod</span>
                <select
                  value={ammoMod}
                  onChange={(e) => setAmmoMod(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded p-2"
                >
                  <option value="armor_piercing">Armor-Piercing Rounds</option>
                  <option value="depleted_uranium">Depleted Uranium (+Pen)</option>
                  <option value="standard">Standard Magazine</option>
                </select>
              </div>

              <div>
                <span className="text-slate-400 mb-1 block">Muzzle Attachment</span>
                <label className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-700 rounded cursor-pointer h-9">
                  <input
                    type="checkbox"
                    checked={hasSuppressor}
                    onChange={(e) => setHasSuppressor(e.target.checked)}
                    className="rounded text-cyan-500 focus:ring-0"
                  />
                  <span className="text-slate-200">Suppressor (Stealth)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Perks, Armor Piercing & Output */}
        <div className="lg:col-span-6 space-y-4">
          {/* Target Armor & Simulation */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" /> Target Armor Penetration
            </h3>

            <div>
              <div className="text-xs text-slate-400 mb-1 flex justify-between">
                <span>Target Armor Rating (Pirate Boss DR)</span>
                <span className="font-bold text-amber-400">{targetArmor} DR</span>
              </div>
              <input
                type="range"
                min="50"
                max="350"
                value={targetArmor}
                onChange={(e) => setTargetArmor(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-950 h-2 rounded cursor-pointer"
              />
              <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                <span>Effective Armor after penetration: <strong className="text-cyan-400">{stats.effectiveArmor} DR</strong></span>
                <span>Mitigates: <strong className="text-red-400">{stats.armorMitigationPercent}%</strong></span>
              </div>
            </div>
          </div>

          {/* Damage Output Display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Single Shot</div>
              <div className="text-2xl font-black text-white mt-1">{stats.singleShotMitigated}</div>
              <div className="text-[10px] text-slate-500">Nominal: {stats.singleShotNominal}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Critical Hit</div>
              <div className="text-2xl font-black text-red-400 mt-1">{stats.critDamage}</div>
              <div className="text-[10px] text-slate-500">2x Headshot</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Burst DPS</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">{stats.burstDps}</div>
              <div className="text-[10px] text-slate-500">{stats.effectiveFireRate} RPM</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Sneak Mult</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{stats.sneakMult}×</div>
              <div className="text-[10px] text-slate-500">Concealment 4</div>
            </div>
          </div>

          {/* Tactical Modding Tips */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
            <div className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Starfield Gunsmithing Secrets
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
              <li><strong className="text-slate-200">Va'ruun Inflictor:</strong> Deals both Physical and Energy damage simultaneously, multiplying with both Particle Beam and Rifle Certification skills!</li>
              <li><strong className="text-slate-200">Suppressor + Concealment:</strong> Rank 4 Concealment multiplies sniper rifle sneak attacks to 10×, allowing one-shot eliminations on level 100 Legendary enemies.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StarfieldWeaponModCalculator;
