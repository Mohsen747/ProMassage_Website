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

const INSTRUCTOR = "Maryam Roostaei, RMT · M.Sc. Exercise Physiology";

/** 40% theory / 60% practical — group price is the public rate. */
function splitHours(total: number) {
  const theory = Math.round(total * 0.4);
  return { total, theory, practical: total - theory };
}

function tierPricing(group: number) {
  return {
    group,
    semiIndividual: Math.round(group * 1.5),
    individual: Math.round(group * 2),
  };
}

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
    instructor: INSTRUCTOR,
  },
  {
    id: 2,
    slug: "swedish-massage-therapy-diploma",
    name: "Swedish Massage Therapy Diploma",
    category: CATEGORIES.PROFESSIONAL_DIPLOMA,
    hours: splitHours(400),
    pricing: tierPricing(3999),
    prerequisites: "Introduction to Massage Therapy or Swedish Massage Therapy",
    description:
      "A comprehensive 400-hour diploma covering Swedish massage from foundations through professional clinic practice. Graduates are prepared for structured, client-facing therapeutic work.",
    highlights: [
      "Full anatomy, physiology, and assessment curriculum",
      "Supervised practical hours with real client interactions",
      "Professional ethics, documentation, and clinic flow",
      "Swedish technique mastery from basics to advanced sequencing",
    ],
    tag: "Diploma",
    instructor: INSTRUCTOR,
  },
  {
    id: 3,
    slug: "swedish-massage-therapy",
    name: "Swedish Massage Therapy",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(50),
    pricing: tierPricing(500),
    prerequisites: "Introduction to Massage Therapy or equivalent background",
    description:
      "A 50-hour program in Swedish massage covering safe touch, body mechanics, and core relaxation strokes. Ideal for beginners building toward the diploma or therapists refreshing foundational skills.",
    highlights: [
      "Effleurage, petrissage, and basic full-body flow",
      "Body mechanics and draping in a supervised setting",
      "Client communication and professional boundaries",
      "Gateway to advanced programs and the diploma path",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 4,
    slug: "deep-tissue-massage-therapy",
    name: "Deep Tissue Massage Therapy",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(45),
    pricing: tierPricing(450),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Focused instruction on deeper pressure techniques for chronic tension, postural issues, and myofascial restrictions — with emphasis on safety and client communication.",
    highlights: [
      "Slow, intentional strokes for deeper muscle layers",
      "Identifying and releasing chronic holding patterns",
      "Pressure calibration throughout the session",
      "Contraindication screening for deep-pressure work",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 5,
    slug: "yumeiho-massage",
    name: "Yumeiho Massage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(100),
    pricing: tierPricing(1500),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "A 100-hour program in Yumeiho — a Japanese therapeutic approach combining massage, joint mobilization, and postural correction for whole-body balance.",
    highlights: [
      "Foundations of Yumeiho theory and assessment",
      "Joint mobilization integrated with manual techniques",
      "Postural analysis and corrective sequencing",
      "Full-body protocols for structural balance",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 6,
    slug: "thai-massage",
    name: "Thai Massage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(50),
    pricing: tierPricing(650),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Learn traditional Thai massage techniques combining acupressure, assisted stretching, and rhythmic compression performed on a mat or table.",
    highlights: [
      "Sen line theory and acupressure points",
      "Assisted stretching and joint mobilization",
      "Rhythmic compression and palm-pressure techniques",
      "Client positioning and therapist body mechanics",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 7,
    slug: "sports-massage",
    name: "Sports Massage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(30),
    pricing: tierPricing(300),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Techniques for pre-event preparation, in-event support, and post-event recovery. Covers athletic anatomy and protocols for active clients.",
    highlights: [
      "Pre- and post-event massage protocols",
      "Common sports-related muscle tension patterns",
      "Compression, tapotement, and facilitated stretching",
      "Adapting sessions to different athletic demands",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 8,
    slug: "shiatsu-massage",
    name: "Shiatsu Massage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(30),
    pricing: tierPricing(300),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Introduction to Shiatsu — finger-pressure techniques along meridian pathways to support relaxation, energy balance, and musculoskeletal ease.",
    highlights: [
      "Meridian pathways and key pressure points",
      "Thumb, palm, and elbow pressure techniques",
      "Rhythmic sequencing for full-body sessions",
      "Integrating Eastern principles with Western practice",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 9,
    slug: "trigger-point-therapy",
    name: "Trigger Point Therapy",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(25),
    pricing: tierPricing(250),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Identify and release active and latent trigger points that contribute to local and referred pain. Combines palpation skill-building with targeted release protocols.",
    highlights: [
      "Trigger point identification and referral maps",
      "Ischemic compression and release techniques",
      "Common patterns in neck, shoulder, and back",
      "Client communication during active release work",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 10,
    slug: "chair-massage",
    name: "Chair Massage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(25),
    pricing: tierPricing(320),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Seated massage techniques for corporate, event, and community wellness settings. Efficient protocols for neck, shoulders, back, and arms without oils or draping.",
    highlights: [
      "Ergonomic chair setup and body mechanics",
      "Quick-session protocols for upper body",
      "Client intake and consent in non-clinical settings",
      "Portable setup, hygiene, and professional presentation",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 11,
    slug: "reflexology-foot-massage",
    name: "Reflexology (Foot Massage)",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(25),
    pricing: tierPricing(400),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Foot reflexology techniques mapping reflex zones on the feet to support relaxation and whole-body wellness through targeted pressure work.",
    highlights: [
      "Reflex zone maps and point location",
      "Thumb-walking and pressure techniques",
      "Session structure for relaxation and therapeutic goals",
      "Contraindications and client screening for foot work",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 12,
    slug: "aromatherapy-massage",
    name: "Aromatherapy Massage",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(25),
    pricing: tierPricing(200),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Integrate essential oils into massage sessions. Covers safe dilution, blending for client goals, and allergy considerations.",
    highlights: [
      "Essential oil safety and dilution ratios",
      "Blending oils for relaxation, pain relief, and mood support",
      "Client intake screening for allergies and sensitivities",
      "Incorporating aromatherapy into Swedish-based sessions",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 13,
    slug: "facial-massage-therapy",
    name: "Facial Massage Therapy",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(25),
    pricing: tierPricing(200),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Facial massage techniques for relaxation, lymphatic drainage, and tension release in the face, neck, and scalp.",
    highlights: [
      "Facial anatomy and contraindications",
      "Lymphatic and effleurage strokes for the face and neck",
      "Scalp and jaw tension release techniques",
      "Product selection and skin sensitivity screening",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 14,
    slug: "cupping-therapy",
    name: "Cupping Therapy",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(25),
    pricing: tierPricing(200),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Introduction to cupping techniques using suction to release fascial restrictions, improve circulation, and complement manual massage.",
    highlights: [
      "Static and sliding cupping methods",
      "Safety, hygiene, and contraindication screening",
      "Integrating cupping with massage sessions",
      "Marking, aftercare, and client education",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
  {
    id: 15,
    slug: "hot-stone-massage-therapy",
    name: "Hot Stone Massage Therapy",
    category: CATEGORIES.CONTINUING_EDUCATION,
    hours: splitHours(25),
    pricing: tierPricing(200),
    prerequisites: "Swedish Massage Therapy or equivalent training",
    description:
      "Use heated basalt stones to extend the therapeutic reach of a massage session. Covers stone selection, heating protocols, and safe integration with manual techniques.",
    highlights: [
      "Stone selection, temperature safety, and hygiene",
      "Placement sequences for relaxation and deep heat",
      "Combining stone work with Swedish strokes",
      "Client screening and contraindications for heat therapy",
    ],
    tag: "Certificate",
    instructor: INSTRUCTOR,
  },
] satisfies Program[];

export function getProgramStats() {
  const hourTotals = programs.map((program) => program.hours.total);
  return {
    count: programs.length,
    minHours: Math.min(...hourTotals),
    maxHours: Math.max(...hourTotals),
  };
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

export function getAllProgramSlugs(): string[] {
  return programs.map((program) => program.slug);
}

export const introductoryPrograms = programs.filter(
  (c) => c.category === CATEGORIES.INTRODUCTORY
);
export const diplomaPrograms = programs.filter(
  (c) => c.category === CATEGORIES.PROFESSIONAL_DIPLOMA
);
export const continuingEducationPrograms = programs.filter(
  (c) => c.category === CATEGORIES.CONTINUING_EDUCATION
);
