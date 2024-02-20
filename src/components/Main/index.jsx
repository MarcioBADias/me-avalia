import { HistoricMoviesData } from '../HistoricMoviesData'
import { HistoricMoviesList } from '../HistoricMoviesList'
import { ListBox } from '../ListBox'
import { MovieDetails } from '../MovieDetails'
import { MoviesList } from '../MoviesList'
import { useWatchedMovies, useClickedMovie } from '../../hooks'

const Main = ({ movie }) => {
  const { wacthedMovies, setWacthedMovies, handleClickBtnDelete } =
    useWatchedMovies()

  const {
    clickedMovie,
    handleClickBtnBack,
    handleClickedMovie,
    handleClickRating,
  } = useClickedMovie(wacthedMovies, setWacthedMovies)

  return (
    <main className="main">
      <ListBox>
        <button className="btn-toggle">-</button>
        <MoviesList movies={movie} onClickedMovie={handleClickedMovie} />
      </ListBox>
      <ListBox>
        {clickedMovie ? (
          <MovieDetails
            clickedMovie={clickedMovie}
            onClickBtmBack={handleClickBtnBack}
            onClickRating={handleClickRating}
          />
        ) : (
          <>
            <button className="btn-toggle">-</button>
            <HistoricMoviesData wacthedMovies={wacthedMovies} />
            {wacthedMovies.length > 0 && (
              <HistoricMoviesList
                wacthedMovies={wacthedMovies}
                onClickBtnDelete={handleClickBtnDelete}
              />
            )}
          </>
        )}
      </ListBox>
    </main>
  )
}

export { Main }
