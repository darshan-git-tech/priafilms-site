import { useQuery } from '@tanstack/react-query'
import { getFeaturedMovies, getMovies, getMovieBySlug } from '../api/movies'

export function useFeaturedMovies() {
  return useQuery({
    queryKey: ['featured-movies'],
    queryFn: getFeaturedMovies,
  })
}

export function useMovies({ search, genre, page }) {
  return useQuery({
    queryKey: ['movies', { search, genre, page }],
    queryFn: () => getMovies({ search, genre, page }),
    keepPreviousData: true,
  })
}

export function useMovieDetail(slug) {
  return useQuery({
    queryKey: ['movie', slug],
    queryFn: () => getMovieBySlug(slug),
    enabled: !!slug,
  })
}
