import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RouteGate from 'application/RouteGate';

import Header from 'components/_common/Header';
import Footer from 'components/_common/Footer';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextUserData from 'components/_helpers/ContextUserData';

const App = props => {
	const [userData, setUserData] = useState(null);

	const changeUserData = uData => {
		setUserData(uData);
	};

	const checkUserIsLogged = uData => {
		if (uData) {
			return true;
		}

		return false;
	};

	return (
		<ContextConfig.Provider value={ props.configData }>
			<ContextUserData.Provider value={ { getUserData: userData ? JSON.parse(userData) : {}, setUserData: changeUserData } }>
				<Router>
					<Header isLogged={ checkUserIsLogged(userData) } />
					<div id="wrapper">
						<RouteGate isLogged={ checkUserIsLogged(userData) } />
					</div>
					<Footer />
				</Router>
			</ContextUserData.Provider>
		</ContextConfig.Provider>
	);
};

export default App;
