import React, { Fragment } from 'react';

import { Button, ButtonGroup } from 'reactstrap';
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
			-> array de objetos com [title, jsonElement, isSorted, gridCallback, buttons]
				-> title informa o cabecalho da coluna. Nao obrigatorio

				-> jsonElement informa a propriedade Json a ser exibida (formato string), e pode ser aninhado por ponto
					-> se jsonElement nao encontrado ele repete seu conteudo ao longo da coluna (pode ser um jsx)

					-> ** jsonElement e buttons sao mutuamente exclusivos - apenas um deles deve existir no objeto

				-> isSorted indica se coluna pode ser ordenada. Necessario um titulo para a coluna (title)

				-> gridCallback e um callback do parent na celula e se baseia no ID da linha em tr (rowId)
					-> gridCallback fora de buttons, serve de callback para jsonElement

				-> buttons informa uma array de um ou mais botoes que serao renderizados na coluna
					-> gridCallback e um callback do parent no botao e se baseia no ID da linha em tr (rowId)

					-> buttonText define o texto do botao (pode ser string ou jsx)

					-> buttonColor define o formato do button - default e link (string)
						-> ex. link, danger, success, ...

					-> ** buttons e jsonElement sao mutuamente exclusivos - apenas um deles deve existir no objeto

					-> buttonText e buttonColor podem tambem ser arrays com validacoes booleanas exclusivas
						-> Obrigatorio 3 itens na array:
							-> array[0]: elemento json de checagem (deve existir no json, pode ser aninhado)
							-> array[1]: exibe se array[0] for true
							-> array[2]: exibe se array[0] for false

		- classes		: especifica classes adicionais para tabela reacstrap, sobrescrevendo o default (hover, striped)
			-> em formato de objeto exemplo: classes={ { dark: true } }, passar objeto vazio para nenhuma
*/
const GridTable = props => {
	const { dataReady, dataContent, url, rowId, columns, classes } = props;

	const recordset = (dataContent ? dataContent.recordset : null);
	const pageDetails = (dataContent ? dataContent.pageDetails : null);
	const extraClasses = (classes ? classes : { hover: true, striped: true });

	const checkButtonStyle = (record, data, showBackup) => {
		let styleResult = showBackup;

		if (typeof data === 'string' || React.isValidElement(data)) {
			styleResult = data;
		} else {
			if (Array.isArray(data)) {
				if (data.length === 3) {
					const checkData = data[0].split('.').reduce((o, i) => o[i], record);

					if (checkData !== undefined) {
						if (checkData) {
							styleResult = data[1];
						} else {
							styleResult = data[2];
						}
					}
				}
			}
		}

		return styleResult;
	};

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
																const jsonElement = (column.jsonElement || '');
																const gridCallback = column.gridCallback;
																const buttons = column.buttons;
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
																					<Button type="button" size="sm" color="link" onClick={ gridCallback }>{ data }</Button>
																				) : (
																					data
																				)
																			) : (
																				Array.isArray(buttons) && buttons.length !== 0 ? (
																					<ButtonGroup>
																						{
																							buttons.map(
																								(button, index) => (
																									<Button type="button" size="sm" color={ checkButtonStyle(record, button.buttonColor, 'link') } onClick={ button.gridCallback } key={ index }>{ checkButtonStyle(record, button.buttonText, 'no-text') }</Button>
																								)
																							)
																						}
																					</ButtonGroup>
																				) : (
																					null
																				)
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
