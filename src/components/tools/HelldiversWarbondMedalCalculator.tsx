/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Award, Coins, Shield, Zap, Sparkles, Check, Share2, 
  Sliders, ChevronRight, CheckCircle2, AlertTriangle, 
  Download, Clock, Target, Info, Layers, Compass, Star
} from 'lucide-react';

export interface WarbondItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'booster' | 'helmet' | 'cape' | 'emote' | 'super-credits';
  cost: number;
  page: number;
  isMeta?: boolean;
  efficiencyScore: number; // 1-10 power per medal
}

export interface WarbondInfo {
  id: string;
  name: string;
  tagline: string;
  scCost: number;
  totalPages: number;
  totalMedals: number;
  isLegendary?: boolean;
  themeColor: string;
  items: WarbondItem[];
}

export const WARBONDS_CATALOG: WarbondInfo[] = [
  {
    id: 'helldivers-mobilize',
    name: 'Helldivers Mobilize',
    tagline: 'Standard Issue (Free Default Warbond)',
    scCost: 0,
    totalPages: 3,
    totalMedals: 300,
    themeColor: 'from-amber-600/30 to-zinc-950 border-amber-500/40',
    items: [
      { id: 'hm-p1-1', name: 'B-01 Tactical Armor', type: 'armor', cost: 15, page: 1, efficiencyScore: 8.5 },
      { id: 'hm-p1-2', name: 'AR-23 Liberator', type: 'weapon', cost: 20, page: 1, efficiencyScore: 7.0 },
      { id: 'hm-p1-3', name: 'P-2 Peacemaker', type: 'weapon', cost: 10, page: 1, efficiencyScore: 6.0 },
      { id: 'hm-p1-4', name: 'B-01 Helmet', type: 'helmet', cost: 5, page: 1, efficiencyScore: 5.0 },
      { id: 'hm-p1-5', name: 'Super Credits (100)', type: 'super-credits', cost: 20, page: 1, efficiencyScore: 10.0 },

      { id: 'hm-p2-1', name: 'SG-225 Breaker Shotgun', type: 'weapon', cost: 60, page: 2, isMeta: true, efficiencyScore: 9.8 },
      { id: 'hm-p2-2', name: 'HE-G-6 Frag Grenade', type: 'weapon', cost: 30, page: 2, efficiencyScore: 7.5 },
      { id: 'hm-p2-3', name: 'Vitality Enhancement Booster', type: 'booster', cost: 20, page: 2, isMeta: true, efficiencyScore: 10.0 },
      { id: 'hm-p2-4', name: 'Super Credits (100)', type: 'super-credits', cost: 30, page: 2, efficiencyScore: 10.0 },

      { id: 'hm-p3-1', name: 'FS-23 Battle Master Armor', type: 'armor', cost: 80, page: 3, efficiencyScore: 8.0 },
      { id: 'hm-p3-2', name: 'G-16 Impact Grenade', type: 'weapon', cost: 40, page: 3, isMeta: true, efficiencyScore: 9.5 },
      { id: 'hm-p3-3', name: 'Super Credits (300)', type: 'super-credits', cost: 10, page: 3, efficiencyScore: 10.0 }
    ]
  },
  {
    id: 'cutting-edge',
    name: 'Cutting Edge',
    tagline: 'Energy Weapons & Stun Grenades (Meta Pick)',
    scCost: 1000,
    totalPages: 3,
    totalMedals: 300,
    themeColor: 'from-cyan-600/30 to-zinc-950 border-cyan-500/40',
    items: [
      { id: 'ce-p1-1', name: 'LAS-16 Sickle Rifle', type: 'weapon', cost: 35, page: 1, isMeta: true, efficiencyScore: 10.0 },
      { id: 'ce-p1-2', name: 'G-23 Stun Grenade', type: 'weapon', cost: 25, page: 1, isMeta: true, efficiencyScore: 10.0 },
      { id: 'ce-p1-3', name: 'EX-03 Prototype Armor', type: 'armor', cost: 20, page: 1, efficiencyScore: 8.0 },

      { id: 'ce-p2-1', name: 'SG-8P Punisher Plasma', type: 'weapon', cost: 60, page: 2, efficiencyScore: 8.2 },
      { id: 'ce-p2-2', name: 'LAS-7 Dagger', type: 'weapon', cost: 40, page: 2, efficiencyScore: 6.5 },
      { id: 'ce-p2-3', name: 'Localization Confusion Booster', type: 'booster', cost: 18, page: 2, efficiencyScore: 8.8 },

      { id: 'ce-p3-1', name: 'EX-16 Prototype Armor', type: 'armor', cost: 70, page: 3, efficiencyScore: 8.5 },
      { id: 'ce-p3-2', name: 'Super Credits (300)', type: 'super-credits', cost: 52, page: 3, efficiencyScore: 10.0 }
    ]
  },
  {
    id: 'democratic-detonation',
    name: 'Democratic Detonation',
    tagline: 'Explosive Shrapnel & Eruptor Rifle',
    scCost: 1000,
    totalPages: 3,
    totalMedals: 300,
    themeColor: 'from-rose-600/30 to-zinc-950 border-rose-500/40',
    items: [
      { id: 'dd-p1-1', name: 'CB-9 Exploding Crossbow', type: 'weapon', cost: 30, page: 1, efficiencyScore: 8.0 },
      { id: 'dd-p1-2', name: 'G-123 Thermite Grenade', type: 'weapon', cost: 20, page: 1, efficiencyScore: 7.5 },
      { id: 'dd-p1-3', name: 'CE-27 Ground Breaker Armor', type: 'armor', cost: 18, page: 1, efficiencyScore: 8.2 },

      { id: 'dd-p2-1', name: 'R-36 Eruptor Rifle', type: 'weapon', cost: 55, page: 2, isMeta: true, efficiencyScore: 9.6 },
      { id: 'dd-p2-2', name: 'GP-31 Grenade Pistol', type: 'weapon', cost: 60, page: 2, isMeta: true, efficiencyScore: 10.0 },
      { id: 'dd-p2-3', name: 'Expert Extraction Pilot Booster', type: 'booster', cost: 20, page: 2, efficiencyScore: 7.0 },

      { id: 'dd-p3-1', name: 'CE-35 Trench Engineer', type: 'armor', cost: 80, page: 3, efficiencyScore: 8.5 },
      { id: 'dd-p3-2', name: 'Super Credits (300)', type: 'super-credits', cost: 17, page: 3, efficiencyScore: 10.0 }
    ]
  },
  {
    id: 'borderline-justice',
    name: 'Borderline Justice',
    tagline: 'Legendary Frontier Expansion',
    scCost: 1500,
    totalPages: 4,
    totalMedals: 520,
    isLegendary: true,
    themeColor: 'from-purple-600/30 to-zinc-950 border-purple-500/50',
    items: [
      { id: 'bj-p1-1', name: 'Marshal Revolver', type: 'weapon', cost: 45, page: 1, efficiencyScore: 9.2 },
      { id: 'bj-p1-2', name: 'Frontier Law Armor', type: 'armor', cost: 35, page: 1, efficiencyScore: 8.5 },
      { id: 'bj-p1-3', name: 'Super Credits (100)', type: 'super-credits', cost: 20, page: 1, efficiencyScore: 10.0 },

      { id: 'bj-p2-1', name: 'Lever-Action Carbine', type: 'weapon', cost: 65, page: 2, isMeta: true, efficiencyScore: 9.4 },
      { id: 'bj-p2-2', name: 'Flashbang Grenade', type: 'weapon', cost: 40, page: 2, efficiencyScore: 8.0 },
      { id: 'bj-p2-3', name: 'Quick-Draw Booster', type: 'booster', cost: 30, page: 2, efficiencyScore: 8.8 },

      { id: 'bj-p3-1', name: 'Sheriff Heavy Armor', type: 'armor', cost: 90, page: 3, efficiencyScore: 8.7 },
      { id: 'bj-p3-2', name: 'Plasma Lasso Utility', type: 'weapon', cost: 50, page: 3, efficiencyScore: 8.1 },

      { id: 'bj-p4-1', name: 'Supreme Marshall Cape & Armor', type: 'armor', cost: 120, page: 4, efficiencyScore: 9.0 },
      { id: 'bj-p4-2', name: 'Super Credits (300)', type: 'super-credits', cost: 25, page: 4, efficiencyScore: 10.0 }
    ]
  }
];

