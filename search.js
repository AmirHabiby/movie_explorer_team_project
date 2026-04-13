//  DEBOUNCE FUNCTION
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

//  MOVIE DATA
const movies = [
  { id: 1, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Drama", poster: "https://picsum.photos/seed/movie1/300/450" },
  { id: 2, title: "The Godfather", year: 1972, rating: 9.2, genre: "Crime", poster: "https://picsum.photos/seed/movie2/300/450" },
  { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action", poster: "https://picsum.photos/seed/movie3/300/450" },
  { id: 4, title: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Crime", poster: "https://picsum.photos/seed/movie4/300/450" },
  { id: 5, title: "Forrest Gump", year: 1994, rating: 8.8, genre: "Drama", poster: "https://picsum.photos/seed/movie5/300/450" },
  { id: 6, title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi", poster: "https://picsum.photos/seed/movie6/300/450" },
  { id: 7, title: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi", poster: "https://picsum.photos/seed/movie7/300/450" },
  { id: 8, title: "Interstellar", year: 2014, rating: 8.6, genre: "Sci-Fi", poster: "https://picsum.photos/seed/movie8/300/450" },
  { id: 9, title: "Fight Club", year: 1999, rating: 8.8, genre: "Drama", poster: "https://picsum.photos/seed/movie9/300/450" },
  { id: 10, title: "Goodfellas", year: 1990, rating: 8.7, genre: "Crime", poster: "https://picsum.photos/seed/movie10/300/450" },
  { id: 11, title: "The Silence of the Lambs", year: 1991, rating: 8.6, genre: "Thriller", poster: "https://picsum.photos/seed/movie11/300/450" },
  { id: 12, title: "Saving Private Ryan", year: 1998, rating: 8.6, genre: "War", poster: "https://picsum.photos/seed/movie12/300/450" },
];

//  DOM ELEMENTS 
let searchInput;
let clearButton;
let movieGrid;
let resultsCount;
let noResults;

//INITIALIZE APP 
function init() {
  // Get DOM elements
  searchInput = document.getElementById("searchInput");
  clearButton = document.getElementById("clearButton");
  movieGrid = document.getElementById("movieGrid");
  resultsCount = document.getElementById("resultsCount");
  noResults = document.getElementById("noResults");

  // Create debounced search function (300ms delay)
  const debouncedSearch = debounce(handleSearch, 300);

  // Event listeners
  searchInput.addEventListener("input", function (e) {
    const value = e.target.value;
    toggleClearButton(value);
    debouncedSearch(value);
  });

  clearButton.addEventListener("click", clearSearch);

  // Initial render
  renderMovies(movies);
  updateResultsCount(movies.length);
}

// SEARCH FUNCTIONALITY 
function handleSearch(searchTerm) {
  const term = searchTerm.toLowerCase().trim();

  if (!term) {
    renderMovies(movies);
    updateResultsCount(movies.length);
    return;
  }

  // Filter movies by title, year, rating, or genre
  const filtered = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(term) ||
      movie.year.toString().includes(term) ||
      movie.rating.toString().includes(term) ||
      movie.genre.toLowerCase().includes(term)
    );
  });

  renderMovies(filtered);
  updateResultsCount(filtered.length, term);
}

//  RENDER FUNCTIONS 
function renderMovies(movieList) {
  // Clear the grid
  movieGrid.innerHTML = "";

  // Show/hide no results message
  if (movieList.length === 0) {
    noResults.style.display = "block";
    movieGrid.style.display = "none";
    return;
  }

  noResults.style.display = "none";
  movieGrid.style.display = "grid";

  // Create movie cards
  movieList.forEach((movie) => {
    const card = createMovieCard(movie);
    movieGrid.appendChild(card);
  });
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <div class="movie-meta">
        <span class="movie-year">${movie.year}</span>
        <span class="movie-genre">${movie.genre}</span>
      </div>
      <div class="movie-rating">
        <span class="star">★</span>
        <span>${movie.rating}</span>
      </div>
    </div>
  `;
  return card;
}

function updateResultsCount(count, searchTerm = "") {
  if (searchTerm) {
    resultsCount.textContent = `${count} result${count !== 1 ? "s" : ""} for "${searchTerm}"`;
  } else {
    resultsCount.textContent = `${count} movie${count !== 1 ? "s" : ""}`;
  }
}

// UTILITY FUNCTIONS 
function toggleClearButton(value) {
  if (value) {
    clearButton.style.display = "block";
  } else {
    clearButton.style.display = "none";
  }
}

function clearSearch() {
  searchInput.value = "";
  clearButton.style.display = "none";
  renderMovies(movies);
  updateResultsCount(movies.length);
  searchInput.focus();
}

//  START THE APP 
document.addEventListener("DOMContentLoaded", init);