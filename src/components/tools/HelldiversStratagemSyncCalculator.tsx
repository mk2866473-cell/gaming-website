/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Clock, Zap, Bomb, Shield, 
  Crosshair, Plane, AlertTriangle, CheckCircle2, Share2, 
  Check, Sliders, Sparkles, Flame, Gauge, ChevronRight,
  TrendingUp, Award, Layers, Wind, Download, Info, Search,
  ArrowRight, Activity, Swords
} from 'lucide-react';

export type StratagemType = 'eagle' | 'orbital' | 'support' | 'sentry';

export interface StratagemMeta {
  id: string;
  name: string;
  shortName: string;
  type: StratagemType;
  cooldownSeconds: number; // Individual cooldown or 0 for Eagle
  callInSeconds: number;   // Call-in latency
  uses: number | 'unlimited'; // Charges per rearm for Eagle, or per mission
  eagleRearmSeconds?: number; // 150s default for Eagles
  durationSeconds?: number;   // Active duration for Sentries/Laser
  description: string;
  isMetaHighlight?: boolean;
}

export const VERIFIED_STRATAGEMS_DATA: StratagemMeta[] = [
  // EAGLE STRATAGEMS (Rearm mechanic: 2m 30s = 150s)
  {
    id: 'eagle-500kg',
    name: 'Eagle 500KG Bomb',
    shortName: 'Eagle 500KG',
    type: 'eagle',
    cooldownSeconds: 0,
    callInSeconds: 1,
    uses: 1, // 1 use per rearm (or 2 with ship upgrade)
    eagleRearmSeconds: 150,
    description: 'Massive explosive payload that vaporizes Titan heads and fabricators in 1s call-in.',
    isMetaHighlight: true
  },
  {
    id: 'eagle-airstrike',
    name: 'Eagle Airstrike',
    shortName: 'Eagle Airstrike',
    type: 'eagle',
    cooldownSeconds: 0,
    callInSeconds: 1,
    uses: 3,
    eagleRearmSeconds: 150,
    description: 'Versatile carpet bombing sweep effective against medium armor and troop clusters.',
    isMetaHighlight: true
  },
  {
    id: 'eagle-cluster-bomb',
    name: 'Eagle Cluster Bomb',
    shortName: 'Eagle Cluster',
    type: 'eagle',
    cooldownSeconds: 0,
    callInSeconds: 1,
    uses: 4,
    eagleRearmSeconds: 150,
    description: 'High-dispersion antipersonnel bomblets devastating to unarmored infantry.'
  },
  {
    id: 'eagle-strafing-run',
    name: 'Eagle Strafing Run',
    shortName: 'Eagle Strafing',
    type: 'eagle',
    cooldownSeconds: 0,
    callInSeconds: 1,
    uses: 3,
    eagleRearmSeconds: 150,
    description: 'Pinpoint 20mm rotary cannon strafe that clears corridors without teamkill risk.'
  },
  {
    id: 'eagle-napalm',
    name: 'Eagle Napalm Airstrike',
    shortName: 'Eagle Napalm',
    type: 'eagle',
    cooldownSeconds: 0,
    callInSeconds: 1,
    uses: 3,
    eagleRearmSeconds: 150,
    description: 'Wall of fire creating a burning chokepoint barrier against bug swarms.'
  },
  {
    id: 'eagle-rocket-pods',
    name: 'Eagle 110MM Rocket Pods',
    shortName: 'Eagle Rocket Pods',
    type: 'eagle',
    cooldownSeconds: 0,
    callInSeconds: 1,
    uses: 3,
    eagleRearmSeconds: 150,
    description: 'Heavy armor seeking rockets targeting the largest enemy in the strike zone.'
  },

  // ORBITAL STRATAGEMS (Individual Cooldowns)
  {
    id: 'orbital-precision',
    name: 'Orbital Precision Strike',
    shortName: 'Precision Strike',
    type: 'orbital',
    cooldownSeconds: 90, // 1m 30s
    callInSeconds: 3,
    uses: 'unlimited',
    description: 'Fast-cycling 90s single projectile strike with 3s call-in latency.',
    isMetaHighlight: true
  },
  {
    id: 'orbital-gatling',
    name: 'Orbital Gatling Barrage',
    shortName: 'Gatling Barrage',
    type: 'orbital',
    cooldownSeconds: 80, // 1m 20s
    callInSeconds: 2,
    uses: 'unlimited',
    description: 'Ultra-fast 80s cooldown continuous high-rate rotary cannon barrage.'
  },
  {
    id: 'orbital-airburst',
    name: 'Orbital Airburst Strike',
    shortName: 'Airburst Strike',
    type: 'orbital',
    cooldownSeconds: 100, // 1m 40s
    callInSeconds: 2,
    uses: 'unlimited',
    description: 'Three consecutive shrapnel bursts clearing light infantry swarms.'
  },
  {
    id: 'orbital-120mm',
    name: 'Orbital 120MM HE Barrage',
    shortName: '120MM Barrage',
    type: 'orbital',
    cooldownSeconds: 240, // 4m
    callInSeconds: 5,
    uses: 'unlimited',
    description: 'Concentrated 120mm precision artillery barrage for medium Automaton outposts.'
  },
  {
    id: 'orbital-380mm',
    name: 'Orbital 380MM HE Barrage',
    shortName: '380MM Barrage',
    type: 'orbital',
    cooldownSeconds: 240, // 4m
    callInSeconds: 5,
    uses: 'unlimited',
    description: 'Prolonged heavy artillery bombardment covering a wide perimeter to clear heavy bases.'
  },
  {
    id: 'orbital-laser',
    name: 'Orbital Laser',
    shortName: 'Orbital Laser',
    type: 'orbital',
    cooldownSeconds: 300, // 5m
    callInSeconds: 2,
    durationSeconds: 25,
    uses: 3,
    description: 'High-energy beam tracking multiple heavy targets for 25s (5m cooldown, 3 uses per mission).',
    isMetaHighlight: true
  },
  {
    id: 'orbital-railcannon',
    name: 'Orbital Railcannon Strike',
    shortName: 'Railcannon Strike',
    type: 'orbital',
    cooldownSeconds: 210, // 3m 30s
    callInSeconds: 1,
    uses: 'unlimited',
    description: 'Automatic targeting projectile that instantly punches through heavy Hulks and Chargers.',
    isMetaHighlight: true
  },
  {
    id: 'orbital-walking',
    name: 'Orbital Walking Barrage',
    shortName: 'Walking Barrage',
    type: 'orbital',
    cooldownSeconds: 300, // 5m
    callInSeconds: 3,
    uses: 'unlimited',
    description: 'Artillery line that advances forward across enemy entrenched lines.'
  },

  // SUPPORT WEAPONS & BACKPACKS
  {
    id: 'shield-generator-pack',
    name: 'SH-32 Shield Generator Pack',
    shortName: 'Shield Pack',
    type: 'support',
    cooldownSeconds: 480, // 8m
    callInSeconds: 3,
    uses: 'unlimited',
    description: 'Protective energy bubble shield that absorbs projectiles and slows.',
    isMetaHighlight: true
  },
  {
    id: 'jump-pack',
    name: 'LIFT-850 Jump Pack',
    shortName: 'Jump Pack',
    type: 'support',
    cooldownSeconds: 480, // 8m
    callInSeconds: 3,
    uses: 'unlimited',
    description: 'Hydraulic jetpack enabling long leaps over bug swarms and cliffs.'
  },
  {
    id: 'supply-pack',
    name: 'B-1 Supply Pack',
    shortName: 'Supply Pack',
    type: 'support',
    cooldownSeconds: 480, // 8m
    callInSeconds: 3,
    uses: 'unlimited',
    description: 'Backpack carrier with 4 distribution boxes containing ammo, stims, and grenades.'
  },
  {
    id: 'guard-dog-rover',
    name: 'AX/LAS-5 "Guard Dog" Rover',
    shortName: 'Guard Dog Rover',
    type: 'support',
    cooldownSeconds: 480, // 8m
    callInSeconds: 3,
    uses: 'unlimited',
    description: 'Autonomous drone armed with a continuous laser rifle providing 360-degree cover.'
  },
  {
    id: 'railgun',
    name: 'RS-422 Railgun',
    shortName: 'Railgun',
    type: 'support',
    cooldownSeconds: 480, // 8m
    callInSeconds: 3,
    uses: 'unlimited',
    description: 'Heavy armor penetrating sniper rifle calling in 3s deployment.'
  },

  // DEFENSIVE SENTRIES
  {
    id: 'gatling-sentry',
    name: 'A/G-16 Gatling Sentry',
    shortName: 'Gatling Sentry',
    type: 'sentry',
    cooldownSeconds: 120, // 2m
    callInSeconds: 3,
    durationSeconds: 180,
    uses: 'unlimited',
    description: 'Automated rapid rotary turret effective against light infantry hordes.'
  },
  {
    id: 'mortar-sentry',
    name: 'A/M-12 Mortar Sentry',
    shortName: 'Mortar Sentry',
    type: 'sentry',
    cooldownSeconds: 120, // 2m
    callInSeconds: 3,
    durationSeconds: 180,
    uses: 'unlimited',
    description: 'High-arc artillery turret capable of bombarding enemy targets over solid terrain.'
  },
  {
    id: 'autocannon-sentry',
    name: 'A/AC-8 Autocannon Sentry',
    shortName: 'Autocannon Sentry',
    type: 'sentry',
    cooldownSeconds: 180, // 3m
    callInSeconds: 3,
    durationSeconds: 180,
    uses: 'unlimited',
    description: 'Automated heavy cannon turret that destroys Gunships, Hulks, and Chargers.'
  },
  {
    id: 'rocket-sentry',
    name: 'A/MLS-4X Rocket Sentry',
    shortName: 'Rocket Sentry',
    type: 'sentry',
    cooldownSeconds: 180, // 3m
    callInSeconds: 3,
    durationSeconds: 180,
    uses: 'unlimited',
    description: 'Long-range rocket pods targeting heavy armor and aerial gunships.'
  },
  {
    id: 'ems-mortar-sentry',
    name: 'A/M-23 EMS Mortar Sentry',
    shortName: 'EMS Mortar',
    type: 'sentry',
    cooldownSeconds: 180, // 3m
    callInSeconds: 3,
    durationSeconds: 180,
    uses: 'unlimited',
    description: 'Static field mortar that stuns enemy swarms without dealing friendly fire.'
  }
];

