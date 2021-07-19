import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      'html, body, div#__next': {
        height: '100%',
      },
    }),
  },
});

export default theme;
