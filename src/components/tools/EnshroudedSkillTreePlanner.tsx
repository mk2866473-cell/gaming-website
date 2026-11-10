import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Zap,
  Shield,
  Heart,
  Target,
  Swords,
  Wand2,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Info
} from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  classCategory: 'survivor' | 'warrior' | 'wizard' | 'ranger' | 'tank';
  cost: number;
  description: string;
  attributeBonus?: { stat: string; val: number };
}

const SKILL_NODES: SkillNode[] = [
  { id: 'double-jump', name: 'Double Jump', classCategory: 'survivor', cost: 4, description: 'Allows jumping a second time in mid-air. Essential for exploration.', attributeBonus: { stat: 'Endurance', val: 2 } },
  { id: 'runner', name: 'Runner', classCategory: 'survivor', cost: 1, description: 'Sprint speed increased by +10% and stamina consumption reduced.', attributeBonus: { stat: 'Endurance', val: 1 } },
  { id: 'mercy-kill', name: 'Mercy Kill', classCategory: 'warrior', cost: 3, description: 'Perform an instant execute finisher on stunned or staggered enemies.', attributeBonus: { stat: 'Strength', val: 2 } },
  { id: 'heavy-plates', name: 'Heavy Plates', classCategory: 'tank', cost: 2, description: 'Increases physical armor protection by +15%.', attributeBonus: { stat: 'Constitution', val: 2 } },
  { id: 'chain-lightning', name: 'Chain Lightning', classCategory: 'wizard', cost: 5, description: 'Critical spell hits bounce electrical lightning to up to 3 nearby targets.', attributeBonus: { stat: 'Intelligence', val: 3 } },
  { id: 'blink', name: 'Blink', classCategory: 'wizard', cost: 4, description: 'Replaces standard dodge roll with a short-range magical teleport that bypasses attacks.', attributeBonus: { stat: 'Spirit', val: 2 } },
  { id: 'eagle-eye', name: 'Eagle Eye', classCategory: 'ranger', cost: 3, description: 'Increases bow zoom and headshot damage by +20%.', attributeBonus: { stat: 'Dexterity', val: 2 } },
  { id: 'multishot', name: 'Multishot', classCategory: 'ranger', cost: 4, description: 'Chance to fire 2 extra arrows per shot without consuming ammo.', attributeBonus: { stat: 'Dexterity', val: 3 } }
];

