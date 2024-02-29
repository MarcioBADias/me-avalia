import { useEffect, useState, useRef, useReducer } from 'react'
import { baseUrl, request, reduce } from '@/utils'
import localforage from 'localforage'

const useMovies = () => {
  const [state, dispatch] = useReducer(reduce, { movies: [], loading: false })
  const movieRef = useRef(null)

  useEffect(() => {
    movieRef.current.elements.searchMovie.value.length > 0 &&
      movieRef.current.reset()
  }, [state.movies])

  useEffect(() => {
    dispatch({ type: 'set_loading' })
    request({
      url: `${baseUrl}&s=Matrix`,
      onSuccess: (data) =>
        dispatch({
          type: 'set_movies',
          payload: data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        }),
      onFinally: () => dispatch({ type: 'set_loading' }),
    })
  }, [])

  const handleSearchMovie = (e) => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }
    dispatch({ type: 'set_loading' })
    request({
      url: `${baseUrl}&s=${searchMovie.value}`,
      onSuccess: (data) =>
        dispatch({
          type: 'set_movies',
          payload: data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        }),
      onFinally: () => dispatch({ type: 'set_loading' }),
    })

    searchMovie.value = ''
  }

  return {
    movies: state.movies,
    loading: state.loading,
    movieRef,
    handleSearchMovie,
  }
}

//Quebra de componente--------------------------------------------------------------------------------------

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

//Quebra de componente--------------------------------------------------------------------------------------

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
    request({
      url: `${baseUrl}&i=${currentClickedMovie.id}`,
      onSuccess: (movie) =>
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
      onFinally: setLoadingDetails(false),
    })
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

//Quebra de componente--------------------------------------------------------------------------------------

export { useMovies, useWatchedMovies, useClickedMovie }
