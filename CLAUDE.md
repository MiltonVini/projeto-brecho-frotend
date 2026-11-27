# Projeto Brechó — Frontend

Painel administrativo de um brechó ("Unusual Shop"): sacolinhas (bags) por cliente, vendas, produtos, clientes e envio de código de rastreio por e-mail.

## Stack

React 19 + Vite 6 + TypeScript 5.7 (strict) · Tailwind CSS v4 (`@tailwindcss/vite`) · React Router 7 · React Hook Form · Axios · date-fns · react-select · @phosphor-icons/react

## Comandos

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # tsc -b && vite build (falha com erro de tipo)
npm run lint     # eslint
npm run preview  # preview do build
```

Não há suíte de testes nem Prettier configurados. Antes de concluir uma mudança, rode `npm run build` e `npm run lint`.

## Variáveis de ambiente (`.env`, não versionado)

- `VITE_API_URL` — API principal (bags, clients, products, sales, authenticate)
- `VITE_EMAIL_SERVICE_API_URL` — serviço de e-mail (`POST /emails`)

## Rules

Os padrões do projeto estão em `.claude/rules/`:

- `arquitetura.md` — estrutura de pastas, rotas, estado global (Context/Provider/Hook)
- `componentes-e-estilo.md` — componentes, nomenclatura, Tailwind, CSS Modules, paleta
- `formularios-e-api.md` — React Hook Form, Axios, autenticação, feedback ao usuário
- `typescript-e-codigo.md` — tipagem, formatação, idioma
- `debitos-tecnicos.md` — problemas conhecidos que **não devem ser propagados**
