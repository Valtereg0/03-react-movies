import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
    results: Movie[];
}

interface OptionsAPI {
  params: {
    query: string;
  };
  headers: {
    Authorization: string;
  };
}


const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(queryWord: string): Promise<Movie[]> {
    const API_URL = 'https://api.themoviedb.org/3/search/movie';
    const options: OptionsAPI = {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            params: {
                query: queryWord, 
            },
        }

    try {
        const response = await axios.get<FetchMoviesResponse>(API_URL, options);

        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}






