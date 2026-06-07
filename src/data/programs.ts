export const CATEGORIES = {
  INTRODUCTORY: "Introductory",
  PROFESSIONAL_DIPLOMA: "Professional Diploma",
  CONTINUING_EDUCATION: "Continuing Education",
} as const;

export type ProgramCategory = (typeof CATEGORIES)[keyof typeof CATEGORIES];

export type Program = {
  id: number;
  slug: string;
  name: string;
  category: ProgramCategory;
  hours: { total: number; theory: number; practical: number };
  pricing: { individual: number; semiIndividual: number; group: number };
  prerequisites: string;
  description: string;
  highlights: string[];
  tag: string;
  instructor: string;
};

export const programs = [
  {
    id: 1,
    slug: "intro-massage-therapy",
    name: "Introduction to Massage Therapy",
    category: CATEGORIES.INTRODUCTORY,
    hours: { total: 20, theory: 10, practical: 10 },
    pricing: { individual: 600, semiIndividual: 450, group: 300 },
    prerequisites: "None — open to all",
    description:
      "A foundational overview of massage therapy covering anatomy basics, safe touch principles, and hands-on technique. Ideal for those exploring the field before committing to a full program.",
    highlights: [
      "Body mechanics and safe practice from day one",
      "Introduction to anatomy relevant to massage",
      "Basic Swedish strokes in a supervised setting",
      "Professional and ethical expectations in clinic",
    ],
    tag: "Intro",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 2,
    slug: "professional-diploma",
    name: "Professional Massage Therapy Diploma",
    category: CATEGORIES.PROFESSIONAL_DIPLOMA,
    hours: { total: 400, theory: 160, practical: 240 },
    pricing: { individual: 12000, semiIndividual: 7500, group: 5000 },
    prerequisites: "Introduction to Massage Therapy or equivalent background",
    description:
      "A comprehensive diploma program covering the full scope of therapeutic massage practice. Graduates are prepared for client-facing clinical work with skills in assessment, treatment planning, and professional documentation.",
    highlights: [
      "Full anatomy, physiology, and pathology curriculum",
      "Supervised clinic hours with real client interactions",
      "Professional ethics, boundaries, and documentation",
      "Assessment and individualized treatment planning",
    ],
    tag: "Diploma",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 3,
    slug: "deep-tissue-techniques",
    name: "Deep Tissue Massage Techniques",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 24, theory: 8, practical: 16 },
    pricing: { individual: 900, semiIndividual: 650, group: 420 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "Focused instruction on deeper pressure techniques for chronic muscle tension, postural issues, and myofascial restrictions. Balances therapeutic intent with client safety and communication.",
    highlights: [
      "Slow, intentional strokes that reach deeper muscle layers",
      "Identifying and releasing chronic holding patterns",
      "Pressure calibration and ongoing client communication",
      "Contraindication screening for deep-pressure work",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 4,
    slug: "advanced-swedish-massage",
    name: "Advanced Swedish Massage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 20, theory: 6, practical: 14 },
    pricing: { individual: 750, semiIndividual: 550, group: 360 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "Refine and deepen your Swedish technique with advanced sequencing, client-centered pacing, and improved pressure modulation for a more therapeutic relaxation experience.",
    highlights: [
      "Advanced effleurage and petrissage sequencing",
      "Pacing strategies for nervous system regulation",
      "Full-body integration flows for smoother sessions",
      "Real-time client feedback integration",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 5,
    slug: "sports-massage-recovery",
    name: "Sports Massage & Athletic Recovery",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 30, theory: 10, practical: 20 },
    pricing: { individual: 1100, semiIndividual: 800, group: 500 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "Techniques for pre-event preparation, acute event support, and post-event recovery. Covers athletic anatomy, common sports injuries, and protocols for working with active clients.",
    highlights: [
      "Pre- and post-event massage protocols",
      "Common musculoskeletal injuries in sport",
      "Compression, tapotement, and facilitated stretching",
      "Adapting sessions to different athletic demands",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 6,
    slug: "prenatal-postnatal-massage",
    name: "Prenatal & Postnatal Massage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 24, theory: 10, practical: 14 },
    pricing: { individual: 900, semiIndividual: 680, group: 420 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "Safe and effective massage for clients during and after pregnancy. Covers trimester-specific positioning, contraindications, and therapeutic goals for prenatal and postnatal recovery.",
    highlights: [
      "Trimester-by-trimester adaptations and positioning",
      "Safe bolstering, draping, and prop protocols",
      "Postpartum recovery priorities and techniques",
      "Red flags and medical contraindications",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 7,
    slug: "myofascial-release",
    name: "Myofascial Release Therapy",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 30, theory: 12, practical: 18 },
    pricing: { individual: 1100, semiIndividual: 800, group: 500 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "An introduction to fascial anatomy and sustained myofascial release techniques. Particularly effective for clients with chronic pain, restricted movement, or postural tension.",
    highlights: [
      "Fascial anatomy and the tensegrity model",
      "Sustained, barrier-melting release techniques",
      "Full-body fascial assessment approach",
      "Integration with Swedish and deep tissue sessions",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 8,
    slug: "trigger-point-therapy",
    name: "Trigger Point Therapy",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 24, theory: 8, practical: 16 },
    pricing: { individual: 900, semiIndividual: 650, group: 420 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "Identify and release active and latent trigger points that contribute to local and referred pain. Combines palpation skill-building with targeted compression and release protocols.",
    highlights: [
      "Trigger point identification and referral maps",
      "Ischemic compression and muscle energy techniques",
      "Common trigger point patterns: neck, shoulder, back",
      "Client communication during active release work",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 9,
    slug: "lymphatic-drainage",
    name: "Manual Lymphatic Drainage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 30, theory: 12, practical: 18 },
    pricing: { individual: 1100, semiIndividual: 800, group: 500 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "Light, rhythmic techniques that stimulate the lymphatic system to reduce swelling, support immune function, and accelerate recovery. Widely used in post-surgical and oncology support care.",
    highlights: [
      "Lymphatic anatomy and node drainage pathways",
      "Stationary circles, pump, and scoop techniques",
      "Protocols for edema, post-surgical, and wellness care",
      "Contraindications and MLD scope of practice",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 10,
    slug: "hot-stone-therapy",
    name: "Hot Stone Therapy",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 20, theory: 6, practical: 14 },
    pricing: { individual: 750, semiIndividual: 550, group: 360 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "Use heated basalt stones to extend the therapeutic reach of a massage session. Covers stone selection, heating protocols, safe temperature management, and integration with manual techniques.",
    highlights: [
      "Stone selection, temperature safety, and hygiene",
      "Placement sequences for relaxation and deep heat",
      "Combining stone work with Swedish strokes",
      "Client screening and contraindications for heat therapy",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 11,
    slug: "craniosacral-fundamentals",
    name: "Craniosacral Therapy Fundamentals",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 30, theory: 14, practical: 16 },
    pricing: { individual: 1100, semiIndividual: 800, group: 500 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "An introduction to the craniosacral rhythm and gentle techniques that address restrictions in the meninges and associated structures. Effective for headaches, TMJ, and nervous system tension.",
    highlights: [
      "Craniosacral rhythm palpation and assessment",
      "Diaphragm releases and dural tube techniques",
      "Still point induction for deep nervous system rest",
      "Clinical scope and safe client selection",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 12,
    slug: "aromatherapy-massage",
    name: "Aromatherapy & Massage Integration",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 24, theory: 10, practical: 14 },
    pricing: { individual: 900, semiIndividual: 680, group: 420 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "Understand how essential oils support therapeutic massage outcomes. Covers safe dilution, blending for client goals such as relaxation, pain relief, and mood support, plus skin and allergy considerations.",
    highlights: [
      "Essential oil chemistry and safety in a clinical context",
      "Carrier oils, dilution ratios, and blending guidelines",
      "Client intake screening for allergies and sensitivities",
      "Oils matched to therapeutic goals: calm, pain, fatigue",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
  {
    id: 13,
    slug: "chair-corporate-massage",
    name: "Chair & Corporate Massage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: { total: 20, theory: 6, practical: 14 },
    pricing: { individual: 750, semiIndividual: 550, group: 360 },
    prerequisites: "Active RMT licence or diploma in massage therapy",
    description:
      "Seated massage techniques for the corporate, event, and community wellness environment. Efficient 10–20 minute protocols targeting the neck, shoulders, back, and arms with no oils or draping required.",
    highlights: [
      "Ergonomic chair setup and body mechanic principles",
      "Quick-session protocols for neck, shoulder, and upper back",
      "Client intake and consent in a non-clinical setting",
      "Portable setup, hygiene, and professional presentation",
    ],
    tag: "CE",
    instructor: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
  },
] satisfies Program[];

export const introductoryPrograms = programs.filter(
  (c) => c.category === CATEGORIES.INTRODUCTORY
);
export const diplomaPrograms = programs.filter(
  (c) => c.category === CATEGORIES.PROFESSIONAL_DIPLOMA
);
export const continuingEducationPrograms = programs.filter(
  (c) => c.category === CATEGORIES.CONTINUING_EDUCATION
);
