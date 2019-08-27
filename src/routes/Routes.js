import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainController from 'routes/controllers/MainController';

import Home from 'components/_pages/_home/Home';
import Logon from 'components/_pages/_auth/Logon';
import Usuario from 'components/_pages/_usuario/Usuario';

import NotFound from 'components/_common/NotFound';

const Routes = props => {
	const FadingRoute = ({ isProtected, component: Component, ...pathDetails }) => {
		return (
			<Route {...pathDetails} render={
				routeProps => {
					return (
						<MainController { ...props.cbUserLogged } isProtected={ isProtected } { ...routeProps }>
							<Component { ...routeProps } />
							<Home { ...routeProps } />
							<Logon { ...routeProps } />
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
			<FadingRoute isProtected="false" component={ Logon } exact path="/logon" />
			<FadingRoute isProtected="true" component={ Usuario } path="/usuario" />
			<FadingRoute isProtected="false" component={ NotFound } path="*" />
		</Switch>
	);
};

export default Routes;
