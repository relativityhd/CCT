const express = require('express')
const router = express.Router()
const products = require('../data/products')

router.get('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId)
  const p = products.find((p) => p.id === productId)
  res.json({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    priceStarting: p.priceStarting,
    customizable: p.customizable,
    imageUrl: p.imageUrl,
  })
  res.end()
})

router.get('/:productId/selectables', (req, res) => {
  const productId = parseInt(req.params.productId)
  res.json(products.find((p) => p.id === productId).selectables)
  res.end()
})

module.exports = router
