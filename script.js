const API_KEY = "16a1680d548eee0d6414390fc83c3878";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieContainer = document.getElementById("movieContainer");
const movieModal = document.getElementById("movieModal");

// ===============================
// FETCH TRENDING MOVIES
// ===============================
fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => displayMovies(data.results))
  .catch(err => console.error(err));

// ===============================
// DISPLAY MOVIES (HOME PAGE UI)
// ===============================
function displayMovies(movies) {
  movieContainer.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");

    // IMPORTANT: match your CSS/UI
    card.classList.add("movie-card");

    const poster = movie.poster_path
      ? IMG_URL + movie.poster_path
      : "https://via.placeholder.com/200x300";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
    `;

    // click opens modal
    card.addEventListener("click", () => getMovieDetails(movie.id));

    movieContainer.appendChild(card);
  });
}

// ===============================
// FETCH SINGLE MOVIE DETAILS
// ===============================
function getMovieDetails(id) {
  fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(movie => showMovieDetails(movie))
    .catch(err => console.error(err));
}

// ===============================
// SHOW MODAL DETAILS
// ===============================
function showMovieDetails(movie) {
  document.getElementById("movieTitle").textContent = movie.title;

  document.getElementById("moviePoster").src = movie.poster_path
    ? IMG_URL + movie.poster_path
    : "https://via.placeholder.com/200x300";

  document.getElementById("movieDescription").textContent =
    movie.overview || "No description available.";

  document.getElementById("movieRating").textContent =
    movie.vote_average ? movie.vote_average.toFixed(1) + "/10" : "N/A";

  document.getElementById("movieDate").textContent =
    movie.release_date || "Unknown";

  movieModal.classList.add("show");

  // ===============================
  // ADD TO FAVORITES BUTTON
  // ===============================
  const btn = document.getElementById("modalFavoriteBtn");

  btn.onclick = () => {
    addToFavorites({
      id: String(movie.id),
      title: movie.title,
      poster: movie.poster_path
        ? IMG_URL + movie.poster_path
        : "https://via.placeholder.com/200x300"
    });
  };
}

// ===============================
// CLOSE MODAL
// ===============================
document.getElementById("closeBtn").onclick = () => {
  movieModal.classList.remove("show");
};

// close when clicking outside modal
window.onclick = (event) => {
  if (event.target === movieModal) {
    movieModal.classList.remove("show");
  }
};

// ===============================
// ADD FAVORITES BUTTON (FROM FAVORITES.JS)
// ===============================
// NOTE: this works because favorites.js is also loaded
// ===============================