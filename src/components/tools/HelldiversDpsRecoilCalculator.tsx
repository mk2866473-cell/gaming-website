/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Crosshair, Zap, Activity, Flame, Volume2, Share2, Check, 
  Sparkles, Gauge, Target, Sliders, ArrowRight, TrendingUp, 
  Award, Shield, HelpCircle, AlertTriangle, Layers, RotateCcw
} from 'lucide-react';

export type FireMode = 'auto' | 'burst' | 'single';

export interface WeaponDpsData {
  id: string;
  name: string;
  shortName: string;
  damage: number; // Single shot or full pellet cluster
  pelletCount?: number;
  rpm: number;
  magSize: number;
  reloadTime: number; // in seconds
  verticalRecoil: number; // 0-100
  horizontalRecoil: number; // 0-100
  spread: number; // in mrad (milliradians)
  ergonomics: number; // 0-100 (handling)
  armorPen: 'Light' | 'Medium' | 'Medium Explosive' | 'Heavy Explosive';
  damageType: 'Kinetic Ballistic' | 'Energy Laser' | 'Plasma Explosive' | 'Heavy Shell';
  dropOffStartMeters: number;
  dropOffEndMeters: number;
  minDamagePercent: number; // at 100m
  isMeta?: boolean;
  tier: 'S-Tier' | 'A-Tier' | 'B-Tier';
  description: string;
  soundType: 'rifle' | 'shotgun' | 'laser' | 'explosive' | 'plasma';
}

