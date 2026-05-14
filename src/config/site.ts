/** JaneApp booking — massage booking and academy enrollment until separate URLs exist. */
const ONLINE_BOOKING_URL =
  "https://gubenchiropractic.janeapp.com/#/staff_member/5" as const;

const trimUrl = (value: string | undefined) => value?.trim() ?? "";

/** Public profile URLs for the header social tiles. Env vars override when set. */
const SOCIAL_DEFAULTS = {
  facebook: "https://www.facebook.com/ProMassageAcademy/",
  instagram: "https://www.instagram.com/promassage_academy",
} as const;

export const siteConfig = {
  brand: "ProMassage",
  googlePlaceId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim() ?? "",
  social: {
    facebook: trimUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL) || SOCIAL_DEFAULTS.facebook,
    instagram: trimUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL) || SOCIAL_DEFAULTS.instagram,
  },
  ctas: {
    bookingUrl: ONLINE_BOOKING_URL,
    enrollPath: "/enroll",
  },
  homeHeroVideoClips: [
    { src: "/videos/home-moment-1.mp4" },
    { src: "/videos/home-moment-2.mp4" },
    { src: "/videos/home-moment-3.mp4" },
  ],
} as const;
