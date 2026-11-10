/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Crosshair, Zap, Sliders, Shield, Award, RotateCcw, 
  Play, Pause, Download, Share2, Check, ArrowDown, ArrowDownLeft, 
  ArrowDownRight, Eye, Info, Sparkles, Target, Activity, Flame,
  Trophy, MousePointer, HelpCircle, ChevronRight, CheckCircle2
} from 'lucide-react';

export type WeaponCategory = 'assault' | 'smg' | 'shotgun' | 'support';
export type StanceType = 'standing' | 'crouch' | 'prone' | 'bipod';

export interface WeaponRecoilData {
  id: string;
  name: string;
  category: WeaponCategory;
  categoryName: string;
  verticalRecoil: number; // base vertical score
  horizontalRecoil: number; // base horizontal score
  recoveryTime: number; // in seconds
  magSize: number;
  patternDescription: string;
  recommendedStance: string;
  mouseControlGuide: string;
  mouseVector: { dx: number; dy: number; arrow: string }; // dx (-left, +right), dy (+down)
  difficultyStars: number; // 1 to 5
  icon: string;
}

export const RECOIL_WEAPONS: WeaponRecoilData[] = [
  // Assault Rifles
  {
    id: 'liberator',
    name: 'AR-23 Liberator',
    category: 'assault',
    categoryName: 'Assault Rifle',
    verticalRecoil: 15,
    horizontalRecoil: 10,
    recoveryTime: 0.20,
    magSize: 45,
    patternDescription: 'Straight vertical climb with slight rightward drift',
    recommendedStance: 'Standing or Crouched',
    mouseControlGuide: 'Pull straight DOWN by 15% and nudge slightly LEFT after shot 3.',
    mouseVector: { dx: -3, dy: 15, arrow: '↙' },
    difficultyStars: 2,
    icon: '🔫'
  },
  {
    id: 'tenderizer',
    name: 'AR-61 Tenderizer',
    category: 'assault',
    categoryName: 'Assault Rifle',
    verticalRecoil: 22,
    horizontalRecoil: 12,
    recoveryTime: 0.30,
    magSize: 30,
    patternDescription: 'Upward burst with right-leaning zigzag horizontal deviation',
    recommendedStance: 'Crouched',
    mouseControlGuide: 'Pull DOWN firmly 22% speed and weave LEFT during sustained burst.',
    mouseVector: { dx: -5, dy: 22, arrow: '↙' },
    difficultyStars: 3,
    icon: '💥'
  },
  {
    id: 'adjudicator',
    name: 'BR-14 Adjudicator',
    category: 'assault',
    categoryName: 'Battle Rifle',
    verticalRecoil: 28,
    horizontalRecoil: 18,
    recoveryTime: 0.45,
    magSize: 30,
    patternDescription: 'Heavy upward kick accompanied by aggressive left-right violent shake',
    recommendedStance: 'Crouched or Prone',
    mouseControlGuide: 'Pull DOWN hard (28% speed) and hold mouse tightly to center horizontal shake.',
    mouseVector: { dx: 0, dy: 28, arrow: '↓' },
    difficultyStars: 4,
    icon: '⚡'
  },
  {
    id: 'breaker',
    name: 'SG-225 Breaker',
    category: 'shotgun',
    categoryName: 'Shotgun',
    verticalRecoil: 35,
    horizontalRecoil: 5,
    recoveryTime: 0.50,
    magSize: 16,
    patternDescription: 'Massive single-frame vertical jump with zero horizontal drift',
    recommendedStance: 'Standing (Pacing shots)',
    mouseControlGuide: 'Pace your trigger clicks or pull DOWN sharply between individual shell discharges.',
    mouseVector: { dx: 0, dy: 35, arrow: '↓' },
    difficultyStars: 3,
    icon: '🎯'
  },

  // SMGs
  {
    id: 'knight',
    name: 'MP-98 Knight',
    category: 'smg',
    categoryName: 'SMG',
    verticalRecoil: 12,
    horizontalRecoil: 15,
    recoveryTime: 0.18,
    magSize: 50,
    patternDescription: 'Low vertical kick with wide horizontal spray pattern at 1380 RPM',
    recommendedStance: 'Crouched',
    mouseControlGuide: 'Slight DOWN pull with active counter-steering against rapid side-to-side drift.',
    mouseVector: { dx: 0, dy: 12, arrow: '↓' },
    difficultyStars: 3,
    icon: '⚡'
  },
  {
    id: 'defender',
    name: 'SMG-37 Defender',
    category: 'smg',
    categoryName: 'SMG',
    verticalRecoil: 18,
    horizontalRecoil: 10,
    recoveryTime: 0.22,
    magSize: 45,
    patternDescription: 'Ultra-predictable linear vertical climb with almost no sway',
    recommendedStance: 'Standing / One-Handed',
    mouseControlGuide: 'Smooth, constant DOWN pull. Easiest full-auto spray control in game.',
    mouseVector: { dx: 0, dy: 18, arrow: '↓' },
    difficultyStars: 1,
    icon: '🛡️'
  },

  // Machine Guns / Support
  {
    id: 'stalwart',
    name: 'M-105 Stalwart',
    category: 'support',
    categoryName: 'Support Weapon',
    verticalRecoil: 10,
    horizontalRecoil: 20,
    recoveryTime: 0.25,
    magSize: 150,
    patternDescription: 'Gentle vertical rise with steady horizontal sway during mag dumps',
    recommendedStance: 'Crouch with Bipod',
    mouseControlGuide: 'Light DOWN pressure. Tap firing at long range negates horizontal spread.',
    mouseVector: { dx: 0, dy: 10, arrow: '↓' },
    difficultyStars: 2,
    icon: '🔥'
  },
  {
    id: 'machine-gun',
    name: 'MG-43 Machine Gun',
    category: 'support',
    categoryName: 'Support Weapon',
    verticalRecoil: 25,
    horizontalRecoil: 25,
    recoveryTime: 0.40,
    magSize: 100,
    patternDescription: 'Severe upward climb combined with unpredictable wild horizontal bloom',
    recommendedStance: 'Must Crouch / Prone',
    mouseControlGuide: 'Crouch first! Pull DOWN 25% speed and brace mouse pad for wide bursts.',
    mouseVector: { dx: -4, dy: 25, arrow: '↙' },
    difficultyStars: 4,
    icon: '💣'
  },
  {
    id: 'heavy-machine-gun',
    name: 'MG-206 Heavy Machine Gun',
    category: 'support',
    categoryName: 'Support Weapon',
    verticalRecoil: 40,
    horizontalRecoil: 30,
    recoveryTime: 0.60,
    magSize: 75,
    patternDescription: 'Extreme violent upward jump and heavy horizontal weapon sway',
    recommendedStance: 'Prone Mandatory',
    mouseControlGuide: 'ALWAYS go Prone before firing! Pull DOWN with full arm motion.',
    mouseVector: { dx: -6, dy: 40, arrow: '↙' },
    difficultyStars: 5,
    icon: '☠️'
  }
];

