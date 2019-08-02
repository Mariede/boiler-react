import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'components/_common/Header';
import Routes from 'routes/Routes';
import Footer from 'components/_common/Footer';

import ConfigContext from 'components/_helpers/ConfigContext';

const App = props => {
	const [userLogged, setUserLogged] = useState(false);

	const checkUserLogged = isLogged => {
		if (isLogged !== userLogged) {
			setUserLogged(isLogged);
		}
	};

	const cbUserLogged = {
		userLogged: userLogged,
		checkUserLogged: u => {
			checkUserLogged(u);
		}
	};

	return (
		<ConfigContext.Provider value={ props.configData }>
			<Router>
				<Header isLogged={ userLogged } />
				<div id="wrapper">
					<Routes cbUserLogged={ { cbUserLogged } } />
				</div>
				<Footer />
			</Router>
		</ConfigContext.Provider>
	);
};

export default App;
