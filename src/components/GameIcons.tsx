/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Minecraft Grass Block Vector Logo
 */
export function MinecraftIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* 3D Isometric Cube */}
      <polygon points="12,2 22,7.5 12,13 2,7.5" fill="#22c55e" stroke="#16a34a" strokeWidth="1.2" />
      <polygon points="2,7.5 12,13 12,22 2,16.5" fill="#854d0e" stroke="#713f12" strokeWidth="1.2" />
      <polygon points="22,7.5 12,13 12,22 22,16.5" fill="#a16207" stroke="#854d0e" strokeWidth="1.2" />
      {/* Grass drip accents on sides */}
      <path d="M2 10.5 L6 12.5 L6 14.5 L9 13.5 L9 15 L12 16" stroke="#22c55e" strokeWidth="1.2" fill="none" />
      <path d="M22 10.5 L18 12.5 L18 14.5 L15 13.5 L15 15 L12 16" stroke="#4ade80" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/**
 * Roblox Official Tilted Red Square Logo
 */
export function RobloxIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <g transform="rotate(-15 12 12)">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#ef4444" />
        <rect x="8.5" y="8.5" width="7" height="7" rx="1" fill="#090d16" />
      </g>
    </svg>
  );
}

/**
 * Fortnite Battle Royale Logo
 */
export function FortniteIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0284c7" />
      {/* Fortnite stylized F */}
      <path d="M7 6 H17 V9.5 H11.5 V12 H15.5 V15 H11.5 V19 H7 Z" fill="#ffffff" />
    </svg>
  );
}

/**
 * Professional Pokéball Vector Logo
 */
export function PokeballIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
      <path 
        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12" 
        fill="#EF4444" 
        fillOpacity="0.85"
      />
      <line x1="2" y1="12" x2="8.5" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="15.5" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.75" fill="#0b0f17" />
      <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
    </svg>
  );
}

/**
 * Professional Pal Sphere Vector Logo
 */
export function PalSphereIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" fill="#0891b2" fillOpacity="0.3" />
      <path d="M3.5 8C6 6.5 18 6.5 20.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 16C6 17.5 18 17.5 20.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect 
        x="9.5" 
        y="9.5" 
        width="5" 
        height="5" 
        rx="1.5" 
        transform="rotate(45 12 12)" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="#0b0f17" 
      />
      <circle cx="12" cy="12" r="1" fill="#38BDF8" />
    </svg>
  );
}

/**
 * Genshin Impact Primogem Logo
 */
export function GenshinIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path 
        d="M12 2 L15.5 8.5 L22 12 L15.5 15.5 L12 22 L8.5 15.5 L2 12 L8.5 8.5 Z" 
        fill="#38bdf8" 
        stroke="#0284c7" 
        strokeWidth="1.2"
      />
      <path 
        d="M12 5 L14 9.5 L19 12 L14 14.5 L12 19 L10 14.5 L5 12 L10 9.5 Z" 
        fill="#c084fc" 
        fillOpacity="0.8" 
      />
      <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
    </svg>
  );
}

/**
 * Helldivers 2 Skull & Wings Emblem
 */
export function HelldiversIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Helldivers Yellow Shield */}
      <polygon points="12,2 21,6 18,17 12,22 6,17 3,6" fill="#ca8a04" stroke="#facc15" strokeWidth="1.2" />
      {/* Tactical Skull */}
      <rect x="9" y="8" width="6" height="5" rx="1.5" fill="#000000" />
      <rect x="10" y="13" width="4" height="3" fill="#000000" />
      <circle cx="10" cy="10" r="1" fill="#facc15" />
      <circle cx="14" cy="10" r="1" fill="#facc15" />
    </svg>
  );
}

/**
 * Pet Simulator 99 Huge Pet Cat / Gem Logo
 */
export function Ps99Icon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Huge Pet Cat Ears & Diamond Head */}
      <polygon points="6,3 9,9 3,9" fill="#38bdf8" />
      <polygon points="18,3 21,9 15,9" fill="#38bdf8" />
      <polygon points="12,6 20,13 12,21 4,13" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
      <circle cx="9" cy="12" r="1.2" fill="#ffffff" />
      <circle cx="15" cy="12" r="1.2" fill="#ffffff" />
      <polygon points="12,14 13.5,15.5 10.5,15.5" fill="#f43f5e" />
    </svg>
  );
}

