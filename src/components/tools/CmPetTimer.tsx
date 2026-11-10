/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Zap, Cookie, AlertTriangle, ShieldCheck, Flame, Award, ChevronUp } from 'lucide-react';

interface PetSpec {
  id: string;
  name: string;
  title: string;
  role: string;
  badge: string;
  baseStat: string;
  statFormula: (lvl: number) => string;
  statPercent: (lvl: number) => number;
  description: string;
  accent: string;
  borderAccent: string;
}

const PETS: PetSpec[] = [
  {
    id: 'foxy',
    name: 'Foxy',
    title: 'Master of Raids',
    role: 'Raid Multiplier',
    badge: 'Extra Coins on 4-Hole Raids',
    baseStat: 'Raid Payout',
    statFormula: (lvl) => `+${Math.min(108, 15 + Math.floor(lvl * 0.93))}% Coin Payout`,
    statPercent: (lvl) => Math.min(100, Math.floor((15 + lvl * 0.93) / 108 * 100)),
    description: 'Digs up the 4th hole during village raids, awarding up to 108% bonus coins from the Coin Master.',
    accent: 'from-amber-500/20 to-orange-500/10 text-amber-400',
    borderAccent: 'border-amber-500/40 hover:border-amber-400'
  },
  {
    id: 'tiger',
    name: 'Tiger',
    title: 'Lord of Attacks',
    role: 'Attack Multiplier',
    badge: 'Bonus Loot on Attacks',
    baseStat: 'Attack Damage',
    statFormula: (lvl) => `+${Math.min(410, 50 + Math.floor(lvl * 3.6))}% Attack Loot`,
    statPercent: (lvl) => Math.min(100, Math.floor((50 + lvl * 3.6) / 410 * 100)),
    description: 'Massively increases attack payouts even when enemy targets have shields raised.',
    accent: 'from-rose-500/20 to-red-500/10 text-rose-400',
    borderAccent: 'border-rose-500/40 hover:border-rose-400'
  },
  {
    id: 'rhino',
    name: 'Rhino',
    title: 'Shield Guardian',
    role: 'Defense Blocker',
    badge: 'Extra Attack Block Chance',
    baseStat: 'Block Probability',
    statFormula: (lvl) => `${Math.min(70, 10 + Math.floor(lvl * 0.6))}% Block Chance`,
    statPercent: (lvl) => Math.min(100, Math.floor((10 + lvl * 0.6) / 70 * 100)),
    description: 'Defends your village from incoming enemy attacks when regular shields are broken.',
    accent: 'from-cyan-500/20 to-blue-500/10 text-cyan-400',
    borderAccent: 'border-cyan-500/40 hover:border-cyan-400'
  }
];

