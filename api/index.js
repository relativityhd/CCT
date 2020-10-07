const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000

app.use(cors())

app.use('/billing-service', require('./src/BillingService'))
app.use('/customer-service', require('./src/CustomerService'))
app.use('/order-service', require('./src/OrderService'))
app.use('/product-service', require('./src/ProductService'))

app.get('*', (req, res) => {
  res.end('This is a dummy API-Service!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
