import { useEffect, useState, useRef } from 'react'

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`

const useMovies = () => {
  const [movies, setMovies] = useState([])
  const movieRef = useRef(null)

  useEffect(() => {
    if (movies.length === 0) {
      return
    }
    movieRef.current.reset()
  }, [movies])

  useEffect(() => {
    fetch(`${baseUrl}&s=Matrix`)
      .then((r) => r.json())
      .then((data) =>
        setMovies(
          data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        ),
      )
      .catch((error) => alert(error.message))
  }, [])

  const handleSearchMovie = (e) => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    fetch(`${baseUrl}&s=${searchMovie.value}`)
      .then((r) => r.json())
      .then((data) =>
        setMovies(
          data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        ),
      )
      .catch((error) => alert(error.message))

    searchMovie.value = ''
  }

  return { movies, movieRef, handleSearchMovie }
}

const useWatchedMovies = () => {
  const [wacthedMovies, setWacthedMovies] = useState([])

  const handleClickBtnDelete = (id) =>
    setWacthedMovies((prev) => prev.filter((p) => p.id !== id))

  return { wacthedMovies, setWacthedMovies, handleClickBtnDelete }
}

const useClickedMovie = (wacthedMovies, setWacthedMovies) => {
  const [clickedMovie, setClickedMovie] = useState(null)

  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickedMovie = (currentClickedMovie) => {
    const prevCLickedMove = clickedMovie
    if (prevCLickedMove?.id === currentClickedMovie.id) {
      setClickedMovie(null)
    }

    fetch(`${baseUrl}&i=${currentClickedMovie.id}`)
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
      .catch((error) => alert(error.message))
  }
  const handleClickSubmitRating = (e) => {
    e.preventDefault()
    const { rating } = e.target.elements
    setWacthedMovies((prev) => {
      const duplicatedMove = prev.some((movie) => movie.id === clickedMovie.id)
      return duplicatedMove
        ? prev.map((m) =>
            m.id === clickedMovie.id
              ? { ...clickedMovie, userRating: rating.value }
              : m,
          )
        : [...prev, { ...clickedMovie, userRating: rating.value }]
    })
    setClickedMovie(null)
  }

  return {
    clickedMovie,
    setClickedMovie,
    handleClickBtnBack,
    handleClickedMovie,
    handleClickSubmitRating,
  }
}

export { useMovies, useWatchedMovies, useClickedMovie }
