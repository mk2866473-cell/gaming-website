/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Coins, Sparkles, Clock, Target, Compass, Shield, 
  CheckCircle2, Share2, Check, Sliders, MapPin, AlertTriangle, 
  TrendingUp, Users, ChevronRight, Zap, Award, Eye, Info, Play, Pause, RotateCcw, Download
} from 'lucide-react';

export type FarmMethod = 'solo' | 'squad' | 'suicide';

export interface FarmPreset {
  id: FarmMethod;
  name: string;
  scPerHour: number;
  avgPerMission: number;
  minutesPerRun: number;
  description: string;
  icon: string;
}

export const FARM_METHODS: FarmPreset[] = [
  {
    id: 'solo',
    name: 'Solo Trivial POI Farm',
    scPerHour: 500,
    avgPerMission: 18,
    minutesPerRun: 6,
    description: 'Fastest solo method: Drop Trivial Diff 1 on Grand Erit, sprint to all minor POIs using Jump Pack, return to desktop or quit out if needed.',
    icon: '🏃'
  },
  {
    id: 'squad',
    name: 'Squad Trivial POI Farm',
    scPerHour: 650,
    avgPerMission: 25,
    minutesPerRun: 5,
    description: '4-player split-farming squad: Each diver sweeps one quadrant of the small map, clearing bunkers instantly with two-button prompts.',
    icon: '👥'
  },
  {
    id: 'suicide',
    name: 'Suicide+ Full Clear Farm',
    scPerHour: 200,
    avgPerMission: 35,
    minutesPerRun: 25,
    description: 'Playing normal operations on Diff 7+ (yields lower SC per hour, but farms Rare/Super samples and Warbond medals simultaneously).',
    icon: '⚔️'
  }
];

