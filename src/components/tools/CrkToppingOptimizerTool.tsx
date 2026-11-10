/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sparkles, Shield, Zap, Target, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';

interface ToppingType {
  id: string;
  name: string;
  statName: string;
  mainStatValue: number; // e.g. 9.0 for Level 12 M Topping
  setBonus2: string;
  setBonus5: string;
  bonusValue5: number;
}

const TOPPING_TYPES: ToppingType[] = [
  { id: 'swift_chocolate', name: 'Swift Chocolate', statName: 'Cooldown', mainStatValue: 4.0, setBonus2: '+2% Cooldown', setBonus5: '+5% Cooldown', bonusValue5: 5.0 },
  { id: 'solid_almond', name: 'Solid Almond', statName: 'DMG Resist', mainStatValue: 4.1, setBonus2: '+2% DMG Resist', setBonus5: '+5% DMG Resist', bonusValue5: 5.0 },
  { id: 'searing_raspberry', name: 'Searing Raspberry', statName: 'ATK', mainStatValue: 9.0, setBonus2: '+3% ATK', setBonus5: '+5% ATK', bonusValue5: 5.0 },
  { id: 'juicy_apple', name: 'Juicy Apple Jelly', statName: 'CRIT%', mainStatValue: 6.0, setBonus2: '+3% CRIT%', setBonus5: '+5% CRIT%', bonusValue5: 5.0 },
  { id: 'hard_walnut', name: 'Hard Walnut', statName: 'DEF', mainStatValue: 9.0, setBonus2: '+3% DEF', setBonus5: '+5% DEF', bonusValue5: 5.0 }
];

const ARENA_CD_THRESHOLDS = [
  { baseSkillCd: 15, targetStartSec: 3, reqTotalCd: 24.1, desc: '3-second Arena start for 15s base CD skills (e.g. Pure Vanilla, Frost Queen).' },
  { baseSkillCd: 14, targetStartSec: 3, reqTotalCd: 22.3, desc: '3-second start for 14s base CD skills (e.g. Golden Cheese, Mystic Flour).' },
  { baseSkillCd: 13, targetStartSec: 2, reqTotalCd: 45.5, desc: '2-second fast start for 13s base CD skills (Requires full Swift Chocolate + top substats).' },
  { baseSkillCd: 12, targetStartSec: 3, reqTotalCd: 17.5, desc: '3-second start for 12s base CD skills (e.g. Snapdragon, Icicle Yeti).' }
];

