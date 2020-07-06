import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';
import Alert from 'components/_common/Alert';

import ContextConfig from 'components/_context/ContextConfig';
import ContextUserData from 'components/_context/ContextUserData';

import './LoggedContent.css';

/*
	PROPS:
		- isLogged			-> OBRIGATORIO, necessario para exibicao dos dados de usuario logado
		- icon				-> (font-awesome, default: "fa fa-user-alt")
*/
const LoggedContent = props => {
	const [goLogout, setGoLogout] = useState(false);
	const [notify, setNotify] = useState(null);
	const [submit, setSubmit] = useState(false);

	const getUrl = useContext(ContextConfig).baseUrl;
	const getUserData = useContext(ContextUserData).getUserData;

	useEffect(() => {
		let isMounted = true;

		if (submit) {
			setGoLogout(false);
			setNotify(null);

			axios.post(
				`${getUrl}/logout`
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

		return () => {
			isMounted = false;
		};
	}, [getUrl, submit]);

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
			if (props.isLogged) {
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
				<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } />
				{ Component }
			</React.Fragment>
		);
	};

	return <CheckUserLogged />;
};

export default LoggedContent;
