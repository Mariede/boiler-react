import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainController from 'routes/controllers/MainController';

import Home from 'components/_pages/Home';
import Login from 'components/_common/Login';
import Usuario from 'components/_pages/_usuario/Usuario';
import NotFound from 'components/_pages/NotFound';

const Routes = () => {
	const FadingRoute = ({ component: Component, ...pathDetails }) => {
		return (
			<Route {...pathDetails} render={
				routeProps => {
					return (
						<MainController { ...routeProps }>
							<Component />
						</MainController>
					);
				}
			} />
		);
	};

	// Rotas adicionadas aqui
	return (
		<Switch>
			<FadingRoute component={ Home } exact path="/" />
			<FadingRoute component={ Login } exact path="/login" />
			<FadingRoute component={ Usuario } path="/usuario" />
			<FadingRoute component={ NotFound } path="*" />
		</Switch>
	);
};

export default Routes;
