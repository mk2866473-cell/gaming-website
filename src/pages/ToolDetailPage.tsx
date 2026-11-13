/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Star, Users, Clock, ArrowRight, ArrowLeft, BookOpen, Lightbulb, 
  HelpCircle, ChevronDown, ChevronUp, Share2, Check, Cpu, Binary,
  Calculator, CheckCircle2, Compass, Layers, ExternalLink, Zap, ShieldCheck
} from 'lucide-react';
import { ToolItem, getGameById, getCategoryById, TOOLS, getGamePath } from '../data/gamesAndTools';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';
import AdLayout from '../components/ads/AdLayout';
import { getGameIcon } from '../components/GameIcons';
import { 
  getToolWorkedExamples, 
  getToolDeepDive, 
  getEnhancedToolFaqs, 
  getEnhancedToolSeoTitle 
} from '../utils/toolSeoContent';

// Tools components
const MinecraftCircleGenerator = React.lazy(() => import('../components/tools/MinecraftCircleGenerator'));
const MinecraftSphereGenerator = React.lazy(() => import('../components/tools/MinecraftSphereGenerator'));
const MinecraftDomeGenerator = React.lazy(() => import('../components/tools/MinecraftDomeGenerator'));
const MinecraftNetherPortalCalculator = React.lazy(() => import('../components/tools/MinecraftNetherPortalCalculator'));
const MinecraftCoordinateConverter = React.lazy(() => import('../components/tools/MinecraftCoordinateConverter'));
const MinecraftDistanceCalculator = React.lazy(() => import('../components/tools/MinecraftDistanceCalculator'));
const MinecraftXpCalculator = React.lazy(() => import('../components/tools/MinecraftXpCalculator'));
const MinecraftEnchantmentCalculator = React.lazy(() => import('../components/tools/MinecraftEnchantmentCalculator'));
const MinecraftAnvilCostCalculator = React.lazy(() => import('../components/tools/MinecraftAnvilCostCalculator'));
const MinecraftStackCalculator = React.lazy(() => import('../components/tools/MinecraftStackCalculator'));
const MinecraftBeaconCalculator = React.lazy(() => import('../components/tools/MinecraftBeaconCalculator'));
const MinecraftDamageCalculator = React.lazy(() => import('../components/tools/MinecraftDamageCalculator'));
const MinecraftRedstoneTickCalculator = React.lazy(() => import('../components/tools/MinecraftRedstoneTickCalculator'));
const MinecraftFurnaceFuelCalculator = React.lazy(() => import('../components/tools/MinecraftFurnaceFuelCalculator'));
const MinecraftOvalGenerator = React.lazy(() => import('../components/tools/MinecraftOvalGenerator'));
const MinecraftSlimeChunkFinder = React.lazy(() => import('../components/tools/MinecraftSlimeChunkFinder'));
const MinecraftBannerDesigner = React.lazy(() => import('../components/tools/MinecraftBannerDesigner'));
const MinecraftStrongholdFinder = React.lazy(() => import('../components/tools/MinecraftStrongholdFinder'));
const MinecraftPixelArtConverter = React.lazy(() => import('../components/tools/MinecraftPixelArtConverter'));
const MinecraftBrewingCalculator = React.lazy(() => import('../components/tools/MinecraftBrewingCalculator'));
// Roblox tools
const RobuxTaxCalculator = React.lazy(() => import('../components/tools/RobuxTaxCalculator'));
const RobuxCalculator = React.lazy(() => import('../components/tools/RobuxCalculator'));
const RobloxDevExCalculator = React.lazy(() => import('../components/tools/RobloxDevExCalculator'));
const BloxFruitsCalculator = React.lazy(() => import('../components/tools/BloxFruitsCalculator'));
const BloxFruitsXpCalculator = React.lazy(() => import('../components/tools/BloxFruitsXpCalculator'));
const BloxFruitsStatCalculator = React.lazy(() => import('../components/tools/BloxFruitsStatCalculator'));
const BloxFruitsDamageCalculator = React.lazy(() => import('../components/tools/BloxFruitsDamageCalculator'));
const RobloxGamepassRevenueCalculator = React.lazy(() => import('../components/tools/RobloxGamepassRevenueCalculator'));
const RobloxDeveloperEarningsCalculator = React.lazy(() => import('../components/tools/RobloxDeveloperEarningsCalculator'));
const RobloxPremiumPayoutCalculator = React.lazy(() => import('../components/tools/RobloxPremiumPayoutCalculator'));
const BloxFruitsMasteryCalculator = React.lazy(() => import('../components/tools/BloxFruitsMasteryCalculator'));
const BloxFruitsAwakeningCalculator = React.lazy(() => import('../components/tools/BloxFruitsAwakeningCalculator'));
const BloxFruitsRaceV4Calculator = React.lazy(() => import('../components/tools/BloxFruitsRaceV4Calculator'));
const BloxFruitsRaidCalculator = React.lazy(() => import('../components/tools/BloxFruitsRaidCalculator'));
const BloxFruitsFightingStyleCalculator = React.lazy(() => import('../components/tools/BloxFruitsFightingStyleCalculator'));
const BloxFruitsGachaCalculator = React.lazy(() => import('../components/tools/BloxFruitsGachaCalculator'));
const BloxFruitsFruitSpawnTimer = React.lazy(() => import('../components/tools/BloxFruitsFruitSpawnTimer'));
const BloxFruitsTitleTracker = React.lazy(() => import('../components/tools/BloxFruitsTitleTracker'));
const RobloxUsernameGenerator = React.lazy(() => import('../components/tools/RobloxUsernameGenerator'));
const RobloxFontGenerator = React.lazy(() => import('../components/tools/RobloxFontGenerator'));
const RobloxUgcCalculator = React.lazy(() => import('../components/tools/RobloxUgcCalculator'));
const RobloxGameRevenueEstimator = React.lazy(() => import('../components/tools/RobloxGameRevenueEstimator'));
const RobloxShirtTemplateMaker = React.lazy(() => import('../components/tools/RobloxShirtTemplateMaker'));
const RobloxThumbnailResizer = React.lazy(() => import('../components/tools/RobloxThumbnailResizer'));
const RobloxStudsConverter = React.lazy(() => import('../components/tools/RobloxStudsConverter'));
const RobloxBrickColorPicker = React.lazy(() => import('../components/tools/RobloxBrickColorPicker'));
// Fortnite tools
const FortniteXpCalculator = React.lazy(() => import('../components/tools/FortniteXpCalculator'));
const FortniteBattlePassCalculator = React.lazy(() => import('../components/tools/FortniteBattlePassCalculator'));
const FortniteLevelCalculator = React.lazy(() => import('../components/tools/FortniteLevelCalculator'));
const FortniteXpRequiredCalculator = React.lazy(() => import('../components/tools/FortniteXpRequiredCalculator'));
const FortniteSensitivityConverter = React.lazy(() => import('../components/tools/FortniteSensitivityConverter'));
const FortniteEdpiCalculator = React.lazy(() => import('../components/tools/FortniteEdpiCalculator'));
const FortniteDamageCalculator = React.lazy(() => import('../components/tools/FortniteDamageCalculator'));
const FortniteFallDamageCalculator = React.lazy(() => import('../components/tools/FortniteFallDamageCalculator'));
const FortniteDistanceCalculator = React.lazy(() => import('../components/tools/FortniteDistanceCalculator'));
const FortniteSessionTimer = React.lazy(() => import('../components/tools/FortniteSessionTimer'));
// Pokémon GO tools
const PokemonGoCpCalculator = React.lazy(() => import('../components/tools/PokemonGoCpCalculator'));
const PokemonGoIvCalculator = React.lazy(() => import('../components/tools/PokemonGoIvCalculator'));
const PokemonGoEvolutionCpCalculator = React.lazy(() => import('../components/tools/PokemonGoEvolutionCpCalculator'));
const PokemonGoLevelCalculator = React.lazy(() => import('../components/tools/PokemonGoLevelCalculator'));
const PokemonGoStardustCalculator = React.lazy(() => import('../components/tools/PokemonGoStardustCalculator'));
const PokemonGoCandyCalculator = React.lazy(() => import('../components/tools/PokemonGoCandyCalculator'));
const PokemonGoPowerUpCostCalculator = React.lazy(() => import('../components/tools/PokemonGoPowerUpCostCalculator'));
const PokemonGoRaidDamageCalculator = React.lazy(() => import('../components/tools/PokemonGoRaidDamageCalculator'));
const PokemonGoPvpCalculator = React.lazy(() => import('../components/tools/PokemonGoPvpCalculator'));
const PokemonGoCatchCpCalculator = React.lazy(() => import('../components/tools/PokemonGoCatchCpCalculator'));
// Palworld tools
const PalworldBreedingCalculator = React.lazy(() => import('../components/tools/PalworldBreedingCalculator'));
const PalworldReverseBreedingCalculator = React.lazy(() => import('../components/tools/PalworldReverseBreedingCalculator'));
const PalworldBreedingPathFinder = React.lazy(() => import('../components/tools/PalworldBreedingPathFinder'));
const PalworldIvCalculator = React.lazy(() => import('../components/tools/PalworldIvCalculator'));
const PalworldDamageCalculator = React.lazy(() => import('../components/tools/PalworldDamageCalculator'));
const PalworldCaptureCalculator = React.lazy(() => import('../components/tools/PalworldCaptureCalculator'));
const PalworldWorkSpeedCalculator = React.lazy(() => import('../components/tools/PalworldWorkSpeedCalculator'));
const PalworldBaseTeamCalculator = React.lazy(() => import('../components/tools/PalworldBaseTeamCalculator'));
const PalworldCraftingCalculator = React.lazy(() => import('../components/tools/PalworldCraftingCalculator'));
const PalworldMaterialCalculator = React.lazy(() => import('../components/tools/PalworldMaterialCalculator'));
const PalworldCondensationCalculator = React.lazy(() => import('../components/tools/PalworldCondensationCalculator'));
const PalworldTechPointCalculator = React.lazy(() => import('../components/tools/PalworldTechPointCalculator'));
const TeamGenerator = React.lazy(() => import('../components/tools/TeamGenerator'));
const GamingDecisionWheel = React.lazy(() => import('../components/tools/GamingDecisionWheel'));
const HelldiversBreakpointCalculator = React.lazy(() => import('../components/tools/HelldiversBreakpointCalculator'));
const HelldiversArmorCalculator = React.lazy(() => import('../components/tools/HelldiversArmorCalculator'));
const HelldiversStratagemSyncCalculator = React.lazy(() => import('../components/tools/HelldiversStratagemSyncCalculator'));
const HelldiversXpWarbondCalculator = React.lazy(() => import('../components/tools/HelldiversXpWarbondCalculator'));
const HelldiversDpsRecoilCalculator = React.lazy(() => import('../components/tools/HelldiversDpsRecoilCalculator'));
const HelldiversMajorOrderTracker = React.lazy(() => import('../components/tools/HelldiversMajorOrderTracker'));
const HelldiversSampleCalculator = React.lazy(() => import('../components/tools/HelldiversSampleCalculator'));
const HelldiversShipModuleCalculator = React.lazy(() => import('../components/tools/HelldiversShipModuleCalculator'));
const HelldiversTtkCalculator = React.lazy(() => import('../components/tools/HelldiversTtkCalculator'));
const HelldiversStratagemUnlockCalculator = React.lazy(() => import('../components/tools/HelldiversStratagemUnlockCalculator'));
const HelldiversSuperCreditsCalculator = React.lazy(() => import('../components/tools/HelldiversSuperCreditsCalculator'));
const HelldiversWarbondMedalCalculator = React.lazy(() => import('../components/tools/HelldiversWarbondMedalCalculator'));
const HelldiversEnemyWeaknessCalculator = React.lazy(() => import('../components/tools/HelldiversEnemyWeaknessCalculator'));
const HelldiversArmorTierList = React.lazy(() => import('../components/tools/HelldiversArmorTierList'));
const HelldiversRecoilVisualizer = React.lazy(() => import('../components/tools/HelldiversRecoilVisualizer'));
const HelldiversSampleShipPlanner = React.lazy(() => import('../components/tools/HelldiversSampleShipPlanner'));
const Ps99TradeCalculator = React.lazy(() => import('../components/tools/Ps99TradeCalculator'));
const Ps99ExclusiveDaycareCalculator = React.lazy(() => import('../components/tools/Ps99ExclusiveDaycareCalculator'));
const Ps99EnchantBuilder = React.lazy(() => import('../components/tools/Ps99EnchantBuilder'));
const Ps99EggHatchingCalculator = React.lazy(() => import('../components/tools/Ps99EggHatchingCalculator'));
const Ps99MasteryCalculator = React.lazy(() => import('../components/tools/Ps99MasteryCalculator'));
const Ps99GoldenRainbowCalculator = React.lazy(() => import('../components/tools/Ps99GoldenRainbowCalculator'));
const Ps99RapTracker = React.lazy(() => import('../components/tools/Ps99RapTracker'));
const Ps99ClanBattleCalculator = React.lazy(() => import('../components/tools/Ps99ClanBattleCalculator'));
const Ps99DiamondGrindOptimizer = React.lazy(() => import('../components/tools/Ps99DiamondGrindOptimizer'));
const FirstDescendantDpsCalculator = React.lazy(() => import('../components/tools/FirstDescendantDpsCalculator'));
const TfdSkillDamageSimulator = React.lazy(() => import('../components/tools/TfdSkillDamageSimulator'));
const TfdReactorChecker = React.lazy(() => import('../components/tools/TfdReactorChecker'));
const TfdAmorphousTracker = React.lazy(() => import('../components/tools/TfdAmorphousTracker'));
const TfdComponentOptimizer = React.lazy(() => import('../components/tools/TfdComponentOptimizer'));
const TfdGoldKuiperCalculator = React.lazy(() => import('../components/tools/TfdGoldKuiperCalculator'));
const TfdInvasionTimer = React.lazy(() => import('../components/tools/TfdInvasionTimer'));
const TfdColossusWeaknessCalculator = React.lazy(() => import('../components/tools/TfdColossusWeaknessCalculator'));
const OnceHumanBlueprintCalculator = React.lazy(() => import('../components/tools/OnceHumanBlueprintCalculator'));
const OnceHumanMysticalCrateMap = React.lazy(() => import('../components/tools/OnceHumanMysticalCrateMap'));
const OnceHumanAcidFarmCalculator = React.lazy(() => import('../components/tools/OnceHumanAcidFarmCalculator'));
const OnceHumanWeaponCalibrationTool = React.lazy(() => import('../components/tools/OnceHumanWeaponCalibrationTool'));
const OnceHumanCradleOverridePlanner = React.lazy(() => import('../components/tools/OnceHumanCradleOverridePlanner'));
const OnceHumanDevianceOptimizer = React.lazy(() => import('../components/tools/OnceHumanDevianceOptimizer'));
const OnceHumanMemeticPlanner = React.lazy(() => import('../components/tools/OnceHumanMemeticPlanner'));
const OnceHumanBossLootCalculator = React.lazy(() => import('../components/tools/OnceHumanBossLootCalculator'));
const WuwaEchoTuningEvaluator = React.lazy(() => import('../components/tools/WuwaEchoTuningEvaluator'));
const WuwaPityPullPlanner = React.lazy(() => import('../components/tools/WuwaPityPullPlanner'));
const WuwaResonanceChainCalculator = React.lazy(() => import('../components/tools/WuwaResonanceChainCalculator'));
const WuwaAscensionMaterialCalculator = React.lazy(() => import('../components/tools/WuwaAscensionMaterialCalculator'));
const WuwaShellCreditOptimizer = React.lazy(() => import('../components/tools/WuwaShellCreditOptimizer'));
const WuwaSonataSynergyBuilder = React.lazy(() => import('../components/tools/WuwaSonataSynergyBuilder'));
const ZzzDriveDiscOptimizer = React.lazy(() => import('../components/tools/ZzzDriveDiscOptimizer'));
const ZzzPolychromePityCalculator = React.lazy(() => import('../components/tools/ZzzPolychromePityCalculator'));
const ZzzDazeStunCalculator = React.lazy(() => import('../components/tools/ZzzDazeStunCalculator'));
const ZzzBangbooSynergySelector = React.lazy(() => import('../components/tools/ZzzBangbooSynergySelector'));
const ZzzInterKnotBatteryPlanner = React.lazy(() => import('../components/tools/ZzzInterKnotBatteryPlanner'));
const ZzzWEngineComparisonTool = React.lazy(() => import('../components/tools/ZzzWEngineComparisonTool'));
const GachaGearSubstatOptimizer = React.lazy(() => import('../components/tools/GachaGearSubstatOptimizer'));
const TypeSoulStatPlanner = React.lazy(() => import('../components/tools/TypeSoulStatPlanner').then(m => ({ default: m.TypeSoulStatPlanner })));
const TypeSoulGradeCalculator = React.lazy(() => import('../components/tools/TypeSoulGradeCalculator'));
const TypeSoulEvolutionTracker = React.lazy(() => import('../components/tools/TypeSoulEvolutionTracker'));
const TypeSoulRaidDropChecker = React.lazy(() => import('../components/tools/TypeSoulRaidDropChecker'));
const TypeSoulClanBuffSimulator = React.lazy(() => import('../components/tools/TypeSoulClanBuffSimulator'));
const TypeSoulComboGauge = React.lazy(() => import('../components/tools/TypeSoulComboGauge'));
const Bg3DiceCalculator = React.lazy(() => import('../components/tools/Bg3DiceCalculator').then(m => ({ default: m.Bg3DiceCalculator })));
const Bg3MulticlassSpellBuilder = React.lazy(() => import('../components/tools/Bg3MulticlassSpellBuilder'));
const Bg3AlchemyRecipeFinder = React.lazy(() => import('../components/tools/Bg3AlchemyRecipeFinder'));
const Bg3CompanionApprovalTracker = React.lazy(() => import('../components/tools/Bg3CompanionApprovalTracker'));
const Bg3ArmorClassOptimizer = React.lazy(() => import('../components/tools/Bg3ArmorClassOptimizer'));
const Bg3WeaponActionDamageCounter = React.lazy(() => import('../components/tools/Bg3WeaponActionDamageCounter'));
const Bg3OriginPassiveGuide = React.lazy(() => import('../components/tools/Bg3OriginPassiveGuide'));
const LethalCompanyQuotaCalculator = React.lazy(() => import('../components/tools/LethalCompanyQuotaCalculator').then(m => ({ default: m.LethalCompanyQuotaCalculator })));
const LethalCompanyQuotaMarginMatrix = React.lazy(() => import('../components/tools/LethalCompanyQuotaMarginMatrix'));
const LethalCompanyMonsterDangerRating = React.lazy(() => import('../components/tools/LethalCompanyMonsterDangerRating'));
const LethalCompanyStoreBudgetPlanner = React.lazy(() => import('../components/tools/LethalCompanyStoreBudgetPlanner'));
const LethalCompanyShipUpgradeRoi = React.lazy(() => import('../components/tools/LethalCompanyShipUpgradeRoi'));
const LethalCompanySpookTubeRevenueCalculator = React.lazy(() => import('../components/tools/LethalCompanySpookTubeRevenueCalculator'));
const StarfieldOutpostCalculator = React.lazy(() => import('../components/tools/StarfieldOutpostCalculator').then(m => ({ default: m.StarfieldOutpostCalculator })));
const StarfieldShipBuilderCalculator = React.lazy(() => import('../components/tools/StarfieldShipBuilderCalculator'));
const StarfieldOutpostSupplyPlanner = React.lazy(() => import('../components/tools/StarfieldOutpostSupplyPlanner'));
const StarfieldSkillTreeAllocator = React.lazy(() => import('../components/tools/StarfieldSkillTreeAllocator'));
const StarfieldPlanetSurveyChecklist = React.lazy(() => import('../components/tools/StarfieldPlanetSurveyChecklist'));
const StarfieldWeaponModCalculator = React.lazy(() => import('../components/tools/StarfieldWeaponModCalculator'));
const StarfieldCrewBuffCalculator = React.lazy(() => import('../components/tools/StarfieldCrewBuffCalculator'));
const EnshroudedBaseCalculator = React.lazy(() => import('../components/tools/EnshroudedBaseCalculator').then(m => ({ default: m.EnshroudedBaseCalculator })));
const EnshroudedFlameAltarCalculator = React.lazy(() => import('../components/tools/EnshroudedFlameAltarCalculator'));
const EnshroudedBuildingBlockCalculator = React.lazy(() => import('../components/tools/EnshroudedBuildingBlockCalculator'));
const EnshroudedSurvivorRecipeFinder = React.lazy(() => import('../components/tools/EnshroudedSurvivorRecipeFinder'));
const EnshroudedComfortBuffTimer = React.lazy(() => import('../components/tools/EnshroudedComfortBuffTimer'));
const EnshroudedSkillTreePlanner = React.lazy(() => import('../components/tools/EnshroudedSkillTreePlanner'));
const EnshroudedGliderGrappleUpgrader = React.lazy(() => import('../components/tools/EnshroudedGliderGrappleUpgrader'));
const NightingaleRealmCardMatrix = React.lazy(() => import('../components/tools/NightingaleRealmCardMatrix'));
const NightingaleMinorCardSimulator = React.lazy(() => import('../components/tools/NightingaleMinorCardSimulator'));
const NightingaleGearScoreCalculator = React.lazy(() => import('../components/tools/NightingaleGearScoreCalculator'));
const NightingaleResourceStatsOptimizer = React.lazy(() => import('../components/tools/NightingaleResourceStatsOptimizer'));
const NightingaleEssenceTraderPlanner = React.lazy(() => import('../components/tools/NightingaleEssenceTraderPlanner'));
const CrkTeamBuilderTool = React.lazy(() => import('../components/tools/CrkTeamBuilderTool'));
const CrkToppingOptimizerTool = React.lazy(() => import('../components/tools/CrkToppingOptimizerTool'));
const CrkProductionChainPlannerTool = React.lazy(() => import('../components/tools/CrkProductionChainPlannerTool'));
const CrkUpgradePlannerTool = React.lazy(() => import('../components/tools/CrkUpgradePlannerTool'));
const CrkPityPlannerTool = React.lazy(() => import('../components/tools/CrkPityPlannerTool'));
const CrkEventTimersTool = React.lazy(() => import('../components/tools/CrkEventTimersTool'));
const AfkjBossTeamPlannerTool = React.lazy(() => import('../components/tools/AfkjBossTeamPlannerTool'));
const AfkjAscensionPlannerTool = React.lazy(() => import('../components/tools/AfkjAscensionPlannerTool'));
const AfkjResourcePlannerTool = React.lazy(() => import('../components/tools/AfkjResourcePlannerTool'));
const AfkjSummonPlannerTool = React.lazy(() => import('../components/tools/AfkjSummonPlannerTool'));
const AfkjTeamBuilderTool = React.lazy(() => import('../components/tools/AfkjTeamBuilderTool'));
const AfkjSeasonTrackerTool = React.lazy(() => import('../components/tools/AfkjSeasonTrackerTool'));
const MogoStickerTrackerTool = React.lazy(() => import('../components/tools/MogoStickerTrackerTool'));
const MogoTradeMatchingTool = React.lazy(() => import('../components/tools/MogoTradeMatchingTool'));
const MogoFreeDiceLinksTool = React.lazy(() => import('../components/tools/MogoFreeDiceLinksTool'));
const MogoEventTimersTool = React.lazy(() => import('../components/tools/MogoEventTimersTool'));
const MogoShieldFinderTool = React.lazy(() => import('../components/tools/MogoShieldFinderTool'));
const MogoUpgradeCostPlannerTool = React.lazy(() => import('../components/tools/MogoUpgradeCostPlannerTool'));
const SkDamageCalculator = React.lazy(() => import('../components/tools/SkDamageCalculator'));
const SkGearManager = React.lazy(() => import('../components/tools/SkGearManager'));
const SkTeamBuilder = React.lazy(() => import('../components/tools/SkTeamBuilder'));
const SkRubyCalculator = React.lazy(() => import('../components/tools/SkRubyCalculator'));
const SkShopOptimizer = React.lazy(() => import('../components/tools/SkShopOptimizer'));
const SkGachaPlanner = React.lazy(() => import('../components/tools/SkGachaPlanner'));
const CmVillageCalculator = React.lazy(() => import('../components/tools/CmVillageCalculator'));
const CmFreeSpinLinks = React.lazy(() => import('../components/tools/CmFreeSpinLinks'));
const CmCardTracker = React.lazy(() => import('../components/tools/CmCardTracker'));
const CmEventPlanner = React.lazy(() => import('../components/tools/CmEventPlanner'));
const CmPetTimer = React.lazy(() => import('../components/tools/CmPetTimer'));
const GrowAGardenCropValueCalculator = React.lazy(() => import('../components/tools/GrowAGardenCropValueCalculator'));
const GrowAGardenMutationCalculator = React.lazy(() => import('../components/tools/GrowAGardenMutationCalculator'));
const GrowAGardenEggHatchingCalculator = React.lazy(() => import('../components/tools/GrowAGardenEggHatchingCalculator'));
const GrowAGardenTradeCalculator = React.lazy(() => import('../components/tools/GrowAGardenTradeCalculator'));
const GrowAGardenStockTimer = React.lazy(() => import('../components/tools/GrowAGardenStockTimer'));
const ModularGamingTool = React.lazy(() => import('../components/tools/ModularGamingTool'));

