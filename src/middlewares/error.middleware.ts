import { Context } from 'hono';
import { ZodError } from 'zod';
import { HTTPException } from 'hono/http-exception';

export const errorHandler = async (err: Error, c: Context) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      success: false,
      error: {
        message: err.message,
        details: err.stack,
      },
    });
  } else if (err instanceof ZodError) {
    const groupedErrors = err.issues.reduce((acc, issue) => {
      const field = issue.path[0];
      if (!acc[field]) {
        acc[field] = [];
      }

      acc[field].push(issue.message);

      return acc;
    }, {} as Record<string, string[]>);

    const details = Object.entries(groupedErrors).map(([field, messages]) => ({
      field,
      messages,
    }));

    c.status(400);
    return c.json({
      success: false,
      error: {
        message: 'Validation error',
        details,
      },
    });
  }

  c.status(500);
  return c.json({
    success: false,
    error: {
      message: 'Internal server error',
      details: err.stack,
    },
  });
};
