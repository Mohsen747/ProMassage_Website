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
      "ProMassage Academy — programs, schedule, certification, and enrollment for massage therapy training in Kirkland.",
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
        programs: "Programs",
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
    programsBreadcrumb: "Programs",
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
    intro: "Programs, schedule, and certification paths at ProMassage Clinic & Academy.",
    subtitle: "Train with purpose. Practice with confidence.",
    featureCards: {
      programs: {
        number: "01",
        title: "Programs",
        body: "13 programs from introductory to diploma",
      },
      schedule: {
        number: "02",
        title: "Schedule",
        body: "Flexible intakes throughout the year",
      },
      certification: {
        number: "03",
        title: "Certification",
        body: "Professional recognition pathways",
      },
      arrowLabel: "Learn more",
    },
    instructor: {
      name: "Maryam Roostaei, RMT · M.Sc. Exercise Physiology",
      bio: "Founder and lead instructor of ProMassage Academy. Registered Massage Therapist with a Master's in Exercise Physiology.",
    },
    accreditation:
      "ProMassage Academy is pursuing accreditation with Collectif Santé (RMQ/AMQ). Contact us for the latest status.",
    cta: {
      heading: "Ready to enroll?",
      body: "Contact us to discuss scheduling and pricing.",
      enrollButton: "Enroll Now",
      contactButton: "Ask a Question",
    },
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
  academySchedule: {
    meta: {
      title: "Schedule | ProMassage Academy",
      description: "Class and program schedule for ProMassage Academy in Kirkland.",
    },
    title: "Schedule",
    subtitle: "Upcoming intakes and class times",
    breadcrumb: "Schedule",
    seasons: {
      fall: "Fall Intake",
      winter: "Winter Intake",
      spring: "Spring Intake",
      datesTba: "Dates to be announced",
      joinWaitlist: "Join Waitlist",
    },
    howItWorks: {
      heading: "How it works",
      steps: [
        { title: "Apply", description: "Submit your interest and we review your background." },
        { title: "Confirm enrollment", description: "Discuss scheduling, format, and secure your spot." },
        { title: "Attend orientation", description: "Join the onboarding session before your term begins." },
        { title: "Begin classes", description: "Start your program with structured theory and hands-on practice." },
      ],
    },
    waitlist: {
      heading: "Get notified when enrollment opens",
      name: "Name",
      email: "Email",
      course: "Course of interest",
      coursePlaceholder: "Select a course",
      submit: "Join Waitlist",
      success: "Thank you! We will be in touch soon.",
      courseOptions: [
        "Introduction to Massage Therapy",
        "Professional Massage Therapy Diploma",
        "Deep Tissue Massage Techniques",
        "Advanced Swedish Massage",
        "Sports Massage & Athletic Recovery",
        "Prenatal & Postnatal Massage",
        "Myofascial Release Therapy",
        "Trigger Point Therapy",
        "Manual Lymphatic Drainage",
        "Hot Stone Therapy",
        "Craniosacral Therapy Fundamentals",
        "Aromatherapy & Massage Integration",
        "Chair & Corporate Massage",
      ],
    },
    cta: {
      heading: "Ready to secure your spot?",
      body: "Contact us to discuss scheduling and available intakes.",
      enrollButton: "Enroll Now",
      contactButton: "Ask a Question",
    },
  },
  academyCertification: {
    meta: {
      title: "Certification | ProMassage Academy",
      description: "Certification pathways and professional recognition at ProMassage Academy.",
    },
    title: "Certification",
    subtitle: "Your path to professional recognition",
    breadcrumb: "Certification",
    pathways: {
      certificate: {
        title: "Course Certificate",
        body: "Complete any continuing education course to earn an official certificate.",
      },
      diploma: {
        title: "Massage Therapy Diploma (400h)",
        body: "Complete the flagship professional program for a full diploma credential.",
      },
      recognition: {
        title: "Professional Recognition",
        body: "Accreditation pathway with Collectif Santé (RMQ/AMQ) in progress.",
      },
    },
    whatYouReceive: {
      heading: "What you receive",
      items: [
        "Official course certificate or diploma",
        "Detailed transcript of hours completed",
        "Instructor reference letter (upon request)",
        "ProMassage Academy alumni status",
      ],
    },
    accreditation:
      "ProMassage Academy is currently pursuing accreditation with Collectif Santé (RMQ/AMQ). Contact us for the latest status.",
    cta: {
      heading: "Start your certification path today",
      body: "Enroll in a course and take the first step toward professional recognition.",
      enrollButton: "Enroll Now",
      contactButton: "Ask a Question",
    },
  },
} as const;

export default core;
