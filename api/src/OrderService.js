const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send('Order-Service!')
})

router.post('/', function (req, res) {
  console.log(req.body)
  res.json({
    orderId: 'dsaknkjlads78'
  })
  res.end()
})

module.exports = router
