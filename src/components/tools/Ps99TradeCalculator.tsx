/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ArrowRightLeft, Sparkles, Search, Plus, Trash2, Trophy, 
  AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Minus,
  Download, Copy, Check, RotateCcw, ShieldCheck, Flame, Info,
  Diamond, ExternalLink, BookmarkCheck, History
} from 'lucide-react';
import { 
  PS99_ITEMS_DATABASE, PS99Item, PS99Category, PS99Variant,
  TradeOfferItem, VARIANT_MULTIPLIERS, formatGems, calculateTradeItem
} from '../../data/ps99Data';

export default function Ps99TradeCalculator() {
  // Trade Offers state
  const [yourOffer, setYourOffer] = useState<TradeOfferItem[]>([
    { uid: 'yo-1', itemId: 'huge-happy-rock', variant: 'regular', quantity: 2 },
    { uid: 'yo-2', itemId: 'chest-mimic-book', variant: 'regular', quantity: 1 }
  ]);
  const [yourGems, setYourGems] = useState<number>(50000000); // 50M

  const [theirOffer, setTheirOffer] = useState<TradeOfferItem[]>([
    { uid: 'to-1', itemId: 'huge-cat', variant: 'regular', quantity: 1 }
  ]);
  const [theirGems, setTheirGems] = useState<number>(0);

  // Search Modal state
  const [searchTargetSide, setSearchTargetSide] = useState<'you' | 'them' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PS99Category | 'all'>('all');

  // UI state
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'you' | 'verdict' | 'them'>('verdict');
  const [savedTrades, setSavedTrades] = useState<Array<{ id: string; name: string; date: string; verdict: string; yourVal: number; theirVal: number }>>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load trade history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ps99_saved_trades');
      if (stored) {
        setSavedTrades(JSON.parse(stored));
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  // Filter items in modal
  const filteredCatalog = useMemo(() => {
    return PS99_ITEMS_DATABASE.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = !searchQuery.trim() || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rarity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  // Add Item to Offer
  const addItemToOffer = (item: PS99Item) => {
    if (!searchTargetSide) return;
    const newEntry: TradeOfferItem = {
      uid: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      itemId: item.id,
      variant: 'regular',
      quantity: 1
    };
    if (searchTargetSide === 'you') {
      setYourOffer(prev => [...prev, newEntry]);
    } else {
      setTheirOffer(prev => [...prev, newEntry]);
    }
    setSearchTargetSide(null);
    setSearchQuery('');
  };

  // Remove Item
  const removeItem = (side: 'you' | 'them', uid: string) => {
    if (side === 'you') {
      setYourOffer(prev => prev.filter(i => i.uid !== uid));
    } else {
      setTheirOffer(prev => prev.filter(i => i.uid !== uid));
    }
  };

  // Update item variant
  const updateVariant = (side: 'you' | 'them', uid: string, variant: PS99Variant) => {
    const updater = (list: TradeOfferItem[]) =>
      list.map(i => i.uid === uid ? { ...i, variant } : i);
    if (side === 'you') setYourOffer(updater);
    else setTheirOffer(updater);
  };

  // Update item quantity
  const updateQuantity = (side: 'you' | 'them', uid: string, delta: number) => {
    const updater = (list: TradeOfferItem[]) =>
      list.map(i => {
        if (i.uid === uid) {
          const next = Math.max(1, i.quantity + delta);
          return { ...i, quantity: next };
        }
        return i;
      });
    if (side === 'you') setYourOffer(updater);
    else setTheirOffer(updater);
  };

  // Calculations
  const tradeStats = useMemo(() => {
    // You
    let yourItemsValue = 0;
    let yourItemsRap = 0;
    let yourDemandSum = 0;
    let yourItemCount = 0;
    interface EvaluatedTradeItem {
      entry: TradeOfferItem;
      item: PS99Item;
      calc: ReturnType<typeof calculateTradeItem>;
    }

    const yourManipulated: string[] = [];
    const yourEvaluated: EvaluatedTradeItem[] = [];
    for (const entry of yourOffer) {
      const item = PS99_ITEMS_DATABASE.find(db => db.id === entry.itemId);
      if (!item) continue;
      const calc = calculateTradeItem(item, entry.variant, entry.quantity);
      yourItemsValue += calc.totalValue;
      yourItemsRap += calc.totalRap;
      yourDemandSum += item.demand * entry.quantity;
      yourItemCount += entry.quantity;
      if (item.trend === 'manipulated') {
        yourManipulated.push(item.name);
      }
      yourEvaluated.push({ entry, item, calc });
    }

    // Them
    let theirItemsValue = 0;
    let theirItemsRap = 0;
    let theirDemandSum = 0;
    let theirItemCount = 0;
    const theirManipulated: string[] = [];

    const theirEvaluated: EvaluatedTradeItem[] = [];
    for (const entry of theirOffer) {
      const item = PS99_ITEMS_DATABASE.find(db => db.id === entry.itemId);
      if (!item) continue;
      const calc = calculateTradeItem(item, entry.variant, entry.quantity);
      theirItemsValue += calc.totalValue;
      theirItemsRap += calc.totalRap;
      theirDemandSum += item.demand * entry.quantity;
      theirItemCount += entry.quantity;
      if (item.trend === 'manipulated') {
        theirManipulated.push(item.name);
      }
      theirEvaluated.push({ entry, item, calc });
    }

    const yourTotalValue = yourItemsValue + yourGems;
    const yourTotalRap = yourItemsRap + yourGems;
    const theirTotalValue = theirItemsValue + theirGems;
    const theirTotalRap = theirItemsRap + theirGems;

    const valueDiff = theirTotalValue - yourTotalValue;
    const rapDiff = theirTotalRap - yourTotalRap;

    // Percentage calculation: comparison relative to Your Offer
    let percentDiff = 0;
    if (yourTotalValue > 0) {
      percentDiff = ((theirTotalValue - yourTotalValue) / yourTotalValue) * 100;
    } else if (theirTotalValue > 0) {
      percentDiff = 100;
    }

    // WFL Outcome logic:
    // WIN if user gets +10% value or more
    // FAIR if between -10% and +10%
    // LOSE if user loses value (less than -10%)
    let outcome: 'WIN' | 'FAIR' | 'LOSE' = 'FAIR';
    let outcomeBadge = 'FAIR';
    let outcomeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-500/20';
    let verdictTitle = 'Fair Trade (Balanced)';
    let verdictDesc = 'Both sides are within the ±10% fair market equilibrium range.';

    if (yourTotalValue === 0 && theirTotalValue === 0) {
      outcome = 'FAIR';
      outcomeBadge = 'EMPTY';
      outcomeColor = 'bg-zinc-800 text-zinc-400 border-zinc-700 shadow-none';
      verdictTitle = 'Waiting for Items';
      verdictDesc = 'Add items or gems to both sides to calculate WFL.';
    } else if (percentDiff >= 25) {
      outcome = 'WIN';
      outcomeBadge = 'BIG WIN';
      outcomeColor = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 shadow-emerald-500/30';
      verdictTitle = 'Massive Win (W++ / Overpay)';
      verdictDesc = `You are gaining +${formatGems(valueDiff)} Diamonds (+${percentDiff.toFixed(1)}%) in real value! Strongly recommended.`;
    } else if (percentDiff >= 10) {
      outcome = 'WIN';
      outcomeBadge = 'WIN';
      outcomeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60 shadow-emerald-500/20';
      verdictTitle = 'Profitable Win (W)';
      verdictDesc = `You are gaining +${formatGems(valueDiff)} Diamonds (+${percentDiff.toFixed(1)}%) favorable surplus.`;
    } else if (percentDiff <= -25) {
      outcome = 'LOSE';
      outcomeBadge = 'BIG LOSE';
      outcomeColor = 'bg-rose-500/25 text-rose-300 border-rose-400 shadow-rose-500/30';
      verdictTitle = 'Massive Loss (L-- / Big Overpay)';
      verdictDesc = `You are losing ${formatGems(Math.abs(valueDiff))} Diamonds (${percentDiff.toFixed(1)}%). Walk away immediately!`;
    } else if (percentDiff <= -10) {
      outcome = 'LOSE';
      outcomeBadge = 'LOSE';
      outcomeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/60 shadow-rose-500/20';
      verdictTitle = 'Unfavorable Loss (L)';
      verdictDesc = `You are under-receiving by ${formatGems(Math.abs(valueDiff))} Diamonds (${percentDiff.toFixed(1)}%). Ask them to add gems or an exclusive.`;
    }

    const yourAvgDemand = yourItemCount > 0 ? (yourDemandSum / yourItemCount).toFixed(1) : '10.0';
    const theirAvgDemand = theirItemCount > 0 ? (theirDemandSum / theirItemCount).toFixed(1) : '10.0';

    return {
      yourEvaluated,
      theirEvaluated,
      yourTotalValue,
      yourTotalRap,
      theirTotalValue,
      theirTotalRap,
      valueDiff,
      rapDiff,
      percentDiff,
      outcome,
      outcomeBadge,
      outcomeColor,
      verdictTitle,
      verdictDesc,
      yourAvgDemand,
      theirAvgDemand,
      yourManipulated,
      theirManipulated
    };
  }, [yourOffer, yourGems, theirOffer, theirGems]);

  // Swap Offers
  const handleSwapOffers = () => {
    const tempOffer = [...yourOffer];
    const tempGems = yourGems;
    setYourOffer(theirOffer);
    setYourGems(theirGems);
    setTheirOffer(tempOffer);
    setTheirGems(tempGems);
  };

  // Clear Offers
  const handleClearAll = () => {
    setYourOffer([]);
    setYourGems(0);
    setTheirOffer([]);
    setTheirGems(0);
  };

  // Quick Presets
  const loadPreset = (type: 'huge-cat' | 'titanic-trade' | 'rap-scam' | 'balanced') => {
    if (type === 'huge-cat') {
      setYourOffer([
        { uid: 'p-1', itemId: 'huge-happy-rock', variant: 'regular', quantity: 15 },
        { uid: 'p-2', itemId: 'super-magnet-book', variant: 'regular', quantity: 1 }
      ]);
      setYourGems(150000000);
      setTheirOffer([
        { uid: 'p-3', itemId: 'huge-cat', variant: 'regular', quantity: 1 }
      ]);
      setTheirGems(0);
    } else if (type === 'titanic-trade') {
      setYourOffer([
        { uid: 'p-4', itemId: 'titanic-hubert', variant: 'regular', quantity: 1 }
      ]);
      setYourGems(2000000000);
      setTheirOffer([
        { uid: 'p-5', itemId: 'titanic-dominus-astra', variant: 'regular', quantity: 1 }
      ]);
      setTheirGems(0);
    } else if (type === 'rap-scam') {
      // Demonstrates RAP manipulation trap: item looks high RAP (195M) but real value is 70M
      setYourOffer([
        { uid: 'p-6', itemId: 'huge-poseidon-corgi', variant: 'regular', quantity: 1 }
      ]);
      setYourGems(0);
      setTheirOffer([
        { uid: 'p-7', itemId: 'huge-scam-rock', variant: 'regular', quantity: 1 }
      ]);
      setTheirGems(0);
    } else if (type === 'balanced') {
      setYourOffer([
        { uid: 'p-8', itemId: 'huge-peacock', variant: 'regular', quantity: 1 },
        { uid: 'p-9', itemId: 'pop-cat', variant: 'regular', quantity: 2 }
      ]);
      setYourGems(20000000);
      setTheirOffer([
        { uid: 'p-10', itemId: 'huge-balloon-dragon', variant: 'regular', quantity: 1 }
      ]);
      setTheirGems(0);
    }
  };

  // Save Trade to History
  const handleSaveTrade = () => {
    const newEntry = {
      id: Date.now().toString(),
      name: `Trade ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      date: new Date().toLocaleDateString(),
      verdict: tradeStats.outcomeBadge,
      yourVal: tradeStats.yourTotalValue,
      theirVal: tradeStats.theirTotalValue
    };
    const updated = [newEntry, ...savedTrades].slice(0, 10);
    setSavedTrades(updated);
    try {
      localStorage.setItem('ps99_saved_trades', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Copy Summary text
  const handleCopySummary = () => {
    const text = `🐾 Pet Simulator 99 Trade WFL Breakdown:
Outcome: [${tradeStats.outcomeBadge}] - ${tradeStats.verdictTitle}
Your Value: ${formatGems(tradeStats.yourTotalValue)} (RAP: ${formatGems(tradeStats.yourTotalRap)})
Their Value: ${formatGems(tradeStats.theirTotalValue)} (RAP: ${formatGems(tradeStats.theirTotalRap)})
Net Difference: ${tradeStats.valueDiff >= 0 ? '+' : ''}${formatGems(tradeStats.valueDiff)} (${tradeStats.percentDiff.toFixed(1)}%)
Calculated on PS99 Trade Value & WFL Calculator (2026 Verified Market)`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Export Trade Image
  const handleExportPng = () => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Background Gradient (Pet Sim vibrant game theme)
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 700);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(0.5, '#121829');
    bgGrad.addColorStop(1, '#080a12');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 700);

    // Decorative glow rings
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, 1140, 640);

    // Header Title
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('PET SIMULATOR 99 — TRADE WFL CALCULATOR', 60, 90);

    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Verified 2026 Market Values & RAP Analysis • Auto Win/Fair/Lose System', 60, 120);

    // Big Outcome Badge in Center
    ctx.fillStyle = tradeStats.outcome === 'WIN' ? '#10b981' : tradeStats.outcome === 'LOSE' ? '#f43f5e' : '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(475, 150, 250, 60, 12);
    ctx.fill();

    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(tradeStats.outcomeBadge, 600, 192);

    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`${tradeStats.percentDiff >= 0 ? '+' : ''}${tradeStats.percentDiff.toFixed(1)}% Value (${formatGems(tradeStats.valueDiff)} Gems)`, 600, 235);
    ctx.textAlign = 'left';

    // Left Box: YOUR OFFER
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(60, 260, 510, 360, 16);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('YOUR OFFER', 90, 305);

    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(`Value: ${formatGems(tradeStats.yourTotalValue)} Gems`, 90, 345);
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`RAP: ${formatGems(tradeStats.yourTotalRap)} • Added Gems: ${formatGems(yourGems)}`, 90, 375);

    // List top 4 items
    let yPos = 415;
    tradeStats.yourEvaluated.slice(0, 4).forEach(({ item, entry, calc }) => {
      ctx.font = '15px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(`${entry.quantity}x ${item.name} (${entry.variant})`, 90, yPos);
      ctx.textAlign = 'right';
      ctx.fillText(`${formatGems(calc.totalValue)}`, 540, yPos);
      ctx.textAlign = 'left';
      yPos += 30;
    });

    // Right Box: THEIR OFFER
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(630, 260, 510, 360, 16);
    ctx.fill();
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#c084fc';
    ctx.fillText('THEIR OFFER', 660, 305);

    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(`Value: ${formatGems(tradeStats.theirTotalValue)} Gems`, 660, 345);
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`RAP: ${formatGems(tradeStats.theirTotalRap)} • Added Gems: ${formatGems(theirGems)}`, 660, 375);

    // List top 4 items
    yPos = 415;
    tradeStats.theirEvaluated.slice(0, 4).forEach(({ item, entry, calc }) => {
      ctx.font = '15px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(`${entry.quantity}x ${item.name} (${entry.variant})`, 660, yPos);
      ctx.textAlign = 'right';
      ctx.fillText(`${formatGems(calc.totalValue)}`, 1110, yPos);
      ctx.textAlign = 'left';
      yPos += 30;
    });

    // Download trigger
    const link = document.createElement('a');
    link.download = `ps99-trade-wfl-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsExporting(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Hero / Banner Card */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/70 p-5 sm:p-6 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ROBLOX PET SIMULATOR 99</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-mono">2026 ACTIVE MARKET VERIFIED</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              PS99 Trade Value & WFL Calculator
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Compare <strong className="text-sky-300">Your Offer</strong> vs <strong className="text-purple-300">Their Offer</strong> with instant RAP vs true trading value check, automated <strong className="text-emerald-300">WIN / FAIR / LOSE</strong> badges, and scam manipulation alerts.
            </p>
          </div>

          {/* Quick Action Presets */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => loadPreset('huge-cat')}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-all"
            >
              Preset: Huge Cat Swap
            </button>
            <button
              onClick={() => loadPreset('titanic-trade')}
              className="px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-600/40 rounded-lg transition-all"
            >
              Preset: Titanic Flex
            </button>
            <button
              onClick={() => loadPreset('rap-scam')}
              className="px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-600/40 rounded-lg transition-all"
            >
              Preset: RAP Scam Trap
            </button>
          </div>
        </div>

        {/* Dynamic Outcome Hero Meter */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Outcome Badge Box */}
            <div className="md:col-span-5 flex items-center gap-4">
              <div className={`px-5 py-3 rounded-xl border text-center shrink-0 shadow-lg ${tradeStats.outcomeColor}`}>
                <div className="text-2xl sm:text-3xl font-black tracking-wider uppercase">
                  {tradeStats.outcomeBadge}
                </div>
                <div className="text-[11px] font-bold tracking-tight opacity-90 mt-0.5">
                  {tradeStats.percentDiff > 0 ? `+${tradeStats.percentDiff.toFixed(1)}%` : `${tradeStats.percentDiff.toFixed(1)}%`} Value
                </div>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{tradeStats.verdictTitle}</span>
                  {tradeStats.outcome === 'WIN' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {tradeStats.outcome === 'LOSE' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {tradeStats.verdictDesc}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Net Value Delta</span>
                <span className={`text-sm font-bold font-mono ${tradeStats.valueDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tradeStats.valueDiff >= 0 ? '+' : ''}{formatGems(tradeStats.valueDiff)}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Net RAP Delta</span>
                <span className={`text-sm font-bold font-mono ${tradeStats.rapDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tradeStats.rapDiff >= 0 ? '+' : ''}{formatGems(tradeStats.rapDiff)}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Avg Demand</span>
                <span className="text-sm font-bold text-slate-200">
                  {tradeStats.yourAvgDemand} vs {tradeStats.theirAvgDemand}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Actions</span>
                  <span className="text-xs text-slate-300">Tool Utility</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleSwapOffers}
                    title="Swap Sides"
                    className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-md transition-colors"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClearAll}
                    title="Clear All"
                    className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-md transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RAP Scam warning banner if manipulated items are present */}
          {tradeStats.theirManipulated.length > 0 && (
            <div className="mt-3.5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-200">
                <strong className="font-bold text-rose-300">⚠️ RAP Manipulation Warning: </strong>
                Their offer contains <strong className="underline">{tradeStats.theirManipulated.join(', ')}</strong> which has artificially inflated RAP from trading kiosk manipulation! Value is significantly lower than RAP indicates. Do not trade solely based on RAP!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Two-Column Trading Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Center Floating VS Badge (Desktop) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-indigo-500/50 shadow-xl flex items-center justify-center text-indigo-400 font-extrabold text-xs tracking-wider">
            VS
          </div>
        </div>

        {/* LEFT COLUMN: YOUR OFFER */}
        <div className="flex flex-col rounded-2xl border border-sky-500/30 bg-slate-900/80 overflow-hidden shadow-xl">
          {/* Column Header */}
          <div className="p-4 bg-sky-950/40 border-b border-sky-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>YOUR OFFER</span>
                  <span className="text-xs font-normal text-sky-300 font-mono">({tradeStats.yourEvaluated.length} Items)</span>
                </h3>
                <span className="text-xs text-sky-400/80">Items & Gems you are giving away</span>
              </div>
            </div>

            <button
              onClick={() => { setSearchTargetSide('you'); setSearchQuery(''); }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-md hover:shadow-sky-500/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>

          {/* Gems Bar for You */}
          <div className="p-3 bg-slate-950/50 border-b border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 shrink-0">
              <Diamond className="w-4 h-4 text-cyan-400" />
              <span>Your Gems:</span>
            </div>
            <div className="flex items-center gap-2 w-full max-w-xs">
              <input
                type="number"
                min="0"
                step="1000000"
                value={yourGems}
                onChange={(e) => setYourGems(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-1 text-sm font-mono text-cyan-300 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-right"
              />
              <span className="text-xs text-slate-400 shrink-0 font-mono">({formatGems(yourGems)})</span>
            </div>
          </div>
          {/* Quick Gem increments */}
          <div className="px-3 py-1.5 bg-slate-950/30 border-b border-slate-800/50 flex flex-wrap gap-1.5 text-[11px]">
            <span className="text-slate-500 self-center mr-1">Quick:</span>
            {[1000000, 10000000, 50000000, 100000000, 500000000].map(amt => (
              <button
                key={amt}
                onClick={() => setYourGems(prev => prev + amt)}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-mono transition-colors"
              >
                +{formatGems(amt)}
              </button>
            ))}
            <button
              onClick={() => setYourGems(0)}
              className="px-2 py-0.5 bg-slate-800/60 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 rounded text-[11px] transition-colors ml-auto"
            >
              Reset 0
            </button>
          </div>

          {/* Items List */}
          <div className="p-4 space-y-3 flex-1 min-h-[300px] overflow-y-auto max-h-[500px]">
            {tradeStats.yourEvaluated.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-800 rounded-xl text-slate-500">
                <Sparkles className="w-8 h-8 mb-2 text-slate-600" />
                <p className="text-sm font-medium text-slate-400">Your trade slot is empty</p>
                <p className="text-xs text-slate-600 mt-0.5">Click "+ Add Item" above to choose Huge pets, Titanics, Enchants, or Items.</p>
              </div>
            ) : (
              tradeStats.yourEvaluated.map(({ item, entry, calc }) => (
                <div 
                  key={entry.uid}
                  className={`p-3 rounded-xl border bg-gradient-to-r ${item.bgGradient} ${item.borderColor} shadow-md transition-all hover:border-sky-400`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/10">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-bold text-white">{item.name}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-black/50 text-slate-300 border border-slate-700">
                            {item.rarity}
                          </span>
                          {item.trend === 'manipulated' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-600">
                              MANIPULATED
                            </span>
                          )}
                        </div>

                        {/* Financials */}
                        <div className="flex items-center gap-3 text-xs mt-1">
                          <span className="text-sky-300 font-mono font-semibold">
                            Val: {formatGems(calc.totalValue)}
                          </span>
                          <span className="text-slate-400 font-mono">
                            RAP: {formatGems(calc.totalRap)}
                          </span>
                          <span className="text-amber-400 text-[11px]">
                            ★ {item.demand}/10
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem('you', entry.uid)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity & Variant Controls */}
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    {/* Variant Selector */}
                    {item.canHaveVariants ? (
                      <div className="flex items-center gap-1">
                        {(['regular', 'golden', 'rainbow', 'shiny', 'shiny_rainbow'] as PS99Variant[]).map((v) => (
                          <button
                            key={v}
                            onClick={() => updateVariant('you', entry.uid, v)}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                              entry.variant === v 
                                ? 'bg-sky-500 text-white shadow-sm' 
                                : 'bg-black/40 text-slate-400 hover:text-white'
                            }`}
                          >
                            {v === 'regular' ? 'Reg' : v === 'golden' ? 'Gold' : v === 'rainbow' ? 'Rb' : v === 'shiny' ? 'Shiny' : 'Sh.Rb'}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">Fixed Variant</span>
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-lg border border-slate-700">
                      <span className="text-[11px] text-slate-400 mr-1">Qty:</span>
                      <button
                        onClick={() => updateQuantity('you', entry.uid, -1)}
                        className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-1">
                        {entry.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity('you', entry.uid, 1)}
                        className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Column Summary Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">YOUR TOTAL GEMS VALUE</span>
              <span className="text-xl font-black font-mono text-sky-400">
                {formatGems(tradeStats.yourTotalValue)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">TOTAL RAP</span>
              <span className="text-base font-bold font-mono text-slate-300">
                {formatGems(tradeStats.yourTotalRap)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THEIR OFFER */}
        <div className="flex flex-col rounded-2xl border border-purple-500/30 bg-slate-900/80 overflow-hidden shadow-xl">
          {/* Column Header */}
          <div className="p-4 bg-purple-950/40 border-b border-purple-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>THEIR OFFER</span>
                  <span className="text-xs font-normal text-purple-300 font-mono">({tradeStats.theirEvaluated.length} Items)</span>
                </h3>
                <span className="text-xs text-purple-400/80">Items & Gems they are offering you</span>
              </div>
            </div>

            <button
              onClick={() => { setSearchTargetSide('them'); setSearchQuery(''); }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md hover:shadow-purple-500/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>

          {/* Gems Bar for Them */}
          <div className="p-3 bg-slate-950/50 border-b border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 shrink-0">
              <Diamond className="w-4 h-4 text-fuchsia-400" />
              <span>Their Gems:</span>
            </div>
            <div className="flex items-center gap-2 w-full max-w-xs">
              <input
                type="number"
                min="0"
                step="1000000"
                value={theirGems}
                onChange={(e) => setTheirGems(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-1 text-sm font-mono text-fuchsia-300 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-fuchsia-400 text-right"
              />
              <span className="text-xs text-slate-400 shrink-0 font-mono">({formatGems(theirGems)})</span>
            </div>
          </div>
          {/* Quick Gem increments */}
          <div className="px-3 py-1.5 bg-slate-950/30 border-b border-slate-800/50 flex flex-wrap gap-1.5 text-[11px]">
            <span className="text-slate-500 self-center mr-1">Quick:</span>
            {[1000000, 10000000, 50000000, 100000000, 500000000].map(amt => (
              <button
                key={amt}
                onClick={() => setTheirGems(prev => prev + amt)}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-mono transition-colors"
              >
                +{formatGems(amt)}
              </button>
            ))}
            <button
              onClick={() => setTheirGems(0)}
              className="px-2 py-0.5 bg-slate-800/60 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 rounded text-[11px] transition-colors ml-auto"
            >
              Reset 0
            </button>
          </div>

          {/* Items List */}
          <div className="p-4 space-y-3 flex-1 min-h-[300px] overflow-y-auto max-h-[500px]">
            {tradeStats.theirEvaluated.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-800 rounded-xl text-slate-500">
                <Sparkles className="w-8 h-8 mb-2 text-slate-600" />
                <p className="text-sm font-medium text-slate-400">Their trade slot is empty</p>
                <p className="text-xs text-slate-600 mt-0.5">Click "+ Add Item" above to choose Huge pets, Titanics, Enchants, or Items.</p>
              </div>
            ) : (
              tradeStats.theirEvaluated.map(({ item, entry, calc }) => (
                <div 
                  key={entry.uid}
                  className={`p-3 rounded-xl border bg-gradient-to-r ${item.bgGradient} ${item.borderColor} shadow-md transition-all hover:border-purple-400`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/10">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-bold text-white">{item.name}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-black/50 text-slate-300 border border-slate-700">
                            {item.rarity}
                          </span>
                          {item.trend === 'manipulated' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-600 animate-pulse">
                              MANIPULATED
                            </span>
                          )}
                        </div>

                        {/* Financials */}
                        <div className="flex items-center gap-3 text-xs mt-1">
                          <span className="text-purple-300 font-mono font-semibold">
                            Val: {formatGems(calc.totalValue)}
                          </span>
                          <span className="text-slate-400 font-mono">
                            RAP: {formatGems(calc.totalRap)}
                          </span>
                          <span className="text-amber-400 text-[11px]">
                            ★ {item.demand}/10
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem('them', entry.uid)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity & Variant Controls */}
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    {/* Variant Selector */}
                    {item.canHaveVariants ? (
                      <div className="flex items-center gap-1">
                        {(['regular', 'golden', 'rainbow', 'shiny', 'shiny_rainbow'] as PS99Variant[]).map((v) => (
                          <button
                            key={v}
                            onClick={() => updateVariant('them', entry.uid, v)}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                              entry.variant === v 
                                ? 'bg-purple-500 text-white shadow-sm' 
                                : 'bg-black/40 text-slate-400 hover:text-white'
                            }`}
                          >
                            {v === 'regular' ? 'Reg' : v === 'golden' ? 'Gold' : v === 'rainbow' ? 'Rb' : v === 'shiny' ? 'Shiny' : 'Sh.Rb'}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">Fixed Variant</span>
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-lg border border-slate-700">
                      <span className="text-[11px] text-slate-400 mr-1">Qty:</span>
                      <button
                        onClick={() => updateQuantity('them', entry.uid, -1)}
                        className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-1">
                        {entry.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity('them', entry.uid, 1)}
                        className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Column Summary Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">THEIR TOTAL GEMS VALUE</span>
              <span className="text-xl font-black font-mono text-purple-400">
                {formatGems(tradeStats.theirTotalValue)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">TOTAL RAP</span>
              <span className="text-base font-bold font-mono text-slate-300">
                {formatGems(tradeStats.theirTotalRap)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Analytics & Export Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-800 text-sky-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Save or Export Trade Proof</h4>
            <p className="text-xs text-slate-400">Download high-res PNG trading card or copy WFL breakdown for Discord trading servers.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSummary ? 'Copied WFL!' : 'Copy Summary'}</span>
          </button>
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 rounded-lg shadow-md transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating...' : 'Export PNG Card'}</span>
          </button>
          <button
            onClick={handleSaveTrade}
            className="px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-600/40 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Save to History</span>
          </button>
        </div>
      </div>

      {/* Saved Trades History Drawer */}
      {savedTrades.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <History className="w-4 h-4 text-slate-500" />
              <span>SAVED TRADE HISTORY ({savedTrades.length})</span>
            </span>
            <button
              onClick={() => { setSavedTrades([]); localStorage.removeItem('ps99_saved_trades'); }}
              className="text-[11px] text-rose-400 hover:underline"
            >
              Clear History
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {savedTrades.map((t) => (
              <div key={t.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-200">{t.name}</span>
                  <span className="text-[10px] text-slate-500 block">{t.date}</span>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    t.verdict.includes('WIN') ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' :
                    t.verdict.includes('LOSE') ? 'bg-rose-950 text-rose-400 border border-rose-700' :
                    'bg-amber-950 text-amber-400 border border-amber-700'
                  }`}>
                    {t.verdict}
                  </span>
                  <span className="text-[11px] text-slate-400 block font-mono mt-0.5">
                    {formatGems(t.yourVal)} vs {formatGems(t.theirVal)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH & SELECT MODAL */}
      {searchTargetSide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Add Item to {searchTargetSide === 'you' ? 'Your Offer' : 'Their Offer'}</span>
                </h3>
                <span className="text-xs text-slate-400">Search from verified 2026 Pet Simulator 99 items</span>
              </div>
              <button
                onClick={() => setSearchTargetSide(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Huge, Titanic, Enchant, Book, Keys, Booth..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'titanic', label: '👑 Titanics' },
                  { id: 'huge', label: '🐱 Huges' },
                  { id: 'exclusive', label: '✨ Exclusives' },
                  { id: 'enchant', label: '📖 Enchants' },
                  { id: 'item', label: '🗝️ Keys & Items' },
                  { id: 'hoverboard', label: '🛹 Hoverboards' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id as any)}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      selectedCategory === tab.id
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2">
              {filteredCatalog.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <p className="text-sm">No Pet Simulator 99 items found for "{searchQuery}"</p>
                </div>
              ) : (
                filteredCatalog.map(item => (
                  <div
                    key={item.id}
                    onClick={() => addItemToOffer(item)}
                    className={`p-3 rounded-xl border bg-gradient-to-r ${item.bgGradient} ${item.borderColor} hover:scale-[1.01] cursor-pointer transition-all flex items-center justify-between gap-3 group`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/10 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/50 text-slate-300 border border-slate-700">
                            {item.rarity}
                          </span>
                          {item.trend === 'manipulated' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-600">
                              RAP MANIPULATED
                            </span>
                          )}
                        </div>
                        {item.notes && (
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{item.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-bold text-sky-400 block">
                        {formatGems(item.value)}
                      </span>
                      <span className="text-xs font-mono text-slate-400 block">
                        RAP: {formatGems(item.rap)}
                      </span>
                      <span className="text-[10px] text-amber-400">
                        Demand: {item.demand}/10
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
              Showing {filteredCatalog.length} verified trading items • Click any item to add to offer
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
