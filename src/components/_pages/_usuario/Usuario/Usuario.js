import React, { Fragment } from 'react';

import MainContent from 'components/_common/MainContent';
import GridTable from 'components/_common/GridTable';

import useDataGet from 'components/_custom-hooks/useDataGet';

const Usuario = props => {
	const { match, location } = props;

	const paramId = match.params.id;
	const currentKey = location.key;
	const currentPath = location.pathname;
	const currentSearch = location.search;
	const urlParams = new URLSearchParams(currentSearch);

	const { Component, dataReady, dataContent } = useDataGet(
		{
			route: `/usuario${paramId ? `/${paramId}` : ''}`,
			currentKey: currentKey,
			params: {
				page: (urlParams.get('page') || 1),
				items_per_page: urlParams.get('items_per_page'),
				sort_fields: urlParams.get('sort_fields')
			},
			cbCatch: {
				header: 'Usuario',
				type: 4
			}
		}
	);

	return (
		<Fragment>
			{ Component }
			<MainContent subject={ `Usuario${!paramId ? ' (todos)' : ''}` } icon="fas fa-user">
				<div id="usuario">
					Dados dos usuários
					<GridTable dataReady={ dataReady } dataContent={ dataContent } url={ { currentPath, currentSearch } }
						columns={
							[
								['#', 'idUsuario', false],
								['nome', 'nome', true],
								['email', 'email', true],
								['tipo', 'tipo.nome', true]
							]
						}
					/>
				</div>
			</MainContent>
		</Fragment>
	);
};

export default Usuario;
