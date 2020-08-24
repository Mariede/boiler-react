import React, { Fragment } from 'react';

import { Table } from 'reactstrap';

import Paginator from 'components/_common/Paginator';
import Sorter from 'components/_common/Sorter';

const GridTable = props => {
	const { dataReady, dataContent, url } = props;

	const recordset = (dataContent ? dataContent.recordset : null);
	const pageDetails = (dataContent ? dataContent.pageDetails : null);

	return (
		<Fragment>
			{
				recordset ? (
					<Table hover striped>
						<thead>
							<tr>
								<th>
									#</th>
								<th>
									<Sorter title="nome" sortElement="nome" url={ url } /></th>
								<th>
									<Sorter title="email" sortElement="email" url={ url } /></th>
								<th>
									<Sorter title="tipo" sortElement="tipo.id" url={ url } /></th>
							</tr>
						</thead>
						<tbody>
							{
								(Array.isArray(recordset) && recordset.length) ? (
									recordset.map(
										usuario => (
											<tr key={ usuario.idUsuario }>
												<td>
													{ usuario.idUsuario }</td>
												<td>
													{ usuario.nome }</td>
												<td>
													{ usuario.email }</td>
												<td>
													{ usuario.tipo.id }</td>
											</tr>
										)
									)
								) : (
									<tr>
										<td className="not-found" colSpan="4">
											Dados não encontrados...</td>
									</tr>
								)
							}
						</tbody>
						<tfoot>
							<tr>
								<td colSpan="4">
									<Paginator pageDetails={ pageDetails } url={ url } key={ dataReady } /></td>
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
