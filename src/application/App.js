import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RouteGate from 'application/RouteGate';

import Header from 'components/_common/Header';
import Footer from 'components/_common/Footer';

import ContextConfig from 'components/_context/ContextConfig';
import ContextUserData from 'components/_context/ContextUserData';

const App = props => {
	const [userData, setUserData] = useState(null);

	const cbSetUserData = uData => {
		setUserData(uData);
	};

	const setUserIsLogged = uData => {
		let logged = false;

		if (uData) {
			sessionStorage.setItem('is-logged', 'true');
			logged = true;
		} else {
			sessionStorage.removeItem('is-logged');
		}

		return logged;
	};

	const userIsLogged = setUserIsLogged(userData);

	return (
		<ContextConfig.Provider value={ props.configData }>
			<ContextUserData.Provider value={ { getUserData: userData ? JSON.parse(userData) : {}, setUserData: cbSetUserData } }>
				<Router basename='/#/'>
					<Header isLogged={ userIsLogged } />
					<div id="wrapper">
						<RouteGate isLogged={ userIsLogged } />
					</div>
					<Footer />
				</Router>
			</ContextUserData.Provider>
		</ContextConfig.Provider>
	);
};

export default App;
