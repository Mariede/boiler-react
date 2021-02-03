import { Fragment, useRef, useState, useEffect, useContext } from 'react';

import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';

import ContextConfig from 'components/_context/ContextConfig';

import errWrapper from 'helpers/errWrapper';

/*
	-> Acesso REST a dados (Read)
		* Utilizar apenas com o metodo GET

		PROPS:
			{
				route				=> caminho da rota, com /
				goReady				=> indica se o GET na chamada deve ser executado ou nao (opcional - default SEMPRE executa)
				currentKey			=> renova a cada leitura da pagina
				params				=> parametros do GET (opcional) <-> objeto
				config				=> configuracoes extras da rota (opcional) <-> objeto
				cbThen				=> funcao de callback em Then (opcional)
				cbCatch				=> configuracoes extras para Notify (opcional) <-> objeto
				dataResetOnCatch	=> se true reinicia o valor de content caso haja erro na requisicao (opcional) <-> boolean
				message				=> configuracoes extras para componente Loading (opcional)
			}
*/
const useDataGet = props => {
	const { route, goReady, currentKey, params, config, cbThen, cbCatch, dataResetOnCatch, message } = props;

	const getUrl = useContext(ContextConfig).baseUrl;

	const [dataReady, setDataReady] = useState(false);
	const [notify, setNotify] = useState(null);

	const dataContent = useRef(null);

	const getExecute = () => {
		let isMounted = true;

		if (goReady) {
			setDataReady(true);
		} else {
			setDataReady(false);
			setNotify(null);

			axios
			.get(
				getUrl + route,
				{ ...(typeof params === 'object' ? { params: { ...params } } : {}), ...config }
			)
			.then(
				res => {
					if (isMounted) {
						dataContent.current = res.data;

						if (cbThen) {
							cbThen(res, setNotify);
						}
					}
				}
			)
			.catch(
				err => {
					if (isMounted) {
						if (dataResetOnCatch === true) {
							dataContent.current = null;
						}

						setNotify(
							{
								info: (err.response || err),
								...cbCatch
							}
						);
					}

					errWrapper('custom-hook: GET', err);
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
	};

	useEffect(
		getExecute,
		[getUrl, route, goReady, currentKey] // eslint-disable-line react-hooks/exhaustive-deps
	);

	const Component = (
		<Fragment>
			<Loading loading={ !dataReady } message={ message } />
			<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } form={ notify && notify.form } />
		</Fragment>
	);

	return {
		Component: Component,
		dataReady: dataReady,
		dataContent: dataContent.current
	};
};

export default useDataGet;
