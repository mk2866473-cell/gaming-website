/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Search, Beaker, FlaskConical, Droplets, 
  Flame, Shield, Zap, Skull, CheckCircle2, Calculator, 
  Info, ChevronRight, Filter, BookOpen
} from 'lucide-react';

export interface AlchemyRecipe {
  id: string;
  name: string;
  category: 'potion' | 'elixir' | 'coating' | 'grenade';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare';
  primaryExtraction: string;
  primaryReagent: string; // The raw material (3 needed)
  secondaryIngredient: string;
  effect: string;
  tacticalTip: string;
  actLocations: string;
}

const ALCHEMY_RECIPES: AlchemyRecipe[] = [
  {
    id: 'potion-speed',
    name: 'Potion of Speed',
    category: 'potion',
    rarity: 'Uncommon',
    primaryExtraction: 'Ashes of Hyena Ear',
    primaryReagent: 'Hyena Ear (×3)',
    secondaryIngredient: 'Any Salt (e.g. Salt of Mugwort)',
    effect: 'Grants Hastened for 3 turns (+2 AC, doubled movement speed, Advantage on DEX saves, and 1 extra Action per turn). Suffers Lethargic for 1 turn when effect ends.',
    tacticalTip: 'Drink as a Bonus Action on martial fighters or sorcerers for immense round 1 damage burst.',
    actLocations: 'Act 1: Hyenas on Risen Road near gnolls. Act 2: Last Light Inn alchemist.'
  },
  {
    id: 'elixir-bloodlust',
    name: 'Elixir of Bloodlust',
    category: 'elixir',
    rarity: 'Uncommon',
    primaryExtraction: 'Suspension of Worg Fang',
    primaryReagent: 'Worg Fang (×3)',
    secondaryIngredient: 'Any Ash (e.g. Ash of Daggerroot)',
    effect: 'Lasts until Long Rest. Once per turn, when you kill an enemy, you gain 5 Temporary HP and an immediate free Action.',
    tacticalTip: 'Top-tier meta elixir for Fighter, Paladin, or Gloomstalker. Allows chaining multiple kills in a single round.',
    actLocations: 'Act 1: Goblin Camp Worg pens & goblin corpses. Act 2: Moonrise Towers vendor Roah Moonglow.'
  },
  {
    id: 'elixir-hill-giant',
    name: 'Elixir of Hill Giant Strength',
    category: 'elixir',
    rarity: 'Uncommon',
    primaryExtraction: 'Salts of Hill Giant Fingers',
    primaryReagent: 'Hill Giant Finger (×3)',
    secondaryIngredient: 'Any Suspension (e.g. Suspension of Merregon White)',
    effect: 'Sets character Strength to 21 (+5 modifier) until Long Rest.',
    tacticalTip: 'Dump STR to 8 during character creation and invest all points into DEX/CON/WIS, then drink this daily.',
    actLocations: 'Act 1: Sold by Auntie Ethel in Druid Grove (3 restocked per long rest/level-up!) and Derryth Bonecloak in Underdark.'
  },
  {
    id: 'elixir-cloud-giant',
    name: 'Elixir of Cloud Giant Strength',
    category: 'elixir',
    rarity: 'Very Rare',
    primaryExtraction: 'Salts of Cloud Giant Fingers',
    primaryReagent: 'Cloud Giant Finger (×3)',
    secondaryIngredient: 'Any Suspension',
    effect: 'Sets character Strength to a staggering 27 (+8 modifier!) until Long Rest.',
    tacticalTip: 'Combines with Tavern Brawler for +16 flat attack roll accuracy and +16 unarmed/throwing damage!',
    actLocations: 'Act 3: Sold by Derryth Bonecloak, Stylin\' Horst, and Popper at Circus of the Last Days.'
  },
  {
    id: 'potion-supreme-healing',
    name: 'Potion of Supreme Healing',
    category: 'potion',
    rarity: 'Very Rare',
    primaryExtraction: 'Sublimate of Ki-Rin Hair',
    primaryReagent: 'Ki-Rin Hair (×3)',
    secondaryIngredient: 'Any Ash',
    effect: 'Instantly restores 10d4 + 20 Hit Points (30–60 HP) to the imbiber, or to grouped allies when thrown at feet.',
    tacticalTip: 'Throw on the ground between two downed party members to revive both with high health in a single action.',
    actLocations: 'Act 3: High-end alchemical shops in Lower City and Sorcerous Sundries.'
  },
  {
    id: 'potion-angelic-slumber',
    name: 'Potion of Angelic Slumber',
    category: 'potion',
    rarity: 'Rare',
    primaryExtraction: 'Suspension of Laculith',
    primaryReagent: 'Laculith (×3)',
    secondaryIngredient: 'Any Essence',
    effect: 'Fall into a catatonic 2-turn slumber. When waking, gain ALL benefits of a Long Rest (restores all Level 1–6 spell slots, HP, and action charges) even mid-combat!',
    tacticalTip: 'Cast Sanctuary on caster before drinking in boss fights (e.g. Raphael or Netherbrain) for a free full spell reset.',
    actLocations: 'Act 2: Moonrise Towers alchemists. Act 3: Sorcerous Sundries vaults.'
  },
  {
    id: 'potion-invisibility',
    name: 'Potion of Invisibility',
    category: 'potion',
    rarity: 'Uncommon',
    primaryExtraction: 'Sublimate of Autumn Crocus',
    primaryReagent: 'Autumn Crocus (×3)',
    secondaryIngredient: 'Any Ash',
    effect: 'Turns user Invisible for 1 minute (10 turns). Ends upon attacking or casting a spell.',
    tacticalTip: 'Essential for repositioning, bypassing high-security doors, or fleeing failed Honour Mode encounters.',
    actLocations: 'Act 1: Wilderness grassy hills and blighted village. Act 2: Shadow-cursed plants.'
  },
  {
    id: 'oil-accuracy',
    name: 'Oil of Accuracy',
    category: 'coating',
    rarity: 'Uncommon',
    primaryExtraction: 'Ashes of Daggerroot',
    primaryReagent: 'Daggerroot (×3)',
    secondaryIngredient: 'Any Salt',
    effect: 'Coats weapon for 10 turns. Grants +2 bonus to all Attack Rolls.',
    tacticalTip: 'Negates 40% of the Great Weapon Master / Sharpshooter -5 penalty without expending spell slots.',
    actLocations: 'Act 1: Underdark mushroom terraces and Sunlit Wetlands.'
  },
  {
    id: 'wizardbane-oil',
    name: 'Wizardbane Oil',
    category: 'coating',
    rarity: 'Rare',
    primaryExtraction: 'Suspension of Gremishka Tail',
    primaryReagent: 'Gremishka Tail (×3)',
    secondaryIngredient: 'Any Salt',
    effect: 'Targets hit suffer a -3 penalty to Spell Attack Rolls and Spell Save DC, plus Disadvantage on Concentration saves for 2 turns.',
    tacticalTip: 'Apply before fighting powerful mages like Lorroakan, Balthazar, or Viconia to disable their DC.',
    actLocations: 'Act 1: Rosymorn Monastery Trail (gremishkas in nursery boxes).'
  },
  {
    id: 'diluted-oil-sharpness',
    name: 'Diluted Oil of Sharpness',
    category: 'coating',
    rarity: 'Uncommon',
    primaryExtraction: 'Sublimate of Virtuous Glass',
    primaryReagent: 'Virtuous Glass (×3)',
    secondaryIngredient: 'Any Salt',
    effect: 'Weapon gains +1 bonus to Attack and Damage rolls, and bypasses Slashing/Piercing/Bludgeoning resistances.',
    tacticalTip: 'Crucial in Act 2 against shadows, wraiths, and undead that resist physical non-magical damage.',
    actLocations: 'Act 1: Underdark Grymforge ruins and mineral nodes.'
  },
  {
    id: 'crawler-mucus',
    name: 'Crawler Mucus',
    category: 'coating',
    rarity: 'Rare',
    primaryExtraction: 'Solution of Carrion Crawler Tentacle',
    primaryReagent: 'Carrion Crawler Tentacle (×3)',
    secondaryIngredient: 'Any Suspension',
    effect: 'Target must succeed on a DC 13 Constitution Saving Throw or become Paralysed for 3 turns. All hits within 1.5m are automatic Critical Hits!',
    tacticalTip: 'Combine with an Assassin or multi-attacking Paladin to deal guaranteed max critical Divine Smites.',
    actLocations: 'Act 1: Underdark chasms near petrified drow.'
  },
  {
    id: 'elixir-peerless-focus',
    name: 'Elixir of Peerless Focus',
    category: 'elixir',
    rarity: 'Uncommon',
    primaryExtraction: 'Sublimate of Belladonna',
    primaryReagent: 'Belladonna (×3)',
    secondaryIngredient: 'Any Ash',
    effect: 'Grants Advantage on Saving Throws to maintain Concentration on spells, and immunity to Sleep and magical Torpor until Long Rest.',
    tacticalTip: 'Best in slot for Clerics running Spirit Guardians or Sorcerers running Twinned Haste.',
    actLocations: 'Act 1: Sunlit Wetlands & Shadow-Cursed Lands borders.'
  },
  {
    id: 'potion-flying',
    name: 'Potion of Flying',
    category: 'potion',
    rarity: 'Common',
    primaryExtraction: 'Sublimate of Eagle Feather',
    primaryReagent: 'Eagle Feather (×3)',
    secondaryIngredient: 'Any Essence',
    effect: 'Gain a flying speed of 18m for 10 turns.',
    tacticalTip: 'Access high sniper vantage points in the Goblin Camp and bypass floor traps in the Gauntlet of Shar.',
    actLocations: 'Act 1: Rosymorn Monastery nest atop roof.'
  },
  {
    id: 'smokepowder-bomb',
    name: 'Smokepowder Bomb',
    category: 'grenade',
    rarity: 'Uncommon',
    primaryExtraction: 'Vitriol of Smokepowder',
    primaryReagent: 'Smokepowder (×3)',
    secondaryIngredient: 'Any Ash',
    effect: 'Hurl to detonate in a 4m area, dealing 3d4 + 9 Force damage and knocking creatures prone.',
    tacticalTip: 'Bypasses Sturdy cave-in walls (e.g. Nere rescue in Grymforge) and detonates explosive barrels.',
    actLocations: 'Act 1: Zhentarim Hideout, Philomeen barrel stash, Grymforge.'
  }
];

