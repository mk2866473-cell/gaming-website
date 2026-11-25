/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Verified Grand Theft Auto VI (GTA 6) cheat codes data.
 * Single source of truth imported by the GTA 6 Cheat Code Finder tool.
 */

export type CheatCategory = 'Player' | 'Combat' | 'Vehicle' | 'Environment' | 'Filters';
export type CheatInputStatus = 'verified' | 'unconfirmed' | 'undiscovered';

export interface Gta6Cheat {
  name: string;
  category: CheatCategory;
  effect: string;
  unlock: string;
  input: string | null;        // word form, e.g. "Up, Right, Down, Left" — null when undiscovered
  inputArrows: string | null;  // arrow form, e.g. "↑ → ↓ ←" — null when undiscovered
  inputStatus: CheatInputStatus;
}

export const GTA6_CHEATS_LAST_CHECKED = '25 November 2026';

export const GTA6_HOW_TO_ENTER: string[] = [
  'Finish the main story first — every cheat stays locked until the credits roll, even if you know its input.',
  'Press Up on the D-pad to open your in-game phone.',
  'Hold L1 (PS5) or LB (Xbox) and press R1 or RB.',
  "Enter the cheat's D-pad sequence. The sequences are identical on PS5 and Xbox Series X|S.",
  'Check which cheats you have unlocked under Progress > Cheats in the menu.'
];

export const GTA6_CHEAT_PENALTIES: string[] = [
  'Activating a cheat disables trophies and achievements for the rest of that play session.',
  'You cannot save the game while a cheat is active — so cash from the $250,000 cheat cannot be carried into a normal save. Make a clean save before using cheats.'
];

export const GTA6_CHEAT_CATEGORIES: CheatCategory[] = [
  'Player',
  'Combat',
  'Vehicle',
  'Environment',
  'Filters'
];

