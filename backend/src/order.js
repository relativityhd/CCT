const router = require('express').Router()
const { axios, parseURL } = require('./axios')

router.post('/', (req, res) => {
  console.log(req.body)
  axios
    .post(parseURL('/order'), req.body)
    .then(({ data }) => {
      res.json(data)
      res.end()
    })
    .catch((e) => {
      console.log('--DEBUG : e', e)
      res.end()
    })
})

module.exports = router
