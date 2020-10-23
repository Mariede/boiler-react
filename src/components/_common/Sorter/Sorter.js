import { useMemo } from 'react';

import { UncontrolledTooltip } from 'reactstrap';

import './Sorter.css';

/*
	** Tecla CTRL pressionada: Realiza a ordenação acumulando os elementos selecionados na url
	** Tecla ALT pressionada: Volta ao original, removendo os elementos da url

	DEPENDENCIAS:
		- Reactstrap

	PROPS:
		- title			-> OBRIGATORIO, nome da coluna na tabela ou elemento
		- sortElement	-> OBRIGATORIO, elemento a ser ordenado (formato string), pode ser aninhado por ponto
		- history		-> OBRIGATORIO, redirect via history router dom
		- url			-> OBRIGATORIO, controle da URL e links de paginacao (currentPath e currentSearch)
*/
const Sorter = props => {
	const { title, sortElement, history, url } = props;

	const urlBase = (url.currentPath || '');
	const urlSearch = (url.currentSearch || '');
	const urlParams = new URLSearchParams(urlSearch);

	const sortFields = (urlParams.get('sort_fields') || '');

	const sortPage = e => {
		e.preventDefault();

		const container = e.currentTarget.querySelector('i');
		const dataSortElement = container && container.getAttribute('data-sort-element');
		const dataSortClassList = container && container.classList;

		if (dataSortElement && dataSortClassList) {
			if (e.altKey) {
				// Limpa os campos do sorter na url
				urlParams.delete('sort_fields');
			} else {
				const sortNew = [];
				const elementOrder = (dataSortClassList && dataSortClassList.contains('fa-sort-up') ? 'DESC' : 'ASC');

				sortNew.push(`${dataSortElement}:${elementOrder}`);

				if (e.ctrlKey && sortFields) {
					// Faz o sorter acumulando campos
					sortFields.split(/[,|]/).reverse().forEach(
						e => {
							const sortField = e.split(/[:]/);

							const element = String(sortField[0] || '').trim();
							const order = String((sortField[1] || 'ASC')).trim().toUpperCase();

							if (element.toUpperCase() !== dataSortElement.toUpperCase()) {
								sortNew.push(`${element}:${order}`);
							}
						}
					);
				}

				const sortNewGo = sortNew.reverse().join(',');

				urlParams.set('sort_fields', sortNewGo);
			}

			history.push(`${urlBase}?${urlParams.toString()}`);
		}
	};

	const sorterElement = useMemo(
		() => {
			let resultShow = (
				<i className="fas fa-sort" data-sort-element={ sortElement }></i>
			);

			if (sortFields) {
				sortFields.split(/[,|]/).some(
					e => {
						const sortField = e.split(/[:]/);

						const element = String(sortField[0] || '').trim();
						const order = String((sortField[1] || 'ASC')).trim().toUpperCase();

						if (element === sortElement) {
							if (order === 'DESC') {
								resultShow = (
									<i className="fas fa-sort-down" data-sort-element={ sortElement }></i>
								);
							} else {
								resultShow = (
									<i className="fas fa-sort-up" data-sort-element={ sortElement }></i>
								);
							}

							return true;
						}

						return false;
					}
				);
			}

			return resultShow;
		},
		[sortElement, sortFields]
	);

	const sorterId = useMemo(
		() => String(sortElement || '').replace(/[^a-zA-Z0-9_]+/gi, ''),
		[sortElement]
	);

	return (
		<div className="sorter">
			<span className="sorter-column" id={ `sorter-${sorterId}` } onClick={ sortPage }>
				{ title }

				{ sorterElement }

			</span>

			<UncontrolledTooltip placement="top" target={ `sorter-${sorterId}` } trigger="hover">
				Segure CTRL para ordenar vários<br />Segure ALT para reiniciar
			</UncontrolledTooltip>
		</div>
	);
};

export default Sorter;
