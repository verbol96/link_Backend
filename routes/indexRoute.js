const {Router} = require('express')
const router = new Router()
const orderRouter = require('./orderRouter')
const settingsRouter = require('./settingsRouter')

router.use('/order', orderRouter)
router.use('/settings', settingsRouter)

module.exports = router