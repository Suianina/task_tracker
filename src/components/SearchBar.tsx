interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
}

export const SearchBar = ({ value, onSearch }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onSearch(newValue);
  };

  const handleClear = () => {
    onSearch("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={value}
        onChange={handleChange}
        className="search-input"
      />
      {value && (
        <button
          onClick={handleClear}
          className="search-clear"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};
