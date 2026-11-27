# TypeScript e Estilo de Código

## TypeScript

- `strict: true`, `noUnusedLocals`, `noUnusedParameters` — o build (`tsc -b`) falha com variáveis/parâmetros não usados.
- Tipos de objetos com `interface`; uniões com `type` (`type StockType = "single" | "multiple"`).
- Convenção de nomes de tipos:
  - Props de componente: `<Componente>Props`
  - Entradas de formulário: `I<Acao>FormInput` (`ICreateProductFormInput`)
  - Entidades vindas da API: `I<Entidade>Props` / `<Entidade>Props`
  - Contexto: `<Dominio>ContextType`
- Datas vindas da API são tipadas como `Date`, mas chegam como string — sempre envolva com `new Date(...)` antes de usar no `date-fns`.
- Evite `any`. O projeto usa `// eslint-disable-next-line @typescript-eslint/no-explicit-any` em props de `register`/`control`; em código novo prefira genéricos (`Control<T>`, `UseFormRegister<T>`, `Path<T>`).
- Não duplique interfaces: defina cada tipo de entidade **uma vez** e importe onde precisar (ver `debitos-tecnicos.md`).

## Formatação

Não há Prettier; siga o estilo predominante:

- Indentação de **4 espaços** (alguns arquivos usam 2 — ao editar, mantenha o do arquivo).
- Aspas **duplas** em imports e strings JSX; sem ponto-e-vírgula no fim das linhas (há mistura — mantenha o do arquivo).
- Props JSX longas quebradas uma por linha.
- Ordem de imports: bibliotecas externas e módulos locais misturados; não há regra rígida.

## Nomenclatura

- Código (variáveis, funções, tipos, arquivos) em **inglês**; textos de UI e mensagens de validação em **português**.
- Handlers: `handle<Acao>` (`handleCreateBag`, `handleRedirect`); submits do provider: `on<Acao>FormSubmit`.
- Fetchers: `fetch<Recurso>` (`fetchAllProducts`, `fetchClientActiveBag`).
- Estado booleano de UI: `show<Coisa>` / `is<Estado>` (`showModal`, `isLoading`).

## Lint

ESLint 9 (flat config) com `typescript-eslint` recommended, `react-hooks` e `react-refresh`. Respeite as regras de dependências de hooks em vez de desabilitá-las.
