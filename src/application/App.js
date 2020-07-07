import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RouteGate from 'application/RouteGate';

import Header from 'components/_common/Header';
import Footer from 'components/_common/Footer';

import ContextConfig from 'components/_context/ContextConfig';
import ContextUserData from 'components/_context/ContextUserData';

const App = props => {
	const [userData, setUserData] = useState(undefined);

	const changeUserData = uData => {
		setUserData(uData);
	};

	const checkUserIsLogged = uData => {
		if (uData) {
			sessionStorage.setItem('is-logged', true);
			return true;
		}

		return false;
	};

	const isLogged = checkUserIsLogged(userData);

	return (
		<ContextConfig.Provider value={ props.configData }>
			<ContextUserData.Provider value={ { getUserData: userData ? JSON.parse(userData) : {}, setUserData: changeUserData } }>
				<Router>
					<Header isLogged={ (userData !== undefined ? isLogged : undefined) } />
					<div id="wrapper">
						<RouteGate isLogged={ isLogged } />
					</div>
					<Footer />
				</Router>
			</ContextUserData.Provider>
		</ContextConfig.Provider>
	);
};

export default App;
