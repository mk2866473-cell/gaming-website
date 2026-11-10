import React, { useState, useMemo } from 'react';
import {
  Flame,
  ShieldAlert,
  Compass,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  MapPin,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface AltarLevelData {
  level: number;
  levelName: string;
  shroudPassageLevel: number;
  buildBoundarySize: string; // e.g. "80x80m"
  maxAltarsCount: number;
  unlockedRegions: string[];
  requiredMaterials: Array<{
    name: string;
    count: number;
    locationTip: string;
  }>;
}

const ALTAR_LEVELS: AltarLevelData[] = [
  {
    level: 1,
    levelName: 'Initial Flame Awakening',
    shroudPassageLevel: 1,
    buildBoundarySize: '80 x 80 meters',
    maxAltarsCount: 2,
    unlockedRegions: ['Springlands Surface', 'Low Meadows Entrance'],
    requiredMaterials: [] // Default starting altar
  },
  {
    level: 2,
    levelName: 'Sparks of Embervale',
    shroudPassageLevel: 2,
    buildBoundarySize: '100 x 100 meters',
    maxAltarsCount: 4,
    unlockedRegions: ['Low Meadows Shroud', 'Braelyn Bridge Shroud'],
    requiredMaterials: [
      { name: 'Resin', count: 5, locationTip: 'Chop down orange autumn trees in Springlands' },
      { name: 'Red Mushroom', count: 5, locationTip: 'Forage wild red mushrooms across Springlands grasslands' },
      { name: 'Bones', count: 5, locationTip: 'Loot from Wolves and Scavenger enemies' },
      { name: 'Animal Fur', count: 5, locationTip: 'Loot from hunting wild Rabbits, Wolves, and Goats' },
      { name: 'Liquid Shroud', count: 5, locationTip: 'Gather from glowing Shroud spores inside Shroud zones' },
      { name: 'Spark', count: 1, locationTip: 'Loot from Flame Sanctuaries and Flame Shrines' }
    ]
  },
  {
    level: 3,
    levelName: 'Revelwood Flame Passage',
    shroudPassageLevel: 3,
    buildBoundarySize: '120 x 120 meters',
    maxAltarsCount: 6,
    unlockedRegions: ['Revelwood Shroud', 'Diadwyn Ancient Spire', 'Blackmire'],
    requiredMaterials: [
      { name: 'Resin', count: 10, locationTip: 'Chop Birch and Autumn trees in Revelwood' },
      { name: 'Red Mushroom', count: 10, locationTip: 'Forage in Springlands forest floors' },
      { name: 'Bones', count: 10, locationTip: 'Loot from Scavengers and Boars in Revelwood' },
      { name: 'Animal Fur', count: 10, locationTip: 'Loot from Bears and Wolves' },
      { name: 'Liquid Shroud', count: 10, locationTip: 'Collect with flask from Shroud fungal bulbs' },
      { name: 'Spark', count: 1, locationTip: 'Loot from Revelwood Flame Shrines' },
      { name: 'Fell Thunderbrute Head', count: 1, locationTip: 'Defeat Fell Thunderbrute boss in Springlands Elixir Well' }
    ]
  },
  {
    level: 4,
    levelName: 'Nomad Highlands Ember',
    shroudPassageLevel: 4,
    buildBoundarySize: '140 x 140 meters',
    maxAltarsCount: 6,
    unlockedRegions: ['Nomad Highlands Shroud', 'Pillar of Creation', 'Umber Hollow'],
    requiredMaterials: [
      { name: 'Resin', count: 15, locationTip: 'Chop hardwood trees in Nomad Highlands' },
      { name: 'Red Mushroom', count: 15, locationTip: 'Forage or farm in Alchemist Seedbed' },
      { name: 'Bones', count: 15, locationTip: 'Loot from Nomad Scavenger camps' },
      { name: 'Animal Fur', count: 15, locationTip: 'Loot from Saber-toothed Tigers and Hounds' },
      { name: 'Liquid Shroud', count: 15, locationTip: 'Gather inside Deep Nomad Shroud roots' },
      { name: 'Spark', count: 1, locationTip: 'Loot from Nomad Highlands Flame Shrine' },
      { name: 'Scavenger Matron Head', count: 1, locationTip: 'Defeat Scavenger Matron in Revelwood Scavenger Camp' }
    ]
  },
  {
    level: 5,
    levelName: 'Kindlewastes Eternal Flame',
    shroudPassageLevel: 5,
    buildBoundarySize: '160 x 160 meters',
    maxAltarsCount: 8,
    unlockedRegions: ['Kindlewastes Red Shroud', 'Sun Temple', 'Brittlebush'],
    requiredMaterials: [
      { name: 'Resin', count: 20, locationTip: 'Chop Palm and Acacia trees in Kindlewastes' },
      { name: 'Red Mushroom', count: 20, locationTip: 'Farm in Farmer Seedbeds' },
      { name: 'Bones', count: 20, locationTip: 'Loot from Scorpion and Vukah enemies' },
      { name: 'Animal Fur', count: 20, locationTip: 'Loot from Kindlewastes Vultures and Lions' },
      { name: 'Liquid Shroud', count: 20, locationTip: 'Gather from Red Shroud roots' },
      { name: 'Spark', count: 1, locationTip: 'Loot from Kindlewastes Flame Shrine' },
      { name: 'Fell Wyvern Head', count: 1, locationTip: 'Defeat Fell Wyvern boss at Pike Castle Summit' }
    ]
  },
  {
    level: 6,
    levelName: 'Pinnacle Zenith Flame',
    shroudPassageLevel: 6,
    buildBoundarySize: '160 x 160 meters (Max Cap)',
    maxAltarsCount: 8,
    unlockedRegions: ['Endgame Red Shroud Immunity', 'M hollow Deep Roots', 'Albino Dragon Vaults'],
    requiredMaterials: [
      { name: 'Resin', count: 25, locationTip: 'Harvest high-tier hardwood' },
      { name: 'Red Mushroom', count: 25, locationTip: 'Harvest from Alchemist Seedbed' },
      { name: 'Bones', count: 25, locationTip: 'Loot from Elite Vukah Warriors' },
      { name: 'Animal Fur', count: 25, locationTip: 'Loot from Apex Predators' },
      { name: 'Liquid Shroud', count: 25, locationTip: 'Gather in Kindlewastes Elixir Wells' },
      { name: 'Spark', count: 1, locationTip: 'Loot from Zenith Flame Shrine' },
      { name: 'Sicklesyde Boss Head', count: 1, locationTip: 'Defeat Sicklesyde High Boss in Mountain Shroud Root' }
    ]
  }
];

export const EnshroudedFlameAltarCalculator: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  const upgradeSummary = useMemo(() => {
    const start = Math.min(currentLevel, targetLevel);
    const end = Math.max(currentLevel, targetLevel);

    const aggregatedMaterials: Record<string, { count: number; locationTip: string }> = {};

    for (let l = start + 1; l <= end; l++) {
      const levelData = ALTAR_LEVELS.find((a) => a.level === l);
      if (levelData) {
        levelData.requiredMaterials.forEach((mat) => {
          if (!aggregatedMaterials[mat.name]) {
            aggregatedMaterials[mat.name] = { count: 0, locationTip: mat.locationTip };
          }
          aggregatedMaterials[mat.name].count += mat.count;
        });
      }
    }

    const targetData = ALTAR_LEVELS.find((a) => a.level === end);

    return {
      startLevel: start,
      targetLevel: end,
      levelsDiff: end - start,
      aggregatedMaterials,
      finalPassageLevel: targetData ? targetData.shroudPassageLevel : 1,
      finalBoundary: targetData ? targetData.buildBoundarySize : '80x80m',
      finalMaxAltars: targetData ? targetData.maxAltarsCount : 2,
      unlockedRegions: targetData ? targetData.unlockedRegions : []
    };
  }, [currentLevel, targetLevel]);

  const copyManifest = () => {
    const lines = [
      `🔥 ENSHROUDED FLAME ALTAR UPGRADE MANIFEST`,
      `• Level Transition: Level ${upgradeSummary.startLevel} ➔ Level ${upgradeSummary.targetLevel}`,
      `• Target Shroud Passage Level: Passage Lv ${upgradeSummary.finalPassageLevel}`,
      `• Base Build Area Boundary: ${upgradeSummary.finalBoundary}`,
      `• Maximum Active Flame Altars: ${upgradeSummary.finalMaxAltars} Altars`,
      `• Total Sacrifice Materials Required:`,
      ...Object.entries(upgradeSummary.aggregatedMaterials).map(
        ([name, obj]) => `  - ${name}: x${obj.count} (${obj.locationTip})`
      )
    ];

    if (navigator.clipboard) {
      navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Header */}
      <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Flame Altar Upgrade Cost Calculator
            </h2>
            <p className="text-xs text-slate-400">
              Calculate exact boss heads, Sparks, and sacrifice resources needed to increase Shroud Passage Level and base boundaries.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Current Flame Altar Level:
          </label>
          <div className="grid grid-cols-6 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setCurrentLevel(lvl)}
                className={`py-2 text-xs font-bold font-mono rounded-lg border transition ${
                  currentLevel === lvl
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Lvl {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Target Target Flame Level:
          </label>
          <div className="grid grid-cols-6 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((lvl) => (
              <button
                key={lvl}
                disabled={lvl < currentLevel}
                onClick={() => setTargetLevel(lvl)}
                className={`py-2 text-xs font-bold font-mono rounded-lg border transition ${
                  targetLevel === lvl
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : lvl < currentLevel
                    ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Lvl {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Target Level Benefit Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Shroud Passage</span>
          <p className="text-2xl font-mono font-bold text-amber-400">Level {upgradeSummary.finalPassageLevel}</p>
        </div>
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Base Build Boundary</span>
          <p className="text-2xl font-mono font-bold text-cyan-400">{upgradeSummary.finalBoundary}</p>
        </div>
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Max Active Altars</span>
          <p className="text-2xl font-mono font-bold text-emerald-400">{upgradeSummary.finalMaxAltars} Altars</p>
        </div>
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Levels Upgraded</span>
          <p className="text-2xl font-mono font-bold text-purple-400">+{upgradeSummary.levelsDiff} Tiers</p>
        </div>
      </div>

      {/* Aggregated Sacrifice Materials List */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Total Sacrifice Materials Needed (Level {upgradeSummary.startLevel} ➔ {upgradeSummary.targetLevel})
          </h3>
          <button
            onClick={copyManifest}
            className="px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg flex items-center gap-1.5 font-mono transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Manifest'}
          </button>
        </div>

        {Object.keys(upgradeSummary.aggregatedMaterials).length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-4">
            Altar is already at or above target level. Select a higher target level above.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(upgradeSummary.aggregatedMaterials).map(([name, obj]) => (
              <div key={name} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{name}</span>
                  <span className="font-mono text-sm font-bold text-amber-400">x{obj.count}</span>
                </div>
                <p className="text-[11px] text-slate-400">💡 {obj.locationTip}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Region Unlocks Details */}
      <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2 text-xs">
        <span className="font-bold text-amber-400 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-amber-400" />
          Unlocked Shroud Regions at Level {upgradeSummary.targetLevel}:
        </span>
        <div className="flex flex-wrap gap-2 pt-1">
          {upgradeSummary.unlockedRegions.map((region, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 border border-slate-800 text-slate-300 font-semibold uppercase tracking-tighter text-[10px]"
            >
              ✓ {region}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnshroudedFlameAltarCalculator;
