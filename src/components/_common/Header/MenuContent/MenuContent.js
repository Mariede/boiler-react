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

	const dropdownElementsInitialValues = {
		usuarioDrop1: false,
		usuarioDrop2: false
	};

	const [dropdownElements, handleDropdownElements] = useState(dropdownElementsInitialValues);

	const changeDropdownElements = e => {
		e.preventDefault();

		const container = e.currentTarget;

		let closeAll = false;

		if (container && container.tagName === 'A') {
			const id = container.id;

			if (id && Object.prototype.hasOwnProperty.call(dropdownElementsInitialValues, id)) {
				const value = (container.getAttribute('aria-expanded') === 'false');
				handleDropdownElements(prevState => ({ ...prevState, [id]: value }));
			} else {
				closeAll = true;
			}
		} else {
			closeAll = true;
		}

		if (closeAll) {
			handleDropdownElements(dropdownElementsInitialValues);
		}
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

						<Dropdown nav isOpen={ dropdownElements.usuarioDrop1 } direction="down" toggle={ changeDropdownElements }>
							<DropdownToggle id="usuarioDrop1" nav caret>
								Usuário 3
							</DropdownToggle>

							<DropdownMenu>
								<DropdownItem header>
									<em>Selecione a opção desejada</em>
								</DropdownItem>

								<DropdownItem>
									<Link to="/dsdsds">Action 1 (dsdsds)</Link>
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

						<Dropdown nav isOpen={ dropdownElements.usuarioDrop2 } direction="down" toggle={ changeDropdownElements }>
							<DropdownToggle id="usuarioDrop2" nav caret>
								Usuário 4
							</DropdownToggle>

							<DropdownMenu>
								<DropdownItem header>
									<em>Selecione a opção desejada</em>
								</DropdownItem>

								<DropdownItem>
									<Link to="/gggg">Action 1 (gggg)</Link>
								</DropdownItem>

								<DropdownItem>
									<Link to="/">Home</Link>
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
