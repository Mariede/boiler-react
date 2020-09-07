import React, { Fragment, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Alert from 'components/_common/Alert';

import useDataChange from 'components/_custom-hooks/useDataChange';

import ContextUserData from 'components/_context/ContextUserData';

import './LoggedContent.css';

const LoggedContent = () => {
	const getUserData = useContext(ContextUserData).getUserData;

	const [submit, setSubmit] = useState(false);

	const showHideProfile = e => {
		e.preventDefault();

		const button = e.currentTarget;
		const profile = button.querySelector('.logged-user-profile-data');

		if (profile.classList.contains('show')) {
			profile.classList.remove('show');
		} else {
			profile.classList.add('show');
		}
	};

	const formatName = _name => {
		const name = String(_name || '').trim();
		const spaceCheck = name.indexOf(' ');
		const showName = (spaceCheck !== -1 ? (`${name.substr(name.lastIndexOf(' ') + 1)}, ${name.substr(0, spaceCheck)}`) : name);

		return showName;
	};

	const logoutApp = e => {
		e.preventDefault();
		setSubmit(true);
	};

	const { Component, goDataAction } = useDataChange(
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
							<span className="logged-user-profile" onClick={ showHideProfile }>
								<i className="fa fa-user-alt"></i>

								<div className="logged-user-profile-data">
									Perfis associados
									<hr />
									{
										(Array.isArray(getUserData.perfis) && getUserData.perfis.length > 0) ? (
											getUserData.perfis.map(
												(perfil, index) => (
													<Fragment key={ index }>
														<i className="fa fa-lock-open"></i> { perfil }<br />
													</Fragment>
												)
											)
										) : (
											<span className="not-found"><i className="fa fa-ban"></i> Nenhum perfil informado</span>
										)
									}
									<hr/>
								</div>
							</span>

							<strong>{ formatName(getUserData.nome) }</strong><br />{ getUserData.email }
						</span>

						<Alert buttonType="button" buttonSize="sm" buttonColor="danger" buttonText="Sair" modalTitle="Logout" modalMessage="Deseja realmente sair do sistema?" modalCallback={ logoutApp } modalConfirm />
					</div>
				)
			}
		</Fragment>
	);
};

export default LoggedContent;
