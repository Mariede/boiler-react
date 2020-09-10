import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import useDataChange from 'components/_custom-hooks/useDataChange';

const DataChange = props => {
	const { submit, method, extraRoute, param, data, setDataChange, baseRoute, catchHeader, url } = props;

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
				header: catchHeader,
				type: 4
			}
		}
	);

	return (
		<Fragment>
			{ Component }
			{
				goDataAction ? (
					<Redirect to={ `${url.currentPath + url.currentSearch}` } />
				) : (
					null
				)
			}
		</Fragment>
	);
};

export default DataChange;
