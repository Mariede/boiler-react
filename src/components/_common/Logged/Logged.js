import React, { useState, useEffect } from 'react';

import './Logged.css';

const Logged = props => {
	const [showLogged, setShowLogged] = useState(false);

	useEffect(() => {
		setShowLogged(props.isLogged);
	}, [props.isLogged]);

	const checkUserLogged = () => {
		let Component = null;

		if (showLogged) {
			Component = (
				<div id="logged">
					usuário logado!!
				</div>
			);
		}

		return Component;
	};

	return checkUserLogged();
};

export default Logged;
