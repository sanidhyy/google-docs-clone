'use client';

import { useMutation } from 'convex/react';
import { ConvexError } from 'convex/values';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { api } from '@/../convex/_generated/api';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { templates } from '@/constants/templates';
import { cn } from '@/lib/utils';

export const TemplateGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreating, setIsCreating] = useState(false);

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);

    create({ title, initialContent })
      .then((documentId) => router.push(`/documents/${documentId}`))
      .catch((error) => {
        const errorMessage = error instanceof ConvexError ? error.data : 'Something went wrong!';
        toast.error(errorMessage);
      })
      .finally(() => setIsCreating(false));
  };

  return (
    <div className="bg-[#f1f3f4]">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-16 py-6">
        <h3 className="font-medium">Start a new document</h3>

        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1.5 xl:basis-1/6 2xl:basis-[14.285714%]"
              >
                <div className={cn('flex aspect-[3/4] flex-col gap-y-2.5', isCreating && 'pointer-events-none opacity-50')}>
                  <button
                    disabled={isCreating}
                    onClick={() => onTemplateClick(template.label, template.initialContent)}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                    }}
                    className="flex size-full flex-col items-center justify-center gap-y-4 rounded-sm border bg-white bg-cover bg-center bg-no-repeat transition hover:border-blue-500 hover:bg-blue-50"
                  />

                  <p className="truncate text-sm font-medium">{template.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
