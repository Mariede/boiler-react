import { Fragment, useState, useContext } from 'react';

import Alert from 'components/_common/Alert';

import DataChange from 'components/_common/DataChange';

import ContextUserData from 'components/_context/ContextUserData';

import './LoggedContent.css';

/*
	DEPENDENCIAS LAYOUT:
		- Alert
*/
const LoggedContent = () => {
	const getUserData = useContext(ContextUserData).getUserData;

	const [dataChange, setDataChange] = useState(undefined);

	const showHideProfile = e => {
		const button = e.currentTarget;
		const profile = button.querySelector('.logged-user-profile-data');

		if (profile.classList.contains('show')) {
			profile.classList.remove('show');
		} else {
			profile.classList.add('show');
		}
	};

	const checkEnterPressed = e => {
		e.preventDefault();

		if (e.key === 'Enter') {
			showHideProfile(e);
		}
	};

	const checkClicked = e => {
		e.preventDefault();
		showHideProfile(e);
	};

	const formatName = _name => {
		const name = String(_name || '').trim();
		const spaceCheck = name.indexOf(' ');
		const showName = (spaceCheck !== -1 ? (`${name.substr(name.lastIndexOf(' ') + 1)}, ${name.substr(0, spaceCheck)}`) : name);

		return showName;
	};

	const logoffApp = e => {
		e.preventDefault();

		setDataChange(
			{
				submit: true,
				method: 'post',
				cbThen: () => {
					sessionStorage.removeItem('current-path');
				},
				message: 'Efetuando logoff...'
			}
		);
	};

	return (
		<Fragment>
			<DataChange { ...dataChange } setDataChange={ setDataChange } baseRoute="/logoff" cbCatch={ { header: 'Logoff' } } url="/logon" />

			<div id="logged">
				<span className="logged-user">
					<span className="logged-user-profile" tabIndex="0" role="button" onKeyPress={ checkEnterPressed } onClick={ checkClicked }>
						<i className="fas fa-user-alt"></i>

						<div className="logged-user-profile-data">
							Perfis associados
							<hr className="global-line" />
							{
								(Array.isArray(getUserData.perfis) && getUserData.perfis.length > 0) ? (
									getUserData.perfis.map(
										(perfil, index) => (
											<Fragment key={ index }>
												<i className="fas fa-lock-open"></i> { perfil }<br />
											</Fragment>
										)
									)
								) : (
									<span className="not-found"><i className="fas fa-ban"></i> Nenhum perfil</span>
								)
							}
							<hr className="global-line" />
						</div>
					</span>

					<strong>{ formatName(getUserData.nome) }</strong><br />{ getUserData.email }
				</span>

				<Alert buttonType="button" buttonSize="sm" buttonColor="danger" buttonText="Sair" modalTitle="Logoff" modalMessage="Deseja realmente sair do sistema?" modalCallback={ logoffApp } modalConfirm />
			</div>
		</Fragment>
	);
};

export default LoggedContent;
