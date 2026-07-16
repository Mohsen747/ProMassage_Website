import type { Metadata } from "next";
import { requireUser } from "@/shared/auth/session";
import * as studentService from "@/modules/education/services/studentService";
import ProfileForm from "@/modules/education/components/account/ProfileForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Profile" };

export default async function AccountProfilePage() {
  const user = await requireUser();
  // Fresh from the DB (the JWT session can lag behind a just-saved edit).
  const student = await studentService.getStudent(user.id);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">Profile</h1>
        <p className="mt-2 text-stone-600">Manage your personal details.</p>
      </header>

      <div className="max-w-xl rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <ProfileForm
          defaults={{
            firstName: student.firstName,
            lastName: student.lastName,
            phone: student.phone ?? "",
            email: student.email,
          }}
        />
      </div>
    </div>
  );
}
