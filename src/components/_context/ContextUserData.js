import { createContext } from 'react';

// Acesso global aos dados do usuario logado
const ContextUserData = createContext(
	{
		getUserData: {},
		setUserData: () => null
	}
);

export default ContextUserData;
