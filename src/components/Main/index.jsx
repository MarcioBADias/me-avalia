import { useState } from 'react'
import { HistoricMoviesData } from '../HistoricMoviesData'
import { HistoricMoviesList } from '../HistoricMoviesList'
import { ListBox } from '../ListBox'
import { MovieDetails } from '../MovieDetails'
import { MoviesList } from '../MoviesList'

const apiKey = import.meta.env.VITE_API_KEY

const Main = ({ movie }) => {
  const [clickedMovie, setClickedMovie] = useState(null)
  const [wacthedMovies, setWacthedMovies] = useState([])

  const handleClickBtnDelete = (id) =>
    setWacthedMovies((prev) => prev.filter((p) => p.id !== id))
  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickedMovie = (currentClickedMovie) => {
    const prevCLickedMove = clickedMovie
    if (prevCLickedMove?.id === currentClickedMovie.id) {
      setClickedMovie(null)
    }

    fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${currentClickedMovie.id}`,
    )
      .then((r) => r.json())
      .then((movie) =>
        setClickedMovie({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          imdbRate: movie.imdbRating,
          runtime: movie.Runtime,
          poster: movie.Poster,
          plot: movie.Plot,
          actors: movie.Actors,
          director: movie.Director,
          released: movie.Released,
          genre: movie.Genre,
        }),
      )
      .catch(console.log)
  }
  const handleClickSubmitRating = (e) => {
    e.preventDefault()
    const { rating } = e.target.elements
    setWacthedMovies((prev) => [
      ...prev,
      { ...clickedMovie, userRating: rating.value },
    ])
    setClickedMovie(null)
  }

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
            onSubmitRating={handleClickSubmitRating}
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
