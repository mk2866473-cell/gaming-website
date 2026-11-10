/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Shield, Sword, Wrench, Check, AlertTriangle, 
  ArrowRight, Info, Layers, RefreshCw, Crosshair, Sparkles, Wind, Zap
} from 'lucide-react';

interface EnchantmentDef {
  id: string;
  name: string;
  maxLevel: number;
  weight: number;
  itemMultiplier: number;
  bookMultiplier: number;
  incompatibleWith?: string[];
}

interface ItemPreset {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  availableEnchantments: string[];
}

const ALL_ENCHANTMENTS: Record<string, EnchantmentDef> = {
  // Universal
  mending: { id: 'mending', name: 'Mending', maxLevel: 1, weight: 2, itemMultiplier: 4, bookMultiplier: 2, incompatibleWith: ['infinity'] },
  unbreaking: { id: 'unbreaking', name: 'Unbreaking', maxLevel: 3, weight: 5, itemMultiplier: 2, bookMultiplier: 1 },

  // Weapons
  sharpness: { id: 'sharpness', name: 'Sharpness', maxLevel: 5, weight: 10, itemMultiplier: 1, bookMultiplier: 1, incompatibleWith: ['smite', 'bane_of_arthropods'] },
  smite: { id: 'smite', name: 'Smite', maxLevel: 5, weight: 5, itemMultiplier: 2, bookMultiplier: 1, incompatibleWith: ['sharpness', 'bane_of_arthropods'] },
  bane_of_arthropods: { id: 'bane_of_arthropods', name: 'Bane of Arthropods', maxLevel: 5, weight: 5, itemMultiplier: 2, bookMultiplier: 1, incompatibleWith: ['sharpness', 'smite'] },
  knockback: { id: 'knockback', name: 'Knockback', maxLevel: 2, weight: 5, itemMultiplier: 2, bookMultiplier: 1 },
  fire_aspect: { id: 'fire_aspect', name: 'Fire Aspect', maxLevel: 2, weight: 2, itemMultiplier: 4, bookMultiplier: 2 },
  looting: { id: 'looting', name: 'Looting', maxLevel: 3, weight: 2, itemMultiplier: 4, bookMultiplier: 2 },
  sweeping_edge: { id: 'sweeping_edge', name: 'Sweeping Edge', maxLevel: 3, weight: 2, itemMultiplier: 4, bookMultiplier: 2 },

  // Tools
  efficiency: { id: 'efficiency', name: 'Efficiency', maxLevel: 5, weight: 10, itemMultiplier: 1, bookMultiplier: 1 },
  silk_touch: { id: 'silk_touch', name: 'Silk Touch', maxLevel: 1, weight: 1, itemMultiplier: 8, bookMultiplier: 4, incompatibleWith: ['fortune'] },
  fortune: { id: 'fortune', name: 'Fortune', maxLevel: 3, weight: 2, itemMultiplier: 4, bookMultiplier: 2, incompatibleWith: ['silk_touch'] },

  // Armor
  protection: { id: 'protection', name: 'Protection', maxLevel: 4, weight: 10, itemMultiplier: 1, bookMultiplier: 1, incompatibleWith: ['fire_protection', 'blast_protection', 'projectile_protection'] },
  fire_protection: { id: 'fire_protection', name: 'Fire Protection', maxLevel: 4, weight: 5, itemMultiplier: 2, bookMultiplier: 1, incompatibleWith: ['protection', 'blast_protection', 'projectile_protection'] },
  blast_protection: { id: 'blast_protection', name: 'Blast Protection', maxLevel: 4, weight: 2, itemMultiplier: 4, bookMultiplier: 2, incompatibleWith: ['protection', 'fire_protection', 'projectile_protection'] },
  projectile_protection: { id: 'projectile_protection', name: 'Projectile Protection', maxLevel: 4, weight: 5, itemMultiplier: 2, bookMultiplier: 1, incompatibleWith: ['protection', 'fire_protection', 'blast_protection'] },
  thorns: { id: 'thorns', name: 'Thorns', maxLevel: 3, weight: 1, itemMultiplier: 8, bookMultiplier: 4 },
  respiration: { id: 'respiration', name: 'Respiration', maxLevel: 3, weight: 2, itemMultiplier: 4, bookMultiplier: 2 },
  aqua_affinity: { id: 'aqua_affinity', name: 'Aqua Affinity', maxLevel: 1, weight: 2, itemMultiplier: 4, bookMultiplier: 2 },
  feather_falling: { id: 'feather_falling', name: 'Feather Falling', maxLevel: 4, weight: 5, itemMultiplier: 2, bookMultiplier: 1 },
  depth_strider: { id: 'depth_strider', name: 'Depth Strider', maxLevel: 3, weight: 2, itemMultiplier: 4, bookMultiplier: 2, incompatibleWith: ['frost_walker'] },
  frost_walker: { id: 'frost_walker', name: 'Frost Walker', maxLevel: 2, weight: 2, itemMultiplier: 4, bookMultiplier: 2, incompatibleWith: ['depth_strider'] },
  soul_speed: { id: 'soul_speed', name: 'Soul Speed', maxLevel: 3, weight: 1, itemMultiplier: 8, bookMultiplier: 4 },
  swift_sneak: { id: 'swift_sneak', name: 'Swift Sneak', maxLevel: 3, weight: 1, itemMultiplier: 8, bookMultiplier: 4 },

  // Bow & Crossbow
  power: { id: 'power', name: 'Power', maxLevel: 5, weight: 10, itemMultiplier: 1, bookMultiplier: 1 },
  punch: { id: 'punch', name: 'Punch', maxLevel: 2, weight: 2, itemMultiplier: 4, bookMultiplier: 2 },
  flame: { id: 'flame', name: 'Flame', maxLevel: 1, weight: 2, itemMultiplier: 4, bookMultiplier: 2 },
  infinity: { id: 'infinity', name: 'Infinity', maxLevel: 1, weight: 1, itemMultiplier: 8, bookMultiplier: 4, incompatibleWith: ['mending'] },
  quick_charge: { id: 'quick_charge', name: 'Quick Charge', maxLevel: 3, weight: 5, itemMultiplier: 2, bookMultiplier: 1 },
  multishot: { id: 'multishot', name: 'Multishot', maxLevel: 1, weight: 2, itemMultiplier: 4, bookMultiplier: 2, incompatibleWith: ['piercing'] },
  piercing: { id: 'piercing', name: 'Piercing', maxLevel: 4, weight: 10, itemMultiplier: 1, bookMultiplier: 1, incompatibleWith: ['multishot'] },

  // Trident
  loyalty: { id: 'loyalty', name: 'Loyalty', maxLevel: 3, weight: 5, itemMultiplier: 2, bookMultiplier: 1, incompatibleWith: ['riptide'] },
  channeling: { id: 'channeling', name: 'Channeling', maxLevel: 1, weight: 1, itemMultiplier: 8, bookMultiplier: 4, incompatibleWith: ['riptide'] },
  riptide: { id: 'riptide', name: 'Riptide', maxLevel: 3, weight: 2, itemMultiplier: 4, bookMultiplier: 2, incompatibleWith: ['loyalty', 'channeling'] },
  impaling: { id: 'impaling', name: 'Impaling', maxLevel: 5, weight: 2, itemMultiplier: 4, bookMultiplier: 2 }
};

