import { useMovies } from './hooks'
import { SearchMenu } from './components/SearchMenu'
import { Main } from './components/Main'

const App = () => {
  const { movies, handleSearchMovie } = useMovies()

  return (
    <>
      <SearchMenu movies={movies} onSearchMovie={handleSearchMovie} />
      <Main movie={movies} />
    </>
  )
}

export { App }
