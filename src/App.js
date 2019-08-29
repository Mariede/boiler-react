import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'routes/Routes';

import Header from 'components/_common/Header';
import Footer from 'components/_common/Footer';

import Notify from 'components/_common/Notify';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextUserData from 'components/_helpers/ContextUserData';
import ContextNotify from 'components/_helpers/ContextNotify';

const App = props => {
	const [userData, setUserData] = useState(false);
	const [notify, setNotify] = useState(false);

	const changeUserDataContext = o => {
		if (o) {
			setUserData(o);
		} else {
			setUserData(false);
		}
	};

	const changeNotifyContext = o => {
		if (o) {
			setNotify(o);
		} else {
			setNotify(false);
		}
	};

	return (
		<ContextConfig.Provider value={ props.configData }>
			<ContextUserData.Provider value={ { data: userData ? JSON.parse(userData) : '', setUserData: changeUserDataContext } }>
				<ContextNotify.Provider value={ { setNotify: changeNotifyContext } }>
					<Notify info={ notify ? notify.info : '' } header={ notify ? notify.header : '' } type={ notify ? notify.type : 2 } />

					<Router>
						<Header isLogged={ (userData ? true : false) } />
						<div id="wrapper">
							<Routes />
						</div>
						<Footer />
					</Router>
				</ContextNotify.Provider>
			</ContextUserData.Provider>
		</ContextConfig.Provider>
	);
};

export default App;
