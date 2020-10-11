const express = require('express')
const router = express.Router()
const products = require('./products')

router.get('/', function (req, res) {
  res.send('Products-Service!')
})

router.use('/products', require('./ProductsRouter'))
router.use('/categories', require('./CategoriesRouter'))

module.exports = router
