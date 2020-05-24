import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import cartReducer, { saveState } from './scripts/cartReducer';
import './index.css';
import App from './App';
import throttle from 'lodash.throttle';
import * as serviceWorker from './serviceWorker';

const store = createStore(cartReducer);

store.subscribe(
  throttle(() => {
    saveState(store.getState().addedItems);
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
