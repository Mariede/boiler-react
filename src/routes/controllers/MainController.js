import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';

import ContextConfig from 'components/_helpers/ContextConfig';

const MainController = props => {
	const getUrl = React.useContext(ContextConfig).baseUrl;
	const [dataFetch, setDataFetch] = useState(false);

	const [notify, setNotify] = useState(['', 0]);
	const [loading, setLoading] = useState(false);

	const [isLogged, setIsLogged] = useState(props.cbUserLogged.userLogged);

	const [Component, Login, Home] = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;
	const keyRoute = props.location.key;

	useEffect(() => {
		props.cbUserLogged.checkUserLogged(isLogged);
		setDataFetch(false);
	}, [isLogged, props]);

	useEffect(() => {
		if (isLogged && currentPath !== '/login') { // usuario logado
			sessionStorage.setItem('current-path', currentPath);
		}
	}, [isLogged, currentPath]);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);

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
					setLoading(false);
					setDataFetch(true);
				}
			}
		);

		return () => (
			isMounted = false
		);
	}, [getUrl, keyRoute]);

	const AuthComponent = () => {
		return (
			<div id="controller">
				{ Loading({ message: 'Aguarde...', loading: loading }) }
				{ Notify({ info: (!loading ? notify[0] : ''), header: 'Controlador Principal', type: notify[1] }) }

				{ (dataFetch ? (!isProtected ? (!isLogged ? Component : (Component.type.name !== 'Login' ? Component : Home)) : (isLogged ? Component : Login)) : 'carregando...') }
			</div>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
