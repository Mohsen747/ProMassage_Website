import NextAuth from "next-auth";
import { authConfig } from "@/shared/auth/authConfig";

// Single NextAuth instance for the app. `auth` is the server-side session
// accessor used by getServerSession(); `handlers` back the route handler;
// `signIn`/`signOut` are used by the login/logout forms.
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
