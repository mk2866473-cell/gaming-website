/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Percent, DollarSign, Clock, Store, Info } from 'lucide-react';

export type UgcSaleLocation = 'marketplace' | 'other-experience' | 'own-experience';

export const UGC_DEVEX_RATE_USD = 0.0035;
export const UGC_DEVEX_MIN_ROBUX = 30000;
export const UGC_ESCROW_DAYS = 30;

export function calculateUgcRoyalty(
  itemPrice: number,
  salesQuantity: number,
  location: UgcSaleLocation
) {
  const safePrice = Math.max(0, Math.floor(Number.isFinite(itemPrice) ? itemPrice : 0));
  const safeQty = Math.max(1, Math.floor(Number.isFinite(salesQuantity) ? salesQuantity : 1));

  const creatorRatePct = location === 'own-experience' ? 70 : 30;
  const experienceOwnerRatePct = location === 'other-experience' ? 40 : 0;
  const robloxSharePct = location === 'marketplace' ? 70 : 30;

  const creatorPerSale = Math.floor((safePrice * creatorRatePct) / 100);
  const creatorTotal = creatorPerSale * safeQty;
  const grossTotal = safePrice * safeQty;
  const experienceOwnerTotal = Math.floor((safePrice * experienceOwnerRatePct) / 100) * safeQty;
  const robloxShareTotal = grossTotal - creatorTotal - experienceOwnerTotal;
  const devexUsdEstimate = creatorTotal * UGC_DEVEX_RATE_USD;

  return {
    itemPrice: safePrice,
    salesQuantity: safeQty,
    location,
    creatorRatePct,
    experienceOwnerRatePct,
    robloxSharePct,
    creatorPerSale,
    creatorTotal,
    grossTotal,
    experienceOwnerTotal,
    robloxShareTotal,
    devexUsdEstimate
  };
}

export default function RobloxUgcCalculator() {
  const [itemPrice, setItemPrice] = useState<number>(100);
  const [salesQuantity, setSalesQuantity] = useState<number>(1);
  const [location, setLocation] = useState<UgcSaleLocation>('marketplace');

  const result = useMemo(
    () => calculateUgcRoyalty(itemPrice, salesQuantity, location),
    [itemPrice, salesQuantity, location]
  );

  const locationOptions: { id: UgcSaleLocation; title: string; subtitle: string }[] = [
    {
      id: 'marketplace',
      title: 'Marketplace (Avatar Shop)',
      subtitle: 'Base 30% to item creator (70% Marketplace share at price floor)'
    },
    {
      id: 'other-experience',
      title: "In Someone Else's Experience",
      subtitle: '30% to item creator + 40% to experience owner (30% Roblox)'
    },
    {
      id: 'own-experience',
      title: 'In My Own Experience',
      subtitle: '30% creator + 40% experience owner = 70% combined (30% Roblox)'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Sale Location Selector */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Store className="w-4 h-4" />
            Select Where the UGC Item Is Sold
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {locationOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLocation(opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                  location === opt.id
                    ? 'bg-rose-500/20 border-rose-500/70 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <span className="text-xs font-bold block">{opt.title}</span>
                <span className="text-[11px] text-zinc-400 leading-snug block">{opt.subtitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <label htmlFor="ugc-price-input" className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Item Price (Robux)
            </label>
            <input
              id="ugc-price-input"
              type="number"
              min={0}
              value={itemPrice}
              onChange={(e) => setItemPrice(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-emerald-500"
            />
            <div className="flex flex-wrap gap-1.5">
              {[50, 75, 100, 250, 500].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setItemPrice(preset)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                >
                  {preset} R$
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <label htmlFor="ugc-sales-input" className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              Sales Quantity
            </label>
            <input
              id="ugc-sales-input"
              type="number"
              min={1}
              value={salesQuantity}
              onChange={(e) => setSalesQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-cyan-500"
            />
            <div className="flex flex-wrap gap-1.5">
              {[1, 10, 100, 500, 1000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSalesQuantity(preset)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                >
                  {preset.toLocaleString()} {preset === 1 ? 'sale' : 'sales'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">
              Creator Earnings Per Sale ({result.creatorRatePct}%)
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-400 my-1 block">
              {result.creatorPerSale.toLocaleString()} R$
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              From {result.itemPrice.toLocaleString()} R$ item price
            </span>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">
              Total Creator Earnings ({result.salesQuantity.toLocaleString()} {result.salesQuantity === 1 ? 'Sale' : 'Sales'})
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-cyan-400 my-1 block">
              {result.creatorTotal.toLocaleString()} R$
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Gross revenue: {result.grossTotal.toLocaleString()} R$
            </span>
          </div>

          <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-400 block">
              DevEx USD Estimate ($0.0035 / R$)
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-400 my-1 block">
              ~${result.devexUsdEstimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Estimate only (30,000 R$ min &amp; DevEx eligibility)
            </span>
          </div>
        </div>

        {/* Marketplace Fee & Escrow Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Percent className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">Marketplace Base vs Progressive Floor Share</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                This calculator uses the <strong>base 30% creator rate</strong> at the price floor in the Marketplace (and <strong>70%</strong> when sold in your own experience). Note: above the price floor in the Marketplace, the Marketplace share rises progressively up to <strong>70% at 6× the floor</strong>.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">30-Day Escrow Hold &amp; DevEx Eligibility</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                UGC commissions carry a <strong>30-day escrow hold</strong> before payout. USD values shown above are <strong>estimates</strong> at $0.0035/Robux — cashing out requires DevEx eligibility and at least <strong>30,000 Robux</strong>.
              </p>
            </div>
          </div>
        </div>

        {location === 'other-experience' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs text-zinc-300">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              In-Experience Split Breakdown: <strong>{result.creatorTotal.toLocaleString()} R$ (30%)</strong> to item creator, <strong>{result.experienceOwnerTotal.toLocaleString()} R$ (40%)</strong> to experience owner, and <strong>{result.robloxShareTotal.toLocaleString()} R$ (30%)</strong> retained by Roblox.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
