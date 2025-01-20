'use client';

import { useMutation } from 'convex/react';
import { ConvexError } from 'convex/values';
import { type PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface RenameDialogProps {
  documentId: Id<'documents'>;
  initialTitle: string;
}

export const RenameDialog = ({ documentId, initialTitle, children }: PropsWithChildren<RenameDialogProps>) => {
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    update({ id: documentId, title: title.trim() || 'Untitled Document' })
      .then(() => setOpen(false))
      .catch((error) => {
        const errorMessage = error instanceof ConvexError ? error.data : 'Something went wrong!';
        toast.error(errorMessage);
      })
      .finally(() => setIsUpdating(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>

            <DialogDescription>Enter a new name for this document.</DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Document"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isUpdating} onClick={(e) => e.stopPropagation()}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isUpdating || !title.trim()} onClick={(e) => e.stopPropagation()}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
