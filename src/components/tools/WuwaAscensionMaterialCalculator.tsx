/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Calendar, Clock, Droplet
} from 'lucide-react';

interface ResonatorAscensionProfile {
  id: string;
  name: string;
  element: string;
  bossMat: string;
  flowerMat: string;
  forgeryFamily: string; // Waveworn, Cadence, Helix, Metallic Drip
  weeklyBossMat: string;
}

const RESONATOR_PROFILES: ResonatorAscensionProfile[] = [
  { id: 'jinshi', name: 'Jinhsi', element: 'Spectro', bossMat: 'Elegy Tacet Core (Mourning Aix)', flowerMat: 'Iris', forgeryFamily: 'Helix Series', weeklyBossMat: 'Sentinel Jué' },
  { id: 'changli', name: 'Changli', element: 'Fusion', bossMat: 'Rage Tacet Core (Inferno Rider)', flowerMat: 'Pecok Flower', forgeryFamily: 'Waveworn Residue', weeklyBossMat: 'Sentinel Jué' },
  { id: 'jiyan', name: 'Jiyan', element: 'Aero', bossMat: 'Roaring Rock Fist (Feilian)', flowerMat: 'Pecok Flower', forgeryFamily: 'Helix Series', weeklyBossMat: 'Bell-Borne Geochelone' },
  { id: 'camellya', name: 'Camellya', element: 'Havoc', bossMat: 'Topologic Confinement', flowerMat: 'Wintry Bell', forgeryFamily: 'Metallic Drip', weeklyBossMat: 'Sentinel Jué' },
  { id: 'shorekeeper', name: 'Shorekeeper', element: 'Spectro', bossMat: 'Topologic Confinement', flowerMat: 'Violet Coral', forgeryFamily: 'Cadence Seed', weeklyBossMat: 'Sentinel Jué' },
  { id: 'xiangli_yao', name: 'Xiangli Yao', element: 'Electro', bossMat: 'Hidden Thunder (Thundering Mephis)', flowerMat: 'Violet Coral', forgeryFamily: 'Metallic Drip', weeklyBossMat: 'Dreamless' },
  { id: 'yinlin', name: 'Yinlin', element: 'Electro', bossMat: 'Group Abomination Core', flowerMat: 'Coriolus', forgeryFamily: 'Cadence Seed', weeklyBossMat: 'Dreamless' },
  { id: 'verina', name: 'Verina', element: 'Spectro', bossMat: 'Sound-Keeping Core', flowerMat: 'Belle Poppy', forgeryFamily: 'Helix Series', weeklyBossMat: 'Bell-Borne Geochelone' },
];

