/**
 * tests/unit-tests.js — Suite de tests unitaires (Vanilla JS — Navigateur & Node.js)
 * Couvre les fonctions de calcul pur de :
 * 1. Forge de personnage (js/character-generator.js)
 * 2. Lanceur de dés Roll & Keep (js/character-generator.js)
 * 3. Grimoire des Sorts & Kihos (js/grimoire.js)
 * 4. Export JSON « Carnet de Rokugan » schemaVersion: 2 (js/export-carnet.js)
 */

(function () {
  const isNode = typeof module !== "undefined" && module.exports && typeof window === "undefined";

  const cg = isNode ? require("../js/character-generator.js") : window;
  const gr = isNode ? require("../js/grimoire.js") : window;
  const kh = isNode ? require("../js/kihos.js") : window;
  const ec = isNode ? require("../js/export-carnet.js") : window;
  const gm = isNode ? require("../js/gm-screen.js") : window;
  const gmRules = isNode ? require("../data/gm-rules-data.js") : window;
  const gmScenarios = isNode ? require("../data/gm-scenarios-data.js") : window;
  const carteData = isNode ? require("../data/carte-data.js") : window;
  const carteUi = isNode ? require("../js/carte-rokugan.js") : window;
  const ecolesUi = isNode ? require("../js/ecoles.js") : window;
  const globalSearch = isNode ? require("../js/global-search.js") : window;
  const codexData = isNode ? require("../data/campaign-codex-data.js") : window;
  const campagneStudio = isNode ? require("../js/campagne-studio.js") : window;
  const narrator = isNode ? require("../js/narrator.js") : window;
  const katasUi = isNode ? require("../js/katas.js") : window;
  const sessionsUi = isNode ? require("../js/sessions.js") : (window.L5RSessions || window);
  const firebaseCfg = isNode ? require("../js/firebase-config.js") : window;
  const firebaseSvc = isNode ? require("../js/firebase-service.js") : (window.L5RFirebase || window);

  const catalogScope = isNode ? (() => {
    const fs = require("fs");
    const path = require("path");
    const vm = require("vm");
    const root = path.resolve(__dirname, "..");
    const win = {};
    win.window = win;
    const sandbox = vm.createContext({ window: win, globalThis: win, console });
    const dataScripts = [
      "data/competences-data.js",
      "data/equipement-data.js",
      "data/clans-data.js",
      "data/avantages-desavantages-data.js",
      "data/katas-data.js",
      "data/tatouages-data.js",
      "data/sorts/sorts-universels.js",
      "data/sorts/sorts-air.js",
      "data/sorts/sorts-terre.js",
      "data/sorts/sorts-feu.js",
      "data/sorts/sorts-eau.js",
      "data/sorts/sorts-vide.js",
      "data/sorts/sorts-kiho.js",
      "data/sorts/sorts-maho.js",
      "data/sorts-data.js"
    ];
    for (const rel of dataScripts) {
      vm.runInContext(fs.readFileSync(path.join(root, rel), "utf8"), sandbox, { filename: rel });
    }
    return win;
  })() : window;

  const suites = [];
  let currentSuite = null;

  function describe(suiteName, fn) {
    currentSuite = { name: suiteName, tests: [], passed: 0, failed: 0 };
    suites.push(currentSuite);
    fn();
    currentSuite = null;
  }

  function it(testName, fn) {
    try {
      fn();
      currentSuite.tests.push({ name: testName, passed: true });
      currentSuite.passed++;
    } catch (err) {
      currentSuite.tests.push({
        name: testName,
        passed: false,
        error: err && err.message ? err.message : String(err)
      });
      currentSuite.failed++;
    }
  }

  function assertEqual(actual, expected, msg = "") {
    if (actual !== expected) {
      throw new Error(`${msg ? msg + " — " : ""}Attendu: ${JSON.stringify(expected)}, Reçu: ${JSON.stringify(actual)}`);
    }
  }

  function assertDeepEqual(actual, expected, msg = "") {
    const aStr = JSON.stringify(actual);
    const eStr = JSON.stringify(expected);
    if (aStr !== eStr) {
      throw new Error(`${msg ? msg + " — " : ""}Attendu: ${eStr}, Reçu: ${aStr}`);
    }
  }

  function assertTrue(val, msg = "") {
    if (!val) {
      throw new Error(`${msg || "Assertion échouée"} — Attendu: truthy, Reçu: ${JSON.stringify(val)}`);
    }
  }

  // ===========================================================================
  // 1. FORGE DE PERSONNAGE (js/character-generator.js)
  // ===========================================================================
  describe("1. Forge de personnage — Calculs purs (L5R 4e Édition)", function () {
    it("calculateRings calcule chaque Anneau comme le minimum de ses 2 Traits liés", function () {
      const rings = cg.calculateRings({
        sta: 4, wil: 2,
        str: 3, per: 5,
        ref: 3, awa: 3,
        agi: 4, int: 3,
        voi: 3
      });
      assertDeepEqual(rings, {
        earth: 2,
        water: 3,
        air: 3,
        fire: 3,
        void: 3,
        sumRings: 14
      });
    });

    it("calculateRings accepte les clés anglaises complètes et applique la valeur 2 par défaut", function () {
      const rings = cg.calculateRings({
        stamina: 3, willpower: 3,
        strength: 2, perception: 2
      });
      assertEqual(rings.earth, 3);
      assertEqual(rings.water, 2);
      assertEqual(rings.air, 2);
      assertEqual(rings.fire, 2);
      assertEqual(rings.void, 2);
      assertEqual(rings.sumRings, 11);
    });

    it("calculateInsightAndRank calcule la Réputation ((Anneaux × 10) + Compétences) et les seuils de Rang 1 à 5", function () {
      const baseSkills = [
        { name: "Kenjutsu", rank: 3, chosen: true },
        { name: "Défense", rank: 2, chosen: true },
        { name: "Une compétence au choix", rank: 1, isChoice: true, chosen: false }
      ];
      // sumRings = 11 -> 110 + 5 = 115 (Rang 1)
      const r1 = cg.calculateInsightAndRank(11, baseSkills);
      assertEqual(r1.sumSkills, 5);
      assertEqual(r1.insight, 115);
      assertEqual(r1.insightRank, 1);

      // Seuil Rang 2 (150), Rang 3 (175), Rang 4 (200), Rang 5 (225)
      assertEqual(cg.calculateInsightAndRank(15, 0).insightRank, 2);
      assertEqual(cg.calculateInsightAndRank(17, 5).insightRank, 3);
      assertEqual(cg.calculateInsightAndRank(20, 0).insightRank, 4);
      assertEqual(cg.calculateInsightAndRank(22, 5).insightRank, 5);
    });

    it("calculateTraitXpCost calcule le coût progressif d'un Trait (×4) et la réduction Bénédiction Élémentaire (-1/rang)", function () {
      // De 2 à 3 : 3 * 4 = 12 XP
      assertEqual(cg.calculateTraitXpCost(3, 2, false), 12);
      // De 2 à 4 : (3 * 4) + (4 * 4) = 12 + 16 = 28 XP
      assertEqual(cg.calculateTraitXpCost(4, 2, false), 28);
      // Avec bonus famille+école (baseStart = 4) vers 4 : 0 XP
      assertEqual(cg.calculateTraitXpCost(4, 4, false), 0);
      // Avec Bénédiction Élémentaire : de 2 à 4 -> (12 - 1) + (16 - 1) = 26 XP
      assertEqual(cg.calculateTraitXpCost(4, 2, true), 26);
    });

    it("calculateVoidXpCost calcule le coût du Vide (×6) et la réduction Illuminé (-2/rang)", function () {
      // De 2 à 3 : 3 * 6 = 18 XP
      assertEqual(cg.calculateVoidXpCost(3, 2, false), 18);
      // De 2 à 4 : 18 + 24 = 42 XP
      assertEqual(cg.calculateVoidXpCost(4, 2, false), 42);
      // Avec Illuminé : de 2 à 3 -> 18 - 2 = 16 XP
      assertEqual(cg.calculateVoidXpCost(3, 2, true), 16);
    });

    it("calculateSkillXpCost gère les compétences d'école, spécialisations et Esprit Obtus (L5R 4e exact)", function () {
      // Compétence hors école de 0 à 3 : 1 + 2 + 3 = 6 XP
      assertEqual(cg.calculateSkillXpCost(3, { isSchool: false }), 6);
      // Compétence d'école (Rang 1 gratuit) de 1 à 3 : 2 + 3 = 5 XP (+2 XP avec spé = 7 XP)
      assertEqual(cg.calculateSkillXpCost(3, { isSchool: true, spec: true }), 7);
      // Prodige en 4e Édition confère +1g0 sur les Compétences d'École (aucune réduction XP)
      assertEqual(cg.calculateSkillXpCost(3, { isSchool: true, isProdigy: true }), 5);
      // Esprit Obtus double les compétences Nobles/Hautes hors Enquête/Médecine
      assertEqual(cg.calculateSkillXpCost(2, { isSchool: false, isObtuse: true, isHighSkill: true, isExemptHigh: false }), 6); // (1+2)*2 = 6
      assertEqual(cg.calculateSkillXpCost(2, { isSchool: false, isObtuse: true, isHighSkill: true, isExemptHigh: true }), 3);  // exempté = 3
    });

    it("getEffectiveAdvCost, getEffectiveDisadvGain et MAX_DISADVANTAGE_XP respectent le Livre de Base 4e Édition", function () {
      assertEqual(cg.MAX_DISADVANTAGE_XP, 10);
      const crabBushiCtx = cg.buildCharacterContextFromInputs("crabe", "hida", "Bushi Hida", "Bushi");
      assertEqual(cg.getEffectiveAdvCost({ name: "Grand (Large)", cost: 4 }, crabBushiCtx), 3);
      assertEqual(cg.getEffectiveAdvCost({ name: "Force de la Terre", cost: 3 }, crabBushiCtx), 2);
      assertEqual(cg.getEffectiveAdvCost({ name: "Mains de Crabe (Crab Hands)", cost: 3 }, crabBushiCtx), 2);
      assertEqual(cg.getEffectiveDisadvGain({ name: "Antisocial", gain: 2 }, crabBushiCtx), 3);
      assertEqual(cg.getEffectiveDisadvGain({ name: "Esprit Obtus", gain: 3 }, crabBushiCtx), 4);

      const phoenixShugenjaCtx = cg.buildCharacterContextFromInputs("phenix", "isawa", "Shugenja Isawa", "Shugenja");
      assertEqual(cg.getEffectiveAdvCost({ name: "Ishiken-do", cost: 8 }, phoenixShugenjaCtx), 6);
      assertEqual(cg.getEffectiveAdvCost({ name: "Ami des Éléments", cost: 4 }, phoenixShugenjaCtx), 3);
      assertEqual(cg.getEffectiveAdvCost({ name: "Bénédiction de Fukurokujin", impact: "fukurokujins_blessing", cost: 4 }, phoenixShugenjaCtx), 3);
      assertEqual(cg.getEffectiveDisadvGain({ name: "Cœur Tendre", impact: "soft_hearted", gain: 2 }, phoenixShugenjaCtx), 3);

      const ninjaCtx = cg.buildCharacterContextFromInputs("scorpion", "shosuro", "Infiltrateur Shosuro", "Ninja");
      assertEqual(cg.getEffectiveAdvCost({ name: "Silencieux (Silent)", impact: "silent", cost: 3 }, ninjaCtx), 2);
      assertEqual(cg.getEffectiveAdvCost({ name: "Astucieux (Crafty)", impact: "crafty", cost: 3 }, ninjaCtx), 2);
      assertEqual(cg.getEffectiveDisadvGain({ name: "Sombre Secret", impact: "dark_secret", gain: 4 }, ninjaCtx), 5);
    });

    it("calculateArmorTN et calculateWoundThresholds calculent le ND d'Armure et les paliers de blessures", function () {
      // Réflexes 3, Armure lourde (+10), Niten (+2) => 5 + 15 + 10 + 2 = 32
      assertEqual(cg.calculateArmorTN(3, 10, 2), 32);

      // Terre 3 => Indemne 15 PV, paliers 6 PV
      assertDeepEqual(cg.calculateWoundThresholds(3), { multiplier: 3, bonusPerRank: 0, healthy: 15, step: 6 });

      // Guerrier de Fer Daidoji Rang 1 (Core p.111) avec Honneur 6.5 et Terre 2 => +(max(1, floor(6.5)-4)) = +2 PV par palier (12 PV / 6 PV)
      assertDeepEqual(cg.calculateWoundThresholds(2, { isDaidoji: true, honorScore: 6.5 }), {
        multiplier: 2,
        bonusPerRank: 2,
        healthy: 12,
        step: 6
      });
    });

    it("computeWeaponCombatMetrics & computeInitiativeMetrics appliquent Archer Tsuruchi R1 (+1g0 arc, +3 Init) & R2 (+2g0 dégâts)", function () {
      const equipData = catalogScope.EQUIPEMENT_DATA;
      const tsuruchiSchool = { id: "archer-tsuruchi", name: "Archer Tsuruchi", type: "Bushi" };
      const traits = { sta: 2, wil: 2, str: 3, per: 3, ref: 3, awa: 2, agi: 3, int: 2, voi: 2 };
      const skills = [{ name: "Kyujutsu (Yumi)", rank: 2, spec: false }, { name: "Kenjutsu", rank: 1, spec: false }];

      // Rang 1 avec Yumi : Kyujutsu (2) + Réflexes (3) + Toujours Prêt (+1g0) = 6g3 ; Dégâts = 2g2 + Force d'Arc 3 = 5g2
      const bowR1 = cg.computeWeaponCombatMetrics("Arc Yumi", traits, tsuruchiSchool, () => false, () => false, {
        equipCatalog: equipData,
        skillsList: skills,
        insightRank: 1
      });
      assertEqual(bowR1.name, "Yumi (Arc, Flèches Saule 2g2)", "Résolution d'alias 'Arc Yumi'");
      assertEqual(bowR1.attackRoll, "6g3", "Archer Tsuruchi R1 donne +1g0 au toucher à l'arc");
      assertTrue(/Tsuruchi \(\+1g0\)/.test(bowR1.attackDetail), "Détail explicite du bonus Tsuruchi (+1g0)");
      assertEqual(bowR1.damageRoll, "5g2", "Dégâts Yumi R1 sans bonus R2");

      // Rang 2 avec Yumi : dégâts gagnent +2g0 supplémentaires (7g2)
      const bowR2 = cg.computeWeaponCombatMetrics("Yumi (Arc, Flèches Saule 2g2)", traits, tsuruchiSchool, () => false, () => false, {
        equipCatalog: equipData,
        skillsList: skills,
        insightRank: 2
      });
      assertEqual(bowR2.damageRoll, "7g2", "Archer Tsuruchi R2 ajoute +2g0 aux dégâts à l'arc");

      // Aucun bonus au Katana ou avec arme à feu (Teppo)
      const katana = cg.computeWeaponCombatMetrics("Katana", traits, tsuruchiSchool, () => false, () => false, {
        equipCatalog: equipData,
        skillsList: skills,
        insightRank: 1
      });
      assertEqual(katana.attackRoll, "4g3", "Pas de bonus Tsuruchi R1 au Katana");

      // Écoles Multiples : Seconde école Archer Tsuruchi confère aussi +1g0 à l'arc et +3 Init
      const matsuPrimary = { id: "dompteur-matsu", name: "Dompteur de Lion Matsu", type: "Bushi" };
      const multiAdvs = [{ name: "Écoles Multiples (Multiple Schools)", secondarySchoolId: "archer-tsuruchi", secondarySchoolRank: 1 }];
      const bowMulti = cg.computeWeaponCombatMetrics("Dai-kyu (Arc de cavalerie, Flèches Saule 2g2)", traits, matsuPrimary, () => false, () => false, {
        equipCatalog: equipData,
        skillsList: skills,
        insightRank: 2,
        advantagesList: multiAdvs
      });
      assertEqual(bowMulti.attackRoll, "6g3", "Bonus Tsuruchi R1 appliqué via Écoles Multiples");

      const initMulti = cg.computeInitiativeMetrics({
        insightRank: 2,
        ref: 3,
        rAir: 2,
        sch: matsuPrimary,
        skillsList: skills,
        hasAdv: () => false,
        advantagesList: multiAdvs
      });
      assertEqual(initMulti.rollStr, "5g3 + 3", "Archer Tsuruchi R1 ajoute +3 à l'Initiative");
    });

    it("Initiative, Attaque, Dégâts, ND Armure, Réduction, Blessures & Compétences couvrent toutes les techniques passives d'écoles L5R 4e", function () {
      const equipData = catalogScope.EQUIPEMENT_DATA;
      const baseTraits = { sta: 3, wil: 3, str: 3, per: 4, ref: 3, awa: 2, agi: 3, int: 2, voi: 2 };
      const noop = () => false;

      // 1. Initiative : Bushi Bayushi R1 (+1g1 L5R 4e), Éclaireur Hiruma R1 (+Discrétion), Infanterie Montée Utaku R2 (+1g0)
      const bayushiInit = cg.computeInitiativeMetrics({
        insightRank: 1, ref: 3, rAir: 2,
        sch: { id: "bushi-bayushi", name: "Bushi Bayushi", type: "Bushi" },
        skillsList: [{ name: "Iaijutsu", rank: 3 }]
      });
      assertEqual(bayushiInit.rollStr, "5g4", "Bushi Bayushi R1 confère +1g1 à l'Initiative (L5R 4e)");

      const hirumaScoutInit = cg.computeInitiativeMetrics({
        insightRank: 1, ref: 3, rAir: 2,
        sch: { id: "hiruma-scout", name: "Éclaireur Hiruma", type: "Bushi" },
        skillsList: [{ name: "Discrétion (Stealth)", rank: 3 }]
      });
      assertEqual(hirumaScoutInit.rollStr, "4g3 + 3", "Éclaireur Hiruma R1 ajoute Discrétion (+3) à l'Initiative");

      const utakuR2Init = cg.computeInitiativeMetrics({
        insightRank: 2, ref: 3, rAir: 2,
        sch: { id: "utaku-mounted-infantry", name: "Infanterie Montée Utaku", type: "Bushi" }
      });
      assertEqual(utakuR2Init.rollStr, "6g3", "Infanterie Montée Utaku R2 ajoute +1g0 à l'Initiative");

      // 2. Toujours + Dégâts : Bushi Yoritomo, Magistrat Doji, Acteur Shosuro R2, Berserker Matsu R1 (+Honneur), Tueurs des Forêts (+Constitution)
      const yoriAtk = cg.computeWeaponCombatMetrics("Katana", baseTraits, { id: "bushi-yoritomo", name: "Bushi Yoritomo" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Kenjutsu", rank: 2 }], insightRank: 1
      });
      assertEqual(yoriAtk.attackRoll, "6g3", "Bushi Yoritomo R1 ajoute +1g0 au toucher");

      const dojiJitte = cg.computeWeaponCombatMetrics("Jitte", baseTraits, { id: "doji-magistrate", name: "Magistrat Doji" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Couteaux", rank: 2 }], insightRank: 1
      });
      assertEqual(dojiJitte.attackRoll, "6g3", "Magistrat Doji R1 ajoute +1g0 avec un Jitte");
      const dojiKatana = cg.computeWeaponCombatMetrics("Katana", baseTraits, { id: "doji-magistrate", name: "Magistrat Doji" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Kenjutsu", rank: 2 }], insightRank: 1
      });
      assertEqual(dojiKatana.attackRoll, "5g3", "Magistrat Doji R1 n'ajoute pas +1g0 au Katana");

      const shosuroTanto = cg.computeWeaponCombatMetrics("Tantō", baseTraits, { id: "shosuro-actor", name: "Acteur Shosuro" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Couteaux", rank: 2 }], insightRank: 2
      });
      assertEqual(shosuroTanto.attackRoll, "7g3", "Acteur Shosuro R2 ajoute +2g0 avec une arme Petite");

      const matsuDmg = cg.computeWeaponCombatMetrics("Katana", baseTraits, { id: "bushi-matsu", name: "Berserker Matsu" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Kenjutsu", rank: 2 }], insightRank: 1, honorScore: 6.5
      });
      assertEqual(matsuDmg.damageRoll, "6g2 + 6", "Berserker Matsu R1 ajoute le Rang d'Honneur aux dégâts");

      const forestDmg = cg.computeWeaponCombatMetrics("Yari", baseTraits, { id: "forest-killers", name: "Tueurs des Forêts" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Lances", rank: 2 }], insightRank: 1
      });
      assertEqual(forestDmg.damageRoll, "5g2 + 3", "Tueurs des Forêts R1 ajoute Constitution aux dégâts de mêlée");
      assertDeepEqual(cg.calculateWoundThresholds(3, { isForestKillers: true, stamina: 3 }), {
        multiplier: 3, bonusPerRank: 3, healthy: 18, step: 9
      });

      // 3. Soshi (+1g0 mêlée), Heichi (+0g1 Lance), Moto (+1g0 Cimeterre), Pragmatiste Hida (+1g0/+1g0 Mains nues sans collision Hida)
      const soshiDmg = cg.computeWeaponCombatMetrics("Katana", baseTraits, { id: "soshi-magistrate", name: "Magistrat Soshi" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Kenjutsu", rank: 2 }], insightRank: 1
      });
      assertEqual(soshiDmg.damageRoll, "7g2", "Magistrat Soshi R1 ajoute +1g0 aux dégâts en mêlée");

      const heichiSpear = cg.computeWeaponCombatMetrics("Yari", baseTraits, { id: "heichi-bushi", name: "Bushi Heichi" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Lances", rank: 2 }], insightRank: 1
      });
      assertEqual(heichiSpear.damageRoll, "5g3", "Bushi Heichi R1 ajoute +0g1 aux dégâts avec une Lance");

      const motoScimitar = cg.computeWeaponCombatMetrics("Cimeterre (Scimitar)", baseTraits, { id: "bushi-moto", name: "Bushi Moto" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Kenjutsu", rank: 2 }], insightRank: 1
      });
      assertEqual(motoScimitar.damageRoll, "6g3", "Bushi Moto R1 ajoute +1g0 aux dégâts avec un Cimeterre");

      const hidaPrag = cg.computeWeaponCombatMetrics("Mains Nues (Jiujutsu)", baseTraits, { id: "hida-pragmatist", name: "Pragmatiste Hida" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Jiujutsu", rank: 2 }], insightRank: 1
      });
      assertEqual(hidaPrag.attackRoll, "6g3", "Pragmatiste Hida R1 ajoute +1g0 au toucher à mains nues");
      assertEqual(hidaPrag.damageRoll, "4g1", "Pragmatiste Hida R1 ajoute +1g0 aux dégâts à mains nues");

      const togashiR2 = cg.computeWeaponCombatMetrics("Mains Nues (Jiujutsu)", baseTraits, { id: "moine-togashi", name: "Ordre Tatoué Togashi (Ise Zumi)" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Jiujutsu", rank: 2 }], insightRank: 2
      });
      assertEqual(togashiR2.attackRoll, "6g4", "Ordre Tatoué Togashi R2 ajoute +1g1 au toucher à mains nues");
      assertEqual(togashiR2.damageRoll, "4g2", "Ordre Tatoué Togashi R2 ajoute +1g1 aux dégâts à mains nues");

      const hitomiR4 = cg.computeWeaponCombatMetrics("Mains Nues (Jiujutsu)", baseTraits, { id: "hitomi-kikage-zumi", name: "Hitomi Kikage Zumi" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Jiujutsu", rank: 2 }], insightRank: 4
      });
      assertEqual(hitomiR4.damageRoll, "4g2", "Hitomi Kikage Zumi R4 ajoute +1g1 aux dégâts à mains nues");

      const osano = cg.computeWeaponCombatMetrics("Mains Nues (Jiujutsu)", baseTraits, { id: "osano-wo-monk", name: "Moine du Temple d'Osano-Wo" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Jiujutsu", rank: 2 }], insightRank: 1
      });
      assertEqual(osano.damageRoll, "3g2", "Temple d'Osano-Wo R1 ajoute +0g1 aux dégâts à mains nues");

      const mantis = cg.computeWeaponCombatMetrics("Tantō", baseTraits, { id: "mantis-brawler", name: "Bagarreur Mante" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Couteaux", rank: 2 }], insightRank: 1
      });
      assertEqual(mantis.damageRoll, "5g1", "Bagarreur Mante R1 ajoute +1g0 aux dégâts avec arme Petite");

      // 4. Épéiste Taoïste Mirumoto (sans armure vs avec armure) + ND d'Armure & Réduction (Kitsuki, Doji, Usagi, Spider Monk, Tessen, Hida R2)
      const taoistUnarmored = cg.computeWeaponCombatMetrics("Katana", baseTraits, { id: "mirumoto-taoist", name: "Épéiste Taoïste Mirumoto" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Kenjutsu", rank: 2 }], insightRank: 1, armorBonus: 0
      });
      assertEqual(taoistUnarmored.damageRoll, "7g2", "Épéiste Taoïste R1 sans armure ajoute +1g0 aux dégâts d'un sabre");
      const taoistArmored = cg.computeWeaponCombatMetrics("Katana", baseTraits, { id: "mirumoto-taoist", name: "Épéiste Taoïste Mirumoto" }, noop, noop, {
        equipCatalog: equipData, skillsList: [{ name: "Kenjutsu", rank: 2 }], insightRank: 1, armorBonus: 5
      });
      assertEqual(taoistArmored.damageRoll, "6g2", "Épéiste Taoïste R1 en armure n'ajoute pas +1g0 aux dégâts");

      const taoistDef = cg.computeArmorDefenseMetrics({
        ref: 3, rAir: 2, rEarth: 3, traits: baseTraits,
        sch: { id: "mirumoto-taoist", name: "Épéiste Taoïste Mirumoto" }, insightRank: 2,
        armorBonus: 0, weapon1Name: "Katana", skillsList: [{ name: "Kenjutsu", rank: 3 }], equipCatalog: equipData
      });
      assertEqual(taoistDef.armorTN, 20, "Épéiste Taoïste ne déclenche pas Niten de Bushi Mirumoto");
      assertEqual(taoistDef.totalReduction, 4, "Épéiste Taoïste R2 sans armure + sabre gagne Réduction Rang+2 = 4");

      const kitsukiDef = cg.computeArmorDefenseMetrics({
        ref: 3, rAir: 2, rEarth: 3, traits: baseTraits,
        sch: { id: "magistrat-kitsuki", name: "Enquêteur Kitsuki" }, insightRank: 1,
        armorBonus: 5, equipCatalog: equipData
      });
      assertEqual(kitsukiDef.armorTN, 29, "Enquêteur Kitsuki ajoute Perception (+4) au ND d'Armure");
      assertEqual(kitsukiDef.totalReduction, 3, "Armure légère donne Réduction 3");

      const hidaR2Def = cg.computeArmorDefenseMetrics({
        ref: 3, rAir: 2, rEarth: 4, traits: baseTraits,
        sch: { id: "bushi-hida", name: "Bushi Hida" }, insightRank: 2,
        armorBonus: 10, equipCatalog: equipData
      });
      assertEqual(hidaR2Def.totalReduction, 9, "Bushi Hida R2 ajoute Anneau de Terre (4) à la Réduction d'armure lourde (5) = 9");

      const tessenDef = cg.computeArmorDefenseMetrics({
        ref: 3, rAir: 2, rEarth: 2, traits: baseTraits,
        sch: { id: "the-tessen", name: "Le Tessen" }, insightRank: 1,
        armorBonus: 0, weapon1Name: "Katana", weapon2Name: "Tessen (Éventail de Guerre)",
        skillsList: [{ name: "Éventail de Guerre (War Fan)", rank: 4 }], equipCatalog: equipData
      });
      assertEqual(tessenDef.armorTN, 24, "Le Tessen ajoute le rang en Éventail de Guerre (+4) au ND d'Armure");

      const spiderDef = cg.computeArmorDefenseMetrics({
        ref: 3, rAir: 2, rEarth: 3, traits: baseTraits,
        sch: { id: "spider-monk", name: "Ordre des Moines de l'Araignée" }, insightRank: 2,
        armorBonus: 0, equipCatalog: equipData
      });
      assertEqual(spiderDef.armorTN, 24, "Ordre des Moines de l'Araignée ajoute 2 × Rang (+4) au ND d'Armure");

      // 5. Bonus passifs de Compétences (Kaiu, Toritaka, Daidoji Scout, Infiltrateur Shosuro, Érudit Asako R5, Vengeur Moto R2)
      assertEqual(cg.computeSkillRollBonus({ name: "Ingénierie", isSchool: true }, "Intelligence", { id: "ingenieur-kaiu" }, 1).bonusRoll, 1);
      assertEqual(cg.computeSkillRollBonus({ name: "Enquête", isSchool: true }, "Perception", { id: "toritaka-bushi" }, 1).bonusRoll, 1);
      assertEqual(cg.computeSkillRollBonus({ name: "Chasse (Hunting)" }, "Perception", { id: "daidoji-scout" }, 1).bonusRoll, 1);
      assertEqual(cg.computeSkillRollBonus({ name: "Discrétion (Stealth)" }, "Agilité", { id: "infiltrateur-shosuro" }, 1).bonusRoll, 2);
      assertEqual(cg.computeSkillRollBonus({ name: "Connaissance : Histoire" }, "Intelligence", { id: "erudit-asako" }, 5).bonusRoll, 5);
      assertEqual(cg.computeSkillRollBonus({ name: "Enquête (Investigation)" }, "Perception", { id: "moto-vindicator" }, 2).bonusRoll, 2);
    });

    it("getMasteriesSummary retourne les maîtrises débloquées aux rangs 3, 5 et 7", function () {
      assertEqual(cg.getMasteriesSummary("Kenjutsu", 2), "");
      assertEqual(cg.getMasteriesSummary("Kenjutsu", 3), "[R3: Frappe Tranchante]");
      assertEqual(cg.getMasteriesSummary("Kenjutsu (Katana)", 5), "[R3: Frappe Tranchante] [R5: Dégainé Éclair]");
      assertEqual(cg.getMasteriesSummary("Iaijutsu", 7), "[R3: Dégainé Fulgurant] [R5: Maîtrise du Focus] [R7: Lame Sereine]");
    });

    it("resolveCatalogSkillMeta associe exactement le Trait même avec spécialité ou parenthèses", function () {
      const mockCatalog = [
        { name: "Calligraphie", trait: "Intelligence", type: "Noble" },
        { name: "Enquête (Investigation)", trait: "Perception", type: "Noble" },
        { name: "Connaissance : Outremonde (Shadowlands)", trait: "Intelligence", type: "Dégradante" }
      ];
      assertEqual(cg.resolveCatalogSkillMeta("Calligraphie (Chiffre)", mockCatalog).trait, "Intelligence");
      assertEqual(cg.resolveCatalogSkillMeta("Enquête", mockCatalog).trait, "Perception");
      assertEqual(cg.resolveCatalogSkillMeta("Connaissance : Outremonde", mockCatalog).trait, "Intelligence");
      assertEqual(cg.resolveCatalogSkillMeta("Connaissance : Clan du Crabe", mockCatalog).trait, "Intelligence");
    });

    it("isSchoolCompatibleForMultiple bloque strictement Bushi/Ninja <-> Shugenja et les doublons", function () {
      const hidaBushi = { id: "bushi_hida", name: "Bushi Hida", type: "Bushi" };
      const kakitaBushi = { id: "bushi_kakita", name: "Bushi Kakita", type: "Bushi" };
      const kuniShugenja = { id: "shugenja_kuni", name: "Shugenja Kuni", type: "Shugenja" };
      const dojiCourtier = { id: "courtisan_doji", name: "Courtisan Doji", type: "Courtisan" };
      const shosuroShinobi = { id: "ninja_shosuro", name: "Infiltrateur Shosuro", type: "Ninja" };
      const shinseiMonk = { id: "moine_confrerie", name: "Moine de la Confrérie", type: "Moine" };

      assertEqual(cg.getSchoolArchetype(hidaBushi), "bushi");
      assertEqual(cg.getSchoolArchetype(kuniShugenja), "shugenja");
      assertEqual(cg.getSchoolArchetype(shosuroShinobi), "ninja");

      // Incompatibilités L5R 4e (p. 150) & même école
      assertEqual(cg.isSchoolCompatibleForMultiple(hidaBushi, kuniShugenja), false);
      assertEqual(cg.isSchoolCompatibleForMultiple(kuniShugenja, hidaBushi), false);
      assertEqual(cg.isSchoolCompatibleForMultiple(shosuroShinobi, kuniShugenja), false);
      assertEqual(cg.isSchoolCompatibleForMultiple(hidaBushi, hidaBushi), false);

      // Combinaisons autorisées
      assertTrue(cg.isSchoolCompatibleForMultiple(hidaBushi, kakitaBushi), "Bushi + autre Bushi autorisé");
      assertTrue(cg.isSchoolCompatibleForMultiple(hidaBushi, dojiCourtier), "Bushi + Courtisan autorisé");
      assertTrue(cg.isSchoolCompatibleForMultiple(dojiCourtier, kuniShugenja), "Courtisan + Shugenja autorisé");
      assertTrue(cg.isSchoolCompatibleForMultiple(shinseiMonk, kuniShugenja), "Moine + Shugenja autorisé");
    });

    it("getCharacterArchetypePermissions filtre Katas, Sorts, Kihos et Tatouages selon l'école", function () {
      const bushi = { id: "bushi_hida", name: "Bushi Hida", type: "Bushi" };
      const shugenja = { id: "shugenja_kuni", name: "Shugenja Kuni", type: "Shugenja" };
      const courtisan = { id: "courtisan_doji", name: "Courtisan Doji", type: "Courtisan" };
      const moine = { id: "moine_confrerie", name: "Moine de la Confrérie", type: "Moine" };

      // Bushi seul : Katas uniquement (ni Sorts, ni Kihos)
      assertDeepEqual(cg.getCharacterArchetypePermissions(bushi, null, false), {
        primaryType: "bushi",
        secondaryType: null,
        canCastSpells: false,
        canUseKatas: true,
        canUseKihos: false,
        canUseTattoos: false
      });

      // Shugenja seul : Sorts + Kihos uniquement (jamais Katas)
      assertDeepEqual(cg.getCharacterArchetypePermissions(shugenja, null, false), {
        primaryType: "shugenja",
        secondaryType: null,
        canCastSpells: true,
        canUseKatas: false,
        canUseKihos: true,
        canUseTattoos: false
      });

      // Moine non-Togashi : Kihos uniquement (pas de sorts élémentaires ni Katas)
      assertDeepEqual(cg.getCharacterArchetypePermissions(moine, null, false), {
        primaryType: "moine",
        secondaryType: null,
        canCastSpells: false,
        canUseKatas: false,
        canUseKihos: true,
        canUseTattoos: false
      });

      // Moine Togashi (tatoué) : Tatouages + Kihos (coût 1,5× XP p. 266)
      const togashiMonk = cg.getCharacterArchetypePermissions({ id: "moine-togashi", name: "Ordre Tatoué Togashi (Ise Zumi)", type: "Moine" }, null, true);
      assertDeepEqual(togashiMonk, {
        primaryType: "moine",
        secondaryType: null,
        canCastSpells: false,
        canUseKatas: false,
        canUseKihos: true,
        canUseTattoos: true
      });

      // Courtisan + Écoles Multiples (Bushi) -> débloque Katas
      const courtierBushi = cg.getCharacterArchetypePermissions(courtisan, bushi, false);
      assertTrue(courtierBushi.canUseKatas && !courtierBushi.canCastSpells && !courtierBushi.canUseKihos);

      // Courtisan seul -> aucun art
      const pureCourtier = cg.getCharacterArchetypePermissions(courtisan, null, false);
      assertTrue(!pureCourtier.canUseKatas && !pureCourtier.canCastSpells && !pureCourtier.canUseKihos && !pureCourtier.canUseTattoos);
    });
  });

  // ===========================================================================
  // 2. LANCEUR DE DÉS ROLL & KEEP (js/character-generator.js)
  // ===========================================================================
  describe("2. Lanceur de dés Roll & Keep — Parsing, Règle des 10 dés & Simulation", function () {
    it("parseRollKeepFormula extrait correctement les dés lancés, gardés et bonus", function () {
      assertDeepEqual(cg.parseRollKeepFormula("5g3"), { rolled: 5, kept: 3, bonus: 0 });
      assertDeepEqual(cg.parseRollKeepFormula("7g3 + 4"), { rolled: 7, kept: 3, bonus: 4 });
      assertDeepEqual(cg.parseRollKeepFormula("4k2 - 2"), { rolled: 4, kept: 2, bonus: -2 });
      assertDeepEqual(cg.parseRollKeepFormula("invalide"), { rolled: 0, kept: 0, bonus: 0 });
    });

    it("applyTenDiceRule applique la règle officielle des 10 dés (conversion en dés gardés puis bonus +2)", function () {
      assertDeepEqual(cg.applyTenDiceRule(6, 3, 0), { rolled: 6, kept: 3, bonus: 0 });
      assertDeepEqual(cg.applyTenDiceRule(12, 4, 0), { rolled: 10, kept: 5, bonus: 0 });
      assertDeepEqual(cg.applyTenDiceRule(12, 10, 0), { rolled: 10, kept: 10, bonus: 4 });
      assertDeepEqual(cg.applyTenDiceRule(11, 10, 2), { rolled: 10, kept: 10, bonus: 4 });
      assertDeepEqual(cg.applyTenDiceRule(3, 5, 0), { rolled: 3, kept: 3, bonus: 0 });
    });

    it("simulateRollAndKeep trie les dés, garde les Y meilleurs, gère l'explosion des 10 et la spécialisation", function () {
      // Séquence déterministe : 10 (explose -> 5 = 15), 1 (spé relance -> 8), 4, 2
      const seq = [0.95, 0.45, 0.0, 0.75, 0.35, 0.15];
      let idx = 0;
      const mockRng = () => seq[idx++];

      const res = cg.simulateRollAndKeep(4, 2, 3, { explode: true, spec: true, rng: mockRng });
      assertEqual(res.dice.length, 4);
      assertEqual(res.kept.length, 2);
      assertEqual(res.dropped.length, 2);
      assertEqual(res.kept[0].value, 15);
      assertTrue(res.kept[0].exploded, "Le dé ayant fait 10 doit être marqué comme explosé");
      assertEqual(res.kept[1].value, 8);
      assertEqual(res.total, 15 + 8 + 3);
    });
  });

  // ===========================================================================
  // 3. GRIMOIRE (js/grimoire.js)
  // ===========================================================================
  describe("3. Grimoire — Normalisation, Qualification & Filtrage des Sorts / Kihos", function () {
    const sampleSpells = [
      { name: "Frappe de Jade", element: "Terre", mastery: 1, keywords: ["Jade", "Tonnerre"], desc: "Frappe sacrée contre l'Outremonde" },
      { name: "Fureur d'Osano-Wo", element: "Feu", mastery: 3, keywords: ["Tonnerre"], desc: "Foudre céleste" },
      { name: "Danse des Flammes", ring: "Feu", isKiho: true, mastery: 2, keywords: ["Kiho", "Martial"], desc: "Kiho du feu intérieur" },
      { name: "Toucher de la Mort", isMaho: true, element: "Maho", mastery: 4, keywords: ["Maho"], desc: "Malédiction de sang" },
      { name: "Communier", element: "Universel", mastery: "Universel", desc: "Parler aux kami" }
    ];

    it("normalizeText, slugify et escapeHtml nettoient et sécurisent les chaînes", function () {
      assertEqual(gr.normalizeText("  Éléments & Mahō  "), "elements & maho");
      assertEqual(gr.slugify("Fureur d'Osano-Wo !"), "fureur-d-osano-wo");
      assertEqual(gr.escapeHtml('<script>"test"</script>'), "&lt;script&gt;&quot;test&quot;&lt;/script&gt;");
    });

    it("getRank, isSpellKiho et getSpellElement qualifient correctement Sorts, Universels, Kihos et Mahō", function () {
      assertEqual(gr.getRank(sampleSpells[0]), 1);
      assertEqual(gr.getRank(sampleSpells[4]), 0);
      assertTrue(gr.isSpellKiho(sampleSpells[2]));
      assertEqual(gr.getSpellElement(sampleSpells[0]), "terre");
      assertEqual(gr.getSpellElement(sampleSpells[2]), "kiho");
      assertEqual(gr.getSpellElement(sampleSpells[3]), "maho");
      assertEqual(gr.getSpellElement(sampleSpells[4]), "universel");
    });

    it("isValidMahoPassword valide uniquement les mots de passe canoniques du sceau Mahō", function () {
      assertTrue(gr.isValidMahoPassword("Iuchiban"));
      assertTrue(gr.isValidMahoPassword("  jigoku "));
      assertEqual(gr.isValidMahoPassword("rokugan"), false);
    });

    it("filterSpellsList masque la Mahō par défaut et filtre par élément, Kihō, rang et texte", function () {
      // Maho verrouillée par défaut : 4 sorts sur 5
      const withoutMaho = gr.filterSpellsList(sampleSpells, { isMahoUnlocked: false });
      assertEqual(withoutMaho.length, 4);

      // Maho déverrouillée : 5 sorts sur 5
      const withMaho = gr.filterSpellsList(sampleSpells, { isMahoUnlocked: true });
      assertEqual(withMaho.length, 5);

      // Filtre élément "feu" : inclut le sort de Feu ET le Kiho rattaché à l'anneau du Feu
      const fireSpells = gr.filterSpellsList(sampleSpells, { selectedElement: "feu" });
      assertEqual(fireSpells.length, 2);

      // Filtre uniquement "kiho"
      const kihosOnly = gr.filterSpellsList(sampleSpells, { selectedElement: "kiho" });
      assertEqual(kihosOnly.length, 1);
      assertEqual(kihosOnly[0].name, "Danse des Flammes");

      // Filtre par rang 1 et recherche texte "outremonde"
      const rank1Search = gr.filterSpellsList(sampleSpells, { selectedRank: "1", query: "Outremonde" });
      assertEqual(rank1Search.length, 1);
      assertEqual(rank1Search[0].name, "Frappe de Jade");

      // Appels successifs sur les mêmes objets (cache WeakMap) avec des filtres distincts
      const repeatSearch = gr.filterSpellsList(sampleSpells, { selectedRank: "3", query: "celeste" });
      assertEqual(repeatSearch.length, 1);
      assertEqual(repeatSearch[0].name, "Fureur d'Osano-Wo");
    });
  });

  // ===========================================================================
  // 4. EXPORT JSON CARNET DE ROKUGAN (js/export-carnet.js)
  // ===========================================================================
  describe("4. Export JSON « Carnet de Rokugan » (schemaVersion: 2)", function () {
    it("resolveCanonClan et resolveSchoolIdFromText résolvent les identifiants canoniques du Carnet", function () {
      assertEqual(ec.resolveCanonClan("Clan du Crabe"), "Crabe");
      assertEqual(ec.resolveCanonClan("Phoenix"), "Phénix");
      assertEqual(ec.resolveCanonClan("Familles Impériales"), "Impérial");

      assertEqual(ec.resolveSchoolIdFromText("École de bushi Hida", "bushi-hida"), "hida-bushi");
      assertEqual(ec.resolveSchoolIdFromText("École de duelliste Kakita"), "kakita-bushi");
      assertEqual(ec.resolveSchoolIdFromText("École de shugenja Isawa"), "isawa-shugenja");
      assertEqual(ec.resolveSchoolIdFromText("École personnalisée inconnue"), "");
    });

    it("normalizeSkillEntry normalise les noms, extrait les spécialisations et associe le Trait anglais", function () {
      // Traduction de catalogue entre parenthèses ignorée comme spécialisation
      const stealth = ec.normalizeSkillEntry("Discrétion (Stealth)", 2, false);
      assertDeepEqual(stealth, {
        name: "Discrétion",
        rank: 2,
        trait: "agility",
        emphases: []
      });

      // Vraie spécialisation conservée
      const ken = ec.normalizeSkillEntry("Kenjutsu (Katana)", 4, true);
      assertDeepEqual(ken, {
        name: "Kenjutsu",
        rank: 4,
        trait: "agility",
        emphases: ["Katana"]
      });

      // Synonymes renommés selon le standard Carnet
      const inv = ec.normalizeSkillEntry("Enquête", 3, false);
      assertEqual(inv.name, "Investigation");
      assertEqual(inv.trait, "perception");
    });

    it("calculateCarnetRingsAndInsight calcule les Anneaux et le Rang de Réputation jusqu'au Rang 10", function () {
      const res = ec.calculateCarnetRingsAndInsight(
        { stamina: 3, willpower: 4, strength: 3, perception: 3, agility: 4, intelligence: 3, reflexes: 3, awareness: 3 },
        3,
        [{ rank: 10 }, { rank: 15 }]
      );
      // earth=3, water=3, fire=3, air=3, void=3 => ringsSum = 15 (150) + 25 = 175 => insightRank = 3
      assertEqual(res.ringsSum, 15);
      assertEqual(res.insightPoints, 175);
      assertEqual(res.insightRank, 3);
    });

    it("resolveCarnetArmor, resolveCarnetWeapons et buildCarnetModifiers génèrent des structures schemaVersion: 2", function () {
      assertDeepEqual(ec.resolveCarnetArmor(10), {
        name: "Armure lourde",
        bonus: 10,
        reduction: 5,
        catalogId: "heavy"
      });

      const weapons = ec.resolveCarnetWeapons(["Katana", "Yumi (Arc)"]);
      assertEqual(weapons.length, 2);
      assertEqual(weapons[0].skill, "Kenjutsu");
      assertEqual(weapons[1].skill, "Kyujutsu");
      assertEqual(weapons[1].bowStrength, 3);

      const mods = ec.buildCarnetModifiers(
        [{ name: "Force de la Terre" }, { name: "Vitesse Éclair" }],
        [{ name: "Petit (Small)" }]
      );
      assertEqual(mods.length, 3);
      assertEqual(mods[0].id, "force-de-la-terre");
      assertEqual(mods[1].id, "vitesse-eclair");
      assertEqual(mods[2].id, "petit-degats");
    });
  });

  // ===========================================================================
  // 5. ÉCRAN DU MAÎTRE DU JEU (js/gm-screen.js)
  // ===========================================================================
  describe("5. Écran du MJ — Blessures L5R 4e, Import JSON & Initiative", function () {
    it("computeL5RWoundState calcule les 8 paliers et malus L5R 4e selon l'Anneau de Terre", function () {
      const healthy = gm.computeL5RWoundState(10, 3);
      assertEqual(healthy.levelKey, "healthy");
      assertEqual(healthy.penalty, 0);
      assertEqual(healthy.maxWounds, 51); // 15 + 6 * 6

      const nicked = gm.computeL5RWoundState(16, 3);
      assertEqual(nicked.levelKey, "nicked");
      assertEqual(nicked.penalty, 3);

      const crippled = gm.computeL5RWoundState(42, 3);
      assertEqual(crippled.levelKey, "crippled");
      assertEqual(crippled.penalty, 20);

      const dead = gm.computeL5RWoundState(52, 3);
      assertEqual(dead.levelKey, "dead");
      assertEqual(dead.penalty, null);
    });

    it("normalizeImportedCharacter importe un JSON Carnet de Rokugan v2 et détecte Haut Seuil de Douleur", function () {
      const pc = gm.normalizeImportedCharacter({
        schemaVersion: 2,
        name: "Hida Kenji",
        clan: "crab",
        school: "Bushi Hida",
        insightRank: 2,
        traits: { stamina: 4, willpower: 3, strength: 4, perception: 2, reflexes: 3, awareness: 2, agility: 3, intelligence: 2 },
        voidRing: 3,
        armor: { name: "Armure Lourde", tnBonus: 10, reduction: 5 },
        advantages: "Haut Seuil de Douleur"
      });
      assertEqual(pc.name, "Hida Kenji");
      assertEqual(pc.rings.earth, 3);
      assertEqual(pc.armorTN, 30); // 3*5 + 5 + 10
      assertEqual(pc.reduction, 5);
      assertEqual(pc.woundPenaltyDelta, -3);
      assertEqual(pc.initFormula, "5g3");
    });

    it("sortCombatantsByInit trie les combattants par Initiative décroissante", function () {
      const sorted = gm.sortCombatantsByInit([
        { name: "Bandit", type: "enemy", initiative: 12 },
        { name: "Hida Kenji", type: "pc", initiative: 21 },
        { name: "Ninja", type: "enemy", initiative: 21 }
      ]);
      assertEqual(sorted[0].name, "Hida Kenji");
      assertEqual(sorted[1].name, "Ninja");
      assertEqual(sorted[2].name, "Bandit");
    });

    it("formatRollResult formate correctement la sortie de simulateRollAndKeep", function () {
      const sim = cg.simulateRollAndKeep(4, 2, 3, { rng: () => 0.99 });
      const formatted = gm.formatRollResult(sim);
      assertEqual(formatted.keptRolls.length, 2);
      assertEqual(formatted.droppedRolls.length, 2);
      assertTrue(formatted.total > 20);
    });

    it("buildSkirmishCombatants génère le tableau trié avec PJs cochés et N PNJs", function () {
      const pcs = [
        { id: "p1", name: "Hida Kenji", includedInSkirmish: true, lastInit: 25, armorTN: 25, reduction: 5, rings: { earth: 3 }, traits: { agility: 3 }, wounds: 0, weapons: [{ damage: "6g3" }] },
        { id: "p2", name: "Isawa Ren", includedInSkirmish: false, lastInit: 10, armorTN: 15, reduction: 0, rings: { earth: 2 }, traits: { agility: 2 }, wounds: 0, weapons: [] }
      ];
      const list = gm.buildSkirmishCombatants(pcs, {
        npcCount: 3,
        npcTemplate: { name: "Bandit", initFormula: "4g2", armorTN: 15, reduction: 2, earth: 2, attack: "5g2", damage: "4g2" },
        rng: () => 0.4 // chaque d10 = 5 -> 4g2 = 10
      });
      assertEqual(list.length, 4); // 1 PJ coché + 3 PNJs
      assertEqual(list[0].name, "Hida Kenji");
      assertEqual(list[0].initiative, 25);
      assertEqual(list[1].type, "enemy");
      assertEqual(list[1].initiative, 10);
      assertEqual(list[1].attack, "5g2");
      assertEqual(list[1].damage, "4g2");
    });

    it("computeEffectiveCombatantTN gère Postures, Défense PJ, Étourdi, Aveuglé et À terre", function () {
      const pcRef = { armorBonus: 10, defenseBonus: 6, traits: { reflexes: 3 } };
      assertEqual(gm.computeEffectiveCombatantTN({ armorTN: 30, stance: "assaut", statuses: [] }, pcRef).effectiveTN, 20);
      assertEqual(gm.computeEffectiveCombatantTN({ armorTN: 30, stance: "defense", statuses: [] }, pcRef).effectiveTN, 36);
      assertEqual(gm.computeEffectiveCombatantTN({ armorTN: 30, stance: "defense", statuses: ["stunned"] }, pcRef).effectiveTN, 15); // 5 + armorBonus 10
      assertEqual(gm.computeEffectiveCombatantTN({ armorTN: 25, stance: "attaque", statuses: ["blinded"] }, null).effectiveTN, 9); // Réflexes 4 + 5
      assertEqual(gm.computeEffectiveCombatantTN({ armorTN: 25, stance: "attaque", statuses: ["prone", "blinded"] }, null).effectiveTN, 5);

      assertDeepEqual(gm.computeNetDamageAfterReduction(22, 5), { raw: 22, reduction: 5, absorbed: 5, net: 17 });
      assertDeepEqual(gm.computeNetDamageAfterReduction(4, 6), { raw: 4, reduction: 6, absorbed: 4, net: 0 });
      assertDeepEqual(gm.computeNetDamageAfterReduction(18, 5, true), { raw: 18, reduction: 0, absorbed: 0, net: 18 });
    });

    it("computeIaijutsuFocusVerdict, computeMagicCastParams et filterGmRulesCards calculent les règles L5R 4e", function () {
      const duelGap = gm.computeIaijutsuFocusVerdict(34, 21, "Haruka", "Rônin");
      assertEqual(duelGap.winner, "a");
      assertEqual(duelGap.freeRaises, 1); // floor((13 - 5)/5) = 1
      assertEqual(gm.computeIaijutsuFocusVerdict(22, 20).simultaneous, true);

      const spell = gm.computeMagicCastParams(3, 2, 2, 1, "affinity");
      // ring=3, effectiveRank=3 => 6g3, mastery 2 (15) + 1 raise (+5) = ND 20
      assertEqual(spell.formula, "6g3");
      assertEqual(spell.tn, 20);

      // Déficience L5R 4e (LdB p.164) : -1 Rang d'École effectif (aucun +5 ND) ; Rang 0 = impossible
      const defOk = gm.computeMagicCastParams(3, 2, 2, 0, "deficiency");
      assertEqual(defOk.formula, "4g3");
      assertEqual(defOk.tn, 15);
      assertEqual(defOk.cannotCast, false);
      assertEqual(gm.computeMagicCastParams(3, 1, 1, 0, "deficiency").cannotCast, true);

      const res = gm.filterGmRulesCards(gmRules.GM_RULES_CARDS, "all", "étourdi");
      assertTrue(res.length >= 1, "Le paravent doit retrouver la fiche contenant Étourdi");
    });
  });

  // ===========================================================================
  // 6. CATALOGUES OFFICIELS L5R 4E (SORTS, KATAS, TATOUAGES, AVANTAGES)
  // ===========================================================================
  describe("6. Catalogues L5R 4e — Intégrité, Volumes & Règles Exactes", function () {
    it("SORTS_DATA agrège les 372 sorts, kihos et mahō officiels sans doublon d'ID", function () {
      assertEqual((catalogScope.SORTS_UNIVERSELS || []).length, 5, "Universels");
      assertEqual((catalogScope.SORTS_AIR || []).length, 68, "Air");
      assertEqual((catalogScope.SORTS_TERRE || []).length, 58, "Terre");
      assertEqual((catalogScope.SORTS_FEU || []).length, 59, "Feu");
      assertEqual((catalogScope.SORTS_EAU || []).length, 41, "Eau");
      assertEqual((catalogScope.SORTS_VIDE || []).length, 31, "Vide");
      assertEqual((catalogScope.SORTS_KIHO || []).length, 64, "Kiho");
      assertEqual((catalogScope.SORTS_MAHO || []).length, 46, "Maho");

      const all = catalogScope.SORTS_DATA || [];
      assertEqual(all.length, 372, "Total SORTS_DATA");
      const ids = new Set(all.map(s => s.id));
      assertEqual(ids.size, all.length, "Aucun identifiant de sort en doublon");
    });

    it("Les sorts, kihos et mahō corrigés portent les mécaniques exactes L5R 4e", function () {
      const byId = catalogScope.SORTS_BY_ID || {};
      assertTrue(!!byId["earth-1-soul-of-stone"], "Âme de Pierre (Core) présent");
      assertTrue(!!byId["earth-3-purge-taint"], "Purger la Souillure présent");
      assertTrue(!!byId["earth-4-tomb-jade"] && /2g2/.test(byId["earth-4-tomb-jade"].desc || ""), "Tombeau de Jade : 2g2 Blessures");
      assertTrue(!!byId["feu-4-ward-thunder"], "Garde du Tonnerre présent");
      assertTrue(!!byId["feu-5-follow-flame"] && /6k5|6g5/.test(byId["feu-5-follow-flame"].desc || ""), "Poursuite de la Flamme : 6k5 Blessures");
      assertTrue(!!byId["void-2-false-whispers"] && /Aucunes?/i.test(byId["void-2-false-whispers"].raises || ""), "Faux Murmures sans augmentations");
      assertTrue(!!byId["kiho-void-4-banish-all-shadows"] && byId["kiho-void-4-banish-all-shadows"].isKiho === true, "Bannir Toutes les Ombres");
      assertTrue(!!byId["maho-2-hates-heart"] && byId["maho-2-hates-heart"].mastery === 3 && byId["maho-2-hates-heart"].keywords.includes("Air"), "Cœur de Haine : Air 3 Mahō");

      const mahoList = catalogScope.SORTS_MAHO || [];
      assertTrue(
        mahoList.every(m => m.isMaho === true && Array.isArray(m.keywords) && m.keywords.some(k => /mah[oō]/i.test(k))),
        "Tous les sortilèges de Mahō portent isMaho et le mot-clé Mahō"
      );
    });

    it("KATAS_DATA réunit les 43 Katas officiels 4e édition sans doublon (dont Book of Water et 1 000 Ans d'Acier)", function () {
      const katas = catalogScope.KATAS_DATA || [];
      assertEqual(katas.length, 43, "Total Katas (43 officiels L5R 4e)");
      assertEqual(new Set(katas.map(k => k.id)).size, katas.length, "Aucun ID Kata en doublon");
      const worldEmpty = katas.find(k => k.id === "kata-acier-monde-est-vide");
      assertTrue(!!worldEmpty && worldEmpty.element === "Air / Feu", "The World is Empty présent (Air / Feu)");
      const waterBookIds = ["kata-eau-feuilles-courant", "kata-eau-vagues-brisants", "kata-eau-puissance-tsunami"];
      assertTrue(waterBookIds.every(id => katas.some(k => k.id === id)), "Les 3 Katas de The Book of Water sont présents");

      const pubKatas = katasUi.filterKatasList(katas, { includeSecrets: false });
      assertEqual(pubKatas.length, 42, "42 Katas visibles aux PJ (La Force de l'Araignée masquée)");
      const searchWorldEmpty = katasUi.filterKatasList(katas, { query: "The World is Empty", includeSecrets: false });
      assertEqual(searchWorldEmpty.length, 1, "Recherche 'The World is Empty' exacte");
    });

    it("TATOUAGES_DATA réunit les 24 Tatouages Togashi officiels 4e édition sans doublon", function () {
      const tattoos = catalogScope.TATOUAGES_DATA || [];
      assertEqual(tattoos.length, 24, "Total Tatouages");
      assertEqual(new Set(tattoos.map(t => t.id)).size, tattoos.length, "Aucun ID Tatouage en doublon");
      const dragon = tattoos.find(t => t.id === "tatouage-dragon");
      const spider = tattoos.find(t => t.id === "tatouage-araignee");
      assertTrue(!!dragon && /cône/i.test(dragon.rule || ""), "Tatouage Dragon (souffle en cône)");
      assertTrue(!!spider && /verticales/i.test(spider.rule || ""), "Tatouage Araignée (parois verticales)");
    });

    it("L5R_DATA contient les avantages et désavantages corrigés (Nom Gaijin, Téméraire...)", function () {
      const l5r = catalogScope.L5R_DATA || {};
      const dis = l5r.disadvantages || [];
      assertTrue(dis.some(d => d.id === "dis-nom-gaijin"), "Nom Gaijin présent");
      assertTrue(dis.some(d => /Brash|Téméraire/.test(d.name || "")), "Téméraire (Brash) présent");
    });

    it("CLANS_DATA, COMPETENCES_DATA, EQUIPEMENT et GM_RULES_CARDS respectent les standards 4e", function () {
      const clans = catalogScope.CLANS_DATA || {};
      const clanKeys = Object.keys(clans);
      assertEqual(clanKeys.length, 13, "13 clans & factions dans CLANS_DATA");
      assertTrue(
        clanKeys.every(k => Array.isArray(clans[k].families) && clans[k].families.length >= 1 && Array.isArray(clans[k].schools) && clans[k].schools.length >= 1),
        "Chaque clan possède familles et écoles"
      );
      const totalSchools = clanKeys.reduce((acc, k) => acc + clans[k].schools.length, 0);
      assertEqual(totalSchools, 95, "95 écoles officielles répertoriées");

      const comps = catalogScope.COMPETENCES_DATA || [];
      assertEqual(comps.length, 55, "55 compétences officielles");
      assertEqual(new Set(comps.map(c => c.name)).size, comps.length, "Aucun nom de compétence en doublon");

      const eq = typeof catalogScope.getEquipment === "function" ? catalogScope.getEquipment() : {};
      assertEqual((eq.weapons || []).length, 54, "54 armes");
      assertEqual((eq.armors || []).length, 10, "10 armures");
      assertEqual((eq.arrows || []).length, 6, "6 types de flèches");
      const katana = (eq.weapons || []).find(w => w.id === "katana");
      assertTrue(!!katana && katana.vd === "3g2", "Katana : 3g2");
      assertEqual((eq.weapons || []).filter(w => typeof w.bowStrength === "number").length, 3, "3 arcs avec bowStrength");

      assertEqual((gmRules.GM_RULES_CARDS || []).length, 13, "13 fiches officielles dans le Paravent MJ");
    });
  });

  // ===========================================================================
  // 7. RECUEIL DES KIHOS (js/kihos.js)
  // ===========================================================================
  describe("7. Recueil des Kihos — Filtrage par Anneau, Catégorie, Maîtrise & Atemi", function () {
    it("filterKihosList filtre les 64 Kihos officiels par Anneau, Type, Maîtrise et Atemi", function () {
      const kihos = catalogScope.SORTS_KIHO || [];
      assertEqual(kh.filterKihosList(kihos, {}).length, 64, "Total Kihos");
      assertEqual(kh.filterKihosList(kihos, { ring: "air" }).length, 18, "Kihos d'Air");
      assertEqual(kh.filterKihosList(kihos, { ring: "terre" }).length, 17, "Kihos de Terre");
      assertEqual(kh.filterKihosList(kihos, { ring: "eau" }).length, 8, "Kihos d'Eau");
      assertEqual(kh.filterKihosList(kihos, { ring: "feu" }).length, 12, "Kihos de Feu");
      assertEqual(kh.filterKihosList(kihos, { ring: "vide" }).length, 9, "Kihos du Vide");

      const kharmiques = kh.filterKihosList(kihos, { type: "kharmique" });
      assertEqual(kharmiques.length, 14, "14 Kihos Kharmiques (orthographes Kharmic/Kharmique unifiées)");
      assertEqual(kh.filterKihosList(kihos, { type: "atemi" }).length, 21, "21 Kihos Atemi");
      assertEqual(kh.filterKihosList(kihos, { rank: "7" }).length, 8, "8 Kihos de Maîtrise 7");
      assertEqual(kh.filterKihosList(kihos, { rank: "8" }).length, 2, "2 Kihos de Maîtrise 8");
    });
  });

  // ===========================================================================
  // 8. ACCÈS MJ & DISSIMULATION DES FACTIONS / SECRETS POUR LES PJ
  // ===========================================================================
  describe("8. Accès MJ & Dissimulation du Clan de l'Araignée / Secrets pour les PJ", function () {
    it("isGmSecretsUnlocked est verrouillé par défaut et isGmSecretEntry identifie les entrées secrètes", function () {
      assertEqual(cg.isGmSecretsUnlocked(), false, "Secrets MJ verrouillés par défaut");
      const clans = catalogScope.CLANS_DATA || {};
      assertTrue(cg.isGmSecretEntry(clans.araignee), "Clan de l'Araignée marqué gmOnly");

      const mineurs = clans.mineurs || { families: [], schools: [] };
      const chudaFam = (mineurs.families || []).find(f => /Chuda/i.test(f.name || ""));
      const chudaSchool = (mineurs.schools || []).find(s => s.id === "chuda-shugenja-original");
      assertTrue(cg.isGmSecretEntry(chudaFam), "Famille Chuda (Serpent) marquée gmOnly");
      assertTrue(cg.isGmSecretEntry(chudaSchool), "École Shugenja Chuda originelle marquée gmOnly");

      const l5r = catalogScope.L5R_DATA || {};
      const secretIds = ["adv-parangon-sombre", "adv-savoir-interdit", "dis-consume-shourido", "dis-agent-dormant", "dis-souillure-outremonde"];
      const allPerks = [...(l5r.advantages || []), ...(l5r.disadvantages || [])];
      secretIds.forEach(id => {
        const entry = allPerks.find(p => p.id === id);
        assertTrue(cg.isGmSecretEntry(entry), `Avantage/Désavantage secret ${id} marqué gmOnly`);
      });

      const katas = catalogScope.KATAS_DATA || [];
      const spiderKata = katas.find(k => k.id === "kata-terre-force-araignee");
      assertTrue(cg.isGmSecretEntry(spiderKata), "Kata La Force de l'Araignée marqué gmOnly");

      const eq = typeof catalogScope.getEquipment === "function" ? catalogScope.getEquipment() : {};
      const ninjaTo = (eq.weapons || []).find(w => w.id === "ninja-to");
      const shuriken = (eq.weapons || []).find(w => w.id === "shuriken");
      assertTrue(cg.isGmSecretEntry(ninjaTo), "Ninja-tō marqué gmOnly");
      assertTrue(cg.isGmSecretEntry(shuriken), "Shuriken marqué gmOnly");
    });

    it("Les catalogues PJ excluent les clans/écoles gmOnly tout en préservant les 95 écoles pour l'accès MJ", function () {
      const clans = catalogScope.CLANS_DATA || {};
      const publicClans = Object.keys(clans).filter(k => !cg.isGmSecretEntry(clans[k]));
      assertEqual(publicClans.length, 12, "12 clans publics visibles pour les PJ");
      assertTrue(!publicClans.includes("araignee"), "Le Clan de l'Araignée est absent du catalogue public");

      if (!isNode && typeof cg.getAllSchoolsCatalog === "function") {
        const publicSchools = cg.getAllSchoolsCatalog(false);
        const fullSchools = cg.getAllSchoolsCatalog(true);
        assertEqual(fullSchools.length, 95, "95 écoles complètes avec secrets déverrouillés");
        assertTrue(publicSchools.length < fullSchools.length, "Écoles secrètes masquées aux PJ");
        assertTrue(!publicSchools.some(s => s.clanKey === "araignee" || s.id === "chuda-shugenja-original"), "Aucune école Araignée/Chuda visible côté PJ");
      }
    });
  });

  // ===========================================================================
  // 9. CARTE INTERACTIVE DE ROKUGAN & CHEMIN DES PJS
  // ===========================================================================
  describe("9. Carte Interactive de Rokugan & Chemin de Campagne (data/carte-data.js & js/carte-rokugan.js)", function () {
    it("ROKUGAN_LOCATIONS et CAMPAIGN_ROUTE couvrent toutes les capitales et les 11 Actes de campagne", function () {
      const locs = carteData.ROKUGAN_LOCATIONS || [];
      const route = carteData.CAMPAIGN_ROUTE || [];
      assertTrue(locs.length >= 40, "Au moins 40 lieux répertoriés sur Rokugan");
      assertTrue(locs.every(l => l.x >= 0 && l.x <= 100 && l.y >= 0 && l.y <= 100), "Toutes les coordonnées sont en 0..100 %");
      assertEqual(route.length, 11, "11 Actes chronologiques dans CAMPAIGN_ROUTE");
      const locIds = new Set(locs.map(l => l.id));
      assertTrue(route.every(act => locIds.has(act.locationId)), "Chaque Acte référence un lieu existant de ROKUGAN_LOCATIONS");

      const segsUpTo4 = carteUi.buildRoutePointsUpToAct(route, 4);
      assertEqual(segsUpTo4.length, 4, "Tracé progressif jusqu'à l'Acte 4");

      const crabeFiltered = carteUi.filterLocations(locs, { faction: "crabe" });
      assertTrue(crabeFiltered.length >= 5 && crabeFiltered.every(l => l.faction === "crabe"), "Filtre par clan Crabe exact");
      const searchRyoko = carteUi.filterLocations(locs, { query: "ryoko" });
      assertEqual(searchRyoko.length, 1, "Recherche Ryoko Owari exacte");
    });
  });

  // ===========================================================================
  // 10. EXPLORATEUR & COMPARATEUR DES ÉCOLES (js/ecoles.js)
  // ===========================================================================
  describe("10. Explorateur & Comparateur des Écoles (Filtrage secrets MJ, tri & filtres)", function () {
    it("buildSchoolsCatalogEntries exclut les écoles gmOnly par défaut et permet tri/filtrage", function () {
      const clans = catalogScope.CLANS_DATA || {};
      const pubList = ecolesUi.buildSchoolsCatalogEntries(clans, false);
      const fullList = ecolesUi.buildSchoolsCatalogEntries(clans, true);
      assertEqual(pubList.length, 88, "88 écoles publiques visibles aux PJ");
      assertEqual(fullList.length, 95, "95 écoles complètes avec secrets MJ");
      assertTrue(!pubList.some(s => s.clanKey === "araignee" || s.id === "chuda-shugenja-original"), "Aucune école secrète visible sans déverrouillage MJ");

      const bushiHon5 = ecolesUi.filterSchoolsEntries(pubList, { type: "Bushi", minHonor: 5.5 });
      assertTrue(bushiHon5.length >= 3 && bushiHon5.every(s => s.type === "Bushi" && s.honor >= 5.5), "Filtre Bushi + Honneur >= 5.5 exact");

      const sortedDesc = ecolesUi.sortSchoolsEntries(pubList, "honor", "desc");
      assertTrue(sortedDesc[0].honor >= sortedDesc[sortedDesc.length - 1].honor, "Tri décroissant par Honneur exact");
    });
  });

  // ===========================================================================
  // 11. IMPORT CARNET DE ROKUGAN (schemaVersion: 2 -> FORGE L5R 4E)
  // ===========================================================================
  describe("11. Importation depuis Le Carnet de Rokugan (schemaVersion: 2 -> Forge)", function () {
    it("isCarnetRokuganPayload et extractCarnetCandidates détectent fidèlement Carnet v2, Forge et listes", function () {
      assertTrue(ec.isCarnetRokuganPayload({ schemaVersion: 2, name: "Hida", traits: { stamina: 3 } }), "Carnet v2 détecté");
      assertTrue(ec.isCarnetRokuganPayload({ name: "Kakita", traits: { reflexes: 4 }, voidRing: 3 }), "Carnet avec traits anglais détecté");
      assertTrue(!ec.isCarnetRokuganPayload({ clan: "crabe", family: "0", school: "bushi-hida", traits: { sta: 3, wil: 2 } }), "Sauvegarde Forge native reconnue comme non-Carnet");

      const arrCand = ec.extractCarnetCandidates([{ name: "A" }, { name: "B" }]);
      assertEqual(arrCand.length, 2, "Tableau racine extrait");
      const wrapCand = ec.extractCarnetCandidates({ characters: [{ name: "C" }] });
      assertEqual(wrapCand[0].name, "C", "Enveloppe { characters } extraite");
    });

    it("convertCarnetToForgeData convertit traits anglais, école, compétences, équipement et verrou secrets MJ", function () {
      const clans = catalogScope.CLANS_DATA || {};
      const skillsCat = catalogScope.COMPETENCES_DATA || [];
      const advCat = catalogScope.AVANTAGES_DESAVANTAGES || {};
      const eqCat = catalogScope.EQUIPEMENT_DATA || { armures: [], armes: [] };
      const spellsCat = catalogScope.SORTS_DATA || [];

      assertEqual(ec.resolveForgeSkillName("investigation", skillsCat), "Enquête (Investigation)", "Alias Enquête exact");
      assertEqual(ec.resolveForgeSkillName("Lore: Theology", skillsCat), "Connaissance : Théologie", "Alias Lore: Theology exact");

      const carnetSample = {
        schemaVersion: 2,
        name: "Kakita Haruto",
        clan: "Grue",
        family: "Kakita",
        school: "Duelliste Kakita",
        schoolId: "kakita-bushi",
        xp: { total: 55, spent: 50 },
        traits: {
          stamina: 2, willpower: 3, strength: 2, perception: 2,
          agility: 3, intelligence: 2, reflexes: 4, awareness: 3
        },
        voidRing: 3,
        armor: { name: "Armure légère", bonus: 5, reduction: 3 },
        weapons: [{ name: "Katana" }, { name: "Yumi" }],
        skills: [
          { name: "Iaijutsu", rank: 4, isSchool: true, emphases: ["Focus"] },
          { name: "Kenjutsu", rank: 2, isSchool: true, emphases: [] },
          { name: "Etiquette", rank: 1, isSchool: true, emphases: [] },
          { name: "Sincerity", rank: 1, isSchool: true, emphases: [] },
          { name: "Investigation", rank: 2, isSchool: false, emphases: [] }
        ],
        advantages: "Chance\nGrande Destinée",
        disadvantages: "Sensible à la Douleur",
        notes: "Kimono de soie, daisho"
      };

      const res = ec.convertCarnetToForgeData(carnetSample, {
        clansData: clans,
        skillsCatalog: skillsCat,
        advCatalog: advCat,
        equipData: eqCat,
        spellsCatalog: spellsCat,
        includeSecrets: false
      });

      assertEqual(res.summary.sourceFormat, "carnet-v2", "Format source identifié carnet-v2");
      assertEqual(res.forgeData.clan, "grue", "Clan Grue résolu");
      assertEqual(res.forgeData.school, "duelliste-kakita", "École Duelliste Kakita résolue");
      assertEqual(res.forgeData.traits.ref, 4, "Réflexes convertis (4)");
      assertEqual(res.forgeData.traits.voi, 3, "Vide converti (3)");
      assertEqual(res.forgeData.baseXP, "55", "XP total conservé");
      assertEqual(res.forgeData.armor, "5", "Armure légère résolue (+5)");
      assertEqual(res.forgeData.weapon1, "Katana", "Arme principale Katana résolue");
      assertEqual(res.forgeData.weapon2, "Yumi (Arc, Flèches Saule 2g2)", "Arme secondaire Yumi résolue");
      assertTrue(res.forgeData.skills.some(s => s.name.startsWith("Iaijutsu") && s.rank === 4 && s.spec === true && s.isSchool === true), "Compétence Iaijutsu + spécialité + école conservées");
      assertTrue(res.forgeData.skills.some(s => s.name === "Enquête (Investigation)" && s.rank === 2 && s.isSchool === false), "Compétence hors-école Enquête importée");
      assertTrue(res.forgeData.advantages.length >= 2, "Avantages importés depuis chaîne Carnet");
      assertTrue(res.forgeData.disadvantages.length >= 1, "Désavantages importés depuis chaîne Carnet");

      // Vérifie que les écoles gmOnly restent verrouillées sans secrets MJ
      const spiderSample = { schemaVersion: 2, name: "Daigotsu Test", clan: "Araignée", schoolId: "daigotsu-bushi", traits: { stamina: 3 } };
      const lockedRes = ec.convertCarnetToForgeData(spiderSample, { clansData: clans, skillsCatalog: skillsCat, includeSecrets: false });
      assertTrue(lockedRes.warnings.length > 0 && lockedRes.forgeData.clan !== "araignee", "Clan secret MJ bloqué par défaut");
      const unlockedRes = ec.convertCarnetToForgeData(spiderSample, { clansData: clans, skillsCatalog: skillsCat, includeSecrets: true });
      assertEqual(unlockedRes.forgeData.clan, "araignee", "Clan secret résolu si secrets MJ déverrouillés");
    });
  });

  // ===========================================================================
  // 12. COIN MJ — SCÉNARIO II : LES JOUETS DE CENDRE ET DE SANG
  // ===========================================================================
  describe("12. Coin MJ — Scénario II : Les Jouets de Cendre et de Sang", () => {
    it("GM_SCENARIOS_DATA contient le Scénario II complet et ses 4 actes", () => {
      const list = gmScenarios.GM_SCENARIOS_DATA || [];
      assertTrue(Array.isArray(list) && list.length >= 1, "Liste de scénarios chargée");
      const sc2 = list.find(s => s.id === "scenario-2-jouets");
      assertTrue(Boolean(sc2), "Scénario II présent");
      assertEqual(sc2.acts.length, 4, "4 actes structurés");
      assertEqual(sc2.checklist.length, 10, "10 étapes de suivi Jour J");
      assertEqual(sc2.npcs.length, 5, "5 profils techniques en annexe");
    });

    it("Toutes les rencontres du Scénario II correspondent à des ENEMY_PRESETS valides", () => {
      const list = gmScenarios.GM_SCENARIOS_DATA || [];
      const sc2 = list.find(s => s.id === "scenario-2-jouets");
      const presets = (gm.ENEMY_PRESETS || []);
      const presetNames = new Set(presets.map(p => p.name));
      let encounterCount = 0;

      sc2.acts.forEach(act => {
        (act.scenes || []).forEach(scene => {
          if (scene.encounter) {
            encounterCount++;
            scene.encounter.enemies.forEach(e => {
              assertTrue(presetNames.has(e.presetName), `Preset présent pour "${e.presetName}"`);
            });
          }
        });
      });
      assertEqual(encounterCount, 2, "2 rencontres prêtes à lancer (Acte II et Acte IV)");
    });
  });

  // ===========================================================================
  // 13. RECHERCHE GLOBALE INSTANTANÉE (js/global-search.js)
  // ===========================================================================
  describe("13. Recherche Globale Instantanée (Ctrl+K) & Non-fuite Secrets MJ", () => {
    it("buildGlobalSearchIndex indexe écoles, lieux et pages tout en masquant gmOnly", () => {
      const clans = catalogScope.CLANS_DATA || {};
      const locs = carteData.ROKUGAN_LOCATIONS || [];
      const pubIndex = globalSearch.buildGlobalSearchIndex({
        CLANS_DATA: clans,
        ROKUGAN_LOCATIONS: locs,
        includeSecrets: false
      });
      const gmIndex = globalSearch.buildGlobalSearchIndex({
        CLANS_DATA: clans,
        ROKUGAN_LOCATIONS: locs,
        includeSecrets: true
      });

      assertTrue(pubIndex.length > 100, "Index public complet généré");
      assertTrue(gmIndex.length > pubIndex.length, "Index MJ inclut les écoles secrètes");
      assertTrue(!pubIndex.some(i => i.cat === "Écoles" && /daigotsu|chuda/i.test(i.title)), "Aucune école secrète dans l'index public");

      const kakitaRes = globalSearch.searchGlobalIndex(pubIndex, "Kakita", "Écoles");
      assertTrue(kakitaRes.length >= 1 && kakitaRes.some(r => /Kakita/i.test(r.title)), "Recherche école Kakita exacte");

      const ryokoRes = globalSearch.searchGlobalIndex(pubIndex, "Ryoko Owari", "Lieux");
      assertTrue(ryokoRes.length === 1 && ryokoRes[0].url.includes("ryoko-owari"), "Recherche lieu Ryoko Owari redirige vers carte.html?lieu=...");
    });
  });

  // ===========================================================================
  // 14. CODEX DE CAMPAGNE & STUDIO CARTE SNIPPET
  // ===========================================================================
  describe("14. Codex de Campagne (PNJ, Lieux, Reliques) & Studio Carte Snippet", function () {
    it("CAMPAIGN_CODEX_DATA couvre PNJ, Lieux et Reliques jusqu'à l'Acte 11 et filterCodexEntries filtre fidèlement", function () {
      const entries = codexData.CAMPAIGN_CODEX_DATA || [];
      assertTrue(entries.length >= 20, "Au moins 20 entrées dans le Codex de Campagne");
      assertTrue(entries.some(e => e.category === "npc"), "Contient des PNJ");
      assertTrue(entries.some(e => e.category === "place"), "Contient des Lieux");
      assertTrue(entries.some(e => e.category === "relic"), "Contient des Reliques");
      assertTrue(entries.some(e => Array.isArray(e.acts) && e.acts.includes(11)), "Contient des entrées liées à l'Acte 11");

      const act11Npcs = campagneStudio.filterCodexEntries(entries, { category: "npc", act: "11" });
      assertTrue(act11Npcs.length >= 4 && act11Npcs.every(e => e.category === "npc" && e.acts.includes(11)), "Filtre PNJ + Acte 11 exact");

      const takeda = campagneStudio.filterCodexEntries(entries, { category: "npc", query: "Takeda" });
      assertEqual(takeda.length, 1, "Recherche Soshi Takeda (PNJ) exacte");

      const snippet = campagneStudio.buildCarteDataSnippet({
        id: 12,
        title: "Les Ombres de Kyuden",
        place: "Kyuden Bayushi",
        author: "Tsuruchi Akira",
        date: "Acte 12",
        summary: "Nouvelle intrigue."
      });
      assertTrue(snippet.includes("ROKUGAN_LOCATIONS") && snippet.includes("CAMPAIGN_ROUTE") && snippet.includes("step: 12") && snippet.includes("campagne/scenario-12.html"), "buildCarteDataSnippet génère les blocs Carte & Checklist");
    });
  });

  // ===========================================================================
  // 15. FORGE — MODE SESSION DE JEU & SAUVEGARDE DOJO
  // ===========================================================================
  describe("15. Forge — Mode Session de Jeu & Sauvegarde complète du Dojo", function () {
    it("computeForgeSessionWoundState et mergeDojoBackupLists respectent L5R 4e et fusionnent sans doublon", function () {
      const w0 = cg.computeForgeSessionWoundState(0, 3);
      assertEqual(w0.label, "Indemne", "0 blessure = Indemne");
      assertEqual(w0.penalty, 0, "0 blessure = malus 0");
      assertEqual(w0.maxWounds, 57, "Terre 3 -> max 57 blessures");

      const w18 = cg.computeForgeSessionWoundState(18, 3);
      assertEqual(w18.label, "Éraflé", "Terre 3, 18 blessures -> Éraflé (+3)");
      assertEqual(w18.penalty, 3, "Malus +3 exact");

      const norm = cg.normalizeSessionState({ wounds: -5, taint: 1.25 });
      assertEqual(norm.wounds, 0, "Blessures négatives bornées à 0");
      assertEqual(norm.taint, 1.3, "Souillure arrondie au dixième");

      const merged = cg.mergeDojoBackupLists(
        [{ id: "s1", name: "Akira", clan: "mante" }],
        [{ id: "s1", name: "Akira v2", clan: "mante" }, { id: "s2", name: "Okado", clan: "crabe" }]
      );
      assertEqual(merged.added, 1, "1 nouveau samouraï ajouté");
      assertEqual(merged.updated, 1, "1 samouraï existant mis à jour");
      assertEqual(merged.list.length, 2, "Total 2 samouraïs dans le Dojo fusionné");
    });
  });

  // ===========================================================================
  // 16. ÉCRAN MJ — PRÉRÉGLAGES ACTE 11 & GÉNÉRATEUR EXPRESS
  // ===========================================================================
  describe("16. Écran MJ — Préréglages Acte 11 & Générateur Express (Noms / Rumeurs)", function () {
    it("ENEMY_PRESETS inclut les ennemis de l'Acte 11 et les générateurs produisent des résultats valides", function () {
      const presets = gm.ENEMY_PRESETS || [];
      assertTrue(presets.some(p => /Marionnette sans bouche/i.test(p.name)), "Marionnette sans bouche (Acte 11) présente");
      assertTrue(presets.some(p => /Archer corrompu/i.test(p.name)), "Archer corrompu (Acte 11) présent");
      assertTrue(presets.some(p => /Bunzo/i.test(p.name)), "Bunzo, Faux Moine (Acte 11) présent");

      const scorpionName = gm.generateRokuganiName("scorpion", () => 0);
      assertTrue(typeof scorpionName === "string" && scorpionName.startsWith("Bayushi "), "generateRokuganiName('scorpion') génère un nom de famille Scorpion");

      const heiminName = gm.generateRokuganiName("heimin", () => 0);
      assertTrue(typeof heiminName === "string" && !heiminName.includes(" "), "generateRokuganiName('heimin') génère un prénom simple sans nom de famille");

      const hook = gm.generateGmEncounterHook(() => 0);
      assertTrue(typeof hook === "string" && hook.length > 20, "generateGmEncounterHook retourne une accroche de rencontre");
    });
  });

  // ===========================================================================
  // 17. LECTEUR PODCAST AUDIO & MANIFESTE (js/narrator.js)
  // ===========================================================================
  describe("17. Lecteur Podcast Immersif & Résolution du Manifeste", function () {
    it("formatPodcastTime et resolvePodcastEntry formatent et résolvent les épisodes MP3", function () {
      assertEqual(narrator.formatPodcastTime(0), "00:00", "0s -> 00:00");
      assertEqual(narrator.formatPodcastTime(272), "04:32", "272s -> 04:32");
      assertEqual(narrator.formatPodcastTime(-5), "00:00", "Temps négatif borné à 00:00");

      const mockManifest = { episodes: { "11": { file: "assets/audio/scenario-11.mp3", durationSec: 310 } } };
      const found = narrator.resolvePodcastEntry(mockManifest, 11);
      assertTrue(found && found.file === "assets/audio/scenario-11.mp3", "Résolution de l'Acte 11 exacte");
      assertEqual(narrator.resolvePodcastEntry(mockManifest, 99), null, "Acte absent retourne null");
    });
  });

  // ===========================================================================
  // 18. PLANIFICATEUR DE SESSIONS / DOODLE PJs (js/sessions.js)
  // ===========================================================================
  describe("18. Planificateur de Sessions JDR — Janvier à Mars 2027 (js/sessions.js)", function () {
    it("generateWeekendSlots et groupSlotsByWeekend couvrent les 13 week-ends (65 créneaux) de janv. à mars 2027", function () {
      const slots = sessionsUi.generateWeekendSlots(2027, [0, 1, 2]);
      const groups = sessionsUi.groupSlotsByWeekend(slots);

      assertEqual(slots.length, 65, "65 créneaux week-end exactement entre janvier et mars 2027");
      assertEqual(groups.length, 13, "13 week-ends complets regroupés");
      assertEqual(slots[0].id, "2027-01-01:soir", "Premier créneau le vendredi 1er janvier 2027 au soir");
      assertEqual(slots[1].id, "2027-01-02:aprem", "Samedi 2 janvier 2027 après-midi");
      assertEqual(slots[2].id, "2027-01-02:soir", "Samedi 2 janvier 2027 soir");
      assertEqual(slots[slots.length - 1].id, "2027-03-28:soir", "Dernier créneau le dimanche 28 mars 2027 au soir");
    });

    it("computeSlotRanking, fusion des votes et partage URL/Discord fonctionnent bout en bout", function () {
      const slots = sessionsUi.generateWeekendSlots(2027, [0, 1, 2]);
      assertEqual(sessionsUi.cycleVoteState(""), "yes");
      assertEqual(sessionsUi.cycleVoteState("yes"), "maybe");
      assertEqual(sessionsUi.cycleVoteState("maybe"), "no");
      assertEqual(sessionsUi.cycleVoteState("no"), "");

      let responses = [];
      responses = sessionsUi.upsertParticipantResponse(responses, {
        name: "Tsuruchi Akira",
        clan: "mante",
        note: "Dispo dès 20h",
        votes: { "2027-01-16:soir": "yes", "2027-02-06:soir": "maybe" }
      });
      responses = sessionsUi.upsertParticipantResponse(responses, {
        name: "Okado Hiruma",
        clan: "crabe",
        votes: { "2027-01-16:soir": "yes", "2027-02-06:soir": "no" }
      });
      // Dédoublonnage insensible à la casse
      responses = sessionsUi.upsertParticipantResponse(responses, {
        name: "tsuruchi akira",
        clan: "mante",
        note: "Maj Ok",
        votes: { "2027-01-16:soir": "yes", "2027-02-06:soir": "yes" }
      });
      assertEqual(responses.length, 2, "Dédoublonnage par nom de PJ sans créer de doublon");

      const ranking = sessionsUi.computeSlotRanking(slots, responses);
      assertEqual(ranking[0].slot.id, "2027-01-16:soir", "Le créneau unanime 16 janv. 2027 soir arrive en tête");
      assertTrue(ranking[0].isPerfectMatch, "2/2 disponibles -> unanimité détectée");
      assertEqual(ranking[0].yesCount, 2);

      // Encodage / Décodage individuel + extraction Discord multi-lignes
      const tok1 = sessionsUi.encodeVoteSharePayload(responses[0], slots);
      const tok2 = sessionsUi.encodeVoteSharePayload(responses[1], slots);
      const discordPaste = `Voici mes dispos:\nhttps://vincenzorpg.github.io/L5R/sessions.html?vote=${tok1}\nOkado:\nhttps://vincenzorpg.github.io/L5R/sessions.html?vote=${tok2}`;
      const extracted = sessionsUi.extractAndDecodeShareInputs(discordPaste, slots);
      assertEqual(extracted.invalidCount, 0);
      assertEqual(extracted.imported.length, 2, "Extraction de 2 fiches depuis du texte Discord mixte");
      assertEqual(extracted.imported[0].votes["2027-01-16:soir"], "yes");

      // Poll complet roundtrip
      const pollTok = sessionsUi.encodePollSharePayload(responses, slots);
      const decodedPoll = sessionsUi.decodeSharePayload(`poll=${pollTok}`, slots);
      assertTrue(decodedPoll && decodedPoll.kind === "poll" && decodedPoll.items.length === 2, "Roundtrip ?poll= complet fidèle");

      // Résumé Discord & .ics
      const summary = sessionsUi.formatDiscordPlayerSummary(responses[0], slots, `https://vincenzorpg.github.io/L5R/sessions.html?vote=${tok1}`);
      assertTrue(/tsuruchi akira/i.test(summary) && summary.includes("16 janv.") && summary.includes("?vote="), "Résumé Discord complet");
      const ics = sessionsUi.buildIcsEventContent(slots.find(s => s.id === "2027-01-16:soir"));
      assertTrue(ics.includes("BEGIN:VCALENDAR") && ics.includes("DTSTART:20270116T200000"), "Export .ics valide");
    });
  });

  // ===========================================================================
  // 19. SOCLE FIREBASE AUTH, RÔLE MJ & DOJO CLOUD (js/firebase-service.js)
  // ===========================================================================
  describe("19. Socle Firebase Auth, Rôle MJ & Dojo Cloud (js/firebase-service.js)", function () {
    it("Configuration Firebase, détection du rôle MJ et nettoyage des clés/valeurs RTDB sont conformes", function () {
      const cfg = firebaseCfg.L5R_FIREBASE_CONFIG;
      assertTrue(cfg && cfg.projectId === "vincenzorpg-l5r", "projectId vincenzorpg-l5r présent");
      assertTrue(String(cfg.databaseURL || "").includes("europe-west1.firebasedatabase.app"), "URL RTDB europe-west1 présente");
      assertEqual(firebaseCfg.L5R_GM_EMAIL, "vincent.david.perso@gmail.com", "Email MJ configuré");

      assertEqual(firebaseSvc.isGmUser({ uid: "u1", email: "vincent.david.perso@gmail.com", emailVerified: true }, firebaseCfg.L5R_GM_EMAIL), true, "Email MJ vérifié reconnu");
      assertEqual(firebaseSvc.isGmUser({ uid: "u1", email: "vincent.david.perso@gmail.com", emailVerified: false }, firebaseCfg.L5R_GM_EMAIL), false, "Email MJ non vérifié refusé");
      assertEqual(firebaseSvc.isGmUser({ uid: "gm_123", email: "autre@test.fr", emailVerified: true }, firebaseCfg.L5R_GM_EMAIL, "gm_123"), true, "gmUid reconnu");
      assertEqual(firebaseSvc.isGmUser({ uid: "pj_1", email: "joueur@test.fr", emailVerified: true }, firebaseCfg.L5R_GM_EMAIL, "gm_123"), false, "Joueur standard non MJ");

      assertEqual(firebaseSvc.sanitizeFirebaseKey("samurai.1#2$3[4]/5"), "samurai_1_2_3_4_5", "Clé RTDB assainie");
      assertDeepEqual(firebaseSvc.stripUndefinedDeep({ a: 1, b: undefined, c: { d: undefined, e: "ok" } }), { a: 1, c: { e: "ok" } });
    });

    it("Dojo Cloud fusionne sans perte, génère des cartes publiques sans spoilers et prépare le roster MJ", function () {
      const charFull = {
        id: "samurai_akira",
        name: "Tsuruchi Akira",
        clan: "mante",
        family: "Tsuruchi",
        school: "Archer Tsuruchi",
        insightRank: 3,
        honor: 4.5,
        traits: { stamina: 3, willpower: 3 },
        voidRing: 3,
        disadvantages: "Sombre Secret, Ennemi Juré",
        taint: 1.5,
        notes: "Notes secrètes du PJ",
        sessionState: { wounds: 12, voidSpent: 1, taint: 1.5 },
        updatedAt: "2026-11-27T17:00:00.000Z"
      };

      const pub = firebaseSvc.buildPublicPartySummary(charFull, "uid_akira");
      assertEqual(pub.name, "Tsuruchi Akira");
      assertEqual(pub.ownerUid, "uid_akira");
      assertEqual(pub.woundStatus, "Éraflé");
      assertEqual(pub.disadvantages, undefined, "Aucun Désavantage divulgué dans publicParty");
      assertEqual(pub.taint, undefined, "Aucune Souillure divulguée dans publicParty");
      assertEqual(pub.notes, undefined, "Aucune Note privée divulguée dans publicParty");

      const roster = firebaseSvc.buildCampaignRosterEntry(charFull, "uid_akira", "Vincent");
      assertEqual(roster.isCampaignActive, true);
      assertEqual(roster.liveState.wounds, 12);
      assertEqual(roster.liveState.voidCurrent, 2);
      assertEqual(roster.liveState.taint, 1.5);

      const merged = firebaseSvc.mergeLocalAndCloudCharacters(
        [
          { id: "c1", name: "Akira Ancien", updatedAt: "2026-11-20T10:00:00.000Z" },
          { id: "c2", name: "Okado Local", updatedAt: "2026-11-25T10:00:00.000Z" }
        ],
        {
          c1: { id: "c1", name: "Akira Cloud Récent", updatedAt: "2026-11-27T12:00:00.000Z" },
          c3: { id: "c3", name: "Ryujin Cloud", updatedAt: "2026-11-26T10:00:00.000Z" }
        }
      );
      assertEqual(merged.length, 3, "Fusion conserve les 3 personnages sans perte");
      assertEqual(merged[0].name, "Akira Cloud Récent", "La version la plus récente gagne et est triée en tête");
      assertEqual(firebaseSvc.computeCloudSyncBadgeState({ user: { displayName: "Vincent" }, isGm: true }).tone, "gm");
      assertEqual(firebaseSvc.computeCloudSyncBadgeState({ user: null }).tone, "guest");
    });
  });

  // ===========================================================================
  // 20. JALON 2 FIREBASE — DOODLE 2027 LIVE & SYNC ÉCRAN MJ ↔ PJs
  // ===========================================================================
  describe("20. Jalon 2 Firebase — Doodle 2027 Temps Réel & Sync Live MJ ↔ PJs", function () {
    it("normalizeDoodleCloudEntries et mergeDoodleResponses fusionnent le Doodle temps réel sans perte", function () {
      assertTrue(firebaseSvc && typeof firebaseSvc.mergeDoodleResponses === "function", "mergeDoodleResponses doit exister");
      const cloudMap = {
        uid_akira: {
          uid: "uid_akira",
          name: "Tsuruchi Akira",
          clan: "mante",
          note: "Dispo dès 20h",
          votes: { "2027-01-08:soir": "yes", "2027-01-09:aprem": "maybe", invalid: "bogus" },
          updatedAt: "2026-11-27T18:00:00.000Z"
        },
        gm_hirohito: {
          uid: "gm_hirohito",
          name: "Hirohito Hida",
          clan: "crabe",
          votes: { "2027-01-08:soir": "yes" }
        }
      };
      const normalized = firebaseSvc.normalizeDoodleCloudEntries(cloudMap);
      assertEqual(normalized.length, 2, "2 fiches Cloud normalisées");
      const akira = normalized.find(e => e.name === "Tsuruchi Akira");
      assertEqual(akira.fromCloud, true);
      assertEqual(akira.votes["2027-01-08:soir"], "yes");
      assertEqual(akira.votes.invalid, undefined, "Les votes invalides doivent être filtrés");

      const localList = [
        { name: "Tsuruchi Akira", clan: "mante", votes: { "2027-01-08:soir": "no" } },
        { name: "Okado Hiruma", clan: "crabe", votes: { "2027-01-08:soir": "yes" } }
      ];
      const merged = firebaseSvc.mergeDoodleResponses(localList, cloudMap);
      assertEqual(merged.length, 3, "Fusion conserve la fiche locale + les 2 fiches Cloud");
      const akiraMerged = merged.find(e => e.name === "Tsuruchi Akira");
      assertEqual(akiraMerged.votes["2027-01-08:soir"], "yes", "La version Cloud fait foi pour Akira");
      assertEqual(akiraMerged.fromCloud, true);
    });

    it("applyLiveStateToCharacter, buildSkirmishPublicSnapshot et mergeCloudRosterIntoGmPcs préservent l'état et masquent les spoilers", function () {
      const updated = firebaseSvc.applyLiveStateToCharacter(
        { id: "c_akira", name: "Tsuruchi Akira", voidRing: 3, honor: 4.5, sessionState: { wounds: 0, voidSpent: 0 } },
        { wounds: 14, voidCurrent: 1, voidMax: 3, honor: 5.2, glory: 2.4, status: 1.5, taint: 0.5, spellsSpent: { air: 1, terre: 0, feu: 2, eau: 0, vide: 0 } }
      );
      assertEqual(updated.sessionState.wounds, 14);
      assertEqual(updated.sessionState.voidSpent, 2, "3 max - 1 courant = 2 dépensés");
      assertEqual(updated.sessionState.spellsSpent.feu, 2);
      assertEqual(updated.honor, 5.2);
      assertEqual(updated.taint, 0.5);

      const pubSkirmish = firebaseSvc.buildSkirmishPublicSnapshot({
        round: 2,
        activeIndex: 1,
        combatants: [
          { id: "c1", pcId: "pc1", type: "pc", name: "Akira", initiative: 24, armorTN: 22, wounds: 0, earth: 3, stance: "attaque", statuses: [], notes: "Secret MJ" },
          { id: "f1", pcId: null, type: "enemy", name: "Guerrier Tsuno", initiative: 19, armorTN: 30, wounds: 35, earth: 3, stance: "assaut", statuses: ["prone"], notes: "Invulnérable sauf Jade" }
        ]
      });
      assertEqual(pubSkirmish.round, 2);
      assertEqual(pubSkirmish.active, true);
      assertEqual(pubSkirmish.combatants[1].woundLabel, "Gravement blessé");
      assertEqual(pubSkirmish.combatants[1].wounds, undefined, "PV exacts ennemis masqués dans la vue publique");
      assertEqual(pubSkirmish.combatants[1].notes, undefined, "Notes MJ masquées dans la vue publique");
      assertEqual(pubSkirmish.combatants[1].armorTN, undefined, "ND ennemi masqué dans la vue publique");

      const existingGmPcs = [
        { id: "pc_local_1", name: "Tsuruchi Akira", lastInit: 27, includedInSkirmish: true, gmNotes: "Note secrète MJ" }
      ];
      const rosterMap = {
        samurai_akira: {
          id: "samurai_akira",
          ownerUid: "uid_akira",
          ownerName: "Player1",
          name: "Tsuruchi Akira",
          clan: "mante",
          traits: { stamina: 3, willpower: 3, strength: 2, perception: 3, reflexes: 4, awareness: 3, agility: 3, intelligence: 2 },
          voidRing: 3,
          liveState: { wounds: 11, voidCurrent: 2, honor: 4.8, glory: 2.0, status: 1.5, taint: 0 }
        }
      };
      const mergedPcs = firebaseSvc.mergeCloudRosterIntoGmPcs(existingGmPcs, rosterMap, gm.normalizeImportedCharacter);
      assertEqual(mergedPcs.length, 1, "Fusion par nom sans doublon");
      assertEqual(mergedPcs[0].id, "pc_local_1", "Conserve l'ID local pour les combats en cours");
      assertEqual(mergedPcs[0].lastInit, 27, "Conserve l'initiative locale");
      assertEqual(mergedPcs[0].gmNotes, "Note secrète MJ", "Conserve les notes secrètes MJ");
      assertEqual(mergedPcs[0].wounds, 11, "Applique les blessures live du Cloud");
      assertEqual(mergedPcs[0].voidCurrent, 2, "Applique le Vide courant live du Cloud");
      assertEqual(mergedPcs[0].isCloudSynced, true);
      assertEqual(mergedPcs[0].cloudRosterId, "samurai_akira");
    });
  });

  // ===========================================================================
  // RAPPORT D'EXÉCUTION (NODE.JS & NAVIGATEUR)
  // ===========================================================================
  const totalPassed = suites.reduce((acc, s) => acc + s.passed, 0);
  const totalFailed = suites.reduce((acc, s) => acc + s.failed, 0);
  const summary = { suites, totalPassed, totalFailed, totalTests: totalPassed + totalFailed };

  if (typeof window !== "undefined") {
    window.UNIT_TESTS_SUMMARY = summary;
  }

  if (isNode) {
    console.log("=============================================================");
    console.log(" 🧪 TESTS UNITAIRES — LES CHRONIQUES DE ROKUGAN (L5R 4e)");
    console.log("=============================================================");
    suites.forEach(s => {
      console.log(`\n▶ ${s.name} (${s.passed}/${s.tests.length})`);
      s.tests.forEach(t => {
        if (t.passed) {
          console.log(`  ✅ ${t.name}`);
        } else {
          console.error(`  ❌ ${t.name}\n     ↳ ${t.error}`);
        }
      });
    });
    console.log("\n-------------------------------------------------------------");
    console.log(`Total : ${totalPassed}/${summary.totalTests} réussis (${totalFailed} échec(s))`);
    console.log("=============================================================");
    if (totalFailed > 0) process.exit(1);
  }
})();
