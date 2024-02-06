const apiKey1 = "api_key=7032fdc1d31d67d59ad95ecbaa51a8bc";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const mains = document.getElementById("main");
const mains1 = document.getElementById("main1");
const mains2 = document.getElementById("main2");

const popularUrl = `${baseUrl}/discover/movie?sort_by=popularity.desc&${apiKey1}`;
const upcomingUrl = `${baseUrl}/movie/upcoming?${apiKey1}`;
const trendingUrl = `${baseUrl}/movie/top_rated?${apiKey1}`;
const searchUrl = `${baseUrl}/search/movie?${apiKey1}`;

getMovies(popularUrl, mains);
getMovies(upcomingUrl, mains1);
getMovies(trendingUrl, mains2);

function getMovies(url, container) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showMovies(data.results, container);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}

function showMovies(data, container) {
  container.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, backdrop_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = ` 
      <img src="${imgUrl + poster_path}" alt="${title}" />
      <div class="overview">
        <h4>${title}</h4>
        <span class="${getColor(vote_average)}">${vote_average}</span>
        <p class="overview-text">${overview}</p>
      </div>`;

    movieEl.addEventListener("click", () => {
      changePageBackground(backdrop_path);
    });

    container.appendChild(movieEl);
  });
}

function changePageBackground(backdropPath) {
  const header = document.getElementById("header");
  header.style.backgroundImage = `url(${imgUrl + backdropPath})`;
  header.style.backgroundSize = "cover";
  header.style.backgroundRepeat = "no-repeat";
}

const form = document.getElementById("form");
const search = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm) {
    searchMovies(searchTerm);
  } else {
    getMovies(popularUrl, mains);
    getMovies(upcomingUrl, mains1);
    getMovies(trendingUrl, mains2);
  }
});

async function searchMovies(searchTerm) {
  const searchPopularUrl = `${searchUrl}&query=${searchTerm}&${apiKey1}&page=1`;
  try {
    const response = await fetch(searchPopularUrl);
    const data = await response.json();
    showMovies(data.results, mains);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
}
