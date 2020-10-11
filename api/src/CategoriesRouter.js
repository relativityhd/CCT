const express = require('express')
const router = express.Router()
const categories = require('../data/categories')
const products = require('../data/products')

router.get('/', (req, res) => {
  res.json(categories)
  return res.end()
})

router.get('/:categoryId/products', (req, res) => {
  const categoryId = parseInt(req.params.categoryId)
  res.json(
    products
      .filter((p) => p.categoryId === categoryId)
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        priceStarting: p.priceStarting,
        customizable: p.customizable,
        imageUrl: p.customizable,
      }))
  )
  res.end()
})

module.exports = router
