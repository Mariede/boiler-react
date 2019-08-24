import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';

import ContextConfig from 'components/_helpers/ContextConfig';

const MainController = props => {
	const getUrl = useContext(ContextConfig).baseUrl;

	const [notify, setNotify] = useState(['', 0]);
	const [dataFetch, setDataFetch] = useState(false);

	const [isLogged, setIsLogged] = useState(props.cbUserLogged.userLogged);

	const [Component, Home, Login] = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;

	useEffect(() => {
		props.cbUserLogged.checkUserLogged(isLogged);
	}, [isLogged, props]);

	useEffect(() => {
		if (isLogged && currentPath !== '/login') { // usuario logado
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
					setNotify(['', 0]);
					setIsLogged(res.data);
				}
			}
		)
		.catch(
			err => {
				if (isMounted) {
					setNotify([err, 4]);
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
	}, [getUrl, props]);

	const AuthComponent = () => {
		return (
			<div id="controller">
				{ Loading({ loading: !dataFetch }) }
				{ Notify({ info: (dataFetch ? notify[0] : ''), header: 'Controlador Principal', type: notify[1] }) }

				{ (dataFetch ? (!isProtected ? (!isLogged ? Component : (Component.type.name !== 'Login' ? Component : Home)) : (isLogged ? Component : Login)) : 'carregando...') }
			</div>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
