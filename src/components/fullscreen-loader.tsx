import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface FullscreenLoaderProps {
  label?: string;
  className?: string;
}

export const FullscreenLoader = ({ label, className }: FullscreenLoaderProps) => {
  return (
    <div className={cn('min-h-screen flex flex-col items-center justify-center gap-2', className)}>
      <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
      {!!label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
