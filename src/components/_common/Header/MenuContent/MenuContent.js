import React from 'react';
import { Link } from 'react-router-dom';

import { Nav, NavItem, NavLink } from 'reactstrap';

import './MenuContent.css';

const MenuContent = props => (
	<Nav id="menu" className="ml-auto" navbar>
		{
			props.isLogged ? (
				<Nav tabs>
					<NavItem>
						<NavLink tag={ Link } to="/usuario/40">Usuário 40</NavLink>
					</NavItem>

					<NavItem>
						<NavLink tag={ Link } to="/usuario">Usuário</NavLink>
					</NavItem>
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

export default MenuContent;
