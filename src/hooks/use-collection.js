import { useQuery } from 'react-query';

import firebase from '../lib/firebase';
const firestore = firebase.firestore();

const fetchCollection = async (collectionId) => {
  const querySnapshot = await firestore.collection(collectionId).get();

  return querySnapshot.docs.map((doc) => doc.id);
};

const useCollection = (collectionId) => {
  const collectionQuery = useQuery(
    ['collection', collectionId],
    () => fetchCollection(collectionId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return collectionQuery;
};

export default useCollection;