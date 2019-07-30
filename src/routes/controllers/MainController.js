import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';
import Config from 'components/_helpers/Config';

const MainController = props => {
	const [resultData, setResultData] = useState(false);
	const [resultError, setResultError] = useState({});
	const [resultLoading, setResultLoading] = useState(false);

	const getUrl = React.useContext(Config).baseUrl;

	const newPropsChildren = React.Children.map(props.children, child => {
		return React.cloneElement(child, {
			setNotify: (n) => {
				setNotify(n);
			},
			setLoading: (l) => {
				setLoading(l);
			}
		});
	});

	const [Component, Login] = newPropsChildren;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;
	const keyRoute = props.location.key;

	sessionStorage.setItem('current-path', currentPath);

	useEffect(() => {
		setResultData(false);
		setResultError({});

		if (isProtected) {
			setResultLoading(true);

			axios.get(
				getUrl + '/isLogged'
			)
			.then(
				res => {
					setResultData(res.data);
				}
			)
			.catch(
				err => {
					err.header = 'Controlador Principal';
					err.type = 4;

					setResultError(err);

					throw err;
				}
			)
			.finally(
				() => {
					setResultLoading(false);
				}
			);
		}
	}, [getUrl, isProtected, keyRoute]);

	const setNotify = error => {
		setResultError(error);
	};

	const setLoading = loading => {
		setResultLoading(loading);
	};

	const AuthComponent = () => {
		return (
			<React.Fragment>
				{ Notify({ info: resultError }) }
				{ Loading({ message: 'Aguarde...', loading: resultLoading }) }
				<div id="controller">
					{ (!isProtected ? Component : (!resultLoading ? (resultData ? Component : Login) : 'carregando...')) }
				</div>
			</React.Fragment>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
