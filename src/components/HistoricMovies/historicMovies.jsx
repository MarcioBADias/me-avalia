const getTotalMinutes = (wacthedMovies) =>
  wacthedMovies.reduce(
    (acc, item) =>
      acc + (item.runtime === 'N/A' ? 0 : +item.runtime.split(' ')[0]),
    0,
  )

const HistoricMovies = ({ wacthedMovies }) => (
  <div className="summary">
    <img src="#" alt="" />
    <h2>Filmes assistidos</h2>
    <div>
      <p>
        <span>#️⃣</span> {''}
        <span>{wacthedMovies.length} filmes</span>
      </p>
      <p>
        <span>⏳</span> {''}
        <span>{getTotalMinutes(wacthedMovies)} min</span>
      </p>
    </div>
  </div>
)

export { HistoricMovies }
