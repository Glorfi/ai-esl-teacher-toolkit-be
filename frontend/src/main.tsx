import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContextProvider.tsx';
const isProduction = process.env.NODE_ENV === 'production';

// basename={isProduction ? '/ai-exercises-generator/' : '/'}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter >
      {/* <HashRouter> */}
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
    {/* </HashRouter> */}
  </React.StrictMode>
);
