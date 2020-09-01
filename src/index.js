import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import App from 'application/App';

import errWrapper from 'helpers/errWrapper';

import 'assets/css/global.css';

const startApp = () => new Promise(
	(resolve, reject) => {
		const appConfigUrl = document.getElementById('appConfig').src;

		// Le o arquivo de configuracao da aplicacao
		axios
		.get(
			appConfigUrl
		)
		.then(
			result => {
				resolve(result.data);
			}
		)
		.catch(
			err => {
				reject(err);
			}
		);
	}
);

startApp()
.then(
	configData => {
		ReactDOM.render(
			<App configData={ configData } />,
			document.getElementById('root')
		);
	}
)
.catch(
	err => {
		errWrapper('config.json', err);
	}
);
