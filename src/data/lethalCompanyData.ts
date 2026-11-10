/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BuyingRate {
  daysLeft: number;
  dayName: string;
  ratePercentage: number;
  recommendation: string;
}

export const LETHAL_COMPANY_BUYING_RATES: BuyingRate[] = [
  { daysLeft: 3, dayName: 'Day 1 (3 Days Left)', ratePercentage: 30, recommendation: 'DO NOT SELL! Keep all scrap on ship. Buying rate is penalizing (30%).' },
  { daysLeft: 2, dayName: 'Day 2 (2 Days Left)', ratePercentage: 57, recommendation: 'DO NOT SELL unless emergency cash is needed for essential gear.' },
  { daysLeft: 1, dayName: 'Day 3 (1 Day Left)', ratePercentage: 77, recommendation: 'HOLD SCRAP! Wait for deadline day to get full 100% value.' },
  { daysLeft: 0, dayName: 'Deadline Day (0 Days Left)', ratePercentage: 100, recommendation: 'SELL TODAY! Company buys at 100% full value. Sell only required quota!' },
];

export interface ShipItemPreset {
  id: string;
  name: string;
  cost: number;
  category: 'essential' | 'utility' | 'vehicle' | 'decor';
  description: string;
}

export const LETHAL_COMPANY_ITEMS: ShipItemPreset[] = [
  { id: 'pro_flashlight', name: 'Pro-Flashlight', cost: 25, category: 'essential', description: 'Long battery life high-beam torch' },
  { id: 'walkie_talkie', name: 'Walkie-Talkie', cost: 12, category: 'essential', description: 'Long-range comms with ship monitor handler' },
  { id: 'shovel', name: 'Shovel', cost: 30, category: 'utility', description: 'Melee weapon for killing Snare Fleas, Thumpers, & Hoarder Bugs' },
  { id: 'stun_grenade', name: 'Stun Grenade', cost: 30, category: 'utility', description: 'Stuns Eyeless Dogs and Forest Giants' },
  { id: 'teleporter', name: 'Teleporter', cost: 375, category: 'utility', description: 'Recalls crewmates back to ship instantly (drops items)' },
  { id: 'inverse_teleporter', name: 'Inverse Teleporter', cost: 425, category: 'utility', description: 'Teleports player randomly inside facility without gear' },
  { id: 'jetpack', name: 'Jetpack', cost: 700, category: 'vehicle', description: 'Fly over water gaps, leviathans, and terrain' },
  { id: 'radar_booster', name: 'Radar Booster', cost: 60, category: 'utility', description: 'Deployable camera ping & ping distraction tool' },
  { id: 'zap_gun', name: 'Zap Gun', cost: 400, category: 'utility', description: 'Stuns monsters continuously for teammate kills' },
];

export interface QuotaCalculationResult {
  currentQuota: number;
  fulfilledQuota: number;
  remainingQuotaNeeded: number;
  totalShipScrapValue: number;
  daysLeft: number;
  buyingRatePercentage: number;
  
  // Financial metrics
  effectiveSellingValueToday: number;
  scrapNeededToSellToday: number;
  canMeetQuotaToday: boolean;
  surplusScrapAfterQuota: number;
  overtimeBonus: number;
  estimatedNextQuota: number;

  // Status & Guidance
  statusBadge: 'SAFE' | 'WARNING' | 'DANGER';
  sellingStrategyText: string;
  itemBudgetCost: number;
}

/**
 * Baseline Lethal Company Quota progression sequence
 */
export const STANDARD_QUOTA_PROGRESSION = [130, 236, 362, 531, 748, 1018, 1344, 1735, 2200];

/**
 * Calculates exact Lethal Company quota math, overtime bonuses, and scrap retention strategy.
 */
