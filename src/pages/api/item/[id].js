const items = {
  'almond-milk': {
    name: 'almond milk',
    quantity: 1,
    unit: 'bottle(s)',
    category: 'Dairy',
  },
  'a2-milk': {
    name: 'a2 milk',
    quantity: 1,
    unit: 'bottle(s)',
    category: 'Dairy',
  },
  apple: { name: 'apple', quantity: 1, unit: null, category: 'Fruits' },
  orange: { name: 'orange', quantity: 2, unit: null, category: 'Fruits' },
  chicha: {
    name: 'chicha',
    quantity: 10,
    unit: 'bottle(s)',
    category: 'Juice',
  },
};

export default function handler(req, res) {
  const { id } = req.query;
  res.status(200).json(items[id]);
}
