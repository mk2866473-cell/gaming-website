/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Activity, RotateCcw, Info, AlertTriangle, Mouse } from 'lucide-react';
import {
  POLLING_HISTORY_LENGTH,
  POLLING_RATE_REFERENCE,
  POLLING_SAMPLE_INTERVAL_MS,
  PollingEventSource,
  PollingSessionState,
  createPollingSessionState,
  getSessionAverageHz,
  pruneIdlePollingWindow,
  recordPollingReport
} from '../../data/mouseLabData';

function detectPollingEventSource(): PollingEventSource {
  if (typeof window === 'undefined') return 'pointermove';
  const supportsRaw =
    window.isSecureContext &&
    ('onpointerrawupdate' in window || 'onpointerrawupdate' in HTMLElement.prototype);
  if (supportsRaw) return 'pointerrawupdate';
  if (typeof PointerEvent !== 'undefined' && 'getCoalescedEvents' in PointerEvent.prototype) {
    return 'coalesced';
  }
  return 'pointermove';
}

const SOURCE_LABELS: Record<PollingEventSource, string> = {
  pointerrawupdate: 'pointerrawupdate (uncoalesced raw updates)',
  coalesced: 'pointermove + getCoalescedEvents()',
  pointermove: 'pointermove (plain)'
};

