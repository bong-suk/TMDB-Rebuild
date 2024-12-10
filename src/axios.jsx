import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const getMovieList = async () => {
  try {
    const response = await instance.get(
      `/movie/popular?api_key=${apiKey}&language=ko-KR`
    );
    const filteredMovieList = response.data.results
      .filter((movie) => !movie.adult)
      .map((movie) => ({
        ...movie,
        vote_average: movie.vote_average.toFixed(1),
      }));
    return filteredMovieList;
  } catch (error) {
    console.error("영화 목록을 가져오는 중 오류 발생:", error);
    throw new Error("영화 목록을 가져오는 데 실패했습니다.");
  }
};

export const getMovieDetail = async (id) => {
  try {
    const response = await instance.get(
      `/movie/${id}?api_key=${apiKey}&language=ko-KR`
    );
    const movie = {
      ...response.data,
      vote_average: response.data.vote_average.toFixed(1),
    };
    return movie;
  } catch (error) {
    console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
    throw new Error(
      "영화 상세 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};

export default async function searchMovies(searchTerm) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
  );
  const data = await response.json();
  return data.results;
}
