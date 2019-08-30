import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'routes/Routes';

import Header from 'components/_common/Header';
import Footer from 'components/_common/Footer';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextUserData from 'components/_helpers/ContextUserData';

const App = props => {
	const [userData, setUserData] = useState(false);

	const changeUserDataContext = o => {
		if (o) {
			setUserData(o);
		} else {
			setUserData(false);
		}
	};

	return (
		<ContextConfig.Provider value={ props.configData }>
			<ContextUserData.Provider value={ { getUserData: userData ? JSON.parse(userData) : '', setUserData: changeUserDataContext } }>
				<Router>
					<Header isLogged={ (userData ? true : false) } />
					<div id="wrapper">
						<Routes />
					</div>
					<Footer />
				</Router>
			</ContextUserData.Provider>
		</ContextConfig.Provider>
	);
};

export default App;
