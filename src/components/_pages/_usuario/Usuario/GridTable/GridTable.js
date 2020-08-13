import React, { Fragment } from 'react';

import { Table } from 'reactstrap';

const GridTable = props => {
	const { dataReady, dataContent } = props;

	return (
		<Fragment>
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
		</Fragment>
	);
};

export default GridTable;
