import Link from 'next/link';

import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-emerald-500">Hello, World!</h1>
      <Button size="lg" asChild>
        <Link href="/documents/123">Click me</Link>
      </Button>
    </div>
  );
};

export default HomePage;