export const Bg3AlchemyRecipeFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  // Interactive Batch Extraction Calculator
  const [rawReagentCount, setRawReagentCount] = useState<number>(9);
  const [secondaryStock, setSecondaryStock] = useState<number>(3);

  const filteredRecipes = useMemo(() => {
    return ALCHEMY_RECIPES.filter(recipe => {
      const matchQuery = 
        searchQuery.trim() === '' ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.effect.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.primaryReagent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.primaryExtraction.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      const matchRarity = selectedRarity === 'all' || recipe.rarity === selectedRarity;

      return matchQuery && matchCategory && matchRarity;
    });
  }, [searchQuery, selectedCategory, selectedRarity]);

  const maxExtractions = Math.floor(rawReagentCount / 3);
  const maxCraftable = Math.min(maxExtractions, secondaryStock);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5" /> Larian Alchemy System
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                Extract 3:1 Ratio
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Alchemy Crafting Recipe Finder
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Search and filter all potions, long-rest elixirs, weapon coatings, and explosives. Includes extraction component formulas, tactical combat tips, and harvesting locations across Acts 1–3.
            </p>
          </div>
        </div>

        {/* 3:1 Interactive Extractor Quick Calculator */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-amber-400" /> Reagent Batch Extraction Calculator
            </span>
            <span className="text-[11px] text-slate-500">3 Raw Reagents = 1 Solution/Salt/Ash</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <div className="text-xs text-slate-400 mb-1 flex justify-between">
                <span>Raw Ingredients</span>
                <span className="font-bold text-amber-400">{rawReagentCount} units</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={rawReagentCount}
                onChange={(e) => setRawReagentCount(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-slate-900 h-2 rounded cursor-pointer"
              />
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1 flex justify-between">
                <span>Secondary Reagent Stock</span>
                <span className="font-bold text-cyan-400">{secondaryStock} units</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={secondaryStock}
                onChange={(e) => setSecondaryStock(parseInt(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-900 h-2 rounded cursor-pointer"
              />
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg flex items-center justify-around">
              <div className="text-center">
                <div className="text-[10px] text-slate-400 uppercase">Extractions</div>
                <div className="text-xl font-bold text-amber-400">{maxExtractions}</div>
              </div>
              <div className="text-slate-600 font-bold">→</div>
              <div className="text-center">
                <div className="text-[10px] text-slate-400 uppercase">Craftable Items</div>
                <div className="text-xl font-black text-emerald-400">{maxCraftable}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, components (Hyena Ear, Worg Fang, Salt, Strength)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'elixir', label: 'Elixirs (Long Rest)' },
            { id: 'potion', label: 'Potions' },
            { id: 'coating', label: 'Coatings & Oils' },
            { id: 'grenade', label: 'Grenades' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-all shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    recipe.category === 'elixir' ? 'bg-purple-950 border border-purple-500/40 text-purple-300' :
                    recipe.category === 'potion' ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300' :
                    recipe.category === 'coating' ? 'bg-cyan-950 border border-cyan-500/40 text-cyan-300' :
                    'bg-red-950 border border-red-500/40 text-red-300'
                  }`}>
                    {recipe.category}
                  </span>
                  <span className={`text-[10px] font-medium ${
                    recipe.rarity === 'Very Rare' ? 'text-amber-400' :
                    recipe.rarity === 'Rare' ? 'text-blue-400' :
                    recipe.rarity === 'Uncommon' ? 'text-emerald-400' :
                    'text-slate-400'
                  }`}>
                    {recipe.rarity}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-serif">{recipe.name}</h3>
              </div>

              <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                {recipe.category === 'elixir' ? <Droplets className="w-5 h-5 text-purple-400" /> :
                 recipe.category === 'potion' ? <FlaskConical className="w-5 h-5 text-emerald-400" /> :
                 recipe.category === 'coating' ? <Beaker className="w-5 h-5 text-cyan-400" /> :
                 <Flame className="w-5 h-5 text-red-400" />}
              </div>
            </div>

            {/* Recipe Blueprint */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 space-y-1.5 text-xs">
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Crafting Blueprint:</div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-medium text-amber-400">{recipe.primaryReagent}</span>
                <span className="text-slate-600">→</span>
                <span className="font-semibold text-slate-100">{recipe.primaryExtraction}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 pt-1 border-t border-slate-900">
                <span>+ Combine with:</span>
                <span className="font-medium text-cyan-300">{recipe.secondaryIngredient}</span>
              </div>
            </div>

            {/* Effects & Details */}
            <div className="space-y-2 text-xs">
              <div className="text-slate-300">
                <strong className="text-white">Effect: </strong>
                {recipe.effect}
              </div>

              <div className="text-slate-400 bg-amber-950/20 border border-amber-500/20 rounded p-2.5">
                <strong className="text-amber-300">Tactical Synergy: </strong>
                {recipe.tacticalTip}
              </div>

              <div className="text-[11px] text-slate-500 pt-1">
                <strong>Where to find: </strong> {recipe.actLocations}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
          <FlaskConical className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="font-medium">No recipes found matching your query.</p>
          <p className="text-xs text-slate-500 mt-1">Try searching for "Speed", "Strength", or "Bloodlust".</p>
        </div>
      )}
    </div>
  );
};
export default Bg3AlchemyRecipeFinder;
