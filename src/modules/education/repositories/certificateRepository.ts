import type { Certificate } from "@/modules/education/types/certificate";

export interface CreateCertificateData {
  enrollmentId: string;
  studentId: string;
  courseId: string;
  certificateNumber: string;
  issuedById: string;
}

export async function createCertificate(_data: CreateCertificateData): Promise<Certificate> {
  throw new Error("certificateRepository.createCertificate not implemented (scaffold)");
}

export async function findCertificatesByStudent(_studentId: string): Promise<Certificate[]> {
  throw new Error("certificateRepository.findCertificatesByStudent not implemented (scaffold)");
}

export async function setCertificatePdfUrl(_id: string, _pdfUrl: string): Promise<Certificate> {
  throw new Error("certificateRepository.setCertificatePdfUrl not implemented (scaffold)");
}

export async function revokeCertificate(_id: string): Promise<Certificate> {
  throw new Error("certificateRepository.revokeCertificate not implemented (scaffold)");
}
