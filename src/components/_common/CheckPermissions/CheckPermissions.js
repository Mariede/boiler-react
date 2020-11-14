import useCheckPermissions from 'components/_custom-hooks/useCheckPermissions';

/*
	PROPS
		allowedPermissions	-> Identificadores das permissoes liberadas, em formato de array
		children			-> Contem os elementos JSX a serem exibidos
			-> ChildContentPermittted		: Exibido caso conteudo permitido (opcional)
			-> ChildContentNotPermittted	: Exibido caso conteudo permitido (opcional)

	** Validacao case insensitive
*/
const CheckPermissions = props => {
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

	const permitted = useCheckPermissions(
		{
			allowedPermissions
		}
	);

	return (
		permitted ? (
			ChildContentPermittted
		) : (
			ChildContentNotPermittted
		)
	);
};

export default CheckPermissions;
