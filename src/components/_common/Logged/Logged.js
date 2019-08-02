import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';

import ConfigContext from 'components/_helpers/ConfigContext';

import './Logged.css';

const Logged = props => {
	const getUrl = React.useContext(ConfigContext).baseUrl;

	const [showLogged, setShowLogged] = useState(false);
	const [logout, setLogout] = useState(false);

	useEffect(() => {
		setShowLogged(props.isLogged);
	}, [props.isLogged]);

	const logoutApp = e => {
		e.preventDefault();

		axios.post(
			getUrl + '/logout'
		)
		.then(
			res => {
				setLogout(true);
			}
		)
		.catch(
			err => {
				throw err;
			}
		);
	};

	const checkUserLogged = () => {
		let Component = null;

		if (logout) {
			Component = (
				<Redirect to="/login" />
			);
		} else {
			if (showLogged) {
				Component = (
					<div id="logged">
						usuário logado <Button type="button" color="info" size="sm" onClick={ logoutApp }>Sair</Button>
					</div>
				);
			}
		}

		return Component;
	};

	return checkUserLogged();
};

export default Logged;
