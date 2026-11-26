/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Crosshair, Info, Copy, Check, RotateCcw } from 'lucide-react';
import {
  AdsCoefficient,
  AdsMode,
  CS2_HIPFIRE_FOV_43,
  CS2_YAW,
  VALORANT_HIPFIRE_FOV,
  VALORANT_YAW,
  calculateCs2ZoomTable,
  calculateCustomAdsSensitivity,
  calculateValorantAdsTable
} from '../../data/mouseLabData';

const YAW_PRESETS = [
  { id: 'valorant', label: 'Valorant (0.07)', yaw: 0.07 },
  { id: 'cs2', label: 'CS2 / Source / Apex (0.022)', yaw: 0.022 },
  { id: 'overwatch', label: 'Overwatch 2 (0.0066)', yaw: 0.0066 },
  { id: 'r6', label: 'Rainbow Six Siege (0.02133)', yaw: 0.02133 },
  { id: 'fortnite', label: 'Fortnite (0.005555)', yaw: 0.00555555 }
];

export default function AdsSensitivityCalculator() {
  const [mode, setMode] = useState<AdsMode>('valorant');
  const [coefficient, setCoefficient] = useState<AdsCoefficient>(0);

  // Shared / Custom Inputs
  const [hipfireSens, setHipfireSens] = useState<number>(0.35);
  const [dpi, setDpi] = useState<number>(800);
  const [yaw, setYaw] = useState<number>(VALORANT_YAW);
  const [hipfireFov, setHipfireFov] = useState<number>(103);
  const [scopedFov, setScopedFov] = useState<number>(82.4);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleModeChange = (nextMode: AdsMode) => {
    setMode(nextMode);
    if (nextMode === 'valorant') {
      setHipfireSens(0.35);
      setDpi(800);
      setYaw(VALORANT_YAW);
      setHipfireFov(VALORANT_HIPFIRE_FOV);
    } else if (nextMode === 'cs2') {
      setHipfireSens(1.2);
      setDpi(800);
      setYaw(CS2_YAW);
      setHipfireFov(CS2_HIPFIRE_FOV_43);
    } else {
      setHipfireSens(0.5);
      setDpi(800);
      setYaw(VALORANT_YAW);
      setHipfireFov(103);
      setScopedFov(82.4);
    }
  };

  const customResult = useMemo(
    () =>
      calculateCustomAdsSensitivity({
        hipfireSens,
        dpi,
        yaw,
        hipfireFov,
        scopedFov,
        coefficient
      }),
    [hipfireSens, dpi, yaw, hipfireFov, scopedFov, coefficient]
  );

  const valorantData = useMemo(
    () => calculateValorantAdsTable(hipfireSens, dpi, coefficient),
    [hipfireSens, dpi, coefficient]
  );

  const cs2Data = useMemo(
    () => calculateCs2ZoomTable(hipfireSens, dpi, coefficient),
    [hipfireSens, dpi, coefficient]
  );

  const copyValue = (key: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(key);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  const coeffLabel = coefficient === 0 ? '0%' : coefficient === 0.75 ? '75%' : '100%';

  return (
    <div className="space-y-6 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-bold mb-2">
            <Crosshair className="w-3.5 h-3.5" />
            <span>Monitor-Distance Scoped Scaling • 100% Client-Side</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ADS / Scoped Sensitivity Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Match hipfire feel at a chosen screen point using exact monitor-distance scaling (0%, 75%, or 100%) across Custom FOVs, Valorant, and CS2.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleModeChange(mode)}
          className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-200 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Mode Tabs + Coefficient Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-2.5">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider block">
            Game / Preset Mode
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: 'valorant', label: 'Valorant' },
                { id: 'cs2', label: 'CS2' },
                { id: 'custom', label: 'Custom FOV' }
              ] as Array<{ id: AdsMode; label: string }>
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleModeChange(m.id)}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  mode === m.id
                    ? 'bg-violet-500/20 border-violet-400 text-white'
                    : 'bg-[#0c122e] border-indigo-900/70 text-slate-300 hover:border-indigo-700'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-2.5">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider block">
            Monitor-Distance Coefficient
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { c: 0 as const, label: '0% (Crosshair)' },
                { c: 0.75 as const, label: '75% (4:3 Edge)' },
                { c: 1 as const, label: '100% (Screen Edge)' }
              ]
            ).map((opt) => (
              <button
                key={opt.c}
                type="button"
                onClick={() => setCoefficient(opt.c)}
                className={`px-2.5 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                  coefficient === opt.c
                    ? 'bg-cyan-500/20 border-cyan-400 text-white'
                    : 'bg-[#0c122e] border-indigo-900/70 text-slate-300 hover:border-indigo-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inputs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-1.5">
          <label
            htmlFor="ads-hipfire-sens"
            className="text-[11px] font-mono font-bold uppercase text-slate-400 block"
          >
            Hipfire Sensitivity
          </label>
          <input
            id="ads-hipfire-sens"
            type="number"
            min={0.001}
            step={0.01}
            value={hipfireSens}
            onChange={(e) => setHipfireSens(Math.max(0.001, parseFloat(e.target.value) || 0.35))}
            className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-cyan-300 font-bold focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-1.5">
          <label
            htmlFor="ads-dpi"
            className="text-[11px] font-mono font-bold uppercase text-slate-400 block"
          >
            Mouse DPI
          </label>
          <input
            id="ads-dpi"
            type="number"
            min={50}
            step={50}
            value={dpi}
            onChange={(e) => setDpi(Math.max(1, parseFloat(e.target.value) || 800))}
            className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-violet-500"
          />
        </div>

        {mode === 'custom' ? (
          <>
            <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-1.5">
              <label
                htmlFor="ads-hipfire-fov"
                className="text-[11px] font-mono font-bold uppercase text-slate-400 block"
              >
                Hipfire Horizontal FOV (°)
              </label>
              <input
                id="ads-hipfire-fov"
                type="number"
                min={10}
                max={170}
                step={0.1}
                value={hipfireFov}
                onChange={(e) => setHipfireFov(Math.min(170, Math.max(10, parseFloat(e.target.value) || 103)))}
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-white font-bold focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-1.5">
              <label
                htmlFor="ads-scoped-fov"
                className="text-[11px] font-mono font-bold uppercase text-slate-400 block"
              >
                Scoped Horizontal FOV (°)
              </label>
              <input
                id="ads-scoped-fov"
                type="number"
                min={1}
                max={170}
                step={0.1}
                value={scopedFov}
                onChange={(e) => setScopedFov(Math.min(170, Math.max(1, parseFloat(e.target.value) || 82.4)))}
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-sm font-mono tabular-nums text-white font-bold focus:outline-none focus:border-violet-500"
              />
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block">
                {mode === 'valorant' ? 'Hipfire FOV (Locked)' : '4:3 Base Hipfire FOV'}
              </span>
              <div className="text-lg font-mono font-black text-white pt-1">
                {mode === 'valorant' ? '103°' : '90° (4:3 basis)'}
              </div>
            </div>

            <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block">
                Hipfire cm/360
              </span>
              <div className="text-lg font-mono font-black text-emerald-300 pt-1 tabular-nums">
                {(mode === 'valorant' ? valorantData.hipfireCm360 : cs2Data.hipfireCm360).toFixed(2)} cm
              </div>
            </div>
          </>
        )}
      </div>

      {/* Custom Mode Yaw + Outputs */}
      {mode === 'custom' && (
        <div className="space-y-4">
          <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <label
              htmlFor="ads-yaw-preset"
              className="text-xs font-mono uppercase text-slate-400 font-bold shrink-0"
            >
              Game Yaw (cm/360):
            </label>
            <select
              id="ads-yaw-preset"
              value={YAW_PRESETS.some((p) => Math.abs(p.yaw - yaw) < 1e-6) ? String(yaw) : 'custom'}
              onChange={(e) => {
                if (e.target.value !== 'custom') setYaw(parseFloat(e.target.value));
              }}
              className="bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-white"
            >
              {YAW_PRESETS.map((p) => (
                <option key={p.id} value={String(p.yaw)}>
                  {p.label}
                </option>
              ))}
              <option value="custom">Custom Yaw</option>
            </select>
            <input
              type="number"
              min={0.0001}
              step={0.001}
              value={yaw}
              onChange={(e) => setYaw(Math.max(0.00001, parseFloat(e.target.value) || 0.022))}
              aria-label="Custom yaw degrees per count"
              className="w-32 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono tabular-nums text-cyan-300 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-violet-950/70 via-[#070b19] to-indigo-950/80 border border-violet-500/40 rounded-2xl p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-300 font-bold block">
                Multiplier m({coeffLabel})
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-white mt-1">
                {customResult.multiplier.toFixed(4)}
              </div>
            </div>

            <div className="bg-[#070b19] border border-emerald-500/40 rounded-2xl p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                Scoped Sensitivity
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-emerald-300 mt-1">
                {customResult.scopedSens.toFixed(4)}
              </div>
            </div>

            <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Hipfire cm/360
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-slate-200 mt-1">
                {customResult.hipfireCm360.toFixed(2)} cm
              </div>
            </div>

            <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Scoped cm/360
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-cyan-300 mt-1">
                {customResult.scopedCm360.toFixed(2)} cm
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Valorant Preset Table */}
      {mode === 'valorant' && (
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Valorant ADS / Scoped Sensitivity Multipliers ({coeffLabel})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                In-game multiplier = <code>m(c) ÷ m(1)</code> (Valorant pre-scales scoped aim, so 1.000 = 100% monitor-distance match).
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono tabular-nums">
              <thead>
                <tr className="border-b border-indigo-950 text-slate-400">
                  <th className="py-2 pr-3">Zoom Tier</th>
                  <th className="py-2 px-3">Weapons</th>
                  <th className="py-2 px-3">Scoped FOV</th>
                  <th className="py-2 px-3 text-cyan-300">Selected ({coeffLabel})</th>
                  <th className="py-2 px-3">0% / 75% / 100%</th>
                  <th className="py-2 pl-3">Scoped cm/360</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-950/60">
                {valorantData.rows.map((row) => (
                  <tr key={row.scope.id}>
                    <td className="py-2.5 pr-3 font-bold text-white">{row.scope.label}</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">{row.scope.weapons}</td>
                    <td className="py-2.5 px-3 text-slate-300">{row.scope.displayFov}</td>
                    <td className="py-2.5 px-3 font-black text-emerald-300">
                      {row.inGameMultiplier.toFixed(3)}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {row.mult0.toFixed(3)} / {row.mult75.toFixed(3)} / {row.mult100.toFixed(3)}
                    </td>
                    <td className="py-2.5 pl-3 text-cyan-300">{row.scopedCm360.toFixed(2)} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400">
            Note: One Valorant slider covers several zoom tiers, so players set it for the weapon they use most.
          </p>
        </div>
      )}

      {/* CS2 Preset Table */}
      {mode === 'cs2' && (
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              CS2 <code>zoom_sensitivity_ratio_mouse</code> ({coeffLabel})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ratio = <code>m43(c) ÷ m43(1)</code> on the 4:3 FOV basis (hipfire 90°). CS2 scoped FOVs are community-measured — Valve does not publish them.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono tabular-nums">
              <thead>
                <tr className="border-b border-indigo-950 text-slate-400">
                  <th className="py-2 pr-3">Scope</th>
                  <th className="py-2 px-3">4:3 Scoped FOV</th>
                  <th className="py-2 px-3 text-cyan-300">Ratio ({coeffLabel})</th>
                  <th className="py-2 px-3">0% / 75% / 100%</th>
                  <th className="py-2 px-3">Scoped cm/360</th>
                  <th className="py-2 pl-3">Command</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-950/60">
                {cs2Data.rows.map((row) => {
                  const cmd = `zoom_sensitivity_ratio_mouse ${row.zoomSensitivityRatio.toFixed(4)}`;
                  return (
                    <tr key={row.scope.id}>
                      <td className="py-2.5 pr-3 font-bold text-white">{row.scope.label}</td>
                      <td className="py-2.5 px-3 text-slate-300">{row.scope.scopedFov43}°</td>
                      <td className="py-2.5 px-3 font-black text-emerald-300">
                        {row.zoomSensitivityRatio.toFixed(4)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        {row.ratio0.toFixed(4)} / {row.ratio75.toFixed(4)} / {row.ratio100.toFixed(4)}
                      </td>
                      <td className="py-2.5 px-3 text-cyan-300">{row.scopedCm360.toFixed(2)} cm</td>
                      <td className="py-2.5 pl-3">
                        <button
                          type="button"
                          onClick={() => copyValue(row.scope.id, cmd)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#0c122e] border border-indigo-900/70 hover:border-cyan-400 text-[11px] text-slate-200 cursor-pointer"
                        >
                          {copiedId === row.scope.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copy</span>
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

      {/* Coefficient Strategy Guide */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-2 text-xs">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-violet-400" />
          <span>Choosing 0%, 75%, or 100% Monitor-Distance Coefficient</span>
        </span>
        <ul className="space-y-1 text-slate-300 leading-relaxed">
          <li>
            • <strong className="text-white">0% (Focal-Length Scaling):</strong> Matches feel at the crosshair (<code>tan(S/2) ÷ tan(H/2)</code>) and suits flick aim.
          </li>
          <li>
            • <strong className="text-white">75%:</strong> The middle ground Counter-Strike players know from the old 4:3 screen edge.
          </li>
          <li>
            • <strong className="text-white">100% (Screen Edge):</strong> Matches mouse distance to the screen edge (<code>S ÷ H</code>) and suits tracking.
          </li>
        </ul>
      </div>
    </div>
  );
}
