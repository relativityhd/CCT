const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/catalogue', require('./src/catalogue'))
app.use('/order', require('./src/order'))

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