interface ToolDetailPageProps {
  tool: ToolItem;
  onNavigate: (path: string) => void;
}

export default function ToolDetailPage({ tool, onNavigate }: ToolDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const game = getGameById(tool.gameId);
  const category = getCategoryById(tool.categoryId);

  // Dynamic component map
  const renderToolComponent = () => {
    switch (tool.id) {
      case 'minecraft-circle-generator':
        return <MinecraftCircleGenerator />;
      case 'minecraft-sphere-generator':
        return <MinecraftSphereGenerator />;
      case 'minecraft-dome-generator':
        return <MinecraftDomeGenerator />;
      case 'minecraft-nether-portal-calculator':
        return <MinecraftNetherPortalCalculator />;
      case 'minecraft-coordinate-converter':
        return <MinecraftCoordinateConverter />;
      case 'minecraft-distance-calculator':
        return <MinecraftDistanceCalculator />;
      case 'minecraft-xp-calculator':
        return <MinecraftXpCalculator />;
      case 'minecraft-enchantment-calculator':
        return <MinecraftEnchantmentCalculator />;
      case 'minecraft-anvil-cost-calculator':
        return <MinecraftAnvilCostCalculator />;
      case 'minecraft-stack-calculator':
        return <MinecraftStackCalculator />;
      case 'minecraft-beacon-calculator':
        return <MinecraftBeaconCalculator />;
      case 'minecraft-damage-calculator':
        return <MinecraftDamageCalculator />;
      case 'minecraft-redstone-tick-calculator':
        return <MinecraftRedstoneTickCalculator />;
      case 'minecraft-furnace-fuel-calculator':
        return <MinecraftFurnaceFuelCalculator />;
      case 'minecraft-oval-generator':
        return <MinecraftOvalGenerator />;
      case 'minecraft-slime-chunk-finder':
        return <MinecraftSlimeChunkFinder />;
      case 'minecraft-banner-designer':
        return <MinecraftBannerDesigner />;
      case 'minecraft-stronghold-finder':
        return <MinecraftStrongholdFinder />;
      case 'minecraft-pixel-art-converter':
        return <MinecraftPixelArtConverter />;
      case 'minecraft-brewing-calculator':
        return <MinecraftBrewingCalculator />;
      case 'robux-tax-calculator':
        return <RobuxTaxCalculator />;
      case 'robux-to-usd-calculator':
        return <RobuxCalculator />;
      case 'roblox-devex-calculator':
        return <RobloxDevExCalculator />;
      case 'blox-fruits-trading-calculator':
        return <BloxFruitsCalculator />;
      case 'blox-fruits-xp-calculator':
        return <BloxFruitsXpCalculator />;
      case 'blox-fruits-stat-calculator':
        return <BloxFruitsStatCalculator />;
      case 'blox-fruits-damage-calculator':
        return <BloxFruitsDamageCalculator />;
      case 'roblox-gamepass-revenue-calculator':
        return <RobloxGamepassRevenueCalculator />;
      case 'roblox-group-payout-calculator':
        return <RobloxDeveloperEarningsCalculator />;
      case 'roblox-premium-payout-calculator':
        return <RobloxPremiumPayoutCalculator />;
      case 'blox-fruits-mastery-calculator':
        return <BloxFruitsMasteryCalculator />;
      case 'blox-fruits-awakening-calculator':
        return <BloxFruitsAwakeningCalculator />;
      case 'blox-fruits-race-v4-calculator':
        return <BloxFruitsRaceV4Calculator />;
      case 'blox-fruits-raid-calculator':
        return <BloxFruitsRaidCalculator />;
      case 'blox-fruits-fighting-style-calculator':
        return <BloxFruitsFightingStyleCalculator />;
      case 'blox-fruits-gacha-calculator':
        return <BloxFruitsGachaCalculator />;
      case 'blox-fruits-fruit-spawn-timer':
        return <BloxFruitsFruitSpawnTimer />;
      case 'blox-fruits-title-tracker':
        return <BloxFruitsTitleTracker />;
      case 'roblox-username-generator':
        return <RobloxUsernameGenerator />;
      case 'roblox-font-generator':
        return <RobloxFontGenerator />;
      case 'roblox-ugc-calculator':
        return <RobloxUgcCalculator />;
      case 'roblox-game-revenue-estimator':
        return <RobloxGameRevenueEstimator />;
      case 'roblox-shirt-template-maker':
        return <RobloxShirtTemplateMaker />;
      case 'roblox-thumbnail-resizer':
        return <RobloxThumbnailResizer />;
      case 'roblox-studs-converter':
        return <RobloxStudsConverter />;
      case 'roblox-brickcolor-picker':
        return <RobloxBrickColorPicker />;
      case 'fortnite-xp-calculator':
        return <FortniteXpCalculator />;
      case 'fortnite-battle-pass-calculator':
        return <FortniteBattlePassCalculator />;
      case 'fortnite-level-calculator':
        return <FortniteLevelCalculator />;
      case 'fortnite-xp-required-calculator':
        return <FortniteXpRequiredCalculator />;
      case 'fortnite-sensitivity-converter':
        return <FortniteSensitivityConverter />;
      case 'fortnite-edpi-calculator':
        return <FortniteEdpiCalculator />;
      case 'fortnite-damage-calculator':
        return <FortniteDamageCalculator />;
      case 'fortnite-fall-damage-calculator':
        return <FortniteFallDamageCalculator />;
      case 'fortnite-distance-calculator':
        return <FortniteDistanceCalculator />;
      case 'fortnite-session-timer':
        return <FortniteSessionTimer />;
      case 'pokemon-go-cp-calculator':
        return <PokemonGoCpCalculator />;
      case 'pokemon-go-iv-calculator':
        return <PokemonGoIvCalculator />;
      case 'pokemon-go-evolution-cp-calculator':
        return <PokemonGoEvolutionCpCalculator />;
      case 'pokemon-go-level-calculator':
        return <PokemonGoLevelCalculator />;
      case 'pokemon-go-stardust-calculator':
        return <PokemonGoStardustCalculator />;
      case 'pokemon-go-candy-calculator':
        return <PokemonGoCandyCalculator />;
      case 'pokemon-go-power-up-cost-calculator':
        return <PokemonGoPowerUpCostCalculator />;
      case 'pokemon-go-raid-damage-calculator':
        return <PokemonGoRaidDamageCalculator />;
      case 'pokemon-go-pvp-calculator':
        return <PokemonGoPvpCalculator />;
      case 'pokemon-go-catch-cp-calculator':
        return <PokemonGoCatchCpCalculator />;
      case 'palworld-breeding-calculator':
        return <PalworldBreedingCalculator />;
      case 'palworld-reverse-breeding-calculator':
        return <PalworldReverseBreedingCalculator />;
      case 'palworld-breeding-path-finder':
        return <PalworldBreedingPathFinder />;
      case 'palworld-iv-calculator':
        return <PalworldIvCalculator />;
      case 'palworld-damage-calculator':
        return <PalworldDamageCalculator />;
      case 'palworld-capture-calculator':
        return <PalworldCaptureCalculator />;
      case 'palworld-work-speed-calculator':
        return <PalworldWorkSpeedCalculator />;
      case 'palworld-base-team-calculator':
        return <PalworldBaseTeamCalculator />;
      case 'palworld-crafting-calculator':
        return <PalworldCraftingCalculator />;
      case 'palworld-material-calculator':
        return <PalworldMaterialCalculator />;
      case 'palworld-condensation-calculator':
        return <PalworldCondensationCalculator />;
      case 'palworld-tech-point-calculator':
        return <PalworldTechPointCalculator />;
      case 'team-generator':
        return <TeamGenerator />;
      case 'gaming-decision-wheel':
        return <GamingDecisionWheel />;
      case 'helldivers-2-damage-calculator':
        return <HelldiversBreakpointCalculator />;
      case 'helldivers-2-armor-calculator':
        return <HelldiversArmorCalculator />;
      case 'helldivers-2-stratagem-cooldown-calculator':
        return <HelldiversStratagemSyncCalculator />;
      case 'helldivers-2-xp-calculator':
        return <HelldiversXpWarbondCalculator />;
      case 'helldivers-2-dps-calculator':
        return <HelldiversDpsRecoilCalculator />;
      case 'helldivers-2-major-order-tracker':
        return <HelldiversMajorOrderTracker />;
      case 'helldivers-2-sample-calculator':
      case 'helldivers-2-ship-module-calculator':
      case 'helldivers-2-sample-ship-planner':
        return <HelldiversSampleShipPlanner />;
      case 'helldivers-2-ttk-calculator':
        return <HelldiversTtkCalculator />;
      case 'helldivers-2-stratagem-unlock-calculator':
        return <HelldiversStratagemUnlockCalculator />;
      case 'helldivers-2-super-credits-calculator':
        return <HelldiversSuperCreditsCalculator />;
      case 'helldivers-2-warbond-medal-calculator':
        return <HelldiversWarbondMedalCalculator />;
      case 'helldivers-2-enemy-weakness-calculator':
        return <HelldiversEnemyWeaknessCalculator />;
      case 'helldivers-2-armor-tier-list':
        return <HelldiversArmorTierList />;
      case 'helldivers-2-recoil-visualizer':
      case 'helldivers-2-recoil-pattern-visualizer':
        return <HelldiversRecoilVisualizer />;
      case 'ps99-trade-calculator':
      case 'ps99-trade-value-wfl-calculator':
      case 'pet-simulator-99-trade-calculator':
        return <Ps99TradeCalculator />;
      case 'ps99-exclusive-daycare-calculator':
        return <Ps99ExclusiveDaycareCalculator />;
      case 'ps99-enchant-builder':
        return <Ps99EnchantBuilder />;
      case 'ps99-egg-hatching-calculator':
        return <Ps99EggHatchingCalculator />;
      case 'ps99-mastery-calculator':
        return <Ps99MasteryCalculator />;
      case 'ps99-golden-rainbow-calculator':
        return <Ps99GoldenRainbowCalculator />;
      case 'ps99-rap-tracker':
        return <Ps99RapTracker />;
      case 'ps99-clan-battle-calculator':
        return <Ps99ClanBattleCalculator />;
      case 'ps99-diamond-grind-optimizer':
        return <Ps99DiamondGrindOptimizer />;
      case 'tfd-weapon-dps-calculator':
      case 'descendant-module-capacity-weapon-dps-calculator':
      case 'tfd-dps-calculator':
        return <FirstDescendantDpsCalculator />;
      case 'tfd-skill-damage-simulator':
        return <TfdSkillDamageSimulator />;
      case 'tfd-reactor-checker':
        return <TfdReactorChecker />;
      case 'tfd-amorphous-tracker':
        return <TfdAmorphousTracker />;
      case 'tfd-component-optimizer':
        return <TfdComponentOptimizer />;
      case 'tfd-gold-kuiper-calculator':
        return <TfdGoldKuiperCalculator />;
      case 'tfd-invasion-timer':
        return <TfdInvasionTimer />;
      case 'tfd-colossus-weakness-calculator':
        return <TfdColossusWeaknessCalculator />;
      case 'once-human-blueprint-calculator':
      case 'blueprint-star-upgrade-fragment-xp-calculator':
      case 'once-human-blueprint-star-upgrade-fragment-xp-calculator':
        return <OnceHumanBlueprintCalculator />;
      case 'once-human-mystical-crate-map':
        return <OnceHumanMysticalCrateMap />;
      case 'once-human-acid-farm-calculator':
        return <OnceHumanAcidFarmCalculator />;
      case 'once-human-weapon-calibration-tool':
        return <OnceHumanWeaponCalibrationTool />;
      case 'once-human-cradle-override-planner':
        return <OnceHumanCradleOverridePlanner />;
      case 'once-human-deviance-optimizer':
        return <OnceHumanDevianceOptimizer />;
      case 'once-human-memetic-specialization-planner':
        return <OnceHumanMemeticPlanner />;
      case 'once-human-boss-loot-calculator':
        return <OnceHumanBossLootCalculator />;
      case 'wuwa-echo-tuning-evaluator':
        return <WuwaEchoTuningEvaluator />;
      case 'wuwa-pity-pull-planner':
        return <WuwaPityPullPlanner />;
      case 'wuwa-resonance-chain-calculator':
        return <WuwaResonanceChainCalculator />;
      case 'wuwa-ascension-material-calculator':
        return <WuwaAscensionMaterialCalculator />;
      case 'wuwa-shell-credit-optimizer':
        return <WuwaShellCreditOptimizer />;
      case 'wuwa-sonata-synergy-builder':
        return <WuwaSonataSynergyBuilder />;
      case 'zzz-drive-disc-optimizer':
      case 'zzz-drive-disc-anomaly-optimizer':
        return <ZzzDriveDiscOptimizer />;
      case 'zzz-polychrome-pity-calculator':
        return <ZzzPolychromePityCalculator />;
      case 'zzz-daze-stun-calculator':
        return <ZzzDazeStunCalculator />;
      case 'zzz-bangboo-synergy-selector':
        return <ZzzBangbooSynergySelector />;
      case 'zzz-inter-knot-battery-planner':
        return <ZzzInterKnotBatteryPlanner />;
      case 'zzz-w-engine-comparison-tool':
        return <ZzzWEngineComparisonTool />;
      case 'gacha-gear-substat-optimizer':
      case 'echo-drive-disc-sub-stat-optimizer-pity-tracker':
      case 'wuwa-echo-optimizer':
        return <GachaGearSubstatOptimizer />;
      case 'type-soul-stat-planner':
      case 'type-soul-stat-tree-allocator':
      case 'stat-build-planner-skill-tree-allocator':
      case 'type-soul-planner':
        return <TypeSoulStatPlanner />;
      case 'type-soul-grade-calculator':
        return <TypeSoulGradeCalculator />;
      case 'type-soul-evolution-tracker':
        return <TypeSoulEvolutionTracker />;
      case 'type-soul-raid-drop-checker':
        return <TypeSoulRaidDropChecker />;
      case 'type-soul-clan-buff-simulator':
        return <TypeSoulClanBuffSimulator />;
      case 'type-soul-combo-gauge':
        return <TypeSoulComboGauge />;
      case 'bg3-multiclass-spell-builder':
      case 'multiclass-skill-spell-slot-builder':
        return <Bg3MulticlassSpellBuilder />;
      case 'bg3-dice-probability-calculator':
      case 'dice-roll-advantage-disadvantage-probability-calculator':
      case 'bg3-dice-calculator':
        return <Bg3DiceCalculator />;
      case 'bg3-alchemy-recipe-finder':
      case 'alchemy-crafting-recipe-finder':
        return <Bg3AlchemyRecipeFinder />;
      case 'bg3-companion-approval-tracker':
      case 'companion-approval-romance-tracker':
        return <Bg3CompanionApprovalTracker />;
      case 'bg3-armor-class-optimizer':
      case 'armor-class-ac-saving-throw-optimizer':
        return <Bg3ArmorClassOptimizer />;
      case 'bg3-weapon-action-damage-counter':
      case 'weapon-action-extra-attack-damage-counter':
        return <Bg3WeaponActionDamageCounter />;
      case 'bg3-origin-passive-guide':
      case 'origin-character-passive-modifier-guide':
        return <Bg3OriginPassiveGuide />;
      case 'lethal-company-quota-calculator':
      case 'scrap-value-quota-survival-optimization-calculator':
      case 'lethal-company-calculator':
        return <LethalCompanyQuotaCalculator />;
      case 'lethal-company-quota-margin-matrix':
        return <LethalCompanyQuotaMarginMatrix />;
      case 'lethal-company-monster-danger-rating':
        return <LethalCompanyMonsterDangerRating />;
      case 'lethal-company-store-budget-planner':
        return <LethalCompanyStoreBudgetPlanner />;
      case 'lethal-company-ship-upgrade-roi':
        return <LethalCompanyShipUpgradeRoi />;
      case 'lethal-company-spooktube-revenue-calculator':
        return <LethalCompanySpookTubeRevenueCalculator />;
      case 'starfield-ship-builder-calculator':
      case 'ship-modules-cost-cargo-weight-calculator':
        return <StarfieldShipBuilderCalculator />;
      case 'starfield-outpost-supply-planner':
      case 'outpost-resource-supply-line-planner':
        return <StarfieldOutpostSupplyPlanner />;
      case 'starfield-outpost-calculator':
      case 'outpost-production-chain-crafting-calculator':
      case 'starfield-crafting-calculator':
        return <StarfieldOutpostCalculator />;
      case 'starfield-skill-tree-allocator':
      case 'skill-tree-allocation-tool':
        return <StarfieldSkillTreeAllocator />;
      case 'starfield-planet-survey-checklist':
      case 'planet-scan-flora-fauna-completeness-checklist':
        return <StarfieldPlanetSurveyChecklist />;
      case 'starfield-weapon-mod-calculator':
      case 'weapon-modding-damage-multiplier':
        return <StarfieldWeaponModCalculator />;
      case 'starfield-crew-buff-calculator':
      case 'crew-assignment-buff-calculator':
        return <StarfieldCrewBuffCalculator />;
      case 'enshrouded-flame-altar-calculator':
      case 'flame-altar-upgrade-cost-calculator':
        return <EnshroudedFlameAltarCalculator />;
      case 'enshrouded-building-block-calculator':
      case 'building-block-material-requirements-tool':
      case 'enshrouded-base-calculator':
      case 'survival-base-building-material-requirements-calculator':
      case 'enshrouded-crafting-calculator':
        return <EnshroudedBuildingBlockCalculator />;
      case 'enshrouded-survivor-recipe-finder':
      case 'survivor-npc-unlock-recipe-finder':
        return <EnshroudedSurvivorRecipeFinder />;
      case 'enshrouded-comfort-buff-timer':
      case 'comfort-level-rested-buff-timer':
        return <EnshroudedComfortBuffTimer />;
      case 'enshrouded-skill-tree-planner':
      case 'skill-tree-simulator-attribute-points-planner':
        return <EnshroudedSkillTreePlanner />;
      case 'enshrouded-glider-grapple-upgrader':
      case 'glider-grappling-hook-tier-upgrader':
        return <EnshroudedGliderGrappleUpgrader />;
      case 'nightingale-realm-card-crafting-matrix':
      case 'realm-card-crafting-matrix':
        return <NightingaleRealmCardMatrix />;
      case 'nightingale-minor-card-modifier-simulator':
      case 'minor-card-modifier-simulator':
        return <NightingaleMinorCardSimulator />;
      case 'nightingale-gear-score-tier-calculator':
      case 'gear-score-tier-leveling-calculator':
        return <NightingaleGearScoreCalculator />;
      case 'nightingale-resource-stats-optimizer':
      case 'resource-inherent-stats-optimizer':
        return <NightingaleResourceStatsOptimizer />;
      case 'nightingale-essence-trader-planner':
      case 'essence-trader-inventory-currency-planner':
        return <NightingaleEssenceTraderPlanner />;
      case 'crk-team-builder':
      case 'cookie-run-kingdom-team-builder':
        return <CrkTeamBuilderTool />;
      case 'crk-topping-optimizer':
      case 'cookie-run-kingdom-topping-optimizer':
        return <CrkToppingOptimizerTool />;
      case 'crk-production-chain-planner':
      case 'cookie-run-kingdom-production-chain-planner':
        return <CrkProductionChainPlannerTool />;
      case 'crk-upgrade-planner':
      case 'cookie-run-kingdom-upgrade-planner':
        return <CrkUpgradePlannerTool />;
      case 'crk-pity-planner':
      case 'cookie-run-kingdom-pity-planner':
        return <CrkPityPlannerTool />;
      case 'crk-event-timers':
      case 'cookie-run-kingdom-event-timers':
        return <CrkEventTimersTool />;
      case 'afkj-daily-boss-planner':
      case 'afkj-boss-team-planner':
      case 'daily-boss-team-planner':
        return <AfkjBossTeamPlannerTool />;
      case 'afkj-ascension-planner':
      case 'ascension-planner':
        return <AfkjAscensionPlannerTool />;
      case 'afkj-resource-planner':
      case 'resource-planner':
        return <AfkjResourcePlannerTool />;
      case 'afkj-summon-planner':
      case 'summon-planner':
        return <AfkjSummonPlannerTool />;
      case 'afkj-team-builder':
      case 'team-builder':
        return <AfkjTeamBuilderTool />;
      case 'afkj-season-tracker':
      case 'season-tracker':
        return <AfkjSeasonTrackerTool />;
      case 'mogo-sticker-tracker':
      case 'monopoly-go-sticker-tracker':
        return <MogoStickerTrackerTool />;
      case 'mogo-trade-matching':
      case 'monopoly-go-trade-matching':
        return <MogoTradeMatchingTool />;
      case 'mogo-free-dice-links':
      case 'monopoly-go-free-dice-links':
        return <MogoFreeDiceLinksTool />;
      case 'mogo-event-timers':
      case 'monopoly-go-event-timers':
        return <MogoEventTimersTool />;
      case 'mogo-shield-finder':
      case 'monopoly-go-shield-finder':
        return <MogoShieldFinderTool />;
      case 'mogo-upgrade-cost-planner':
      case 'monopoly-go-upgrade-cost-planner':
        return <MogoUpgradeCostPlannerTool />;
      case 'sk-damage-calc':
        return <SkDamageCalculator />;
      case 'sk-gear-manager':
        return <SkGearManager />;
      case 'sk-team-builder':
        return <SkTeamBuilder />;
      case 'sk-ruby-calc':
        return <SkRubyCalculator />;
      case 'sk-shop-optimizer':
        return <SkShopOptimizer />;
      case 'sk-gacha-planner':
        return <SkGachaPlanner />;
      case 'cm-village-calculator':
        return <CmVillageCalculator />;
      case 'cm-free-spin-links':
        return <CmFreeSpinLinks />;
      case 'cm-card-tracker':
        return <CmCardTracker />;
      case 'cm-event-planner':
        return <CmEventPlanner />;
      case 'cm-pet-timer':
        return <CmPetTimer />;
      case 'grow-a-garden-crop-value-calculator':
        return <GrowAGardenCropValueCalculator />;
      case 'grow-a-garden-mutation-calculator':
        return <GrowAGardenMutationCalculator />;
      case 'grow-a-garden-egg-hatching-calculator':
        return <GrowAGardenEggHatchingCalculator />;
      case 'grow-a-garden-trade-calculator':
        return <GrowAGardenTradeCalculator />;
      case 'grow-a-garden-stock-timer':
        return <GrowAGardenStockTimer />;
      default:
        return <ModularGamingTool tool={tool} />;
    }
  };

  const gamePath = game ? getGamePath(game.id) : '/games';

  const breadcrumbs = [
    ...(game ? [{ name: game.name, path: gamePath }] : []),
    ...(category ? [{ name: category.name, path: `/categories?cat=${category.id}` }] : []),
    { name: tool.name, path: `/tools/${tool.slug}` }
  ];

  const relatedTools = useMemo(() => {
    const specific = tool.relatedToolIds
      .map(id => TOOLS.find(t => t.id === id))
      .filter((t): t is ToolItem => Boolean(t && t.id !== tool.id));
    const sameGame = TOOLS.filter(
      t => t.gameId === tool.gameId && t.id !== tool.id && !specific.some(s => s.id === t.id)
    );
    const sameCategory = TOOLS.filter(
      t => t.categoryId === tool.categoryId && t.id !== tool.id && !specific.some(s => s.id === t.id) && !sameGame.some(s => s.id === t.id)
    );
    return [...specific, ...sameGame, ...sameCategory].slice(0, 6);
  }, [tool]);

  // Sibling tools in the same game for the Game Hub linking module
  const gameTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === tool.gameId && t.id !== tool.id).slice(0, 6);
  }, [tool.gameId, tool.id]);

  // Enhanced SEO Content: Worked Examples, Mechanics Deep-Dive & Verified FAQs
  const workedExamples = useMemo(() => getToolWorkedExamples(tool), [tool]);
  const deepDive = useMemo(() => getToolDeepDive(tool), [tool]);
  const enhancedFaqs = useMemo(() => getEnhancedToolFaqs(tool), [tool]);
  const enhancedTitle = useMemo(() => getEnhancedToolSeoTitle(tool), [tool]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <>
      <SEOHead
        title={enhancedTitle}
        description={tool.metaDescription}
        canonicalPath={tool.canonicalPath}
        tool={tool}
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10">
        {/* Placement: Tool Top Banner Ad */}
        <AdLayout.ToolTop />

        {/* Breadcrumb & Quick Back Navigation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
            <button
              onClick={() => onNavigate(gamePath || '/tools')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/50 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
              title="Go back to previous page or game hub"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-950/80">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {game && (
                  <button
                    onClick={() => onNavigate(gamePath)}
                    className="text-xs font-semibold text-slate-300 hover:text-cyan-300 font-mono transition-colors flex items-center gap-1.5"
                  >
                    {getGameIcon(game.id, 'w-4 h-4')}
                    <span>{game.name}</span>
                  </button>
                )}
                {category && (
                  <>
                    <span className="text-slate-600">·</span>
                    <button
                      onClick={() => onNavigate(`/categories?cat=${category.id}`)}
                      className="text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
                    >
                      {category.name}
                    </button>
                  </>
                )}
                {tool.badge && (
                  <>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs font-mono text-violet-400">
                      {tool.badge}
                    </span>
                  </>
                )}
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-slate-500 font-mono">Verified Engine</span>
              </div>

              {/* One Clear H1 for SEO with Game Logo */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3 sm:gap-3.5 flex-wrap">
                {game && (
                  <span className="p-2 sm:p-2.5 rounded-xl bg-[#0c122e] border border-indigo-800/80 shadow-md inline-flex items-center justify-center shrink-0">
                    {getGameIcon(game.id, 'w-7 h-7 sm:w-8 sm:h-8')}
                  </span>
                )}
                <span>{tool.h1}</span>
              </h1>

              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Right Meta & Share button */}
            <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between gap-2 flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-violet-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <strong>{tool.rating}</strong>
                </span>
                <span>•</span>
                <span>{tool.userCount}</span>
              </div>
              <button
                onClick={handleShare}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {copiedLink ? 'Link Copied!' : 'Share Tool'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid with Desktop Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative">
          {/* Main Column: Calculator + Explanations + FAQs (7-8 cols on desktop/tablet) */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8 min-w-0">
            {/* The Interactive Tool Container */}
            <div>
              <React.Suspense fallback={
                <div className="bg-[#0c122e] border border-indigo-900/60 rounded-2xl p-6 sm:p-8 space-y-4 animate-pulse">
                  <div className="flex items-center justify-between border-b border-indigo-900/40 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold">⚡</div>
                      <div className="space-y-1.5">
                        <div className="h-4 bg-indigo-900/50 rounded w-44"></div>
                        <div className="h-3 bg-indigo-950/60 rounded w-32"></div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">Loading Engine</span>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="h-11 bg-indigo-950/50 rounded-xl border border-indigo-900/40"></div>
                    <div className="h-11 bg-indigo-950/50 rounded-xl border border-indigo-900/40"></div>
                  </div>
                </div>
              }>
                {renderToolComponent()}
              </React.Suspense>

              {/* Placement 2: Tool After Result Banner */}
              <AdLayout.ToolAfterResult />
            </div>

            {/* Step-by-Step How To Guide */}
            <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  How to Use the {tool.name}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {tool.howToGuide.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.howToGuide.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-[#090d16] border border-slate-800/90 rounded-xl p-4 flex gap-3.5"
                  >
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-slate-200 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Formula & Algorithm Explained Section */}
            <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <Binary className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {tool.formulaExplained.title}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                {tool.formulaExplained.details}
              </p>

              {tool.formulaExplained.mathSnippet && (
                <div className="bg-[#090d16] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <code>{tool.formulaExplained.mathSnippet}</code>
                </div>
              )}
            </section>

            {/* 3 to 5 Worked Real-World Examples & Scenarios */}
            {workedExamples && workedExamples.length > 0 && (
              <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Calculator className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Worked Examples & Real-World Scenarios ({workedExamples.length})
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
                    Verified Calculations
                  </span>
                </div>

                <div className="space-y-5">
                  {workedExamples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="bg-[#090d16] border border-slate-800/90 rounded-xl p-5 space-y-3.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center font-mono">
                            {idx + 1}
                          </span>
                          {ex.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Scenario: </strong>
                        {ex.scenario}
                      </p>

                      {/* Input parameters */}
                      <div className="bg-[#0c121e] border border-slate-800/80 rounded-lg p-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
                          Input Parameters
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(ex.inputValues).map(([k, v]) => (
                            <span
                              key={k}
                              className="text-xs font-mono bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded text-slate-300"
                            >
                              <span className="text-slate-500">{k}:</span> <strong className="text-white">{v}</strong>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Step-by-Step Calculation */}
                      <div className="text-xs font-mono text-cyan-300/90 bg-cyan-950/20 border border-cyan-800/30 rounded-lg p-3">
                        <span className="text-[10px] text-cyan-400 uppercase tracking-wider block mb-1 font-sans font-semibold">
                          Step-by-Step Calculation:
                        </span>
                        <code>{ex.calculation}</code>
                      </div>

                      {/* Practical Result & Takeaway */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-0.5">
                            In-Game Result
                          </span>
                          <span className="text-xs text-slate-200 font-semibold">
                            {ex.result}
                          </span>
                        </div>

                        <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3">
                          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-0.5">
                            Pro Strategy
                          </span>
                          <span className="text-xs text-slate-300">
                            {ex.takeaway}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Placement 3: Tool Mid-Content Banner Ad */}
            <AdLayout.ToolMidContent />

            {/* In-Depth Engine Mechanics & Technical Guide */}
            {deepDive && (
              <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {deepDive.title}
                  </h2>
                </div>

                <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-4 text-xs sm:text-sm text-indigo-200 leading-relaxed font-medium">
                  {deepDive.summary}
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {deepDive.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Technical Architecture Highlights
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {deepDive.keyPoints.map((pt, idx) => (
                      <div
                        key={idx}
                        className="bg-[#090d16] border border-slate-800 rounded-lg p-3 flex items-start gap-2.5 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Pro Gaming Tips */}
            {tool.proTips && tool.proTips.length > 0 && (
              <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Pro Tips & Optimization Strategies
                  </h2>
                </div>

                <ul className="space-y-2.5">
                  {tool.proTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-amber-400 mt-0.5 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}


            {/* Enhanced Frequently Asked Questions Accordion */}
            {enhancedFaqs && enhancedFaqs.length > 0 && (
              <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Frequently Asked Questions ({enhancedFaqs.length})
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    Updated
                  </span>
                </div>

                <div className="space-y-3">
                  {enhancedFaqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-[#090d16] border border-slate-800 rounded-xl overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Dedicated Game Hub & Ecosystem Linking Module */}
            {game && (
              <section className="bg-gradient-to-r from-[#0c122e] to-[#070b19] border border-indigo-900/70 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                      Official Game Knowledge Hub
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-cyan-400" />
                      More {game.name} Calculators & Tools
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                      Access the full suite of {game.name} utilities, builders, conversion charts, and calculators in our dedicated game center.
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate(gamePath)}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-violet-950/50 self-start sm:self-auto flex-shrink-0"
                  >
                    <span>Visit {game.name} Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sibling tools quick links */}
                {gameTools.length > 0 && (
                  <div className="pt-3 border-t border-indigo-950/80">
                    <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                      Popular {game.name} utilities:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {gameTools.map(t => (
                        <button
                          key={t.id}
                          onClick={() => onNavigate(`/tools/${t.slug}`)}
                          className="px-2.5 py-1 text-xs rounded-lg bg-[#070b19] hover:bg-[#121c45] border border-indigo-950 hover:border-violet-500/50 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                          <span>{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Desktop Sidebar Column (5 cols on md, 4 cols on lg/xl) */}
          {/* Sits alongside on desktop/laptop/tablet, stays firmly stuck as user scrolls */}
          <aside
            className="md:col-span-5 lg:col-span-4 self-start sticky top-[72px] z-20 space-y-4 sticky-sidebar-fit w-full"
            style={{ position: 'sticky', top: '72px', alignSelf: 'flex-start' }}
          >
            {/* Slot 1: tool-sidebar-1 ABOVE the first sidebar text block */}
            <AdLayout.ToolSidebar1 />

            {/* Tool Overview (First sidebar text block) */}
            <div className="bg-[#0c122e] border border-indigo-900/60 rounded-xl p-3">
              <div className="flex items-center justify-between pb-2 border-b border-indigo-950/80 mb-2">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Tool Overview
                </span>
                <button
                  onClick={handleShare}
                  className="text-[11px] font-medium text-slate-300 hover:text-white px-2 py-0.5 rounded bg-[#070b19] hover:bg-[#121c45] border border-indigo-950 flex items-center gap-1 transition-colors"
                  title="Share this tool"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-cyan-400" /> : <Share2 className="w-3 h-3" />}
                  <span>{copiedLink ? 'Copied' : 'Share'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#070b19] px-2.5 py-1 rounded-lg border border-indigo-950">
                  <span className="text-[10px] text-slate-500 block">Game</span>
                  <button
                    onClick={() => onNavigate(gamePath)}
                    className="font-semibold text-violet-400 hover:text-cyan-300 hover:underline truncate block max-w-full text-left transition-colors"
                  >
                    {game?.name || 'General'}
                  </button>
                </div>

                <div className="bg-[#070b19] px-2.5 py-1 rounded-lg border border-indigo-950">
                  <span className="text-[10px] text-slate-500 block">Platform</span>
                  <span className="font-mono text-slate-200 truncate block text-left">
                    {tool.badge || 'Universal'}
                  </span>
                </div>
              </div>
            </div>

            {/* Slot 2: tool-sidebar-2 BETWEEN sidebar text blocks (or below first block) */}
            <AdLayout.ToolSidebar2 />
          </aside>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-indigo-950/80">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Related {game?.name || 'Gaming'} Tools & Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((relTool) => (
                <ToolCard
                  key={relTool.id}
                  tool={relTool}
                  onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Placement 4: Tool Above Footer Banner Ad */}
        <AdLayout.ToolAboveFooter />

        {/* Mobile Sticky Bottom Ad (Only visible on mobile widths where sidebar is hidden) */}
        <AdLayout.ToolMobileSticky />
      </div>
    </>
  );
}