const ITEM_PRESETS: ItemPreset[] = [
  {
    id: 'sword',
    name: 'Netherite / Diamond Sword',
    category: 'Weapons',
    icon: Sword,
    availableEnchantments: ['sharpness', 'smite', 'bane_of_arthropods', 'unbreaking', 'mending', 'looting', 'sweeping_edge', 'fire_aspect', 'knockback']
  },
  {
    id: 'pickaxe',
    name: 'Pickaxe',
    category: 'Tools',
    icon: Wrench,
    availableEnchantments: ['efficiency', 'unbreaking', 'mending', 'fortune', 'silk_touch']
  },
  {
    id: 'helmet',
    name: 'Helmet',
    category: 'Armor',
    icon: Shield,
    availableEnchantments: ['protection', 'fire_protection', 'blast_protection', 'projectile_protection', 'respiration', 'aqua_affinity', 'unbreaking', 'mending', 'thorns']
  },
  {
    id: 'chestplate',
    name: 'Chestplate',
    category: 'Armor',
    icon: Shield,
    availableEnchantments: ['protection', 'fire_protection', 'blast_protection', 'projectile_protection', 'unbreaking', 'mending', 'thorns']
  },
  {
    id: 'boots',
    name: 'Boots',
    category: 'Armor',
    icon: Zap,
    availableEnchantments: ['protection', 'fire_protection', 'blast_protection', 'projectile_protection', 'feather_falling', 'depth_strider', 'soul_speed', 'unbreaking', 'mending', 'thorns']
  },
  {
    id: 'bow',
    name: 'Bow',
    category: 'Ranged',
    icon: Crosshair,
    availableEnchantments: ['power', 'flame', 'punch', 'unbreaking', 'infinity', 'mending']
  },
  {
    id: 'trident',
    name: 'Trident',
    category: 'Weapons',
    icon: Sparkles,
    availableEnchantments: ['impaling', 'loyalty', 'channeling', 'unbreaking', 'mending']
  },
  {
    id: 'elytra',
    name: 'Elytra',
    category: 'Utility',
    icon: Wind,
    availableEnchantments: ['unbreaking', 'mending']
  }
];

