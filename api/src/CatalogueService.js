const express = require('express')
const router = express.Router()
const products = require('./products')
const categories = require('./categories').categories
const allproducts = Object.values(products).flat()

router.get('/', function (req, res) {
  res.send('Products-Service!')
})

router.get('/categories', (req, res) => {
  res.json(categories)
})
router.get('/categories/:categoryId', (req, res) => {
  const category = categories.find(
    (element) => req.params.categoryId == element.id
  )
  res.json(products[category.name])
})
router.get('/products/:productId', (req, res) => {
  const product = allproducts.find(
    (element) => element.id == req.params.producId
  )
  res.send(product)
})
module.exports = router
