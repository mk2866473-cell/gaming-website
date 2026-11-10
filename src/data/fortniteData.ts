/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Centralized Fortnite game data, constants, weapon statistics, sensitivity scaling, and battle pass curves.

export const FORTNITE_CONSTANTS = {
  XP_PER_LEVEL: 80000, // Standardized 80,000 XP per level since Chapter 3/4/5
  BATTLE_PASS_TIER_100_LEVEL: 100, // 8,000,000 XP
  SUPER_STYLES_LEVEL: 150, // 12,000,000 XP
  MAX_BONUS_REWARDS_LEVEL: 200, // 16,000,000 XP
  MAX_ACCOUNT_LEVEL: 1000,
  DAILY_CREATIVE_XP_CAP: 400000, // Approx 5 levels per day
  DAILY_STW_XP_CAP: 320000, // Save the World daily XP cap
  BATTLE_STARS_PER_LEVEL: 5,
  TILE_HEIGHT_METERS: 5.12, // Standard Fortnite building wall height in meters (~5.12m)
  MAX_HP: 100,
  MAX_SHIELD: 100,
  OVERSHIELD_ZERO_BUILD: 50 // Zero Build auto-recharging 50 Overshield
};

export interface ProPlayerSens {
  name: string;
  team: string;
  dpi: number;
  sensX: number; // in percent (e.g. 6.0%)
  sensY: number;
  edpi: number;
  mouse: string;
}

export const FORTNITE_PRO_SENSITIVITIES: ProPlayerSens[] = [
  { name: 'Bugha', team: 'Dignitas (World Cup Champ)', dpi: 800, sensX: 6.0, sensY: 6.0, edpi: 48, mouse: 'Logitech G Pro X Superlight' },
  { name: 'Clix', team: 'XSET', dpi: 800, sensX: 8.5, sensY: 8.5, edpi: 68, mouse: 'Finalmouse UltralightX' },
  { name: 'Mongraal', team: 'FaZe Clan', dpi: 800, sensX: 7.2, sensY: 7.2, edpi: 57.6, mouse: 'Logitech G Pro X Superlight 2' },
  { name: 'MrSavage', team: '00Nation', dpi: 1450, sensX: 8.0, sensY: 8.0, edpi: 116, mouse: 'Razer Viper V2 Pro' },
  { name: 'TaySon', team: 'Falcons Esports (3x FNCS)', dpi: 800, sensX: 6.2, sensY: 6.2, edpi: 49.6, mouse: 'Logitech G Pro X' },
  { name: 'Mero', team: 'Dignitas (Global Champ)', dpi: 800, sensX: 7.0, sensY: 7.0, edpi: 56, mouse: 'Controller / PC Hybrid' }
];

export interface FortniteWeaponItem {
  id: string;
  name: string;
  category: 'shotgun' | 'ar' | 'smg' | 'sniper' | 'pistol';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  damage: number;
  fireRate: number; // shots per sec
  headshotMultiplier: number;
  magazineSize: number;
  reloadTime: number;
}

export const FORTNITE_WEAPONS: FortniteWeaponItem[] = [
  // Shotguns
  { id: 'pump-leg', name: 'Hammer / Pump Shotgun', category: 'shotgun', rarity: 'Legendary', damage: 105, fireRate: 0.75, headshotMultiplier: 1.85, magazineSize: 5, reloadTime: 3.7 },
  { id: 'pump-epic', name: 'Hammer / Pump Shotgun', category: 'shotgun', rarity: 'Epic', damage: 99, fireRate: 0.75, headshotMultiplier: 1.85, magazineSize: 5, reloadTime: 4.0 },
  { id: 'gatekeeper-mythic', name: 'Gatekeeper Shotgun (Mythic)', category: 'shotgun', rarity: 'Mythic', damage: 92, fireRate: 1.5, headshotMultiplier: 1.75, magazineSize: 3, reloadTime: 2.1 },
  { id: 'gatekeeper-leg', name: 'Gatekeeper Shotgun', category: 'shotgun', rarity: 'Legendary', damage: 85, fireRate: 1.5, headshotMultiplier: 1.75, magazineSize: 3, reloadTime: 2.3 },
  { id: 'auto-shotgun-leg', name: 'Frenzy Auto Shotgun', category: 'shotgun', rarity: 'Legendary', damage: 75, fireRate: 2.2, headshotMultiplier: 1.65, magazineSize: 8, reloadTime: 4.2 },

  // Assault Rifles
  { id: 'striker-ar-leg', name: 'Striker AR / Nemesis AR', category: 'ar', rarity: 'Legendary', damage: 34, fireRate: 6.25, headshotMultiplier: 1.5, magazineSize: 30, reloadTime: 2.2 },
  { id: 'striker-ar-epic', name: 'Striker AR / Nemesis AR', category: 'ar', rarity: 'Epic', damage: 32, fireRate: 6.25, headshotMultiplier: 1.5, magazineSize: 30, reloadTime: 2.4 },
  { id: 'warforged-ar-mythic', name: 'Warforged Assault Rifle', category: 'ar', rarity: 'Mythic', damage: 37, fireRate: 6.8, headshotMultiplier: 1.5, magazineSize: 30, reloadTime: 2.0 },

  // SMGs
  { id: 'combat-smg-leg', name: 'Combat SMG / Thunder Burst', category: 'smg', rarity: 'Legendary', damage: 24, fireRate: 12.0, headshotMultiplier: 1.65, magazineSize: 32, reloadTime: 2.1 },
  { id: 'harbinger-smg-leg', name: 'Harbinger SMG', category: 'smg', rarity: 'Legendary', damage: 23, fireRate: 11.5, headshotMultiplier: 1.65, magazineSize: 30, reloadTime: 1.9 },

  // Snipers / DMR
  { id: 'reaper-sniper-leg', name: 'Reaper Sniper Rifle', category: 'sniper', rarity: 'Legendary', damage: 121, fireRate: 0.33, headshotMultiplier: 2.5, magazineSize: 3, reloadTime: 3.5 },
  { id: 'huntress-dmr-leg', name: 'Huntress DMR', category: 'sniper', rarity: 'Legendary', damage: 68, fireRate: 2.0, headshotMultiplier: 1.75, magazineSize: 14, reloadTime: 2.4 }
];

