// components/SearchBar.tsx
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Search, Mic } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className="flex flex-1 border border-gray-300 rounded-l-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          className="w-full px-4 py-2 text-sm outline-none"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-gray-100 border border-l-0 border-gray-300 px-4 py-2 rounded-r-full hover:bg-gray-200"
        aria-label="Search"
      >
        <Search className="w-5 h-5 text-gray-700" />
      </button>

      {/* Mic icon only on larger screens */}
      <button
        className="hidden md:flex ml-3 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
        aria-label="Voice search"
      >
        <Mic className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default SearchBar;
