import { z } from 'zod';

export const admissionLeadSchema = z.object({
  body: z.object({
    parentName: z.string().min(2, "Parent name is too short"),
    studentName: z.string().min(2, "Student name is too short"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    grade: z.string().min(1, "Grade is required"),
  }),
});

export const updateLeadStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid lead ID"),
  }),
  body: z.object({
    status: z.enum(['NEW', 'CONTACTED', 'INTERVIEW_SCHEDULED', 'ENROLLED', 'REJECTED']),
  }),
});
