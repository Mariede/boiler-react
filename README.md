# boiler-react (boilerplate)

Cliente boilerplate para aplicações Web em React - front-end

Utiliza framework de desenvolvimento [Create React App](https://github.com/facebook/create-react-app)

* Rodar local:
```
npm install
npm start
```

* Build (Webpack):
```
npm run build
```

## Front-end em React
  - Arquivo de configuração unificado (Config.json)
  - Integrado com servidor em Express/Node.js (boiler-server)
  - Single Page Application (SPA)
  - RESTFUL
  - Utiliza Bootstrap 4 (reactstrap)
  - CSS responsivo
  - Webfonts => Font Awesome

## Estrutura de código com pontos definidos de entrada / saída
  - Roteamento com react-router-dom
  - Core da aplicação separado, com controlador principal de acesso
  - Rotas protegidas ou abertas
  - Informações de usuário salvas globalmente em contexto
  - Salva última rota acessada (logado, via sessionStorage) pra caso de disconnect inesperado do servidor

## Helpers (Libs de apoio)
  - formValidator => integrado, para validação de formulários
    + Com regras ascopladas da mesma lib **validator** usada no template boiler-server
    + Permite campos e mensagens opcionais

## Componentes Gerais
  - Alert (modal de confirmação / informação) com callback
  - Loading (carregamento de página)
  - Notify (informações na tela - Erros / Avisos / etc...) com temporizador

## Componentes de Páginas
  - Divididas em Header / Content (wrapper) / Footer
  - Cabeçalhos
  - Página 404 "Não Encontrado"
  - Home / Logon / Logout
