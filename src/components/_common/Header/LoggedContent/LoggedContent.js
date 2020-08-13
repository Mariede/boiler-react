import React, { Fragment, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Alert from 'components/_common/Alert';

import useDataPostPutPatch from 'components/_custom-hooks/useDataPostPutPatch';

import ContextUserData from 'components/_context/ContextUserData';

import './LoggedContent.css';

const LoggedContent = () => {
	const [submit, setSubmit] = useState(false);

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

	const [Component, goDataAction] = useDataPostPutPatch(
		{
			method: 'POST',
			route: '/logout',
			submit: submit,
			cbSubmit: () => {
				setSubmit(false);
			},
			cbThen: () => {
				sessionStorage.removeItem('current-path');
			},
			cbCatch: {
				header: 'Logout',
				type: 4
			},
			message: 'Efetuando logout...'
		}
	);

	return (
		<Fragment>
			{ Component }
			{
				goDataAction ? (
					<Redirect to="/logon" />
				) : (
					<div id="logged">
						<span className="logged-user">
							<i className="fa fa-user-alt"></i> <strong>{ formatName(getUserData.nome) }</strong><br />{ getUserData.email }
						</span>
						<Alert buttonType="button" buttonColor="danger" buttonSize="sm" buttonText="Sair" modalTitle="Logout" modalMessage="Deseja realmente sair do sistema?" modalSize="sm" modalFooterSize="sm" modalCallback={ logoutApp } modalConfirm />
					</div>
				)
			}
		</Fragment>
	);
};

export default LoggedContent;
