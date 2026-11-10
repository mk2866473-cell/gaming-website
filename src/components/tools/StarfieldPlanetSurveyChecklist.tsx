/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Compass, Search, CheckCircle2, Circle, Eye, 
  Sparkles, DollarSign, Award, Trophy, Info, 
  MapPin, AlertCircle, ChevronRight, Filter
} from 'lucide-react';

export interface PlanetSurveyData {
  id: string;
  name: string;
  system: string;
  faunaCount: number;
  floraCount: number;
  resourceCount: number;
  traitsCount: number;
  traits: string[];
  resources: string[];
  baseSlateValue: number;
  specialNote: string;
}

const SURVEY_PLANETS: PlanetSurveyData[] = [
  {
    id: 'jemison',
    name: 'Jemison',
    system: 'Alpha Centauri',
    faunaCount: 9,
    floraCount: 8,
    resourceCount: 5,
    traitsCount: 3,
    traits: ['Sentient Microbial Colonies', 'Coralline Landmass', 'Ecological Consortium'],
    resources: ['Water (H2O)', 'Iron (Fe)', 'Lead (Pb)', 'Argon (Ar)', 'Chlorine (Cl)'],
    baseSlateValue: 9200,
    specialNote: 'Has ocean biomes: must land at Coastal regions (e.g. Coniferous Forest Coast) to scan 2 aquatic creature species in water!'
  },
  {
    id: 'schrodinger_3',
    name: 'Schrodinger III',
    system: 'Schrodinger',
    faunaCount: 8,
    floraCount: 6,
    resourceCount: 6,
    traitsCount: 2,
    traits: ['Primordial Network', 'Crystalline Crust'],
    resources: ['Iron (Fe)', 'Nickel (Ni)', 'Cobalt (Co)', 'Uranium (U)', 'Plutonium (Pu)', 'Water (H2O)'],
    baseSlateValue: 12500,
    specialNote: 'The ultimate endgame XP & farming paradise! Home to Swarming Foxbats that drop Luxury Textile and grant 150+ XP per kill.'
  },
  {
    id: 'akila',
    name: 'Akila',
    system: 'Cheyenne',
    faunaCount: 6,
    floraCount: 5,
    resourceCount: 4,
    traitsCount: 2,
    traits: ['Grounded Slag Layer', 'Amphibious Pods'],
    resources: ['Water (H2O)', 'Aluminum (Al)', 'Nickel (Ni)', 'Cobalt (Co)'],
    baseSlateValue: 7800,
    specialNote: 'High predator density: Beware of aggressive Ashta packs prowling Savannah and Forest biomes.'
  },
  {
    id: 'porrima_2',
    name: 'Porrima II (Paradiso)',
    system: 'Porrima',
    faunaCount: 10,
    floraCount: 9,
    resourceCount: 5,
    traitsCount: 3,
    traits: ['Active Geo-Thermal Vents', 'Bioluminescent Micro-Organisms', 'Pristine Ecosphere'],
    resources: ['Water (H2O)', 'Iron (Fe)', 'Lead (Pb)', 'Uranium (U)', 'Lithium (Li)'],
    baseSlateValue: 14200,
    specialNote: 'Rich biosphere planet with tropical climate and pristine beaches surrounding Paradiso luxury resort.'
  },
  {
    id: 'procyon_3',
    name: 'Procyon III',
    system: 'Procyon A',
    faunaCount: 6,
    floraCount: 4,
    resourceCount: 5,
    traitsCount: 2,
    traits: ['Glacial Drift Residue', 'Solar Radiation Anomaly'],
    resources: ['Water (H2O)', 'Copper (Cu)', 'Fluorine (F)', 'Argon (Ar)', 'Tetrafluorides (xF4)'],
    baseSlateValue: 8400,
    specialNote: 'Location of major Artifact Temple; cold frozen biome with aggressive ice-burrowing insectoids.'
  },
  {
    id: 'bessel_3_b',
    name: 'Bessel III-b (Moon)',
    system: 'Bessel',
    faunaCount: 0,
    floraCount: 0,
    resourceCount: 4,
    traitsCount: 1,
    traits: ['Volcanic Mineral Deposit'],
    resources: ['Iron (Fe)', 'Aluminum (Al)', 'Nickel (Ni)', 'Cobalt (Co)'],
    baseSlateValue: 4500,
    specialNote: '100% quick survey! Has zero flora/fauna; 1 UT hour equals 57 local hours, making it the supreme outpost fabrication hub.'
  }
];

