/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Ruler, Gauge, Info, ArrowLeftRight } from 'lucide-react';

export const METRES_PER_STUD = 0.28;
export const CM_PER_STUD = 28;
export const METRES_PER_FOOT = 0.3048;
export const METRES_PER_INCH = 0.0254;
export const STUDS_PER_MPS_DISPLAY = 3.57;

export type LengthUnit = 'studs' | 'metres' | 'centimetres' | 'feet' | 'inches';

export function toMetres(value: number, unit: LengthUnit): number {
  const v = Number.isFinite(value) ? value : 0;
  switch (unit) {
    case 'studs':
      return v * METRES_PER_STUD;
    case 'metres':
      return v;
    case 'centimetres':
      return v / 100;
    case 'feet':
      return v * METRES_PER_FOOT;
    case 'inches':
      return v * METRES_PER_INCH;
  }
}

export function fromMetres(metres: number, unit: LengthUnit): number {
  const m = Number.isFinite(metres) ? metres : 0;
  switch (unit) {
    case 'studs':
      return m / METRES_PER_STUD;
    case 'metres':
      return m;
    case 'centimetres':
      return m * 100;
    case 'feet':
      return m / METRES_PER_FOOT;
    case 'inches':
      return m / METRES_PER_INCH;
  }
}

function cleanFloat(n: number): number {
  return Math.abs(n) < 1e-12 ? 0 : Number(n.toPrecision(12));
}

export function convertAllUnits(value: number, fromUnit: LengthUnit) {
  const metres = toMetres(value, fromUnit);
  return {
    studs: cleanFloat(fromMetres(metres, 'studs')),
    metres: cleanFloat(metres),
    centimetres: cleanFloat(fromMetres(metres, 'centimetres')),
    feet: cleanFloat(fromMetres(metres, 'feet')),
    inches: cleanFloat(fromMetres(metres, 'inches'))
  };
}

export function studsPerSecToSpeed(studsPerSec: number) {
  const sps = Math.max(0, Number.isFinite(studsPerSec) ? studsPerSec : 0);
  const mps = sps * METRES_PER_STUD;
  const kmh = mps * 3.6;
  const mph = kmh * 0.621371;
  return { studsPerSec: sps, mps, kmh, mph };
}

export function kmhToStudsPerSec(kmh: number): number {
  const safeKmh = Math.max(0, Number.isFinite(kmh) ? kmh : 0);
  const mps = safeKmh / 3.6;
  return mps * STUDS_PER_MPS_DISPLAY;
}

function fmt(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
  return Number(n.toFixed(2)).toString();
}

const UNIT_META: { id: LengthUnit; label: string; short: string }[] = [
  { id: 'studs', label: 'Roblox Studs', short: 'studs' },
  { id: 'metres', label: 'Metres', short: 'm' },
  { id: 'centimetres', label: 'Centimetres', short: 'cm' },
  { id: 'feet', label: 'Feet', short: 'ft' },
  { id: 'inches', label: 'Inches', short: 'in' }
];

