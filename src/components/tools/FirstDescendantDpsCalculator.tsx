/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Flame, Crosshair, Gauge, Bomb, Sparkles, Target, Sliders,
  ShieldAlert, ShieldCheck, Cpu, RefreshCw, Layers, Plus, Trash2, 
  HelpCircle, CheckCircle2, ChevronRight, Info, AlertTriangle, Battery, Shield
} from 'lucide-react';
import { 
  PRESET_WEAPONS, TFD_MODULES, POLARITIES, SocketPolarity, TfdWeapon, 
  TfdModule, ModuleSlot, calculateModuleCost 
} from '../../data/tfdData';

export default function FirstDescendantDpsCalculator() {
  // Preset weapon selection
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('thunder-cage');

  // Custom / Active weapon stat inputs
  const [baseAtk, setBaseAtk] = useState<number>(165);
  const [critRate, setCritRate] = useState<number>(20); // %
  const [critDamage, setCritDamage] = useState<number>(1.6); // multiplier e.g. 1.6x
  const [fireRate, setFireRate] = useState<number>(666); // RPM
  const [reloadSpeed, setReloadSpeed] = useState<number>(1.4); // seconds
  const [magazineSize, setMagazineSize] = useState<number>(32);

  // Toggles
  const [hasEnergyActivator, setHasEnergyActivator] = useState<boolean>(true);
  const [globalCatalystToggle, setGlobalCatalystToggle] = useState<boolean>(false);

  // 10 Module slots state
  const [slots, setSlots] = useState<ModuleSlot[]>([
    { slotIndex: 0, moduleId: 'rifling-reinforcement', level: 10, socketPolarity: 'almandine' },
    { slotIndex: 1, moduleId: 'action-and-reaction', level: 10, socketPolarity: 'almandine' },
    { slotIndex: 2, moduleId: 'better-insight', level: 10, socketPolarity: 'cerulean' },
    { slotIndex: 3, moduleId: 'better-concentration', level: 10, socketPolarity: 'cerulean' },
    { slotIndex: 4, moduleId: 'fire-rate-up', level: 7, socketPolarity: 'malachite' },
    { slotIndex: 5, moduleId: null, level: 0, socketPolarity: 'none' },
    { slotIndex: 6, moduleId: null, level: 0, socketPolarity: 'none' },
    { slotIndex: 7, moduleId: null, level: 0, socketPolarity: 'none' },
    { slotIndex: 8, moduleId: null, level: 0, socketPolarity: 'none' },
    { slotIndex: 9, moduleId: null, level: 0, socketPolarity: 'none' },
  ]);

  // Handle Preset Load
  const handleSelectPreset = (weaponId: string) => {
    setSelectedWeaponId(weaponId);
    const w = PRESET_WEAPONS.find(p => p.id === weaponId);
    if (w) {
      setBaseAtk(w.baseAtk);
      setCritRate(w.critRate);
      setCritDamage(w.critDamage);
      setFireRate(w.fireRate);
      setReloadSpeed(w.reloadSpeed);
      setMagazineSize(w.magazineSize);
    }
  };

  // Max module capacity calculation
  const maxCapacity = hasEnergyActivator ? 70 : 50;

  // Calculate total capacity used by modules
  const capacityUsed = useMemo(() => {
    return slots.reduce((acc, slot) => {
      if (!slot.moduleId) return acc;
      const mod = TFD_MODULES.find(m => m.id === slot.moduleId);
      return acc + calculateModuleCost(mod, slot.level, slot.socketPolarity, globalCatalystToggle);
    }, 0);
  }, [slots, globalCatalystToggle]);

  // Calculate aggregated module bonuses
  const combinedModuleStats = useMemo(() => {
    let bonusAtkPct = 0;
    let bonusCritRatePct = 0;
    let bonusCritDamagePct = 0;
    let bonusFireRatePct = 0;
    let bonusMagPct = 0;
    let bonusReloadSpeedPct = 0;
    let bonusElementalPct = 0;

    slots.forEach(slot => {
      if (!slot.moduleId) return;
      const mod = TFD_MODULES.find(m => m.id === slot.moduleId);
      if (!mod) return;
      const stats = mod.statEffects(slot.level);

      if (stats.atkPercent) bonusAtkPct += stats.atkPercent;
      if (stats.critRatePercent) bonusCritRatePct += stats.critRatePercent;
      if (stats.critDamagePercent) bonusCritDamagePct += Number(stats.critDamagePercent);
      if (stats.fireRatePercent) bonusFireRatePct += Number(stats.fireRatePercent);
      if (stats.magazinePercent) bonusMagPct += Number(stats.magazinePercent);
      if (stats.reloadSpeedPercent) bonusReloadSpeedPct += stats.reloadSpeedPercent;
      if (stats.elementalDamagePercent) bonusElementalPct += stats.elementalDamagePercent;
    });

    return {
      bonusAtkPct,
      bonusCritRatePct,
      bonusCritDamagePct,
      bonusFireRatePct,
      bonusMagPct,
      bonusReloadSpeedPct,
      bonusElementalPct,
    };
  }, [slots]);

  // Calculate final weapon stats
  const finalStats = useMemo(() => {
    // Modified ATK (Base + Module ATK % + Elemental %)
    const effectiveBaseAtk = baseAtk * (1 + combinedModuleStats.bonusAtkPct / 100);
    const finalElementalAtk = effectiveBaseAtk * (combinedModuleStats.bonusElementalPct / 100);
    const finalTotalAtkPerHit = effectiveBaseAtk + finalElementalAtk;

    // Modified Crit Rate (Base Crit Rate * (1 + Bonus Crit Rate %))
    const finalCritRatePct = Math.min(100, Math.max(0, critRate * (1 + combinedModuleStats.bonusCritRatePct / 100)));

    // Modified Crit Damage multiplier (Base Crit Damage * (1 + Bonus Crit Damage %))
    // e.g. 1.6x * (1 + 74%) = 1.6 * 1.74 = 2.784x multiplier (bonus is 1.784x above 1)
    const finalCritDamageMult = critDamage * (1 + combinedModuleStats.bonusCritDamagePct / 100);

    // Modified Fire Rate
    const finalFireRate = Math.round(fireRate * (1 + combinedModuleStats.bonusFireRatePct / 100));

    // Modified Magazine Size
    const finalMagSize = Math.max(1, Math.round(magazineSize * (1 + combinedModuleStats.bonusMagPct / 100)));

    // Modified Reload Speed (seconds)
    const finalReloadSpeed = Math.max(0.3, Number((reloadSpeed * (1 + combinedModuleStats.bonusReloadSpeedPct / 100)).toFixed(2)));

    // Critical Hit Bonus Factor: 
    // Average damage factor per shot = 1 + (CritRateDecimal * (CritDamageMult - 1))
    const critRateDecimal = finalCritRatePct / 100;
    const critDamageBonusDecimal = Math.max(0, finalCritDamageMult - 1);
    const avgDamageMultiplierPerHit = 1 + (critRateDecimal * critDamageBonusDecimal);

    const avgDamagePerShot = finalTotalAtkPerHit * avgDamageMultiplierPerHit;

    // True Raw Burst DPS formula: (Base ATK * (1 + (Crit Rate * Crit Damage))) * (Fire Rate / 60)
    const shotsPerSecond = finalFireRate / 60;
    const trueRawBurstDps = avgDamagePerShot * shotsPerSecond;

    // Sustained DPS formula: (MagSize * AvgDamage) / (DepletionTime + ReloadTime)
    const magDepletionTime = finalMagSize / shotsPerSecond;
    const fullCycleTime = magDepletionTime + finalReloadSpeed;
    const sustainedDps = (finalMagSize * avgDamagePerShot) / fullCycleTime;

    // Unmodified Base Raw DPS (without modules)
    const baseShotsPerSec = fireRate / 60;
    const baseCritDec = (critRate / 100);
    const baseCritBonus = Math.max(0, critDamage - 1);
    const baseAvgDmg = baseAtk * (1 + (baseCritDec * baseCritBonus));
    const unmoddedRawDps = baseAvgDmg * baseShotsPerSec;

    return {
      effectiveBaseAtk: Math.round(effectiveBaseAtk),
      finalElementalAtk: Math.round(finalElementalAtk),
      finalTotalAtkPerHit: Math.round(finalTotalAtkPerHit),
      finalCritRatePct: Number(finalCritRatePct.toFixed(1)),
      finalCritDamageMult: Number(finalCritDamageMult.toFixed(2)),
      finalFireRate,
      finalMagSize,
      finalReloadSpeed,
      avgDamagePerShot: Math.round(avgDamagePerShot),
      trueRawBurstDps: Math.round(trueRawBurstDps),
      sustainedDps: Math.round(sustainedDps),
      unmoddedRawDps: Math.round(unmoddedRawDps),
      dpsIncreasePct: unmoddedRawDps > 0 ? Math.round(((trueRawBurstDps - unmoddedRawDps) / unmoddedRawDps) * 100) : 0,
      magDepletionTime: Number(magDepletionTime.toFixed(1)),
      fullCycleTime: Number(fullCycleTime.toFixed(1)),
    };
  }, [baseAtk, critRate, critDamage, fireRate, reloadSpeed, magazineSize, combinedModuleStats]);

  // Module Slot changes handler
  const handleUpdateSlot = (index: number, updates: Partial<ModuleSlot>) => {
    setSlots(prev => prev.map((s, i) => i === index ? { ...s, ...updates } : s));
  };

  const getWeaponIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Crosshair': return <Crosshair className="w-5 h-5 text-emerald-400" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-violet-400" />;
      case 'Bomb': return <Bomb className="w-5 h-5 text-red-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Target': return <Target className="w-5 h-5 text-blue-400" />;
      default: return <Sliders className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 font-sans">
      {/* Dark Tech Sci-Fi Header */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-cyan-500/30 p-6 md:p-8 shadow-2xl shadow-cyan-950/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center gap-1.5 shadow-sm">
                <Cpu className="w-3.5 h-3.5" /> Descendant Module Optimizer
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-950/80 border border-violet-500/30 text-violet-300">
                Live Game Mechanics 2026
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              Weapon DPS & Module Capacity Calculator
            </h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base max-w-3xl">
              Calculate exact True Average DPS, Fire Rate scaling, Crit Hit multipliers, and Module Capacity budget for <span className="text-cyan-300 font-semibold">The First Descendant</span>.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4 min-w-[200px]">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">True Raw Burst DPS</span>
            <span className="text-3xl font-black text-cyan-400 tracking-wider">
              {finalStats.trueRawBurstDps.toLocaleString()}
            </span>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <span>+{finalStats.dpsIncreasePct}% from base</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Weapon Selection Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-400" /> Choose Ultimate / Meta Weapon Preset
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {PRESET_WEAPONS.map((w) => {
            const isSelected = selectedWeaponId === w.id;
            return (
              <button
                key={w.id}
                onClick={() => handleSelectPreset(w.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center group ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/50 scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="mb-1.5 p-2 rounded-lg bg-slate-900/80 border border-slate-800 group-hover:border-slate-700">
                  {getWeaponIcon(w.icon)}
                </div>
                <span className="text-xs font-bold truncate w-full">{w.name}</span>
                <span className="text-[10px] text-slate-500 font-medium">{w.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Base Stats & Global Upgrades + Output Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Stats Input Form & Toggles (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/20 rounded-xl p-5 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" /> Base Weapon Attributes
              </h3>
              <span className="text-xs text-cyan-400/80 font-mono">Unmodified Stats</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Base Firearm ATK */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Base ATK</span>
                  <span className="text-cyan-400 font-mono font-bold">{baseAtk}</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={baseAtk}
                  onChange={(e) => setBaseAtk(Math.max(1, Number(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Crit Rate % */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Crit Hit Rate</span>
                  <span className="text-cyan-400 font-mono font-bold">{critRate}%</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={critRate}
                  onChange={(e) => setCritRate(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Crit Hit Damage Multiplier */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Crit Damage</span>
                  <span className="text-cyan-400 font-mono font-bold">{critDamage}x</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.05"
                  value={critDamage}
                  onChange={(e) => setCritDamage(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Fire Rate RPM */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Fire Rate (RPM)</span>
                  <span className="text-cyan-400 font-mono font-bold">{fireRate}</span>
                </label>
                <input
                  type="number"
                  min="30"
                  max="2000"
                  value={fireRate}
                  onChange={(e) => setFireRate(Math.max(30, Number(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Reload Speed (seconds) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Reload Speed (s)</span>
                  <span className="text-cyan-400 font-mono font-bold">{reloadSpeed}s</span>
                </label>
                <input
                  type="number"
                  min="0.2"
                  max="10"
                  step="0.1"
                  value={reloadSpeed}
                  onChange={(e) => setReloadSpeed(Math.max(0.2, Number(e.target.value) || 0.2))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Magazine Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Magazine Size</span>
                  <span className="text-cyan-400 font-mono font-bold">{magazineSize}</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={magazineSize}
                  onChange={(e) => setMagazineSize(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Enhancers / Toggles Section */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Weapon Enhancers & Polarity Rules
              </h4>

              {/* Energy Activator Toggle */}
              <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                hasEnergyActivator 
                  ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${hasEnergyActivator ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-500'}`}>
                    <Battery className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Energy Activator</div>
                    <div className="text-xs text-slate-400">+20 Weapon Module Capacity (50 → 70)</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hasEnergyActivator}
                  onChange={(e) => setHasEnergyActivator(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
                />
              </label>

              {/* Crystallization Catalyst Global Polarity Helper */}
              <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                globalCatalystToggle 
                  ? 'bg-violet-950/40 border-violet-500/50 text-violet-200' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${globalCatalystToggle ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-900 text-slate-500'}`}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Crystallization Catalyst</div>
                    <div className="text-xs text-slate-400">Halves Mod Cost across all slots</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={globalCatalystToggle}
                  onChange={(e) => setGlobalCatalystToggle(e.target.checked)}
                  className="w-5 h-5 accent-violet-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Output Stats Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-6 shadow-xl">
            {/* Header with capacity gauge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Module Capacity Budget</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-3xl font-black ${capacityUsed > maxCapacity ? 'text-red-400' : 'text-cyan-400'}`}>
                    {capacityUsed}
                  </span>
                  <span className="text-slate-400 text-sm font-semibold">/ {maxCapacity} Capacity</span>
                </div>
              </div>

              {/* Capacity Progress Bar */}
              <div className="w-full sm:w-64 space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Usage</span>
                  <span className={capacityUsed > maxCapacity ? 'text-red-400 font-bold' : 'text-slate-300'}>
                    {Math.round((capacityUsed / maxCapacity) * 100)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      capacityUsed > maxCapacity 
                        ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse' 
                        : capacityUsed > maxCapacity * 0.85 
                          ? 'bg-amber-400' 
                          : 'bg-gradient-to-r from-cyan-500 to-violet-500'
                    }`}
                    style={{ width: `${Math.min(100, (capacityUsed / maxCapacity) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Over capacity alert */}
            {capacityUsed > maxCapacity && (
              <div className="bg-red-950/60 border border-red-500/50 rounded-xl p-3.5 flex items-center gap-3 text-red-200 text-xs md:text-sm">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span>
                  <strong>Capacity Overload!</strong> Your equipped modules consume {capacityUsed} capacity, exceeding your weapon limit of {maxCapacity}. Apply an Energy Activator or match slot Polarities to halve module costs!
                </span>
              </div>
            )}

            {/* DPS Breakdown Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Card 1: True Raw Burst DPS */}
              <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">True Raw Burst DPS</div>
                <div className="text-2xl md:text-3xl font-black text-cyan-400">
                  {finalStats.trueRawBurstDps.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">
                  Base: <span className="text-slate-300">{finalStats.unmoddedRawDps.toLocaleString()}</span> DPS
                </div>
                <div className="text-[11px] text-cyan-300/80 font-mono pt-1 border-t border-slate-800/80">
                  Formula: (ATK × Crit Factor) × (RPM / 60)
                </div>
              </div>

              {/* Card 2: Sustained DPS */}
              <div className="bg-slate-950/80 border border-violet-500/30 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sustained DPS (With Reload)</div>
                <div className="text-2xl md:text-3xl font-black text-violet-400">
                  {finalStats.sustainedDps.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">
                  Mag Depletion: <span className="text-slate-300">{finalStats.magDepletionTime}s</span> | Cycle: <span className="text-slate-300">{finalStats.fullCycleTime}s</span>
                </div>
                <div className="text-[11px] text-violet-300/80 font-mono pt-1 border-t border-slate-800/80">
                  Accounts for Mag Capacity & Reload time
                </div>
              </div>

            </div>

            {/* Detailed Attribute Output Grid */}
            <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                Modified Weapon Performance Stats
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Avg Damage / Shot</div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">
                    {finalStats.avgDamagePerShot.toLocaleString()}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Total ATK Per Hit</div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">
                    {finalStats.finalTotalAtkPerHit.toLocaleString()}
                    {finalStats.finalElementalAtk > 0 && (
                      <span className="text-amber-400 text-[10px] ml-1">
                        (+{finalStats.finalElementalAtk} elem)
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Effective Crit Rate</div>
                  <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">
                    {finalStats.finalCritRatePct}%
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Crit Hit Damage</div>
                  <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">
                    {finalStats.finalCritDamageMult}x
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Fire Rate (RPM)</div>
                  <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
                    {finalStats.finalFireRate} RPM
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Mag Size / Reload</div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">
                    {finalStats.finalMagSize} / {finalStats.finalReloadSpeed}s
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 10 Module Slots Interactive Optimizer Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> 10-Slot Weapon Module Loadout Optimizer
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select modules, set module enhancement levels, and match socket polarities to reduce capacity cost.
            </p>
          </div>

          <button
            onClick={() => {
              setSlots(slots.map(s => ({ ...s, moduleId: null, level: 0, socketPolarity: 'none' })));
            }}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear All Modules
          </button>
        </div>

        {/* Module Slot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {slots.map((slot, idx) => {
            const equippedMod = TFD_MODULES.find(m => m.id === slot.moduleId);
            const cost = calculateModuleCost(equippedMod, slot.level, slot.socketPolarity, globalCatalystToggle);

            return (
              <div
                key={idx}
                className={`rounded-xl border p-4 space-y-3 transition-all relative ${
                  equippedMod
                    ? 'bg-slate-950 border-cyan-500/30 shadow-md'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Slot Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 tracking-wider">
                    SLOT {idx + 1}
                  </span>

                  {equippedMod ? (
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      slot.socketPolarity !== 'none' && slot.socketPolarity === equippedMod.polarity
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-900 text-cyan-400 border border-slate-800'
                    }`}>
                      {cost} Capacity
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-600 uppercase font-semibold">Empty</span>
                  )}
                </div>

                {/* Module Selector */}
                <select
                  value={slot.moduleId || ''}
                  onChange={(e) => {
                    const newModId = e.target.value || null;
                    const mod = TFD_MODULES.find(m => m.id === newModId);
                    handleUpdateSlot(idx, {
                      moduleId: newModId,
                      level: mod ? mod.maxLevel : 0
                    });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 truncate"
                >
                  <option value="">-- Choose Module --</option>
                  {TFD_MODULES.map(m => (
                    <option key={m.id} value={m.id}>
                      [{m.category}] {m.name} (Cost: {m.baseCost})
                    </option>
                  ))}
                </select>

                {equippedMod ? (
                  <div className="space-y-3 pt-1">
                    {/* Socket Polarity Selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Socket Polarity</label>
                      <select
                        value={slot.socketPolarity}
                        onChange={(e) => handleUpdateSlot(idx, { socketPolarity: e.target.value as SocketPolarity })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                      >
                        {POLARITIES.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.symbol} {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Module Level Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                        <span>Level</span>
                        <span className="text-cyan-400 font-mono font-bold">
                          +{slot.level} / {equippedMod.maxLevel}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={equippedMod.maxLevel}
                        value={slot.level}
                        onChange={(e) => handleUpdateSlot(idx, { level: Number(e.target.value) })}
                        className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                      />
                    </div>

                    {/* Short Module Effect Description */}
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                      {equippedMod.description}
                    </p>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center text-slate-600 text-xs gap-1 border border-dashed border-slate-800/80 rounded-lg">
                    <Plus className="w-4 h-4 text-slate-600" />
                    <span>Equip Module</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational & Guide Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-cyan-400" /> Theorycrafting & Module Capacity Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <h4 className="font-bold text-cyan-400">1. Why Energy Activators are Essential</h4>
            <p className="text-slate-400">
              At Level 40, weapons have a baseline capacity of 50. Using an Energy Activator permanently expands this limit to 70. This allows equipping multiple maxed-out rank 10 modules (like Rifling Reinforcement and Action and Reaction) without running out of capacity points.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <h4 className="font-bold text-cyan-400">2. Optimal Crystallization Catalyst Strategy</h4>
            <p className="text-slate-400">
              Assigning a matching socket polarity cuts module cost in half (rounded up). For instance, a 16-cost maxed module drops to only 8 capacity points when socketed in a matching Polarity slot (such as Almandine for ATK mods or Cerulean for Crit mods).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
