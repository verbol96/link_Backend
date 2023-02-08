const {Router} = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/add',  productController.addProduct)
router.get('/getAll', productController.getAll)

module.exports = router