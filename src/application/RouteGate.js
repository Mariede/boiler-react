import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Controller from 'application/Controller';

import routes from 'routes/routes';

const RouteGate = props => {
	const { isLogged } = props;

	const Logon = routes.getLogon;

	const FadingRoute = ({ isProtected, component: Target, ...pathDetails }) => (
		<Route { ...pathDetails } render={
			routeProps => (
				<Controller isLogged={ isLogged } isProtected={ isProtected } { ...routeProps }>
					<Target { ...routeProps } />
					<Logon { ...routeProps } />
				</Controller>
			)
		} />
	);

	return (
		<Switch>
			{
				routes.getRoutes.map(
					(route, i = 0) => <FadingRoute isProtected={ route.isProtected } component={ route.component } exact={ route.exact } path={ route.path } key={ i } />
				)
			}
		</Switch>
	);
};

export default RouteGate;
