import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';

import ConfigContext from 'components/_helpers/ConfigContext';

import './Logged.css';

const Logged = props => {
	const getUrl = React.useContext(ConfigContext).baseUrl;

	const [notify, setNotify] = useState(['', 0]);
	const [loading, setLoading] = useState(false);

	const [showLogged, setShowLogged] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [logout, setLogout] = useState(false);

	useEffect(() => {
		setShowLogged(props.isLogged);
	}, [props.isLogged]);

	useEffect(() => {
		if (submit) {
			setLoading(true);

			axios.post(
				getUrl + '/logout'
			)
			.then(
				res => {
					setNotify(['', 0]);
					setLogout(true);
				}
			)
			.catch(
				err => {
					setNotify([err, 4]);
					throw err;
				}
			)
			.finally(
				() => {
					setLoading(false);
					setSubmit(false);
				}
			);
		}
	}, [getUrl, submit]);

	const logoutApp = e => {
		e.preventDefault();
		setSubmit(true);
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
					<div id="loggedUser">
						usuário logado <Button type="button" color="info" size="sm" onClick={ logoutApp }>Sair</Button>
					</div>
				);
			}
		}

		return (
			<div id="logged">
				{ Loading({ message: 'Aguarde...', loading: loading }) }
				{ Notify({ info: (!loading ? notify[0] : ''), header: 'Logout', type: notify[1] }) }
				{ Component }
			</div>
		);
	};

	return checkUserLogged();
};

export default Logged;