/**
 * The First Descendant Arche Core Logo
 */
export function TfdIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Cyber Hexagon */}
      <polygon points="12,2 20.5,7 20.5,17 12,22 3.5,17 3.5,7" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
      {/* Arche Core Triangle */}
      <polygon points="12,6 18,16 6,16" stroke="#22d3ee" strokeWidth="1.5" fill="#0e7490" fillOpacity="0.4" />
      <circle cx="12" cy="13" r="2" fill="#a5f3fc" />
    </svg>
  );
}

/**
 * Once Human Deviant / Starchrom Eye Logo
 */
export function OnceHumanIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Cosmic Eye / Deviant Butterfly */}
      <path d="M2 12C5 6 19 6 22 12C19 18 5 18 2 12Z" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" fill="#581c87" stroke="#e879f9" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2" fill="#fbbf24" />
    </svg>
  );
}

/**
 * Wuthering Waves Acoustic Resonator Wave Logo
 */
export function WuwaIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="#0d9488" strokeWidth="1.5" fill="#134e4a" fillOpacity="0.4" />
      {/* Soundwave frequency crescents */}
      <path d="M6 12C6 9 9 7 12 7C15 7 18 9 18 12" stroke="#2dd4bf" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 12C8 10 10 9 12 9C14 9 16 10 16 12" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="14.5" r="2" fill="#99f6e4" />
    </svg>
  );
}

/**
 * Zenless Zone Zero Bangboo & Graffiti Logo
 */
export function ZzzIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Bangboo Bunny Ears */}
      <path d="M7 2 L10 8 L6 8 Z" fill="#ea580c" />
      <path d="M17 2 L18 8 L14 8 Z" fill="#ea580c" />
      {/* Round TV Face Body */}
      <rect x="4" y="7" width="16" height="14" rx="4" fill="#c2410c" stroke="#fb923c" strokeWidth="1.5" />
      {/* Screen & Eyes */}
      <rect x="6.5" y="9.5" width="11" height="9" rx="2" fill="#000000" />
      <line x1="8.5" y1="13" x2="10.5" y2="15" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="10.5" y1="13" x2="8.5" y2="15" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="13.5" y1="13" x2="15.5" y2="15" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="15.5" y1="13" x2="13.5" y2="15" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Roblox Type Soul Crossed Zanpakuto Blades
 */
/**
 * Roblox Type Soul: Sleek Katana with Hollow Mask & Crimson Reiatsu
 */
export function TypeSoulIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="tsBlade" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="tsAura" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dc2626" />
          <stop offset="1" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>
      {/* Hollow Mask Crescent */}
      <path d="M4 14C3 8 7 3 13 3C18 3 21 7 21 12C20 8 16 6 12 7C8 8 5 11 4 14Z" fill="#f8fafc" />
      <path d="M9 7L11 9M13 6.5L14.5 8" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" />
      {/* Curved Katana Blade */}
      <path d="M3 21C6 18 16 11 21 3C19 6 13 14 3 21Z" fill="url(#tsBlade)" stroke="#cbd5e1" strokeWidth="0.5" />
      {/* Crimson Reiatsu Aura Slash */}
      <path d="M5 22C9 18 18 12 22 5" stroke="url(#tsAura)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      {/* Tsuba / Guard */}
      <rect x="5.5" y="17.5" width="3" height="1.5" rx="0.5" transform="rotate(-45 7 18)" fill="#dc2626" />
      {/* Tsukamaki Wrap Handle */}
      <line x1="3" y1="21" x2="5" y2="19" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Baldur's Gate 3: High-Fidelity Brass & Obsidian D20 Die with Gold Inlay
 */
