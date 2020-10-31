module.exports = [
  {
    id: 0,
    name: 'Large',
    exteriors: [
      {
        id: 90,
        custom: {
          customized: true,
          height: 200,
          width: 100,
          depth: 80
        },
        accessories: [],
        interiors: [{ id: 91, quantity: 2 }],
        material: { id: 96 }
      },
      {
        id: 90,
        custom: {
          customized: true,
          height: 200,
          width: 200,
          depth: 80
        },
        accessories: [],
        interiors: [
          { id: 91, quantity: 2 },
          { id: 92, quantity: 3 }
        ],
        material: { id: 96 }
      },
      {
        id: 90,
        custom: {
          customized: true,
          height: 200,
          width: 100,
          depth: 80
        },
        accessories: [],
        interiors: [
          { id: 93, quantity: 2 },
          { id: 92, quantity: 3 }
        ],
        material: { id: 96 }
      }
    ]
  },
  {
    id: 1,
    name: 'Small',
    exteriors: [
      {
        id: 90,
        custom: {
          customized: true,
          height: 140,
          width: 100,
          depth: 60
        },
        accessories: [],
        interiors: [{ id: 91, quantity: 4 }],
        material: { id: 96 }
      }
    ]
  }
]
