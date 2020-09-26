import { useContext } from 'react';

import ContextUserData from 'components/_context/ContextUserData';

/*
	PROPS
		allowedPermissions	-> Identificadores das permissoes permitidas, em formato de array
		children			-> Contem os elementos JSX a serem exibidos
			-> ChildContentPermittted		: Exibido caso conteudo permitido (opcional)
			-> ChildContentNotPermittted	: Exibido caso conteudo permitido (opcional)

	** Validacao case insensitive
*/
const ContextCheckPermissions = props => {
	const { allowedPermissions, children } = props;

	const ChildContentPermittted = (
		(children && children.length !== 0) ? (
			children[0]
		) : (
			null
		)
	);

	const ChildContentNotPermittted = (
		(ChildContentPermittted && children.length === 2) ? (
			children[1]
		) : (
			null
		)
	);

	const getUserData = useContext(ContextUserData).getUserData;

	const userPermissions = getUserData && getUserData.funcoes;

	// Se string: para maiusculo na validacao
	const _allowedPermissions = (Array.isArray(allowedPermissions) ? (allowedPermissions.map(_p => (typeof _p === 'string' ? _p.toUpperCase() : _p))) : []);
	const _userPermissions = (Array.isArray(userPermissions) ? (userPermissions.map(_p => (typeof _p === 'string' ? _p.toUpperCase() : _p))) : []);

	// Valida permissao
	const permitted = _allowedPermissions.some(
		_p => _userPermissions.includes(_p)
	);

	return (
		permitted ? (
			ChildContentPermittted
		) : (
			ChildContentNotPermittted
		)
	);
};

export default ContextCheckPermissions;
