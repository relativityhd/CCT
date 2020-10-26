const router = require('express').Router()
const cfenv = require('cfenv')
const { get } = require('./axios')

router.get('/categories', (req, res) => {
  get('/catalogue/categories', (e, d) => {
    if (e) d = {}
    res.json(d)
    res.end()
  })
})

router.get('/categories/:id/products', (req, res) => {
  get(`/catalogue/categories/${req.params.id}/products`, (e, d) => {
    if (e) d = {}
    res.json(d)
    res.end()
  })
})

router.get('/products/:id', (req, res) => {
  get(`/catalogue/products/${req.params.id}`, (e, product) => {
    if (e) product = {}
    const isCustom = product.customizable
    if (e || !isCustom) {
      res.json(product)
      return res.end()
    }
    get(`/catalogue/products/${req.params.id}/selectables`, (e, selectables) => {
      product.exteriors = []
      product.interiors = []
      product.materials = []
      product.accessories = []
      selectables.forEach(selectable => {
        switch (selectable.selectableCategory) {
          case 'exterior':
            product.exteriors.push(selectable)
            break
          case 'interior':
            product.interiors.push(selectable)
            break
          case 'material':
            product.materials.push(selectable)
            break
          case 'accessories':
            product.accessories.push(selectable)
            break
          default:
            break
        }
      })
      res.json(product)
      res.end()
    })
  })
})

module.exports = router
