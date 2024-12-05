import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = (item) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card-main" onClick={() => navigate("/details")}>
      <img
        className="movie-poster-main"
        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        alt="poster"
      ></img>
      <p className="movie-title-main">{item.title}</p>
      <p className="movie-rating-main">{item.vote_average}</p>
    </div>
  );
};
export default MovieCard;
