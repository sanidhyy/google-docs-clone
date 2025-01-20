'use client';

import { useStatus } from '@liveblocks/react/suspense';
import { useMutation } from 'convex/react';
import { ConvexError } from 'convex/values';
import { Loader2Icon } from 'lucide-react';
import { useRef, useState } from 'react';
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { toast } from 'sonner';

import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';
import { useDebounce } from '@/hooks/use-debounce';

interface DocumentInputProps {
  title: string;
  id: Id<'documents'>;
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus();
  const [value, setValue] = useState(title);

  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({ id, title: newValue })
      .catch((error) => {
        const errorMessage = error instanceof ConvexError ? error.data : 'Something went wrong!';
        toast.error(errorMessage);
      })
      .finally(() => setIsPending(false));
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({ id, title: value })
      .then(() => setIsEditing(false))
      .catch((error) => {
        const errorMessage = error instanceof ConvexError ? error.data : 'Something went wrong!';
        toast.error(errorMessage);
      })
      .finally(() => setIsPending(false));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setValue(newValue);
    debouncedUpdate(newValue);
  };

  const showLoader = isPending || status === 'connecting' || status === 'reconnecting';
  const showError = status === 'disconnected';

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">{value || ' '}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 truncate bg-transparent px-1.5 text-lg text-black"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);

            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="cursor-pointer truncate px-1.5 text-lg"
        >
          {title}
        </span>
      )}

      {showError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && <BsCloudCheck />}
      {showLoader && <Loader2Icon className="size-4 animate-spin text-muted-foreground" />}
    </div>
  );
};
