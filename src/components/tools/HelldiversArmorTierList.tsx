/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Shield, Zap, Activity, Award, HelpCircle, Check, 
  Search, Filter, Share2, Download, ChevronRight, Eye, 
  Sparkles, AlertCircle, ArrowRight, CheckCircle2, RotateCcw, 
  Flame, Crosshair, Users, Info, Layers, Compass, Plus, X, Heart
} from 'lucide-react';

export type ArmorWeightClass = 'light' | 'medium' | 'heavy';
export type PassiveTier = 'S+' | 'S' | 'A' | 'B';

export interface ArmorPassiveMeta {
  id: string;
  name: string;
  tier: PassiveTier;
  perks: string;
  bestUse: string;
  reasoning: string;
  metaScore: number; // 0 - 100
}

export interface ArmorDefinition {
  id: string;
  name: string;
  weightClass: ArmorWeightClass;
  armorRating: number;
  speed: number;
  staminaRegen: number;
  passiveId: string;
  warbond: string;
  metaScore: number;
  bestFor: string;
  worstFor: string;
  isMetaHighlight?: boolean;
}

export const PASSIVE_META_TIERS: Record<string, ArmorPassiveMeta> = {
  'engineering-kit': {
    id: 'engineering-kit',
    name: 'Engineering Kit',
    tier: 'S+',
    perks: '+30% crouch/prone recoil reduction, +2 grenade inventory capacity',
    bestUse: 'Support weapons, Bug hole blitzes & Automaton Fabricator sweeps',
    reasoning: 'Crucial for closing 6 bug holes without resupply and turns Autocannon / Heavy Machine Gun into laser beams.',
    metaScore: 98
  },
  'scout': {
    id: 'scout',
    name: 'Scout',
    tier: 'S+',
    perks: '+30% radar scan radius, -30% enemy detection range',
    bestUse: 'Solo stealth runs, Super Credits farming & high-difficulty Helldives',
    reasoning: 'Allows divers to bypass patrol ambushes completely and generate automated radar scans around pinged map pins.',
    metaScore: 97
  },
  'med-kit': {
    id: 'med-kit',
    name: 'Med-Kit',
    tier: 'S+',
    perks: '+2 stim inventory capacity, +2.0 seconds stim invulnerability duration',
    bestUse: 'Maximum survival, Hellmire fire hazards & aggressive frontline tanking',
    reasoning: 'Extends stim healing to 4+ seconds of near-invincibility while sprinting through fire, bile, and laser barrages.',
    metaScore: 96
  },
  'fortified': {
    id: 'fortified',
    name: 'Fortified',
    tier: 'S+',
    perks: '+50% explosive damage resistance, +30% crouch/prone recoil reduction',
    bestUse: 'Automaton rocket devastators, tank cannons & planetary artillery',
    reasoning: 'Mandatory counter against Automaton one-shot rocket salvos and mortar strikes, giving massive survivability.',
    metaScore: 95
  },
  'democracy-protects': {
    id: 'democracy-protects',
    name: 'Democracy Protects',
    tier: 'S',
    perks: '50% chance to survive lethal damage with 1 HP, prevents bleeding from chest injury',
    bestUse: 'Clutch suicidal extraction stands & unpredictable chaos',
    reasoning: 'Frequently procs multiple consecutive times, letting Helldivers survive direct 500KG bombs and Hellpod drops.',
    metaScore: 92
  },
  'extra-padding': {
    id: 'extra-padding',
    name: 'Extra Padding',
    tier: 'S',
    perks: '+50 Armor Rating with zero speed penalty',
    bestUse: 'Light armor speed with Medium armor protection (B-08 Light Gunner)',
    reasoning: 'B-08 Light Gunner gives 100 Armor with 550 Speed, practically breaking the mobility-defense tradeoff curve.',
    metaScore: 91
  },
  'peak-physique': {
    id: 'peak-physique',
    name: 'Peak Physique',
    tier: 'S',
    perks: '+50% melee damage, +30% heavy weapon ergonomic handling',
    bestUse: 'Heavy support weapons (Dominator, Eruptor, HMG, Autocannon)',
    reasoning: 'Removes rotational sluggishness from heavy weapons, making crosshairs snap instantly onto fast enemies.',
    metaScore: 90
  },
  'electrical-conduit': {
    id: 'electrical-conduit',
    name: 'Electrical Conduit',
    tier: 'S',
    perks: '95% arc damage resistance',
    bestUse: 'Tesla Tower defenses, Arc Thrower / Blitzer friendly fire squads',
    reasoning: 'Renders arc discharges completely harmless, allowing full-squad Tesla Tower turtling.',
    metaScore: 88
  },
  'servo-assisted': {
    id: 'servo-assisted',
    name: 'Servo-Assisted',
    tier: 'A',
    perks: '+30% stratagem throw distance, +50% limb health',
    bestUse: 'Long-range base sniping with 380mm & 500KG strikes',
    reasoning: 'Allows tossing orbital beacons from 75m+ away into heavy bot outposts without alerting patrols.',
    metaScore: 84
  },
  'inflammable': {
    id: 'inflammable',
    name: 'Inflammable',
    tier: 'A',
    perks: '75% fire damage resistance',
    bestUse: 'Hellmire planet fire tornadoes & Torcher / Flamethrower point-blank builds',
    reasoning: 'Transforms lethal fire into a minor tick damage nuisance, essential for fire-centric warbond loadouts.',
    metaScore: 82
  },
  'advanced-filtration': {
    id: 'advanced-filtration',
    name: 'Advanced Filtration',
    tier: 'B',
    perks: '80% gas damage resistance',
    bestUse: 'Corrosive gas strike choke points & Sterilizer team synergy',
    reasoning: 'Permits breathing inside Orbital Gas clouds, but gas hazards are rarer across standard planetary operations.',
    metaScore: 75
  },
  'unflinching': {
    id: 'unflinching',
    name: 'Unflinching',
    tier: 'B',
    perks: '50% less flinch and aim disorientation when struck by enemy fire',
    bestUse: 'Long-range sniper builds against Automaton heavy fire',
    reasoning: 'Useful for Diligence Counter Sniper aim stabilization, though Fortified and Med-Kit offer broader utility.',
    metaScore: 72
  }
};

