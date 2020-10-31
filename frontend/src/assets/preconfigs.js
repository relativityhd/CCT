module.exports = [
  {
    id: 0,
    name: 'Josef',
    category: 'highboards',
    exteriors: [
      {
        id: 90,
        quantity: 1,
        custom: { customized: true, height: 200, width: 100, depth: 80 },
        interiors: [
          {
            id: 91,
            quantity: 2
          },
          {
            id: 92,
            quantity: 1
          },
          {
            id: 93,
            quantity: 1
          },
          {
            id: 94,
            quantity: 1
          }
        ],
        accessories: [
          {
            id: 99,
            quantity: 1
          }
        ],
        material: {
          id: 96
        }
      },
      {
        id: 90,
        custom: { customized: true, height: 200, width: 160, depth: 80 },
        interiors: [
          {
            id: 92,
            quantity: 1
          },
          {
            id: 94,
            quantity: 6
          },
          {
            id: 93,
            quantity: 1
          }
        ],
        accessories: [],
        material: {
          id: 96
        }
      },
      {
        id: 90,
        custom: { customized: true, height: 200, width: 100, depth: 80 },
        interiors: [
          {
            id: 92,
            quantity: 1
          },
          {
            id: 91,
            quantity: 6
          }
        ],
        accessories: [],
        material: {
          id: 96
        }
      }
    ]
  },
  {
    name: 'Karlson',
    id: 1,
    category: 'highboards',
    exteriors: [
      {
        id: 90,
        custom: { customized: true, height: 180, width: 100, depth: 80 },
        interiors: [
          {
            id: 92,
            quantity: 1
          },
          {
            id: 91,
            quantity: 5
          }
        ],
        accessories: [
          {
            id: 99,
            quantity: 1
          }
        ],
        material: {
          id: 98
        }
      },
      {
        id: 90,
        custom: { customized: true, height: 180, width: 100, depth: 80 },
        interiors: [
          {
            id: 91,
            quantity: 3
          },
          {
            id: 92,
            quantity: 1
          },
          {
            id: 93,
            quantity: 1
          },
          {
            id: 94,
            quantity: 1
          }
        ],
        accessories: [
          {
            id: 99,
            quantity: 1
          }
        ],
        material: {
          id: 98
        }
      }
    ]
  },
  {
    id: 101,
    name: 'Large',
    category: 'template',
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
    category: 'template',
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
