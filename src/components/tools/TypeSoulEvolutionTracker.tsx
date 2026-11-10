/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Swords, CheckCircle2, Circle, Flame, Target
} from 'lucide-react';

interface StageRequirement {
  id: string;
  title: string;
  desc: string;
  total: number;
}

interface EvolutionPath {
  id: string;
  name: string;
  race: string;
  stages: {
    stageNumber: number;
    title: string;
    description: string;
    bossTips?: string;
    requirements: StageRequirement[];
  }[];
}

const EVOLUTION_PATHS: EvolutionPath[] = [
  {
    id: 'bankai',
    name: 'Bankai Evolution',
    race: 'Soul Reaper (Shinigami)',
    stages: [
      {
        stageNumber: 1,
        title: 'Stage 1: Hollow & World Boss Trial',
        description: 'Eliminate overworld hollows or world bosses in Hueco Mundo.',
        requirements: [
          { id: 'bawabawa', title: 'Defeat Bawabawa / Jawabawa (or 80 Hollows)', desc: 'Kill 7 Bawabawa/Jawabawa or 80 NPC Hollows', total: 7 },
          { id: 'division', title: 'Division Duties / Quests', desc: 'Complete 50 Division Duties', total: 50 },
        ]
      },
      {
        stageNumber: 2,
        title: 'Stage 2: Grips & Raid Domination',
        description: 'Complete PvP requirements without dying or losing progression.',
        requirements: [
          { id: 'grips', title: 'Player Grips (Karakura / Hueco)', desc: 'Grip 26 enemy race players', total: 26 },
          { id: 'raids', title: 'Faction Raid Wins', desc: 'Win 15 Raids in Karakura or Soul Society', total: 15 },
          { id: 'parry', title: 'Hollow Parry Mini-game', desc: 'Successfully parry all hits in sequence', total: 1 },
        ]
      },
      {
        stageNumber: 3,
        title: 'Stage 3: Bankai Spirit Boss Fight',
        description: 'Summon and defeat your inner Zanpakuto Spirit in the inner world.',
        bossTips: 'Cheese Strategy: Equip Kendo Split Gate or Hakuda Brutal Stomp. Keep your back against the pillar so the AI cannot flash-step behind you. Guard-break the spirit on recovery!',
        requirements: [
          { id: 'boss_fight', title: 'Defeat Inner Spirit Boss', desc: 'Overcome your Zanpakuto spirit in 1v1 combat', total: 1 },
        ]
      }
    ]
  },
  {
    id: 'resurreccion',
    name: 'Resurrección Evolution',
    race: 'Arrancar (Hollow)',
    stages: [
      {
        stageNumber: 1,
        title: 'Stage 1: Cave Obelisks & Parkour',
        description: 'Collect all ancient Hollow tablets hidden across Hueco Mundo caves.',
        requirements: [
          { id: 'obelisks', title: 'Hueco Mundo Obelisk Tablets', desc: 'Interact with all 3 hidden obelisks', total: 3 },
          { id: 'hollow_kills', title: 'Vasto Lorde / Adjuchas Kills', desc: 'Defeat 40 hostile Arrancars/Hollows', total: 40 },
        ]
      },
      {
        stageNumber: 2,
        title: 'Stage 2: Blood Grips in Karakura Town',
        description: 'Hunt down Soul Reapers and Quincies in the living world.',
        requirements: [
          { id: 'arrancar_grips', title: 'Player Grips', desc: 'Grip 26 enemies with active Hollow mask', total: 26 },
          { id: 'arrancar_raids', title: 'Raid Victories', desc: 'Win 15 Faction Raids for Hueco Mundo', total: 15 },
        ]
      },
      {
        stageNumber: 3,
        title: 'Stage 3: Inner Hollow Mirror Trial',
        description: 'Defeat your Resurrección incarnation in the spiritual labyrinth.',
        bossTips: 'Cheese Strategy: Bait out their Cero burst with a flash step, then punish with an unguardable combo string.',
        requirements: [
          { id: 'res_boss', title: 'Defeat Resurrección Spirit', desc: 'Win the 1v1 trial to unlock Resurrección', total: 1 },
        ]
      }
    ]
  },
  {
    id: 'voltstanding',
    name: 'Voltstanding Evolution',
    race: 'Quincy',
    stages: [
      {
        stageNumber: 1,
        title: 'Stage 1: Target Marks & Gliding',
        description: 'Complete the aerial ring course in Wandenreich.',
        requirements: [
          { id: 'gliding_rings', title: 'Gliding Course Target Rings', desc: 'Fly through 30 energy rings in time', total: 30 },
          { id: 'quincy_kills', title: 'Hollow Hunt Missions', desc: 'Execute 50 Hollow purification quests', total: 50 },
        ]
      },
      {
        stageNumber: 2,
        title: 'Stage 2: Quincy Dominance',
        description: 'Secure grips and win raids for the Sternritter.',
        requirements: [
          { id: 'quincy_grips', title: 'Soul Reaper / Arrancar Grips', desc: 'Grip 26 enemy players', total: 26 },
          { id: 'quincy_raids', title: 'Faction Raid Victories', desc: 'Win 15 Raids', total: 15 },
        ]
      },
      {
        stageNumber: 3,
        title: 'Stage 3: Sternritter Archangel Trial',
        description: 'Defeat the heavenly Quincy spirit avatar.',
        bossTips: 'Cheese Strategy: Utilize Heilig Bogen rapid-fire arrows from max range to interrupt their Holy Arrow charge.',
        requirements: [
          { id: 'volt_boss', title: 'Defeat Quincy Spirit', desc: 'Unlock Voltstanding form', total: 1 },
        ]
      }
    ]
  }
];

