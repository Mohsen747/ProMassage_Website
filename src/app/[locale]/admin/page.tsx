import type { Metadata } from "next";
import { getServerSession } from "@/shared/auth/session";
import SignOutButton from "@/shared/auth/SignOutButton";

// Placeholder protected admin page — exists only to prove the route guard.
// Real /admin content is a later slice. Access is enforced by middleware
// (admin role required).
export const metadata: Metadata = { title: "Admin" };

export default async function AdminPage() {
  const session = await getServerSession();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl text-stone-900">Admin dashboard</h1>
      <p className="mt-3 text-stone-600">
        Protected admin area (placeholder). Signed in as{" "}
        <strong>
          {session?.user.firstName} {session?.user.lastName}
        </strong>{" "}
        — role: <code>{session?.user.role}</code>.
      </p>
      <div className="mt-8">
        <SignOutButton />
      </div>
    </section>
  );
}
