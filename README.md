# NOVELS — site de histórias

Site estático hospedado no GitHub Pages, com histórias salvas no Supabase.

## O que ele faz

- Visual inspirado em plataformas de streaming.
- Visitantes podem ler e pesquisar histórias.
- Qualquer pessoa pode adicionar uma história pela página `submit.html`.
- Histórias enviadas ficam salvas no banco online e aparecem para todos.
- Usuários autenticados ainda podem editar/excluir pelo painel administrativo.
- Funciona em celular e computador.

## Configuração

1. Envie todos os arquivos para o GitHub.
2. Crie um projeto gratuito no Supabase.
3. No SQL Editor, execute `supabase/schema.sql`.
4. No Supabase, copie a **Project URL** e a **anon/public key**.
5. Copie `config.example.js` para `js/config.js` e coloque esses dois valores.
6. No GitHub Pages, publique pela branch `main` e pasta `/ (root)`.
7. Abra `submit.html` para testar o envio público.

### Importante

Como qualquer pessoa pode publicar, o formulário é público. Não coloque senhas, tokens secretos ou informações administrativas no formulário.

A chave `anon/public` pode ficar no front-end. **Nunca coloque a `service_role` key no GitHub.**
