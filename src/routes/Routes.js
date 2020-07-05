import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Controller from 'routes/controllers/Controller';

import Home from 'components/_pages/_home/Home';
import Logon from 'components/_pages/_auth/Logon';
import Usuario from 'components/_pages/_usuario/Usuario';

import NotFound from 'components/_common/NotFound';

const Routes = props => {
	// Rotas adicionadas aqui
	const routes = [
		{ isProtected: true, component: Home, exact: true, path: '/' },
		{ isProtected: false, component: Logon, exact: true, path: '/logon' },
		{ isProtected: true, component: Usuario, exact: false, path: '/usuario' },
		{ isProtected: false, component: NotFound, exact: false, path: '*' }
	];

	const FadingRoute = ({ isProtected, component: Component, ...pathDetails }) => (
		<Route { ...pathDetails } render={
			routeProps => (
				<Controller isLogged={ props.isLogged } isProtected={ isProtected } { ...routeProps }>
					<Component { ...routeProps } />
					<Home { ...routeProps } />
					<Logon { ...routeProps } />
				</Controller>
			)
		} />
	);

	return (
		<Switch>
			{
				routes.map(
					(route, i = 0) => <FadingRoute isProtected={ route.isProtected } component={ route.component } exact={ route.exact } path={ route.path } key={ i } />
				)
			}
		</Switch>
	);
};

export default Routes;
