// Libraries
import Proptypes from 'prop-types';

// API
import getSheetItems from 'api/sheets';

// Components
import Select from 'react-select';
import { Spacer, Container, Heading, Text, Center } from '@chakra-ui/react';

// Utilities
import {
  getOptionLabel,
  getUnitFromTable,
  getCategoryFromTable,
  getDateFromFormula,
} from 'utilities/select';

export default function Sheets({ groupedOptions }) {
  return (
    <Container sx={{ height: '100%', d: 'flex', flexDirection: 'column' }}>
      <main>
        <Heading as="h1" size="3xl" sx={{ m: 5, textAlign: 'center' }}>
          Refri
        </Heading>
        <Select
          placeholder="Check what's available"
          isClearable
          options={groupedOptions}
          getOptionLabel={getOptionLabel}
          noOptionsMessage={() => 'Not found'}
        />
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

Sheets.propTypes = {
  groupedOptions: Proptypes.arrayOf(Proptypes.object),
};

export async function getStaticProps() {
  const rows = await getSheetItems({
    range: 'Items',
    valueRenderOption: 'FORMULA',
  });

  let units = await getSheetItems({
    range: 'Units',
  });

  let categories = await getSheetItems({
    range: 'Categories',
  });

  units = units.slice(1).map((unit) => unit[0]);
  categories = categories.slice(1).map((category) => category[0]);

  const items = rows.slice(1).map((itemRow) => ({
    name: itemRow[0],
    quantity: itemRow[1],
    unit: getUnitFromTable(units, itemRow[2]),
    date: getDateFromFormula(itemRow[3]),
    category: getCategoryFromTable(categories, itemRow[4]),
  }));

  const groupedOptions = categories.map((category) => {
    return {
      label: category,
      options: items.filter((item) => item.category === category),
    };
  });

  return {
    props: { groupedOptions },
  };
}
