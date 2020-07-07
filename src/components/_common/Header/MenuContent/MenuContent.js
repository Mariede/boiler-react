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
									<Link to="/logon">Action 3 (logon)</Link>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Nav>
				) : (
					<Nav tabs>
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