import React, { Fragment } from 'react';

import { ButtonGroup } from 'reactstrap';
import { Table } from 'reactstrap';
import { Badge } from 'reactstrap';

import Paginator from 'components/_common/Paginator';
import Sorter from 'components/_common/Sorter';

import GridButton from './GridButton';

import './GridTable.css';

/*
	DEPENDENCIAS:
		- GridButton
		- Paginator
		- Reactstrap
		- Sorter

	PROPS:
		- dataReady		: OBRIGATORIO, indica quando os dados estao prontos

		- dataContent	: OBRIGATORIO, Json de retorno com o conteudo das informacoes a serem exibidas

		- url			: OBRIGATORIO, controle da URL e links de paginacao (currentPath e currentSearch)
			-> usado pelos componentes acoplados (Paginator e Sorter)

		- rowId 		: informa qual coluna define o ID do recordset
			-> se nao especificado, o componente tenta usar record.id ou o primeira chave do objeto record

		- columns		: OBRIGATORIO, especifica quais as colunas a serem exibidas
			-> array de objetos com [title, jsonElement, isSorted, gridCallback, buttons]
				-> title informa o cabecalho da coluna. Nao obrigatorio

				-> jsonElement informa a propriedade Json a ser exibida (formato string), e pode ser aninhado por ponto
					-> pode ser uma array de propriedades Json

					-> pode ser um jsx, nesse caso repete seu conteudo ao longo da coluna

					-> se jsonElement nao encontrado e possuir um callback associado (gridCallback), repete seu conteudo ao longo da coluna

					-> ** jsonElement e buttons sao mutuamente exclusivos - apenas um deles deve existir no objeto

				-> isSorted indica se coluna pode ser ordenada. Necessario um titulo para a coluna (title)

				-> gridCallback e um callback do parent na celula e se baseia no ID da linha em tr (rowId)
					-> gridCallback fora de buttons, serve de callback para jsonElement

				-> buttons informa uma array de um ou mais botoes que serao renderizados na coluna
					-> gridCallback e um callback do parent no botao e se baseia no ID da linha em tr (rowId)

					-> buttonText define o texto do botao (pode ser string ou jsx)

					-> buttonColor define o formato do button - default e link (string)
						-> ex. link, danger, success, ...

					-> buttonConfirm e opcional e define se havera um modal de confirmacao para a acao (string)
						-> contem o texto a ser exibido no modal

					-> ** buttons e jsonElement sao mutuamente exclusivos - apenas um deles deve existir no objeto

					-> buttonText e buttonColor podem tambem ser arrays com validacoes booleanas exclusivas
						-> Obrigatorio 3 itens na array:
							-> array[0]: elemento json de checagem (deve existir no json, pode ser aninhado)
							-> array[1]: exibe se array[0] for true
							-> array[2]: exibe se array[0] for false

				-> tdLayout inclui detalhes de layout da celula na tablea
					-> center: se true, conteudo centralizado

					-> right: se true, conteudo a direita

					-> badges: se existe, exibe conteudo como badge (primary, secondary, success, info, ...)

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
					<Table className="grid-table" { ...extraClasses } responsive key={ dataReady }>
						<thead>
							<tr>
								{
									columns.map(
										(column, index) => {
											const title = column.title;
											const jsonElement = (column.jsonElement || '');
											const isSorted = column.isSorted === true;

											const isReactElement = React.isValidElement(jsonElement);

											return (
												<th key={ index }>
													{
														title ? (
															(isSorted && !isReactElement) ? (
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
										(record, index1) => {
											const recordId = record[rowId] || record.id || record[Object.keys(record)[0]];

											return (
												<tr id={ recordId } key={ index1 }>
													{
														columns.map(
															(column, index2) => {
																const jsonElement = (column.jsonElement || '');
																const gridCallback = column.gridCallback;
																const buttons = column.buttons;
																const tdLayout = column.tdLayout;

																const isReactElement = React.isValidElement(jsonElement);

																const checkFirstForArray = !isReactElement ? (
																	{
																		first: record[jsonElement.split('.').slice(0, 1).pop()],
																		last: jsonElement.split('.').slice(1).join('.')
																	}
																) : (
																	undefined
																);

																const data = (
																	!isReactElement ? (
																		!Array.isArray(checkFirstForArray.first) ? (
																			tdLayout && tdLayout.badges ? (
																				<Badge color={ tdLayout.badges } pill>
																					{ String(jsonElement.split('.').reduce((o, i) => o && o[i], record) || '') || (gridCallback ? jsonElement : '') }
																				</Badge>
																			) : (
																				String(jsonElement.split('.').reduce((o, i) => o && o[i], record) || '') || (gridCallback ? jsonElement : '')
																			)
																		) : (
																			checkFirstForArray.first.map(
																				element => String(checkFirstForArray.last.split('.').reduce((o, i) => o && o[i], element) || '') || (gridCallback ? element : '')
																			)
																			.map(
																				(element, index) => (tdLayout && tdLayout.badges ? <Badge color={ tdLayout.badges } pill key={ index }>{ element }</Badge> : <span className="array-data" key={ index }>{ element }</span>)
																			)
																		)
																	) : (
																		tdLayout && tdLayout.badges ? (
																			<Badge color={ tdLayout.badges } pill>
																				{ jsonElement }
																			</Badge>
																		) : (
																			jsonElement
																		)
																	)
																);

																return (
																	<td key={ index2 } className={ tdLayout && (tdLayout.center ? 'td-center' : (tdLayout.right ? 'td-right' : '')) }>
																		{
																			jsonElement ? (
																				gridCallback ? (
																					<GridButton id={ `btn-${index1}${index2}` } gridCallback={ gridCallback } buttonColor="link" buttonText={ data } key={ index2 } />
																				) : (
																					data
																				)
																			) : (
																				Array.isArray(buttons) && buttons.length !== 0 ? (
																					<ButtonGroup>
																						{
																							buttons.map(
																								(button, index3) => (
																									<GridButton id={ `btn-${index1}${index2}${index3}` } record={ record } gridCallback={ button.gridCallback } buttonColor={ button.buttonColor } buttonText={ button.buttonText } buttonConfirm={ button.buttonConfirm } key={ index3 } />
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