export function Bg3Icon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="bg3Gold" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" />
          <stop offset="0.5" stopColor="#d97706" />
          <stop offset="1" stopColor="#78350f" />
        </linearGradient>
      </defs>
      {/* Outer D20 Facets */}
      <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="#1c1917" stroke="url(#bg3Gold)" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Inner Triangular Face */}
      <polygon points="12,5.5 19,16 5,16" fill="#292524" stroke="url(#bg3Gold)" strokeWidth="1" strokeLinejoin="round" />
      {/* Vertex Connecting Ribs */}
      <line x1="12" y1="2" x2="12" y2="5.5" stroke="url(#bg3Gold)" strokeWidth="0.8" />
      <line x1="21" y1="7" x2="19" y2="16" stroke="url(#bg3Gold)" strokeWidth="0.8" />
      <line x1="3" y1="7" x2="5" y2="16" stroke="url(#bg3Gold)" strokeWidth="0.8" />
      <line x1="5" y1="16" x2="12" y2="22" stroke="url(#bg3Gold)" strokeWidth="0.8" />
      <line x1="19" y1="16" x2="12" y2="22" stroke="url(#bg3Gold)" strokeWidth="0.8" />
      {/* Elegant Roman Numeral XX */}
      <text x="12" y="13.5" textAnchor="middle" fill="#fde68a" fontSize="5.5" fontWeight="900" fontFamily="serif" letterSpacing="0.5">XX</text>
    </svg>
  );
}

/**
 * Lethal Company: Modern Industrial Hazard Diving Helmet with Glare Visor
 */
export function LethalCompanyIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="lcVisor" x1="7" y1="7" x2="17" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde047" />
          <stop offset="0.6" stopColor="#ca8a04" />
          <stop offset="1" stopColor="#713f12" />
        </linearGradient>
      </defs>
      {/* Rugged Suit Collar */}
      <path d="M4 21C4 18 8 17 12 17C16 17 20 18 20 21" fill="#18181b" stroke="#ea580c" strokeWidth="1.2" />
      {/* Helmet Shell */}
      <rect x="4" y="3" width="16" height="15" rx="5" fill="#c2410c" stroke="#f97316" strokeWidth="1.2" />
      {/* Circular Visor Ring */}
      <circle cx="12" cy="10" r="5" fill="url(#lcVisor)" stroke="#18181b" strokeWidth="1.2" />
      {/* Curved Glass Reflection Glare */}
      <path d="M9.5 7.5C11 6.8 13.5 7 14.5 8" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
      {/* Dual Air Canister Ports */}
      <rect x="2" y="10" width="2" height="4" rx="1" fill="#71717a" />
      <rect x="20" y="10" width="2" height="4" rx="1" fill="#71717a" />
      {/* Front Speaker / Grille */}
      <line x1="10" y1="16.5" x2="14" y2="16.5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Starfield: Constellation 4-Color Planetary Arc & Reticle Emblem
 */
export function StarfieldIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Aerospace Navigation Compass Ring */}
      <circle cx="12" cy="12" r="9.5" stroke="#334155" strokeWidth="1.5" />
      {/* Official Constellation 4-Color Arcs */}
      <path d="M4 14C3.5 8 7 3.5 12 2.5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.5 16C5 10 8.5 5 13.5 3.5" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 18C6.5 12 10 6.5 15 5" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 19.5C9 14.5 12 8 16.5 6.5" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" />
      {/* Central Precision Needle */}
      <polygon points="12,5 14,12 12,19 10,12" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
    </svg>
  );
}

/**
 * Enshrouded: Embervale Altar with Dual-Tone Shroud & Fire Flame
 */
export function EnshroudedIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="enFire" x1="12" y1="2" x2="12" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" />
          <stop offset="0.5" stopColor="#f97316" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="enShroud" x1="12" y1="6" x2="12" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      {/* Heavy Runic Stone Altar Vessel */}
      <polygon points="3,15 21,15 18,21 6,21" fill="#1c1917" stroke="#78350f" strokeWidth="1.2" />
      <line x1="7" y1="18" x2="17" y2="18" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />
      {/* Outer Roaring Amber Flame */}
      <path d="M12 2C13.5 5 18 7.5 18 12C18 15 15 16.5 12 16.5C9 16.5 6 15 6 12C6 7.5 10.5 5 12 2Z" fill="url(#enFire)" />
      {/* Inner Mystical Cerulean Flame Core */}
      <path d="M12 6C13 8 15 9.5 15 12.5C15 14.5 13.5 15.5 12 15.5C10.5 15.5 9 14.5 9 12.5C9 9.5 11 8 12 6Z" fill="url(#enShroud)" />
      {/* Floating Spark */}
      <circle cx="12" cy="11" r="1.2" fill="#ffffff" />
    </svg>
  );
}

