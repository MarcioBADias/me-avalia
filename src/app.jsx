import { useState } from 'react'
import LogoIMG from '../img/logo-me-avalia.png'

const App = () => {
  const [dataFilm, setDataFilm] = useState([])
  const [searchMovie, setSearchMovie] = useState('')
  const [movieTitle, setMovieTitle] = useState('')

  const getMovieData = () => {
    if (searchMovie === '') {
      setDataFilm([])
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=a158555c&s=${searchMovie}&page=1`)
      .then((r) => r.json())
      .then((data) => setDataFilm(data['Search']))
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
  }

  return (
    <>
      <nav className="nav-bar">
        <img src={LogoIMG} className="logo" alt="Logo Me Avalia" />
        <form className="form-search" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search"
            value={searchMovie}
            onChange={handleChangeSearch}
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
        <div className="box" onClick={handleClick}>
          <button className="btn-toggle">-</button>
          <ul className="list">
            {dataFilm?.map((film) => (
              <li key={film.imdbID}>
                <img src={film.Poster} alt="" />
                <h3>{film.Title}</h3>
                <div>
                  <p>
                    <span>📅</span>
                    <span>{film.Year}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="box">
          <button className="btn-toggle">-</button>
          <div className="summary">
            <img src={movieTitle?.Poster} alt="" />
            <h2>Filmes assistidos</h2>
            <div>
              <p>
                <span>#️⃣</span> {''}
                <span>0 filmes</span>
              </p>
              <p>
                <span>⏳</span> {''}
                <span>00 min</span>
              </p>
            </div>
          </div>
          <ul className="list">
            <li>
              <img src="" alt="" />
              <h3>Matrix</h3>
              <div>
                <p>
                  <span>⭐</span>
                  <span>5.0</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>10</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>00 min</span>
                </p>
                <button className="btn-delete">x</button>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}

export { App }
