import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainController from 'routes/controllers/MainController';

import Home from 'components/_pages/Home';
import Login from 'components/_common/Login';
import Usuario from 'components/_pages/_usuario/Usuario';
import NotFound from 'components/_pages/NotFound';

const Routes = () => {
	const FadingRoute = ({ isProtected, component: Component, ...pathDetails }) => {
		return (
			<Route {...pathDetails} render={
				routeProps => {
					return (
						<MainController isProtected={ isProtected } { ...routeProps }>
							<Component />
							<Login />
						</MainController>
					);
				}
			} />
		);
	};

	// Rotas adicionadas aqui
	return (
		<Switch>
			<FadingRoute isProtected="true" component={ Home } exact path="/" />
			<FadingRoute isProtected="false" component={ Login } exact path="/login" />
			<FadingRoute isProtected="true" component={ Usuario } path="/usuario" />
			<FadingRoute isProtected="false" component={ NotFound } path="*" />
		</Switch>
	);
};

export default Routes;
