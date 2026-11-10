/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Skull, AlertTriangle, ShieldAlert, Sparkles, 
  RotateCcw, Info, Compass, Award, CheckCircle2, 
  Search, Filter, Moon
} from 'lucide-react';

export interface MonsterEntry {
  id: string;
  name: string;
  location: 'Indoor' | 'Outdoor';
  powerLevel: number; // e.g. 1 to 3
  dangerRating: 'EXTREME (Instant Kill)' | 'HIGH' | 'MEDIUM' | 'LOW';
  spawnMoons: string[];
  counterplay: string;
  killable: boolean;
  weaponRequired?: string;
}

const MONSTER_DATABASE: MonsterEntry[] = [
  {
    id: 'jester',
    name: 'Jester (Jack-in-the-Box)',
    location: 'Indoor',
    powerLevel: 3,
    dangerRating: 'EXTREME (Instant Kill)',
    spawnMoons: ['Rend', 'Dine', 'Titan', 'Artifice'],
    counterplay: 'Follows crew winding up music box for 40-60s. Once popped into giant skull mode, it runs at hyper speed and instantly kills everyone. EVACUATE THE FACILITY IMMEDIATELY!',
    killable: false
  },
  {
    id: 'bracken',
    name: 'Bracken (Flower Man)',
    location: 'Indoor',
    powerLevel: 2,
    dangerRating: 'EXTREME (Instant Kill)',
    spawnMoons: ['Vow', 'March', 'Rend', 'Dine', 'Titan', 'Artifice'],
    counterplay: 'Sneaks up from behind to snap necks. Briefly glance at him (1-2s) to make him back away; staring too long (3s+) triggers an immediate fatal rage rush!',
    killable: true,
    weaponRequired: 'Zap Gun + 2 Shovel Hits'
  },
  {
    id: 'coil_head',
    name: 'Coil-Head',
    location: 'Indoor',
    powerLevel: 1,
    dangerRating: 'EXTREME (Instant Kill)',
    spawnMoons: ['Offense', 'Rend', 'Dine', 'Titan', 'Artifice'],
    counterplay: 'Hyper-fast mannequin with spring head. Moves at extreme speed when NOT looked at; freezes completely when watched. Have one crewmate maintain direct eye contact while walking backward to exit.',
    killable: false
  },
  {
    id: 'eyeless_dog',
    name: 'Eyeless Dog (Blind Hunter)',
    location: 'Outdoor',
    powerLevel: 2,
    dangerRating: 'HIGH',
    spawnMoons: ['Offense', 'March', 'Rend', 'Dine', 'Titan', 'Artifice'],
    counterplay: 'Completely blind but possesses extreme auditory range. Crouch-walk silently, drop noisy items (clocks, airhorns), and do not talk over voice comms near the ship.',
    killable: true,
    weaponRequired: '4 Shovel Hits or Stun Grenade + Shotgun'
  },
  {
    id: 'forest_keeper',
    name: 'Forest Keeper (Giant)',
    location: 'Outdoor',
    powerLevel: 3,
    dangerRating: 'EXTREME (Instant Kill)',
    spawnMoons: ['Vow', 'March', 'Rend', 'Dine', 'Artifice'],
    counterplay: 'Immense wooden giant with sight-based vision. Hides behind trees, crouches in fog, and eats players alive. Break line-of-sight using fog or Radar Booster flash.',
    killable: false
  },
  {
    id: 'thumper',
    name: 'Thumper (Crawler)',
    location: 'Indoor',
    powerLevel: 3,
    dangerRating: 'HIGH',
    spawnMoons: ['Experimentation', 'Assurance', 'Offense', 'March'],
    counterplay: 'Deaf limbless beast that charges in straight lines at high speed. Takes sharp 90-degree corners to break momentum, or jump on railings/piping and whack 4 times with shovel.',
    killable: true,
    weaponRequired: '4 Shovel Hits (easiest from piping)'
  },
  {
    id: 'nutcracker',
    name: 'Nutcracker',
    location: 'Indoor',
    powerLevel: 2,
    dangerRating: 'HIGH',
    spawnMoons: ['Rend', 'Dine', 'Titan', 'Artifice'],
    counterplay: 'Marches in hallways. When eye pops out of head, freeze in place (motion detector). When it reloads shotgun shells, charge and whack with shovel to claim its Double-Barrel Shotgun & Ammo!',
    killable: true,
    weaponRequired: '4-5 Shovel Hits during reload cycle'
  },
  {
    id: 'old_bird',
    name: 'Old Bird (v50 Mech Robot)',
    location: 'Outdoor',
    powerLevel: 3,
    dangerRating: 'EXTREME (Instant Kill)',
    spawnMoons: ['Artifice', 'Embrion', 'Titan'],
    counterplay: 'Giant autonomous missile-firing mech. Wakes up at 3:00 PM or when total indoor power spikes. Uses flamethrowers and long-range missiles; stay indoors or use Jetpack.',
    killable: false
  }
];

