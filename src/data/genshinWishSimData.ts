/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * GENSHIN IMPACT WISH SIMULATOR — MONTE CARLO ENGINE & VERIFIED RATE MODEL
 *
 * Rate Curve (Character Event Banner):
 * For pull number n (1..90) since last 5★:
 * - n < 74: P(5★) = 0.006 (0.6%)
 * - 74 <= n <= 89: P(5★) = 0.006 + 0.06 * (n - 73)
 * - n = 90: P(5★) = 1.000 (100.0%, hard pity forced)
 *
 * 50/50 Rule:
 * - When a 5★ drops and not guaranteed: 50% chance featured, 50% standard.
 *   If standard drops, next 5★ is guaranteed featured.
 * - When a 5★ drops and guaranteed: 100% featured.
 */

export const PRIMOS_PER_WISH = 160;
export const HARD_PITY = 90;
export const MAX_BUDGET = 180;
export const DISTRIBUTION_MILESTONES = [30, 60, 74, 80, 90, 120, 150, 180] as const;

export const CAPTURING_RADIANCE_NOTE =
  'Capturing Radiance is not modelled; in-game, it slightly improves featured odds beyond the 50/50 shown here.';
export const BANNER_SCOPE_NOTE =
  "Character Event banner only — the weapon banner's Epitomized Path is not modelled.";

/**
 * Probability of pulling a 5★ on pull number n (1..90) since the last 5★
 */
export function getSinglePullProb(pullNumber: number): number {
  const n = Math.min(90, Math.max(1, pullNumber));
  if (n < 74) return 0.006;
  if (n >= 90) return 1.0;
  return 0.006 + 0.06 * (n - 73);
}

export interface SingleRunResult {
  pullsUsed: number;
  gotAny5Star: boolean;
  gotFeatured: boolean;
  first5StarPulls: number; // pulls used when first 5★ dropped, or budget if none
}

/**
 * Simulates a single player wish session starting from a given pity count and guarantee state.
 * Pulls one at a time until the featured 5★ is obtained or the pull budget is exhausted.
 */
export function simulateSingleRun(
  startingPity: number,
  startingGuarantee: boolean,
  budget: number
): SingleRunResult {
  const safePity = Math.min(89, Math.max(0, startingPity));
  const safeBudget = Math.min(MAX_BUDGET, Math.max(1, budget));

  let currentPity = safePity;
  let isGuaranteed = startingGuarantee;
  let pullsUsed = 0;
  let first5StarPulls: number | null = null;
  let gotAny5Star = false;
  let gotFeatured = false;

  while (pullsUsed < safeBudget) {
    pullsUsed++;
    currentPity++;
    const prob = getSinglePullProb(currentPity);

    if (Math.random() < prob) {
      if (!gotAny5Star) {
        gotAny5Star = true;
        first5StarPulls = pullsUsed;
      }
      currentPity = 0;

      if (isGuaranteed) {
        gotFeatured = true;
        break;
      } else {
        if (Math.random() < 0.5) {
          gotFeatured = true;
          break;
        } else {
          isGuaranteed = true;
        }
      }
    }
  }

  return {
    pullsUsed,
    gotAny5Star,
    gotFeatured,
    first5StarPulls: first5StarPulls ?? safeBudget
  };
}

export interface SimulationParams {
  startingPity: number;
  guaranteeOn: boolean;
  budget: number;
  numRuns: number;
}

export interface MilestoneRow {
  pulls: number;
  featuredSuccessPct: number;
  primosEquivalent: number;
}

export interface SimulationResult {
  numRuns: number;
  budget: number;
  budgetPrimogems: number;
  startingPity: number;
  guaranteeOn: boolean;
  featuredSuccessPct: number;
  any5StarSuccessPct: number;
  avgPullsToFirst5Star: number;
  avgPullsToFeatured: number | null;
  avgPrimosToFeatured: number | null;
  milestones: MilestoneRow[];
  runsNeverGot5StarCount: number;
}

/**
 * Runs a Monte Carlo batch of simulated wish sessions and computes statistical aggregates.
 */
export function runWishSimulation(params: SimulationParams): SimulationResult {
  const { startingPity, guaranteeOn, budget, numRuns } = params;
  const safeRuns = Math.max(100, Math.min(100000, numRuns));
  const safeBudget = Math.min(MAX_BUDGET, Math.max(10, budget));

  let featuredSuccessCount = 0;
  let any5StarCount = 0;
  let totalFirst5Pulls = 0;
  let totalFeaturedPulls = 0;
  let neverGot5StarCount = 0;

  // Track milestone hits
  const applicableMilestones = DISTRIBUTION_MILESTONES.filter((m) => m <= safeBudget);
  const milestoneHits = new Map<number, number>();
  for (const m of applicableMilestones) {
    milestoneHits.set(m, 0);
  }

  for (let i = 0; i < safeRuns; i++) {
    const run = simulateSingleRun(startingPity, guaranteeOn, safeBudget);

    if (run.gotAny5Star) {
      any5StarCount++;
    } else {
      neverGot5StarCount++;
    }

    totalFirst5Pulls += run.first5StarPulls;

    if (run.gotFeatured) {
      featuredSuccessCount++;
      totalFeaturedPulls += run.pullsUsed;

      for (const m of applicableMilestones) {
        if (run.pullsUsed <= m) {
          milestoneHits.set(m, (milestoneHits.get(m) ?? 0) + 1);
        }
      }
    }
  }

  const featuredSuccessPct = Number(((featuredSuccessCount / safeRuns) * 100).toFixed(1));
  const any5StarSuccessPct = Number(((any5StarCount / safeRuns) * 100).toFixed(1));
  const avgPullsToFirst5Star = Number((totalFirst5Pulls / safeRuns).toFixed(1));
  const avgPullsToFeatured =
    featuredSuccessCount > 0 ? Number((totalFeaturedPulls / featuredSuccessCount).toFixed(1)) : null;
  const avgPrimosToFeatured =
    avgPullsToFeatured !== null ? Math.round(avgPullsToFeatured * PRIMOS_PER_WISH) : null;

  const milestones: MilestoneRow[] = applicableMilestones.map((m) => ({
    pulls: m,
    featuredSuccessPct: Number((((milestoneHits.get(m) ?? 0) / safeRuns) * 100).toFixed(1)),
    primosEquivalent: m * PRIMOS_PER_WISH
  }));

  return {
    numRuns: safeRuns,
    budget: safeBudget,
    budgetPrimogems: safeBudget * PRIMOS_PER_WISH,
    startingPity,
    guaranteeOn,
    featuredSuccessPct,
    any5StarSuccessPct,
    avgPullsToFirst5Star,
    avgPullsToFeatured,
    avgPrimosToFeatured,
    milestones,
    runsNeverGot5StarCount: neverGot5StarCount
  };
}
