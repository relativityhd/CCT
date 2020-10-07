const express = require('express')
const router = express.Router()
const products = require('./products')

router.get('/', function (req, res) {
  res.send('Products-Service!')
})

router.get('/bodies', (req, res) => {
  res.json(products.bodies)
})

router.get('/doors', (req, res) => {
  res.json(products.doors)
})

router.get('/boards', (res, req) => {
  req.json(products.boards)
})
module.exports = router
