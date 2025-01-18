// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // app base url
      NEXT_PUBLIC_APP_BASE_URL: string;

      // convex deployment & url
      CONVEX_DEPLOYMENT: string;
      NEXT_PUBLIC_CONVEX_URL: string;
    }
  }
}
