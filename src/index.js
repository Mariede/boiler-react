import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from 'App';
import 'assets/css/global.css';

const StartApp = () => {
	return new Promise((resolve, reject) => {
		try {
			const configUrl = document.getElementById('appConfig').src;

			// Le o arquivo de configuracao da aplicacao
			axios.get(
				configUrl
			)
			.then(
				result => {
					resolve(Object.freeze(result.data));
				}
			)
			.catch(
				err => {
					reject(err);
				}
			);
		} catch(err) {
			reject(err);
		}
	});
};

StartApp()
.then(
	configData => {
		ReactDOM.render(<App configData={ configData } />, document.getElementById('root'));
	}
)
.catch(
	err => {
		throw err;
	}
);
