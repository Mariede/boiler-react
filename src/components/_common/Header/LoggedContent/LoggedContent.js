import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';
import Alert from 'components/_common/Alert';

import ContextConfig from 'components/_context/ContextConfig';
import ContextUserData from 'components/_context/ContextUserData';

import './LoggedContent.css';

const LoggedContent = () => {
	const [goLogout, setGoLogout] = useState(false);
	const [notify, setNotify] = useState(null);
	const [submit, setSubmit] = useState(false);

	const getUrl = useContext(ContextConfig).baseUrl;
	const getUserData = useContext(ContextUserData).getUserData;

	const formatName = _name => {
		const name = String(_name || '').trim();
		const spaceCheck = name.indexOf(' ');
		const showName = (spaceCheck !== -1 ? (`${name.substr(name.lastIndexOf(' ') + 1)}, ${name.substr(0, spaceCheck)}`) : name);

		return showName;
	};

	const logoutApp = () => {
		setSubmit(true);
	};

	useEffect(
		() => {
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
				isMounted = false;
			};
		},
		[getUrl, submit]
	);

	return (
		<Fragment>
			<Loading loading={ submit } />
			<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } />
			{
				goLogout ? (
					<Redirect to="/logon" />
				) : (
					<div id="logged">
						<span className="logged-user">
							<i className="fa fa-user-alt"></i> <strong>{ formatName(getUserData.nome) }</strong><br />{ getUserData.email }
						</span>
						<Alert buttonType="button" buttonColor="danger" buttonSize="sm" buttonText="Sair" modalTitle="Logout" modalMessage="Deseja realmente sair do sistema?" modalSize="sm" modalFooterSize="sm" callback={ logoutApp } modalConfirm />
					</div>
				)
			}
		</Fragment>
	);
};

export default LoggedContent;