export default function WuwaAscensionMaterialCalculator() {
  const [selectedCharId, setSelectedCharId] = useState<string>('jinshi');
  const [startLevel, setStartLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(90);
  const [forteStart, setForteStart] = useState<number>(1);
  const [forteTarget, setForteTarget] = useState<number>(10);
  const [includeInherentNodes, setIncludeInherentNodes] = useState<boolean>(true);
  const [solPhase, setSolPhase] = useState<number>(7); // SOL3 Phase 7 or 8 (Level 90 max)
  const [solventsHeld, setSolventsHeld] = useState<number>(6);
  const [copied, setCopied] = useState<boolean>(false);

  const character = useMemo(() => {
    return RESONATOR_PROFILES.find(r => r.id === selectedCharId) || RESONATOR_PROFILES[0];
  }, [selectedCharId]);

  const costs = useMemo(() => {
    // 6 Ascension milestones: 20, 40, 50, 60, 70, 80
    // Boss mats needed:
    // 20->40: 0
    // 40->50: 3
    // 50->60: 6
    // 60->70: 9
    // 70->80: 12
    // 80->90: 16 -> Total 46 boss drops
    let bossDrops = 0;
    let floraDrops = 0;
    let charExpPots = 0; // Premium (gold) EXP tubes
    let charCredits = 0;

    if (startLevel < 40 && targetLevel >= 50) bossDrops += 3;
    if (startLevel < 50 && targetLevel >= 60) bossDrops += 6;
    if (startLevel < 60 && targetLevel >= 70) bossDrops += 9;
    if (startLevel < 70 && targetLevel >= 80) bossDrops += 12;
    if (startLevel < 80 && targetLevel >= 90) bossDrops += 16;
    if (startLevel < 20 && targetLevel >= 90) bossDrops = 46;

    // Flora
    if (targetLevel >= 90 && startLevel === 1) floraDrops = 60;
    else if (targetLevel >= 80) floraDrops = 42;
    else if (targetLevel >= 70) floraDrops = 26;
    else floraDrops = 14;

    // EXP tubes (approx 290 gold tubes from 1 to 90)
    const levelSpan = Math.max(0, targetLevel - startLevel);
    charExpPots = Math.round((levelSpan / 89) * 290);
    charCredits = Math.round((levelSpan / 89) * 1450000);

    // Forte Costs (5 skills from forteStart to forteTarget)
    const skillTierSpan = Math.max(0, forteTarget - forteStart);
    // Weekly boss mats: 2 per skill for levels 7-10 -> 26 weekly drops for maxing all
    let weeklyBossDrops = 0;
    if (forteTarget >= 7) weeklyBossDrops += (forteTarget - 6) * 5;
    if (includeInherentNodes) weeklyBossDrops += 6;

    // Forgery green/blue/purple/gold mats
    const forgeryGoldEqv = Math.round((skillTierSpan / 9) * 5 * 25);
    const forteCredits = Math.round((skillTierSpan / 9) * 2000000);

    const totalCredits = charCredits + forteCredits;

    // Waveplates calculation:
    // Boss run = 60 Waveplates (drops ~3 boss mats at SOL3 Phase 7/8)
    const bossRuns = Math.ceil(bossDrops / 3);
    const bossWaveplates = bossRuns * 60;

    // Forgery run = 40 Waveplates
    const forgeryRuns = Math.ceil(forgeryGoldEqv / 1.5);
    const forgeryWaveplates = forgeryRuns * 40;

    // Weekly boss runs = 60 Waveplates each (3 per week)
    const weeklyRuns = Math.ceil(weeklyBossDrops / 2);
    const weeklyWaveplates = weeklyRuns * 60;

    const totalWaveplates = bossWaveplates + forgeryWaveplates + weeklyWaveplates;
    const solventWaveplates = solventsHeld * 60;
    const netWaveplatesNeeded = Math.max(0, totalWaveplates - solventWaveplates);
    const daysToFarm = Number((netWaveplatesNeeded / 240).toFixed(1));

    return {
      bossDrops,
      floraDrops,
      charExpPots,
      weeklyBossDrops,
      forgeryGoldEqv,
      totalCredits,
      bossRuns,
      forgeryRuns,
      weeklyRuns,
      totalWaveplates,
      netWaveplatesNeeded,
      daysToFarm
    };
  }, [startLevel, targetLevel, forteStart, forteTarget, includeInherentNodes, solPhase, solventsHeld]);

  const handleCopy = () => {
    const text = `Wuthering Waves Ascension Farm Plan:
Resonator: ${character.name} (${character.element})
Level: ${startLevel} ➔ ${targetLevel} | Forte: Lv${forteStart} ➔ Lv${forteTarget}
Materials Required:
• Boss Material: ${costs.bossDrops}x ${character.bossMat}
• Specialty Flora: ${costs.floraDrops}x ${character.flowerMat}
• Forgery Domain: ${costs.forgeryGoldEqv}x Gold ${character.forgeryFamily}
• Weekly Boss: ${costs.weeklyBossDrops}x ${character.weeklyBossMat} Drops
• Shell Credits: ${costs.totalCredits.toLocaleString()} Credits
• EXP: ~${costs.charExpPots} Premium Resonator Tubes
Waveplates Required: ${costs.totalWaveplates} Waveplates (~${costs.daysToFarm} Days at 240/day with ${solventsHeld} Solvents)`;
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              LEVEL 1 TO 90 & FORTE 10
            </span>
            <span className="text-xs text-slate-400">Waveplate Energy & Calendar Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Character Ascension Material Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Plan world boss cores, domain forgery materials, overworld flowers, and exact waveplates required.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Shopping List'}
        </button>
      </div>

      {/* Resonator Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Resonator</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {RESONATOR_PROFILES.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedCharId(r.id)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                selectedCharId === r.id
                  ? 'bg-cyan-950 border-cyan-500 shadow ring-1 ring-cyan-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="font-bold text-xs truncate">{r.name}</div>
              <div className="text-[10px] text-cyan-400 mt-0.5">{r.element}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Character Levels */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Resonator Ascension Span
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Start Level</span>
              <select
                value={startLevel}
                onChange={(e) => setStartLevel(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                <option value={1}>Lv 1</option>
                <option value={40}>Lv 40</option>
                <option value={60}>Lv 60</option>
                <option value={70}>Lv 70</option>
                <option value={80}>Lv 80</option>
              </select>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Target Level</span>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-cyan-300 font-bold"
              >
                <option value={50}>Lv 50</option>
                <option value={60}>Lv 60</option>
                <option value={70}>Lv 70</option>
                <option value={80}>Lv 80 (F2P Stop)</option>
                <option value={90}>Lv 90 (Max)</option>
              </select>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Ascension Phase 6 unlocks at Union Level 60 (SOL3 Phase 7).
          </p>
        </div>

        {/* Forte Tree Span */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Forte Skills (All 5 Branches)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Current Forte</span>
              <select
                value={forteStart}
                onChange={(e) => setForteStart(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(l => (
                  <option key={l} value={l}>Level {l}</option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Target Forte</span>
              <select
                value={forteTarget}
                onChange={(e) => setForteTarget(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-amber-300 font-bold"
              >
                {[4, 6, 7, 8, 9, 10].map(l => (
                  <option key={l} value={l}>Level {l} {l === 10 ? '(Maxed)' : l === 8 ? '(Optimal)' : ''}</option>
                ))}
              </select>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-300 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={includeInherentNodes}
              onChange={(e) => setIncludeInherentNodes(e.target.checked)}
              className="accent-cyan-400 rounded"
            />
            Include Inherent & Stat Nodes
          </label>
        </div>

        {/* Energy & Solvents */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Energy Reserves & World Level
          </label>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Crystal Solvents in Bag</span>
                <span className="font-bold text-cyan-300">{solventsHeld} (= {solventsHeld * 60} Plates)</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={solventsHeld}
                onChange={(e) => setSolventsHeld(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-slate-400">SOL3 Phase:</span>
              <span className="font-bold text-slate-200">Phase {solPhase} (Union 60-69)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping List Materials Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" /> Required Ascension & Forte Materials
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">World Boss Core</span>
            <div className="text-2xl font-black text-rose-400">{costs.bossDrops}x</div>
            <p className="text-[11px] text-slate-300 truncate" title={character.bossMat}>{character.bossMat}</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Specialty Flora</span>
            <div className="text-2xl font-black text-emerald-400">{costs.floraDrops}x</div>
            <p className="text-[11px] text-slate-300 truncate" title={character.flowerMat}>{character.flowerMat}</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Forgery Domain Mats</span>
            <div className="text-2xl font-black text-amber-400">{costs.forgeryGoldEqv}x</div>
            <p className="text-[11px] text-slate-300 truncate" title={character.forgeryFamily}>{character.forgeryFamily}</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Weekly Boss Drops</span>
            <div className="text-2xl font-black text-purple-400">{costs.weeklyBossDrops}x</div>
            <p className="text-[11px] text-slate-300 truncate" title={character.weeklyBossMat}>{character.weeklyBossMat}</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Premium EXP Tubes</span>
            <div className="text-2xl font-black text-blue-400">~{costs.charExpPots}x</div>
            <p className="text-[11px] text-slate-300">Gold Resonator Tubes</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Shell Credits</span>
            <div className="text-2xl font-black text-cyan-300">{(costs.totalCredits / 1000000).toFixed(2)}M</div>
            <p className="text-[11px] text-slate-300">{costs.totalCredits.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Farming Calendar & Waveplate Timeline */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Waveplates Required</span>
          <div className="text-3xl font-black text-cyan-300">
            {costs.totalWaveplates} <span className="text-xs font-medium text-slate-400">Waveplates</span>
          </div>
          <p className="text-xs text-slate-400">
            {costs.bossRuns} Boss Runs (60 WP) + {costs.forgeryRuns} Domain Runs (40 WP)
          </p>
        </div>

        <div className="space-y-1 text-center md:border-x border-slate-800 px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated Farming Time</span>
          <div className="text-4xl font-black text-amber-300">
            {costs.daysToFarm} <span className="text-base font-bold text-slate-300">Days</span>
          </div>
          <p className="text-xs text-slate-400">
            Assuming 240 natural waveplates/day + {solventsHeld} Solvents applied
          </p>
        </div>

        <div className="space-y-2 text-xs">
          <span className="font-bold text-emerald-300 block">Resource Efficiency Tip:</span>
          <p className="text-slate-300 leading-relaxed">
            Stopping your secondary sub-DPS resonators at Level 80 with Forte Lv8 saves over <strong>1,800 Waveplates and 2.2M Shell Credits</strong>, while losing less than 6% overall team output!
          </p>
        </div>
      </div>
    </div>
  );
}
