# boiler-react (boilerplate)

Cliente boilerplate para aplicações Web em React - front-end

Utiliza [react-scripts](https://github.com/facebook/create-react-app)

* Rodar local:
```
npm install
npm start
```

* Build (Webpack com linter):
```
npm run build
```

## Front-end em React
  - Arquivo de configuração unificado (Config.json)
  - Integrado com servidor em Express/Node.js (boiler-server)
  - Single Page Application (SPA)
  - Compatível com chamadas RESTFUL da API do servidor
  - Utiliza Bootstrap 4 (reactstrap)
  - CSS responsivo - interface se adapta ao tamanho da tela (inclusive mobile)
  - Webfonts => Font Awesome

## Estrutura de código com pontos definidos de entrada / saída
  - Roteamento com react-router-dom
  - Core da aplicação separado: roteamento, controlador principal de sessão e de acessos
  - Configuração das rotas da aplicação em arquivo separado
  - Rotas protegidas ou abertas
  - Configuração das rotas da aplicação em arquivo separado
  - Informações da aplicação salvas globalmente em contexto
  - Reloga direto na última rota acessada, caso de disconnect inesperado do servidor

## Helpers (Libs de apoio)
  - appPermissions => identificadores de acesso a pontos da aplicação - em conjunto com back-end
  - errWrapper => catcher para manipulação de erros assíncronos
  - formValidator => integrado, para validação de formulários
    + Com regras acopladas da mesma lib **validator** utilizada no template boiler-server
    + Permite campos e mensagens opcionais
    + Permite validação a partir de eventos variados
  - functions => funcoes gerais js de apoio

## Componentes Gerais
  - ModalWindow (modais diversos com estrutura configurável e callbacks de execução)
  - Alert (popup de confirmação / informação com callback - acoplado com ModalWindow)
  - Loading (carregamento de página)
  - Notify (informações na tela - Erros / Avisos / etc...) com temporizador
  - ErrorBoundary (captura error síncronos nos componentes do react e mostra na UI)
  - GridTable (componente de tabulação de dados)
    + GridButton (botões personalizados de GridTable - pode usar Alert)
  - Paginator (paginação nas páginas - compatível com back-end boiler-server)
  - Sorter (ordenação nas páginas - compatível com back-end boiler-server)
  - CheckPermissions (verifica as permissões de acesso aos elementos DOM, na camada jsx)
  - DataGet (encapsula requisições de dados - GET)
  - DataChange (encapsula as transformações de dados - POST/PUT/PATCH/DELETE - para CRUD ou similar)
    + DataAction (exibe mensagem informativa de ação executada com sucesso, configurável)
    + DataModal (tela em modal para updates e inserts gerais)
    + Trabalha em sinergia com GridTable
  - PassMeter (informa força da senha)
  - Searcher (pesquisas dinâmicas - compatível com back-end boiler-server)
  - Componentes de formulários personalizados:
    + InputPass
    + Multiple
    + SelectInput

## Componentes de Páginas
  - Divididas em Header / MainContent (wrapper) / Footer
  - Cabeçalhos
  - Página 404 "Não Encontrado"
  - Home / Logon / Logout

## Custom Hooks
  - Hooks personalizados para automatizar tarefas repetitivas
    + Permissões de acesso aos elementos DOM
      * useCheckPermissions - Verificação de acessos aos elementos DOM da aplicação via useContext
    + Acesso a lib axios (GET, POST, PUT, DELETE, ...)
      * useDataGet - Centraliza as chamadas GET no sistema, através do componente DataGet
      * useDataChange - Centraliza as chamadas POST, PUT, PATCH, DELETE, através do componente DataChange

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
          - _form
            + componentes de formulário personalizados
      + _context
        * arquivos de contexto do react
      + _custom-hooks
        * hooks personalizados
      + _pages
        * componentes primários das páginas, em geral definidos nas rotas
  - helpers
    + arquivos de ajuda em js para executar tarefas compartilhadas nos componentes ou manipulação do DOM
  - routes
    + arquivo separado de roteamento do projeto _(routes)_
