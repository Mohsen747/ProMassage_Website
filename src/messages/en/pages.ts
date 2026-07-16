const enroll = {
  meta: {
    title: "Enroll | ProMassage Academy",
    description:
      "Start your enrollment at ProMassage Clinic & Academy. Learn how to register for programs, view the academy hub, and complete your application online.",
  },
  hero: {
    title: "Enroll at ProMassage Academy",
    intro:
      "Take the next step toward your training goals. Review academy programs and schedules, then complete enrollment through our secure online desk.",
  },
  points: [
    "Explore programs, schedule, and certification paths from the Academy section.",
    "When you are ready, continue to our online enrollment desk to register or reserve your spot.",
    "Questions before you enroll? Use Contact and we will help you choose the right path.",
  ],
  ctaOnline: "Continue to online enrollment",
  ctaAcademy: "Browse Academy",
  breadcrumb: "Enroll",
  stepsBrowseDescription: "Explore all {count} programs from introductory to diploma.",
  steps: [
    {
      number: "1",
      title: "Browse our programs",
      description: "Explore all programs from introductory to diploma.",
    },
    {
      number: "2",
      title: "Contact us",
      description: "Discuss your goals and find the right program.",
    },
    {
      number: "3",
      title: "Confirm enrollment",
      description: "Secure your spot and prepare for orientation.",
    },
    {
      number: "4",
      title: "Begin learning",
      description: "Attend orientation and start your program.",
    },
  ],
  contact: {
    heading: "Get in touch",
    location: "30 Canvin St, Kirkland, QC H9H 4S4",
    consultation: "Book a free consultation",
  },
  faq: {
    heading: "Common questions",
    items: [
      {
        question: "What are the prerequisites for most courses?",
        answer:
          "Most continuing education courses require basic Swedish massage knowledge or equivalent experience. The introductory course is open to all.",
      },
      {
        question: "How long does a course take to complete?",
        answer:
          "Courses range from 20h to 400h depending on the program. Most continuing education courses are completed in a few weekends.",
      },
      {
        question: "Is financing or payment plans available?",
        answer:
          "Contact us to discuss payment options. We work with students to find a plan that fits their situation.",
      },
      {
        question: "Will I receive a certificate upon completion?",
        answer:
          "Yes. All students who complete course requirements receive an official ProMassage Academy certificate.",
      },
    ],
  },
} as const;

const programs = {
  meta: {
    title: "Programs | ProMassage Academy",
    description:
      "Massage therapy and professional training programs at ProMassage Clinic & Academy in Kirkland — structure, focus areas, and how to enroll.",
  },
  hero: {
    title: "Academy Programs",
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
  stats: {
    totalLabel: "Programs offered",
    hoursLabel: "Hours range",
    formatsLabel: "Format options",
    hoursValue: "{min}–{max}h",
    formatsValue: "Individual · Semi-Individual · Group",
  },
  sections: {
    introductory: "Introductory",
    professionalDiploma: "Professional Diploma",
    continuingEducation: "Continuing Education",
  },
  card: {
    theoryLabel: "Theory",
    practicalLabel: "Practical",
    prerequisitesLabel: "Prerequisites",
    highlightsLabel: "Highlights",
    showHighlights: "Show highlights",
    hideHighlights: "Hide highlights",
    fromPrice: "From",
    currency: "CAD",
    instructorLabel: "Instructor",
    enrollButton: "Enroll Now",
  },
  cta: {
    heading: "Ready to enroll?",
    body: "Contact us to discuss scheduling and pricing.",
    enrollButton: "Enroll Now",
    contactButton: "Ask a Question",
  },
  header: {
    title: "Programs",
    subtitle: "{count} programs from introductory to professional diploma",
  },
} as const;

const programDetail = {
  meta: {
    title: "{name} | ProMassage Academy",
  },
  backToPrograms: "Back to all programs",
  highlightsHeading: "What you will learn",
  schedule: {
    title: "Upcoming sessions",
    note: "Dates, days, and hours to be announced. Sign up to be notified when sessions are scheduled.",
    registerButton: "Notify me",
    columns: {
      date: "Date",
      language: "Language",
      days: "Days",
      hours: "Hours",
      register: "Register",
    },
    rows: [
      {
        date: "—",
        language: "English",
        days: "—",
        hours: "—",
      },
      {
        date: "—",
        language: "English–French",
        days: "—",
        hours: "—",
      },
      {
        date: "—",
        language: "French",
        days: "—",
        hours: "—",
      },
    ],
  },
  accordion: {
    heading: "Program information",
    detailsPrerequisite: "Prerequisite: {value}",
    detailsHours: "Course hours: {hours} h",
    sections: [
      { title: "Details" },
      {
        title: "Cost",
        content:
          "Group, semi-individual, and individual pricing tiers are available. The group rate shown on the listing is the starting point — contact us for full pricing based on your preferred format.",
      },
      {
        title: "Payment methods",
        content:
          "We accept e-transfer, credit card, and installment plans for diploma programs. A deposit may be required to secure your spot.",
      },
      {
        title: "Equipment",
        content:
          "Students should bring comfortable clothing suitable for practical work. Massage tables and clinic supplies are provided on site.",
      },
    ],
  },
  cta: {
    heading: "Ready to enroll in this program?",
    body: "Contact us to confirm your intake date and complete registration.",
    enrollButton: "Enroll Now",
    contactButton: "Ask a Question",
  },
} as const;

const services = {
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
} as const;

const about = {
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
} as const;

const contact = {
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
    location: "30 Canvin St, Kirkland, QC H9H 4S4",
  },
  formIntro:
    "Use the form below if you have a question before booking. For the fastest way to reserve your appointment, please use the online booking link.",
  location: {
    title: "Visit ProMassage",
    text: "Conveniently located for clients in Kirkland and surrounding areas, ProMassage offers a calm, professional space for therapeutic massage and personalized care.",
  },
} as const;

const faqMeta = {
  title: "FAQ | ProMassage",
  description:
    "Frequently asked questions about ProMassage services, booking, and what to expect during your therapeutic massage appointment.",
} as const;

const contactForm = {
  submittedTitle: "Message received",
  submittedBody: "Thank you for reaching out. We will be in touch shortly.",
  nameLabel: "Full Name",
  emailLabel: "Email",
  phoneLabel: "Phone",
  messageLabel: "Message",
  required: "Required field",
  namePlaceholder: "Your full name",
  emailPlaceholder: "your@email.com",
  phonePlaceholder: "(514) 000-0000",
  messagePlaceholder: "How can we help you?",
  submit: "Send Message",
} as const;

const pagesMessages = { enroll, programs, programDetail, services, about, contact, faqMeta, contactForm };
export default pagesMessages;
