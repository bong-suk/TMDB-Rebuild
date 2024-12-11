import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const filterMovies = (movies) => {
  return movies
    .filter((movie) => !movie.adult)
    .map((movie) => ({
      ...movie,
      vote_average: movie.vote_average.toFixed(1),
    }));
};

export const getMovieList = async () => {
  try {
    const response = await instance.get(
      `/movie/popular?api_key=${apiKey}&language=ko-KR`
    );
    const filteredMovieList = filterMovies(response.data.results);
    return filteredMovieList;
  } catch (error) {
    console.error("영화 목록을 가져오는 중 오류 발생:", error);
    throw new Error("영화 목록을 가져오는 데 실패했습니다.");
  }
};

export const getMovieDetail = async (id) => {
  try {
    const [movieResponse, imagesResponse] = await Promise.all([
      instance.get(`/movie/${id}?api_key=${apiKey}&language=ko-KR`),
      instance.get(`/movie/${id}/images?api_key=${apiKey}`),
    ]);

    const movie = {
      ...movieResponse.data,
      images: imagesResponse.data,
      vote_average: movieResponse.data.vote_average.toFixed(1),
    };
    return movie;
  } catch (error) {
    console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
    throw new Error(
      "영화 상세 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};
export const searchMovies = async (searchTerm) => {
  try {
    const response = await instance.get(`/search/movie?query=${searchTerm}`);
    return response.data.results;
  } catch (error) {
    console.error("영화 검색 중 오류 발생:", error);
    throw new Error("영화 검색에 실패했습니다.");
  }
};

export const getMovieVideos = async (id) => {
  try {
    // 한국어 결과가 없을 경우 영어 결과도 가져오도록 수정
    const responseKo = await instance.get(
      `/movie/${id}/videos?api_key=${apiKey}&language=ko-KR`
    );

    // 한국어 결과가 없으면 영어 결과 가져오기
    if (responseKo.data.results.length === 0) {
      const responseEn = await instance.get(
        `/movie/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      return responseEn.data.results;
    }

    return responseKo.data.results;
  } catch (error) {
    console.error("영화 비디오를 가져오는 중 오류 발생:", error);
    throw new Error("영화 비디오를 가져오는 데 실패했습니다.");
  }
};

export const getMovieRating = async (id) => {
  try {
    const response = await instance.get(`/movie/${id}/release_dates`);
    const krRating = response.data.results.find((r) => r.iso_3166_1 === "KR");
    return krRating?.release_dates[0]?.certification || "";
  } catch (error) {
    console.error("Error fetching movie rating:", error);
    return "";
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await instance.get(`/discover/movie`, {
      params: {
        api_key: apiKey,
        language: "ko-KR",
        page: page,
        sort_by: "popularity.desc",
        adult: false,
        include_adult: false,
        "vote_count.gte": 100,
        "vote_average.gte": 5,
        with_original_language: "ko|en|ja",
        without_genres: "2781",
        certification_country: "KR",
        "certification.lte": "15",
        with_watch_monetization_types: "flatrate|free|ads",
        with_release_type: "2|3",
      },
    });
    const filteredMovieList = filterMovies(response.data.results);
    return filteredMovieList;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};
