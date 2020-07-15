import React, { Fragment, useState, useEffect, useContext } from 'react';

import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';

import ContextConfig from 'components/_context/ContextConfig';

/*
	-> Acesso REST a dados (Create / Update)
		* Utilizar apenas com os metodos POST / PUT / PATCH

		PROPS:
			{
				method		=> POST / PUT / PATCH
				route		=> caminho da rota, com /
				submit		=> controle da pagina pai
				cbSubmit	=> funcao de callback em Finally, controle da pagina pai
				data		=> dados do metodo (opcional) <-> objeto ou string
				headers		=> configuracoes extras da rota: headers personalizados (opcional) <-> objeto
				cbThen		=> funcao de callback em Then, controle da pagina pai
				cbCatch		=> configuracoes extras para Notify (opcional) <-> objeto
				message		=> configuracoes extras para componente Loading (opcional)
			}
*/
const useDataPostPutPatch = props => {
	const [notify, setNotify] = useState(null);

	const getUrl = useContext(ContextConfig).baseUrl;

	const { method, route, submit, cbSubmit, data, headers, cbThen, cbCatch, message } = props;

	const postExecute = () => {
		let isMounted = true;

		if (submit) {
			setNotify(null);

			axios(
				{
					method: method,
					url: getUrl + route,
					data: (typeof data === 'string' ? data : { ...data }),
					headers: (headers || {})
				}
			)
			.then(
				res => {
					if (isMounted) {
						cbThen(res);
					}
				}
			)
			.catch(
				err => {
					if (isMounted) {
						setNotify({ info: (err.response || err), ...cbCatch });
					}

					throw err;
				}
			)
			.finally(
				() => {
					if (isMounted) {
						cbSubmit();
					}
				}
			);
		}

		return () => {
			isMounted = false;
		};
	};

	useEffect(
		postExecute,
		[getUrl, method, route, submit]
	);

	return (
		<Fragment>
			<Loading loading={ submit } message={ message } />
			<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } form={ notify && notify.form } />
		</Fragment>
	);
};

export default useDataPostPutPatch;
