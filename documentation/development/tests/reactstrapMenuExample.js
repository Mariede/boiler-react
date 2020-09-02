import React, { useState, useMemo } from 'react';
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

	const setDropdowns = useMemo(
		() => {
			/*
				Array de objetos contendo as definicoes do(s) menu(s) e submenu(s) em dropdown
					all				-> menus dropdown exibidos tanto logado quanto deslogado
					onlyLogged		-> menus dropdown exibidos apenas logado
					onlyNotLogged	-> menus dropdown exibidos apenas deslogado

				Estrutura do menu dropdown
					- toggle		-> cabecalho do menu e variaveis de controle de visibilidade
						title		-> titulo
						id			-> id do menu (DEVE ter o mesmo nome da variavel de estado relacionada)
						state		-> variavel de estado relacionada

					- links			-> array de um ou mais links do menus
						text		-> texto exibido no link
						to			-> link para a pagina
						disabled	-> opcional, se true link desabilitado

				Submenus (n niveis)
					- links 		-> podem conter um objeto completo de menu (com toggle e links)
			*/
			const dropdowns = {
				all: [],
				onlyLogged: [
					{
						toggle: { title: 'Menu 1', id: 'menuDrop1', state: dropdownElements.menuDrop1 },
						links: [
							{ text: 'Action 1 (not found)', to: '/fgfgfgf' },
							{ text: 'Action 2 (not found)', to: '/fgfgfgf', disabled: true },
							{ text: 'Action 3 (usuario/33)', to: '/usuario/33' },
							{ text: 'Action 4 (usuario/40)', to: '/usuario/40' },
							{ text: 'Action 5 (logon)', to: '/logon' },
							{
								toggle: { title: 'Menu 2', id: 'menuDrop2', state: dropdownElements.menuDrop2 },
								links: [
									{ text: 'Action 6 (not found)', to: '/fgfgfgf' },
									{ text: 'Action 7 (home)', to: '/' },
									{
										toggle: { title: 'Menu 3', id: 'menuDrop3', state: dropdownElements.menuDrop3 },
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
						toggle: { title: 'Menu 4', id: 'menuDrop4', state: dropdownElements.menuDrop4 },
						links: [
							{ text: 'Action 10 (not found)', to: '/fgfgfgf' },
							{ text: 'Action 11 (not found)', to: '/fgfgfgf', disabled: true },
							{ text: 'Action 12 (usuario/68)', to: '/usuario/68' }
						]
					}
				],
				onlyNotLogged: []
			};

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
					menu.toggle ? (
						<Dropdown nav={ isSubmenu === false } isOpen={ menu.toggle.state } direction={ isSubmenu ? 'left' : 'down' } toggle={ changeDropdownElements } key={ i }>
							<DropdownToggle id={ menu.toggle.id } nav caret className={ isSubmenu ? 'submenu' : '' }>
								{ menu.toggle.title }
							</DropdownToggle>

							<DropdownMenu>
								<DropdownItem header>
									{
										isSubmenu ? (
											menu.toggle.title
										) : (
											'Selecione a opção desejada'
										)
									}
								</DropdownItem>

								<DropdownItem divider />

								{
									menu.links ? (
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
									) : (
										null
									)
								}

								<DropdownItem divider />
							</DropdownMenu>
						</Dropdown>
					) : (
						null
					)
				);
			};

			const dropdownsGroup = (isLogged ? dropdowns.all.concat(dropdowns.onlyLogged) : dropdowns.all.concat(dropdowns.onlyNotLogged));

			const DropdownMenus = (Array.isArray(dropdownsGroup) && dropdownsGroup.length !== 0) ? (
				dropdownsGroup.map(
					(dropdown, index) => (
						setDropdown(dropdown, index, false)
					)
				)
			) : (
				null
			);

			return DropdownMenus;
		},
		[isLogged, dropdownElementsInitialValues, dropdownElements]
	);

	return (
		<Nav id="menu" className="ml-auto" navbar>
			{
				isLogged ? (
					<Nav tabs>
						{ setDropdowns }

						<NavItem>
							<NavLink tag={ Link } to="/usuario">Menu 5</NavLink>
						</NavItem>

						<NavItem>
							<NavLink tag={ Link } to="/usuario">Menu 6</NavLink>
						</NavItem>
					</Nav>
				) : (
					<Nav tabs>
						{ setDropdowns }

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
