'use client';

import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui';
import { ClientSideSuspense, useInboxNotifications } from '@liveblocks/react/suspense';
import { BellIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const Inbox = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <InboxMenu />
    </ClientSideSuspense>
  );
};

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative" size="icon">
          <BellIcon className="size-5" />
          {inboxNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center">
              {inboxNotifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-auto">
        {inboxNotifications.length > 0 ? (
          <InboxNotificationList>
            {inboxNotifications.map((inboxNotification) => (
              <InboxNotification key={inboxNotification.id} inboxNotification={inboxNotification} />
            ))}
          </InboxNotificationList>
        ) : (
          <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">No notifications.</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
