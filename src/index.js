// TMDB API 키
const API_KEY = '';

// TMDB 인기 영화 목록
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

// TMDB 장르별 영화 목록
const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=`;

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

 // 메인화면 인기영화 로테이션
fetch(url).then(res => res.json()).then(data => {
    let i = 0;
    let title = data.results[i]['title'];
    let overview = data.results[i]['overview'];
    let voteAverage = data.results[i]['vote_average'];
    let posterPath = data.results[i]['poster_path'];
    let posterOffset = 'https://image.tmdb.org/t/p/w500';
    
    document.querySelector('.overview-title').textContent = title;
    document.querySelector('.overview-text').textContent = overview;
    document.querySelector('.overview-vote-average').textContent = `평점 : ${voteAverage.toFixed(1)} / 10`;
    document.querySelector('.poster-img').src = posterOffset+posterPath;
    document.querySelector('.card-wrapper').setAttribute('data-id',data.results[i]['id']);
    
    setInterval(() => {
        i = (i + 1) % 5;
        title = data.results[i]['title'];
        overview = data.results[i]['overview'];
        voteAverage = data.results[i]['vote_average'];
        posterPath = data.results[i]['poster_path'];

        document.querySelector('.overview-title').textContent = title;
        document.querySelector('.overview-text').textContent = overview;
        document.querySelector('.overview-vote-average').textContent = `평점 : ${voteAverage.toFixed(1)} / 10`;
        document.querySelector('.poster-img').src = posterOffset+posterPath;
        document.querySelector('.card-wrapper').setAttribute('data-id', data.results[i]['id']);
    }, 3000);
})

// 애니메이션 영화 로테이션
fetch(genreUrl+"16").then(res => res.json()).then(data => {
    let i = 0;
    let title = data.results[i]['title'];
    let posterPath = data.results[i]['poster_path'];
    
    let posterOffset = 'https://image.tmdb.org/t/p/w500';
    let imageElements = document.querySelectorAll('.anime-movie-list .movie-card img');
    let titleElements = document.querySelectorAll('.anime-movie-list .movie-card .movie-title');
    let clickElements = document.querySelectorAll('.anime-movie-list .modal-click');
    
    for(i = 0; i < imageElements.length; i++) {
        imageElements[i].src = posterOffset + data.results[i]['poster_path'];
        titleElements[i].textContent = data.results[i]['title'];
        clickElements[i].setAttribute('data-id',data.results[i]['id'])
    }

})

// 액션 영화 로테이션
fetch(genreUrl+"28").then(res => res.json()).then(data => {
    let i = 0;
    let title = data.results[i]['title'];
    let posterPath = data.results[i]['poster_path'];
    
    let posterOffset = 'https://image.tmdb.org/t/p/w500';
    let imageElements = document.querySelectorAll('.action-movie-list .movie-card img');
    let titleElements = document.querySelectorAll('.action-movie-list .movie-card .movie-title');
    let clickElements = document.querySelectorAll('.action-movie-list .modal-click');

    for(i = 0; i < imageElements.length; i++) {
        imageElements[i].src = posterOffset + data.results[i]['poster_path'];
        titleElements[i].textContent = data.results[i]['title'];
        clickElements[i].setAttribute('data-id',data.results[i]['id'])
    }

})

// SF 영화 로테이션
fetch(genreUrl+"878").then(res => res.json()).then(data => {
    let i = 0;
    let title = data.results[i]['title'];
    let posterPath = data.results[i]['poster_path'];
    
    let posterOffset = 'https://image.tmdb.org/t/p/w500';
    let imageElements = document.querySelectorAll('.sf-movie-list .movie-card img');
    let titleElements = document.querySelectorAll('.sf-movie-list .movie-card .movie-title');
    let clickElements = document.querySelectorAll('.sf-movie-list .modal-click');

    for(i = 0; i < imageElements.length; i++) {
        imageElements[i].src = posterOffset + data.results[i]['poster_path'];
        titleElements[i].textContent = data.results[i]['title'];
        clickElements[i].setAttribute('data-id',data.results[i]['id'])
    }

})

// 모달 열기
document.querySelectorAll('.modal-click').forEach((el) => {
    el.addEventListener('click', () => {

      document.getElementById('modal').style.display = 'block';
      document.getElementById('modal-overlay').style.display = 'block';
  
      const movieId = el.dataset.id;
  
      const idUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
  
      fetch(idUrl)
        .then(res => res.json())
        .then(data => {
          document.querySelector('.modal-title').textContent = data.title;
          document.querySelector('.modal-voteAverage').textContent = `평점: ${data.vote_average.toFixed(1)}`;
          document.querySelector('.modal-overview').textContent = data.overview;
          document.querySelector('.modal-poster img').src = `https://image.tmdb.org/t/p/w780${data.backdrop_path}`;
          document.querySelector('.modal-mini-poster img').src = `https://image.tmdb.org/t/p/w200${data.poster_path}`
        });
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

  document.getElementById('searchBox').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value.trim();
      if (query !== '') {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
      }
    }
  });
  
  