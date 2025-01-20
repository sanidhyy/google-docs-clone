import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface FullscreenLoaderProps {
  label?: string;
  className?: string;
}

export const FullscreenLoader = ({ label, className }: FullscreenLoaderProps) => {
  return (
    <div className={cn('flex min-h-screen flex-col items-center justify-center gap-2', className)}>
      <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      {!!label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