export const EnshroudedSkillTreePlanner: React.FC = () => {
  const [characterLevel, setCharacterLevel] = useState<number>(35);
  const [shroudRootsCleared, setShroudRootsCleared] = useState<number>(20);
  const [activeSkillIds, setActiveSkillIds] = useState<string[]>(['double-jump', 'runner', 'chain-lightning']);

  const totalPointsBudget = useMemo(() => {
    // Level 1-35 yields 34 skill points + 1 per Shroud Root
    return Math.max(0, characterLevel - 1) + shroudRootsCleared;
  }, [characterLevel, shroudRootsCleared]);

  const spentPoints = useMemo(() => {
    return SKILL_NODES.filter((n) => activeSkillIds.includes(n.id)).reduce((sum, n) => sum + n.cost, 0);
  }, [activeSkillIds]);

  const remainingPoints = totalPointsBudget - spentPoints;

  const toggleSkill = (id: string, cost: number) => {
    if (activeSkillIds.includes(id)) {
      setActiveSkillIds((prev) => prev.filter((s) => s !== id));
    } else {
      if (remainingPoints >= cost) {
        setActiveSkillIds((prev) => [...prev, id]);
      }
    }
  };

  const attributesSummary = useMemo(() => {
    let constitution = 10;
    let strength = 10;
    let dexterity = 10;
    let intelligence = 10;
    let spirit = 10;
    let endurance = 10;

    SKILL_NODES.forEach((node) => {
      if (activeSkillIds.includes(node.id) && node.attributeBonus) {
        const { stat, val } = node.attributeBonus;
        if (stat === 'Constitution') constitution += val;
        if (stat === 'Strength') strength += val;
        if (stat === 'Dexterity') dexterity += val;
        if (stat === 'Intelligence') intelligence += val;
        if (stat === 'Spirit') spirit += val;
        if (stat === 'Endurance') endurance += val;
      }
    });

    const maxHealth = 100 + (constitution - 10) * 50;
    const meleeDmgPct = (strength - 10) * 5;
    const rangedDmgPct = (dexterity - 10) * 5;
    const magicDmgPct = (intelligence - 10) * 5;
    const maxMana = 100 + (spirit - 10) * 20;
    const maxStamina = 100 + (endurance - 10) * 10;

    return {
      constitution,
      strength,
      dexterity,
      intelligence,
      spirit,
      endurance,
      maxHealth,
      meleeDmgPct,
      rangedDmgPct,
      magicDmgPct,
      maxMana,
      maxStamina
    };
  }, [activeSkillIds]);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Title */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Skill Tree Simulator & Attribute Points Planner
            </h2>
            <p className="text-xs text-slate-400">
              Allocate Skill Points across 12 class archetypes, calculate Shroud Root bonus points (+1/root), and track attribute scaling.
            </p>
          </div>
        </div>
      </div>

      {/* Point Budget Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Character Level (1–35):
          </label>
          <input
            type="range"
            min="1"
            max="35"
            value={characterLevel}
            onChange={(e) => setCharacterLevel(parseInt(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-950 h-2 rounded cursor-pointer"
          />
          <div className="text-right font-mono font-bold text-cyan-400 text-sm mt-1">Level {characterLevel}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Shroud Roots Destroyed (0–25):
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={shroudRootsCleared}
            onChange={(e) => setShroudRootsCleared(parseInt(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-950 h-2 rounded cursor-pointer"
          />
          <div className="text-right font-mono font-bold text-emerald-400 text-sm mt-1">+{shroudRootsCleared} Bonus Pts</div>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-center text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Remaining Skill Points</span>
          <p className={`text-2xl font-mono font-bold ${remainingPoints >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
            {remainingPoints} / {totalPointsBudget} Pts
          </p>
        </div>
      </div>

      {/* Derived Attributes Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Health Pool</span>
          <p className="text-lg font-mono font-bold text-rose-400">{attributesSummary.maxHealth} HP</p>
        </div>
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Melee DMG</span>
          <p className="text-lg font-mono font-bold text-amber-400">+{attributesSummary.meleeDmgPct}%</p>
        </div>
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Ranged DMG</span>
          <p className="text-lg font-mono font-bold text-emerald-400">+{attributesSummary.rangedDmgPct}%</p>
        </div>
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Magic DMG</span>
          <p className="text-lg font-mono font-bold text-cyan-400">+{attributesSummary.magicDmgPct}%</p>
        </div>
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Mana Pool</span>
          <p className="text-lg font-mono font-bold text-purple-400">{attributesSummary.maxMana} MP</p>
        </div>
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Stamina Pool</span>
          <p className="text-lg font-mono font-bold text-yellow-400">{attributesSummary.maxStamina} SP</p>
        </div>
      </div>

      {/* Nodes Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILL_NODES.map((node) => {
          const isSelected = activeSkillIds.includes(node.id);
          return (
            <div
              key={node.id}
              onClick={() => toggleSkill(node.id, node.cost)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500/80 shadow-md'
                  : 'bg-slate-900/50 border-slate-800/80 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-bold text-white text-sm">{node.name}</h4>
                <span className="font-mono text-xs font-bold text-cyan-400">{node.cost} Pts</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">{node.description}</p>
              {node.attributeBonus && (
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  +{node.attributeBonus.val} {node.attributeBonus.stat}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnshroudedSkillTreePlanner;
