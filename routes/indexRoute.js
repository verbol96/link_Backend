const {Router} = require('express')
const router = new Router()
const orderRouter = require('./orderRouter')

router.use('/order', orderRouter)

module.exports = router