import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Navbar } from './navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 inset-x-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>

      <div className="mt-16">
        <h1 className="text-4xl font-bold text-emerald-500">Hello, World!</h1>

        <Button size="lg" asChild>
          <Link href="/documents/123">Click me</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
