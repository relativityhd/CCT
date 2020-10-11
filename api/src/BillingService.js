const express = require('express')
const router = express.Router()
const products = require('./products')
const { route } = require('./CatalogueService')
const bodyParser = require('body-parser')
const allProducts = [products.bodies, products.doors, products.boards].flat()
var jsonParser = bodyParser.json()
router.get('/', function (req, res) {
  res.send('Billing-Service!')
})
router.use(bodyParser.json())

module.exports = router
