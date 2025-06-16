import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { env } from './config';
import { errorHandler } from './middlewares';

const app = new Hono();

/* <middlewares> */
app.use(logger());
app.use(
  cors({
    origin: env.ALLOWED_ORIGIN,
    maxAge: 86400,
    credentials: true,
  })
);
app.onError(errorHandler);
/* </middlewares> */

/* <routes> */
app.get('/', (c) => {
  return c.text('Hello Hono!');
});
/* </routes> */

export default {
  port: env.PORT,
  fetch: app.fetch,
};