export default function MousePollingRateTest() {
  const padRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sessionRef = useRef<PollingSessionState>(createPollingSessionState());
  const historyRef = useRef<number[]>(new Array(POLLING_HISTORY_LENGTH).fill(0));

  const [eventSource] = useState<PollingEventSource>(() => detectPollingEventSource());
  const [currentHz, setCurrentHz] = useState<number | null>(null);
  const [peakHz, setPeakHz] = useState<number | null>(null);
  const [averageHz, setAverageHz] = useState<number | null>(null);
  const [windowReports, setWindowReports] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 160;
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const samples = historyRef.current;
    const maxSample = Math.max(...samples, peakHz ?? 0, 1000);
    const yMax =
      maxSample <= 1050 ? 1200 : maxSample <= 2100 ? 2400 : maxSample <= 4200 ? 4500 : 8500;

    const padLeft = 44;
    const padRight = 10;
    const padTop = 12;
    const padBottom = 22;
    const plotW = Math.max(10, width - padLeft - padRight);
    const plotH = Math.max(10, height - padTop - padBottom);

    // Reference grid lines
    const gridValues = yMax <= 1200 ? [250, 500, 1000] : yMax <= 2400 ? [500, 1000, 2000] : yMax <= 4500 ? [1000, 2000, 4000] : [1000, 4000, 8000];
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (const val of gridValues) {
      const y = padTop + plotH - (val / yMax) * plotH;
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + plotW, y);
      ctx.stroke();

      ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.fillText(`${val}`, padLeft - 6, y);
    }

    // Baseline
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop + plotH);
    ctx.lineTo(padLeft + plotW, padTop + plotH);
    ctx.stroke();

    // Time axis labels
    ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('-10s', padLeft, padTop + plotH + 6);
    ctx.textAlign = 'right';
    ctx.fillText('Now', padLeft + plotW, padTop + plotH + 6);

    // Plot line + subtle gradient fill
    const stepX = plotW / Math.max(1, samples.length - 1);
    const grad = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
    grad.addColorStop(0, 'rgba(34, 211, 238, 0.32)');
    grad.addColorStop(1, 'rgba(34, 211, 238, 0.0)');

    ctx.beginPath();
    samples.forEach((hz, idx) => {
      const x = padLeft + idx * stepX;
      const clamped = Math.min(yMax, Math.max(0, hz));
      const y = padTop + plotH - (clamped / yMax) * plotH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Area under curve
    ctx.lineTo(padLeft + (samples.length - 1) * stepX, padTop + plotH);
    ctx.lineTo(padLeft, padTop + plotH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.restore();
  }, [peakHz]);

  const handleReset = () => {
    sessionRef.current = createPollingSessionState();
    historyRef.current = new Array(POLLING_HISTORY_LENGTH).fill(0);
    setCurrentHz(null);
    setPeakHz(null);
    setAverageHz(null);
    setWindowReports(0);
    setIsMoving(false);
    drawGraph();
  };

  useEffect(() => {
    const el = padRef.current;
    if (!el) return;

    const processPointerEvents = (events: PointerEvent[]) => {
      const perfNow = performance.now();
      const s = sessionRef.current;
      for (const ev of events) {
        if (ev.pointerType !== 'mouse') continue;
        recordPollingReport(s, ev.timeStamp, perfNow);
      }
      setCurrentHz(s.currentHz !== null ? Math.round(s.currentHz) : null);
      setPeakHz(s.peakHz !== null ? Math.round(s.peakHz) : null);
      const avg = getSessionAverageHz(s);
      setAverageHz(avg !== null ? Math.round(avg) : null);
      setWindowReports(s.windowTimestamps.length);
      setIsMoving(s.windowTimestamps.length > 0);
    };

    const onRawUpdate = (e: Event) => {
      const pe = e as PointerEvent;
      processPointerEvents([pe]);
    };

    const onCoalescedMove = (e: PointerEvent) => {
      const list = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [];
      processPointerEvents(list.length > 0 ? list : [e]);
    };

    const onPlainMove = (e: PointerEvent) => {
      processPointerEvents([e]);
    };

    if (eventSource === 'pointerrawupdate') {
      el.addEventListener('pointerrawupdate', onRawUpdate);
    } else if (eventSource === 'coalesced') {
      el.addEventListener('pointermove', onCoalescedMove);
    } else {
      el.addEventListener('pointermove', onPlainMove);
    }

    const ticker = window.setInterval(() => {
      const s = sessionRef.current;
      const stopped = pruneIdlePollingWindow(s, performance.now());
      if (stopped) {
        setCurrentHz(null);
        setWindowReports(0);
        setIsMoving(false);
      }
      historyRef.current = [
        ...historyRef.current.slice(1),
        s.currentHz !== null ? Math.round(s.currentHz) : 0
      ];
      drawGraph();
    }, POLLING_SAMPLE_INTERVAL_MS);

    drawGraph();

    return () => {
      window.clearInterval(ticker);
      if (eventSource === 'pointerrawupdate') {
        el.removeEventListener('pointerrawupdate', onRawUpdate);
      } else if (eventSource === 'coalesced') {
        el.removeEventListener('pointermove', onCoalescedMove);
      } else {
        el.removeEventListener('pointermove', onPlainMove);
      }
    };
  }, [eventSource, drawGraph]);

  return (
    <div className="space-y-6 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>100% Client-Side Browser Telemetry • Mouse Only</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Mouse Polling Rate Test
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Move your mouse in fast continuous circles inside the test pad to measure real-time polling rate (Hz) over a rolling 500 ms window.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-200 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Detected Event Source + Case (c) Warning */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#070b19] border border-indigo-950 rounded-xl px-4 py-3 text-xs font-mono">
        <span className="text-slate-400">
          Detected Event Source:{' '}
          <strong className="text-cyan-300">{SOURCE_LABELS[eventSource]}</strong>
        </span>
        <span className="text-slate-400 tabular-nums">
          Window Reports: <strong className="text-white">{windowReports}</strong> (min 20 to read)
        </span>
      </div>

      {eventSource === 'pointermove' && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl px-4 py-3 flex items-start gap-2.5 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            This browser only exposes plain <code>pointermove</code> events (without{' '}
            <code>pointerrawupdate</code> or <code>getCoalescedEvents()</code>), so the reading may
            be capped at your monitor&apos;s refresh rate.
          </span>
        </div>
      )}

      {/* Live Readouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-cyan-950/60 via-[#070b19] to-indigo-950/80 border border-cyan-500/40 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Current Hz
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-white mt-1">
            {currentHz !== null ? `${currentHz.toLocaleString('en-US')} Hz` : '—'}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            {currentHz !== null
              ? `${(1000 / currentHz).toFixed(2)} ms interval`
              : isMoving
              ? 'Gathering 20+ reports...'
              : 'Move continuously inside pad'}
          </span>
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
            Peak Hz
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-emerald-300 mt-1">
            {peakHz !== null ? `${peakHz.toLocaleString('en-US')} Hz` : '—'}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            {peakHz !== null ? `${(1000 / peakHz).toFixed(2)} ms best` : 'Session maximum'}
          </span>
        </div>

        <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-bold block">
            Average Hz
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-violet-200 mt-1">
            {averageHz !== null ? `${averageHz.toLocaleString('en-US')} Hz` : '—'}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            Reports ÷ active moving time
          </span>
        </div>
      </div>

      {/* Interactive Circular Sweep Area */}
      <div
        ref={padRef}
        className={`relative min-h-[260px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center select-none transition-colors cursor-crosshair ${
          isMoving
            ? 'bg-cyan-950/20 border-cyan-400/70'
            : 'bg-[#070b19] border-indigo-800/80 hover:border-cyan-500/50'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 pointer-events-none">
          <Mouse className="w-6 h-6 text-cyan-400" />
        </div>
        <p className="text-sm sm:text-base font-bold text-white pointer-events-none">
          {isMoving
            ? currentHz !== null
              ? `Measuring Live: ${currentHz.toLocaleString('en-US')} Hz`
              : 'Keep moving in fast continuous circles...'
            : 'Move Mouse in Fast Continuous Circles Here'}
        </p>
        <p className="text-xs text-slate-400 mt-1 max-w-md pointer-events-none">
          Rolling 500 ms window · Resets window if movement stops for &gt; 60 ms · Counts only{' '}
          <code>pointerType === &quot;mouse&quot;</code>
        </p>
      </div>

      {/* Live 10-Second History Chart */}
      <div className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold uppercase tracking-wider">
            Live History Graph (1 sample / 100 ms · Last ~10s)
          </span>
          <span className="text-slate-400">100 samples</span>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full h-40 block rounded-xl bg-[#050814] border border-indigo-950/60"
        />
      </div>

      {/* Standard Polling Rates Reference & Browser Measurement Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Standard Polling Rates &amp; Report Intervals
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono tabular-nums">
              <thead>
                <tr className="border-b border-indigo-950 text-slate-400">
                  <th className="py-1.5 pr-3">Polling Rate</th>
                  <th className="py-1.5 px-3">Report Interval</th>
                  <th className="py-1.5 pl-3">Typical Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-950/60">
                {POLLING_RATE_REFERENCE.map((row) => (
                  <tr key={row.hz}>
                    <td className="py-2 pr-3 font-bold text-cyan-300">{row.hz} Hz</td>
                    <td className="py-2 px-3 text-white">{row.intervalMs} ms</td>
                    <td className="py-2 pl-3 text-slate-300 font-sans">{row.tierLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#070b19] border border-indigo-950 rounded-2xl p-5 space-y-2.5 text-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>How Browser Measurement Works</span>
          </span>
          <ul className="space-y-1.5 text-slate-300 leading-relaxed">
            <li>
              • A browser measures the reports that reach the page, not the raw USB rate; slow or small movements send fewer reports.
            </li>
            <li>
              • Reading slightly under your set rate (for example, 950–1000 Hz on a 1000 Hz mouse) is normal.
            </li>
            <li>
              • Higher polling cuts the wait before a movement is reported (up to 8 ms at 125 Hz vs 1 ms at 1000 Hz).
            </li>
            <li>
              • <strong className="text-white">Polling rate is NOT display input lag</strong> — display latency comes from frame rendering, scanout, and monitor pixel response.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
