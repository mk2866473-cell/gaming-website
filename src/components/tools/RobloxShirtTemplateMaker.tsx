/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, Move, RotateCcw, Shirt, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const TEMPLATE_WIDTH = 585;
export const TEMPLATE_HEIGHT = 559;

export type ClothingMode = 'shirt' | 'pants';

interface TemplateRegion {
  label: string;
  sublabel: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tint: string;
  stroke: string;
}

function getTemplateRegions(mode: ClothingMode): TemplateRegion[] {
  const rightLimb = mode === 'shirt' ? 'R Arm' : 'R Leg';
  const leftLimb = mode === 'shirt' ? 'L Arm' : 'L Leg';
  const torsoHint = mode === 'shirt' ? 'Torso' : 'Waist / Torso';

  return [
    // Torso cluster
    { label: 'Up', sublabel: torsoHint, x: 231, y: 8, w: 128, h: 64, tint: 'rgba(16, 185, 129, 0.20)', stroke: '#34d399' },
    { label: 'Left', sublabel: torsoHint, x: 165, y: 74, w: 64, h: 128, tint: 'rgba(59, 130, 246, 0.20)', stroke: '#60a5fa' },
    { label: 'Front', sublabel: torsoHint, x: 231, y: 74, w: 128, h: 128, tint: 'rgba(244, 63, 94, 0.22)', stroke: '#fb7185' },
    { label: 'Right', sublabel: torsoHint, x: 361, y: 74, w: 64, h: 128, tint: 'rgba(59, 130, 246, 0.20)', stroke: '#60a5fa' },
    { label: 'Back', sublabel: torsoHint, x: 427, y: 74, w: 128, h: 128, tint: 'rgba(168, 85, 247, 0.20)', stroke: '#c084fc' },
    { label: 'Down', sublabel: torsoHint, x: 231, y: 204, w: 128, h: 64, tint: 'rgba(245, 158, 11, 0.20)', stroke: '#fbbf24' },

    // Right Limb (Bottom-Left)
    { label: 'Up', sublabel: rightLimb, x: 217, y: 289, w: 64, h: 64, tint: 'rgba(16, 185, 129, 0.20)', stroke: '#34d399' },
    { label: 'Back', sublabel: rightLimb, x: 19, y: 355, w: 64, h: 128, tint: 'rgba(168, 85, 247, 0.20)', stroke: '#c084fc' },
    { label: 'Left', sublabel: rightLimb, x: 85, y: 355, w: 64, h: 128, tint: 'rgba(59, 130, 246, 0.20)', stroke: '#60a5fa' },
    { label: 'Front', sublabel: rightLimb, x: 151, y: 355, w: 64, h: 128, tint: 'rgba(244, 63, 94, 0.22)', stroke: '#fb7185' },
    { label: 'Right', sublabel: rightLimb, x: 217, y: 355, w: 64, h: 128, tint: 'rgba(59, 130, 246, 0.20)', stroke: '#60a5fa' },
    { label: 'Down', sublabel: rightLimb, x: 217, y: 485, w: 64, h: 64, tint: 'rgba(245, 158, 11, 0.20)', stroke: '#fbbf24' },

    // Left Limb (Bottom-Right)
    { label: 'Up', sublabel: leftLimb, x: 308, y: 289, w: 64, h: 64, tint: 'rgba(16, 185, 129, 0.20)', stroke: '#34d399' },
    { label: 'Left', sublabel: leftLimb, x: 308, y: 355, w: 64, h: 128, tint: 'rgba(59, 130, 246, 0.20)', stroke: '#60a5fa' },
    { label: 'Front', sublabel: leftLimb, x: 374, y: 355, w: 64, h: 128, tint: 'rgba(244, 63, 94, 0.22)', stroke: '#fb7185' },
    { label: 'Right', sublabel: leftLimb, x: 440, y: 355, w: 64, h: 128, tint: 'rgba(59, 130, 246, 0.20)', stroke: '#60a5fa' },
    { label: 'Back', sublabel: leftLimb, x: 506, y: 355, w: 64, h: 128, tint: 'rgba(168, 85, 247, 0.20)', stroke: '#c084fc' },
    { label: 'Down', sublabel: leftLimb, x: 308, y: 485, w: 64, h: 64, tint: 'rgba(245, 158, 11, 0.20)', stroke: '#fbbf24' }
  ];
}

