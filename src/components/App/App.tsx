import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import toast, { Toaster } from 'react-hot-toast';   
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



const notifyNoMovies = () => toast('No movies found for your request.');


export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [movieSelected, setMovieSelected] = useState<Movie | null>(null);

    const openModal = (movie: Movie) => {
        setMovieSelected(movie);
    };
    const closeModal = () => {
        setMovieSelected(null);
    };

    const handleSubmit = async (queryWord: string) => {
        setMovies([]);
        setIsError(false);
        setIsLoading(true);

        try {
            

            const results = await fetchMovies(queryWord);

            if (results.length === 0) {
                notifyNoMovies();
                return;
            }

            setMovies(results);
        }
        
        catch (error) {
            console.error('Error fetching movies:', error);
            toast('An error occurred while fetching movies. Please try again later.');
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }   
    };




    return (
        <>
            <SearchBar onSubmit={handleSubmit} />

            {isLoading ? (
                <Loader />
            ) : isError ? (
                <ErrorMessage />
            ) : movies.length > 0 ? (
                <MovieGrid movies={movies} onSelect={openModal} />
            ) : null}

            {movieSelected && (
                <MovieModal movie={movieSelected} onClose={closeModal} />
            )}

            <Toaster position="top-right" />
        </>
    );
}