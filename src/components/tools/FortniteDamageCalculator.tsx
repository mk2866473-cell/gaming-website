/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Crosshair, Shield, Zap, Sword, Heart, AlertTriangle, Sparkles, Check
} from 'lucide-react';
import { FORTNITE_WEAPONS, FortniteWeaponItem } from '../../data/fortniteData';

export default function FortniteDamageCalculator() {
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('gatekeeper-leg');
  const [hitType, setHitType] = useState<'body' | 'headshot' | 'pellet-custom'>('body');
  const [pelletHitPercent, setPelletHitPercent] = useState<number>(100);
  const [isZeroBuild, setIsZeroBuild] = useState<boolean>(false);
  const [enemyShield, setEnemyShield] = useState<number>(100); // 0 - 100

  const selectedWeapon = FORTNITE_WEAPONS.find(w => w.id === selectedWeaponId) || FORTNITE_WEAPONS[0];

  const calculation = useMemo(() => {
    let rawHitDamage = selectedWeapon.damage;

    if (hitType === 'headshot') {
      rawHitDamage = Math.round(selectedWeapon.damage * selectedWeapon.headshotMultiplier);
    } else if (hitType === 'pellet-custom' && selectedWeapon.category === 'shotgun') {
      rawHitDamage = Math.round(selectedWeapon.damage * (pelletHitPercent / 100));
    }

    // Target total effective health:
    // Standard BR: 100 HP + Shield (0-100) = Max 200 EHP
    // Zero Build: 100 HP + Shield (0-100) + 50 Overshield = Max 250 EHP
    const maxEhp = 100 + enemyShield + (isZeroBuild ? 50 : 0);

    const hitsToKill = Math.ceil(maxEhp / rawHitDamage);
    // Time to kill: (hits - 1) / fireRate (first shot is instant at t=0)
    const timeToKillSec = hitsToKill > 1 
      ? ((hitsToKill - 1) / selectedWeapon.fireRate).toFixed(2)
      : '0.00 (Instant One-Shot)';

    const dps = Math.round(selectedWeapon.damage * selectedWeapon.fireRate);

    return {
      rawHitDamage,
      maxEhp,
      hitsToKill,
      timeToKillSec,
      dps
    };
  }, [selectedWeapon, hitType, pelletHitPercent, isZeroBuild, enemyShield]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Zero Build Toggle & Mode Selection */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isZeroBuild}
            onChange={(e) => setIsZeroBuild(e.target.checked)}
            className="w-4 h-4 rounded accent-cyan-500 bg-zinc-900 border-zinc-700 cursor-pointer"
          />
          <span className="font-bold text-white">Zero Build Mode (+50 Recharging Overshield)</span>
        </label>

        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Target Shield:</span>
          {[0, 50, 100].map((s) => (
            <button
              key={s}
              onClick={() => setEnemyShield(s)}
              className={`px-2 py-0.5 rounded font-mono text-xs border ${
                enemyShield === s ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              {s} Shield
            </button>
          ))}
        </div>
      </div>

      {/* Weapon Selector */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
        <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
          Select Weapon & Rarity
        </label>
        <select
          value={selectedWeaponId}
          onChange={(e) => setSelectedWeaponId(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
        >
          {FORTNITE_WEAPONS.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name} ({w.rarity}) — Base Dmg: {w.damage} | {w.headshotMultiplier}x HS | {w.fireRate} Fire Rate
            </option>
          ))}
        </select>
      </div>

      {/* Hit Type Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
        <button
          onClick={() => setHitType('body')}
          className={`py-2 rounded-lg text-xs font-bold transition-all ${
            hitType === 'body' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Body Shot (1.0×)
        </button>
        <button
          onClick={() => setHitType('headshot')}
          className={`py-2 rounded-lg text-xs font-bold transition-all ${
            hitType === 'headshot' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Headshot ({selectedWeapon.headshotMultiplier}× Crit)
        </button>
        <button
          onClick={() => setHitType('pellet-custom')}
          className={`py-2 rounded-lg text-xs font-bold transition-all ${
            hitType === 'pellet-custom' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Pellet Spread (% Hit)
        </button>
      </div>

      {/* Output Damage Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center shadow-lg shadow-amber-950/30">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Single Hit Damage</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 my-1 block">
            {calculation.rawHitDamage} <span className="text-xs font-normal text-zinc-400">Dmg</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            Weapon DPS: {calculation.dps}
          </span>
        </div>

        <div className="bg-zinc-950 border border-rose-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-rose-400 block">Hits to Eliminate</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-rose-400 my-1 block">
            {calculation.hitsToKill} {calculation.hitsToKill === 1 ? 'Hit (One-Pump)' : 'Hits'}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Against {calculation.maxEhp} Total EHP
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">Theoretical TTK (Time to Kill)</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400 my-1 block">
            {calculation.timeToKillSec}
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            @ {selectedWeapon.fireRate} rounds/sec
          </span>
        </div>
      </div>
    </div>
  );
}