export interface StormPhase {
  phase: number;
  waitDurationSec: number;
  shrinkDurationSec: number;
  damagePerSec: number;
  radiusMeters: number;
}

export const FORTNITE_STORM_PHASES: StormPhase[] = [
  { phase: 1, waitDurationSec: 180, shrinkDurationSec: 180, damagePerSec: 1, radiusMeters: 1050 },
  { phase: 2, waitDurationSec: 150, shrinkDurationSec: 120, damagePerSec: 1, radiusMeters: 750 },
  { phase: 3, waitDurationSec: 120, shrinkDurationSec: 90, damagePerSec: 2, radiusMeters: 525 },
  { phase: 4, waitDurationSec: 90, shrinkDurationSec: 75, damagePerSec: 2, radiusMeters: 350 },
  { phase: 5, waitDurationSec: 75, shrinkDurationSec: 60, damagePerSec: 5, radiusMeters: 220 },
  { phase: 6, waitDurationSec: 60, shrinkDurationSec: 45, damagePerSec: 5, radiusMeters: 140 },
  { phase: 7, waitDurationSec: 45, shrinkDurationSec: 40, damagePerSec: 8, radiusMeters: 90 },
  { phase: 8, waitDurationSec: 30, shrinkDurationSec: 30, damagePerSec: 10, radiusMeters: 45 },
  { phase: 9, waitDurationSec: 30, shrinkDurationSec: 30, damagePerSec: 10, radiusMeters: 0 }
];

export interface TravelSpeedMode {
  id: string;
  name: string;
  speedMetersPerSec: number;
  notes: string;
}

export const FORTNITE_TRAVEL_SPEEDS: TravelSpeedMode[] = [
  { id: 'jogging', name: 'Standard Jog / Run', speedMetersPerSec: 4.8, notes: 'Default weapon-equipped running speed' },
  { id: 'sprinting', name: 'Tactical Sprint (Stamina)', speedMetersPerSec: 7.2, notes: 'Consumes stamina bar (up to ~6s)' },
  { id: 'sliding-downhill', name: 'Sliding (Steep Downhill)', speedMetersPerSec: 11.5, notes: 'Faster on slopes and declines' },
  { id: 'nitro-boost', name: 'Nitro Effect Sprint', speedMetersPerSec: 10.5, notes: 'Chapter 5 Nitro infinite sprint' },
  { id: 'dirt-bike', name: 'Dirt Bike / Motorcycle', speedMetersPerSec: 18.0, notes: 'Fast off-road traverse' },
  { id: 'sports-car', name: 'Whiplash Sports Car (Boost)', speedMetersPerSec: 24.5, notes: 'Fastest paved highway vehicle' },
  { id: 'suv-car', name: 'SUV / Truck', speedMetersPerSec: 16.0, notes: 'All-terrain armored vehicle' },
  { id: 'glider-launch', name: 'Launch Pad / Glider Redeploy', speedMetersPerSec: 15.0, notes: 'Airborne flight speed' },
  { id: 'zipline', name: 'Zipline / Ascender', speedMetersPerSec: 12.0, notes: 'Fixed terrain cables' }
];
