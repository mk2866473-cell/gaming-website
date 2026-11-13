/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  ArrowRight,
  Clock,
  Sparkles,
  AlertTriangle,
  Info,
  Layers
} from 'lucide-react';

export interface PotionBrewStep {
  from: string;
  ingredient: string;
  to: string;
  note?: string;
}

export interface PotionEntry {
  id: string;
  name: string;
  ingredientInto: string;
  baseResult: string;
  extendedResult: string | null;
  enhancedResult: string | null;
  steps: PotionBrewStep[];
  colorHex: string;
  addedIn121?: boolean;
}

export const POTION_DATA: PotionEntry[] = [
  {
    id: 'healing',
    name: 'Healing',
    ingredientInto: 'Glistering Melon Slice (into Awkward)',
    baseResult: 'Instant, 4 HP',
    extendedResult: null,
    enhancedResult: 'Healing II, 8 HP',
    colorHex: '#F82423',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Glistering Melon Slice', to: 'Potion of Healing' }
    ]
  },
  {
    id: 'fire-resistance',
    name: 'Fire Resistance',
    ingredientInto: 'Magma Cream (into Awkward)',
    baseResult: '3:00',
    extendedResult: '8:00',
    enhancedResult: null,
    colorHex: '#E49A3A',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Magma Cream', to: 'Potion of Fire Resistance' }
    ]
  },
  {
    id: 'regeneration',
    name: 'Regeneration',
    ingredientInto: 'Ghast Tear (into Awkward)',
    baseResult: '0:45',
    extendedResult: '1:30',
    enhancedResult: 'II — 0:22',
    colorHex: '#CD5CAB',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Ghast Tear', to: 'Potion of Regeneration' }
    ]
  },
  {
    id: 'strength',
    name: 'Strength',
    ingredientInto: 'Blaze Powder (into Awkward)',
    baseResult: '3:00',
    extendedResult: '8:00',
    enhancedResult: 'II — 1:30',
    colorHex: '#932423',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Blaze Powder', to: 'Potion of Strength' }
    ]
  },
  {
    id: 'swiftness',
    name: 'Swiftness',
    ingredientInto: 'Sugar (into Awkward)',
    baseResult: '3:00',
    extendedResult: '8:00',
    enhancedResult: 'II — 1:30',
    colorHex: '#7CAFC6',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Sugar', to: 'Potion of Swiftness' }
    ]
  },
  {
    id: 'night-vision',
    name: 'Night Vision',
    ingredientInto: 'Golden Carrot (into Awkward)',
    baseResult: '3:00',
    extendedResult: '8:00',
    enhancedResult: null,
    colorHex: '#1F1FA1',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Golden Carrot', to: 'Potion of Night Vision' }
    ]
  },
  {
    id: 'invisibility',
    name: 'Invisibility',
    ingredientInto: 'Fermented Spider Eye into a Night Vision potion',
    baseResult: '3:00',
    extendedResult: '8:00',
    enhancedResult: null,
    colorHex: '#7F8392',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Golden Carrot', to: 'Potion of Night Vision' },
      { from: 'Potion of Night Vision', ingredient: 'Fermented Spider Eye', to: 'Potion of Invisibility' }
    ]
  },
  {
    id: 'water-breathing',
    name: 'Water Breathing',
    ingredientInto: 'Pufferfish (into Awkward)',
    baseResult: '3:00',
    extendedResult: '8:00',
    enhancedResult: null,
    colorHex: '#2E5299',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Pufferfish', to: 'Potion of Water Breathing' }
    ]
  },
  {
    id: 'leaping',
    name: 'Leaping',
    ingredientInto: "Rabbit's Foot (into Awkward)",
    baseResult: '3:00',
    extendedResult: '8:00',
    enhancedResult: 'II — 1:30',
    colorHex: '#22FF4C',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: "Rabbit's Foot", to: 'Potion of Leaping' }
    ]
  },
  {
    id: 'slow-falling',
    name: 'Slow Falling',
    ingredientInto: 'Phantom Membrane (into Awkward)',
    baseResult: '1:30',
    extendedResult: '4:00',
    enhancedResult: null,
    colorHex: '#FFEFD1',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Phantom Membrane', to: 'Potion of Slow Falling' }
    ]
  },
  {
    id: 'poison',
    name: 'Poison',
    ingredientInto: 'Spider Eye (into Awkward)',
    baseResult: '0:45',
    extendedResult: '1:30',
    enhancedResult: 'II — 0:21',
    colorHex: '#4E9331',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Spider Eye', to: 'Potion of Poison' }
    ]
  },
  {
    id: 'weakness',
    name: 'Weakness',
    ingredientInto: 'Fermented Spider Eye into a plain WATER BOTTLE (no nether wart — the only potion brewed this way)',
    baseResult: '1:30',
    extendedResult: '4:00',
    enhancedResult: null,
    colorHex: '#484D48',
    steps: [
      {
        from: 'Water Bottle (plain)',
        ingredient: 'Fermented Spider Eye',
        to: 'Potion of Weakness',
        note: 'No Nether Wart required — the only potion brewed directly from a plain Water Bottle.'
      }
    ]
  },
  {
    id: 'harming',
    name: 'Harming',
    ingredientInto: 'Fermented Spider Eye into a Healing or Poison potion',
    baseResult: 'Instant, 6 HP damage',
    extendedResult: null,
    enhancedResult: 'II — 12 HP',
    colorHex: '#430A09',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      {
        from: 'Awkward Potion',
        ingredient: 'Glistering Melon Slice (or Spider Eye)',
        to: 'Potion of Healing (or Poison)'
      },
      {
        from: 'Potion of Healing / Poison',
        ingredient: 'Fermented Spider Eye',
        to: 'Potion of Harming'
      }
    ]
  },
  {
    id: 'slowness',
    name: 'Slowness',
    ingredientInto: 'Fermented Spider Eye into a Swiftness or Leaping potion',
    baseResult: '1:30',
    extendedResult: '4:00',
    enhancedResult: 'Slowness IV — 0:20',
    colorHex: '#5A6C81',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      {
        from: 'Awkward Potion',
        ingredient: "Sugar (or Rabbit's Foot)",
        to: 'Potion of Swiftness (or Leaping)'
      },
      {
        from: 'Potion of Swiftness / Leaping',
        ingredient: 'Fermented Spider Eye',
        to: 'Potion of Slowness'
      }
    ]
  },
  {
    id: 'turtle-master',
    name: 'Turtle Master',
    ingredientInto: 'Turtle Shell (into Awkward)',
    baseResult: 'Slowness IV + Resistance III, 0:20',
    extendedResult: '0:40',
    enhancedResult: 'Slowness VI + Resistance IV, 0:20',
    colorHex: '#9945FF',
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Turtle Shell', to: 'Potion of the Turtle Master' }
    ]
  },
  {
    id: 'oozing',
    name: 'Oozing (1.21)',
    ingredientInto: 'Slime Block (into Awkward)',
    baseResult: '3:00',
    extendedResult: null,
    enhancedResult: null,
    colorHex: '#99FFA3',
    addedIn121: true,
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Slime Block', to: 'Potion of Oozing' }
    ]
  },
  {
    id: 'weaving',
    name: 'Weaving (1.21)',
    ingredientInto: 'Cobweb (into Awkward)',
    baseResult: '3:00',
    extendedResult: null,
    enhancedResult: null,
    colorHex: '#78695A',
    addedIn121: true,
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Cobweb', to: 'Potion of Weaving' }
    ]
  },
  {
    id: 'infestation',
    name: 'Infestation (1.21)',
    ingredientInto: 'Stone (into Awkward)',
    baseResult: '3:00',
    extendedResult: null,
    enhancedResult: null,
    colorHex: '#8C9B8C',
    addedIn121: true,
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Stone', to: 'Potion of Infestation' }
    ]
  },
  {
    id: 'wind-charging',
    name: 'Wind Charging (1.21)',
    ingredientInto: 'Breeze Rod (into Awkward)',
    baseResult: '3:00',
    extendedResult: null,
    enhancedResult: null,
    colorHex: '#BDC9FF',
    addedIn121: true,
    steps: [
      { from: 'Water Bottle', ingredient: 'Nether Wart', to: 'Awkward Potion' },
      { from: 'Awkward Potion', ingredient: 'Breeze Rod', to: 'Potion of Wind Charging' }
    ]
  }
];

