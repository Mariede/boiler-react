# boiler-react (boilerplate)

Cliente boilerplate para aplicações Web em React - front-end

Utiliza react-scripts do framework de desenvolvimento [Create React App](https://github.com/facebook/create-react-app)

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
  - CSS responsivo - interface se adapta ao tamanho da tela (inclusive mobile)
  - Webfonts => Font Awesome

## Estrutura de código com pontos definidos de entrada / saída
  - Roteamento com react-router-dom
  - Core da aplicação separado: roteamento, controlador principal de sessão e de acessos
  - Configuração das rotas da aplicação em arquivo separado
  - Rotas protegidas ou abertas
  - Configuração das rotas da aplicação em arquivo separado
  - Informações de usuário salvas globalmente em contexto
  - Reloga direto na última rota acessada, caso de disconnect inesperado do servidor

## Helpers (Libs de apoio)
  - formValidator => integrado, para validação de formulários
    + Com regras acopladas da mesma lib **validator** utilizada no template boiler-server
    + Permite campos e mensagens opcionais

## Componentes Gerais
  - ModalWindow (modais diversos com estrutura configurável e callback)
  - Alert (popup de confirmação / informação com callback - acoplado com ModalWindow)
  - Loading (carregamento de página)
  - Notify (informações na tela - Erros / Avisos / etc...) com temporizador

## Componentes de Páginas
  - Divididas em Header / Content (wrapper) / Footer
  - Cabeçalhos
  - Página 404 "Não Encontrado"
  - Home / Logon / Logout

## Estrutura das pastas da aplicação
  - application
    + arquivos de inicialização e assistência ao funcionamento
    + núcleo da aplicação, transparente para os projetos
  - assets
    + arquivos visuais globais da aplicação
      * css
        - arquivos de folhas de estilos
      * images
        - imagens diversas
      * webfonts
        - arquivos utilizados pelo "Font Awesome"
  - components
    + componentes programáveis do react _(as pastas começam por _ para não confundir com os componentes em si)_
      + _common
        * componentes comuns ao projeto (subcomponentes), utilizados em um ou mais componentes
      + _context
        * arquivos de contexto do react
      + _pages
        * componentes primários das páginas, em geral definidos nas rotas
  - helpers
    + arquivos de ajuda em js para executar tarefas compartilhadas nos componentes ou manipulação do DOM
  - routes
    + arquivo separado de roteamento do projeto _(routes)_
