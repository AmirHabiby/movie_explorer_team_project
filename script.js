const API_KEY = "16a1680d548eee0d6414390fc83c3878";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieContainer = document.getElementById("movieContainer");
const movieModal = document.getElementById("movieModal");


fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => displayMovies(data.results))
  .catch(err => console.error(err));

function displayMovies(movies) {
  movieContainer.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card");

    const poster = movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/150x225";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}">
      <p style="text-align:center; margin:10px 0;">${movie.title}</p>
    `;

    card.addEventListener("click", () => getMovieDetails(movie.id));
    movieContainer.appendChild(card);
  });
}
function getMovieDetails(id) {
  fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(movie => showMovieDetails(movie))
    .catch(err => console.error(err));
}

function showMovieDetails(movie) {
  document.getElementById("movieTitle").textContent = movie.title;
  document.getElementById("moviePoster").src = IMG_URL + movie.poster_path;
  document.getElementById("movieDescription").textContent = movie.overview;
  document.getElementById("movieRating").textContent = movie.vote_average.toFixed(1) + "/10";
  document.getElementById("movieDate").textContent = movie.release_date;

  movieModal.classList.add("show");

  const btn = document.getElementById("modalFavoriteBtn");

  btn.onclick = () => {
    addToFavorites({
      id: String(movie.id), 
      title: movie.title,
      poster: IMG_URL + movie.poster_path
    });
  };
}
document.getElementById("closeBtn").onclick = () => {
  movieModal.classList.remove("show");
};

window.onclick = (event) => {
  if (event.target === movieModal) {
    movieModal.classList.remove("show");
  }
};