import React, { Fragment, useState } from 'react';

import { Button } from 'reactstrap';

import MainContent from 'components/_common/MainContent';
import GridTable from 'components/_common/GridTable';
import DataChange from 'components/_common/DataChange';

import ModalData from './ModalData';

import useDataGet from 'components/_custom-hooks/useDataGet';

import './Usuario.css';

const Usuario = props => {
	const { match, location } = props;

	const [dataChange, setDataChange] = useState(undefined);

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

	const getRowId = (e, target) => {
		const rowId = target ? (
			document.getElementById(target.id).closest('tr').id
		) : (
			e.currentTarget.closest('tr').id
		);

		return !isNaN(rowId) ? (
			parseInt(rowId, 10)
		) : (
			null
		);
	};

	const pageActions = {
		insert: e => {
			e.preventDefault();

			setDataChange(
				{
					submit: false,
					method: 'post'
				}
			);
		},
		update: (e, target) => {
			e.preventDefault();

			const rowId = getRowId(e, target);

			const rowData = (
				dataContent.recordset.filter(
					record => record.idUsuario === rowId
				)
			);

			setDataChange(
				{
					submit: false,
					method: 'put',
					param: rowId,
					data: (Array.isArray(rowData) && { ...rowData.pop() }) || {}
				}
			);
		},
		delete: (e, target) => {
			e.preventDefault();

			const rowId = getRowId(e, target);

			setDataChange(
				{
					submit: true,
					method: 'delete',
					param: rowId
				}
			);
		},
		activation: (e, target) => {
			e.preventDefault();

			const rowId = getRowId(e, target);

			const rowData = (
				dataContent.recordset.filter(
					record => record.idUsuario === rowId
				)
			);

			setDataChange(
				{
					submit: true,
					method: 'put',
					extraRoute: '/ativacao',
					param: rowId,
					data: {
						ativo: Array.isArray(rowData) && rowData.pop().ativo
					}
				}
			);
		},
		more: (e, target) => {
			e.preventDefault();

			const rowId = getRowId(e, target);

			setDataChange(
				{
					submit: false,
					method: 'put',
					param: rowId
				}
			);
		}
	};

	return (
		<Fragment>
			{ Component }

			<DataChange { ...dataChange } setDataChange={ setDataChange } baseRoute="/usuario" catchHeader="Usuario" url={ { currentPath, currentSearch } }>
				{ ModalData }
			</DataChange>

			<MainContent subject={ `Usuario${!paramId ? ' (todos)' : ''}` } icon="fas fa-user">
				<div id="usuario">

					<div className="top-group">
						<span className="info">Detalhes</span>
						<Button type="button" size="sm" color="success" onClick={ pageActions.insert }>
							<i className="fa fa-plus"></i> novo usuário
						</Button>
					</div>

					<GridTable dataReady={ dataReady } dataContent={ dataContent } url={ { currentPath, currentSearch } } rowId="idUsuario"
						columns={
							[
								{ title: '#', jsonElement: 'idUsuario' },
								{ title: 'nome', jsonElement: 'nome', isSorted: true, gridCallback: pageActions.update },
								{ title: 'email', jsonElement: 'email', isSorted: true },
								{ title: 'tipo', jsonElement: 'tipo.nome', isSorted: true, tdLayout: { center: true } },
								{ title: 'perfis', jsonElement: 'perfis.perfil.nome', isSorted: true, tdLayout: { center: true, badges: 'info' } },
								{
									buttons: [
										{
											gridCallback: pageActions.delete,
											buttonText:
												<Fragment>
													<i className="fa fa-trash"></i> excluir
												</Fragment>,
											buttonColor: 'danger',
											buttonConfirm: 'Realmente exclui o usuário?'
										},
										{
											gridCallback: pageActions.activation,
											buttonText: [
												'ativo',
												<Fragment key="1">
													<i className="fa fa-ban"></i> inativar
												</Fragment>,
												<Fragment key="2">
													<i className="fa fa-check"></i> ativar
												</Fragment>
											],
											buttonColor: ['ativo', 'info', 'success'],
											buttonConfirm: 'Realmente modifica o usuário?'
										}
									]
								},
								{
									buttons: [
										{
											gridCallback: pageActions.more,
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
