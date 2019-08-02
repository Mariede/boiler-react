import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';
import ConfigContext from 'components/_helpers/ConfigContext';

const MainController = props => {
	const [resultData, setResultData] = useState(props.userLogged);
	const [resultError, setResultError] = useState({});
	const [resultLoading, setResultLoading] = useState(false);
	const [dataLogged, setDataLogged] = useState(false);

	const getUrl = React.useContext(ConfigContext).baseUrl;

	const newPropsChildren = React.Children.map(props.children, child => {
		return React.cloneElement(child, {
			setNotify: (n) => {
				setNotify(n);
			},
			setLoading: (l) => {
				setLoading(l);
			},
			setErrors: (e, h, t) => {
				return setErrors(e, h, t);
			}
		});
	});

	const [Component, Login, Home] = newPropsChildren;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;
	const keyRoute = props.location.key;

	sessionStorage.setItem('current-path', currentPath);

	useEffect(() => {
		props.checkUserLogged(resultData);
		setDataLogged(false);
	}, [props, resultData]);

	useEffect(() => {
		setResultError({});
		setResultLoading(true);

		axios.get(
			getUrl + '/isLogged',
			{
				params: {
					result_type: 'a'
				}
			}
		)
		.then(
			res => {
				setResultData(res.data);
			}
		)
		.catch(
			err => {
				const errThis = setErrors(err, 'Controlador Principal', 4);
				setResultError(errThis);
				throw errThis;
			}
		)
		.finally(
			() => {
				setResultLoading(false);
				setDataLogged(true);
			}
		);
	}, [getUrl, resultData, keyRoute]);

	const setNotify = error => {
		setResultError(error);
	};

	const setLoading = loading => {
		setResultLoading(loading);
	};

	const setErrors = (error, header, type) => {
		const errThis = (error.response ? error.response.data : error);

		errThis.header = header;
		errThis.type = type;

		return errThis;
	};

	const AuthComponent = () => {
		return (
			<React.Fragment>
				{ Notify({ info: resultError }) }
				{ Loading({ message: 'Aguarde...', loading: resultLoading }) }
				<div id="controller">
					{ (dataLogged ? (!isProtected ? (!resultData ? Component : (Component.type.name !== 'Login' ? Component : Home)) : (resultData ? Component : Login)) : 'carregando...') }
				</div>
			</React.Fragment>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
