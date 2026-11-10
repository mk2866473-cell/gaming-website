/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Swords, Calculator, Target } from 'lucide-react';

export default function SkDamageCalculatorTool() {
  const [atk, setAtk] = useState<number>(5000);
  const [skillCoeff, setSkillCoeff] = useState<number>(250); // percentage
  const [critDmg, setCritDmg] = useState<number>(150); // percentage
  const [enemyDef, setEnemyDef] = useState<number>(1000);
  const [defShred, setDefShred] = useState<number>(20); // percentage

  const damageResults = useMemo(() => {
    const rawDamage = atk * (skillCoeff / 100);
    const effectiveDef = enemyDef * (1 - defShred / 100);
    const finalDamage = Math.round(rawDamage * (critDmg / 100) * (1 - effectiveDef / (effectiveDef + 1000)));
    return {
      finalDamage
    };
  }, [atk, skillCoeff, critDmg, enemyDef, defShred]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-zinc-900 border border-blue-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Swords className="w-6 h-6 text-blue-400" />
          Seven Knights Re:BIRTH Damage Output Calculator
        </h2>
        <p className="text-sm text-zinc-300 mt-1">Simulate hero damage output against various raid boss defensive profiles.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Hero Attack (ATK)</label>
              <input 
                type="number" 
                value={atk} 
                onChange={e => setAtk(Number(e.target.value))} 
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono focus:border-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Skill Multiplier (%)</label>
              <input 
                type="number" 
                value={skillCoeff} 
                onChange={e => setSkillCoeff(Number(e.target.value))} 
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono focus:border-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Critical Damage (%)</label>
              <input 
                type="number" 
                value={critDmg} 
                onChange={e => setCritDmg(Number(e.target.value))} 
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono focus:border-blue-500 outline-none" 
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
             <div className="p-5 bg-zinc-950 rounded-xl border border-blue-500/20">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Estimated Final Damage</div>
              <div className="text-4xl font-black text-blue-400 font-mono">
                {damageResults.finalDamage.toLocaleString()}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-800/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Enemy Defense:</span>
                <input 
                  type="number" 
                  value={enemyDef} 
                  onChange={e => setEnemyDef(Number(e.target.value))} 
                  className="w-20 bg-transparent text-right text-white font-bold outline-none" 
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Defense Shred (%):</span>
                <input 
                  type="number" 
                  value={defShred} 
                  onChange={e => setDefShred(Number(e.target.value))} 
                  className="w-20 bg-transparent text-right text-blue-400 font-bold outline-none" 
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
            <p className="text-[10px] text-blue-200/60 leading-relaxed italic">
              *Calculations assume standard defense mitigation formulas. Critical hits are factored into the final estimate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
