let selectableNames = ['Nathalie', 'Nike', 'Noah', 'Neo', 'Nils']
let productNames = [
  'Anton',
  'Aneliese',
  'Antonia',
  'Alex',
  'Aron',
  'Anton',
  'Anna',
  'Adrian',
  'Amy',
  'Ariel',
]
let products = []

for (let i = 0; i < 10; i++) {
  let selectables = []
  for (let j = 0; j < 5; j++) {
    selectables.push({
      id: j,
      name: selectableNames[j],
      price: Math.random() * 50 + 10,
      customizable: Math.random() >= 0.5,
      imageUrl: 'https://morris-antikshop.de/media/images/info/IMG_3534_1.jpg',
    })
  }
  products.push({
    id: i,
    categoryId: Math.floor(Math.random() * 3),
    name: productNames[i],
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
    price: Math.random() * 500 + 50,
    priceStarting: Math.random() >= 0.5,
    customizable: Math.random() >= 0.5,
    imageUrl: 'https://morris-antikshop.de/media/images/info/IMG_3534_1.jpg',
    selectables: selectables,
  })
}

module.exports = products
