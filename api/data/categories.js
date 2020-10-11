let categories = []
let categoryNames = ['Otto', 'Ole', 'Oskar']
for (let i = 0; i < 3; i++) {
  categories.push({
    id: i,
    name: categoryNames[i],
    imageUrl:
      'https://i.pinimg.com/564x/ad/63/f3/ad63f3314d8a2a129859993b4a30cb80.jpg',
  })
}

module.exports = categories