/**
 * Nightingale: Victorian Brass Gaslamp with Ethereal Fae Realm Portal
 */
export function NightingaleIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="ngBrass" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="0.5" stopColor="#b45309" />
          <stop offset="1" stopColor="#78350f" />
        </linearGradient>
        <radialGradient id="ngFae" cx="12" cy="13" r="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34d399" />
          <stop offset="0.7" stopColor="#059669" />
          <stop offset="1" stopColor="#064e3b" />
        </radialGradient>
      </defs>
      {/* Lantern Top Ring & Dome */}
      <circle cx="12" cy="3.5" r="1.5" stroke="url(#ngBrass)" strokeWidth="1.2" />
      <path d="M7 6H17L19 9H5L7 6Z" fill="url(#ngBrass)" />
      {/* Glass Body with Fae Realm Portal */}
      <rect x="6" y="9" width="12" height="9" rx="1" fill="url(#ngFae)" stroke="url(#ngBrass)" strokeWidth="1.2" />
      {/* Filigree Cross-bars */}
      <line x1="6" y1="9" x2="18" y2="18" stroke="url(#ngBrass)" strokeWidth="0.8" opacity="0.6" />
      <line x1="18" y1="9" x2="6" y2="18" stroke="url(#ngBrass)" strokeWidth="0.8" opacity="0.6" />
      {/* Glowing Fae Core */}
      <circle cx="12" cy="13.5" r="2.5" fill="#a7f3d0" />
      {/* Lantern Base */}
      <path d="M5 18H19L17 21H7L5 18Z" fill="url(#ngBrass)" />
    </svg>
  );
}

/**
 * Cookie Run: Kingdom: Royal Ginger Crown with Ruby Jewel & Golden Glaze
 */
export function CrkIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="crkGold" x1="4" y1="5" x2="20" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Crown Base Band */}
      <path d="M4 18H20L19 14H5L4 18Z" fill="#78350f" stroke="#b45309" strokeWidth="1" />
      {/* 5-Peak Royal Crown */}
      <path d="M4 14L4 7L8 11L12 4L16 11L20 7L20 14H4Z" fill="url(#crkGold)" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Center Ruby Gem */}
      <polygon points="12,12 14,14.5 12,17 10,14.5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
      {/* Saphhire Side Gems */}
      <circle cx="7" cy="15" r="1.2" fill="#3b82f6" />
      <circle cx="17" cy="15" r="1.2" fill="#22c55e" />
      {/* Peak Pearls */}
      <circle cx="4" cy="7" r="1.2" fill="#ffffff" />
      <circle cx="12" cy="4" r="1.5" fill="#ffffff" />
      <circle cx="20" cy="7" r="1.2" fill="#ffffff" />
    </svg>
  );
}

/**
 * AFK Journey: Celestial Golden Winged Greatsword with Twilight Aura
 */
export function AfkjIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="afkjGold" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde047" />
          <stop offset="0.5" stopColor="#eab308" />
          <stop offset="1" stopColor="#a16207" />
        </linearGradient>
      </defs>
      {/* Angelic Radiant Wings */}
      <path d="M3 10C5 6 9 6 11 9L12 11L13 9C15 6 19 6 21 10C21 14 17 17 12 21C7 17 3 14 3 10Z" fill="#3b0764" stroke="#a855f7" strokeWidth="1" opacity="0.4" />
      <path d="M4 11C7 8 11 9 12 13C13 9 17 8 20 11" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
      {/* Broadsword Blade */}
      <polygon points="12,2 14,6 13.5,16 12,18 10.5,16 10,6" fill="url(#afkjGold)" stroke="#ca8a04" strokeWidth="0.8" />
      <line x1="12" y1="3" x2="12" y2="17" stroke="#ffffff" strokeWidth="0.8" />
      {/* Crossguard & Pommel */}
      <line x1="8" y1="14" x2="16" y2="14" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="11.2" y="14" width="1.6" height="4" fill="#a16207" />
      <circle cx="12" cy="19.5" r="1.2" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * Monopoly GO!: 3D Ruby Dice & Executive Gold-Banded Top Hat
 */
