import { useState } from "react";
import "./MovieDetail.css";
import movieDetailData from "../../data/movieDetailData.json";

const MovieDetail = () => {
  const [movieDetail] = useState(movieDetailData);
  return (
    <div className="movie-detail">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
      ></img>
      <div className="movie-info">
        <div className="movie-header">
          <p className="movie-title">{movieDetail.title}</p>
          <p className="movie-rating">{movieDetail.vote_average}</p>
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
