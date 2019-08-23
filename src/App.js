import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Routes from 'routes/Routes';

import Header from 'components/_common/Header';
import Footer from 'components/_common/Footer';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextDataUser from 'components/_helpers/ContextDataUser';

const App = props => {
	const getUrl = props.configData.baseUrl;

	const [userLogged, setUserLogged] = useState(false);
	const [dataUser, setDataUser] = useState({});

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
							setDataUser(res.data);
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
			setDataUser({});
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
			<ContextDataUser.Provider value={ dataUser }>
				<Router>
					<Header isLogged={ userLogged } />
					<div id="wrapper">
						<Routes cbUserLogged={ { cbUserLogged } } />
					</div>
					<Footer />
				</Router>
			</ContextDataUser.Provider>
		</ContextConfig.Provider>
	);
};

export default App;
