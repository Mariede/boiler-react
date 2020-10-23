import { createContext } from 'react';

// Acesso global aos dados do usuario logado
const ContextDataUser = createContext(
	{
		getUserData: {},
		setUserData: () => null
	}
);

export default ContextDataUser;
