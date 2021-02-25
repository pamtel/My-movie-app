const buttonElement = document.getElementById('search');
const inputElement = document.getElementById('inputValue');
const movieSearchable = document.getElementById('movies-searchable');
const backwardIcon = document.getElementById('backwardIcon');
const API_key = '2092315215ec164f6e21ef2b6bd708e3';
const IMG_API = 'https://image.tmdb.org/t/p/w200';
const FEATURED_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2092315215ec164f6e21ef2b6bd708e3&page=1';

window.addEventListener('DOMContentLoaded', getAllMovies)
function getAllMovies() {
    fetch(FEATURED_API)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let displayMovies = data.results.map((movie) => {
            return `
            <div class="movie">
                <img src=${IMG_API + movie.poster_path} />
                <div class="movie-info">
                    <h4>${movie.title}</h4>
                    <span>${movie.popularity}</span>
                </div>
                <p class="movie-over">${movie.overview}</p>
            </div>
            `;
        })
        const view = document.querySelector("#view");
        view.innerHTML = displayMovies.join('');
    })
}

backwardIcon.addEventListener("click", () => {
    let action = document.getElementById("popular");
    action.scrollIntoView({behavior: "smooth", block:"start"});
})

function movieSection(movies) {
    // console.log(movies,'func movies');
    return movies.map((movie) => {
        if (!value === movie.title) {
            alert("Movie not found")
        }  
        if (movie.poster_path) {
            return `
        <div class="movie">
            <img src=${IMG_API + movie.poster_path} />
                <div class="movie-info">
                    <h4>${movie.title}</h4>
                    <span>${movie.popularity}</span>
                </div>
                <p class="movie-over">${movie.overview}</p>
        </div>`
        }
    })
}


function createMovieContainer(movies) {
    // console.log(movies,'func createMovies');
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movieContainer');

    const movieTemplate = (`
        <section class="main">
            ${movieSection(movies).join("")}
        </section>`)
        console.log(movies[0]);

        movieElement.innerHTML = movieTemplate;
        // console.log({movieElement});
        return movieElement;

}

function renderSearchMovies(data) {
     // data.results []
        // movies.push(...data.results);
        movieSearchable.innerHTML = ''
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        console.log({movieBlock});
        movieSearchable.appendChild(movieBlock)
        // console.log('data', movies);
}

const fetchMovies = (url) => {
    fetch(url)
    .then((res) => res.json())
    .then(renderSearchMovies) 
    .catch((error) => {
        console.log('error', error);
    })
}
    
buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=2092315215ec164f6e21ef2b6bd708e3' + '&query=' + value;
    if (value.trim()){
    fetchMovies(url);
    inputElement.value = ''
    console.log('value', value);
    }else{
        alert("Please enter a search term")
    } 
} 