export const LethalCompanyMonsterDangerRating: React.FC = () => {
  const [selectedMoon, setSelectedMoon] = useState<string>('Titan');
  const [timeOfDay, setTimeOfDay] = useState<string>('6:00 PM'); // 8:00 AM, 12:00 PM, 3:00 PM, 6:00 PM, 9:00 PM
  const [weatherCondition, setWeatherCondition] = useState<'Clear' | 'Foggy' | 'Eclipsed' | 'Stormy'>('Eclipsed');

  const MOONS = ['Experimentation', 'Assurance', 'Vow', 'Offense', 'March', 'Rend', 'Dine', 'Titan', 'Artifice'];

  // Calculations
  const metrics = useMemo(() => {
    // Filter monsters spawning on selected moon
    const moonMonsters = MONSTER_DATABASE.filter(m => m.spawnMoons.includes(selectedMoon));

    // Weather Multiplier
    const weatherMult = weatherCondition === 'Eclipsed' ? 2.5 : weatherCondition === 'Foggy' ? 1.4 : weatherCondition === 'Stormy' ? 1.2 : 1.0;

    // Time of day multiplier
    const timeMult = timeOfDay === '9:00 PM' ? 2.2 : timeOfDay === '6:00 PM' ? 1.7 : timeOfDay === '3:00 PM' ? 1.3 : 1.0;

    // Indoor Max Power Caps by Moon
    const maxIndoorPower = selectedMoon === 'Titan' ? 18 : selectedMoon === 'Artifice' ? 20 : selectedMoon === 'Rend' ? 10 : 6;
    const maxOutdoorPower = selectedMoon === 'Titan' ? 15 : selectedMoon === 'Artifice' ? 20 : selectedMoon === 'March' ? 12 : 8;

    // Calculated Danger Score (0-100%)
    const baseDanger = moonMonsters.reduce((acc, m) => acc + (m.powerLevel * 12), 0);
    const overallDangerPercent = Math.min(100, Math.round((baseDanger / 60) * 100 * weatherMult * timeMult / 2));

    return {
      moonMonsters,
      maxIndoorPower,
      maxOutdoorPower,
      overallDangerPercent,
      indoorCount: moonMonsters.filter(m => m.location === 'Indoor').length,
      outdoorCount: moonMonsters.filter(m => m.location === 'Outdoor').length
    };
  }, [selectedMoon, timeOfDay, weatherCondition]);

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Skull className="w-3.5 h-3.5" /> Bestiary Threat Matrix
              </span>
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold rounded-full">
                v50 Mech Rules Included
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Monster Spawn Weight & Danger Rating Tool
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Analyze moon indoor and outdoor spawn power limits, time-of-day spawn weight acceleration, Eclipsed weather dangers, and exact counterplay for Jester, Bracken, and Coil-Head.
            </p>
          </div>

          {/* Big Threat Level Badge */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Squad Danger Level</div>
              <div className={`text-2xl sm:text-3xl font-black ${metrics.overallDangerPercent >= 80 ? 'text-red-400' : metrics.overallDangerPercent >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {metrics.overallDangerPercent}% THREAT
              </div>
              <div className="text-[11px] text-slate-400">
                Moon: {selectedMoon} ({weatherCondition})
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${metrics.overallDangerPercent >= 80 ? 'bg-red-950/60 border-red-500/40 text-red-400' : 'bg-amber-950/60 border-amber-500/40 text-amber-400'}`}>
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Select Moon Bar */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Moon className="w-3.5 h-3.5 text-purple-400" /> Moon Target:
          </span>
          {MOONS.map(m => (
            <button
              key={m}
              onClick={() => setSelectedMoon(m)}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                selectedMoon === m
                  ? 'bg-purple-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls & Monster List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Environmental Time & Weather Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Environmental Threat Modifiers
            </h3>

            <div>
              <div className="text-xs text-slate-400 mb-1">Time of Day (Spawn Weight Accelerator)</div>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                {['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeOfDay(t)}
                    className={`py-1.5 rounded-lg border transition-all ${
                      timeOfDay === t ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1">Weather Condition</div>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                {(['Clear', 'Foggy', 'Stormy', 'Eclipsed'] as const).map(w => (
                  <button
                    key={w}
                    onClick={() => setWeatherCondition(w)}
                    className={`py-1.5 rounded-lg border transition-all ${
                      weatherCondition === w ? 'bg-red-500 text-white font-black' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {w} {w === 'Eclipsed' ? '(2.5x)' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Moon Power Caps Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
            <div className="text-slate-300 font-bold flex justify-between">
              <span>Indoor Power Capacity:</span>
              <span className="text-amber-400">{metrics.maxIndoorPower} Power Pips</span>
            </div>
            <div className="text-slate-300 font-bold flex justify-between">
              <span>Outdoor Power Capacity:</span>
              <span className="text-red-400">{metrics.maxOutdoorPower} Power Pips</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              Higher tier paid moons like Titan and Artifice allow up to 20 power pips of indoor/outdoor beasts spawning simultaneously!
            </p>
          </div>
        </div>

        {/* Right Column: Active Monster Bestiary Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Skull className="w-4 h-4 text-red-400" /> Active Bestiary Threats on {selectedMoon} ({metrics.moonMonsters.length})
            </h3>
            <span className="text-xs text-slate-400">
              {metrics.indoorCount} Indoor • {metrics.outdoorCount} Outdoor
            </span>
          </div>

          <div className="space-y-3">
            {metrics.moonMonsters.map(monster => (
              <div
                key={monster.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                        monster.location === 'Indoor' ? 'bg-purple-950 border border-purple-500/40 text-purple-300' : 'bg-red-950 border border-red-500/40 text-red-300'
                      }`}>
                        {monster.location} (Power {monster.powerLevel})
                      </span>
                      <span className="text-[10px] font-bold text-amber-400">
                        {monster.dangerRating}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white font-serif">{monster.name}</h4>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                      monster.killable ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-red-950 text-red-300 border border-red-500/30'
                    }`}>
                      {monster.killable ? `Killable (${monster.weaponRequired})` : 'UNKILLABLE'}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                  <strong className="text-amber-400">Survival Counterplay: </strong> {monster.counterplay}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LethalCompanyMonsterDangerRating;