interface CombineStep {
  stepNum: number;
  leftItem: string;
  rightItem: string;
  resultingItem: string;
  levelCost: number;
  explanation: string;
}

export default function MinecraftEnchantmentCalculator() {
  const [selectedItemId, setSelectedItemId] = useState<string>('sword');
  const [selectedEnchants, setSelectedEnchants] = useState<Record<string, number>>({
    sharpness: 5,
    unbreaking: 3,
    mending: 1,
    looting: 3,
    sweeping_edge: 3,
    fire_aspect: 2
  });

  const currentItem = useMemo(() => {
    return ITEM_PRESETS.find(i => i.id === selectedItemId) || ITEM_PRESETS[0];
  }, [selectedItemId]);

  // Handle selecting / changing item
  const handleItemSelect = (item: ItemPreset) => {
    setSelectedItemId(item.id);
    // Auto-select sensible max defaults
    const defaults: Record<string, number> = {};
    item.availableEnchantments.forEach(encKey => {
      const def = ALL_ENCHANTMENTS[encKey];
      if (def) {
        // Exclude conflicts by default (e.g. don't pick silk_touch if fortune is already picked)
        const hasConflict = Object.keys(defaults).some(existingKey => {
          return ALL_ENCHANTMENTS[existingKey]?.incompatibleWith?.includes(encKey);
        });
        if (!hasConflict && def.id !== 'smite' && def.id !== 'bane_of_arthropods' && def.id !== 'silk_touch' && def.id !== 'fire_protection' && def.id !== 'blast_protection' && def.id !== 'projectile_protection') {
          defaults[encKey] = def.maxLevel;
        }
      }
    });
    setSelectedEnchants(defaults);
  };

  // Toggle or adjust an enchantment
  const toggleEnchant = (encKey: string) => {
    const def = ALL_ENCHANTMENTS[encKey];
    if (!def) return;

    if (selectedEnchants[encKey]) {
      const next = { ...selectedEnchants };
      delete next[encKey];
      setSelectedEnchants(next);
    } else {
      const next = { ...selectedEnchants };
      // Remove any conflicting enchantments
      if (def.incompatibleWith) {
        def.incompatibleWith.forEach(conflictKey => {
          delete next[conflictKey];
        });
      }
      next[encKey] = def.maxLevel;
      setSelectedEnchants(next);
    }
  };

  // Generate binary tree combine order
  const plan = useMemo(() => {
    const enchantsList = Object.entries(selectedEnchants).map(([key, lvl]) => ({
      key,
      level: lvl,
      def: ALL_ENCHANTMENTS[key]
    })).filter(e => e.def);

    // Sort by multiplier / cost to place heaviest books early in tree
    enchantsList.sort((a, b) => (b.def.bookMultiplier * b.level) - (a.def.bookMultiplier * a.level));

    const steps: CombineStep[] = [];
    let totalLevelCost = 0;

    if (enchantsList.length === 0) {
      return { steps, totalLevelCost, maxStepCost: 0, isTooExpensive: false };
    }

    // Pairwise binary combination simulation
    // Nodes represent items/books with their name, Prior Work Penalty (PWP), and list of enchantments
    interface Node {
      name: string;
      pwp: number; // 0, 1, 3, 7, 15...
      enchants: Array<{ name: string; level: number; cost: number }>;
      isBaseItem?: boolean;
    }

    let nodes: Node[] = enchantsList.map(e => ({
      name: `Book (${e.def.name} ${e.level})`,
      pwp: 0,
      enchants: [{ name: e.def.name, level: e.level, cost: e.def.itemMultiplier * e.level }]
    }));

    let stepCounter = 1;

    // First pair up books into sub-trees
    while (nodes.length > 1) {
      const nextLevelNodes: Node[] = [];
      for (let i = 0; i < nodes.length; i += 2) {
        if (i + 1 < nodes.length) {
          const left = nodes[i];
          const right = nodes[i + 1];
          // Anvil cost: PWP of left + PWP of right + transfer cost of enchantments
          const transferCost = right.enchants.reduce((acc, curr) => acc + curr.cost, 0);
          const pwpCost = left.pwp + right.pwp;
          const stepCost = pwpCost + transferCost;
          totalLevelCost += stepCost;

          const combinedNode: Node = {
            name: `Combo Book (${left.enchants.map(e => e.name).join(' + ')} + ${right.enchants.map(e => e.name).join(' + ')})`,
            pwp: Math.max(left.pwp, right.pwp) * 2 + 1,
            enchants: [...left.enchants, ...right.enchants]
          };

          steps.push({
            stepNum: stepCounter++,
            leftItem: left.name,
            rightItem: right.name,
            resultingItem: combinedNode.name,
            levelCost: stepCost,
            explanation: `PWP (${left.pwp} + ${right.pwp}) + Book Enchant Cost (${transferCost} lvl)`
          });

          nextLevelNodes.push(combinedNode);
        } else {
          // Odd node passes directly to next tier
          nextLevelNodes.push(nodes[i]);
        }
      }
      nodes = nextLevelNodes;
    }

    // Finally combine the master book with the base item
    const masterBook = nodes[0];
    if (masterBook) {
      const transferCost = masterBook.enchants.reduce((acc, curr) => acc + curr.cost, 0);
      const finalCost = masterBook.pwp + transferCost; // Base item has PWP = 0
      totalLevelCost += finalCost;

      steps.push({
        stepNum: stepCounter++,
        leftItem: currentItem.name,
        rightItem: masterBook.name,
        resultingItem: `✨ Fully Enchanted ${currentItem.name}`,
        levelCost: finalCost,
        explanation: `Base Tool (PWP 0) + Master Book (PWP ${masterBook.pwp}) + Total Enchants (${transferCost} lvl)`
      });
    }

    const maxStepCost = Math.max(...steps.map(s => s.levelCost), 0);
    const isTooExpensive = maxStepCost >= 40;

    return { steps, totalLevelCost, maxStepCost, isTooExpensive };
  }, [selectedEnchants, currentItem]);

  return (
    <div className="space-y-6">
      {/* Item Presets Grid */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800">
          <Sword className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-zinc-100">
            Step 1: Choose Your Tool or Armor Piece
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {ITEM_PRESETS.map((item) => {
            const isSelected = selectedItemId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemSelect(item)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold shadow-lg glow-emerald'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-zinc-400'}`} />
                <span className="text-xs truncate max-w-[90px]">{item.name.replace('Netherite / Diamond ', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Enchantment Selector Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-zinc-800 gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-zinc-100">
              Step 2: Select Desired Enchantments for {currentItem.name}
            </h3>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            {Object.keys(selectedEnchants).length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentItem.availableEnchantments.map((encKey) => {
            const def = ALL_ENCHANTMENTS[encKey];
            if (!def) return null;
            const isSelected = !!selectedEnchants[encKey];
            const currentLvl = selectedEnchants[encKey] || def.maxLevel;

            return (
              <div
                key={encKey}
                onClick={() => toggleEnchant(encKey)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500/60 text-white'
                    : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border text-xs font-bold ${
                    isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-zinc-700 bg-zinc-900 text-transparent'
                  }`}>
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-semibold block text-zinc-200">{def.name}</span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Max: Tier {def.maxLevel} • {def.incompatibleWith ? 'Has Conflicts' : 'Safe'}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                    Tier {currentLvl}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Optimized Combine Tree Results */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-zinc-800 gap-2">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-zinc-100">
              Optimal Anvil Combining Sequence (Binary Tree)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
              Total XP Cost: ~{plan.totalLevelCost} Levels
            </span>
          </div>
        </div>

        {plan.isTooExpensive && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-500/50 rounded-lg flex items-center gap-2.5 text-red-200 text-xs">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span>
              Warning: Combining sequentially would exceed the 39-level anvil limit. Follow the exact pairwise binary order below to succeed!
            </span>
          </div>
        )}

        {plan.steps.length === 0 ? (
          <p className="text-center py-8 text-zinc-500 text-xs">
            Select at least one enchantment above to generate your optimal anvil sequence.
          </p>
        ) : (
          <div className="space-y-3">
            {plan.steps.map((step) => (
              <div
                key={step.stepNum}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                    {step.stepNum}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 font-medium text-zinc-200 flex-wrap">
                      <span className="text-emerald-300 font-mono">{step.leftItem}</span>
                      <span className="text-zinc-500">+</span>
                      <span className="text-purple-300 font-mono">{step.rightItem}</span>
                    </div>
                    <span className="text-[11px] text-zinc-500 block mt-0.5">
                      {step.explanation}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded border border-emerald-900">
                    Cost: {step.levelCost} Levels
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
