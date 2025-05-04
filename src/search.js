// TMDB API ey
const API_KEY = '';

// nav animation code
window.addEventListener('scroll',function() {
  const header = document.getElementById('header');

  if(this.window.scrollY > 50) {
      header.style.backgroundColor = '#121212';
      header.style.borderBottom = '1px solid #e8e8e855';
  } else {
      header.style.backgroundColor = 'transparent';
      header.style.borderBottom = 'none';
  }
});

// search result code
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}`;

    if (query) {
      document.querySelector('.search-result').innerHTML = `"${query}" <span>검색 결과</span>`;

      fetch(url).then(res => res.json()).then(data => {
        const cardGrid = document.querySelector('.card-grid');
        let posterOffset = 'https://image.tmdb.org/t/p/w500';
        if(data.results.length === 0) {
            document.querySelector('.search-result').innerHTML = `"${query}" <span>검색 결과 없음</span>`;
        }
        
        data.results.forEach(movie => {
            cardGrid.innerHTML += `
            <div class="movie-card modal-click" data-id="${movie.id}">
              <img src="${posterOffset + movie.poster_path}">
              <p class="movie-title">${movie.title}</p>
            </div>`;
        });
      });
    } else {
      document.querySelector('.search-result').innerHTML = `<span>검색 결과 없음</span>`;
    }
  });
  

// modal open code
document.querySelector('.card-grid').addEventListener('click', (event) => {
  const el = event.target.closest('.modal-click');
  if (!el) return;

  const movieId = el.dataset.id;

  document.getElementById('modal').style.display = 'block';
  document.getElementById('modal-overlay').style.display = 'block';

  const idSearchUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

  fetch(idSearchUrl)
    .then(res => res.json())
    .then(data => {
      document.querySelector('.modal-title').textContent = data.title;
      document.querySelector('.modal-voteAverage').textContent = `평점: ${data.vote_average.toFixed(1)}`;
      document.querySelector('.modal-overview').textContent = data.overview;
      document.querySelector('.modal-poster img').src = `https://image.tmdb.org/t/p/w780${data.backdrop_path}`;
      document.querySelector('.modal-mini-poster img').src = `https://image.tmdb.org/t/p/w200${data.poster_path}`;
    });
});

// modal exit button close code
document.querySelector('.modal-exit').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
})

// modal overlay click close code
document.getElementById('modal-overlay').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
});

// buttton search url change code
document.getElementById('searchBtn').addEventListener('click', () => {
    const input = document.getElementById('searchBox');
    const query = input.value.trim();
    if (query !== '') {
      
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
});

// enter search url change code
document.getElementById('searchBox').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const input = document.getElementById('searchBox');
      const query = input.value.trim();
      if (query !== '') {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
      }
    }
});




