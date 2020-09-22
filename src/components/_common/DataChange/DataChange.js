import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import DataModal from './DataModal';

import useDataChange from 'components/_custom-hooks/useDataChange';

/*
	DEPENDENCIAS:
		- DataModal

	PROPS:
		- submit		: OBRIGATORIO, se true executa acao de transformacao nos dados (POST/PUT/PATCH/DELETE)
			-> se false abre tela de apoio para insert/update (geralmente Modal)

		- method		: OBRIGATORIO, verbo utilizado pelo AXIOS

		- extraRoute	: rota extra apos baseRoute, se existir

		- param			: parametro de rota (ID), se existir

		- data			: dados do corpo da requisicao, se existirem

		- formId 		: identificador do formulario em children, apenas se existir children (submit === false)

		- cbThen		: funcao que executa no then da acao - caso sucesso, apenas se existir

		- setDataChange	: OBRIGATORIO, funcao de estado em parent que controla as propriedades do componente

		- baseRoute		: OBRIGATORIO, rota base utilizada pelo AXIOS

		- catchHeader	: Header do Notify, na exibicao de erros

		- url			: OBRIGATORIO, url atual (com querystring) para redirects

		- children		: apenas para o caso de submit === false
			-> contem o formulario com a tela de apoio para insert/update (exibido atraves do componente de apoio DataModal)
			-> obrigatorio existir um formId
*/
const DataChange = props => {
	const { submit, method, extraRoute, param, data, formId, cbThen, setDataChange, baseRoute, catchHeader, url, children } = props;

	const ChildContent = children;

	const objDataChange = {
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
	};

	if (cbThen) {
		objDataChange.cbThen = cbThen;
	}

	const { Component, goDataAction } = useDataChange(objDataChange);

	useEffect(
		() => {
			if (submit === false && (!ChildContent || !formId)) {
				setDataChange(undefined);
			}
		},
		[submit, ChildContent, formId, setDataChange]
	);

	return (
		<Fragment>
			{ Component }
			{
				goDataAction ? (
					<Redirect to={ `${url.currentPath + url.currentSearch}` } />
				) : (
					submit === false ? (
						(ChildContent && formId) ? (
							<DataModal param={ param } data={ data } formId={ formId } setDataChange={ setDataChange } ChildContent={ ChildContent } />
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