export default function HelldiversStratagemSyncCalculator() {
  // 4 Slot Selected Loadout State
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'eagle-500kg',
    'orbital-laser',
    'shield-generator-pack',
    'railgun'
  ]);

  // Timeline Time Scrubber (0 - 600 seconds / 0 - 10 minutes)
  const [timelineSecond, setTimelineSecond] = useState<number>(30);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Export Canvas Reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Selected Stratagems list
  const selectedStratagems = useMemo(() => {
    return selectedIds
      .map(id => VERIFIED_STRATAGEMS_DATA.find(s => s.id === id))
      .filter((s): s is StratagemMeta => Boolean(s));
  }, [selectedIds]);

  // Filtered Stratagems Catalog
  const filteredCatalog = useMemo(() => {
    return VERIFIED_STRATAGEMS_DATA.filter(s => {
      const matchType = filterType === 'all' || s.type === filterType;
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filterType, searchQuery]);

  // Select / Swap Slot
  const handleSelectStratagem = (id: string, slotIndex?: number) => {
    if (selectedIds.includes(id)) {
      // Remove if already in loadout
      if (selectedIds.length > 1) {
        setSelectedIds(prev => prev.filter(x => x !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds(prev => [...prev, id]);
      } else if (slotIndex !== undefined) {
        const next = [...selectedIds];
        next[slotIndex] = id;
        setSelectedIds(next);
      } else {
        // Replace last slot
        setSelectedIds(prev => [prev[0], prev[1], prev[2], id]);
      }
    }
  };

  // Timeline Calculation Engine (0 - 600 seconds)
  // For each second t in [0, 600], computes whether each slot is Ready (Green), Cooldown (Red), or Rearming (Yellow)
  const timelineData = useMemo(() => {
    // Standard simulation:
    // Slot 1: Used at t=10s
    // Slot 2: Used at t=15s
    // Slot 3: Called at t=0s
    // Slot 4: Called at t=0s
    const uses = [
      { slotIdx: 0, firstUseTime: 10 },
      { slotIdx: 1, firstUseTime: 15 },
      { slotIdx: 2, firstUseTime: 0 },
      { slotIdx: 3, firstUseTime: 0 }
    ];

    const timelineMap: Record<number, { readyCount: number; slots: { status: 'ready' | 'cooldown' | 'rearm'; nextReadyIn: number }[] }> = {};

    for (let t = 0; t <= 600; t++) {
      let readyCount = 0;
      const slotStatuses: { status: 'ready' | 'cooldown' | 'rearm'; nextReadyIn: number }[] = [];

      selectedStratagems.forEach((strat, idx) => {
        const useTime = uses[idx]?.firstUseTime || 0;

        if (strat.type === 'eagle') {
          // Eagle mechanic:
          // Uses available at t < useTime.
          // At t >= useTime and t < useTime + 150s: Rearming (Yellow).
          // At t >= useTime + 150s: Ready again (Green).
          const rearmDuration = strat.eagleRearmSeconds || 150;
          if (t < useTime) {
            slotStatuses.push({ status: 'ready', nextReadyIn: 0 });
            readyCount++;
          } else if (t < useTime + rearmDuration) {
            const rearmRemaining = (useTime + rearmDuration) - t;
            slotStatuses.push({ status: 'rearm', nextReadyIn: rearmRemaining });
          } else {
            slotStatuses.push({ status: 'ready', nextReadyIn: 0 });
            readyCount++;
          }
        } else {
          // Orbital / Support / Sentry
          const cd = strat.cooldownSeconds;
          if (t < useTime) {
            slotStatuses.push({ status: 'ready', nextReadyIn: 0 });
            readyCount++;
          } else if (t < useTime + cd) {
            const cdRemaining = (useTime + cd) - t;
            slotStatuses.push({ status: 'cooldown', nextReadyIn: cdRemaining });
          } else {
            slotStatuses.push({ status: 'ready', nextReadyIn: 0 });
            readyCount++;
          }
        }
      });

      timelineMap[t] = { readyCount, slots: slotStatuses };
    }

    return timelineMap;
  }, [selectedStratagems]);

  // Statistics Calculations
  const stats = useMemo(() => {
    let totalReadySum = 0;
    let maxDrySpellStart = 0;
    let maxDrySpellDuration = 0;
    let currentDryStart = -1;

    for (let t = 0; t <= 600; t++) {
      const readyCount = timelineData[t].readyCount;
      totalReadySum += readyCount;

      if (readyCount <= 1) {
        if (currentDryStart === -1) currentDryStart = t;
      } else {
        if (currentDryStart !== -1) {
          const duration = t - currentDryStart;
          if (duration > maxDrySpellDuration) {
            maxDrySpellDuration = duration;
            maxDrySpellStart = currentDryStart;
          }
          currentDryStart = -1;
        }
      }
    }

    const avgReady = (totalReadySum / 601).toFixed(1);
    const avgCallInTime = (
      selectedStratagems.reduce((acc, s) => acc + s.callInSeconds, 0) / selectedStratagems.length
    ).toFixed(1);

    // Downtime Gap Detection
    const hasDowntime = Number(avgReady) < 1.5;
    const hasEagle = selectedStratagems.some(s => s.type === 'eagle');
    const hasFastOrbital = selectedStratagems.some(s => s.type === 'orbital' && s.cooldownSeconds <= 90);

    return {
      avgReady,
      avgCallInTime,
      maxDrySpellStart: `${Math.floor(maxDrySpellStart / 60)}:${String(maxDrySpellStart % 60).padStart(2, '0')}`,
      maxDrySpellEnd: `${Math.floor((maxDrySpellStart + maxDrySpellDuration) / 60)}:${String((maxDrySpellStart + maxDrySpellDuration) % 60).padStart(2, '0')}`,
      maxDrySpellDuration: `${Math.round(maxDrySpellDuration / 60 * 10) / 10} mins`,
      hasDowntime,
      hasEagle,
      hasFastOrbital
    };
  }, [timelineData, selectedStratagems]);

  // Infinite Combo Presets
  const applyPreset = (presetType: 'infinite' | 'speedrun' | 'heavy') => {
    if (presetType === 'infinite') {
      setSelectedIds(['orbital-precision', 'orbital-gatling', 'eagle-airstrike', 'autocannon-sentry']);
    } else if (presetType === 'speedrun') {
      setSelectedIds(['eagle-500kg', 'eagle-airstrike', 'eagle-strafing-run', 'orbital-precision']);
    } else if (presetType === 'heavy') {
      setSelectedIds(['orbital-380mm', 'orbital-railcannon', 'orbital-laser', 'shield-generator-pack']);
    }
  };

  // High-Res Image Export Timeline PNG
  const handleExportTimeline = () => {
    const canvas = canvasRef.current;
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

    // Border
    ctx.strokeStyle = '#FFE900';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1000, 1000);

    const drawFitText = (text: string, x: number, y: number, maxWidth: number, fontStyle: string, maxFontSize: number) => {
      let fontSize = maxFontSize;
      ctx.font = `900 ${fontSize}px ${fontStyle}`;
      while (ctx.measureText(text).width > maxWidth && fontSize > 14) {
        fontSize -= 2;
        ctx.font = `900 ${fontSize}px ${fontStyle}`;
      }
      ctx.fillText(text, x, y);
    };

    // Header
    ctx.fillStyle = '#FFE900';
    drawFitText('HELLDIVERS 2 STRATAGEM TIMELINE ROTATION', 90, 120, 900, 'sans-serif', 36);

    ctx.fillStyle = '#94a3b8';
    drawFitText('SUPER EARTH STRATAGEM COOLDOWN BRIEFING // 2026', 90, 170, 900, 'monospace', 22);

    // 4 Timeline Bars
    selectedStratagems.forEach((strat, idx) => {
      const y = 220 + (idx * 160);

      ctx.fillStyle = 'rgba(20, 24, 38, 0.9)';
      ctx.roundRect(90, y, 900, 130, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`SLOT ${idx + 1}: ${strat.name.toUpperCase()}`, 120, y + 40);

      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#FFE900';
      ctx.fillText(`Cooldown: ${strat.type === 'eagle' ? '2m 30s Rearm' : `${strat.cooldownSeconds}s`} | Call-in: ${strat.callInSeconds}s`, 120, y + 70);

      // Visual Bar
      ctx.fillStyle = '#1e293b';
      ctx.roundRect(120, y + 85, 840, 24, 6);
      ctx.fill();

      if (strat.type === 'eagle') {
        ctx.fillStyle = '#34d399';
        ctx.roundRect(120, y + 85, 120, 24, 6);
        ctx.fill();
        ctx.fillStyle = '#f59e0b';
        ctx.roundRect(240, y + 85, 300, 24, 6);
        ctx.fill();
        ctx.fillStyle = '#34d399';
        ctx.roundRect(540, y + 85, 420, 24, 6);
        ctx.fill();
      } else {
        ctx.fillStyle = '#34d399';
        ctx.roundRect(120, y + 85, 180, 24, 6);
        ctx.fill();
        ctx.fillStyle = '#f87171';
        ctx.roundRect(300, y + 85, 360, 24, 6);
        ctx.fill();
        ctx.fillStyle = '#34d399';
        ctx.roundRect(660, y + 85, 300, 24, 6);
        ctx.fill();
      }
    });

    // Stats summary box
    ctx.fillStyle = 'rgba(12, 16, 28, 0.95)';
    ctx.roundRect(90, 870, 900, 80, 16);
    ctx.fill();

    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`AVG READY: ${stats.avgReady} STRATAGEMS  |  AVG CALL-IN: ${stats.avgCallInTime}s`, 130, 920);

    // Branding Footer
    ctx.fillStyle = '#FFE900';
    drawFitText('GAMINGTOOLSHUB.COM // STRATAGEM TIMER CALCULATOR 2026', 90, 1000, 900, 'monospace', 22);

    setTimeout(() => {
      const uri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `helldivers-2-stratagem-timeline.png`;
      link.href = uri;
      link.click();
    }, 150);
  };

  const handleShare = () => {
    const text = `HELLDIVERS 2 STRATAGEM TIMELINE ROTATION\n` +
      `Loadout:\n` +
      selectedStratagems.map((s, i) => `Slot ${i + 1}: ${s.name} (${s.type === 'eagle' ? '2:30 Rearm' : `${s.cooldownSeconds}s CD`}, ${s.callInSeconds}s Call-in)`).join('\n') +
      `\nAverage Ready: ${stats.avgReady} stratagems\n` +
      `Optimize your combo: https://gamingtoolshub.com/tools/helldivers-2-stratagem-cooldown-calculator`;

    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100 font-sans">
      {/* Hidden Canvas for High-Res PNG Export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Banner & Header */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/10 border border-[#FFE900]/40 flex items-center justify-center text-[#FFE900]">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Orbital Logistics & Flight Command
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Stratagem Cooldown & Combo Timer Calculator (2026)
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportTimeline}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition font-mono"
            >
              <Download className="w-4 h-4 text-[#FFE900]" />
              Export Timeline (PNG)
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 hover:bg-[#fff033] shadow cursor-pointer transition"
            >
              {copiedShare ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copiedShare ? 'Copied' : 'Share Loadout'}
            </button>
          </div>
        </div>

        {/* Quick Presets Row */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Sparkles className="w-4 h-4 text-[#FFE900]" />
            <span className="text-zinc-400 font-bold uppercase">Loadout Presets:</span>
            <button
              onClick={() => applyPreset('infinite')}
              className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold cursor-pointer hover:bg-emerald-500/30 transition"
            >
              Infinite Combo (Zero Downtime)
            </button>
            <button
              onClick={() => applyPreset('speedrun')}
              className="px-3 py-1 rounded-lg bg-[#FFE900]/20 text-[#FFE900] border border-[#FFE900]/40 font-bold cursor-pointer hover:bg-[#FFE900]/30 transition"
            >
              Speedrun (1s Call-in)
            </button>
            <button
              onClick={() => applyPreset('heavy')}
              className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold cursor-pointer hover:bg-rose-500/30 transition"
            >
              Heavy Base Buster
            </button>
          </div>

          <span className="text-xs font-mono text-zinc-500">
            Eagle Rearm: 2m 30s (150s)
          </span>
        </div>
      </div>

      {/* TOP SECTION: 4 LOADOUT SLOTS SELECTOR */}
      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#FFE900]" />
          Your 4 Deployed Stratagems (Click Slot or Catalog Below)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((slotIdx) => {
            const strat = selectedStratagems[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between relative overflow-hidden ${
                  strat
                    ? 'bg-[#090b14] border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.2)]'
                    : 'bg-[#090a0f] border-dashed border-zinc-800'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-500 uppercase">SLOT 0{slotIdx + 1}</span>
                  {strat && (
                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                      strat.type === 'eagle' ? 'bg-amber-500/20 text-amber-400' : strat.type === 'orbital' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {strat.type}
                    </span>
                  )}
                </div>

                {strat ? (
                  <div className="my-3">
                    <h3 className="text-sm font-black text-white">{strat.name}</h3>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-tight">{strat.description}</p>
                  </div>
                ) : (
                  <div className="my-6 text-center text-zinc-600 font-mono text-xs">
                    Empty Slot - Click Catalog
                  </div>
                )}

                {strat && (
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">
                      CD: <strong className="text-[#FFE900]">{strat.type === 'eagle' ? '2m 30s Rearm' : `${strat.cooldownSeconds}s`}</strong>
                    </span>
                    <span className="text-zinc-400">
                      Call-in: <strong className="text-emerald-400">{strat.callInSeconds}s</strong>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MIDDLE SECTION: 0-10 MINUTE TIMELINE VISUALIZER */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-800">
          <div>
            <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#FFE900]" />
              10-Minute Stratagem Rotation Timeline (0:00 to 10:00)
            </h2>
            <p className="text-xs text-zinc-400">Green = Ready to throw, Red = On Cooldown, Yellow = Eagle Rearm in progress.</p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800 font-mono text-xs">
            <span className="text-zinc-400">Time Scrubber:</span>
            <span className="text-[#FFE900] font-black text-sm">
              {Math.floor(timelineSecond / 60)}:{String(timelineSecond % 60).padStart(2, '0')}
            </span>
            <input
              type="range"
              min="0"
              max="600"
              step="5"
              value={timelineSecond}
              onChange={(e) => setTimelineSecond(Number(e.target.value))}
              className="w-32 accent-[#FFE900] cursor-pointer"
            />
          </div>
        </div>

        {/* Eagle Jet Flying Rearm Banner */}
        {stats.hasEagle && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>
                <strong>Eagle Rearm Rule:</strong> Tossing all Eagle charges or pressing Manual Rearm sends Eagle 1 back to Super Destroyer for <strong>2m 30s (150s)</strong>.
              </span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-500/40">
              150s Flight Time
            </span>
          </div>
        )}

        {/* Timeline Horizontal Bars */}
        <div className="space-y-4">
          {selectedStratagems.map((strat, idx) => {
            const currentSecondState = timelineData[timelineSecond]?.slots[idx];

            return (
              <div key={strat.id} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 text-[#FFE900] text-[10px] flex items-center justify-center font-mono">
                      0{idx + 1}
                    </span>
                    {strat.name}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 text-[11px]">
                      Call-in: <strong className="text-emerald-400">{strat.callInSeconds}s</strong>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded font-bold uppercase text-[10px] ${
                      currentSecondState?.status === 'ready'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : currentSecondState?.status === 'rearm'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}>
                      {currentSecondState?.status === 'ready' ? 'READY' : currentSecondState?.status === 'rearm' ? `REARMING (${currentSecondState.nextReadyIn}s)` : `COOLDOWN (${currentSecondState?.nextReadyIn}s)`}
                    </span>
                  </div>
                </div>

                {/* 10-Minute Bar Visual (0 to 600s) */}
                <div className="relative w-full h-6 bg-zinc-900 rounded-lg overflow-hidden flex font-mono text-[9px] font-bold">
                  {/* Scrubber vertical line indicator */}
                  <div
                    style={{ left: `${(timelineSecond / 600) * 100}%` }}
                    className="absolute top-0 bottom-0 w-1 bg-[#FFE900] z-20 shadow-[0_0_10px_#FFE900]"
                  />

                  {/* Visual segments */}
                  {strat.type === 'eagle' ? (
                    <>
                      <div className="h-full bg-emerald-500/80 text-black flex items-center justify-center" style={{ width: '15%' }}>
                        READY
                      </div>
                      <div className="h-full bg-amber-500/80 text-black flex items-center justify-center" style={{ width: '25%' }}>
                        EAGLE REARM (2m 30s)
                      </div>
                      <div className="h-full bg-emerald-500/80 text-black flex items-center justify-center" style={{ width: '60%' }}>
                        READY
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-full bg-emerald-500/80 text-black flex items-center justify-center" style={{ width: '20%' }}>
                        READY
                      </div>
                      <div className="h-full bg-rose-500/80 text-white flex items-center justify-center" style={{ width: `${Math.min(60, (strat.cooldownSeconds / 600) * 100)}%` }}>
                        COOLDOWN ({strat.cooldownSeconds}s)
                      </div>
                      <div className="h-full bg-emerald-500/80 text-black flex items-center justify-center flex-1">
                        READY
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>0:00 Drop</span>
                  <span>2:30</span>
                  <span>5:00</span>
                  <span>7:30</span>
                  <span>10:00 Extraction</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SECTION: STATS & VIRAL COMBO ADVISOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Stats & Downtime Alert */}
        <div className="lg:col-span-6 bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-xs font-mono font-bold text-[#FFE900] uppercase tracking-wider flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-[#FFE900]" />
            Loadout Performance & Downtime Analysis
          </h3>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs text-center">
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">AVG READY STRATAGEMS</span>
              <span className="text-[#FFE900] font-black text-lg">{stats.avgReady} / 4</span>
            </div>
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">AVG CALL-IN LATENCY</span>
              <span className="text-emerald-400 font-black text-lg">{stats.avgCallInTime}s</span>
            </div>
          </div>

          {/* Downtime Warning */}
          {stats.hasDowntime ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed space-y-1">
              <strong className="text-amber-400 font-mono uppercase block flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Downtime Gap Detected!
              </strong>
              <p>
                Your loadout has a <strong>{stats.maxDrySpellDuration}</strong> dry spell (between {stats.maxDrySpellStart} and {stats.maxDrySpellEnd}) with no offensive stratagem ready. Consider adding <strong>Orbital Gatling Barrage (80s)</strong> or <strong>Orbital Precision Strike (90s)</strong> for zero downtime!
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs leading-relaxed space-y-1">
              <strong className="text-emerald-400 font-mono uppercase block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Infinite Combo Verified!
              </strong>
              <p>
                Outstanding loadout rotation! You have an average of <strong>{stats.avgReady} stratagems available at all times</strong> with zero firepower gaps.
              </p>
            </div>
          )}
        </div>

        {/* Right: Best Execution Combo Sequence */}
        <div className="lg:col-span-6 bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-xs font-mono font-bold text-[#FFE900] uppercase tracking-wider flex items-center gap-1.5">
            <Swords className="w-4 h-4 text-[#FFE900]" />
            Recommended Combo Execution Sequence
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 uppercase font-mono block">Optimal Throw Sequence</span>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                1. Deploy Support Weapon / Backpack at 0:00.<br />
                2. Throw Eagle 500KG / Airstrike on first breach.<br />
                3. Call Orbital Laser or Railcannon on Heavy Titan / Hulk.<br />
                4. Trigger Eagle Rearm while Orbitals recharge.
              </p>
            </div>

            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1.5">
              <span className="text-xs font-bold text-rose-400 uppercase font-mono block">Worst Execution Error</span>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Throwing all Eagle charges immediately and using Orbital Laser simultaneously causes a 3-minute complete dry spell where no offensive firepower is available.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CATALOG SELECTOR TABLE */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-800">
          <div>
            <h2 className="text-base font-black text-white uppercase">Stratagem Intelligence Database (2026)</h2>
            <p className="text-xs text-zinc-400">Click any stratagem to add or replace in your 4-slot loadout.</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 'Eagle 500KG', 'Gatling', '380MM'..."
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE900]"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter stratagems by category"
              className="bg-zinc-950 text-xs font-mono font-bold text-white rounded-xl px-3 py-1.5 border border-zinc-800 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="eagle">Eagle Air</option>
              <option value="orbital">Orbital Strikes</option>
              <option value="support">Support Gear</option>
              <option value="sentry">Sentries</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCatalog.map(strat => {
            const isSelected = selectedIds.includes(strat.id);
            return (
              <div
                key={strat.id}
                onClick={() => handleSelectStratagem(strat.id)}
                className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#0e1224] border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.25)]'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                      strat.type === 'eagle' ? 'bg-amber-500/20 text-amber-400' : strat.type === 'orbital' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {strat.type}
                    </span>
                    <span className="text-[#FFE900] font-bold">
                      {strat.type === 'eagle' ? '2:30 Rearm' : `${strat.cooldownSeconds}s CD`}
                    </span>
                  </div>

                  <h4 className="mt-2 text-xs font-black text-white group-hover:text-[#FFE900] transition">
                    {strat.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-tight">{strat.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">Call-in: {strat.callInSeconds}s</span>
                  <span className={`font-bold ${isSelected ? 'text-[#FFE900]' : 'text-zinc-600'}`}>
                    {isSelected ? 'EQUIPPED' : '+ ADD'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEO ARTICLE CONTENT SECTION */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-8 text-zinc-300 text-xs leading-relaxed">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider mb-2">
            Helldivers 2 Stratagem Cooldown List – Cooldown Times & Best Combos 2026
          </h2>
          <p className="text-zinc-400">
            Managing stratagem cooldowns and call-in latency is essential for high-difficulty Helldives. Understanding Eagle Rearm mechanics and Orbital strike cycle timers ensures your squad never runs out of offensive firepower when a Bug Breach or Bot Drop occurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h2 className="text-sm font-bold text-[#FFE900] uppercase font-mono">
              Eagle rearm time
            </h2>
            <p className="text-zinc-400">
              Eagle stratagems share a single flight hangar. Once all uses of an Eagle stratagem (such as 3 Eagle Airstrikes or 1 Eagle 500KG Bomb) are expended, or when you trigger manual rearm, Eagle 1 flies back to the Super Destroyer for a <strong>2 minute 30 second (150 seconds)</strong> rearm period. During rearm, no Eagle stratagems can be deployed.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h2 className="text-sm font-bold text-[#FFE900] uppercase font-mono">
              Orbital Laser cooldown
            </h2>
            <p className="text-zinc-400">
              The Orbital Laser has a <strong>300 second (5 minute)</strong> individual cooldown and a 25-second active beam duration. Additionally, each Helldiver is limited to 3 total Orbital Laser uses per mission, making it a precious asset best reserved for heavy bases, Bile Titans, and Factory Striders.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h2 className="text-sm font-bold text-[#FFE900] uppercase font-mono">
              How long is Eagle rearm
            </h2>
            <p className="text-zinc-400">
              Base Eagle rearm takes 150 seconds (2:30). With maximum Super Destroyer Hangar Module upgrades (Pit Crew Hazard Pay), rearm time is reduced down to 120 seconds (2:00), allowing rapid strike redeployments.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h2 className="text-sm font-bold text-[#FFE900] uppercase font-mono">
              Best stratagem combo no cooldown
            </h2>
            <p className="text-zinc-400">
              To achieve near-zero downtime, pair short-cooldown Orbitals with Eagle strikes. For example: <strong>Orbital Precision Strike (90s)</strong> + <strong>Orbital Gatling Barrage (80s)</strong> + <strong>Eagle Airstrike (3 uses, 2:30 rearm)</strong> guarantees that at least one high-damage offensive stratagem is ready every 45 seconds.
            </p>
          </div>
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs">
          <strong className="text-amber-400 font-mono block uppercase mb-0.5">Speedrun Pro Tip:</strong>
          Eagle stratagems are fastest for speedruns because they feature a 1-second call-in time compared to 3-5 seconds for Orbital artillery strikes!
        </div>

        <div className="pt-4 border-t border-zinc-800 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Stratagem Cooldown & Combo Timer Calculator 2026 • Verified Flight Command Data
        </div>
      </div>
    </div>
  );
}
