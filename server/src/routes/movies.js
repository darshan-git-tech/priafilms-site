const { Router } = require('express')
const {
  getMovies,
  getMovieBySlug,
} = require('../controllers/moviesController')

const router = Router()

// GET /api/movies
router.get('/', getMovies)

// GET /api/movies/:slug
router.get('/:slug', getMovieBySlug)

module.exports = router
