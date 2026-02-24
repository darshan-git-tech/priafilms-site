import axiosClient from './axiosClient'

export const getFeaturedMovies = async () => {
  const { data } = await axiosClient.get('/featured-movies')
  return data
}

export const getMovies = async ({ search = '', genre = '', page = 1 } = {}) => {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (genre) params.set('tag', genre)
  params.set('page', page)
  const { data } = await axiosClient.get(`/movies?${params}`)
  return data
}

export const getMovieBySlug = async (slug) => {
  const { data } = await axiosClient.get(`/movies/${slug}`)
  return data
}
