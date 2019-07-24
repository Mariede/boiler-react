import React from 'react';

const MainController = props => {
	const Component = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;

	sessionStorage.setItem('current-path', currentPath);

	const AuthComponent = () => {
		const Result = React.Children.count(Component) === 2 && React.Children.map(Component, (child, i) => {
			return (
				(!isProtected && i === 0 && child) || (isProtected && i === 1 && child)
				// (!isProtected && i === 0 && child) || (isProtected && (isLogged && i === 0 && child) || (!isLogged && i === 1 && child))
			);
		});

		return (
			<div id="controller">
				{ (Result || 'Erro no controlador principal... Result não definido') }
			</div>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
