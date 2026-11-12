/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sparkles, Calculator, Plus, Trash2, Info, Layers, Check } from 'lucide-react';
import { 
  VARIANTS, 
  ENVIRONMENTAL_MUTATIONS, 
  CustomMutation, 
  getEffectiveMutations 
} from '../../data/growAGardenData';

export default function GrowAGardenMutationCalculator() {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('rainbow');
  const [selectedMutationIds, setSelectedMutationIds] = useState<string[]>(['shocked', 'celestial']);

  // Custom Mutations
  const [customMutations, setCustomMutations] = useState<CustomMutation[]>([]);
  const [newCustomName, setNewCustomName] = useState<string>('');
  const [newCustomMultiplier, setNewCustomMultiplier] = useState<string>('');

  const activeVariant = VARIANTS.find(v => v.id === selectedVariantId) || VARIANTS[0];

  const effectiveMuts = useMemo(() => {
    return getEffectiveMutations(selectedMutationIds, customMutations);
  }, [selectedMutationIds, customMutations]);

  const mutationsWithTerms = useMemo(() => {
    return effectiveMuts.map(m => ({
      ...m,
      term: m.multiplier - 1
    }));
  }, [effectiveMuts]);

  const sumTerms = useMemo(() => {
    return mutationsWithTerms.reduce((acc, m) => acc + m.term, 0);
  }, [mutationsWithTerms]);

  const envBracket = Math.max(1, 1 + sumTerms);
  const combinedMultiplier = activeVariant.multiplier * envBracket;

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

  // Quick preset for the prompt's Rainbow + Shocked + Celestial example
  const loadPromptExample = () => {
    setSelectedVariantId('rainbow');
    setSelectedMutationIds(['shocked', 'celestial']);
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grow a Garden Mutation Stacking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Mutation Multiplier Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Pick one crop variant and stack environmental mutations to calculate the exact combined multiplier with full bracket math written out.
          </p>
        </div>
        <button
          type="button"
          onClick={loadPromptExample}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer"
        >
          Load Rainbow + Shocked + Celestial (×10,950)
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Variant Picker */}
          <div className="space-y-3 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
            <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              1. Select Crop Variant (Exactly One)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VARIANTS.map(v => {
                const isSelected = selectedVariantId === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
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

          {/* 2. Environmental Mutations */}
          <div className="space-y-3 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
                2. Select Environmental Mutations
              </label>
              <span className="text-[10px] font-mono text-violet-400 bg-violet-950/60 border border-violet-800/40 px-2 py-0.5 rounded">
                Formula: 1 + Σ(Multiplier − 1)
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Environmental mutations add inside the bracket. If Wet and Chilled are both selected, they fuse into Frozen (×10).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
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
                placeholder="Custom mutation name (e.g. Celestial II)"
                value={newCustomName}
                onChange={(e) => setNewCustomName(e.target.value)}
                className="flex-1 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Multiplier (e.g. 150)"
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
          <div className="bg-gradient-to-br from-violet-950/80 via-[#070b19] to-indigo-950/90 border border-violet-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-1">
              <span className="text-xs font-mono text-violet-400 uppercase tracking-widest font-bold">
                Combined Multiplier
              </span>
              <div className="text-3xl sm:text-5xl font-black text-cyan-300 tracking-tight flex items-baseline gap-2">
                <span>×{combinedMultiplier.toLocaleString()}</span>
              </div>
            </div>

            {/* Written Out Bracket Math */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-5 rounded-2xl space-y-3 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                Written-Out Bracket Math
              </span>

              <div className="font-mono text-xs text-amber-300 bg-[#0c122e] p-3.5 rounded-xl border border-indigo-900/60 leading-relaxed overflow-x-auto">
                <code>
                  {activeVariant.name} (×{activeVariant.multiplier}) × Bracket [1 + {mutationsWithTerms.length > 0 ? mutationsWithTerms.map(m => `(${m.name}: ${m.multiplier}−1 = ${m.term})`).join(' + ') : '0'}]
                  <br />
                  = {activeVariant.multiplier} × {envBracket} = <strong className="text-cyan-300 font-bold">×{combinedMultiplier.toLocaleString()}</strong>
                </code>
              </div>

              <div className="space-y-1.5 text-slate-300 text-[11px] pt-1">
                <div>• <strong className="text-white">Variant Multiplier:</strong> {activeVariant.name} = ×{activeVariant.multiplier}</div>
                <div>• <strong className="text-white">Env Sum Terms Σ(Env − 1):</strong> {sumTerms}</div>
                <div>• <strong className="text-white">Env Bracket [1 + Σ(Env − 1)]:</strong> max(1, 1 + {sumTerms}) = ×{envBracket}</div>
              </div>
            </div>

            {/* List of Applied Mutations */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                Active Mutations ({mutationsWithTerms.length})
              </span>
              {mutationsWithTerms.length > 0 ? (
                <div className="space-y-1.5">
                  {mutationsWithTerms.map(m => (
                    <div key={m.id} className="flex items-center justify-between text-[11px] font-mono bg-[#0c122e] px-3 py-1.5 rounded-lg border border-indigo-950">
                      <span className="text-slate-200">{m.name}</span>
                      <span className="text-violet-300 font-bold">×{m.multiplier} ➔ +{m.term}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-[11px] italic">No environmental mutations selected (Bracket = ×1)</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
