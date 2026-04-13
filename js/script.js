// ICOG Movie site - Main UI Logic

const movieContainer = document.getElementById("movieContainer");
const movieModal = document.getElementById("movieModal");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filterBtns = document.querySelectorAll(".filter-btn");

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    loadMovies();
});

// Load Trending Movies
async function loadMovies(type = 'movie') {
    movieContainer.innerHTML = '<div class="loader">Loading...</div>';
    const movies = await api.fetchTrending(type);
    displayMovies(movies);
}

// Display Movies in Grid
function displayMovies(movies) {
    movieContainer.innerHTML = "";
    if (!movies || movies.length === 0) {
        movieContainer.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("card");

        const poster = movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Poster";
        const title = movie.title || movie.name;
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
        const date = movie.release_date || movie.first_air_date || "Unknown";

        card.innerHTML = `
            <img src="${poster}" alt="${title}">
            <div class="card-overlay">
                <button class="btn-primary">View Details</button>
            </div>
            <div class="card-info">
                <h3 class="card-title">${title}</h3>
                <div class="card-meta">
                    <span class="card-rating">★ ${rating}</span>
                    <span>${date.split('-')[0]}</span>
                </div>
            </div>
            <button class="btn-favorite" title="Add to Watchlist">❤️</button>
        `;

        // Event Listeners
        card.querySelector(".btn-primary").onclick = (e) => {
            e.stopPropagation();
            getMovieDetails(movie.id, movie.title ? 'movie' : 'tv');
        };

        card.addEventListener("click", () => getMovieDetails(movie.id, movie.title ? 'movie' : 'tv'));

        card.querySelector(".btn-favorite").onclick = (e) => {
            e.stopPropagation();
            addToFavorites({
                id: String(movie.id),
                title: title,
                poster: poster,
                rating: rating
            });
        };

        movieContainer.appendChild(card);
    });
}

// Search Logic
const handleSearch = async () => {
    const query = searchInput.value.trim();
    if (query) {
        movieContainer.innerHTML = '<div class="loader">Searching...</div>';
        const results = await api.searchMovies(query);
        displayMovies(results);
    }
};

searchBtn.onclick = handleSearch;
searchInput.onkeypress = (e) => {
    if (e.key === 'Enter') handleSearch();
};

// Filter Logic
filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        loadMovies(btn.dataset.type);
    };
});

// Modal Details Logic
async function getMovieDetails(id, type) {
    const movie = await api.fetchMovieDetails(id, type);
    if (movie) showMovieDetails(movie, type);
}

function showMovieDetails(movie, type) {
    const title = movie.title || movie.name;
    const poster = movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Poster";
    
    document.getElementById("movieTitle").textContent = title;
    document.getElementById("moviePoster").src = poster;
    document.getElementById("movieDescription").textContent = movie.overview;
    document.getElementById("movieRating").textContent = "★ " + (movie.vote_average ? movie.vote_average.toFixed(1) : "N/A");
    document.getElementById("movieDate").textContent = "Release: " + (movie.release_date || movie.first_air_date || "Unknown");

    movieModal.classList.add("show");

    const btn = document.getElementById("modalFavoriteBtn");
    btn.onclick = () => {
        addToFavorites({
            id: String(movie.id),
            title: title,
            poster: poster,
            rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"
        });
    };
}

// Modal Close
document.getElementById("closeBtn").onclick = () => {
    movieModal.classList.remove("show");
};

window.onclick = (event) => {
    if (event.target === movieModal) {
        movieModal.classList.remove("show");
    }
};