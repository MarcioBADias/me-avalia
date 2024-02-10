import { useState } from 'react'
import LogoIMG from '../img/logo-me-avalia.png'

const App = () => {
  const [dataFilm, setDataFilm] = useState([])
  const [searchMovie, setSearchMovie] = useState('')
  const [movieTitle, setMovieTitle] = useState('')

  const getMovieData = () => {
    if(searchMovie === ''){
      setDataFilm([])
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=a158555c&s=${searchMovie}&page=1`)
    .then(r => r.json()).then(data => setDataFilm(data['Search'])).catch(console.log)
  }

  const getMovieDetails = () => {
    fetch(`https://www.omdbapi.com/?apikey=a158555c&t=${movieTitle}`)
    .then(r => r.json()).then(data => setDataFilm(data['Search'])).catch(console.log)
  }

  const handleChangeSearch = e => {
    setSearchMovie(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    
    getMovieData()
    setSearchMovie('')
  }

  const handleClick = e => {
    setMovieTitle(e.target)
    getMovieDetails()
  }

  return (
    <>
      <nav className="nav-bar">
        <img src={LogoIMG} className="logo" alt="Logo Me Avalia" />
        <form className="form-search" onSubmit={handleSubmit}>
          <input type="text" className="search" value={searchMovie} onChange={handleChangeSearch} placeholder='Buscar filmes...'/>
          <button className="btn-search">Buscar</button>
        </form>
        <p className="num-results"><strong>{dataFilm? dataFilm.length : 0}</strong> Resuldatos</p>
      </nav>
      <section className="main">
        <div className="box" onClick={handleClick}>
          <button className="btn-toggle">-</button>
          <ul className="list">
            {
              dataFilm?.map(film => (
                <li key={film.imdbID}>
                <img src={film.Poster} alt="" />
                <h3>{film.Title}</h3>
                <div>
                  <p>📅 {film.Year}</p>
                </div>
              </li>
              ))
            }
          </ul>
        </div>
        <div className="box">
          <button className="btn-toggle">-</button>
          <div className="summary">
            <img src={movieTitle?.Poster} alt="" />
            <h2>Filmes assistidos</h2>
            <p>#️⃣ 0 filmes ⏳ 0 min</p>
          </div>
        </div>
      </section>
    </>
  )
}

export { App }
