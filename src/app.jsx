import { useEffect, useState } from 'react'
import LogoIMG from '../img/logo-me-avalia.png'

const getTotalMinutes = (wacthedMovies) =>
  wacthedMovies.reduce((acc, item) => acc + +item.runtime.split(' ')[0], 0)

const App = () => {
  const [dataFilm, setDataFilm] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)
  const [wacthedMovies, setWacthedMovies] = useState([])
  //const [searchMovie, setSearchMovie] = useState('')
  //const [movieTitle, setMovieTitle] = useState('')

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/MarcioBADias/data-fake/main/fake-mbd.json`,
    )
      .then((r) => r.json())
      .then((data) =>
        setDataFilm(
          data.map((movie) => ({
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
          })),
        ),
      )
      .catch(console.log)
  }, [])

  /*const getMovieData = () => {
    if (searchMovie === '') {
      setDataFilm([])
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=a158555c&s=${searchMovie}&page=1`)
      .then((r) => r.json())
      .then((data) => setDataFilm(data['Search'].map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        imdbRate: movie.imdbRate,
        runtime: movie.Runtime,
        poster: movie.Poster,
        plot: movie.Plot,
        actors: movie.Actors,
        director: movie.Director,
        released: movie.Released,
        genre: movie.Genre
      }))))
      .catch(console.log)
  }

 const getMovieDetails = () => {
    fetch(`https://www.omdbapi.com/?apikey=a158555c&t=${movieTitle}`)
      .then((r) => r.json())
      .then((data) => setDataFilm(data['Search']))
      .catch(console.log)
  }

  const handleChangeSearch = (e) => {
    setSearchMovie(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    getMovieData()
    setSearchMovie('')
  }

  const handleClick = (e) => {
    setMovieTitle(e.target)
    getMovieDetails()
  } */

  const handleClickBtnDelete = (id) =>
    setWacthedMovies((prev) => prev.filter((p) => p.id !== id))
  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickMovie = (clickedMovie) =>
    setClickedMovie((prev) =>
      prev?.id === clickedMovie.id ? null : clickedMovie,
    )
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
      <nav className="nav-bar">
        <img src={LogoIMG} className="logo" alt="Logo Me Avalia" />
        <form className="form-search" /*onSubmit={handleSubmit}*/>
          <input
            type="text"
            className="search"
            //value={searchMovie}
            //onChange={handleChangeSearch}
            placeholder="Buscar filmes..."
            autoFocus
          />
          <button className="btn-search">Buscar</button>
        </form>
        <p className="num-results">
          <strong>{dataFilm ? dataFilm.length : 0}</strong> Resuldatos
        </p>
      </nav>

      <main className="main">
        <div className="box" /*onClick={handleClick}*/>
          <button className="btn-toggle">-</button>
          <ul className="list">
            {dataFilm.map(
              (film, i) =>
                i < 3 && (
                  <li key={film.id} onClick={() => handleClickMovie(film)}>
                    <img
                      src={film.poster}
                      alt={`Poster do filme ${film.title}`}
                    />
                    <h3>{film.title}</h3>
                    <div>
                      <p>
                        <span>📅</span>
                        <span>{film.year}</span>
                      </p>
                    </div>
                  </li>
                ),
            )}
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
