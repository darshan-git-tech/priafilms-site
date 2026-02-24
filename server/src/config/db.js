const mongoose = require('mongoose')

let isConnected = false

const connectDB = async () => {
  if (isConnected) return

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'pria_films',
    })
    isConnected = true
    console.log(`[db] MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error('[db] Connection failed:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
