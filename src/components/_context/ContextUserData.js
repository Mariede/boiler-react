import React from 'react';

// Acesso global aos dados do usuario logado
const ContextDataUser = React.createContext(
	{
		getUserData: {},
		setUserData: () => null
	}
);

export default ContextDataUser;
