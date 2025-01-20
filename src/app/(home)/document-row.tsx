import { format } from 'date-fns';
import { Building2Icon, CircleUserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SiGoogledocs } from 'react-icons/si';

import type { Doc } from '@/../convex/_generated/dataModel';
import { TableCell, TableRow } from '@/components/ui/table';

import { DocumentMenu } from './document-menu';

interface DocumentRowProps {
  document: Doc<'documents'>;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter();

  const onNewTabClick = () => {
    window.open(`/documents/${document._id}`, '_blank');
  };

  const onRowClick = () => {
    router.push(`/documents/${document._id}`);
  };

  return (
    <TableRow onClick={onRowClick} className="cursor-pointer">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>

      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="hidden items-center gap-2 text-muted-foreground md:flex">
        {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
        {document.organizationId ? 'Organization' : 'Personal'}
      </TableCell>

      <TableCell className="hidden text-muted-foreground md:table-cell">
        {format(new Date(document._creationTime), 'MMM dd, yyyy')}
      </TableCell>

      <TableCell className="flex justify-end">
        <DocumentMenu documentId={document._id} title={document.title} onNewTab={onNewTabClick} />
      </TableCell>
    </TableRow>
  );
};