/**
 * Computes the lingering potion duration/effect string as 1/4 of the drinkable duration.
 */
export function computeLingeringValue(drinkText: string): string {
  const match = drinkText.match(/(\d+):(\d{2})/);
  if (!match) {
    return `${drinkText} (Instant — Lingering cloud does not extend duration)`;
  }
  const mins = parseInt(match[1], 10);
  const secs = parseInt(match[2], 10);
  const totalSec = mins * 60 + secs;
  const quarterSec = totalSec / 4;

  const qMins = Math.floor(quarterSec / 60);
  const qRem = quarterSec - qMins * 60;
  const formattedSec = Number.isInteger(qRem)
    ? String(qRem).padStart(2, '0')
    : `${Math.floor(qRem).toString().padStart(2, '0')}.5`;

  const quarterClock = `${qMins}:${formattedSec}`;
  return drinkText.replace(match[0], quarterClock);
}

type ModifierChoice = 'base' | 'redstone' | 'glowstone';
type DeliveryForm = 'drink' | 'splash' | 'lingering';

export default function MinecraftBrewingCalculator() {
  const [selectedId, setSelectedId] = useState<string>('fire-resistance');
  const [modifier, setModifier] = useState<ModifierChoice>('base');
  const [deliveryForm, setDeliveryForm] = useState<DeliveryForm>('drink');

  const potion = useMemo(
    () => POTION_DATA.find((p) => p.id === selectedId) ?? POTION_DATA[0],
    [selectedId]
  );

  // If user switches to a potion that doesn't support current modifier, fall back to base cleanly
  const activeModifier: ModifierChoice =
    modifier === 'redstone' && !potion.extendedResult
      ? 'base'
      : modifier === 'glowstone' && !potion.enhancedResult
        ? 'base'
        : modifier;

  const drinkResult =
    activeModifier === 'redstone'
      ? potion.extendedResult!
      : activeModifier === 'glowstone'
        ? potion.enhancedResult!
        : potion.baseResult;

  const finalResult =
    deliveryForm === 'lingering' ? computeLingeringValue(drinkResult) : drinkResult;

  const fullSteps = useMemo(() => {
    const steps: PotionBrewStep[] = [...potion.steps];
    const currentName = steps[steps.length - 1].to;

    let modifiedName = currentName;
    if (activeModifier === 'redstone') {
      modifiedName = `${currentName} (Extended)`;
      steps.push({
        from: currentName,
        ingredient: 'Redstone Dust',
        to: modifiedName
      });
    } else if (activeModifier === 'glowstone') {
      modifiedName = `${currentName} (Enhanced)`;
      steps.push({
        from: currentName,
        ingredient: 'Glowstone Dust',
        to: modifiedName
      });
    }

    if (deliveryForm === 'splash' || deliveryForm === 'lingering') {
      const splashName = `Splash ${modifiedName}`;
      steps.push({
        from: modifiedName,
        ingredient: 'Gunpowder',
        to: splashName
      });
      if (deliveryForm === 'lingering') {
        steps.push({
          from: splashName,
          ingredient: "Dragon's Breath",
          to: `Lingering ${modifiedName}`
        });
      }
    }

    return steps;
  }, [potion, activeModifier, deliveryForm]);

  return (
    <div className="space-y-6">
      {/* Brewing Rules Banner */}
      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed">
          <span className="font-bold text-emerald-300">Java Edition Brewing Rules:</span>{' '}
          Most potions start from an <strong className="text-white">Awkward Potion</strong> (Water Bottle + Nether Wart).{' '}
          <strong className="text-white">Redstone</strong> and <strong className="text-white">Glowstone</strong> cannot be combined on one potion.{' '}
          <strong className="text-white">Gunpowder</strong> makes a Splash potion at the same duration;{' '}
          <strong className="text-white">Dragon&apos;s Breath</strong> turns a Splash potion into a Lingering potion at <strong className="text-white">1/4</strong> of the drink duration.
        </div>
      </div>

      {/* Potion Picker Grid */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            1. Select a Potion ({POTION_DATA.length} Java Potions)
          </h3>
          <span className="text-xs font-mono text-zinc-400">{potion.name}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {POTION_DATA.map((item) => {
            const active = item.id === potion.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`px-3 py-2 rounded-lg border text-left text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  active
                    ? 'bg-emerald-500/20 border-emerald-400 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0 border border-white/20"
                  style={{ backgroundColor: item.colorHex }}
                />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modifier + Delivery Form Controls + Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Modifier & Form Toggles + Full Path */}
        <div className="lg:col-span-7 space-y-5">
          {/* Modifiers & Delivery Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">
              2. Modifiers &amp; Delivery Form
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Modifier: Base / Redstone / Glowstone */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-300 block">
                  Duration / Potency (Cannot Combine)
                </span>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setModifier('base')}
                    className={`w-full px-3 py-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer ${
                      activeModifier === 'base'
                        ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    <span>Base (None)</span>
                    <span className="font-mono text-zinc-300">{potion.baseResult}</span>
                  </button>

                  <button
                    type="button"
                    disabled={!potion.extendedResult}
                    onClick={() => setModifier('redstone')}
                    className={`w-full px-3 py-2 rounded-lg border text-xs flex items-center justify-between ${
                      !potion.extendedResult
                        ? 'bg-zinc-950/50 border-zinc-800/60 text-zinc-500 cursor-not-allowed'
                        : activeModifier === 'redstone'
                          ? 'bg-rose-500/20 border-rose-400 text-white font-bold cursor-pointer'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600 cursor-pointer'
                    }`}
                  >
                    <span>+ Redstone (Extended)</span>
                    <span className="font-mono">
                      {potion.extendedResult ?? 'cannot extend'}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={!potion.enhancedResult}
                    onClick={() => setModifier('glowstone')}
                    className={`w-full px-3 py-2 rounded-lg border text-xs flex items-center justify-between ${
                      !potion.enhancedResult
                        ? 'bg-zinc-950/50 border-zinc-800/60 text-zinc-500 cursor-not-allowed'
                        : activeModifier === 'glowstone'
                          ? 'bg-amber-500/20 border-amber-400 text-white font-bold cursor-pointer'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600 cursor-pointer'
                    }`}
                  >
                    <span>+ Glowstone (Level II+)</span>
                    <span className="font-mono">
                      {potion.enhancedResult ?? 'cannot enhance'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Delivery Form: Drinkable / Splash / Lingering */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-300 block">
                  Potion Bottle Form
                </span>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryForm('drink')}
                    className={`w-full px-3 py-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer ${
                      deliveryForm === 'drink'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    <span>Drinkable Bottle</span>
                    <span className="font-mono text-zinc-400">1× duration</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryForm('splash')}
                    className={`w-full px-3 py-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer ${
                      deliveryForm === 'splash'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    <span>Splash (+ Gunpowder)</span>
                    <span className="font-mono text-zinc-400">same duration</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryForm('lingering')}
                    className={`w-full px-3 py-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer ${
                      deliveryForm === 'lingering'
                        ? 'bg-purple-500/20 border-purple-400 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    <span>Lingering (+ Dragon&apos;s Breath)</span>
                    <span className="font-mono text-purple-300">1/4 duration</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Brewing Path */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Layers className="w-4 h-4 text-emerald-400" />
              3. Full Brewing Stand Path (In Order)
            </h3>

            <ol className="space-y-3">
              {fullSteps.map((step, idx) => (
                <li
                  key={`${step.from}-${step.ingredient}-${idx}`}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="space-y-1 text-xs flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 font-semibold text-white">
                      <span className="text-zinc-300">{step.from}</span>
                      <span className="text-zinc-500">+</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 font-mono">
                        {step.ingredient}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-cyan-300">{step.to}</span>
                    </div>
                    {step.note && (
                      <p className="text-[11px] text-amber-300 flex items-center gap-1.5 pt-0.5">
                        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                        {step.note}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right: Complete Stats & All Variants Comparison */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Output Banner */}
          <div className="bg-emerald-950/30 border border-emerald-500/50 rounded-xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Selected Potion Output
              </span>
              <span
                className="w-4 h-4 rounded-full border border-white/30"
                style={{ backgroundColor: potion.colorHex }}
              />
            </div>

            <div className="text-xl font-extrabold text-white">
              {deliveryForm === 'lingering'
                ? 'Lingering '
                : deliveryForm === 'splash'
                  ? 'Splash '
                  : ''}
              Potion of {potion.name}
            </div>

            <div className="bg-zinc-950/90 border border-zinc-800 rounded-lg p-3.5 flex items-center justify-between">
              <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Effect / Duration
              </span>
              <span className="font-mono font-bold text-emerald-300 text-sm text-right">
                {finalResult}
              </span>
            </div>

            <div className="text-[11px] text-zinc-400">
              Primary Ingredient: <strong className="text-zinc-200">{potion.ingredientInto}</strong>
            </div>
          </div>

          {/* Full Modifier & Bottle Comparison Matrix */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              All Options for {potion.name}
            </h3>

            <div className="space-y-2 text-xs">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex justify-between gap-3">
                <span className="text-zinc-400">Base Duration / Effect</span>
                <span className="font-mono font-bold text-white text-right">
                  {potion.baseResult}
                </span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex justify-between gap-3">
                <span className="text-zinc-400">Redstone (Extended)</span>
                <span
                  className={`font-mono font-bold text-right ${
                    potion.extendedResult ? 'text-rose-300' : 'text-zinc-500'
                  }`}
                >
                  {potion.extendedResult ?? 'cannot be extended'}
                </span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex justify-between gap-3">
                <span className="text-zinc-400">Glowstone (Level II+)</span>
                <span
                  className={`font-mono font-bold text-right ${
                    potion.enhancedResult ? 'text-amber-300' : 'text-zinc-500'
                  }`}
                >
                  {potion.enhancedResult ?? 'cannot be enhanced'}
                </span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex justify-between gap-3">
                <span className="text-zinc-400">Splash (+ Gunpowder)</span>
                <span className="font-mono font-bold text-cyan-300 text-right">
                  {drinkResult} (same duration)
                </span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex justify-between gap-3">
                <span className="text-zinc-400">Lingering (+ Dragon&apos;s Breath)</span>
                <span className="font-mono font-bold text-purple-300 text-right">
                  {computeLingeringValue(drinkResult)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
