import { BsCloudCheck } from 'react-icons/bs';

import type { Id } from '@/../convex/_generated/dataModel';

interface DocumentInputProps {
  title: string;
  id: Id<'documents'>;
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">{title}</span>
      <BsCloudCheck />
    </div>
  );
};
