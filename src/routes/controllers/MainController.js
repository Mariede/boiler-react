import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Loading from 'components/_common/Loading';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextUserData from 'components/_helpers/ContextUserData';
import ContextNotify from 'components/_helpers/ContextNotify';

const MainController = props => {
	const getUrl = useContext(ContextConfig).baseUrl;

	const setUserData = useContext(ContextUserData).setUserData;
	const setNotify = useContext(ContextNotify).setNotify;

	const [isLogged, setIsLogged] = useState(false);
	const [dataFetch, setDataFetch] = useState(false);

	const [Component, Home, Logon] = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;
	const currentKey = props.location.key;

	useEffect(() => {
		if (isLogged && currentPath !== '/logon') { // usuario logado
			sessionStorage.setItem('current-path', currentPath);
		}
	}, [isLogged, currentPath]);

	useEffect(() => {
		let isMounted = true;

		setDataFetch(false);

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
					// setNotify(false);
					setIsLogged((res.data ? true : false));
					setUserData((res.data ? JSON.stringify(res.data) : false));
				}
			}
		)
		.catch(
			err => {
				if (isMounted) {
					// setNotify({ info: (err.response || err), header: 'Controlador Principal', type: 4 });
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

		return () => (
			isMounted = false
		);
	}, [getUrl, currentKey, setUserData, setNotify]);

	const AuthComponent = () => {
		return (
			<React.Fragment>
				{ Loading({ loading: !dataFetch }) }
				<div id="controller">
					{ (dataFetch ? (!isProtected ? (!isLogged ? Component : (Component.type.name !== 'Logon' ? Component : Home)) : (isLogged ? Component : Logon)) : 'carregando...') }
				</div>
			</React.Fragment>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
