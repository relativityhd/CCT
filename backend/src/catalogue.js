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
      "name": "Highboards",
      "imageUrl": `${baseURL}/categories/highboard.jpg`
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
        "name": "Highboard",
        "price": 150,
        "priceStarting": false,
        "customizable": false,
        "imageUrl": `${baseURL}/categories/highboard.jpg`
      }
    ])
  } else {
    res.json([
      {
        "id": 2, // is hardcoded in frontend since the bad given API Design
        "name": "Cupboard",
        "price": 120,
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
      "id": 100,
      "name": "Lowboard",
      "price": 200,
      "priceStarting": false,
      "customizable": false,
      "imageUrl": `${baseURL}/categories/lowboard.jpg`
    })
  } else if (req.params.id === "110") {
    res.json({
        "id": 110,
        "name": "Highboard",
        "price": 150,
        "priceStarting": false,
        "customizable": false,
        "imageUrl": `${baseURL}/categories/highboard.jpg`
      })
  } else {
    res.json({
      "id": 2, // is hardcoded in frontend since the bad given API Design
      "name": "Cupboard",
      "price": 120,
      "priceStarting": true,
      "customizable": true,
      "imageUrl": `${baseURL}/categories/cupboard.jpg`,
      exteriors: [{
        "id": 90,
        "name": "Frame",
        "price": 120,
        "selectableCategory": "exterior",
        "customizable": true,
        "imageUrl": `${baseURL}/parts/korpus.jpg`
      }],
      interiors: [{
        "id": 91,
        "name": "Shelf",
        "price": 20,
        "selectableCategory": "interior",
        "customizable": true,
        "imageUrl": `${baseURL}/parts/boden.jpg`
      },
      {
        "id": 92,
        "name": "Clothes rail",
        "price": 10,
        "selectableCategory": "interior",
        "customizable": true,
        "imageUrl": `${baseURL}/parts/kleiderstange.jpg`
      },
      {
        "id": 93,
        "name": "Mesh basket",
        "price": 20,
        "selectableCategory": "interior",
        "customizable": true,
        "imageUrl": `${baseURL}/parts/korb.jpg`
      },
      {
        "id": 94,
        "name": "Drawer",
        "price": 40,
        "selectableCategory": "interior",
        "customizable": true,
        "imageUrl": `${baseURL}/parts/schublade.jpg`
      }],
      materials: [{
        "id": 95,
        "name": "White",
        "price": 0,
        "selectableCategory": "material",
        "customizable": false,
        "imageUrl": `${baseURL}/mats/white.jpg`
      },
      {
        "id": 96,
        "name": "Maple",
        "price": 40,
        "selectableCategory": "material",
        "customizable": false,
        "imageUrl": `${baseURL}/mats/ahorn.jpg`
      },
      {
        "id": 97,
        "name": "Walnut",
        "price": 80,
        "selectableCategory": "material",
        "customizable": false,
        "imageUrl": `${baseURL}/mats/nussbaum.jpg`
      },
      {
        "id": 98,
        "name": "Birch",
        "price": 40,
        "selectableCategory": "material",
        "customizable": false,
        "imageUrl": `${baseURL}/mats/birke.jpg`
      }],
      accessories: [{
        "id": 99,
        "name": "Lamp",
        "price": 20,
        "selectableCategory": "accessories",
        "customizable": false,
        "imageUrl": `${baseURL}/parts/lamp.jpg`
      }]
    })
  }
  res.end()
})

module.exports = router
