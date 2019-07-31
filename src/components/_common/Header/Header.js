import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

import Logged from 'components/_common/Logged';

import imgLogo from 'assets/images/logo.png';

import './Header.css';

const Header = props => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = e => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	// Conteudo do menu
	const menuContent = () => {
		return (
			<Nav className="ml-auto" navbar>
				<NavItem>
					<NavLink tag={ Link } to="/usuario">Usuario</NavLink>
				</NavItem>
				<NavItem>
					<NavLink tag={ Link } to="/login">Login</NavLink>
				</NavItem>
			</Nav>
		);
	};

	return (
		<header id="header">
			<Navbar className="navbar-local" light expand="md">
				<NavbarBrand tag={ Link } to="/"><img className="img-logo" src={ imgLogo } alt="logo" /> Boiler React</NavbarBrand>
				<NavbarToggler onClick={ toggle } />

				<Collapse isOpen={ isOpen } navbar>
					{ menuContent() }
					<Logged isLogged={ props.isLogged } />
				</Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
