import React, { Fragment, useState } from 'react';

import { Button } from 'reactstrap';

import MainContent from 'components/_common/MainContent';
import GridTable from 'components/_common/GridTable';
import DataChange from 'components/_common/DataChange';
import ModalWindow from 'components/_common/ModalWindow'; // Saiba mais

import ModalForm from './ModalForm';

import useDataGet from 'components/_custom-hooks/useDataGet';

import './Usuario.css';

const Usuario = props => {
	const { match, location } = props;

	const [dataChange, setDataChange] = useState(undefined);

	// Saiba mais -------------------
	const knowMoreInitialValue = {
		visible: false,
		message: ''
	};

	const [knowMore, setKnowMore] = useState(knowMoreInitialValue);
	// ------------------------------

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
					method: 'post',
					formId: 'usuario-form'
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
					data: (Array.isArray(rowData) && { ...rowData.pop() }) || {},
					formId: 'usuario-form'
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
		knowMore: (e, target) => {
			e.preventDefault();

			const rowId = getRowId(e, target);

			setKnowMore(
				{
					visible: true,
					message: `Aqui mais detalhes sobre o ID ${rowId}`
				}
			);
		}
	};

	return (
		<Fragment>
			{ Component }

			<DataChange { ...dataChange } setDataChange={ setDataChange } baseRoute="/usuario" catchHeader="Usuario" url={ { currentPath, currentSearch } }>
				{ ModalForm }
			</DataChange>

			<MainContent subject={ !paramId ? 'Usuários' : 'Usuário' } icon="fas fa-user">
				<div id="usuario">

					<div className="top-group">
						<span className="info">{ !paramId ? 'Detalhes dos usuários' : 'Detalhes do usuário' }</span>
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
								{ title: 'perfis', jsonElement: 'perfis.nome', isSorted: true, tdLayout: { center: true, badges: 'info' } },
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
											gridCallback: pageActions.knowMore,
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

			<ModalWindow modalTitle="Saiba Mais" modalMessage={ knowMore.message } modalCallback={ () => setKnowMore(knowMoreInitialValue) } modalShow={ knowMore.visible } modalCentered key={ knowMore.visible } />
		</Fragment>
	);
};

export default Usuario;
