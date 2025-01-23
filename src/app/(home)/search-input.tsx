'use client';

import { SearchIcon, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParam } from '@/hooks/use-search-param';

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState(search);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    setSearch('');
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="hidden flex-1 items-center justify-center sm:flex">
      <form onSubmit={handleSubmit} className="relative w-full max-w-[720px]">
        <Input
          type="search"
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder="Search"
          className="h-[48px] w-full rounded-full border-none bg-[#f0f4f8] px-14 placeholder:text-neutral-800 focus:bg-white focus-visible:shadow-[0_1px_1px_0_rgba(65,_69,_73,_0.3),_0_1px_3px_1px_rgba(65,_69,_73,_0.15)] focus-visible:ring-0 md:text-base"
        />

        <Button type="submit" variant="ghost" size="icon" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5">
          <SearchIcon />
        </Button>

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};
