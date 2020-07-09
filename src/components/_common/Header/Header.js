import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Navbar, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';

import MenuContent from 'components/_common/Header/MenuContent';
import LoggedContent from 'components/_common/Header/LoggedContent';

import imgLogo from 'assets/images/logo.png';

import './Header.css';

/*
	PROPS:
		- isLogged			-> OBRIGATORIO, necessario para exibicao dos dados de usuario logado e menu
*/
const Header = props => {
	const [isOpenHeaderContent, setIsOpenHeaderContent] = useState(false);

	const toggleHeaderContent = e => {
		e.preventDefault();
		setIsOpenHeaderContent(!isOpenHeaderContent);
	};

	return (
		<header id="header">
			<Navbar expand="md" className="navbar-local" light>
				<NavbarBrand tag={ Link } to="/" className="color-brand"><img src={ imgLogo } alt="logo" className="img-logo" /> Boiler React</NavbarBrand>
				<NavbarToggler onClick={ toggleHeaderContent } />

				<Collapse isOpen={ isOpenHeaderContent } navbar>
					<MenuContent isLogged={ props.isLogged } />
					<LoggedContent isLogged={ props.isLogged } />
				</Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