export function calculateLethalQuota(
  currentQuota: number,
  fulfilledQuota: number,
  totalShipScrapValue: number,
  daysLeft: number,
  itemBudgetCost: number = 0
): QuotaCalculationResult {
  const remainingQuotaNeeded = Math.max(0, currentQuota - fulfilledQuota);
  const rateInfo = LETHAL_COMPANY_BUYING_RATES.find(r => r.daysLeft === daysLeft) || LETHAL_COMPANY_BUYING_RATES[3];
  const rateFraction = rateInfo.ratePercentage / 100;

  // Effective cash received if selling all ship scrap today
  const effectiveSellingValueToday = Math.floor(totalShipScrapValue * rateFraction);

  // Target cash needed today = Remaining Quota + Item Budget
  const targetCashNeededToday = remainingQuotaNeeded + itemBudgetCost;

  // How much raw scrap value must be sold to net targetCashNeededToday at current rate
  const scrapNeededToSellToday = rateFraction > 0 ? Math.ceil(targetCashNeededToday / rateFraction) : targetCashNeededToday;

  const canMeetQuotaToday = effectiveSellingValueToday >= targetCashNeededToday;

  // Surplus raw scrap left on ship if player sells exact needed amount today
  const actualScrapSold = Math.min(totalShipScrapValue, scrapNeededToSellToday);
  const cashReceivedToday = Math.floor(actualScrapSold * rateFraction);
  const surplusScrapAfterQuota = Math.max(0, totalShipScrapValue - actualScrapSold);

  // Overtime Bonus Formula (if selling over quota on or before deadline day)
  // Overtime = max(0, (CashReceived - QuotaNeeded) / 5 + (DaysLeft * 15))
  let overtimeBonus = 0;
  if (cashReceivedToday > remainingQuotaNeeded) {
    const excessCash = cashReceivedToday - remainingQuotaNeeded;
    overtimeBonus = Math.floor(excessCash / 5 + daysLeft * 15);
  }

  // Estimate Next Quota: Formula approx Quota_New = Quota_Current + 100 + (Fulfilled / 16)^1.15
  const estimatedNextQuota = Math.round(currentQuota + 100 + Math.pow(currentQuota / 16, 1.12));

  // Determine Strategy & Status Badge
  let statusBadge: 'SAFE' | 'WARNING' | 'DANGER' = 'SAFE';
  let sellingStrategyText = '';

  if (!canMeetQuotaToday) {
    statusBadge = 'DANGER';
    const deficitCash = targetCashNeededToday - effectiveSellingValueToday;
    const deficitRawScrap = Math.ceil(deficitCash / rateFraction);
    sellingStrategyText = `CRITICAL DANGER: You are $${deficitCash} short of meeting your quota requirement! Perform another moon scrap run immediately to collect at least $${deficitRawScrap} more in raw scrap value before the deadline.`;
  } else if (daysLeft > 0) {
    statusBadge = 'WARNING';
    sellingStrategyText = `HOLD YOUR SCRAP: The Company is currently paying only ${rateInfo.ratePercentage}% of true value today (${daysLeft} day(s) remaining). Wait until 0 Days Left (Deadline Day) to get full 100% payout unless you urgently need $${targetCashNeededToday} in credits for store items.`;
  } else {
    statusBadge = 'SAFE';
    if (surplusScrapAfterQuota > 0) {
      sellingStrategyText = `OPTIMAL STRATEGY: Sell exactly $${actualScrapSold} in scrap today (at 100% rate) to fulfill your $${remainingQuotaNeeded} quota${itemBudgetCost > 0 ? ` + $${itemBudgetCost} item budget` : ''}. SAVE your remaining $${surplusScrapAfterQuota} in scrap on the ship for the next quota cycle!`;
    } else {
      sellingStrategyText = `QUOTA MET: Sell all $${totalShipScrapValue} of your ship scrap to barely hit the target quota ($${remainingQuotaNeeded}). You will start the next quota cycle with $0 carried over scrap.`;
    }
  }

  return {
    currentQuota,
    fulfilledQuota,
    remainingQuotaNeeded,
    totalShipScrapValue,
    daysLeft,
    buyingRatePercentage: rateInfo.ratePercentage,
    effectiveSellingValueToday,
    scrapNeededToSellToday: actualScrapSold,
    canMeetQuotaToday,
    surplusScrapAfterQuota,
    overtimeBonus,
    estimatedNextQuota,
    statusBadge,
    sellingStrategyText,
    itemBudgetCost,
  };
}

export const LETHAL_COMPANY_FAQS = [
  {
    question: 'When is the best time to sell scrap in Lethal Company?',
    answer: 'The absolute best time to sell scrap is on 0 Days Left (Deadline Day) at the Company Building (Gordion). The company pays 100% of scrap value on deadline day, compared to only 30% on Day 1, 57% on Day 2, and 77% on Day 3.'
  },
  {
    question: 'Should I sell all my scrap or save some on the ship?',
    answer: 'Only sell enough scrap to reach your current quota requirement! Keep all extra scrap stored safely inside your ship. Carried-over scrap carries 100% value into the next quota cycle, giving your squad a massive head start when quota targets scale up.'
  },
  {
    question: 'How does the Overtime Bonus work in Lethal Company?',
    answer: 'If you sell more scrap than required to meet the quota, you receive an Overtime Bonus payout added directly to your ship credits. The formula is: Overtime = (Excess Cash Sold) / 5 + (Days Remaining * 15).'
  },
  {
    question: 'What happens if you fail to meet the quota in Lethal Company?',
    answer: 'If your squad fails to turn in enough scrap by 0 Days Left, the ship airlock opens automatically and all crew members are ejected into deep space, ending the run!'
  }
];
