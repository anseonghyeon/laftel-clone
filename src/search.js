const API_KEY = '';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}`;

    if (query) {
      document.querySelector('.search-result').innerHTML = `"${query}" <span>검색 결과</span>`;
    }
    
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
  });
  
// nav 코드
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

// 모달 열기
document.querySelector('.card-grid').addEventListener('click', (event) => {
  const el = event.target.closest('.modal-click');
  if (!el) return;

  const movieId = el.dataset.id;

  document.getElementById('modal').style.display = 'block';
  document.getElementById('modal-overlay').style.display = 'block';

  const idUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

  fetch(idUrl)
    .then(res => res.json())
    .then(data => {
      document.querySelector('.modal-title').textContent = data.title;
      document.querySelector('.modal-voteAverage').textContent = `평점: ${data.vote_average.toFixed(1)}`;
      document.querySelector('.modal-overview').textContent = data.overview;
      document.querySelector('.modal-poster img').src = `https://image.tmdb.org/t/p/w780${data.backdrop_path}`;
      document.querySelector('.modal-mini-poster img').src = `https://image.tmdb.org/t/p/w200${data.poster_path}`;
    });
});

// 모달 닫기
document.querySelector('.modal-exit').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
})

document.getElementById('modal-overlay').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
});

// 검색 로직
document.getElementById('searchBtn').addEventListener('click', () => {
    const input = document.getElementById('searchBox');
    const query = input.value.trim();
    if (query !== '') {
      
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
});

// 엔터로도 검색가능하게
document.getElementById('searchBox').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value.trim();
      if (query !== '') {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
      }
    }
});