export default function HelldiversWarbondMedalCalculator() {
  // Selected Warbond
  const [selectedWarbondId, setSelectedWarbondId] = useState<string>('helldivers-mobilize');
  // Selected Page Tab
  const [selectedPage, setSelectedPage] = useState<number>(1);
  // Owned Medals Input
  const [ownedMedals, setOwnedMedals] = useState<number>(45);

  // Set of checked Item IDs
  const [checkedItemIds, setCheckedItemIds] = useState<Set<string>>(() => {
    // Default check first few items of Mobilize
    return new Set(['hm-p1-1', 'hm-p1-2', 'hm-p2-1', 'hm-p2-3']);
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Active Warbond Object
  const currentWarbond = useMemo(() => {
    return WARBONDS_CATALOG.find(w => w.id === selectedWarbondId) || WARBONDS_CATALOG[0];
  }, [selectedWarbondId]);

  // Toggle Item
  const toggleItem = (itemId: string) => {
    setCheckedItemIds(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  // Quick Select Presets
  const handleSelectAllInWarbond = () => {
    setCheckedItemIds(prev => {
      const next = new Set(prev);
      currentWarbond.items.forEach(i => next.add(i.id));
      return next;
    });
  };

  const handleClearWarbond = () => {
    setCheckedItemIds(prev => {
      const next = new Set(prev);
      currentWarbond.items.forEach(i => next.delete(i.id));
      return next;
    });
  };

  // Calculations
  const calculations = useMemo(() => {
    let totalCost = 0;
    let selectedCount = 0;

    currentWarbond.items.forEach(item => {
      if (checkedItemIds.has(item.id)) {
        totalCost += item.cost;
        selectedCount += 1;
      }
    });

    const medalsNeeded = Math.max(0, totalCost - ownedMedals);

    // Missions Needed (Avg Helldive = 13.5 medals, Trivial = 2.5 medals)
    const missionsHelldive = Math.ceil(medalsNeeded / 13.5);
    const missionsTrivial = Math.ceil(medalsNeeded / 2.5);

    // Time estimate (20 min avg per operation)
    const hoursNeeded = ((missionsHelldive * 20) / 60).toFixed(1);

    return {
      totalCost,
      selectedCount,
      medalsNeeded,
      missionsHelldive,
      missionsTrivial,
      hoursNeeded
    };
  }, [currentWarbond, checkedItemIds, ownedMedals]);

  // Items on Selected Page
  const pageItems = useMemo(() => {
    return currentWarbond.items.filter(i => i.page === selectedPage);
  }, [currentWarbond, selectedPage]);

  // Export Shopping List Image
  const handleExportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1050;

    const bg = ctx.createLinearGradient(0, 0, 1080, 1050);
    bg.addColorStop(0, '#060810');
    bg.addColorStop(1, '#0c101d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1050);

    ctx.strokeStyle = '#FFE900';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1000, 970);

    const drawFitText = (text: string, x: number, y: number, maxWidth: number, fontStyle: string, maxFontSize: number) => {
      let fontSize = maxFontSize;
      ctx.font = `900 ${fontSize}px ${fontStyle}`;
      while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
        fontSize -= 1;
        ctx.font = `900 ${fontSize}px ${fontStyle}`;
      }
      ctx.fillText(text, x, y);
    };

    ctx.fillStyle = '#FFE900';
    drawFitText('HELLDIVERS 2 WARBOND SHOPPING LIST', 80, 130, 780, 'sans-serif', 34);

    ctx.fillStyle = '#94a3b8';
    drawFitText(`WARBOND: ${currentWarbond.name.toUpperCase()}`, 80, 175, 780, 'monospace', 22);

    ctx.fillStyle = 'rgba(20, 24, 38, 0.9)';
    ctx.roundRect(80, 220, 920, 240, 20);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    drawFitText(`SELECTED ITEMS: ${calculations.selectedCount} / ${currentWarbond.items.length}`, 110, 280, 740, 'monospace', 22);

    ctx.fillStyle = '#FFE900';
    drawFitText(`TOTAL COST: ${calculations.totalCost} MEDALS`, 110, 360, 740, 'sans-serif', 36);

    ctx.fillStyle = '#FFFFFF';
    drawFitText(`Medals Needed to Farm: ${calculations.medalsNeeded} (~${calculations.missionsHelldive} Helldive Missions)`, 110, 420, 740, 'monospace', 18);

    ctx.fillStyle = 'rgba(12, 16, 28, 0.9)';
    ctx.roundRect(80, 500, 920, 340, 20);
    ctx.fill();

    ctx.fillStyle = '#34d399';
    drawFitText('FARMING METRICS & RECOMMENDATIONS', 110, 560, 740, 'sans-serif', 26);

    const drawRow = (label: string, val: string, y: number) => {
      ctx.fillStyle = '#94a3b8';
      drawFitText(label, 110, y, 400, 'monospace', 22);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(val, 940, y);
      ctx.textAlign = 'left';
    };

    drawRow('Super Credits Cost:', `${currentWarbond.scCost} SC`, 630);
    drawRow('Helldive Runs Needed:', `${calculations.missionsHelldive} Operations`, 690);
    drawRow('Estimated Grind Time:', `${calculations.hoursNeeded} Hours`, 750);

    ctx.fillStyle = '#FFE900';
    drawFitText('GAMINGTOOLSHUB.COM // WARBOND PLANNER 2026', 80, 920, 800, 'sans-serif', 24);

    setTimeout(() => {
      const uri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `helldivers-warbond-${currentWarbond.id}-medals.png`;
      link.href = uri;
      link.click();
    }, 150);
  };

  const handleShare = () => {
    const text = `HELLDIVERS 2 WARBOND SHOPPING LIST\n` +
      `Warbond: ${currentWarbond.name}\n` +
      `Selected Cost: ${calculations.totalCost} Medals (${calculations.selectedCount} items)\n` +
      `Medals Needed: ${calculations.medalsNeeded} (~${calculations.missionsHelldive} Helldive runs)\n` +
      `Plan your unlocks: https://gamingtoolshub.com/tools/helldivers-2-warbond-medal-calculator`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Hidden Canvas for Social Export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Warbond Horizontal Carousel / Selector */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/15 border border-[#FFE900]/50 flex items-center justify-center text-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.3)]">
              <Award className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Quartermaster Logistics
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Warbond Medal Cost Calculator (2026)
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportImage}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition font-mono"
            >
              <Download className="w-4 h-4 text-[#FFE900]" />
              Export Shopping List (PNG)
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 hover:bg-[#fff033] shadow cursor-pointer transition"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copiedLink ? 'Copied' : 'Share List'}
            </button>
          </div>
        </div>

        {/* Horizontal Warbond Cards Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Select Warbond Expansion
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {WARBONDS_CATALOG.map(wb => {
              const isSelected = wb.id === selectedWarbondId;
              return (
                <button
                  key={wb.id}
                  onClick={() => {
                    setSelectedWarbondId(wb.id);
                    setSelectedPage(1);
                  }}
                  className={`p-3.5 rounded-xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#FFE900] bg-zinc-900 shadow-lg ring-1 ring-[#FFE900]'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-[#FFE900] border border-zinc-700 font-bold">
                      {wb.scCost === 0 ? 'FREE' : `${wb.scCost} SC`}
                    </span>
                    {wb.isLegendary && (
                      <span className="text-[10px] font-mono text-purple-400 font-bold">Legendary</span>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-white mt-2 truncate">{wb.name}</h4>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5">
                    {wb.totalPages} Pages • {wb.totalMedals} Medals
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout (Left: Warbond Pages & Items | Right: Sticky Calculator Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pages & Checkboxes (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Page Tabs */}
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2">
                Pages:
              </span>
              {Array.from({ length: currentWarbond.totalPages }, (_, i) => i + 1).map(p => {
                const isSelected = selectedPage === p;
                return (
                  <button
                    key={p}
                    onClick={() => setSelectedPage(p)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer border ${
                      isSelected
                        ? 'bg-[#FFE900] text-black border-[#FFE900] shadow'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Page {p}
                  </button>
                );
              })}
            </div>

            {/* Quick Bulk Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAllInWarbond}
                className="text-xs font-mono px-3 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white cursor-pointer"
              >
                Select All
              </button>
              <button
                onClick={handleClearWarbond}
                className="text-xs font-mono px-3 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Item Checklist Grid */}
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-black uppercase text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FFE900]" />
                {currentWarbond.name} — Page {selectedPage} Items
              </h3>
              <span className="text-xs font-mono text-zinc-400">
                Check items you want to unlock
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pageItems.map(item => {
                const isChecked = checkedItemIds.has(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isChecked
                        ? 'bg-zinc-900/90 border-[#FFE900] shadow-[0_0_12px_rgba(255,233,0,0.15)]'
                        : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition ${
                        isChecked ? 'bg-[#FFE900] border-[#FFE900] text-black shadow' : 'border-zinc-700 bg-zinc-900'
                      }`}>
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-black ${isChecked ? 'text-white' : 'text-zinc-300'}`}>
                            {item.name}
                          </span>
                          {item.isMeta && (
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
                              Meta
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-[#FFE900]">
                        {item.cost} Medals
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Calculator Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#090b14] border-2 border-[#FFE900]/50 rounded-2xl p-6 shadow-2xl space-y-6 sticky top-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase font-bold text-[#FFE900]">
                Unlock Summary & Cost
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {calculations.selectedCount} Items Selected
              </span>
            </div>

            {/* Total Cost Display */}
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-400 uppercase">Total Cost Required:</span>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {calculations.totalCost} Medals
              </div>
            </div>

            {/* Owned Medals Input */}
            <div className="space-y-1.5 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
              <label className="text-xs font-mono uppercase text-zinc-400 block">
                Medals You Currently Have:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="250"
                  value={ownedMedals}
                  aria-label="Medals you currently have"
                  onChange={(e) => setOwnedMedals(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-black font-mono text-white"
                />
                <span className="text-xs font-mono text-zinc-500">Medals</span>
              </div>
            </div>

            {/* BIG YELLOW NUMBER: MEDALS NEEDED */}
            <div className="p-5 rounded-xl bg-zinc-950 border-2 border-[#FFE900]/40 text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Medals Left to Farm
              </span>
              <div className="text-4xl sm:text-5xl font-black text-[#FFE900] font-mono">
                {calculations.medalsNeeded}
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                ~{calculations.missionsHelldive} Helldive runs or {calculations.missionsTrivial} Trivial runs
              </p>
            </div>

            {/* Estimated Grind Time */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Estimated Grind Time:</span>
                <span className="text-white font-bold">~{calculations.hoursNeeded} Hours</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Super Credits Cost:</span>
                <span className="text-[#FFE900] font-bold">{currentWarbond.scCost} SC</span>
              </div>
            </div>

            {/* What to Skip Tip */}
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 leading-relaxed space-y-1">
              <strong className="text-amber-400 block">Pro Tip (What to Skip):</strong>
              Skip cosmetic capes, banners, and player cards if you are rushing for META weapons like the Sickle or Grenade Pistol. Saving on cosmetics cuts Medal costs by ~30%!
            </div>
          </div>
        </div>
      </div>

      {/* SEO FAQs */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 text-zinc-300 text-xs leading-relaxed">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FFE900]" />
          Helldivers 2 Warbond Medal Calculator & FAQ (2026)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">How many medals to unlock full warbond?</h5>
            <p className="text-zinc-400">
              Standard 3-page warbonds require approximately 300 Medals to 100% unlock. Legendary 4-page expansions require 500+ Medals.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">How to get medals fast?</h5>
            <p className="text-zinc-400">
              Running high-difficulty Helldive operations (Difficulty 7–9) yields 12 to 15 medals per mission, supplemented by Major Order rewards (+45 medals).
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">Best warbond to buy first?</h5>
            <p className="text-zinc-400">
              Cutting Edge is widely recommended as the best first warbond because it unlocks the LAS-16 Sickle assault rifle and G-23 Stun Grenade.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Warbond Medal Calculator - How many medals to unlock everything 2026 • Verified Super Earth Logistics Hub
        </div>
      </div>
    </div>
  );
}
