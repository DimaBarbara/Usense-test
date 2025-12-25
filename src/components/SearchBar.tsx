import React, { useState, useEffect, type FC } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative max-w-2xl mx-auto group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search size={20} className="text-slate-500 group-focus-within:text-purple-400 transition-colors" />
      </div>
      <input
        type="text"
        className="w-full pl-12 pr-12 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-lg shadow-2xl placeholder:text-slate-500 text-white"
        placeholder="Search for amazing animations..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default React.memo(SearchBar);