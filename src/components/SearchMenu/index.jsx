const SearchMenu = ({ movies, onSearchMovie }) => (
  <nav className="nav-bar">
    <img src="logo-me-avalia.png" className="logo" alt="Logo Me Avalia" />
    <form className="form-search" onSubmit={onSearchMovie}>
      <input
        type="text"
        className="search"
        name="searchMovie"
        placeholder="Buscar filmes..."
        autoFocus
      />
      <button className="btn-search">Buscar</button>
    </form>
    <p className="num-results">
      <strong>{movies ? movies.length : 0}</strong> Resuldatos
    </p>
  </nav>
)

export { SearchMenu }
