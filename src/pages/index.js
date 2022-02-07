// Libraries
import Proptypes from 'prop-types';

// API
import getSheetItems from 'api/sheets';

// Components
import Select from 'react-select';
import { Spacer, Container, Heading } from '@chakra-ui/react';
import Option from 'components/option';
import Footer from 'components/footer';

// Utilities
import {
  getOptionLabel,
  getUnitFromTable,
  getCategoryFromTable,
  getDateFromFormula,
  sanitizeQuantity,
} from 'utilities/select';

export default function Sheets({ groupedOptions }) {
  return (
    <Container sx={{ height: '100%', d: 'flex', flexDirection: 'column' }}>
      <main>
        <Heading as="h1" size="3xl" sx={{ m: 5, textAlign: 'center' }}>
          Inventory
        </Heading>
        <Select
          components={{ Option }}
          placeholder="Check what's available"
          isClearable
          options={groupedOptions}
          getOptionLabel={getOptionLabel}
          noOptionsMessage={() => 'Not found'}
        />
      </main>
      <Spacer />
      <Footer />
    </Container>
  );
}

Sheets.propTypes = {
  groupedOptions: Proptypes.arrayOf(Proptypes.any),
};

export async function getServerSideProps() {
  // Query Inventory Data
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

  // Remove Header Data
  units = units.slice(1).map((unit) => unit[0]);
  categories = categories.slice(1).map((category) => category[0]);

  // Reformat items into JSON array
  const items = rows.slice(1).map((itemRow) => ({
    name: itemRow[0],
    quantity: sanitizeQuantity(itemRow[1]),
    unit: getUnitFromTable(units, itemRow[2]),
    expirationDate: getDateFromFormula(itemRow[3]),
    category: getCategoryFromTable(categories, itemRow[4]),
  }));

  // Group item objects by category for render in Select Provider
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
