"use client";

import { signOut } from "next-auth/react";
import { authRoutes } from "@/shared/auth/routes";

interface SignOutButtonProps {
  label?: string;
}

export default function SignOutButton({ label = "Sign out" }: SignOutButtonProps) {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: authRoutes.signIn })}>
      {label}
    </button>
  );
}
