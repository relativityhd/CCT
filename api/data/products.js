let products = []
for (let i = 0; i < 10; i++) {
  let selectables = []
  for (let j = 0; j < 5; j++) {
    selectables.push({
      id: j,
      name: 'string',
      price: Math.random() * 50 + 10,
      customizable: Math.random() >= 0.5,
      imageUrl: 'https://morris-antikshop.de/media/images/info/IMG_3534_1.jpg',
    })
  }
  products.push({
    id: i,
    categoryId: 1,
    name: 'string',
    description: 'string',
    price: Math.random() * 500 + 50,
    priceStarting: Math.random() >= 0.5,
    customizable: Math.random() >= 0.5,
    imageUrl: 'https://morris-antikshop.de/media/images/info/IMG_3534_1.jpg',
    selectables: selectables,
  })
}

module.exports = products
