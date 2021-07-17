import { useQuery } from 'react-query';

import firebase from '../lib/firebase';
const firestore = firebase.firestore();

const fetchFood = async () => {
  const data = [];
  const querySnapshot = await firestore.collection('categories').get();

  querySnapshot.forEach((doc) => {
    const table = doc.data();
    const options = Object.keys(table).map((key) => ({
      ...table[key],
      id: key,
      unit: table[key].unit.id,
    }));

    data.push({ category: doc.id, options });
  });

  return data;
};

const useFood = () => {
  const foodQuery = useQuery(
    'food',
    fetchFood,
    //() => fetch('/api/food').then((res) => res.json()),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return foodQuery;
};

export default useFood;
