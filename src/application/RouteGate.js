import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Controller from 'application/Controller';

import routes from 'routes/routes';

const RouteGate = props => {
	const { isLogged } = props;

	const Logon = routes.getLogon;
	const Home = routes.getHome;

	const FadingRoute = ({ isProtected, onlyNotLogged, component: Target, ...pathDetails }) => (
		<Route { ...pathDetails } render={
			routeProps => (
				<Controller isLogged={ isLogged } isProtected={ isProtected } onlyNotLogged={ onlyNotLogged } { ...routeProps }>
					<Target { ...routeProps } />
					<Logon { ...routeProps } />
					<Home { ...routeProps } />
				</Controller>
			)
		} />
	);

	return (
		<Switch>
			{
				routes.getRoutes.map(
					(route, index) => <FadingRoute isProtected={ route.isProtected } onlyNotLogged={ (route.onlyNotLogged || false) } component={ route.component } exact={ route.exact } path={ route.path } key={ index } />
				)
			}
		</Switch>
	);
};

export default RouteGate;
