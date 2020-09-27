import React, { Fragment, useEffect, useContext } from 'react';

import useDataGet from 'components/_custom-hooks/useDataGet';

import ContextUserData from 'components/_context/ContextUserData';

const Controller = props => {
	const { isLogged, isProtected, onlyNotLogged, children, location } = props;

	const setUserData = useContext(ContextUserData).setUserData;

	const [Target, Logon, Home] = children;
	const currentKey = location.key;
	const currentPath = location.pathname;
	const currentSearch = location.search;

	const { Component, dataReady } = useDataGet(
		{
			route: '/islogged',
			currentKey: currentKey,
			params: {
				result_type: 1
			},
			cbThen: res => {
				const resDataLen = Object.keys(res.data).length;

				setUserData((resDataLen ? JSON.stringify(res.data) : null));

				if (resDataLen === 0) {
					if (sessionStorage.getItem('is-logged') === 'true') {
						sessionStorage.removeItem('is-logged');
					}
				} else {
					if (sessionStorage.getItem('is-logged') !== 'true') {
						sessionStorage.setItem('is-logged', 'true');
					}
				}
			},
			cbCatch: {
				header: 'Controller',
				type: 4
			}
		}
	);

	useEffect(
		() => {
			if (dataReady && isLogged && currentPath !== '/logon') { // Usuario logado
				sessionStorage.setItem('current-path', currentPath + currentSearch);
			}
		},
		[dataReady, isLogged, currentPath, currentSearch]
	);

	return (
		<Fragment>
			{ Component }
			{
				isLogged !== undefined ? (
					!isProtected ? (
						!isLogged ? (
							Target
						) : (
							onlyNotLogged ? (
								Home
							) : (
								Target
							)
						)
					) : (
						!isLogged ? (
							Logon
						) : (
							Target
						)
					)
				) : (
					null
				)
			}
		</Fragment>
	);
};

export default Controller;
