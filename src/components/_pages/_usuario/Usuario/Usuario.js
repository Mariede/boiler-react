import React, { Fragment } from 'react';

import { Table } from 'reactstrap';

import MainContent from 'components/_common/MainContent';

import useDataGet from 'components/_custom-hooks/useDataGet';

const Usuario = props => {
	const { match, location } = props;

	const paramId = match.params.id;
	const currentKey = location.key;
	const urlParams = new URLSearchParams(location.search);

	const [Component, dataReady, dataContent] = useDataGet(
		{
			route: `/usuario${paramId ? `/${paramId}` : ''}`,
			currentKey: currentKey,
			params: {
				page: (urlParams.get('page') || 1),
				items_per_page: urlParams.get('items_per_page')
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
					{
						(dataReady && dataContent) ? (
							<Table hover striped>
								<thead>
									<tr>
										<th>
											#</th>
										<th>
											NOME</th>
										<th>
											EMAIL</th>
									</tr>
								</thead>
								<tbody>
									{
										(Array.isArray(dataContent.recordset) && dataContent.recordset.length) ? (
											dataContent.recordset.map(
												usuario => (
													<tr key={ usuario.idUsuario }>
														<td>
															{ usuario.idUsuario }</td>
														<td>
															{ usuario.nome }</td>
														<td>
															{ usuario.email }</td>
													</tr>
												)
											)
										) : (
											<tr>
												<td className="not-found" colSpan="3">
													Dados não encontrados...</td>
											</tr>
										)
									}
								</tbody>
								<tfoot>
									<tr>
										<td colSpan="3">
											Table Footer</td>
									</tr>
								</tfoot>
							</Table>
						) : (
							null
						)
					}
				</div>
			</MainContent>
		</Fragment>
	);
};

export default Usuario;
