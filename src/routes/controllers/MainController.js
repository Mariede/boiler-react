import React from 'react';

import Loading from 'components/_common/Loading';
import DataFetch from 'components/_helpers/DataFetch';

const MainController = props => {
	const [Component, Login] = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;

	sessionStorage.setItem('current-path', currentPath);

	const [ loading, isLogged ] = (
		isProtected ? (
			DataFetch(
				'/islogged',
				false,
				{ extraTriggers: [currentPath] }
			)
		) : ([ false, undefined ])
	);

	const AuthComponent = () => {
		return (
			<div id="controller">
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
