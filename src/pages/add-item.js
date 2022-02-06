// Libraries
import Proptypes from 'prop-types';
import { firestore } from 'api/firebase';

// Components
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Container,
  Center,
  Heading,
  Button,
  HStack,
  useNumberInput,
} from '@chakra-ui/react';

// Hooks
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import useCollection from '../hooks/use-collection';

const NumberInput = ({ quantity, setQuantity }) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      min: 0,
      value: quantity,
      onChange: (valueString) => setQuantity(valueString),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Button {...inc}>+</Button>
      <Input {...input} />
      <Button {...dec}>-</Button>
    </HStack>
  );
};

NumberInput.propTypes = {
  quantity: Proptypes.number,
  setQuantity: Proptypes.func,
};

const AddItem = () => {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [unit, setUnit] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const categoriesQuery = useCollection('categories');
  const unitsQuery = useCollection('units');

  const queryClient = useQueryClient();

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
          quantity: parseInt(quantity, 10),
          unit: firestore.collection('units').doc(unit),
        },
      });

    await queryClient.invalidateQueries('food', { refetchInactive: true });
    router.back();
  };

  return (
    <Container sx={{ p: 4 }}>
      <Center>
        <Heading as="h1">Add Item</Heading>
      </Center>

      <Box sx={{ my: 4, d: 'flex', flexDirection: 'column' }}>
        <FormControl id="category" sx={{ mb: 4 }}>
          <FormLabel>Category</FormLabel>
          <Select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            placeholder="Select category"
          >
            {categoriesQuery.data.map((categoryDoc) => (
              <option value={categoryDoc.id}>{categoryDoc.id}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="item-name" sx={{ mb: 4 }}>
          <FormLabel>Item name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl id="quantity" sx={{ mb: 4 }}>
          <FormLabel>Quantity</FormLabel>
          <NumberInput quantity={quantity} setQuantity={setQuantity} />
        </FormControl>

        <FormControl id="unit" sx={{ mb: 4 }}>
          <FormLabel>Unit</FormLabel>
          <Select
            onChange={(e) => setUnit(e.target.value)}
            value={unit}
            placeholder="Select unit"
          >
            {unitsQuery.data.map((unitDoc) => (
              <option value={unitDoc.id}>{unitDoc.id}</option>
            ))}
          </Select>
        </FormControl>

        <Button onClick={saveItem}>Save</Button>
      </Box>
    </Container>
  );
};

export default AddItem;
