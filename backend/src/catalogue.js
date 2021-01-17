/**
 * In the originally Version this backend just requested the data from another API-Gateway.
 * Since this API-Gateway is down now, I recreated it here with made up data.
 * Therefore some things like translations are not provided.
 */

const router = require('express').Router()

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = '//cablecard-cct-backend.eu-de.mybluemix.net'
} else {
  baseURL = '//localhost:3000'
}

router.get('/categories', (req, res) => {
  res.json([
    {
      "id": 0,
      "name": "Lowboards",
      "imageUrl": `${baseURL}/categories/lowboard.jpg`
    },
    {
      "id": 1,
      "name": "Sideboards",
      "imageUrl": `${baseURL}/categories/sideboard.jpg`
    },
    {
      "id": 2,
      "name": "Cupboards",
      "imageUrl": `${baseURL}/categories/cupboard.jpg`
    }
  ])
  res.end()
})

router.get('/categories/:id/products', (req, res) => {
  if (req.params.id === "0") {
    res.json([
      {
        "id": 100,
        "name": "Lowboard",
        "price": 200,
        "priceStarting": false,
        "customizable": false,
        "imageUrl": `${baseURL}/categories/lowboard.jpg`
      }
    ])
  } else if (req.params.id === "1") {
    res.json([
      {
        "id": 110,
        "name": "Sideboard",
        "price": 150,
        "priceStarting": false,
        "customizable": false,
        "imageUrl": `${baseURL}/categories/sideboard.jpg`
      }
    ])
  } else {
    res.json([
      {
        "id": 120,
        "name": "Cupboard",
        "price": 300,
        "priceStarting": true,
        "customizable": true,
        "imageUrl": `${baseURL}/categories/cupboard.jpg`
      }
    ])
  }
  res.end()
})

router.get('/products/:id', (req, res) => {
  if (req.params.id === "100") {
    res.json({
      "id": 1000,
      "name": "Lowboard",
      "description": "A simple Lowboard",
      "price": 200,
      "priceStarting": false,
      "customizable": false,
      "imageUrl": `${baseURL}/categories/lowboard.jpg`
    })
  } else if (req.params.id === "110") {
    res.json({
      "id": 110,
      "name": "Sideboard",
      "description": "A simple Sideboard",
      "price": 150,
      "priceStarting": false,
      "customizable": false,
      "imageUrl": `${baseURL}/categories/sideboard.jpg`
    })
  } else {
    res.json()
  }
  return res.end()

  get(`/catalogue/products/${req.params.id}`, (e, product) => {
    if (e) product = {}
    const isCustom = product.customizable
    if (e || !isCustom) {
      res.json(product)
      return res.end()
    }
    get(
      `/catalogue/products/${req.params.id}/selectables`,
      (e, selectables) => {
        product.exteriors = []
        product.interiors = []
        product.materials = []
        product.accessories = []
        selectables.forEach((selectable) => {
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
      }
    )
  })
})

module.exports = router
