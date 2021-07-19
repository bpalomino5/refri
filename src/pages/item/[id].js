// Libraries
import { useQuery, useQueryClient } from 'react-query';
import firebase from '../../lib/firebase';
const firestore = firebase.firestore();

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
import { useRouter } from 'next/router';
import useFood from '../../hooks/use-food';

const FoodItem = () => {
  const router = useRouter();
  const { category, option, id } = router.query;

  const queryClient = useQueryClient();
  const foodQuery = useFood();

  const item = foodQuery.data[category].options[option];

  const incQuantity = () => {
    item.quantity += 1;
    queryClient.setQueryData('food', foodQuery.data);
  };

  const decQuantity = () => {
    if (item.quantity > 0) {
      item.quantity -= 1;
      queryClient.setQueryData('food', foodQuery.data);
    }
  };

  const updateItem = async () => {
    const docId = foodQuery.data[category].category;

    await firestore
      .collection('categories')
      .doc(docId)
      .update({
        [`${id}.quantity`]: item.quantity,
      });
    router.back();
  };

  if (foodQuery.isLoading) {
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
          {Object.keys(item).map((k) => (
            <Tr>
              <Td>{k}</Td>
              <Td>{item[k]}</Td>
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
