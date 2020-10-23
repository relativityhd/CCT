const express = require('express')
const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')
const history = require('connect-history-api-fallback')

const credentials = {
  key: fs.readFileSync('./certificates/localhost-key.pem'),
  cert: fs.readFileSync('./certificates/localhost.pem')
}

const app = express()
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 443

app.use(history())
app.use(express.static(path.join(__dirname, 'dist')))

https.createServer(credentials, app).listen(port, () => {
  console.log(`App listening at https://localhost:${port}`)
})

// Server-side redirect from http to https
const appHTTP = express()
appHTTP.get('*', (req, res) => {
  res.redirect(`https://${req.headers.host + req.url}`)
  res.end()
})

http.createServer(appHTTP).listen(80, () => {
  console.log(`App listening at http://localhost:${80}`)
})
