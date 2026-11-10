/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Heart, Zap, Sun, Moon, Radio, Thermometer,
  ShieldCheck, AlertCircle, RefreshCw, Award, CheckCircle2,
  Clock, Flame, Snowflake, Music, Flower2, Box
} from 'lucide-react';

interface DeviantProfile {
  id: string;
  name: string;
  type: 'Territory' | 'Combat';
  description: string;
  favLight: 'Red' | 'Blue' | 'Green' | 'Daylight' | 'Darkness';
  favMusic: 'Classical' | 'Rock' | 'Radio' | 'Silence';
  favTemp: 'Warm' | 'Cold' | 'Standard';
  favCompanion: 'Flowers' | 'Crops' | 'Toys' | 'Electricity';
  baseEnergyRate: number; // energy/min
  baseMoodRate: number; // mood/min
  workRate: string;
}

const DEVIANTS: DeviantProfile[] = [
  {
    id: 'digby-boy',
    name: 'Digby Boy',
    type: 'Territory',
    description: 'Autonomous mining specialist. Automatically ventures out to mine Copper, Iron, Silver, and Tungsten ore.',
    favLight: 'Red',
    favMusic: 'Radio',
    favTemp: 'Warm',
    favCompanion: 'Electricity',
    baseEnergyRate: 0.8,
    baseMoodRate: 0.6,
    workRate: 'Mines ~35-60 Ores per 100 Energy cycle'
  },
  {
    id: 'butterfly-emissary',
    name: "Butterfly's Emissary",
    type: 'Combat',
    description: 'Deploys to locate enemy weakspots, mark targets, and deal continuous Stardust resonance damage.',
    favLight: 'Blue',
    favMusic: 'Classical',
    favTemp: 'Standard',
    favCompanion: 'Flowers',
    baseEnergyRate: 1.0,
    baseMoodRate: 0.8,
    workRate: 'Provides +15% Weakspot DMG when summoned'
  },
  {
    id: 'festering-gel',
    name: 'Festering Gel',
    type: 'Combat',
    description: 'Creates a protective healing bubble that instantly restores HP, restores Sanity, and provides portable cover.',
    favLight: 'Green',
    favMusic: 'Silence',
    favTemp: 'Cold',
    favCompanion: 'Toys',
    baseEnergyRate: 1.1,
    baseMoodRate: 0.7,
    workRate: 'Restores 40% HP & 50 Sanity in 10s'
  },
  {
    id: 'chefosaurus-rex',
    name: 'Chefosaurus Rex',
    type: 'Territory',
    description: 'Territory kitchen helper that increases food cooking speeds and crafts morale-boosting signature meals.',
    favLight: 'Daylight',
    favMusic: 'Rock',
    favTemp: 'Warm',
    favCompanion: 'Crops',
    baseEnergyRate: 0.9,
    baseMoodRate: 0.7,
    workRate: '+50% Kitchen speed & grants feast buffs'
  },
  {
    id: 'growshroom',
    name: 'Growshroom',
    type: 'Territory',
    description: 'Territory gardener. Automatically plants seeds, fertilizes garden plots, and harvests mature crops.',
    favLight: 'Darkness',
    favMusic: 'Classical',
    favTemp: 'Cold',
    favCompanion: 'Crops',
    baseEnergyRate: 0.7,
    baseMoodRate: 0.5,
    workRate: 'Harvests up to 60 crops per working cycle'
  },
  {
    id: 'polar-jelly',
    name: 'Polar Jelly',
    type: 'Combat',
    description: 'Freezes surrounding enemies in ice, creates Frost Vortex fields, and multiplies Frost damage.',
    favLight: 'Blue',
    favMusic: 'Silence',
    favTemp: 'Cold',
    favCompanion: 'Toys',
    baseEnergyRate: 0.9,
    baseMoodRate: 0.8,
    workRate: 'Inflicts 100% Frost Vortex Freeze status'
  }
];

