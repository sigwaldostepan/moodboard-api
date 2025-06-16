import { Context } from 'hono';
import { HttpException } from '../exceptions';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { ZodError } from 'zod';

export const errorHandler = async (err: Error, c: Context) => {
  let message = 'Internal server error';
  let statusCode = 500;
  let stack = null;

  console.log(err);

  if (err instanceof HttpException) {
    message = err.message;
    statusCode = err.statusCode;
  } else if (err instanceof ZodError) {
    const groupedErrors = err.issues.reduce((acc, issue) => {
      const field = issue.path[0];
      if (!acc[field]) {
        acc[field] = [];
      }

      acc[field].push(issue.message);

      return acc;
    }, {} as Record<string, string[]>);

    message = 'Validation error';
    statusCode = 400;
    stack = Object.entries(groupedErrors).map(([field, messages]) => ({
      field,
      messages,
    }));
  }

  return c.json(
    {
      success: false,
      error: {
        message,
        details: stack || err.stack,
      },
    },
    statusCode as ContentfulStatusCode
  );
};
