/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Shield, Layers, Sparkles, Heart, Award, CheckCircle2, 
  RotateCcw, Sliders, ChevronDown, Check, Info, Flame, Zap
} from 'lucide-react';

interface ComponentSet {
  id: string;
  name: string;
  twoPieceBonus: string;
  fourPieceBonus: string;
  bestFor: string;
}

const COMPONENT_SETS: ComponentSet[] = [
  {
    id: 'slayer',
    name: 'Slayer Set',
    twoPieceBonus: '+9.1% Skill Power',
    fourPieceBonus: '+26.1% Skill Power Modifier when casting skills (costs 15% more MP)',
    bestFor: 'Ultimate Lepic, Hailey, Bunny (Max Skill Damage)'
  },
  {
    id: 'annihilation',
    name: 'Annihilation Set',
    twoPieceBonus: '+5.7% Skill Duration UP',
    fourPieceBonus: '+23.5% Firearm ATK when HP drops below 50%',
    bestFor: 'Ultimate Gley, Enzo (Infinite Ammo & Duration)'
  },
  {
    id: 'supernova',
    name: 'Supernova Set',
    twoPieceBonus: '+8.4% Electric Skill Power',
    fourPieceBonus: 'Chance to summon Lightning Strike dealing 450% damage on electrocution',
    bestFor: 'Ultimate Bunny, Sharen (Electric Burst)'
  },
  {
    id: 'polar-night',
    name: 'Polar Night Set',
    twoPieceBonus: '+8.4% Chill Skill Power',
    fourPieceBonus: 'Applies Frostbite debuff increasing critical hit damage on target by 18%',
    bestFor: 'Viessa, Hailey (Chill Crits)'
  },
  {
    id: 'bravery',
    name: 'Bravery Set',
    twoPieceBonus: '+8.4% Fire Skill Power',
    fourPieceBonus: 'Restores 15% Shield on Burn detonation',
    bestFor: 'Blair, Lepic (Fire Tanking)'
  }
];

