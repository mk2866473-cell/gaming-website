/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Swords, Shield, Zap, Sparkles, Award, Target, CheckCircle2, ChevronRight } from 'lucide-react';

interface BossInfo {
  id: string;
  name: string;
  type: 'Dream Realm' | 'Primal Lord';
  weaknessFaction: 'Lightbearer' | 'Mauler' | 'Wilder' | 'Graveborn';
  bestArtifact: string;
  recommendedComps: {
    name: string;
    tier: string;
    heroes: string[];
    strategy: string;
    targetDps: string;
  }[];
}

const BOSS_DATABASE: BossInfo[] = [
  {
    id: 'snow_stalker',
    name: 'Snow Stalker',
    type: 'Dream Realm',
    weaknessFaction: 'Mauler',
    bestArtifact: 'Starshard Spell',
    recommendedComps: [
      {
        name: 'Odie True Damage Burst',
        tier: 'Top 1% Meta',
        heroes: ['Smokey & Meerky', 'Koko', 'Odie (Mythic+)', 'Marilee (Mythic+)', 'Reinier'],
        strategy: 'Reinier swaps Marilee/Odie behind boss. Koko damage reduction keeps team alive through Blizzard.',
        targetDps: '450M+ DMG'
      },
      {
        name: 'Wilder True Damage Standard',
        tier: 'Top 5% Budget',
        heroes: ['Lucius', 'Koko', 'Odie', 'Florabelle', 'Hewynn'],
        strategy: 'Sustained healing and shields to weather the frozen storm ticks.',
        targetDps: '280M+ DMG'
      }
    ]
  },
  {
    id: 'necrodrakon',
    name: 'Necrodrakon',
    type: 'Dream Realm',
    weaknessFaction: 'Wilder',
    bestArtifact: 'Evocation Spell',
    recommendedComps: [
      {
        name: 'Korin & Marilee Shield Stack',
        tier: 'Top 1% Meta',
        heroes: ['Korin', 'Marilee', 'Smokey & Meerky', 'Koko', 'Reinier'],
        strategy: 'Korin shields counter Necrodrakon execute beams. Reinier debuffs boss magic resist.',
        targetDps: '520M+ DMG'
      },
      {
        name: 'Thoran Frontline Shred',
        tier: 'Top 5% Standard',
        heroes: ['Thoran', 'Koko', 'Odie', 'Hewynn', 'Viperian'],
        strategy: 'Thoran absorbs initial dragon breath. Koko delays poison ticks.',
        targetDps: '310M+ DMG'
      }
    ]
  },
  {
    id: 'king_croaker',
    name: 'King Croaker',
    type: 'Dream Realm',
    weaknessFaction: 'Lightbearer',
    bestArtifact: 'Starshard Spell',
    recommendedComps: [
      {
        name: 'Odie Execute Blitz',
        tier: 'Top 1% Meta',
        heroes: ['Smokey & Meerky', 'Koko', 'Odie', 'Marilee', 'Shirley'],
        strategy: 'Odie Dart stacks break bubble shield before the instant swallow mechanic triggers.',
        targetDps: '490M+ DMG'
      }
    ]
  },
  {
    id: 'skyclops',
    name: 'Skyclops',
    type: 'Dream Realm',
    weaknessFaction: 'Graveborn',
    bestArtifact: 'Crescent Spell',
    recommendedComps: [
      {
        name: 'Summoner Meatshield Comp',
        tier: 'Top 1% Meta',
        heroes: ['Florabelle', 'Cecia', 'Smokey & Meerky', 'Koko', 'Odie'],
        strategy: 'Summoned minions draw laser beam focus away from core carries.',
        targetDps: '460M+ DMG'
      }
    ]
  },
  {
    id: 'lone_wolf',
    name: 'Lone Wolf (Primal Lord)',
    type: 'Primal Lord',
    weaknessFaction: 'Wilder',
    bestArtifact: 'Ironwall Spell',
    recommendedComps: [
      {
        name: 'Triple Support Hypercarry',
        tier: 'Primal Champion',
        heroes: ['Rowan', 'Smokey & Meerky', 'Koko', 'Marilee', 'Reinier'],
        strategy: 'Infinite energy cycling from Rowan allows Marilee to maintain 100% True Damage uptime.',
        targetDps: '680M+ DMG'
      }
    ]
  }
];

