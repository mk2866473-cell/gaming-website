/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Building2, Sparkles, Diamond, Clock, Award, CheckCircle2, 
  RotateCcw, Copy, Check, ShieldCheck, Flame, Info, ChevronRight 
} from 'lucide-react';
import { formatGems } from '../../data/ps99Data';

interface PetSlotInput {
  id: string;
  petType: 'huge' | 'exclusive' | 'best_normal';
  level: number;
  shiny: boolean;
  golden: boolean;
  rainbow: boolean;
}

export default function Ps99ExclusiveDaycareCalculator() {
  const [slots, setSlots] = useState<PetSlotInput[]>([
    { id: '1', petType: 'huge', level: 99, shiny: false, golden: true, rainbow: false },
    { id: '2', petType: 'exclusive', level: 85, shiny: true, golden: false, rainbow: false },
    { id: '3', petType: 'exclusive', level: 50, shiny: false, golden: false, rainbow: false },
    { id: '4', petType: 'best_normal', level: 99, shiny: false, golden: false, rainbow: false },
    { id: '5', petType: 'best_normal', level: 99, shiny: false, golden: false, rainbow: false }
  ]);
  const [hoursInDaycare, setHoursInDaycare] = useState<number>(24);
  const [copied, setCopied] = useState(false);

  const addSlot = () => {
    if (slots.length >= 10) return;
    setSlots(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        petType: 'exclusive',
        level: 75,
        shiny: false,
        golden: false,
        rainbow: false
      }
    ]);
  };

  const removeSlot = (id: string) => {
    if (slots.length <= 1) return;
    setSlots(prev => prev.filter(s => s.id !== id));
  };

  const updateSlot = (id: string, updates: Partial<PetSlotInput>) => {
    setSlots(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const earnings = useMemo(() => {
    let totalDiamonds = 0;
    let totalDiamondsPerHour = 0;
    let totalDiamondsPerDay = 0;
    const details = slots.map(slot => {
      let baseGemsPerHour = 5000;
      if (slot.petType === 'huge') baseGemsPerHour = 50000;
      else if (slot.petType === 'exclusive') baseGemsPerHour = 15000;
      else baseGemsPerHour = 2500;

      const levelMult = 1 + (slot.level / 99) * 0.5;

      let variantMult = 1.0;
      if (slot.shiny) variantMult += 0.5;
      if (slot.golden) variantMult += 0.25;
      if (slot.rainbow) variantMult += 0.75;

      const hourlyYield = Math.round(baseGemsPerHour * levelMult * variantMult);
      const slotTotal = hourlyYield * hoursInDaycare;

      totalDiamondsPerHour += hourlyYield;
      totalDiamondsPerDay += hourlyYield * 24;
      totalDiamonds += slotTotal;

      return {
        ...slot,
        hourlyYield,
        slotTotal
      };
    });

    return {
      totalDiamonds,
      totalDiamondsPerHour,
      totalDiamondsPerDay,
      details
    };
  }, [slots, hoursInDaycare]);

  const handleCopy = () => {
    const text = [
      `🏰 PS99 EXCLUSIVE DAYCARE EARNINGS MANIFEST`,
      `• Total Pets Enrolled: ${slots.length}`,
      `• Duration: ${hoursInDaycare} Hours`,
      `• Estimated Diamond Payout: 💎 ${formatGems(earnings.totalDiamonds)} Gems`,
      `• Hourly Generation Rate: 💎 ${formatGems(earnings.totalDiamondsPerHour)} / hr`
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Header Card */}
      <div className="relative bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border-2 border-sky-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-sky-500/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-sky-950 border border-sky-500/50 rounded-xl text-sky-400 shadow-lg">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded border border-sky-500/30">
                PET SIMULATOR 99 UTILITY
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
                Exclusive Daycare Earnings Calculator
              </h1>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 transition font-mono flex items-center gap-1.5 shadow-lg shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Manifest Copied!' : 'Copy Daycare Manifest'}
          </button>
        </div>

        {/* Live Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-[#090d16] border border-sky-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Projected Earnings</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                💎 {formatGems(earnings.totalDiamonds)}
              </span>
            </div>
            <Diamond className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>

          <div className="bg-[#090d16] border border-sky-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Hourly Rate</span>
              <span className="text-xl sm:text-2xl font-black text-sky-400 font-mono">
                💎 {formatGems(earnings.totalDiamondsPerHour)}/hr
              </span>
            </div>
            <Clock className="w-6 h-6 text-sky-400" />
          </div>

          <div className="bg-[#090d16] border border-sky-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">24-Hour Full Output</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                💎 {formatGems(earnings.totalDiamondsPerDay)}
              </span>
            </div>
            <Award className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Main Interactive Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Slots Configuration (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Enrolled Daycare Pets ({slots.length}/10)</h2>
              <p className="text-xs text-slate-400">Configure pet types, levels, and variants for exact gem returns.</p>
            </div>
            <button
              onClick={addSlot}
              disabled={slots.length >= 10}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition"
            >
              + Add Pet Slot
            </button>
          </div>

          <div className="space-y-4">
            {slots.map((slot, index) => (
              <div key={slot.id} className="bg-[#090d16] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400">Pet Slot #{index + 1}</span>
                  <button
                    onClick={() => removeSlot(slot.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 transition"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">Pet Tier</label>
                    <select
                      value={slot.petType}
                      onChange={e => updateSlot(slot.id, { petType: e.target.value as any })}
                      className="w-full bg-[#0e1422] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    >
                      <option value="huge">Huge Pet (50k/hr base)</option>
                      <option value="exclusive">Exclusive Pet (15k/hr base)</option>
                      <option value="best_normal">Best Normal Pet (2.5k/hr)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">Pet Level ({slot.level})</label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={slot.level}
                      onChange={e => updateSlot(slot.id, { level: parseInt(e.target.value) || 1 })}
                      className="w-full bg-[#0e1422] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="flex items-end gap-2 pt-2 sm:pt-0">
                    <label className="flex items-center gap-1.5 text-xs text-amber-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={slot.golden}
                        onChange={e => updateSlot(slot.id, { golden: e.target.checked })}
                        className="rounded bg-slate-900 border-slate-700 text-amber-500"
                      />
                      Gold
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-cyan-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={slot.rainbow}
                        onChange={e => updateSlot(slot.id, { rainbow: e.target.checked })}
                        className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                      />
                      Rainbow
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-fuchsia-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={slot.shiny}
                        onChange={e => updateSlot(slot.id, { shiny: e.target.checked })}
                        className="rounded bg-slate-900 border-slate-700 text-fuchsia-500"
                      />
                      Shiny
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                  <span>Slot Payout:</span>
                  <span className="text-amber-400 font-bold">💎 {formatGems(earnings.details[index]?.slotTotal || 0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Duration & Payout Analysis (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              Daycare Settings & Duration
            </h3>

            <div className="space-y-3">
              <label className="text-xs text-slate-300 block font-medium">
                Daycare Duration: <span className="text-sky-400 font-bold font-mono">{hoursInDaycare} Hours</span>
              </label>
              <input
                type="range"
                min={1}
                max={168}
                value={hoursInDaycare}
                onChange={e => setHoursInDaycare(parseInt(e.target.value))}
                className="w-full accent-sky-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 Hour</span>
                <span>24 Hours (1 Day)</span>
                <span>168 Hours (1 Week)</span>
              </div>
            </div>

            <div className="bg-[#090d16] border border-slate-800 rounded-xl p-4 space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Total Pets Enrolled:</span>
                <span className="font-mono font-bold text-white">{slots.length} Pets</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hourly Gem Output:</span>
                <span className="font-mono font-bold text-sky-400">💎 {formatGems(earnings.totalDiamondsPerHour)}/hr</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Daily Gem Output:</span>
                <span className="font-mono font-bold text-emerald-400">💎 {formatGems(earnings.totalDiamondsPerDay)}/day</span>
              </div>
            </div>

            <div className="bg-sky-950/40 border border-sky-500/30 rounded-xl p-4 space-y-2 text-xs text-sky-200">
              <div className="font-bold flex items-center gap-1.5 text-sky-300">
                <Sparkles className="w-4 h-4 text-amber-400" /> Daycare Pro Tips
              </div>
              <p className="leading-relaxed text-slate-300 text-[11px]">
                Enrolling Level 99 Huge pets yields up to 10× more diamonds than standard normal pets. Always fill your exclusive daycare slots before logging off for overnight AFK farming!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