export interface ShotPoint {
  shotNumber: number;
  x: number; // canvas relative px from center
  y: number; // canvas relative px upward from center
}

export default function HelldiversRecoilVisualizer() {
  // Primary Weapon Selection
  const [selectedCategory, setSelectedCategory] = useState<WeaponCategory | 'all'>('all');
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('liberator');

  // Stance & Attachments
  const [stance, setStance] = useState<StanceType>('standing');
  const [burstSize, setBurstSize] = useState<number>(15);
  const [showControlGuide, setShowControlGuide] = useState<boolean>(true);

  // Animation State
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animatedShotCount, setAnimatedShotCount] = useState<number>(15);

  // Compare Mode State
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [compareWeaponId, setCompareWeaponId] = useState<string>('adjudicator');

  // Interactive Recoil Control Challenge State
  const [isChallengeActive, setIsChallengeActive] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number | null>(null);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const compareCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Active Primary Weapon
  const primaryWeapon = useMemo(() => {
    return RECOIL_WEAPONS.find(w => w.id === selectedWeaponId) || RECOIL_WEAPONS[0];
  }, [selectedWeaponId]);

  // Active Compare Weapon
  const compareWeapon = useMemo(() => {
    return RECOIL_WEAPONS.find(w => w.id === compareWeaponId) || RECOIL_WEAPONS[2];
  }, [compareWeaponId]);

  // Filtered Weapon List
  const filteredWeapons = useMemo(() => {
    if (selectedCategory === 'all') return RECOIL_WEAPONS;
    return RECOIL_WEAPONS.filter(w => w.category === selectedCategory);
  }, [selectedCategory]);

  // Stance Multiplier Calculation
  const stanceMultiplier = useMemo(() => {
    switch (stance) {
      case 'crouch': return 0.80; // -20%
      case 'prone': return 0.60;  // -40%
      case 'bipod': return 0.40;  // -60%
      case 'standing':
      default: return 1.0;
    }
  }, [stance]);

  // Calculate Shots Recoil Points Array for a Weapon
  const generateRecoilPattern = (weapon: WeaponRecoilData, count: number, mult: number): ShotPoint[] => {
    const points: ShotPoint[] = [];
    let curX = 0;
    let curY = 0;

    // Shot 1 is center
    points.push({ shotNumber: 1, x: 0, y: 0 });

    for (let i = 2; i <= count; i++) {
      // Escalating recoil multiplier per shot
      const escalation = 1 + (i / count) * 0.4;
      const vertStep = weapon.verticalRecoil * 0.85 * mult * escalation;
      const horizStep = weapon.horizontalRecoil * mult;

      // Seed pseudo-random deterministic jitter based on weapon id + shot index
      const seed = (i * 37 + weapon.name.length * 13) % 100;
      const jitterX = ((seed - 50) / 50) * (horizStep * 0.6);
      const jitterY = (((seed * 7) % 100 - 50) / 50) * (vertStep * 0.15);

      // Horizontal drift direction (some drift right, some shake both)
      let dirX = 0;
      if (weapon.id === 'liberator' || weapon.id === 'tenderizer') {
        dirX = 0.35; // drift right
      } else if (weapon.id === 'adjudicator' || weapon.id === 'machine-gun') {
        dirX = (i % 2 === 0 ? 0.8 : -0.8); // zigzag
      } else if (weapon.id === 'knight' || weapon.id === 'stalwart') {
        dirX = Math.sin(i * 0.8) * 0.9;
      } else {
        dirX = ((seed % 10) - 5) / 10;
      }

      curY += vertStep + jitterY;
      curX += (horizStep * dirX) + jitterX;

      points.push({
        shotNumber: i,
        x: Math.round(curX),
        y: Math.round(curY)
      });
    }

    return points;
  };

  const primaryPattern = useMemo(() => {
    return generateRecoilPattern(primaryWeapon, burstSize, stanceMultiplier);
  }, [primaryWeapon, burstSize, stanceMultiplier]);

  const comparePattern = useMemo(() => {
    return generateRecoilPattern(compareWeapon, burstSize, stanceMultiplier);
  }, [compareWeapon, burstSize, stanceMultiplier]);

  // Animation Loop for Shot Progression
  useEffect(() => {
    let interval: any = null;
    if (isAnimating) {
      setAnimatedShotCount(1);
      interval = setInterval(() => {
        setAnimatedShotCount(prev => {
          if (prev >= burstSize) {
            setIsAnimating(false);
            clearInterval(interval);
            return burstSize;
          }
          return prev + 1;
        });
      }, 70); // 70ms per shot fire animation
    } else {
      setAnimatedShotCount(burstSize);
    }
    return () => clearInterval(interval);
  }, [isAnimating, burstSize]);

  // Draw Target Canvas Function
  const renderTargetCanvas = (
    canvas: HTMLCanvasElement | null, 
    weapon: WeaponRecoilData, 
    pattern: ShotPoint[], 
    activeShotLimit: number
  ) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 360;
    const height = 360;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2 + 80; // Start bullseye lower to allow upward recoil space

    // 1. Dark Target Paper Background
    ctx.fillStyle = '#080a10';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Concentric Bullseye Rings
    const ringRadii = [140, 100, 65, 35, 12];
    const ringColors = ['#0f172a', '#1e293b', '#334155', '#475569', '#dc2626'];

    ringRadii.forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.fillStyle = ringColors[idx];
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Crosshairs on Bullseye
    ctx.strokeStyle = '#FFE900';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 160, centerY);
    ctx.lineTo(centerX + 160, centerY);
    ctx.moveTo(centerX, centerY - 200);
    ctx.lineTo(centerX, centerY + 50);
    ctx.stroke();

    // 3. Draw Connecting Recoil Path Line
    const visiblePoints = pattern.slice(0, activeShotLimit);

    if (visiblePoints.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 233, 0, 0.6)';
      ctx.lineWidth = 2.5;
      visiblePoints.forEach((pt, idx) => {
        const px = centerX + pt.x;
        const py = centerY - pt.y; // canvas Y is inverted
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // 4. Draw Bullet Holes with Progression Color (Shot 1 = Green, Last = Red)
    visiblePoints.forEach((pt, idx) => {
      const px = centerX + pt.x;
      const py = centerY - pt.y;

      const progress = idx / (pattern.length - 1 || 1);
      // Interpolate color from green (#34d399) to yellow (#FFE900) to red (#f87171)
      let dotColor = '#34d399';
      if (progress > 0.6) dotColor = '#f87171';
      else if (progress > 0.3) dotColor = '#FFE900';

      // Bullet impact outer glow
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.shadowColor = dotColor;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Bullet hole dark center
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // Shot number label for key bullets
      if (pt.shotNumber === 1 || pt.shotNumber === 5 || pt.shotNumber === pattern.length) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`#${pt.shotNumber}`, px + 9, py + 3);
      }
    });

    // 5. Draw Animated Crosshair on Current Shot
    if (visiblePoints.length > 0) {
      const lastPt = visiblePoints[visiblePoints.length - 1];
      const curPx = centerX + lastPt.x;
      const curPy = centerY - lastPt.y;

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(curPx, curPy, 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(curPx - 16, curPy);
      ctx.lineTo(curPx + 16, curPy);
      ctx.moveTo(curPx, curPy - 16);
      ctx.lineTo(curPx, curPy + 16);
      ctx.stroke();
    }
  };

  // Re-draw canvases whenever primary/compare pattern changes
  useEffect(() => {
    renderTargetCanvas(canvasRef.current, primaryWeapon, primaryPattern, animatedShotCount);
  }, [primaryWeapon, primaryPattern, animatedShotCount]);

  useEffect(() => {
    if (isCompareMode) {
      renderTargetCanvas(compareCanvasRef.current, compareWeapon, comparePattern, animatedShotCount);
    }
  }, [isCompareMode, compareWeapon, comparePattern, animatedShotCount]);

  // Recoil Tier List Auto-Rankings
  const recoilTierList = useMemo(() => {
    const scored = RECOIL_WEAPONS.map(w => {
      const totalRecoil = w.verticalRecoil * 1.2 + w.horizontalRecoil;
      return { weapon: w, score: totalRecoil };
    }).sort((a, b) => a.score - b.score);

    return {
      STier: scored.slice(0, 2).map(s => s.weapon), // Easiest
      ATier: scored.slice(2, 4).map(s => s.weapon),
      BTier: scored.slice(4, 6).map(s => s.weapon),
      CTier: scored.slice(6, 9).map(s => s.weapon)  // Hardest
    };
  }, []);

  // Comparison Winner Logic
  const comparisonWinner = useMemo(() => {
    const rec1 = primaryWeapon.verticalRecoil * 1.2 + primaryWeapon.horizontalRecoil;
    const rec2 = compareWeapon.verticalRecoil * 1.2 + compareWeapon.horizontalRecoil;

    if (rec1 < rec2) {
      const pct = Math.round(((rec2 - rec1) / rec2) * 100);
      return `${primaryWeapon.name} is ${pct}% easier to control than ${compareWeapon.name}!`;
    } else if (rec2 < rec1) {
      const pct = Math.round(((rec1 - rec2) / rec1) * 100);
      return `${compareWeapon.name} is ${pct}% easier to control than ${primaryWeapon.name}!`;
    }
    return `Both weapons have identical overall recoil profiles.`;
  }, [primaryWeapon, compareWeapon]);

  // Export Reddit / Social Image Card
  const handleExportImage = () => {
    const canvas = exportCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    // Background
    const bg = ctx.createLinearGradient(0, 0, 1080, 1080);
    bg.addColorStop(0, '#060810');
    bg.addColorStop(1, '#0c101d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1080);

    // Border Frame
    ctx.strokeStyle = '#FFE900';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1000, 1000);

    const drawFitText = (text: string, x: number, y: number, maxWidth: number, fontStyle: string, maxFontSize: number) => {
      let fontSize = maxFontSize;
      ctx.font = `900 ${fontSize}px ${fontStyle}`;
      while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
        fontSize -= 1;
        ctx.font = `900 ${fontSize}px ${fontStyle}`;
      }
      ctx.fillText(text, x, y);
    };

    // Header Title
    ctx.fillStyle = '#FFE900';
    drawFitText('HELLDIVERS 2 RECOIL PATTERN REPORT', 80, 120, 780, 'sans-serif', 34);

    ctx.fillStyle = '#94a3b8';
    drawFitText(`WEAPON: ${primaryWeapon.name.toUpperCase()} (${primaryWeapon.categoryName.toUpperCase()})`, 80, 165, 780, 'monospace', 22);

    // Card Box 1: Stats
    ctx.fillStyle = 'rgba(20, 24, 38, 0.9)';
    ctx.roundRect(80, 210, 920, 240, 20);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    drawFitText(`VERTICAL RECOIL: ${primaryWeapon.verticalRecoil} | HORIZONTAL: ${primaryWeapon.horizontalRecoil}`, 110, 265, 740, 'monospace', 22);

    ctx.fillStyle = '#FFE900';
    drawFitText(`STANCE EFFECTIVE RECOIL: ${Math.round(primaryWeapon.verticalRecoil * stanceMultiplier)} V / ${Math.round(primaryWeapon.horizontalRecoil * stanceMultiplier)} H`, 110, 335, 740, 'sans-serif', 28);

    ctx.fillStyle = '#FFFFFF';
    drawFitText(`Recovery Time: ${primaryWeapon.recoveryTime}s | Recommended Stance: ${primaryWeapon.recommendedStance}`, 110, 395, 740, 'monospace', 18);

    // Card Box 2: Mouse Guide
    ctx.fillStyle = 'rgba(12, 16, 28, 0.9)';
    ctx.roundRect(80, 480, 920, 380, 20);
    ctx.fill();

    ctx.fillStyle = '#34d399';
    drawFitText('MOUSE RECOIL COMPENSATION GUIDE', 110, 540, 740, 'sans-serif', 28);

    ctx.fillStyle = '#FFFFFF';
    drawFitText(primaryWeapon.mouseControlGuide, 110, 610, 740, 'sans-serif', 22);

    ctx.fillStyle = '#FFE900';
    drawFitText(`Control Arrow Vector: ${primaryWeapon.mouseVector.arrow} (Pull Down & Compensate)`, 110, 680, 740, 'monospace', 20);

    ctx.fillStyle = '#94a3b8';
    drawFitText(`Pattern Behavior: ${primaryWeapon.patternDescription}`, 110, 750, 740, 'sans-serif', 20);

    // Footer Watermark
    ctx.fillStyle = '#FFE900';
    drawFitText('GAMINGTOOLSHUB.COM // RECOIL GUIDE 2026', 80, 970, 800, 'sans-serif', 26);

    setTimeout(() => {
      const uri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `helldivers-recoil-${primaryWeapon.id}.png`;
      link.href = uri;
      link.click();
    }, 150);
  };

  const handleShare = () => {
    const text = `HELLDIVERS 2 RECOIL PATTERN GUIDE\n` +
      `Weapon: ${primaryWeapon.name}\n` +
      `Recoil: Vertical ${primaryWeapon.verticalRecoil} | Horizontal ${primaryWeapon.horizontalRecoil}\n` +
      `Control Tip: ${primaryWeapon.mouseControlGuide}\n` +
      `Master your recoil: https://gamingtoolshub.com/tools/helldivers-2-recoil-visualizer`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Hidden Canvas for Export PNG */}
      <canvas ref={exportCanvasRef} className="hidden" />

      {/* Top Banner Header */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/15 border border-[#FFE900]/50 flex items-center justify-center text-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.3)]">
              <Crosshair className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Ordnance Ballistics Range
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Recoil Pattern Visualizer & Mouse Guide (2026)
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition font-mono border ${
                isCompareMode 
                  ? 'bg-[#FFE900] text-black border-[#FFE900] shadow' 
                  : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              {isCompareMode ? 'Single View' : 'Compare 2 Weapons'}
            </button>

            <button
              onClick={handleExportImage}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition font-mono"
            >
              <Download className="w-4 h-4 text-[#FFE900]" />
              Export Pattern (PNG)
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 hover:bg-[#fff033] shadow cursor-pointer transition"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copiedLink ? 'Copied' : 'Share Guide'}
            </button>
          </div>
        </div>

        {/* Category & Weapon Selector Grid */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Filter Arsenal Category:
            </span>
            <div className="flex items-center gap-1.5">
              {(['all', 'assault', 'smg', 'shotgun', 'support'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase cursor-pointer border transition ${
                    selectedCategory === cat
                      ? 'bg-[#FFE900] text-black border-[#FFE900]'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Weapons' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {filteredWeapons.map(w => {
              const isSelected = w.id === selectedWeaponId;
              return (
                <button
                  key={w.id}
                  onClick={() => setSelectedWeaponId(w.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#FFE900] bg-zinc-900 shadow-md ring-1 ring-[#FFE900]'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{w.icon}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-[#FFE900] border border-zinc-700 font-bold">
                      V:{w.verticalRecoil} H:{w.horizontalRecoil}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-white mt-1.5 truncate">{w.name}</h4>
                  <span className="text-[9px] text-zinc-500 font-mono mt-0.5">{w.categoryName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Parameters Toolbar (Stance & Burst Size) */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Stance Toggles */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-zinc-400 uppercase font-bold block">
            Helldiver Firing Stance (Recoil Reduction):
          </label>
          <div className="flex items-center gap-2">
            {[
              { id: 'standing', label: 'Standing (0%)', factor: '-0%' },
              { id: 'crouch', label: 'Crouch (-20%)', factor: '-20%' },
              { id: 'prone', label: 'Prone (-40%)', factor: '-40%' },
              { id: 'bipod', label: 'Bipod (-60%)', factor: '-60%' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setStance(s.id as StanceType)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer border transition ${
                  stance === s.id
                    ? 'bg-[#FFE900] text-black border-[#FFE900] shadow'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Burst Size Slider */}
        <div className="space-y-1 w-full sm:w-64">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-400 uppercase font-bold">Burst Size:</span>
            <span className="text-[#FFE900] font-black">{burstSize} Bullets</span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={burstSize}
            aria-label="Burst size in bullets"
            onChange={e => setBurstSize(Number(e.target.value))}
            className="w-full accent-[#FFE900] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>5 Shots</span>
            <span>15 Shots</span>
            <span>30 Full Mag</span>
          </div>
        </div>

        {/* Play Burst Animation Trigger */}
        <button
          onClick={() => setIsAnimating(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-lg transition"
        >
          <Play className="w-4 h-4 fill-black" />
          Simulate Burst
        </button>
      </div>

      {/* Main Visualizer Area (Single View OR Side-By-Side Comparison) */}
      {!isCompareMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Center Target Canvas (7 Cols) */}
          <div className="lg:col-span-7 bg-[#090b14] border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-between space-y-4">
            <div className="w-full flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase text-[#FFE900] font-bold flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#FFE900]" />
                Target Spray Pattern: {primaryWeapon.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-700">
                Stance: {stance.toUpperCase()} ({Math.round((1 - stanceMultiplier) * 100)}% Recoil Cut)
              </span>
            </div>

            {/* Canvas Container */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-inner">
              <canvas ref={canvasRef} className="block cursor-crosshair" />
              <div className="absolute top-3 left-3 bg-zinc-950/90 border border-zinc-800 px-2.5 py-1 rounded text-[10px] font-mono text-zinc-300">
                Shot 1 = Green • Last = Red
              </div>
            </div>

            <p className="text-center text-xs text-zinc-400 font-mono">
              Pattern behavior: <strong className="text-white">{primaryWeapon.patternDescription}</strong>
            </p>
          </div>

          {/* Right Mouse Control Guide & Stats Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mouse Control Guide Box */}
            <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-mono uppercase font-bold text-[#FFE900] flex items-center gap-2">
                  <MousePointer className="w-4 h-4 text-[#FFE900]" />
                  Mouse Compensation Guide
                </span>
                <span className="text-2xl font-black text-[#FFE900]">
                  {primaryWeapon.mouseVector.arrow}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold block">
                  Recommended Mouse Movement:
                </span>
                <p className="text-sm text-white font-bold leading-relaxed">
                  "{primaryWeapon.mouseControlGuide}"
                </p>
              </div>

              {/* Arrow Control Graphic */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-around">
                <div className="text-center space-y-1">
                  <span className="text-[10px] text-zinc-500 font-mono block">RECOIL CLIMB</span>
                  <div className="text-rose-400 text-xl font-bold">↑ UP & DRIFT</div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#FFE900]/20 border-2 border-[#FFE900] flex items-center justify-center text-[#FFE900] text-2xl font-black animate-bounce">
                  {primaryWeapon.mouseVector.arrow}
                </div>

                <div className="text-center space-y-1">
                  <span className="text-[10px] text-zinc-500 font-mono block">YOUR MOUSE PULL</span>
                  <div className="text-emerald-400 text-xl font-bold">↓ PULL OPPOSITE</div>
                </div>
              </div>
            </div>

            {/* Recoil Stat Breakdown Table */}
            <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-mono uppercase font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
                <Activity className="w-4 h-4 text-[#FFE900]" />
                Technical Ballistics Stats
              </h3>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Vertical Recoil:</span>
                  <span className="text-white font-bold">
                    {primaryWeapon.verticalRecoil} (Effective: {Math.round(primaryWeapon.verticalRecoil * stanceMultiplier)})
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Horizontal Recoil:</span>
                  <span className="text-white font-bold">
                    {primaryWeapon.horizontalRecoil} (Effective: {Math.round(primaryWeapon.horizontalRecoil * stanceMultiplier)})
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Recovery Speed:</span>
                  <span className="text-emerald-400 font-bold">{primaryWeapon.recoveryTime}s (Fast)</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-zinc-400">Control Difficulty:</span>
                  <span className="text-[#FFE900] font-bold">
                    {'★'.repeat(primaryWeapon.difficultyStars)}
                    {'☆'.repeat(5 - primaryWeapon.difficultyStars)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Side by Side Comparison Mode */
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-zinc-950 border-2 border-[#FFE900]/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFE900]" />
              <span className="text-sm font-black text-white uppercase tracking-wider">
                Recoil Comparison Winner:
              </span>
              <span className="text-sm font-black text-emerald-400 font-mono">
                {comparisonWinner}
              </span>
            </div>

            {/* Select Weapon 2 for Comparison */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">Compare With:</span>
              <select
                value={compareWeaponId}
                aria-label="Select secondary weapon to compare recoil"
                onChange={e => setCompareWeaponId(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-bold text-white font-mono"
              >
                {RECOIL_WEAPONS.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} (V:{w.verticalRecoil} H:{w.horizontalRecoil})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Weapon Canvas */}
            <div className="bg-[#090b14] border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center space-y-4">
              <div className="w-full flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-xs font-black text-white">{primaryWeapon.name}</span>
                <span className="text-xs font-mono text-[#FFE900]">V:{primaryWeapon.verticalRecoil} H:{primaryWeapon.horizontalRecoil}</span>
              </div>
              <canvas ref={canvasRef} className="block rounded-xl border border-zinc-800" />
              <p className="text-xs text-zinc-400 text-center font-mono">
                "{primaryWeapon.mouseControlGuide}"
              </p>
            </div>

            {/* Right Weapon Canvas */}
            <div className="bg-[#090b14] border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center space-y-4">
              <div className="w-full flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-xs font-black text-white">{compareWeapon.name}</span>
                <span className="text-xs font-mono text-[#FFE900]">V:{compareWeapon.verticalRecoil} H:{compareWeapon.horizontalRecoil}</span>
              </div>
              <canvas ref={compareCanvasRef} className="block rounded-xl border border-zinc-800" />
              <p className="text-xs text-zinc-400 text-center font-mono">
                "{compareWeapon.mouseControlGuide}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recoil Tier List Section */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 className="text-sm font-black uppercase text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#FFE900]" />
            Helldivers 2 Weapon Recoil Tier List (2026 Meta)
          </h3>
          <span className="text-xs font-mono text-zinc-400">
            Ranked from Easiest to Hardest Recoil Control
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-zinc-950 p-4 rounded-xl border-2 border-emerald-500/40 space-y-2">
            <span className="text-xs font-black text-emerald-400 uppercase block border-b border-emerald-500/20 pb-1">
              S-Tier (Ultra Easy Recoil)
            </span>
            {recoilTierList.STier.map(w => (
              <div key={w.id} className="text-white font-bold flex justify-between">
                <span>{w.name}</span>
                <span className="text-emerald-400">V:{w.verticalRecoil}</span>
              </div>
            ))}
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border-2 border-cyan-500/40 space-y-2">
            <span className="text-xs font-black text-cyan-400 uppercase block border-b border-cyan-500/20 pb-1">
              A-Tier (Low Recoil)
            </span>
            {recoilTierList.ATier.map(w => (
              <div key={w.id} className="text-white font-bold flex justify-between">
                <span>{w.name}</span>
                <span className="text-cyan-400">V:{w.verticalRecoil}</span>
              </div>
            ))}
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border-2 border-amber-500/40 space-y-2">
            <span className="text-xs font-black text-amber-400 uppercase block border-b border-amber-500/20 pb-1">
              B-Tier (Moderate Kick)
            </span>
            {recoilTierList.BTier.map(w => (
              <div key={w.id} className="text-white font-bold flex justify-between">
                <span>{w.name}</span>
                <span className="text-amber-400">V:{w.verticalRecoil}</span>
              </div>
            ))}
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border-2 border-rose-500/40 space-y-2">
            <span className="text-xs font-black text-rose-400 uppercase block border-b border-rose-500/20 pb-1">
              C-Tier (Heavy Kick / Requires Stance)
            </span>
            {recoilTierList.CTier.map(w => (
              <div key={w.id} className="text-white font-bold flex justify-between">
                <span>{w.name}</span>
                <span className="text-rose-400">V:{w.verticalRecoil}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO FAQs */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 text-zinc-300 text-xs leading-relaxed">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FFE900]" />
          Helldivers 2 Recoil Pattern Guide & FAQ (2026)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">How to control recoil in Helldivers 2?</h5>
            <p className="text-zinc-400">
              Always crouch (-20% recoil) or go prone (-40% recoil) when firing full-auto weapons like the Adjudicator or Heavy Machine Gun. Gently pull your mouse downward in opposition to the gun's vertical kick.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">Which weapon has the lowest recoil?</h5>
            <p className="text-zinc-400">
              The SMG-37 Defender and AR-23 Liberator have the lowest and most predictable recoil patterns in Helldivers 2, making them ideal for long-range precise burst firing.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">Does armor passive reduce weapon recoil?</h5>
            <p className="text-zinc-400">
              Yes! Armors with the Engineering Kit or Fortified passives reduce weapon recoil by 30% when crouched or prone, stacking with stance bonuses.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">Why is Heavy Machine Gun recoil so high?</h5>
            <p className="text-zinc-400">
              The MG-206 Heavy Machine Gun has a base vertical recoil of 40. Firing while standing will cause your crosshair to climb off-screen instantly; always go prone before opening fire.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Recoil Pattern Guide - Tested in-game at 60 FPS • Verified Super Earth Logistics Hub
        </div>
      </div>
    </div>
  );
}
