import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    expired: baseTheme.colors.red['500'],
    willExpire: baseTheme.colors.yellow['400'],
  },
  styles: {
    global: (props) => ({
      'html, body, div#__next': {
        height: '100%',
      },
    }),
  },
});

export default theme;
