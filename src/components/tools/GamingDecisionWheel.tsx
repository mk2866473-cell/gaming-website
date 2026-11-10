/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Disc3, Play, RotateCcw, Plus, Trash2, Volume2, VolumeX, 
  Trophy, Award, Shuffle, Settings, Flame
} from 'lucide-react';

interface WheelOption {
  id: string;
  label: string;
  weight: number;
  color: string;
}

const PALETTE = [
  '#10b981', '#06b6d4', '#6366f1', '#a855f7', '#ec4899', 
  '#f43f5e', '#f97316', '#eab308', '#84cc16', '#14b8a6'
];

const PRESETS: Record<string, { name: string; items: string[] }> = {
  drops: {
    name: 'Battle Royale Hot Drops',
    items: ['Tilted Towers', 'Pochinki', 'Skull Town', 'Superstore', 'Fragment East', 'School', 'Salvation Point', 'Hydro Dam']
  },
  games: {
    name: 'What Game Next?',
    items: ['Minecraft Survival', 'Valorant Ranked', 'Counter-Strike 2', 'Apex Legends', 'Helldivers 2', 'Rocket League', 'Elden Ring', 'Overwatch 2']
  },
  roles: {
    name: 'Role / Hero Class',
    items: ['Hard Carry / DPS', 'Main Tank', 'Support / Healer', 'In-Game Leader (IGL)', 'Lurker / Flanker', 'Sniper / Anchor']
  },
  punishments: {
    name: 'Streamer / Party Forfeit',
    items: ['10 Pushups', 'Pistol Only Next Round', 'No Audio for 2 Mins', 'Invert Mouse 1 Round', 'Sing Chorus of Song', 'Drop All Loot & Run']
  }
};

