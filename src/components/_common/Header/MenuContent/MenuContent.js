import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './MenuContent.css';

const MenuContent = props => {
	const [isOpenMenuUsuario, setIsOpenMenuUsuario] = useState(false);

	const toggleMenuPage = (e, drop, setDrop) => {
		e.preventDefault();
		setDrop(!drop);
	};

	return (
		<Nav id="menu" className="ml-auto" navbar>
			{
				props.isLogged ? (
					<Nav tabs>
						<NavItem>
							<NavLink tag={ Link } to="/usuario">Usuario 1</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario">Usuario 2</NavLink>
						</NavItem>

						<Dropdown nav isOpen={ isOpenMenuUsuario } direction="down" toggle={ e => toggleMenuPage(e, isOpenMenuUsuario, setIsOpenMenuUsuario) }>
							<DropdownToggle nav caret>
								Usuário 3
							</DropdownToggle>

							<DropdownMenu>
								<DropdownItem header>
									<i>Selecione a opção desejada</i>
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
									<Link to="/usuario/34">Action 4 (usuario/34)</Link>
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
							<NavLink tag={ Link } to="/usuario">Usuario Out</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario/33">Usuario/33 Out</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario/34">Usuario/34 Out</NavLink>
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
