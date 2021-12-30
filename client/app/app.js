/**
 *
 * app.js
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';

import store, { history } from './store';
import { SET_AUTH } from './containers/Authentication/constants';
import Application from './containers/Application';
import ScrollToTop from './scrollToTop';
import setToken from './utils/token';
import bsc, { UseWalletProvider } from '@binance-chain/bsc-use-wallet';
import { getNodeUrl } from './utils/getRpcUrl'
import { QueryClient, QueryClientProvider } from 'react-query'

// Import application sass styles
import './styles/style.scss';

// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// react-bootstrap-table2 styles
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// rc-slider style
import 'rc-slider/assets/index.css';

// react-toastify
import 'react-toastify/dist/ReactToastify.css';

// Authentication
const token = localStorage.getItem('token');

if (token) {
  // authenticate api authorization
  setToken(token);

  // authenticate routes
  store.dispatch({ type: SET_AUTH });
}
const rpcUrl = getNodeUrl();
const queryClient = new QueryClient()

const app = () => (
  <UseWalletProvider 
      chainId={parseInt(97)}
      connectors={{
        walletconnect: { rpcUrl },
        bsc,
      }}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <ScrollToTop>
                <Application />
              </ScrollToTop>
            </ConnectedRouter>
            <ToastContainer
              position='bottom-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Provider>
        </QueryClientProvider>

  </UseWalletProvider>
);

export default app;
