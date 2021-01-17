const router = require('express').Router()
const { v4: uuidv4 } = require('uuid')

router.post('/', (req, res) => {
  res.json({"orderId": uuidv4()})
  res.status(200).end()
})

module.exports = router
