const express = require('express')
const router = express.Router()
const products = require('./products')
const { route } = require('./ProductService')
const bodyParser = require('body-parser')
const allProducts = [products.bodies,products.doors, products.boards].flat()
var jsonParser = bodyParser.json()
router.get('/', function (req, res) {
  res.send('Billing-Service!');
})
router.use(bodyParser.json())

router.post('/bill',jsonParser, (req, res)=>{
  console.log(req.body)
  const receivedOrderList = req.body

  const orderList = Array.from(receivedOrderList,(sentobject)=>{
    return product = products.find((element)=>{
      element.name == val.name
    })
  })

  const total = orderList.reduce((acc,val)=>{
    acc + price
  })

  res.json({
    order: orderList,
    total: total
  })
})
module.exports = router
