export interface ServiceError {
  code: ApiError;
  message: string;
}

export enum ApiError {
  ENTITY_EXISTS,
  VALIDATION_ERROR,
  UNKNOWN_ERROR,
  UNAUTHORIZED,
}
