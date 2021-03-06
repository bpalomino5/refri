// Libraries
import { useQuery } from 'react-query';
import { firestore } from 'api/firebase';

const fetchFood = async () => {
  const data = [];
  const querySnapshot = await firestore.collection('categories').get();

  querySnapshot.forEach((doc) => {
    const table = doc.data();
    const options = Object.keys(table).map((key) => ({
      ...table[key],
      id: key,
    }));

    data.push({ category: doc.id, options });
  });

  return data;
};

const useFood = () => {
  const foodQuery = useQuery('food', fetchFood, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return foodQuery;
};

export default useFood;
