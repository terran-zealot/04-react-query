import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { type Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import { fetchMovies } from '../../services/MovieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';



function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  const handleSearch = async (newTopic: string) => {

    setHttpError(false);
    setIsLoading(true);
    setMovies([]);
    try {
      const results = await fetchMovies(newTopic);

      if (results.length === 0) {
        toast.error('No movies found for your request.');
      } else {
        setMovies(results);
      }
    } catch {
      setHttpError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {!isLoading && httpError && <ErrorMessage />}

      {!isLoading && !httpError && movies.length > 0 && (
        <MovieGrid movies={movies}
        onSelect={movie => setSelectedMovie(movie)}/>
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
export default App