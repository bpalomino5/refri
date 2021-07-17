// Libraries
import { useQuery, useQueryClient } from 'react-query';

// Hooks
import { useRouter } from 'next/router';
import useFood from '../../hooks/use-food';

const FoodItem = () => {
  const router = useRouter();
  const { category, option, id } = router.query;

  const queryClient = useQueryClient();
  const foodQuery = useFood();

  const incQuantity = () => {
    const item = foodQuery.data[category].options[option];

    item.quantity += 1;
    queryClient.setQueryData('food', foodQuery.data);
  };

  const decQuantity = () => {
    const item = foodQuery.data[category].options[option];

    if (item.quantity > 0) {
      item.quantity -= 1;
      queryClient.setQueryData('food', foodQuery.data);
    }
  };

  const updateItem = () => {
    // update API
    console.log('update api call');
    router.back();
  };

  if (foodQuery.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div style={{ margin: 25 }}>
      <p>Item: {id}</p>
      <pre>
        {JSON.stringify(foodQuery.data[category].options[option], null, 2)}
      </pre>
      <button type="button" onClick={incQuantity}>
        +
      </button>
      <button type="button" onClick={decQuantity}>
        -
      </button>
      <button type="button" onClick={updateItem}>
        Save
      </button>
    </div>
  );
};

export default FoodItem;
