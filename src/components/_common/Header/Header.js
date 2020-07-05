import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

import Logged from 'components/_common/Logged';

import imgLogo from 'assets/images/logo.png';

import './Header.css';

/*
	PROPS:
		- isLogged			-> OBRIGATORIO, necessario para exibicao dos dados de usuario logado e menu
*/
const Header = props => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = e => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	// Conteudo do menu
	const MenuContent = () => {
		return (
			<Nav className="ml-auto" navbar>
				{
					(
						() => {
							switch (props.isLogged) {
								case true: {
									return (
										<NavItem>
											<NavLink tag={ Link } to="/usuario">Usuario</NavLink>
										</NavItem>
									);
								}
								default: {
									return (
										<NavItem>
											<NavLink tag={ Link } to="/logon">Logon</NavLink>
										</NavItem>
									);
								}
							}
						}
					)()
				}
			</Nav>
		);
	};

	return (
		<header id="header">
			<Navbar expand="md" className="navbar-local" light>
				<NavbarBrand tag={ Link } to="/"><img src={ imgLogo } alt="logo" className="img-logo" /> Boiler React</NavbarBrand>
				<NavbarToggler onClick={ toggle } />

				<Collapse isOpen={ isOpen } navbar>
					<MenuContent />
					<Logged isLogged={ props.isLogged } />
				</Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
