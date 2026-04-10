// Get containers
const favoritesContainer = document.getElementById("favoritesContainer");

// Load favorites on page load
window.addEventListener("load", loadFavorites);

// Add to favorites
function addToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // prevent duplicates
const exists = favorites.some(item => item.id === movie.id);
  if (exists) {
    alert("Already in favorites");
    return;
  }

  // Add movie
  favorites.push({
    id: movie.id,
    title: movie.title,
    poster: movie.poster
  });

  // Save back to localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Reload favorites UI (only if function exists)
  if (typeof loadFavorites === "function") {
    loadFavorites();
  }
}

// Remove from favorites
function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites = favorites.filter(movie => String(movie.id) !== String(id));

  localStorage.setItem("favorites", JSON.stringify(favorites));

  loadFavorites();
}

// Display favorites
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
    card.classList.add("card");

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <p style="text-align:center; margin:10px 0;">${movie.title}</p>
      <button class="favorite-btn" onclick="removeFromFavorites('${movie.id}')">
        Remove
      </button>
    `;

    favoritesContainer.appendChild(card);
  });
}


const observer = new MutationObserver(() => {
  const cards = document.querySelectorAll("#movieContainer .card");

  cards.forEach((card, index) => {
    // avoid duplicate buttons
    if (card.querySelector(".favorite-btn")) return;

    const title = card.querySelector("p").textContent;
    const img = card.querySelector("img").src;

    const button = document.createElement("button");
    button.textContent = "❤️ Favorite";
    button.classList.add("favorite-btn");

    button.onclick = (e) => {
      e.stopPropagation(); // prevent modal opening

      addToFavorites({
            id: title + img,
  title: title,
  poster: img
      });

      
    };

    card.appendChild(button);
  });
});

// start observing
observer.observe(document.getElementById("movieContainer"), {
  childList: true
});