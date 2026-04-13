
const favoritesContainer = document.getElementById("favoritesContainer");


window.addEventListener("load", loadFavorites);


function addToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  
const exists = favorites.some(item => item.id === movie.id);
  if (exists) {
    alert("Already in favorites");
    return;
  }

  //
  favorites.push({
    id: movie.id,
    title: movie.title,
    poster: movie.poster
  });

  
  localStorage.setItem("favorites", JSON.stringify(favorites));

  
  if (typeof loadFavorites === "function") {
    loadFavorites();
  }
}


function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites = favorites.filter(movie => String(movie.id) !== String(id));

  localStorage.setItem("favorites", JSON.stringify(favorites));

  loadFavorites();
}


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
    
    if (card.querySelector(".favorite-btn")) return;

    const title = card.querySelector("p").textContent;
    const img = card.querySelector("img").src;

    const button = document.createElement("button");
    button.textContent = "❤️ Favorite";
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


observer.observe(document.getElementById("movieContainer"), {
  childList: true
});