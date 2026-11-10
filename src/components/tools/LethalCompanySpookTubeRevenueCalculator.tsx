import React, { useState, useMemo } from 'react';
import {
  Video,
  Eye,
  DollarSign,
  Tv,
  Film,
  Zap,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Sparkles,
  HelpCircle,
  Volume2,
  ShieldAlert
} from 'lucide-react';

interface MonsterSpookValue {
  id: string;
  name: string;
  tier: 'minor' | 'dangerous' | 'lethal';
  baseSpookViews: number;
  description: string;
}

const MONSTERS: MonsterSpookValue[] = [
  { id: 'snail', name: 'Snail / Shell Guy', tier: 'minor', baseSpookViews: 1200, description: 'Slow stalker monster. Easy to film for safe initial views.' },
  { id: 'whisk', name: 'Whisk / Slurper', tier: 'minor', baseSpookViews: 1800, description: 'Ceiling predator. High spook factor when grabbing players.' },
  { id: 'eye-guy', name: 'Eye Guy (Infiltrator)', tier: 'dangerous', baseSpookViews: 3500, description: 'Aggressive multi-eyed monster. High view multiplier when close up.' },
  { id: 'barnaby', name: 'Barnaby / Knokke', tier: 'dangerous', baseSpookViews: 4200, description: 'Heavy hammer/club monster. Causes instant player ragdolls.' },
  { id: 'spider', name: 'Web Spider', tier: 'dangerous', baseSpookViews: 3800, description: 'Traps players in webbing. High camera drama.' },
  { id: 'harvester', name: 'Harvester / Iron Maiden', tier: 'lethal', baseSpookViews: 8500, description: 'Extremely dangerous entity. S-tier SpookTube video viral potential.' },
  { id: 'flicker', name: 'Flicker / Ghost', tier: 'lethal', baseSpookViews: 9500, description: 'Appears in dim lighting. Instant view spike if filmed during flash.' }
];