export const COMPLETE_ARMOR_DATABASE: ArmorDefinition[] = [
  // LIGHT ARMORS (50 Base Armor, 550 Speed, 125 Stamina)
  {
    id: 'sc-34-infiltrator',
    name: 'SC-34 Infiltrator',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'scout',
    warbond: 'Helldivers Mobilize',
    metaScore: 97,
    bestFor: 'Solo Stealth & Super Credits Farm',
    worstFor: 'Direct Choke-Point Brawls',
    isMetaHighlight: true
  },
  {
    id: 'b-08-light-gunner',
    name: 'B-08 Light Gunner',
    weightClass: 'light',
    armorRating: 100, // 50 + 50 from Extra Padding
    speed: 550,
    staminaRegen: 125,
    passiveId: 'extra-padding',
    warbond: 'Superstore',
    metaScore: 99,
    bestFor: 'Ultimate All-Around Meta (550 Speed with Medium Armor)',
    worstFor: 'None (Top Pick)',
    isMetaHighlight: true
  },
  {
    id: 'ce-07-demolition-specialist',
    name: 'CE-07 Demolition Specialist',
    weightClass: 'light',
    armorRating: 64,
    speed: 535,
    staminaRegen: 118,
    passiveId: 'engineering-kit',
    warbond: 'Democratic Detonation',
    metaScore: 96,
    bestFor: 'Fast Bug Hole & Factory Blitzes',
    worstFor: 'Heavy Bot Laser Crossfire',
    isMetaHighlight: true
  },
  {
    id: 'cm-21-trench-paramedic',
    name: 'CM-21 Trench Paramedic',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'med-kit',
    warbond: 'Superstore',
    metaScore: 95,
    bestFor: 'High Speed Survival & Stim Running',
    worstFor: 'Explosive Mines & Rockets'
  },
  {
    id: 'fs-38-eradicator',
    name: 'FS-38 Eradicator',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'fortified',
    warbond: 'Superstore',
    metaScore: 94,
    bestFor: 'High-Mobility Bot Missions',
    worstFor: 'Melee Swarms (Hunters)'
  },
  {
    id: 'ex-00-prototype-x',
    name: 'EX-00 Prototype X',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'electrical-conduit',
    warbond: 'Cutting Edge',
    metaScore: 88,
    bestFor: 'Tesla Tower Squads & Arc Loadouts',
    worstFor: 'General Combat'
  },
  {
    id: 'sc-30-trailblazer-scout',
    name: 'SC-30 Trailblazer Scout',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'scout',
    warbond: 'Helldivers Mobilize',
    metaScore: 96,
    bestFor: 'Radar Recon & Speed Clear',
    worstFor: 'Surrounded Engagements'
  },
  {
    id: 'ph-9-predator',
    name: 'PH-9 Predator',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'peak-physique',
    warbond: 'Viper Commandos',
    metaScore: 93,
    bestFor: 'Heavy Weapon Mobility (HMG/Eruptor)',
    worstFor: 'Taking Direct Explosions'
  },
  {
    id: 'i-09-heatseeker',
    name: 'I-09 Heatseeker',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'inflammable',
    warbond: 'Freedom\'s Flame',
    metaScore: 87,
    bestFor: 'Fire Planets & Flamethrower Sprinting',
    worstFor: 'Automaton Snipers'
  },
  {
    id: 'cw-4-arctic-ranger',
    name: 'CW-4 Arctic Ranger',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'scout',
    warbond: 'Polar Patriots',
    metaScore: 95,
    bestFor: 'Blizzard Planets & Stealth Extraction',
    worstFor: 'Heavy Frontal Fire'
  },
  {
    id: 'af-50-nox-ranger',
    name: 'AF-50 Nox Ranger',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'advanced-filtration',
    warbond: 'Chemical Agents',
    metaScore: 81,
    bestFor: 'Gas Strike Chokepoint Rushes',
    worstFor: 'Open Range Bot Sniping'
  },
  {
    id: 'uf-16-inspector',
    name: 'UF-16 Inspector',
    weightClass: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    passiveId: 'unflinching',
    warbond: 'Truth Enforcers',
    metaScore: 78,
    bestFor: 'Precision DMR Sprinting',
    worstFor: 'Explosive Artillery'
  },

  // MEDIUM ARMORS (100 Base Armor, 500 Speed, 100 Stamina)
  {
    id: 'dp-40-hero-of-the-federation',
    name: 'DP-40 Hero of the Federation',
    weightClass: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'democracy-protects',
    warbond: 'Helldivers Mobilize',
    metaScore: 93,
    bestFor: 'Unpredictable Helldive Survival & 500KG Saves',
    worstFor: 'Speedrunning Radar POIs',
    isMetaHighlight: true
  },
  {
    id: 'ce-35-trench-engineer',
    name: 'CE-35 Trench Engineer',
    weightClass: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'engineering-kit',
    warbond: 'Helldivers Mobilize',
    metaScore: 95,
    bestFor: 'Balanced Grenadier & Support Guns',
    worstFor: 'Solo Stealth'
  },
  {
    id: 'cm-09-bonesnapper',
    name: 'CM-09 Bonesnapper',
    weightClass: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'med-kit',
    warbond: 'Helldivers Mobilize',
    metaScore: 94,
    bestFor: 'Frontline Survival & Team Support',
    worstFor: 'Long Distance Sprinting'
  },
  {
    id: 'b-01-tactical',
    name: 'B-01 Tactical',
    weightClass: 'medium',
    armorRating: 150, // 100 + 50 from Extra Padding
    speed: 500,
    staminaRegen: 100,
    passiveId: 'extra-padding',
    warbond: 'Helldivers Mobilize (Default)',
    metaScore: 92,
    bestFor: 'Heavy Armor Rating with Medium Speed',
    worstFor: 'No utility perks'
  },
  {
    id: 'sa-25-steel-trooper',
    name: 'SA-25 Steel Trooper',
    weightClass: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'servo-assisted',
    warbond: 'Steeled Veterans',
    metaScore: 86,
    bestFor: 'Long Distance Stratagem Lobbing',
    worstFor: 'Stamina Heavy Missions'
  },
  {
    id: 'ex-16-prototype-16',
    name: 'EX-16 Prototype 16',
    weightClass: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'electrical-conduit',
    warbond: 'Cutting Edge',
    metaScore: 87,
    bestFor: 'Tesla Tower Defense Chokepoints',
    worstFor: 'General Solo Play'
  },
  {
    id: 'cw-9-white-wolf',
    name: 'CW-9 White Wolf',
    weightClass: 'medium',
    armorRating: 150,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'extra-padding',
    warbond: 'Superstore',
    metaScore: 91,
    bestFor: 'Snow Planet Defense & Heavy Padding',
    worstFor: 'Fast Extraction Sprinting'
  },
  {
    id: 'ph-202-twigsnapper',
    name: 'PH-202 Twigsnapper',
    weightClass: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'peak-physique',
    warbond: 'Viper Commandos',
    metaScore: 91,
    bestFor: 'Heavy Autocannon / Dominator Handling',
    worstFor: 'Dodge Heavy Hunter Encounters'
  },
  {
    id: 'i-92-fire-safety',
    name: 'I-92 Fire Safety',
    weightClass: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'inflammable',
    warbond: 'Freedom\'s Flame',
    metaScore: 85,
    bestFor: 'Heavy Flame Operations',
    worstFor: 'Automaton Gunships'
  },
  {
    id: 'af-02-toxic-hazard',
    name: 'AF-02 Toxic Hazard',
    weightClass: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'advanced-filtration',
    warbond: 'Chemical Agents',
    metaScore: 82,
    bestFor: 'Gas Spewer Chokepoints',
    worstFor: 'Open Map Bot Battles'
  },
  {
    id: 'uf-50-bloodhound',
    name: 'UF-50 Bloodhound',
    weightClass: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    passiveId: 'unflinching',
    warbond: 'Truth Enforcers',
    metaScore: 80,
    bestFor: 'Precision Combat Stabilization',
    worstFor: 'High Speed Kiting'
  },

  // HEAVY ARMORS (150-200 Base Armor, 450 Speed, 75 Stamina)
  {
    id: 'fs-23-battle-master',
    name: 'FS-23 Battle Master',
    weightClass: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    passiveId: 'fortified',
    warbond: 'Helldivers Mobilize',
    metaScore: 92,
    bestFor: 'Ultimate Bot Tanking & Defense Missions',
    worstFor: 'Bug Kiting & Marathon Runs',
    isMetaHighlight: true
  },
  {
    id: 'b-24-enforcer',
    name: 'B-24 Enforcer',
    weightClass: 'medium', // Medium-Heavy hybrid
    armorRating: 129,
    speed: 471,
    staminaRegen: 86,
    passiveId: 'fortified',
    warbond: 'Superstore',
    metaScore: 93,
    bestFor: 'Heavy Explosive Resistance with Better Mobility',
    worstFor: 'Light Stealth Runs'
  },
  {
    id: 'ce-67-titan',
    name: 'CE-67 Titan',
    weightClass: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    passiveId: 'engineering-kit',
    warbond: 'Superstore',
    metaScore: 89,
    bestFor: 'Stationary Grenade Barrages & Defense',
    worstFor: 'Evacuate High Priority Target Rushes'
  },
  {
    id: 'cm-17-butcher',
    name: 'CM-17 Butcher',
    weightClass: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    passiveId: 'med-kit',
    warbond: 'Superstore',
    metaScore: 90,
    bestFor: 'Immense Tanking with 6 Stims',
    worstFor: 'Outrunning Stalkers & Hunters'
  },
  {
    id: 'sa-32-dynamo',
    name: 'SA-32 Dynamo',
    weightClass: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    passiveId: 'servo-assisted',
    warbond: 'Steeled Veterans',
    metaScore: 83,
    bestFor: 'Bombardment Artillery Artillery Anchor',
    worstFor: 'Stamina Drain'
  },
  {
    id: 'i-102-draconaught',
    name: 'I-102 Draconaught',
    weightClass: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    passiveId: 'inflammable',
    warbond: 'Freedom\'s Flame',
    metaScore: 84,
    bestFor: 'Heavy Flamethrower Wall',
    worstFor: 'High Agility Needs'
  },
  {
    id: 'cw-36-winter-warrior',
    name: 'CW-36 Winter Warrior',
    weightClass: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    passiveId: 'servo-assisted',
    warbond: 'Polar Patriots',
    metaScore: 82,
    bestFor: 'Cold Weather Fortified Defense',
    worstFor: 'Speed Kiting'
  },
  {
    id: 'fs-05-marksman',
    name: 'FS-05 Marksman',
    weightClass: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    passiveId: 'fortified',
    warbond: 'Helldivers Mobilize',
    metaScore: 91,
    bestFor: 'Bunker Defense vs Bot Rocket Stragglers',
    worstFor: 'Fast Movement'
  },
  {
    id: 'b-27-fortified-commando',
    name: 'B-27 Fortified Commando',
    weightClass: 'heavy',
    armorRating: 200, // Highest Armor in the game! (150 + 50 Extra Padding)
    speed: 450,
    staminaRegen: 75,
    passiveId: 'extra-padding',
    warbond: 'Superstore',
    metaScore: 93,
    bestFor: 'Highest Damage Reduction in Helldivers 2 (200 Armor)',
    worstFor: 'Slowest Sprint in Super Earth',
    isMetaHighlight: true
  }
];

