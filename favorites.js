const favoritesContainer = document.getElementById("favoritesContainer");

window.addEventListener("load", loadFavorites);

// ✅ Add to Favorites
function addToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.some(item => item.id === movie.id);
  if (exists) {
    alert("Already in favorites");
    return;
  }

  favorites.push({
    id: movie.id,
    title: movie.title,
    poster: movie.poster
  });

  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

// ✅ Remove from Favorites
function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites = favorites.filter(movie => String(movie.id) !== String(id));

  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

// ✅ Load Favorites UI
function loadFavorites() {
  if (!favoritesContainer) return;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesContainer.innerHTML = "";

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  favorites.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card"); // ✅ MATCHES YOUR UI

    card.innerHTML = `
      <img src="${movie.poster || 'https://via.placeholder.com/200x300'}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <button class="favorite-btn" onclick="removeFromFavorites('${movie.id}')">
        Remove
      </button>
    `;

    favoritesContainer.appendChild(card);
  });
}

// ✅ Observe movie cards and add Favorite button automatically
const observer = new MutationObserver(() => {
  const cards = document.querySelectorAll("#movieContainer .movie-card");

  cards.forEach(card => {

    // prevent duplicate buttons
    if (card.querySelector(".favorite-btn")) return;

    const title = card.querySelector("h3")?.textContent;
    const img = card.querySelector("img")?.src;

    const button = document.createElement("button");
    button.textContent = "Add to Favorites";
    button.classList.add("favorite-btn");

    button.onclick = (e) => {
      e.stopPropagation();

      addToFavorites({
        id: title + img,
        title: title,
        poster: img
      });
    };

    card.appendChild(button);
  });
});

// Start observing
const movieContainer = document.getElementById("movieContainer");
if (movieContainer) {
  observer.observe(movieContainer, {
    childList: true
  });
}