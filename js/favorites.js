// ICOG Movie site - Watchlist Logic

const favoritesContainer = document.getElementById("favoritesContainer");

// Initial Load
window.addEventListener("load", loadFavorites);

// Add to Favorites
function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.some(item => item.id === movie.id);
    if (exists) {
        showToast("Already in your watchlist!");
        return;
    }

    favorites.push({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating
    });

    localStorage.setItem("favorites", JSON.stringify(favorites));
    showToast("Added to watchlist!");
    loadFavorites();
}

// Remove from Favorites
function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(movie => String(movie.id) !== String(id));
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
    showToast("Removed from watchlist");
}

// Load and Display Favorites
function loadFavorites() {
    if (!favoritesContainer) return;

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-state">
                <p>Your watchlist is empty. Start exploring!</p>
            </div>
        `;
        return;
    }

    favorites.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="card-overlay">
                <button class="btn-primary" onclick="removeFromFavorites('${movie.id}')">Remove</button>
            </div>
            <div class="card-info">
                <h3 class="card-title">${movie.title}</h3>
                <div class="card-meta">
                    <span class="card-rating">★ ${movie.rating}</span>
                </div>
            </div>
        `;
        favoritesContainer.appendChild(card);
    });
}

// Simple Toast Helper
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast glass";
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }, 100);
}