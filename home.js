const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const loginButton = document.querySelector(".login-button");
const iconClose = document.querySelector(".icon-close");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

loginButton.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

const apiKey = "api_key=7032fdc1d31d67d59ad95ecbaa51a8bc";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = `${baseUrl}/search/multi?${apiKey}`;
const searchResultsContainer = document.getElementById("main");
const searchForm = document.getElementById("form");
const searchInput = document.getElementById("input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    searchAll(searchTerm);
  } else {
  }
});

async function searchAll(searchTerm) {
  const searchApiUrl = `${searchUrl}&query=${searchTerm}&page=1`;

  try {
    const response = await fetch(searchApiUrl);
    const data = await response.json();
    showAllResults(data.results);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

function showAllResults(results) {
  searchResultsContainer.innerHTML = "";

  results.forEach((result) => {
    const { media_type } = result;

    if (media_type === "movie") {
      showMovieResult(result);
    } else if (media_type === "tv") {
      showSeriesResult(result);
    }
  });
}

function showMovieResult(result) {
  const { id, title, poster_path, vote_average, overview } = result;
  const movieEl = document.createElement("div");
  movieEl.classList.add("movie");
  movieEl.innerHTML = ` 
  <img src="${imgUrl + poster_path}" alt="${title}" />
  <div class="overview">
    <button class="add-to-watchlist" onclick="addToWatchlistButton('${title}')">Add</button>
    <h4>${title}</h4>
    <select id="rating_${id}">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button class="submit-rating" data-movie-id="${id}">Submit</button>
  </div>`;
  searchResultsContainer.appendChild(movieEl);
}

function showSeriesResult(result) {
  const { id, name, poster_path, vote_average, overview } = result;
  const seriesEl = document.createElement("div");
  seriesEl.classList.add("movie");
  seriesEl.innerHTML = ` 
  <img src="${imgUrl + poster_path}" alt="${name}" />
  <div class="overview">
    <button class="add-to-watchlist" onclick="addToWatchlistButton('${name}')">Add</button>
    <h4>${name}</h4>
    <select id="rating_${id}">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button class="submit-rating" data-movie-id="${id}">Submit</button>
  </div>`;
  searchResultsContainer.appendChild(seriesEl);
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
