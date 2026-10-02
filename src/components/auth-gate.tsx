'use client';

import { RedirectToSignIn } from '@clerk/nextjs';
import { AuthLoading, Authenticated, Unauthenticated } from 'convex/react';
import type { PropsWithChildren } from 'react';

import { FullscreenLoader } from './fullscreen-loader';

export const AuthGate = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <>
      <Authenticated>{children}</Authenticated>

      <Unauthenticated>
        <RedirectToSignIn />
      </Unauthenticated>

      <AuthLoading>
        <FullscreenLoader />
      </AuthLoading>
    </>
  );
};
