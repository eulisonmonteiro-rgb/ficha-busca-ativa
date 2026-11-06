# Ficha de Busca Ativa — aplicativo (PWA) v3.5

Versão instalável (Android e iPhone) da ficha criada como artefato no Claude
(artefato original: https://claude.ai/artifact/8sYwUV2LdsC5JBTiLSFvcE).

## Arquivos
| Arquivo | Para quê |
|---|---|
| `index.html` | A ficha (app completo) |
| `manifest.webmanifest` | Nome, ícone e cores do app instalado |
| `sw.js` | Funcionamento offline (cache) e atualizações |
| `icons/` | Ícones (Android, iPhone, maskable) |
| `original_v3.4_artifact.html` | Cópia de segurança do artefato original |

## Publicar uma nova versão
1. Edite `index.html`.
2. Em `sw.js`, aumente `VERSAO` (ex.: `v3.5.0` → `v3.5.1`) — sem isso os celulares não recebem a atualização.
3. Publique a pasta inteira de novo no mesmo endereço.
4. Ao abrir com internet, aparece a faixa **"Nova versão disponível → Atualizar"**. As fichas salvas não são perdidas.

## Instalar no celular
- **Android (Chrome):** abrir o link → botão **📲 Instalar app** no topo da ficha.
- **iPhone (Safari):** abrir o link no **Safari** → **Compartilhar ⬆︎** → **Adicionar à Tela de Início**.
- Abrir uma vez com internet antes da expedição; depois funciona sem sinal.

## Observações
- Precisa estar em endereço **https** (Netlify, GitHub Pages, Cloudflare Pages…). Aberto como arquivo local não instala.
- As fichas ficam salvas **no aparelho** (localStorage). Exportar o JSON ao fim da expedição continua obrigatório.
- No iPhone, o app instalado e o Safari guardam fichas em locais separados: use sempre o ícone instalado.
