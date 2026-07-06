import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { requireRole } from "@/shared/auth/session";
import * as studentService from "@/modules/education/services/studentService";
import { formatDate } from "@/modules/education/components/account/statusMeta";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Students · Admin" };

export default async function AdminStudentsPage() {
  await requireRole("admin");
  const students = await studentService.listStudents();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">Students</h1>
        <p className="mt-2 text-stone-600">{students.length} registered students.</p>
      </header>

      {students.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
          No students yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-stone-500">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Enrollments</th>
                <th className="px-5 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {students.map((student) => (
                <tr key={student.id} className="text-stone-700 transition-colors hover:bg-stone-50">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/students/${student.id}`}
                      className="font-medium text-stone-900 hover:text-brand-forest"
                    >
                      {student.firstName} {student.lastName}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{student.email}</td>
                  <td className="px-5 py-3">{student.enrollmentCount}</td>
                  <td className="px-5 py-3 whitespace-nowrap">{formatDate(student.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
