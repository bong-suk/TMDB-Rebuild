import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = (item) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/details");
  };
  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        alt="poster"
      ></img>
      <p className="movie-title">{item.title}</p>
      <p className="mivie-rating">{item.vote_average}</p>
    </div>
  );
};
export default MovieCard;
