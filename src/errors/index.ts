import { constants } from 'http2';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
}
