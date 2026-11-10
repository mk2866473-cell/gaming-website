/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Users, UserPlus, Shuffle, Copy, Check, Shield, Sword, Heart, 
  Crown, Dices, Award, RefreshCw, Trash2, Zap
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  skill: number; // 1 to 10
  role: 'DPS' | 'Tank' | 'Support' | 'IGL' | 'Flex';
}

const DEFAULT_ROSTER: Player[] = [
  { id: '1', name: 'Aiden (Ace)', skill: 9, role: 'DPS' },
  { id: '2', name: 'ShadowNinja', skill: 8, role: 'IGL' },
  { id: '3', name: 'Valkyrie', skill: 7, role: 'Support' },
  { id: '4', name: 'IronClad', skill: 7, role: 'Tank' },
  { id: '5', name: 'PixelGamer', skill: 5, role: 'Flex' },
  { id: '6', name: 'FrostByte', skill: 8, role: 'DPS' },
  { id: '7', name: 'NovaStrike', skill: 6, role: 'Tank' },
  { id: '8', name: 'HealerHero', skill: 6, role: 'Support' },
  { id: '9', name: 'SniperWolf', skill: 7, role: 'DPS' },
  { id: '10', name: 'GhostRider', skill: 5, role: 'Flex' }
];

export default function TeamGenerator() {
  const [players, setPlayers] = useState<Player[]>(DEFAULT_ROSTER);
  const [numTeams, setNumTeams] = useState<number>(2);
  const [balanceMode, setBalanceMode] = useState<'skill' | 'random'>('skill');
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [newPlayerSkill, setNewPlayerSkill] = useState<number>(6);
  const [newPlayerRole, setNewPlayerRole] = useState<Player['role']>('Flex');
  
  // Bulk paste text area modal
  const [bulkInput, setBulkInput] = useState<string>('');
  const [showBulkInput, setShowBulkInput] = useState<boolean>(false);

  // Coin Flip mini-tool
  const [coinResult, setCoinResult] = useState<string | null>(null);
  const [isFlippingCoin, setIsFlippingCoin] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);
  const [randomSeed, setRandomSeed] = useState<number>(1);

  // Add individual player
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    const newP: Player = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      skill: newPlayerSkill,
      role: newPlayerRole
    };
    setPlayers([...players, newP]);
    setNewPlayerName('');
  };

  // Bulk add players
  const handleBulkAdd = () => {
    const lines = bulkInput.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    const newItems: Player[] = lines.map((name, idx) => ({
      id: `${Date.now()}-${idx}`,
      name,
      skill: 6,
      role: 'Flex'
    }));
    setPlayers(newItems);
    setShowBulkInput(false);
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const updatePlayer = (id: string, field: keyof Player, value: any) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  // Balance and group teams
  const { teams, fairnessScore, avgSkill } = useMemo(() => {
    if (players.length === 0 || numTeams <= 0) {
      return { teams: [], fairnessScore: 100, avgSkill: 0 };
    }

    const teamList: { id: number; name: string; players: Player[]; totalSkill: number }[] = Array.from(
      { length: numTeams },
      (_, i) => ({ id: i + 1, name: `Team ${String.fromCharCode(65 + i)}`, players: [], totalSkill: 0 })
    );

    const pool = [...players];

    if (balanceMode === 'random') {
      // Shuffle randomly
      pool.sort(() => Math.random() - 0.5);
      pool.forEach((player, idx) => {
        const teamIdx = idx % numTeams;
        teamList[teamIdx].players.push(player);
        teamList[teamIdx].totalSkill += player.skill;
      });
    } else {
      // Skill balanced greedy snake-draft
      pool.sort((a, b) => b.skill - a.skill);
      pool.forEach((player) => {
        // Place player into team with currently lowest total MMR
        teamList.sort((a, b) => a.totalSkill - b.totalSkill);
        teamList[0].players.push(player);
        teamList[0].totalSkill += player.skill;
      });
      // Re-sort teams by initial order
      teamList.sort((a, b) => a.id - b.id);
    }

    const totalPoolSkill = players.reduce((sum, p) => sum + p.skill, 0);
    const avg = totalPoolSkill / (players.length || 1);
    
    // Compute fairness score (100 - max deviation %)
    const skills = teamList.map(t => t.totalSkill);
    const minSkill = Math.min(...skills);
    const maxSkill = Math.max(...skills);
    const diff = maxSkill - minSkill;
    const fairness = Math.max(0, Math.min(100, Math.round(100 - (diff / (totalPoolSkill || 1)) * 100)));

    return { teams: teamList, fairnessScore: fairness, avgSkill: Math.round(avg * 10) / 10 };
  }, [players, numTeams, balanceMode, randomSeed]);

  // Flip coin
  const handleFlipCoin = () => {
    setIsFlippingCoin(true);
    setTimeout(() => {
      setCoinResult(Math.random() > 0.5 ? 'Team A (Heads)' : 'Team B (Tails)');
      setIsFlippingCoin(false);
    }, 600);
  };

  // Copy Discord formatted message
  const handleCopyDiscord = () => {
    let text = `[BALANCED TEAMS ROSTER] (Fairness: ${fairnessScore}%)\n\n`;
    teams.forEach(t => {
      text += `[Team] ${t.name} (Total Skill: ${t.totalSkill} | Avg: ${(t.totalSkill / (t.players.length || 1)).toFixed(1)})\n`;
      t.players.forEach(p => {
        text += `  • ${p.name} [${p.role}] (Skill: ${p.skill}/10)\n`;
      });
      text += '\n';
    });
    text += `*Generated via GamingToolsHub.com*`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Configuration Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-sm font-bold text-zinc-100">Match Setup & Team Balancer</h2>
              <p className="text-[11px] text-zinc-400">Total Players: {players.length}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowBulkInput(!showBulkInput)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
            >
              📋 Bulk Paste Roster
            </button>
            <button
              onClick={() => setRandomSeed(s => s + 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Re-Balance
            </button>
          </div>
        </div>

        {showBulkInput && (
          <div className="my-4 p-4 bg-zinc-950 rounded-xl border border-zinc-700 space-y-3">
            <label className="block text-xs font-medium text-zinc-300">
              Paste player names (one per line or comma-separated):
            </label>
            <textarea
              rows={4}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder="Ace, Shadow, Valkyrie, IronClad, Pixel, FrostByte..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowBulkInput(false)}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAdd}
                className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
              >
                Apply Roster
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {/* Number of teams */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Number of Teams
            </label>
            <div className="flex gap-1.5">
              {[2, 3, 4, 6, 8].map((n) => (
                <button
                  key={n}
                  onClick={() => setNumTeams(n)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    numTeams === n
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Balancing Strategy
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setBalanceMode('skill')}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                  balanceMode === 'skill'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Skill (MMR)</span>
              </button>
              <button
                onClick={() => setBalanceMode('random')}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  balanceMode === 'random'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                🎲 Pure Random
              </button>
            </div>
          </div>

          {/* Fairness score */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">
                Fairness Index
              </span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {fairnessScore}% Balanced
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">
                Avg Player MMR
              </span>
              <span className="text-sm font-bold font-mono text-zinc-300">
                {avgSkill} / 10
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Teams Output */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-zinc-800 gap-2">
          <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            Generated Squad Rosters
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFlipCoin}
              disabled={isFlippingCoin}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 flex items-center gap-1.5 transition-colors"
            >
              <Dices className="w-3.5 h-3.5 text-amber-400" />
              {isFlippingCoin ? 'Flipping...' : coinResult ? `Coin: ${coinResult}` : 'Coin Flip (Side Pick)'}
            </button>
            <button
              onClick={handleCopyDiscord}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied to Discord' : 'Copy Discord Format'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team, idx) => {
            const teamAvg = (team.totalSkill / (team.players.length || 1)).toFixed(1);
            return (
              <div
                key={team.id}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-zinc-100">{team.name}</h4>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">
                      Total MMR: <strong className="text-emerald-400">{team.totalSkill}</strong> (Avg: {teamAvg})
                    </span>
                  </div>

                  <div className="space-y-2">
                    {team.players.map((p, pIdx) => (
                      <div
                        key={p.id}
                        className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          {pIdx === 0 && (
                            <span title="Captain">
                              <Crown className="w-3.5 h-3.5 text-amber-400" />
                            </span>
                          )}
                          <span className="font-medium text-zinc-200">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                            {p.role}
                          </span>
                          <span className="text-xs font-mono font-bold text-indigo-400">
                            {p.skill}/10
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 text-right mt-3 pt-2 border-t border-zinc-900">
                  {team.players.length} Players
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Player List Editor */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-zinc-100 mb-3 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-emerald-400" />
          Add Player or Edit Ratings
        </h3>

        {/* Quick Add Form */}
        <form onSubmit={handleAddPlayer} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
          <input
            type="text"
            placeholder="Player Nickname..."
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            className="sm:col-span-2 bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-700 rounded-lg px-2.5">
            <span className="text-xs text-zinc-400">Skill:</span>
            <input
              type="number"
              min="1"
              max="10"
              value={newPlayerSkill}
              onChange={(e) => setNewPlayerSkill(parseInt(e.target.value, 10) || 1)}
              className="w-full bg-transparent text-xs font-mono text-white text-center focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add Player
          </button>
        </form>

        {/* Existing Player Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {players.map((player) => (
            <div
              key={player.id}
              className="p-2.5 bg-zinc-950 border border-zinc-800/80 rounded-lg flex items-center justify-between gap-2 text-xs"
            >
              <input
                type="text"
                value={player.name}
                onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                className="bg-transparent text-zinc-200 font-medium w-32 focus:outline-none focus:text-white"
              />
              <div className="flex items-center gap-2">
                <select
                  value={player.role}
                  onChange={(e) => updatePlayer(player.id, 'role', e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 text-[11px] text-zinc-300 rounded px-1.5 py-0.5 focus:outline-none"
                >
                  <option value="DPS">DPS</option>
                  <option value="Tank">Tank</option>
                  <option value="Support">Support</option>
                  <option value="IGL">IGL</option>
                  <option value="Flex">Flex</option>
                </select>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={player.skill}
                  onChange={(e) => updatePlayer(player.id, 'skill', parseInt(e.target.value, 10) || 1)}
                  className="w-10 bg-zinc-900 border border-zinc-700 text-center font-mono text-xs text-indigo-400 rounded py-0.5 focus:outline-none"
                />
                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-zinc-600 hover:text-red-400 p-1"
                  title="Remove player"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
