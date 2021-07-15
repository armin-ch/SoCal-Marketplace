const router = require('express').Router()

// routes here
router.use('/api', require('./userRoutes'))
router.use('/api', require('./reviewRoutes'))
router.use('/api', require('./listingRoutes'))
router.use('/api', require('./categoryRoutes'))

module.exports = router
