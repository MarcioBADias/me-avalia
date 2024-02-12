const MoviesList = ({ movies, onClickedMovie }) => (
  <ul className="list">
    {movies.map((film) => (
      <li key={film.id} onClick={() => onClickedMovie(film)}>
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
)

export { MoviesList }
