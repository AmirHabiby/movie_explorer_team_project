// ICOG Movie site - Details Page Logic

const API_KEY = "16a1680d548eee0d6414390fc83c3878";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/original"; // Use original for details

document.addEventListener("DOMContentLoaded", () => {
    // Basic fallback if api.js isn't linked here
    // But movie-details.html doesn't have api.js yet. 
    // I should add it there too for consistency or just keep it simple.
    // Let's add api.js to movie-details.html as well.
    loadMovieDetails();
});

async function loadMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const type = urlParams.get('type') || 'movie';

    if (!movieId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/${type}/${movieId}?api_key=${API_KEY}`);
        const movie = await response.json();
        renderDetails(movie);
    } catch (error) {
        console.error("Error loading movie details:", error);
    }
}

function renderDetails(movie) {
    const title = movie.title || movie.name;
    const poster = movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Poster";
    
    document.getElementById("details-poster").src = poster;
    document.getElementById("details-title").textContent = title;
    document.getElementById("details-description").textContent = movie.overview;
    document.getElementById("details-rating").textContent = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
    document.getElementById("details-release").textContent = movie.release_date || movie.first_air_date || "Unknown";

    const btn = document.getElementById("detailsFavoriteBtn");
    btn.onclick = () => {
        // We need to define addToFavorites here or ensure favorites.js is loaded
        if (typeof addToFavorites === 'function') {
            addToFavorites({
                id: String(movie.id),
                title: title,
                poster: poster,
                rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"
            });
        }
    };
}
