const API_KEY = "16a1680d548eee0d6414390fc83c3878";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const api = {
  async fetchTrending(type = 'movie') {
    try {
      const response = await fetch(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching trending:", error);
      return [];
    }
  },

  async fetchMovieDetails(id, type = 'movie') {
    try {
      const response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching details:", error);
      return null;
    }
  },

  async searchMovies(query) {
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error searching movies:", error);
      return [];
    }
  }
};
