import z from 'zod';

const envSchema = z.object({
  PORT: z.number().default(4000),
  ALLOWED_ORIGIN: z.string().default('http://localhost:4000'),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
