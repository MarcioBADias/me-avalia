import LogoIMG from '../img/logo-me-avalia.png'

const App = () => {
  return (
    <>
      <nav className="nav-bar">
        <img src={LogoIMG} className="logo" alt="Logo Me Avalia" />
        <form className="form-search">
          <input type="text" className="search" placeholder='Buscar filmes...'/>
          <button className="btn-search">Buscar</button>
        </form>
        <p className="num-results"><strong>5</strong> Resuldatos</p>
      </nav>
      <section className="main">
        <div className="box">
          <button className="btn-toggle">-</button>
          <ul className="list">
            <li>
              <img src="#" alt="" />
              <h3>Filme</h3>
              <div>
                <p>📅 2023</p>
              </div>
            </li>
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
