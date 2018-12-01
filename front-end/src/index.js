import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Router, Route, Link, Switch} from 'react-router-dom';
import Feed from './Components/Feed';



ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>, 
	document.getElementById('root'));
serviceWorker.unregister();
