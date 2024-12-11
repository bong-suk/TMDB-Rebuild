import { Route, Routes } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import MovieGrid from "./components/MovieGrid";
import MovieDetail from "./components/MovieDetail";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { getMovieList } from "./axios";
import SearchResults from "./components/Search";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const AppRoutes = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const data = await getMovieList();
        setMovieList(data);
      } catch (error) {
        console.error("영화 목록을 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieList();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <main>
              {loading ? (
                <div>로딩 중...</div>
              ) : (
                <>
                  <MovieGrid movies={movieList} />
                  <MovieCard movies={movieList} />
                </>
              )}
            </main>
          }
        />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