export default function TypeSoulEvolutionTracker() {
  const [selectedPathId, setSelectedPathId] = useState<string>('bankai');
  const [progressState, setProgressState] = useState<Record<string, number>>({
    'bawabawa': 4,
    'division': 35,
    'grips': 12,
    'raids': 6,
    'parry': 0,
    'boss_fight': 0,
  });
  const [copied, setCopied] = useState<boolean>(false);

  const path = EVOLUTION_PATHS.find(p => p.id === selectedPathId) || EVOLUTION_PATHS[0];

  const updateProgress = (reqId: string, delta: number, max: number) => {
    setProgressState(prev => ({
      ...prev,
      [reqId]: Math.max(0, Math.min(max, (prev[reqId] || 0) + delta))
    }));
  };

  // Calculate overall percentage
  let totalTasks = 0;
  let completedTasks = 0;

  path.stages.forEach(stg => {
    stg.requirements.forEach(req => {
      totalTasks += req.total;
      completedTasks += Math.min(req.total, progressState[req.id] || 0);
    });
  });

  const overallPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCopy = () => {
    const text = `Roblox Type Soul Evolution Tracker:
Path: ${path.name} (${path.race})
Overall Completion: ${overallPct}%
Stages:
${path.stages.map(stg => `Stage ${stg.stageNumber}: ${stg.title}\n${stg.requirements.map(r => `• ${r.title}: ${progressState[r.id] || 0}/${r.total}`).join('\n')}`).join('\n\n')}`;
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
              STAGE 1, 2 & 3 TRACKER
            </span>
            <span className="text-xs text-slate-400">Boss Cheese Strategies Included</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Shikai / Bankai / Resurrección Evolution Tracker
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Track Grips, Raid wins, Bawabawa kills, and master the inner spirit boss trials for every race.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Evolution'}
        </button>
      </div>

      {/* Path Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {EVOLUTION_PATHS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPathId(p.id)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedPathId === p.id
                ? 'bg-red-950/80 border-red-500 shadow-md ring-1 ring-red-500'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-black text-sm text-white">{p.name}</div>
            <div className="text-[11px] text-red-300 mt-0.5">{p.race} · 3 Stages</div>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-400 uppercase tracking-wider">{path.name} Progress</span>
          <span className="font-black text-red-400 text-base">{overallPct}% Completed</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Stages List */}
      <div className="space-y-6">
        {path.stages.map((stage) => (
          <div key={stage.stageNumber} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-red-950 border border-red-700 text-red-300 flex items-center justify-center font-black text-xs">
                  {stage.stageNumber}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">{stage.title}</h3>
                  <p className="text-xs text-slate-400">{stage.description}</p>
                </div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stage.requirements.map(req => {
                const current = progressState[req.id] || 0;
                const isComplete = current >= req.total;

                return (
                  <div 
                    key={req.id}
                    className={`p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-3 ${
                      isComplete 
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        {isComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        <span>{req.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{req.desc}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => updateProgress(req.id, -1, req.total)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-xs font-black w-10 text-center text-white">
                        {current}/{req.total}
                      </span>
                      <button
                        onClick={() => updateProgress(req.id, 1, req.total)}
                        className="w-6 h-6 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Boss Cheese Tip */}
            {stage.bossTips && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" /> Spirit Boss Cheese Strategy
                </span>
                <p className="text-slate-300 leading-relaxed">{stage.bossTips}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
