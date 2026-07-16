const enroll = {
  meta: {
    title: "Inscription | ProMassage Académie",
    description:
      "Démarrez votre inscription à ProMassage Clinique et Académie. Découvrez comment vous inscrire aux cours, consultez le hub Académie et complétez votre demande en ligne.",
  },
  hero: {
    title: "Inscrivez-vous à ProMassage Académie",
    intro:
      "Faites le pas suivant vers vos objectifs de formation. Consultez les programmes et horaires de l'académie, puis finalisez votre inscription via notre guichet en ligne sécurisé.",
  },
  points: [
    "Explorez les cours, l'horaire et les parcours de certification dans la section Académie.",
    "Lorsque vous êtes prêt, poursuivez vers notre guichet d'inscription en ligne pour vous inscrire ou réserver votre place.",
    "Des questions avant de vous inscrire ? Utilisez Contact et nous vous aiderons à choisir le bon parcours.",
  ],
  ctaOnline: "Continuer vers l'inscription en ligne",
  ctaAcademy: "Parcourir l'Académie",
  breadcrumb: "S'inscrire",
  stepsBrowseDescription:
    "Explorez les {count} programmes de l'introduction au diplôme.",
  steps: [
    {
      number: "1",
      title: "Parcourez nos programmes",
      description: "Explorez les programmes de l'introduction au diplôme.",
    },
    {
      number: "2",
      title: "Contactez-nous",
      description: "Discutez de vos objectifs et trouvez le bon programme.",
    },
    {
      number: "3",
      title: "Confirmez l'inscription",
      description: "Sécurisez votre place et préparez-vous pour l'orientation.",
    },
    {
      number: "4",
      title: "Commencez l'apprentissage",
      description: "Assistez à l'orientation et démarrez votre programme.",
    },
  ],
  contact: {
    heading: "Nous joindre",
    location: "30, rue Canvin, Kirkland (QC) H9H 4S4",
    consultation: "Réserver une consultation gratuite",
  },
  faq: {
    heading: "Questions fréquentes",
    items: [
      {
        question: "Quels sont les prérequis pour la plupart des cours ?",
        answer:
          "La plupart des cours de formation continue exigent des connaissances de base en massage suédois ou une expérience équivalente. Le cours d'introduction est ouvert à tous.",
      },
      {
        question: "Combien de temps dure un cours ?",
        answer:
          "Les cours vont de 20h à 400h selon le programme. La plupart des cours de formation continue se complètent en quelques fins de semaine.",
      },
      {
        question: "Y a-t-il du financement ou des plans de paiement disponibles ?",
        answer:
          "Contactez-nous pour discuter des options de paiement. Nous travaillons avec les étudiants pour trouver un plan adapté à leur situation.",
      },
      {
        question: "Recevrai-je un certificat à la fin ?",
        answer:
          "Oui. Tous les étudiants qui satisfont aux exigences du cours reçoivent un certificat officiel de ProMassage Académie.",
      },
    ],
  },
} as const;

