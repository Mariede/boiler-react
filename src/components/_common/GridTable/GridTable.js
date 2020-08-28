import React, { Fragment } from 'react';

import { Table } from 'reactstrap';

import Paginator from 'components/_common/Paginator';
import Sorter from 'components/_common/Sorter';

import './GridTable.css';

/*
	Componentes acoplados:
		-> Paginator
		-> Sorter

	PROPS:
		- dataReady		: OBRIGATORIO, Indica quando os dados estao prontos
		- dataContent	: OBRIGATORIO, Json de retorno com o conteudo das informacoes a serem exibidas
		- url			: OBRIGATORIO, controle da URL e links de paginacao (currentPath e currentSearch)
			-> usado pelos componentes acoplados (Paginator e Sorter)
		- columns		: OBRIGATORIO, especifica quais os itens das colunas a serem exibidos
			-> array de array de elementos com [titulo, elementoJson, isSorted]
			-> elementoJson indica a propriedade Json a ser exibida (formato string), e pode ser aninhado por ponto
		- classes		: especifica classes adicionais para tabela reacstrap, sobrescrevendo o default (hover, striped)
			-> em formato de objeto exemplo: classes={ { dark: true } }, passar objeto vazio para nenhuma
*/
const GridTable = props => {
	const { dataReady, dataContent, url, columns, classes } = props;

	const recordset = (dataContent ? dataContent.recordset : null);
	const pageDetails = (dataContent ? dataContent.pageDetails : null);
	const extraClasses = (classes ? classes : { hover: true, striped: true });

	return (
		<Fragment>
			{
				recordset ? (
					<Table className="grid-table" { ...extraClasses } key={ dataReady }>
						<thead>
							<tr>
								{
									columns.map(
										(column, index) => {
											const headerElement = column[0];
											const jsonElement = column[1];
											const isSorted = column[2] === true;

											return (
												<th key={ index }>
													{
														isSorted ? (
															<Sorter title={ headerElement } sortElement={ jsonElement } url={ url } />
														) : (
															headerElement
														)
													}
												</th>
											);
										}
									)
								}
							</tr>
						</thead>
						<tbody>
							{
								(Array.isArray(recordset) && recordset.length) ? (
									recordset.map(
										(record, index) => (
											<tr key={ index }>
												{
													columns.map(
														(column, index) => {
															const jsonElement = column[1];
															const data = String(jsonElement.split('.').reduce((o, i) => o[i], record) || '');

															return (
																<td key={ index }>
																	{ data }</td>
															);
														}
													)
												}
											</tr>
										)
									)
								) : (
									<tr>
										<td className="not-found" colSpan={ columns.length }>
											Dados não encontrados...</td>
									</tr>
								)
							}
						</tbody>
						<tfoot>
							<tr>
								<td colSpan={ columns.length }>
									{
										pageDetails ? (
											<Paginator pageDetails={ pageDetails } url={ url } />
										) : (
											<Fragment>
												{
													recordset.length ? (
														recordset.length === 1 ? (
															<Fragment>
																Exibindo <strong>{ recordset.length }</strong> registro
															</Fragment>
														) : (
															<Fragment>
																Exibindo <strong>{ recordset.length }</strong> registros
															</Fragment>
														)
													) : (
														null
													)
												}
											</Fragment>
										)
									}
								</td>
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
