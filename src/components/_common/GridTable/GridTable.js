import React, { Fragment } from 'react';

import { Button } from 'reactstrap';
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

		- rowId 		: informa qual coluna define o ID do recordset
			-> se nao especificado, o componente tenta usar record.id ou o primeira chave do objeto record

		- columns		: OBRIGATORIO, especifica quais as colunas a serem exibidas
			-> array de objetos com [title, jsonElement, isSorted, gridCallback, buttonColor]
				-> title informa o cabecalho da coluna. Pode ser vazio

				-> jsonElement informa a propriedade Json a ser exibida (formato string), e pode ser aninhado por ponto
					-> se jsonElement nao encontrado ele repete seu conteudo ao longo da coluna (pode ser um jsx)

				-> isSorted indica se coluna pode ser ordenada. Necessita de um titulo para a coluna

				-> gridCallback e um callback do parent na celula e se baseia no ID da linha em tr (rowId)

				-> buttonColor so faz sentido com gridCallback e define o formato do button
					-> ex. link, danger, success, ... - default e link

		- classes		: especifica classes adicionais para tabela reacstrap, sobrescrevendo o default (hover, striped)
			-> em formato de objeto exemplo: classes={ { dark: true } }, passar objeto vazio para nenhuma
*/
const GridTable = props => {
	const { dataReady, dataContent, url, rowId, columns, classes } = props;

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
											const title = column.title;
											const jsonElement = (column.jsonElement || '');
											const isSorted = column.isSorted === true;

											return (
												<th key={ index }>
													{
														title ? (
															(isSorted && !React.isValidElement(jsonElement)) ? (
																<Sorter title={ title } sortElement={ jsonElement } url={ url } />
															) : (
																title
															)
														) : (
															null
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
										(record, index) => {
											const recordId = record[rowId] || record.id || record[Object.keys(record)[0]];

											return (
												<tr id={ recordId } key={ index }>
													{
														columns.map(
															(column, index) => {
																const title = column.title;
																const jsonElement = (column.jsonElement || '');
																const gridCallback = column.gridCallback;
																const data = (
																	!React.isValidElement(jsonElement) ? (
																		(String(jsonElement.split('.').reduce((o, i) => o[i], record) || '') || jsonElement)
																	) : (
																		jsonElement
																	)
																);

																return (
																	<td key={ index }>
																		{
																			jsonElement ? (
																				gridCallback ? (
																					<Button type="button" size="sm" color={ column.buttonColor || 'link' } block={ title === '' } onClick={ gridCallback }>{ data }</Button>
																				) : (
																					data
																				)
																			) : (
																				null
																			)
																		}
																	</td>
																);
															}
														)
													}
												</tr>
											);
										}
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
