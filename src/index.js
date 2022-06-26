import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';

//Redux
import store from './store/store';
import { Provider } from 'react-redux';

//Antd .css
import 'antd/dist/antd.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store} >
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

