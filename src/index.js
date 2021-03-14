import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';


const application =(
  <BrowserRouter>
      <App/>
  </BrowserRouter>
)



ReactDOM.render(application, document.getElementById('root'));
reportWebVitals();
