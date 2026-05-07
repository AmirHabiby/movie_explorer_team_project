console.log("Main JS Loaded");





const sampleMovies = [

    {

        title: "Inception",

        year: "2010",

        poster: "https://via.placeholder.com/300x400"

    },

    {

        title: "Interstellar",

        year: "2014",

        poster: "https://via.placeholder.com/300x400"

    }

];



// Display Movies

function displayMovies(movies) {

    const container = document.getElementById("moviesContainer");

    container.innerHTML = "";



    movies.forEach(movie => {

        const card = document.createElement("div");

        card.classList.add("movie-card");



        card.innerHTML = `

            <img src="${movie.poster}" alt="${movie.title}">

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>${movie.year}</p>

            </div>

        `;



        container.appendChild(card);

    });

}





displayMovies(sampleMovies);





console.log("Favorites JS Loaded");



function loadFavorites() {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const container = document.getElementById("favoritesContainer");



    container.innerHTML = "";



    favorites.forEach(movie => {

        const card = document.createElement("div");

        card.classList.add("movie-card");



        card.innerHTML = `

            <img src="${movie.poster}" alt="${movie.title}">

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>${movie.year}</p>

            </div>

        `;



        container.appendChild(card);

    });

}



// Load on page start

loadFavorites();