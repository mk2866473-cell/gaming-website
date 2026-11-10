/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Swords, CheckCircle2, Crosshair, Trophy
} from 'lucide-react';

interface GradeTier {
  id: string;
  name: string;
  expReq: number;
  gripsReq: number;
  divisionDutyReq: number;
  raidWinsReq: number;
  specialReq: string;
}

const SHINIGAMI_GRADES: GradeTier[] = [
  { id: 'grade_5', name: 'Trainee (Grade 5)', expReq: 100, gripsReq: 0, divisionDutyReq: 0, raidWinsReq: 0, specialReq: 'Complete Academy Tutorial' },
  { id: 'grade_4', name: 'Junior (Grade 4)', expReq: 400, gripsReq: 0, divisionDutyReq: 5, raidWinsReq: 0, specialReq: 'Join a Division (1-13)' },
  { id: 'semi_3', name: 'Semi-Grade 3', expReq: 900, gripsReq: 2, divisionDutyReq: 10, raidWinsReq: 0, specialReq: 'Mission Board farming' },
  { id: 'grade_3', name: 'Grade 3', expReq: 1600, gripsReq: 5, divisionDutyReq: 15, raidWinsReq: 0, specialReq: 'Unlock Shikai Meditation' },
  { id: 'semi_2', name: 'Semi-Grade 2', expReq: 2500, gripsReq: 10, divisionDutyReq: 25, raidWinsReq: 0, specialReq: 'Shikai Meditation Stage 1' },
  { id: 'grade_2', name: 'Grade 2', expReq: 3800, gripsReq: 15, divisionDutyReq: 35, raidWinsReq: 1, specialReq: 'Defeat Shikai Boss' },
  { id: 'semi_1', name: 'Semi-Grade 1', expReq: 5500, gripsReq: 25, divisionDutyReq: 50, raidWinsReq: 3, specialReq: 'Karakura Town Raids' },
  { id: 'grade_1', name: 'Grade 1', expReq: 7500, gripsReq: 40, divisionDutyReq: 70, raidWinsReq: 5, specialReq: 'Max Shikai skill tree' },
  { id: 'elite', name: 'Elite Grade', expReq: 11000, gripsReq: 65, divisionDutyReq: 100, raidWinsReq: 10, specialReq: 'Bankai Progression Stage 1 & 2' },
  { id: 'special', name: 'Special Grade', expReq: 16000, gripsReq: 120, divisionDutyReq: 150, raidWinsReq: 25, specialReq: 'Bankai Defeated & Clan War Wins' },
];