export default function RobloxShirtTemplateMaker() {
  const [mode, setMode] = useState<ClothingMode>('shirt');
  const [uploadedImg, setUploadedImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [scalePct, setScalePct] = useState<number>(100);
  const [bgColor, setBgColor] = useState<string>('transparent');
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [guideOpacity, setGuideOpacity] = useState<number>(0.8);
  const [includeGuidesInDownload, setIncludeGuidesInDownload] = useState<boolean>(false);
  const [clipToRegions, setClipToRegions] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragStateRef = useRef<{ active: boolean; startX: number; startY: number; origX: number; origY: number }>({
    active: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0
  });

  const renderToCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, drawOverlay: boolean) => {
      const regions = getTemplateRegions(mode);
      ctx.clearRect(0, 0, TEMPLATE_WIDTH, TEMPLATE_HEIGHT);

      if (bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, TEMPLATE_WIDTH, TEMPLATE_HEIGHT);
      }

      if (uploadedImg) {
        ctx.save();
        if (clipToRegions) {
          ctx.beginPath();
          for (const reg of regions) {
            ctx.rect(reg.x, reg.y, reg.w, reg.h);
          }
          ctx.clip();
        }

        const baseScale = Math.min(TEMPLATE_WIDTH / uploadedImg.width, TEMPLATE_HEIGHT / uploadedImg.height);
        const drawW = uploadedImg.width * baseScale * (scalePct / 100);
        const drawH = uploadedImg.height * baseScale * (scalePct / 100);
        const drawX = (TEMPLATE_WIDTH - drawW) / 2 + offsetX;
        const drawY = (TEMPLATE_HEIGHT - drawH) / 2 + offsetY;
        ctx.drawImage(uploadedImg, drawX, drawY, drawW, drawH);
        ctx.restore();
      }

      if (drawOverlay) {
        ctx.save();
        ctx.globalAlpha = guideOpacity;
        for (const reg of regions) {
          ctx.fillStyle = reg.tint;
          ctx.fillRect(reg.x, reg.y, reg.w, reg.h);
          ctx.strokeStyle = reg.stroke;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(reg.x + 0.5, reg.y + 0.5, reg.w - 1, reg.h - 1);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const cx = reg.x + reg.w / 2;
          const cy = reg.y + reg.h / 2;
          ctx.fillText(reg.label, cx, cy - 7);
          ctx.fillStyle = '#d4d4d8';
          ctx.font = '10px ui-monospace, monospace';
          ctx.fillText(reg.sublabel, cx, cy + 8);
        }

        // Section Headers
        ctx.fillStyle = '#e4e4e7';
        ctx.font = 'bold 11px ui-monospace, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(mode === 'shirt' ? 'TORSO (SHIRT)' : 'TORSO / WAIST (PANTS)', 16, 28);
        ctx.fillText(mode === 'shirt' ? 'RIGHT ARM' : 'RIGHT LEG', 19, 316);
        ctx.fillText(mode === 'shirt' ? 'LEFT ARM' : 'LEFT LEG', 432, 316);
        ctx.fillText('585 × 559 px', 16, 46);
        ctx.restore();
      }
    },
    [mode, uploadedImg, offsetX, offsetY, scalePct, bgColor, guideOpacity, clipToRegions]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    renderToCanvas(ctx, showGuides);
  }, [renderToCanvas, showGuides]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setUploadedImg(img);
      setOffsetX(0);
      setOffsetY(0);
      setScalePct(100);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleDownloadPng = () => {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = TEMPLATE_WIDTH;
    exportCanvas.height = TEMPLATE_HEIGHT;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;
    renderToCanvas(ctx, includeGuidesInDownload);
    const link = document.createElement('a');
    link.download = `roblox-${mode}-template-585x559.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  const handleResetTransform = () => {
    setOffsetX(0);
    setOffsetY(0);
    setScalePct(100);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!uploadedImg) return;
    dragStateRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: offsetX,
      origY: offsetY
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStateRef.current.active) return;
    const dx = e.clientX - dragStateRef.current.startX;
    const dy = e.clientY - dragStateRef.current.startY;
    setOffsetX(Math.round(dragStateRef.current.origX + dx));
    setOffsetY(Math.round(dragStateRef.current.origY + dy));
  };

  const handlePointerUp = () => {
    dragStateRef.current.active = false;
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Top Controls: Shirt/Pants toggle + Upload */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('shirt')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                mode === 'shirt'
                  ? 'bg-rose-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" />
              Classic Shirt (585×559)
            </button>
            <button
              type="button"
              onClick={() => setMode('pants')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mode === 'pants'
                  ? 'bg-rose-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Classic Pants (585×559)
            </button>
          </div>

          <label className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {fileName ? `Replace Image (${fileName})` : 'Upload Texture / Artwork'}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 585x559 Canvas Preview */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-xl p-3 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono">
                Canvas: <strong className="text-white">585 × 559 px</strong> ({mode === 'shirt' ? 'Shirt' : 'Pants'} UV)
              </span>
              <span className="font-mono text-[11px] flex items-center gap-1">
                <Move className="w-3 h-3" /> Drag canvas to reposition image
              </span>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-[repeating-conic-gradient(#18181b_0%_25%,#27272a_0%_50%)] bg-[length:20px_20px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={TEMPLATE_WIDTH}
                height={TEMPLATE_HEIGHT}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="w-full max-w-[585px] h-auto touch-none cursor-grab active:cursor-grabbing block"
              />
            </div>
          </div>

          {/* Transform & Guide Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Image Position &amp; Scale
                </span>
                <button
                  type="button"
                  onClick={handleResetTransform}
                  className="text-[11px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Scale</span>
                  <span className="font-mono text-white">{scalePct}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={300}
                  value={scalePct}
                  onChange={(e) => setScalePct(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Horizontal Offset (X)</span>
                  <span className="font-mono text-white">{offsetX} px</span>
                </div>
                <input
                  type="range"
                  min={-400}
                  max={400}
                  value={offsetX}
                  onChange={(e) => setOffsetX(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Vertical Offset (Y)</span>
                  <span className="font-mono text-white">{offsetY} px</span>
                </div>
                <input
                  type="range"
                  min={-400}
                  max={400}
                  value={offsetY}
                  onChange={(e) => setOffsetY(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2 pt-1 border-t border-zinc-800">
                <span className="text-xs text-zinc-400 block">Canvas Background Fill</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Transparent', val: 'transparent' },
                    { label: 'Black', val: '#111111' },
                    { label: 'White', val: '#ffffff' }
                  ].map((bg) => (
                    <button
                      key={bg.val}
                      type="button"
                      onClick={() => setBgColor(bg.val)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                        bgColor === bg.val
                          ? 'bg-rose-500/20 border-rose-500 text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Guide Overlay Controls */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Template Guide Overlay
                </span>
                <button
                  type="button"
                  onClick={() => setShowGuides((v) => !v)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 cursor-pointer"
                >
                  {showGuides ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-400" />}
                  {showGuides ? 'Preview Guides ON' : 'Guides OFF'}
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Guide Opacity</span>
                  <span className="font-mono text-white">{Math.round(guideOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={100}
                  value={Math.round(guideOpacity * 100)}
                  onChange={(e) => setGuideOpacity(parseInt(e.target.value, 10) / 100)}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={clipToRegions}
                  onChange={(e) => setClipToRegions(e.target.checked)}
                  className="accent-rose-500"
                />
                Clip artwork strictly inside the 18 UV boxes
              </label>

              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGuidesInDownload}
                  onChange={(e) => setIncludeGuidesInDownload(e.target.checked)}
                  className="accent-rose-500"
                />
                Include semi-transparent guide labels in exported PNG
              </label>
            </div>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownloadPng}
              className="w-full py-3.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-rose-950/40"
            >
              <Download className="w-4 h-4" />
              Download {mode === 'shirt' ? 'Shirt' : 'Pants'} Template (585×559 PNG)
            </button>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Everything runs 100% locally in your browser via HTML5 Canvas — your image is never uploaded to a server. Official classic shirt &amp; pants files measure exactly <strong>585 × 559 pixels</strong>.
          </span>
        </div>
      </div>
    </div>
  );
}