export default function AfkjBossTeamPlannerTool() {
  const [selectedBossId, setSelectedBossId] = useState<string>('snow_stalker');
  const [userResonanceLevel, setUserResonanceLevel] = useState<number>(240);
  const [hasMythicOdie, setHasMythicOdie] = useState<boolean>(true);

  const activeBoss = useMemo(() => {
    return BOSS_DATABASE.find(b => b.id === selectedBossId) || BOSS_DATABASE[0];
  }, [selectedBossId]);

  const projectedScore = useMemo(() => {
    const baseScoreMb = userResonanceLevel * 1.8;
    const odieMultiplier = hasMythicOdie ? 1.45 : 1.0;
    const finalScore = Math.round(baseScoreMb * odieMultiplier);

    return {
      finalScoreMb: finalScore,
      estimatedRank: finalScore > 400 ? 'Top 1% (Grandmaster)' : finalScore > 250 ? 'Top 5% (Master)' : 'Top 15% (Diamond)'
    };
  }, [userResonanceLevel, hasMythicOdie]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-zinc-900 border border-purple-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Dream Realm & Primal Lord Meta Engine
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Swords className="w-6 h-6 text-purple-400" />
              AFK Journey Daily Boss Team Planner
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Select today's Dream Realm boss to view top leaderboard comps, artifact pairings, and estimated damage ranks.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Projected Damage Score</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {projectedScore.finalScoreMb}M+ DMG
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">Est. Leaderboard Rank</div>
              <div className="text-sm font-bold text-purple-300">
                {projectedScore.estimatedRank}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Boss Selector Grid */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-400" />
          1. Select Daily Target Boss
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {BOSS_DATABASE.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBossId(b.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedBossId === b.id
                  ? 'bg-purple-950/40 border-purple-500/60 text-white shadow-lg shadow-purple-950/20'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <div className="text-xs font-semibold text-purple-300 mb-0.5">{b.type}</div>
              <div className="text-sm font-bold text-white line-clamp-1">{b.name}</div>
              <div className="text-[11px] text-zinc-400 mt-1">
                Weakness: <span className="text-amber-300 font-medium">{b.weaknessFaction}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Boss Analysis & Lineups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recommended Comps */}
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Top Leaderboard Comps for {activeBoss.name}
            </h3>
            <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Artifact: {activeBoss.bestArtifact}
            </span>
          </div>

          <div className="space-y-4">
            {activeBoss.recommendedComps.map((comp, idx) => (
              <div key={idx} className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-purple-300">{comp.name}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30">
                    {comp.tier} • {comp.targetDps}
                  </span>
                </div>

                {/* Hero Slot Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {comp.heroes.map((hero, hIdx) => (
                    <div
                      key={hIdx}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>{hero}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-zinc-300 border-t border-zinc-900 pt-2">
                  <strong className="text-purple-400">Tactical Strategy:</strong> {comp.strategy}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Resonance & Hero Modifiers */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Account Resonance Modifiers
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 flex justify-between mb-1">
                  <span>Resonance Level:</span>
                  <span className="font-mono text-amber-300 font-bold">Lv {userResonanceLevel}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="300"
                  value={userResonanceLevel}
                  onChange={e => setUserResonanceLevel(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <label className="flex items-center justify-between bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 cursor-pointer">
                <span className="text-xs text-zinc-200">Own Odie / Marilee at Mythic+ (+10 EX)?</span>
                <input
                  type="checkbox"
                  checked={hasMythicOdie}
                  onChange={e => setHasMythicOdie(e.target.checked)}
                  className="w-4 h-4 accent-purple-500"
                />
              </label>
            </div>
          </div>

          <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-lg text-xs text-zinc-300 space-y-1">
            <div className="font-bold text-purple-300 uppercase tracking-wider text-[10px]">Faction Counter Bonus</div>
            <p>
              Deploying 3+ <strong className="text-amber-300">{activeBoss.weaknessFaction}</strong> heroes triggers a 15% damage bonus against {activeBoss.name}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