function PetVectorIcon({ petId, className = "w-10 h-10" }: { petId: string; className?: string }) {
  if (petId === 'foxy') {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16L22 34L14 36L12 16Z" fill="#F97316" stroke="#EA580C" strokeWidth="2" strokeLinejoin="round" />
        <path d="M52 16L42 34L50 36L52 16Z" fill="#F97316" stroke="#EA580C" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 20L22 30L17 31L16 20Z" fill="#FED7AA" />
        <path d="M48 20L42 30L47 31L48 20Z" fill="#FED7AA" />
        <polygon points="32,22 48,34 32,56 16,34" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />
        <polygon points="32,32 46,36 32,54 18,36" fill="#FDBA74" />
        <polygon points="32,40 40,38 32,52 24,38" fill="#FFF7ED" />
        <polygon points="29,50 35,50 32,55" fill="#1C1917" />
        <ellipse cx="25" cy="36" rx="3.5" ry="2" fill="#0F172A" transform="rotate(-15 25 36)" />
        <ellipse cx="39" cy="36" rx="3.5" ry="2" fill="#0F172A" transform="rotate(15 39 36)" />
        <circle cx="26" cy="35.5" r="0.8" fill="#FFFFFF" />
        <circle cx="38" cy="35.5" r="0.8" fill="#FFFFFF" />
      </svg>
    );
  }
  if (petId === 'tiger') {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="18" r="9" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
        <circle cx="49" cy="18" r="9" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
        <circle cx="15" cy="18" r="5" fill="#FCA5A5" />
        <circle cx="49" cy="18" r="5" fill="#FCA5A5" />
        <rect x="14" y="20" width="36" height="34" rx="14" fill="#EA580C" stroke="#9A3412" strokeWidth="2" />
        <path d="M32 20L28 28H36L32 20Z" fill="#450A0A" />
        <path d="M16 32L24 30L16 34Z" fill="#450A0A" />
        <path d="M48 32L40 30L48 34Z" fill="#450A0A" />
        <ellipse cx="24" cy="34" rx="4" ry="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
        <ellipse cx="40" cy="34" rx="4" ry="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
        <ellipse cx="24" cy="34" rx="1.5" ry="2.5" fill="#18181B" />
        <ellipse cx="40" cy="34" rx="1.5" ry="2.5" fill="#18181B" />
        <path d="M22 42C22 40 28 41 32 43C36 41 42 40 42 42C42 48 36 51 32 51C28 51 22 48 22 42Z" fill="#FEF2F2" />
        <polygon points="30,44 34,44 32,47" fill="#DC2626" />
        <path d="M26 47L27 50L29 47" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M38 47L37 50L35 47" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  // rhino
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 18L13 26L21 24Z" fill="#475569" stroke="#334155" strokeWidth="2" />
      <path d="M48 18L51 26L43 24Z" fill="#475569" stroke="#334155" strokeWidth="2" />
      <rect x="15" y="20" width="34" height="34" rx="12" fill="#64748B" stroke="#334155" strokeWidth="2" />
      <path d="M32 14L37 32L32 34L27 32L32 14Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M32 28L35 38L32 40L29 38L32 28Z" fill="#F1F5F9" />
      <ellipse cx="22" cy="32" rx="3.5" ry="2.5" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
      <ellipse cx="42" cy="32" rx="3.5" ry="2.5" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
      <circle cx="23" cy="31.5" r="0.8" fill="#FFFFFF" />
      <circle cx="41" cy="31.5" r="0.8" fill="#FFFFFF" />
      <path d="M20 44C24 49 40 49 44 44" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="27" cy="45" r="1.5" fill="#334155" />
      <circle cx="37" cy="45" r="1.5" fill="#334155" />
    </svg>
  );
}

