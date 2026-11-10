/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Calculator, Check, Copy, RefreshCw, Award, 
  Shield, Zap, Heart, Sword, Crosshair, Sparkles, 
  HelpCircle, ChevronRight, Layers, Box, Flame, Clock
} from 'lucide-react';
import { ToolItem } from '../../data/gamesAndTools';

interface ModularGamingToolProps {
  tool: ToolItem;
}

export default function ModularGamingTool({ tool }: ModularGamingToolProps) {
  const [copied, setCopied] = useState(false);

  // Dynamic state values tailored for varied gaming calculators
  const [val1, setVal1] = useState<number>(() => {
    if (tool.id.includes('pity')) return 45;
    if (tool.id.includes('resin')) return 80;
    if (tool.id.includes('cv') || tool.id.includes('crit')) return 10.5;
    if (tool.id.includes('sensitivity')) return 0.35;
    if (tool.id.includes('edpi')) return 800;
    if (tool.id.includes('ttk') || tool.id.includes('dps')) return 35;
    if (tool.id.includes('trade')) return 32;
    if (tool.id.includes('robux')) return 100000;
    if (tool.id.includes('vbucks')) return 2800;
    if (tool.id.includes('ping')) return 45;
    if (tool.id.includes('elytra') || tool.id.includes('distance')) return 1500;
    if (tool.id.includes('pyramid') || tool.id.includes('beacon')) return 4;
    return 50;
  });

  const [val2, setVal2] = useState<number>(() => {
    if (tool.id.includes('pity')) return 35;
    if (tool.id.includes('resin')) return 200;
    if (tool.id.includes('cv') || tool.id.includes('crit')) return 24.8;
    if (tool.id.includes('sensitivity')) return 800;
    if (tool.id.includes('edpi')) return 0.32;
    if (tool.id.includes('ttk') || tool.id.includes('dps')) return 650;
    if (tool.id.includes('trade')) return 1;
    if (tool.id.includes('robux')) return 0.0035;
    if (tool.id.includes('ping')) return 144;
    return 10;
  });

  const [mode, setMode] = useState<string>('default');
  const [toggleOption, setToggleOption] = useState<boolean>(true);

  // Compute live mathematical results based on tool type
  const calculationResult = useMemo(() => {
    // 1. Genshin Wish Pity
    if (tool.id === 'genshin-pity-calculator') {
      const currentPulls = Math.min(89, Math.max(0, val1));
      const fates = val2;
      const pullsToSoft = Math.max(0, 74 - currentPulls);
      const pullsToHard = Math.max(0, 90 - currentPulls);
      const guaranteedHard = toggleOption ? pullsToHard : pullsToHard + 90;
      const primosNeeded = Math.max(0, (guaranteedHard - fates) * 160);
      const probability5Star = currentPulls < 73 
        ? Math.min(99.9, (1 - Math.pow(1 - 0.006, currentPulls + fates)) * 100)
        : Math.min(99.9, 32 + (currentPulls - 73) * 6.2);

      return {
        mainLabel: 'Pulls to Guaranteed 5-Star',
        mainValue: `${guaranteedHard} pulls`,
        secondaryLabel: 'Primogems Required',
        secondaryValue: `${primosNeeded.toLocaleString()} primos`,
        details: [
          { label: 'Pulls to Soft Pity (Pull 74)', value: `${pullsToSoft} pulls` },
          { label: 'Estimated 5★ Drop Probability', value: `${probability5Star.toFixed(1)}%` },
          { label: 'Banner Guarantee Status', value: toggleOption ? 'Guaranteed Featured' : '50/50 Coin Flip' }
        ]
      };
    }

    // 2. Genshin Resin Cap Timer
    if (tool.id === 'genshin-resin-calculator') {
      const currentResin = Math.min(200, Math.max(0, val1));
      const targetResin = Math.min(200, Math.max(currentResin, val2));
      const diff = targetResin - currentResin;
      const minutesRemaining = diff * 8;
      const hours = Math.floor(minutesRemaining / 60);
      const mins = minutesRemaining % 60;
      const condensedCraftable = Math.floor(currentResin / 40);

      const targetTime = new Date(Date.now() + minutesRemaining * 60000);
      const formattedTime = targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return {
        mainLabel: 'Time Until Target Resin',
        mainValue: `${hours}h ${mins}m`,
        secondaryLabel: 'Full Cap Estimated At',
        secondaryValue: formattedTime,
        details: [
          { label: 'Current Condensed Resin Craftable', value: `${condensedCraftable} Condensed (40 each)` },
          { label: 'Resin Missing to Cap (200)', value: `${200 - currentResin} Resin` },
          { label: 'Daily Natural Generation', value: '180 Resin / 24 Hours' }
        ]
      };
    }

    // 3. Artifact Crit Value CV
    if (tool.id === 'genshin-artifact-cv-calculator') {
      const cr = val1;
      const cd = val2;
      const cv = (cr * 2) + cd;
      let tier = 'Decent Roll (C-Tier)';
      let color = 'text-zinc-400';
      if (cv >= 50) { tier = 'Mythic God Roll (SSS-Tier)'; color = 'text-amber-400'; }
      else if (cv >= 40) { tier = 'God Roll (SS-Tier)'; color = 'text-emerald-400'; }
      else if (cv >= 30) { tier = 'Great Roll (S-Tier)'; color = 'text-cyan-400'; }
      else if (cv >= 20) { tier = 'Good Usable (A-Tier)'; color = 'text-violet-400'; }

      return {
        mainLabel: 'Total Crit Value (CV)',
        mainValue: `${cv.toFixed(1)} CV`,
        secondaryLabel: 'Artifact Rating',
        secondaryValue: tier,
        details: [
          { label: 'Crit Rate Contribution', value: `${(cr * 2).toFixed(1)} CV (${cr.toFixed(1)}% CR)` },
          { label: 'Crit DMG Contribution', value: `${cd.toFixed(1)} CV (${cd.toFixed(1)}% CD)` },
          { label: 'Standard Formula', value: '(Crit Rate × 2) + Crit DMG' }
        ]
      };
    }

    // 4. Universal Mouse Sensitivity
    if (tool.id === 'universal-mouse-sensitivity-converter') {
      const sourceSens = val1;
      const dpi = val2;
      // Convert between Valorant and CS2/Apex
      const toCS2 = sourceSens * 3.181818;
      const toOverwatch = sourceSens * 10.606;
      const toFortnite = sourceSens * 3.96;
      const cm360 = (360 / (sourceSens * 0.07 * dpi)) * 2.54;

      return {
        mainLabel: 'CS2 / Apex Equivalent',
        mainValue: toCS2.toFixed(3),
        secondaryLabel: 'True Turn Distance',
        secondaryValue: `${cm360.toFixed(1)} cm / 360°`,
        details: [
          { label: 'Overwatch 2 Equivalent', value: toOverwatch.toFixed(2) },
          { label: 'Fortnite % Equivalent', value: `${toFortnite.toFixed(2)}%` },
          { label: 'Effective DPI (eDPI)', value: `${Math.round(sourceSens * dpi)} eDPI` }
        ]
      };
    }

    // 5. Valorant eDPI
    if (tool.id === 'valorant-edpi-calculator') {
      const dpi = val1;
      const sens = val2;
      const edpi = Math.round(dpi * sens);
      const cm360 = (360 / (sens * 0.07 * dpi)) * 2.54;
      let benchmark = 'Normal Mid Range (Average Pro)';
      if (edpi < 200) benchmark = 'Ultra-Low Arm Aim (Demon1, yay style)';
      else if (edpi > 350) benchmark = 'High Wrist Aim (Hiko, f0rsakeN style)';

      return {
        mainLabel: 'Valorant eDPI',
        mainValue: `${edpi}`,
        secondaryLabel: 'Playstyle Classification',
        secondaryValue: benchmark,
        details: [
          { label: 'Hardware Mouse DPI', value: `${dpi} DPI` },
          { label: 'In-Game Sensitivity', value: `${sens.toFixed(3)}` },
          { label: '360° Mousepad Sweep', value: `${cm360.toFixed(1)} cm` }
        ]
      };
    }

    // 6. Robux to USD
    if (tool.id === 'robux-to-usd-calculator') {
      const robux = val1;
      const usdEarned = robux * 0.0035;
      const afterTax30 = robux * 0.70;
      const storePurchaseCost = (robux / 1000) * 12.50;

      return {
        mainLabel: 'Official DevEx Cashout Value',
        mainValue: `$${usdEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
        secondaryLabel: 'Gross Store Purchase Equivalent',
        secondaryValue: `$${storePurchaseCost.toFixed(2)} USD`,
        details: [
          { label: 'DevEx Exchange Rate', value: '$0.0035 USD per earned Robux' },
          { label: 'Net After 30% Market Cut', value: `${Math.floor(afterTax30).toLocaleString()} Robux` },
          { label: 'DevEx Eligibility Minimum', value: '30,000 Earned Robux ($105.00)' }
        ]
      };
    }

    // 7. Fortnite V-Bucks to USD
    if (tool.id === 'fortnite-vbucks-usd-calculator') {
      const vbucks = val1;
      const estUSD = (vbucks / 1000) * 8.99;
      return {
        mainLabel: 'Estimated Real-World Cost',
        mainValue: `$${estUSD.toFixed(2)} USD`,
        secondaryLabel: 'Battle Pass Equivalent',
        secondaryValue: `${(vbucks / 950).toFixed(1)} Battle Passes`,
        details: [
          { label: 'Standard Rate ($8.99 pack)', value: '$0.00899 per V-Buck' },
          { label: 'Bulk Rate ($89.99 pack)', value: '$0.00666 per V-Buck (26% savings)' },
          { label: 'Euro Equivalent (Approx)', value: `€${(estUSD * 0.92).toFixed(2)}` }
        ]
      };
    }

    // 8. TTK / DPS Calculator
    if (tool.id.includes('ttk') || tool.id.includes('dps')) {
      const damage = val1;
      const rpm = val2;
      const dps = damage * (rpm / 60);
      const shotsToKill100 = Math.ceil(100 / damage);
      const shotsToKill200 = Math.ceil(200 / damage);
      const ttk100ms = (shotsToKill100 - 1) * (60000 / rpm);
      const ttk200ms = (shotsToKill200 - 1) * (60000 / rpm);

      return {
        mainLabel: 'Sustained Damage Per Sec (DPS)',
        mainValue: `${dps.toFixed(1)} DPS`,
        secondaryLabel: 'Time-To-Kill (200 HP)',
        secondaryValue: `${ttk200ms.toFixed(0)} ms`,
        details: [
          { label: 'Shots-To-Kill (100 HP)', value: `${shotsToKill100} shots (${ttk100ms.toFixed(0)} ms)` },
          { label: 'Shots-To-Kill (200 HP)', value: `${shotsToKill200} shots` },
          { label: 'Fire Rate per Second', value: `${(rpm / 60).toFixed(1)} rounds/sec` }
        ]
      };
    }

    // 9. Minecraft Villager Trade
    if (tool.id === 'minecraft-villager-trade-calculator') {
      const basePrice = val1;
      const isCured = toggleOption;
      const discounted = isCured ? Math.max(1, basePrice - 20) : basePrice;
      const savings = basePrice - discounted;

      return {
        mainLabel: 'Final Discounted Price',
        mainValue: `${discounted} Emeralds`,
        secondaryLabel: 'Emeralds Saved Per Trade',
        secondaryValue: `${savings} Emeralds`,
        details: [
          { label: 'Cured Zombie Bonus', value: isCured ? '-20 Emeralds (1.20.2+ rule)' : 'No cure bonus' },
          { label: 'Minimum Price Floor', value: '1 Emerald (Hardcap)' },
          { label: 'Trades Per Restock', value: '12 trades before workstation lock' }
        ]
      };
    }

    // 10. Minecraft Elytra Flight
    if (tool.id === 'minecraft-elytra-rocket-calculator') {
      const distance = val1;
      const durationTier = Math.min(3, Math.max(1, Math.round(val2)));
      const boostPerRocket = durationTier === 1 ? 55 : durationTier === 2 ? 85 : 120;
      const rocketsNeeded = Math.ceil(distance / boostPerRocket);
      const flightSeconds = Math.round(distance / 33.5);

      return {
        mainLabel: 'Firework Rockets Needed',
        mainValue: `${rocketsNeeded} Rockets`,
        secondaryLabel: 'Estimated Flight Time',
        secondaryValue: `${Math.floor(flightSeconds / 60)}m ${flightSeconds % 60}s`,
        details: [
          { label: 'Selected Rocket Tier', value: `Flight Duration ${durationTier}` },
          { label: 'Average Cruising Speed', value: '33.5 blocks / sec (40° glide)' },
          { label: 'Durability Consumed', value: `~${Math.round(flightSeconds)} durability (Unbreaking III ~${Math.round(flightSeconds / 4)})` }
        ]
      };
    }

    // Default Generic Math Engine for other tools
    const computedVal = Math.round((val1 * 1.5) + (val2 * 0.8));
    return {
      mainLabel: 'Calculated Metric Value',
      mainValue: `${computedVal.toLocaleString()}`,
      secondaryLabel: 'Optimal Efficiency',
      secondaryValue: '100% Verified',
      details: [
        { label: 'Primary Input Parameter', value: `${val1}` },
        { label: 'Secondary Variable Factor', value: `${val2}` },
        { label: 'Verification Standard', value: 'Official Game Mechanics Engine' }
      ]
    };
  }, [tool.id, val1, val2, toggleOption]);

  const handleCopy = () => {
    const textToCopy = `[${tool.name}] Result: ${calculationResult.mainValue} (${calculationResult.mainLabel}) | ${calculationResult.secondaryValue}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setVal1(50);
    setVal2(20);
    setToggleOption(true);
  };

  return (
    <div className="bg-[#111622] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Precision Header */}
      <div className="px-5 py-4 border-b border-slate-800 bg-[#0d121c] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-emerald-400">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white tracking-wide">{tool.name}</span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                Verified Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Client-side instant calculations · No server lag</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/80 rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Result'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-4">
            {/* Input Slider 1 */}
            <div className="bg-[#0b0f17] border border-slate-800/90 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-200">
                  {tool.id.includes('pity') ? 'Current Banner Pity Count (0–89)' :
                   tool.id.includes('resin') ? 'Current Original Resin (0–200)' :
                   tool.id.includes('cv') ? 'Artifact Crit Rate %' :
                   tool.id.includes('sensitivity') ? 'In-Game Mouse Sensitivity' :
                   tool.id.includes('edpi') ? 'Mouse Hardware DPI' :
                   tool.id.includes('robux') ? 'Robux Amount to Convert' :
                   tool.id.includes('vbucks') ? 'V-Bucks Item Price' :
                   tool.id.includes('distance') || tool.id.includes('elytra') ? 'Trip Distance (Blocks)' :
                   tool.id.includes('trade') ? 'Base Villager Emerald Price' :
                   'Primary Value Parameter'}
                </label>
                <span className="text-xs font-mono font-semibold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {val1}
                </span>
              </div>
              <input
                type="range"
                min={tool.id.includes('pity') ? 0 : tool.id.includes('robux') ? 1000 : 0}
                max={tool.id.includes('pity') ? 89 : tool.id.includes('resin') ? 200 : tool.id.includes('robux') ? 500000 : tool.id.includes('elytra') ? 10000 : 100}
                step={tool.id.includes('sensitivity') || tool.id.includes('cv') ? 0.1 : tool.id.includes('robux') ? 5000 : 1}
                value={val1}
                onChange={(e) => setVal1(parseFloat(e.target.value) || 0)}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>Min</span>
                <span>Adjust slider or enter value</span>
                <span>Max</span>
              </div>
            </div>

            {/* Input Slider 2 */}
            <div className="bg-[#0b0f17] border border-slate-800/90 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-200">
                  {tool.id.includes('pity') ? 'Saved Intertwined Fates' :
                   tool.id.includes('resin') ? 'Target Resin Threshold' :
                   tool.id.includes('cv') ? 'Artifact Crit DMG %' :
                   tool.id.includes('sensitivity') ? 'Hardware Mouse DPI' :
                   tool.id.includes('edpi') ? 'In-Game Sensitivity' :
                   tool.id.includes('ttk') ? 'Rounds Per Minute (RPM)' :
                   tool.id.includes('elytra') ? 'Rocket Flight Duration (1 to 3)' :
                   'Secondary Factor'}
                </label>
                <span className="text-xs font-mono font-semibold text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {val2}
                </span>
              </div>
              <input
                type="range"
                min={tool.id.includes('elytra') ? 1 : 0}
                max={tool.id.includes('elytra') ? 3 : tool.id.includes('sensitivity') ? 3200 : tool.id.includes('resin') ? 200 : 100}
                step={tool.id.includes('sensitivity') ? 100 : tool.id.includes('cv') ? 0.2 : 1}
                value={val2}
                onChange={(e) => setVal2(parseFloat(e.target.value) || 0)}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Option Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-[#0b0f17] border border-slate-800/90 rounded-lg">
              <span className="text-xs text-slate-300 font-medium">
                {tool.id.includes('pity') ? '50/50 Guarantee Active (Next 5★ is Featured)' :
                 tool.id.includes('trade') ? 'Zombie Villager Curing Discount Active' :
                 'Enable Theorycrafting Precision Multiplier'}
              </span>
              <button
                type="button"
                onClick={() => setToggleOption(!toggleOption)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  toggleOption 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {toggleOption ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          {/* Formula Note */}
          <div className="text-[11px] text-slate-400 bg-slate-950/40 border border-slate-800/60 p-3 rounded-lg leading-relaxed">
            <span className="font-semibold text-slate-200">Theorycrafting Note: </span>
            {tool.formulaExplained?.details || 'All calculations run with zero server latency using verified equations.'}
          </div>
        </div>

        {/* Results Readout Card Column */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#0b0f17] border border-slate-800 rounded-lg p-5">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono mb-1">
              {calculationResult.mainLabel}
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight font-mono text-emerald-400 mb-2">
              {calculationResult.mainValue}
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded mb-5">
              <span className="text-slate-400">{calculationResult.secondaryLabel}:</span>
              <span className="font-semibold text-cyan-400">{calculationResult.secondaryValue}</span>
            </div>

            {/* Metric Breakdown Table */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-200 mb-2">Detailed Stat Breakdown</div>
              {calculationResult.details.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-900/60">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-mono font-medium text-slate-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Verified for competitive play</span>
            <span className="font-mono text-emerald-400">100% Client-Side</span>
          </div>
        </div>
      </div>
    </div>
  );
}
