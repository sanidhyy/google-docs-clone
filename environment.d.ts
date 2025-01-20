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

      // clerk auth keys
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;

      // liveblocks keys
      NEXT_PUBLIC_LIVEBLOCKS_API_KEY: string;
      LIVEBLOCKS_SECRET_KEY: string;
    }
  }
}
