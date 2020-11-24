import { Fragment, useState, useLayoutEffect, useContext } from 'react';

import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';

import ContextConfig from 'components/_context/ContextConfig';

import errWrapper from 'helpers/errWrapper';

/*
	-> Acesso REST a dados (Create / Update)
		* Utilizar apenas com os metodos POST / PUT / PATCH / DELETE

		PROPS:
			{
				method		=> POST / PUT / PATCH / DELETE
				route		=> caminho da rota, com /
				submit		=> controle da pagina pai
				cbSubmit	=> funcao de callback em Finally, controle da pagina pai
				data		=> dados do metodo (opcional) <-> objeto ou string
				headers		=> configuracoes extras da rota: headers personalizados (opcional) <-> objeto
				cbThen		=> funcao de callback em Then (opcional)
				cbCatch		=> configuracoes extras para Notify (opcional) <-> objeto
				message		=> configuracoes extras para componente Loading (opcional)
			}
*/
const useDataChange = props => {
	const { method, route, submit, cbSubmit, data, headers, cbThen, cbCatch, message } = props;

	const getUrl = useContext(ContextConfig).baseUrl;

	const [goDataAction, setGoDataAction] = useState(false);
	const [notify, setNotify] = useState(null);

	const changeExecute = () => {
		let isMounted = true;

		if (submit) {
			setNotify(null);

			const mountDataObject = _data => {
				if (_data) {
					const hasFile = Object.entries(_data).some(
						entry => entry[1] instanceof FileList && entry[1].length !== 0
					);

					if (hasFile) {
						const formData = new FormData();

						Object.entries(_data).forEach(
							([key, value]) => {
								if (value instanceof FileList && value.length !== 0) {
									Array.from(value).forEach(
										file => {
											formData.append(
												key,
												file
											);
										}
									);
								} else {
									formData.append(
										key,
										JSON.stringify(value)
									);
								}
							}
						);

						return formData;
					}
				}

				return { ..._data };
			};

			const finalData = (
				typeof data === 'string' ? (
					data
				) : (
					mountDataObject(data)
				)
			);

			axios(
				{
					method: method,
					url: getUrl + route,
					data: finalData,
					headers: { ...headers }
				}
			)
			.then(
				res => {
					if (isMounted) {
						setGoDataAction(true);

						if (cbThen) {
							cbThen(res, setNotify);
						}
					}
				}
			)
			.catch(
				err => {
					if (isMounted) {
						setNotify(
							{
								info: (err.response || err),
								...cbCatch
							}
						);
					}

					errWrapper('custom-hook: POST/PUT/PATCH/DELETE', err);
				}
			)
			.finally(
				() => {
					if (isMounted) {
						cbSubmit();
						setGoDataAction(false);
					}
				}
			);
		}

		return () => {
			isMounted = false;
		};
	};

	useLayoutEffect(
		changeExecute,
		[getUrl, method, route, submit] // eslint-disable-line react-hooks/exhaustive-deps
	);

	const Component = (
		<Fragment>
			<Loading loading={ submit } message={ message } />
			<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } form={ notify && notify.form } />
		</Fragment>
	);

	return {
		Component,
		goDataAction
	};
};

export default useDataChange;
