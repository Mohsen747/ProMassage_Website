const faqs = [
  {
    question: "What type of massage should I choose?",
    answer:
      "If you are dealing with specific muscle tightness or ongoing tension, a therapeutic or deep tissue session may be the best choice. If your main goal is to relax and reduce overall stress, a relaxation massage is a great option. If your tension is mostly in the upper body, the head, neck, and shoulder massage may be the right fit.",
  },
  {
    question: "How do I book my session?",
    answer:
      "Appointments can be booked online through JaneApp. Simply choose your service, select an available time, and confirm your booking.",
  },
  {
    question: "What should I expect during my appointment?",
    answer:
      "Your session is designed around your needs and comfort level. The goal is to provide professional care in a calm environment while focusing on your areas of tension, discomfort, or recovery needs.",
  },
  {
    question: "Where is ProMassage located?",
    answer:
      "ProMassage is located in Kirkland, Quebec, and welcomes clients looking for professional therapeutic massage in the surrounding area.",
  },
  {
    question: "Is massage only for relaxation?",
    answer:
      "No. While massage can be deeply relaxing, it can also be used to address muscular tension, support recovery, and improve overall physical comfort.",
  },
  {
    question: "Can I book online?",
    answer:
      "Yes. Online booking is available through JaneApp for a simple and convenient scheduling experience.",
  },
] as const;

const testimonials = [
  {
    name: "Client Review",
    quote:
      "I came in with a lot of neck and shoulder tension and felt a real difference after my session. Professional, attentive, and very effective.",
  },
  {
    name: "Client Review",
    quote:
      "The treatment was focused, calming, and exactly what I needed. I left feeling lighter and much less tight through my back.",
  },
  {
    name: "Client Review",
    quote:
      "A very professional experience from start to finish. The session was personalized and helped relieve the tension I had been carrying for weeks.",
  },
] as const;

const faqTestimonialsMessages = { faqs, testimonials };
export default faqTestimonialsMessages;
