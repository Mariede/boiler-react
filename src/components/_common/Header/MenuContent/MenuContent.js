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
		menuDrop12: false,
		menuDrop13: false,
		menuDrop2: false
	};

	const [dropdownElements, handleDropdownElements] = useState(dropdownElementsInitialValues);

	/*
		Array de objetos contendo as definicoes do(s) menu(s) e submenu(s) em dropdown
			all				-> menus exibidos tanto logado quanto deslogado
			onlyLogged		-> menus exibidos apenas logado
			onlyNotLogged	-> menus exibidos apenas deslogado

		** Estrutura do menu dropdown
			- toggle		-> cabecalho do menu e variaveis de controle de visibilidade
				title		-> titulo
				id			-> id do menu (DEVE ter o mesmo nome da variavel de estado relacionada)
				state		-> variavel de estado relacionada

			- links			-> array de um ou mais links do menus
				text		-> texto exibido no link (obrigatorio)
				to			-> link para a pagina (obrigatorio)
				disabled	-> opcional, se true link desabilitado

		Submenus dropdown (n niveis)
			- links 		-> podem conter um objeto completo de menu (com toggle e links)

		** Estrutura do menu simples (link direto)
			- Se chave toggle nao existir no objeto NIVEL 1, este e considerado um link direto
				text		-> texto exibido no link (obrigatorio)
				to			-> link para a pagina (obrigatorio)
				disabled	-> opcional, se true link desabilitado
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
						toggle: { title: 'Submenu 12', id: 'menuDrop12', state: dropdownElements.menuDrop12 },
						links: [
							{ text: 'Action 6 (not found)', to: '/fgfgfgf' },
							{ text: 'Action 7 (home)', to: '/' },
							{
								toggle: { title: 'Submenu 13', id: 'menuDrop13', state: dropdownElements.menuDrop13 },
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
				toggle: { title: 'Menu 2', id: 'menuDrop2', state: dropdownElements.menuDrop2 },
				links: [
					{ text: 'Action 10 (not found)', to: '/fgfgfgf' },
					{ text: 'Action 11 (not found)', to: '/fgfgfgf', disabled: true },
					{ text: 'Action 12 (usuario/68)', to: '/usuario/68' }
				]
			},
			{ text: 'Menu 3', to: '/usuario' },
			{ text: 'Menu 4', to: '/usuario/76' }
		],
		onlyNotLogged: [
			{ text: 'Logon', to: '/logon' }
		]
	};

	const setDropdowns = useMemo(
		() => {
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
													(link.text && link.to) ? (
														<DropdownItem disabled={ link.disabled === true } key={ index }>
															<Link to={ link.to }>{ link.text }</Link>
														</DropdownItem>
													) : (
														null
													)
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
						(menu.text && menu.to) ? (
							<NavItem key={ i }>
								<NavLink tag={ Link } to={ menu.to } disabled={ menu.disabled === true }>{ menu.text }</NavLink>
							</NavItem>
						) : (
							null
						)
					)
				);
			};

			const dropdownsGroup = (isLogged ? dropdowns.onlyLogged.concat(dropdowns.all) : dropdowns.onlyNotLogged.concat(dropdowns.all));

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
		[isLogged, dropdownElementsInitialValues, dropdowns]
	);

	return (
		<Nav id="menu" className="ml-auto" navbar>
			<Nav tabs>
				{ setDropdowns }
			</Nav>
		</Nav>
	);
};

export default MenuContent;
