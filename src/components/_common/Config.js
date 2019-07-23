import React from 'react';

// Acesso global ao config
// React.useContext(Config) para acessar o valor dentro da funcao (antes do return jsx)
const Config = React.createContext();

export default Config;