export default function RobloxStudsConverter() {
  const [unit, setUnit] = useState<LengthUnit>('studs');
  const [inputValue, setInputValue] = useState<string>('100');
  const [speedMode, setSpeedMode] = useState<'studsToKmh' | 'kmhToStuds'>('studsToKmh');
  const [speedValue, setSpeedValue] = useState<string>('16');

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  }, [inputValue]);

  const converted = useMemo(() => convertAllUnits(numericValue, unit), [numericValue, unit]);

  const numericSpeed = useMemo(() => {
    const parsed = parseFloat(speedValue);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  }, [speedValue]);

  const speedResult = useMemo(() => {
    if (speedMode === 'studsToKmh') {
      return studsPerSecToSpeed(numericSpeed);
    }
    const sps = kmhToStudsPerSec(numericSpeed);
    return {
      studsPerSec: sps,
      mps: numericSpeed / 3.6,
      kmh: numericSpeed,
      mph: numericSpeed * 0.621371
    };
  }, [numericSpeed, speedMode]);

  return (
    <div className="space-y-6">
      {/* Distance Converter */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Ruler className="w-4 h-4" />
            Distance &amp; Scale Converter (1 Stud = 0.28 m / 28 cm)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: '100 studs', u: 'studs' as LengthUnit, v: '100' },
              { label: '10 metres', u: 'metres' as LengthUnit, v: '10' },
              { label: '6 feet', u: 'feet' as LengthUnit, v: '6' },
              { label: '5 stud avatar', u: 'studs' as LengthUnit, v: '5' }
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setUnit(preset.u);
                  setInputValue(preset.v);
                }}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:border-rose-500/60 hover:text-white cursor-pointer transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <label htmlFor="studs-unit-select" className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Input Unit
            </label>
            <select
              id="studs-unit-select"
              value={unit}
              onChange={(e) => setUnit(e.target.value as LengthUnit)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
            >
              {UNIT_META.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label} ({u.short})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <label htmlFor="studs-value-input" className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Value ({UNIT_META.find((u) => u.id === unit)?.label})
            </label>
            <input
              id="studs-value-input"
              type="number"
              min={0}
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* All 5 Converted Outputs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {UNIT_META.map((u) => {
            const val = converted[u.id];
            const isActive = u.id === unit;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => {
                  setUnit(u.id);
                  setInputValue(fmt(val).replace(/,/g, ''));
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-500/15 border-rose-500/60 text-white'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-200'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  {u.label}
                </span>
                <span className="text-xl font-extrabold font-mono tabular-nums text-white mt-1 block truncate">
                  {fmt(val)}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">{u.short}</span>
              </button>
            );
          })}
        </div>

        {/* Speed Converter */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Gauge className="w-4 h-4" />
              Movement Speed Converter (1 m/s = 3.57 studs/s)
            </span>
            <button
              type="button"
              onClick={() => {
                setSpeedMode((m) => (m === 'studsToKmh' ? 'kmhToStuds' : 'studsToKmh'));
                setSpeedValue(speedMode === 'studsToKmh' ? fmt(speedResult.kmh).replace(/,/g, '') : fmt(speedResult.studsPerSec).replace(/,/g, ''));
              }}
              className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-200 hover:border-cyan-500/60 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              {speedMode === 'studsToKmh' ? 'Mode: Studs/s → km/h' : 'Mode: km/h → Studs/s'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
            <div className="space-y-1.5">
              <label htmlFor="studs-speed-input" className="text-[11px] font-bold uppercase text-zinc-400 block">
                {speedMode === 'studsToKmh' ? 'Speed (studs/s)' : 'Speed (km/h)'}
              </label>
              <input
                id="studs-speed-input"
                type="number"
                min={0}
                step="any"
                value={speedValue}
                onChange={(e) => setSpeedValue(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Studs / sec</span>
              <span className="text-lg font-extrabold font-mono tabular-nums text-white">
                {fmt(speedResult.studsPerSec)} studs/s
              </span>
            </div>

            <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Kilometres / hour</span>
              <span className="text-lg font-extrabold font-mono tabular-nums text-emerald-400">
                {fmt(speedResult.kmh)} km/h
              </span>
            </div>

            <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block">Metres / sec</span>
              <span className="text-lg font-extrabold font-mono tabular-nums text-cyan-400">
                {fmt(speedResult.mps)} m/s
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'Default Walk (16 studs/s)', val: '16' },
              { label: 'Sprint (24 studs/s)', val: '24' },
              { label: '3.57 studs/s (1 m/s)', val: '3.57' },
              { label: '100 studs/s', val: '100' }
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setSpeedMode('studsToKmh');
                  setSpeedValue(p.val);
                }}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Official Creator Hub Scale Note */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-start gap-2.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>
            The engine lets creators define their own scale, but <strong>0.28 m</strong> (28 cm) per stud is Roblox&apos;s official conversion (1 m/s = 3.57 studs/s).
          </span>
        </div>
      </div>
    </div>
  );
}
