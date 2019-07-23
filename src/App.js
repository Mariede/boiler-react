import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'components/_common/Header';
import Routes from 'routes/Routes';
import Footer from 'components/_common/Footer';

import Config from 'components/_common/Config';

const App = props => {
	return (
		<Config.Provider value={ props.configData }>
			<Router>
				<Header />
				<div id="wrapper">
					<Routes />
				</div>
				<Footer />
			</Router>
		</Config.Provider>
	);
};

export default App;
