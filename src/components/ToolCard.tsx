/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CircleDot, DoorOpen, Zap, Compass, BookOpen, Users, 
  Disc3, ArrowRight, Wrench, Flame, Percent, 
  DollarSign, TrendingUp, ShoppingCart, Award, Shield, 
  Sword, Layers, SlidersHorizontal, Calculator, Heart, Target, Hammer, Box,
  Dna, Coins, Activity, Gauge, Swords, Gamepad2
} from 'lucide-react';
import { ToolItem, getGameById, getCategoryById } from '../data/gamesAndTools';
import { getGameIcon } from './GameIcons';

interface ToolCardProps {
  tool: ToolItem;
  onSelectTool: (slug: string) => void;
  onNavigateToGame?: (gameSlug: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  CircleDot: <CircleDot className="w-3.5 h-3.5 text-emerald-400" />,
  DoorOpen: <DoorOpen className="w-3.5 h-3.5 text-purple-400" />,
  Calculator: <Calculator className="w-3.5 h-3.5 text-emerald-400" />,
  Heart: <Heart className="w-3.5 h-3.5 text-rose-400" />,
  Target: <Target className="w-3.5 h-3.5 text-cyan-400" />,
  Zap: <Zap className="w-3.5 h-3.5 text-amber-400" />,
  Compass: <Compass className="w-3.5 h-3.5 text-cyan-400" />,
  BookOpen: <BookOpen className="w-3.5 h-3.5 text-rose-400" />,
  Users: <Users className="w-3.5 h-3.5 text-indigo-400" />,
  Disc3: <Disc3 className="w-3.5 h-3.5 text-teal-400" />,
  Percent: <Percent className="w-3.5 h-3.5 text-rose-400" />,
  DollarSign: <DollarSign className="w-3.5 h-3.5 text-emerald-400" />,
  TrendingUp: <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />,
  ShoppingCart: <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />,
  Award: <Award className="w-3.5 h-3.5 text-yellow-400" />,
  Shield: <Shield className="w-3.5 h-3.5 text-sky-400" />,
  Sword: <Sword className="w-3.5 h-3.5 text-purple-400" />,
  Layers: <Layers className="w-3.5 h-3.5 text-cyan-400" />,
  Flame: <Flame className="w-3.5 h-3.5 text-orange-400" />,
  Wrench: <Wrench className="w-3.5 h-3.5 text-zinc-300" />,
  Hammer: <Hammer className="w-3.5 h-3.5 text-amber-400" />,
  Box: <Box className="w-3.5 h-3.5 text-emerald-400" />,
  SlidersHorizontal: <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />,
  Dna: <Dna className="w-3.5 h-3.5 text-cyan-400" />,
  Coins: <Coins className="w-3.5 h-3.5 text-amber-400" />,
  Activity: <Activity className="w-3.5 h-3.5 text-emerald-400" />,
  Gauge: <Gauge className="w-3.5 h-3.5 text-rose-400" />
};

type StatusBadgeType = 'Popular' | 'New' | 'Updated' | 'Java + Bedrock' | 'Featured';

/**
 * Determine deterministic status badge based on tool usage and patch status.
 * Never assigns badges randomly.
 */
function getStatusBadge(tool: ToolItem): StatusBadgeType | null {
  const popularIds = new Set([
    'palworld-breeding-calculator',
    'minecraft-circle-generator',
    'pokemon-go-cp-calculator',
    'genshin-pity-calculator',
    'robux-to-usd-calculator',
    'universal-mouse-sensitivity-converter',
    'minecraft-3d-portal-linker',
    'fortnite-weapon-dps-calculator',
    'valorant-edpi-calculator',
    'roblox-tax-calculator'
  ]);
  if (popularIds.has(tool.id) || popularIds.has(tool.slug) || tool.badge === 'Popular') {
    return 'Popular';
  }

  const newIds = new Set([
    'palworld-passive-skills-stacker',
    'minecraft-villager-trade-calculator',
    'genshin-artifact-cv-calculator',
    'pokemon-go-mega-energy-calculator',
    'minecraft-elytra-rocket-calculator',
    'ping-latency-estimator',
    'aspect-ratio-scaler',
    'tournament-bracket-generator',
    'dice-roller',
    'gaming-decision-wheel'
  ]);
  if (newIds.has(tool.id) || newIds.has(tool.slug) || tool.tags.includes('new')) {
    return 'New';
  }

  const updatedIds = new Set([
    'palworld-work-speed-calculator',
    'palworld-condensation-calculator',
    'palworld-capture-calculator',
    'genshin-resin-calculator',
    'fortnite-battle-pass-calculator',
    'pokemon-go-pvp-iv-calculator',
    'blox-fruits-trade-calculator',
    'palworld-base-team-calculator'
  ]);
  if (updatedIds.has(tool.id) || updatedIds.has(tool.slug) || tool.badge?.includes('Patch') || tool.badge?.includes('Update') || tool.badge?.includes('v0.3.5')) {
    return 'Updated';
  }

  const javaBedrockIds = new Set([
    'minecraft-nether-portal-calculator',
    'minecraft-enchanting-calculator',
    'minecraft-xp-calculator',
    'minecraft-coordinate-converter',
    'minecraft-beacon-calculator'
  ]);
  if (tool.gameId === 'minecraft' && javaBedrockIds.has(tool.id)) {
    return 'Java + Bedrock';
  }

  if (tool.featured) {
    return 'Featured';
  }

  return null;
}

function getBadgeStyles(badge: StatusBadgeType): string {
  switch (badge) {
    case 'Popular':
      return 'bg-violet-950/60 text-violet-300 border-violet-700/50 shadow-sm shadow-violet-950/50';
    case 'New':
      return 'bg-cyan-950/60 text-cyan-300 border-cyan-700/50 shadow-sm shadow-cyan-950/50';
    case 'Updated':
      return 'bg-purple-950/60 text-purple-300 border-purple-700/50';
    case 'Java + Bedrock':
      return 'bg-violet-950/60 text-violet-300 border-violet-700/50';
    case 'Featured':
      return 'bg-indigo-950/60 text-cyan-300 border-indigo-700/50';
    default:
      return 'bg-[#070b19] text-slate-300 border-indigo-900/60';
  }
}

/**
 * Technical metadata for accuracy and theorycrafting context
 */
function getTechnicalMetadata(tool: ToolItem): string {
  if (tool.gameId === 'minecraft') {
    if (
      tool.id.includes('circle') || 
      tool.id.includes('portal') || 
      tool.id.includes('coord') || 
      tool.id.includes('enchant') || 
      tool.id.includes('xp') || 
      tool.id.includes('villager') || 
      tool.id.includes('redstone') || 
      tool.id.includes('beacon')
    ) {
      return 'Java + Bedrock';
    }
    return '1.21.x Parity';
  }

  if (tool.gameId === 'palworld') {
    if (tool.id.includes('breeding')) return 'CombiRank Engine';
    if (tool.id.includes('iv') || tool.id.includes('damage')) return '0–30% Talent IVs';
    if (tool.id.includes('work') || tool.id.includes('base')) return 'Work Suitability Lv5';
    if (tool.id.includes('capture')) return 'Effigy Rank 10';
    if (tool.id.includes('passive')) return '4-Trait Stacker';
    return 'v0.3.5 / Sakurajima';
  }

  if (tool.gameId === 'pokemongo') {
    if (tool.id.includes('cp') || tool.id.includes('evolution')) return 'Official CPM Math';
    if (tool.id.includes('pvp')) return 'Great / Ultra / Master';
    if (tool.id.includes('mega') || tool.id.includes('candy')) return 'Level 50 XL Candy';
    if (tool.id.includes('iv')) return '15/15/15 Appraisal';
    return 'Season of Max Out';
  }

  if (tool.gameId === 'genshin') {
    if (tool.id.includes('pity') || tool.id.includes('wish')) return 'Soft Pity & 50/50';
    if (tool.id.includes('resin')) return '200 Resin Cap';
    if (tool.id.includes('cv') || tool.id.includes('artifact')) return 'Crit Value Formula';
    if (tool.id.includes('ascension')) return 'Level 90 Materials';
    return 'Version 5.x Natlan';
  }

  if (tool.gameId === 'fps') {
    if (tool.id.includes('sensitivity') || tool.id.includes('converter')) return '1:1 Yaw Precision';
    if (tool.id.includes('edpi')) return 'DPI × In-Game Sens';
    if (tool.id.includes('ttk')) return 'Hitbox Multipliers';
    return 'Sub-Tick Precision';
  }

  if (tool.gameId === 'fortnite') {
    if (tool.id.includes('dps') || tool.id.includes('weapon')) return 'Zero Build & Battle Royale';
    if (tool.id.includes('vbuck') || tool.id.includes('usd')) return 'V-Bucks Exchange';
    if (tool.id.includes('storm')) return 'Phase 1–9 Tick Damage';
    return 'Chapter 5 Season';
  }

  if (tool.gameId === 'roblox') {
    if (tool.id.includes('robux') || tool.id.includes('devex')) return 'DevEx $0.0035 Rate';
    if (tool.id.includes('tax')) return '30% Marketplace Net';
    if (tool.id.includes('blox-fruits')) return 'Trade Value Matrix';
    return 'Platform Math';
  }

  if (tool.gameId === 'general') {
    if (tool.id.includes('dice')) return 'Polyhedral PRNG';
    if (tool.id.includes('wheel')) return 'Deceleration Inertia';
    if (tool.id.includes('bracket')) return 'Single Elimination';
    if (tool.id.includes('latency') || tool.id.includes('ping')) return 'Local RTT Buffer';
    if (tool.id.includes('aspect')) return 'Viewport Scaler';
    return 'Browser Native';
  }

  return 'Client-Side Instant';
}

export default function ToolCard({ tool, onSelectTool }: ToolCardProps) {
  const game = getGameById(tool.gameId);
  const category = getCategoryById(tool.categoryId);
  const statusBadge = getStatusBadge(tool);
  const technicalMetadata = getTechnicalMetadata(tool);

  // Compact icon rendering with game vector logo
  const renderIcon = () => {
    return getGameIcon(tool.gameId, 'w-3.5 h-3.5');
  };

  return (
    <a
      href={`/tools/${tool.slug}`}
      onClick={(e) => {
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          onSelectTool(tool.slug);
        }
      }}
      className="group relative bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/60 rounded-xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full min-h-[210px] hover:-translate-y-0.5 shadow-sm hover:shadow-xl hover:shadow-violet-950/30 block text-left no-underline"
    >
      <div>
        {/* 1. Small Game / Category Label & 2. Optional Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
            <div className="w-6 h-6 rounded-lg bg-[#070b19] border border-indigo-950 flex items-center justify-center flex-shrink-0 group-hover:border-violet-500/50 transition-colors">
              {renderIcon()}
            </div>
            <span className="font-semibold text-slate-300 text-xs truncate">
              {game?.shortName || game?.name || 'Gaming'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 text-[11px] truncate">
              {category?.name || 'Utility'}
            </span>
          </div>

          {statusBadge && (
            <span className={`text-[10px] font-semibold tracking-wider font-mono px-2 py-0.5 rounded border flex-shrink-0 ${getBadgeStyles(statusBadge)}`}>
              {statusBadge}
            </span>
          )}
        </div>

        {/* 3. Tool Name */}
        <h3 className="text-[15px] font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2 tracking-tight">
          {tool.name}
        </h3>

        {/* 4. Short 1-2 Line Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {tool.shortDescription}
        </p>
      </div>

      {/* 5. Small Technical Metadata & 6. Clear Open Tool CTA */}
      <div className="pt-3 border-t border-indigo-950/80 flex items-center justify-between text-xs mt-auto">
        <span className="text-slate-400 text-[11px] font-mono flex items-center gap-1 truncate max-w-[55%]">
          {technicalMetadata}
        </span>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 group-hover:text-cyan-300 transition-colors flex-shrink-0">
          <span>Open Tool</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </a>
  );
}
