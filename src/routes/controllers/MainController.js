import React from 'react';

const MainController = props => {
	const Component = props.children;
	const currentPath = props.location.pathname;

	sessionStorage.setItem('current-path', currentPath);

	return (
		<div id="controller">
			{ Component }
		</div>
	);
};

export default MainController;
