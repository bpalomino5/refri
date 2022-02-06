// Libraries
import { firestore } from 'api/firebase';

// Components
import Select from 'react-select';
import {
  Spacer,
  ButtonGroup,
  Button,
  Container,
  Heading,
  Text,
  Center,
} from '@chakra-ui/react';

// Hooks
import { useRouter } from 'next/router';
import useFood from 'hooks/use-food';

export default function Home() {
  const router = useRouter();
  const foodQuery = useFood();

  const findItem = (option) => {
    foodQuery.data.forEach((category) =>
      category.options.forEach((item) => {
        if (item.id === option.id) {
          router.push(`/item/${option.id}?category=${category.category}`);
        }
      })
    );

    return null;
  };

  const getOptionLabel = (option) => {
    let label = `${option.name}, `;
    if (option.quantity === 0) {
      label += '❌';
    } else {
      label += `${option.quantity} ${option.unit ? option.unit.id : ''}`;
    }
    return label;
  };

  /*
   * Only updates item quantities
   */
  const updateAllItems = async () => {
    const ps = [];
    foodQuery.data.forEach((category) => {
      category.options.forEach((option) =>
        ps.push(
          firestore
            .collection('categories')
            .doc(category.category)
            .update({
              [`${option.id}.quantity`]: option.quantity,
            })
        )
      );
    });
    await Promise.all(ps);
  };

  return (
    <Container sx={{ height: '100%', d: 'flex', flexDirection: 'column' }}>
      <main>
        <Heading as="h1" size="3xl" sx={{ m: 5, textAlign: 'center' }}>
          Refri
        </Heading>
        <Select
          placeholder="Check what's available"
          options={foodQuery.data}
          getOptionLabel={getOptionLabel}
          getOptionValue={(option) => option.name}
          formatGroupLabel={(group) => group.category}
          noOptionsMessage={() => 'Not found'}
          onChange={findItem}
        />
        <ButtonGroup spacing={4} sx={{ my: 5 }}>
          <Button onClick={() => router.push('/add-item')}>Add</Button>
          <Button onClick={updateAllItems}>Save All</Button>
        </ButtonGroup>
      </main>

      <Spacer />

      <Center sx={{ py: 8, borderTop: '1px solid', borderColor: 'gray.200' }}>
        <Text>
          Powered by&nbsp;<b>BP</b>
        </Text>
      </Center>
    </Container>
  );
}