export default function TypeSoulGradeCalculator() {
  const [race, setRace] = useState<'shinigami' | 'arrancar' | 'quincy'>('shinigami');
  const [currentGradeIdx, setCurrentGradeIdx] = useState<number>(3); // Grade 3
  const [targetGradeIdx, setTargetGradeIdx] = useState<number>(8); // Elite Grade
  const [currentMissions, setCurrentMissions] = useState<number>(12);
  const [currentGrips, setCurrentGrips] = useState<number>(8);
  const [currentDivisionDuty, setCurrentDivisionDuty] = useState<number>(14);
  const [currentRaidWins, setCurrentRaidWins] = useState<number>(1);
  const [shikaiUnlocked, setShikaiUnlocked] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const targetGrade = SHINIGAMI_GRADES[targetGradeIdx] || SHINIGAMI_GRADES[8];

  const analysis = useMemo(() => {
    const missingGrips = Math.max(0, targetGrade.gripsReq - currentGrips);
    const missingDuty = Math.max(0, targetGrade.divisionDutyReq - currentDivisionDuty);
    const missingRaids = Math.max(0, targetGrade.raidWinsReq - currentRaidWins);

    // Approximate total missions needed: 1 mission = ~80 EXP
    const expNeeded = targetGrade.expReq;
    const missionsNeeded = Math.ceil(expNeeded / 80);
    const missingMissions = Math.max(0, missionsNeeded - currentMissions);

    // Progression percentage
    const totalReqPoints = targetGrade.gripsReq + targetGrade.divisionDutyReq + targetGrade.raidWinsReq + missionsNeeded;
    const completedPoints = Math.min(targetGrade.gripsReq, currentGrips) +
      Math.min(targetGrade.divisionDutyReq, currentDivisionDuty) +
      Math.min(targetGrade.raidWinsReq, currentRaidWins) +
      Math.min(missionsNeeded, currentMissions);

    const progressPct = totalReqPoints > 0 ? Math.min(100, Math.round((completedPoints / totalReqPoints) * 100)) : 100;

    return {
      missingGrips,
      missingDuty,
      missingRaids,
      missingMissions,
      progressPct
    };
  }, [targetGrade, currentGrips, currentDivisionDuty, currentRaidWins, currentMissions]);

  const handleCopy = () => {
    const text = `Roblox Type Soul Grade Progression:
Race: ${race.toUpperCase()}
Current Rank: ${SHINIGAMI_GRADES[currentGradeIdx].name} ➔ Target: ${targetGrade.name}
Overall Progress: ${analysis.progressPct}%
Remaining Requirements:
• Player Grips Needed: ${analysis.missingGrips} Grips
• Division Duties: ${analysis.missingDuty} Quests
• Raid Wins: ${analysis.missingRaids} Wins
• Missions: ~${analysis.missingMissions} Mission Board runs
Special Requirement: ${targetGrade.specialReq}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 shadow-xl text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950 text-red-300 border border-red-800">
              ELITE GRADE ROADMAP
            </span>
            <span className="text-xs text-slate-400">Shinigami, Arrancar & Quincy Progression</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Grade Progression Requirement Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Calculate exact Mission EXP, Player Grips, Division Duties, and Raid requirements needed to reach Elite Grade.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Progress'}
        </button>
      </div>

      {/* Race Selector */}
      <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800 w-fit">
        {[
          { id: 'shinigami', label: 'Soul Reaper (Shinigami)' },
          { id: 'arrancar', label: 'Arrancar (Hollow)' },
          { id: 'quincy', label: 'Quincy (Sternritter)' }
        ].map(r => (
          <button
            key={r.id}
            onClick={() => setRace(r.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              race === r.id
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Grade Milestone Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Current Grade Rank
          </label>
          <select
            value={currentGradeIdx}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setCurrentGradeIdx(val);
              if (targetGradeIdx <= val) setTargetGradeIdx(Math.min(SHINIGAMI_GRADES.length - 1, val + 1));
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-bold"
          >
            {SHINIGAMI_GRADES.map((g, idx) => (
              <option key={g.id} value={idx}>{g.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-red-400 block">
            Target Grade Rank
          </label>
          <select
            value={targetGradeIdx}
            onChange={(e) => setTargetGradeIdx(Math.max(currentGradeIdx + 1, parseInt(e.target.value)))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-red-300 font-bold"
          >
            {SHINIGAMI_GRADES.map((g, idx) => (
              <option key={g.id} value={idx} disabled={idx <= currentGradeIdx}>
                {g.name} (Max {g.expReq} EXP)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Trackers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Player Grips:</span>
            <span className="font-bold text-red-400">{currentGrips} / {targetGrade.gripsReq}</span>
          </div>
          <input
            type="number"
            min={0}
            value={currentGrips}
            onChange={(e) => setCurrentGrips(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
          />
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Division Duties:</span>
            <span className="font-bold text-amber-400">{currentDivisionDuty} / {targetGrade.divisionDutyReq}</span>
          </div>
          <input
            type="number"
            min={0}
            value={currentDivisionDuty}
            onChange={(e) => setCurrentDivisionDuty(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
          />
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Raid Wins:</span>
            <span className="font-bold text-cyan-400">{currentRaidWins} / {targetGrade.raidWinsReq}</span>
          </div>
          <input
            type="number"
            min={0}
            value={currentRaidWins}
            onChange={(e) => setCurrentRaidWins(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
          />
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Mission Runs:</span>
            <span className="font-bold text-emerald-400">{currentMissions} Completed</span>
          </div>
          <input
            type="number"
            min={0}
            value={currentMissions}
            onChange={(e) => setCurrentMissions(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
          />
        </div>
      </div>

      {/* Progression Bar & Action Checklist */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Progression to {targetGrade.name}
          </span>
          <span className="text-lg font-black text-red-400">{analysis.progressPct}% Complete</span>
        </div>

        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${analysis.progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
            <span className="font-bold text-white block">Remaining Requirements:</span>
            <div className="text-slate-300 space-y-1">
              <div>• <strong>{analysis.missingGrips}</strong> more Player Grips in Hueco Mundo / Karakura</div>
              <div>• <strong>{analysis.missingDuty}</strong> more Division Duty quest points</div>
              <div>• <strong>{analysis.missingRaids}</strong> more Faction Raid wins</div>
              <div>• <strong>~{analysis.missingMissions}</strong> more Mission Board completions</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
            <span className="font-bold text-amber-300 block">Milestone Prerequisite:</span>
            <p className="text-slate-300 leading-relaxed">
              {targetGrade.specialReq}
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Note: Elite Grade unlocks full 60 stat allocation points for hybrid builds!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
