const HistoricMoviesList = ({ wacthedMovies, onClickBtnDelete }) => (
  <ul className="list">
    {wacthedMovies.map((movie) => (
      <li key={movie.id}>
        <img src={movie.poster} alt={`Poster do filme ${movie.title}`} />
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
            onClick={() => onClickBtnDelete(movie.id)}
            className="btn-delete"
          >
            x
          </button>
        </div>
      </li>
    ))}
  </ul>
)

export { HistoricMoviesList }
