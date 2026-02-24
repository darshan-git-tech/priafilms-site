const { Router } = require('express')
const { getAbout } = require('../controllers/aboutController')

const router = Router()

// GET /api/about
router.get('/', getAbout)

module.exports = router
