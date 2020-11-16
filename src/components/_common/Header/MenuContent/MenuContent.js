import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Nav, NavItem, NavLink } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import useCheckPermissions from 'components/_custom-hooks/useCheckPermissions';
import appPermissions from 'helpers/appPermissions';

import './MenuContent.css';

/*
	DEPENDENCIAS:
		- Reactstrap

	PROPS:
		- isLogged
*/
const MenuContent = props => {
	const { isLogged } = props;

	/*
		Objeto de estados apenas para menus em dropdown
			-> incluidos de forma hierarquica, para cada submenu interno
	*/
	const dropdownElementsInitialValues = useMemo(
		() => (
			{
				gerenciamento: false,
				menuDrop2: false,
				menuDrop21: false,
				menuDrop22: false
			}
		),
		[]
	);

	const [dropdownElements, handleDropdownElements] = useState(dropdownElementsInitialValues);

	const pMenuEmpresas = useCheckPermissions(
		{
			allowedPermissions: [
				appPermissions.lstEmpresas,
				appPermissions.edtEmpresas
			]
		}
	);

	const pMenuUsuarios = useCheckPermissions(
		{
			allowedPermissions: [
				appPermissions.lstUsuarios,
				appPermissions.edtUsuarios
			]
		}
	);

	const pMenuMinhaSenha = useCheckPermissions(
		{
			allowedPermissions: [
				appPermissions.edtMinhaSenha
			]
		}
	);

	/*
		Array de objetos contendo as definicoes do(s) menu(s) e submenu(s)
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
	const dropdowns = useMemo(
		() => (
			{
				all: [],
				onlyLogged: [
					{
						toggle: { title: 'Gerenciamento', id: 'gerenciamento', state: dropdownElements.gerenciamento },
						links: [
							{ text: 'Empresas', to: '/empresa', disabled: !pMenuEmpresas },
							{ text: 'Usuários', to: '/usuario', disabled: !pMenuUsuarios },
							{ text: 'Minha senha', to: '/usuario/senha', disabled: !pMenuMinhaSenha }
						]
					},
					{
						toggle: { title: 'Menu 2', id: 'menuDrop2', state: dropdownElements.menuDrop2 },
						links: [
							{ text: 'Action 1 (not found)', to: '/fgfgfgf' },
							{ text: 'Action 2 (not found)', to: '/fgfgfgf', disabled: true },
							{ text: 'Action 3 (usuario/33)', to: '/usuario/33' },
							{ text: 'Action 4 (usuario/40)', to: '/usuario/40' },
							{ text: 'Action 5 (logon)', to: '/logon' },
							{
								toggle: { title: 'Submenu 21', id: 'menuDrop21', state: dropdownElements.menuDrop21 },
								links: [
									{ text: 'Action 6 (not found)', to: '/fgfgfgf' },
									{ text: 'Action 7 (home)', to: '/' },
									{
										toggle: { title: 'Submenu 22', id: 'menuDrop22', state: dropdownElements.menuDrop22 },
										links: [
											{ text: 'Action 8 (usuario/93)', to: '/usuario/93' },
											{ text: 'Action 9 (usuario/8)', to: '/usuario/8' },
											{ text: 'Action 10 (usuario/senha)', to: '/usuario/senha' }
										]
									}
								]
							}
						]
					},
					{ text: 'Menu 3', to: '/usuario' },
					{ text: 'Menu 4', to: '/usuario/76' }
				],
				onlyNotLogged: [
					{ text: 'Logon', to: '/logon' }
				]
			}
		),
		[dropdownElements, pMenuEmpresas, pMenuUsuarios, pMenuMinhaSenha]
	);

	const setDropdowns = useMemo(
		() => {
			const setDropdown = (menu, i, isSubmenu) => {
				const changeDropdownElements = e => {
					const container = (e.key !== 'Enter' ? e.currentTarget : e.target);
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
						<Dropdown a11y={ false } nav={ isSubmenu === false } isOpen={ menu.toggle.state } direction={ isSubmenu ? 'left' : 'down' } toggle={ changeDropdownElements } key={ i }>
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
														<DropdownItem tag={ Link } to={ link.to } disabled={ link.disabled === true } key={ index }>
															{ link.text }
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
								<NavLink tag={ Link } to={ menu.to } disabled={ menu.disabled === true }>
									{ menu.text }
								</NavLink>
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
