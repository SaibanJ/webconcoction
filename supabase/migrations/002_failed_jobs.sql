-- Failed jobs table: captures webhook processing failures for manual review + retry
create table if not exists public.failed_jobs (
  id uuid default gen_random_uuid() primary key,
  type text not null,                  -- 'domain_registration' | 'hosting_setup' | 'domain_transfer'
  customer_email text not null,
  payload jsonb not null,              -- all data needed to retry the job
  error text not null,
  stripe_session_id text,
  resolved boolean default false,
  created_at timestamptz default now(),
  resolved_at timestamptz
);

create index if not exists idx_failed_jobs_email on public.failed_jobs (customer_email);
create index if not exists idx_failed_jobs_resolved on public.failed_jobs (resolved);
create index if not exists idx_failed_jobs_type on public.failed_jobs (type);

alter table public.failed_jobs enable row level security;

create policy "Service role full access on failed_jobs"
  on public.failed_jobs
  for all
  using (true)
  with check (true);
