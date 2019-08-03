import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';

import ContextDataUser from 'components/_helpers/ContextDataUser';
import ContextConfig from 'components/_helpers/ContextConfig';

import './Logged.css';

const Logged = props => {
	const getDataUser = React.useContext(ContextDataUser);
	const getUrl = React.useContext(ContextConfig).baseUrl;

	const [notify, setNotify] = useState(['', 0]);
	const [loading, setLoading] = useState(false);

	const [showLogged, setShowLogged] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [logout, setLogout] = useState(false);

	useEffect(() => {
		setShowLogged(props.isLogged);
	}, [props.isLogged]);

	useEffect(() => {
		let isMounted = true;
		setLogout(false);

		if (submit) {
			setLoading(true);

			axios.post(
				getUrl + '/logout'
			)
			.then(
				res => {
					if (isMounted) {
						setNotify(['', 0]);
						setLogout(true);
					}
				}
			)
			.catch(
				err => {
					if (isMounted) {
						setNotify([err, 4]);
					}
					throw err;
				}
			)
			.finally(
				() => {
					if (isMounted) {
						setLoading(false);
						setSubmit(false);
					}
				}
			);
		}

		return () => (
			isMounted = false
		);
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
						<div id="loggedUserData" className="inline">
							<i className={ (props.icon || 'fa fa-user-alt') }></i> <strong>{ getDataUser.nome }</strong><br />{ getDataUser.login }
						</div>
						<Button type="button" color="secondary" size="sm" onClick={ logoutApp }>Sair</Button>
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