export default function CrkToppingOptimizerTool() {
  const [selectedToppingId, setSelectedToppingId] = useState<string>('swift_chocolate');
  const [includeSquishyWatch, setIncludeSquishyWatch] = useState<boolean>(true);
  const [watchBonusCd, setWatchBonusCd] = useState<number>(25.4); // Max Epic Jelly Watch

  // Substat rolls
  const [subCd, setSubCd] = useState<number>(12.5); // total CD % from 5 topping substats
  const [subDmgRes, setSubDmgRes] = useState<number>(22.0); // total DMG Resist % from substats
  const [subAtk, setSubAtk] = useState<number>(8.5);
  const [subCrit, setSubCrit] = useState<number>(4.0);

  const activeTopping = useMemo(() => {
    return TOPPING_TYPES.find(t => t.id === selectedToppingId) || TOPPING_TYPES[0];
  }, [selectedToppingId]);

  // Calculations for 5-set build
  const calcResults = useMemo(() => {
    // 5 slots of main stat
    const mainStatSum = activeTopping.mainStatValue * 5;
    const setBonus = activeTopping.bonusValue5;

    let totalCd = subCd + (includeSquishyWatch ? watchBonusCd : 0);
    let totalDmgRes = subDmgRes;
    let totalAtk = subAtk;
    let totalCrit = subCrit;

    if (activeTopping.statName === 'Cooldown') {
      totalCd += mainStatSum + setBonus;
    } else if (activeTopping.statName === 'DMG Resist') {
      totalDmgRes += mainStatSum + setBonus;
    } else if (activeTopping.statName === 'ATK') {
      totalAtk += mainStatSum + setBonus;
    } else if (activeTopping.statName === 'CRIT%') {
      totalCrit += mainStatSum + setBonus;
    }

    return {
      mainStatSum,
      setBonus,
      totalCd: Number(totalCd.toFixed(1)),
      totalDmgRes: Number(totalDmgRes.toFixed(1)),
      totalAtk: Number(totalAtk.toFixed(1)),
      totalCrit: Number(totalCrit.toFixed(1))
    };
  }, [activeTopping, subCd, subDmgRes, subAtk, subCrit, includeSquishyWatch, watchBonusCd]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Topping Breakpoint Calculator
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Sparkles className="w-6 h-6 text-amber-400" />
              Cookie Run: Kingdom Topping Optimizer
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Configure 5-set M Topping builds, tune substat rolls, and target exact Arena Cooldown thresholds.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Total Cooldown</div>
              <div className="text-2xl font-black text-amber-400">{calcResults.totalCd}%</div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">DMG Resist Cap</div>
              <div className="text-2xl font-black text-emerald-400">{calcResults.totalDmgRes}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Topping Build Selection */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            1. Select 5-Set Topping Preset
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOPPING_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedToppingId(t.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedToppingId === t.id
                    ? 'bg-amber-950/40 border-amber-500/60 text-white shadow-lg shadow-amber-950/20'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="text-sm font-bold flex items-center justify-between">
                  <span>{t.name}</span>
                  {selectedToppingId === t.id && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </div>
                <div className="text-xs text-amber-300/80 mt-0.5">
                  Main: +{t.mainStatValue * 5}% {t.statName}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">{t.setBonus5}</div>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800 space-y-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              2. Treasure Modifiers
            </h4>

            <label className="flex items-center justify-between bg-zinc-950/60 p-3 rounded-lg border border-zinc-800 cursor-pointer">
              <span className="text-sm text-zinc-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Equip Squishy / Sleepy Jelly Watch
              </span>
              <input
                type="checkbox"
                checked={includeSquishyWatch}
                onChange={e => setIncludeSquishyWatch(e.target.checked)}
                className="w-4 h-4 accent-amber-500"
              />
            </label>

            {includeSquishyWatch && (
              <div className="flex items-center justify-between text-xs bg-zinc-950/40 p-2.5 rounded border border-zinc-800/80">
                <span className="text-zinc-400">Jelly Watch CD Boost %</span>
                <input
                  type="number"
                  step="0.1"
                  value={watchBonusCd}
                  onChange={e => setWatchBonusCd(parseFloat(e.target.value) || 0)}
                  className="w-20 bg-zinc-900 text-right text-amber-300 font-mono border border-zinc-700 rounded px-2 py-1 outline-none focus:border-amber-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Substat Tuning */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            3. Tune Topping Sub-stat Rolls (5 Slots Combined)
          </h3>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300 font-medium">Cooldown Sub-stats Total %</span>
                <span className="text-amber-400 font-mono">{subCd}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.1"
                value={subCd}
                onChange={e => setSubCd(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300 font-medium">DMG Resist Sub-stats Total %</span>
                <span className="text-emerald-400 font-mono">{subDmgRes}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={subDmgRes}
                onChange={e => setSubDmgRes(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300 font-medium">ATK Sub-stats Total %</span>
                <span className="text-rose-400 font-mono">{subAtk}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={subAtk}
                onChange={e => setSubAtk(parseFloat(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300 font-medium">CRIT % Sub-stats Total</span>
                <span className="text-sky-400 font-mono">{subCrit}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={subCrit}
                onChange={e => setSubCrit(parseFloat(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Threshold Evaluation Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          Arena Skill Start Breakpoints & Verification
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ARENA_CD_THRESHOLDS.map((t, idx) => {
            const isMet = calcResults.totalCd >= t.reqTotalCd;

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isMet
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-zinc-950/60 border-zinc-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">
                      {t.baseSkillCd}s Base Skill → {t.targetStartSec}s Start
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-bold ${
                        isMet
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {isMet ? 'PASSED' : `Needs ${t.reqTotalCd}%`}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1">{t.desc}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Required: {t.reqTotalCd}%</span>
                  <span className={isMet ? 'text-emerald-400 font-bold' : 'text-zinc-400'}>
                    Current: {calcResults.totalCd}% {isMet ? `(+${(calcResults.totalCd - t.reqTotalCd).toFixed(1)}%)` : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