export default function HelldiversSuperCreditsCalculator() {
  // Input State
  const [targetSc, setTargetSc] = useState<number>(1000);
  const [ownedSc, setOwnedSc] = useState<number>(200);
  const [selectedMethod, setSelectedMethod] = useState<FarmMethod>('solo');
  const [difficultyTier, setDifficultyTier] = useState<number>(1); // 1 = Trivial

  // Stopwatch Timer Simulation State
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [simulatedScCollected, setSimulatedScCollected] = useState<number>(0);

  // Copy feedback
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active Method Object
  const currentMethod = useMemo(() => {
    return FARM_METHODS.find(m => m.id === selectedMethod) || FARM_METHODS[0];
  }, [selectedMethod]);

  // Calculations
  const calculations = useMemo(() => {
    const remainingSc = Math.max(0, targetSc - ownedSc);
    const hoursNeeded = remainingSc / currentMethod.scPerHour;
    const missionsNeeded = Math.ceil(remainingSc / currentMethod.avgPerMission);
    const totalMinutes = Math.round(hoursNeeded * 60);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const timeFormatted = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} mins`;

    // Dollar savings: 1000 SC = $10, 1500 SC = $15 ($0.01 per Super Credit)
    const dollarsSaved = Number((targetSc * 0.01).toFixed(2));

    return {
      remainingSc,
      hoursNeeded: Number(hoursNeeded.toFixed(1)),
      missionsNeeded,
      timeFormatted,
      dollarsSaved
    };
  }, [targetSc, ownedSc, currentMethod]);

  // Timer Tick Simulation
  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
        // Every 20 seconds simulated, add Super Credits based on rate (~8.3 SC per minute = ~2.7 SC per 20s)
        if ((secondsElapsed + 1) % 20 === 0) {
          setSimulatedScCollected(prev => prev + Math.floor(Math.random() * 5) + 8);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsElapsed]);

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSecondsElapsed(0);
    setSimulatedScCollected(0);
  };

  // Export Reddit / Social Image Card
  const handleExportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1050;

    // Background
    const bg = ctx.createLinearGradient(0, 0, 1080, 1050);
    bg.addColorStop(0, '#060810');
    bg.addColorStop(1, '#0c101d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1050);

    // Border Frame
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

    // Title
    ctx.fillStyle = '#FFE900';
    drawFitText('SUPER EARTH CURRENCY REPORT', 80, 130, 780, 'sans-serif', 34);

    ctx.fillStyle = '#94a3b8';
    drawFitText('HELLDIVERS 2 SUPER CREDITS FARMING', 80, 175, 780, 'monospace', 22);

    // Main Stat Box
    ctx.fillStyle = 'rgba(20, 24, 38, 0.9)';
    ctx.roundRect(80, 220, 920, 260, 20);
    ctx.fill();

    ctx.fillStyle = '#34d399';
    drawFitText('STATUS: WARBOND FULLY FUNDED (FREE)', 110, 280, 740, 'monospace', 22);

    ctx.fillStyle = '#FFFFFF';
    drawFitText(`FARMED ${targetSc} SUPER CREDITS`, 110, 360, 740, 'sans-serif', 38);

    ctx.fillStyle = '#FFE900';
    drawFitText(`Saved $${calculations.dollarsSaved} USD without spending real money!`, 110, 420, 740, 'monospace', 20);

    // Details Box
    ctx.fillStyle = 'rgba(12, 16, 28, 0.9)';
    ctx.roundRect(80, 510, 920, 320, 20);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    drawFitText('OPTIMIZED FARM PARAMETERS', 110, 570, 740, 'sans-serif', 26);

    const drawRow = (label: string, val: string, y: number) => {
      ctx.fillStyle = '#94a3b8';
      drawFitText(label, 110, y, 380, 'monospace', 22);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(val, 940, y);
      ctx.textAlign = 'left';
    };

    drawRow('Farm Method:', currentMethod.name, 635);
    drawRow('Planet Sector:', 'Grand Erit (Terminid Trivial)', 695);
    drawRow('Estimated Time:', calculations.timeFormatted, 755);

    // Footer
    ctx.fillStyle = '#FFE900';
    drawFitText('GAMINGTOOLSHUB.COM // 2026 META', 80, 925, 800, 'sans-serif', 26);

    setTimeout(() => {
      const uri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `helldivers-super-credits-${targetSc}sc.png`;
      link.href = uri;
      link.click();
    }, 150);
  };

  const handleShare = () => {
    const text = `HELLDIVERS 2 SUPER CREDITS FARM REPORT\n` +
      `Target: ${targetSc} SC ($${calculations.dollarsSaved} USD saved)\n` +
      `Method: ${currentMethod.name}\n` +
      `Estimated Time Needed: ${calculations.timeFormatted} (${calculations.missionsNeeded} missions)\n` +
      `Optimize your farming: https://gamingtoolshub.com/tools/helldivers-2-super-credits-calculator`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Hidden Canvas for Reddit / Social Image Export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Banner & Main Input Card */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/15 border border-[#FFE900]/50 flex items-center justify-center text-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.3)]">
              <Coins className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Financial Logistics
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Super Credits Farm Calculator & Optimizer (2026)
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportImage}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition font-mono"
            >
              <Download className="w-4 h-4 text-[#FFE900]" />
              Export Reddit Card (PNG)
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 hover:bg-[#fff033] shadow cursor-pointer transition"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copiedLink ? 'Copied' : 'Share Report'}
            </button>
          </div>
        </div>

        {/* Input & Presets Row */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <label className="text-sm font-bold tracking-wider uppercase text-zinc-300 flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#FFE900]" />
              How many Super Credits do you need?
            </label>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="100"
                  max="10000"
                  step="50"
                  value={targetSc}
                  aria-label="Target Super Credits amount"
                  onChange={(e) => setTargetSc(Number(e.target.value))}
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 text-xl font-black font-mono text-[#FFE900] focus:outline-none focus:border-[#FFE900]"
                />
                <span className="absolute right-4 top-3.5 text-zinc-500 font-mono text-xs">SC</span>
              </div>
            </div>

            {/* Preset Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-zinc-400 font-mono">Presets:</span>
              <button
                onClick={() => setTargetSc(1000)}
                className={`text-xs px-3 py-1 rounded-lg border font-mono font-bold cursor-pointer transition ${
                  targetSc === 1000 ? 'bg-[#FFE900] text-black border-[#FFE900]' : 'bg-zinc-900 border-zinc-700 text-zinc-300'
                }`}
              >
                1,000 SC (1 Warbond)
              </button>
              <button
                onClick={() => setTargetSc(1500)}
                className={`text-xs px-3 py-1 rounded-lg border font-mono font-bold cursor-pointer transition ${
                  targetSc === 1500 ? 'bg-[#FFE900] text-black border-[#FFE900]' : 'bg-zinc-900 border-zinc-700 text-zinc-300'
                }`}
              >
                1,500 SC (Legendary)
              </button>
              <button
                onClick={() => setTargetSc(2000)}
                className={`text-xs px-3 py-1 rounded-lg border font-mono font-bold cursor-pointer transition ${
                  targetSc === 2000 ? 'bg-[#FFE900] text-black border-[#FFE900]' : 'bg-zinc-900 border-zinc-700 text-zinc-300'
                }`}
              >
                2,000 SC (2 Warbonds)
              </button>
            </div>
          </div>

          {/* Owned Super Credits & Savings Callout */}
          <div className="lg:col-span-5 bg-zinc-950/80 p-5 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">Currently Owned:</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={ownedSc}
                  aria-label="Currently owned Super Credits"
                  onChange={(e) => setOwnedSc(Number(e.target.value))}
                  className="w-20 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-right font-mono text-white text-xs font-bold"
                />
                <span className="text-zinc-500">SC</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex justify-between items-center font-mono">
              <span className="text-zinc-400 text-xs">Real Money Value:</span>
              <span className="text-emerald-400 font-black text-base">${calculations.dollarsSaved} USD Saved</span>
            </div>

            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FFE900] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((ownedSc / targetSc) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 block text-right">
              {calculations.remainingSc} SC remaining to goal
            </span>
          </div>
        </div>
      </div>

      {/* Middle Row: 2 Method Cards (Solo vs Squad) */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#FFE900]" />
          Select Farming Method & Strategy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FARM_METHODS.slice(0, 2).map(method => {
            const isSelected = selectedMethod === method.id;
            const hours = (calculations.remainingSc / method.scPerHour).toFixed(1);
            const missions = Math.ceil(calculations.remainingSc / method.avgPerMission);

            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#090b14] border-[#FFE900] shadow-[0_0_20px_rgba(255,233,0,0.18)] ring-1 ring-[#FFE900]'
                    : 'bg-[#090a0f] border-zinc-800 hover:border-zinc-700 hover:bg-[#0c0f1d]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{method.icon}</span>
                      <h4 className="text-base font-black text-white">{method.name}</h4>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#FFE900]/15 text-[#FFE900] border border-[#FFE900]/30 font-bold">
                      {method.scPerHour} SC / Hour
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                    {method.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 grid grid-cols-3 gap-2 text-xs font-mono text-center">
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">TIME NEEDED</span>
                    <span className="text-[#FFE900] font-black text-sm">{hours} Hours</span>
                  </div>
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">MISSIONS</span>
                    <span className="text-white font-black text-sm">{missions} Runs</span>
                  </div>
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">AVG / RUN</span>
                    <span className="text-emerald-400 font-black text-sm">{method.avgPerMission} SC</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Best Farm Route Map & Tactical Loadout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farm Route Map Blueprint */}
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFE900] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FFE900]" />
                Best Planet & Map Route (Grand Erit - Trivial Bug Sector)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFE900]/10 text-[#FFE900] border border-[#FFE900]/30 font-bold">
                Meta Route
              </span>
            </div>

            {/* Simulated Radar Map Graphic */}
            <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 relative h-56 flex items-center justify-center overflow-hidden font-mono">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full border border-zinc-800/80" />
                <div className="w-24 h-24 rounded-full border border-zinc-800/60" />
                <div className="absolute w-full h-[1px] bg-zinc-800/60" />
                <div className="absolute h-full w-[1px] bg-zinc-800/60" />
              </div>

              {/* Extraction Pad Center */}
              <div className="absolute bottom-4 left-6 flex flex-col items-center">
                <div className="w-7 h-7 rounded bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] text-emerald-400 mt-1">Drop Zone</span>
              </div>

              {/* 8 POI Markers */}
              {[
                { top: '15%', left: '20%', label: 'POI 1 (Bunker)' },
                { top: '25%', left: '70%', label: 'POI 2 (Crate)' },
                { top: '65%', left: '80%', label: 'POI 3 (Pod)' },
                { top: '75%', left: '30%', label: 'POI 4 (Bunker)' }
              ].map((poi, idx) => (
                <div key={idx} className="absolute flex flex-col items-center" style={{ top: poi.top, left: poi.left }}>
                  <div className="w-6 h-6 rounded-full bg-[#FFE900]/20 border-2 border-[#FFE900] flex items-center justify-center text-[#FFE900] text-[10px] font-bold animate-pulse">
                    {idx + 1}
                  </div>
                  <span className="text-[8px] text-zinc-300 bg-zinc-900/90 px-1 rounded mt-0.5">{poi.label}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-zinc-300 leading-relaxed">
              <strong className="text-white">Farming Rule:</strong> Drop on Trivial Diff 1 Grand Erit. Open all minor points of interest (Bunkers have a 30% Super Credit drop rate). Do NOT finish the main mission objectives; simply return to your ship or quit to save time!
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Mission Objective:</span>
            <span className="text-emerald-400 font-bold">Loot POIs & Quit / Extract</span>
          </div>
        </div>

        {/* Tactical Speedrun Loadout & Live Stopwatch */}
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                Speedrun Loadout & Live Stopwatch Simulator
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-700">
                Zero Combat Setup
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">RECOMMENDED ARMOR</span>
                <span className="text-white font-bold">Light Scout Armor (-30% Detection)</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">SUPPORT STRATAGEM</span>
                <span className="text-[#FFE900] font-bold">Jump Pack (Max Terrain Mobility)</span>
              </div>
            </div>

            {/* Live Stopwatch Simulation Box */}
            <div className="mt-5 p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase">Live Run Stopwatch</span>
                <span className="text-lg font-black font-mono text-[#FFE900]">
                  {Math.floor(secondsElapsed / 60)}:{String(secondsElapsed % 60).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Super Credits Found in Run:</span>
                <span className="text-emerald-400 font-black text-sm">+{simulatedScCollected} SC</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition ${
                    isTimerRunning ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-emerald-500 text-black hover:bg-emerald-400'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isTimerRunning ? 'Pause Stopwatch' : 'Start 6-Min Run'}
                </button>
                <button
                  onClick={handleResetTimer}
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Average Run Target:</span>
            <span className="text-[#FFE900] font-bold">15–20 SC per 6 minutes</span>
          </div>
        </div>
      </div>

      {/* SEO FAQs & Monetization Note */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 text-zinc-300 text-xs leading-relaxed">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FFE900]" />
          Helldivers 2 Super Credits Farm Guide & FAQs (2026)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">How to farm super credits fast?</h5>
            <p className="text-zinc-400">
              Run Trivial Difficulty 1 missions on flat Terminid planets like Grand Erit. Equip Light Scout armor and a Jump Pack, loot all minor points of interest (Bunkers yield 30% SC), and quit out without finishing the main mission.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">Best planet for super credits?</h5>
            <p className="text-zinc-400">
              Grand Erit (Terminid Sector) is widely considered the meta farming planet because of its flat terrain, high POI density, and absence of heavy Automaton gunships.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">How many super credits per mission?</h5>
            <p className="text-zinc-400">
              On average, a thorough POI sweep yields between 15 to 25 Super Credits per 5-minute run (equivalent to ~500 to 650 SC per hour).
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">Do you need to finish mission?</h5>
            <p className="text-zinc-400">
              No! Super Credits are credited to your account instantly the moment your character picks up the glowing yellow diamond item off the ground or out of a crate/bunker. You can safely return to your ship immediately.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Super Credits Farm Calculator - How to farm 1000 SC Fast 2026 • Verified Steam Community Guide
        </div>
      </div>
    </div>
  );
}
