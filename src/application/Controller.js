import React, { Fragment, useState, useEffect, useContext } from 'react';

import useDataGet from 'components/_custom-hooks/useDataGet';

import ContextUserData from 'components/_context/ContextUserData';

const Controller = props => {
	const [dataReady, setDataReady] = useState(false);

	const getUserData = useContext(ContextUserData).getUserData;
	const setUserData = useContext(ContextUserData).setUserData;

	const [Target, Logon] = props.children;

	const { isLogged, isProtected, location } = props;
	const currentPath = location.pathname;
	const currentKey = location.key;

	useEffect(
		() => {
			if (dataReady && isLogged && currentPath !== '/logon') { // Usuario logado
				sessionStorage.setItem('current-path', currentPath);
			}
		},
		[dataReady, isLogged, currentPath]
	);

	const Component = useDataGet(
		{
			route: '/islogged',
			dataReady: dataReady,
			cbDataReady: dataWhen => {
				setDataReady(dataWhen);
			},
			checkPass: (!isProtected && !sessionStorage.getItem('is-logged')),
			currentKey: currentKey,
			params: {
				result_type: 1
			},
			cbThen: res => {
				const resDataLen = Object.keys(res.data).length;

				if (resDataLen !== Object.keys(getUserData).length) {
					setUserData((resDataLen ? JSON.stringify(res.data) : null));
				}
			},
			cbCatch: {
				header: 'Controller',
				type: 4
			}
		}
	);

	return (
		<Fragment>
			{ Component }
			{
				!dataReady ? (
					null
				) : (
					!isProtected ? (
						Target
					) : (
						!isLogged ? (
							Logon
						) : (
							Target
						)
					)
				)
			}
		</Fragment>
	);
};

export default Controller;
