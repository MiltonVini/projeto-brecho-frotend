# Formulários e API

## Formulários (React Hook Form)

- Todo formulário usa `useForm<IAlgoFormInput>()` com interface tipada.
- Inputs nativos: `{...register("campo")}` ou os componentes `TextInput`/`NumberInput`/`RadioButtonInput` passando `register`.
- Inputs controlados de biblioteca (`react-select`, catálogo): componentes com `Controller` recebendo `control`.
- Validação declarada no `register` com mensagens em pt-BR, exibidas abaixo do campo:

```tsx
{...register("password", {
  required: "Senha é obrigatória",
  minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
})}
{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
```

- Nomes dos campos do formulário seguem os nomes do payload da API em `snake_case` (`client_id`, `stock_type`, `bag_id`). Quando a API usa outro nome, o provider faz o mapeamento (ex.: `instagram_user` → `instagram_name`).

### Fluxo de submit padrão

A página trata o resultado; o provider faz a chamada:

```tsx
const [showModal, setShowModal] = useState(false)

const handleCreateX = async (data: ICreateXFormInput) => {
  try {
    await onCreateXFormSubmit(data)   // função do provider
    setShowModal(true)
    reset()
  } catch (error) {
    console.error(error)
  } finally {
    setTimeout(() => setShowModal(false), 3000)
  }
}
```

- Sucesso em cadastro → `Modal`; sucesso em ação dentro de uma tela de detalhe → `Toast`. Ambos fecham após **3000 ms**.
- Para que o `catch` da página funcione, a função do provider **não deve engolir o erro** — deixe-o propagar (ou relance após logar).
- Não há componente de erro ainda; ao precisar, crie um (ex.: variante de `Toast`) em vez de só logar no console.

## API (Axios)

- Use sempre as instâncias de `src/lib/axios.ts`; nunca `axios` direto nem `fetch`:
  - `api` — API principal (`VITE_API_URL`), `withCredentials`, JSON, injeta `Authorization: Bearer <authToken>` via interceptor.
  - `emailServiceApi` — serviço de e-mail (`VITE_EMAIL_SERVICE_API_URL`).
- Endpoints REST no plural, com barra inicial: `/bags`, `/bags/:id`, `/clients/:id/active-bag`, `/sales`, `/products`.
- Filtros vão em `params` (`api.get('/bags', { params })`), não concatenados na URL.
- Respostas são lidas de `response.data` e guardadas no estado do provider.
- Payloads e campos de resposta são `snake_case` (espelham o backend); mantenha as interfaces TS com os mesmos nomes.
- Após mutações que afetam a lista de bags, sinalize com `setShouldRefreshBags(true)`.
- Variáveis de ambiente novas: prefixo `VITE_`, lidas via `import.meta.env`, documentadas no `CLAUDE.md`.

## Autenticação

- Login em `Auth.tsx` faz `POST /authenticate`; o token retornado (`authToken`) é salvo em `localStorage.authToken` e enviado pelo interceptor do `api`.
- Ainda **não há proteção de rotas** nem tratamento de 401/logout. Ao implementar, centralize (ex.: componente `PrivateRoute` em `Routes.tsx` + interceptor de resposta em `lib/axios.ts`), não verifique o token página a página.
