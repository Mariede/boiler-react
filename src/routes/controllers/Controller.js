import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import ContextConfig from 'components/_helpers/ContextConfig';
import ContextUserData from 'components/_helpers/ContextUserData';

const Controller = props => {
	const [dataReady, setDataReady] = useState(false);

	const getUrl = useContext(ContextConfig).baseUrl;
	const setUserData = useContext(ContextUserData).setUserData;

	const [Component, Home, Logon] = props.children;
	const isLogged = props.isLogged;
	const isProtected = props.isProtected;
	const currentPath = props.location.pathname;
	const currentKey = props.location.key;

	useEffect(() => {
		if (isLogged && currentPath !== '/logon') { // Usuario logado
			sessionStorage.setItem('current-path', currentPath);
		}
	}, [isLogged, currentPath]);

	useEffect(() => {
		let isMounted = true;

		setDataReady(false);

		axios
		.get(
			`${getUrl}/isLogged`,
			{
				params: {
					result_type: 1
				}
			}
		)
		.then(
			res => {
				if (isMounted) {
					setUserData((res.data ? JSON.stringify(res.data) : null));
				}
			}
		)
		.catch(
			err => {
				throw err;
			}
		)
		.finally(
			() => {
				if (isMounted) {
					setDataReady(true);
				}
			}
		);

		return () => {
			isMounted = false;
		};
	}, [getUrl, setUserData, currentKey]);

	return (
		<div id="controller">
			{
				(
					!dataReady ? (
						null
					) : (
						!isProtected ? (
							!isLogged ? (
								Component
							) : (
								Component.type.name !== 'Logon' ? Component : Home
							)
						) : (
							!isLogged ? (
								Logon
							) : (
								Component
							)
						)
					)
				)
			}
		</div>
	);
};

export default Controller;
