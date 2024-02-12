import { useEffect, useState } from 'react'
import { SearchMenu } from './components/SearchMenu'
import { ListBox } from './components/ListBox'
import { MoviesList } from './components/MoviesList'
import { HistoricMoviesData } from './components/HistoricMoviesData'
import { HistoricMoviesList } from './components/HistoricMoviesList'
import { ResumeHeader } from './components/MovieResumeHeader'
import { MovieResume } from './components/MovieResume'

const apiKey = import.meta.env.VITE_API_KEY

const App = () => {
  const [dataFilm, setDataFilm] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)
  const [wacthedMovies, setWacthedMovies] = useState([])

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=Matrix`)
      .then((r) => r.json())
      .then((data) =>
        setDataFilm(
          data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        ),
      )
      .catch(console.log)
  }, [])

  const handleSearchMovie = (e) => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchMovie.value}`)
      .then((r) => r.json())
      .then((data) =>
        setDataFilm(
          data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        ),
      )
      .catch(console.log)
  }

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
    <>
      <SearchMenu movies={dataFilm} onSearchMovie={handleSearchMovie} />

      <main className="main">
        <ListBox>
          <button className="btn-toggle">-</button>
          <MoviesList movies={dataFilm} onClickedMovie={handleClickedMovie} />
        </ListBox>
        <ListBox>
          {clickedMovie ? (
            <div className="details">
              <ResumeHeader
                clickedMovie={clickedMovie}
                onClickBtmBack={handleClickBtnBack}
              />

              <MovieResume
                clickedMovie={clickedMovie}
                onSubmitRating={handleClickSubmitRating}
              />
            </div>
          ) : (
            <>
              <button className="btn-toggle">-</button>
              <HistoricMoviesData wacthedMovies={wacthedMovies} />
              <HistoricMoviesList
                wacthedMovies={wacthedMovies}
                onClickBtnDelete={handleClickBtnDelete}
              />
            </>
          )}
        </ListBox>
      </main>
    </>
  )
}

export { App }
