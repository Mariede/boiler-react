import { useContext } from 'react';

import ContextUserData from 'components/_context/ContextUserData';

/*
	-> Validacao das permissoes de acesso aos elementos do sistema
		* Pode ser utilizado diretamente como custom-hook ou atraves do componente CheckPermissions

		PROPS:
			{
				allowedPermissions	=> Identificadores das permissoes liberadas, em formato de array
			}

	** Validacao case insensitive
*/
const useCheckPermissions = props => {
	const { allowedPermissions } = props;

	const getUserData = useContext(ContextUserData).getUserData;

	const userPermissions = getUserData && getUserData.funcoes;

	// Se string: para maiusculo na validacao
	const _allowedPermissions = (Array.isArray(allowedPermissions) ? (allowedPermissions.map(_p => (typeof _p === 'string' ? _p.toUpperCase() : _p))) : []);
	const _userPermissions = (Array.isArray(userPermissions) ? (userPermissions.map(_p => (typeof _p === 'string' ? _p.toUpperCase() : _p))) : []);

	// Valida permissao
	const permitted = _allowedPermissions.some(
		_p => _userPermissions.includes(_p)
	);

	return permitted;
};

export default useCheckPermissions;
