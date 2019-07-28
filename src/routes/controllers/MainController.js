import React from 'react';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';
import DataFetch from 'components/_helpers/DataFetch';

const MainController = props => {
	const [Component, Login] = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;
	const keyRoute = props.location.key;

	sessionStorage.setItem('current-path', currentPath);

	const [ isLogged, error, loading ] = (
		isProtected ? (
			DataFetch(
				'/islogged',
				false,
				{ extraTriggers: [keyRoute] }
			)
		) : ([ undefined, {}, false ])
	);

	const AuthComponent = () => {
		return (
			<div id="controller">
				{ (!loading && Object.keys(error).length ? Notify({ type: 4, header: 'Controlador Principal', info: error }) : null) }
				{ (isProtected ? Loading({ message: 'Aguarde...', loading: loading }) : null) }
				{ (!isProtected ? Component : (!loading ? (isLogged ? Component : Login) : 'carregando...')) }
			</div>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
