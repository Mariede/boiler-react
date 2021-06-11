import { useRef, useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RouteGate from 'application/RouteGate';

import ErrorBoundary from 'components/_common/ErrorBoundary';
import Header from 'components/_common/Header';
import Footer from 'components/_common/Footer';

import ContextConfig from 'components/_context/ContextConfig';
import ContextUserData from 'components/_context/ContextUserData';

const App = props => {
	const { configData } = props;

	const [userData, setUserData] = useState(null);

	const renderCount = useRef(0);

	const userIsLogged = useMemo(
		() => {
			let logged = false;

			if (userData) {
				sessionStorage.setItem('is-logged', 'true');
				logged = true;
			} else {
				if (userData === undefined) {
					setUserData(null);
				} else {
					if (renderCount.current === 0 && sessionStorage.getItem('is-logged') === 'true') {
						logged = undefined;
					}

					sessionStorage.removeItem('is-logged');
				}
			}

			return logged;
		},
		[userData]
	);

	useEffect(
		() => {
			renderCount.current++;
		}
	);

	return (
		<ContextConfig.Provider value={ configData }>
			<ContextUserData.Provider value={ { getUserData: userData ? JSON.parse(userData) : {}, setUserData: uData => setUserData(uData) } }>
				<Router basename='/#'>
					<ErrorBoundary>
						<Header isLogged={ userIsLogged } />

						<div id="wrapper">
							<RouteGate isLogged={ userIsLogged } />
						</div>

						<Footer />
					</ErrorBoundary>
				</Router>
			</ContextUserData.Provider>
		</ContextConfig.Provider>
	);
};

export default App;
