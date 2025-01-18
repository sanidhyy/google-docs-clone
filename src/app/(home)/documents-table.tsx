import type { PaginationStatus } from 'convex/react';

import type { Doc } from '@/../convex/_generated/dataModel';
import { FullscreenLoader } from '@/components/fullscreen-loader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DocumentRow } from './document-row';

interface DocumentsTableProps {
  documents: Doc<'documents'>[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <FullscreenLoader className="min-h-full h-24" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
            </TableRow>
          </TableHeader>

          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No documents found.
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}

      <div className="flex items-center justify-center">
        <Button variant="ghost" size="sm" onClick={() => loadMore(5)} disabled={status === 'LoadingMore' || status !== 'CanLoadMore'}>
          {status === 'LoadingMore' || status === 'CanLoadMore' ? 'Load more' : 'End of results'}
        </Button>
      </div>
    </div>
  );
};
