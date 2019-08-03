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
	const [dataFetch, setDataFetch] = useState(false);

	const [userLogged, setUserLogged] = useState(false);
	const [dataUser, setDataUser] = useState({});

	useEffect(() => {
		let isMounted = true;
		setDataFetch(false);

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
					if (isMounted) {
						setDataUser({});
					}
					throw err;
				}
			)
			.finally(
				() => {
					if (isMounted) {
						setDataFetch(true);
					}
				}
			);
		} else {
			setDataUser({});
			setDataFetch(true);
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
		{
			dataFetch ? (
				<Router>
					<Header isLogged={ userLogged } />
					<div id="wrapper">
						<Routes cbUserLogged={ { cbUserLogged } } />
					</div>
					<Footer />
				</Router>
			) : (
				null
			)
		}
			</ContextDataUser.Provider>
		</ContextConfig.Provider>
	);
};

export default App;
