const router = require('express').Router()
const { axios, parseURL } = require('./axios')

router.post('/', (req, res) => {
  axios.post(parseURL('/order'), req.body)
    .then(({data}) => {
      res.json(data)
      res.end()
    })
    .catch(e => {
      console.log('--DEBUG : e', e)
      res.end()
    })
})

module.exports = router
