import Home from 'components/_pages/_base/Home';
import Logon from 'components/_pages/_base/Logon';
import NotFound from 'components/_pages/_base/NotFound';
import UsuarioSenha from 'components/_pages/_usuario/Senha';
import Usuario from 'components/_pages/_usuario/Usuario';

// Rotas adicionadas aqui
/*
	isProtected		: indica se a rota e protegida (acesso apenas logado) - obrigatorio
	onlyNotLogged	: apenas para paginas com isProtected = false, indica que nao podem ser renderizadas logado - opcional
	component:		: componente de pagina a ser renderizado - obrigatorio
	exact:			: renderiza apenas se o caminho for identico ao indicado na rota (path), se false usa contains - obrigatorio
	path			: caminho da rota (pode usar caracteres especiais para parametro opcionais) - obrigatorio
*/
const routes = {
	getRoutes: [
		{ isProtected: true, component: Home, exact: true, path: '/' },
		{ isProtected: false, onlyNotLogged: true, component: Logon, exact: true, path: '/logon' },
		{ isProtected: true, component: UsuarioSenha, exact: true, path: '/usuario/senha' },
		{ isProtected: true, component: Usuario, exact: true, path: '/usuario/:id?' },
		{ isProtected: false, component: NotFound, exact: false, path: '*' }
	],
	getLogon: Logon,
	getHome: Home
};

export default routes;
