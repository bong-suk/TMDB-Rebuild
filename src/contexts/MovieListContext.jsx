import { createContext, useEffect, useState } from "react";
import { getMovieList } from "../axios";

const MovieListContext = createContext();

const MovieListProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const data = await getMovieList();
        setMovieList(data);
      } catch (error) {
        console.error("영화 목록을 가져오는 중 오류 발생:", error);
      }
    };
    fetchMovieList();
  }, []);

  return (
    <MovieListContext.Provider value={{ movieList }}>
      {children}
    </MovieListContext.Provider>
  );
};

export { MovieListContext, MovieListProvider };
