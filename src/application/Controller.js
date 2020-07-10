import React, { Fragment, useState, useEffect, useContext } from 'react';

import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';

import ContextConfig from 'components/_context/ContextConfig';
import ContextUserData from 'components/_context/ContextUserData';

const Controller = props => {
	const [dataReady, setDataReady] = useState(false);
	const [notify, setNotify] = useState(null);

	const getUrl = useContext(ContextConfig).baseUrl;
	const getUserData = useContext(ContextUserData).getUserData;
	const setUserData = useContext(ContextUserData).setUserData;

	const [Target, Logon] = props.children;
	const isLogged = props.isLogged;
	const isProtected = props.isProtected;
	const currentPath = props.location.pathname;
	const currentKey = props.location.key;

	const targetCheckPass = !isProtected && !sessionStorage.getItem('is-logged');

	useEffect(() => {
		if (dataReady && isLogged && currentPath !== '/logon') { // Usuario logado
			sessionStorage.setItem('current-path', currentPath);
		}
	}, [dataReady, isLogged, currentPath]);

	useEffect(() => {
		let isMounted = true;

		if (targetCheckPass) {
			setDataReady(true);
		} else {
			setDataReady(false);
			setNotify(null);

			axios
			.get(
				`${getUrl}/islogged`,
				{
					params: {
						result_type: 1
					}
				}
			)
			.then(
				res => {
					if (isMounted) {
						const resDataLen = Object.keys(res.data).length;

						if (resDataLen !== Object.keys(getUserData).length) {
							setUserData((resDataLen ? JSON.stringify(res.data) : null));
						}
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
	}, [getUrl, getUserData, setUserData, targetCheckPass, currentKey]);

	const Component = (
		<div id="controller">
			{
				(
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
				)
			}
		</div>
	);

	return (
		<Fragment>
			<Loading loading={ !dataReady } />
			<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } />
			{ Component }
		</Fragment>
	);
};

export default Controller;
