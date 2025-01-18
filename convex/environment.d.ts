// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // clerk issuer url (go to your clerk dashboard > JWT Templates > New template > Convex > Save and copy your Issuer URL)
      CLERK_ISSUER_URL: string;
    }
  }
}
