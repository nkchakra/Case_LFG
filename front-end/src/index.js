import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
