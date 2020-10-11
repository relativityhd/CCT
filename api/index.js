const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000

app.use(cors())

app.use(bodyParser.json())
app.use(cors())
app.use('/', require('./src/OrderService'))
app.use('/catalogue', require('./src/ProductService'))

app.get('*', (req, res) => {
  res.end('This is a dummy API-Service!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
