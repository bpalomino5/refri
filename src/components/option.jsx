// Libraries
import Proptypes from 'prop-types';

// Components
import { components } from 'react-select';
import { Box } from '@chakra-ui/react';

const todayDate = Date.now();

const Option = (props) => {
  const { data } = props;
  const expiryDate = Date.parse(data.date);

  return (
    <Box
      sx={{
        bg: expiryDate < todayDate && 'expired',
        color: expiryDate < todayDate && 'white',
      }}
    >
      <components.Option {...props} />
    </Box>
  );
};

Option.propTypes = {
  data: Proptypes.objectOf(Proptypes.any),
};

export default Option;
