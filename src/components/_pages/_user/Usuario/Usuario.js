import { Fragment, useState } from 'react';

import { Button } from 'reactstrap';

import MainContent from 'components/_common/MainContent';
import Searcher from 'components/_common/Searcher';
import GridTable from 'components/_common/GridTable';
import DataGet from 'components/_common/DataGet';
import DataChange from 'components/_common/DataChange';
import ModalWindow from 'components/_common/ModalWindow'; // Saiba mais

import useCheckPermissions from 'components/_custom-hooks/useCheckPermissions';
import CheckPermissions from 'components/_common/CheckPermissions';
import appPermissions from 'helpers/appPermissions';

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

	const [dataGetOptions, setDataGetOptions] = useState(
		{
			ready: false,
			content: null
		}
	);

	const [dataChange, setDataChange] = useState(undefined);

	const pGridTableAllowedCallbacks = useCheckPermissions(
		{
			allowedPermissions: [
				appPermissions.edtUsuarios
			]
		}
	);

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

	const pageActions = {
		getRowId: (e, target) => {
			const rowId = target ? (
				document.getElementById(target.id).closest('tr').id
			) : (
				e.currentTarget.closest('tr').id
			);

			const parsedRowId = parseInt(rowId, 10);

			return Number.isInteger(parsedRowId) ? (
				parsedRowId
			) : (
				null
			);
		},
		insert: e => {
			e.preventDefault();

			const rowOptions = {
				options: dataGetOptions.content
			};

			setDataChange(
				{
					submit: false,
					method: 'post',
					data: rowOptions,
					cbThen: (res, setNotify) => {
						// Verifica por erros no envio do e-mail
						if (res.data && res.data.mailSent) {
							const errorFound = res.data.mailSent.error;

							if (errorFound) {
								const showError = (
									typeof errorFound === 'object' ? (
										`${String(errorFound.responseCode || '')}${(errorFound.code ? ` - ${String(errorFound.code)}` : '')}${(errorFound.command ? ` - ${String(errorFound.command)}` : '')}`
									) : (
										String(errorFound || '')
									)
								);

								setNotify(
									{
										info: `Usuário criado com sucesso, porém o envio do e-mail retornou o erro: ${showError}`,
										header: 'Novo usuário',
										type: 3
									}
								);
							}
						}
					},
					formId: 'usuario-form'
				}
			);
		},
		update: (e, target) => {
			e.preventDefault();

			const rowId = pageActions.getRowId(e, target);

			const rowData = (
				dataGet.content.recordset.filter(
					record => record.idUsuario === rowId
				)
			);

			const rowOptions = {
				options: dataGetOptions.content
			};

			setDataChange(
				{
					submit: false,
					method: 'put',
					param: rowId,
					data: { ...((Array.isArray(rowData) && { ...rowData.pop() }) || {}), ...rowOptions },
					formId: 'usuario-form'
				}
			);
		},
		delete: (e, target) => {
			e.preventDefault();

			const rowId = pageActions.getRowId(e, target);

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

			const rowId = pageActions.getRowId(e, target);

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

			const rowId = pageActions.getRowId(e, target);

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
						/* eslint-disable camelcase */
						page: (urlParams.get('page') || 1),
						items_per_page: urlParams.get('items_per_page'),
						sort_fields: urlParams.get('sort_fields'),
						fullsearch_fields: urlParams.get('fullsearch_fields'),
						fullsearch_value: urlParams.get('fullsearch_value')
						/* eslint-enable camelcase */
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

			<DataGet
				currentKey={ currentKey }
				setDataGet={ setDataGetOptions }
				baseRoute="/usuario/options"
				cbCatch={
					{
						header: 'Opções'
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

						<CheckPermissions allowedPermissions={ [appPermissions.edtUsuarios] }>
							<Button type="button" size="sm" color="success" onClick={ pageActions.insert }>
								<i className="fas fa-plus"></i> novo usuário
							</Button>

							<Button type="button" size="sm" color="success" disabled={ true }>
								<i className="fas fa-plus"></i> novo usuário
							</Button>
						</CheckPermissions>
					</div>

					{
						!paramId && (
							<Searcher dataReady={ dataGet.ready } searchFields={ ['idUsuario', 'nome', 'email', 'empresa', 'perfil'] } history={ history } url={ { currentPath, currentSearch } } urlParamsToRemove={ ['page'] } />
						)
					}

					<GridTable dataReady={ dataGet.ready } dataContent={ dataGet.content } history={ history } url={ { currentPath, currentSearch } } rowId="idUsuario"
						columns={
							[
								{ title: '#', jsonElement: 'idUsuario', isSorted: true },
								{ title: 'nome', jsonElement: 'nome', isSorted: true, gridCallback: pageActions.update, blockCallbacks: !pGridTableAllowedCallbacks },
								{ title: 'e-mail', jsonElement: 'email', isSorted: true },
								{ title: 'empresa', jsonElement: 'empresa.nome', isSorted: true, tdLayout: { center: true } },
								{ title: 'criado em', jsonElement: 'dataCriacao', isSorted: true, tdLayout: { right: true, nowrap: true } },
								{ title: 'perfis', jsonElement: 'perfis.nome', tdLayout: { center: true, badges: 'info' } },
								{
									blockCallbacks: !pGridTableAllowedCallbacks,
									buttons: [
										{
											gridCallback: pageActions.delete,
											buttonText:
												<Fragment>
													<i className="fas fa-trash"></i> excluir
												</Fragment>,
											buttonWidth: 100,
											buttonColor: 'danger',
											buttonConfirm: 'Realmente exclui o usuário? O e-mail relacionado ficará impossibilitado de ser cadastrado novamente.'
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
									tdLayout: { nowrap: true },
									buttons: [
										{
											gridCallback: pageActions.knowMore,
											buttonText: (
												<Fragment>
													<i className="fas fa-newspaper"></i> saiba mais
												</Fragment>
											)
										}
									]
								}
							]
						}
					/>

					{
						!paramId && (
							<div className="search-info">
								<i className="fas fa-info-circle"></i> Pesquisa <strong>parcial</strong> ou <strong>completa</strong> por<br />
								<ul>
									<li>ID DO USUÁRIO</li>
									<li>NOME</li>
									<li>E-MAIL</li>
								</ul>
								<ul>
									<li>EMPRESA</li>
									<li>PERFIL</li>
								</ul>
							</div>
						)
					}
				</div>
			</MainContent>

			<ModalWindow modalTitle="Saiba Mais" modalMessage={ knowMore.message } modalCallback={ () => setKnowMore(knowMoreInitialValue) } modalShow={ knowMore.visible } modalCentered key={ knowMore.visible } />
		</Fragment>
	);
};

export default Usuario;
