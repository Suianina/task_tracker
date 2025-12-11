import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Пошук задач за назвою або описом..."
        value={searchQuery}
        onChange={handleChange}
        className="search-input"
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="search-clear"
          aria-label="Очистити пошук"
        >
          ×
        </button>
      )}
    </div>
  );
};

