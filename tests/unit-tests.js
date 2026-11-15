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
  const ec = isNode ? require("../js/export-carnet.js") : window;
  const gm = isNode ? require("../js/gm-screen.js") : window;

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

    it("calculateSkillXpCost gère les compétences d'école, spécialisations, Prodige et Esprit Obtus", function () {
      // Compétence hors école de 0 à 3 : 1 + 2 + 3 = 6 XP
      assertEqual(cg.calculateSkillXpCost(3, { isSchool: false }), 6);
      // Compétence d'école (Rang 1 gratuit) de 1 à 3 : 2 + 3 = 5 XP (+2 XP avec spé = 7 XP)
      assertEqual(cg.calculateSkillXpCost(3, { isSchool: true, spec: true }), 7);
      // Prodige sur compétence d'école de 1 à 3 : (2-1) + (3-1) = 1 + 2 = 3 XP
      assertEqual(cg.calculateSkillXpCost(3, { isSchool: true, isProdigy: true }), 3);
      // Esprit Obtus double les compétences Nobles/Hautes hors Enquête/Médecine
      assertEqual(cg.calculateSkillXpCost(2, { isSchool: false, isObtuse: true, isHighSkill: true, isExemptHigh: false }), 6); // (1+2)*2 = 6
      assertEqual(cg.calculateSkillXpCost(2, { isSchool: false, isObtuse: true, isHighSkill: true, isExemptHigh: true }), 3);  // exempté = 3
    });

    it("getEffectiveAdvCost et getEffectiveDisadvGain appliquent les réductions et bonus par Clan et École", function () {
      const crabBushiCtx = cg.buildCharacterContextFromInputs("crabe", "hida", "École de bushi Hida", "Bushi");
      assertEqual(cg.getEffectiveAdvCost({ name: "Grand (Large)", cost: 4 }, crabBushiCtx), 3);
      assertEqual(cg.getEffectiveAdvCost({ name: "Force de la Terre", cost: 3 }, crabBushiCtx), 2);
      assertEqual(cg.getEffectiveDisadvGain({ name: "Antisocial", gain: 2 }, crabBushiCtx), 3);
      assertEqual(cg.getEffectiveDisadvGain({ name: "Esprit Obtus", gain: 3 }, crabBushiCtx), 4);

      const phoenixShugenjaCtx = cg.buildCharacterContextFromInputs("phenix", "isawa", "École de shugenja Isawa", "Shugenja");
      assertEqual(cg.getEffectiveAdvCost({ name: "Ishiken-do", cost: 8 }, phoenixShugenjaCtx), 6);
      assertEqual(cg.getEffectiveAdvCost({ name: "Ami des Éléments", cost: 4 }, phoenixShugenjaCtx), 3);
    });

    it("calculateArmorTN et calculateWoundThresholds calculent le ND d'Armure et les paliers de blessures", function () {
      // Réflexes 3, Armure lourde (+10), Niten (+2) => 5 + 15 + 10 + 2 = 32
      assertEqual(cg.calculateArmorTN(3, 10, 2), 32);

      // Terre 3 => Indemne 15 PV, paliers 6 PV
      assertDeepEqual(cg.calculateWoundThresholds(3), { multiplier: 3, healthy: 15, step: 6 });

      // Guerrier de Fer Daidoji avec Honneur 4.5 et Terre 2 => utilise floor(4.5) = 4 (20 PV / 8 PV)
      assertDeepEqual(cg.calculateWoundThresholds(2, { isDaidoji: true, honorScore: 4.5 }), {
        multiplier: 4,
        healthy: 20,
        step: 8
      });
    });

    it("getMasteriesSummary retourne les maîtrises débloquées aux rangs 3, 5 et 7", function () {
      assertEqual(cg.getMasteriesSummary("Kenjutsu", 2), "");
      assertEqual(cg.getMasteriesSummary("Kenjutsu", 3), "[R3: Dégainé Éclair]");
      assertEqual(cg.getMasteriesSummary("Kenjutsu (Katana)", 5), "[R3: Dégainé Éclair] [R5: Tranchant Affûté]");
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
