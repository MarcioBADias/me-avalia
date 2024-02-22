import { useMovies } from '@/hooks'
import { SearchMenu } from '@/components/SearchMenu'
import { Main } from '@/components/Main'

const App = () => {
  const { movies, movieRef, handleSearchMovie } = useMovies()

  return (
    <>
      <SearchMenu
        movieRef={movieRef}
        movies={movies}
        onSearchMovie={handleSearchMovie}
      />
      <Main movie={movies} />
    </>
  )
}

export { App }
