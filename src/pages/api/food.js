const food = [
  {
    category: 'Dairy',
    options: [
      {
        id: 'almond-milk',
        name: 'almond milk',
        quantity: 1,
        unit: 'bottle(s)',
      },
      { id: 'a2-milk', name: 'a2 milk', quantity: 1, unit: 'bottle(s)' },
    ],
  },
  {
    category: 'Fruits',
    options: [
      { id: 'apple', name: 'apple', quantity: 1, unit: null },
      { id: 'orange', name: 'orange', quantity: 2, unit: null },
    ],
  },
  {
    category: 'Juice',
    options: [
      { id: 'chicha', name: 'chicha', quantity: 10, unit: 'bottle(s)' },
    ],
  },
];

export default function handler(req, res) {
  res.status(200).json(food);
}
