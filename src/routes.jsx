import { Route, Routes } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import { MovieListContext } from "./contexts/MovieListContext";
import { useContext } from "react";
import Layout from "./components/Layout";

const AppRoutes = () => {
  const { movieList } = useContext(MovieListContext);
  const filteredMovieList = movieList.filter((movie) => !movie.adult);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <main>
              {filteredMovieList.map((item) => {
                return <MovieCard key={item.id} {...item} />;
              })}
            </main>
          }
        />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
