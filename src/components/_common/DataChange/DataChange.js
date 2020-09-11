import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import useDataChange from 'components/_custom-hooks/useDataChange';

/*
	PROPS:
		- submit		: OBRIGATORIO, se true executa acao de transformacao nos dados (POST/PUT/PATCH/DELETE)
			-> se false abre tela de apoio para insert/update (geralmente Modal)

		- method		: OBRIGATORIO, verbo utilizado pelo AXIOS

		- extraRoute	: rota extra apos baseRoute, se existir

		- param			: parametro de rota (ID), se existir

		- data			: dados do corpo da requisicao, se existirem

		- setDataChange	: OBRIGATORIO, funcao de estado em parent que controla as propriedades do componente

		- baseRoute		: OBRIGATORIO, rota base utilizada pelo AXIOS

		- catchHeader	: Header do Notify, na exibicao de erros

		- url			: OBRIGATORIO, url atual (com querystring) para redirects

		- children		: apenas para o caso de submit === false
			-> contem o componente com a tela de apoio para insert/update (geralmente Modal)
*/
const DataChange = props => {
	const { submit, method, extraRoute, param, data, setDataChange, baseRoute, catchHeader, url, children } = props;

	const ChildContent = children;

	const { Component, goDataAction } = useDataChange(
		{
			method: method,
			route: `${baseRoute + (param ? `/${param}` : '') + (extraRoute ? `${extraRoute}` : '')}`,
			submit: submit,
			cbSubmit: () => {
				setDataChange(undefined);
			},
			data: data,
			cbCatch: {
				header: (catchHeader || 'Dados'),
				type: 4
			}
		}
	);

	useEffect(
		() => {
			if (submit === false && !ChildContent) {
				setDataChange(undefined);
			}
		},
		[submit, ChildContent, setDataChange]
	);

	return (
		<Fragment>
			{ Component }
			{
				goDataAction ? (
					<Redirect to={ `${url.currentPath + url.currentSearch}` } />
				) : (
					submit === false ? (
						ChildContent ? (
							<ChildContent param={ param } data={ data } setDataChange={ setDataChange } />
						) : (
							null
						)
					) : (
						null
					)
				)
			}
		</Fragment>
	);
};

export default DataChange;
