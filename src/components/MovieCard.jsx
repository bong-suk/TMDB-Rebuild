import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = (item) => {
  return (
    <Link to={`/details/${item.id}`}>
      <div className="movie-card-main" style={{ width: "200px" }}>
        <img
          className="movie-poster-main"
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          alt="poster"
        ></img>
        <p className="movie-title-main">{item.title}</p>
        <p className="movie-rating-main">⭐{item.vote_average}</p>
      </div>
    </Link>
  );
};
export default MovieCard;
