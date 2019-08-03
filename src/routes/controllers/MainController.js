import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';

import ConfigContext from 'components/_helpers/ConfigContext';

const MainController = props => {
	const getUrl = React.useContext(ConfigContext).baseUrl;

	const [notify, setNotify] = useState(['', 0]);
	const [loading, setLoading] = useState(false);

	const [resultData, setResultData] = useState(props.cbUserLogged.userLogged);
	const [dataFetch, setDataFetch] = useState(false);

	const [Component, Login, Home] = props.children;
	const isProtected = (props.isProtected !== 'false');
	const currentPath = props.location.pathname;
	const keyRoute = props.location.key;

	useEffect(() => {
		props.cbUserLogged.checkUserLogged(resultData);
		setDataFetch(false);
	}, [resultData, props]);

	useEffect(() => {
		if (resultData && currentPath !== '/login') { // usuario logado
			sessionStorage.setItem('current-path', currentPath);
		}
	}, [resultData, currentPath]);

	useEffect(() => {
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
				setNotify(['', 0]);
				setResultData(res.data);
			}
		)
		.catch(
			err => {
				setNotify([err, 4]);
				throw err;
			}
		)
		.finally(
			() => {
				setLoading(false);
				setDataFetch(true);
			}
		);
	}, [getUrl, keyRoute]);

	const AuthComponent = () => {
		return (
			<div id="controller">
				{ Loading({ message: 'Aguarde...', loading: loading }) }
				{ Notify({ info: (!loading ? notify[0] : ''), header: 'Controlador Principal', type: notify[1] }) }

				{ (dataFetch ? (!isProtected ? (!resultData ? Component : (Component.type.name !== 'Login' ? Component : Home)) : (resultData ? Component : Login)) : 'carregando...') }
			</div>
		);
	};

	return (
		<AuthComponent />
	);
};

export default MainController;
