import { AnchoredThreads, FloatingComposer, FloatingThreads } from '@liveblocks/react-tiptap';
import { ClientSideSuspense, useThreads } from '@liveblocks/react/suspense';
import { Editor } from '@tiptap/react';

export const Threads = ({ editor }: { editor: Editor | null }) => {
  return (
    <ClientSideSuspense fallback={null}>
      <ThreadsList editor={editor} />
    </ClientSideSuspense>
  );
};

const ThreadsList = ({ editor }: { editor: Editor | null }) => {
  const { threads } = useThreads({ query: { resolved: false } });

  return (
    <>
      <div className="anchored-threads">
        <AnchoredThreads editor={editor} threads={threads} />
      </div>

      <FloatingThreads editor={editor} threads={threads} className="floating-threads" />

      <FloatingComposer editor={editor} className="floating-composer" />
    </>
  );
};
