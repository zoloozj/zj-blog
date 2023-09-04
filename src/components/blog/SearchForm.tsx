"use client";
import { FunctionComponent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
interface SearchProps {
  searchValues?: string 
}

const SearchForm: FunctionComponent<SearchProps> = ({searchValues}) => {
  const [value, setValue] = useState(searchValues || '');
  const [searchValue, setSearchValue] = useState(searchValues || '');

  useUpdateSearchParams([{ key: "searchValues", value: searchValue }]);

  const onSearch = (e: any) => {
    if (e.key === "Enter") {
      setSearchValue(value);
    }
  };

  return (
    <div className="relative max-w-lg my-4">
      <input
        aria-label="Хайлт..."
        type="text"
        onKeyUp={onSearch}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Хайлт..."
        value={value}
        className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
      />
      <MagnifyingGlassIcon onClick={onSearch} className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300 cursor-pointer" />
    </div>
  );
};

export default SearchForm;