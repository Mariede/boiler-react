import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Loading from 'components/_common/Loading';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextNotify from 'components/_helpers/ContextNotify';

const MainController = props => {
	const getUrl = useContext(ContextConfig).baseUrl;
	const setNotify = useContext(ContextNotify).setNotify;

	const [dataFetch, setDataFetch] = useState(false);

	const [isLogged, setIsLogged] = useState(props.cbUserLogged.userLogged);

	const [Component, Home, Logon] = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;

	useEffect(() => {
		props.cbUserLogged.checkUserLogged(isLogged);
	}, [isLogged, props]);

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
					result_type: 'a'
				}
			}
		)
		.then(
			res => {
				if (isMounted) {
					// setNotify({ info: '' });
					setIsLogged(res.data);
				}
			}
		)
		.catch(
			err => {
				if (isMounted) {
					setNotify({ info: (err.response || err), header: 'Controlador Principal', type: 4 });
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
	}, [getUrl, props, setNotify]);

	const AuthComponent = () => {
		return (
			<div id="controller">
				{ Loading({ loading: !dataFetch }) }

				{ (dataFetch ? (!isProtected ? (!isLogged ? Component : (Component.type.name !== 'Logon' ? Component : Home)) : (isLogged ? Component : Logon)) : 'carregando...') }
			</div>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
