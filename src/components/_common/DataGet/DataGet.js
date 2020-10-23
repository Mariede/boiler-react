import { Fragment, useEffect } from 'react';

import useDataGet from 'components/_custom-hooks/useDataGet';

/*
	PROPS:
		- goReady		: OPCIONAL, indica se o GET na chamada deve ser executado ou nao (default SEMPRE executa)

		- currentKey	: OPCIONAL, renova a cada leitura da pagina

		- extraRoute	: rota extra apos baseRoute, se existir

		- param			: parametro de rota (ID), se existir

		- params		: parametros do GET, se existirem (objeto)

		- config		: configuracoes extras da rota, se existirem (cancelToken, headers, ...)

		- cbThen		: funcao que executa no then da acao - caso sucesso, apenas se existir

		- message		: OPCIONAL, mensagem do componente de loading

		- setDataGet	: OBRIGATORIO, funcao de estado em parent que controla as propriedades do componente

		- baseRoute		: OBRIGATORIO, rota base utilizada pelo AXIOS
			-> sempre get

		- cbCatch		: OPCIONAL, objeto com header, type e/ou form do Notify para exibicao de erros
*/
const DataGet = props => {
	const { goReady, currentKey, extraRoute, param, params, config, cbThen, message, setDataGet, baseRoute, cbCatch } = props;

	const { Component, dataReady, dataContent } = useDataGet(
		{
			route: `${baseRoute + (param ? `/${param}` : '') + (extraRoute ? `${extraRoute}` : '')}`,
			goReady: goReady,
			currentKey: currentKey,
			params: { ...params },
			config: { ...config },
			cbThen: cbThen,
			cbCatch: {
				header: (cbCatch.header || 'Dados'),
				type: (cbCatch.type || 4),
				form: cbCatch.form
			},
			message: message
		}
	);

	useEffect(
		() => {
			setDataGet(
				{
					ready: dataReady,
					content: dataContent
				}
			);
		},
		[setDataGet, dataReady, dataContent]
	);

	useEffect(
		() => (
			() => {
				setDataGet(
					{
						ready: false,
						content: null
					}
				);
			}
		),
		[setDataGet]
	);

	return (
		<Fragment>
			{ Component }
		</Fragment>
	);
};

export default DataGet;
