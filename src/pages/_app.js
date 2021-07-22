// Libraries
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import Proptypes from 'prop-types';

// Styles
import theme from '../styles/theme';

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

App.propTypes = {
  Component: Proptypes.func,
  pageProps: Proptypes.objectOf(Proptypes.node),
};

export default App;
