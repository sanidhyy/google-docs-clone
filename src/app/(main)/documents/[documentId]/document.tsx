'use client';

import { Preloaded, usePreloadedQuery } from 'convex/react';

import type { api } from '@/../convex/_generated/api';

import { Editor } from './editor';
import { Navbar } from './navbar';
import { Room } from './room';
import { Toolbar } from './toolbar';

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
  roomId: string;
}

export const Document = ({ preloadedDocument, roomId }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room roomId={roomId}>
      <div className="min-h-screen bg-[#fafbfd]">
        <div className="fixed inset-x-0 top-0 z-10 flex flex-col gap-y-2 bg-[#FAFBFD] px-4 pt-2 print:hidden">
          <Navbar data={document} />
          <Toolbar />
        </div>

        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
};
