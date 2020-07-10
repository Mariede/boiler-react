import React, { Fragment, useState, useEffect, useContext } from 'react';
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
			setNotify(null);

			axios.post(
				`${getUrl}/logout`
			)
			.then(
				res => {
					if (isMounted) {
						sessionStorage.removeItem('current-path');
						setGoLogout(true);
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
			setGoLogout(false);
			isMounted = false;
		};
	}, [getUrl, submit]);

	const Component = () => {
		const logoutApp = () => {
			setSubmit(true);
		};

		return (
			goLogout ? (
				<Redirect to="/logon" />
			) : (
				props.isLogged ? (
					<div id="logged">
						<div id="logged-user" className="inline">
							<i className={ (props.icon || 'fa fa-user-alt') }></i> <strong>{ getUserData.nome }</strong><br />{ getUserData.email }
						</div>
						<Alert buttonType="button" buttonColor="danger" buttonSize="sm" buttonText="Sair" modalTitle="Logout" modalMessage="Deseja realmente sair do sistema?" modalSize="sm" modalFooterSize="sm" callback={ logoutApp } modalConfirm />
					</div>
				) : (
					null
				)
			)
		);
	};

	return (
		<Fragment>
			<Loading loading={ submit } />
			<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } />
			<Component />
		</Fragment>
	);
};

export default LoggedContent;
