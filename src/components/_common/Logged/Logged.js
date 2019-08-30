import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';
import Alert from 'components/_common/Alert';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextUserData from 'components/_helpers/ContextUserData';

import './Logged.css';

/*
	PROPS:
		- isLogged			-> OBRIGATORIO, necessario para exibicao dos dados de usuario logado
		- icon				-> (font-awesome, default: "fa fa-user-alt")
*/
const Logged = props => {
	const getUrl = useContext(ContextConfig).baseUrl;
	const getUserData = useContext(ContextUserData).getUserData;

	const [showLogged, setShowLogged] = useState(false);

	const [notify, setNotify] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [goLogout, setGoLogout] = useState(false);

	useEffect(() => {
		setShowLogged(props.isLogged);
	}, [props.isLogged]);

	useEffect(() => {
		let isMounted = true;

		setGoLogout(false);

		if (submit) {
			setNotify(false);

			axios.post(
				getUrl + '/logout'
			)
			.then(
				res => {
					if (isMounted) {
						setGoLogout(true);
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

		if (goLogout) {
			Component = (
				<Redirect to="/logon" />
			);
		} else {
			if (showLogged) {
				Component = (
					<div id="logged">
						<div id="loggedUser" className="inline">
							<i className={ (props.icon || 'fa fa-user-alt') }></i> <strong>{ getUserData.nome }</strong><br />{ getUserData.email }
						</div>
						<Alert title="Logout" message="Deseja realmente sair do sistema?" size="sm" footerSize="sm" buttonType="button" buttonColor="danger" buttonSize="sm" buttonText="Sair" callback={ logoutApp } confirm />
					</div>
				);
			}
		}

		return (
			<React.Fragment>
				<Loading loading={ submit } />
				<Notify info={ notify.info } header={ notify.header } type={ notify.type } />
				{ Component }
			</React.Fragment>
		);
	};

	return (
		<CheckUserLogged />
	);
};

export default Logged;
