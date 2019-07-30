import React, { useState, useEffect } from 'react';

import './Logged.css';

const Logged = props => {
	const [showLogged, setShowLogged] = useState(false);

	useEffect(() => {
		if (props.usuario && Object.keys(props.usuario).length) {
			setShowLogged(true);
		}
	}, [props.usuario]);

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
