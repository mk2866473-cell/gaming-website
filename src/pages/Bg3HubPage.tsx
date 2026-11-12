/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Dices, Search, Award, ShieldCheck, Layers, TrendingUp, 
  Trophy, HelpCircle, ChevronDown, ChevronUp, Lightbulb, 
  Binary, Compass, Sparkles, Target, Flame, Wand2, 
  Heart, Shield, Swords, Crown, FlaskConical, BookOpen, 
  AlertTriangle, CheckCircle2, ArrowRight
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { AdLayout } from '../components/ads/AdLayout';
import { Bg3Icon } from '../components/GameIcons';

interface Bg3HubPageProps {
  onNavigate: (path: string) => void;
}

export default function Bg3HubPage({ onNavigate }: Bg3HubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const bg3Tools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'bg3');
  }, []);

  const categories = [
    { id: 'all', name: `All BG3 Tools (${bg3Tools.length || 7})` },
    { id: 'builds', name: 'Builds & Math (Multiclass, AC Optimizer, Weapon DPR)' },
    { id: 'dice', name: 'Probability & Dice (d20 Advantage & DC Calculator)' },
    { id: 'crafting', name: 'Alchemy & Items (3:1 Recipe Finder & Extractions)' },
    { id: 'companions', name: 'Companions & Story (Romance Tracker, Origin Passives)' },
  ];

  const filteredTools = useMemo(() => {
    return bg3Tools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedCategory === 'builds') {
        matchCategory = ['bg3-multiclass-spell-builder', 'bg3-armor-class-optimizer', 'bg3-weapon-action-damage-counter'].includes(tool.id);
      } else if (selectedCategory === 'dice') {
        matchCategory = ['bg3-dice-probability-calculator'].includes(tool.id);
      } else if (selectedCategory === 'crafting') {
        matchCategory = ['bg3-alchemy-recipe-finder'].includes(tool.id);
      } else if (selectedCategory === 'companions') {
        matchCategory = ['bg3-companion-approval-tracker', 'bg3-origin-passive-guide'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [bg3Tools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: "Baldur's Gate 3", path: '/baldurs-gate-3' }
  ];

  const faqs = [
    {
      q: 'How does multiclass spell slot progression work in Baldur\'s Gate 3?',
      a: 'Baldur\'s Gate 3 adheres to D&D 5e multiclass caster progression: Full Casters (Wizard, Sorcerer, Cleric, Druid, Bard) add 100% of their levels, Half Casters (Paladin, Ranger) add 50% (rounded down), and Third Casters (Eldritch Knight, Arcane Trickster) add 33% (rounded down). Standard spell slots are looked up from the composite Effective Caster Level (ECL) table. Warlock Pact Magic slots calculate on a completely separate track that recharges on Short Rests.'
    },
    {
      q: 'Why are Elixirs of Hill Giant Strength and Cloud Giant Strength so central to the BG3 meta?',
      a: 'In BG3, Strength Elixirs overwrite your character\'s Strength to a flat 21 (Hill Giant) or 27 (Cloud Giant, +8 modifier!) until your next Long Rest. This allows players to "dump" their base Strength to 8 during character creation or respeccing with Withers, reallocating those 27 ability points into Dexterity (initiative/AC), Constitution (HP/saves), and mental stats, while maintaining god-tier melee and Tavern Brawler accuracy.'
    },
    {
      q: 'What is the "Helmet of Arcane Acuity + Band of the Mystic Scoundrel" combo?',
      a: 'This is the most dominant crowd-control synergy in BG3. The Helmet of Arcane Acuity grants +2 to Spell Attack rolls and Spell Save DC every time you deal weapon damage (stacking up to +10). The Band of the Mystic Scoundrel allows you to cast Illusion or Enchantment spells (such as Hold Person, Hold Monster, Hypnotic Pattern, or Command) as a BONUS ACTION after hitting with a weapon attack. A Swords Bard can make a Slashing Flourish weapon attack to reach +10 Arcane Acuity, then immediately cast a 100% guaranteed, unresistable Hold Monster on a boss in round 1!'
    },
    {
      q: 'How do Honour Mode rules differ from Tactician in combat mechanics?',
      a: 'Honour Mode introduces several crucial mechanical balances: (1) Bosses gain unique Legendary Actions and reaction perks; (2) Haste grants strictly +1 single attack rather than a full set of Extra Attacks; (3) Warlock Pact of the Blade Extra Attack does NOT stack with other class Extra Attacks; (4) Damage Riders Treated As Damage Sources (DRS exploits) have been patched out; and (5) You are limited to a single save file with permanent defeat if the entire party is wiped.'
    },
    {
      q: 'How does Larian calculate scroll and magic item Spell Save DC when multiclassing?',
      a: 'In Baldur\'s Gate 3, scrolls and item-granted spells scale off the primary spellcasting ability of the LAST NEW CLASS added to your build. For example, if you start as a Sorcerer (Charisma) and take 1 level of Wizard (Intelligence) at level 6, all spell scrolls you cast will permanently use your Intelligence modifier unless you respec and level Wizard first.'
    },
    {
      q: 'Which camp buffs can be pre-cast before leaving camp for the day?',
      a: 'By using hirelings or non-active camp companions, you can cast powerful "until Long Rest" buffs with zero risk to your active party members: (1) Aid (up to +25 max HP to all allies); (2) Longstrider (+3m movement speed, ritual cast for free); (3) Heroes\' Feast (+12 HP, poison immunity, advantage on WIS saves); (4) Freedom of Movement (immunity to paralysis and rough terrain); and (5) Death Ward (prevents falling below 1 HP).'
    }
  ];

  return (
    <div className="space-y-8">
      <SEOHead
        title="Baldur's Gate 3 Tools & Calculators 2026 – Multiclass, Dice, Alchemy & Build Suite"
        description="Complete suite of 7 Baldur's Gate 3 tools: Multiclass Spell Slot Builder, d20 Dice Roll Probability Calculator, 3:1 Alchemy Recipe Finder, Companion Approval & Romance Tracker, AC Tank Optimizer, Weapon Action DPR Counter, and Origin Character Passive Guide."
        canonicalPath="/games/baldurs-gate-3"
        breadcrumbs={breadcrumbs}
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Medieval Fantasy Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-amber-950/70 via-slate-900 to-slate-950 border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
                <Bg3Icon className="w-full h-full" />
              </div>
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-amber-400">
                    Baldur's Gate 3 Tactical Hub
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-emerald-400">Larian Studios 5e Engine</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-purple-400">Patch 7 Verified</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif">
                  Baldur's Gate 3 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400">Tools & Calculators</span>
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Official theorycrafting suite for Faerûn adventurers. Calculate multiclass spell slot tiers (ECL), d20 Advantage success odds, 3:1 Alchemy recipe extraction yields, companion romance progression, 26+ AC tank defenses, Great Weapon Master turn DPR, and exclusive Origin character passives.
                </p>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 text-center min-w-[140px]">
                <div className="text-2xl font-black text-amber-400">7 Tools</div>
                <div className="text-xs text-slate-400 uppercase font-medium mt-0.5">Dedicated Suite</div>
              </div>
              <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 text-center min-w-[140px]">
                <div className="text-2xl font-black text-emerald-400">Honour Mode</div>
                <div className="text-xs text-slate-400 uppercase font-medium mt-0.5">Larian Verified</div>
              </div>
            </div>
          </div>

          {/* Quick Jump Bar */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Featured Tools:
            </span>
            {bg3Tools.map(t => (
              <button
                key={t.id}
                onClick={() => onNavigate(`/tools/${t.slug}`)}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 transition-colors"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Category Filter Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search BG3 tools (Multiclass, Dice, Alchemy, Romance, AC, Smite, Origin)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool, idx) => (
            <React.Fragment key={tool.id}>
              {idx === 4 && <div className="col-span-full"><AdLayout.HubInFeed /></div>}
              <ToolCard
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
              />
            </React.Fragment>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
            <Dices className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="font-medium">No tools found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-4 py-1.5 text-xs font-semibold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Deep-Dive Mechanics & Endgame Strategy Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Baldur's Gate 3 Master Strategy & Combat Mechanics Guide
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive D&D 5e theorycrafting, Larian homebrew rules, and Honour Mode meta execution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-4">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-400" /> 1. The Arcane Acuity & Mystic Scoundrel Crowd Control Loop
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The most unbreakable combat control meta in Baldur's Gate 3 revolves around the <strong className="text-slate-200">Helmet of Arcane Acuity</strong> (gained from the Reithwin mason in Act 2) and the <strong className="text-slate-200">Band of the Mystic Scoundrel</strong> (purchased from the djinn Akabi at the Circus of the Last Days in Act 3).
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every weapon strike adds +2 Arcane Acuity (+2 to spell attack and DC, up to +10 maximum). A College of Swords Bard using Ranged Slashing Flourish hits 4 times in round 1, instantly capping their Spell Save DC at 26+. The ring then allows them to cast Enchantment spells like <em>Hold Monster</em>, <em>Hold Person</em>, or <em>Hypnotic Pattern</em> as a Bonus Action. Bosses like Raphael, Sarevok, and Ansur have a 0% chance to resist, rendering them helpless to 100% guaranteed Critical Hits!
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" /> 2. Exotic Medium Armor & Untouchable AC Stacking
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                In standard D&D 5e rules, Medium Armor caps Dexterity bonus additions at +2. However, Larian introduced three "Exotic Material" medium armors in Baldur's Gate 3: <strong className="text-slate-200">Yuan-Ti Scale Mail</strong> (Act 2 Quartermaster Talli, 15 Base AC), <strong className="text-slate-200">Unwanted Masterwork Scalemail</strong> (Act 3, 16 Base AC), and <strong className="text-slate-200">Armour of Agility</strong> (Act 3 Gloomy Fentona, 17 Base AC).
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                These armors add your <strong className="text-amber-300">FULL Dexterity modifier with zero cap</strong> while imposing no stealth disadvantage! With 20 DEX (+5), Armour of Agility provides 22 AC passively. Stacking a Shield (+2/+3), Ring of Protection (+1), Cloak of Protection (+1), and Defense Fighting Style (+1) yields 27+ passive AC. Enemies in Act 3 need a Natural 20 just to touch you!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Swords className="w-4 h-4 text-red-400" /> 3. Tavern Brawler, Strength Elixirs & Throwzerkers
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Larian's implementation of the <strong className="text-slate-200">Tavern Brawler feat</strong> is extraordinarily potent: when you make an unarmed attack, use an improvised weapon, or throw something, your Strength modifier is added twice to both the Attack Roll and the Damage Roll.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                When combined with daily <strong className="text-amber-300">Elixirs of Cloud Giant Strength</strong> (setting STR to 27, an +8 modifier), Tavern Brawler provides an automatic +16 bonus to hit and +16 flat damage per strike! A Berserker Barbarian 5 / Thief Rogue 4 / Eldritch Knight 3 ("Throwzerker") using the returning trident <em>Nyrulna</em> can throw 4 times per turn from 20 meters away, dealing over 200 damage per round with 95% guaranteed accuracy even against Honour Mode bosses.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" /> 4. Camp Buffer Hirelings & Rest Optimization
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A vital technique for surviving Honour Mode is the "Camp Caster" routine. Recruited hirelings or bench companions stay safely in camp while casting non-concentration "Until Long Rest" spells onto your active adventuring party:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-xs">
                <li><strong className="text-slate-200">Aid (Level 5/6):</strong> Grants +20 to +25 permanent maximum HP to all 4 party members and summons.</li>
                <li><strong className="text-slate-200">Heroes' Feast:</strong> Grants +12 HP, complete immunity to Poison and Disease, and Advantage on all Wisdom saves.</li>
                <li><strong className="text-slate-200">Longstrider:</strong> Free ritual spell adding +3 meters of movement speed to every member.</li>
                <li><strong className="text-slate-200">Death Ward:</strong> Prevents party members from falling below 1 HP if an unexpected lethal burst occurs.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>



      {/* Frequently Asked Questions Accordion */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Baldur's Gate 3 Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Everything you need to know about dice odds, multiclassing, alchemy, and romance flags
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white hover:text-amber-400 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base">{faq.q}</span>
                {openFaqIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>

              {openFaqIndex === index && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hub Above Footer Banner Ad Slot */}
      <AdLayout.HubAboveFooter />
    </div>
  );
}
