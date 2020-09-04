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

			const rowData = dataContent.recordset.filter(
				record => record.idUsuario === parseInt(rowId, 10)
			);

			console.log(`GET data: ${JSON.stringify(rowData)}`);
		},
		delete: e => {
			e.preventDefault();

			const rowId = e.currentTarget.closest('tr').id;
			console.log(`DELETE data: ${rowId}`);
		},
		activation: e => {
			e.preventDefault();

			const rowId = e.currentTarget.closest('tr').id;
			console.log(`ACTIVATION data: ${rowId}`);
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
										{
											gridCallback: gridTable.delete,
											buttonText:
												<Fragment>
													<i className="fa fa-trash"></i> excluir
												</Fragment>,
											buttonColor: 'danger'
										},
										{
											gridCallback: gridTable.activation,
											buttonText: [
												'ativo',
												<Fragment key="1">
													<i className="fa fa-ban"></i> inativar
												</Fragment>,
												<Fragment key="2">
													<i className="fa fa-check"></i> ativar
												</Fragment>
											],
											buttonColor: ['ativo', 'info', 'success']
										}
									]
								},
								{
									buttons: [
										{
											gridCallback: gridTable.more,
											buttonText:
												<Fragment>
													<i className="fa fa-newspaper"></i> saiba mais
												</Fragment>
										}
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