export const GTA6_CHEATS: Gta6Cheat[] = [
  // PLAYER (10)
  {
    name: '$250,000',
    category: 'Player',
    effect: 'Instantly gives you $250,000',
    unlock: 'Finish the story',
    input: 'Up, Right, Down, Left, Up, Left, Down, Right',
    inputArrows: '↑ → ↓ ← ↑ ← ↓ →',
    inputStatus: 'verified'
  },
  {
    name: 'Drunk',
    category: 'Player',
    effect: 'Instantly makes you and your partner drunk',
    unlock: 'Spend $2,500 on alcohol',
    input: 'Up, Left, Right, Up, Up, Left, Right, Up, Left, Right',
    inputArrows: '↑ ← → ↑ ↑ ← → ↑ ← →',
    inputStatus: 'verified'
  },
  {
    name: 'Raise Heat Level',
    category: 'Player',
    effect: 'Raises your heat level across the map',
    unlock: 'Lose a 3-star wanted level 25 times',
    input: 'Left, Down, Right, Down, Up, Down, Up',
    inputArrows: '← ↓ → ↓ ↑ ↓ ↑',
    inputStatus: 'verified'
  },
  {
    name: 'Raise Wanted Level',
    category: 'Player',
    effect: 'Raises your wanted level across the map',
    unlock: 'Lose a 3-star wanted level 50 times',
    input: 'Left, Down, Right, Down, Up, Right, Up',
    inputArrows: '← ↓ → ↓ ↑ → ↑',
    inputStatus: 'verified'
  },
  {
    name: 'Unlimited Focus',
    category: 'Player',
    effect: 'Focus never runs out',
    unlock: 'Finish the story',
    input: 'Down, Up, Up, Down, Up, Down, Up, Down, Up, Right',
    inputArrows: '↓ ↑ ↑ ↓ ↑ ↓ ↑ ↓ ↑ →',
    inputStatus: 'verified'
  },
  {
    name: 'No Fall Damage',
    category: 'Player',
    effect: 'You are immune to fall damage',
    unlock: 'Survive a freefall from 40 feet 20 times',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Parachute',
    category: 'Player',
    effect: 'Adds a parachute to your loadout',
    unlock: 'Complete 50 skydives or BASE jumps from 300 feet or higher',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Body Armor',
    category: 'Player',
    effect: 'Adds body armor to your loadout',
    unlock: 'Complete 100 workouts',
    input: 'Down, Up, Left, Up, Up, Up, Up, Up, Down, Down',
    inputArrows: '↓ ↑ ← ↑ ↑ ↑ ↑ ↑ ↓ ↓',
    inputStatus: 'verified'
  },
  {
    name: 'Repair Vehicle',
    category: 'Player',
    effect: 'Fully repairs your current vehicle',
    unlock: 'Win 1st place in 10 races at Gellhorn Raceway, Thrillbilly Mud Club, and Boone Speedway',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Unlimited Nitrous',
    category: 'Player',
    effect: 'Nitrous and fuel never run out on vehicles',
    unlock: 'Complete 50 stunt jumps',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },

  // COMBAT (11)
  {
    name: 'Max Ammo',
    category: 'Combat',
    effect: 'Fills all ammo to maximum',
    unlock: 'Win 25 bronze medals or higher at shooting ranges',
    input: 'Down, Up, Right, Down, Left, Left, Up, Up, Down, Left',
    inputArrows: '↓ ↑ → ↓ ← ← ↑ ↑ ↓ ←',
    inputStatus: 'verified'
  },
  {
    name: 'Infinite Ammo',
    category: 'Combat',
    effect: 'Ammo never runs out',
    unlock: 'Win 25 silver medals or higher at shooting ranges',
    input: 'Down, Up, Right, Down, Left, Left, Up, Down, Down, Down',
    inputArrows: '↓ ↑ → ↓ ← ← ↑ ↓ ↓ ↓',
    inputStatus: 'verified'
  },
  {
    name: 'No Reload',
    category: 'Combat',
    effect: 'Ammo never runs out, with no need to reload',
    unlock: 'Win 25 gold medals at shooting ranges',
    input: 'Down, Up, Right, Down, Left, Left, Up, Down, Down, Up',
    inputArrows: '↓ ↑ → ↓ ← ← ↑ ↓ ↓ ↑',
    inputStatus: 'verified'
  },
  {
    name: 'All Explosive Weapons',
    category: 'Combat',
    effect: 'Adds all explosive weapons to your loadout with full ammo',
    unlock: 'Throw 100 grenades',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Incendiary Ammo',
    category: 'Combat',
    effect: 'All ammo is incendiary',
    unlock: 'Burn 100 enemies with fire damage',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Exploding Bottles',
    category: 'Combat',
    effect: 'Bottles explode when damaged',
    unlock: 'Throw 100 molotovs',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Explosive Shotgun',
    category: 'Combat',
    effect: 'Adds a Mason & Keen Shortstraw that fires explosive shells',
    unlock: 'Hit 100 enemies with explosive damage',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Hauners H-AT',
    category: 'Combat',
    effect: 'Adds a Hauners H-AT to your loadout',
    unlock: 'Blow up 100 vehicles',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Attack Force',
    category: 'Combat',
    effect: 'Bullets and melee attacks launch targets on impact',
    unlock: 'Finish the story',
    input: 'Down, Up, Left, Left, Right, Down, Down, Up, Down',
    inputArrows: '↓ ↑ ← ← → ↓ ↓ ↑ ↓',
    inputStatus: 'verified'
  },
  {
    name: 'Exploding Balls',
    category: 'Combat',
    effect: 'Sports balls explode on impact',
    unlock: 'Hit 20 enemies with explosive damage',
    input: 'Down, Up, Left, Left, Right, Down, Down, Up, Right',
    inputArrows: '↓ ↑ ← ← → ↓ ↓ ↑ →',
    inputStatus: 'verified'
  },
  {
    name: 'Vehicle Force',
    category: 'Combat',
    effect: 'Vehicle collisions launch targets',
    unlock: 'Kill 25 enemies with a vehicle (civilians count)',
    input: 'Down, Up, Left, Left, Right, Down, Left, Up, Down',
    inputArrows: '↓ ↑ ← ← → ↓ ← ↑ ↓',
    inputStatus: 'verified'
  },

  // VEHICLE (21)
  {
    name: 'Speeder 700 GT',
    category: 'Vehicle',
    effect: 'Spawns a Speeder 700 GT',
    unlock: 'Complete 5 combat challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Bravado Banshee',
    category: 'Vehicle',
    effect: 'Spawns a Bravado Banshee',
    unlock: 'Complete all combat challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Maibatsu Sanchez',
    category: 'Vehicle',
    effect: 'Spawns a Maibatsu Sanchez',
    unlock: 'Complete 5 criminal challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Western Zombie Bobber',
    category: 'Vehicle',
    effect: 'Spawns a Western Zombie Bobber',
    unlock: 'Complete all criminal challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Nagasaki Sea Sparrow',
    category: 'Vehicle',
    effect: 'Spawns a Nagasaki Sea Sparrow',
    unlock: 'Complete 5 exploration challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Nagasaki Carbon RS',
    category: 'Vehicle',
    effect: 'Spawns a Nagasaki Carbon RS',
    unlock: 'Complete all exploration challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Tuff BMX',
    category: 'Vehicle',
    effect: 'Spawns a Tuff BMX',
    unlock: 'Complete 5 fitness challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: "'65 Vapid Dominator",
    category: 'Vehicle',
    effect: "Spawns a '65 Vapid Dominator",
    unlock: 'Complete all fitness challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Maibatsu Boomazoom',
    category: 'Vehicle',
    effect: 'Spawns a Maibatsu Boomazoom',
    unlock: 'Complete 5 shopping challenges',
    input: 'Left, Up, Right, Down, Left, Left, Up, Left',
    inputArrows: '← ↑ → ↓ ← ← ↑ ←',
    inputStatus: 'verified'
  },
  {
    name: 'Truffade Thrax',
    category: 'Vehicle',
    effect: 'Spawns a Truffade Thrax',
    unlock: 'Complete all shopping challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Vapid Stanier G2 Taxi',
    category: 'Vehicle',
    effect: 'Spawns a Vapid Stanier G2 Taxi',
    unlock: 'Complete 5 sports challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Brimstone Golfer',
    category: 'Vehicle',
    effect: 'Spawns a Brimstone Golfer',
    unlock: 'Complete all sports challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Airboat 09',
    category: 'Vehicle',
    effect: 'Spawns an Airboat 09',
    unlock: 'Complete 5 survival challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Hauners Rhino Tank',
    category: 'Vehicle',
    effect: 'Spawns a Hauners Rhino Tank',
    unlock: 'Complete all survival challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Lapwing Mallard',
    category: 'Vehicle',
    effect: 'Spawns a Lapwing Mallard',
    unlock: 'Complete 5 vehicle challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Progen Emerus',
    category: 'Vehicle',
    effect: 'Spawns a Progen Emerus',
    unlock: 'Complete all vehicle challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Hauners P-996 Lazer',
    category: 'Vehicle',
    effect: 'Spawns a Hauners P-996 Lazer',
    unlock: 'Complete all challenges',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Interstate Ambulance',
    category: 'Vehicle',
    effect: 'Spawns an Interstate Ambulance',
    unlock: 'Discover the Interstate Ambulance in the Progress menu',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'MTL Pumper',
    category: 'Vehicle',
    effect: 'Spawns an MTL Pumper',
    unlock: 'Discover the MTL Pumper in the Progress menu',
    input: 'Left, Up, Right, Down, Left, Right, Right, Up',
    inputArrows: '← ↑ → ↓ ← → → ↑',
    inputStatus: 'verified'
  },
  {
    name: 'HVY Bulldozer',
    category: 'Vehicle',
    effect: 'Spawns an HVY Bulldozer',
    unlock: 'Discover the HVY Bulldozer in the Progress menu',
    input: 'Left, Up, Right, Down, Left, Right, Right, Down',
    inputArrows: '← ↑ → ↓ ← → → ↓',
    inputStatus: 'verified'
  },
  {
    name: 'Inflatable Flamingo',
    category: 'Vehicle',
    effect: 'Spawns an Inflatable Flamingo',
    unlock: 'Destroy 50 cocaine flamingos',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },

  // ENVIRONMENT (3)
  {
    name: 'Move Time Forward',
    category: 'Environment',
    effect: 'Moves the time of day forward',
    unlock: 'Find 10 collectible watches',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Pause Time of Day',
    category: 'Environment',
    effect: 'Pauses the time of day',
    unlock: 'Find 20 collectible watches',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Cycle Weather',
    category: 'Environment',
    effect: 'Changes the weather',
    unlock: 'Finish the story',
    input: 'Down, Right, Up, Down, Right, Up, Right',
    inputArrows: '↓ → ↑ ↓ → ↑ →',
    inputStatus: 'verified'
  },

  // FILTERS (16)
  {
    name: 'Golden Hour',
    category: 'Filters',
    effect: 'Golden filter with a widescreen aspect ratio',
    unlock: 'Spend 4 hours holding hands',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Powdered Sugar',
    category: 'Filters',
    effect: 'Turns the world white with sparkling highlights',
    unlock: 'Scan all space debris with WAiNK',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Pinhole',
    category: 'Filters',
    effect: 'Pinhole camera filter',
    unlock: 'Clear 25 gang operations with your partner',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Neon Jungle',
    category: 'Filters',
    effect: 'Adds neon highlights to the world',
    unlock: 'Discover all 16 Girlypop Vehicles',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Yesteryear',
    category: 'Filters',
    effect: 'Black-and-white CRT TV filter',
    unlock: 'Discover the Ridgeway',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Cataclysm',
    category: 'Filters',
    effect: 'Murky smoke fills the world',
    unlock: "Discover Martha's Vamos in the Progress menu",
    input: 'Down, Down, Up, Right, Right, Up, Left, Left, Right, Right',
    inputArrows: '↓ ↓ ↑ → → ↑ ← ← → →',
    inputStatus: 'verified'
  },
  {
    name: 'Videotape',
    category: 'Filters',
    effect: 'Videotape-style filter',
    unlock: 'Complete 50 activities with your partner',
    input: 'Down, Down, Up, Right, Right, Up, Left, Left, Right, Down',
    inputArrows: '↓ ↓ ↑ → → ↑ ← ← → ↓',
    inputStatus: 'unconfirmed'
  },
  {
    name: 'Dark Mirror',
    category: 'Filters',
    effect: 'Flips the world upside down and turns it black',
    unlock: 'Make $500,000 selling vehicles',
    input: 'Down, Down, Up, Right, Right, Up, Left, Left, Right, Left',
    inputArrows: '↓ ↓ ↑ → → ↑ ← ← → ←',
    inputStatus: 'unconfirmed'
  },
  {
    name: 'Migraine',
    category: 'Filters',
    effect: 'Blurred, distorted filter',
    unlock: 'Survive 6 minutes with a 6-star wanted level',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Dollhouse',
    category: 'Filters',
    effect: 'Vivid filter with a narrow aspect ratio',
    unlock: 'Spend 8 hours with your partner',
    input: 'Down, Down, Up, Right, Right, Up, Left, Left, Down, Right',
    inputArrows: '↓ ↓ ↑ → → ↑ ← ← ↓ →',
    inputStatus: 'verified'
  },
  {
    name: 'Bubblegum',
    category: 'Filters',
    effect: 'Purple and yellow world with sparkling highlights',
    unlock: 'Find all 24 Vice City Flamingos collectible cards',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Fast Forward',
    category: 'Filters',
    effect: 'Motion blur and faster cloud movement',
    unlock: 'Complete 50 meditations',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Fisheye',
    category: 'Filters',
    effect: 'Fisheye lens filter',
    unlock: 'Catch 100 fish',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Faded Glory',
    category: 'Filters',
    effect: 'Color CRT TV filter',
    unlock: 'Rob 50 stores with your partner',
    input: 'Down, Down, Up, Right, Right, Up, Left, Left, Left, Right',
    inputArrows: '↓ ↓ ↑ → → ↑ ← ← ← →',
    inputStatus: 'verified'
  },
  {
    name: 'Pixel Art',
    category: 'Filters',
    effect: 'Pixelated filter',
    unlock: 'Make $250,000 selling collectibles',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  },
  {
    name: 'Hellscape',
    category: 'Filters',
    effect: 'Red and orange world with heat haze',
    unlock: 'Steal 100 cop vehicles',
    input: null,
    inputArrows: null,
    inputStatus: 'undiscovered'
  }
];

export function filterGta6Cheats(
  query: string,
  category: 'All' | CheatCategory
): Gta6Cheat[] {
  const q = (query || '').toLowerCase().trim();
  return GTA6_CHEATS.filter((cheat) => {
    const matchesCategory = category === 'All' || cheat.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      cheat.name.toLowerCase().includes(q) ||
      cheat.effect.toLowerCase().includes(q)
    );
  });
}
