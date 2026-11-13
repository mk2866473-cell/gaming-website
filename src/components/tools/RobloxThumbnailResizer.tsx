/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, Image as ImageIcon, LayoutGrid, RotateCcw, ShieldCheck, Move } from 'lucide-react';

export type ResizerPreset = 'icon' | 'thumbnail';
export type ExportFormat = 'png' | 'jpeg';

export const RESIZER_SPECS: Record<ResizerPreset, { label: string; width: number; height: number; ratioLabel: string; note: string }> = {
  icon: {
    label: 'Experience Icon (512×512)',
    width: 512,
    height: 512,
    ratioLabel: '1:1 Square',
    note: 'At least 512×512 px square'
  },
  thumbnail: {
    label: 'Experience Thumbnail (1920×1080)',
    width: 1920,
    height: 1080,
    ratioLabel: '16:9 Widescreen',
    note: 'Ideally 1920×1080 px (up to 10 images/videos per experience)'
  }
};

export default function RobloxThumbnailResizer() {
  const [preset, setPreset] = useState<ResizerPreset>('icon');
  const [format, setFormat] = useState<ExportFormat>('png');
  const [experienceTitle, setExperienceTitle] = useState<string>('My Roblox Experience');
  const [uploadedImg, setUploadedImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [zoomPct, setZoomPct] = useState<number>(100);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; origX: number; origY: number }>({
    active: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0
  });

  const spec = RESIZER_SPECS[preset];

  const renderCanvas = useCallback(
    (targetCanvas: HTMLCanvasElement) => {
      const ctx = targetCanvas.getContext('2d');
      if (!ctx) return;
      targetCanvas.width = spec.width;
      targetCanvas.height = spec.height;

      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, spec.width, spec.height);

      if (uploadedImg) {
        const coverScale = Math.max(spec.width / uploadedImg.width, spec.height / uploadedImg.height);
        const drawW = uploadedImg.width * coverScale * (zoomPct / 100);
        const drawH = uploadedImg.height * coverScale * (zoomPct / 100);
        const drawX = (spec.width - drawW) / 2 + panX;
        const drawY = (spec.height - drawH) / 2 + panY;
        ctx.drawImage(uploadedImg, drawX, drawY, drawW, drawH);
      } else {
        // Placeholder visual guide before user uploads an image
        const grad = ctx.createLinearGradient(0, 0, spec.width, spec.height);
        grad.addColorStop(0, '#18181b');
        grad.addColorStop(1, '#27272a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, spec.width, spec.height);

        ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
        ctx.lineWidth = Math.max(2, spec.width / 256);
        ctx.strokeRect(16, 16, spec.width - 32, spec.height - 32);

        ctx.fillStyle = '#a1a1aa';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `bold ${Math.round(spec.width / 16)}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText(`${spec.width} × ${spec.height} px`, spec.width / 2, spec.height / 2 - spec.height * 0.04);
        ctx.fillStyle = '#71717a';
        ctx.font = `${Math.round(spec.width / 30)}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText('Upload an image to crop & export', spec.width / 2, spec.height / 2 + spec.height * 0.06);
      }
    },
    [spec.width, spec.height, uploadedImg, zoomPct, panX, panY]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderCanvas(canvas);
    try {
      setPreviewDataUrl(canvas.toDataURL('image/png'));
    } catch {
      setPreviewDataUrl('');
    }
  }, [renderCanvas]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setUploadedImg(img);
      setZoomPct(100);
      setPanX(0);
      setPanY(0);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleDownload = () => {
    const exportCanvas = document.createElement('canvas');
    renderCanvas(exportCanvas);
    const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const ext = format === 'jpeg' ? 'jpg' : 'png';
    const link = document.createElement('a');
    link.download = `roblox-${preset}-${spec.width}x${spec.height}.${ext}`;
    link.href = exportCanvas.toDataURL(mime, 0.94);
    link.click();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!uploadedImg) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: panX,
      origY: panY
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.active || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleFactor = spec.width / Math.max(1, rect.width);
    const dx = (e.clientX - dragRef.current.startX) * scaleFactor;
    const dy = (e.clientY - dragRef.current.startY) * scaleFactor;
    setPanX(Math.round(dragRef.current.origX + dx));
    setPanY(Math.round(dragRef.current.origY + dy));
  };

  const handlePointerUp = () => {
    dragRef.current.active = false;
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Preset & Upload Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setPreset('icon');
                setPanX(0);
                setPanY(0);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                preset === 'icon' ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Icon (512×512)
            </button>
            <button
              type="button"
              onClick={() => {
                setPreset('thumbnail');
                setPanX(0);
                setPanY(0);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                preset === 'thumbnail' ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Thumbnail (1920×1080)
            </button>
          </div>

          <label className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {fileName ? `Replace Image (${fileName})` : 'Upload Image'}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Live Crop Canvas */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                Output: <strong className="text-white">{spec.width} × {spec.height} px</strong> ({spec.ratioLabel})
              </span>
              {uploadedImg && (
                <span className="font-mono text-[11px] flex items-center gap-1">
                  <Move className="w-3 h-3" /> Drag preview to crop
                </span>
              )}
            </div>

            <div className="flex items-center justify-center bg-zinc-900/60 border border-zinc-800 rounded-lg p-2">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className={`rounded-md block touch-none ${
                  uploadedImg ? 'cursor-grab active:cursor-grabbing' : ''
                } ${preset === 'icon' ? 'w-full max-w-[340px] aspect-square' : 'w-full aspect-video'}`}
              />
            </div>

            {/* Mock Roblox Home Page Grid Preview */}
            <div className="pt-2 border-t border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
                  Roblox Home Page Grid Mock Preview
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {preset === 'icon' ? 'Home Discovery Tile' : 'Game Carousel / Detail View'}
                </span>
              </div>

              {preset === 'icon' ? (
                <div className="grid grid-cols-3 gap-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl p-3">
                  <div className="space-y-1.5">
                    <div className="aspect-square rounded-lg overflow-hidden border border-rose-500/60 bg-zinc-950">
                      {previewDataUrl && (
                        <img src={previewDataUrl} alt="Your Roblox icon preview" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <p className="text-[11px] font-bold text-white truncate">{experienceTitle || 'Your Experience'}</p>
                    <p className="text-[10px] text-zinc-400 font-mono">94% Rating · Active</p>
                  </div>
                  <div className="space-y-1.5 opacity-45">
                    <div className="aspect-square rounded-lg bg-zinc-800 border border-zinc-700" />
                    <div className="h-3 bg-zinc-800 rounded w-4/5" />
                    <div className="h-2.5 bg-zinc-800 rounded w-1/2" />
                  </div>
                  <div className="space-y-1.5 opacity-45">
                    <div className="aspect-square rounded-lg bg-zinc-800 border border-zinc-700" />
                    <div className="h-3 bg-zinc-800 rounded w-3/4" />
                    <div className="h-2.5 bg-zinc-800 rounded w-2/3" />
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 space-y-2">
                  <div className="aspect-video rounded-lg overflow-hidden border border-rose-500/60 bg-zinc-950">
                    {previewDataUrl && (
                      <img src={previewDataUrl} alt="Your Roblox 16:9 thumbnail preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white truncate">{experienceTitle || 'Your Experience'}</span>
                    <span className="text-[10px] font-mono text-zinc-400">16:9 Featured Slot (Max 10 media items)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Crop, Mock Label & Download Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Crop &amp; Position
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setZoomPct(100);
                    setPanX(0);
                    setPanY(0);
                  }}
                  className="text-[11px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Zoom</span>
                  <span className="font-mono text-white">{zoomPct}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={250}
                  value={zoomPct}
                  onChange={(e) => setZoomPct(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Pan Horizontal (X)</span>
                  <span className="font-mono text-white">{panX} px</span>
                </div>
                <input
                  type="range"
                  min={-600}
                  max={600}
                  value={panX}
                  onChange={(e) => setPanX(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Pan Vertical (Y)</span>
                  <span className="font-mono text-white">{panY} px</span>
                </div>
                <input
                  type="range"
                  min={-600}
                  max={600}
                  value={panY}
                  onChange={(e) => setPanY(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                <label htmlFor="rbx-mock-title" className="text-xs text-zinc-400 block">
                  Mock Grid Title Preview
                </label>
                <input
                  id="rbx-mock-title"
                  type="text"
                  maxLength={40}
                  value={experienceTitle}
                  onChange={(e) => setExperienceTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Format & Download */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Export File Format
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('png')}
                  className={`py-2 rounded-lg border text-xs font-bold cursor-pointer ${
                    format === 'png'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  PNG (.png)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('jpeg')}
                  className={`py-2 rounded-lg border text-xs font-bold cursor-pointer ${
                    format === 'jpeg'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  JPG (.jpg)
                </button>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="w-full py-3.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                Download {spec.width}×{spec.height} {format.toUpperCase()}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Creator Hub specs: Experience Icon = <strong>512×512 px</strong> (square, at least 512×512); Experience Thumbnail = <strong>16:9 (ideally 1920×1080 px)</strong>, up to <strong>10 images/videos</strong> per experience. Browser-only processing.
          </span>
        </div>
      </div>
    </div>
  );
}