export default function OnceHumanDevianceOptimizer() {
  const [selectedDeviantId, setSelectedDeviantId] = useState<string>('digby-boy');
  const [skillLevel, setSkillLevel] = useState<number>(3); // 1-5
  const [activityLevel, setActivityLevel] = useState<number>(3); // 1-5

  // Containment chamber configuration
  const [selectedLight, setSelectedLight] = useState<'Red' | 'Blue' | 'Green' | 'Daylight' | 'Darkness'>('Red');
  const [selectedMusic, setSelectedMusic] = useState<'Classical' | 'Rock' | 'Radio' | 'Silence'>('Radio');
  const [selectedTemp, setSelectedTemp] = useState<'Warm' | 'Cold' | 'Standard'>('Warm');
  const [selectedCompanion, setSelectedCompanion] = useState<'Flowers' | 'Crops' | 'Toys' | 'Electricity'>('Electricity');
  const [isUnitPowered, setIsUnitPowered] = useState<boolean>(true); // 5W

  const deviant = useMemo(() => {
    return DEVIANTS.find(d => d.id === selectedDeviantId) || DEVIANTS[0];
  }, [selectedDeviantId]);

  // Match satisfaction
  const satisfaction = useMemo(() => {
    const lightMatch = selectedLight === deviant.favLight;
    const musicMatch = selectedMusic === deviant.favMusic;
    const tempMatch = selectedTemp === deviant.favTemp;
    const companionMatch = selectedCompanion === deviant.favCompanion;

    let satisfiedCount = 0;
    if (lightMatch) satisfiedCount++;
    if (musicMatch) satisfiedCount++;
    if (tempMatch) satisfiedCount++;
    if (companionMatch) satisfiedCount++;
    if (isUnitPowered) satisfiedCount++;

    // Multiplier: Each condition gives +25% bonus rate
    const envMultiplier = 1 + (satisfiedCount * 0.25);
    const skillMultiplier = 1 + (skillLevel * 0.10);
    const activityMultiplier = 1 + (activityLevel * 0.10);

    const totalEnergyRate = Math.round(deviant.baseEnergyRate * envMultiplier * activityMultiplier * 100) / 100;
    const totalMoodRate = Math.round(deviant.baseMoodRate * envMultiplier * skillMultiplier * 100) / 100;

    const minutesToFullEnergy = Math.round(100 / (totalEnergyRate || 0.1));
    const minutesToFullMood = Math.round(100 / (totalMoodRate || 0.1));

    return {
      lightMatch,
      musicMatch,
      tempMatch,
      companionMatch,
      satisfiedCount,
      totalConditions: 5,
      totalEnergyRate,
      totalMoodRate,
      minutesToFullEnergy,
      minutesToFullMood,
      comfortStars: satisfiedCount
    };
  }, [deviant, selectedLight, selectedMusic, selectedTemp, selectedCompanion, isUnitPowered, skillLevel, activityLevel]);

  const applyOptimalEnvironment = () => {
    setSelectedLight(deviant.favLight);
    setSelectedMusic(deviant.favMusic);
    setSelectedTemp(deviant.favTemp);
    setSelectedCompanion(deviant.favCompanion);
    setIsUnitPowered(true);
  };

  return (
    <div className="space-y-8">
      {/* Overview Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Securement Unit Habitat Tuner</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Deviance Mood & Energy Recovery Optimizer
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Maximize Digby Boy mining yields, Butterfly weakspot buffs, and Gel health recovery. Tune chamber lighting, temperature, music, and flora to hit 5★ containment satisfaction.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 bg-slate-950/80 border border-rose-500/40 rounded-xl p-4">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-2xl font-black text-rose-400">{satisfaction.comfortStars} / 5 ★</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Habitat Comfort</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-emerald-400">+{satisfaction.totalEnergyRate}/m</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Energy Recharge</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Setup */}
        <div className="lg:col-span-2 space-y-6">
          {/* Deviant Selection */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>1. Select Secured Deviant</span>
              </h3>
              <button
                onClick={applyOptimalEnvironment}
                className="px-3 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all"
              >
                Auto-Fit Perfect Chamber
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DEVIANTS.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDeviantId(d.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedDeviantId === d.id
                      ? 'border-rose-500 bg-rose-950/60 text-white shadow-lg shadow-rose-950/50'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs">{d.name}</div>
                  <div className="text-[10px] text-rose-400 mt-1">{d.type} Deviant</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">{d.workRate}</div>
                </button>
              ))}
            </div>

            {/* Ratings Sliders */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Skill Rating:</span>
                  <span className="text-rose-400 font-bold font-mono">Lv. {skillLevel}</span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={5}
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(Number(e.target.value))}
                  className="w-full accent-rose-400"
                />
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Activity Rating:</span>
                  <span className="text-amber-400 font-bold font-mono">Lv. {activityLevel}</span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={5}
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Environmental Controls */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-400" />
              <span>2. Securement Unit Chamber Configuration</span>
            </h3>

            {/* Light */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Lighting Spectrum:</span>
                <span className="text-slate-300 font-medium">Favorite: <span className="text-rose-300 font-bold">{deviant.favLight} Light</span></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Red', 'Blue', 'Green', 'Daylight', 'Darkness'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setSelectedLight(l)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedLight === l
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Music */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Radio Station / Sound:</span>
                <span className="text-slate-300 font-medium">Favorite: <span className="text-rose-300 font-bold">{deviant.favMusic}</span></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Classical', 'Rock', 'Radio', 'Silence'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedMusic(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedMusic === m
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Chamber Temperature:</span>
                <span className="text-slate-300 font-medium">Favorite: <span className="text-rose-300 font-bold">{deviant.favTemp}</span></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Warm', 'Cold', 'Standard'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTemp(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedTemp === t
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Companionship & Power */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Flora / Companion:</span>
                  <span className="text-rose-300 font-bold">{deviant.favCompanion}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['Flowers', 'Crops', 'Toys', 'Electricity'] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCompanion(c)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        selectedCompanion === c
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-semibold block">Unit Power (5W Wire):</span>
                <label className="flex items-center gap-3 p-2.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                  <input 
                    type="checkbox"
                    checked={isUnitPowered}
                    onChange={(e) => setIsUnitPowered(e.target.checked)}
                    className="rounded text-rose-500 focus:ring-rose-500"
                  />
                  <div className="text-xs">
                    <div className="font-bold text-white">Power Connected (5W)</div>
                    <div className="text-[10px] text-slate-400">+25% recovery bonus</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Performance Analytics */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-rose-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
              {deviant.name} Habitat Match
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Lighting Match:</span>
                <span className={satisfaction.lightMatch ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {satisfaction.lightMatch ? '✓ Perfect Match' : '✗ Incompatible'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Music Match:</span>
                <span className={satisfaction.musicMatch ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {satisfaction.musicMatch ? '✓ Perfect Match' : '✗ Incompatible'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Temperature:</span>
                <span className={satisfaction.tempMatch ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {satisfaction.tempMatch ? '✓ Perfect Match' : '✗ Incompatible'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Companion Item:</span>
                <span className={satisfaction.companionMatch ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {satisfaction.companionMatch ? '✓ Perfect Match' : '✗ Incompatible'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">5W Power Grid:</span>
                <span className={isUnitPowered ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {isUnitPowered ? '✓ Connected' : '✗ Unpowered'}
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Full Energy Recharge Time:</div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {satisfaction.minutesToFullEnergy} min
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">(Rate: +{satisfaction.totalEnergyRate} Energy/min)</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Full Mood Recharge Time:</div>
                <div className="text-2xl font-black text-rose-400 font-mono">
                  {satisfaction.minutesToFullMood} min
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">(Rate: +{satisfaction.totalMoodRate} Mood/min)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
