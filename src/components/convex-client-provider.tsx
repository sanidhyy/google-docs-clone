'use client';

import { ClerkProvider, SignIn, useAuth } from '@clerk/nextjs';
import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import type { PropsWithChildren } from 'react';

import { FullscreenLoader } from './fullscreen-loader';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        elements: {
          userButtonAvatarBox: {
            height: '2.5rem',
            width: '2.5rem',
          },
          organizationSwitcherTrigger: {
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            borderRadius: '9999px',
          },
        },
      }}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>

        <Unauthenticated>
          <div className="flex min-h-screen items-center justify-center">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>

        <AuthLoading>
          <FullscreenLoader />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
