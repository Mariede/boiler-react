import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';

import ConfigContext from 'components/_helpers/ConfigContext';

const MainController = props => {
	const getUrl = React.useContext(ConfigContext).baseUrl;

	const [notify, setNotify] = useState();
	const [loading, setLoading] = useState(false);

	const [resultData, setResultData] = useState(props.cbUserLogged.userLogged);
	const [dataLogged, setDataLogged] = useState(false);

	const [Component, Login, Home] = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;
	const keyRoute = props.location.key;

	sessionStorage.setItem('current-path', currentPath);

	useEffect(() => {
		props.cbUserLogged.checkUserLogged(resultData);
		setDataLogged(false);
	}, [props, resultData]);

	useEffect(() => {
		setNotify();
		setLoading(true);

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
				setNotify(err);
				throw err;
			}
		)
		.finally(
			() => {
				setLoading(false);
				setDataLogged(true);
			}
		);
	}, [getUrl, keyRoute]);

	const AuthComponent = () => {
		return (
			<div id="controller">
				{ Notify({ info: notify, header: 'Controlador Principal', type: 4 }) }
				{ Loading({ message: 'Aguarde...', loading: loading }) }
				{ (dataLogged ? (!isProtected ? (!resultData ? Component : (Component.type.name !== 'Login' ? Component : Home)) : (resultData ? Component : Login)) : 'carregando...') }
			</div>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
