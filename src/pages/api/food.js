const food = [
  {
    category: 'Dairy',
    options: [
      { name: 'almond milk', quantity: 1, unit: 'bottle(s)' },
      { name: 'a2 milk', quantity: 1, unit: 'bottle(s)' },
    ],
  },
  {
    category: 'Fruits',
    options: [
      { name: 'apple', quantity: 1, unit: null },
      { name: 'orange', quantity: 2, unit: null },
    ],
  },
  {
    category: 'Juice',
    options: [{ name: 'chicha', quantity: 10, unit: 'bottle(s)' }],
  },
];

export default function handler(req, res) {
  res.status(200).json(food);
}
