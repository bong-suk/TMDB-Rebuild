import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getPopularMovies } from "../axios"; // TMDb API 호출 함수
import "./MovieCard.css";

const MovieCard = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 영화 데이터 가져오기
  const fetchMovies = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const newMovies = await getPopularMovies(page);

      // 장르 ID로 필터링
      const filteredMovies = newMovies.filter((movie) => {
        // 성인/에로 장르 제외 (장르 ID: 2781)
        return !movie.genre_ids?.includes(2781);
      });

      setMovies((prev) => {
        const uniqueMovies = [...prev];
        filteredMovies.forEach((movie) => {
          if (!uniqueMovies.find((m) => m.id === movie.id)) {
            uniqueMovies.push(movie);
          }
        });
        return uniqueMovies;
      });
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("영화 데이터 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  // 초기 데이터 로딩
  useEffect(() => {
    fetchMovies();
  }, []);

  // 스크롤 이벤트 핸들러 (쓰로틀링 적용)
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        // 페이지 하단에 도달했는지 체크
        if (scrollTop + clientHeight >= scrollHeight - 300) {
          fetchMovies();
        }
        timeoutId = null;
      }, 500); // 500ms 쓰로틀링
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fetchMovies]);

  return (
    <div className="movies-container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={`movie-${movie.id}`}
            className="movie-card"
            onClick={() => navigate(`/details/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-rating">
                <span>★ {movie.vote_average}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="loading">로딩 중...</div>}
    </div>
  );
};

export default MovieCard;
