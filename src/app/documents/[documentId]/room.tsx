'use client';

import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from '@liveblocks/react/suspense';
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import type { Id } from '@/../convex/_generated/dataModel';
import { FullscreenLoader } from '@/components/fullscreen-loader';
import { editorMargin } from '@/config/editor';

import { getDocuments, getUsers } from './actions';

interface RoomProps {
  roomId: string;
}

type User = { id: string; name: string; avatar: string; color: string };

export const Room = ({ children, roomId }: PropsWithChildren<RoomProps>) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list.map((list) => ({ ...list, color: '' })));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to fetch users!');
      }
    },
    [],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = '/api/liveblocks-auth';
        const room = roomId;

        const response = await fetch(endpoint, { method: 'POST', body: JSON.stringify({ room }) });

        return await response.json();
      }}
      throttle={16}
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) => users.find((user) => user.id === userId) ?? undefined);
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<'documents'>[]);

        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider id={roomId} initialStorage={{ leftMargin: editorMargin, rightMargin: editorMargin }}>
        <ClientSideSuspense fallback={<FullscreenLoader label="Loading Document..." />}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