const programs = {
  meta: {
    title: "Cours | ProMassage Académie",
    description:
      "Cours de massothérapie et de formation professionnelle à ProMassage Clinique et Académie à Kirkland — structure, axes et inscription.",
  },
  hero: {
    title: "Cours de l'Académie",
    intro:
      "ProMassage Académie propose une formation ciblée autour des techniques thérapeutiques, des soins au client et de la pratique professionnelle. Les programmes combinent apprentissage structuré et mise en pratique pour progresser en confiance.",
  },
  pillars: [
    {
      title: "Des bases solides",
      text: "Les cours fondamentaux couvrent l'anatomie, la pratique sécuritaire, les bases de l'évaluation et les principes de la massothérapie thérapeutique pour appuyer chaque sujet avancé.",
    },
    {
      title: "Application pratique",
      text: "Les laboratoires et séances supervisées traduisent la théorie en toucher : rythme, pression, drapage, communication et adaptation aux besoins réels des clients.",
    },
    {
      title: "Préparation professionnelle",
      text: "Éthique, limites, documentation et déroulement en clinique sont intégrés pour préparer des diplômés au travail structuré et respectueux avec les clients.",
    },
  ],
  note: "Les titres de cours détaillés, les dates de session, les heures et les prérequis seront publiés ici au fur et à mesure de la confirmation de chaque cohorte. En attendant, consultez Horaire pour le calendrier ou Inscription pour réserver votre place.",
  ctaEnroll: "S'inscrire maintenant",
  ctaSchedule: "Voir l'horaire",
  ctaContact: "Poser une question",
  stats: {
    totalLabel: "Programmes offerts",
    hoursLabel: "Plage d'heures",
    formatsLabel: "Options de format",
    hoursValue: "{min}–{max}h",
    formatsValue: "Individuel · Semi-individuel · Groupe",
  },
  sections: {
    introductory: "Introduction",
    professionalDiploma: "Diplôme professionnel",
    continuingEducation: "Formation continue",
  },
  card: {
    theoryLabel: "Théorie",
    practicalLabel: "Pratique",
    prerequisitesLabel: "Prérequis",
    highlightsLabel: "Points clés",
    showHighlights: "Afficher les points clés",
    hideHighlights: "Masquer les points clés",
    fromPrice: "À partir de",
    currency: "CAD",
    instructorLabel: "Instructeur",
    enrollButton: "S'inscrire",
  },
  cta: {
    heading: "Prêt à vous inscrire ?",
    body: "Contactez-nous pour discuter des horaires et des tarifs.",
    enrollButton: "S'inscrire maintenant",
    contactButton: "Poser une question",
  },
  header: {
    title: "Programmes",
    subtitle: "{count} programmes de l'introduction au diplôme professionnel",
  },
} as const;

const programDetail = {
  meta: {
    title: "{name} | ProMassage Académie",
  },
  backToPrograms: "Retour à tous les programmes",
  highlightsHeading: "Ce que vous apprendrez",
  schedule: {
    title: "Sessions à venir",
    note: "Dates, jours et heures à confirmer. Inscrivez-vous pour être avisé lorsque les sessions seront planifiées.",
    registerButton: "Me notifier",
    columns: {
      date: "Date",
      language: "Langue",
      days: "Jours",
      hours: "Heures",
      register: "Inscription",
    },
    rows: [
      {
        date: "—",
        language: "Anglais",
        days: "—",
        hours: "—",
      },
      {
        date: "—",
        language: "Anglais–français",
        days: "—",
        hours: "—",
      },
      {
        date: "—",
        language: "Français",
        days: "—",
        hours: "—",
      },
    ],
  },
  accordion: {
    heading: "Informations sur le programme",
    detailsPrerequisite: "Prérequis : {value}",
    detailsHours: "Heures de cours : {hours} h",
    sections: [
      { title: "Détails" },
      {
        title: "Coût",
        content:
          "Des tarifs groupe, semi-individuel et individuel sont disponibles. Le tarif groupe affiché est le point de départ — contactez-nous pour le détail selon votre format.",
      },
      {
        title: "Modes de paiement",
        content:
          "Nous acceptons le virement, la carte de crédit et des plans de paiement pour les programmes diplômants. Un dépôt peut être requis pour réserver votre place.",
      },
      {
        title: "Équipement",
        content:
          "Les étudiants doivent apporter des vêtements confortables pour la pratique. Les tables de massage et le matériel de clinique sont fournis sur place.",
      },
    ],
  },
  cta: {
    heading: "Prêt à vous inscrire à ce programme ?",
    body: "Contactez-nous pour confirmer votre date d'admission et finaliser l'inscription.",
    enrollButton: "S'inscrire maintenant",
    contactButton: "Poser une question",
  },
} as const;

const services = {
  meta: {
    title: "Services de massage | ProMassage Kirkland",
    description:
      "Découvrez les services de massothérapie thérapeutique chez ProMassage : tissus profonds, relaxation, soin ciblé du haut du corps et massage de récupération. Réservez en ligne.",
  },
  hero: {
    title: "Services de massage",
    intro:
      "Chaque service chez ProMassage vise le soulagement, la récupération et le confort grâce à des soins ciblés et professionnels. Choisissez le soin qui vous convient ou réservez la séance qui correspond à votre corps aujourd'hui.",
  },
  closingCta: {
    title: "Vous ne savez pas quel service choisir ?",
    text: "Choisissez la séance qui correspond le mieux à votre zone de tension ou à vos besoins de récupération. Si vous savez déjà que vous avez besoin de soulagement, réserver est la meilleure prochaine étape.",
    cta: "Réserver",
  },
} as const;

