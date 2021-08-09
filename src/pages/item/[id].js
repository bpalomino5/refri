// Libraries
import { firestore } from '../../lib/firebase';

// Components
import {
  Container,
  Heading,
  HStack,
  Button,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from '@chakra-ui/react';

// Hooks
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import useFood from '../../hooks/use-food';

const FoodItem = () => {
  const router = useRouter();
  const [item, setItem] = useState(null);
  const { category, id } = router.query;

  const foodQuery = useFood();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (foodQuery.status === 'success') {
      const selectedItem = foodQuery.data
        .find((cat) => cat.category === category)
        .options.find((o) => o.id === id);

      setItem(selectedItem);
    }
  }, [foodQuery.status]);

  const incQuantity = () => {
    setItem({
      ...item,
      quantity: item.quantity + 1,
    });
  };

  const decQuantity = () => {
    if (item.quantity > 0) {
      setItem({
        ...item,
        quantity: item.quantity - 1,
      });
    }
  };

  const updateItem = async () => {
    await firestore
      .collection('categories')
      .doc(category)
      .update({
        [`${id}.quantity`]: item.quantity,
      });

    await queryClient.invalidateQueries('food');
    router.back();
  };

  if (foodQuery.isLoading || !item) {
    return <div>loading...</div>;
  }

  return (
    <Container centerContent>
      <Heading as="h1" sx={{ my: 4 }}>
        {id}
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Properties</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(item)
            .sort()
            .map((k) => (
              <Tr key={k}>
                <Td>{k}</Td>
                <Td>{k === 'unit' ? item[k].id : item[k]}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <HStack sx={{ mt: 4 }}>
        <Button onClick={incQuantity}>+</Button>
        <Button onClick={decQuantity}>-</Button>
        <Button onClick={updateItem}>Save</Button>
      </HStack>
    </Container>
  );
};

export default FoodItem;
