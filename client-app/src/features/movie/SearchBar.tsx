import { observer } from "mobx-react-lite";
import { ChangeEvent, useRef, useState } from "react";
import { useStore } from "../../app/stores/store";
import "./Searchbar.Module.css";

const SearchBar = observer(() => {
  const { movieStore, movieListStore, userStore } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedLoadMovies = useDebounced(
    (term: string) => movieStore.loadMovies(term),
    1000
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    movieStore.setLoading(true);
    setSearchTerm(e.target.value);
    debouncedLoadMovies(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitSearch(searchTerm);
    }
  };

  const submitSearch = async (query: string) => {
    await movieStore.submitMovies(query);
    movieStore.loadMovies(query);
  };

  function useDebounced(callback: (...args: any[]) => any, delay: number) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        movieStore.setLoading(false);
      }, delay);
    };
  }
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        className="search-bar"
      />
      <div className="search-bar-tooltip">
        Can't find what your looking for?
        <br />
        Try pressing enter
      </div>
    </div>
  );
});

export default SearchBar;
