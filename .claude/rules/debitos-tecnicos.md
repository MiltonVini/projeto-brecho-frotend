# Débitos Técnicos Conhecidos

Problemas existentes no código. **Não corrija proativamente** ao passar por eles (salvo se a tarefa pedir), mas **não os propague** em código novo.

## Nomenclatura

- Typo `fecth` em vez de `fetch`: `fecthBagDetails`, `fecthClientInfo`, `fecthSalesByBag`. Em código novo, use `fetch`.
- `UseBag` com "U" maiúsculo — hooks novos começam com `use` minúsculo.
- Arquivo `components/styles/loadindModal.module.css` (typo de "loading").
- Título "Unusal Shop" em `Auth.tsx` (typo de "Unusual").

## Tipos duplicados

As interfaces de entidades (`ClientProps`, `BagsProps`, `IProductProps`, `ISalesProps`, `IClientFormInput`, etc.) estão declaradas em `contexts/bagContext.tsx`, `providers/bagProvider.tsx` **e** em algumas páginas. Para código novo, crie/importe de um único lugar (ex.: `src/types/<dominio>.ts`) em vez de redeclarar.

## Provider inchado

`BagProvider` concentra bags, clientes, produtos, vendas, filtros, toast e loading. Funcionalidades novas de outros domínios devem ir para providers próprios.

Ele também chama `useForm()` apenas para usar `reset`, que não está ligado a nenhum formulário — não replique.

## Tratamento de erros inconsistente

- Algumas funções do provider fazem `try/catch` e engolem o erro; outras não têm `try/catch`. Com isso, o `catch` das páginas às vezes nunca dispara e o modal de sucesso aparece mesmo com falha.
- `console.log(response)` espalhado pelo provider e `console.log` dos dados de login em `Auth.tsx` (vazamento de senha no console). Não adicione logs de dados sensíveis nem de debug.

## Atrasos artificiais

- `isLoading` só volta a `false` após `setTimeout` de 3s em `fetchAllBags`.
- Login aguarda 2s antes de navegar.

Não adicione delays artificiais em código novo.

## Outros

- `App.tsx` tem `useEffect` sem array de dependências.
- Rotas não são protegidas por autenticação; não há tratamento de 401.
- Item "Cadastrar Sacolinha" da sidebar aponta para `to=""`.
- O botão "Adicionar Venda" em `BagDetails` não tem ação.
- Responsividade mobile em andamento: o `Layout` já é responsivo, mas o conteúdo de algumas telas ainda usa larguras fixas (`w-5/6`, `w-[15rem]`, `w-98`, grid fixo do `ProductCatalog`, `left: 40%` do `Toast`).
- `index.html` com `lang="en"` apesar da UI em pt-BR.
- Dependências `dotenv` e `@types/node` em `dependencies` sem uso no frontend (Vite já carrega `.env`).
