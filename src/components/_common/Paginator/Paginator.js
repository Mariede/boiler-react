import React, { Fragment, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Input } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './Paginator.css';

/*
	DEPENDENCIAS:
		- Reactstrap

	PROPS:
		- pageDetails		-> OBRIGATORIO, controle dos dados paginados
		- history			-> OBRIGATORIO, redirect via history router dom
		- url				-> OBRIGATORIO, controle da URL e links de paginacao (currentPath e currentSearch)
*/
const Paginator = props => {
	const { pageDetails, history, url } = props;

	const urlBase = (url.currentPath || '');
	const urlSearch = (url.currentSearch || '');
	const urlParams = new URLSearchParams(urlSearch);

	const initialPage = 1;
	const finalPage = ((pageDetails && pageDetails.totalPages) || 1);

	const _currentPage = ((pageDetails && pageDetails.currentPage) || 0);
	const currentPage = (_currentPage >= initialPage && _currentPage <= finalPage ? _currentPage : 1);

	const paginationUrl = useCallback(
		to => {
			const paginationParams = new URLSearchParams(urlSearch);

			switch (to) {
				case 'first': {
					paginationParams.set('page', initialPage);
					break;
				}
				case 'previous': {
					paginationParams.set('page', (currentPage > initialPage ? currentPage - 1 : initialPage));
					break;
				}
				case 'next': {
					paginationParams.set('page', (currentPage < finalPage ? currentPage + 1 : finalPage));
					break;
				}
				case 'last': {
					paginationParams.set('page', finalPage);
					break;
				}
				default: {
					paginationParams.set('page', to);
				}
			}

			return `${urlBase}?${paginationParams.toString()}`;
		},
		[currentPage, initialPage, finalPage, urlBase, urlSearch]
	);

	const paginationInterval = useMemo(
		() => {
			const pages = [];
			const interval = 1;

			const _initialInterval = (currentPage - interval > initialPage ? currentPage - interval : initialPage);
			const _finalInterval = (currentPage + interval < finalPage ? currentPage + interval : finalPage);

			const initialInterval = (currentPage === finalPage && _initialInterval > initialPage ? _initialInterval - interval : _initialInterval);
			const finalInterval = (currentPage === initialPage && _finalInterval < finalPage ? _finalInterval + interval : _finalInterval);

			for (let i = initialInterval; i <= finalInterval; i++) {
				pages.push(i);
			}

			return (
				pages.map(
					(i, index) => (
						<Fragment key={ i }>
							{
								(index === 0 && i !== initialPage) ? (
									<PaginationItem className="break">
										<i className="fas fa-ellipsis-h"></i>
									</PaginationItem>
								) : (
									null
								)
							}
							<PaginationItem active={ (_currentPage === i) }>
								<PaginationLink tag={ Link } to={ paginationUrl(i) }>
									{ i }
								</PaginationLink>
							</PaginationItem>
							{
								(index + 1 === pages.length && i !== finalPage) ? (
									<PaginationItem className="break">
										<i className="fas fa-ellipsis-h"></i>
									</PaginationItem>
								) : (
									null
								)
							}
						</Fragment>
					)
				)
			);
		},
		[_currentPage, currentPage, initialPage, finalPage, paginationUrl]
	);

	const itemsPerPage = useMemo(
		() => (
			[5, 10, 25, 50, 100].map(
				i => (
					<option key={ i } value={ i }>{ i } registros por página</option>
				)
			)
		),
		[]
	);

	const changeItemsPerPage = e => {
		e.preventDefault();

		urlParams.set('items_per_page', e.currentTarget.value);

		history.push(`${urlBase}?${urlParams.toString()}`);
	};

	return (
		pageDetails ? (
			<Fragment>
				<div className="pagination-main justify-content-md-between justify-content-around">
					<Input type="select" bsSize="sm" value={ pageDetails.itemsPerPage } className="pagination-select" onChange={ changeItemsPerPage }>

						{ itemsPerPage }

					</Input>

					<Pagination>
						<PaginationItem disabled={ currentPage === initialPage }>
							<PaginationLink tag={ Link } to={ paginationUrl('first') } first>
								<i className="fas fa-angle-double-left"></i>
							</PaginationLink>
						</PaginationItem>

						<PaginationItem disabled={ currentPage === initialPage }>
							<PaginationLink tag={ Link } to={ paginationUrl('previous') } previous>
								<i className="fas fa-angle-left"></i>
							</PaginationLink>
						</PaginationItem>

						{ paginationInterval }

						<PaginationItem disabled={ currentPage === finalPage }>
							<PaginationLink tag={ Link } to={ paginationUrl('next') } next>
								<i className="fas fa-angle-right"></i>
							</PaginationLink>
						</PaginationItem>

						<PaginationItem disabled={ currentPage === finalPage }>
							<PaginationLink tag={ Link } to={ paginationUrl('last') } last>
								<i className="fas fa-angle-double-right"></i>
							</PaginationLink>
						</PaginationItem>
					</Pagination>
				</div>
				<div className="pagination-text">
					Página <strong>{ pageDetails.currentPage }</strong> de <strong>{ pageDetails.totalPages }</strong> | Exibindo <strong>{ pageDetails.itemsFrom }</strong> a <strong>{ pageDetails.itemsTo }</strong> de <strong>{ pageDetails.itemsCount }</strong> registros
				</div>
			</Fragment>
		) : (
			null
		)
	);
};

export default Paginator;
