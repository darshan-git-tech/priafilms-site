const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const moviesRoutes = require('./routes/movies')
const aboutRoutes = require('./routes/about')
const contactRoutes = require('./routes/contact')
const errorHandler = require('./middleware/errorHandler')
const { getFeaturedMovies } = require('./controllers/moviesController')

const app = express()

// Security
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', limiter)

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// Body parsing
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/api/featured-movies', getFeaturedMovies)
app.use('/api/movies', moviesRoutes)
app.use('/api/about', aboutRoutes)
app.use('/api/contact', contactRoutes)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }))

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }))

// Global error handler
app.use(errorHandler)

module.exports = app
