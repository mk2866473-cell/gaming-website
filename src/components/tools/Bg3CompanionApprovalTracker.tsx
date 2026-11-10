/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Heart, Users, AlertTriangle, CheckCircle2, 
  HelpCircle, Sparkles, Flame, Shield, Compass, 
  Info, Star, Award, ChevronRight, Filter
} from 'lucide-react';

export interface CompanionDecision {
  act: 1 | 2 | 3;
  event: string;
  choice: string;
  approvalChange: number; // e.g. +10, +5, -5, -20
  romanceImpact?: string;
  isLockout?: boolean;
}

export interface CompanionData {
  id: string;
  name: string;
  title: string;
  raceClass: string;
  alignment: string;
  romancePrereq: string;
  likes: string[];
  dislikes: string[];
  decisions: CompanionDecision[];
  campEventAlert: string;
}

const COMPANIONS: CompanionData[] = [
  {
    id: 'astarion',
    name: 'Astarion',
    title: 'The Pale Elf',
    raceClass: 'High Elf Rogue',
    alignment: 'Chaotic Neutral / Evil',
    romancePrereq: 'Act 1: Long rest bite scene (let him feed on you) + 40+ Approval before Tiefling/Goblin celebration.',
    likes: [
      'Cynical, witty, or sarcastic banter',
      'Demanding payment before accepting quests',
      'Deception, stealth, and clever trickery',
      'Giving him the Necromancy of Thay book',
      'Asserting dominance over weaker creatures'
    ],
    dislikes: [
      'Selfless heroics with zero gold reward',
      'Sympathy for parasites or weakness',
      'Handing him over to the Gur monster hunter Gandrel',
      'Forcing him to bite blood-tainted Araj Oblodra in Act 2'
    ],
    campEventAlert: 'In Act 2 at Moonrise, protect him from Araj Oblodra\'s forced bite request to secure his sincere romance confession.',
    decisions: [
      { act: 1, event: 'Night Bite Scene', choice: 'Offer your neck and let him drink your blood without staking him', approvalChange: 10, romanceImpact: 'Crucial prerequisite for Act 1 romance invite.' },
      { act: 1, event: 'Gandrel the Gur Hunter', choice: 'Deceive or kill Gandrel instead of outing Astarion', approvalChange: 10 },
      { act: 1, event: 'Necromancy of Thay', choice: 'Hand the forbidden Tome of Necromancy directly to Astarion', approvalChange: 5 },
      { act: 1, event: 'Blighted Village Barn', choice: 'Open the door to catch the bugbear and ogre', approvalChange: 5 },
      { act: 2, event: 'Araj Oblodra Blood Potion', choice: 'Defend Astarion\'s autonomy: "He is his own person, he doesn\'t have to bite you"', approvalChange: 15, romanceImpact: 'Guarantees the genuine love scene in camp.' },
      { act: 3, event: 'Cazador\'s Black Mass Ritual', choice: 'Persuade him NOT to ascend to keep his humanity, or help him ascend for ultimate power (+1d10 necrotic)', approvalChange: 15 }
    ]
  },
  {
    id: 'shadowheart',
    name: 'Shadowheart',
    title: 'Daughter of Darkness',
    raceClass: 'Half-Elf Trickery Cleric',
    alignment: 'Neutral / Shar to Selûne',
    romancePrereq: 'Act 1: Learn about her Shar worship without judging her + Nightcap sharing wine on cliffside.',
    likes: [
      'Respecting her privacy and boundaries',
      'Animals (petting Scratch and the Owlbear cub)',
      'Clever problem-solving avoiding needless blood',
      'Giving her the Night Orchid flower in Act 2',
      'Finding the Idol of Shar in Grymforge'
    ],
    dislikes: [
      'Prying into her memories aggressively',
      'Githyanki cultural superiority (Lae\'zel)',
      'Cruelty towards stray animals or children',
      'Siding with the Goblins to massacre Druids'
    ],
    campEventAlert: 'In the Gauntlet of Shar (Act 2), trust her to make her own choice with the Nightsong; do not force or command her.',
    decisions: [
      { act: 1, event: 'Nautiloid Pod Rescue', choice: 'Free her from the mind flayer pod on the Nautiloid ship', approvalChange: 10, romanceImpact: 'Instantly establishes deep trust.' },
      { act: 1, event: 'Shar Revelation', choice: 'Accept her faith without condemnation: "It doesn\'t matter who you worship"', approvalChange: 10 },
      { act: 1, event: 'Night Orchid Flower', choice: 'Pick a Night Orchid in the shadow woods and gift it to her', approvalChange: 10, romanceImpact: 'Triggers romantic dialogue.' },
      { act: 2, event: 'The Nightsong (Dame Aylin)', choice: 'Trust her: "Do what you believe is right". She spares Nightsong and converts to Selûne', approvalChange: 20, romanceImpact: 'Unlocks white-hair Selûnite path and pure romance.' },
      { act: 3, event: 'House of Grief & Parents', choice: 'Support her choice regarding her tortured parents to free her of Shar\'s curse', approvalChange: 15 }
    ]
  },
  {
    id: 'gale',
    name: 'Gale',
    title: 'Wizard of Waterdeep',
    raceClass: 'Human Evocation Wizard',
    alignment: 'Neutral Good',
    romancePrereq: 'Act 1: Feed him 3 magical artifacts + the Weave connection lesson during long rest.',
    likes: [
      'Intellectual curiosity and arcane knowledge',
      'Donating rare magical items to sustain his chest',
      'Peaceful negotiation and tactical wit',
      'Being kind to his Tressym cat Tara',
      'Sparing innocents and helping the helpless'
    ],
    dislikes: [
      'Mindless violence and barbarism',
      'Refusing to give him artifacts when he suffers Arcane Hunger',
      'Mocking his past romance with Mystra',
      'Committing mass slaughter'
    ],
    campEventAlert: 'During the Weave lesson in Act 1, imagine kissing or walking hand-in-hand with Gale to flag romantic interest.',
    decisions: [
      { act: 1, event: 'Damaged Waypoint Rescue', choice: 'Pull his arm out of the malfunctioning Netherese portal', approvalChange: 5 },
      { act: 1, event: 'Arcane Hunger Artifacts', choice: 'Give him uncommon magical items (up to 3 times) promptly', approvalChange: 10, romanceImpact: 'Required to prevent him leaving the party.' },
      { act: 1, event: 'Weave Channeling Night', choice: 'Channel the Weave together and envision a romantic intimate connection', approvalChange: 10, romanceImpact: 'Primary Act 1 romance lock.' },
      { act: 2, event: 'Astral Projection Camp Scene', choice: 'Sit with him under the projected stars and confess affection', approvalChange: 15, romanceImpact: 'Locks in Act 2 romance.' },
      { act: 3, event: 'Crown of Karsus Decision', choice: 'Encourage him to seek Mystra\'s peace rather than reckless godhood', approvalChange: 10 }
    ]
  },
  {
    id: 'karlach',
    name: 'Karlach',
    title: 'Fury of Avernus',
    raceClass: 'Zariel Tiefling Barbarian',
    alignment: 'Chaotic Good',
    romancePrereq: 'Act 1: Kill the "Paladins of Tyr" hunting her + give Dammon Infernal Iron for 1st upgrade.',
    likes: [
      'Direct, fiery, confident action and heroism',
      'Punching corrupt bullies and evil slavers',
      'Protecting the Tiefling refugees at all costs',
      'Giving Dammon Infernal Iron for engine tune-ups',
      'Cheering up distressed children'
    ],
    dislikes: [
      'Cowardice or betraying vulnerable innocents',
      'Working with Gortash or Zariel cultists',
      'Attacking or raiding the Druid Grove (PERMANENT LEAVE)',
      'Cruelty towards Scratch or the Owlbear cub'
    ],
    campEventAlert: 'Cool her down with ice or water spells in Act 1 so she can receive a brief hug, leading to full touch in Act 2 Last Light Inn.',
    decisions: [
      { act: 1, event: 'Paladins of Tyr Confrontation', choice: 'Side with Karlach and slaughter the "Paladins" hunting her', approvalChange: 15, romanceImpact: 'Secures her loyalty and initial flirtation.' },
      { act: 1, event: 'First Infernal Upgrade', choice: 'Bring Infernal Iron to Dammon in the Emerald Grove', approvalChange: 10, romanceImpact: 'Enables physical touch attempts.' },
      { act: 1, event: 'Grove Defense', choice: 'Defend the Grove against Minthara (Raiding causes Karlach to leave forever)', approvalChange: 20, isLockout: true },
      { act: 2, event: 'Second Infernal Upgrade', choice: 'Bring Dammon Infernal Iron at Last Light Inn, then share first passionate kiss', approvalChange: 20, romanceImpact: 'Unlocks full physical romance.' },
      { act: 3, event: 'Gortash Confrontation', choice: 'Let her vent her fury at Gortash\'s corpse and comfort her existential despair', approvalChange: 15 }
    ]
  },
  {
    id: 'laezel',
    name: 'Lae\'zel',
    title: 'Blade of the Astral Sea',
    raceClass: 'Githyanki Fighter',
    alignment: 'Lawful Neutral',
    romancePrereq: 'Act 1: Demonstrate ruthless combat prowess + accept her direct midnight duel proposition.',
    likes: [
      'Aggressive, unapologetic strength and courage',
      'Prioritizing finding the Githyanki Crèche Y\'llek',
      'Efficiency in combat without long delays',
      'Standing up to authority without backing down',
      'Respecting Githyanki customs and protocols'
    ],
    dislikes: [
      'Subservience, hesitation, and pleading for mercy',
      'Distrusting Githyanki purity and discipline',
      'Siding with mind flayers or Emperor willingly',
      'Insulting her loyalty before the Crèche truth'
    ],
    campEventAlert: 'In Act 2 camp, she challenges you to an emotional 1v1 duel. Winning or losing gracefully proves worthiness.',
    decisions: [
      { act: 1, event: 'Tiefling Cage Rescue', choice: 'Shoot the trap down and free her from the Tieflings', approvalChange: 5 },
      { act: 1, event: 'Zorru Interrogation', choice: 'Allow her to interrogate Zorru using harsh Githyanki discipline', approvalChange: 10 },
      { act: 1, event: 'Midnight Combat Proposition', choice: 'Accept her physical challenge: "I will have you tonight"', approvalChange: 10, romanceImpact: 'Initiates Act 1 romantic liaison.' },
      { act: 1, event: 'Zaith\'isk Purification Device', choice: 'Let her use it, then intervene to save her brain from Vlaakith\'s trap', approvalChange: 10 },
      { act: 2, event: 'Camp Midnight Duel', choice: 'Fight her earnestly and embrace her tenderness afterwards', approvalChange: 20, romanceImpact: 'Deepens romance from lust into true love.' },
      { act: 3, event: 'Vlaakith vs Orpheus', choice: 'Help her side with Prince Orpheus to liberate the Githyanki race', approvalChange: 20 }
    ]
  },
  {
    id: 'wyll',
    name: 'Wyll',
    title: 'The Blade of Frontiers',
    raceClass: 'Human Fiend Warlock',
    alignment: 'Neutral Good',
    romancePrereq: 'Act 1: Spare Karlach + Act 2: Dance with him under the moonlight at camp.',
    likes: [
      'Noble chivalry and protecting the common folk',
      'Sparing Karlach and talking down Mizora',
      'Rescuing Duke Ravengard and Florrick',
      'Upholding honor and righteous promises',
      'Defending the Tiefling refugees'
    ],
    dislikes: [
      'Killing Karlach in cold blood',
      'Raiding the Druid Grove (Wyll leaves forever)',
      'Submitting to devil contracts without pushback',
      'Selfish cruelty or betraying allies'
    ],
    campEventAlert: 'In Act 2 camp, join his traditional Baldurian dance and take the lead for an enchanting romantic kiss.',
    decisions: [
      { act: 1, event: 'Karlach Discovery', choice: 'Refuse to execute Karlach; talk Wyll down so they become allies', approvalChange: 15, romanceImpact: 'Saves Wyll\'s soul and keeps both companions.' },
      { act: 1, event: 'Mizora\'s Horns Punishment', choice: 'Comfort him when Mizora afflicts him with fiendish horns', approvalChange: 10 },
      { act: 2, event: 'Moonlight Camp Dance', choice: 'Step onto the grass, follow his rhythm, and lean in for a kiss', approvalChange: 20, romanceImpact: 'Locks in Act 2 romance.' },
      { act: 3, event: 'Mizora Pact Dilemma', choice: 'Support breaking his pact or rescuing his father from the Iron Throne', approvalChange: 15 }
    ]
  },
  {
    id: 'minthara',
    name: 'Minthara',
    title: 'The Drow Paladin',
    raceClass: 'Drow Oath of Vengeance Paladin',
    alignment: 'Lawful Evil / Pragmatic',
    romancePrereq: 'Act 1: Either raid the Grove OR knock her out with non-lethal attacks + rescue at Moonrise in Act 2.',
    likes: [
      'Pragmatic consolidation of political and magical power',
      'Cold, ruthless efficiency eliminating obstacles',
      'Revenge against the Absolute and cult torturers',
      'Taking control of the Netherbrain rather than destroying it',
      'Embracing powerful Illithid tadpole evolutions'
    ],
    dislikes: [
      'Weakness, mercy to sworn enemies, squeamishness',
      'Failing to rescue her from Moonrise dungeons',
      'Hesitation to claim supreme authority'
    ],
    campEventAlert: 'In Act 2 Moonrise dungeons, cast non-lethal or stealthily escort her outside to invite her to your camp.',
    decisions: [
      { act: 1, event: 'Grove Assault (or Non-Lethal KO)', choice: 'Side with her at the Grove OR knock out with non-lethal melee toggle', approvalChange: 10 },
      { act: 2, event: 'Moonrise Dungeon Rescue', choice: 'Intervene during her interrogation and safely escort her to safety', approvalChange: 25, romanceImpact: 'Required recruitment prerequisite.' },
      { act: 2, event: 'Camp Mind Link', choice: 'Open your thoughts to her mind-link and share ambitions of domination', approvalChange: 15, romanceImpact: 'Initiates romance connection.' },
      { act: 3, event: 'Illithid Evolution', choice: 'Accept the Astral Tadpole to become Partial-Illithid together', approvalChange: 15 }
    ]
  },
  {
    id: 'halsin',
    name: 'Halsin',
    title: 'Archdruid of the Emerald Grove',
    raceClass: 'Wood Elf Circle of the Moon Druid',
    alignment: 'Neutral Good',
    romancePrereq: 'Act 2: Rescue Thaniel and fully cleanse the Shadow Curse + Act 3 camp invitation.',
    likes: [
      'Protecting natural balance and wild beasts',
      'Restoring the land from the Shadow Curse',
      'Open-mindedness and polyamorous relationship acceptance',
      'Kindness and patience'
    ],
    dislikes: [
      'Unchecked pollution, rot, and mindless necromancy',
      'Killing Kagha\'s druids or Tiefling refugees',
      'Abandoning Thaniel or Oliver in Act 2'
    ],
    campEventAlert: 'In Act 3 camp, he asks for permission to join your heart; partners like Astarion or Shadowheart can consent to polyamory.',
    decisions: [
      { act: 1, event: 'Worg Pens Rescue', choice: 'Defeat the goblin tormentors and free him from his bear form cage', approvalChange: 15 },
      { act: 2, event: 'Thaniel Portal Defense', choice: 'Defend the shadow portal against waves of undead for 5 turns', approvalChange: 25 },
      { act: 2, event: 'Oliver Reintegration', choice: 'Convince Oliver to reunite with Thaniel to cure the curse', approvalChange: 20 },
      { act: 3, event: 'Wild Shape Intimacy', choice: 'Embrace his wild nature during the Act 3 romantic encounter', approvalChange: 20, romanceImpact: 'Iconic Act 3 romantic scene.' }
    ]
  }
];

