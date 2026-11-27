# Arquitetura

## Estrutura de pastas

```
src/
├── main.tsx              # Bootstrap: StrictMode > EmailProvider > BagProvider > AppRoutes
├── Routes.tsx            # Todas as rotas (BrowserRouter)
├── App.tsx               # Página /bags (lista de sacolinhas) — única com default export
├── Auth.tsx, BagDetails.tsx, Clients.tsx, Products.tsx, Sales.tsx   # Páginas
├── components/           # Componentes reutilizáveis
│   └── styles/           # CSS Modules dos componentes (<nome>.module.css)
├── contexts/             # createContext + tipo do contexto (<dominio>Context.tsx)
├── providers/            # Estado + chamadas de API do domínio (<dominio>Provider.tsx)
├── hooks/                # Hook de acesso ao contexto (<dominio>Hooks.tsx)
├── lib/axios.ts          # Instâncias Axios (api, emailServiceApi)
└── index.css             # Apenas `@import "tailwindcss";`
```

- **Páginas** ficam na raiz de `src/`, arquivo em PascalCase (`BagDetails.tsx`).
- **Componentes** ficam em `src/components/`, arquivo em camelCase (`bagsFilters.tsx`) e export em PascalCase (`BagsFilters`).
- Não há alias de import (`@/`); use caminhos relativos.

## Rotas

Definidas em `src/Routes.tsx`:

| Rota | Página |
|---|---|
| `/` | `Auth` (login) |
| `/bags` | `App` (lista de sacolinhas) |
| `/bag/:id` | `BagDetails` |
| `/sales` | `Sales` |
| `/clients` | `Clients` |
| `/products` | `Products` |

Nova página → crie o arquivo em `src/`, registre a rota em `Routes.tsx` e, se for navegável, adicione o item em `components/sidebar.tsx` (com ícone do Phosphor).

## Estado global: Context → Provider → Hook

Cada domínio segue o trio:

1. `contexts/<dominio>Context.tsx` — interface `<Dominio>ContextType` e `createContext({} as <Dominio>ContextType)`.
2. `providers/<dominio>Provider.tsx` — `useState` dos dados, funções de fetch/mutação com Axios, e `<Context.Provider value={{...}}>`.
3. `hooks/<dominio>Hooks.tsx` — função que retorna `useContext(<Dominio>Context)`.

Domínios existentes:

- **Bag** (`BagProvider` / `UseBag`) — concentra bags, clientes, produtos e vendas.
- **Email** (`EmailProvider` / `useEmail`) — envio de rastreio e template HTML do e-mail.

Ao adicionar um provider novo, envolva-o em `main.tsx`.

### Diretrizes para código novo

- Prefira **criar um novo domínio** (ex.: `clientContext`/`clientProvider`/`useClient`) em vez de continuar crescendo o `BagProvider`, que já acumula responsabilidades demais.
- Funções de fetch no provider usam `useCallback(async (...) => {...}, [])` para poderem entrar em arrays de dependência de `useEffect` nas páginas.
- Nomeie o hook com `use` minúsculo (`useEmail`, `useClient`) — exigência das regras de hooks do React/ESLint. `UseBag` é exceção legada.
- Páginas disparam carregamento em `useEffect` com dependências explícitas:

```tsx
useEffect(() => {
  if (id) fetchBagDetails(id)
}, [id, fetchBagDetails])
```

- Nunca use `useEffect` sem array de dependências (como em `App.tsx`).

## Layout das páginas autenticadas

Toda página interna é envolvida por `<Layout>` (`components/layout.tsx`). Nunca renderize `<Sidebar />` diretamente nem use `ml-64` na página:

```tsx
<Layout>
  <h3 className="text-2xl font-semibold mb-6">Título</h3>
  {/* conteúdo */}
</Layout>
```

Comportamento do `Layout`:

- **`lg:` (≥ 1024px):** sidebar fixa à esquerda (16rem) e conteúdo com `lg:ml-64`.
- **Abaixo de `lg`:** cabeçalho fixo no topo com botão ☰. A sidebar abre como menu deslizante sobre o conteúdo, com fundo escurecido, e fecha ao clicar fora, ao clicar num link, no botão X ou com Esc.
- O `<main>` já aplica o padding (`p-4 md:p-6`). As páginas não devem adicionar padding externo próprio.

O app é **mobile-first**: escreva as classes base para celular e acrescente `md:`/`lg:`/`xl:`/`2xl:` para telas maiores. Não use larguras fixas (`w-[15rem]`, `w-98`, `w-5/6`) sem uma alternativa para telas pequenas.
