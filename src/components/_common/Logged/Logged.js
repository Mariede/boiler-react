import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Alert from 'components/_common/Alert';
import Loading from 'components/_common/Loading';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextUserData from 'components/_helpers/ContextUserData';
import ContextNotify from 'components/_helpers/ContextNotify';

import './Logged.css';

/*
	PROPS:
		- isLogged			-> OBRIGATORIO, necessario para exibicao dos dados de usuario logado
		- icon				-> (font-awesome, default: "fa fa-user-alt")
*/
const Logged = props => {
	const getUrl = useContext(ContextConfig).baseUrl;
	const getUserData = useContext(ContextUserData);
	const setNotify = useContext(ContextNotify).setNotify;

	const [submit, setSubmit] = useState(false);

	const [logout, setLogout] = useState(false);
	const [showLogged, setShowLogged] = useState(false);

	useEffect(() => {
		setShowLogged(props.isLogged);
	}, [props.isLogged]);

	useEffect(() => {
		let isMounted = true;
		setLogout(false);

		if (submit) {
			axios.post(
				getUrl + '/logout'
			)
			.then(
				res => {
					if (isMounted) {
						setNotify({ info: '' });
						setLogout(true);

						sessionStorage.removeItem('current-path');
					}
				}
			)
			.catch(
				err => {
					if (isMounted) {
						setNotify({ info: (err.response || err), header: 'Logout', type: 4 });
					}

					throw err;
				}
			)
			.finally(
				() => {
					if (isMounted) {
						setSubmit(false);
					}
				}
			);
		}

		return () => (
			isMounted = false
		);
	}, [getUrl, submit, setNotify]);

	const logoutApp = () => {
		setSubmit(true);
	};

	const CheckUserLogged = () => {
		let Component = null;

		if (logout) {
			Component = (
				<Redirect to="/logon" />
			);
		} else {
			if (showLogged) {
				Component = (
					<div id="loggedUser">
						<div id="loggedUserData" className="inline">
							<i className={ (props.icon || 'fa fa-user-alt') }></i> <strong>{ getUserData.nome }</strong><br />{ getUserData.email }
						</div>
						<Alert title="Logout" message="Deseja realmente sair do sistema?" size="sm" footerSize="sm" buttonType="button" buttonColor="danger" buttonSize="sm" buttonText="Sair" callback={ logoutApp } confirm />
					</div>
				);
			}
		}

		return (
			<div id="logged">
				{ Loading({ loading: submit }) }

				{ Component }
			</div>
		);
	};

	return (
		<CheckUserLogged />
	);
};

export default Logged;