export default function TfdComponentOptimizer() {
  const [auxiliarySet, setAuxiliarySet] = useState<string>('slayer');
  const [sensorSet, setSensorSet] = useState<string>('slayer');
  const [memorySet, setMemorySet] = useState<string>('slayer');
  const [processorSet, setProcessorSet] = useState<string>('slayer');

  // Stats input
  const [baseHp, setBaseHp] = useState<number>(640);
  const [componentHp, setComponentHp] = useState<number>(1280); // Aux Power + Memory
  const [hpModulePercent, setHpModulePercent] = useState<number>(218); // Increased HP module

  const [baseDef, setBaseDef] = useState<number>(2500);
  const [componentDef, setComponentDef] = useState<number>(8500); // Sensor + Memory
  const [defModulePercent, setDefModulePercent] = useState<number>(160); // Increased DEF module

  // Calculations
  const calculated = useMemo(() => {
    // Count pieces per set
    const setCounts: Record<string, number> = {};
    [auxiliarySet, sensorSet, memorySet, processorSet].forEach(s => {
      setCounts[s] = (setCounts[s] || 0) + 1;
    });

    const activeBonuses: Array<{ setName: string; type: '2-Piece' | '4-Piece'; text: string }> = [];
    Object.entries(setCounts).forEach(([setId, count]) => {
      const def = COMPONENT_SETS.find(s => s.id === setId);
      if (!def) return;
      if (count >= 2) activeBonuses.push({ setName: def.name, type: '2-Piece', text: def.twoPieceBonus });
      if (count >= 4) activeBonuses.push({ setName: def.name, type: '4-Piece', text: def.fourPieceBonus });
    });

    // Effective HP = (Base HP + Component HP) * (1 + HP Module %)
    const totalMaxHp = Math.round((baseHp + componentHp) * (1 + hpModulePercent / 100));

    // Effective DEF = (Base DEF + Component DEF) * (1 + DEF Module %)
    const totalDef = Math.round((baseDef + componentDef) * (1 + defModulePercent / 100));

    // TFD Damage Reduction from DEF formula:
    // Reduction % = DEF / (DEF + 3500)
    const damageReductionPct = (totalDef / (totalDef + 3500)) * 100;

    // Effective Health Pool (EHP) = Total HP / (1 - Damage Reduction)
    const ehp = Math.round(totalMaxHp / (1 - (damageReductionPct / 100)));

    return {
      setCounts,
      activeBonuses,
      totalMaxHp,
      totalDef,
      damageReductionPct: damageReductionPct.toFixed(1),
      ehp
    };
  }, [auxiliarySet, sensorSet, memorySet, processorSet, baseHp, componentHp, hpModulePercent, baseDef, componentDef, defModulePercent]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/70 p-5 sm:p-6 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Layers className="w-4 h-4 text-emerald-300" />
              <span>THE FIRST DESCENDANT</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-mono">COMPONENT SET OPTIMIZER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Component Set Bonus & EHP Optimizer
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Equip 2-piece and 4-piece Legendary component sets (Slayer, Annihilation, Supernova) and calculate true Effective Health Pool (EHP) with DEF scaling.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 px-4 py-3 rounded-xl shadow-inner shrink-0">
            <Shield className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="text-[11px] text-slate-400 block">Effective Health (EHP)</span>
              <span className="text-2xl font-black text-emerald-300 font-mono">{calculated.ehp.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Max HP</span>
            <span className="text-lg font-bold font-mono text-emerald-400">{calculated.totalMaxHp.toLocaleString()} HP</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Defense (DEF)</span>
            <span className="text-lg font-bold font-mono text-cyan-400">{calculated.totalDef.toLocaleString()} DEF</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Damage Reduction</span>
            <span className="text-lg font-bold font-mono text-amber-400">{calculated.damageReductionPct}%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Active Set Bonuses</span>
            <span className="text-lg font-bold font-mono text-purple-400">{calculated.activeBonuses.length} Active</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>4 External Component Slots</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Slot 1: Auxiliary Power (HP Main)</label>
                <select
                  value={auxiliarySet}
                  onChange={(e) => setAuxiliarySet(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-emerald-500"
                >
                  {COMPONENT_SETS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Slot 2: Sensor (DEF Main)</label>
                <select
                  value={sensorSet}
                  onChange={(e) => setSensorSet(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-emerald-500"
                >
                  {COMPONENT_SETS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Slot 3: Memory (HP / DEF Main)</label>
                <select
                  value={memorySet}
                  onChange={(e) => setMemorySet(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-emerald-500"
                >
                  {COMPONENT_SETS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Slot 4: Processor (Shield Main)</label>
                <select
                  value={processorSet}
                  onChange={(e) => setProcessorSet(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-emerald-500"
                >
                  {COMPONENT_SETS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>HP & DEF Scaling Sliders</span>
            </h2>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Component Flat HP: +{componentHp}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={componentHp}
                  onChange={(e) => setComponentHp(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Increased HP Module Bonus: +{hpModulePercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={hpModulePercent}
                  onChange={(e) => setHpModulePercent(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Component Flat DEF: +{componentDef}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="200"
                  value={componentDef}
                  onChange={(e) => setComponentDef(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Active Set Bonuses & Advice */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-emerald-950/40 shadow-xl space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Active Set Bonuses ({calculated.activeBonuses.length})</span>
            </h2>

            {calculated.activeBonuses.length === 0 ? (
              <div className="p-5 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                No active 2-piece or 4-piece set bonus. Equip at least 2 matching component pieces!
              </div>
            ) : (
              <div className="space-y-3">
                {calculated.activeBonuses.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{b.setName}</span>
                      <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40">
                        {b.type} Active
                      </span>
                    </div>
                    <p className="text-xs text-emerald-200/90 leading-relaxed font-mono">{b.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
              <h3 className="font-bold text-white uppercase tracking-wider">DEF Diminishing Returns Warning</h3>
              <p className="leading-relaxed">
                In The First Descendant, DEF hits diminishing returns past 25,000 DEF (~87% damage reduction). Stacking pure Max HP on Auxiliary Power and Memory yields significantly more survivability against high-level Colossi like Gluttony!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
