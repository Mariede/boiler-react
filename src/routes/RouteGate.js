import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Controller from 'routes/controllers/Controller';

import routes from 'routes/routes';

const RouteGate = props => {
	const Home = routes.getHome;
	const Logon = routes.getLogon;

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
				routes.getRoutes.map(
					(route, i = 0) => <FadingRoute isProtected={ route.isProtected } component={ route.component } exact={ route.exact } path={ route.path } key={ i } />
				)
			}
		</Switch>
	);
};

export default RouteGate;
