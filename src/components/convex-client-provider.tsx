'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import type { PropsWithChildren } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
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
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
