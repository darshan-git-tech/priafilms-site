// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('[error]', err.stack || err.message)

  const statusCode = err.statusCode || err.status || 500
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error'
      : err.message || 'Something went wrong'

  res.status(statusCode).json({ error: message })
}

module.exports = errorHandler