export const Bg3CompanionApprovalTracker: React.FC = () => {
  const [selectedCompanionId, setSelectedCompanionId] = useState<string>('astarion');
  const [currentApproval, setCurrentApproval] = useState<number>(55);
  const [selectedAct, setSelectedAct] = useState<number | 'all'>('all');

  const companion = useMemo(() => {
    return COMPANIONS.find(c => c.id === selectedCompanionId) || COMPANIONS[0];
  }, [selectedCompanionId]);

  // Approval tier determination
  const approvalTier = useMemo(() => {
    if (currentApproval >= 81) return { tier: 'Exceptional (81-100)', color: 'text-emerald-400', desc: 'Unshakable devotion. Ready for endgame romance commitment and maximum combat inspiration.' };
    if (currentApproval >= 61) return { tier: 'Very High (61-80)', color: 'text-cyan-400', desc: 'Deep loyalty and open confessions. Intimate camp scenes unlocked.' };
    if (currentApproval >= 41) return { tier: 'Fair / Medium (41-60)', color: 'text-amber-400', desc: 'Solid ally. Willing to share personal backstory and preliminary flirtation.' };
    if (currentApproval >= 21) return { tier: 'Neutral (21-40)', color: 'text-slate-300', desc: 'Professional adventurer acquaintance. Guards their secrets.' };
    if (currentApproval >= 0) return { tier: 'Poor (0-20)', color: 'text-orange-400', desc: 'Skeptical and cold. May criticize your leadership at camp.' };
    return { tier: 'Hostile (<0)', color: 'text-red-400', desc: 'DANGER: At risk of walking out permanently or turning hostile during story checkpoints!' };
  }, [currentApproval]);

  const filteredDecisions = useMemo(() => {
    if (selectedAct === 'all') return companion.decisions;
    return companion.decisions.filter(d => d.act === selectedAct);
  }, [companion, selectedAct]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" /> Romance & Loyalty Matrix
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                Acts 1–3 Choices
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Companion Approval & Romance Tracker
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Track approval meters (-50 to +100), key romance trigger checkpoints, party dialogue decision values, and irreversible companion departure warnings.
            </p>
          </div>

          {/* Quick Select Companion Bar */}
          <div className="flex flex-wrap gap-2">
            {COMPANIONS.map(comp => (
              <button
                key={comp.id}
                onClick={() => {
                  setSelectedCompanionId(comp.id);
                  setCurrentApproval(55); // default reset to fair
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  companion.id === comp.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {comp.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Companion Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stats & Romance Prereq */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-semibold uppercase">{companion.title}</span>
                <h3 className="text-2xl font-bold text-white font-serif">{companion.name}</h3>
                <div className="text-xs text-slate-400 mt-0.5">{companion.raceClass} • {companion.alignment}</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-400 fill-red-400/20" />
              </div>
            </div>

            {/* Approval Meter Slider */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold uppercase">Approval Rating</span>
                <span className={`text-base font-black ${approvalTier.color}`}>{currentApproval} / 100</span>
              </div>
              <input
                type="range"
                min="-50"
                max="100"
                value={currentApproval}
                onChange={(e) => setCurrentApproval(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-slate-900 h-2.5 rounded cursor-pointer"
              />
              <div className="pt-1">
                <div className={`text-xs font-bold ${approvalTier.color}`}>{approvalTier.tier}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{approvalTier.desc}</div>
              </div>
            </div>

            {/* Romance Prerequisite Card */}
            <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-3.5 space-y-1.5 text-xs">
              <div className="font-bold text-red-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-red-400" /> Romance Trigger Prerequisite:
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">{companion.romancePrereq}</p>
            </div>

            {/* Crucial Camp Alert */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 space-y-1.5 text-xs">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Camp Milestone Warning:
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">{companion.campEventAlert}</p>
            </div>

            {/* Likes & Dislikes */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
                <div className="text-xs font-semibold text-emerald-400 mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> What Pleases {companion.name}:
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4">
                  {companion.likes.map((like, i) => (
                    <li key={i}>{like}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
                <div className="text-xs font-semibold text-red-400 mb-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> What Angers {companion.name}:
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4">
                  {companion.dislikes.map((dis, i) => (
                    <li key={i}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Decision Lookup Matrix */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" /> Key Dialogue & Story Decisions
            </h3>

            {/* Act Filter Pills */}
            <div className="flex gap-1">
              {[
                { id: 'all', label: 'All Acts' },
                { id: 1, label: 'Act 1' },
                { id: 2, label: 'Act 2' },
                { id: 3, label: 'Act 3' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedAct(tab.id as any)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                    selectedAct === tab.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredDecisions.map((dec, idx) => (
              <div
                key={idx}
                className={`bg-slate-900 border rounded-xl p-4 space-y-2 transition-all ${
                  dec.isLockout 
                    ? 'border-red-500/50 bg-red-950/10' 
                    : dec.romanceImpact 
                    ? 'border-amber-500/30' 
                    : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 uppercase">
                        Act {dec.act}
                      </span>
                      {dec.isLockout && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 border border-red-500/40 text-red-300 uppercase flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Permanent Departure Risk
                        </span>
                      )}
                      {dec.romanceImpact && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-pink-950/60 border border-pink-500/30 text-pink-300">
                          Romance Milestone
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-white">{dec.event}</div>
                  </div>

                  <div className={`px-2.5 py-1 rounded-lg text-xs font-black shrink-0 ${
                    dec.approvalChange > 0 
                      ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300' 
                      : 'bg-red-950 border border-red-500/40 text-red-300'
                  }`}>
                    {dec.approvalChange > 0 ? `+${dec.approvalChange}` : dec.approvalChange} Approval
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-950/60 rounded p-2.5 border border-slate-800/80">
                  <strong className="text-amber-400">Winning Choice: </strong> {dec.choice}
                </div>

                {dec.romanceImpact && (
                  <div className="text-[11px] text-pink-300/90 flex items-center gap-1.5 pt-0.5">
                    <Heart className="w-3 h-3 text-pink-400 shrink-0" />
                    <span><strong>Romance Effect:</strong> {dec.romanceImpact}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bg3CompanionApprovalTracker;
