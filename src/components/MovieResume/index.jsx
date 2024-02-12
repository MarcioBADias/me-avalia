const MovieResume = ({ clickedMovie, onSubmitRating }) => (
  <section>
    <div className="rating">
      <form onSubmit={onSubmitRating} className="form-rating">
        <p>Qual nota você dá a este filme?</p>
        <div>
          <select name="rating" defaultValue={1}>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button className="btn-add">+ adicionar à lista</button>
        </div>
      </form>
    </div>
    <p>
      <em>{clickedMovie.plot}</em>
    </p>
    <p>Elenco: {clickedMovie.actors}</p>
    <p>Direção: {clickedMovie.director}</p>
  </section>
)

export { MovieResume }
