'use client';

import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from '@liveblocks/react/suspense';
import type { PropsWithChildren } from 'react';

interface RoomProps {
  roomId: string;
}

export const Room = ({ children, roomId }: PropsWithChildren<RoomProps>) => {
  return (
    <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