export const WEAPONS_CATALOG: WeaponDpsData[] = [
  {
    id: 'sg-225-breaker',
    name: 'SG-225 Breaker',
    shortName: 'Breaker',
    damage: 400, // 50 x 8 pellets
    pelletCount: 8,
    rpm: 300,
    magSize: 13,
    reloadTime: 2.7,
    verticalRecoil: 50,
    horizontalRecoil: 40,
    spread: 45,
    ergonomics: 60,
    armorPen: 'Light',
    damageType: 'Kinetic Ballistic',
    dropOffStartMeters: 15,
    dropOffEndMeters: 60,
    minDamagePercent: 40,
    isMeta: true,
    tier: 'S-Tier',
    description: 'High-burst automatic shotgun delivering 400 damage per shell. Shreds unarmored flesh in seconds.',
    soundType: 'shotgun'
  },
  {
    id: 'las-16-sickle',
    name: 'LAS-16 Sickle',
    shortName: 'Sickle',
    damage: 55,
    rpm: 750,
    magSize: 85, // continuous shots before heat sink overload
    reloadTime: 2.0,
    verticalRecoil: 15,
    horizontalRecoil: 10,
    spread: 5,
    ergonomics: 85,
    armorPen: 'Light',
    damageType: 'Energy Laser',
    dropOffStartMeters: 40,
    dropOffEndMeters: 100,
    minDamagePercent: 85,
    isMeta: true,
    tier: 'S-Tier',
    description: 'The golden standard meta assault rifle: 750 RPM laser beam with near-zero recoil and infinite battery.',
    soundType: 'laser'
  },
  {
    id: 'plas-1-scorcher',
    name: 'PLAS-1 Scorcher',
    shortName: 'Scorcher',
    damage: 250,
    rpm: 200,
    magSize: 15,
    reloadTime: 2.8,
    verticalRecoil: 45,
    horizontalRecoil: 25,
    spread: 8,
    ergonomics: 60,
    armorPen: 'Medium Explosive',
    damageType: 'Plasma Explosive',
    dropOffStartMeters: 35,
    dropOffEndMeters: 100,
    minDamagePercent: 90,
    isMeta: true,
    tier: 'S-Tier',
    description: 'Explosive plasma rounds that pierce medium armor and bypass Automaton Scout Strider faceplates.',
    soundType: 'plasma'
  },
  {
    id: 'ar-23-liberator',
    name: 'AR-23 Liberator',
    shortName: 'Liberator',
    damage: 70,
    rpm: 640,
    magSize: 45,
    reloadTime: 2.1,
    verticalRecoil: 30,
    horizontalRecoil: 15,
    spread: 10,
    ergonomics: 70,
    armorPen: 'Light',
    damageType: 'Kinetic Ballistic',
    dropOffStartMeters: 25,
    dropOffEndMeters: 75,
    minDamagePercent: 60,
    tier: 'A-Tier',
    description: 'Standard issue Super Earth rifle with 45-round magazines, balanced fire rate, and snappy handling.',
    soundType: 'rifle'
  },
  {
    id: 'ar-61-tenderizer',
    name: 'AR-61 Tenderizer',
    shortName: 'Tenderizer',
    damage: 95,
    rpm: 400,
    magSize: 35,
    reloadTime: 2.5,
    verticalRecoil: 40,
    horizontalRecoil: 20,
    spread: 6,
    ergonomics: 75,
    armorPen: 'Light',
    damageType: 'Kinetic Ballistic',
    dropOffStartMeters: 30,
    dropOffEndMeters: 80,
    minDamagePercent: 70,
    tier: 'A-Tier',
    description: 'Heavy assault rifle firing 95-damage high-caliber cartridges with tight grouping and precision.',
    soundType: 'rifle'
  },
  {
    id: 'ar-23p-liberator-penetrator',
    name: 'AR-23P Liberator Penetrator',
    shortName: 'Penetrator',
    damage: 75,
    rpm: 320,
    magSize: 30,
    reloadTime: 2.3,
    verticalRecoil: 35,
    horizontalRecoil: 18,
    spread: 8,
    ergonomics: 65,
    armorPen: 'Medium',
    damageType: 'Kinetic Ballistic',
    dropOffStartMeters: 30,
    dropOffEndMeters: 80,
    minDamagePercent: 65,
    tier: 'A-Tier',
    description: 'Armor-piercing rounds capable of directly puncturing Hive Guards and Automaton Devastators.',
    soundType: 'rifle'
  },
  {
    id: 'sg-8s-slugger',
    name: 'SG-8S Slugger',
    shortName: 'Slugger',
    damage: 300,
    rpm: 80,
    magSize: 8,
    reloadTime: 3.2,
    verticalRecoil: 70,
    horizontalRecoil: 30,
    spread: 15,
    ergonomics: 45,
    armorPen: 'Medium',
    damageType: 'Heavy Shell',
    dropOffStartMeters: 20,
    dropOffEndMeters: 60,
    minDamagePercent: 50,
    tier: 'A-Tier',
    description: 'Single solid shotgun slug delivering 300 kinetic punch. Can blow through wooden doors and armor.',
    soundType: 'shotgun'
  },
  {
    id: 'r-36-eruptor',
    name: 'R-36 Eruptor',
    shortName: 'Eruptor',
    damage: 550,
    rpm: 30,
    magSize: 5,
    reloadTime: 3.5,
    verticalRecoil: 90,
    horizontalRecoil: 40,
    spread: 5,
    ergonomics: 30,
    armorPen: 'Heavy Explosive',
    damageType: 'Heavy Shell',
    dropOffStartMeters: 50,
    dropOffEndMeters: 100,
    minDamagePercent: 95,
    tier: 'S-Tier',
    description: 'Bolt-action heavy explosive cannon. Shrapnel obliterates swarms and collapses fabricators.',
    soundType: 'explosive'
  },
  {
    id: 'las-5-scythe',
    name: 'LAS-5 Scythe',
    shortName: 'Scythe',
    damage: 350,
    rpm: 100,
    magSize: 100,
    reloadTime: 2.0,
    verticalRecoil: 5,
    horizontalRecoil: 3,
    spread: 2,
    ergonomics: 90,
    armorPen: 'Light',
    damageType: 'Energy Laser',
    dropOffStartMeters: 50,
    dropOffEndMeters: 100,
    minDamagePercent: 90,
    tier: 'B-Tier',
    description: 'Continuous continuous-beam energy laser with pinpoint surgical accuracy and no recoil.',
    soundType: 'laser'
  }
];

