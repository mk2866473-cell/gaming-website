/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Shield, CheckCircle2, RefreshCw, Trash2, Sliders, Info, Zap, Flame, Award } from 'lucide-react';

interface SubStat {
  type: string;
  value: number;
  quality: 'max' | 'high' | 'mid' | 'low';
}

const GEAR_SLOTS = [
  { id: 'weapon', label: 'Weapon', defaultMain: 'Physical/Magic ATK +2,450' },
  { id: 'armor', label: 'Chest Armor', defaultMain: 'Physical/Magic DEF +1,820' },
  { id: 'helm', label: 'Helmet', defaultMain: 'HP +7,800' },
  { id: 'boots', label: 'Boots', defaultMain: 'Speed +18' },
  { id: 'ring', label: 'Ring', defaultMain: 'Crit Damage +35.0%' },
  { id: 'necklace', label: 'Necklace', defaultMain: 'Crit Rate +18.0%' }
];

const GEAR_GRADES = [
  { id: 'mythic', name: 'Mythic (Radiant)', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/20', baseGold: 85000 },
  { id: 'legendary', name: 'Legendary', color: 'text-red-400', border: 'border-red-500/40', bg: 'bg-red-950/20', baseGold: 45000 },
  { id: 'epic', name: 'Epic', color: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-950/20', baseGold: 18000 },
  { id: 'rare', name: 'Rare', color: 'text-blue-400', border: 'border-blue-500/40', bg: 'bg-blue-950/20', baseGold: 5000 }
];

const SET_BONUSES = [
  { id: 'dragon', name: 'Dragon Slayer (Crit Rate +15%, Crit DMG +30%)' },
  { id: 'radiant', name: 'Radiant Knight (All Damage Boost +20%)' },
  { id: 'swiftness', name: 'Swiftness (Turn Speed +24, Action Cooldown -10%)' },
  { id: 'guardian', name: 'Guardian Aegis (Damage Taken -18%, HP Shield)' },
  { id: 'vampiric', name: 'Bloodthirst (Lifesteal +20%, ATK +12%)' }
];

const SUBSTAT_OPTIONS = [
  { id: 'crit_rate', name: 'Crit Rate %', min: 2.5, max: 6.0, unit: '%' },
  { id: 'crit_dmg', name: 'Crit Damage %', min: 4.0, max: 10.0, unit: '%' },
  { id: 'atk_pct', name: 'Attack %', min: 3.0, max: 8.0, unit: '%' },
  { id: 'speed', name: 'Speed', min: 2, max: 5, unit: '' },
  { id: 'effect_hit', name: 'Effect Hit %', min: 3.5, max: 8.0, unit: '%' },
  { id: 'effect_res', name: 'Effect Resist %', min: 3.5, max: 8.0, unit: '%' },
  { id: 'hp_pct', name: 'HP %', min: 3.0, max: 8.0, unit: '%' },
  { id: 'def_pct', name: 'Defense %', min: 3.0, max: 8.0, unit: '%' }
];

export default function SkGearManager() {
  const [selectedSlot, setSelectedSlot] = useState<string>('weapon');
  const [gradeId, setGradeId] = useState<string>('mythic');
  const [setId, setSetId] = useState<string>('dragon');
  const [refinementLevel, setRefinementLevel] = useState<number>(10);
  
  // 4 substats
  const [substats, setSubstats] = useState<{ type: string; value: number }[]>([
    { type: 'crit_rate', value: 5.5 },
    { type: 'crit_dmg', value: 9.2 },
    { type: 'atk_pct', value: 7.0 },
    { type: 'speed', value: 4 }
  ]);

  const updateSubstat = (index: number, field: 'type' | 'value', val: any) => {
    setSubstats(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const valuation = useMemo(() => {
    let score = 0;
    const desirableStats = ['crit_rate', 'crit_dmg', 'atk_pct', 'speed'];
    let desirableCount = 0;

    substats.forEach(s => {
      if (desirableStats.includes(s.type)) {
        desirableCount++;
        if (s.type === 'crit_rate') score += (s.value / 6.0) * 25;
        if (s.type === 'crit_dmg') score += (s.value / 10.0) * 25;
        if (s.type === 'atk_pct') score += (s.value / 8.0) * 25;
        if (s.type === 'speed') score += (s.value / 5) * 25;
      } else {
        score += 10;
      }
    });

    // Grade modifier
    if (gradeId === 'mythic') score *= 1.25;
    else if (gradeId === 'legendary') score *= 1.0;
    else if (gradeId === 'epic') score *= 0.75;
    else score *= 0.5;

    // Sell gold calculation
    const currentGrade = GEAR_GRADES.find(g => g.id === gradeId) || GEAR_GRADES[0];
    const sellGold = Math.floor(currentGrade.baseGold * (1 + refinementLevel * 0.15));

    let decision: 'KEEP_GOD' | 'KEEP_SOLID' | 'REROLL' | 'SELL';
    let verdictTitle: string;
    let verdictColor: string;
    let verdictIcon = CheckCircle2;
    let reason: string;

    if (gradeId === 'rare') {
      decision = 'SELL';
      verdictTitle = 'DISMANTLE / SELL FOR GOLD';
      verdictColor = 'text-rose-400 border-rose-500/40 bg-rose-950/20';
      verdictIcon = Trash2;
      reason = 'Rare gear has low ceiling stats and consumes valuable refinement stones. Convert to gold immediately.';
    } else if (score >= 90) {
      decision = 'KEEP_GOD';
      verdictTitle = 'LOCK GEAR: GOD-ROLL PIECE';
      verdictColor = 'text-amber-400 border-amber-500/40 bg-amber-950/20';
      verdictIcon = Award;
      reason = 'Outstanding offensive synergy with high roll percentiles. Priority for +15 Transcendence refinement!';
    } else if (score >= 60 || desirableCount >= 2) {
      decision = 'KEEP_SOLID';
      verdictTitle = 'KEEP: VIABLE PROGRESSION GEAR';
      verdictColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20';
      verdictIcon = CheckCircle2;
      reason = 'Strong base stats suitable for secondary arena teams or guild raid DPS units.';
    } else if (gradeId === 'mythic' || gradeId === 'legendary') {
      decision = 'REROLL';
      verdictTitle = 'RE-ROLL SUBSTATS VIA REFORGING';
      verdictColor = 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20';
      verdictIcon = RefreshCw;
      reason = 'Base equipment tier is high, but rolled low-tier substats. Use Reforge Stones before dismantling.';
    } else {
      decision = 'SELL';
      verdictTitle = 'SELL GEAR';
      verdictColor = 'text-rose-400 border-rose-500/40 bg-rose-950/20';
      verdictIcon = Trash2;
      reason = 'Poor substat synergy with insufficient damage or survivability utility.';
    }

    return {
      score: Math.min(100, Math.round(score)),
      desirableCount,
      sellGold,
      decision,
      verdictTitle,
      verdictColor,
      verdictIcon,
      reason
    };
  }, [gradeId, refinementLevel, substats]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-zinc-900 border border-blue-500/30 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Seven Knights Re:BIRTH Equipment Matrix
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-zinc-400">Reforge & Valuation v2.4</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Gear Sell / Keep Valuation Engine</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Analyze equipment slot, refinement grade, set bonus, and substat roll percentiles to prevent wasting gold or reforge stones.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 px-4 py-3 rounded-xl border border-zinc-800">
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Gear Quality Score</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {valuation.score} / 100
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Slot Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {GEAR_SLOTS.map(slot => (
          <button
            key={slot.id}
            onClick={() => setSelectedSlot(slot.id)}
            className={`px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedSlot === slot.id
                ? 'bg-blue-500/20 border-blue-400 text-white shadow-md shadow-blue-950/20'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="text-xs font-bold">{slot.label}</div>
            <div className="text-[10px] text-zinc-500 truncate mt-0.5">{slot.defaultMain}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Specifications */}
        <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Equipment Grade
              </label>
              <select
                value={gradeId}
                onChange={e => setGradeId(e.target.value)}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white text-xs font-medium cursor-pointer"
              >
                {GEAR_GRADES.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Set Affinity
              </label>
              <select
                value={setId}
                onChange={e => setSetId(e.target.value)}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white text-xs font-medium cursor-pointer"
              >
                {SET_BONUSES.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-zinc-400 font-bold uppercase tracking-wider">Refinement Level (+0 to +15)</span>
              <span className="text-blue-400 font-mono font-bold">+{refinementLevel}</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={refinementLevel}
              onChange={e => setRefinementLevel(Number(e.target.value))}
              className="w-full accent-blue-500 bg-zinc-950 h-2 rounded cursor-pointer"
            />
          </div>

          {/* Substats Matrix */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Substats Rolls (1 to 4)</span>
              <span className="text-[10px] font-mono text-zinc-500">Evaluates Attack / Speed / Crit Weight</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {substats.map((sub, idx) => (
                <div key={idx} className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-zinc-400">Slot #{idx + 1}</span>
                    <select
                      value={sub.type}
                      onChange={e => updateSubstat(idx, 'type', e.target.value)}
                      className="bg-zinc-900 border border-zinc-700/60 rounded px-2 py-0.5 text-xs text-zinc-200"
                    >
                      {SUBSTAT_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={sub.value}
                      onChange={e => updateSubstat(idx, 'value', Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Decision Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className={`p-6 rounded-xl border flex flex-col gap-3 ${valuation.verdictColor}`}>
            <div className="flex items-center gap-3">
              <valuation.verdictIcon className="w-8 h-8 shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80 block">
                  Recommended Action
                </span>
                <h3 className="text-lg font-black tracking-tight">{valuation.verdictTitle}</h3>
              </div>
            </div>
            <p className="text-xs leading-relaxed opacity-90 mt-1">
              {valuation.reason}
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Valuation Breakdown</h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Key Offensive Substats:</span>
                <span className="font-mono text-white font-bold">{valuation.desirableCount} / 4 stats</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Refinement Stage:</span>
                <span className="font-mono text-blue-400 font-bold">+{refinementLevel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Estimated Dismantle Gold:</span>
                <span className="font-mono text-amber-400 font-bold">+{valuation.sellGold.toLocaleString()} Gold</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
              <strong>Tip:</strong> In Seven Knights Re:BIRTH, high Speed & Crit Rate on Boots and Necklaces dictate first-strike advantage in Arena Challenger tiers. Never dismantle Speed 4+ items regardless of gear rarity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
