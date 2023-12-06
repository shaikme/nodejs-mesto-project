export {};

declare global {
    // eslint-disable-next-line
    namespace Express {
      export interface Request {
        user: {
          _id: string
        };
      }
    }

    export interface Error {
      statusCode?: number
    }
  }
