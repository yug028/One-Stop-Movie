const apiKey = "api_key=7032fdc1d31d67d59ad95ecbaa51a8bc";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const mains = document.getElementById("main");
const mains1 = document.getElementById("main1");
const mains2 = document.getElementById("main2");

const popularSeriesUrl = `${baseUrl}/discover/tv?sort_by=popularity.desc&${apiKey}`;
const upcomingSeriesUrl = `${baseUrl}/tv/on_the_air?${apiKey}`;
const trendingSeriesUrl = `${baseUrl}/tv/top_rated?${apiKey}`;
const searchSeriesUrl = `${baseUrl}/search/tv?${apiKey}`;

getSeries(popularSeriesUrl, mains);
getSeries(upcomingSeriesUrl, mains1);
getSeries(trendingSeriesUrl, mains2);

function getSeries(url, container) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showSeries(data.results, container);
    })
    .catch((error) => {
      console.error("Error fetching series:", error);
    });
}

function showSeries(data, container) {
  container.innerHTML = "";

  data.forEach((tv) => {
    const { name, poster_path, backdrop_path, vote_average, overview } = tv;
    const seriesEl = document.createElement("div");
    seriesEl.classList.add("movie");
    seriesEl.innerHTML = ` 
      <img src="${imgUrl + poster_path}" alt="${name}" />
      <div class="overview">
        <h4>${name}</h4>
        <span class="${getColor(vote_average)}">${vote_average}</span>
        <p class="overview-text">${overview}</p>
      </div>`;

      seriesEl.addEventListener("click", () => {
        changePageBackground(backdrop_path);
      });

    container.appendChild(seriesEl);
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
    searchSeries(searchTerm);
  } else {
    getSeries(popularSeriesUrl, mains);
    getSeries(upcomingSeriesUrl, mains1);
  }
});

async function searchSeries(searchTerm) {
  const searchSeriesUrl = `${baseUrl}/search/tv?${apiKey}&query=${searchTerm}&page=1`;

  try {
    const response = await fetch(searchSeriesUrl);
    const data = await response.json();

    showSeries(data.results, mains);
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