export function MonopolyGoIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="mogoRed" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ef4444" />
          <stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      {/* Classic Top Hat Silhouette */}
      <path d="M3 19H21V17H18V10C18 8 16 7 14 7H10C8 7 6 8 6 10V17H3V19Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
      {/* Luxury Gold Ribbon */}
      <rect x="6" y="14.5" width="12" height="2" fill="#eab308" />
      {/* 3D Angled Red Game Die */}
      <rect x="7.5" y="4" width="9" height="9" rx="2" fill="url(#mogoRed)" stroke="#fca5a5" strokeWidth="1" />
      {/* Clean White Die Pips (5 Pattern) */}
      <circle cx="9.5" cy="6" r="0.8" fill="#ffffff" />
      <circle cx="14.5" cy="6" r="0.8" fill="#ffffff" />
      <circle cx="12" cy="8.5" r="0.9" fill="#ffffff" />
      <circle cx="9.5" cy="11" r="0.8" fill="#ffffff" />
      <circle cx="14.5" cy="11" r="0.8" fill="#ffffff" />
    </svg>
  );
}

/**
 * Seven Knights Re:BIRTH: The Legendary '7' Angelic Knight Crest with Sapphire Gem
 */
export function SkIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="skChrome" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#93c5fd" />
          <stop offset="1" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="skGold" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.5" stopColor="#eab308" />
          <stop offset="1" stopColor="#854d0e" />
        </linearGradient>
      </defs>
      {/* Knight Shield Mantling */}
      <polygon points="12,2 21,5 19,16 12,22 5,16 3,5" fill="#0f172a" stroke="url(#skGold)" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Angelic Knight Wing Plumes */}
      <path d="M5 8C8 8 10 11 10 15L7 13Z" fill="#3b82f6" opacity="0.6" />
      <path d="M19 8C16 8 14 11 14 15L17 13Z" fill="#3b82f6" opacity="0.6" />
      {/* Iconic Razor-Sharp Seven Knights "7" */}
      <path d="M8 6.5H16.5L11.5 17.5H9L13.5 8.5H8V6.5Z" fill="url(#skChrome)" stroke="#60a5fa" strokeWidth="0.8" />
      {/* Central Radiant Sapphire Core */}
      <polygon points="12,10 13.5,12 12,14 10.5,12" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * Coin Master: Norse Viking Shield with Spinning 777 Gold Coin
 */
export function CmIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="cmGold" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.3" stopColor="#f59e0b" />
          <stop offset="0.8" stopColor="#b45309" />
          <stop offset="1" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="cmInner" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde047" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Viking Shield Rim with Runic Rivets */}
      <circle cx="12" cy="12" r="10" fill="#451a03" stroke="url(#cmGold)" strokeWidth="1.75" />
      {/* Polished Concentric Gold Coin Border */}
      <circle cx="12" cy="12" r="7.5" fill="url(#cmInner)" stroke="#fef08a" strokeWidth="0.8" />
      {/* Viking Horn Accents on top */}
      <path d="M6 6C5 3 2 4 3 7C4 8 6 7 6 6Z" fill="#f8fafc" stroke="#d4d4d8" strokeWidth="0.5" />
      <path d="M18 6C19 3 22 4 21 7C20 8 18 7 18 6Z" fill="#f8fafc" stroke="#d4d4d8" strokeWidth="0.5" />
      {/* Central Coin Slot / Crown Motif */}
      <path d="M9 13.5L8 10.5L10.5 11.5L12 9.5L13.5 11.5L16 10.5L15 13.5H9Z" fill="#78350f" />
      <rect x="11" y="11" width="2" height="4.5" rx="0.5" fill="#fef08a" />
    </svg>
  );
}

