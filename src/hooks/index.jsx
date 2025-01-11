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
        dispatch({ type: 'set_movies', movies: data.Search }),
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
        dispatch({ type: 'set_movies', movies: data.Search }),
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
  const [state, dispatch] = useReducer(reduce, {
    clickedMovie: null,
    loadingDetails: false,
  })

  const handleClickBtnBack = () => dispatch({ type: 'dismissed_movie_details' })
  const handleClickedMovie = (currentClickedMovie) => {
    const prevCLickedMove = state.clickedMovie
    if (prevCLickedMove?.id === currentClickedMovie.id) {
      dispatch({ type: 'dismissed_movie_details' })
      return
    }
    dispatch({ type: 'set_loading' })
    request({
      url: `${baseUrl}&i=${currentClickedMovie.id}`,
      onSuccess: (movie) => dispatch({ type: 'set_clicked_movie', movie }),
      onFinally: () => dispatch({ type: 'set_loading' }),
    })
  }
  const handleClickRating = (rating) => {
    setWacthedMovies((prev) => {
      const duplicatedMove = prev.some(
        (movie) => movie.id === state.clickedMovie.id,
      )
      return duplicatedMove
        ? prev.map((m) =>
            m.id === state.clickedMovie.id
              ? { ...state.clickedMovie, userRating: rating }
              : m,
          )
        : [...prev, { ...state.clickedMovie, userRating: rating }]
    })
    dispatch({ type: 'dismissed_movie_details' })
  }

  return {
    clickedMovie: state.clickedMovie,
    loadingDetails: state.loadingDetails,
    handleClickBtnBack,
    handleClickedMovie,
    handleClickRating,
  }
}

//Quebra de componente--------------------------------------------------------------------------------------

export { useMovies, useWatchedMovies, useClickedMovie }
