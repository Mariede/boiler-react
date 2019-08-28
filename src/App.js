import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Routes from 'routes/Routes';

import Header from 'components/_common/Header';
import Footer from 'components/_common/Footer';

import Notify from 'components/_common/Notify';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextUserData from 'components/_helpers/ContextUserData';
import ContextNotify from 'components/_helpers/ContextNotify';

const App = props => {
	const getUrl = props.configData.baseUrl;

	const [notify, setNotify] = useState({});

	const [userLogged, setUserLogged] = useState(false);
	const [userData, setUserData] = useState({});

	useEffect(() => {
		let isMounted = true;

		if (userLogged) {
			axios.get(
				getUrl + '/isLogged',
				{
					params: {
						result_type: 'b'
					}
				}
			)
			.then(
				res => {
					if (isMounted) {
						if (res.data) {
							setUserData(res.data);
						}
					}
				}
			)
			.catch(
				err => {
					throw err;
				}
			);
		} else {
			setUserData({});
		}

		return () => (
			isMounted = false
		);
	}, [getUrl, userLogged]);

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
		<ContextConfig.Provider value={ props.configData }>
			<ContextUserData.Provider value={ userData }>
				<ContextNotify.Provider value={ { setNotify } }>
					<Notify info={ notify.info } header={ notify.header } type={ notify.type } />

					<Router>
						<Header isLogged={ userLogged } />
						<div id="wrapper">
							<Routes cbUserLogged={ { cbUserLogged } } />
						</div>
						<Footer />
					</Router>
				</ContextNotify.Provider>
			</ContextUserData.Provider>
		</ContextConfig.Provider>
	);
};

export default App;
