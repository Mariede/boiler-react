import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'components/_common/Header';
import Routes from 'routes/Routes';
import Footer from 'components/_common/Footer';

import ConfigContext from 'components/_helpers/ConfigContext';

const App = props => {
	const renderHeader = isLogged => {
console.log(isLogged);
		return (
			<Header isLogged={ isLogged } />
		);
	};

	const checkUserLogged = renderHeader.bind(this);

	return (
		<ConfigContext.Provider value={ props.configData }>
			<Router>
				{ renderHeader(false) }
				<div id="wrapper">
					<Routes checkUserLogged={ u => checkUserLogged(u) } />
				</div>
				<Footer />
			</Router>
		</ConfigContext.Provider>
	);
};

export default App;
