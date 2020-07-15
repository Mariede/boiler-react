import React, { Fragment, useState, useEffect, useContext } from 'react';

import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';

import ContextConfig from 'components/_context/ContextConfig';

/*
	-> Acesso REST a dados (Read)
		* Utilizar apenas com o metodo GET

		PROPS:
			{
				route		=> caminho da rota, com /
				dataReady	=> controle da pagina pai
				cbDataReady	=> funcao de callback, controle da pagina pai
				checkPass	=> indica se o GET na chamada deve ser executado ou nao (opcional - default sempre executa)
				currentKey	=> renova a cada leitura da pagina
				params		=> parametros do GET (opcional) <-> objeto
				config		=> configuracoes extras da rota (opcional) <-> objeto
				cbThen		=> funcao de callback em Then - get de dados
				cbCatch		=> configuracoes extras para Notify (opcional) <-> objeto
				message		=> configuracoes extras para componente Loading (opcional)
			}
*/
const useDataGet = props => {
	const [notify, setNotify] = useState(null);

	const getUrl = useContext(ContextConfig).baseUrl;

	const { route, dataReady, cbDataReady, checkPass, currentKey, params, config, cbThen, cbCatch, message } = props;

	const getExecute = () => {
		let isMounted = true;

		if (checkPass) {
			cbDataReady(true);
		} else {
			cbDataReady(false);
			setNotify(null);

			axios
			.get(
				getUrl + route,
				{ ...(typeof params === 'object' ? { params: { ...params } } : {}), ...config }
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
						cbDataReady(true);
					}
				}
			);
		}

		return () => {
			isMounted = false;
		};
	};

	useEffect(
		getExecute,
		[getUrl, route, checkPass, currentKey]
	);

	return (
		<Fragment>
			<Loading loading={ !dataReady } message={ message } />
			<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } form={ notify && notify.form } />
		</Fragment>
	);
};

export default useDataGet;