export const LethalCompanySpookTubeRevenueCalculator: React.FC = () => {
  const [quotaLevel, setQuotaLevel] = useState<number>(1); // Quota 1 (3k), 2 (45k), 3 (110k), 4 (250k)
  const [selectedMonsters, setSelectedMonsters] = useState<string[]>(['snail', 'eye-guy']);
  const [hasIntroOutro, setHasIntroOutro] = useState<boolean>(true);
  const [ragdollsFilmed, setRagdollsFilmed] = useState<number>(2);
  const [playerDeathsFilmed, setPlayerDeathsFilmed] = useState<number>(1);
  const [screamsAndShouts, setScreamsAndShouts] = useState<boolean>(true);
  const [usedProps, setUsedProps] = useState<Record<string, boolean>>({
    mic: true,
    shockStick: false,
    soundPlayer: false
  });
  const [cameraStatus, setCameraStatus] = useState<'extracted' | 'recovered' | 'lost'>('extracted');

  const toggleMonster = (id: string) => {
    setSelectedMonsters((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleProp = (key: string) => {
    setUsedProps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const quotaRequirements: Record<number, { targetViews: number; quotaName: string }> = {
    1: { targetViews: 3000, quotaName: 'Quota 1 (3,000 Views)' },
    2: { targetViews: 45000, quotaName: 'Quota 2 (45,000 Views)' },
    3: { targetViews: 110000, quotaName: 'Quota 3 (110,000 Views)' },
    4: { targetViews: 250000, quotaName: 'Quota 4 (250,000 Views)' },
    5: { targetViews: 500000, quotaName: 'Quota 5+ (500,000+ Views)' }
  };

  const viewCalculation = useMemo(() => {
    if (cameraStatus === 'lost') {
      return {
        totalViews: 0,
        adRevenueDollars: 0,
        quotaTarget: quotaRequirements[quotaLevel].targetViews,
        passedQuota: false,
        spookBreakdown: { monsterViews: 0, playerActionViews: 0, propViews: 0 }
      };
    }

    // Base monster spook views
    let monsterViews = selectedMonsters.reduce((sum, id) => {
      const monster = MONSTERS.find((m) => m.id === id);
      return sum + (monster ? monster.baseSpookViews : 0);
    }, 0);

    // Multiply monster views if multiple unique monsters are filmed in the same video (Syrnergy viral boost)
    if (selectedMonsters.length >= 3) {
      monsterViews = Math.round(monsterViews * 1.35);
    }

    // Player action views
    let playerActionViews = 0;
    if (hasIntroOutro) playerActionViews += 1200; // Face camera intro/outro greeting
    if (screamsAndShouts) playerActionViews += 1800; // Microphone audio peaks & screams
    playerActionViews += ragdollsFilmed * 2200; // Player ragdoll falls & monster impacts
    playerActionViews += playerDeathsFilmed * 4500; // Player death on camera

    // Props & sound equipment boosts
    let propViews = 0;
    if (usedProps.mic) propViews += 2000;
    if (usedProps.shockStick) propViews += 3500;
    if (usedProps.soundPlayer) propViews += 2500;

    let totalViews = monsterViews + playerActionViews + propViews;

    // Apply recovered camera 60% view penalty if camera was lost and retrieved next day
    if (cameraStatus === 'recovered') {
      totalViews = Math.round(totalViews * 0.4);
    }

    // Calculate SpookTube Ad-Revenue ($ conversion ~ $1 per 100 views)
    const adRevenueDollars = Math.round(totalViews * 0.012);
    const quotaTarget = quotaRequirements[quotaLevel].targetViews;
    const passedQuota = totalViews >= quotaTarget;

    return {
      totalViews,
      adRevenueDollars,
      quotaTarget,
      passedQuota,
      spookBreakdown: { monsterViews, playerActionViews, propViews }
    };
  }, [
    quotaLevel,
    selectedMonsters,
    hasIntroOutro,
    ragdollsFilmed,
    playerDeathsFilmed,
    screamsAndShouts,
    usedProps,
    cameraStatus
  ]);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Title */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">SpookTube Viral Views & Ad-Revenue Calculator</h2>
            <p className="text-xs text-slate-400">
              Content Warning Focus: Calculate viral video spookiness, monster encounter view multipliers, and shop upgrade earnings.
            </p>
          </div>
        </div>
      </div>

      {/* Quota & Camera Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-2 mb-2">
            <Tv className="w-4 h-4 text-purple-400" />
            SpookTube Quota Tier
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setQuotaLevel(lvl)}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  quotaLevel === lvl
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:border-slate-600'
                }`}
              >
                Q#{lvl}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-purple-300 font-mono mt-2 text-right font-bold">
            Target: {quotaRequirements[quotaLevel].targetViews.toLocaleString()} Views
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-2 mb-2">
            <Film className="w-4 h-4 text-amber-400" />
            Camera Extraction Outcome
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'extracted', label: 'Safely Extracted', desc: '100% Views' },
              { id: 'recovered', label: 'Retrieved Day+1', desc: '40% Views' },
              { id: 'lost', label: 'Lost Forever', desc: '0 Views' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setCameraStatus(st.id as any)}
                className={`py-2 px-1.5 text-center rounded-lg border transition-all ${
                  cameraStatus === st.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="text-xs font-bold">{st.label}</div>
                <div className="text-[10px] opacity-75">{st.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Content Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monsters Filmed */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <h3 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" /> Filmed Monsters & Entities
          </h3>
          <div className="space-y-2">
            {MONSTERS.map((monster) => {
              const isSelected = selectedMonsters.includes(monster.id);
              return (
                <div
                  key={monster.id}
                  onClick={() => toggleMonster(monster.id)}
                  className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-red-500/10 border-red-500/50 text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold flex items-center gap-2">
                      {monster.name}
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded uppercase font-bold ${
                          monster.tier === 'lethal'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : monster.tier === 'dangerous'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {monster.tier}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{monster.description}</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-red-400">
                    +{monster.baseSpookViews.toLocaleString()} v
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Player Actions & Equipment */}
        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400" /> Player Drama & Screams
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 cursor-pointer">
                <span>Camera Intro & Outro Speech (+1,200 v)</span>
                <input
                  type="checkbox"
                  checked={hasIntroOutro}
                  onChange={(e) => setHasIntroOutro(e.target.checked)}
                  className="accent-cyan-500 w-4 h-4 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 cursor-pointer">
                <span>Mic Audio Screams & Shouts (+1,800 v)</span>
                <input
                  type="checkbox"
                  checked={screamsAndShouts}
                  onChange={(e) => setScreamsAndShouts(e.target.checked)}
                  className="accent-cyan-500 w-4 h-4 rounded"
                />
              </label>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800">
                <span>Player Ragdolls Filmed (+2,200 v each)</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRagdollsFilmed((p) => Math.max(0, p - 1))}
                    className="w-6 h-6 bg-slate-800 text-white rounded font-bold"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-cyan-300 w-4 text-center">{ragdollsFilmed}</span>
                  <button
                    onClick={() => setRagdollsFilmed((p) => Math.min(5, p + 1))}
                    className="w-6 h-6 bg-slate-800 text-white rounded font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800">
                <span>Player Deceases Filmed (+4,500 v each)</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlayerDeathsFilmed((p) => Math.max(0, p - 1))}
                    className="w-6 h-6 bg-slate-800 text-white rounded font-bold"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-rose-400 w-4 text-center">{playerDeathsFilmed}</span>
                  <button
                    onClick={() => setPlayerDeathsFilmed((p) => Math.min(4, p + 1))}
                    className="w-6 h-6 bg-slate-800 text-white rounded font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Filming Equipment & Props
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { key: 'mic', label: 'Reporter Microphone (+2,000 v)' },
                { key: 'shockStick', label: 'Shock Stick Electrocution (+3,500 v)' },
                { key: 'soundPlayer', label: 'Sound Player Sfx (+2,500 v)' }
              ].map((prop) => (
                <label
                  key={prop.key}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 cursor-pointer"
                >
                  <span>{prop.label}</span>
                  <input
                    type="checkbox"
                    checked={usedProps[prop.key]}
                    onChange={() => toggleProp(prop.key)}
                    className="accent-amber-500 w-4 h-4 rounded"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Banner */}
      <div
        className={`p-5 rounded-xl border transition-all ${
          viewCalculation.passedQuota
            ? 'bg-emerald-500/10 border-emerald-500/40'
            : 'bg-rose-500/10 border-rose-500/40'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {viewCalculation.passedQuota ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-400" />
            )}
            <div>
              <h3 className="font-bold text-white text-base">
                {viewCalculation.passedQuota ? 'SpookTube Quota PASSED!' : 'Quota FAILED - Need More Views!'}
              </h3>
              <p className="text-xs text-slate-400">
                {viewCalculation.passedQuota
                  ? 'Your viral video surpassed the subscriber quota threshold!'
                  : 'Filming unsafe monsters or losing cameras causes video failure.'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Estimated Revenue</span>
            <p className="text-2xl font-mono font-bold text-emerald-400">${viewCalculation.adRevenueDollars}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Estimated Views</span>
            <p className="text-xl font-mono font-bold text-white">
              {viewCalculation.totalViews.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Quota Requirement</span>
            <p className="text-xl font-mono font-bold text-purple-300">
              {viewCalculation.quotaTarget.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Margin Delta</span>
            <p
              className={`text-xl font-mono font-bold ${
                viewCalculation.totalViews >= viewCalculation.quotaTarget ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {(viewCalculation.totalViews - viewCalculation.quotaTarget).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LethalCompanySpookTubeRevenueCalculator;
