import { useState } from 'react'
import { RatingStar } from '../StarRating'

const MovieDetails = ({ clickedMovie, onClickBtmBack, onClickRating }) => {
  const [useRating, setUseRating] = useState(null)

  const handleUseRating = (rating) => setUseRating(rating)

  return (
    <div className="details">
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

      <section>
        <div className="rating">
          <p>Qual nota você dá a este filme?</p>
          <RatingStar
            maxRating={10}
            size={26}
            color="Teal"
            className="test"
            onRating={handleUseRating}
          />
          <button className="btn-add" onClick={() => onClickRating(useRating)}>
            + adicionar à lista
          </button>
        </div>
        <p>
          <em>{clickedMovie.plot}</em>
        </p>
        <p>Elenco: {clickedMovie.actors}</p>
        <p>Direção: {clickedMovie.director}</p>
      </section>
    </div>
  )
}

export { MovieDetails }
