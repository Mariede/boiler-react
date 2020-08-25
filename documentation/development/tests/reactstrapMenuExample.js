import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './MenuContent.css';

/*
	PROPS:
		- isLogged
*/
const MenuContent = props => {
	const { isLogged } = props;

	const [isOpenMenuUsuario, setIsOpenMenuUsuario] = useState(false);

	const toggleMenuPage = (drop, setDrop, e) => {
		e.preventDefault();
		setDrop(!drop);
	};

	return (
		<Nav id="menu" className="ml-auto" navbar>
			{
				isLogged ? (
					<Nav tabs>
						<NavItem>
							<NavLink tag={ Link } to="/usuario">Usuário 1</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario">Usuário 2</NavLink>
						</NavItem>

						<Dropdown nav isOpen={ isOpenMenuUsuario } direction="down" toggle={ e => toggleMenuPage(isOpenMenuUsuario, setIsOpenMenuUsuario, e) }>
							<DropdownToggle nav caret>
								Usuário 3
							</DropdownToggle>

							<DropdownMenu>
								<DropdownItem header>
									<em>Selecione a opção desejada</em>
								</DropdownItem>

								<DropdownItem>
									<Link to="/dsdsds">Action 2 (dsdsds)</Link>
								</DropdownItem>

								<DropdownItem disabled>
									Action 2
								</DropdownItem>

								<DropdownItem divider />

								<DropdownItem>
									<Link to="/usuario/33">Action 3 (usuario/33)</Link>
								</DropdownItem>

								<DropdownItem>
									<Link to="/usuario/40">Action 4 (usuario/40)</Link>
								</DropdownItem>

								<DropdownItem>
									<Link to="/logon">Action 5 (logon)</Link>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Nav>
				) : (
					<Nav tabs>
						<NavItem>
							<NavLink tag={ Link } to="/usuario">Usuário Out</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario/33">Usuário/33 Out</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario/40">Usuário/40 Out</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/dsdsds">Not Found</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/logon">Logon</NavLink>
						</NavItem>
					</Nav>
				)
			}
		</Nav>
	);
};

export default MenuContent;
