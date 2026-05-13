const services = {
  "swedish-relaxation": {
    title: "Massage suédois ou relaxation",
    shortDescription:
      "Massage de relaxation classique avec des mouvements fluides pour détendre les tensions et favoriser le calme.",
    fullDescription:
      "Une séance de relaxation du corps entier utilisant des techniques suédoises pour apaiser les muscles, améliorer la circulation et vous aider à vous détendre dans un cadre paisible.",
    recommendedFor: ["Réduction du stress", "Tension générale", "Première séance de massage"],
    benefits: ["Pression douce à modérée", "Relaxation du corps entier", "Meilleur bien-être ressenti"],
    cta: "Réserver suédois / relaxation",
  },
  "hot-stone-therapy": {
    title: "Massage aux pierres chaudes",
    listingDescription:
      "Effets : détend les muscles, réduit les tensions, améliore la circulation sanguine, favorise une relaxation profonde",
    shortDescription:
      "Pierres chauffées combinées au massage pour une relaxation profonde et une chaleur enveloppante.",
    fullDescription:
      "Des pierres lisses chauffées sont placées et glissées sur le corps pour détendre les muscles, soulager les tensions et soutenir la circulation tout en vivant une relaxation profonde et réconfortante.",
    recommendedFor: ["Relaxation profonde", "Tension musculaire", "Tension liée au froid ou au stress"],
    benefits: ["Chaleur apaisante", "Tension musculaire réduite", "Expérience calme et réparatrice"],
    cta: "Réserver pierres chaudes",
  },
  "foot-reflexology": {
    title: "Massage des pieds et réflexologie",
    listingDescription:
      "La réflexologie plantaire applique une pression douce sur des points précis des pieds pour favoriser la relaxation et le bien-être global.",
    shortDescription:
      "Travail ciblé des pieds et pressions de type réflexologie pour une relaxation dès le sol.",
    fullDescription:
      "Cette séance se concentre sur les pieds avec des principes de massage et de réflexologie — une pression stable et attentive sur des zones précises pour encourager la relaxation et un meilleur équilibre.",
    recommendedFor: ["Pieds fatigués", "Travail de bureau", "Créneaux courts"],
    benefits: ["Attention pieds et bas des jambes", "Expérience relaxante et ancrante"],
    cta: "Réserver pieds et réflexologie",
  },
  "chair-massage": {
    title: "Massage sur chaise",
    shortDescription:
      "Massage assis pratique ciblé sur le dos, le cou, les épaules et les bras.",
    fullDescription:
      "Réalisé assis et habillé, le massage sur chaise est idéal pour un soulagement rapide des tensions du haut du corps — parfait pour des soins ciblés en visite courte.",
    recommendedFor: ["Tension cou et épaules", "Agendas chargés", "Soulagement rapide"],
    benefits: ["Sans déshabillage", "Focus haut du corps efficace", "Facile à intégrer à la journée"],
    cta: "Réserver massage sur chaise",
  },
  "wood-therapy-full-body": {
    title: "Maderothérapie (anti-cellulite) corps entier",
    shortDescription:
      "Outils en bois profilés utilisés sur tout le corps pour soutenir le tonus, la circulation et les objectifs de remodelage.",
    fullDescription:
      "Une séance corps entier avec des instruments en bois spécialisés et des mouvements rythmés visant à soutenir la lymphe, la texture de la peau et le contouring dans votre routine bien-être.",
    recommendedFor: ["Soutien au contouring", "Fermeté et circulation", "Séances corps entier"],
    benefits: ["Technique structurée et rythmée", "Couverture corps entier", "Axé sur le soin anti-cellulite"],
    cta: "Réserver maderothérapie — corps entier",
  },
  "wood-therapy-half-body": {
    title: "Maderothérapie (anti-cellulite) demi-corps (jambes, abdomen, fessiers ou dos)",
    shortDescription:
      "Maderothérapie ciblée au choix : jambes, abdomen, fessiers ou dos.",
    fullDescription:
      "Une séance ciblée de 30 minutes pour une zone demi-corps — jambes, abdomen, fessiers ou dos — avec des outils en bois pour soutenir la circulation et le contouring là où vous le souhaitez le plus.",
    recommendedFor: ["Zones ciblées", "Séances courtes", "Objectifs de contouring précis"],
    benefits: ["Zone au choix", "Durée efficace", "Complète le soin corps entier"],
    cta: "Réserver maderothérapie — demi-corps",
  },
  "professional-facial-massage": {
    title: "Massage facial professionnel",
    shortDescription:
      "Techniques douces pour le visage et la mâchoire afin de relâcher les tensions et rafraîchir.",
    fullDescription:
      "Un massage facial dédié avec des mouvements légers et précis pour soulager les tensions de la mâchoire et du visage, soutenir la circulation et vous laisser détendu et rafraîchi.",
    recommendedFor: ["Tension de la mâchoire", "Tension liée à l'ATM", "Stress du visage"],
    benefits: ["Travail facial ciblé", "Relaxant et non invasif", "Séance courte et efficace"],
    cta: "Réserver massage facial",
  },
  "deep-tissue": {
    title: "Tissus profonds",
    shortDescription:
      "Pression ferme et ciblée pour les tensions chroniques et les couches musculaires profondes.",
    fullDescription:
      "Un travail thérapeutique des tissus profonds cible les nœuds persistants et les zones restreintes avec une pression lente et délibérée pour aider à relâcher les tensions profondes et améliorer le confort au mouvement.",
    recommendedFor: ["Tension chronique", "Clients actifs et sportifs", "Muscles denses"],
    benefits: ["Pression plus profonde si approprié", "Zones problématiques ciblées", "Intention thérapeutique"],
    cta: "Réserver tissus profonds",
  },
  "sport-massage": {
    title: "Massage sportif",
    shortDescription:
      "Séance orientée sportifs et clients actifs — mobilité, récupération et soutien à la performance.",
    fullDescription:
      "Le massage orienté sport combine des techniques pour préparer ou récupérer après l'effort, traiter les groupes musculaires sollicités et soutenir souplesse et confort pour continuer à faire ce que vous aimez.",
    recommendedFor: ["Cycles d'entraînement", "Avant ou après l'effort", "Entretien musculaire"],
    benefits: ["Approche liée à l'activité", "Attention musculaire ciblée", "Soutient la récupération"],
    cta: "Réserver massage sportif",
  },
  "ninety-minute-massage": {
    title: "Massage 90 minutes",
    shortDescription:
      "Séance prolongée corps entier pour une relaxation complète ou un travail thérapeutique détaillé.",
    fullDescription:
      "Quatre-vingt-dix minutes permettent un massage complet — que vous souhaitiez un travail plus profond sur plusieurs zones ou une relaxation plus lente et immersive de la tête aux pieds.",
    recommendedFor: ["Soulagement corps entier", "Plusieurs zones ciblées", "Détente profonde"],
    benefits: ["Plus de temps pour le détail", "Rythme flexible", "Idéal pour prendre soin de soi"],
    cta: "Réserver massage 90 minutes",
  },
} as const;

export default services;
