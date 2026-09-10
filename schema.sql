-- BANCO E SEGURANÇA
-- Execute no SQL Editor do Supabase.
create extension if not exists pgcrypto;

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  genres text,
  description text,
  cover_url text,
  banner_url text,
  content text not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.stories enable row level security;

-- Qualquer visitante pode ler.
drop policy if exists "public read stories" on public.stories;
create policy "public read stories" on public.stories
for select using (true);

-- SOMENTE usuários autenticados podem escrever.
-- Depois da ativação, o único usuário criado para administração é o seu.
drop policy if exists "authenticated insert stories" on public.stories;
create policy "authenticated insert stories" on public.stories
for insert to authenticated with check (true);

drop policy if exists "authenticated update stories" on public.stories;
create policy "authenticated update stories" on public.stories
for update to authenticated using (true) with check (true);

drop policy if exists "authenticated delete stories" on public.stories;
create policy "authenticated delete stories" on public.stories
for delete to authenticated using (true);

-- IMPORTANTE:
-- Não deixe o cadastro público de usuários habilitado no painel Auth.
-- Crie o primeiro usuário administrador pelo painel do Supabase.
-- Para "acesso único", use o recurso de convite/primeiro cadastro e depois
-- desative o sign-up público. A senha fica somente com você.
