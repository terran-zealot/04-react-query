import axios, {type AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const BEARER_TOKEN = import.meta.env.VITE_SUPER_PASSWORD as string;

export async function fetchMovies(topic: string): Promise<Movie[]> {
  const response: AxiosResponse<MoviesResponse> = await axios.get(BASE_URL, {
    params: {
      query: topic,
      include_adult: false,
      language: 'en-US',
      page: 1
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  });



  return response.data.results;
}