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

	const gridTable = {
		get: e => {
			e.preventDefault();

			const rowId = e.currentTarget.closest('tr').id;
			console.log(`GET data: ${rowId}`);
		},
		delete: e => {
			e.preventDefault();

			const rowId = e.currentTarget.closest('tr').id;
			console.log(`DELETE data: ${rowId}`);
		},
		export: e => {
			e.preventDefault();

			const rowId = e.currentTarget.closest('tr').id;
			console.log(`EXPORT data: ${rowId}`);
		},
		more: e => {
			e.preventDefault();

			const rowId = e.currentTarget.closest('tr').id;
			console.log(`MORE data: ${rowId}`);
		}
	};

	return (
		<Fragment>
			{ Component }
			<MainContent subject={ `Usuario${!paramId ? ' (todos)' : ''}` } icon="fas fa-user">
				<div id="usuario">
					Dados dos usuários
					<GridTable dataReady={ dataReady } dataContent={ dataContent } url={ { currentPath, currentSearch } } rowId="idUsuario"
						columns={
							[
								{ title: '#', jsonElement: 'idUsuario', isSorted: false },
								{ title: 'nome', jsonElement: 'nome', isSorted: true, gridCallback: gridTable.get },
								{ title: 'email', jsonElement: 'email', isSorted: true },
								{ title: 'tipo', jsonElement: 'tipo.nome', isSorted: true },
								{
									buttons: [
										{ gridCallback: gridTable.delete, buttonText: <i className="fa fa-trash"> excluir</i>, buttonColor: 'danger' },
										{ gridCallback: gridTable.export, buttonText: <i className="fa fa-file-export"> exportar</i>, buttonColor: 'primary' }
									]
								},
								{
									buttons: [
										{ gridCallback: gridTable.more, buttonText: <i className="fa fa-newspaper"> saiba mais</i> }
									]
								}
							]
						}
					/>
				</div>
			</MainContent>
		</Fragment>
	);
};

export default Usuario;
