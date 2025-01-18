import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { SearchInput } from './search-input';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between size-full">
      <Link href="/" className="mr-6">
        <div className="flex gap-3 items-center shrink-0">
          <Image src="/logo.svg" alt="Docs Logo" width={36} height={36} />

          <h3 className="text-2xl font-extrabold text-indigo-600">DOCS</h3>
        </div>
      </Link>
      <SearchInput />
      <UserButton />
    </nav>
  );
};
