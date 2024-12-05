import { createContext, useState } from "react";
import movieListData from "../../data/movieListData.json";

const MovieListContext = createContext();

const MovieListProvider = ({ children }) => {
  const [movieList, setMovieList] = useState(movieListData.results);

  return (
    <MovieListContext.Provider value={{ movieList, setMovieList }}>
      {children}
    </MovieListContext.Provider>
  );
};

export { MovieListContext, MovieListProvider };
