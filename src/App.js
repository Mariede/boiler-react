import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'components/_common/Header';
import Routes from 'routes/Routes';
import Footer from 'components/_common/Footer';

import ConfigContext from 'components/_helpers/ConfigContext';

const App = props => {
	const checkUserLogged = isLogged => {
console.log(isLogged);
	};

	return (
		<ConfigContext.Provider value={ props.configData }>
			<Router>
				<Header isLogged={ false } />
				<div id="wrapper">
					<Routes checkUserLogged={ u => checkUserLogged(u) } />
				</div>
				<Footer />
			</Router>
		</ConfigContext.Provider>
	);
};

export default App;
