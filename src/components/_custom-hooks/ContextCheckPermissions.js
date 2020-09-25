import { useContext } from 'react';

import ContextUserData from 'components/_context/ContextUserData';

/*
	PROPS
		allowedPermissions	-> Identificadores das permissoes permitidas em formato de array. Obrigatorio
		children			-> Contem os elementos JSX a serem exibidos
			-> ChildContentPermittted		: Exibido caso conteudo permitido (opcional)
			-> ChildContentNotPermittted	: Exibido caso conteudo permitido (opcional)
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

	const permitted = Array.isArray(allowedPermissions) ? (
		getUserData.funcoes.some(
			_f => allowedPermissions.includes(_f)
		)
	) : (
		false
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
