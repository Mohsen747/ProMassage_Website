/** JaneApp booking — massage booking and academy enrollment until separate URLs exist. */
const ONLINE_BOOKING_URL =
  "https://gubenchiropractic.janeapp.com/#/staff_member/5" as const;

export const siteConfig = {
  brand: "ProMassage",
  googlePlaceId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim() ?? "",
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