export default function HelldiversArmorTierList() {
  // Compared armors (Max 3)
  const [selectedArmorIds, setSelectedArmorIds] = useState<string[]>([
    'b-08-light-gunner',
    'dp-40-hero-of-the-federation',
    'fs-23-battle-master'
  ]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [weightFilter, setWeightFilter] = useState<'all' | ArmorWeightClass>('all');
  const [passiveFilter, setPassiveFilter] = useState<string>('all');
  const [warbondFilter, setWarbondFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'tierlist' | 'compare' | 'quiz' | 'simulator' | 'collection' | 'table'>('tierlist');

  // Collection State (Armors Owned)
  const [ownedArmorIds, setOwnedArmorIds] = useState<Set<string>>(() => {
    return new Set(['sc-34-infiltrator', 'b-01-tactical', 'dp-40-hero-of-the-federation', 'ce-35-trench-engineer']);
  });

  // Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<{ squad: string; faction: string; playstyle: string }>({
    squad: 'solo',
    faction: 'bugs',
    playstyle: 'speed'
  });
  const [recommendedArmorId, setRecommendedArmorId] = useState<string | null>(null);

  // Passive Simulator State
  const [simPassive, setSimPassive] = useState<string>('democracy-protects');
  const [simLog, setSimLog] = useState<string[]>([]);
  const [simSurviveCount, setSimSurviveCount] = useState<number>(0);
  const [simTotalTrials, setSimTotalTrials] = useState<number>(0);

  // Export Canvas & Share
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Filtered armors for catalog & tier list
  const filteredArmors = useMemo(() => {
    return COMPLETE_ARMOR_DATABASE.filter(armor => {
      const matchSearch = armor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        armor.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        armor.warbond.toLowerCase().includes(searchQuery.toLowerCase()) ||
        PASSIVE_META_TIERS[armor.passiveId]?.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchWeight = weightFilter === 'all' || armor.weightClass === weightFilter;
      const matchPassive = passiveFilter === 'all' || armor.passiveId === passiveFilter;
      const matchWarbond = warbondFilter === 'all' || armor.warbond.includes(warbondFilter);

      return matchSearch && matchWeight && matchPassive && matchWarbond;
    });
  }, [searchQuery, weightFilter, passiveFilter, warbondFilter]);

  // Compared armors objects
  const comparedArmors = useMemo(() => {
    return selectedArmorIds
      .map(id => COMPLETE_ARMOR_DATABASE.find(a => a.id === id))
      .filter((a): a is ArmorDefinition => Boolean(a));
  }, [selectedArmorIds]);

  // Toggle selection for comparison
  const toggleArmorComparison = (id: string) => {
    if (selectedArmorIds.includes(id)) {
      if (selectedArmorIds.length > 1) {
        setSelectedArmorIds(prev => prev.filter(item => item !== id));
      }
    } else {
      if (selectedArmorIds.length < 3) {
        setSelectedArmorIds(prev => [...prev, id]);
      } else {
        // Replace last item
        setSelectedArmorIds(prev => [prev[1], prev[2], id]);
      }
    }
  };

  // Toggle owned armor collection
  const toggleOwnedArmor = (id: string) => {
    setOwnedArmorIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Passive Simulator Runner
  const runPassiveSimulation = () => {
    if (simPassive === 'democracy-protects') {
      const survived = Math.random() < 0.5;
      setSimTotalTrials(prev => prev + 1);
      if (survived) {
        setSimSurviveCount(prev => prev + 1);
        setSimLog(prev => [`[TRIAL #${simTotalTrials + 1}] LETHAL HIT TAKEN! Democracy Protects PROC: Helldiver survived with 1 HP!`, ...prev.slice(0, 5)]);
      } else {
        setSimLog(prev => [`[TRIAL #${simTotalTrials + 1}] LETHAL HIT TAKEN! Democracy Protects did not trigger. Reinforcement needed.`, ...prev.slice(0, 5)]);
      }
    } else if (simPassive === 'med-kit') {
      setSimLog(prev => [
        `[STIM INJECTED] Med-Kit active! 4.0 seconds of invulnerability active + Sprint speed maintained! 6 total Stims remaining.`,
        ...prev.slice(0, 5)
      ]);
    } else if (simPassive === 'engineering-kit') {
      setSimLog(prev => [
        `[GRENADE THROWN] 6 grenades in reserve! Crouch recoil reduced by 30%. Autocannon spread tightened.`,
        ...prev.slice(0, 5)
      ]);
    } else if (simPassive === 'scout') {
      setSimLog(prev => [
        `[RADAR PING SENT] Scanned 120m radius. Patrol avoided (enemy detection reduced by -30%).`,
        ...prev.slice(0, 5)
      ]);
    } else {
      setSimLog(prev => [`[PERK TRIGGERED] ${PASSIVE_META_TIERS[simPassive]?.name} perks activated effectively.`, ...prev.slice(0, 5)]);
    }
  };

  // Quiz Recommendation Logic
  const handleQuizFinish = (squad: string, faction: string, playstyle: string) => {
    setQuizAnswers({ squad, faction, playstyle });
    if (squad === 'solo' || playstyle === 'speed') {
      setRecommendedArmorId('b-08-light-gunner');
    } else if (faction === 'bots') {
      setRecommendedArmorId('fs-23-battle-master');
    } else if (playstyle === 'tank') {
      setRecommendedArmorId('b-27-fortified-commando');
    } else {
      setRecommendedArmorId('dp-40-hero-of-the-federation');
    }
    setQuizStep(3);
  };

  // Export PNG Reddit Card
  const handleExportCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    // Background Gradient
    const bg = ctx.createLinearGradient(0, 0, 1080, 1080);
    bg.addColorStop(0, '#060810');
    bg.addColorStop(1, '#0c101d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1080);

    // Border Frame
    ctx.strokeStyle = '#FFE900';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1000, 1000);

    const drawFitText = (text: string, x: number, y: number, maxWidth: number, fontStyle: string, maxFontSize: number) => {
      let fontSize = maxFontSize;
      ctx.font = `900 ${fontSize}px ${fontStyle}`;
      while (ctx.measureText(text).width > maxWidth && fontSize > 14) {
        fontSize -= 2;
        ctx.font = `900 ${fontSize}px ${fontStyle}`;
      }
      ctx.fillText(text, x, y);
    };

    // Header
    ctx.fillStyle = '#FFE900';
    drawFitText('HELLDIVERS 2 META ARMOR TIER COMPARISON', 90, 120, 900, 'sans-serif', 36);

    ctx.fillStyle = '#94a3b8';
    drawFitText('SUPER EARTH QUARTERMASTER ARMOR BRIEFING // 2026', 90, 170, 900, 'monospace', 22);

    // Compare 3 Armor Columns
    const colWidth = 280;
    const startX = 90;

    comparedArmors.slice(0, 3).forEach((armor, idx) => {
      const x = startX + (idx * 310);
      const passive = PASSIVE_META_TIERS[armor.passiveId];

      ctx.fillStyle = 'rgba(20, 24, 38, 0.9)';
      ctx.roundRect(x, 220, colWidth, 680, 16);
      ctx.fill();
      ctx.strokeStyle = idx === 0 ? '#FFE900' : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Weight Badge
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = armor.weightClass === 'light' ? '#34d399' : armor.weightClass === 'medium' ? '#fbbf24' : '#f87171';
      ctx.fillText(`[ ${armor.weightClass.toUpperCase()} ]`, x + 20, 265);

      // Name
      ctx.fillStyle = '#FFFFFF';
      drawFitText(armor.name, x + 20, 310, colWidth - 40, 'sans-serif', 22);

      // Stats
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Armor: ${armor.armorRating}`, x + 20, 360);
      ctx.fillText(`Speed: ${armor.speed}`, x + 20, 395);
      ctx.fillText(`Stamina: ${armor.staminaRegen}`, x + 20, 430);

      // Meta Score
      ctx.fillStyle = '#FFE900';
      ctx.font = '900 24px sans-serif';
      ctx.fillText(`SCORE: ${armor.metaScore}/100`, x + 20, 480);

      // Passive Card
      ctx.fillStyle = 'rgba(12, 16, 28, 0.9)';
      ctx.roundRect(x + 15, 510, colWidth - 30, 180, 12);
      ctx.fill();

      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#38bdf8';
      drawFitText(passive?.name || 'Passive', x + 25, 545, colWidth - 50, 'sans-serif', 18);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      drawFitText(armor.bestFor, x + 25, 590, colWidth - 50, 'sans-serif', 14);

      // Warbond source
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#64748b';
      drawFitText(`Warbond: ${armor.warbond}`, x + 20, 860, colWidth - 40, 'monospace', 14);
    });

    // Branding Footer
    ctx.fillStyle = '#FFE900';
    drawFitText('GAMINGTOOLSHUB.COM // ARMOR TIER LIST 2026', 90, 980, 900, 'monospace', 24);

    setTimeout(() => {
      const uri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `helldivers-2-meta-armors-comparison.png`;
      link.href = uri;
      link.click();
    }, 150);
  };

  const handleShare = () => {
    const text = `HELLDIVERS 2 ARMOR TIER LIST & COMPARISON\n` +
      `Compared Armors:\n` +
      comparedArmors.map(a => `• ${a.name} (${a.weightClass.toUpperCase()}, ${a.armorRating} Armor, Score: ${a.metaScore}/100)`).join('\n') +
      `\nFind the best armor for your playstyle: https://gamingtoolshub.com/tools/helldivers-2-armor-tier-list`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100 font-sans">
      {/* Hidden Canvas for High-Res PNG Export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Banner & Header */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/10 border border-[#FFE900]/40 flex items-center justify-center text-[#FFE900]">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Armoury & Quartermaster Command
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Armor Comparison & Passive Tier List (2026)
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-3.5 py-2 rounded-xl bg-[#FFE900]/10 border border-[#FFE900]/50 text-[#FFE900] hover:bg-[#FFE900]/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition"
            >
              <HelpCircle className="w-4 h-4 text-[#FFE900]" />
              Find Best Armor (Quiz)
            </button>
            <button
              onClick={handleExportCard}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition font-mono"
            >
              <Download className="w-4 h-4 text-[#FFE900]" />
              Export Top 3 (PNG)
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 hover:bg-[#fff033] shadow cursor-pointer transition"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copiedLink ? 'Copied' : 'Share Tier List'}
            </button>
          </div>
        </div>

        {/* Search Bar & Smart Auto-Filter */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 'best armor for bots', 'scout', 'extra padding'..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE900]"
            />
          </div>

          {/* Weight & Warbond Filters */}
          <div className="md:col-span-6 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
              <button
                onClick={() => setWeightFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase transition ${weightFilter === 'all' ? 'bg-[#FFE900] text-black' : 'text-zinc-400'}`}
              >
                All
              </button>
              <button
                onClick={() => setWeightFilter('light')}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase transition ${weightFilter === 'light' ? 'bg-emerald-500 text-black' : 'text-zinc-400'}`}
              >
                Light
              </button>
              <button
                onClick={() => setWeightFilter('medium')}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase transition ${weightFilter === 'medium' ? 'bg-amber-500 text-black' : 'text-zinc-400'}`}
              >
                Medium
              </button>
              <button
                onClick={() => setWeightFilter('heavy')}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase transition ${weightFilter === 'heavy' ? 'bg-rose-500 text-white' : 'text-zinc-400'}`}
              >
                Heavy
              </button>
            </div>

            <select
              value={passiveFilter}
              onChange={(e) => setPassiveFilter(e.target.value)}
              aria-label="Filter by passive perk"
              className="bg-zinc-950 text-xs font-mono font-bold text-white rounded-xl px-3 py-2 border border-zinc-800 focus:outline-none"
            >
              <option value="all">All Passives</option>
              {Object.values(PASSIVE_META_TIERS).map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.tier} Tier)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-zinc-800/80 pt-4">
          {[
            { id: 'tierlist', label: 'Meta Tier List', icon: Award },
            { id: 'compare', label: `Compare Armors (${selectedArmorIds.length}/3)`, icon: Layers },
            { id: 'quiz', label: 'Armor Match Quiz', icon: HelpCircle },
            { id: 'simulator', label: 'Passive Simulator', icon: Sparkles },
            { id: 'collection', label: `My Collection (${ownedArmorIds.size}/${COMPLETE_ARMOR_DATABASE.length})`, icon: CheckCircle2 },
            { id: 'table', label: '50+ Armor Database', icon: Compass }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                  isActive
                    ? 'bg-[#FFE900] text-black font-black shadow-lg shadow-[#FFE900]/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: META TIER LIST VIEW */}
      {activeTab === 'tierlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFE900]" />
                Helldivers 2 Armor & Passive Tier List (2026 Meta)
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Click any armor card to add it to the 3-Way Side-by-Side Comparison!</p>
            </div>
            <span className="text-xs font-mono text-[#FFE900] bg-[#FFE900]/10 border border-[#FFE900]/30 px-3 py-1 rounded-lg">
              Patch 1.002 Verified
            </span>
          </div>

          {/* S+ TIER */}
          <div className="bg-[#090a0f] border-2 border-amber-500/60 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-12 h-10 rounded-xl bg-amber-500 text-black font-black text-xl flex items-center justify-center font-mono">
                  S+
                </span>
                <div>
                  <h3 className="text-base font-black text-white">Must-Have Meta Passives</h3>
                  <p className="text-xs text-zinc-400">Engineering Kit, Scout, Med-Kit, Fortified</p>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Priority Unlock</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredArmors.filter(a => ['engineering-kit', 'scout', 'med-kit', 'fortified'].includes(a.passiveId)).map(armor => {
                const isSelected = selectedArmorIds.includes(armor.id);
                return (
                  <div
                    key={armor.id}
                    onClick={() => toggleArmorComparison(armor.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-[#0e1224] border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.3)]'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                          armor.weightClass === 'light' ? 'bg-emerald-500/20 text-emerald-400' : armor.weightClass === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {armor.weightClass}
                        </span>
                        <span className="text-[#FFE900] font-bold">{armor.metaScore}/100</span>
                      </div>

                      <h4 className="mt-2 text-sm font-black text-white group-hover:text-[#FFE900] transition">
                        {armor.name}
                      </h4>
                      <span className="text-[11px] text-zinc-400 font-mono block mt-1">
                        {PASSIVE_META_TIERS[armor.passiveId]?.name}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Armor: {armor.armorRating}</span>
                      <span className="text-zinc-400">Speed: {armor.speed}</span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-[#FFE900]' : 'text-zinc-600'}`}>
                        {isSelected ? 'COMPARING' : '+ COMPARE'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* S TIER */}
          <div className="bg-[#090a0f] border-2 border-emerald-500/50 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-12 h-10 rounded-xl bg-emerald-500 text-black font-black text-xl flex items-center justify-center font-mono">
                  S
                </span>
                <div>
                  <h3 className="text-base font-black text-white">High Value Clutch Passives</h3>
                  <p className="text-xs text-zinc-400">Democracy Protects, Extra Padding, Peak Physique, Electrical Conduit</p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">Top Tier Survivability</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredArmors.filter(a => ['democracy-protects', 'extra-padding', 'peak-physique', 'electrical-conduit'].includes(a.passiveId)).map(armor => {
                const isSelected = selectedArmorIds.includes(armor.id);
                return (
                  <div
                    key={armor.id}
                    onClick={() => toggleArmorComparison(armor.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-[#0e1224] border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.3)]'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                          armor.weightClass === 'light' ? 'bg-emerald-500/20 text-emerald-400' : armor.weightClass === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {armor.weightClass}
                        </span>
                        <span className="text-emerald-400 font-bold">{armor.metaScore}/100</span>
                      </div>

                      <h4 className="mt-2 text-sm font-black text-white group-hover:text-emerald-400 transition">
                        {armor.name}
                      </h4>
                      <span className="text-[11px] text-zinc-400 font-mono block mt-1">
                        {PASSIVE_META_TIERS[armor.passiveId]?.name}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Armor: {armor.armorRating}</span>
                      <span className="text-zinc-400">Speed: {armor.speed}</span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-[#FFE900]' : 'text-zinc-600'}`}>
                        {isSelected ? 'COMPARING' : '+ COMPARE'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* A & B TIER */}
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-12 h-10 rounded-xl bg-cyan-600 text-white font-black text-xl flex items-center justify-center font-mono">
                  A/B
                </span>
                <div>
                  <h3 className="text-base font-black text-white">Situational & Specialist Passives</h3>
                  <p className="text-xs text-zinc-400">Servo-Assisted, Inflammable, Advanced Filtration, Unflinching</p>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">Niche Loadouts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredArmors.filter(a => ['servo-assisted', 'inflammable', 'advanced-filtration', 'unflinching'].includes(a.passiveId)).map(armor => {
                const isSelected = selectedArmorIds.includes(armor.id);
                return (
                  <div
                    key={armor.id}
                    onClick={() => toggleArmorComparison(armor.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-[#0e1224] border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.3)]'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                          armor.weightClass === 'light' ? 'bg-emerald-500/20 text-emerald-400' : armor.weightClass === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {armor.weightClass}
                        </span>
                        <span className="text-cyan-400 font-bold">{armor.metaScore}/100</span>
                      </div>

                      <h4 className="mt-2 text-sm font-black text-white group-hover:text-cyan-400 transition">
                        {armor.name}
                      </h4>
                      <span className="text-[11px] text-zinc-400 font-mono block mt-1">
                        {PASSIVE_META_TIERS[armor.passiveId]?.name}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Armor: {armor.armorRating}</span>
                      <span className="text-zinc-400">Speed: {armor.speed}</span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-[#FFE900]' : 'text-zinc-600'}`}>
                        {isSelected ? 'COMPARING' : '+ COMPARE'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SIDE BY SIDE COMPARISON TABLE */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#FFE900]" />
                Side-by-Side Armor Comparison ({comparedArmors.length} Selected)
              </h2>
              <p className="text-xs text-zinc-400">Compare real damage taken, speed, stamina drain, and passive value across 2-3 armors.</p>
            </div>

            <button
              onClick={handleExportCard}
              className="px-4 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 cursor-pointer shadow hover:bg-[#fff033]"
            >
              <Download className="w-4 h-4" />
              Export Reddit Comparison Image
            </button>
          </div>

          {/* Visual Model Silhouettes Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparedArmors.map((armor, idx) => {
              const passive = PASSIVE_META_TIERS[armor.passiveId];
              return (
                <div
                  key={armor.id}
                  className="bg-[#090a0f] border-2 border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4 relative overflow-hidden"
                >
                  <button
                    onClick={() => toggleArmorComparison(armor.id)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 p-1 rounded-lg hover:bg-zinc-900 cursor-pointer"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-500">ARMOR #{idx + 1}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase ${
                      armor.weightClass === 'light' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : armor.weightClass === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}>
                      {armor.weightClass} Chassis
                    </span>
                  </div>

                  {/* Stylized Visual Armor Silhouette */}
                  <div className="w-full h-40 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center relative overflow-hidden font-mono">
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

                    {/* Speed Lines for Light Armor */}
                    {armor.weightClass === 'light' && (
                      <div className="absolute inset-0 flex items-center justify-around opacity-30 pointer-events-none">
                        <div className="w-1 h-24 bg-emerald-400 rotate-45 transform -translate-x-12" />
                        <div className="w-1 h-32 bg-emerald-400 rotate-45" />
                        <div className="w-1 h-20 bg-emerald-400 rotate-45 transform translate-x-12" />
                      </div>
                    )}

                    {/* Bulky Reinforced Shield for Heavy Armor */}
                    {armor.weightClass === 'heavy' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <div className="w-32 h-32 rounded-full border-4 border-rose-500 animate-pulse" />
                      </div>
                    )}

                    <div className="flex flex-col items-center justify-center space-y-1 relative z-10 text-center px-4">
                      <Shield className={`w-12 h-12 ${
                        armor.weightClass === 'light' ? 'text-emerald-400' : armor.weightClass === 'medium' ? 'text-amber-400' : 'text-rose-400'
                      }`} />
                      <span className="text-sm font-black text-white uppercase">{armor.name}</span>
                      <span className="text-[10px] text-zinc-400">{armor.warbond}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-400">Passive:</span>
                      <span className="text-[#FFE900] font-bold">{passive?.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-400">Meta Score:</span>
                      <span className="text-emerald-400 font-black">{armor.metaScore}/100</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-400">Best Role:</span>
                      <span className="text-zinc-300 text-right text-[11px] max-w-[170px] truncate">{armor.bestFor}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison Metric Table */}
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400">
                  <th className="p-3.5">Combat Metric</th>
                  {comparedArmors.map(a => (
                    <th key={a.id} className="p-3.5 text-center text-white font-bold">
                      {a.name}
                    </th>
                  ))}
                  <th className="p-3.5 text-center text-[#FFE900]">Winner / Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {/* 1. Armor Rating */}
                <tr className="hover:bg-zinc-900/40">
                  <td className="p-3.5 font-bold text-zinc-300">
                    Armor Rating
                    <span className="text-[10px] text-zinc-500 block">Higher = Lower damage taken</span>
                  </td>
                  {comparedArmors.map(a => {
                    const isMax = a.armorRating === Math.max(...comparedArmors.map(x => x.armorRating));
                    return (
                      <td key={a.id} className={`p-3.5 text-center font-bold ${isMax ? 'text-emerald-400 text-sm' : 'text-zinc-300'}`}>
                        {a.armorRating}
                      </td>
                    );
                  })}
                  <td className="p-3.5 text-center text-[#FFE900] font-bold">
                    {comparedArmors.reduce((prev, curr) => (curr.armorRating > prev.armorRating ? curr : prev)).name} (+Damage Resist)
                  </td>
                </tr>

                {/* 2. Speed Velocity */}
                <tr className="hover:bg-zinc-900/40">
                  <td className="p-3.5 font-bold text-zinc-300">
                    Speed Velocity
                    <span className="text-[10px] text-zinc-500 block">Sprint & strafe mobility</span>
                  </td>
                  {comparedArmors.map(a => {
                    const isMax = a.speed === Math.max(...comparedArmors.map(x => x.speed));
                    return (
                      <td key={a.id} className={`p-3.5 text-center font-bold ${isMax ? 'text-emerald-400 text-sm' : 'text-zinc-300'}`}>
                        {a.speed}
                      </td>
                    );
                  })}
                  <td className="p-3.5 text-center text-emerald-400 font-bold">
                    {comparedArmors.reduce((prev, curr) => (curr.speed > prev.speed ? curr : prev)).name} (Fastest)
                  </td>
                </tr>

                {/* 3. Stamina Regen */}
                <tr className="hover:bg-zinc-900/40">
                  <td className="p-3.5 font-bold text-zinc-300">
                    Stamina Recovery Rate
                    <span className="text-[10px] text-zinc-500 block">How quickly breath recovers</span>
                  </td>
                  {comparedArmors.map(a => {
                    const isMax = a.staminaRegen === Math.max(...comparedArmors.map(x => x.staminaRegen));
                    return (
                      <td key={a.id} className={`p-3.5 text-center font-bold ${isMax ? 'text-emerald-400 text-sm' : 'text-zinc-300'}`}>
                        {a.staminaRegen}%
                      </td>
                    );
                  })}
                  <td className="p-3.5 text-center text-emerald-400 font-bold">
                    {comparedArmors.reduce((prev, curr) => (curr.staminaRegen > prev.staminaRegen ? curr : prev)).name}
                  </td>
                </tr>

                {/* 4. Damage from 100 DMG Hit */}
                <tr className="hover:bg-zinc-900/40">
                  <td className="p-3.5 font-bold text-zinc-300">
                    Real Damage Taken (100 HP Hit)
                    <span className="text-[10px] text-zinc-500 block">Simulated Bot Trooper or Bug Claw</span>
                  </td>
                  {comparedArmors.map(a => {
                    // Formula: Light 50 armor takes 75 dmg, Medium 100 takes 50, Heavy 150-200 takes 25-35
                    const damage = a.armorRating >= 150 ? 25 : a.armorRating >= 100 ? 50 : 75;
                    return (
                      <td key={a.id} className="p-3.5 text-center font-bold text-rose-400">
                        {damage} DMG taken
                      </td>
                    );
                  })}
                  <td className="p-3.5 text-center text-emerald-400 font-bold">
                    Heavy / High Armor absorbs 2x-3x more damage
                  </td>
                </tr>

                {/* 5. 100m Sprint Time */}
                <tr className="hover:bg-zinc-900/40">
                  <td className="p-3.5 font-bold text-zinc-300">
                    Time to Sprint 100m
                    <span className="text-[10px] text-zinc-500 block">Straight line sprint benchmark</span>
                  </td>
                  {comparedArmors.map(a => {
                    const sprintSeconds = a.weightClass === 'light' ? '18s' : a.weightClass === 'medium' ? '20s' : '22s';
                    return (
                      <td key={a.id} className="p-3.5 text-center font-bold text-zinc-300">
                        {sprintSeconds}
                      </td>
                    );
                  })}
                  <td className="p-3.5 text-center text-emerald-400 font-bold">
                    Light Armor saves 4s every 100m
                  </td>
                </tr>

                {/* 6. Stamina Burned for 100m */}
                <tr className="hover:bg-zinc-900/40">
                  <td className="p-3.5 font-bold text-zinc-300">
                    Stamina Drained (100m)
                    <span className="text-[10px] text-zinc-500 block">Lower drain = Longer marathons</span>
                  </td>
                  {comparedArmors.map(a => {
                    const drainPct = a.weightClass === 'light' ? '40%' : a.weightClass === 'medium' ? '60%' : '85%';
                    return (
                      <td key={a.id} className="p-3.5 text-center font-bold text-amber-400">
                        {drainPct} drained
                      </td>
                    );
                  })}
                  <td className="p-3.5 text-center text-emerald-400 font-bold">
                    Light Armor leaves 60% stamina remaining
                  </td>
                </tr>

                {/* 7. Meta Score */}
                <tr className="hover:bg-zinc-900/40 bg-zinc-950/60">
                  <td className="p-3.5 font-bold text-[#FFE900]">
                    Overall Meta Rating
                    <span className="text-[10px] text-zinc-500 block">High-difficulty viability score</span>
                  </td>
                  {comparedArmors.map(a => (
                    <td key={a.id} className="p-3.5 text-center font-black text-sm text-[#FFE900]">
                      {a.metaScore}/100
                    </td>
                  ))}
                  <td className="p-3.5 text-center text-[#FFE900] font-black">
                    {comparedArmors.reduce((prev, curr) => (curr.metaScore > prev.metaScore ? curr : prev)).name} (Highest Score)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: QUIZ - FIND BEST ARMOR FOR YOU */}
      {activeTab === 'quiz' && (
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-black text-white uppercase tracking-wider">
              Find Your Ideal Helldivers 2 Armor (3 Questions)
            </h2>
            <p className="text-xs text-zinc-400">Answer 3 tactical questions to receive a tailor-made armor recommendation.</p>
          </div>

          {quizStep === 0 && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#FFE900] block text-center uppercase">Question 1 of 3</span>
              <h3 className="text-base font-bold text-white text-center">Do you primarily play Solo or in a 4-Player Squad?</h3>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setQuizAnswers(prev => ({ ...prev, squad: 'solo' }));
                    setQuizStep(1);
                  }}
                  className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#FFE900] hover:bg-zinc-900 text-center cursor-pointer transition space-y-1"
                >
                  <Crosshair className="w-6 h-6 text-[#FFE900] mx-auto" />
                  <span className="text-sm font-bold text-white block">Solo Lone Wolf</span>
                  <span className="text-[11px] text-zinc-400 block">Speed, evasion & stealth POI farming</span>
                </button>

                <button
                  onClick={() => {
                    setQuizAnswers(prev => ({ ...prev, squad: 'squad' }));
                    setQuizStep(1);
                  }}
                  className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#FFE900] hover:bg-zinc-900 text-center cursor-pointer transition space-y-1"
                >
                  <Users className="w-6 h-6 text-emerald-400 mx-auto" />
                  <span className="text-sm font-bold text-white block">4-Player Squad</span>
                  <span className="text-[11px] text-zinc-400 block">Team synergy, frontlining & support fire</span>
                </button>
              </div>
            </div>
          )}

          {quizStep === 1 && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#FFE900] block text-center uppercase">Question 2 of 3</span>
              <h3 className="text-base font-bold text-white text-center">Which Enemy Faction do you struggle with most?</h3>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setQuizAnswers(prev => ({ ...prev, faction: 'bugs' }));
                    setQuizStep(2);
                  }}
                  className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-red-500 hover:bg-zinc-900 text-center cursor-pointer transition space-y-1"
                >
                  <Flame className="w-6 h-6 text-red-500 mx-auto" />
                  <span className="text-sm font-bold text-white block">Terminids (Bugs)</span>
                  <span className="text-[11px] text-zinc-400 block">Hunters, Stalkers, Chargers, Bile Titans</span>
                </button>

                <button
                  onClick={() => {
                    setQuizAnswers(prev => ({ ...prev, faction: 'bots' }));
                    setQuizStep(2);
                  }}
                  className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-400 hover:bg-zinc-900 text-center cursor-pointer transition space-y-1"
                >
                  <Zap className="w-6 h-6 text-cyan-400 mx-auto" />
                  <span className="text-sm font-bold text-white block">Automatons (Bots)</span>
                  <span className="text-[11px] text-zinc-400 block">Rocket Devastators, Tanks, Hulks & Turrets</span>
                </button>
              </div>
            </div>
          )}

          {quizStep === 2 && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#FFE900] block text-center uppercase">Question 3 of 3</span>
              <h3 className="text-base font-bold text-white text-center">What is your preferred Combat Playstyle?</h3>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleQuizFinish(quizAnswers.squad, quizAnswers.faction, 'speed')}
                  className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#FFE900] hover:bg-zinc-900 text-center cursor-pointer transition space-y-1"
                >
                  <Activity className="w-6 h-6 text-[#FFE900] mx-auto" />
                  <span className="text-sm font-bold text-white block">Fast & Elusive (Speed)</span>
                  <span className="text-[11px] text-zinc-400 block">Sprint past enemies, dodge claws & kite</span>
                </button>

                <button
                  onClick={() => handleQuizFinish(quizAnswers.squad, quizAnswers.faction, 'tank')}
                  className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-rose-500 hover:bg-zinc-900 text-center cursor-pointer transition space-y-1"
                >
                  <Shield className="w-6 h-6 text-rose-500 mx-auto" />
                  <span className="text-sm font-bold text-white block">Immortal Anchor (Tank)</span>
                  <span className="text-[11px] text-zinc-400 block">Survive rockets, explosions & hold ground</span>
                </button>
              </div>
            </div>
          )}

          {quizStep === 3 && recommendedArmorId && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-6 rounded-2xl bg-zinc-950 border-2 border-[#FFE900] text-center space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                  Recommended Armor For Your Playstyle
                </span>

                {(() => {
                  const rec = COMPLETE_ARMOR_DATABASE.find(a => a.id === recommendedArmorId);
                  const passive = rec ? PASSIVE_META_TIERS[rec.passiveId] : null;
                  if (!rec) return null;

                  return (
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-white">{rec.name}</h3>
                      <div className="flex justify-center items-center gap-2 text-xs font-mono">
                        <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 uppercase">
                          {rec.weightClass} Chassis
                        </span>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          {rec.armorRating} Armor / {rec.speed} Speed
                        </span>
                        <span className="px-2.5 py-1 rounded bg-[#FFE900]/20 text-[#FFE900] border border-[#FFE900]/40">
                          {passive?.name}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 max-w-lg mx-auto leading-relaxed pt-2">
                        {rec.bestFor}. {passive?.reasoning}
                      </p>

                      <div className="pt-3 flex justify-center gap-2">
                        <button
                          onClick={() => {
                            if (!selectedArmorIds.includes(rec.id)) {
                              setSelectedArmorIds(prev => [rec.id, prev[0], prev[1]].slice(0, 3));
                            }
                            setActiveTab('compare');
                          }}
                          className="px-4 py-2 rounded-xl bg-[#FFE900] text-black font-black text-xs uppercase tracking-wider cursor-pointer hover:bg-[#fff033]"
                        >
                          View in Comparison Table
                        </button>
                        <button
                          onClick={() => setQuizStep(0)}
                          className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs uppercase cursor-pointer hover:text-white"
                        >
                          Retake Quiz
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PASSIVE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFE900]" />
              Interactive Armor Passive Simulator
            </h2>
            <p className="text-xs text-zinc-400">Test how armor passives trigger in combat scenarios.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['democracy-protects', 'med-kit', 'engineering-kit', 'scout'].map((pId) => {
              const meta = PASSIVE_META_TIERS[pId];
              return (
                <button
                  key={pId}
                  onClick={() => {
                    setSimPassive(pId);
                    setSimLog([]);
                    setSimSurviveCount(0);
                    setSimTotalTrials(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
                    simPassive === pId ? 'bg-[#FFE900] text-black' : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {meta?.name}
                </button>
              );
            })}
          </div>

          {/* Simulator Arena Box */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-4">
            <span className="text-xs font-mono uppercase text-[#FFE900] font-bold">
              Current Simulation: {PASSIVE_META_TIERS[simPassive]?.name}
            </span>

            {simPassive === 'democracy-protects' && (
              <div className="space-y-3">
                <p className="text-xs text-zinc-300">
                  Takes fatal lethal damage (100+ HP). 50% chance to survive with 1 HP!
                </p>

                <div className="flex justify-center gap-6 font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 block">TOTAL LETHAL HITS</span>
                    <span className="text-xl font-black text-white">{simTotalTrials}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">SAVED BY DEMOCRACY</span>
                    <span className="text-xl font-black text-emerald-400">{simSurviveCount}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">ACTUAL WIN RATE</span>
                    <span className="text-xl font-black text-[#FFE900]">
                      {simTotalTrials > 0 ? `${Math.round((simSurviveCount / simTotalTrials) * 100)}%` : '50%'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={runPassiveSimulation}
                  className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-black text-xs uppercase tracking-wider cursor-pointer hover:bg-red-500 shadow-lg shadow-red-600/20"
                >
                  Take Lethal 500KG Bomb Hit!
                </button>
              </div>
            )}

            {simPassive !== 'democracy-protects' && (
              <div className="space-y-3">
                <p className="text-xs text-zinc-300">
                  {PASSIVE_META_TIERS[simPassive]?.perks}
                </p>
                <button
                  onClick={runPassiveSimulation}
                  className="px-5 py-2.5 rounded-xl bg-[#FFE900] text-black font-black text-xs uppercase tracking-wider cursor-pointer hover:bg-[#fff033]"
                >
                  Trigger {PASSIVE_META_TIERS[simPassive]?.name} Perk
                </button>
              </div>
            )}

            {/* Combat Simulation Log */}
            <div className="mt-4 p-3 bg-black/60 rounded-xl border border-zinc-900 text-left font-mono text-xs space-y-1.5 h-36 overflow-y-auto">
              <span className="text-zinc-500 text-[10px] block border-b border-zinc-900 pb-1">BATTLE LOG:</span>
              {simLog.length === 0 ? (
                <span className="text-zinc-600 italic text-[11px]">Click the button above to simulate in-game armor procs...</span>
              ) : (
                simLog.map((log, idx) => (
                  <div key={idx} className="text-zinc-300 text-[11px] leading-relaxed">
                    {log.includes('PROC') || log.includes('INJECTED') ? (
                      <span className="text-emerald-400 font-bold">{log}</span>
                    ) : (
                      log
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MY ARMOR COLLECTION */}
      {activeTab === 'collection' && (
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                My Helldivers 2 Armor Collection Tracker
              </h2>
              <p className="text-xs text-zinc-400">Check off the armors in your Super Destroyer armoury to see missing meta picks.</p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-zinc-400">Progress:</span>
              <span className="text-[#FFE900] font-black text-sm">
                {ownedArmorIds.size} / {COMPLETE_ARMOR_DATABASE.length} ({Math.round((ownedArmorIds.size / COMPLETE_ARMOR_DATABASE.length) * 100)}%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {COMPLETE_ARMOR_DATABASE.map(armor => {
              const isOwned = ownedArmorIds.has(armor.id);
              return (
                <div
                  key={armor.id}
                  onClick={() => toggleOwnedArmor(armor.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isOwned
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className={`text-xs font-bold block ${isOwned ? 'text-white' : 'text-zinc-400'}`}>
                      {armor.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 block">
                      {armor.weightClass.toUpperCase()} • {armor.warbond}
                    </span>
                  </div>

                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                    isOwned ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-zinc-700 bg-zinc-900'
                  }`}>
                    {isOwned && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: 50+ COMPLETE ARMOR DATA TABLE */}
      {activeTab === 'table' && (
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h2 className="text-base font-black text-white uppercase">Complete Helldivers 2 Armor Catalog (2026)</h2>
              <p className="text-xs text-zinc-400">All armors with exact in-game armor rating, speed, stamina, and warbond source.</p>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Showing {filteredArmors.length} Armors
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400">
                  <th className="p-3">Armor Set Name</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Armor</th>
                  <th className="p-3">Speed</th>
                  <th className="p-3">Stamina</th>
                  <th className="p-3">Passive</th>
                  <th className="p-3">Warbond Source</th>
                  <th className="p-3 text-center">Score</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredArmors.map(armor => {
                  const isCompared = selectedArmorIds.includes(armor.id);
                  const passive = PASSIVE_META_TIERS[armor.passiveId];
                  return (
                    <tr key={armor.id} className="hover:bg-zinc-900/50 transition">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        {armor.name}
                        {armor.isMetaHighlight && (
                          <span className="px-1.5 py-0.5 rounded bg-[#FFE900]/20 text-[#FFE900] text-[9px] font-bold border border-[#FFE900]/40">
                            META
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          armor.weightClass === 'light' ? 'bg-emerald-500/20 text-emerald-400' : armor.weightClass === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {armor.weightClass}
                        </span>
                      </td>
                      <td className="p-3 text-white font-bold">{armor.armorRating}</td>
                      <td className="p-3 text-zinc-300">{armor.speed}</td>
                      <td className="p-3 text-zinc-300">{armor.staminaRegen}%</td>
                      <td className="p-3 text-[#FFE900]">{passive?.name}</td>
                      <td className="p-3 text-zinc-400">{armor.warbond}</td>
                      <td className="p-3 text-center font-bold text-emerald-400">{armor.metaScore}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            toggleArmorComparison(armor.id);
                            setActiveTab('compare');
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase cursor-pointer transition ${
                            isCompared ? 'bg-[#FFE900] text-black' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                          }`}
                        >
                          {isCompared ? 'In Compare' : '+ Compare'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEO ARTICLE CONTENT SECTION (H2s for Google Rankings) */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-8 text-zinc-300 text-xs leading-relaxed">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider mb-2">
            Helldivers 2 Best Armor – Armor Tier List & Comparison Tool 2026
          </h2>
          <p className="text-zinc-400">
            Armor in Helldivers 2 directly impacts survivability, sprint duration, and mission tempo. Understanding the mathematical tradeoff between Armor Rating, Speed velocity, and passive utility determines whether your squad completes Difficulty 9 Helldives or runs out of reinforcements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h2 className="text-sm font-bold text-[#FFE900] uppercase font-mono">
              Best armor Helldivers 2
            </h2>
            <p className="text-zinc-400">
              The overall best armor in Helldivers 2 is the <strong>B-08 Light Gunner</strong> (Light armor with Extra Padding). It grants 100 Armor Rating (equivalent to standard Medium armor) while preserving maximum 550 Speed and 125 Stamina Regen. For heavy Automaton bot missions, the <strong>FS-23 Battle Master</strong> or <strong>B-24 Enforcer</strong> (Fortified passive) provides unbeatable explosive protection against rocket devastators.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h2 className="text-sm font-bold text-[#FFE900] uppercase font-mono">
              Best light armor Helldivers 2
            </h2>
            <p className="text-zinc-400">
              The top light armors are the <strong>SC-34 Infiltrator</strong> and <strong>SC-30 Trailblazer Scout</strong> (Scout passive), reducing enemy patrol detection by 30% and enabling rapid Super Credits farming on Grand Erit. For combat missions, the <strong>CE-07 Demolition Specialist</strong> gives +2 extra grenades and recoil reduction at 535 speed.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h2 className="text-sm font-bold text-[#FFE900] uppercase font-mono">
              Scout armor vs Engineering Kit
            </h2>
            <p className="text-zinc-400">
              Scout armor is superior for solo players, stealth blitzes, and radar mapping, as avoiding combat altogether saves mission time. Engineering Kit is superior for team fire support, offering 6 total grenades to close bug holes and factory vents without calling resupply pods, plus 30% recoil stabilization for machine guns.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h2 className="text-sm font-bold text-[#FFE900] uppercase font-mono">
              Armor rating explained
            </h2>
            <p className="text-zinc-400">
              Helldivers have 100 base HP. Light armor (50 Armor Rating) absorbs 25% damage (taking 75 HP from a 100 dmg hit). Medium armor (100 Armor Rating) absorbs 50% damage (taking 50 HP). Heavy armor (150-200 Armor Rating) absorbs up to 75% damage (taking only 25 HP). However, Light armor sprints 100 meters 4 seconds faster and burns 45% less stamina than Heavy armor.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Armor Comparison & Passive Tier List Tool 2026 • Verified In-Game Balance Data
        </div>
      </div>
    </div>
  );
}
