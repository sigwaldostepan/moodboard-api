export interface SanitizedContext {
  Variables: SanitizedRequest;
}

export interface SanitizedRequest {
  validatedBody: any;
  validatedQuery?: any;
  validatedParams?: any;
}
