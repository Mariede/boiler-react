import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Input } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './Paginator.css';

const Paginator = props => {
	const [newItemsPerPage, setNewItemsPerPage] = useState(null);

	const { pageDetails, url } = props;

	const _currentPage = ((pageDetails && pageDetails.currentPage) || 0);

	const initialPage = 1;
	const finalPage = ((pageDetails && pageDetails.totalPages) || 0);
	const currentPage = (_currentPage >= initialPage && _currentPage <= finalPage ? _currentPage : 0);

	const paginationInterval = () => {
		const paginationInterval = [];
		const rangeInterval = 3;

		const initialInterval = (currentPage - rangeInterval >= initialPage ? currentPage - rangeInterval : initialPage);
		const finalInterval = (currentPage + rangeInterval <= finalPage ? currentPage + rangeInterval : finalPage);

		for (let i = initialInterval; i <= finalInterval; i++) {
			paginationInterval.push(i);
		}

		return paginationInterval;
	};

	const paginationUrl = to => {
		const urlBase = url.currentPath;
		const urlParams = new URLSearchParams(url.currentSearch);

		switch (to) {
			case 'first': {
				urlParams.set('page', initialPage);
				break;
			}
			case 'previous': {
				urlParams.set('page', (currentPage > initialPage ? currentPage - 1 : initialPage));
				break;
			}
			case 'next': {
				urlParams.set('page', (currentPage < finalPage ? currentPage + 1 : finalPage));
				break;
			}
			case 'last': {
				urlParams.set('page', finalPage);
				break;
			}
			default: {
				urlParams.set('page', to);
			}
		}

		return `${urlBase}?${urlParams.toString()}`;
	};

	const changeItemsPerPage = e => {
		e.preventDefault();

		const urlBase = url.currentPath;
		const urlParams = new URLSearchParams(url.currentSearch);

		urlParams.set('items_per_page', e.currentTarget.value);

		setNewItemsPerPage(`${urlBase}?${urlParams.toString()}`);
	};

	return (
		<Fragment>
			{
				newItemsPerPage ? (
					<Redirect to={ newItemsPerPage } />
				) : (
					pageDetails ? (
						<Fragment>
							<div className="pagination-root justify-content-sm-between justify-content-around">
								<Input type="select" bsSize="sm" defaultValue={ pageDetails.itemsPerPage } className="pagination-select" onChange={ changeItemsPerPage }>
									{
										[5, 10, 25, 50, 100].map(
											i => (
												<option key={ i } value={ i }>{ i } registros por página</option>
											)
										)
									}
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

									{
										paginationInterval().map(
											i => (
												<PaginationItem key={ i } active={ (pageDetails.currentPage === i) }>
													<PaginationLink tag={ Link } to={ paginationUrl(i) }>
														{ i }
													</PaginationLink>
												</PaginationItem>
											)
										)
									}

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
				)
			}
		</Fragment>
	);
};

export default Paginator;
