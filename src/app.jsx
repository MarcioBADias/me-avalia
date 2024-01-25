import { useState } from 'react'
import LogoIMG from '../img/logo-me-avalia.png'
import { useEffect } from 'react'

const App = () => {
  const [dataFilm, setDataFilm] = useState([])

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/MarcioBADias/data-fake/main/fake-mbd.json')
    .then(r => r.json()).then(data => setDataFilm(data)).catch(console.log)
  }, [])
  console.log(dataFilm)
  return (
    <>
      <nav className="nav-bar">
        <img src={LogoIMG} className="logo" alt="Logo Me Avalia" />
        <form className="form-search">
          <input type="text" className="search" placeholder='Buscar filmes...'/>
          <button className="btn-search">Buscar</button>
        </form>
        <p className="num-results"><strong>{dataFilm.length}</strong> Resuldatos</p>
      </nav>
      <section className="main">
        <div className="box">
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
            <h2>Filmes assistidos</h2>
            <p>#️⃣ 0 filmes ⏳ 0 min</p>
          </div>
        </div>
      </section>
    </>
  )
}

export { App }
