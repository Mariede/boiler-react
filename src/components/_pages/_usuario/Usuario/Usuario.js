import React, { Fragment, useState } from 'react';

import { Button } from 'reactstrap';

import MainContent from 'components/_common/MainContent';
import Searcher from 'components/_common/Searcher';
import GridTable from 'components/_common/GridTable';
import DataGet from 'components/_common/DataGet';
import DataChange from 'components/_common/DataChange';
import ModalWindow from 'components/_common/ModalWindow'; // Saiba mais

import ModalForm from './ModalForm';

import './Usuario.css';

const Usuario = props => {
	const { match, location, history } = props;

	const [dataGet, setDataGet] = useState(
		{
			ready: false,
			content: null
		}
	);

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
				dataGet.content.recordset.filter(
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
				dataGet.content.recordset.filter(
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
			<DataGet
				currentKey={ currentKey }
				param={ paramId }
				params={
					{
						page: (urlParams.get('page') || 1),
						items_per_page: urlParams.get('items_per_page'),
						sort_fields: urlParams.get('sort_fields'),
						fullsearch_fields: urlParams.get('fullsearch_fields'),
						fullsearch_value: urlParams.get('fullsearch_value')
					}
				}
				setDataGet={ setDataGet }
				baseRoute="/usuario"
				cbCatch={
					{
						header: 'Usuário'
					}
				}
			/>

			<DataChange { ...dataChange } setDataChange={ setDataChange } baseRoute="/usuario" cbCatch={ { header: 'Usuário' } } url={ currentPath + currentSearch }>
				{ ModalForm }
			</DataChange>

			<MainContent subject={ !paramId ? 'Usuários' : 'Usuário' } icon="fas fa-user">
				<div id="usuario">

					<div className="top-group">
						<span className="info">{ !paramId ? 'Detalhes dos usuários' : 'Detalhes do usuário' }</span>
						<Button type="button" size="sm" color="success" onClick={ pageActions.insert }>
							<i className="fas fa-plus"></i> novo usuário
						</Button>
					</div>

					{
						!paramId ? (
							<Searcher dataReady={ dataGet.ready } searchFields={ ['idUsuario', 'nome', 'email', 'tipo', 'perfil'] } history={ history } url={ { currentPath, currentSearch } } />
						) : (
							null
						)
					}

					<GridTable dataContent={ dataGet.content } history={ history } url={ { currentPath, currentSearch } } rowId="idUsuario"
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
													<i className="fas fa-trash"></i> excluir
												</Fragment>,
											buttonWidth: 100,
											buttonColor: 'danger',
											buttonConfirm: 'Realmente exclui o usuário?'
										},
										{
											gridCallback: pageActions.activation,
											buttonText: [
												'ativo',
												<Fragment key="1">
													<i className="fas fa-ban"></i> inativar
												</Fragment>,
												<Fragment key="2">
													<i className="fas fa-check"></i> ativar
												</Fragment>
											],
											buttonWidth: 100,
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
													<i className="fas fa-newspaper"></i> saiba mais
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
