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
  - Integrado com servidor em Express/Node.js (node-boiler-server)
  - RESTFUL
  - Utiliza Bootstrap 4 (reactstrap)
  - CSS responsivo
  - Webfonts => Font Awesome

## Estrutura de código com pontos definidos de entrada / saída
  - Roteamento com react-router-dom
  - Controlador principal (MainController)
  - Rotas protegidas ou abertas
  - Salva última rota acessada (logado, via sessionStorage) pra caso de disconnect inesperado do servidor

## Helpers (Libs de apoio)
  - FormValidator => integrado, para validação de formulários

## Componentes Gerais
  - Alert (modal de confirmação / informação) com callback
  - Loading (Carregamento de página)
  - Notify (Informações na tela - Erros / Avisos / etc...) com temporizador

## Componentes de Páginas
  - Divididas em Header / Content (wrapper) / Footer
  - Cabeçalhos
  - Página 404 "Não Encontrado"
  - Home / Login / Logout
