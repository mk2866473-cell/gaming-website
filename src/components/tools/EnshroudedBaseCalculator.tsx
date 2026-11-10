/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Hammer, 
  Flame, 
  Boxes, 
  UserCheck, 
  Wrench, 
  CheckCircle2, 
  RotateCcw, 
  Copy, 
  Plus, 
  Trash2, 
  Compass, 
  Info,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  ENSHROUDED_BLOCK_RECIPES, 
  calculateSingleBlockRequirements, 
  BuildingBlockRecipe, 
  MaterialRequirementSummary 
} from '../../data/enshroudedData';

export const EnshroudedBaseCalculator: React.FC = () => {
  // Single Calculator State
  const [selectedBlockId, setSelectedBlockId] = useState<string>('shroud_wood_block');
  const [targetBlockCount, setTargetBlockCount] = useState<number>(500);

  // Multi-Block Blueprint Project List
  const [projectBlocks, setProjectBlocks] = useState<Array<{ id: string; blockId: string; quantity: number }>>([
    { id: '1', blockId: 'shroud_wood_block', quantity: 500 },
    { id: '2', blockId: 'highly_refined_stone', quantity: 300 },
  ]);

  const [mode, setMode] = useState<'single' | 'project'>('single');
  const [copied, setCopied] = useState(false);

  // Single block result calculation
  const singleResult: MaterialRequirementSummary | null = calculateSingleBlockRequirements(
    selectedBlockId,
    targetBlockCount
  );

  // Multi-Block Project Total Aggregation
  const aggregatedRawMaterials: Record<string, { quantity: number; locationTip: string }> = {};
  const requiredNpcs = new Set<string>();
  const requiredStations = new Set<string>();
  let maxFlameLevel = 1;

  projectBlocks.forEach(item => {
    const res = calculateSingleBlockRequirements(item.blockId, item.quantity);
    if (res) {
      requiredNpcs.add(res.npc);
      requiredStations.add(res.station);
      if (res.flameLevel > maxFlameLevel) maxFlameLevel = res.flameLevel;

      res.rawMaterials.forEach(mat => {
        if (!aggregatedRawMaterials[mat.name]) {
          aggregatedRawMaterials[mat.name] = { quantity: 0, locationTip: mat.locationTip };
        }
        aggregatedRawMaterials[mat.name].quantity += mat.quantity;
      });
    }
  });

  // Handle adding new block to project
  const addProjectBlock = () => {
    setProjectBlocks(prev => [
      ...prev,
      { id: Date.now().toString(), blockId: 'rough_wood_block', quantity: 200 }
    ]);
  };

  const removeProjectBlock = (id: string) => {
    setProjectBlocks(prev => prev.filter(p => p.id !== id));
  };

  const updateProjectBlock = (id: string, blockId: string, quantity: number) => {
    setProjectBlocks(prev => prev.map(p => p.id === id ? { ...p, blockId, quantity } : p));
  };

  const handleCopySingle = () => {
    if (!singleResult) return;
    const lines = [
      `🔥 ENSHROUDED BASE BUILDING MANIFEST`,
      `• Target: ${singleResult.targetBlocks}x ${singleResult.blockType.name}`,
      `• Craft Bundles Needed: ${singleResult.bundlesNeeded} (at 100 blocks/craft)`,
      `• Craftsman NPC: ${singleResult.npc} | Station: ${singleResult.station}`,
      `• Flame Altar Level: Level ${singleResult.flameLevel} (${singleResult.region})`,
      `• Raw Base Components Needed:`,
      ...singleResult.rawMaterials.map(m => `  - ${m.name}: x${m.quantity}`),
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyProject = () => {
    const lines = [
      `🏰 ENSHROUDED MULTI-BLOCK BASE BLUEPRINT`,
      `• Required Flame Level: Level ${maxFlameLevel}`,
      `• Unlocked Craftsmen: ${Array.from(requiredNpcs).join(', ')}`,
      `• Workbenches Needed: ${Array.from(requiredStations).join(', ')}`,
      `• Aggregated Raw Components Needed:`,
      ...Object.entries(aggregatedRawMaterials).map(([name, obj]) => `  - ${name}: x${obj.quantity}`),
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Embervale Dark Fantasy Flame Header */}
      <div className="relative bg-gradient-to-r from-slate-950 via-amber-950/80 to-slate-950 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-amber-500/30 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-950 border border-amber-500/60 rounded-xl text-amber-400 shadow-lg shadow-amber-950">
              <Flame className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40">
                EMBERVALE FLAME ALTAR BLUEPRINT SYSTEM
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
                Enshrouded Base Building Calculator
              </h1>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-900 border border-amber-500/30 p-1.5 rounded-xl shrink-0">
            <button
              onClick={() => setMode('single')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                mode === 'single'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Single Block
            </button>
            <button
              onClick={() => setMode('project')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                mode === 'project'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Multi-Block Base Project
            </button>
          </div>
        </div>

        {/* Dynamic Header Summary for Single Block */}
        {mode === 'single' && singleResult && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Blocks</span>
              <span className="text-xl font-black text-white font-mono">{singleResult.blockType.name}</span>
              <span className="text-xs text-amber-400 font-bold block">x{singleResult.targetBlocks} Blocks</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Craft Action Bundles</span>
              <span className="text-xl font-black text-amber-400 font-mono">{singleResult.bundlesNeeded} Crafts</span>
              <span className="text-xs text-slate-400 block">(100 blocks per bundle)</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Required Craftsman NPC</span>
              <span className="text-xl font-black text-emerald-400 font-mono">{singleResult.npc}</span>
              <span className="text-xs text-slate-300 font-bold block">Station: {singleResult.station}</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Flame Altar Level</span>
              <span className="text-xl font-black text-purple-400 font-mono">Level {singleResult.flameLevel}</span>
              <span className="text-xs text-slate-400 block">Region: {singleResult.region}</span>
            </div>
          </div>
        )}
      </div>

      {/* Mode 1: Single Block Calculator */}
      {mode === 'single' && singleResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Block Selection Controls */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-amber-400" /> Select Building Block Type
              </h3>
              <button
                onClick={handleCopySingle}
                className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono flex items-center gap-1.5 shadow"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Manifest'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.values(ENSHROUDED_BLOCK_RECIPES).map(block => {
                const isActive = block.id === selectedBlockId;
                return (
                  <button
                    key={block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-950 border-amber-500 text-white shadow-md ring-1 ring-amber-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs block">{block.name}</span>
                      <span className="text-[10px] text-slate-400 capitalize block mt-0.5">
                        {block.npc} ({block.station})
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 shrink-0 font-bold">
                      Lvl {block.flameLevel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Target Quantity Input Slider */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Target Number of Blocks to Craft:
                </label>
                <span className="font-mono text-base font-bold text-amber-400">{targetBlockCount} Blocks</span>
              </div>

              <input
                type="range"
                min={100}
                max={20000}
                step={100}
                value={targetBlockCount}
                onChange={e => setTargetBlockCount(parseInt(e.target.value) || 100)}
                className="w-full accent-amber-500 bg-slate-950 h-2.5 rounded-lg border border-slate-800 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>100 (Small Cottage)</span>
                <span>1,000 (Medium Keep)</span>
                <span>5,000 (Large Castle)</span>
                <span>20,000 (Mega Fortress)</span>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Raw Base Component Requirements */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Hammer className="w-5 h-5 text-amber-400" /> Total Base Components Needed
            </h3>

            <div className="space-y-3">
              {singleResult.rawMaterials.map((mat, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{mat.name}</span>
                    <span className="font-mono text-sm font-bold text-amber-400">x{mat.quantity}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    💡 <span className="text-slate-300">{mat.locationTip}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <UserCheck className="w-4 h-4 text-emerald-400" /> Craftsman NPC:
                </span>
                <span className="font-bold text-white">{singleResult.npc}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Wrench className="w-4 h-4 text-amber-400" /> Craft Station:
                </span>
                <span className="font-bold text-white">{singleResult.station}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Multi-Block Project Builder */}
      {mode === 'project' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Project Blocks List */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" /> Multi-Block Base Project Blueprint
              </h3>
              <button
                onClick={addProjectBlock}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1 font-mono"
              >
                <Plus className="w-4 h-4" /> Add Block Type
              </button>
            </div>

            <div className="space-y-3">
              {projectBlocks.map(item => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <select
                    value={item.blockId}
                    onChange={e => updateProjectBlock(item.id, e.target.value, item.quantity)}
                    className="w-full sm:w-auto flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                  >
                    {Object.values(ENSHROUDED_BLOCK_RECIPES).map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.npc})
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <input
                      type="number"
                      min={100}
                      step={100}
                      value={item.quantity}
                      onChange={e => updateProjectBlock(item.id, item.blockId, parseInt(e.target.value) || 100)}
                      className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-white text-center"
                    />
                    <span className="text-xs font-mono text-slate-400">Blocks</span>

                    <button
                      onClick={() => removeProjectBlock(item.id)}
                      className="p-1.5 rounded text-slate-500 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 1 Col: Aggregated Project Shopping List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                Project Unified Material Total
              </h3>
              <button
                onClick={handleCopyProject}
                className="px-2.5 py-1 text-[11px] font-bold rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono"
              >
                Copy
              </button>
            </div>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {Object.entries(aggregatedRawMaterials).map(([name, obj]) => (
                <div key={name} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{name}</span>
                  <span className="font-mono font-bold text-amber-400">x{obj.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
              <div>Required Flame Level: <span className="text-purple-400 font-bold">Level {maxFlameLevel}</span></div>
              <div>Craftsmen: <span className="text-emerald-400 font-bold">{Array.from(requiredNpcs).join(', ')}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