/**
 * Grow a Garden: Vibrant Emerald & Gold Sprout & Sunflower Crest
 */
export function GrowAGardenIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gagEmerald" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ee7b7" />
          <stop offset="0.5" stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="gagGold" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.6" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Garden Crest Base */}
      <circle cx="12" cy="12" r="10" fill="#022c22" stroke="url(#gagEmerald)" strokeWidth="1.5" />
      {/* Soil curve */}
      <path d="M4 16.5C7 15 17 15 20 16.5" stroke="#a16207" strokeWidth="1.5" strokeLinecap="round" />
      {/* Sprout Stem */}
      <path d="M12 17V8C12 8 12 5.5 10 4.5" stroke="url(#gagGold)" strokeWidth="1.75" strokeLinecap="round" />
      {/* Left Leaf */}
      <path d="M12 12C9 12 7 9 7 6C10 6 12 9 12 12Z" fill="url(#gagEmerald)" stroke="#a7f3d0" strokeWidth="0.8" />
      {/* Right Leaf */}
      <path d="M12 10C15 10 17 7 17 4C14 4 12 7 12 10Z" fill="url(#gagEmerald)" stroke="#a7f3d0" strokeWidth="0.8" />
      {/* Radiant Sun sparkle */}
      <circle cx="18" cy="6" r="1.5" fill="#fde047" />
    </svg>
  );
}


/**
     * Helper function to get the appropriate custom vector logo for any game ID
     */
export function getGameIcon(gameId: string, className = 'w-5 h-5'): React.ReactNode {
  const normalized = (gameId || '').toLowerCase().trim();
  switch (normalized) {
    case 'minecraft':
      return <MinecraftIcon className={className} />;
    case 'roblox':
      return <RobloxIcon className={className} />;
    case 'fortnite':
      return <FortniteIcon className={className} />;
    case 'pokemongo':
    case 'pokemon-go':
      return <PokeballIcon className={className} />;
    case 'palworld':
      return <PalSphereIcon className={className} />;
    case 'genshin':
    case 'genshin-impact':
      return <GenshinIcon className={className} />;
    case 'growagarden':
    case 'grow-a-garden':
      return <GrowAGardenIcon className={className} />;
    case 'helldivers-2':
    case 'helldivers2':
      return <HelldiversIcon className={className} />;
    case 'ps99':
    case 'pet-simulator-99':
      return <Ps99Icon className={className} />;
    case 'tfd':
    case 'the-first-descendant':
      return <TfdIcon className={className} />;
    case 'once-human':
    case 'oncehuman':
      return <OnceHumanIcon className={className} />;
    case 'wuthering-waves':
    case 'wuwa':
      return <WuwaIcon className={className} />;
    case 'zenless-zone-zero':
    case 'zzz':
      return <ZzzIcon className={className} />;
    case 'typesoul':
    case 'type-soul':
    case 'roblox-type-soul':
      return <TypeSoulIcon className={className} />;
    case 'bg3':
    case 'baldurs-gate-3':
      return <Bg3Icon className={className} />;
    case 'lethal-company':
    case 'lethalcompany':
    case 'content-warning':
      return <LethalCompanyIcon className={className} />;
    case 'starfield':
      return <StarfieldIcon className={className} />;
    case 'enshrouded':
      return <EnshroudedIcon className={className} />;
    case 'nightingale':
      return <NightingaleIcon className={className} />;
    case 'crk':
    case 'cookie-run-kingdom':
    case 'cookie-run':
      return <CrkIcon className={className} />;
    case 'afkj':
    case 'afk-journey':
    case 'afkjourney':
      return <AfkjIcon className={className} />;
    case 'mogo':
    case 'monopoly-go':
    case 'monopolygo':
      return <MonopolyGoIcon className={className} />;
    case 'sk':
    case 'seven-knights-rebirth':
      return <SkIcon className={className} />;
    case 'cm':
    case 'coin-master':
      return <CmIcon className={className} />;
    default:
      return <MinecraftIcon className={className} />;
  }
}

