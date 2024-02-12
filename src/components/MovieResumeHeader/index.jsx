const ResumeHeader = ({ clickedMovie, onClickBtmBack }) => (
  <header>
    <button className="btn-back" onClick={onClickBtmBack}>
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
)

export { ResumeHeader }
