import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import { getMovieVideos } from "../axios.jsx";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./MovieGrid.css";

const MovieGrid = ({ movies }) => {
  const navigate = useNavigate();
  const [movieVideos, setMovieVideos] = useState({});
  const iframeRefs = useRef({});

  useEffect(() => {
    const fetchVideos = async () => {
      const videoData = {};
      const topMovies = movies.slice(0, 5);

      for (const movie of topMovies) {
        try {
          const videos = await getMovieVideos(movie.id);
          if (videos && videos.length > 0) {
            const trailer = videos.find(
              (video) => video.type === "Trailer" || video.type === "Teaser"
            );
            if (trailer) {
              videoData[movie.id] = trailer.key;
            }
          }
        } catch (error) {
          console.error(`Error fetching video for movie ${movie.id}:`, error);
        }
      }
      setMovieVideos(videoData);
    };

    if (movies && movies.length > 0) {
      fetchVideos();
    }
  }, [movies]);

  return (
    <>
      <div className="featured-movies">
        <h2>인기 영화 예고편</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation, Autoplay]}
          loop={true}
          speed={1500}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="movie-swiper"
        >
          {Object.entries(movieVideos).map(([movieId, videoKey]) => {
            const movie = movies.find((m) => m.id.toString() === movieId);
            if (!movie) return null;

            return (
              <SwiperSlide key={movieId}>
                <div
                  className="trailer-card"
                  onClick={() => navigate(`/details/${movieId}`)}
                >
                  <div className="trailer-wrapper">
                    <iframe
                      ref={(el) => (iframeRefs.current[movieId] = el)}
                      src={`https://www.youtube.com/embed/${videoKey}?enablejsapi=1&controls=0&mute=1&playlist=${videoKey}&rel=0&autoplay=1`}
                      title={movie.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="movie-trailer"
                    />
                  </div>
                  <div className="trailer-info">
                    <h3>{movie.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
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
                <span>★ {Number(movie.vote_average).toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieGrid;
