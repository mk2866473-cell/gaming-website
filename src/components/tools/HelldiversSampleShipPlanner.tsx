/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Compass, Shield, Award, CheckCircle2, Circle, Sparkles, 
  RotateCcw, Share2, Check, Download, Info, Zap, AlertTriangle, 
  Layers, ChevronRight, TrendingUp, HelpCircle, MapPin, Target,
  Ship, Cpu, Radio, Flame, CheckSquare, Square
} from 'lucide-react';

export interface ModuleCost {
  common: number;
  rare: number;
  super: number;
}

export interface ShipModule {
  id: string;
  departmentId: string;
  departmentName: string;
  name: string;
  tier: number; // 1, 2, 3
  cost: ModuleCost;
  effect: string;
  metaRank: number; // 1 = highest priority
  worthItRating: 'S' | 'A' | 'B' | 'C';
  worthReason: string;
  prerequisiteId?: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const SHIP_DEPARTMENTS: DepartmentInfo[] = [
  { id: 'patriotic', name: 'Patriotic Administration', icon: '🏛️', description: 'Logistics, ammo supply, and support weapon drops' },
  { id: 'orbital', name: 'Orbital Cannons', icon: '☄️', description: 'Super Destroyer heavy artillery & laser strikes' },
  { id: 'hangar', name: 'Hangar Bay', icon: '🦅', description: 'Eagle strike fighter air support & rearm speed' },
  { id: 'bridge', name: 'Super Destroyer Bridge', icon: '📡', description: 'Targeting sensors, radar range, and sentry upgrades' },
  { id: 'engineering', name: 'Engineering Bay', icon: '⚙️', description: 'Fortified defenses, exosuit armor, and mortar ammo' }
];

export const SHIP_MODULES_CATALOG: ShipModule[] = [
  // Patriotic Administration
  {
    id: 'pat-1',
    departmentId: 'patriotic',
    departmentName: 'Patriotic Administration',
    name: 'Donation Access License',
    tier: 1,
    cost: { common: 60, rare: 20, super: 0 },
    effect: 'Increases initial ammo count for Support Weapons by +10% upon hellpod deployment.',
    metaRank: 1,
    worthItRating: 'S',
    worthReason: 'MUST-BUY FIRST: Ensures you drop with extra support weapon ammo on every dive.'
  },
  {
    id: 'pat-2',
    departmentId: 'patriotic',
    departmentName: 'Patriotic Administration',
    name: 'Streamlined Request Process',
    tier: 2,
    cost: { common: 80, rare: 40, super: 0 },
    effect: 'Reduces Support Weapon stratagem call-in cooldown time by -10%.',
    prerequisiteId: 'pat-1',
    metaRank: 6,
    worthItRating: 'A',
    worthReason: 'Solid CDR boost for calling replacement Support Weapons mid-combat.'
  },
  {
    id: 'pat-3',
    departmentId: 'patriotic',
    departmentName: 'Patriotic Administration',
    name: 'Superior Packing Methodology',
    tier: 3,
    cost: { common: 30, rare: 30, super: 5 },
    effect: 'Resupply Boxes completely refill Support Weapon ammo reserves to 100%.',
    prerequisiteId: 'pat-2',
    metaRank: 4,
    worthItRating: 'S',
    worthReason: 'GAME-CHANGER: One Resupply box maxes out Autocannon, Recoilless, and Spear ammo.'
  },

  // Orbital Cannons
  {
    id: 'orb-1',
    departmentId: 'orbital',
    departmentName: 'Orbital Cannons',
    name: 'Zero-G Breech Loading',
    tier: 1,
    cost: { common: 80, rare: 40, super: 0 },
    effect: 'Reduces Orbital Stratagem cooldown times by -10%.',
    metaRank: 2,
    worthItRating: 'S',
    worthReason: 'ESSENTIAL: Cuts cooldowns on Orbital Precision, 380mm, and Railcannon.'
  },
  {
    id: 'orb-2',
    departmentId: 'orbital',
    departmentName: 'Orbital Cannons',
    name: 'Orbital Alternating Current',
    tier: 2,
    cost: { common: 150, rare: 120, super: 15 },
    effect: 'Further reduces Orbital Stratagem cooldowns by -15% additional.',
    prerequisiteId: 'orb-1',
    metaRank: 7,
    worthItRating: 'A',
    worthReason: 'Great value for heavy bombardment orbital loadouts.'
  },
  {
    id: 'orb-3',
    departmentId: 'orbital',
    departmentName: 'Orbital Cannons',
    name: 'High-Density Capacitors',
    tier: 3,
    cost: { common: 200, rare: 150, super: 20 },
    effect: 'Increases damage of Orbital Laser and Precision Strike by +50%.',
    prerequisiteId: 'orb-2',
    metaRank: 9,
    worthItRating: 'B',
    worthReason: 'High cost but obliterates Automaton Factory Striders and Bile Titans instantly.'
  },

  // Hangar
  {
    id: 'han-1',
    departmentId: 'hangar',
    departmentName: 'Hangar Bay',
    name: 'Liquid-Ventilated Cockpit',
    tier: 1,
    cost: { common: 80, rare: 40, super: 0 },
    effect: 'Reduces Eagle Rearm cooldown time by -10%.',
    metaRank: 3,
    worthItRating: 'S',
    worthReason: 'TOP PRIORITY: Gets your Eagle 500KG and Airstrikes back into action faster.'
  },
  {
    id: 'han-2',
    departmentId: 'hangar',
    departmentName: 'Hangar Bay',
    name: 'Pit Crew',
    tier: 2,
    cost: { common: 100, rare: 60, super: 10 },
    effect: 'Reduces Eagle Rearm time by an additional -20%.',
    prerequisiteId: 'han-1',
    metaRank: 8,
    worthItRating: 'A',
    worthReason: 'Brings Eagle Rearm time down to under 2 minutes.'
  },
  {
    id: 'han-3',
    departmentId: 'hangar',
    departmentName: 'Hangar Bay',
    name: 'Expanded Weapons Bay',
    tier: 3,
    cost: { common: 150, rare: 120, super: 15 },
    effect: 'Increases Eagle Stratagem uses per rearm by +1 (e.g. 2x 500KG Bombs, 4x Airstrikes).',
    prerequisiteId: 'han-2',
    metaRank: 5,
    worthItRating: 'S',
    worthReason: 'BEST HANGAR UPGRADE: Gives you double 500KG bombs before needing rearm!'
  },

  // Bridge
  {
    id: 'bri-1',
    departmentId: 'bridge',
    departmentName: 'Super Destroyer Bridge',
    name: 'Targeting Software Upgrade',
    tier: 1,
    cost: { common: 80, rare: 40, super: 0 },
    effect: 'Increases Sentry stratagem targeting range by +10%.',
    metaRank: 10,
    worthItRating: 'B',
    worthReason: 'Decent for Autocannon and Gatling sentries to acquire targets earlier.'
  },
  {
    id: 'bri-2',
    departmentId: 'bridge',
    departmentName: 'Super Destroyer Bridge',
    name: 'Nuclear Radar',
    tier: 2,
    cost: { common: 120, rare: 80, super: 10 },
    effect: 'Increases enemy radar detection range on player minimap by +50%.',
    prerequisiteId: 'bri-1',
    metaRank: 11,
    worthItRating: 'A',
    worthReason: 'Extremely helpful for avoiding surprise patrol ambushes on Helldive diff.'
  },
  {
    id: 'bri-3',
    departmentId: 'bridge',
    departmentName: 'Super Destroyer Bridge',
    name: 'Synthetic Supplementation',
    tier: 3,
    cost: { common: 200, rare: 150, super: 20 },
    effect: 'Increases Sentry bullet and rocket damage by +25%.',
    prerequisiteId: 'bri-2',
    metaRank: 12,
    worthItRating: 'B',
    worthReason: 'Great for defense and eradicate missions.'
  },

  // Engineering Bay
  {
    id: 'eng-1',
    departmentId: 'engineering',
    departmentName: 'Engineering Bay',
    name: 'Advanced Mortar Loading',
    tier: 1,
    cost: { common: 60, rare: 20, super: 0 },
    effect: 'Increases Mortar Sentry ammo capacity by +50%.',
    metaRank: 13,
    worthItRating: 'B',
    worthReason: 'Keeps EMS and Explosive Mortars firing non-stop during extractions.'
  },
  {
    id: 'eng-2',
    departmentId: 'engineering',
    departmentName: 'Engineering Bay',
    name: 'Power Steering',
    tier: 2,
    cost: { common: 80, rare: 40, super: 0 },
    effect: 'Improves steering responsiveness of Hellpods and Patriot Exosuits by +50%.',
    prerequisiteId: 'eng-1',
    metaRank: 14,
    worthItRating: 'C',
    worthReason: 'Niche: Helps land Hellpods on high cliffs or Titan heads.'
  },
  {
    id: 'eng-3',
    departmentId: 'engineering',
    departmentName: 'Engineering Bay',
    name: 'Blast Absorption',
    tier: 3,
    cost: { common: 150, rare: 100, super: 15 },
    effect: 'Reduces explosive damage taken by Sentries and Exosuits by -50%.',
    prerequisiteId: 'eng-2',
    metaRank: 15,
    worthItRating: 'C',
    worthReason: 'Helps sentries survive Automaton rocket devastator crossfire.'
  }
];

export const STORAGE_KEY_SAMPLES = 'helldivers2_owned_samples_v1';
export const STORAGE_KEY_PURCHASED = 'helldivers2_purchased_modules_v1';

export default function HelldiversSampleShipPlanner() {
  // Owned Samples State (persisted to localStorage)
  const [ownedCommon, setOwnedCommon] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAMPLES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.common === 'number' ? parsed.common : 120;
      }
    } catch (e) {}
    return 120;
  });

  const [ownedRare, setOwnedRare] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAMPLES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.rare === 'number' ? parsed.rare : 65;
      }
    } catch (e) {}
    return 65;
  });

  const [ownedSuper, setOwnedSuper] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAMPLES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.super === 'number' ? parsed.super : 12;
      }
    } catch (e) {}
    return 12;
  });

  // Purchased Modules Set (persisted to localStorage)
  const [purchasedModuleIds, setPurchasedModuleIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PURCHASED);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return new Set(parsed);
      }
    } catch (e) {}
    // Default check first few modules
    return new Set(['pat-1', 'orb-1', 'han-1']);
  });

  const exportCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAMPLES, JSON.stringify({
        common: ownedCommon,
        rare: ownedRare,
        super: ownedSuper
      }));
    } catch (e) {}
  }, [ownedCommon, ownedRare, ownedSuper]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PURCHASED, JSON.stringify(Array.from(purchasedModuleIds)));
    } catch (e) {}
  }, [purchasedModuleIds]);

  // Toggle Module Purchased State
  const toggleModule = (id: string) => {
    setPurchasedModuleIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Calculations: Total Cost for ALL modules in game vs Unpurchased modules
  const totals = useMemo(() => {
    let grandCommon = 0;
    let grandRare = 0;
    let grandSuper = 0;

    let remainingCommon = 0;
    let remainingRare = 0;
    let remainingSuper = 0;

    let purchasedCount = 0;

    SHIP_MODULES_CATALOG.forEach(m => {
      grandCommon += m.cost.common;
      grandRare += m.cost.rare;
      grandSuper += m.cost.super;

      if (purchasedModuleIds.has(m.id)) {
        purchasedCount += 1;
      } else {
        remainingCommon += m.cost.common;
        remainingRare += m.cost.rare;
        remainingSuper += m.cost.super;
      }
    });

    const completionPct = Math.round((purchasedCount / SHIP_MODULES_CATALOG.length) * 100);

    // Samples still needed beyond owned balance
    const neededCommon = Math.max(0, remainingCommon - ownedCommon);
    const neededRare = Math.max(0, remainingRare - ownedRare);
    const neededSuper = Math.max(0, remainingSuper - ownedSuper);

    // Farming Mission Estimates (Avg Diff 7 = 18 Common, 8 Rare, 3 Super per 30m run)
    const missionsForCommon = Math.ceil(neededCommon / 18);
    const missionsForRare = Math.ceil(neededRare / 8);
    const missionsForSuper = Math.ceil(neededSuper / 3);

    const maxMissionsNeeded = Math.max(missionsForCommon, missionsForRare, missionsForSuper);
    const estimatedHoursNeeded = (maxMissionsNeeded * 30 / 60).toFixed(1);

    return {
      grandCommon,
      grandRare,
      grandSuper,
      remainingCommon,
      remainingRare,
      remainingSuper,
      neededCommon,
      neededRare,
      neededSuper,
      purchasedCount,
      totalModules: SHIP_MODULES_CATALOG.length,
      completionPct,
      maxMissionsNeeded,
      estimatedHoursNeeded
    };
  }, [ownedCommon, ownedRare, ownedSuper, purchasedModuleIds]);

  // Recommended Next Purchases (Sorted by Meta Priority, unpurchased only)
  const nextUpgrades = useMemo(() => {
    return SHIP_MODULES_CATALOG
      .filter(m => !purchasedModuleIds.has(m.id))
      .sort((a, b) => a.metaRank - b.metaRank)
      .slice(0, 3);
  }, [purchasedModuleIds]);

  // PNG Card Export Function
  const handleExportImage = () => {
    const canvas = exportCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    // Background Gradient
    const bg = ctx.createLinearGradient(0, 0, 1080, 1080);
    bg.addColorStop(0, '#060810');
    bg.addColorStop(1, '#0c101d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1080);

    // Frame Border
    ctx.strokeStyle = '#FFE900';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1000, 1000);

    const drawFitText = (text: string, x: number, y: number, maxWidth: number, fontStyle: string, maxFontSize: number) => {
      let fontSize = maxFontSize;
      ctx.font = `900 ${fontSize}px ${fontStyle}`;
      while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
        fontSize -= 1;
        ctx.font = `900 ${fontSize}px ${fontStyle}`;
      }
      ctx.fillText(text, x, y);
    };

    // Header Title
    ctx.fillStyle = '#FFE900';
    drawFitText('SUPER DESTROYER NAVY // SHIP UPGRADE REPORT', 80, 120, 780, 'sans-serif', 32);

    ctx.fillStyle = '#94a3b8';
    drawFitText(`SUPER EARTH FLEET SHIP PROGRESS: ${totals.completionPct}% COMPLETED`, 80, 165, 780, 'monospace', 22);

    // Card Box 1: Progress Summary
    ctx.fillStyle = 'rgba(20, 24, 38, 0.9)';
    ctx.roundRect(80, 210, 920, 240, 20);
    ctx.fill();

    ctx.fillStyle = '#34d399';
    drawFitText(`SHIP MODULES UNLOCKED: ${totals.purchasedCount} / ${totals.totalModules} MODULES`, 110, 265, 740, 'monospace', 22);

    ctx.fillStyle = '#FFE900';
    drawFitText(`SAMPLES STILL NEEDED TO MAX SHIP:`, 110, 330, 740, 'sans-serif', 26);

    ctx.fillStyle = '#FFFFFF';
    drawFitText(`Green: ${totals.neededCommon} | Orange: ${totals.neededRare} | Pink: ${totals.neededSuper}`, 110, 390, 740, 'monospace', 22);

    // Card Box 2: Farming Time Estimate
    ctx.fillStyle = 'rgba(12, 16, 28, 0.9)';
    ctx.roundRect(80, 480, 920, 380, 20);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    drawFitText('ESTIMATED FARMING TIME (DIFF 7 HELLDIVE)', 110, 540, 740, 'sans-serif', 28);

    ctx.fillStyle = '#FFFFFF';
    drawFitText(`Operations Needed: ~${totals.maxMissionsNeeded} Helldive Missions`, 110, 610, 740, 'monospace', 22);

    ctx.fillStyle = '#FFE900';
    drawFitText(`Estimated Grind Time: ~${totals.estimatedHoursNeeded} Hours`, 110, 670, 740, 'sans-serif', 32);

    ctx.fillStyle = '#94a3b8';
    drawFitText('Best Farming Mission: Blitz & Eradicate on Difficulty 7+', 110, 740, 740, 'sans-serif', 20);

    // Footer Watermark
    ctx.fillStyle = '#FFE900';
    drawFitText('GAMINGTOOLSHUB.COM // SHIP PLANNER 2026', 80, 970, 800, 'sans-serif', 26);

    setTimeout(() => {
      const uri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `helldivers-ship-progress-${totals.completionPct}pct.png`;
      link.href = uri;
      link.click();
    }, 150);
  };

  const handleShare = () => {
    const text = `HELLDIVERS 2 SHIP MODULE PROGRESS\n` +
      `Super Destroyer Upgraded: ${totals.completionPct}% (${totals.purchasedCount}/${totals.totalModules} modules)\n` +
      `Samples Left to Farm: ${totals.neededCommon} Green, ${totals.neededRare} Orange, ${totals.neededSuper} Pink\n` +
      `Estimated Grind Time: ~${totals.estimatedHoursNeeded} Hours\n` +
      `Plan your ship upgrades: https://gamingtoolshub.com/tools/helldivers-2-sample-calculator`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Hidden Canvas for PNG Export */}
      <canvas ref={exportCanvasRef} className="hidden" />

      {/* Top Banner Header & Sample Tracker Cards */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/15 border border-[#FFE900]/50 flex items-center justify-center text-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.3)]">
              <Ship className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Navy Destroyer Logistics
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Sample Tracker & Ship Upgrade Planner (2026)
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportImage}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition font-mono"
            >
              <Download className="w-4 h-4 text-[#FFE900]" />
              Export Progress (PNG)
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 hover:bg-[#fff033] shadow cursor-pointer transition"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copiedLink ? 'Copied' : 'Share Progress'}
            </button>
          </div>
        </div>

        {/* 3 BIG SAMPLE TRACKER CARDS (Green, Orange, Pink) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Green Common Samples */}
          <div className="p-5 rounded-2xl bg-zinc-950/80 border-2 border-emerald-500/50 shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                Common Sample (Green)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Found Diff 1+
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-400 uppercase block">You Currently Have:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={ownedCommon}
                  aria-label="Owned Green Common Samples"
                  onChange={e => setOwnedCommon(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-emerald-500/40 rounded-xl px-3 py-2 text-xl font-black font-mono text-emerald-400 focus:outline-none focus:border-emerald-400"
                />
                <span className="text-xs font-mono text-zinc-500">Green</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">Still Needed:</span>
              <span className="text-white font-bold">{totals.neededCommon} Samples</span>
            </div>
          </div>

          {/* Orange Rare Samples */}
          <div className="p-5 rounded-2xl bg-zinc-950/80 border-2 border-amber-500/50 shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                Rare Sample (Orange)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Found Diff 4+
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-400 uppercase block">You Currently Have:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={ownedRare}
                  aria-label="Owned Orange Rare Samples"
                  onChange={e => setOwnedRare(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-amber-500/40 rounded-xl px-3 py-2 text-xl font-black font-mono text-amber-400 focus:outline-none focus:border-amber-400"
                />
                <span className="text-xs font-mono text-zinc-500">Orange</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">Still Needed:</span>
              <span className="text-white font-bold">{totals.neededRare} Samples</span>
            </div>
          </div>

          {/* Pink Super Samples */}
          <div className="p-5 rounded-2xl bg-zinc-950/80 border-2 border-pink-500/50 shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-pink-400 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
                Super Sample (Pink)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800">
                ONLY Diff 7+
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-400 uppercase block">You Currently Have:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={ownedSuper}
                  aria-label="Owned Pink Super Samples"
                  onChange={e => setOwnedSuper(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-pink-500/40 rounded-xl px-3 py-2 text-xl font-black font-mono text-pink-400 focus:outline-none focus:border-pink-400"
                />
                <span className="text-xs font-mono text-zinc-500">Pink</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">Still Needed:</span>
              <span className="text-white font-bold">{totals.neededSuper} Samples</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 w-full md:w-auto">
            <span className="text-xs font-mono uppercase text-[#FFE900] font-bold">
              Super Destroyer Upgrade Progress
            </span>
            <div className="text-2xl font-black text-white font-mono">
              {totals.completionPct}% Upgraded ({totals.purchasedCount} / {totals.totalModules} Modules)
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-[#FFE900] to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${totals.completionPct}%` }}
            />
          </div>

          <div className="text-right text-xs font-mono text-zinc-400 whitespace-nowrap">
            Est. Grind Time: <strong className="text-white">~{totals.estimatedHoursNeeded} Hours</strong>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout (Left: Ship Module Tree | Right: Next Purchase Planner) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Ship Module Tree (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FFE900]" />
            Ship Module Upgrade Tree (Check purchased modules)
          </h3>

          <div className="space-y-6">
            {SHIP_DEPARTMENTS.map(dept => {
              const deptModules = SHIP_MODULES_CATALOG.filter(m => m.departmentId === dept.id).sort((a, b) => a.tier - b.tier);

              return (
                <div key={dept.id} className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{dept.icon}</span>
                      <div>
                        <h4 className="text-sm font-black text-white uppercase">{dept.name}</h4>
                        <span className="text-[10px] text-zinc-400 font-mono">{dept.description}</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-950 text-[#FFE900] border border-zinc-800">
                      {deptModules.filter(m => purchasedModuleIds.has(m.id)).length} / {deptModules.length} Purchased
                    </span>
                  </div>

                  {/* Tier Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
                    {deptModules.map(mod => {
                      const isPurchased = purchasedModuleIds.has(mod.id);

                      return (
                        <div
                          key={mod.id}
                          onClick={() => toggleModule(mod.id)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between relative group ${
                            isPurchased
                              ? 'bg-emerald-950/30 border-emerald-500/80 shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                              : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-700">
                                Tier {mod.tier}
                              </span>
                              <div className={`w-5 h-5 rounded flex items-center justify-center ${
                                isPurchased ? 'bg-emerald-500 text-black' : 'border border-zinc-700 bg-zinc-900'
                              }`}>
                                {isPurchased && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>

                            <h5 className={`text-xs font-black ${isPurchased ? 'text-emerald-400' : 'text-white'}`}>
                              {mod.name}
                            </h5>

                            <p className="text-[10px] text-zinc-300 leading-normal">
                              {mod.effect}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-zinc-500">COST:</span>
                            <div className="flex items-center gap-1.5">
                              {mod.cost.common > 0 && <span className="text-emerald-400 font-bold">{mod.cost.common}G</span>}
                              {mod.cost.rare > 0 && <span className="text-amber-400 font-bold">{mod.cost.rare}O</span>}
                              {mod.cost.super > 0 && <span className="text-pink-400 font-bold">{mod.cost.super}P</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Planner & Next Purchase Recommendation (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 sticky top-6">
          {/* Meta Priority Recommendation Card */}
          <div className="bg-[#090b14] border-2 border-[#FFE900]/50 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase font-bold text-[#FFE900] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FFE900]" />
                What to Buy Next (Meta Priority)
              </span>
            </div>

            {nextUpgrades.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-black text-white uppercase">100% Ship Upgraded!</h4>
                <p className="text-xs text-zinc-300">Your Super Destroyer is at max operational efficiency.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {nextUpgrades.map((mod, idx) => (
                  <div key={mod.id} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFE900]/15 text-[#FFE900] border border-[#FFE900]/30 font-bold">
                        #{idx + 1} Recommendation
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        mod.worthItRating === 'S' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                      }`}>
                        Rating: {mod.worthItRating}-Tier
                      </span>
                    </div>

                    <h5 className="text-xs font-black text-white">{mod.name}</h5>
                    <p className="text-[10px] text-zinc-300 leading-tight">{mod.worthReason}</p>

                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-900">
                      <span>Cost:</span>
                      <span className="text-white font-bold">
                        {mod.cost.common} Green • {mod.cost.rare} Orange • {mod.cost.super} Pink
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Farming Speedrun Tips */}
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#FFE900]" />
              Super Sample Farming Blueprint
            </h4>

            <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <strong className="text-pink-400 block">Super Sample Rock ("The Phallic Rock"):</strong>
                <p className="text-[11px] text-zinc-400">
                  Super Samples ONLY spawn on Difficulty 7+. Look for a distinct bulbous silver rock with glowing pink veins and pink smoke.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <strong className="text-amber-400 block">Bunker Double Doors (Rare Samples):</strong>
                <p className="text-[11px] text-zinc-400">
                  Bunkers require 2 players pressing buttons simultaneously. They yield up to 4 Rare Samples and Super Credits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO FAQs */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 text-zinc-300 text-xs leading-relaxed">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FFE900]" />
          Helldivers 2 Sample Tracker & Ship Upgrade FAQ (2026)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">How to farm super samples fast?</h5>
            <p className="text-zinc-400">
              Select Difficulty 7 (Suicide Mission). Equip Light Scout Armor and a Jump Pack, sweep the central map areas for the distinct Super Sample Rock, grab the 3 pink samples, and drop them at extraction immediately.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">What is the best ship module to unlock first?</h5>
            <p className="text-zinc-400">
              Donation Access License (Patriotic Administration) is the best first upgrade because it ensures you deploy with extra support weapon ammo on every single dive.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">How many samples needed for full ship upgrade?</h5>
            <p className="text-zinc-400">
              To max out all 15 ship modules across all 5 departments, you need approximately 1,600 Common (Green), 1,100 Rare (Orange), and 140 Super (Pink) Samples.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">Where do super samples spawn?</h5>
            <p className="text-zinc-400">
              Super Samples ONLY spawn near a unique tall silver rock surrounded by glowing pink liquid on Difficulty 7+. On Diff 7 you get 3, Diff 8 gives 5, and Diff 9 gives 6.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Sample Tracker & Ship Upgrade Planner - Auto-saved to browser local storage • Verified Super Earth Logistics Hub
        </div>
      </div>
    </div>
  );
}
