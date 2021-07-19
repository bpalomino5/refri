// Libraries
import firebase from '../lib/firebase';
const firestore = firebase.firestore();

// Hooks
import { useRouter } from 'next/router';
import { useState } from 'react';
import useCollection from '../hooks/use-collection';

const AddItem = () => {
  const router = useRouter();
  const [category, setCategory] = useState('Dairy');
  const [unit, setUnit] = useState('bottle(s)');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const categoriesQuery = useCollection('categories');
  const unitsQuery = useCollection('units');

  if (categoriesQuery.isLoading || unitsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const saveItem = async () => {
    const id = name.replace(/\s/g, '-').toLowerCase();

    await firestore
      .collection('categories')
      .doc(category)
      .update({
        [id]: {
          name,
          quantity: parseInt(quantity),
          unit,
        },
      });

    router.back();
  };

  return (
    <div style={{ padding: 12 }}>
      <h1>Add Item</h1>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <label for="category">category</label>
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          {categoriesQuery.data.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>

        <label for="name">name</label>
        <input
          value={name}
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />

        <label for="quantity">quantity</label>
        <input
          value={quantity}
          name="quantity"
          id="quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />

        <label for="unit">unit</label>
        <select
          name="unit"
          id="unit"
          onChange={(e) => setUnit(e.target.value)}
          value={unit}
        >
          {unitsQuery.data.map((unit) => (
            <option value={unit}>{unit}</option>
          ))}
        </select>

        <button type="button" style={{ marginTop: 8 }} onClick={saveItem}>
          Save
        </button>
      </form>
    </div>
  );
};

export default AddItem;