export default function GamingDecisionWheel() {
  const [options, setOptions] = useState<WheelOption[]>([
    { id: '1', label: 'Tilted Towers', weight: 1, color: PALETTE[0] },
    { id: '2', label: 'Pochinki', weight: 1, color: PALETTE[1] },
    { id: '3', label: 'Skull Town', weight: 1, color: PALETTE[2] },
    { id: '4', label: 'Superstore', weight: 1, color: PALETTE[3] },
    { id: '5', label: 'Fragment East', weight: 1, color: PALETTE[4] },
    { id: '6', label: 'School', weight: 1, color: PALETTE[5] },
    { id: '7', label: 'Hydro Dam', weight: 1, color: PALETTE[6] },
    { id: '8', label: 'Salvation Point', weight: 1, color: PALETTE[7] }
  ]);

  const [newItemText, setNewItemText] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [eliminationMode, setEliminationMode] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAngleRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Load a preset
  const loadPreset = (presetKey: string) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;
    const newOpts: WheelOption[] = preset.items.map((item, idx) => ({
      id: `${Date.now()}-${idx}`,
      label: item,
      weight: 1,
      color: PALETTE[idx % PALETTE.length]
    }));
    setOptions(newOpts);
    setWinner(null);
  };

  // Add custom item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newOpt: WheelOption = {
      id: Date.now().toString(),
      label: newItemText.trim(),
      weight: 1,
      color: PALETTE[options.length % PALETTE.length]
    };
    setOptions([...options, newOpt]);
    setNewItemText('');
  };

  // Remove item
  const removeItem = (id: string) => {
    if (options.length <= 2) return;
    setOptions(options.filter(o => o.id !== id));
  };

  // Draw the wheel
  const drawWheel = useCallback((angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.min(canvas.parentElement?.clientWidth || 360, 420);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;

    const totalWeight = options.reduce((sum, o) => sum + o.weight, 0) || 1;
    let startAngle = angle;

    // Draw slices
    options.forEach((opt) => {
      const sliceAngle = (opt.weight / totalWeight) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = opt.color;
      ctx.fill();
      ctx.strokeStyle = '#09090b'; // zinc-950 border
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text label inside slice
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 4;

      const maxLabelLen = Math.floor(radius / 9);
      const displayLabel = opt.label.length > maxLabelLen ? opt.label.substring(0, maxLabelLen - 1) + '…' : opt.label;
      ctx.fillText(displayLabel, radius - 18, 4);
      ctx.restore();

      startAngle += sliceAngle;
    });

    // Outer glow ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Center hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#18181b';
    ctx.fill();
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#10b981'; // center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Pointer at right edge (3 o'clock / angle 0)
    ctx.save();
    ctx.translate(centerX + radius + 8, centerY);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-18, -10);
    ctx.lineTo(-18, 10);
    ctx.closePath();
    ctx.fillStyle = '#ef4444'; // Red pointer
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

  }, [options]);

  useEffect(() => {
    drawWheel(currentAngleRef.current);
  }, [drawWheel]);

  // Spin physics engine
  const handleSpin = () => {
    if (isSpinning || options.length < 2) return;
    setIsSpinning(true);
    setWinner(null);

    // Initial spin parameters
    const totalSpins = 5 + Math.random() * 5; // 5 to 10 full revolutions
    const targetDelta = totalSpins * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 4000; // 4 seconds
    const startTime = performance.now();
    const initialAngle = currentAngleRef.current;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentAngle = initialAngle + targetDelta * easeProgress;
      currentAngleRef.current = currentAngle;

      drawWheel(currentAngle);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        // Calculate winning slice at pointer (pointer is at angle 0 / 3 o'clock)
        const totalWeight = options.reduce((sum, o) => sum + o.weight, 0);
        // Normalize angle to [0, 2pi)
        const normalizedAngle = (2 * Math.PI - (currentAngle % (2 * Math.PI))) % (2 * Math.PI);

        let accumulated = 0;
        let selectedOption = options[0];
        for (const opt of options) {
          const sliceAngle = (opt.weight / totalWeight) * 2 * Math.PI;
          if (normalizedAngle >= accumulated && normalizedAngle < accumulated + sliceAngle) {
            selectedOption = opt;
            break;
          }
          accumulated += sliceAngle;
        }

        setWinner(selectedOption.label);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Eliminate winner
  const handleEliminateWinner = () => {
    if (winner && options.length > 2) {
      setOptions(options.filter(o => o.label !== winner));
      setWinner(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Presets Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-xl backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1">
            Presets:
          </span>
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => loadPreset(key)}
              className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setEliminationMode(!eliminationMode)}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            eliminationMode
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold'
              : 'bg-zinc-800 border-zinc-700 text-zinc-400'
          }`}
        >
          {eliminationMode ? 'Elimination Mode: Active' : 'Elimination Mode: Off'}
        </button>
      </div>

      {/* Main Wheel & Controller Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Wheel Canvas Card (Center Stage) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="relative flex items-center justify-center w-full min-h-[380px]">
            <canvas ref={canvasRef} className="max-w-full drop-shadow-2xl" />
          </div>

          {/* Spin Action Button */}
          <div className="mt-5 flex gap-3 w-full max-w-xs">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                isSpinning
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 glow-emerald active:scale-95'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              {isSpinning ? 'SPINNING...' : 'SPIN WHEEL'}
            </button>
          </div>

          {/* Winner Celebration Modal / Card */}
          {winner && (
            <div className="mt-4 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-center w-full max-w-sm animate-bounce shadow-2xl backdrop-blur">
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold flex items-center justify-center gap-1.5 mb-1">
                <Trophy className="w-4 h-4 text-emerald-400" />
                The Wheel Has Chosen!
              </span>
              <h4 className="text-xl font-extrabold text-white font-mono my-1">
                {winner}
              </h4>
              {eliminationMode && options.length > 2 && (
                <button
                  onClick={handleEliminateWinner}
                  className="mt-2 text-xs px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors"
                >
                  Eliminate from next round 🗑️
                </button>
              )}
            </div>
          )}
        </div>

        {/* Custom Item List & Editor (Right Side) */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-400" />
                Wheel Slices ({options.length})
              </h3>
              <span className="text-xs text-zinc-400 font-mono">Min 2 items</span>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Add custom slice..."
                className="flex-1 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </form>

            {/* Slices list */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {options.map((opt, idx) => (
                <div
                  key={opt.id}
                  className="p-2.5 bg-zinc-950 border border-zinc-800/80 rounded-lg flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: opt.color }}
                    />
                    <input
                      type="text"
                      value={opt.label}
                      onChange={(e) => {
                        const next = [...options];
                        next[idx].label = e.target.value;
                        setOptions(next);
                      }}
                      className="bg-transparent text-zinc-200 font-medium truncate focus:outline-none focus:text-white w-full"
                    />
                  </div>

                  <button
                    onClick={() => removeItem(opt.id)}
                    disabled={options.length <= 2}
                    className={`p-1 transition-colors ${
                      options.length <= 2
                        ? 'text-zinc-700 cursor-not-allowed'
                        : 'text-zinc-500 hover:text-red-400'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 pt-4 border-t border-zinc-800/80 mt-4 text-center">
            Tip: Press <kbd className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[10px]">Spacebar</kbd> or click the button to spin.
          </p>
        </div>
      </div>
    </div>
  );
}
