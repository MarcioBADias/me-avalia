const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`

const request = ({ url, onSuccess, onFinally }) => {
  fetch(url)
    .then((r) => r.json())
    .then(onSuccess)
    .catch(console.log)
    .finally(onFinally)
}

const reduce = (state, action) =>
  ({
    set_movies: {
      ...state,
      movies: action.movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      })),
    },
    set_loading: { ...state, loading: !state.loading },
    set_wacthedMovies: { ...state, wacthedMovies: action.payload },
  })[action.type] || state

export { baseUrl, request, reduce }
