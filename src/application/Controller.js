import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';

import ContextConfig from 'components/_context/ContextConfig';
import ContextUserData from 'components/_context/ContextUserData';

const Controller = props => {
	const [dataReady, setDataReady] = useState(false);
	const [notify, setNotify] = useState(null);

	const getUrl = useContext(ContextConfig).baseUrl;
	const setUserData = useContext(ContextUserData).setUserData;

	const [Target, Home, Logon] = props.children;
	const isLogged = props.isLogged;
	const isProtected = props.isProtected;
	const currentPath = props.location.pathname;
	const currentKey = props.location.key;

	const targetCheckPass = (Target.type.name !== 'Logon');

	useEffect(() => {
		if (isLogged && currentPath !== '/logon') { // Usuario logado
			sessionStorage.setItem('current-path', currentPath);
		}
	}, [isLogged, currentPath]);

	useEffect(() => {
		let isMounted = true;

		if (!isProtected && targetCheckPass && !sessionStorage.getItem('is-logged')) {
			setDataReady(true);
			setUserData(null);
		} else {
			setDataReady(false);
			setNotify(null);

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
					if (isMounted) {
						setNotify({ info: (err.response || err), header: 'Controller', type: 4 });
					}

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
		}

		return () => {
			isMounted = false;
		};
	}, [getUrl, setUserData, isProtected, targetCheckPass, currentKey]);

	const Component = (
		<div id="controller">
			{
				(
					!dataReady ? (
						null
					) : (
						!isProtected ? (
							!isLogged ? (
								Target
							) : (
								targetCheckPass ? Target : Home
							)
						) : (
							!isLogged ? (
								Logon
							) : (
								Target
							)
						)
					)
				)
			}
		</div>
	);

	return (
		<React.Fragment>
			<Loading loading={ !dataReady } />
			<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } />
			{ Component }
		</React.Fragment>
	);
};

export default Controller;
