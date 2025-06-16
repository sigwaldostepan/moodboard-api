import { ContentfulStatusCode } from 'hono/utils/http-status';

export class HttpException extends Error {
  public statusCode: ContentfulStatusCode;

  constructor(message: string, statusCode: ContentfulStatusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
