const {Router} = require('express')
const router = new Router()
const orderRouter = require('./orderRouter')
const settingsRouter = require('./settingsRouter')
const authRouter = require('./authRouter')

router.use('/order', orderRouter)
router.use('/settings', settingsRouter)
router.use('/auth', authRouter)

module.exports = router