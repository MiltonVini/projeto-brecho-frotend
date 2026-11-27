# Componentes e Estilo

## Componentes

- Declare como **named export de função**: `export function NomeDoComponente(props: NomeDoComponenteProps) {}`. Não use arrow function + `export default` (exceção legada: `App`).
- Props tipadas com `interface <Componente>Props` no topo do arquivo, desestruturadas na assinatura.
- Componentes de feedback controlados por boolean retornam `null` quando fechados: `if (!isOpen) return null`.
- Reaproveite os componentes existentes antes de criar novos:

| Componente | Uso |
|---|---|
| `Sidebar` | Navegação lateral de todas as páginas internas |
| `Label` | `<label>` padronizado (`text`, `inputName`) |
| `TextInput` / `NumberInput` | Inputs ligados ao `register` do React Hook Form (`NumberInput` usa `valueAsNumber`, `step=0.01`, `min=0`) |
| `RadioButtonInput` | Grupo de radios a partir de `options: {label, value}[]` |
| `SelectInput` / `MultiSelectInput` | `react-select` via `Controller` (`control`) |
| `ProductCatalog` | Seleção múltipla de produtos com busca, via `Controller` |
| `Modal` | Overlay de sucesso centralizado (`isOpen`, `message`) |
| `Toast` | Notificação de sucesso no topo (`isOpen`, `message`) |
| `LoadingModal` | Spinner de carregamento |

## Estilização

- **Tailwind CSS v4** é o padrão — classes utilitárias direto no JSX. Não há `tailwind.config`; customizações vão em `src/index.css` via `@theme` se necessário.
- **CSS Modules** (`components/styles/<componente>.module.css`, importado como `styles`) apenas quando o estilo for complexo demais para utilitárias (posicionamento fixo, grids de tabela, animações). Não crie CSS global.
- Classes condicionais com template literal: `` className={`base ${cond ? 'a' : 'b'}`} ``. Se a lógica se repetir, extraia para uma função/constante (ex.: `isDeliveredFieldClass`).
- Ícones: **apenas `@phosphor-icons/react`**, com `size` explícito (22 na sidebar, 24–32 em buscas/listas, 48 em modal).
- Datas exibidas com `date-fns`: `format(new Date(valor), 'dd/MM/yyyy')`.
- Valores monetários exibidos como `` `R$ ${valor}` ``.

## Paleta (valores usados no projeto)

Use as mesmas cores para manter consistência visual:

| Papel | Classes |
|---|---|
| Botão primário (submit) | `bg-[#CFECF4] hover:bg-[#B0CDEE] text-dark px-4 py-2 rounded-sm transition-colors` |
| Botão secundário | `bg-[#CFE0F4] hover:bg-[#B0D0EF] text-gray-800` |
| Botão de sucesso/ação positiva | `bg-[#84D19B] hover:bg-[#6FBF87] text-white` |
| Status "Entregue" | `bg-[#DFF3E7] text-green-800 border-[#84D19B]` |
| Status "Entrega a Combinar" | `bg-[#FDFCD4] text-yellow-800 border-[#F4F493]` |
| Link em tabela | `text-[#054AA4]` |
| Input padrão | `w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500` |
| Label | `block text-sm font-medium text-gray-700 mb-1` |
| Card de formulário | `max-w-xl bg-white p-6 rounded-xl shadow-md` |

Se uma mesma combinação de cores aparecer em vários lugares em código novo, prefira registrá-la como token (`@theme` em `index.css`) ou extrair um componente (ex.: `Button`, `StatusBadge`) em vez de repetir hex arbitrário.

## Textos da UI

- Toda a interface é em **português (pt-BR)**: "Sacolinha", "Cadastrar", "Entregue", "Entrega a Combinar".
- O domínio usa "sacolinha" na UI e `bag` no código.
