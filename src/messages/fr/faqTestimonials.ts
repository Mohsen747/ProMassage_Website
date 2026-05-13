const faqs = [
  {
    question: "Quel type de massage devrais-je choisir ?",
    answer:
      "Si vous avez des tensions musculaires précises ou une tension persistante, une séance thérapeutique ou en tissus profonds peut convenir. Si votre objectif principal est de vous détendre et réduire le stress, un massage de relaxation est un excellent choix. Si la tension est surtout dans le haut du corps, un soin tête, cou et épaules peut être adapté.",
  },
  {
    question: "Comment réserver ma séance ?",
    answer:
      "Les rendez-vous se réservent en ligne via JaneApp. Choisissez votre service, un horaire disponible et confirmez votre réservation.",
  },
  {
    question: "À quoi dois-je m'attendre pendant mon rendez-vous ?",
    answer:
      "Votre séance est conçue selon vos besoins et votre niveau de confort. L'objectif est d'offrir des soins professionnels dans un environnement calme en ciblant vos zones de tension, d'inconfort ou de récupération.",
  },
  {
    question: "Où se trouve ProMassage ?",
    answer:
      "ProMassage est situé à Kirkland, Québec, et accueille les clients recherchant une massothérapie thérapeutique professionnelle dans les environs.",
  },
  {
    question: "Le massage sert-il seulement à se détendre ?",
    answer:
      "Non. Bien que le massage puisse être très relaxant, il peut aussi aider à traiter les tensions musculaires, soutenir la récupération et améliorer le confort physique global.",
  },
  {
    question: "Puis-je réserver en ligne ?",
    answer:
      "Oui. La réservation en ligne est disponible via JaneApp pour une prise de rendez-vous simple et pratique.",
  },
] as const;

const testimonials = [
  {
    name: "Avis client",
    quote:
      "J'arrivais avec beaucoup de tension au cou et aux épaules et j'ai senti une vraie différence après ma séance. Professionnel, à l'écoute et très efficace.",
  },
  {
    name: "Avis client",
    quote:
      "Le soin était ciblé, apaisant et exactement ce dont j'avais besoin. Je suis reparti plus léger et beaucoup moins crispé dans le dos.",
  },
  {
    name: "Avis client",
    quote:
      "Une expérience très professionnelle du début à la fin. La séance était personnalisée et a aidé à relâcher la tension que je portais depuis des semaines.",
  },
] as const;

const faqTestimonialsMessages = { faqs, testimonials };
export default faqTestimonialsMessages;
