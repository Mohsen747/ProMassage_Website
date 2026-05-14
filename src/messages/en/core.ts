const core = {
  metadata: {
    rootTitle: "ProMassage | Therapeutic Massage in Kirkland",
    rootDescription:
      "Professional therapeutic massage in Kirkland focused on pain relief, tension reduction, recovery, and personalized care.",
    pricingTitle: "Pricing | ProMassage",
    pricingDescription:
      "Massage therapy pricing and session options at ProMassage in Kirkland, Quebec.",
    academyTitle: "Academy | ProMassage",
    academyDescription:
      "ProMassage Academy — courses, schedule, certification, and enrollment for massage therapy training in Kirkland.",
  },
  ctas: {
    primary: "Book Now",
    secondary: "View Services",
    final: "Book Your Appointment",
  },
  nav: {
    academy: {
      sectionLabel: "Academy",
      enrollLabel: "Enroll Now",
      links: {
        courses: "Courses",
        schedule: "Schedule",
        certification: "Certification",
      },
    },
    clinic: {
      services: "Massage Services",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
    },
  },
  footer: {
    massageHeading: "Massage",
    contactHeading: "Contact",
    bookNow: "Book Now",
    attributionLeadIn: "All designed by",
    attributionLabel: "donya Innovation",
    location: "Kirkland, Quebec",
    bookingLine: "Online Booking Available",
  },
  brand: {
    subtitle: "Clinic & Academy",
  },
  LocaleSwitcher: {
    label: "Language",
  },
  eyebrow: {
    kirkland: "ProMassage — Kirkland, Quebec",
    clinicAcademy: "ProMassage Clinic & Academy",
  },
  common: {
    contact: "Contact",
    academy: "Academy",
    massages: "Massages",
    location: "Location",
    booking: "Booking",
    getDirections: "Get Directions",
    whatToExpect: "What to expect",
    massotherapy: "Massotherapy",
    coursesBreadcrumb: "Courses",
    contactCta: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navMassageClinic: "Massage clinic",
    navAcademy: "Academy",
    homeAria: "ProMassage — home",
    homeAriaFull: "ProMassage Clinic & Academy — home",
    siteMenu: "Site menu",
    utilityNav: "Social and language",
    visitFacebook: "ProMassage on Facebook",
    visitInstagram: "ProMassage on Instagram",
    inactiveSocialTileHint:
      "Add your page URLs in src/config/site.ts (SOCIAL_DEFAULTS) or set NEXT_PUBLIC_FACEBOOK_URL / NEXT_PUBLIC_INSTAGRAM_URL.",
    scrollToContent: "Scroll to main content",
    commonAreasLabel: "Common areas we address",
    faqQuestionPrefix: "Q",
  },
  durations: {
    "30min": "30 minutes",
    "60min": "60 minutes",
    "90min": "90 minutes",
  },
  ServiceCard: {
    bestFor: "Best for",
    benefits: "Benefits",
  },
  contactTrust: {
    easyBooking: "Easy online booking",
    professionalCare: "Professional therapeutic care",
    personalized: "Personalized sessions",
    calmEnv: "Calm and welcoming environment",
    focusedComfort: "Focused on your comfort and recovery",
  },
  servicesPage: {
    cantFindTime: "Can't find a time?",
    seeAvailability: "See availability for massage therapy booking",
  },
  pricingPage: {
    title: "Pricing",
    intro:
      "Session rates for therapeutic massage. For full descriptions of each treatment, see",
    introLink: "Massage services",
    introSuffix: ". Final pricing may be confirmed at online booking checkout.",
    massageServicesCta: "Massage Services",
    currentRates: "Current rates",
  },
  faqPage: {
    title: "Frequently Asked Questions",
    intro:
      "Here are answers to common questions to help you feel comfortable before booking your session.",
    readyTitle: "Ready to book your session?",
    readyBody: "Online booking is simple and available any time through JaneApp.",
  },
  academyHub: {
    title: "Academy",
    intro:
      "Programs, schedule, and certification paths at ProMassage Clinic & Academy.",
  },
  academySub: {
    schedule: {
      title: "Schedule | ProMassage Academy",
      description: "Academy class and program schedule at ProMassage.",
      heading: "Schedule",
      body: "Program dates and class times will be published here. Contact us for the current term schedule.",
    },
    certification: {
      title: "Certification | ProMassage Academy",
      description: "Certification pathways at ProMassage Academy in Kirkland.",
      heading: "Certification",
      body: "Certification requirements and pathways will be outlined here. Reach out through Contact for advising.",
    },
    breadcrumbAcademy: "Academy",
  },
  bookingVia: "Online through JaneApp",
} as const;

export default core;
