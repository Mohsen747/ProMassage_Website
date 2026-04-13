export interface Service {
  slug: string;
  title: string;
  /** Grey subtext on listing cards (optional). */
  listingDescription?: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: string;
  recommendedFor: string[];
  benefits: string[];
  cta: string;
}

export const services: Service[] = [
  {
    slug: "swedish-relaxation",
    title: "Swedish Massage or Relaxation therapy",
    shortDescription:
      "Classic relaxation massage with flowing strokes to ease tension and promote calm.",
    fullDescription:
      "A full-body relaxation session using Swedish techniques to soothe muscles, improve circulation, and help you unwind in a peaceful setting.",
    duration: "60 minutes",
    price: "$110.00",
    recommendedFor: ["Stress relief", "General tension", "First-time massage clients"],
    benefits: ["Gentle to moderate pressure", "Full-body relaxation", "Improved sense of well-being"],
    cta: "Book Swedish / Relaxation",
  },
  {
    slug: "hot-stone-therapy",
    title: "Hot Stone Therapy",
    listingDescription:
      "Effects: relaxes muscles, reduces tension, improves blood circulation, provides deep relaxation",
    shortDescription:
      "Heated stones combined with massage for deep relaxation and warmth through the body.",
    fullDescription:
      "Smooth heated stones are placed and glided over the body to relax muscles, ease tension, and support circulation while you experience deep, comforting relaxation.",
    duration: "60 minutes",
    price: "$125.00",
    recommendedFor: ["Deep relaxation", "Muscle tightness", "Cold or stress-related tension"],
    benefits: ["Soothing heat", "Reduced muscle tension", "Calming, restorative experience"],
    cta: "Book Hot Stone Therapy",
  },
  {
    slug: "foot-reflexology",
    title: "Foot massage & Reflexology",
    listingDescription:
      "Foot Reflexology is a gentle massage technique applying pressure to specific points on the feet to promote relaxation and improve overall well-being.",
    shortDescription:
      "Focused foot work and reflexology-style pressure to support relaxation from the ground up.",
    fullDescription:
      "This session concentrates on the feet using massage and reflexology principles—steady, mindful pressure on specific areas to encourage relaxation and a greater sense of balance.",
    duration: "30 minutes",
    price: "$65.00",
    recommendedFor: ["Tired feet", "Desk workers", "Shorter appointment windows"],
    benefits: ["Targeted foot and lower-leg attention", "Relaxing, grounding experience"],
    cta: "Book Foot Massage & Reflexology",
  },
  {
    slug: "chair-massage",
    title: "Chair Massage Therapy",
    shortDescription:
      "Convenient seated massage focused on the back, neck, shoulders, and arms.",
    fullDescription:
      "Performed seated and fully clothed, chair massage is ideal for quick relief of upper-body tension—great when you want focused care in a shorter visit.",
    duration: "30 minutes",
    price: "$55.00",
    recommendedFor: ["Neck and shoulder tension", "Busy schedules", "On-the-go relief"],
    benefits: ["No disrobing required", "Efficient upper-body focus", "Easy to fit into your day"],
    cta: "Book Chair Massage",
  },
  {
    slug: "wood-therapy-full-body",
    title: "Wood Therapy (Anti-cellulite) Full Body",
    shortDescription:
      "Contoured wooden tools used across the body to support tone, circulation, and sculpting goals.",
    fullDescription:
      "A full-body session using specialized wooden instruments with rhythmic movements intended to support lymphatic flow, skin texture, and body contouring as part of your wellness routine.",
    duration: "60 minutes",
    price: "$120.00",
    recommendedFor: ["Body contouring support", "Firming and circulation goals", "Full-body sessions"],
    benefits: ["Structured, rhythmic technique", "Full-body coverage", "Focused on anti-cellulite care"],
    cta: "Book Wood Therapy — Full Body",
  },
  {
    slug: "wood-therapy-half-body",
    title:
      "Wood Therapy (Anti-cellulite) Half body (Legs, Abdomen, Glutes or back)",
    shortDescription:
      "Wood therapy focused on your choice of legs, abdomen, glutes, or back.",
    fullDescription:
      "A 30-minute targeted wood-therapy session for one half-body zone—legs, abdomen, glutes, or back—using wooden tools to support circulation and contouring in the areas you want most.",
    duration: "30 minutes",
    price: "$60.00",
    recommendedFor: ["Targeted zones", "Shorter sessions", "Specific contour goals"],
    benefits: ["Custom area focus", "Efficient session length", "Complements full-body care"],
    cta: "Book Wood Therapy — Half Body",
  },
  {
    slug: "professional-facial-massage",
    title: "Professional Facial Massage",
    shortDescription:
      "Gentle massage techniques for the face and jaw to release tension and refresh.",
    fullDescription:
      "A dedicated facial massage using light, precise movements to ease jaw and facial tension, support circulation, and leave you feeling refreshed and relaxed.",
    duration: "30 minutes",
    price: "$60.00",
    recommendedFor: ["Jaw tension", "TMJ-related tightness", "Stress held in the face"],
    benefits: ["Focused facial work", "Relaxing and non-invasive", "Short, effective session"],
    cta: "Book Facial Massage",
  },
  {
    slug: "deep-tissue",
    title: "Deep Tissue",
    shortDescription:
      "Firm, focused pressure to address chronic tightness and deeper muscle layers.",
    fullDescription:
      "Therapeutic deep tissue work targets persistent knots and restricted areas with slow, deliberate pressure to help release deep-seated tension and improve comfort with movement.",
    duration: "60 minutes",
    price: "$115.00",
    recommendedFor: ["Chronic tightness", "Athletes and active clients", "Dense muscle tension"],
    benefits: ["Deeper pressure when appropriate", "Focused on problem areas", "Therapeutic intent"],
    cta: "Book Deep Tissue",
  },
  {
    slug: "sport-massage",
    title: "Sport Massage",
    shortDescription:
      "Session geared toward athletes and active clients—mobility, recovery, and performance support.",
    fullDescription:
      "Sports-oriented massage blends techniques to prepare or recover from activity, address overused muscle groups, and support flexibility and comfort so you can keep doing what you love.",
    duration: "30 minutes",
    price: "$60.00",
    recommendedFor: ["Training cycles", "Pre- or post-event", "Muscle maintenance"],
    benefits: ["Activity-focused approach", "Targeted muscle attention", "Supports recovery"],
    cta: "Book Sport Massage",
  },
  {
    slug: "ninety-minute-massage",
    title: "90 Minute Massage",
    shortDescription:
      "Extended full-body session for thorough relaxation or detailed therapeutic work.",
    fullDescription:
      "A full ninety minutes allows time for a comprehensive massage—whether you want deeper work in multiple areas or a slower, more immersive relaxation experience from head to toe.",
    duration: "90 minutes",
    price: "$150.00",
    recommendedFor: ["Full-body relief", "Multiple focus areas", "Deep unwinding"],
    benefits: ["Extra time for detail", "Flexible pacing", "Ideal for special self-care"],
    cta: "Book 90 Minute Massage",
  },
];
