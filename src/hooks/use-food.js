import { useQuery } from 'react-query';

const useFood = () => {
  const foodQuery = useQuery(
    'food',
    () => fetch('/api/food').then((res) => res.json()),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return foodQuery;
};

export default useFood;
