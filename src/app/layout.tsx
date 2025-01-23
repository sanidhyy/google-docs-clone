import '@liveblocks/react-tiptap/styles.css';
import '@liveblocks/react-ui/styles.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';

import { ConvexClientProvider } from '@/components/convex-client-provider';
import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#4f46e5',
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={cn('antialiased', inter.className)}>
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster theme="light" closeButton richColors />

            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
