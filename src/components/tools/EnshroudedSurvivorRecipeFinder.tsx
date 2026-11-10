import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Wrench,
  Sparkles,
  MapPin,
  Flame,
  Shield,
  FlaskConical,
  Trees,
  Wheat,
  Crosshair,
  PackageCheck
} from 'lucide-react';

interface SurvivorNpc {
  id: string;
  name: string;
  title: string;
  vaultLocation: string;
  flameLevelReq: number;
  iconName: string;
  stationsUnlocked: string[];
  description: string;
}

interface RecipeItem {
  id: string;
  name: string;
  category: 'armor' | 'consumable' | 'weapon' | 'station' | 'utility';
  survivorId: string;
  stationRequired: string;
  ingredients: Array<{ name: string; count: number }>;
  effect: string;
}

const SURVIVORS: SurvivorNpc[] = [
  {
    id: 'blacksmith',
    name: 'Oswald Anders',
    title: 'The Blacksmith',
    vaultLocation: 'Ancient Vault - Blacksmith (Springlands, North of Braelyn Bridge)',
    flameLevelReq: 1,
    iconName: 'Wrench',
    stationsUnlocked: ['Forge', 'Smelter', 'Anvil', 'Charcoal Kiln'],
    description: 'Forges heavy melee weapons, iron shields, metal plate armors, nails, and copper/bronze ingots.'
  },
  {
    id: 'alchemist',
    name: 'Balthazar',
    title: 'The Alchemist',
    vaultLocation: 'Ancient Vault - Alchemist (Springlands, Northwest of Harvest Homestead)',
    flameLevelReq: 1,
    iconName: 'FlaskConical',
    stationsUnlocked: ['Mortar', 'Alchemy Station', 'Laboratory'],
    description: 'Brew healing potions, shroud protection flasks, elemental staff spell charges, and magical robes.'
  },
  {
    id: 'carpenter',
    name: 'Cade Hawthorn',
    title: 'The Carpenter',
    vaultLocation: 'Ancient Vault - Carpenter (Revelwood, East of Diadwyn)',
    flameLevelReq: 2,
    iconName: 'Trees',
    stationsUnlocked: ['Table Saw', 'Kiln'],
    description: 'Crafts high-comfort wooden furniture, storage chests, glider upgrades, and polished wood blocks.'
  },
  {
    id: 'farmer',
    name: 'Emily Fray',
    title: 'The Farmer',
    vaultLocation: 'Ancient Vault - Farmer (Springlands, East of Ancient Spire)',
    flameLevelReq: 1,
    iconName: 'Wheat',
    stationsUnlocked: ['Seedbed', 'Oven', 'Beehive', 'Farmer Fireplace'],
    description: 'Cultivates crop seedlings, bakes stat-boosting meals, extracts honey, and brews stamina teas.'
  },
  {
    id: 'hunter',
    name: 'Athalan Skree',
    title: 'The Hunter',
    vaultLocation: 'Ancient Vault - Hunter (Revelwood, North of Diadwyn Spire)',
    flameLevelReq: 2,
    iconName: 'Crosshair',
    stationsUnlocked: ['Hand Spindle', 'Tanning Station', 'Drying Rack'],
    description: 'Crafts leather armors, marksman longbows, specialized poison/fossil arrows, and decorative trophies.'
  }
];

