const Movie = require('../models/Movie')

// GET /api/featured-movies
const getFeaturedMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .select('title slug description year genres thumbnailUrl runtime')
    res.json(movies)
  } catch (err) {
    next(err)
  }
}

// GET /api/movies?search=&page=&tag=
const getMovies = async (req, res, next) => {
  try {
    const { search, page = 1, tag } = req.query
    const limit = 9
    const skip = (Number(page) - 1) * limit

    const query = {}
    if (search) query.$text = { $search: search }
    if (tag) query.genres = tag

    const [movies, total] = await Promise.all([
      Movie.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title slug description year genres thumbnailUrl runtime'),
      Movie.countDocuments(query),
    ])

    res.json({
      movies,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/movies/:slug
const getMovieBySlug = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ slug: req.params.slug })
    if (!movie) return res.status(404).json({ error: 'Movie not found' })
    res.json(movie)
  } catch (err) {
    next(err)
  }
}

module.exports = { getFeaturedMovies, getMovies, getMovieBySlug }
