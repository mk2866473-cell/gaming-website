/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Ruler, RotateCcw, Lock, Hand, Info, AlertTriangle } from 'lucide-react';
import { DistanceUnit, calculateTrueDpiResult } from '../../data/mouseLabData';

type CaptureMode = 'hold' | 'lock';
type MovementSourceMode = 'pointerLockRaw' | 'pointerLockStandard' | 'plainMovement';

export default function TrueDpiAnalyzer() {
  const padRef = useRef<HTMLDivElement | null>(null);

  const [setDpi, setSetDpi] = useState<number>(800);
  const [distance, setDistance] = useState<number>(10);
  const [unit, setUnit] = useState<DistanceUnit>('cm');
  const [captureMode, setCaptureMode] = useState<CaptureMode>('hold');

  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const [runningCounts, setRunningCounts] = useState<number>(0);
  const [finalCounts, setFinalCounts] = useState<number>(0);
  const [movementSource, setMovementSource] = useState<MovementSourceMode>('plainMovement');
  const [lockNotice, setLockNotice] = useState<string | null>(null);

  const isTrackingRef = useRef<boolean>(false);
  const countsRef = useRef<number>(0);

  const finishMeasurement = () => {
    if (!isTrackingRef.current) return;
    isTrackingRef.current = false;
    setIsTracking(false);
    const total = countsRef.current;
    setFinalCounts(total);
    setHasCompleted(true);
    if (document.pointerLockElement === padRef.current) {
      document.exitPointerLock?.();
    }
  };

  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (!isTrackingRef.current) return;
      const dx = Math.abs(e.movementX || 0);
      if (dx > 0) {
        countsRef.current += dx;
        setRunningCounts(countsRef.current);
      }
    };

    const onWindowMouseUp = () => {
      if (captureMode === 'hold' && isTrackingRef.current) {
        finishMeasurement();
      }
    };

    const onPointerLockChange = () => {
      const lockedToPad = document.pointerLockElement === padRef.current;
      if (!lockedToPad && captureMode === 'lock' && isTrackingRef.current) {
        isTrackingRef.current = false;
        setIsTracking(false);
        setFinalCounts(countsRef.current);
        setHasCompleted(true);
      }
    };

    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
    document.addEventListener('pointerlockchange', onPointerLockChange);

    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
    };
  }, [captureMode]);

  const startHoldRun = (e: React.MouseEvent<HTMLDivElement>) => {
    if (captureMode !== 'hold' || e.button !== 0) return;
    countsRef.current = 0;
    setRunningCounts(0);
    setHasCompleted(false);
    setMovementSource('plainMovement');
    setLockNotice(null);
    isTrackingRef.current = true;
    setIsTracking(true);
  };

  const handlePointerLockClick = async () => {
    const el = padRef.current;
    if (!el) return;

    if (document.pointerLockElement === el) {
      finishMeasurement();
      return;
    }

    countsRef.current = 0;
    setRunningCounts(0);
    setHasCompleted(false);
    setLockNotice(null);

    if (typeof el.requestPointerLock !== 'function') {
      setMovementSource('plainMovement');
      setLockNotice('Pointer Lock API is unavailable in this browser; use Press & Hold mode instead.');
      return;
    }

    try {
      const maybePromise = (
        el.requestPointerLock as unknown as (opts?: { unadjustedMovement?: boolean }) => Promise<void> | void
      )({ unadjustedMovement: true });
      if (maybePromise && typeof (maybePromise as Promise<void>).then === 'function') {
        await maybePromise;
      }
      if (document.pointerLockElement === el) {
        setMovementSource('pointerLockRaw');
        isTrackingRef.current = true;
        setIsTracking(true);
      }
    } catch {
      try {
        const fallbackPromise = el.requestPointerLock() as unknown as Promise<void> | void;
        if (fallbackPromise && typeof (fallbackPromise as Promise<void>).then === 'function') {
          await fallbackPromise;
        }
        if (document.pointerLockElement === el) {
          setMovementSource('pointerLockStandard');
          setLockNotice(
            'Raw unadjustedMovement is unsupported here; using standard Pointer Lock movementX.'
          );
          isTrackingRef.current = true;
          setIsTracking(true);
        }
      } catch {
        setMovementSource('plainMovement');
        setLockNotice('Pointer Lock was blocked by the browser; use Press & Hold mode instead.');
      }
    }
  };

  const handleReset = () => {
    if (document.pointerLockElement === padRef.current) {
      document.exitPointerLock?.();
    }
    isTrackingRef.current = false;
    countsRef.current = 0;
    setIsTracking(false);
    setHasCompleted(false);
    setRunningCounts(0);
    setFinalCounts(0);
    setLockNotice(null);
  };

  const displayResult = useMemo(() => {
    const counts = isTracking ? runningCounts : finalCounts;
    return calculateTrueDpiResult({
      totalCounts: counts,
      distance,
      unit,
      setDpi
    });
  }, [isTracking, runningCounts, finalCounts, distance, unit, setDpi]);

  return (
    <div className="space-y-6 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold mb-2">
            <Ruler className="w-3.5 h-3.5" />
            <span>Physical Ruler Sensor Measurement • 100% Client-Side</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            True-DPI Analyser
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Measure your mouse&apos;s real hardware DPI by sliding an exact ruler-measured distance on your mousepad (unlike the cm/360 calculator, which only converts numbers you already know).
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-200 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Inputs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-2">
          <label
            htmlFor="true-dpi-set"
            className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider block"
          >
            Set DPI (Mouse Software)
          </label>
          <input
            id="true-dpi-set"
            type="number"
            min={50}
            max={30000}
            step={50}
            value={setDpi}
            onChange={(e) => setSetDpi(Math.max(1, parseFloat(e.target.value) || 800))}
            className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-cyan-300 font-bold focus:outline-none focus:border-emerald-500"
          />
          <span className="text-[11px] font-mono text-slate-400 block">
            Expected counts: {displayResult.formattedExpectedCounts}
          </span>
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-2">
          <label
            htmlFor="true-dpi-dist"
            className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider block"
          >
            Physical Distance
          </label>
          <div className="flex gap-2">
            <input
              id="true-dpi-dist"
              type="number"
              min={0.5}
              max={100}
              step={0.5}
              value={distance}
              onChange={(e) => setDistance(Math.max(0.1, parseFloat(e.target.value) || 10))}
              className="flex-1 min-w-0 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
            />
            <div className="flex rounded-xl overflow-hidden border border-indigo-900/80">
              {(['cm', 'in'] as DistanceUnit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`px-3 py-2 text-xs font-mono font-bold cursor-pointer transition-colors ${
                    unit === u
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-[#0c122e] text-slate-400 hover:text-white'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-400 block tabular-nums">
            {displayResult.distanceInInches.toFixed(3)} in ({displayResult.distanceCm.toFixed(2)} cm)
          </span>
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4 space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider block">
            Capture Method
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                handleReset();
                setCaptureMode('hold');
              }}
              className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                captureMode === 'hold'
                  ? 'bg-emerald-500/15 border-emerald-500 text-white'
                  : 'bg-[#0c122e] border-indigo-900/70 text-slate-300'
              }`}
            >
              <Hand className="w-3.5 h-3.5" />
              <span>Press &amp; Hold</span>
            </button>
            <button
              type="button"
              onClick={() => {
                handleReset();
                setCaptureMode('lock');
              }}
              className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                captureMode === 'lock'
                  ? 'bg-cyan-500/15 border-cyan-400 text-white'
                  : 'bg-[#0c122e] border-indigo-900/70 text-slate-300'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Pointer Lock</span>
            </button>
          </div>
          <span className="text-[11px] font-mono text-slate-400 block">
            {captureMode === 'lock'
              ? 'Requests raw unadjustedMovement: true'
              : 'Hold button & drag horizontally'}
          </span>
        </div>
      </div>

      {/* OS Acceleration Caveat Banner */}
      <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl px-4 py-3 flex items-start gap-2.5 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-100">Accuracy Note:</strong>{' '}
          {movementSource === 'pointerLockRaw'
            ? 'Raw Pointer Lock (unadjustedMovement: true) is active for hardware-level counts.'
            : 'When measuring with plain movementX (or if unadjustedMovement is unavailable), turn OFF Windows "Enhance pointer precision" and any OS pointer acceleration, or the result is approximate.'}
          {lockNotice ? ` ${lockNotice}` : ''}
        </div>
      </div>

      {/* Interactive Measurement Pad */}
      <div
        ref={padRef}
        onMouseDown={captureMode === 'hold' ? startHoldRun : undefined}
        onClick={captureMode === 'lock' ? handlePointerLockClick : undefined}
        className={`relative min-h-[220px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center select-none transition-all ${
          isTracking
            ? 'bg-emerald-950/25 border-emerald-400 cursor-ew-resize'
            : 'bg-[#070b19] border-indigo-800/80 hover:border-emerald-500/60 cursor-pointer'
        }`}
      >
        <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 pointer-events-none">
          {isTracking ? 'Live Running |movementX| Count' : hasCompleted ? 'Measured |movementX| Count' : 'Ready to Measure'}
        </div>
        <div className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-white pointer-events-none">
          {(isTracking ? runningCounts : finalCounts).toLocaleString('en-US')}{' '}
          <span className="text-lg text-cyan-400 font-bold">counts</span>
        </div>
        <p className="text-xs text-slate-300 mt-3 max-w-lg pointer-events-none">
          {captureMode === 'hold'
            ? isTracking
              ? `Slide horizontally exactly ${distance} ${unit} along your ruler, then release the mouse button.`
              : `Press and hold left click anywhere inside this box, move exactly ${distance} ${unit} straight right/left along a ruler, then release.`
            : isTracking
            ? `Pointer locked! Slide exactly ${distance} ${unit} along your ruler, then click or press Esc to finish.`
            : `Click inside this box to lock the cursor (requests unadjustedMovement: true), move exactly ${distance} ${unit} along a ruler, then click or press Esc.`}
        </p>
      </div>

      {/* Results Output */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-950/70 via-[#070b19] to-indigo-950/80 border border-emerald-500/40 rounded-2xl p-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
            Real DPI
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-white mt-1">
            {hasCompleted || isTracking ? displayResult.formattedRealDpi : '—'}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">counts ÷ inches</span>
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Set DPI
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-cyan-300 mt-1">
            {setDpi.toLocaleString('en-US')}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">software target</span>
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Deviation %
          </span>
          <div
            className={`text-2xl sm:text-3xl font-black font-mono tabular-nums mt-1 ${
              !hasCompleted && !isTracking
                ? 'text-slate-400'
                : Math.abs(displayResult.deviationPercent) <= 2
                ? 'text-emerald-300'
                : 'text-amber-300'
            }`}
          >
            {hasCompleted || isTracking ? displayResult.formattedDeviation : '—'}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">(Real − Set) ÷ Set</span>
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Expected Counts
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-violet-200 mt-1">
            {displayResult.formattedExpectedCounts}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">at {setDpi} DPI</span>
        </div>
      </div>

      {/* Formula & Difference Notes */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-2 text-xs">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          <span>True-DPI Formula &amp; How This Differs from cm/360 Converters</span>
        </span>
        <ul className="space-y-1 text-slate-300 leading-relaxed">
          <li>
            • <strong className="text-white">Measurement vs Conversion:</strong> The{' '}
            <code>dpi-cm-360-calculator</code> converts sensitivity values you already know, whereas{' '}
            <strong className="text-emerald-300">True-DPI Analyser</strong> physically measures your sensor&apos;s real DPI on your mousepad.
          </li>
          <li>
            • Distance in inches = cm ÷ 2.54 · Real DPI = total counts ÷ distance in inches · Deviation % = (Real DPI − Set DPI) ÷ Set DPI × 100 · Expected counts = Set DPI × distance in inches.
          </li>
        </ul>
      </div>
    </div>
  );
}
