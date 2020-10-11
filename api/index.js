const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())
app.use('/', require('./src/OrderService'))
app.use('/catalogue', require('./src/ProductService'))

app.get('*', (req, res) => {
  res.send('This is a dummy API-Service!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