export default function HelldiversDpsRecoilCalculator() {
  // Weapon 1 & Weapon 2 (Compare Mode)
  const [selectedWeapon1Id, setSelectedWeapon1Id] = useState<string>('sg-225-breaker');
  const [selectedWeapon2Id, setSelectedWeapon2Id] = useState<string>('las-16-sickle');
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [fireMode, setFireMode] = useState<FireMode>('auto');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showTierListModal, setShowTierListModal] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active Weapon 1
  const weapon1 = useMemo(() => {
    return WEAPONS_CATALOG.find(w => w.id === selectedWeapon1Id) || WEAPONS_CATALOG[0];
  }, [selectedWeapon1Id]);

  // Active Weapon 2 (for Compare Mode)
  const weapon2 = useMemo(() => {
    return WEAPONS_CATALOG.find(w => w.id === selectedWeapon2Id) || WEAPONS_CATALOG[1];
  }, [selectedWeapon2Id]);

  // Calculations Helper for any weapon
  const computeStats = (w: WeaponDpsData) => {
    // Fire Mode RPM scaling:
    // Auto: 100% RPM
    // Burst: 85% effective RPM (slight trigger delay)
    // Single: 60% effective RPM (semi-auto tap limit)
    let effectiveRpm = w.rpm;
    if (fireMode === 'burst') effectiveRpm = Math.round(w.rpm * 0.85);
    else if (fireMode === 'single') effectiveRpm = Math.min(300, Math.round(w.rpm * 0.60));

    // 1. Burst DPS = (Damage * RPM) / 60
    const burstDps = Math.round((w.damage * effectiveRpm) / 60);

    // 2. Mag Dump Time = (Mag Size / RPM) * 60
    const magDumpTime = Number(((w.magSize / effectiveRpm) * 60).toFixed(2));

    // 3. Sustained DPS = (Damage * Mag Size) / (Mag Dump Time + Reload Time)
    const totalCycleTime = magDumpTime + w.reloadTime;
    const totalMagDamage = w.damage * w.magSize;
    const sustainedDps = Math.round(totalMagDamage / totalCycleTime);

    // 4. Recoil Score = (Vertical + Horizontal) / 2
    const recoilScore = Math.round((w.verticalRecoil + w.horizontalRecoil) / 2);
    let recoilRating = 'Low (Laser)';
    if (recoilScore > 55) recoilRating = 'High (Heavy Kick)';
    else if (recoilScore >= 30) recoilRating = 'Medium (Balanced)';

    // 5. Time to Kill Bile Titan (2,500 HP sack / head exposed)
    // Shots Needed = Math.ceil(2500 / Damage)
    const shotsToKillTitan = Math.ceil(2500 / w.damage);
    const magsNeededTitan = Math.ceil(shotsToKillTitan / w.magSize);
    const reloadsNeededTitan = Math.max(0, magsNeededTitan - 1);
    const firingTimeTitan = (shotsToKillTitan - 1) / (effectiveRpm / 60);
    const ttkBileTitan = Number((firingTimeTitan + (reloadsNeededTitan * w.reloadTime)).toFixed(1));

    // 6. Time to Kill Hulk Eye Weakspot (1,500 HP / 2x weakspot = 750 effective)
    const shotsToKillHulk = Math.ceil(750 / w.damage);
    const magsNeededHulk = Math.ceil(shotsToKillHulk / w.magSize);
    const reloadsNeededHulk = Math.max(0, magsNeededHulk - 1);
    const firingTimeHulk = (shotsToKillHulk - 1) / (effectiveRpm / 60);
    const ttkHulk = Number((firingTimeHulk + (reloadsNeededHulk * w.reloadTime)).toFixed(1));

    return {
      effectiveRpm,
      burstDps,
      magDumpTime,
      sustainedDps,
      recoilScore,
      recoilRating,
      shotsToKillTitan,
      ttkBileTitan,
      shotsToKillHulk,
      ttkHulk
    };
  };

  const stats1 = useMemo(() => computeStats(weapon1), [weapon1, fireMode]);
  const stats2 = useMemo(() => computeStats(weapon2), [weapon2, fireMode]);

  // Audio Synthesizer (Realistic tactical weapon sound without external MP3 files)
  const playWeaponSound = (type: WeaponDpsData['soundType']) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'shotgun') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'plasma') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'explosive') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.45);
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else {
        // Rifle
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.1);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch {
      // AudioContext fallback
    }
  };

  // Draw CSGO-style Recoil Pattern Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Target Paper Rings (Gun Range Target)
    const centerX = width / 2;
    const centerY = height * 0.65; // lower center so vertical recoil climbs upward

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;

    for (let r = 30; r <= 140; r += 25) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Crosshairs
    ctx.strokeStyle = '#3f3f46';
    ctx.beginPath();
    ctx.moveTo(centerX - 140, centerY);
    ctx.lineTo(centerX + 140, centerY);
    ctx.moveTo(centerX, centerY - 140);
    ctx.lineTo(centerX, centerY + 140);
    ctx.stroke();

    // Bullseye center dot
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw Simulated Bullet Impact Cluster
    const numBullets = Math.min(25, weapon1.magSize);
    const vertScale = (weapon1.verticalRecoil / 100) * 1.8;
    const horizScale = (weapon1.horizontalRecoil / 100) * 1.5;
    const spreadScale = (weapon1.spread / 50) * 8;

    ctx.fillStyle = '#FFE900';
    ctx.shadowColor = '#FFE900';
    ctx.shadowBlur = 6;

    // Pseudo-random deterministic spray path
    let currentX = centerX;
    let currentY = centerY;

    for (let i = 0; i < numBullets; i++) {
      // Climb upward with each shot + horizontal drift
      const kickY = (i * 3.8 * vertScale) + (Math.sin(i * 1.2) * spreadScale);
      const kickX = (Math.sin(i * 0.8) * 12 * horizScale) + ((Math.cos(i * 2.1)) * spreadScale);

      const shotX = centerX + kickX;
      const shotY = centerY - kickY;

      ctx.beginPath();
      ctx.arc(shotX, shotY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Connecting faint tracer line
      if (i > 0) {
        ctx.strokeStyle = 'rgba(255, 233, 0, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(shotX, shotY);
        ctx.stroke();
      }

      currentX = shotX;
      currentY = shotY;
    }

    ctx.shadowBlur = 0;
  }, [weapon1, fireMode]);

  // Viral Feature: "Is it better than Sickle?"
  const handleCompareWithSickle = () => {
    setSelectedWeapon2Id('las-16-sickle');
    setIsCompareMode(true);
  };

  // Copy share message
  const handleShare = () => {
    const text = `HELLDIVERS 2 WEAPON DPS BREAKDOWN\n` +
      `Weapon: ${weapon1.name} (${weapon1.tier})\n` +
      `Burst DPS: ${stats1.burstDps} | Sustained DPS: ${stats1.sustainedDps}\n` +
      `Time to Kill vs Bile Titan: ${stats1.ttkBileTitan}s (${stats1.shotsToKillTitan} shots)\n` +
      `Time to Kill vs Hulk Visor: ${stats1.ttkHulk}s\n` +
      `Recoil: ${stats1.recoilScore}/100 (${stats1.recoilRating}) | Mag Dump: ${stats1.magDumpTime}s\n` +
      `Calculated via GamingToolsHub.com/tools/helldivers-2-dps-calculator`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Top Warbond / Tactical Header */}
      <div className="bg-[#090a0f] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#FFE900] text-black text-[10px] sm:text-xs font-mono font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
          Super Earth Ordnance Testing Facility · 2026 Ballistics
        </div>

        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFE900] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
              Kinetic Ballistics, Recoil Bloom & TTK Engine
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Helldivers 2 DPS, Recoil & Handling Calculator
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Analyze raw Burst DPS, Sustained DPS factoring reloads, CS:GO-style spray recoil patterns, and exact <strong>Time to Kill vs Bile Titans & Hulks</strong> across all primary firearms.
          </p>
        </div>

        {/* Viral Quick Buttons */}
        <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-wrap gap-2.5">
          <button
            onClick={handleCompareWithSickle}
            className="px-4 py-2 bg-[#FFE900] hover:bg-[#FFE900]/90 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Is it better than Sickle? (Compare vs Meta)</span>
          </button>

          <button
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              isCompareMode 
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' 
                : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>{isCompareMode ? 'Exit Compare Mode' : 'Compare 2 Weapons Side-by-Side'}</span>
          </button>

          <button
            onClick={() => setShowTierListModal(true)}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4 text-[#FFE900]" />
            <span>Export as Tier List (S/A/B Tiers)</span>
          </button>
        </div>
      </div>

      {/* Weapon Selectors & Fire Mode Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-[#FFE900]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Primary Firearm Arsenal
            </h3>
          </div>

          {/* Fire Mode Toggles (Auto / Burst / Single) */}
          <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            {(['auto', 'burst', 'single'] as FireMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setFireMode(mode)}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer ${
                  fireMode === mode
                    ? 'bg-[#FFE900] text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdowns Grid (1 or 2 in Compare Mode) */}
        <div className={`grid grid-cols-1 ${isCompareMode ? 'sm:grid-cols-2' : ''} gap-4`}>
          {/* Weapon 1 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                {isCompareMode ? 'Weapon 1 (Primary)' : 'Select Primary Weapon'}
              </label>
              <button
                onClick={() => playWeaponSound(weapon1.soundType)}
                className="text-[11px] font-mono text-[#FFE900] hover:underline flex items-center gap-1 cursor-pointer"
                title="Click to hear weapon sound"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Weapon Sound</span>
              </button>
            </div>
            <select
              value={selectedWeapon1Id}
              onChange={(e) => setSelectedWeapon1Id(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-[#FFE900]"
            >
              {WEAPONS_CATALOG.map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} — {w.damage} Dmg, {w.rpm} RPM ({w.tier})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-zinc-400 italic">
              {weapon1.description}
            </p>
          </div>

          {/* Weapon 2 (Compare Mode) */}
          {isCompareMode && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Weapon 2 (Comparison)
                </label>
                <button
                  onClick={() => playWeaponSound(weapon2.soundType)}
                  className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  title="Click to hear weapon sound"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear Weapon Sound</span>
                </button>
              </div>
              <select
                value={selectedWeapon2Id}
                onChange={(e) => setSelectedWeapon2Id(e.target.value)}
                className="w-full bg-zinc-950 border border-cyan-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-cyan-400"
              >
                {WEAPONS_CATALOG.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} — {w.damage} Dmg, {w.rpm} RPM ({w.tier})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-zinc-400 italic">
                {weapon2.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Middle Row: 3 Big Numbers & TTK Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Burst DPS */}
        <div className="bg-gradient-to-b from-[#141724] to-[#0c0e17] border-2 border-[#FFE900] rounded-2xl p-5 space-y-2 text-center shadow-xl">
          <span className="text-[10px] font-mono uppercase text-[#FFE900] block tracking-wider font-bold">
            Burst DPS (Raw Cycle)
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono text-white">
            {stats1.burstDps} <span className="text-xs font-sans text-zinc-400">DPS</span>
          </div>
          {isCompareMode && (
            <div className="text-xs font-mono pt-1 border-t border-zinc-800 text-cyan-300">
              vs {weapon2.shortName}: <strong>{stats2.burstDps} DPS</strong> ({stats1.burstDps > stats2.burstDps ? `+${stats1.burstDps - stats2.burstDps} advantage` : `${stats1.burstDps - stats2.burstDps}`})
            </div>
          )}
          <span className="text-[10px] font-mono text-zinc-500 block">
            (Damage {weapon1.damage} × {stats1.effectiveRpm} RPM) / 60
          </span>
        </div>

        {/* Card 2: Sustained DPS */}
        <div className="bg-gradient-to-b from-[#141724] to-[#0c0e17] border-2 border-emerald-500/60 rounded-2xl p-5 space-y-2 text-center shadow-xl">
          <span className="text-[10px] font-mono uppercase text-emerald-400 block tracking-wider font-bold">
            Sustained DPS (With Reloads)
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono text-white">
            {stats1.sustainedDps} <span className="text-xs font-sans text-zinc-400">DPS</span>
          </div>
          {isCompareMode && (
            <div className="text-xs font-mono pt-1 border-t border-zinc-800 text-cyan-300">
              vs {weapon2.shortName}: <strong>{stats2.sustainedDps} DPS</strong>
            </div>
          )}
          <span className="text-[10px] font-mono text-zinc-500 block">
            Mag Dump {stats1.magDumpTime}s + Reload {weapon1.reloadTime}s
          </span>
        </div>

        {/* Card 3: Time to Kill Bile Titan & Hulk */}
        <div className="bg-gradient-to-b from-[#141724] to-[#0c0e17] border-2 border-rose-500/60 rounded-2xl p-5 space-y-2 text-center shadow-xl">
          <span className="text-[10px] font-mono uppercase text-rose-400 block tracking-wider font-bold">
            Time to Kill vs Bile Titan
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono text-white">
            {stats1.ttkBileTitan} <span className="text-xs font-sans text-zinc-400">sec</span>
          </div>
          <div className="text-xs font-mono text-zinc-300">
            vs Hulk Eye Visor: <strong className="text-white">{stats1.ttkHulk}s</strong> ({stats1.shotsToKillHulk} shots)
          </div>
          {isCompareMode && (
            <div className="text-xs font-mono pt-1 border-t border-zinc-800 text-cyan-300">
              vs {weapon2.shortName} Titan TTK: <strong>{stats2.ttkBileTitan}s</strong>
            </div>
          )}
          <span className="text-[10px] font-mono text-zinc-500 block">
            Bile Titan (2,500 HP Flesh / Sack)
          </span>
        </div>
      </div>

      {/* 4 Detail Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">Mag Dump Time</span>
          <span className="text-xl font-black font-mono text-white">{stats1.magDumpTime}s</span>
          <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">{weapon1.magSize} rounds</span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">Recoil Rating</span>
          <span className="text-xl font-black font-mono text-white">{stats1.recoilScore}/100</span>
          <span className="text-[10px] text-amber-400 font-mono block mt-0.5">{stats1.recoilRating}</span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">Reload Speed</span>
          <span className="text-xl font-black font-mono text-white">{weapon1.reloadTime}s</span>
          <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">Tactical swap</span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">Armor Penetration</span>
          <span className="text-xl font-black font-mono text-white truncate block">{weapon1.armorPen}</span>
          <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">{weapon1.damageType}</span>
        </div>
      </div>

      {/* Main Interactive Graphs & Handling Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recoil Pattern Canvas & Damage Drop-Off (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Graph 1: Recoil Pattern Bullseye Target */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#FFE900]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Recoil Pattern Spray Simulation ({weapon1.name})
                </h4>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                CS:GO-Style Ballistic Spray Cluster
              </span>
            </div>

            <div className="flex flex-col items-center justify-center bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
              <canvas
                ref={canvasRef}
                width={360}
                height={260}
                className="max-w-full rounded-lg"
              />
              <div className="flex justify-between w-full text-[10px] font-mono text-zinc-500 pt-3 border-t border-zinc-800/80 mt-2">
                <span>Vertical Kick: {weapon1.verticalRecoil} pts</span>
                <span>Horizontal Drift: {weapon1.horizontalRecoil} pts</span>
                <span>Spread: {weapon1.spread} mrad</span>
              </div>
            </div>
          </div>

          {/* Graph 2: Damage Drop-Off Curve (0 - 100m) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Ballistic Damage Drop-Off (0m to 100m Range)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                Drop-off starts @ {weapon1.dropOffStartMeters}m
              </span>
            </div>

            {/* Responsive SVG Line Chart */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
              <svg viewBox="0 0 400 120" className="w-full h-28 overflow-visible">
                {/* Background gridlines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#27272a" strokeDasharray="3 3" />
                <line x1="40" y1="60" x2="380" y2="60" stroke="#27272a" strokeDasharray="3 3" />
                <line x1="40" y1="100" x2="380" y2="100" stroke="#3f3f46" />

                {/* Y-axis labels */}
                <text x="32" y="24" fill="#a1a1aa" fontSize="9" textAnchor="end">{weapon1.damage}</text>
                <text x="32" y="64" fill="#71717a" fontSize="9" textAnchor="end">{Math.round(weapon1.damage * 0.75)}</text>
                <text x="32" y="104" fill="#52525b" fontSize="9" textAnchor="end">0</text>

                {/* Drop-off Curve Coordinates */}
                {/* 0m to dropOffStartMeters: 100% damage */}
                {/* dropOffStartMeters to dropOffEndMeters: drop to minDamagePercent */}
                {(() => {
                  const startX = 40 + (weapon1.dropOffStartMeters / 100) * 340;
                  const endX = 40 + (weapon1.dropOffEndMeters / 100) * 340;
                  const startY = 20; // 100% dmg
                  const endY = 100 - ((weapon1.minDamagePercent / 100) * 80);

                  const pathD = `M 40 ${startY} L ${startX} ${startY} L ${endX} ${endY} L 380 ${endY}`;
                  return (
                    <>
                      <path d={pathD} fill="none" stroke="#FFE900" strokeWidth="2.5" />
                      {/* Gradient fill under curve */}
                      <path d={`${pathD} L 380 100 L 40 100 Z`} fill="rgba(255, 233, 0, 0.08)" />
                      {/* Key point dots */}
                      <circle cx={startX} cy={startY} r="3" fill="#FFE900" />
                      <circle cx={endX} cy={endY} r="3" fill="#FFE900" />
                    </>
                  );
                })()}

                {/* X-axis labels */}
                <text x="40" y="115" fill="#71717a" fontSize="9" textAnchor="middle">0m</text>
                <text x="125" y="115" fill="#71717a" fontSize="9" textAnchor="middle">25m</text>
                <text x="210" y="115" fill="#71717a" fontSize="9" textAnchor="middle">50m</text>
                <text x="295" y="115" fill="#71717a" fontSize="9" textAnchor="middle">75m</text>
                <text x="380" y="115" fill="#71717a" fontSize="9" textAnchor="middle">100m</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: In-Game Style Handling Bars & Comparison (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FFE900]" />
                Ergonomics & Handling Telemetry
              </h4>
              <span className="text-[10px] font-mono text-zinc-400">In-Game Spec</span>
            </div>

            {/* In-Game Style Handling Gauges */}
            <div className="space-y-4">
              {/* Ergonomics */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">Ergonomics (Turn & ADS Speed):</span>
                  <span className="text-white font-bold">{weapon1.ergonomics} / 100</span>
                </div>
                <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="bg-[#FFE900] h-full rounded-full transition-all duration-500"
                    style={{ width: `${weapon1.ergonomics}%` }}
                  />
                </div>
              </div>

              {/* Recoil Control */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">Recoil Stability (Kickback):</span>
                  <span className="text-white font-bold">{100 - stats1.recoilScore} / 100</span>
                </div>
                <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${100 - stats1.recoilScore}%` }}
                  />
                </div>
              </div>

              {/* Fire Rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">Fire Rate (RPM):</span>
                  <span className="text-white font-bold">{stats1.effectiveRpm} RPM</span>
                </div>
                <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (stats1.effectiveRpm / 800) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Reload Quickness */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">Tactical Reload Speed:</span>
                  <span className="text-white font-bold">{weapon1.reloadTime}s</span>
                </div>
                <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(10, Math.min(100, 100 - (weapon1.reloadTime / 4) * 100))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tactical Pro-Tip Callout */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-1">
              <strong className="text-[#FFE900] block font-bold">
                Bile Titan & Heavy Armor Meta Tip:
              </strong>
              {weapon1.armorPen === 'Light' ? (
                <span>
                  {weapon1.name} has Light armor penetration. To kill Bile Titans (2,500 HP), you must target the underbelly sack or wait for anti-tank rockets to strip the head armor before dumping your magazine.
                </span>
              ) : (
                <span>
                  {weapon1.name} features {weapon1.armorPen} penetration! It can directly damage armored hulls and staggers Automaton Devastators in {stats1.ttkHulk} seconds.
                </span>
              )}
            </div>

            {/* Share Breakdown Button */}
            <button
              onClick={handleShare}
              className="w-full py-2.5 bg-[#FFE900] hover:bg-[#FFE900]/90 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              {isCopied ? <Check className="w-4 h-4 text-black" /> : <Share2 className="w-4 h-4 text-black" />}
              <span>{isCopied ? 'Ballistics Copied to Clipboard!' : 'Share Weapon DPS Breakdown'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier List Ranking Modal / Table */}
      {showTierListModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border-2 border-[#FFE900] rounded-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFE900]" />
                <h3 className="text-base font-bold text-white uppercase tracking-tight">
                  Helldivers 2 DPS & Meta Tier List (2026)
                </h3>
              </div>
              <button
                onClick={() => setShowTierListModal(false)}
                className="text-xs font-mono text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-zinc-800"
              >
                Close
              </button>
            </div>

            {/* S-Tier */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-black font-mono bg-rose-500 text-black text-xs">
                  S-TIER
                </span>
                <span className="text-xs text-zinc-400 font-mono">Top Burst & Sustained Meta Guns</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WEAPONS_CATALOG.filter(w => w.tier === 'S-Tier').map(w => (
                  <div key={w.id} className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{w.name}</span>
                    <span className="font-mono text-[#FFE900]">{Math.round((w.damage * w.rpm) / 60)} DPS</span>
                  </div>
                ))}
              </div>
            </div>

            {/* A-Tier */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-black font-mono bg-amber-500 text-black text-xs">
                  A-TIER
                </span>
                <span className="text-xs text-zinc-400 font-mono">Highly Viable Tactical Choices</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WEAPONS_CATALOG.filter(w => w.tier === 'A-Tier').map(w => (
                  <div key={w.id} className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{w.name}</span>
                    <span className="font-mono text-amber-400">{Math.round((w.damage * w.rpm) / 60)} DPS</span>
                  </div>
                ))}
              </div>
            </div>

            {/* B-Tier */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-black font-mono bg-cyan-500 text-black text-xs">
                  B-TIER
                </span>
                <span className="text-xs text-zinc-400 font-mono">Niche / Utility Weaponry</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WEAPONS_CATALOG.filter(w => w.tier === 'B-Tier').map(w => (
                  <div key={w.id} className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{w.name}</span>
                    <span className="font-mono text-cyan-400">{Math.round((w.damage * w.rpm) / 60)} DPS</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO & Required Footer Text */}
      <div className="text-center pt-4 pb-2 border-t border-zinc-800/80">
        <p className="text-xs font-mono text-zinc-400 tracking-wider">
          Helldivers 2 DPS Calculator - Best DPS Weapon 2026
        </p>
      </div>
    </div>
  );
}
