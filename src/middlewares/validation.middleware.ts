import { createMiddleware } from 'hono/factory';
import { ZodSchema } from 'zod';
import { SanitizedContext } from '../types';

export const validateBody = (body: ZodSchema) =>
  createMiddleware<SanitizedContext>(async (c, next) => {
    try {
      const rawBody = await c.req.json();
      const validatedBody = body.parse(rawBody);

      c.set('validatedBody', validatedBody);

      await next();
    } catch (err) {
      throw err;
    }
  });
