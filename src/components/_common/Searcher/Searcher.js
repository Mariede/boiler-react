import React, { useRef, useState, useEffect } from 'react';

import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

import './Searcher.css';

/*
	DEPENDENCIAS:
		- Reactstrap

	PROPS:
		- dataReady			-> OPCIONAL, indica quando os dados estao prontos
			- apenas para bloqueio e rotacao do icone associado ao botao

		- searchFields		-> OBRIGATORIO, define as colunas no banco de dados que serao pesquisadas
			- em formato de ARRAY

		- history			-> OBRIGATORIO, redirect via history router dom

		- url				-> OBRIGATORIO, controle da URL para pesquisas (currentPath e currentSearch)
*/
const Searcher = props => {
	const { dataReady, searchFields, history, url } = props;

	const urlBase = (url.currentPath || '');
	const urlSearch = (url.currentSearch || '');
	const urlParams = new URLSearchParams(urlSearch);

	const urlSearchValue = (urlParams.get('fullsearch_value') || '');

	const formInitialValues = {
		searchValue: urlSearchValue
	};

	const [formElements, handleFormElements] = useState(formInitialValues);

	const elementButtonIcon = useRef();

	const iconSearch = 'fa-search';
	const iconSearching = 'fa-hourglass-start';
	const iconSpin = 'fa-spin';

	const changeFormElements = e => {
		e.preventDefault();

		const { id, name, value } = e.currentTarget;

		handleFormElements(prevState => ({ ...prevState, [(id || name)]: value }));
	};

	const goClean = e => {
		e.preventDefault();

		urlParams.delete('fullsearch_fields');
		urlParams.delete('fullsearch_value');

		if (dataReady) {
			elementButtonIcon.current.classList.replace(iconSearch, iconSearching);
			elementButtonIcon.current.classList.add(iconSpin);
		}

		history.push(`${urlBase}?${urlParams.toString()}`);
	};

	const goSearch = e => {
		e.preventDefault();

		if (Array.isArray(searchFields) && searchFields.length !== 0) {
			const _searchFields = searchFields.join(',');
			const _searchValue = String(formElements.searchValue).trim();

			if (_searchValue) {
				urlParams.set('fullsearch_fields', _searchFields);
				urlParams.set('fullsearch_value', _searchValue);

				if (dataReady) {
					elementButtonIcon.current.classList.replace(iconSearch, iconSearching);
					elementButtonIcon.current.classList.add(iconSpin);
				}

				history.push(`${urlBase}?${urlParams.toString()}`);
			}
		}
	};

	const checkEnterPressed = e => {
		if (e.key === 'Enter') {
			goSearch(e);
		}
	};

	const checkUrlSearchValue = () => {
		if (formElements.searchValue !== urlSearchValue) {
			handleFormElements(formInitialValues);
		}
	};

	useEffect(
		() => {
			if (dataReady && elementButtonIcon.current.classList.contains(iconSpin)) {
				elementButtonIcon.current.classList.replace(iconSearching, iconSearch);
				elementButtonIcon.current.classList.remove(iconSpin);
			}
		},
		[dataReady]
	);

	useEffect(
		checkUrlSearchValue,
		[urlSearch]
	);

	return (
		<div className="searcher">
			<Button type="button" color="link" onClick={ goClean }>limpar</Button>

			<InputGroup>
				<Input type="text" value={ formElements.searchValue } id="searchValue" maxLength="50" placeholder="digite aqui a sua pesquisa" onChange={ changeFormElements } onKeyPress={ checkEnterPressed } autoComplete="off" />
				<InputGroupAddon addonType="append">
					<Button type="button" color="success" onClick={ goSearch } disabled={ (formElements.searchValue.trim() === '') || (dataReady === false) }><i ref={ elementButtonIcon } className={ `fas ${iconSearch}` }></i></Button>
				</InputGroupAddon>
			</InputGroup>

			<hr />
		</div>
	);
};

export default Searcher;
