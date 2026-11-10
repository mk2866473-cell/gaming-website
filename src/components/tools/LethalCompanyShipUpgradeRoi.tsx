import React, { useState, useMemo } from 'react';
import {
  Rocket,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Radio,
  Truck,
  Zap,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface ShipUpgrade {
  id: string;
  name: string;
  price: number;
  iconName: string;
  category: 'tactical' | 'utility' | 'transport';
  bodyRecoverySavingsPerQuota: number; // estimated $ saved from body recovery fees
  timeSavedPerRunSeconds: number;
  description: string;
  strategicValue: string;
  recommendedQuota: number;
}

const SHIP_UPGRADES: ShipUpgrade[] = [
  {
    id: 'teleporter',
    name: 'Standard Teleporter',
    price: 375,
    iconName: 'Zap',
    category: 'tactical',
    bodyRecoverySavingsPerQuota: 60, // $20 fee per corpse saved x ~3 dead players
    timeSavedPerRunSeconds: 45,
    description: 'Instantly teleports targeted crew member back to ship terminal. Drop all held scrap items upon warp.',
    strategicValue: 'Recovers player corpses to prevent the $20/body Company deduction fee. Saves players trapped by Jester/Coil-Head.',
    recommendedQuota: 2
  },
  {
    id: 'inverse-teleporter',
    name: 'Inverse Teleporter',
    price: 425,
    iconName: 'Rocket',
    category: 'utility',
    bodyRecoverySavingsPerQuota: 20,
    timeSavedPerRunSeconds: 120,
    description: 'Teleports player to a completely random internal location inside the facility. Drops all inventory items.',
    strategicValue: 'Fast-forwards interior exploration and bypasses main locked doors early in the day. High risk on Titan/Rend.',
    recommendedQuota: 3
  },
  {
    id: 'signal-translator',
    name: 'Signal Translator',
    price: 255,
    iconName: 'Radio',
    category: 'tactical',
    bodyRecoverySavingsPerQuota: 40,
    timeSavedPerRunSeconds: 60,
    description: 'Broadcasts short text messages (up to 9 characters) directly onto all crew members HUD screens.',
    strategicValue: 'Warns field scavengers of lethal threats without sound ("DOG OUTSIDE", "JESTER WND", "TURRET IN"). Saves entire teams.',
    recommendedQuota: 1
  },
  {
    id: 'loud-horn',
    name: 'Loud Horn',
    price: 100,
    iconName: 'AlertTriangle',
    category: 'utility',
    bodyRecoverySavingsPerQuota: 15,
    timeSavedPerRunSeconds: 30,
    description: 'Pulling the ship horn cord emits a loud acoustic noise heard across the entire exterior moon map.',
    strategicValue: 'Lures Eyeless Dogs away from the ship entrance doors. Serves as a fog/blizzard directional beacon for lost scavengers.',
    recommendedQuota: 1
  },
  {
    id: 'company-cruiser',
    name: 'Company Cruiser (v50+)',
    price: 400,
    iconName: 'Truck',
    category: 'transport',
    bodyRecoverySavingsPerQuota: 80,
    timeSavedPerRunSeconds: 180,
    description: '4-wheel drive drop vehicle with trunk storage capacity for bulk two-handed heavy scrap transport.',
    strategicValue: 'Transforms high-yield moons (Artifice, Adamance) by hauling 10+ two-handed items in a single trip. Requires practice driving.',
    recommendedQuota: 3
  }
];

export const LethalCompanyShipUpgradeRoi: React.FC = () => {
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>(['teleporter', 'signal-translator']);
  const [averageScrapPerQuota, setAverageScrapPerQuota] = useState<number>(650);
  const [crewDeathsPerQuota, setCrewDeathsPerQuota] = useState<number>(2);
  const [targetQuotaNumber, setTargetQuotaNumber] = useState<number>(3);

  const toggleUpgrade = (id: string) => {
    setSelectedUpgrades((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const roiCalculations = useMemo(() => {
    const totalInvestment = SHIP_UPGRADES.filter((u) => selectedUpgrades.includes(u.id)).reduce(
      (sum, u) => sum + u.price,
      0
    );

    // Calculate body recovery savings
    // Company charges $20 per body left behind. Teleporter / Cruiser / Signal Translator reduce corpse loss.
    const bodyFeeSavedPerQuota = selectedUpgrades.reduce((sum, id) => {
      const upgrade = SHIP_UPGRADES.find((u) => u.id === id);
      if (!upgrade) return sum;

      if (id === 'teleporter') {
        return sum + crewDeathsPerQuota * 20; // saves 100% of dead bodies
      }
      return sum + (upgrade.bodyRecoverySavingsPerQuota * (crewDeathsPerQuota / 2));
    }, 0);

    // Time efficiency value in estimated extra scrap extracted
    const totalSecondsSaved = selectedUpgrades.reduce((sum, id) => {
      const upgrade = SHIP_UPGRADES.find((u) => u.id === id);
      return sum + (upgrade ? upgrade.timeSavedPerRunSeconds : 0);
    }, 0);

    // Convert time saved to estimated extra scrap value (~ $0.75 per saved second of day)
    const timeValuedScrapPerQuota = Math.round(totalSecondsSaved * 0.75);

    const totalQuotaSavingsAndGain = bodyFeeSavedPerQuota + timeValuedScrapPerQuota;

    const quotasToBreakEven =
      totalQuotaSavingsAndGain > 0 ? (totalInvestment / totalQuotaSavingsAndGain).toFixed(1) : 'N/A';

    const netValueByTargetQuota =
      totalQuotaSavingsAndGain * targetQuotaNumber - totalInvestment;

    return {
      totalInvestment,
      bodyFeeSavedPerQuota: Math.round(bodyFeeSavedPerQuota),
      timeValuedScrapPerQuota,
      totalQuotaSavingsAndGain: Math.round(totalQuotaSavingsAndGain),
      quotasToBreakEven,
      netValueByTargetQuota: Math.round(netValueByTargetQuota)
    };
  }, [selectedUpgrades, crewDeathsPerQuota, averageScrapPerQuota, targetQuotaNumber]);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Title */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Ship Upgrades Return-on-Investment (ROI) Tool</h2>
            <p className="text-xs text-slate-400">
              Calculate payback periods, body penalty fee savings ($20/corpse), and team survival efficiency per upgrade.
            </p>
          </div>
        </div>
      </div>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Average Scrap per Quota
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-mono">$</span>
            <input
              type="number"
              value={averageScrapPerQuota}
              onChange={(e) => setAverageScrapPerQuota(Math.max(100, parseInt(e.target.value) || 0))}
              className="w-full pl-7 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Avg Dead Players per Quota
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[0, 1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setCrewDeathsPerQuota(num)}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  crewDeathsPerQuota === num
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:border-slate-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Target Quota Horizon
          </label>
          <select
            value={targetQuotaNumber}
            onChange={(e) => setTargetQuotaNumber(parseInt(e.target.value))}
            className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
          >
            <option value={2}>2 Quotas (Short Term)</option>
            <option value={4}>4 Quotas (Medium Term)</option>
            <option value={6}>6 Quotas (Long Term High Tier)</option>
            <option value={10}>10+ Quotas (Endgame Titan / Artifice)</option>
          </select>
        </div>
      </div>

      {/* Upgrades Selector Cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Select Planned Ship Upgrades
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHIP_UPGRADES.map((upgrade) => {
            const isSelected = selectedUpgrades.includes(upgrade.id);

            return (
              <div
                key={upgrade.id}
                onClick={() => toggleUpgrade(upgrade.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-900/60 border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-white text-sm">{upgrade.name}</h4>
                  <span className="font-mono font-bold text-cyan-400 text-sm">${upgrade.price}</span>
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">{upgrade.description}</p>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-[11px] text-slate-400 mb-3">
                  <strong className="text-slate-200">ROI Impact: </strong>
                  {upgrade.strategicValue}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Rec. Quota: #{upgrade.recommendedQuota}+</span>
                  <span
                    className={`font-semibold text-xs px-2 py-0.5 rounded border ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Click to Add'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROI Financial Analysis */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Investment Financial Breakdown
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
          <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Upgrade Cost</span>
            <p className="text-2xl font-mono font-bold text-cyan-400">${roiCalculations.totalInvestment}</p>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Est. Payback Period</span>
            <p className="text-2xl font-mono font-bold text-amber-400">{roiCalculations.quotasToBreakEven} Quotas</p>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Corpse Fee Savings / Quota</span>
            <p className="text-2xl font-mono font-bold text-emerald-400">${roiCalculations.bodyFeeSavedPerQuota}</p>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Net ROI After #{targetQuotaNumber} Quotas</span>
            <p
              className={`text-2xl font-mono font-bold ${
                roiCalculations.netValueByTargetQuota >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              ${roiCalculations.netValueByTargetQuota}
            </p>
          </div>
        </div>

        {/* Priority Buy Recommendation */}
        <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-lg flex items-start gap-3 text-xs leading-relaxed text-slate-300">
          <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white mb-1">Company Executive Logistics Advice:</p>
            {selectedUpgrades.includes('teleporter') ? (
              <span>
                <strong>Standard Teleporter</strong> is your top ROI purchase. Rescuing dead crew members prevents the $20 penalty fee per corpse deducted at deadline day.
              </span>
            ) : (
              <span>
                Consider adding <strong>Standard Teleporter</strong> ($375) to prevent heavy corpse non-recovery fines on moons with high lethality (Titan, Rend, Dine).
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LethalCompanyShipUpgradeRoi;
