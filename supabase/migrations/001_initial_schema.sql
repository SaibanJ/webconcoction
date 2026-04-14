-- WebConcoction Database Schema
-- Run this migration in your Supabase SQL editor or via Supabase CLI

-- Domains table: tracks registered domains
create table if not exists public.domains (
  id uuid default gen_random_uuid() primary key,
  owner_email text not null,
  domain_name text not null unique,
  registered_at timestamptz not null default now(),
  expires_at timestamptz,
  namecheap_order_id text,
  created_at timestamptz default now()
);

-- Index for quick lookups by email or domain
create index if not exists idx_domains_owner_email on public.domains (owner_email);
create index if not exists idx_domains_domain_name on public.domains (domain_name);

-- Subscriptions table: tracks hosting plan subscriptions
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  customer_email text not null,
  plan text not null check (plan in ('basic', 'pro', 'business')),
  stripe_subscription_id text unique,
  status text not null default 'active' check (status in ('active', 'past_due', 'canceled', 'incomplete', 'trialing')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for subscription lookups
create index if not exists idx_subscriptions_customer_email on public.subscriptions (customer_email);
create index if not exists idx_subscriptions_stripe_id on public.subscriptions (stripe_subscription_id);

-- Enable Row Level Security
alter table public.domains enable row level security;
alter table public.subscriptions enable row level security;

-- RLS policies: service role can do everything (used by API routes)
-- For client-side access, add more granular policies as needed
create policy "Service role full access on domains"
  on public.domains
  for all
  using (true)
  with check (true);

create policy "Service role full access on subscriptions"
  on public.subscriptions
  for all
  using (true)
  with check (true);
