import { useEffect, useState } from 'react'
import { SearchMenu } from './components/SearchMenu/searchMenu'

const apiKey = import.meta.env.VITE_API_KEY

const getTotalMinutes = (wacthedMovies) =>
  wacthedMovies.reduce(
    (acc, item) =>
      acc + (item.runtime === 'N/A' ? 0 : +item.runtime.split(' ')[0]),
    0,
  )

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
        <div className="box">
          <button className="btn-toggle">-</button>
          <ul className="list">
            {dataFilm.map((film) => (
              <li key={film.id} onClick={() => handleClickedMovie(film)}>
                <img src={film.poster} alt={`Poster do filme ${film.title}`} />
                <h3>{film.title}</h3>
                <div>
                  <p>
                    <span>📅</span>
                    <span>{film.year}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="box">
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
              <div className="summary">
                <img src="#" alt="" />
                <h2>Filmes assistidos</h2>
                <div>
                  <p>
                    <span>#️⃣</span> {''}
                    <span>{wacthedMovies.length} filmes</span>
                  </p>
                  <p>
                    <span>⏳</span> {''}
                    <span>{getTotalMinutes(wacthedMovies)} min</span>
                  </p>
                </div>
              </div>
              <ul className="list">
                {wacthedMovies.map((movie) => (
                  <li key={movie.id}>
                    <img
                      src={movie.poster}
                      alt={`Poster do filme ${movie.title}`}
                    />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐</span>
                        <span>{movie.imdbRate}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime}</span>
                      </p>
                      <button
                        onClick={() => handleClickBtnDelete(movie.id)}
                        className="btn-delete"
                      >
                        x
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export { App }
