import React from 'react'

const SearchMenu = (movie, onSearchMovie) => (
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
      <strong>{movie ? movie.length : 0}</strong> Resuldatos
    </p>
  </nav>
)

export { SearchMenu }
