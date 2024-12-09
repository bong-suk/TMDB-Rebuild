import { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieDetail(id);
        setMovieDetail(data);
      } catch (error) {
        console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
        setError(
          "영화 상세 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러: {error}</div>;
  }
  return (
    <div className="movie-detail">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
      ></img>
      <div className="movie-info">
        <div className="movie-header">
          <p className="movie-title">{movieDetail.title}</p>
          <p className="movie-rating">⭐{movieDetail.vote_average}</p>
        </div>
        <p className="movie-genres">
          {movieDetail.genres.map((genre) => {
            return (
              <span className="movie-genre" key={genre.id}>
                {genre.name}
              </span>
            );
          })}
        </p>
        <p className="movie-overview">{movieDetail.overview}</p>
      </div>
    </div>
  );
};
export default MovieDetail;
