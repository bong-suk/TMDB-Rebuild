import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../axios.jsx";
import MovieCard from "./MovieCard";
import "./Search.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const results = await searchMovies(query);
        setSearchResults(results);
      } catch (error) {
        console.error("검색 결과를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <div>검색 결과를 불러오는 중...</div>;
  }

  return (
    <div>
      <h2>'{query}' 검색 결과</h2>
      {searchResults && searchResults.length > 0 ? (
        <MovieCard movies={searchResults} />
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default SearchResults;
