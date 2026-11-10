/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Bg3DcPreset {
  id: string;
  name: string;
  dc: number;
  description: string;
  category: 'easy' | 'medium' | 'hard' | 'impossible';
}

export const BG3_DC_PRESETS: Bg3DcPreset[] = [
  { id: 'trivial', name: 'Trivial Check', dc: 5, description: 'Basic perception, easy lockpick', category: 'easy' },
  { id: 'easy', name: 'Easy Check', dc: 10, description: 'Standard dialogue persuasion, basic disarm trap', category: 'easy' },
  { id: 'medium', name: 'Medium Check', dc: 15, description: 'Moderate skill check, guarded NPC persuasion', category: 'medium' },
  { id: 'hard', name: 'Hard Check', dc: 20, description: 'Heavy lockpick, difficult arcane arcana check', category: 'hard' },
  { id: 'very_hard', name: 'Very Hard Check', dc: 25, description: 'Legendary boss intimidation, master vault lock', category: 'hard' },
  { id: 'impossible', name: 'Nearly Impossible', dc: 30, description: 'Netherbrain compulsion check in Act 3', category: 'impossible' },
];

export type RollMode = 'normal' | 'advantage' | 'disadvantage' | 'elven_accuracy';

export interface DiceCalculationResult {
  targetDc: number;
  totalModifier: number;
  neededD20: number; // Effective d20 roll needed (clamped 2-20)
  singleRollSuccessProb: number;
  finalSuccessPercentage: number;
  critSuccessPercentage: number;
  critFailurePercentage: number;
  averageTotalRoll: number;
  mode: RollMode;
  guidanceActive: boolean;
  bardicInspirationDie: number; // 0, 4, 6, 8, 10
}

/**
 * Calculates exact BG3 d20 probability taking into account D&D 5e Rules & Critical Success/Failure
 */
export function calculateDiceProbability(
  dc: number,
  modifier: number,
  mode: RollMode,
  guidance: boolean = false,
  bardicDie: number = 0
): DiceCalculationResult {
  // Base raw required d20 face value to hit DC
  const rawNeeded = dc - modifier;
  
  // D&D 5e / BG3 Critical Rules:
  // Nat 20 is always Critical Success (100% success on that die)
  // Nat 1 is always Critical Failure (0% success on that die)
  // Therefore needed d20 is clamped between 2 and 20 for standard non-crit comparison
  const neededD20 = Math.max(2, Math.min(20, rawNeeded));

  // If guidance (+1d4) or bardic (+1d6/1d8) is active, we compute exact discrete combination probabilities
  if (guidance || bardicDie > 0) {
    return calculateComplexDiceProbability(dc, modifier, mode, guidance, bardicDie);
  }

  // Standard d20 success probability
  let singleSuccessCount = 0;
  if (rawNeeded <= 1) {
    // Needs <= 1, so rolls 2 through 20 succeed (19 faces) because 1 is Nat 1 Crit Fail
    singleSuccessCount = 19;
  } else if (rawNeeded >= 20) {
    // Needs >= 20, so only Nat 20 succeeds (1 face)
    singleSuccessCount = 1;
  } else {
    // Needs rawNeeded (between 2 and 19)
    singleSuccessCount = 21 - rawNeeded;
  }

  const pSingle = singleSuccessCount / 20;

  // Mode calculations
  let finalSuccessProb = pSingle;
  let critSuccessProb = 1 / 20;
  let critFailProb = 1 / 20;

  if (mode === 'advantage') {
    finalSuccessProb = 1 - Math.pow(1 - pSingle, 2);
    critSuccessProb = 1 - Math.pow(19 / 20, 2); // 9.75%
    critFailProb = Math.pow(1 / 20, 2); // 0.25%
  } else if (mode === 'disadvantage') {
    finalSuccessProb = Math.pow(pSingle, 2);
    critSuccessProb = Math.pow(1 / 20, 2); // 0.25%
    critFailProb = 1 - Math.pow(19 / 20, 2); // 9.75%
  } else if (mode === 'elven_accuracy') {
    finalSuccessProb = 1 - Math.pow(1 - pSingle, 3);
    critSuccessProb = 1 - Math.pow(19 / 20, 3); // 14.26%
    critFailProb = Math.pow(1 / 20, 3); // 0.0125%
  }

  // Average expected d20 roll
  let avgD20 = 10.5;
  if (mode === 'advantage') avgD20 = 13.825;
  if (mode === 'disadvantage') avgD20 = 7.175;
  if (mode === 'elven_accuracy') avgD20 = 15.487;

  return {
    targetDc: dc,
    totalModifier: modifier,
    neededD20,
    singleRollSuccessProb: pSingle * 100,
    finalSuccessPercentage: Math.round(finalSuccessProb * 10000) / 100,
    critSuccessPercentage: Math.round(critSuccessProb * 10000) / 100,
    critFailurePercentage: Math.round(critFailProb * 10000) / 100,
    averageTotalRoll: Math.round((avgD20 + modifier) * 10) / 10,
    mode,
    guidanceActive: false,
    bardicInspirationDie: 0,
  };
}

/**
 * Computes exact probability distribution when extra dice like Guidance (1d4) or Bardic Inspiration are active.
 */
