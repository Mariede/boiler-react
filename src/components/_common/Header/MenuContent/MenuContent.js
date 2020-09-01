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

	/*
		Array de objetos contendo as definicoes do(s) menu(s) e submenu(s) em dropdown
	*/
	const dropdowns = [
		{
			toggle: { title: 'Usuário 1', id: 'menuDrop1', state: dropdownElements.menuDrop1 },
			links: [
				{ text: 'Action 1 (not found)', to: '/fgfgfgf' },
				{ text: 'Action 2 (not found)', to: '/fgfgfgf', disabled: true },
				{ text: 'Action 3 (usuario/33)', to: '/usuario/33' },
				{ text: 'Action 4 (usuario/40)', to: '/usuario/40' },
				{ text: 'Action 5 (logon)', to: '/logon' },
				{
					toggle: { title: 'Usuário 2', id: 'menuDrop2', state: dropdownElements.menuDrop2 },
					links: [
						{ text: 'Action 6 (not found)', to: '/fgfgfgf' },
						{ text: 'Action 7 (home)', to: '/' },
						{
							toggle: { title: 'Usuário 3', id: 'menuDrop3', state: dropdownElements.menuDrop3 },
							links: [
								{ text: 'Action 8 (usuario/93)', to: '/usuario/93' },
								{ text: 'Action 9 (usuario/8)', to: '/usuario/8' }
							]
						}
					]
				}
			]
		},
		{
			toggle: { title: 'Usuário 4', id: 'menuDrop4', state: dropdownElements.menuDrop4 },
			links: [
				{ text: 'Action 10 (not found)', to: '/fgfgfgf' },
				{ text: 'Action 11 (not found)', to: '/fgfgfgf', disabled: true },
				{ text: 'Action 12 (usuario/68)', to: '/usuario/68' }
			]
		}
	];

	const setDropdowns = () => {
		const setDropdown = (menu, i, isSubmenu) => {
			const changeDropdownElements = e => {
				const container = e.currentTarget;
				const containerTag = container && container.tagName;

				let closeAll = false;

				if (containerTag === 'A') {
					const id = container.id;

					if (id && Object.prototype.hasOwnProperty.call(dropdownElementsInitialValues, id)) {
						handleDropdownElements(prevState => ({ ...prevState, [id]: !prevState[id] }));
					} else {
						closeAll = true;
					}
				} else {
					const element = e.target;

					if (containerTag) {
						if (element.tagName === 'A') {
							closeAll = true;
						}
					} else {
						const isMenuItem = element.closest('.dropdown-menu');

						if (!isMenuItem) {
							closeAll = true;
						}
					}
				}

				if (closeAll) {
					handleDropdownElements(dropdownElementsInitialValues);
				}
			};

			return (
				<Dropdown nav={ isSubmenu === false } isOpen={ menu.toggle.state } direction={ isSubmenu ? 'left' : 'down' } toggle={ changeDropdownElements } key={ i }>
					<DropdownToggle id={ menu.toggle.id } nav caret className={ isSubmenu ? 'submenu' : '' }>
						{ menu.toggle.title }
					</DropdownToggle>

					<DropdownMenu>
						{
							(isSubmenu) ? (
								null
							) : (
								<DropdownItem header>
									<em>Selecione a opção desejada</em>
								</DropdownItem>
							)
						}

						<DropdownItem divider />

						{
							menu.links.map(
								(link, index) => {
									if (link.toggle) {
										return (
											setDropdown(link, index, true)
										);
									}

									return (
										<DropdownItem disabled={ link.disabled === true } key={ index }>
											<Link to={ link.to }>{ link.text }</Link>
										</DropdownItem>
									);
								}
							)
						}

						<DropdownItem divider />
					</DropdownMenu>
				</Dropdown>
			);
		};

		const DropdownMenus = dropdowns.map(
			(dropdown, index) => (
				setDropdown(dropdown, index, false)
			)
		);

		return DropdownMenus;
	};

	return (
		<Nav id="menu" className="ml-auto" navbar>
			{
				isLogged ? (
					<Nav tabs>
						<NavItem>
							<NavLink tag={ Link } to="/usuario">Usuário NAV 1</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario">Usuário NAV 2</NavLink>
						</NavItem>

						{ setDropdowns() }
					</Nav>
				) : (
					<Nav tabs>
						<NavItem>
							<NavLink tag={ Link } to="/usuario">Usuário NAV 1</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario/33">Usuário/33 NAV 2</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario/40">Usuário/40 NAV 3</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/dsdsds">NAV Not Found</NavLink>
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
