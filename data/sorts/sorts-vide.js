const SORTS_VIDE = [
  {
    id: "void-1-drawing-void",
    name: "Puiser dans le Vide (Drawing the Void)",
    element: "Vide",
    mastery: 1,
    keywords: ["Énergie", "Ishiken"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Instantanée",
    raises: "+1 point de Vide supplémentaire par 3 Raises",
    desc: "L'Ishiken puise directement dans le tissu cosmique primordial de l'univers : il regagne immédiatement un nombre de points de Vide temporaires égal à (Son Rang d'École + 1)."
  },
  {
    id: "void-1-flow-void",
    name: "Transmutation du Vide (Flow through the Void)",
    element: "Vide",
    mastery: 1,
    keywords: ["Altération"],
    range: "Contact",
    area: "0,03 m³ de matière élémentaire pure",
    duration: "Permanente",
    raises: "Volume doublé par Raise",
    desc: "Toutes choses étant une dans le Vide, le shugenja transmute instantanément un volume de matière pure (de l'eau, de la pierre, du feu ou de l'air) en n'importe quel autre élément de son choix."
  },
  {
    id: "void-1-sense-void",
    name: "Percevoir le Vide (Sense Void)",
    element: "Vide",
    mastery: 1,
    keywords: ["Divination"],
    range: "Personnelle",
    area: "Rayon de 30 mètres",
    duration: "Instantanée",
    raises: "Portée (+15 m)",
    desc: "Révèle les flux de destinée : détecte immédiatement le nombre de points de Vide actuels de toutes les créatures présentes dans le rayon, ainsi que l'usage récent de points de Vide ou de Kihō."
  },
  {
    id: "void-2-reach-void",
    name: "Toucher par le Vide (Reach Through the Void)",
    element: "Vide",
    mastery: 2,
    keywords: ["Télékinésie"],
    range: "15 mètres",
    area: "Objet pesant jusqu'à 2,5 kg",
    duration: "Instantanée",
    raises: "Poids accru (+1 kg par 2 Raises), Portée (+5 m)",
    desc: "Manipule, déplace ou subtilise un objet à distance sans aucun contact physique, en utilisant le flux d'énergie pure qui relie imperceptiblement toute matière."
  },
  {
    id: "void-2-false-whispers",
    name: "Faux Murmures (False Whispers)",
    element: "Vide",
    mastery: 2,
    keywords: ["Illusion", "Mental"],
    range: "9 mètres",
    area: "Un individu",
    duration: "1 Minute",
    raises: "Durée (+1 min par Raise)",
    desc: "Insère des pensées trompeuses dans l'esprit d'un adversaire, lui faisant croire que ses alliés complotent contre lui ou préparent une trahison imminente (jet opposé de Volonté pour résister)."
  },
  {
    id: "void-2-unmake-mind",
    name: "Défaire l'Esprit (Unmake the Mind)",
    element: "Vide",
    mastery: 2,
    keywords: ["Mental"],
    range: "6 mètres",
    area: "Une cible",
    duration: "3 Rounds",
    raises: "Durée (+1 round)",
    desc: "Perturbe la cohésion psychique : la victime ne peut plus dépenser de points de Vide pour augmenter ses jets ou activer ses techniques de clan tant que le sort est actif."
  },
  {
    id: "void-3-boundless-sight",
    name: "Vue Sans Frontières (Boundless Sight)",
    element: "Vide",
    mastery: 3,
    keywords: ["Divination"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "10 Minutes",
    raises: "Durée (+5 min)",
    desc: "Ouvre le troisième œil de l'Ishiken : permet de voir à travers les murs solides, de percevoir l'invisible et de déceler les créatures éthérées évoluant dans les Royaumes Spirituels adjacents."
  },
  {
    id: "void-3-sever-flow",
    name: "Trancher le Flux (Severing the Flow)",
    element: "Vide",
    mastery: 3,
    keywords: ["Anti-Magie"],
    range: "15 mètres",
    area: "Un shugenja ou lanceur de sorts",
    duration: "Instantanée",
    raises: "+1 emplacement de sort bloqué par 2 Raises",
    desc: "Interrompt brutalement le lien d'un prêtre rival avec les éléments : détruit immédiatement un emplacement de sort du plus haut niveau préparé par la cible pour la journée."
  },
  {
    id: "void-3-touch-void",
    name: "Le Toucher du Vide (Touch of the Void)",
    element: "Vide",
    mastery: 3,
    keywords: ["Attaque"],
    range: "Contact",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Dégâts (+1g1 par 2 Raises)",
    desc: "Frappe directement l'essence vitale de l'ennemi. Inflige des dégâts avec un VD égal à (Anneau de Vide du lanceur + 1)g(Anneau de Vide). Les armures physiques n'offrent aucune Réduction face à cette frappe."
  },
  {
    id: "void-4-tether-void",
    name: "Le Lien du Vide (Tether to the Void)",
    element: "Vide",
    mastery: 4,
    keywords: ["Téléportation"],
    range: "Personnelle",
    area: "Le lanceur et son équipement",
    duration: "Instantanée",
    raises: "Passager allié consentant (+1 par 2 Raises)",
    desc: "Le shugenja dissout brièvement sa présence physique dans le néant cosmique pour réapparaître instantanément à n'importe quel endroit visible dans un rayon de 30 mètres."
  },
  {
    id: "void-4-rend-soul",
    name: "Déchirer l'Âme (Rend the Soul)",
    element: "Vide",
    mastery: 4,
    keywords: ["Attaque", "Destruction"],
    range: "15 mètres",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Dégâts accrus (+1g1)",
    desc: "Extrait une part du souffle karmique de la cible : lui inflige 5g5 blessures directes et lui arrache 2 points de Vide (qui sont immédiatement transférés au shugenja)."
  },
  {
    id: "void-4-void-ward",
    name: "Garde du Vide (Ward of the Void)",
    element: "Vide",
    mastery: 4,
    keywords: ["Sceau", "Défense"],
    range: "Personnelle",
    area: "Rayon de 6 mètres",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "Une zone de neutralité magique absolue : dans ce périmètre, le ND d'incantation de tous les sorts d'Air, de Terre, de Feu, d'Eau et de Mahō augmente de +15."
  },
  {
    id: "void-5-void-dragon-breath",
    name: "Le Souffle du Dragon du Vide (Void Dragon's Breath)",
    element: "Vide",
    mastery: 5,
    keywords: ["Attaque", "Zone"],
    range: "Personnelle",
    area: "Cône de 15 mètres",
    duration: "Instantanée",
    raises: "Dégâts (+1g1)",
    desc: "Projette une nébulosité de néant violet étincelant. Inflige 6g4 blessures directes à toutes les cibles dans le cône et force chaque créature à réussir un jet de Volonté ND 25 sous peine d'être Étourdie (Stunned) pendant 2 rounds."
  },
  {
    id: "void-5-purge-soul",
    name: "Purge de l'Âme (Purge the Soul)",
    element: "Vide",
    mastery: 5,
    keywords: ["Purification"],
    range: "Contact",
    area: "Une cible consentante",
    duration: "Permanente",
    raises: "Points de Souillure réduits accrus",
    desc: "Un rituel exténuant de 24 heures où le shugenja brûle son propre Vide pour cautériser la noirceur spirituelle : réduit de façon permanente 1 Rang complet de Souillure de la cible."
  },
  {
    id: "void-6-ring-void",
    name: "L'Anneau du Vide (Ring of the Void)",
    element: "Vide",
    mastery: 6,
    keywords: ["Divin", "Révélation"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Concentration (Rituel d'1 heure)",
    raises: "Temps réduit (-10 min par Raise)",
    desc: "Le rite suprême de l'Ishiken-dō : ouvre une communion directe avec le Dragon Céleste du Vide afin d'obtenir la réponse prophétique et incontestable à une énigme sur le destin de Rokugan."
  },
  {
    id: "void-6-rise-void",
    name: "Éveil du Vide (Rise, Void)",
    element: "Vide",
    mastery: 6,
    keywords: ["Invocation"],
    range: "9 mètres",
    area: "Un Kami majeur du Vide",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Matérialise une silhouette de néant pur aux yeux d'étoiles. L'entité possède tous ses Traits à la valeur de votre Anneau de Vide, frappe en ignorant toute armure physique et dissipe au toucher n'importe quel sort de rang 4 ou inférieur."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_VIDE = SORTS_VIDE;
}
