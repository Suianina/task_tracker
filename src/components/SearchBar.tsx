import { useState, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
}

export const SearchBar = ({ value, onSearch }: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setLocalValue("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks by title or description..."
        value={localValue}
        onChange={handleChange}
      />
      {localValue && (
        <button
          type="button"
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};