const about = {
  meta: {
    title: "À propos de ProMassage | Massothérapie thérapeutique professionnelle",
    description:
      "En savoir plus sur ProMassage, une pratique de massage professionnelle axée sur des soins personnalisés, le soulagement de la douleur, la récupération et une expérience client apaisante.",
  },
  hero: {
    title: "À propos de ProMassage",
    intro:
      "ProMassage a été créé pour offrir une massothérapie thérapeutique à la fois professionnelle et personnelle. L'objectif est simple : aider les clients à se sentir mieux grâce à des soins ciblés, un traitement réfléchi et un environnement calme où l'on peut avoir confiance dans le processus.",
  },
  sections: [
    {
      title: "Une séance doit être plus qu'une routine",
      text: "Chaque corps porte la tension différemment. C'est pourquoi ProMassage privilégie des séances personnalisées plutôt qu'une routine standard répétée pour chaque client. Que l'objectif soit le soulagement, la récupération ou la relaxation, les soins s'adaptent à ce dont votre corps a le plus besoin.",
    },
    {
      title: "Des soins professionnels avec une vraie attention à vos besoins",
      text: "L'approche ProMassage repose sur l'écoute, l'observation et l'intention. Certains clients ont besoin d'un travail thérapeutique ciblé dans le dos, le cou ou les épaules. D'autres ont besoin d'une séance apaisante pour réduire la tension globale. Dans tous les cas, l'expérience est respectueuse, professionnelle et efficace.",
    },
    {
      title: "Une expérience calme et accueillante",
      text: "Les clients doivent se sentir à l'aise dès leur arrivée. ProMassage offre un cadre propre, calme et professionnel pour que chaque séance commence en douceur et se termine avec un meilleur confort physique.",
    },
    {
      title: "Pourquoi les clients reviennent",
      bullets: [
        "Les séances semblent personnalisées, pas précipitées",
        "L'accent reste sur la tension et l'inconfort réels",
        "Une expérience professionnelle et constante",
        "La réservation est simple et pratique",
        "Les clients repartent en se sentant pris en charge et compris",
      ],
    },
  ],
  cta: {
    title: "Découvrez des soins thérapeutiques axés sur votre ressenti",
    cta: "Réserver votre séance",
  },
} as const;

const contact = {
  meta: {
    title: "Contact ProMassage | Réserver ou nous joindre",
    description:
      "Contactez ProMassage pour la massothérapie thérapeutique à Kirkland. Adresse, réservation et façons de nous écrire.",
  },
  hero: {
    title: "Contactez ProMassage",
    intro:
      "Une question avant de réserver, ou prêt à planifier votre séance ? ProMassage est là pour vous aider à passer à l'étape suivante vers le soulagement, la récupération et la relaxation.",
  },
  info: {
    title: "Nous joindre",
    location: "30, rue Canvin, Kirkland (QC) H9H 4S4",
  },
  formIntro:
    "Utilisez le formulaire ci-dessous pour une question avant réservation. Pour réserver le plus rapidement, utilisez le lien de réservation en ligne.",
  location: {
    title: "Visitez ProMassage",
    text: "Idéalement situé pour les clients de Kirkland et des environs, ProMassage offre un espace calme et professionnel pour la massothérapie thérapeutique et des soins personnalisés.",
  },
} as const;

const faqMeta = {
  title: "FAQ | ProMassage",
  description:
    "Questions fréquentes sur les services ProMassage, la réservation et ce à quoi vous attendre lors de votre séance de massothérapie thérapeutique.",
} as const;

const contactForm = {
  submittedTitle: "Message reçu",
  submittedBody: "Merci de nous avoir contactés. Nous vous répondrons sous peu.",
  nameLabel: "Nom complet",
  emailLabel: "Courriel",
  phoneLabel: "Téléphone",
  messageLabel: "Message",
  required: "Champ obligatoire",
  namePlaceholder: "Votre nom complet",
  emailPlaceholder: "vous@courriel.com",
  phonePlaceholder: "(514) 000-0000",
  messagePlaceholder: "Comment pouvons-nous vous aider ?",
  submit: "Envoyer le message",
} as const;

const pagesMessages = { enroll, programs, programDetail, services, about, contact, faqMeta, contactForm };
export default pagesMessages;