export default function CmPetTimer() {
  const [activePetId, setActivePetId] = useState<string>('foxy');
  const [petLevels, setPetLevels] = useState<Record<string, number>>({
    foxy: 45,
    tiger: 30,
    rhino: 20
  });
  const [timeLeft, setTimeLeft] = useState<number | null>(7200); // 2 hours default active

  const activePet = PETS.find(p => p.id === activePetId) || PETS[0];
  const activeLevel = petLevels[activePetId] || 1;

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const startTimer = (hours: number) => {
    setTimeLeft(Math.floor(hours * 3600));
  };

  const setLevel = (newVal: number) => {
    const clamped = Math.max(1, Math.min(100, newVal));
    setPetLevels(prev => ({ ...prev, [activePetId]: clamped }));
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const maxDuration = 14400; // 4 hours in seconds
  const currentRatio = timeLeft && timeLeft > 0 ? Math.min(100, (timeLeft / maxDuration) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-1.5">
              <PetVectorIcon petId={activePet.id} className="w-full h-full drop-shadow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Coin Master Companion Matrix
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-zinc-400">Tactical Treat Sync</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Pet Buff & Food Duration Timer</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calculate raid & attack multipliers based on exact pet level, and track remaining active food stamina.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-zinc-950/80 px-4 py-3 rounded-xl border border-zinc-800">
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Active Status</div>
              <div className={`text-sm font-bold flex items-center gap-1.5 ${timeLeft && timeLeft > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                <span className={`w-2 h-2 rounded-full ${timeLeft && timeLeft > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                {timeLeft && timeLeft > 0 ? 'BUFF ACTIVE' : 'ASLEEP (FEED TREAT)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pet Selector & Level Config */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Select Companion</h3>
          
          <div className="grid grid-cols-3 gap-3">
            {PETS.map(pet => {
              const isSelected = activePetId === pet.id;
              const lvl = petLevels[pet.id] || 1;
              return (
                <button
                  key={pet.id}
                  onClick={() => setActivePetId(pet.id)}
                  className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                    isSelected
                      ? `bg-zinc-900 border-2 ${pet.borderAccent} shadow-lg shadow-black/50`
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center p-1 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
                    <PetVectorIcon petId={pet.id} className="w-full h-full" />
                  </div>
                  <div className="text-center w-full">
                    <div className="text-xs font-bold text-white tracking-tight">{pet.name}</div>
                    <div className="text-[10px] font-mono text-zinc-400">Lv. {lvl}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pet Stat Card */}
          <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono">
                  {activePet.title}
                </span>
                <h4 className="text-base font-bold text-white">{activePet.role}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400 block font-mono">Current Buff</span>
                <span className="text-sm font-black text-amber-400 font-mono">
                  {activePet.statFormula(activeLevel)}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {activePet.description}
            </p>

            {/* Level Slider */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/60">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-300 font-medium">Pet Upgrade Level:</span>
                <span className="text-amber-400 font-mono font-bold">Level {activeLevel} / 100</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={activeLevel}
                onChange={e => setLevel(Number(e.target.value))}
                className="w-full accent-amber-500 bg-zinc-950 h-2 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>Lv. 1 (Base)</span>
                <span>Lv. 50 (Mid-Tier)</span>
                <span>Lv. 100 (Max Cap)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timer & Controls */}
        <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className={`w-3 h-3 rounded-full ${timeLeft && timeLeft > 0 ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-500'}`} />
                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    {timeLeft && timeLeft > 0 ? `${activePet.name} is Active & Feeding` : `${activePet.name} is Sleeping`}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {timeLeft && timeLeft > 0 ? 'Boost applied to every turn' : 'No bonus applied to spins or raids'}
                  </span>
                </div>
              </div>

              <div className="text-3xl font-mono font-black text-white tracking-wider">
                {timeLeft !== null && timeLeft > 0 ? formatTime(timeLeft) : '00:00:00'}
              </div>
            </div>

            {/* Stamina Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-medium">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Cookie className="w-3.5 h-3.5 text-amber-500" />
                  Stamina Reservoir
                </span>
                <span className="text-amber-400">{Math.round(currentRatio)}% ({timeLeft && timeLeft > 0 ? Math.ceil(timeLeft / 60) : 0} mins)</span>
              </div>
              <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800 p-0.5">
                <div
                  className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentRatio}%` }}
                />
              </div>
            </div>

            {/* Treat Quick Feed Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Feed Treat Action</span>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => startTimer(4)}
                  className="px-4 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs rounded-xl transition-all shadow-md shadow-amber-950/20 cursor-pointer flex flex-col items-center"
                >
                  <span>Pet Treat</span>
                  <span className="text-[10px] font-normal opacity-90">Full 4 Hours</span>
                </button>
                <button
                  onClick={() => startTimer(1)}
                  className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-xl transition-all cursor-pointer flex flex-col items-center"
                >
                  <span>Quick Snack</span>
                  <span className="text-[10px] font-normal text-zinc-400">1 Hour</span>
                </button>
                <button
                  onClick={() => startTimer(0.25)}
                  className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-xl transition-all cursor-pointer flex flex-col items-center"
                >
                  <span>Daily Free</span>
                  <span className="text-[10px] font-normal text-zinc-400">15 Minutes</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-300/90 leading-relaxed">
              <strong>Strategy Tip:</strong> Never execute high bet raids (10x–100x spins) without Foxy actively fed. A single sleeping raid forfeits over 100,000,000+ potential coins at higher villages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