function calculateComplexDiceProbability(
  dc: number,
  modifier: number,
  mode: RollMode,
  guidance: boolean,
  bardicDie: number
): DiceCalculationResult {
  const bonusDiceCombinations: number[] = [];
  const gMax = guidance ? 4 : 1;
  const bMax = bardicDie > 0 ? bardicDie : 1;

  for (let g = 1; g <= gMax; g++) {
    for (let b = 1; b <= bMax; b++) {
      const bonus = (guidance ? g : 0) + (bardicDie > 0 ? b : 0);
      bonusDiceCombinations.push(bonus);
    }
  }

  let successCount = 0;
  let totalCombos = 0;

  if (mode === 'normal') {
    for (let d = 1; d <= 20; d++) {
      for (const b of bonusDiceCombinations) {
        totalCombos++;
        if (d === 20) {
          successCount++;
        } else if (d === 1) {
          // Nat 1
        } else if (d + modifier + b >= dc) {
          successCount++;
        }
      }
    }
  } else if (mode === 'advantage') {
    for (let d1 = 1; d1 <= 20; d1++) {
      for (let d2 = 1; d2 <= 20; d2++) {
        const d = Math.max(d1, d2);
        for (const b of bonusDiceCombinations) {
          totalCombos++;
          if (d === 20) {
            successCount++;
          } else if (d === 1) {
            // Nat 1
          } else if (d + modifier + b >= dc) {
            successCount++;
          }
        }
      }
    }
  } else if (mode === 'disadvantage') {
    for (let d1 = 1; d1 <= 20; d1++) {
      for (let d2 = 1; d2 <= 20; d2++) {
        const d = Math.min(d1, d2);
        for (const b of bonusDiceCombinations) {
          totalCombos++;
          if (d === 20) {
            successCount++;
          } else if (d === 1) {
            // Nat 1
          } else if (d + modifier + b >= dc) {
            successCount++;
          }
        }
      }
    }
  } else if (mode === 'elven_accuracy') {
    for (let d1 = 1; d1 <= 20; d1++) {
      for (let d2 = 1; d2 <= 20; d2++) {
        for (let d3 = 1; d3 <= 20; d3++) {
          const d = Math.max(d1, d2, d3);
          for (const b of bonusDiceCombinations) {
            totalCombos++;
            if (d === 20) {
              successCount++;
            } else if (d === 1) {
              // Nat 1
            } else if (d + modifier + b >= dc) {
              successCount++;
            }
          }
        }
      }
    }
  }

  const finalProb = successCount / totalCombos;
  const rawNeeded = dc - modifier;
  const neededD20 = Math.max(2, Math.min(20, rawNeeded));

  let critSuccessProb = 1 / 20;
  let critFailProb = 1 / 20;
  if (mode === 'advantage') {
    critSuccessProb = 1 - Math.pow(19 / 20, 2);
    critFailProb = Math.pow(1 / 20, 2);
  } else if (mode === 'disadvantage') {
    critSuccessProb = Math.pow(1 / 20, 2);
    critFailProb = 1 - Math.pow(19 / 20, 2);
  } else if (mode === 'elven_accuracy') {
    critSuccessProb = 1 - Math.pow(19 / 20, 3);
    critFailProb = Math.pow(1 / 20, 3);
  }

  const avgBonus = (guidance ? 2.5 : 0) + (bardicDie > 0 ? (bardicDie + 1) / 2 : 0);
  let avgD20 = 10.5;
  if (mode === 'advantage') avgD20 = 13.825;
  if (mode === 'disadvantage') avgD20 = 7.175;
  if (mode === 'elven_accuracy') avgD20 = 15.487;

  return {
    targetDc: dc,
    totalModifier: modifier,
    neededD20,
    singleRollSuccessProb: Math.max(0, (21 - neededD20) / 20 * 100),
    finalSuccessPercentage: Math.round(finalProb * 10000) / 100,
    critSuccessPercentage: Math.round(critSuccessProb * 10000) / 100,
    critFailurePercentage: Math.round(critFailProb * 10000) / 100,
    averageTotalRoll: Math.round((avgD20 + modifier + avgBonus) * 10) / 10,
    mode,
    guidanceActive: guidance,
    bardicInspirationDie: bardicDie,
  };
}

export const BG3_FAQS = [
  {
    question: 'How does Advantage work in Baldur\'s Gate 3 and D&D 5e?',
    answer: 'When rolling with Advantage, you roll two twenty-sided dice (2d20) and take the higher value. This significantly increases your chance of hitting target DCs and roughly doubles your chance of landing a Critical Success (Natural 20) from 5% to 9.75%.'
  },
  {
    question: 'What is Disadvantage in BG3?',
    answer: 'When rolling with Disadvantage, you roll two d20s and take the lower value. This drops your success odds dramatically and reduces Critical Success chance down to 0.25% while raising Critical Failure (Natural 1) chance to 9.75%.'
  },
  {
    question: 'Do Natural 20s and Natural 1s always apply in BG3?',
    answer: 'Yes! In Baldur\'s Gate 3, a Natural 20 is a Critical Success that succeeds regardless of how high the target DC is (even DC 30 or DC 99). Conversely, a Natural 1 is a Critical Failure that fails regardless of your stat bonuses.'
  },
  {
    question: 'What is Elven Accuracy in D&D 5e / BG3?',
    answer: 'Elven Accuracy is a feat for Elves and Half-Elves. Whenever you have Advantage on an Attack Roll using DEX, INT, WIS, or CHA, you can re-roll one of the dice, effectively rolling three d20s and taking the highest (Super Advantage).'
  }
];
