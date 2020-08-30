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
		menuDrop1: false,
		menuDrop2: false,
		menuDrop3: false,
		menuDrop4: false
	};

	const [dropdownElements, handleDropdownElements] = useState(dropdownElementsInitialValues);

	const changeDropdownElements = e => {
		e.preventDefault();

		const container = e.currentTarget;

		let closeAll = false;

		if (container && container.tagName === 'A') {
			const id = container.id;

			if (id && Object.prototype.hasOwnProperty.call(dropdownElementsInitialValues, id)) {
				handleDropdownElements(prevState => ({ ...prevState, [id]: !prevState[id] }));
			} else {
				closeAll = true;
			}
		} else {
			const element = e.target;

			if (container.tagName !== 'BUTTON' || element.tagName === 'A') {
				closeAll = true;
			}
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

						<Dropdown nav isOpen={ dropdownElements.menuDrop1 } direction="down" toggle={ changeDropdownElements }>
							<DropdownToggle id="menuDrop1" nav caret>
								Usuário 3
							</DropdownToggle>

							<DropdownMenu>
								<DropdownItem header>
									<em>Selecione a opção desejada</em>
								</DropdownItem>

								<DropdownItem divider />

								<DropdownItem>
									<Link to="/fgfgfgf">Action 1</Link>
								</DropdownItem>

								<DropdownItem disabled>
									Action 2
								</DropdownItem>

								<DropdownItem>
									<Link to="/usuario/33">Action 3 (usuario/33)</Link>
								</DropdownItem>

								<DropdownItem>
									<Link to="/usuario/40">Action 4 (usuario/40)</Link>
								</DropdownItem>

								<DropdownItem>
									<Link to="/logon">Action 5 (logon)</Link>
								</DropdownItem>

								<DropdownItem divider />
							</DropdownMenu>
						</Dropdown>

						<Dropdown nav isOpen={ dropdownElements.menuDrop2 } direction="down" toggle={ changeDropdownElements }>
							<DropdownToggle id="menuDrop2" nav caret>
								Usuário 4
							</DropdownToggle>

							<DropdownMenu>
								<DropdownItem header>
									<em>Selecione a opção desejada</em>
								</DropdownItem>

								<DropdownItem divider />

								<DropdownItem>
									<Link to="/fgfgfgf">Action 6</Link>
								</DropdownItem>

								<DropdownItem>
									<Link to="/">Home</Link>
								</DropdownItem>

								<Dropdown isOpen={ dropdownElements.menuDrop3 } direction="left" toggle={ changeDropdownElements }>
									<DropdownToggle id="menuDrop3" nav caret className="submenu">
										Usuário 5
									</DropdownToggle>

									<DropdownMenu>
										<DropdownItem>
											<Link to="/fgfgfgf">Action 7</Link>
										</DropdownItem>

										<DropdownItem divider />

										<DropdownItem>
											<Link to="/fgfgfgf">Action 8</Link>
										</DropdownItem>

										<DropdownItem>
											<Link to="/fgfgfgf">Action 9</Link>
										</DropdownItem>

										<Dropdown isOpen={ dropdownElements.menuDrop4 } direction="left" toggle={ changeDropdownElements }>
											<DropdownToggle id="menuDrop4" nav caret className="submenu">
												Usuário 6
											</DropdownToggle>

											<DropdownMenu>
												<DropdownItem>
													<Link to="/fgfgfgf">Action 10</Link>
												</DropdownItem>

												<DropdownItem divider />
											</DropdownMenu>
										</Dropdown>

										<DropdownItem divider />
									</DropdownMenu>
								</Dropdown>

								<DropdownItem divider />
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
