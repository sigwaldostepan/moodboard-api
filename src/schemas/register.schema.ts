import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email invalid').min(4, 'Email harus diisi'),
  name: z.string().min(4, 'Nama minimal 4 karakter').max(32, 'Nama maksimal 32 karakter'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .max(32, 'Password maksimal 32 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung huruf kecil')
    .regex(/\d/, 'Password harus mengandung angka')
    .regex(/[!@#$%^&*()\-_=+{};:,<.>]/, 'Password harus mengandung karakter khusus')
    .transform((val) => val.trim()),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
