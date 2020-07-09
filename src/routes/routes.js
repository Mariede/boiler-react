import Home from 'components/_pages/_base/Home';
import Logon from 'components/_pages/_base/Logon';
import NotFound from 'components/_pages/_base/NotFound';
import Usuario from 'components/_pages/_usuario/Usuario';

// Rotas adicionadas aqui
const routes = {
	getRoutes: [
		{ isProtected: true, component: Home, exact: true, path: '/' },
		{ isProtected: false, component: Logon, exact: true, path: '/logon' },
		{ isProtected: true, component: Usuario, exact: false, path: '/usuario' },
		{ isProtected: false, component: NotFound, exact: false, path: '*' }
	],
	getLogon: Logon
};

export default routes;
