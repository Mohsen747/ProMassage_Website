import type { Metadata } from "next";
import { getServerSession } from "@/shared/auth/session";
import SignOutButton from "@/shared/auth/SignOutButton";

// Placeholder protected student page — exists only to prove the route guard.
// Real /account content is a later slice. Access is enforced by middleware
// (student role required); this reads the session just to show who is signed in.
export const metadata: Metadata = { title: "My Account" };

export default async function AccountPage() {
  const session = await getServerSession();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl text-stone-900">Student dashboard</h1>
      <p className="mt-3 text-stone-600">
        Protected student area (placeholder). Signed in as{" "}
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
