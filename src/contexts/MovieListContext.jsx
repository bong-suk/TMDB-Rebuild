import { createContext, useEffect, useState } from "react";
import { getMovieList } from "../axios";

const MovieListContext = createContext();

const MovieListProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieList = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieList();
        setMovieList(data);
      } catch (error) {
        console.error("영화 목록을 가져오는 중 오류 발생:", error);
        setError("영화 목록을 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieList();
  }, []);

  return (
    <MovieListContext.Provider value={{ movieList, setMovieList }}>
      {children}
    </MovieListContext.Provider>
  );
};

export { MovieListContext, MovieListProvider };
