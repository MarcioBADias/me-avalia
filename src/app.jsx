import { useEffect, useState } from 'react'
import { SearchMenu } from './components/SearchMenu/searchMenu'
import { ListBox } from './components/ListBox/listBox'
import { MoviesList } from './components/MoviesList/moviesList'
import { HistoricMoviesData } from './components/HistoricMoviesData/historicMoviesData'
import { HistoricMoviesList } from './components/HistoricMoviesList/historicMoviesList'

const apiKey = import.meta.env.VITE_API_KEY

const App = () => {
  const [dataFilm, setDataFilm] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)
  const [wacthedMovies, setWacthedMovies] = useState([])

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=Matrix`)
      .then((r) => r.json())
      .then((data) =>
        setDataFilm(
          data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        ),
      )
      .catch(console.log)
  }, [])

  const handleSearchMovie = (e) => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchMovie.value}`)
      .then((r) => r.json())
      .then((data) =>
        setDataFilm(
          data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        ),
      )
      .catch(console.log)
  }

  const handleClickBtnDelete = (id) =>
    setWacthedMovies((prev) => prev.filter((p) => p.id !== id))
  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickedMovie = (currentClickedMovie) => {
    const prevCLickedMove = clickedMovie
    if (prevCLickedMove?.id === currentClickedMovie.id) {
      setClickedMovie(null)
    }

    fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${currentClickedMovie.id}`,
    )
      .then((r) => r.json())
      .then((movie) =>
        setClickedMovie({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          imdbRate: movie.imdbRating,
          runtime: movie.Runtime,
          poster: movie.Poster,
          plot: movie.Plot,
          actors: movie.Actors,
          director: movie.Director,
          released: movie.Released,
          genre: movie.Genre,
        }),
      )
      .catch(console.log)
  }
  const handleClickSubmitRating = (e) => {
    e.preventDefault()
    const { rating } = e.target.elements
    setWacthedMovies((prev) => [
      ...prev,
      { ...clickedMovie, userRating: rating.value },
    ])
    setClickedMovie(null)
  }

  return (
    <>
      <SearchMenu movies={dataFilm} onSearchMovie={handleSearchMovie} />

      <main className="main">
        <ListBox>
          <button className="btn-toggle">-</button>
          <MoviesList movies={dataFilm} onClickedMovie={handleClickedMovie} />
        </ListBox>
        <ListBox>
          {clickedMovie ? (
            <div className="details">
              <header>
                <button className="btn-back" onClick={handleClickBtnBack}>
                  {' '}
                  &larr;
                </button>
                <img
                  src={clickedMovie.poster}
                  alt={`Poster do filme ${clickedMovie.title}`}
                />
                <div className="details-overview">
                  <h2>{clickedMovie.title}</h2>
                  <p>
                    {clickedMovie.released} &bull; {clickedMovie.runtime}
                  </p>
                  <p>{clickedMovie.genre}</p>
                  <p>
                    <span>⭐</span>
                    {clickedMovie.imdbRate} IMDB rating
                  </p>
                </div>
              </header>

              <section>
                <div className="rating">
                  <form
                    onSubmit={handleClickSubmitRating}
                    className="form-rating"
                  >
                    <p>Qual nota você dá a este filme?</p>
                    <div>
                      <select name="rating" defaultValue={1}>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <button className="btn-add">+ adicionar à lista</button>
                    </div>
                  </form>
                </div>
                <p>
                  <em>{clickedMovie.plot}</em>
                </p>
                <p>Elenco: {clickedMovie.actors}</p>
                <p>Direção: {clickedMovie.director}</p>
              </section>
            </div>
          ) : (
            <>
              <button className="btn-toggle">-</button>
              <HistoricMoviesData wacthedMovies={wacthedMovies} />
              <HistoricMoviesList
                wacthedMovies={wacthedMovies}
                onClickBtnDelete={handleClickBtnDelete}
              />
            </>
          )}
        </ListBox>
      </main>
    </>
  )
}

export { App }
