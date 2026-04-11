// movie id from url
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

fetch("movies.json")
  .then(res => res.json())
  .then(data => {
    const movie = data.find(m => m.id == movieId);
    if (movie) {
      document.getElementById("details-poster").src = movie.poster;
      document.getElementById("details-title").textContent = movie.title;
      document.getElementById("details-description").textContent = movie.description;
      document.getElementById("details-rating").textContent = movie.rating;
      document.getElementById("details-release").textContent = movie.releaseDate;
    } else {
      document.querySelector(".info-section").innerHTML = "<p>Movie not found.</p>";
    }
  })
  .catch(err => console.error("Error loading movie data:", err));
