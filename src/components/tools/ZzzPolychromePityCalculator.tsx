/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders,
  Calendar, Coins, Target, Compass
} from 'lucide-react';

export default function ZzzPolychromePityCalculator() {
  const [channelType, setChannelType] = useState<'agent' | 'wengine' | 'bangboo'>('agent');
  const [currentPity, setCurrentPity] = useState<number>(30);
  const [isGuaranteed, setIsGuaranteed] = useState<boolean>(false);
  const [polychromesHeld, setPolychromesHeld] = useState<number>(5400);
  const [tapesHeld, setTapesHeld] = useState<number>(10);
  const [booponsHeld, setBooponsHeld] = useState<number>(35);
  const [targetGoal, setTargetGoal] = useState<'s0' | 's0_engine' | 's1'>('s0');
  const [daysRemaining, setDaysRemaining] = useState<number>(16);
  const [hasMembership, setHasMembership] = useState<boolean>(true);
  const [hasCityFund, setHasCityFund] = useState<boolean>(false);
  const [shiyuResets, setShiyuResets] = useState<number>(1);
  const [eventPolychromes, setEventPolychromes] = useState<number>(1200);
  const [copied, setCopied] = useState<boolean>(false);

  const PULL_COST = 160;

  const calculations = useMemo(() => {
    // Bangboo channel is special: uses Boopons, 80 pity, 100% guaranteed target selection!
    if (channelType === 'bangboo') {
      const worstCaseBoopons = Math.max(0, 80 - currentPity);
      const booponsDeficit = Math.max(0, worstCaseBoopons - booponsHeld);
      const probability = booponsHeld >= worstCaseBoopons ? 100 : Math.min(99, Math.round((booponsHeld / worstCaseBoopons) * 100));

      return {
        dailyIncome: 0,
        membershipIncome: 0,
        cityFundIncome: 0,
        shiyuIncome: 0,
        totalProjectedCurrency: booponsHeld,
        totalPullsAvailable: booponsHeld,
        worstCasePulls: worstCaseBoopons,
        averagePulls: Math.max(0, 65 - currentPity),
        pullsDeficit: booponsDeficit,
        currencyDeficit: booponsDeficit,
        probability,
        statusLabel: booponsDeficit === 0 ? 'Guaranteed 100%' : 'Need More Boopons',
        statusColor: booponsDeficit === 0 ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' : 'text-amber-400 border-amber-500/40 bg-amber-950/40'
      };
    }

    // Agent or W-Engine Channels
    const dailyIncome = 60 * daysRemaining;
    const membershipIncome = hasMembership ? 90 * daysRemaining : 0;
    const cityFundIncome = hasCityFund ? 680 : 0;
    const cityFundTapes = hasCityFund ? 4 : 0;
    const shiyuIncome = shiyuResets * 720; // Critical Node full 720
    const hollowWeekly = Math.floor(daysRemaining / 7) * 160;
    const maintenance = 300;

    const totalProjectedCurrency = polychromesHeld + dailyIncome + membershipIncome + cityFundIncome + shiyuIncome + hollowWeekly + eventPolychromes + maintenance;
    const totalPullsAvailable = tapesHeld + cityFundTapes + Math.floor(totalProjectedCurrency / PULL_COST);

    let worstCasePulls = 0;
    let averagePulls = 0;

    if (channelType === 'wengine') {
      // W-Engine banner: 80 Hard Pity, 75/25 win rate!
      const firstEnginePity = Math.max(0, 80 - currentPity);
      worstCasePulls = isGuaranteed ? firstEnginePity : firstEnginePity + 80;
      averagePulls = isGuaranteed ? Math.max(0, 65 - currentPity) : Math.round((65 - currentPity) + (0.25 * 65));
    } else {
      // Agent Banner: 90 Hard Pity, 50/50 win rate!
      const firstAgentPity = Math.max(0, 90 - currentPity);
      if (targetGoal === 's0') {
        worstCasePulls = isGuaranteed ? firstAgentPity : firstAgentPity + 90;
        averagePulls = isGuaranteed ? Math.max(0, 75 - currentPity) : Math.round((75 - currentPity) + (0.5 * 75));
      } else if (targetGoal === 's1') {
        const copy1 = isGuaranteed ? firstAgentPity : firstAgentPity + 90;
        worstCasePulls = copy1 + 180;
        averagePulls = Math.round(worstCasePulls * 0.65);
      } else if (targetGoal === 's0_engine') {
        const charWorst = isGuaranteed ? firstAgentPity : firstAgentPity + 90;
        const engineWorst = 80; // 80 pity
        worstCasePulls = charWorst + engineWorst;
        averagePulls = Math.round(charWorst * 0.7 + 65);
      }
    }

    const pullsDeficit = Math.max(0, worstCasePulls - totalPullsAvailable);
    const currencyDeficit = pullsDeficit * PULL_COST;

    let probability = 0;
    if (totalPullsAvailable >= worstCasePulls) {
      probability = 100;
    } else {
      const ratio = totalPullsAvailable / Math.max(1, averagePulls);
      probability = Math.min(99, Math.max(5, Math.round(Math.pow(ratio, 1.35) * 85)));
    }

    let statusLabel = 'Guaranteed 100%';
    let statusColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
    if (probability < 50) {
      statusLabel = 'High Risk Gamble';
      statusColor = 'text-rose-400 border-rose-500/40 bg-rose-950/40';
    } else if (probability < 80) {
      statusLabel = '50/50 Territory';
      statusColor = 'text-amber-400 border-amber-500/40 bg-amber-950/40';
    } else if (probability < 100) {
      statusLabel = 'Very Likely';
      statusColor = 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40';
    }

    return {
      dailyIncome,
      membershipIncome,
      cityFundIncome,
      shiyuIncome,
      totalProjectedCurrency,
      totalPullsAvailable,
      worstCasePulls,
      averagePulls,
      pullsDeficit,
      currencyDeficit,
      probability,
      statusLabel,
      statusColor
    };
  }, [channelType, currentPity, isGuaranteed, polychromesHeld, tapesHeld, booponsHeld, targetGoal, daysRemaining, hasMembership, hasCityFund, shiyuResets, eventPolychromes]);

  const handleCopy = () => {
    const text = `Zenless Zone Zero Pity & Polychrome Plan:
Channel: ${channelType.toUpperCase()} | Target: ${targetGoal.toUpperCase()}
Current Pity: ${currentPity}/${channelType === 'wengine' || channelType === 'bangboo' ? 80 : 90} | Guaranteed: ${isGuaranteed ? 'YES' : 'NO'}
Projected Total Pulls: ${calculations.totalPullsAvailable} Pulls
Worst-Case Required: ${calculations.worstCasePulls} Pulls
Success Probability: ${calculations.probability}% (${calculations.statusLabel})
${calculations.currencyDeficit > 0 ? `Deficit: ${calculations.currencyDeficit.toLocaleString()} Polychromes needed` : 'Status: 100% SECURED!'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 shadow-xl text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/80">
              90 AGENT / 80 ENGINE & BANGBOO
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-xs text-slate-500 font-medium italic">Shiyu Defense & Hollow Zero Income</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Polychrome & Master Tape Banner Pity Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Simulate Exclusive Agent 50/50s, 75/25 W-Engine rolls, and forecast Polychrome income over time.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? 'Copied' : 'Share Pull Plan'}
        </button>
      </div>

      {/* Channel Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => { setChannelType('agent'); setCurrentPity(30); }}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            channelType === 'agent'
              ? 'bg-purple-950/80 border-purple-500 shadow-md ring-1 ring-purple-500'
              : 'bg-slate-950/60 border-slate-800 text-slate-400'
          }`}
        >
          <div className="font-black text-sm text-white">Exclusive Agent Channel</div>
          <div className="text-[11px] text-purple-300 mt-0.5">90 Hard Pity · 50/50 System · Encrypted Tape</div>
        </button>

        <button
          onClick={() => { setChannelType('wengine'); setCurrentPity(20); }}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            channelType === 'wengine'
              ? 'bg-amber-950/80 border-amber-500 shadow-md ring-1 ring-amber-500'
              : 'bg-slate-950/60 border-slate-800 text-slate-400'
          }`}
        >
          <div className="font-black text-sm text-white">W-Engine Channel</div>
          <div className="text-[11px] text-amber-300 mt-0.5">80 Hard Pity · 75/25 Advantage · Weapon Tape</div>
        </button>

        <button
          onClick={() => { setChannelType('bangboo'); setCurrentPity(15); }}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            channelType === 'bangboo'
              ? 'bg-cyan-950/80 border-cyan-500 shadow-md ring-1 ring-cyan-500'
              : 'bg-slate-950/60 border-slate-800 text-slate-400'
          }`}
        >
          <div className="font-black text-sm text-white">Bangboo Channel</div>
          <div className="text-[11px] text-cyan-300 mt-0.5">80 Hard Pity · 100% Target Pick · Boopons Only</div>
        </button>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pity & Guarantee */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-400 uppercase tracking-wider">Current Pity Count</span>
              <span className="font-black text-amber-400">
                {currentPity} / {channelType === 'agent' ? 90 : 80}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={channelType === 'agent' ? 89 : 79}
              value={currentPity}
              onChange={(e) => setCurrentPity(parseInt(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0 (Fresh)</span>
              <span>Soft Pity (~{channelType === 'agent' ? 75 : 65})</span>
              <span>{channelType === 'agent' ? 89 : 79} (Max)</span>
            </div>
          </div>

          {channelType !== 'bangboo' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Featured Guarantee Status</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsGuaranteed(false)}
                  className={`py-2 text-xs font-semibold rounded-lg ${
                    !isGuaranteed ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {channelType === 'wengine' ? '75% Chance' : '50/50 Chance'}
                </button>
                <button
                  onClick={() => setIsGuaranteed(true)}
                  className={`py-2 text-xs font-semibold rounded-lg ${
                    isGuaranteed ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  100% Guaranteed
                </button>
              </div>
            </div>
          )}

          {channelType === 'agent' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Objective</label>
              <select
                value={targetGoal}
                onChange={(e) => setTargetGoal(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                <option value="s0">S0 Agent (First Copy)</option>
                <option value="s1">S1 Agent (First Cinema Mind)</option>
                <option value="s0_engine">S0 Agent + Signature S-Rank W-Engine</option>
              </select>
            </div>
          )}
        </div>

        {/* Currency Held */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-4">
          {channelType === 'bangboo' ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Boopons Held in Bag</label>
              <input
                type="number"
                min={0}
                value={booponsHeld}
                onChange={(e) => setBooponsHeld(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-lg text-cyan-300 font-black"
              />
              <p className="text-[11px] text-slate-400">
                ★ Boopons are 100% free from events & Hollow Zero. Polychromes cannot be spent on Bangboos!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Polychromes</label>
                  <input
                    type="number"
                    min={0}
                    step={160}
                    value={polychromesHeld}
                    onChange={(e) => setPolychromesHeld(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-amber-300 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Master Tapes</label>
                  <input
                    type="number"
                    min={0}
                    value={tapesHeld}
                    onChange={(e) => setTapesHeld(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-purple-300 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-400">Days Until Banner Ends</span>
                  <span className="font-bold text-slate-200">{daysRemaining} Days</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={42}
                  value={daysRemaining}
                  onChange={(e) => setDaysRemaining(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </>
          )}
        </div>

        {/* Income Sources */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Farming & Subscriptions
          </span>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
            <span className="text-xs font-medium text-slate-300">Inter-Knot Membership (90/d)</span>
            <input
              type="checkbox"
              checked={hasMembership}
              onChange={(e) => setHasMembership(e.target.checked)}
              className="rounded accent-amber-400 w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
            <span className="text-xs font-medium text-slate-300">New Eridu City Fund (Battle Pass)</span>
            <input
              type="checkbox"
              checked={hasCityFund}
              onChange={(e) => setHasCityFund(e.target.checked)}
              className="rounded accent-amber-400 w-4 h-4 cursor-pointer"
            />
          </label>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Shiyu Defense</label>
              <select
                value={shiyuResets}
                onChange={(e) => setShiyuResets(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200"
              >
                <option value={0}>0 Cycles</option>
                <option value={1}>1 Cycle (+720)</option>
                <option value={2}>2 Cycles (+1440)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Event Polychromes</label>
              <input
                type="number"
                step={100}
                value={eventPolychromes}
                onChange={(e) => setEventPolychromes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Output Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Projected Pulls</span>
          <div className="text-3xl font-black text-amber-300 mt-1">
            {calculations.totalPullsAvailable}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            = {calculations.totalProjectedCurrency.toLocaleString()} Polychrome Eqv.
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Worst-Case Required</span>
          <div className="text-3xl font-black text-rose-400 mt-1">
            {calculations.worstCasePulls}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Average Expected: ~{calculations.averagePulls} pulls
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center flex flex-col justify-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Probability of Target</span>
          <div className="text-3xl font-black text-white mt-1">
            {calculations.probability}%
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                calculations.probability >= 90 ? 'bg-emerald-400' : calculations.probability >= 60 ? 'bg-cyan-400' : 'bg-amber-400'
              }`}
              style={{ width: `${calculations.probability}%` }}
            />
          </div>
        </div>

        <div className={`rounded-xl p-4 text-center border flex flex-col justify-center items-center ${calculations.statusColor}`}>
          <span className="text-xs uppercase font-bold tracking-wider">Status Verdict</span>
          <span className="text-lg font-black mt-1">{calculations.statusLabel}</span>
          <span className="text-[11px] mt-1 font-medium">
            {calculations.currencyDeficit > 0 
              ? `Deficit: ${calculations.currencyDeficit.toLocaleString()} Polychromes` 
              : 'Target Guaranteed in Worst Case!'}
          </span>
        </div>
      </div>
    </div>
  );
}
