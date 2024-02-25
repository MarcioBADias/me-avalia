import { useEffect, useState, useRef } from 'react'
import localforage from 'localforage'

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`

const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const movieRef = useRef(null)

  useEffect(() => {
    movieRef.current.elements.searchMovie.value.length > 0 &&
      movieRef.current.reset()
  }, [movies])

  useEffect(() => {
    setLoading(true)
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
      .finally(() => setLoading(false))
  }, [])

  const handleSearchMovie = (e) => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }
    setLoading(true)
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
      .finally(() => setLoading(false))
    searchMovie.value = ''
  }

  return { movies, loading, movieRef, handleSearchMovie }
}

const useWatchedMovies = () => {
  const [wacthedMovies, setWacthedMovies] = useState([])

  useEffect(() => {
    localforage
      .setItem('filmesAssistidos', wacthedMovies)
      .catch((error) => alert(error))
  }, [wacthedMovies])

  useEffect(() => {
    localforage
      .getItem('filmesAssistidos')
      .then((value) => {
        if (value) {
          setWacthedMovies(value)
        }
      })
      .catch((error) => alert(error))
  }, [])

  const handleClickBtnDelete = (id) =>
    setWacthedMovies((prev) => prev.filter((p) => p.id !== id))

  return { wacthedMovies, setWacthedMovies, handleClickBtnDelete }
}

const useClickedMovie = (wacthedMovies, setWacthedMovies) => {
  const [clickedMovie, setClickedMovie] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickedMovie = (currentClickedMovie) => {
    const prevCLickedMove = clickedMovie
    if (prevCLickedMove?.id === currentClickedMovie.id) {
      setClickedMovie(null)
    }
    setLoadingDetails(true)
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
      .finally(() => setLoadingDetails(false))
  }
  const handleClickRating = (rating) => {
    setWacthedMovies((prev) => {
      const duplicatedMove = prev.some((movie) => movie.id === clickedMovie.id)
      return duplicatedMove
        ? prev.map((m) =>
            m.id === clickedMovie.id
              ? { ...clickedMovie, userRating: rating }
              : m,
          )
        : [...prev, { ...clickedMovie, userRating: rating }]
    })
    setClickedMovie(null)
  }

  return {
    clickedMovie,
    loadingDetails,
    setClickedMovie,
    handleClickBtnBack,
    handleClickedMovie,
    handleClickRating,
  }
}

export { useMovies, useWatchedMovies, useClickedMovie }
