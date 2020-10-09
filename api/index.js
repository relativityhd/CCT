const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())
app.use('/billing-service', require('./src/BillingService'))
app.use('/customer-service', require('./src/CustomerService'))
app.use('/order-service', require('./src/OrderService'))
app.use('/catalogue', require('./src/CatalogueService'))

app.get('*', (req, res) => {
  res.send('This is a dummy API-Service!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
