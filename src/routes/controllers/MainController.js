import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';
import Config from 'components/_helpers/Config';

const MainController = props => {
	const getUrl = React.useContext(Config).baseUrl;
	const [logged, setLogged] = useState({ isLogged: false, error: {}, loading: false });

	const [Component, Login] = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;
	const keyRoute = props.location.key;

	sessionStorage.setItem('current-path', currentPath);

	useEffect(() => {
		setLogged({ isLogged: false, error: {}, loading: true });

		if (isProtected) {
			axios.get(
				getUrl + '/isLogged'
			)
			.then(
				res => {
					setLogged({ isLogged: res.data, error: {}, loading: false });
				}
			)
			.catch(
				err => {
					setLogged({ isLogged: false, error: err, loading: false });
					throw err;
				}
			)
		}
	}, [getUrl, isProtected, keyRoute]);

	const AuthComponent = () => {
		return (
			<React.Fragment>
				{ Notify({ type: 4, header: 'Controlador Principal', info: logged.error }) }
				{ (isProtected ? Loading({ message: 'Aguarde...', loading: logged.loading }) : null) }
				<div id="controller">
					{ (!isProtected ? Component : (!logged.loading ? (logged.isLogged ? Component : Login) : 'carregando...')) }
				</div>
			</React.Fragment>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
