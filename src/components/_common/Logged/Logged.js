import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Alert from 'components/_common/Alert';
import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';

import ContextDataUser from 'components/_helpers/ContextDataUser';
import ContextConfig from 'components/_helpers/ContextConfig';

import './Logged.css';

/*
	PROPS:
		- isLogged			-> OBRIGATORIO, necessario para exibicao dos dados de usuario logado
		- icon				-> (font-awesome, default: "fa fa-user-alt")
*/
const Logged = props => {
	const getUrl = React.useContext(ContextConfig).baseUrl;
	const getDataUser = React.useContext(ContextDataUser);

	const [notify, setNotify] = useState(['', 0]);
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
						setNotify(['', 0]);
						setLogout(true);

						sessionStorage.removeItem('current-path');
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
						setSubmit(false);
					}
				}
			);
		}

		return () => (
			isMounted = false
		);
	}, [getUrl, submit]);

	const logoutApp = () => {
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
						<Alert title="Logout" message="Deseja realmente sair do sistema?" size="sm" footerSize="sm" buttonType="button" buttonColor="danger" buttonSize="sm" buttonText="Sair" callback={ logoutApp } confirm />
					</div>
				);
			}
		}

		return (
			<div id="logged">
				{ Loading({ loading: submit }) }
				{ Notify({ info: (!submit ? notify[0] : ''), header: 'Logout', type: notify[1] }) }
				{ Component }
			</div>
		);
	};

	return checkUserLogged();
};

export default Logged;
