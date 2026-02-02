function goBack() {
  history.back(); // 브라우저 히스토리를 통해 이전 페이지로 이동
}

// Common URL
const tmdbCommand = "https://api.themoviedb.org/3";
const result = document.querySelector("#result");
const movieGrid = document.querySelector("#movie-grid");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("search-box");

const resultContents = (query) => {
  return fetch(
    `${tmdbCommand}/search/movie?api_key=0bc8bd2db453d7413d1c2844ec617b61&query=${query}&include_adult=false&language=ko-KR&page=1`
  ).then((response) => response.json());
};

const loadResults = async () => {
  const data = await resultContents(query);
  result.innerText = `"${query}" 영화 검색 결과입니다!`;

  const movies = data.results;

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const img = document.createElement("img");
    img.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";
    img.alt = movie.title;

    const content = document.createElement("div");
    content.className = "movie-card-content";

    const title = document.createElement("div");
    title.className = "movie-title";
    title.textContent = movie.title;

    const release = document.createElement("div");
    release.className = "movie-release";
    release.textContent = `개봉일: ${movie.release_date}`;

    const overview = document.createElement("div");
    overview.className = "movie-overview";
    overview.textContent =
      movie.overview.length > 100
        ? movie.overview.substring(0, 100) + "..."
        : movie.overview;

    content.appendChild(title);
    content.appendChild(release);
    content.appendChild(overview);

    card.appendChild(img);
    card.appendChild(content);
    movieGrid.appendChild(card);
  });
};

loadResults();
