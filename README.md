# NOVELS — site de novels com administração

Este projeto é um site estático (GitHub Pages) com banco de dados e autenticação pelo Supabase.

## O que ele faz

- Visual inspirado em plataformas de streaming, sem copiar a marca Netflix.
- Visitantes podem ler e pesquisar novels.
- Somente usuário autenticado pode publicar, editar e excluir.
- As histórias ficam no banco online, portanto todos os visitantes veem as publicações.
- O site funciona em celular e computador.

## Custo

O código foi pensado para usar GitHub Pages + plano gratuito do Supabase. Ambos possuem limites de uso; se o projeto crescer muito, os limites gratuitos podem ser atingidos.

## CONFIGURAÇÃO ÚNICA

### 1. GitHub

Crie um repositório público e envie todos os arquivos desta pasta.

### 2. Supabase

Crie um projeto gratuito em https://supabase.com/

No SQL Editor, execute `supabase/schema.sql`.

Depois vá ao painel de autenticação e crie manualmente o seu usuário administrador (se o painel oferecer "Add user/Create user", use essa opção). Use um e-mail e uma senha que somente você conhece.

Depois de criar seu usuário, DESATIVE o cadastro público (Allow new users to sign up / Enable sign ups), se essa opção estiver disponível nas configurações de Authentication.

Isso é importante: visitantes não terão como criar contas novas pelo site.

### 3. Conectar o site ao Supabase

No Supabase, copie:
- Project URL
- anon/public key

Faça uma cópia de `config.example.js` chamada `config.js` dentro da pasta `js/` e coloque os valores:

```js
export const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
export const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_PUBLICA";
```

A chave `anon/public` pode ficar no front-end. NUNCA coloque a `service_role` key no GitHub.

### 4. GitHub Pages

No repositório:
Settings → Pages → Deploy from a branch → branch `main` → `/ (root)` → Save.

Depois de alguns minutos, o GitHub fornecerá o endereço público.

### 5. Primeiro teste

Abra `/admin.html`, faça login com o usuário que você criou e publique uma novel.

Abra o site em uma janela anônima. A história deverá aparecer para qualquer visitante.

## Sobre o "acesso único"

A segurança real não depende de uma senha escondida no HTML/JavaScript.

Neste projeto:
- o navegador não contém a senha;
- o Supabase autentica o administrador;
- as regras RLS do banco impedem visitantes anônimos de inserir/alterar/excluir;
- o cadastro público deve ficar desativado;
- você é o único usuário administrativo criado.

Se quiser uma versão ainda mais rígida, com um "código de ativação único" que cria o primeiro administrador e se invalida depois do primeiro uso, isso deve ser implementado no backend/Edge Function do Supabase, não em JavaScript público.

## Limitação importante

Este modelo armazena o texto das novels no banco. Para imagens/capas, ele usa URLs. Se você quiser fazer upload de capas e arquivos diretamente pelo painel, é possível adicionar Supabase Storage.

## Segurança

Nunca publique:
- senha;
- service_role key;
- tokens secretos;
- credenciais administrativas.

O `config.js` contém apenas a URL pública do projeto e a chave `anon`, que é feita para uso no cliente; a proteção vem das políticas RLS.