const RECIPES: RecipeItem[] = [
  {
    id: 'health-potion-small',
    name: 'Health Potion (Small)',
    category: 'consumable',
    survivorId: 'alchemist',
    stationRequired: 'Mortar',
    ingredients: [{ name: 'Red Mushroom', count: 1 }, { name: 'Purple Berries', count: 1 }, { name: 'Water', count: 1 }],
    effect: 'Instantly restores +150 Health.'
  },
  {
    id: 'shroud-survival-flask',
    name: 'Shroud Survival Flask',
    category: 'consumable',
    survivorId: 'alchemist',
    stationRequired: 'Alchemy Station',
    ingredients: [{ name: 'Liquid Shroud', count: 2 }, { name: 'Shroud Wood', count: 1 }],
    effect: 'Extends maximum Shroud timer by +2 minutes.'
  },
  {
    id: 'iron-chestplate',
    name: 'Knight Chestplate',
    category: 'armor',
    survivorId: 'blacksmith',
    stationRequired: 'Forge',
    ingredients: [{ name: 'Iron Bars', count: 6 }, { name: 'Leather', count: 3 }, { name: 'Padding', count: 2 }],
    effect: 'Provides +120 Physical Protection and +40 Health.'
  },
  {
    id: 'copper-ingot',
    name: 'Copper Ingot',
    category: 'utility',
    survivorId: 'blacksmith',
    stationRequired: 'Smelter',
    ingredients: [{ name: 'Copper Ore', count: 20 }, { name: 'Charcoal', count: 20 }],
    effect: 'Used to craft bronze tools and tier 3 workbenches.'
  },
  {
    id: 'medium-chest',
    name: 'Medium Storage Chest',
    category: 'utility',
    survivorId: 'carpenter',
    stationRequired: 'Table Saw',
    ingredients: [{ name: 'Wood Planks', count: 12 }, { name: 'Nails', count: 6 }],
    effect: 'Provides 32 storage inventory slots.'
  },
  {
    id: 'palm-bed',
    name: 'Palm Wood Bed',
    category: 'utility',
    survivorId: 'carpenter',
    stationRequired: 'Workbench',
    ingredients: [{ name: 'Palm Wood', count: 8 }, { name: 'Fabric', count: 4 }, { name: 'Straw', count: 6 }],
    effect: 'Grants +5 Comfort Rating (Rested Buff timer extension).'
  },
  {
    id: 'stamina-tea',
    name: 'Chamomile Tea',
    category: 'consumable',
    survivorId: 'farmer',
    stationRequired: 'Farmer Fireplace',
    ingredients: [{ name: 'Chamomile', count: 1 }, { name: 'Water', count: 1 }],
    effect: 'Grants +5 Stamina Regeneration for 35 minutes.'
  },
  {
    id: 'poison-arrow',
    name: 'Poison Arrow (x25)',
    category: 'weapon',
    survivorId: 'hunter',
    stationRequired: 'Workbench',
    ingredients: [{ name: 'Wood Logs', count: 5 }, { name: 'Feathers', count: 5 }, { name: 'Poison Sack', count: 1 }],
    effect: 'Inflicts 45 Physical + 30 Poison damage over 6 seconds.'
  }
];

export const EnshroudedSurvivorRecipeFinder: React.FC = () => {
  const [selectedSurvivor, setSelectedSurvivor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((item) => {
      const matchesSurvivor = selectedSurvivor === 'all' || item.survivorId === selectedSurvivor;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.effect.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSurvivor && matchesCategory && matchesSearch;
    });
  }, [selectedSurvivor, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Title Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Survivor NPC Unlock & Recipe Finder
            </h2>
            <p className="text-xs text-slate-400">
              Locate all 5 Ancient Vault survivors, view required workbenches, and search craftable armors, potions, and gear.
            </p>
          </div>
        </div>
      </div>

      {/* Survivor NPCs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {SURVIVORS.map((npc) => {
          const isSelected = selectedSurvivor === npc.id;
          return (
            <div
              key={npc.id}
              onClick={() => setSelectedSurvivor(isSelected ? 'all' : npc.id)}
              className={`p-3 rounded-xl border cursor-pointer transition ${
                isSelected
                  ? 'bg-amber-950/80 border-amber-500 text-white shadow-lg shadow-amber-950/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-white mb-0.5">{npc.name}</div>
              <div className="text-[11px] text-amber-400 font-semibold mb-2">{npc.title}</div>
              <div className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{npc.description}</div>
            </div>
          );
        })}
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 border border-slate-800 rounded-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipe or ingredient (e.g., Health Potion, Iron Ingot)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Recipes' },
            { id: 'armor', label: 'Armors' },
            { id: 'consumable', label: 'Potions & Food' },
            { id: 'weapon', label: 'Weapons & Ammo' },
            { id: 'utility', label: 'Utility & Chests' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecipes.map((recipe) => {
          const npc = SURVIVORS.find((s) => s.id === recipe.survivorId);
          return (
            <div
              key={recipe.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    {recipe.name}
                    <span className="text-[10px] uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                      {recipe.category}
                    </span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Crafted by: <strong className="text-emerald-400">{npc?.name}</strong> ({recipe.stationRequired})
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                ✨ {recipe.effect}
              </p>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                  Required Ingredients:
                </span>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800/80 text-xs font-mono text-slate-300"
                    >
                      {ing.name}: <strong className="text-amber-400">x{ing.count}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnshroudedSurvivorRecipeFinder;
