/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PollingEventSource = 'pointerrawupdate' | 'coalesced' | 'pointermove';

export const POLLING_WINDOW_MS = 500;
export const POLLING_STOP_GAP_MS = 60;
export const POLLING_MIN_REPORTS = 20;
export const POLLING_SAMPLE_INTERVAL_MS = 100;
export const POLLING_HISTORY_LENGTH = 100; // 100 samples * 100 ms = 10 seconds

export interface PollingRateReferenceRow {
  hz: number;
  intervalMs: number;
  tierLabel: string;
}

export const POLLING_RATE_REFERENCE: PollingRateReferenceRow[] = [
  { hz: 125, intervalMs: 8, tierLabel: 'Office / Standard USB' },
  { hz: 250, intervalMs: 4, tierLabel: 'Entry Gaming' },
  { hz: 500, intervalMs: 2, tierLabel: 'Classic Competitive' },
  { hz: 1000, intervalMs: 1, tierLabel: 'Esports Standard' },
  { hz: 2000, intervalMs: 0.5, tierLabel: 'High-Speed Wireless / Wired' },
  { hz: 4000, intervalMs: 0.25, tierLabel: '4K Dongle / Low-Latency' },
  { hz: 8000, intervalMs: 0.125, tierLabel: '8K Flagship Polling' }
];

export interface PollingSessionState {
  windowTimestamps: number[];
  lastTimestamp: number | null;
  lastArrivalPerfNow: number | null;
  currentHz: number | null;
  peakHz: number | null;
  totalReportsCounted: number;
  totalMovingMs: number;
  hasValidReading: boolean;
}

export function createPollingSessionState(): PollingSessionState {
  return {
    windowTimestamps: [],
    lastTimestamp: null,
    lastArrivalPerfNow: null,
    currentHz: null,
    peakHz: null,
    totalReportsCounted: 0,
    totalMovingMs: 0,
    hasValidReading: false
  };
}

/**
 * Records a single mouse report timestamp into the rolling 500 ms window.
 * Resets the active window when the gap since the previous report exceeds 60 ms.
 * Current Hz = (N - 1) / (t_last - t_first) * 1000 once N >= 20.
 */
export function recordPollingReport(
  state: PollingSessionState,
  eventTimestamp: number,
  arrivalPerfNow: number = eventTimestamp
): PollingSessionState {
  if (!Number.isFinite(eventTimestamp)) return state;

  if (state.lastTimestamp === null || eventTimestamp - state.lastTimestamp > POLLING_STOP_GAP_MS) {
    state.windowTimestamps = [eventTimestamp];
    state.lastTimestamp = eventTimestamp;
    state.lastArrivalPerfNow = arrivalPerfNow;
    state.currentHz = null;
    return state;
  }

  // Guard against duplicate or out-of-order timestamps within the same event batch
  if (eventTimestamp < state.lastTimestamp) {
    return state;
  }

  const dt = eventTimestamp - state.lastTimestamp;
  state.windowTimestamps.push(eventTimestamp);
  state.lastTimestamp = eventTimestamp;
  state.lastArrivalPerfNow = arrivalPerfNow;

  // Prune reports outside the rolling 500 ms window
  const cutoff = eventTimestamp - POLLING_WINDOW_MS;
  while (state.windowTimestamps.length > 0 && state.windowTimestamps[0] < cutoff) {
    state.windowTimestamps.shift();
  }

  // Accumulate session moving totals across continuous windows
  state.totalReportsCounted += 1;
  state.totalMovingMs += dt;

  const n = state.windowTimestamps.length;
  if (n >= POLLING_MIN_REPORTS) {
    const span = state.windowTimestamps[n - 1] - state.windowTimestamps[0];
    if (span > 0) {
      const hz = ((n - 1) / span) * 1000;
      state.currentHz = hz;
      state.hasValidReading = true;
      if (state.peakHz === null || hz > state.peakHz) {
        state.peakHz = hz;
      }
    }
  } else {
    state.currentHz = null;
  }

  return state;
}

/**
 * Clears the active rolling window if no report has arrived for > 60 ms,
 * preserving Peak Hz and cumulative session averages.
 */
export function pruneIdlePollingWindow(
  state: PollingSessionState,
  nowPerf: number
): boolean {
  if (
    state.lastArrivalPerfNow !== null &&
    nowPerf - state.lastArrivalPerfNow > POLLING_STOP_GAP_MS
  ) {
    state.windowTimestamps = [];
    state.lastTimestamp = null;
    state.lastArrivalPerfNow = null;
    state.currentHz = null;
    return true;
  }
  return false;
}

export function getSessionAverageHz(state: PollingSessionState): number | null {
  if (!state.hasValidReading || state.totalMovingMs <= 0 || state.totalReportsCounted <= 0) {
    return null;
  }
  return (state.totalReportsCounted / state.totalMovingMs) * 1000;
}

/**
 * Pure helper for deterministic self-testing of synthetic report streams.
 */
export function measurePollingRateFromStream(timestamps: number[]): {
  currentHz: number | null;
  peakHz: number | null;
  averageHz: number | null;
  windowCount: number;
} {
  const state = createPollingSessionState();
  for (const ts of timestamps) {
    recordPollingReport(state, ts, ts);
  }
  return {
    currentHz: state.currentHz,
    peakHz: state.peakHz,
    averageHz: getSessionAverageHz(state),
    windowCount: state.windowTimestamps.length
  };
}

/**
 * TRUE-DPI ANALYSER — Exact Formulas
 */
export type DistanceUnit = 'cm' | 'in';

export interface TrueDpiInput {
  totalCounts: number;
  distance: number;
  unit: DistanceUnit;
  setDpi: number;
}

export interface TrueDpiResult {
  totalCounts: number;
  distanceInInches: number;
  distanceCm: number;
  setDpi: number;
  realDpi: number;
  deviationPercent: number;
  expectedCounts: number;
  formattedRealDpi: string;
  formattedDeviation: string;
  formattedExpectedCounts: string;
}

export function formatSignedPercent(value: number): string {
  const fixed = Math.abs(value).toFixed(2);
  if (value > 0) return `+${fixed}%`;
  if (value < 0) return `−${fixed}%`;
  return `0.00%`;
}

export function calculateTrueDpiResult(input: TrueDpiInput): TrueDpiResult {
  const totalCounts = Math.max(0, Number.isFinite(input.totalCounts) ? input.totalCounts : 0);
  const distance = Math.max(0.01, Number.isFinite(input.distance) ? input.distance : 10);
  const setDpi = Math.max(1, Number.isFinite(input.setDpi) ? input.setDpi : 800);

  const distanceInInches = input.unit === 'cm' ? distance / 2.54 : distance;
  const distanceCm = input.unit === 'cm' ? distance : distance * 2.54;

  const realDpi = totalCounts / distanceInInches;
  const deviationPercent = ((realDpi - setDpi) / setDpi) * 100;
  const expectedCounts = setDpi * distanceInInches;

  return {
    totalCounts,
    distanceInInches,
    distanceCm,
    setDpi,
    realDpi,
    deviationPercent,
    expectedCounts,
    formattedRealDpi: realDpi.toFixed(1),
    formattedDeviation: formatSignedPercent(deviationPercent),
    formattedExpectedCounts: expectedCounts.toLocaleString('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })
  };
}

/**
 * ADS / SCOPED SENSITIVITY CALCULATOR — Monitor-Distance Matching (0% / 75% / 100%)
 */
export type AdsMode = 'custom' | 'valorant' | 'cs2';
export type AdsCoefficient = 0 | 0.75 | 1;

export const VALORANT_HIPFIRE_FOV = 103;
export const VALORANT_YAW = 0.07;

export interface ValorantScopeDef {
  id: string;
  label: string;
  zoom: number;
  scopedFov: number;
  displayFov: string;
  weapons: string;
}

export const VALORANT_SCOPES: ValorantScopeDef[] = [
  {
    id: 'ads-1.15',
    label: '1.15× ADS',
    zoom: 1.15,
    scopedFov: VALORANT_HIPFIRE_FOV / 1.15,
    displayFov: '89.57°',
    weapons: 'Stinger, Spectre, Ares, Odin'
  },
  {
    id: 'ads-1.25',
    label: '1.25× ADS',
    zoom: 1.25,
    scopedFov: VALORANT_HIPFIRE_FOV / 1.25,
    displayFov: '82.40°',
    weapons: 'Vandal, Phantom, Bulldog'
  },
  {
    id: 'ads-1.5',
    label: '1.5× ADS',
    zoom: 1.5,
    scopedFov: VALORANT_HIPFIRE_FOV / 1.5,
    displayFov: '68.67°',
    weapons: 'Guardian, Headhunter'
  },
  {
    id: 'scoped-2.5',
    label: '2.5× Scoped',
    zoom: 2.5,
    scopedFov: VALORANT_HIPFIRE_FOV / 2.5,
    displayFov: '41.20°',
    weapons: 'Operator zoom 1, Tour de Force'
  },
  {
    id: 'scoped-3.5',
    label: '3.5× Scoped',
    zoom: 3.5,
    scopedFov: VALORANT_HIPFIRE_FOV / 3.5,
    displayFov: '29.43°',
    weapons: 'Marshal, Outlaw'
  },
  {
    id: 'scoped-5',
    label: '5× Scoped',
    zoom: 5,
    scopedFov: VALORANT_HIPFIRE_FOV / 5,
    displayFov: '20.60°',
    weapons: 'Operator zoom 2'
  }
];

export const CS2_HIPFIRE_FOV_43 = 90;
export const CS2_YAW = 0.022;

export interface Cs2ScopeDef {
  id: string;
  label: string;
  scopedFov43: number;
  weapons: string;
}

export const CS2_SCOPES: Cs2ScopeDef[] = [
  {
    id: 'awp-ssg-z1',
    label: 'AWP & SSG 08 Zoom 1',
    scopedFov43: 40,
    weapons: 'AWP & SSG 08 (first zoom)'
  },
  {
    id: 'aug-sg553',
    label: 'AUG & SG 553',
    scopedFov43: 45,
    weapons: 'AUG & SG 553'
  },
  {
    id: 'ssg-z2',
    label: 'SSG 08 Zoom 2',
    scopedFov43: 15,
    weapons: 'SSG 08 (second zoom)'
  },
  {
    id: 'awp-z2',
    label: 'AWP Zoom 2',
    scopedFov43: 10,
    weapons: 'AWP (second zoom)'
  }
];

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Exact Monitor-Distance Multiplier:
 * c = 0 -> tan(S/2) / tan(H/2)
 * c = 1 -> S / H
 * general -> atan(c * tan(S/2)) / atan(c * tan(H/2))
 */
export function computeMonitorDistanceMultiplier(
  hipfireFovDeg: number,
  scopedFovDeg: number,
  coefficient: number
): number {
  const H = Math.min(179, Math.max(0.1, hipfireFovDeg));
  const S = Math.min(179, Math.max(0.1, scopedFovDeg));
  if (coefficient === 0) {
    return Math.tan(degToRad(S / 2)) / Math.tan(degToRad(H / 2));
  }
  if (coefficient === 1) {
    return S / H;
  }
  return Math.atan(coefficient * Math.tan(degToRad(S / 2))) / Math.atan(coefficient * Math.tan(degToRad(H / 2)));
}

export function computeCm360(sens: number, yaw: number, dpi: number): number {
  const safeSens = Math.max(0.0001, sens);
  const safeYaw = Math.max(0.00001, yaw);
  const safeDpi = Math.max(1, dpi);
  return (2.54 * 360) / (safeSens * safeYaw * safeDpi);
}

export interface CustomAdsInput {
  hipfireSens: number;
  dpi: number;
  yaw: number;
  hipfireFov: number;
  scopedFov: number;
  coefficient: AdsCoefficient;
}

export interface CustomAdsResult {
  multiplier: number;
  scopedSens: number;
  hipfireCm360: number;
  scopedCm360: number;
}

export function calculateCustomAdsSensitivity(input: CustomAdsInput): CustomAdsResult {
  const multiplier = computeMonitorDistanceMultiplier(
    input.hipfireFov,
    input.scopedFov,
    input.coefficient
  );
  const safeHipSens = Math.max(0.0001, input.hipfireSens);
  const scopedSens = safeHipSens * multiplier;
  const hipfireCm360 = computeCm360(safeHipSens, input.yaw, input.dpi);
  const scopedCm360 = hipfireCm360 / multiplier;
  return {
    multiplier,
    scopedSens,
    hipfireCm360,
    scopedCm360
  };
}

export interface ValorantScopeRow {
  scope: ValorantScopeDef;
  inGameMultiplier: number;
  mult0: number;
  mult75: number;
  mult100: number;
  scopedCm360: number;
}

export function calculateValorantAdsTable(
  hipfireSens: number,
  dpi: number,
  coefficient: AdsCoefficient
): { hipfireCm360: number; rows: ValorantScopeRow[] } {
  const hipfireCm360 = computeCm360(hipfireSens, VALORANT_YAW, dpi);
  const rows = VALORANT_SCOPES.map((scope) => {
    const m1 = computeMonitorDistanceMultiplier(VALORANT_HIPFIRE_FOV, scope.scopedFov, 1);
    const m0 = computeMonitorDistanceMultiplier(VALORANT_HIPFIRE_FOV, scope.scopedFov, 0);
    const m75 = computeMonitorDistanceMultiplier(VALORANT_HIPFIRE_FOV, scope.scopedFov, 0.75);
    const mSelected = computeMonitorDistanceMultiplier(
      VALORANT_HIPFIRE_FOV,
      scope.scopedFov,
      coefficient
    );
    return {
      scope,
      inGameMultiplier: mSelected / m1,
      mult0: m0 / m1,
      mult75: m75 / m1,
      mult100: 1,
      scopedCm360: hipfireCm360 / mSelected
    };
  });
  return { hipfireCm360, rows };
}

export interface Cs2ScopeRow {
  scope: Cs2ScopeDef;
  zoomSensitivityRatio: number;
  ratio0: number;
  ratio75: number;
  ratio100: number;
  scopedCm360: number;
}

export function calculateCs2ZoomTable(
  hipfireSens: number,
  dpi: number,
  coefficient: AdsCoefficient
): { hipfireCm360: number; rows: Cs2ScopeRow[] } {
  const hipfireCm360 = computeCm360(hipfireSens, CS2_YAW, dpi);
  const rows = CS2_SCOPES.map((scope) => {
    const m1 = computeMonitorDistanceMultiplier(CS2_HIPFIRE_FOV_43, scope.scopedFov43, 1);
    const m0 = computeMonitorDistanceMultiplier(CS2_HIPFIRE_FOV_43, scope.scopedFov43, 0);
    const m75 = computeMonitorDistanceMultiplier(CS2_HIPFIRE_FOV_43, scope.scopedFov43, 0.75);
    const mSelected = computeMonitorDistanceMultiplier(
      CS2_HIPFIRE_FOV_43,
      scope.scopedFov43,
      coefficient
    );
    return {
      scope,
      zoomSensitivityRatio: mSelected / m1,
      ratio0: m0 / m1,
      ratio75: m75 / m1,
      ratio100: 1,
      scopedCm360: hipfireCm360 / mSelected
    };
  });
  return { hipfireCm360, rows };
}

