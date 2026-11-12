/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sprout, Calculator, Sparkles, Plus, Trash2, Info, Check, AlertCircle } from 'lucide-react';
import { 
  CROP_PRESETS, 
  VARIANTS, 
  ENVIRONMENTAL_MUTATIONS, 
  CustomMutation, 
  calculateCropValue,
  CropPreset
} from '../../data/growAGardenData';

export default function GrowAGardenCropValueCalculator() {
  // Inputs
  const [selectedCropId, setSelectedCropId] = useState<string>('carrot');
  const [customBaseValue, setCustomBaseValue] = useState<number>(100);
  const [customBaseWeight, setCustomBaseWeight] = useState<number>(0.5);

  const [actualWeight, setActualWeight] = useState<number>(0.55);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('gold');
  const [selectedMutationIds, setSelectedMutationIds] = useState<string[]>(['shocked', 'frozen']);
  const [friendBoostPercent, setFriendBoostPercent] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Custom Mutations
  const [customMutations, setCustomMutations] = useState<CustomMutation[]>([]);
  const [newCustomName, setNewCustomName] = useState<string>('');
  const [newCustomMultiplier, setNewCustomMultiplier] = useState<string>('');

  const isCustomCrop = selectedCropId === 'custom';
  const activePreset = CROP_PRESETS.find(c => c.id === selectedCropId);

  const baseValue = isCustomCrop ? customBaseValue : activePreset?.baseValue || 20;
  const baseWeight = isCustomCrop ? customBaseWeight : activePreset?.baseWeight || 0.275;

  const activeVariant = VARIANTS.find(v => v.id === selectedVariantId) || VARIANTS[0];

  // Calculation
  const result = useMemo(() => {
    return calculateCropValue({
      baseValue,
      baseWeight,
      actualWeight,
      variantMultiplier: activeVariant.multiplier,
      variantName: activeVariant.name,
      selectedMutationIds,
      customMutations,
      friendBoostPercent,
      quantity
    });
  }, [baseValue, baseWeight, actualWeight, activeVariant, selectedMutationIds, customMutations, friendBoostPercent, quantity]);

  const toggleMutation = (id: string) => {
    setSelectedMutationIds(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleAddCustomMutation = (e: React.FormEvent) => {
    e.preventDefault();
    const mult = parseFloat(newCustomMultiplier);
    if (!newCustomName.trim() || isNaN(mult) || mult <= 0) return;

    const id = `custom_${Date.now()}`;
    const newMut: CustomMutation = {
      id,
      name: newCustomName.trim(),
      multiplier: mult
    };

    setCustomMutations(prev => [...prev, newMut]);
    setSelectedMutationIds(prev => [...prev, id]);
    setNewCustomName('');
    setNewCustomMultiplier('');
  };

  const removeCustomMutation = (id: string) => {
    setCustomMutations(prev => prev.filter(m => m.id !== id));
    setSelectedMutationIds(prev => prev.filter(m => m !== id));
  };

  // Quick preset load for the worked example
  const loadWorkedExample = () => {
    setSelectedCropId('carrot');
    setActualWeight(0.55);
    setSelectedVariantId('gold');
    setSelectedMutationIds(['shocked', 'frozen']);
    setFriendBoostPercent(0);
    setQuantity(1);
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Sprout className="w-3.5 h-3.5" />
            <span>Roblox Grow a Garden</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Crop Value Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate exact crop sell values in Sheckles with variant multipliers, environmental mutation brackets, weight scaling, and friend boosts.
          </p>
        </div>
        <button
          type="button"
          onClick={loadWorkedExample}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer"
        >
          Load Worked Example (174,400 Sheckles)
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Crop Selection */}
          <div className="space-y-3 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
            <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              1. Select Crop / Preset
            </label>
            <div className="grid grid-cols-2 gap-3">
              {CROP_PRESETS.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCropId(c.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCropId === c.id
                      ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold shadow-md'
                      : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{c.name}</div>
                  <div className="text-[11px] font-mono text-emerald-400 mt-0.5">
                    {c.baseValue} Sheckles • {c.baseWeight} kg
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setSelectedCropId('custom')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCustomCrop
                    ? 'bg-violet-600/20 border-violet-500 text-white font-bold shadow-md'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Custom Crop</div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">Custom Base Value & Weight</div>
              </button>
            </div>

            {/* Custom Crop Inputs */}
            {isCustomCrop && (
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-indigo-950">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Base Value (Sheckles)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={customBaseValue}
                    onChange={(e) => setCustomBaseValue(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Base Weight (kg)</label>
                  <input
                    type="number"
                    min="0.001"
                    step="0.001"
                    value={customBaseWeight}
                    onChange={(e) => setCustomBaseWeight(Math.max(0.001, parseFloat(e.target.value) || 0.001))}
                    className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. Weight & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
            <div>
              <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block mb-1">
                Actual Weight (kg)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={actualWeight}
                onChange={(e) => setActualWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono text-amber-300 font-bold focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Base: {baseWeight} kg</span>
            </div>

            <div>
              <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block mb-1">
                Friend Boost (%)
              </label>
              <input
                type="number"
                min="0"
                max="500"
                step="1"
                value={friendBoostPercent}
                onChange={(e) => setFriendBoostPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">e.g. 10 = +10%</span>
            </div>

            <div>
              <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono text-white font-bold focus:outline-none focus:border-violet-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Number of crops</span>
            </div>
          </div>

          {/* 3. Variant Selection */}
          <div className="space-y-3 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
            <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              3. Select Variant (Exactly One)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VARIANTS.map(v => {
                const isSelected = selectedVariantId === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{v.name}</span>
                    <span className="font-mono text-[10px] bg-[#070b19] px-1.5 py-0.5 rounded border border-indigo-950">
                      ×{v.multiplier}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Environmental Mutations */}
          <div className="space-y-3 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
                4. Environmental Mutations (Multi-Select)
              </label>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                Sum (Multiplier − 1)
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Note: Wet (×2) and Chilled (×2) fuse into Frozen (×10) automatically if both are selected.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
              {ENVIRONMENTAL_MUTATIONS.map(m => {
                const isChecked = selectedMutationIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleMutation(m.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? 'bg-violet-600/30 border-violet-400 text-white shadow-sm'
                        : 'bg-[#0c122e] border-indigo-950 text-slate-400 hover:border-indigo-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate pr-1">{m.name}</span>
                    <span className="font-mono text-[10px] text-violet-300 shrink-0">
                      ×{m.multiplier}
                    </span>
                  </button>
                );
              })}

              {/* Custom Mutations list */}
              {customMutations.map(cm => {
                const isChecked = selectedMutationIds.includes(cm.id);
                return (
                  <div key={cm.id} className="relative group">
                    <button
                      type="button"
                      onClick={() => toggleMutation(cm.id)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between pr-7 ${
                        isChecked
                          ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200'
                          : 'bg-[#0c122e] border-indigo-950 text-slate-400'
                      }`}
                    >
                      <span className="truncate pr-1">{cm.name}</span>
                      <span className="font-mono text-[10px] text-cyan-300 shrink-0">
                        ×{cm.multiplier}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCustomMutation(cm.id)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-500 hover:text-rose-400 p-1"
                      title="Remove custom mutation"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Custom Mutation Adder */}
            <form onSubmit={handleAddCustomMutation} className="pt-3 border-t border-indigo-950 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Custom mutation name (e.g. Supernova)"
                value={newCustomName}
                onChange={(e) => setNewCustomName(e.target.value)}
                className="flex-1 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Multiplier (e.g. 50)"
                value={newCustomMultiplier}
                onChange={(e) => setNewCustomMultiplier(e.target.value)}
                className="w-full sm:w-28 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Total Card */}
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                Total Crop Value
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-2">
                <span>{result.totalValue.toLocaleString()}</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-400">Sheckles</span>
              </div>
            </div>

            {/* Quick Summary Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Weight Factor</span>
                <span className="text-amber-300 font-bold">{result.weightFactor.toFixed(4)}×</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Variant</span>
                <span className="text-amber-300 font-bold">{activeVariant.name} (×{activeVariant.multiplier})</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Env Bracket</span>
                <span className="text-violet-300 font-bold">×{result.envBracketMultiplier}</span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Combined Multiplier</span>
                <span className="text-cyan-300 font-bold">×{result.combinedMutationMultiplier.toLocaleString()}</span>
              </div>
            </div>

            {/* Formula Breakdown */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                Factor Breakdown
              </span>
              <div className="space-y-1.5 text-slate-300 font-mono text-[11px] leading-relaxed">
                <div>• Base Value: <span className="text-white font-bold">{baseValue}</span> Sheckles</div>
                <div>• Weight Scaling: <span className="text-amber-300 font-bold">({actualWeight}kg / {baseWeight}kg)² = {result.weightFactor.toFixed(4)}×</span></div>
                <div>• Variant: <span className="text-amber-300 font-bold">{activeVariant.name} (×{activeVariant.multiplier})</span></div>
                <div>• Env Bracket: <span className="text-violet-300 font-bold">×{result.envBracketMultiplier}</span> [1 + {result.sumEnvTerms}]</div>
                <div>• Friend Boost: <span className="text-cyan-300 font-bold">+{friendBoostPercent}% (×{result.friendBoostFactor.toFixed(2)})</span></div>
                <div>• Quantity: <span className="text-white font-bold">{quantity}</span></div>
              </div>
            </div>

            {/* Effective Mutations List */}
            {result.effectiveMutations.length > 0 && (
              <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                  Active Environmental Mutations ({result.effectiveMutations.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.effectiveMutations.map(m => (
                    <span
                      key={m.id}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border ${
                        m.isFused
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-violet-500/10 text-violet-300 border-violet-500/30'
                      }`}
                    >
                      {m.name} (×{m.multiplier} ➔ +{m.term})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
