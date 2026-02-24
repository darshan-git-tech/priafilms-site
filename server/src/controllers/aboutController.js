const About = require('../models/About')

// GET /api/about
const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne().sort({ updatedAt: -1 })
    if (!about) return res.status(404).json({ error: 'About content not found' })
    res.json(about)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAbout }
