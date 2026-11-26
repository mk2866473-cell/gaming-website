/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * GENSHIN IMPACT PRIMOGEM & WISH INCOME PLANNER — DATA & FORMULAS
 *
 * Verified Constants:
 * - 1 wish = 160 Primogems
 * - Daily Commissions = 60 Primogems/day
 * - Blessing of the Welkin Moon = 90 Primogems/day (daily drip only; 300 Genesis Crystals not counted)
 * - Base 5★ rate = 0.6%, soft pity from pull 74 (+6% per pull), hard pity 90
 * - Worst case featured 5★: 180 pulls (28,800 primos) from 0 pity with no guarantee; 90 pulls (14,400 primos) with guarantee
 * - Expected (average) case: 62.30 pulls per 5★; 93.45 pulls (≈14,951 primos) for featured 5★ from 0 pity, no guarantee
 */

export const PRIMOS_PER_WISH = 160;
export const COMMISSIONS_PER_DAY = 60;
export const WELKIN_PER_DAY = 90;
export const BASE_5STAR_RATE = 0.006;
export const SOFT_PITY_START = 74;
export const SOFT_PITY_INCREMENT = 0.06;
export const HARD_PITY = 90;
export const EXPECTED_PULLS_PER_5STAR = 62.30;
export const EXPECTED_PULLS_FEATURED_0_PITY = 93.45; // 62.30 * 1.5

/**
 * Single pull probability for Character Event banner at pullNumber n (1..90)
 */
export function getCharacterBannerProb(pullNumber: number): number {
  if (pullNumber < 74) return 0.006;
  if (pullNumber >= 90) return 1.0;
  return 0.006 + 0.06 * (pullNumber - 73);
}

/**
 * Survival sum for expected remaining pulls to the next 5★ from current pity p (0..89):
 * E_next(p) = \sum_{k=1}^{90-p} S(k)
 * where S(k) is the survival probability of not having pulled a 5★ in the first (k-1) pulls.
 */
export function expectedRemainingPullsToNext5Star(currentPity: number): number {
  const p = Math.min(89, Math.max(0, currentPity));
  let expectedPulls = 0;
  let survivalProb = 1.0;
  for (let pull = p + 1; pull <= 90; pull++) {
    expectedPulls += survivalProb;
    const prob = getCharacterBannerProb(pull);
    survivalProb *= (1 - prob);
  }
  return expectedPulls;
}

/**
 * Expected pulls to guaranteed featured 5★:
 * guaranteeOn ? E_next(pity) : E_next(pity) + 0.5 * 62.30
 */
export function calculateExpectedPullsToFeatured(currentPity: number, guaranteeOn: boolean): number {
  const eNext = expectedRemainingPullsToNext5Star(currentPity);
  return guaranteeOn ? eNext : eNext + 0.5 * EXPECTED_PULLS_PER_5STAR;
}

export interface GenshinIncomePlannerInput {
  currentPrimogems: number;
  currentFates: number;
  days: number;
  currentPity: number;
  guaranteeOn: boolean;
  commissionsOn: boolean;
  welkinOn: boolean;
  otherIncome: number;
  extraFates: number;
}

export interface GenshinIncomePlannerResult {
  projectedPrimogems: number;
  totalPulls: number;
  leftoverPrimogems: number;
  fatesFromPrimos: number;
  totalFatesDirect: number;
  worstCasePullsNeeded: number;
  worstCasePrimogemsNeeded: number;
  isGuaranteedCovered: boolean;
  shortfallPulls: number;
  shortfallPrimogems: number;
  dailyRate: number;
  extraDaysNeeded: number | null;
  expectedPullsToFeatured: number;
  expectedPrimogemsToFeatured: number;
}

export function calculateGenshinIncomePlan(input: GenshinIncomePlannerInput): GenshinIncomePlannerResult {
  const currentPrimos = Math.max(0, Number.isFinite(input.currentPrimogems) ? input.currentPrimogems : 0);
  const currentFates = Math.max(0, Number.isFinite(input.currentFates) ? input.currentFates : 0);
  const days = Math.min(365, Math.max(0, Number.isFinite(input.days) ? input.days : 0));
  const currentPity = Math.min(89, Math.max(0, Number.isFinite(input.currentPity) ? input.currentPity : 0));
  const otherIncome = Math.max(0, Number.isFinite(input.otherIncome) ? input.otherIncome : 0);
  const extraFates = Math.max(0, Number.isFinite(input.extraFates) ? input.extraFates : 0);

  const projectedPrimogems = currentPrimos +
    (input.commissionsOn ? COMMISSIONS_PER_DAY * days : 0) +
    (input.welkinOn ? WELKIN_PER_DAY * days : 0) +
    otherIncome;

  const fatesFromPrimos = Math.floor(projectedPrimogems / PRIMOS_PER_WISH);
  const totalFatesDirect = currentFates + extraFates;
  const totalPulls = totalFatesDirect + fatesFromPrimos;
  const leftoverPrimogems = projectedPrimogems % PRIMOS_PER_WISH;

  const worstCasePullsNeeded = input.guaranteeOn
    ? (HARD_PITY - currentPity)
    : (HARD_PITY - currentPity) + HARD_PITY;
  const worstCasePrimogemsNeeded = worstCasePullsNeeded * PRIMOS_PER_WISH;

  const isGuaranteedCovered = totalPulls >= worstCasePullsNeeded;
  const shortfallPulls = Math.max(0, worstCasePullsNeeded - totalPulls);
  const shortfallPrimogems = shortfallPulls * PRIMOS_PER_WISH;

  const dailyRate = (input.commissionsOn ? COMMISSIONS_PER_DAY : 0) + (input.welkinOn ? WELKIN_PER_DAY : 0);
  const extraDaysNeeded = shortfallPulls > 0
    ? (dailyRate > 0 ? Math.ceil(shortfallPrimogems / dailyRate) : null)
    : 0;

  const expectedPulls = calculateExpectedPullsToFeatured(currentPity, input.guaranteeOn);
  const expectedPrimogemsToFeatured = Math.round(expectedPulls * PRIMOS_PER_WISH);

  return {
    projectedPrimogems,
    totalPulls,
    leftoverPrimogems,
    fatesFromPrimos,
    totalFatesDirect,
    worstCasePullsNeeded,
    worstCasePrimogemsNeeded,
    isGuaranteedCovered,
    shortfallPulls,
    shortfallPrimogems,
    dailyRate,
    extraDaysNeeded,
    expectedPullsToFeatured: Number(expectedPulls.toFixed(1)),
    expectedPrimogemsToFeatured
  };
}
