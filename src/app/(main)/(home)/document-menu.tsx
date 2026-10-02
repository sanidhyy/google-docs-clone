import { ExternalLinkIcon, FilePenIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';

import type { Id } from '@/../convex/_generated/dataModel';
import { RemoveDialog } from '@/components/remove-dialog';
import { RenameDialog } from '@/components/rename-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface DocumentMenuProps {
  documentId: Id<'documents'>;
  title: string;
  onNewTab: () => void;
}

export const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button onClick={(e) => e.stopPropagation()} variant="ghost" size="icon" className="rounded-full">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
            <FilePenIcon className="size-4" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>

        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
            <Trash2Icon className="size-4" />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onNewTab();
          }}
        >
          <ExternalLinkIcon className="size-4" /> Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
