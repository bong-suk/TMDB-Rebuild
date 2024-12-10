import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useDebounce } from "./useDebounce";
import searchMovies from "../axios";

const SearchResults = () => {
  const [movieList, setMovieList] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get(`q`);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchMovies = async () => {
      if (debouncedSearchTerm) {
        try {
          const response = await searchMovies(debouncedSearchTerm);
          setMovieList(response);
        } catch (error) {
          console.error("영화 검색 중 오류 발생:", error);
        }
      }
    };

    fetchMovies();
  }, [debouncedSearchTerm]);

  return (
    <div className="search-container">
      {movieList && movieList.length > 0 ? (
        movieList.map((item) => (
          <MovieCard className="search-card" key={item.id} {...item} />
        ))
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};
export default SearchResults;
