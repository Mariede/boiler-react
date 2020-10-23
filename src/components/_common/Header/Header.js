import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Navbar, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';

import MenuContent from './MenuContent';
import LoggedContent from './LoggedContent';

import imgLogo from 'assets/images/logo.png';

import './Header.css';

/*
	DEPENDENCIAS:
		- LoggedContent
		- MenuContent
		- Reactstrap

	PROPS:
		- isLogged			-> OBRIGATORIO, necessario para exibicao dos dados de usuario logado e menu
*/
const Header = props => {
	const { isLogged } = props;

	const [isOpenHeaderContent, setIsOpenHeaderContent] = useState(false);

	const toggleHeaderContent = e => {
		e.preventDefault();
		setIsOpenHeaderContent(!isOpenHeaderContent);
	};

	return (
		<header id="header">
			<Navbar expand="md" className="navbar-local" light>
				<NavbarBrand tag={ Link } to="/" className="color-brand"><img src={ imgLogo } alt="logo" className="img-logo" />{ (process.env.REACT_APP_NAME ? ` ${process.env.REACT_APP_NAME}` : '') }</NavbarBrand>
				<NavbarToggler onClick={ toggleHeaderContent } />
				{
					isLogged !== undefined ? (
						<Collapse isOpen={ isOpenHeaderContent } navbar>
							<MenuContent isLogged={ isLogged } />
							{
								isLogged ? (
									<LoggedContent />
								) : (
									null
								)
							}
						</Collapse>
					) : (
						null
					)
				}
			</Navbar>
		</header>
	);
};

export default Header;
