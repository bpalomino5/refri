// Libraries
import { google } from 'googleapis';
import Select from 'react-select';
import Proptypes from 'prop-types';

async function getSheetItems({ range, valueRenderOption }) {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
      null,
      (process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY || '').replace(
        /\\n/g,
        '\n'
      ),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range,
      valueRenderOption,
    });

    const rows = response.data.values;

    return rows;
  } catch (err) {
    console.error(err);
  }
  return [];
}
const getOptionLabel = (option) => {
  let label = `${option.name}, `;
  if (option.quantity === 0) {
    label += '❌';
  } else {
    label += `${option.quantity} ${option.unit || ''}`;
  }
  return label;
};

export default function Sheets({ groupedOptions }) {
  return (
    <div>
      <Select
        placeholder="Check what's available"
        isClearable
        options={groupedOptions}
        getOptionLabel={getOptionLabel}
        noOptionsMessage={() => 'Not found'}
      />
    </div>
  );
}

Sheets.propTypes = {
  groupedOptions: Proptypes.arrayOf(Proptypes.object),
};

const getUnitFromTable = (units, formula) => {
  const index = parseInt(formula.slice(8), 10) - 2;
  return units[index];
};

const getCategoryFromTable = (categories, formula) => {
  const index = parseInt(formula.slice(13), 10) - 2;
  return categories[index];
};

const getDateFromFormula = (formula) => {
  const [year, month, day] = formula.slice(6, -1).split(',');
  return month ? `${month}/${day}/${year}` : null;
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