export const StarfieldPlanetSurveyChecklist: React.FC = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('jemison');
  const [hasBotanySkill, setHasBotanySkill] = useState<boolean>(true); // 4 scans instead of 8
  const [hasZoologySkill, setHasZoologySkill] = useState<boolean>(true); // 4 scans instead of 8
  const [commerceRank, setCommerceRank] = useState<number>(3); // +10% to +25% sell price

  // Survey Progress Checklist per planet
  const [scannedFauna, setScannedFauna] = useState<number>(6);
  const [scannedFlora, setScannedFlora] = useState<number>(5);
  const [scannedResources, setScannedResources] = useState<number>(5);
  const [scannedTraits, setScannedTraits] = useState<number>(2);

  const planet = useMemo(() => {
    return SURVEY_PLANETS.find(p => p.id === selectedPlanetId) || SURVEY_PLANETS[0];
  }, [selectedPlanetId]);

  // Handle Planet Change
  const handleSelectPlanet = (id: string) => {
    setSelectedPlanetId(id);
    const p = SURVEY_PLANETS.find(pl => pl.id === id) || SURVEY_PLANETS[0];
    setScannedFauna(Math.min(scannedFauna, p.faunaCount));
    setScannedFlora(Math.min(scannedFlora, p.floraCount));
    setScannedResources(p.resourceCount);
    setScannedTraits(Math.min(scannedTraits, p.traitsCount));
  };

  // Calculations
  const stats = useMemo(() => {
    const totalItems = planet.faunaCount + planet.floraCount + planet.resourceCount + planet.traitsCount;
    const completedItems = scannedFauna + scannedFlora + scannedResources + scannedTraits;
    const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 100;
    const is100Percent = progressPercent >= 100;

    // Credit Payout: Vladimir Sall at The Eye pays 2.0x base value! Trade authority pays 1.0x.
    const commerceMult = [1.0, 1.1, 1.15, 1.2, 1.25][commerceRank] || 1.0;
    const tradeAuthorityPayout = Math.round(planet.baseSlateValue * commerceMult);
    const vladimirPayout = Math.round(tradeAuthorityPayout * 2.0); // Vladimir 2x bonus!

    return {
      totalItems,
      completedItems,
      progressPercent,
      is100Percent,
      tradeAuthorityPayout,
      vladimirPayout
    };
  }, [planet, scannedFauna, scannedFlora, scannedResources, scannedTraits, commerceRank]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Hand Scanner & Survey CAD
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                Vladimir Sall 2× Payout
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Planet Scan Flora/Fauna Completeness Checklist
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Track 100% planetary survey slates for Flora, Fauna, Inorganic Minerals, and Planetary Traits. Solves missing ocean biomes and calculates maximum credit payout at The Eye.
            </p>
          </div>

          {/* Quick Select Planet Bar */}
          <div className="flex flex-wrap gap-2">
            {SURVEY_PLANETS.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPlanet(p.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  planet.id === p.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Survey Progress Bar */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mt-2">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-semibold text-slate-300">
              Survey Slate Completion: <span className="text-cyan-400 font-bold">{planet.name}</span> ({stats.completedItems}/{stats.totalItems} Scanned)
            </span>
            <span className={`font-black text-sm ${stats.is100Percent ? 'text-emerald-400' : 'text-amber-400'}`}>
              {stats.progressPercent}% {stats.is100Percent ? '• COMPLETE' : ''}
            </span>
          </div>
          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex border border-slate-800">
            <div 
              className={`h-full transition-all duration-300 ${stats.is100Percent ? 'bg-emerald-500' : 'bg-gradient-to-r from-cyan-500 to-amber-500'}`}
              style={{ width: `${stats.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Category Checklists */}
        <div className="lg:col-span-7 space-y-4">
          {/* Fauna Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Fauna (Alien Wildlife) Scans
              </h3>
              <span className="text-xs font-bold text-emerald-400">{scannedFauna} / {planet.faunaCount} Species</span>
            </div>

            {planet.faunaCount > 0 ? (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={planet.faunaCount}
                  value={scannedFauna}
                  onChange={(e) => setScannedFauna(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Zoology Perk: {hasZoologySkill ? '4 scans/species' : '8 scans/species'}</span>
                  <span>{scannedFauna === planet.faunaCount ? '✓ All Fauna Discovered' : `${planet.faunaCount - scannedFauna} Species Remaining`}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500">Zero native fauna on this celestial body.</div>
            )}
          </div>

          {/* Flora Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Flora (Plant Life) Scans
              </h3>
              <span className="text-xs font-bold text-cyan-400">{scannedFlora} / {planet.floraCount} Species</span>
            </div>

            {planet.floraCount > 0 ? (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={planet.floraCount}
                  value={scannedFlora}
                  onChange={(e) => setScannedFlora(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Botany Perk: {hasBotanySkill ? '4 scans/species' : '8 scans/species'}</span>
                  <span>{scannedFlora === planet.floraCount ? '✓ All Flora Discovered' : `${planet.floraCount - scannedFlora} Species Remaining`}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500">Zero native flora on this barren body.</div>
            )}
          </div>

          {/* Planetary Traits Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-400" /> Planetary Traits & Anomalies
              </h3>
              <span className="text-xs font-bold text-purple-400">{scannedTraits} / {planet.traitsCount} Traits</span>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={planet.traitsCount}
                value={scannedTraits}
                onChange={(e) => setScannedTraits(parseInt(e.target.value))}
                className="w-full accent-purple-500 bg-slate-950 h-2 rounded cursor-pointer"
              />
              <div className="text-[11px] text-slate-400">
                Known Traits on {planet.name}: <strong className="text-slate-200">{planet.traits.join(', ')}</strong>
              </div>
            </div>
          </div>

          {/* Ocean Biome Warning Alert */}
          <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs space-y-1">
            <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-cyan-400" /> Biome Tip for {planet.name}:
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {planet.specialNote}
            </p>
          </div>
        </div>

        {/* Right Column: Vladimir Sall Slate Payout & Vendor Analysis */}
        <div className="lg:col-span-5 space-y-4">
          {/* Credit Payout Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Survey Slate Value</span>
                <h3 className="text-xl font-bold text-white font-serif">Survey Data Payout</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
            </div>

            {/* Vladimir Payout (2x) vs Trade Authority */}
            <div className="space-y-2.5">
              <div className="bg-slate-950 border border-amber-500/30 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-300">Vladimir Sall (The Eye)</div>
                  <div className="text-[10px] text-slate-400">Constellation 2.0x Premium</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-amber-400">{stats.vladimirPayout.toLocaleString()} CR</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">BEST SELLER</div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-slate-300">Trade Authority Vendor</div>
                  <div className="text-[10px] text-slate-500">Standard Payout</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-300">{stats.tradeAuthorityPayout.toLocaleString()} CR</div>
                  <div className="text-[10px] text-slate-500">50% less value</div>
                </div>
              </div>
            </div>

            {/* Commerce Perk Slider */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-400">Commerce Skill Rank:</span>
                <span className="text-amber-400 font-bold">Rank {commerceRank} (+{[0, 10, 15, 20, 25][commerceRank]}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={commerceRank}
                onChange={(e) => setCommerceRank(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-2 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Quick Inorganic Resources Tag List */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
            <div className="font-semibold text-slate-300 flex items-center justify-between">
              <span>Extractable Inorganic Minerals:</span>
              <span className="text-cyan-400 font-bold">{planet.resourceCount} Minerals</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {planet.resources.map((res, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                  {res}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StarfieldPlanetSurveyChecklist;
