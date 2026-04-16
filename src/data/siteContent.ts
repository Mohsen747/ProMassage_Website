/** JaneApp booking — used for massage booking and academy enrollment until separate URLs exist. */
const ONLINE_BOOKING_URL =
  "https://gubenchiropractic.janeapp.com/#/staff_member/5" as const;

export const siteContent = {
  brand: "ProMassage",
  /**
   * Google Maps Place ID — set in `.env` as `NEXT_PUBLIC_GOOGLE_PLACE_ID`.
   * Live rating numbers need server `GOOGLE_MAPS_API_KEY` + Places API (`src/lib/googlePlace.ts`).
   */
  googlePlaceId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim() ?? "",
  tagline: "Therapeutic massage focused on relief, recovery, and personalized care.",
  description:
    "ProMassage offers therapeutic massage designed to relieve tension, reduce discomfort, and support recovery in a calm, professional setting.",
  ctas: {
    primary: "Book Now",
    secondary: "View Services",
    final: "Book Your Appointment",
    mobile: "Book Now",
    bookingUrl: ONLINE_BOOKING_URL,
    /** In-site enrollment landing page; JaneApp is linked from that page. */
    enrollUrl: "/enroll",
  },
  enroll: {
    meta: {
      title: "Enroll | ProMassage Academy",
      description:
        "Start your enrollment at ProMassage Clinic & Academy. Learn how to register for courses, view the academy hub, and complete your application online.",
    },
    hero: {
      title: "Enroll at ProMassage Academy",
      intro:
        "Take the next step toward your training goals. Review academy programs and schedules, then complete enrollment through our secure online desk.",
    },
    points: [
      "Explore courses, schedule, and certification paths from the Academy section.",
      "When you are ready, continue to our online enrollment desk to register or reserve your spot.",
      "Questions before you enroll? Use Contact and we will help you choose the right path.",
    ],
    ctaOnline: "Continue to online enrollment",
    ctaAcademy: "Browse Academy",
  },
  courses: {
    meta: {
      title: "Courses | ProMassage Academy",
      description:
        "Massage therapy and professional training courses at ProMassage Clinic & Academy in Kirkland — structure, focus areas, and how to enroll.",
    },
    hero: {
      title: "Academy courses",
      intro:
        "ProMassage Academy offers focused training built around therapeutic technique, client care, and professional practice. Programs combine structured learning with practical application so you can grow with confidence.",
    },
    pillars: [
      {
        title: "Foundations first",
        text: "Core coursework covers anatomy, safe practice, assessment basics, and the principles behind therapeutic massage so every advanced topic has a solid base.",
      },
      {
        title: "Hands-on application",
        text: "Labs and supervised practice sessions translate theory into touch: pacing, pressure, draping, communication, and adapting techniques to real client needs.",
      },
      {
        title: "Professional readiness",
        text: "Expectations around ethics, boundaries, documentation, and clinic flow are woven in so graduates are prepared for structured, respectful client work.",
      },
    ],
    note: "Detailed course titles, term dates, hours, and prerequisites will be published here as each intake is confirmed. Until then, use Schedule for timing questions or Enroll to hold your place.",
    ctaEnroll: "Enroll now",
    ctaSchedule: "View schedule",
    ctaContact: "Ask a question",
  },
  nav: {
    academy: {
      sectionLabel: "Academy",
      sectionHref: "/academy",
      links: [
        { label: "Courses", href: "/academy/courses" },
        { label: "Schedule", href: "/academy/schedule" },
        { label: "Certification", href: "/academy/certification" },
      ],
      enrollLabel: "Enroll Now",
    },
    clinic: {
      links: [
        { label: "Massage Services", href: "/services" },
        { label: "Pricing", href: "/pricing" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
  },
  home: {
    meta: {
      title: "ProMassage | Therapeutic Massage in Kirkland",
      description:
        "Professional therapeutic massage in Kirkland focused on pain relief, tension reduction, recovery, and personalized care. Book your session with ProMassage today.",
    },
    hero: {
      /** Shown in the mobile nav wordmark; hero eyebrow is hidden on small screens to avoid duplication. */
      locationLine: "Kirkland, Quebec",
      title: "Relieve Pain & Recover Faster",
      primaryCta: "Book Now — Feel Better Today",
      secondaryCta: "View Services",
      trustLine: "Professional care. Personalized sessions. Easy online booking.",
      /** Landscape source. Optional `backgroundImageVertical` (portrait URL) is supported in Hero for viewports below `sm`. */
      backgroundImage: "/hero.png",
    },
    problemSolution: {
      title: "When your body is under pressure, it shows",
      text1:
        "Long hours sitting, physical strain, stress, and daily tension can build up in your neck, shoulders, back, and hips. Over time, discomfort becomes normal, movement feels restricted, and your body stays tight longer than it should.",
      text2:
        "ProMassage offers targeted therapeutic massage to help release built-up tension, reduce discomfort, and support better recovery. Each session is adapted to your needs instead of following a one-size-fits-all routine.",
      bullets: [
        "Neck and shoulder tension",
        "Back tightness and muscle fatigue",
        "Stress-related body tension",
        "Recovery support after physical strain",
        "Personalized care based on your needs",
      ],
      cta: "Book Your Session",
    },
    servicesPreview: {
      title: "Services designed around how you feel",
      subtitle:
        "Choose the massage experience that best fits your needs, whether you are looking for targeted therapeutic work, recovery support, or focused tension relief.",
      cta: "See All Services",
    },
    whyChoose: {
      title: "Why clients choose ProMassage",
      intro:
        "People are not looking for another generic massage. They want professional care that feels focused, thoughtful, and worth coming back for.",
      items: [
        {
          title: "Personalized sessions",
          text: "Each massage is adapted to your body, your tension patterns, and your goals.",
        },
        {
          title: "Therapeutic focus",
          text: "The goal is not just temporary comfort, but meaningful relief and improved ease of movement.",
        },
        {
          title: "Professional environment",
          text: "Clean, calm, and welcoming care that helps you feel comfortable from the moment you arrive.",
        },
        {
          title: "Simple online booking",
          text: "Book your appointment easily and choose the session that fits your schedule.",
        },
      ],
    },
    testimonials: {
      title: "What clients say",
    },
    aboutPreview: {
      title: "Care that is calm, professional, and personalized",
      text:
        "At ProMassage, the focus is on helping each client feel better through therapeutic care that is attentive and purposeful. Every session is approached with professionalism, respect, and an understanding that no two bodies carry tension in exactly the same way.",
      cta: "Learn More",
    },
    faqPreview: {
      title: "Questions before you book?",
      text: "Here are a few common questions to help you feel more comfortable before your appointment.",
      questions: [
        "What type of massage should I choose?",
        "How do I book my session?",
        "Where is ProMassage located?",
        "What should I expect during my appointment?",
      ],
      cta: "View FAQs",
    },
    finalCta: {
      title: "Ready to feel better in your body?",
      text:
        "Book your session with ProMassage and choose personalized therapeutic care in a calm, professional setting.",
      cta: "Book Your Appointment",
      note: "Simple online booking through JaneApp",
    },
  },
  services: {
    meta: {
      title: "Massage Services | ProMassage Kirkland",
      description:
        "Explore therapeutic massage services at ProMassage, including deep tissue, relaxation, focused upper-body treatment, and recovery massage. Book online today.",
    },
    hero: {
      title: "Massage Services",
      intro:
        "Each service at ProMassage is designed to support relief, recovery, and overall comfort through focused, professional care. Choose the treatment that best fits your needs, or book the session that feels right for your body today.",
    },
    closingCta: {
      title: "Not sure which service is right for you?",
      text: "Choose the session that best matches your main area of tension or recovery needs. If you already know you need relief, booking is the best next step.",
      cta: "Book Now",
    },
  },
  about: {
    meta: {
      title: "About ProMassage | Professional Therapeutic Massage",
      description:
        "Learn more about ProMassage, a professional massage practice focused on personalized care, pain relief, recovery, and a calm client experience.",
    },
    hero: {
      title: "About ProMassage",
      intro:
        "ProMassage was created to offer therapeutic massage that feels both professional and personal. The goal is simple: help clients feel better through focused care, thoughtful treatment, and a calm environment where they can trust the process.",
    },
    sections: [
      {
        title: "A session should be more than routine",
        text: "Every body carries tension differently. That is why ProMassage focuses on personalized sessions rather than a standard routine repeated for every client. Whether the goal is relief, recovery, or relaxation, care is adapted to what your body needs most.",
      },
      {
        title: "Professional care with real attention to your needs",
        text: "The ProMassage approach is centered on listening, observing, and working with intention. Some clients need focused therapeutic work in the back, neck, or shoulders. Others need a calming session that helps reduce overall tension. In every case, the experience is designed to be respectful, professional, and effective.",
      },
      {
        title: "A calm and welcoming experience",
        text: "Clients should feel comfortable from the moment they arrive. ProMassage offers a setting that is clean, calm, and professional, helping each session begin with ease and end with a stronger sense of physical comfort.",
      },
      {
        title: "Why clients come back",
        bullets: [
          "Sessions feel personalized, not rushed",
          "The focus stays on real tension and discomfort",
          "The experience is professional and consistent",
          "Booking is simple and convenient",
          "Clients leave feeling cared for and understood",
        ],
      },
    ],
    cta: {
      title: "Experience therapeutic care that is focused on how you feel",
      cta: "Book Your Session",
    },
  },
  contact: {
    meta: {
      title: "Contact ProMassage | Book or Get in Touch",
      description:
        "Contact ProMassage for therapeutic massage services in Kirkland. Find location details, booking information, and ways to get in touch.",
    },
    hero: {
      title: "Contact ProMassage",
      intro:
        "Have a question before booking, or ready to schedule your session? ProMassage is here to help you take the next step toward relief, recovery, and relaxation.",
    },
    info: {
      title: "Get in touch",
      location: "Kirkland, Quebec",
      booking: "Online through JaneApp",
    },
    formIntro:
      "Use the form below if you have a question before booking. For the fastest way to reserve your appointment, please use the online booking link.",
    location: {
      title: "Visit ProMassage",
      text: "Conveniently located for clients in Kirkland and surrounding areas, ProMassage offers a calm, professional space for therapeutic massage and personalized care.",
    },
  },
  faq: {
    meta: {
      title: "FAQ | ProMassage",
      description:
        "Frequently asked questions about ProMassage services, booking, and what to expect during your therapeutic massage appointment.",
    },
  },
  footer: {
    attribution: {
      creditLeadIn: "All designed by",
      label: "donya Innovation",
      href: "https://mohsen-pajoohesh.com",
    },
    contact: {
      location: "Kirkland, Quebec",
      booking: "Online Booking Available",
    },
  },
};
