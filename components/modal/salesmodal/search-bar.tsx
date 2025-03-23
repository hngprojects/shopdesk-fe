// components/SearchBar.tsx
import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../redux/salesSlice';
import { RootState } from '../redux/store';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const dispatch = useDispatch();
  const searchText = useSelector((state: RootState) => state.sales.searchText);

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search items by name"
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
        className="w-full h-12 rounded-lg pl-10 pr-4 border border-gray-300 focus:ring-2 focus:ring-[#CCEBDB] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800"
      />
      <Search className="absolute left-3 top-3 text-gray-400" size={20} />
    </div>
  );
};

export default SearchBar;