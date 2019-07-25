import React from 'react';

import DataFetch from 'components/_helpers/DataFetch';

const MainController = props => {
	const Components = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;

	sessionStorage.setItem('current-path', currentPath);

	const { loading, isLogged } = (
		isProtected ? (
			DataFetch(
				'/islogged',
				false
			)
		) : ({ loading: false, isLogged: undefined })
	);

	const AuthComponent = () => {
		const Component = React.Children.count(Components) === 2 && React.Children.map(Components, (child, i) => {
			return (
				(!isProtected && i === 0 && child) || (isProtected && isLogged && i === 0 && child) || (isProtected && !isLogged && i === 1 && child)
			);
		});

		return (
			<div id="controller">
				{
					((isProtected && loading) ? 'loading...' : Component)
				}
			</div>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
